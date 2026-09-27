import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "beekeeper" | "lab" | "bottler" | "distributor" | "retailer";
export const PARTNER_ROLES = ["lab", "bottler", "distributor", "retailer"] as const;
export type PartnerRole = (typeof PARTNER_ROLES)[number];

export async function getMyRoles(userId: string): Promise<AppRole[]> {
  const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId);
  return (data ?? []).map((r) => r.role as AppRole);
}

/** Where a user should land after signing in, based on their role. */
export function homeFor(roles: AppRole[]): { to: "/admin" } | { to: "/partner" } | { to: "/dashboard" } {
  if (roles.includes("admin")) return { to: "/admin" };
  if (roles.some((r) => (PARTNER_ROLES as readonly string[]).includes(r))) return { to: "/partner" };
  return { to: "/dashboard" };
}
