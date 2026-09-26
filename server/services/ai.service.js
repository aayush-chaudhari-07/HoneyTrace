import { supabaseAdmin } from "../config/supabase.js";

export const aiService = {
  async getInsightsForHive(hiveId) {
    const { data, error } = await supabaseAdmin
      .from("ai_insights")
      .select("*")
      .eq("hive_id", hiveId)
      .order("generated_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getInsightsForBatch(batchId) {
    const { data, error } = await supabaseAdmin
      .from("ai_insights")
      .select("*")
      .eq("batch_id", batchId)
      .order("generated_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async createInsight(insightData) {
    const { data, error } = await supabaseAdmin
      .from("ai_insights")
      .insert(insightData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
