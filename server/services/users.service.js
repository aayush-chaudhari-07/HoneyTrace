import { supabaseAdmin } from "../config/supabase.js";

export const usersService = {
  async completeProfile({ userId, email, name, role, contact }) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .upsert({
        id: userId,
        email,
        name,
        role,
        contact: contact || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserById(userId) {
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },
};
