import { supabaseAdmin } from "../config/supabase.js";
import { batchesService } from "./batches.service.js";

/**
 * Strips HTML tags and sanitizes free text input strings.
 */
export function sanitizeText(input = "") {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>?/gm, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "")
    .trim();
}

/**
 * Helper to test if a string is a valid UUID format.
 */
function isValidUuid(str) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export const publicService = {
  /**
   * Returns public consumer verification detail for a batch, stripping sensitive internal user fields.
   */
  async getPublicBatchDetail(batchId) {
    const detail = await batchesService.getBatchDetail(batchId);

    if (!detail || detail.status === "draft") {
      const err = new Error("Batch not found or not yet published for verification.");
      err.statusCode = 404;
      throw err;
    }

    // 1. Sanitize source hives (remove owner_id)
    const publicHives = (detail.source_hives || []).map((hive) => ({
      id: hive.id,
      location_lat: hive.location_lat,
      location_lng: hive.location_lng,
      current_health_category: hive.current_health_category,
      created_at: hive.created_at,
    }));

    // 2. Sanitize custody records timeline (remove actor_user_id, email, contact)
    const publicCustody = (detail.custody_records || []).map((record) => {
      let actorName = record.users?.name || "Verified Partner";
      let actorRole = record.users?.role || record.stage;

      return {
        id: record.id,
        stage: record.stage,
        timestamp: record.timestamp,
        data_hash: record.data_hash,
        storage_reference: record.storage_reference,
        extra_data: record.extra_data,
        actor: {
          name: actorName,
          role: actorRole,
        },
      };
    });

    // 3. Transform lab tests to ensure public certificate URLs
    const publicLabTests = (detail.lab_tests || []).map((test) => {
      let certificateUrl = test.certificate_storage_reference;

      if (
        certificateUrl &&
        !certificateUrl.startsWith("http://") &&
        !certificateUrl.startsWith("https://") &&
        !certificateUrl.startsWith("data:")
      ) {
        const { data: publicUrlData } = supabaseAdmin.storage
          .from("batch-documents")
          .getPublicUrl(certificateUrl);
        certificateUrl = publicUrlData?.publicUrl || certificateUrl;
      }

      return {
        id: test.id,
        results_summary: test.results_summary,
        certificate_url: certificateUrl,
        created_at: test.created_at,
      };
    });

    // 4. Sanitize feedback entries
    const publicFeedback = (detail.feedback || []).map((fb) => ({
      id: fb.id,
      rating: fb.rating,
      tasting_notes: fb.tasting_notes,
      submitter_name: fb.submitter_name || "Honey Enthusiast",
      created_at: fb.created_at,
    }));

    // Construct final public verification payload
    return {
      id: detail.id,
      forage_location: detail.forage_location,
      harvest_start_date: detail.harvest_start_date,
      harvest_end_date: detail.harvest_end_date,
      status: detail.status,
      blockchain_record_id: detail.blockchain_record_id,
      qr_code_id: detail.qr_code_id,
      created_at: detail.created_at,
      source_hives: publicHives,
      custody_records: publicCustody,
      lab_tests: publicLabTests,
      feedback: publicFeedback,
      trust_score: detail.trust_score,
      trust_score_breakdown: detail.trust_score_breakdown,
      data_integrity_warning: detail.data_integrity_warning,
    };
  },

  /**
   * Resolves a human-readable batch code (QR code ID, Blockchain ID, or UUID) to a batch ID.
   */
  async lookupBatchByCode(codeQuery) {
    if (!codeQuery || !String(codeQuery).trim()) {
      const err = new Error("Search code query parameter 'code' is required.");
      err.statusCode = 400;
      throw err;
    }

    const cleanCode = String(codeQuery).trim();
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    // 1. Check direct UUID lookup
    if (isValidUuid(cleanCode)) {
      const { data: bByUuid } = await supabaseAdmin
        .from("batches")
        .select("id, status, qr_code_id, blockchain_record_id")
        .eq("id", cleanCode)
        .neq("status", "draft")
        .maybeSingle();

      if (bByUuid) {
        return {
          batch_id: bByUuid.id,
          code: bByUuid.qr_code_id || bByUuid.blockchain_record_id || bByUuid.id,
          status: bByUuid.status,
          verification_url: `${frontendUrl}/verify/${bByUuid.id}`,
        };
      }
    }

    // 2. Query by qr_code_id or blockchain_record_id
    const { data: batches, error } = await supabaseAdmin
      .from("batches")
      .select("id, status, qr_code_id, blockchain_record_id")
      .neq("status", "draft")
      .or(`qr_code_id.ilike.%${cleanCode}%,blockchain_record_id.ilike.%${cleanCode}%`)
      .limit(1);

    if (error) throw error;

    if (batches && batches.length > 0) {
      const match = batches[0];
      return {
        batch_id: match.id,
        code: match.qr_code_id || match.blockchain_record_id || match.id,
        status: match.status,
        verification_url: `${frontendUrl}/verify/${match.id}`,
      };
    }

    const err = new Error(`No published batch found matching verification code '${cleanCode}'.`);
    err.statusCode = 404;
    throw err;
  },

  /**
   * Inserts public feedback for a batch with rating and sanitized tasting notes.
   */
  async addPublicFeedback(batchId, { rating, tasting_notes, submitter_name }) {
    // 1. Verify batch exists and is published
    const { data: batch } = await supabaseAdmin
      .from("batches")
      .select("id, status")
      .eq("id", batchId)
      .maybeSingle();

    if (!batch || batch.status === "draft") {
      const err = new Error("Batch not found or not yet published.");
      err.statusCode = 404;
      throw err;
    }

    // 2. Validate rating
    const numRating = Number(rating);
    if (!numRating || isNaN(numRating) || numRating < 1 || numRating > 5) {
      const err = new Error("Feedback rating must be an integer between 1 and 5.");
      err.statusCode = 400;
      throw err;
    }

    // 3. Sanitize inputs
    const cleanNotes = sanitizeText(tasting_notes);
    const cleanName = sanitizeText(submitter_name) || "Honey Enthusiast";

    if (cleanNotes.length > 1000) {
      const err = new Error("Tasting notes cannot exceed 1000 characters.");
      err.statusCode = 400;
      throw err;
    }

    // 4. Insert into feedback table
    const { data, error } = await supabaseAdmin
      .from("feedback")
      .insert({
        batch_id: batchId,
        rating: Math.round(numRating),
        tasting_notes: cleanNotes,
        submitter_name: cleanName,
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};
