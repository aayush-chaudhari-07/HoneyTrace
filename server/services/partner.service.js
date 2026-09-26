import { supabaseAdmin } from "../config/supabase.js";
import { blockchainService } from "./blockchain.service.js";
import { batchesService } from "./batches.service.js";

// Role to expected current batch status mapping
export const ROLE_STAGE_MAP = {
  lab: { currentStatus: "sealed", targetStatus: "bottler", stageName: "lab" },
  bottler: { currentStatus: "lab", targetStatus: "distributor", stageName: "bottler" },
  distributor: { currentStatus: "bottler", targetStatus: "shelf", stageName: "distributor" },
  retailer: { currentStatus: ["distributor", "shelf"], targetStatus: "delivered", stageName: "shelf" },
};

export const partnerService = {
  /**
   * Retrieves pending batches for the logged-in partner based on their role.
   */
  async getPendingBatches(userRole) {
    let query = supabaseAdmin
      .from("batches")
      .select("*, custody_records(*), lab_tests(*)");

    if (userRole === "lab") {
      query = query.eq("status", "sealed");
    } else if (userRole === "bottler") {
      query = query.eq("status", "lab");
    } else if (userRole === "distributor") {
      query = query.eq("status", "bottler");
    } else if (userRole === "retailer") {
      query = query.in("status", ["distributor", "shelf"]);
    } else if (userRole === "admin") {
      query = query.in("status", ["sealed", "lab", "bottler", "distributor", "shelf"]);
    } else {
      return [];
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  /**
   * Handles partner stage update for a batch.
   */
  async updatePartnerBatchStage(batchId, user, payload) {
    const role = user.role;
    const userId = user.id;

    // 1. Fetch current batch
    const { data: batch, error: getErr } = await supabaseAdmin
      .from("batches")
      .select("*")
      .eq("id", batchId)
      .maybeSingle();

    if (getErr) throw getErr;
    if (!batch) {
      const err = new Error(`Batch with ID '${batchId}' not found.`);
      err.statusCode = 404;
      throw err;
    }

    // Determine effective partner role mapping (if admin, derive from current status)
    let config = ROLE_STAGE_MAP[role];
    if (role === "admin") {
      if (batch.status === "sealed") config = ROLE_STAGE_MAP.lab;
      else if (batch.status === "lab") config = ROLE_STAGE_MAP.bottler;
      else if (batch.status === "bottler") config = ROLE_STAGE_MAP.distributor;
      else if (batch.status === "distributor" || batch.status === "shelf") config = ROLE_STAGE_MAP.retailer;
      else {
        const err = new Error(`Admin cannot update batch at current status '${batch.status}'.`);
        err.statusCode = 400;
        throw err;
      }
    }

    if (!config) {
      const err = new Error(`Role '${role}' is not authorized to perform partner custody stage updates.`);
      err.statusCode = 403;
      throw err;
    }

    // Validate expected status matching caller role
    const expected = Array.isArray(config.currentStatus) ? config.currentStatus : [config.currentStatus];
    if (!expected.includes(batch.status)) {
      const err = new Error(
        `Batch '${batchId}' is currently at status '${batch.status}', which does not match caller role '${role}' (expected status: ${expected.join(" or ")}).`
      );
      err.statusCode = 400;
      throw err;
    }

    // 2. Validate payload and process stage-specific logic
    let stageExtraData = {};
    let storageReference = null;

    if (config.stageName === "lab") {
      const { results_summary, certificate_file } = payload || {};
      if (!results_summary || !String(results_summary).trim()) {
        const err = new Error("Lab stage update requires a valid 'results_summary'.");
        err.statusCode = 400;
        throw err;
      }

      let certificateUrl = null;
      if (certificate_file) {
        certificateUrl = await this.uploadCertificateFile(batchId, certificate_file);
      }

      // Insert into lab_tests
      const { error: labErr } = await supabaseAdmin.from("lab_tests").insert({
        batch_id: batchId,
        results_summary: String(results_summary).trim(),
        certificate_storage_reference: certificateUrl,
      });
      if (labErr) throw labErr;

      stageExtraData = {
        results_summary: String(results_summary).trim(),
        certificate_url: certificateUrl,
      };
      storageReference = certificateUrl;

    } else if (config.stageName === "bottler") {
      const { jar_count, notes } = payload || {};
      if (jar_count == null || isNaN(Number(jar_count)) || Number(jar_count) <= 0) {
        const err = new Error("Bottler stage update requires a valid positive number for 'jar_count'.");
        err.statusCode = 400;
        throw err;
      }

      stageExtraData = {
        jar_count: Number(jar_count),
        notes: notes ? String(notes).trim() : "",
      };

    } else if (config.stageName === "distributor") {
      const { transport_details, current_location, temperature_log } = payload || {};
      if (!transport_details && !current_location) {
        const err = new Error("Distributor stage update requires 'transport_details' or 'current_location'.");
        err.statusCode = 400;
        throw err;
      }

      stageExtraData = {
        transport_details: transport_details || "",
        current_location: current_location || "",
        temperature_log: temperature_log || null,
      };

    } else if (config.stageName === "shelf") {
      const { store_name, store_location } = payload || {};
      if (!store_name || !store_location) {
        const err = new Error("Retailer stage update requires both 'store_name' and 'store_location'.");
        err.statusCode = 400;
        throw err;
      }

      stageExtraData = {
        store_name: String(store_name).trim(),
        store_location: String(store_location).trim(),
      };
    }

    // 3. Record stage on blockchain smart contract / ledger
    const chainResult = await blockchainService.recordCustodyStage(
      batchId,
      config.stageName,
      userId,
      stageExtraData
    );

    // 4. Create custody_records row
    const { error: custodyErr } = await supabaseAdmin.from("custody_records").insert({
      batch_id: batchId,
      stage: config.stageName,
      actor_user_id: userId,
      timestamp: new Date().toISOString(),
      data_hash: chainResult.dataHash,
      storage_reference: storageReference || chainResult.txHash,
      extra_data: stageExtraData,
    });

    if (custodyErr) throw custodyErr;

    // 5. Advance batch status to targetStatus
    const { error: updateErr } = await supabaseAdmin
      .from("batches")
      .update({ status: config.targetStatus })
      .eq("id", batchId);

    if (updateErr) throw updateErr;

    // 6. Return refreshed full batch detail
    const updatedBatch = await batchesService.getBatchDetail(batchId);
    return updatedBatch;
  },

  async uploadCertificateFile(batchId, certificateFile) {
    if (typeof certificateFile === "string" && (certificateFile.startsWith("http://") || certificateFile.startsWith("https://"))) {
      return certificateFile;
    }

    try {
      const filePath = `lab-certificates/cert-${batchId}-${Date.now()}.pdf`;
      let buffer;
      if (typeof certificateFile === "string" && certificateFile.startsWith("data:")) {
        const base64Data = certificateFile.replace(/^data:.*?;base64,/, "");
        buffer = Buffer.from(base64Data, "base64");
      } else if (Buffer.isBuffer(certificateFile)) {
        buffer = certificateFile;
      } else {
        buffer = Buffer.from(String(certificateFile), "utf8");
      }

      const { data: uploadData, error: uploadErr } = await supabaseAdmin.storage
        .from("batch-documents")
        .upload(filePath, buffer, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (!uploadErr && uploadData) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from("batch-documents")
          .getPublicUrl(filePath);

        return publicUrlData?.publicUrl || filePath;
      }
    } catch (err) {
      console.warn("⚠️ Certificate upload fallback to string reference:", err.message);
    }

    return String(certificateFile);
  },
};
