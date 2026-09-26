import { supabaseAdmin } from "../config/supabase.js";

export const batchesService = {
  async listBatches(userId, role) {
    let query = supabaseAdmin
      .from("batches")
      .select("*, custody_records(*), lab_tests(*)");

    if (role === "beekeeper" && userId) {
      query = query.eq("created_by", userId);
    } else if (role !== "admin") {
      // Non-admin partners see non-draft batches
      query = query.neq("status", "draft");
    }

    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getBatchById(id) {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .select("*, custody_records(*), lab_tests(*), feedback(*)")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createBatch(batchData) {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .insert(batchData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateBatchStatus(id, status, extraFields = {}) {
    const { data, error } = await supabaseAdmin
      .from("batches")
      .update({ status, ...extraFields })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
