import { supabaseAdmin } from "../config/supabase.js";

export const labService = {
  async getLabTestsForBatch(batchId) {
    const { data, error } = await supabaseAdmin
      .from("lab_tests")
      .select("*")
      .eq("batch_id", batchId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async addLabTest(labTestData) {
    const { data, error } = await supabaseAdmin
      .from("lab_tests")
      .insert(labTestData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
