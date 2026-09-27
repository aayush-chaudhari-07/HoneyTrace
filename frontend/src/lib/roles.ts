import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "beekeeper" | "lab" | "bottler" | "distributor" | "retailer";
export const PARTNER_ROLES = ["lab", "bottler", "distributor", "retailer"] as const;
export type PartnerRole = (typeof PARTNER_ROLES)[number];

export async function getMyRoles(userId: string): Promise<AppRole[]> {
  if (!userId) return [];

  try {
    // 1. Try user_roles table
    const { data: userRoles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    if (userRoles && userRoles.length > 0) {
      return userRoles.map((r) => r.role as AppRole);
    }

    // 2. Fall back to users table
    const { data: userRow } = await supabase.from("users").select("role").eq("id", userId).maybeSingle();
    if (userRow?.role) {
      return [userRow.role as AppRole];
    }

    // 3. Fall back to Auth user metadata
    const { data: authUser } = await supabase.auth.getUser();
    if (authUser?.user?.user_metadata?.role) {
      return [authUser.user.user_metadata.role as AppRole];
    }
  } catch (err) {
    console.warn("getMyRoles fallback notice:", err);
  }

  return ["beekeeper"];
}

/** Where a user should land after signing in, based on their role. */
export function homeFor(roles: AppRole[]): { to: "/admin" } | { to: "/partner" } | { to: "/dashboard" } {
  if (roles.includes("admin")) return { to: "/admin" };
  if (roles.some((r) => (PARTNER_ROLES as readonly string[]).includes(r))) return { to: "/partner" };
  return { to: "/dashboard" };
}
