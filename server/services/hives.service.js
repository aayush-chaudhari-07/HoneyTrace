import { supabaseAdmin } from "../config/supabase.js";

export const hivesService = {
  async listHives(ownerId) {
    let query = supabaseAdmin.from("hives").select("*");
    if (ownerId) {
      query = query.eq("owner_id", ownerId);
    }
    const { data, error } = await query.order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getHiveById(id) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .select("*, readings(*)")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createHive(hiveData) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .insert(hiveData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateHive(id, updateData) {
    const { data, error } = await supabaseAdmin
      .from("hives")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async addReading(readingData) {
    const { data, error } = await supabaseAdmin
      .from("readings")
      .insert(readingData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getReadingsForHive(hiveId) {
    const { data, error } = await supabaseAdmin
      .from("readings")
      .select("*")
      .eq("hive_id", hiveId)
      .order("timestamp", { ascending: false });
    if (error) throw error;
    return data;
  },
};
