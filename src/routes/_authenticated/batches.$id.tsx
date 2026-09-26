import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QRCode from "qrcode";
import { ArrowLeft, Check, CheckCircle2, Circle, Copy, Download, Lock, MapPin, Sparkles, XCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { HoneyDrip } from "@/components/HoneyDrip";
import { HEX } from "@/components/HiveHexGrid";
import { Reveal } from "@/components/Reveal";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { HoneycombLoader, HoneycombSpinner } from "@/components/HoneycombLoader";
import { CUSTODY, getMyBatch, stageFor, verifyUrl, type ManagedBatch, type ManagedStep } from "@/lib/batch-manage";

export const Route = createFileRoute("/_authenticated/batches/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Batch ${params.id} — HoneyTrace` },
      { name: "description", content: "Batch genealogy, harvest decision, custody timeline and verification QR." },
      { property: "og:title", content: `Batch ${params.id} — HoneyTrace` },
      { property: "og:description", content: "Batch genealogy, harvest decision, custody timeline and verification QR." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BatchDetail,
});

const fmtD = (d: string) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function BatchDetail() {
  const { id } = Route.useParams();
  const q = useQuery({ queryKey: ["batch", id], queryFn: () => getMyBatch(id) });

  if (q.isLoading) return <AppShell><HoneycombLoader label="Opening batch trail…" /></AppShell>;
  const b = q.data;
  if (!b) return (
    <AppShell>
      <p className="text-lg">Batch not found.</p>
      <Link to="/batches" className="mt-3 inline-block font-semibold text-primary-deep underline">Back to batches</Link>
    </AppShell>
  );

  return (
    <AppShell>
      <Link to="/batches" className="inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All batches</Link>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1 animate-fade-in">
        <div className="min-w-0">
          <p className="font-mono text-sm text-muted-foreground">{b.id}</p>
          <h1 className="text-4xl sm:text-5xl">{b.name}</h1>
          <p className="mt-2 text-muted-foreground">{[b.floral, `${b.jars} jars`, `Harvested ${fmtD(b.harvested)}`].filter(Boolean).join(" · ")}</p>
        </div>
        <StatusBadge status={b.status} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-3">
          <Reveal><Genealogy b={b} /></Reveal>
          <Reveal delay={80}><Recommendation b={b} /></Reveal>
          <Reveal delay={160}><Timeline b={b} /></Reveal>
        </div>
        <div className="lg:col-span-2"><Reveal delay={120}><SealCard b={b} /></Reveal></div>
      </div>
      <div className="relative mt-16 h-24"><HoneyDrip /></div>
    </AppShell>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <h2 className="text-2xl">{title}</h2>
      {children}
    </section>
  );
}

function Genealogy({ b }: { b: ManagedBatch }) {
  const hasMap = b.forage_lat != null && b.forage_lng != null;
  const lat = Number(b.forage_lat), lng = Number(b.forage_lng);
  return (
    <Card title="Genealogy">
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Source hives</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {b.batch_hives.length === 0 && <p className="text-sm text-muted-foreground">No source hives linked.</p>}
        {b.batch_hives.map((l) => (
          <Link
            key={l.hive_id}
            to="/hive/$id"
            params={{ id: l.hive_id }}
            className="flex h-16 w-14 items-center justify-center bg-primary px-1 text-center text-[11px] font-semibold leading-tight text-espresso transition hover:scale-110 active:scale-95"
            style={{ clipPath: HEX }}
          >
            {l.hives?.name ?? "Hive"}
          </Link>
        ))}
      </div>
      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <p><span className="text-muted-foreground">Harvest window:</span> {b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)}</p>
        <p className="flex items-center gap-1"><MapPin className="h-4 w-4 text-primary-deep" /> {b.forage_location || b.region || "Location not recorded"}</p>
      </div>
      {hasMap ? (
        <iframe
          title="Forage location map"
          className="mt-4 h-56 w-full rounded-2xl border border-border"
          loading="lazy"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.03},${lat - 0.02},${lng + 0.03},${lat + 0.02}&layer=mapnik&marker=${lat},${lng}`}
        />
      ) : (
        <p className="mt-4 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">No map coordinates were saved for this batch.</p>
      )}
    </Card>
  );
}

function Recommendation({ b }: { b: ManagedBatch }) {
  return (
    <Card title="Harvest decision">
      {b.ai_recommendation ? (
        <>
          <div className="mt-4 rounded-2xl border border-primary/50 bg-primary/10 p-4">
            <p className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-primary-deep" /> AI recommendation at harvest</p>
            <p className="mt-1 text-sm">{b.ai_recommendation}</p>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm font-medium">
            {b.recommendation_followed ? <><CheckCircle2 className="h-5 w-5 text-hive-healthy" /> Beekeeper followed the recommendation</> : <><XCircle className="h-5 w-5 text-primary-deep" /> Beekeeper overrode it</>}
          </p>
          {!b.recommendation_followed && b.override_reason && <p className="mt-1 pl-7 text-sm text-muted-foreground">“{b.override_reason}”</p>}
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">No recommendation was recorded for this batch.</p>
      )}
    </Card>
  );
}

function Timeline({ b }: { b: ManagedBatch }) {
  const byStage = new Map<string, ManagedStep>();
  [...b.trail_steps].sort((x, y) => x.position - y.position).forEach((s) => {
    const k = stageFor(s);
    if (k && !byStage.has(k)) byStage.set(k, s);
  });
  return (
    <Card title="Custody timeline">
      <ol className="relative mt-6">
        {CUSTODY.map((c, i) => {
          const s = byStage.get(c.key);
          const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1]!.key);
          return (
            <li key={c.key} className="relative flex gap-4 pb-8 last:pb-0">
              {i < CUSTODY.length - 1 && (
                <span
                  className="absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full"
                  style={{ background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }}
                />
              )}
              <span
                className={`relative flex h-12 w-12 shrink-0 items-center justify-center transition ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`}
                style={{ clipPath: HEX, animation: s ? undefined : !byStage.has(CUSTODY[i - 1]?.key ?? "") ? undefined : "hex-pulse 2.4s ease-in-out infinite" }}
              >
                {s ? <Check className="h-5 w-5" /> : <Circle className="h-4 w-4" />}
              </span>
              <div className="pt-1.5">
                <p className="font-semibold">{c.label} {!s && <span className="ml-1 text-xs font-normal text-muted-foreground">· pending</span>}</p>
                {s && (
                  <>
                    <p className="text-sm text-muted-foreground">{c.key === "beekeeper" ? b.beekeeper || "Beekeeper" : s.stage}{s.place ? ` · ${s.place}` : ""}</p>
                    <p className="text-xs text-muted-foreground">{fmtD(s.step_date)} · logged {new Date(s.created_at).toLocaleString()}</p>
                    {s.note && <p className="mt-1 text-sm">{s.note}</p>}
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}

function SealCard({ b }: { b: ManagedBatch }) {
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const url = verifyUrl(b.id);
  const sealed = b.status !== "draft";
  const reqs = [
    { ok: b.batch_hives.length > 0, label: "At least one source hive linked" },
    { ok: b.recommendation_followed !== null, label: "Harvest decision recorded" },
    { ok: b.trail_steps.some((s) => stageFor(s) === "beekeeper"), label: "Beekeeper custody step logged" },
    { ok: !!(b.forage_location || b.region), label: "Forage location recorded" },
  ];
  const ready = reqs.every((r) => r.ok);

  useEffect(() => {
    if (!sealed) return;
    QRCode.toDataURL(url, { width: 480, margin: 2, color: { dark: "#2b1d0e", light: "#fdf8ec" } }).then(setQr);
  }, [sealed, url]);

  const seal = async () => {
    setBusy(true);
    const { error } = await supabase.from("batches").update({ status: "sealed", sealed_at: new Date().toISOString() }).eq("id", b.id);
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Batch sealed — QR code ready");
    qc.invalidateQueries({ queryKey: ["batch", b.id] });
    qc.invalidateQueries({ queryKey: ["batches"] });
  };

  if (sealed) {
    return (
      <section className="rounded-3xl border border-primary/60 bg-card p-6 text-center shadow-[var(--shadow-honey)] animate-scale-in">
        <h2 className="text-2xl">Verification QR</h2>
        <p className="mt-1 text-sm text-muted-foreground">Sealed {b.sealed_at ? new Date(b.sealed_at).toLocaleString() : ""}</p>
        <div className="mx-auto mt-5 w-fit rounded-3xl bg-linen p-3">
          {qr ? <img src={qr} alt={`QR code for batch ${b.id}`} className="h-56 w-56 max-w-full" /> : <HoneycombLoader label="Preparing QR…" className="h-56 w-56 max-w-full" />}
        </div>
        <p className="mt-3 font-mono text-sm">{b.id}</p>
        <div className="mt-5 flex flex-col gap-2">
          <Button asChild variant="honeycomb" disabled={!qr}>
            <a href={qr ?? "#"} download={`${b.id}-qr.png`}><Download className="h-4 w-4" /> Download QR</a>
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 text-left text-xs">
            <a href={url} target="_blank" rel="noreferrer" className="flex-1 truncate text-primary-deep underline">{url}</a>
            <Button type="button" variant="ghost" size="icon" aria-label="Copy link" onClick={() => { navigator.clipboard.writeText(url); toast.success("Link copied"); }}><Copy /></Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <h2 className="flex items-center gap-2 text-2xl"><Lock className="h-5 w-5 text-primary-deep" /> Seal batch</h2>
      <p className="mt-1 text-sm text-muted-foreground">Sealing locks the batch and creates its public verification QR code.</p>
      <ul className="mt-4 space-y-2 text-sm">
        {reqs.map((r) => (
          <li key={r.label} className="flex items-center gap-2">
            {r.ok ? <CheckCircle2 className="h-4 w-4 text-hive-healthy" /> : <Circle className="h-4 w-4 text-muted-foreground" />}
            <span className={r.ok ? "" : "text-muted-foreground"}>{r.label}</span>
          </li>
        ))}
      </ul>
      <Button variant="honeycomb" size="lg" className="mt-6 w-full" disabled={!ready || busy} onClick={seal}>
        {busy ? <><HoneycombSpinner className="honeycomb-loader-compact" /> Sealing…</> : "Seal Batch"}
      </Button>
    </section>
  );
}
