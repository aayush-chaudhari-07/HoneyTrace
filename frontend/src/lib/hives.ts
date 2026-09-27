import { supabase } from "@/integrations/supabase/client";

export type Hive = {
  id: string;
  name: string;
  location: string | null;
  temperature: number;
  humidity: number;
  weight_kg: number;
  colony_strength: number;
  activity_level: number;
  last_inspected: string;
  notes: string | null;
  created_at: string;
};

export type Reading = {
  id: string;
  hive_id: string;
  temperature: number;
  humidity: number;
  weight_kg: number;
  activity_level: number;
  location: string | null;
  notes: string | null;
  recorded_at: string;
};

export type Health = "healthy" | "attention" | "critical";
export type Issue = { severity: 2 | 1; reason: string; kind: "temp" | "humidity" | "activity" | "weight" | "inspect" };

export function issuesFor(h: Hive): Issue[] {
  const out: Issue[] = [];
  const t = Number(h.temperature), hu = Number(h.humidity), a = Number(h.activity_level), w = Number(h.weight_kg);
  if (t < 30 || t > 39) out.push({ severity: 2, kind: "temp", reason: `Brood temperature ${t}°C is far outside 32–36°C` });
  else if (t < 32 || t > 37) out.push({ severity: 1, kind: "temp", reason: `Temperature drifting (${t}°C)` });
  if (hu > 80) out.push({ severity: 2, kind: "humidity", reason: `Humidity ${hu}% — high mould & fermentation risk` });
  else if (hu > 70 || hu < 40) out.push({ severity: 1, kind: "humidity", reason: `Humidity ${hu}% outside ideal 50–65%` });
  if (a < 25) out.push({ severity: 2, kind: "activity", reason: `Very low flight activity (${a}%) — possible queen loss` });
  else if (a < 45) out.push({ severity: 1, kind: "activity", reason: `Activity below normal (${a}%)` });
  if (w < 20) out.push({ severity: 1, kind: "weight", reason: `Low stores (${w} kg) — consider feeding` });
  const days = Math.floor((Date.now() - new Date(h.last_inspected).getTime()) / 86400000);
  if (days > 14) out.push({ severity: 1, kind: "inspect", reason: `No reading for ${days} days` });
  return out.sort((x, y) => y.severity - x.severity);
}

export function healthOf(h: Hive): Health {
  const i = issuesFor(h);
  if (i.some((x) => x.severity === 2)) return "critical";
  return i.length ? "attention" : "healthy";
}

export async function listHives(): Promise<Hive[]> {
  const { data, error } = await supabase.from("hives").select("*").order("created_at");
  if (error) throw error;
  return data as unknown as Hive[];
}

export async function getHive(id: string): Promise<Hive | null> {
  const { data, error } = await supabase.from("hives").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data as unknown as Hive | null;
}

export async function listReadings(hiveId: string): Promise<Reading[]> {
  const { data, error } = await supabase.from("readings").select("*").eq("hive_id", hiveId).order("recorded_at");
  if (error) throw error;
  return data as unknown as Reading[];
}

export type Anomaly = { at: string; metric: string; value: number; message: string };

/** Flag readings that jump well outside the hive's own recent pattern (z-score > 2.2) or hard limits. */
export function detectAnomalies(rs: Reading[]): Anomaly[] {
  const metrics: { key: keyof Reading; label: string; unit: string }[] = [
    { key: "temperature", label: "Temperature", unit: "°C" },
    { key: "humidity", label: "Humidity", unit: "%" },
    { key: "weight_kg", label: "Weight", unit: " kg" },
    { key: "activity_level", label: "Activity", unit: "%" },
  ];
  const out: Anomaly[] = [];
  for (const m of metrics) {
    const vals = rs.map((r) => Number(r[m.key]));
    if (vals.length < 4) continue;
    const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
    const sd = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
    if (sd === 0) continue;
    rs.forEach((r, i) => {
      const v = vals[i]!;
      const z = (v - mean) / sd;
      if (Math.abs(z) > 2.2)
        out.push({ at: r.recorded_at, metric: m.label, value: v, message: `${m.label} ${z > 0 ? "spiked" : "dropped"} to ${v}${m.unit} (usual ≈ ${mean.toFixed(1)}${m.unit})` });
    });
  }
  return out.sort((a, b) => b.at.localeCompare(a.at));
}
