import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CalendarDays, Hexagon, MapPin, Plus, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { BeeSwarm } from "@/components/BeeSwarm";
import { HoneyDrip } from "@/components/HoneyDrip";
import { HiveHexGrid } from "@/components/HiveHexGrid";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/EmptyState";
import { HoneycombLoader, HoneycombSpinner } from "@/components/HoneycombLoader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listHives } from "@/lib/hives";
import { listMyBatches, readingsInRange, recommend } from "@/lib/batch-manage";

export const Route = createFileRoute("/_authenticated/batches/")({
  head: () => ({
    meta: [
      { title: "My Batches — HoneyTrace" },
      { name: "description", content: "Create honey batches from your hives, track status and seal them with a verification QR." },
      { property: "og:title", content: "My Batches — HoneyTrace" },
      { property: "og:description", content: "Create honey batches from your hives, track status and seal them with a verification QR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BatchesPage,
});

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function BatchesPage() {
  const { user } = Route.useRouteContext();
  const [creating, setCreating] = useState(false);
  const batches = useQuery({ queryKey: ["batches", "mine", user.id], queryFn: () => listMyBatches(user.id) });

  return (
    <AppShell>
      <div className="relative overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0 opacity-60"><BeeSwarm count={3} /></div>
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 py-2 max-sm:grid-cols-1">
          <div className="min-w-0">
            <h1 className="text-4xl sm:text-5xl">My Batches</h1>
            <p className="mt-2 text-muted-foreground">Bundle hives into a batch, seal it, and follow it to the shelf.</p>
          </div>
          <Button variant="honeycomb" onClick={() => setCreating(true)}><Plus className="h-4 w-4" /> Create New Batch</Button>
        </div>
      </div>

      {batches.isLoading && <HoneycombLoader label="Following your batches…" className="mt-6" />}
      {batches.data?.length === 0 && (
        <EmptyState
          className="mt-8 rounded-3xl border border-dashed border-border"
          icon={Hexagon}
          title="No batches yet"
          description="Create your first batch from a hive, then follow its journey from harvest to shelf."
          action={<Button variant="honeycomb" onClick={() => setCreating(true)}><Plus /> Create your first batch</Button>}
        />
      )}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {batches.data?.map((b, i) => (
          <Reveal key={b.id} delay={i * 60}>
            <Link
              to="/batches/$id"
              params={{ id: b.id }}
              className="group block h-full rounded-3xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono text-sm text-muted-foreground">{b.id}</p>
                <StatusBadge status={b.status} />
              </div>
              <h2 className="mt-3 text-2xl">{b.name}</h2>
              <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary-deep" /> Harvested {fmt(b.harvested)}</p>
                <p className="flex items-center gap-2"><Hexagon className="h-4 w-4 text-primary-deep" /> {b.batch_hives.length} source hive{b.batch_hives.length === 1 ? "" : "s"}</p>
                {b.forage_location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary-deep" /> {b.forage_location}</p>}
              </div>
              <p className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary-deep transition group-hover:gap-2">Open batch <ArrowRight className="h-4 w-4" /></p>
            </Link>
          </Reveal>
        ))}
      </div>
      <div className="relative mt-16 h-24"><HoneyDrip /></div>
      {creating && <CreateBatchFlow userId={user.id} onClose={() => setCreating(false)} />}
    </AppShell>
  );
}

function CreateBatchFlow({ userId, onClose }: { userId: string; onClose: () => void }) {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const monthAgo = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [from, setFrom] = useState(monthAgo);
  const [to, setTo] = useState(today);
  const [name, setName] = useState("");
  const [floral, setFloral] = useState("");
  const [jars, setJars] = useState(100);
  const [forage, setForage] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [followed, setFollowed] = useState<boolean | null>(null);
  const [overrideReason, setOverrideReason] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const hives = useQuery({ queryKey: ["hives"], queryFn: listHives });
  const ids = useMemo(() => [...picked], [picked]);
  const readings = useQuery({ queryKey: ["readings-range", ids, from, to], queryFn: () => readingsInRange(ids, from, to), enabled: step >= 1 && ids.length > 0 });
  const chosen = (hives.data ?? []).filter((h) => picked.has(h.id));
  const rec = recommend(chosen, readings.data ?? []);

  const toggle = (id: string) => setPicked((p) => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const next = () => {
    setErr(null);
    if (step === 0 && picked.size === 0) return setErr("Tap at least one hive to include it.");
    if (step === 1 && (!from || !to || from > to)) return setErr("Pick a valid date range — start must be before end.");
    if (step === 1 && !forage && chosen[0]?.location) setForage(chosen[0].location);
    setStep(step + 1);
  };

  const locate = () => {
    if (!navigator.geolocation) { toast.error("Location isn't available on this device"); return; }
    navigator.geolocation.getCurrentPosition(
      (p) => { setLat(p.coords.latitude.toFixed(5)); setLng(p.coords.longitude.toFixed(5)); },
      () => toast.error("Couldn't read your location"),
    );
  };

  const confirm = async () => {
    setErr(null);
    if (name.trim().length < 2) return setErr("Give the batch a name.");
    if (followed === null) return setErr("Say whether you're following the harvest recommendation.");
    if (followed === false && overrideReason.trim().length < 3) return setErr("Add a short reason for overriding.");
    const la = lat ? Number(lat) : null, ln = lng ? Number(lng) : null;
    if ((la !== null && (isNaN(la) || la < -90 || la > 90)) || (ln !== null && (isNaN(ln) || ln < -180 || ln > 180))) return setErr("Coordinates look off — check latitude/longitude.");
    setBusy(true);
    const id = `HT-${to.slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const { data: prof } = await supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle();
    const { error } = await supabase.from("batches").insert({
      id, owner_id: userId, name: name.trim(), floral: floral.trim(), region: forage.trim(), beekeeper: prof?.display_name ?? "",
      harvested: to, harvest_start: from, harvest_end: to, jars, trust_score: 85, status: "draft",
      ai_recommendation: rec.text, ai_verdict: rec.verdict, recommendation_followed: followed,
      override_reason: followed ? null : overrideReason.trim(), forage_location: forage.trim() || null, forage_lat: la, forage_lng: ln,
    });
    if (error) { setBusy(false); return setErr(error.message); }
    const links = await supabase.from("batch_hives").insert(ids.map((hive_id) => ({ batch_id: id, hive_id })));
    await supabase.from("trail_steps").insert({ batch_id: id, position: 0, stage: "Hive harvest", place: forage.trim(), step_date: to, note: `Harvested from ${chosen.map((h) => h.name).join(", ")}.`, submitted_by: userId });
    setBusy(false);
    if (links.error) toast.error(links.error.message);
    toast.success(`Batch ${id} created`);
    qc.invalidateQueries({ queryKey: ["batches"] });
    onClose();
    navigate({ to: "/batches/$id", params: { id } });
  };

  const STEPS = ["Source hives", "Date range", "Preview & confirm"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-background p-6 shadow-2xl animate-slide-in-right sm:p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-3xl">New batch</h2>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X /></Button>
        </div>
        <ol className="mt-5 flex gap-2">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex-1 rounded-full px-3 py-1.5 text-center text-xs font-semibold transition ${i <= step ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`}>{i + 1}. {s}</li>
          ))}
        </ol>

        {step === 0 && (
          <div className="animate-fade-in">
            <p className="mt-6 text-muted-foreground">Tap hives on your map to include them in this batch.</p>
            {hives.isLoading ? <HoneycombLoader label="Opening your hive map…" className="mt-4" /> : hives.data?.length ? (
              <HiveHexGrid hives={hives.data} selected={picked} onHiveClick={(h) => toggle(h.id)} perRow={3} />
            ) : (
              <p className="mt-6 rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground">You have no hives yet. <Link to="/dashboard" className="font-semibold text-primary-deep underline">Add one on the dashboard</Link>.</p>
            )}
            <p className="text-center text-sm font-medium">{picked.size} selected</p>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 grid gap-4 animate-fade-in sm:grid-cols-2">
            <div className="space-y-1.5"><Label htmlFor="from">Harvest window start</Label><Input id="from" type="date" value={from} max={to} onChange={(e) => setFrom(e.target.value)} /></div>
            <div className="space-y-1.5"><Label htmlFor="to">Harvest date (end)</Label><Input id="to" type="date" value={to} max={today} onChange={(e) => setTo(e.target.value)} /></div>
            <p className="text-sm text-muted-foreground sm:col-span-2">Readings logged for {chosen.map((h) => h.name).join(", ")} in this window will be attached as the batch's evidence.</p>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-6 animate-fade-in">
            <section className="rounded-3xl border border-border bg-card p-5">
              <h3 className="text-lg">Pulled-in readings</h3>
              {readings.isLoading ? <HoneycombLoader compact label="Gathering readings…" className="mt-2 justify-start" /> : (
                <>
                  <p className="mt-1 text-sm text-muted-foreground">{readings.data?.length ?? 0} readings from {fmt(from)} to {fmt(to)}{!readings.data?.length && " — using each hive's latest state instead"}.</p>
                  <div className="mt-3 max-h-48 overflow-y-auto text-sm">
                    <table className="w-full">
                      <thead className="text-left text-xs uppercase text-muted-foreground"><tr><th className="py-1">Hive</th><th>Date</th><th>°C</th><th>Hum</th><th>kg</th><th>Act.</th></tr></thead>
                      <tbody>
                        {(readings.data ?? []).map((r) => (
                          <tr key={r.id} className="border-t border-border">
                            <td className="py-1">{chosen.find((h) => h.id === r.hive_id)?.name}</td>
                            <td>{new Date(r.recorded_at).toLocaleDateString()}</td>
                            <td>{Number(r.temperature)}</td><td>{Number(r.humidity)}%</td><td>{Number(r.weight_kg)}</td><td>{r.activity_level}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {chosen.some((h) => h.location) && <p className="mt-3 flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary-deep" /> Forage: {[...new Set(chosen.map((h) => h.location).filter(Boolean))].join(" · ")}</p>}
                </>
              )}
            </section>

            <section className="rounded-3xl border border-primary/50 bg-primary/10 p-5">
              <h3 className="flex items-center gap-2 text-lg"><Sparkles className="h-5 w-5 text-primary-deep" /> Harvest recommendation</h3>
              <p className="mt-2 text-sm">{rec.text}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant={followed === true ? "honeycomb" : "outline"} size="sm" onClick={() => setFollowed(true)}>I'm following it</Button>
                <Button type="button" variant={followed === false ? "honeycomb" : "outline"} size="sm" onClick={() => setFollowed(false)}>I'm overriding it</Button>
              </div>
              {followed === false && <Input className="mt-3" placeholder="Why? e.g. frames fully capped on inspection" value={overrideReason} onChange={(e) => setOverrideReason(e.target.value)} />}
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="bname">Batch name</Label><Input id="bname" value={name} onChange={(e) => setName(e.target.value)} placeholder="Late Summer Clover" /></div>
              <div className="space-y-1.5"><Label htmlFor="floral">Floral source</Label><Input id="floral" value={floral} onChange={(e) => setFloral(e.target.value)} /></div>
              <div className="space-y-1.5"><Label htmlFor="jars">Jars</Label><Input id="jars" type="number" min={0} value={jars} onChange={(e) => setJars(Math.max(0, Number(e.target.value)))} /></div>
              <div className="space-y-1.5 sm:col-span-2"><Label htmlFor="forage">Forage location</Label><Input id="forage" value={forage} onChange={(e) => setForage(e.target.value)} placeholder="Valley meadows, Kodagu" /></div>
              <div className="space-y-1.5"><Label htmlFor="lat">Latitude</Label><Input id="lat" inputMode="decimal" value={lat} onChange={(e) => setLat(e.target.value)} /></div>
              <div className="space-y-1.5"><Label htmlFor="lng">Longitude</Label><Input id="lng" inputMode="decimal" value={lng} onChange={(e) => setLng(e.target.value)} /></div>
              <Button type="button" variant="outline" size="sm" className="sm:col-span-2 sm:justify-self-start" onClick={locate}><MapPin className="h-4 w-4" /> Use my current location</Button>
            </section>
          </div>
        )}

        {err && <p role="alert" className="mt-5 rounded-2xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm text-espresso animate-fade-in">{err}</p>}

        <div className="mt-8 flex justify-between gap-3">
          <Button type="button" variant="ghost" onClick={() => (step ? setStep(step - 1) : onClose())}><ArrowLeft className="h-4 w-4" /> {step ? "Back" : "Cancel"}</Button>
          {step < 2 ? (
            <Button type="button" variant="honeycomb" onClick={next}>Next <ArrowRight className="h-4 w-4" /></Button>
          ) : (
            <Button type="button" variant="honeycomb" onClick={confirm} disabled={busy}>{busy ? <><HoneycombSpinner className="honeycomb-loader-compact" /> Creating…</> : "Confirm batch"}</Button>
          )}
        </div>
      </div>
    </div>
  );
}
