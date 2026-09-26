import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AlertTriangle, ArrowLeft, ClipboardPlus, Sparkles, Trash2 } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { HiveFormSheet } from "@/components/HiveForms";
import { Button } from "@/components/ui/button";
import { HoneycombLoader, HoneycombSpinner } from "@/components/HoneycombLoader";
import { detectAnomalies, getHive, healthOf, issuesFor, listReadings, type Reading } from "@/lib/hives";
import { analyzeHive } from "@/lib/ai.functions";

export const Route = createFileRoute("/_authenticated/hive/$id")({
  head: () => ({
    meta: [
      { title: "Hive Details — HoneyTrace" },
      { name: "description", content: "Temperature, humidity, weight and activity trends with anomaly alerts for one hive." },
      { property: "og:title", content: "Hive Details — HoneyTrace" },
      { property: "og:description", content: "Temperature, humidity, weight and activity trends with anomaly alerts for one hive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HivePage,
});

const CHARTS: { key: keyof Reading; label: string; unit: string }[] = [
  { key: "temperature", label: "Temperature", unit: "°C" },
  { key: "humidity", label: "Humidity", unit: "%" },
  { key: "weight_kg", label: "Weight", unit: "kg" },
  { key: "activity_level", label: "Activity", unit: "%" },
];

const fmt = (d: string) => new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

function HivePage() {
  const { id } = Route.useParams();
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [sheet, setSheet] = useState(false);
  const hive = useQuery({ queryKey: ["hive", id], queryFn: () => getHive(id) });
  const readings = useQuery({ queryKey: ["readings", id], queryFn: () => listReadings(id) });
  const analyze = useServerFn(analyzeHive);
  const ai = useMutation({ mutationFn: () => analyze({ data: { hiveId: id } }), onError: (e) => toast.error(e.message) });
  const del = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("hives").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["hives"] });
      toast.success("Hive removed");
      navigate({ to: "/dashboard" });
    },
  });

  if (hive.isLoading) return <AppShell><HoneycombLoader label="Opening hive readings…" /></AppShell>;
  if (!hive.data) return <AppShell><div className="py-20 text-center"><p>Hive not found.</p><Link to="/dashboard" className="text-primary-deep underline">Back to dashboard</Link></div></AppShell>;

  const h = hive.data;
  const rs = readings.data ?? [];
  const anomalies = detectAnomalies(rs);
  const issues = issuesFor(h);
  const status = healthOf(h);
  const data = rs.map((r) => ({ ...r, t: new Date(r.recorded_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) }));
  const flagged = [...issues.map((i) => i.reason), ...anomalies.slice(0, 4).map((a) => `${a.message} on ${fmt(a.at)}`), ...(ai.data?.anomalies ?? [])];

  return (
    <AppShell>
      <Link to="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Dashboard</Link>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep">{status === "healthy" ? "Healthy" : status === "critical" ? "Critical" : "Needs attention"}</p>
          <h1 className="text-4xl sm:text-5xl">{h.name}</h1>
          <p className="text-muted-foreground">{h.location || "No location set"} · {rs.length} readings</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => ai.mutate()} disabled={ai.isPending || rs.length < 2}>
            {ai.isPending ? <HoneycombSpinner className="honeycomb-loader-compact" /> : <Sparkles />} AI check
          </Button>
          <Button variant="honeycomb" onClick={() => setSheet(true)} className="active:scale-95"><ClipboardPlus className="h-4 w-4" /> Log New Reading</Button>
          <Button variant="ghost" size="icon" aria-label="Delete hive" onClick={() => confirm(`Delete ${h.name} and all its readings?`) && del.mutate()}><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>

      {flagged.length > 0 && (
        <div className="animate-fade-in mt-6 rounded-3xl border border-primary/50 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_22%,var(--color-card)),var(--color-card))] p-5 shadow-[var(--shadow-honey)]">
          <p className="flex items-center gap-2 font-semibold"><AlertTriangle className="h-5 w-5 text-primary-deep" /> {ai.data ? "Flagged anomalies (incl. AI review)" : "Flagged anomalies"}</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">{flagged.map((f, i) => <li key={i}>{f}</li>)}</ul>
        </div>
      )}
      {ai.data && ai.data.anomalies.length === 0 && <p className="mt-4 text-sm text-muted-foreground">AI review found nothing unusual in recent readings.</p>}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {CHARTS.map((c) => (
          <div key={c.key} className="rounded-3xl border border-border bg-card p-5">
            <p className="font-semibold">{c.label} <span className="text-sm font-normal text-muted-foreground">({c.unit})</span></p>
            <div className="mt-3 h-48">
              {data.length < 2 ? (
                <p className="flex h-full items-center justify-center text-sm text-muted-foreground">Log more readings to see a trend.</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ left: -18, right: 8, top: 8 }}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" />
                    <XAxis dataKey="t" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
                    <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} domain={["auto", "auto"]} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                    <Line type="monotone" dataKey={c.key as string} stroke="var(--color-primary-deep)" strokeWidth={2.5} dot={{ r: 3, fill: "var(--color-primary)" }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-3xl border border-border bg-card p-5">
        <h2 className="text-2xl">History log</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-muted-foreground">
              <tr className="border-b border-border">{["When", "Temp", "Humidity", "Weight", "Activity", "Location", "Notes"].map((x) => <th key={x} className="px-3 py-2 font-medium">{x}</th>)}</tr>
            </thead>
            <tbody>
              {[...rs].reverse().map((r) => (
                <tr key={r.id} className="border-b border-border/60 transition hover:bg-accent/50">
                  <td className="whitespace-nowrap px-3 py-2">{fmt(r.recorded_at)}</td>
                  <td className="px-3 py-2">{Number(r.temperature)}°C</td>
                  <td className="px-3 py-2">{Number(r.humidity)}%</td>
                  <td className="px-3 py-2">{Number(r.weight_kg)} kg</td>
                  <td className="px-3 py-2">{r.activity_level}%</td>
                  <td className="px-3 py-2">{r.location || "—"}</td>
                  <td className="max-w-xs truncate px-3 py-2" title={r.notes ?? ""}>{r.notes || "—"}</td>
                </tr>
              ))}
              {rs.length === 0 && <tr><td colSpan={7} className="px-3 py-6 text-center text-muted-foreground">No readings yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>

      <HiveFormSheet mode={sheet ? { kind: "reading", hiveId: id } : null} onClose={() => setSheet(false)} hives={[h]} userId={user.id} />
    </AppShell>
  );
}
