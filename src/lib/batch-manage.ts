import { supabase } from "@/integrations/supabase/client";
import type { Hive, Reading } from "@/lib/hives";

export type BatchStatus = "draft" | "sealed" | "in_custody" | "delivered";

export const STATUS_META: Record<BatchStatus, { label: string; bg: string; fg: string }> = {
  draft: { label: "Draft", bg: "var(--muted)", fg: "var(--muted-foreground)" },
  sealed: { label: "Sealed", bg: "var(--primary)", fg: "var(--espresso)" },
  in_custody: { label: "In Custody", bg: "var(--primary-deep)", fg: "var(--background)" },
  delivered: { label: "Delivered", bg: "var(--hive-healthy)", fg: "var(--espresso)" },
};

export type ManagedStep = { id: string; stage: string; place: string; step_date: string; note: string; position: number; created_at: string };

export type ManagedBatch = {
  id: string;
  name: string;
  floral: string;
  region: string;
  beekeeper: string;
  harvested: string;
  jars: number;
  trust_score: number;
  status: BatchStatus;
  harvest_start: string | null;
  harvest_end: string | null;
  ai_recommendation: string | null;
  ai_verdict: string | null;
  recommendation_followed: boolean | null;
  override_reason: string | null;
  forage_location: string | null;
  forage_lat: number | null;
  forage_lng: number | null;
  sealed_at: string | null;
  created_at: string;
  batch_hives: { hive_id: string; hives: { id: string; name: string } | null }[];
  trail_steps: ManagedStep[];
};

const SELECT =
  "id,name,floral,region,beekeeper,harvested,jars,trust_score,status,harvest_start,harvest_end,ai_recommendation,ai_verdict,recommendation_followed,override_reason,forage_location,forage_lat,forage_lng,sealed_at,created_at,batch_hives(hive_id,hives(id,name)),trail_steps(id,stage,place,step_date,note,position,created_at)";

export async function listMyBatches(userId: string): Promise<ManagedBatch[]> {
  const { data, error } = await supabase.from("batches").select(SELECT).eq("owner_id", userId).order("created_at", { ascending: false });
  if (error) throw error;
  return data as unknown as ManagedBatch[];
}

export async function getMyBatch(id: string): Promise<ManagedBatch | null> {
  const { data, error } = await supabase.from("batches").select(SELECT).eq("id", id).maybeSingle();
  if (error) throw error;
  return data as unknown as ManagedBatch | null;
}

export async function readingsInRange(hiveIds: string[], from: string, to: string): Promise<Reading[]> {
  if (!hiveIds.length) return [];
  const { data, error } = await supabase
    .from("readings")
    .select("*")
    .in("hive_id", hiveIds)
    .gte("recorded_at", `${from}T00:00:00`)
    .lte("recorded_at", `${to}T23:59:59`)
    .order("recorded_at");
  if (error) throw error;
  return data as unknown as Reading[];
}

export type Recommendation = { verdict: "harvest" | "wait" | "caution"; text: string };

/** Harvest guidance from the readings in the selected window (falls back to current hive state). */
export function recommend(hives: Hive[], readings: Reading[]): Recommendation {
  const src = readings.length
    ? readings.map((r) => ({ t: Number(r.temperature), h: Number(r.humidity), w: Number(r.weight_kg), a: Number(r.activity_level) }))
    : hives.map((h) => ({ t: Number(h.temperature), h: Number(h.humidity), w: Number(h.weight_kg), a: Number(h.activity_level) }));
  if (!src.length) return { verdict: "caution", text: "No data for the selected hives — inspect frames before harvesting." };
  const avg = (k: "t" | "h" | "w" | "a") => src.reduce((s, x) => s + x[k], 0) / src.length;
  const hum = avg("h"), wt = avg("w"), act = avg("a"), tmp = avg("t");
  const gain = readings.length > 1 ? Number(readings[readings.length - 1]!.weight_kg) - Number(readings[0]!.weight_kg) : 0;
  const stats = `avg ${tmp.toFixed(1)}°C, ${hum.toFixed(0)}% humidity, ${wt.toFixed(1)} kg, activity ${act.toFixed(0)}`;
  if (hum > 70) return { verdict: "wait", text: `Wait 5–7 days: humidity is high (${stats}), so honey moisture is likely above 18%.` };
  if (tmp < 32 || tmp > 37 || act < 40) return { verdict: "caution", text: `Harvest with caution: colony stress signs (${stats}). Leave ample stores.` };
  if (wt >= 45 || gain >= 3) return { verdict: "harvest", text: `Harvest now: supers are heavy and capped conditions look good (${stats}${gain ? `, +${gain.toFixed(1)} kg in window` : ""}).` };
  return { verdict: "wait", text: `Wait for more nectar flow: hive weight is modest (${stats}).` };
}

export const CUSTODY = [
  { key: "beekeeper", label: "Beekeeper", match: ["hive", "harvest", "beekeeper", "apiary"] },
  { key: "lab", label: "Lab", match: ["lab", "test"] },
  { key: "bottler", label: "Bottler", match: ["bottl", "pack", "extract"] },
  { key: "distributor", label: "Distributor", match: ["distrib", "transit", "ship", "warehouse"] },
  { key: "shelf", label: "Shelf", match: ["retail", "shelf", "store"] },
] as const;

export function stageFor(step: ManagedStep): (typeof CUSTODY)[number]["key"] | null {
  const s = step.stage.toLowerCase();
  return CUSTODY.find((c) => c.match.some((m) => s.includes(m)))?.key ?? null;
}

export const verifyUrl = (id: string) => `${typeof window !== "undefined" ? window.location.origin : ""}/verify/${encodeURIComponent(id)}`;
