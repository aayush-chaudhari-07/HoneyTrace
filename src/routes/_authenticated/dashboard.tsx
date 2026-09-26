import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity, CalendarClock, ClipboardPlus, Droplets, Plus, Scale, Thermometer } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { BeeSwarm } from "@/components/BeeSwarm";
import { HoneyDrip } from "@/components/HoneyDrip";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { HiveFormSheet } from "@/components/HiveForms";
import { HiveHexGrid } from "@/components/HiveHexGrid";
import { EmptyState } from "@/components/EmptyState";
import { HoneycombLoader } from "@/components/HoneycombLoader";
import { healthOf, issuesFor, listHives, type Health, type Hive, type Issue } from "@/lib/hives";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Live Hive Dashboard — HoneyTrace" },
      { name: "description", content: "See every hive's health at a glance, log field readings and spot problems early." },
      { property: "og:title", content: "Live Hive Dashboard — HoneyTrace" },
      { property: "og:description", content: "See every hive's health at a glance, log field readings and spot problems early." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

const FILL: Record<Health, string> = { healthy: "var(--hive-healthy)", attention: "var(--hive-attention)", critical: "var(--hive-critical)" };
const LABEL: Record<Health, string> = { healthy: "Healthy", attention: "Needs attention", critical: "Critical" };
const ICON: Record<Issue["kind"], typeof Thermometer> = { temp: Thermometer, humidity: Droplets, activity: Activity, weight: Scale, inspect: CalendarClock };

function DashboardPage() {
  const { user } = Route.useRouteContext();
  const [sheet, setSheet] = useState<{ kind: "hive" } | { kind: "reading"; hiveId?: string } | null>(null);
  const hives = useQuery({ queryKey: ["hives"], queryFn: listHives });
  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle()).data,
  });
  const list = hives.data ?? [];
  const insights = list
    .map((h) => ({ h, issues: issuesFor(h) }))
    .filter((x) => x.issues.length)
    .sort((a, b) => b.issues[0]!.severity - a.issues[0]!.severity || b.issues.length - a.issues.length);
  const counts = list.reduce<Record<Health, number>>((c, h) => ({ ...c, [healthOf(h)]: c[healthOf(h)] + 1 }), { healthy: 0, attention: 0, critical: 0 });

  return (
    <AppShell>
      <header className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-8 sm:px-8">
        <div className="honeycomb-bg absolute inset-0 opacity-50" />
        <BeeSwarm count={2} className="opacity-60" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 max-sm:grid-cols-1">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep">Live hive dashboard</p>
            <h1 className="mt-2 text-4xl sm:text-5xl">Welcome back, {profile.data?.display_name?.split(" ")[0] || "beekeeper"}</h1>
            <p className="mt-2 text-muted-foreground">
              {list.length ? `${counts.healthy} healthy · ${counts.attention} need attention · ${counts.critical} critical` : "Add your first hive to start monitoring."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button variant="honeycomb" onClick={() => setSheet({ kind: "hive" })} className="active:scale-95"><Plus className="h-4 w-4" /> Add Hive</Button>
            <Button variant="honeycomb" onClick={() => setSheet({ kind: "reading" })} disabled={!list.length} className="active:scale-95"><ClipboardPlus className="h-4 w-4" /> Log New Reading</Button>
          </div>
        </div>
      </header>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
        <section className="rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl">Hive map</h2>
            <div className="flex gap-4 text-xs text-muted-foreground">
              {(Object.keys(FILL) as Health[]).map((k) => (
                <span key={k} className="flex items-center gap-1.5"><span className="honeycomb-clip h-3 w-3" style={{ background: FILL[k] }} /> {LABEL[k]}</span>
              ))}
            </div>
          </div>
          {hives.isLoading ? (
            <HoneycombLoader label="Opening your apiary…" />
          ) : list.length === 0 ? (
            <EmptyState
              title="No hives yet"
              description="Add your first hive to begin connecting field readings, harvest decisions, and every future jar."
              action={<Button variant="honeycomb" onClick={() => setSheet({ kind: "hive" })}><Plus /> Add your first hive</Button>}
            />
          ) : (
            <HoneycombGrid hives={list} />
          )}
        </section>

        <aside>
          <h2 className="mb-3 text-2xl">Quick insights</h2>
          {insights.length === 0 ? (
            <Reveal><p className="rounded-3xl border border-dashed border-border p-6 text-sm text-muted-foreground">{list.length ? "All hives look healthy. 🐝" : "Insights appear once you log readings."}</p></Reveal>
          ) : (
            <div className="space-y-3">
              {insights.map(({ h, issues }, i) => {
                const top = issues[0]!;
                const Icon = ICON[top.kind];
                return (
                  <Reveal key={h.id} delay={i * 70}>
                    <Link to="/hive/$id" params={{ id: h.id }} className="flex gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]">
                      <span className="honeycomb-clip flex h-10 w-10 shrink-0 items-center justify-center" style={{ background: FILL[top.severity === 2 ? "critical" : "attention"] }}>
                        <Icon className="h-4 w-4 text-background" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold">{h.name} {issues.length > 1 && <span className="text-xs font-normal text-muted-foreground">+{issues.length - 1} more</span>}</p>
                        <p className="truncate text-sm text-muted-foreground">{top.reason}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </aside>
      </div>

      <HoneyDrip distance={60} className="mt-12 opacity-80" />
      <HiveFormSheet mode={sheet} onClose={() => setSheet(null)} hives={list} userId={user.id} />
    </AppShell>
  );
}

function HoneycombGrid({ hives }: { hives: Hive[] }) {
  const navigate = useNavigate();
  return <HiveHexGrid hives={hives} onHiveClick={(h) => navigate({ to: "/hive/$id", params: { id: h.id } })} />;
}
