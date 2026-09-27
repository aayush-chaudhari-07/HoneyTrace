import { supabaseAdmin } from "../config/supabase.js";
import { blockchainService } from "./blockchain.service.js";
import { qrService } from "./qr.service.js";
import { computeTrustScore } from "./trust_score.service.js";

export const STATUS_ORDER = ["draft", "sealed", "lab", "bottler", "distributor", "shelf", "delivered"];

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
    let query = supabaseAdmin
      .from("batches")
      .select("*, custody_records(*), lab_tests(*)");

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
    if (error) throw error;
    return data;
  },

  async getBatchDetail(id) {
    // 1. Fetch main batch record with custody_records, lab_tests, feedback
    const { data: batch, error } = await supabaseAdmin
      .from("batches")
      .select("*, custody_records(*), lab_tests(*), feedback(*)")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!batch) return null;

    // 2. Fetch linked source hives details
    let sourceHives = [];
    if (batch.source_hive_ids && batch.source_hive_ids.length > 0) {
      const { data: hives } = await supabaseAdmin
        .from("hives")
        .select("*")
        .in("id", batch.source_hive_ids);
      sourceHives = hives || [];
    }

    // 3. Fetch readings snapshot at harvest time
    let harvestReadings = [];
    if (batch.source_hive_ids && batch.source_hive_ids.length > 0) {
      let rQuery = supabaseAdmin
        .from("readings")
        .select("*")
        .in("hive_id", batch.source_hive_ids);

      if (batch.harvest_start_date) {
        rQuery = rQuery.gte("timestamp", batch.harvest_start_date);
      }
      if (batch.harvest_end_date) {
        rQuery = rQuery.lte("timestamp", batch.harvest_end_date);
      }

      const { data: readings } = await rQuery.order("timestamp", { ascending: false });
      harvestReadings = readings || [];
    }

    // 4. Fetch associated AI insights
    const { data: aiInsights } = await supabaseAdmin
      .from("ai_insights")
      .select("*")
      .or(`batch_id.eq.${id},hive_id.in.(${batch.source_hive_ids.join(",") || "00000000-0000-0000-0000-000000000000"})`)
      .order("generated_at", { ascending: false });

    // 5. Order custody records by timestamp / stage position
    const orderedCustody = [...(batch.custody_records || [])].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // 6. Cross-check against on-chain records & compute Trust Score
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
      harvest_readings: harvestReadings,
      ai_insights: aiInsights || [],
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

  async validateAndCreateBatch({ userId, userRole, source_hive_ids, harvest_start_date, harvest_end_date, forage_location }) {
    if (!Array.isArray(source_hive_ids) || source_hive_ids.length === 0) {
      const err = new Error("At least one source hive must be included in the batch.");
      err.statusCode = 400;
      throw err;
    }

    const { data: hives, error: hivesErr } = await supabaseAdmin
      .from("hives")
      .select("*")
      .in("id", source_hive_ids);

    if (hivesErr) throw hivesErr;

    if (!hives || hives.length !== source_hive_ids.length) {
      const err = new Error("One or more specified source hives could not be found.");
      err.statusCode = 400;
      throw err;
    }

    if (userRole !== "admin") {
      const unauthorizedHive = hives.find((h) => h.owner_id !== userId);
      if (unauthorizedHive) {
        const err = new Error(`Source hive '${unauthorizedHive.id}' does not belong to you.`);
        err.statusCode = 403;
        throw err;
      }
    }

    let rQuery = supabaseAdmin
      .from("readings")
      .select("id")
      .in("hive_id", source_hive_ids);

    if (harvest_start_date) rQuery = rQuery.gte("timestamp", harvest_start_date);
    if (harvest_end_date) rQuery = rQuery.lte("timestamp", harvest_end_date);

    const { data: readings, error: readingsErr } = await rQuery.limit(1);
    if (readingsErr) throw readingsErr;

    if (!readings || readings.length === 0) {
      const err = new Error(
        "At least one sensor reading must exist for the selected source hives within the specified harvest date range."
      );
      err.statusCode = 400;
      throw err;
    }

    let autoForageLocation = forage_location;
    if (!autoForageLocation || !autoForageLocation.trim()) {
      const locations = hives
        .map((h) => {
          if (h.location_lat != null && h.location_lng != null) {
            return `Apiary (${h.location_lat}, ${h.location_lng})`;
          }
          return null;
        })
        .filter(Boolean);

      autoForageLocation = locations.length > 0 ? locations.join(" & ") : "Local Apiary Meadow";
    }

    const batchData = {
      source_hive_ids,
      harvest_start_date: harvest_start_date || null,
      harvest_end_date: harvest_end_date || null,
      forage_location: autoForageLocation.trim(),
      status: "draft",
      created_by: userId,
    };

    const { data: newBatch, error: insertErr } = await supabaseAdmin
      .from("batches")
      .insert(batchData)
      .select()
      .single();

    if (insertErr) throw insertErr;
    return newBatch;
  },

  async updateDraftBatch(id, updateData, userId, userRole) {
    const { data: batch, error: getErr } = await supabaseAdmin
      .from("batches")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (getErr) throw getErr;
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
      const err = new Error(
        `Batch details can only be updated while in 'draft' status. Current status is '${batch.status}'.`
      );
      err.statusCode = 400;
      throw err;
    }

    const { data: updatedBatch, error: updateErr } = await supabaseAdmin
      .from("batches")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateErr) throw updateErr;
    return updatedBatch;
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

    if (!batch.source_hive_ids || batch.source_hive_ids.length === 0) {
      const err = new Error("Cannot seal batch: Batch has zero source hives linked.");
      err.statusCode = 400;
      throw err;
    }

    if (!batch.harvest_readings || batch.harvest_readings.length === 0) {
      const err = new Error("Cannot seal batch: Zero sensor readings were recorded for the harvest period.");
      err.statusCode = 400;
      throw err;
    }

    // 1. Generate & upload unique QR code to Supabase Storage
    const qrResult = await qrService.generateAndStoreBatchQr(id);

    // 2. Generate on-chain blockchain record ID
    const blockchain_record_id = generateBlockchainRecordId(id);
    const qr_code_id = qrResult.qrCodeId;

    // 3. Update batch status to 'sealed' with record IDs
    const { data: sealedBatch, error: sealErr } = await supabaseAdmin
      .from("batches")
      .update({
        status: "sealed",
        blockchain_record_id,
        qr_code_id,
      })
      .eq("id", id)
      .select()
      .single();

    if (sealErr) throw sealErr;

    // 4. Record on-chain custody stage for 'beekeeper'
    const chainResult = await blockchainService.recordCustodyStage(id, "beekeeper", userId, {
      sealed_at: new Date().toISOString(),
      qr_code_id,
    });

    // 5. Insert initial custody record for stage 'beekeeper' if not present
    const hasBeekeeperCustody = batch.custody_records.some((c) => c.stage === "beekeeper");
    if (!hasBeekeeperCustody) {
      await supabaseAdmin.from("custody_records").insert({
        batch_id: id,
        stage: "beekeeper",
        actor_user_id: userId,
        data_hash: chainResult.dataHash,
        storage_reference: qrResult.storageReference || chainResult.txHash,
        extra_data: { sealed_at: new Date().toISOString() },
      });
    }

    return {
      ...sealedBatch,
      qr_image_url: qrResult.qrImageUrl,
      verification_url: qrResult.verificationUrl,
      blockchain_tx_hash: chainResult.txHash,
    };
  },

  async updateBatchStatusWithLifecycle(id, targetStatus, userId, userRole) {
    const { data: batch, error: getErr } = await supabaseAdmin
      .from("batches")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (getErr) throw getErr;
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

    const { data: updated, error: updateErr } = await supabaseAdmin
      .from("batches")
      .update({ status: targetStatus })
      .eq("id", id)
      .select()
      .single();

    if (updateErr) throw updateErr;
    return updated;
  },
};
