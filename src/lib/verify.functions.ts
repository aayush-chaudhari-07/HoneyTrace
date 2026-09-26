import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

export type PublicStep = {
  id: string;
  position: number;
  stage: string;
  place: string;
  step_date: string;
  note: string;
  created_at: string;
  document_url: string | null;
  document_label: string | null;
  prev_hash: string | null;
  block_hash: string | null;
};

export type TastingNote = { id: string; name: string | null; rating: number; note: string; created_at: string };

export type PublicBatch = {
  id: string;
  name: string;
  floral: string;
  region: string;
  beekeeper: string;
  harvested: string;
  harvest_start: string | null;
  harvest_end: string | null;
  jars: number;
  trust_score: number;
  status: string;
  forage_location: string | null;
  forage_lat: number | null;
  forage_lng: number | null;
  sealed_at: string | null;
  steps: PublicStep[];
  hives: { name: string; location: string | null }[];
  notes: TastingNote[];
};

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  // Graceful degradation: return null when the backend isn't connected so
  // handlers can respond with empty/not-found states instead of crashing.
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const getPublicBatch = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().trim().min(1).max(40) }).parse(d))
  .handler(async ({ data }): Promise<PublicBatch | null> => {
    const sb = publicClient();
    if (!sb) return null;
    const id = data.id.toUpperCase();
    const [b, hives, notes] = await Promise.all([
      sb
        .from("batches")
        .select(
          "id,name,floral,region,beekeeper,harvested,harvest_start,harvest_end,jars,trust_score,status,forage_location,forage_lat,forage_lng,sealed_at,trail_steps(id,position,stage,place,step_date,note,created_at,document_url,document_label,prev_hash,block_hash)",
        )
        .eq("id", id)
        .maybeSingle(),
      sb.rpc("public_batch_hives", { _batch_id: id }),
      sb.from("tasting_notes").select("id,name,rating,note,created_at").eq("batch_id", id).order("created_at", { ascending: false }).limit(50),
    ]);
    if (b.error) throw new Error(b.error.message);
    if (!b.data) return null;
    const { trail_steps, ...rest } = b.data as typeof b.data & { trail_steps: PublicStep[] };
    return {
      ...(rest as Omit<PublicBatch, "steps" | "hives" | "notes">),
      forage_lat: rest.forage_lat == null ? null : Number(rest.forage_lat),
      forage_lng: rest.forage_lng == null ? null : Number(rest.forage_lng),
      steps: [...(trail_steps ?? [])].sort((x, y) => x.position - y.position),
      hives: (hives.data ?? []) as { name: string; location: string | null }[],
      notes: (notes.data ?? []) as TastingNote[],
    };
  });

export const addTastingNote = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z
      .object({
        batchId: z.string().trim().min(1).max(40),
        name: z.string().trim().max(60).optional(),
        rating: z.number().int().min(1).max(5),
        note: z.string().trim().min(3).max(500),
      })
      .parse(d),
  )
  .handler(async ({ data }): Promise<TastingNote> => {
    const sb = publicClient();
    if (!sb) throw new Error("HoneyTrace's data service isn't connected yet — please try again later.");
    const { data: row, error } = await sb
      .from("tasting_notes")
      .insert({ batch_id: data.batchId.toUpperCase(), name: data.name || null, rating: data.rating, note: data.note })
      .select("id,name,rating,note,created_at")
      .single();
    if (error) throw new Error(error.message);
    return row as TastingNote;
  });
