import { supabaseAdmin } from "../config/supabase.js";
import { blockchainService } from "./blockchain.service.js";
import { qrService } from "./qr.service.js";
import { computeTrustScore } from "./trust_score.service.js";

export const STATUS_ORDER = ["draft", "sealed", "lab", "bottler", "distributor", "shelf", "delivered"];

export const inMemoryBatches = new Map();
export const inMemoryCustodyRecords = new Map(); // batchId => array of records
export const inMemoryLabTests = new Map(); // batchId => array of tests
export const inMemoryFeedback = new Map(); // batchId => array of feedback

/**
 * Validates sequential status transition along the defined lifecycle:
 * draft → sealed → lab → bottler → distributor → shelf → delivered
 */
export function isValidStatusTransition(currentStatus, targetStatus) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);
  const targetIndex = STATUS_ORDER.indexOf(targetStatus);

  if (currentIndex === -1 || targetIndex === -1) {
    return {
      valid: false,
      reason: `Unknown status values. Valid statuses are: [${STATUS_ORDER.join(", ")}]`,
    };
  }

  // Must move forward sequentially (targetIndex === currentIndex + 1)
  if (targetIndex === currentIndex + 1) {
    return { valid: true };
  }

  if (targetIndex <= currentIndex) {
    return {
      valid: false,
      reason: `Cannot reverse or re-apply stage. Current status is '${currentStatus}', requested is '${targetStatus}'. Status order is: ${STATUS_ORDER.join(" → ")}`,
    };
  }

  return {
    valid: false,
    reason: `Cannot skip stages. Current status is '${currentStatus}', requested is '${targetStatus}'. Status order is: ${STATUS_ORDER.join(" → ")}`,
  };
}

/**
 * Helper to generate blockchain record ID and QR code ID.
 */
export function generateBlockchainRecordId(batchId) {
  const hash = Math.random().toString(36).substring(2, 10).toUpperCase();
  const cleanId = String(batchId).replace(/-/g, "").substring(0, 12);
  return `0x${cleanId}${hash}`;
}

export function generateQrCodeId(batchId) {
  return `QR-${String(batchId).toUpperCase()}`;
}

export const batchesService = {
  async listBatches(userId, role) {
    try {
      let query = supabaseAdmin.from("batches").select("*, custody_records(*), lab_tests(*)");

      if (role === "beekeeper" && userId) {
        query = query.eq("created_by", userId);
      } else if (role === "lab") {
        query = query.in("status", ["sealed", "lab"]);
      } else if (role === "bottler") {
        query = query.in("status", ["lab", "bottler"]);
      } else if (role === "distributor") {
        query = query.in("status", ["bottler", "distributor"]);
      } else if (role === "retailer") {
        query = query.in("status", ["distributor", "shelf", "delivered"]);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn("⚠️ listBatches fell back to in-memory store:", err.message);
    }

    // In-memory fallback
    const all = Array.from(inMemoryBatches.values());
    let filtered = all;
    if (role === "beekeeper" && userId) {
      filtered = all.filter((b) => b.created_by === userId);
    } else if (role === "lab") {
      filtered = all.filter((b) => ["sealed", "lab"].includes(b.status));
    } else if (role === "bottler") {
      filtered = all.filter((b) => ["lab", "bottler"].includes(b.status));
    } else if (role === "distributor") {
      filtered = all.filter((b) => ["bottler", "distributor"].includes(b.status));
    } else if (role === "retailer") {
      filtered = all.filter((b) => ["distributor", "shelf", "delivered"].includes(b.status));
    }

    return filtered.map((b) => ({
      ...b,
      custody_records: inMemoryCustodyRecords.get(b.id) || [],
      lab_tests: inMemoryLabTests.get(b.id) || [],
    }));
  },

  async getBatchDetail(id) {
    let batch = null;

    try {
      const { data, error } = await supabaseAdmin
        .from("batches")
        .select("*, custody_records(*), lab_tests(*), feedback(*)")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) batch = data;
    } catch (err) {
      console.warn("⚠️ getBatchDetail DB query fell back to in-memory store:", err.message);
    }

    if (!batch) {
      const memBatch = inMemoryBatches.get(id);
      if (!memBatch) return null;
      batch = {
        ...memBatch,
        custody_records: inMemoryCustodyRecords.get(id) || [],
        lab_tests: inMemoryLabTests.get(id) || [],
        feedback: inMemoryFeedback.get(id) || [],
      };
    }

    // Fetch linked source hives
    let sourceHives = [];
    if (batch.source_hive_ids && batch.source_hive_ids.length > 0) {
      try {
        const { data: hives } = await supabaseAdmin
          .from("hives")
          .select("*")
          .in("id", batch.source_hive_ids);
        sourceHives = hives || [];
      } catch (e) {}
    }

    // Order custody records
    const orderedCustody = [...(batch.custody_records || [])].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // Cross-check against on-chain records & compute Trust Score
    const onChainRecords = await blockchainService.getCustodyHistoryOnChain(id);
    const trustInfo = computeTrustScore({
      batch,
      custodyRecords: orderedCustody,
      labTests: batch.lab_tests || [],
      onChainRecords,
    });

    return {
      ...batch,
      source_hives: sourceHives,
      harvest_readings: [],
      ai_insights: [],
      custody_records: orderedCustody,
      trust_score: trustInfo.trust_score,
      trust_score_breakdown: trustInfo.breakdown,
      data_integrity_warning: trustInfo.data_integrity_warning,
    };
  },

  async getBatchTrustScore(id) {
    const detail = await this.getBatchDetail(id);
    if (!detail) return null;

    return {
      batch_id: id,
      trust_score: detail.trust_score,
      breakdown: detail.trust_score_breakdown,
      data_integrity_warning: detail.data_integrity_warning,
    };
  },

  async validateAndCreateBatch({ id: customId, userId, userRole, source_hive_ids, harvest_start_date, harvest_end_date, forage_location }) {
    if (!Array.isArray(source_hive_ids) || source_hive_ids.length === 0) {
      const err = new Error("At least one source hive must be included in the batch.");
      err.statusCode = 400;
      throw err;
    }

    const autoForageLocation = forage_location && forage_location.trim() ? forage_location.trim() : "Wildflower & Clover Meadow";

    const batchData = {
      id: customId || `batch-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      source_hive_ids,
      harvest_start_date: harvest_start_date || new Date().toISOString(),
      harvest_end_date: harvest_end_date || new Date().toISOString(),
      forage_location: autoForageLocation,
      status: "draft",
      created_by: userId,
      created_at: new Date().toISOString(),
    };

    try {
      const { data: newBatch, error: insertErr } = await supabaseAdmin
        .from("batches")
        .insert(batchData)
        .select()
        .single();

      if (!insertErr && newBatch) {
        inMemoryBatches.set(newBatch.id, newBatch);
        return newBatch;
      }
    } catch (err) {
      console.warn("⚠️ create batch DB insert fell back to in-memory store:", err.message);
    }

    inMemoryBatches.set(batchData.id, batchData);
    return batchData;
  },

  async updateDraftBatch(id, updateData, userId, userRole) {
    const batch = await this.getBatchDetail(id);
    if (!batch) {
      const err = new Error("Batch not found.");
      err.statusCode = 404;
      throw err;
    }

    if (userRole !== "admin" && batch.created_by !== userId) {
      const err = new Error("Access denied: You are not the creator of this batch.");
      err.statusCode = 403;
      throw err;
    }

    if (batch.status !== "draft") {
      const err = new Error(`Batch details can only be updated while in 'draft' status. Current status is '${batch.status}'.`);
      err.statusCode = 400;
      throw err;
    }

    try {
      const { data: updatedBatch, error: updateErr } = await supabaseAdmin
        .from("batches")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (!updateErr && updatedBatch) {
        inMemoryBatches.set(id, updatedBatch);
        return updatedBatch;
      }
    } catch (err) {
      console.warn("⚠️ update draft batch fell back to in-memory store:", err.message);
    }

    const updated = { ...batch, ...updateData };
    inMemoryBatches.set(id, updated);
    return updated;
  },

  async sealBatch(id, userId, userRole) {
    const batch = await this.getBatchDetail(id);
    if (!batch) {
      const err = new Error("Batch not found.");
      err.statusCode = 404;
      throw err;
    }

    if (userRole !== "admin" && batch.created_by !== userId) {
      const err = new Error("Access denied: Only the batch creator can seal this batch.");
      err.statusCode = 403;
      throw err;
    }

    const transition = isValidStatusTransition(batch.status, "sealed");
    if (!transition.valid) {
      const err = new Error(transition.reason);
      err.statusCode = 400;
      throw err;
    }

    const qrResult = await qrService.generateAndStoreBatchQr(id);
    const blockchain_record_id = generateBlockchainRecordId(id);
    const qr_code_id = qrResult.qrCodeId;

    let sealedBatch = {
      ...batch,
      status: "sealed",
      blockchain_record_id,
      qr_code_id,
    };

    try {
      const { data: resData, error: sealErr } = await supabaseAdmin
        .from("batches")
        .update({
          status: "sealed",
          blockchain_record_id,
          qr_code_id,
        })
        .eq("id", id)
        .select()
        .single();

      if (!sealErr && resData) sealedBatch = resData;
    } catch (err) {
      console.warn("⚠️ sealBatch DB update fell back to in-memory store:", err.message);
    }

    inMemoryBatches.set(id, sealedBatch);

    const chainResult = await blockchainService.recordCustodyStage(id, "beekeeper", userId, {
      sealed_at: new Date().toISOString(),
      qr_code_id,
    });

    const custodyRecord = {
      id: `custody-${Date.now()}`,
      batch_id: id,
      stage: "beekeeper",
      actor_user_id: userId,
      timestamp: new Date().toISOString(),
      data_hash: chainResult.dataHash,
      storage_reference: qrResult.storageReference || chainResult.txHash,
      extra_data: { sealed_at: new Date().toISOString() },
    };

    try {
      await supabaseAdmin.from("custody_records").insert(custodyRecord);
    } catch (err) {}

    const custodyList = inMemoryCustodyRecords.get(id) || [];
    custodyList.push(custodyRecord);
    inMemoryCustodyRecords.set(id, custodyList);

    return {
      ...sealedBatch,
      qr_image_url: qrResult.qrImageUrl,
      verification_url: qrResult.verificationUrl,
      blockchain_tx_hash: chainResult.txHash,
    };
  },

  async updateBatchStatusWithLifecycle(id, targetStatus, userId, userRole) {
    const batch = await this.getBatchDetail(id);
    if (!batch) {
      const err = new Error("Batch not found.");
      err.statusCode = 404;
      throw err;
    }

    const transition = isValidStatusTransition(batch.status, targetStatus);
    if (!transition.valid) {
      const err = new Error(transition.reason);
      err.statusCode = 400;
      throw err;
    }

    let updated = { ...batch, status: targetStatus };
    try {
      const { data, error } = await supabaseAdmin
        .from("batches")
        .update({ status: targetStatus })
        .eq("id", id)
        .select()
        .single();

      if (!error && data) updated = data;
    } catch (err) {
      console.warn("⚠️ updateBatchStatusWithLifecycle fell back to memory store:", err.message);
    }

    inMemoryBatches.set(id, updated);
    return updated;
  },
};
