import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Hive } from "@/lib/hives";
import { cn } from "@/lib/utils";
import { HoneycombSpinner } from "@/components/HoneycombLoader";

type Mode = { kind: "hive" } | { kind: "reading"; hiveId?: string | undefined };

type Vals = { name: string; hiveId: string; temperature: string; humidity: string; weight_kg: string; activity_level: string; location: string; notes: string };
const blank: Vals = { name: "", hiveId: "", temperature: "34.5", humidity: "60", weight_kg: "40", activity_level: "70", location: "", notes: "" };

const RANGES = {
  temperature: [-10, 60, "°C"],
  humidity: [0, 100, "%"],
  weight_kg: [0, 200, "kg"],
  activity_level: [0, 100, "%"],
} as const;

export function HiveFormSheet({ mode, onClose, hives, userId }: { mode: Mode | null; onClose: () => void; hives: Hive[]; userId: string }) {
  const qc = useQueryClient();
  const [v, setV] = useState<Vals>(blank);
  const [err, setErr] = useState<Partial<Record<keyof Vals, string>>>({});
  const [busy, setBusy] = useState(false);
  const [lastMode, setLastMode] = useState<Mode | null>(null);

  if (mode !== lastMode) {
    setLastMode(mode);
    if (mode) {
      setErr({});
      setV({ ...blank, hiveId: mode.kind === "reading" ? mode.hiveId ?? hives[0]?.id ?? "" : "" });
    }
  }

  const set = (k: keyof Vals) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setV((x) => ({ ...x, [k]: e.target.value }));

  const validate = () => {
    const e: Partial<Record<keyof Vals, string>> = {};
    if (mode?.kind === "hive" && v.name.trim().length < 2) e.name = "Give the hive a name (2+ characters).";
    if (mode?.kind === "hive" && v.name.length > 60) e.name = "Keep the name under 60 characters.";
    if (mode?.kind === "reading" && !v.hiveId) e.hiveId = "Pick which hive this reading is for.";
    (Object.keys(RANGES) as (keyof typeof RANGES)[]).forEach((k) => {
      const n = Number(v[k]);
      const [lo, hi, u] = RANGES[k];
      if (v[k] === "" || Number.isNaN(n)) e[k] = "Enter a number.";
      else if (n < lo || n > hi) e[k] = `Should be between ${lo} and ${hi} ${u}.`;
    });
    if (v.location.length > 120) e.location = "Keep location under 120 characters.";
    if (v.notes.length > 1000) e.notes = "Notes are limited to 1000 characters.";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErr(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    const nums = { temperature: Number(v.temperature), humidity: Number(v.humidity), weight_kg: Number(v.weight_kg), activity_level: Number(v.activity_level) };
    try {
      let hiveId = v.hiveId;
      if (mode?.kind === "hive") {
        const { data, error } = await supabase.from("hives").insert({ owner_id: userId, name: v.name.trim(), location: v.location.trim() || null, notes: v.notes.trim() || null, ...nums }).select("id").single();
        if (error) throw error;
        hiveId = data.id;
      }
      const { error } = await supabase.from("readings").insert({ owner_id: userId, hive_id: hiveId, location: v.location.trim() || null, notes: v.notes.trim() || null, ...nums });
      if (error) throw error;
      toast.success(mode?.kind === "hive" ? "Hive added to your apiary" : "Reading logged");
      qc.invalidateQueries({ queryKey: ["hives"] });
      qc.invalidateQueries({ queryKey: ["hive"] });
      qc.invalidateQueries({ queryKey: ["readings"] });
      onClose();
    } catch (x) {
      toast.error(x instanceof Error ? x.message : "Couldn't save");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Sheet open={!!mode} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl">{mode?.kind === "hive" ? "Add a hive" : "Field journal"}</SheetTitle>
          <SheetDescription>{mode?.kind === "hive" ? "Name your hive and record its first reading." : "Log what you observed at the hive today."}</SheetDescription>
        </SheetHeader>
        <form onSubmit={submit} noValidate className="mt-6 space-y-4 px-1 pb-6">
          {mode?.kind === "hive" ? (
            <F label="Hive name" error={err.name}><input className={inp(err.name)} value={v.name} onChange={set("name")} placeholder="Meadow Hive 3" /></F>
          ) : (
            <F label="Hive" error={err.hiveId}>
              <select className={inp(err.hiveId)} value={v.hiveId} onChange={set("hiveId")}>
                <option value="">Select a hive…</option>
                {hives.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
            </F>
          )}
          <div className="grid grid-cols-2 gap-3">
            <F label="Temperature °C" error={err.temperature}><input type="number" step="0.1" className={inp(err.temperature)} value={v.temperature} onChange={set("temperature")} /></F>
            <F label="Humidity %" error={err.humidity}><input type="number" className={inp(err.humidity)} value={v.humidity} onChange={set("humidity")} /></F>
            <F label="Weight kg" error={err.weight_kg}><input type="number" step="0.1" className={inp(err.weight_kg)} value={v.weight_kg} onChange={set("weight_kg")} /></F>
            <F label={`Activity ${v.activity_level}%`} error={err.activity_level}>
              <input type="range" min={0} max={100} className="mt-3 w-full accent-[var(--color-primary-deep)]" value={v.activity_level} onChange={set("activity_level")} />
            </F>
          </div>
          <F label="Location" error={err.location}><input className={inp(err.location)} value={v.location} onChange={set("location")} placeholder="North field, row 2" /></F>
          <F label="Notes" error={err.notes}><textarea rows={4} className={cn(inp(err.notes), "h-auto py-3")} value={v.notes} onChange={set("notes")} placeholder="Queen spotted, calm colony, capped brood on 6 frames…" /></F>
          <Button type="submit" variant="honeycomb" size="lg" disabled={busy} className="w-full active:scale-95">
            {busy ? <><HoneycombSpinner className="honeycomb-loader-compact" /> Saving…</> : mode?.kind === "hive" ? "Add hive" : "Log reading"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function inp(error?: string | undefined) {
  return cn(
    "h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]",
    error ? "border-destructive/50 bg-destructive/5" : "border-input",
  );
}

function F({ label, error, children }: { label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 flex items-center gap-1 text-xs text-destructive"><AlertCircle className="h-3.5 w-3.5" /> {error}</span>}
    </label>
  );
}
