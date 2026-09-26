import { supabaseAdmin } from "../config/supabase.js";

export const feedbackService = {
  async getFeedbackForBatch(batchId) {
    const { data, error } = await supabaseAdmin
      .from("feedback")
      .select("*")
      .eq("batch_id", batchId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async addFeedback(feedbackData) {
    const { data, error } = await supabaseAdmin
      .from("feedback")
      .insert(feedbackData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
