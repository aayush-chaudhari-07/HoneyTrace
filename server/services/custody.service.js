import { supabaseAdmin } from "../config/supabase.js";

export const custodyService = {
  async getCustodyForBatch(batchId) {
    const { data, error } = await supabaseAdmin
      .from("custody_records")
      .select("*, users:actor_user_id(name, role)")
      .eq("batch_id", batchId)
      .order("timestamp", { ascending: true });
    if (error) throw error;
    return data;
  },

  async addCustodyRecord(recordData) {
    const { data, error } = await supabaseAdmin
      .from("custody_records")
      .insert(recordData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
