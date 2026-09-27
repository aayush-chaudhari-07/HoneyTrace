import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Ask the AI to review a hive's recent readings and flag anomalies. */
export const analyzeHive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ hiveId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: hive } = await context.supabase.from("hives").select("name").eq("id", data.hiveId).maybeSingle();
    if (!hive) throw new Error("Hive not found");
    const { data: rows } = await context.supabase
      .from("readings")
      .select("recorded_at,temperature,humidity,weight_kg,activity_level,notes")
      .eq("hive_id", data.hiveId)
      .order("recorded_at", { ascending: false })
      .limit(40);
    if (!rows || rows.length < 2) return { anomalies: [] as string[] };

    const key = process.env["AI_API_KEY"] || process.env["OPENAI_API_KEY"];
    const endpoint = process.env["AI_API_ENDPOINT"] || "https://api.openai.com/v1/chat/completions";
    if (!key) throw new Error("AI is not configured (set AI_API_KEY or OPENAI_API_KEY in .env)");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env["AI_MODEL"] || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an expert apiarist. Review hive sensor/journal readings (newest first). Healthy brood: 32-36°C, humidity 50-65%. Flag only genuine anomalies or worrying trends (sudden weight loss, activity collapse, temperature swings, concerning notes). Each item: one short plain-English sentence with the suggested action. Return an empty list if nothing is wrong." },
          { role: "user", content: `Hive "${hive.name}" readings:\n${JSON.stringify(rows)}` },
        ],
        tools: [{ type: "function", function: { name: "report", parameters: { type: "object", properties: { anomalies: { type: "array", items: { type: "string" } } }, required: ["anomalies"] } } }],
        tool_choice: { type: "function", function: { name: "report" } },
      }),
    });
    if (res.status === 429) throw new Error("AI is busy right now — try again in a minute.");
    if (res.status === 402) throw new Error("AI credits are used up for this workspace.");
    if (!res.ok) throw new Error(`AI request failed (${res.status})`);
    const json = await res.json();
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    const parsed = args ? (JSON.parse(args) as { anomalies?: string[] }) : {};
    return { anomalies: (parsed.anomalies ?? []).slice(0, 6) };
  });
