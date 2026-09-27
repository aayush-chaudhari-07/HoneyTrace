import { supabase } from "@/integrations/supabase/client";

export interface TrailStep {
  stage: string;
  place: string;
  date: string;
  note: string;
}

export interface Batch {
  id: string;
  name: string;
  floral: string;
  region: string;
  beekeeper: string;
  harvested: string;
  trustScore: number;
  jars: number;
  ownerId: string | null;
  trail: TrailStep[];
}

export const SAMPLE_CODES = ["HT-2026-0412", "HT-2026-0527", "HT-2026-0703"];

const fmt = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

type Row = {
  id: string;
  name: string;
  floral: string;
  region: string;
  beekeeper: string;
  harvested: string;
  trust_score: number;
  jars: number;
  owner_id: string | null;
  trail_steps: { stage: string; place: string; step_date: string; note: string; position: number }[];
};

const SELECT = "id,name,floral,region,beekeeper,harvested,trust_score,jars,owner_id,trail_steps(stage,place,step_date,note,position)";

function toBatch(r: Row): Batch {
  return {
    id: r.id,
    name: r.name,
    floral: r.floral,
    region: r.region,
    beekeeper: r.beekeeper,
    harvested: fmt(r.harvested),
    trustScore: r.trust_score,
    jars: r.jars,
    ownerId: r.owner_id,
    trail: [...(r.trail_steps ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((s) => ({ stage: s.stage, place: s.place, date: fmt(s.step_date), note: s.note })),
  };
}

export async function fetchBatches(ownerId?: string): Promise<Batch[]> {
  let q = supabase.from("batches").select(SELECT).order("harvested", { ascending: false });
  if (ownerId) q = q.eq("owner_id", ownerId);
  const { data, error } = await q;
  if (error) throw error;
  return (data as unknown as Row[]).map(toBatch);
}

export async function fetchBatch(code: string): Promise<Batch | null> {
  const id = code.trim().toUpperCase();
  if (!id) return null;
  const { data, error } = await supabase.from("batches").select(SELECT).eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? toBatch(data as unknown as Row) : null;
}

/** Pull a batch code out of a scanned QR payload (plain code or a URL containing it). */
export function extractCode(text: string): string {
  const m = text.match(/HT-\d{4}-[A-Z0-9]+/i);
  return (m ? m[0] : text).trim().toUpperCase();
}
