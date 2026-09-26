import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { queryOptions, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Calendar, Check, Circle, FileText, Link2, MapPin, SearchX, ShieldAlert, ShieldCheck, Star } from "lucide-react";
import { HoneycombSpinner } from "@/components/HoneycombLoader";
import { Button } from "@/components/ui/button";
import { HoneyJar } from "@/components/HoneyJar";
import { HoneyDrip } from "@/components/HoneyDrip";
import { BeeSwarm } from "@/components/BeeSwarm";
import { Reveal } from "@/components/Reveal";
import { HEX } from "@/components/HiveHexGrid";
import { CUSTODY } from "@/lib/batch-manage";
import { addTastingNote, getPublicBatch, type PublicBatch, type PublicStep } from "@/lib/verify.functions";

const batchQuery = (id: string) =>
  queryOptions({ queryKey: ["public-batch", id.toUpperCase()], queryFn: () => getPublicBatch({ data: { id } }) });

export const Route = createFileRoute("/verify/$batchId")({
  loader: async ({ context, params }) => {
    const b = await context.queryClient.ensureQueryData(batchQuery(params.batchId));
    if (!b) throw notFound();
    return { name: b.name, floral: b.floral, region: b.region, score: b.trust_score };
  },
  head: ({ loaderData, params }) => {
    const title = loaderData ? `${loaderData.name} — Verified by HoneyTrace` : `Batch ${params.batchId} — HoneyTrace`;
    const desc = loaderData
      ? `${loaderData.floral} honey from ${loaderData.region}. Trust Score ${loaderData.score}. See its full journey from hive to home.`
      : "See this honey's verified journey from hive to home.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: () => (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <ShieldAlert className="mx-auto h-8 w-8 text-primary-deep" />
      <p className="mt-3 font-semibold">We couldn't load this batch right now.</p>
      <Button asChild variant="honey" className="mt-5"><Link to="/verify">Try again</Link></Button>
    </div>
  ),
  component: VerifyBatch,
});

function NotFound() {
  const { batchId } = Route.useParams();
  return (
    <div className="mx-auto max-w-md px-5 py-24 text-center">
      <SearchX className="mx-auto h-10 w-10 text-destructive" />
      <h1 className="mt-4 text-3xl">No verified batch found</h1>
      <p className="mt-2 text-muted-foreground">We couldn't find <strong>{batchId.toUpperCase()}</strong>. Check the code on your jar — honey that isn't verified won't appear here.</p>
      <Button asChild variant="honey" size="lg" className="mt-6"><Link to="/verify">Enter another code</Link></Button>
    </div>
  );
}

const fmtD = (d: string) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function stageKey(s: PublicStep) {
  const t = s.stage.toLowerCase();
  return CUSTODY.find((c) => c.match.some((m) => t.includes(m)))?.key ?? null;
}

/** Recompute each ledger block in the browser and confirm the hash chain links up. */
async function sha(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function useChainCheck(b: PublicBatch) {
  const [state, setState] = useState<"checking" | "intact" | "broken" | "none">("checking");
  useEffect(() => {
    let live = true;
    (async () => {
      if (!b.steps.length || b.steps.some((s) => !s.block_hash)) return live && setState("none");
      let prev: string | null = null;
      for (const s of b.steps) {
        const h = await sha([prev ?? "GENESIS", b.id, String(s.position), s.stage, s.place ?? "", s.step_date, s.note ?? ""].join("|"));
        if (s.prev_hash !== prev || h !== s.block_hash) return live && setState("broken");
        prev = h;
      }
      if (live) setState("intact");
    })();
    return () => { live = false; };
  }, [b]);
  return state;
}

function VerifyBatch() {
  const { batchId } = Route.useParams();
  const { data } = useSuspenseQuery(batchQuery(batchId));
  const b = data!;
  const chain = useChainCheck(b);
  return (
    <div>
      <Hero b={b} chain={chain} />
      <div className="mx-auto max-w-2xl space-y-14 px-5 pb-10 pt-4 sm:space-y-20">
        <Origin b={b} />
        <Journey b={b} chain={chain} />
        <Certificates b={b} />
        <Tasting b={b} />
      </div>
      <footer className="relative mt-6 overflow-hidden py-16 text-center">
        <BeeSwarm count={3} />
        <p className="relative font-serif text-lg">Powered by HoneyTrace</p>
        <p className="relative mt-1 text-sm text-muted-foreground">Real Honey. Real Journey.</p>
      </footer>
    </div>
  );
}

function TrustRing({ score }: { score: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setV(Math.round(score * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);
  const r = 52, c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36" role="img" aria-label={`Trust Score ${score} out of 100`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="var(--card)" stroke="var(--border)" strokeWidth="9" />
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--primary)" strokeWidth="9" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-serif text-4xl leading-none">{v}</span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Trust Score</span>
      </div>
    </div>
  );
}

function Hero({ b, chain }: { b: PublicBatch; chain: string }) {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-honey)]/10 pb-10 pt-8">
      <BeeSwarm count={2} className="opacity-60" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-card/80 px-3 py-1 text-xs font-semibold text-primary-deep">
          <ShieldCheck className="h-3.5 w-3.5" /> {chain === "broken" ? "Ledger check failed" : "Verified authentic"}
        </span>
        <div className="mt-5 flex items-end gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <div className="h-36 w-28 sm:h-44 sm:w-36" style={{ animation: "jar-bob 5s ease-in-out infinite" }}><HoneyJar /></div>
            <HoneyDrip distance={28} duration={2.8} className="-mt-3 scale-75" />
          </div>
          <TrustRing score={b.trust_score} />
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep">{b.id}</p>
        <h1 className="mt-1 text-4xl leading-tight sm:text-5xl">{b.name}</h1>
        <p className="mt-2 text-muted-foreground">{b.floral} honey · {b.region}</p>
        <p className="text-sm text-muted-foreground">Harvested by {b.beekeeper || "a HoneyTrace beekeeper"}</p>
      </div>
    </section>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep">{eyebrow}</p>
      <h2 className="mt-1 text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Origin({ b }: { b: PublicBatch }) {
  const hasMap = b.forage_lat != null && b.forage_lng != null;
  const lat = b.forage_lat ?? 0, lng = b.forage_lng ?? 0;
  return (
    <Section eyebrow="Origin" title="Where it began">
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4 text-primary-deep" /> Harvest</p>
          <p className="mt-1 font-semibold">{b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary-deep" /> Forage area</p>
          <p className="mt-1 font-semibold">{b.forage_location || b.region}</p>
        </div>
      </div>
      {b.hives.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {b.hives.map((h) => (
            <span key={h.name} className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm">
              <span className="h-3 w-3 bg-primary" style={{ clipPath: HEX }} /> {h.name}{h.location ? ` · ${h.location}` : ""}
            </span>
          ))}
        </div>
      )}
      {hasMap && (
        <iframe
          title="Forage location map"
          loading="lazy"
          className="mt-4 h-52 w-full rounded-2xl border border-border"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.03},${lat - 0.02},${lng + 0.03},${lat + 0.02}&layer=mapnik&marker=${lat},${lng}`}
        />
      )}
    </Section>
  );
}

function Journey({ b, chain }: { b: PublicBatch; chain: string }) {
  const byStage = new Map<string, PublicStep>();
  b.steps.forEach((s) => { const k = stageKey(s); if (k && !byStage.has(k)) byStage.set(k, s); });
  return (
    <Section eyebrow="Custody journey" title="Hive to home">
      <p className={`mb-5 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm ${chain === "broken" ? "bg-destructive/10 text-destructive" : "bg-accent"}`}>
        {chain === "checking" ? <HoneycombSpinner className="honeycomb-loader-compact" /> : chain === "broken" ? <ShieldAlert className="h-4 w-4" /> : <Link2 className="h-4 w-4 text-primary-deep" />}
        {chain === "checking" && "Checking the ledger on your device…"}
        {chain === "intact" && `Ledger intact — all ${b.steps.length} records re-checked on your device.`}
        {chain === "broken" && "Warning: a record doesn't match its ledger seal."}
        {chain === "none" && "No sealed ledger records for this batch yet."}
      </p>
      <ol className="relative">
        {CUSTODY.map((c, i) => {
          const s = byStage.get(c.key);
          const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1]!.key);
          return (
            <Reveal key={c.key} delay={i * 60}>
              <li className="relative flex gap-4 pb-8">
                {i < CUSTODY.length - 1 && (
                  <span className="absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full" style={{ background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }} />
                )}
                <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`} style={{ clipPath: HEX }}>
                  {s ? <Check className="h-5 w-5" /> : <Circle className="h-4 w-4" />}
                </span>
                <div className="min-w-0 pt-1.5">
                  <p className="font-semibold">{c.label}{!s && <span className="ml-1 text-xs font-normal text-muted-foreground">· not yet</span>}</p>
                  {s && (
                    <>
                      <p className="text-sm text-muted-foreground">{c.key === "beekeeper" ? b.beekeeper || s.stage : s.stage}{s.place ? ` · ${s.place}` : ""} · {fmtD(s.step_date)}</p>
                      {s.note && <p className="mt-1 text-sm">{s.note}</p>}
                      {s.block_hash && <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground" title={s.block_hash}>seal {s.block_hash.slice(0, 16)}…</p>}
                    </>
                  )}
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}

function Certificates({ b }: { b: PublicBatch }) {
  const labs = b.steps.filter((s) => stageKey(s) === "lab" || s.document_url);
  return (
    <Section eyebrow="Certificates" title="Lab verification">
      {labs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">No lab report has been added to this batch yet.</p>
      ) : (
        <div className="grid gap-3">
          {labs.map((s) => (
            <Reveal key={s.id}>
              <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-primary-deep" style={{ clipPath: HEX }}><FileText className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{s.document_label || s.stage}</p>
                  <p className="text-sm text-muted-foreground">{s.place} · {fmtD(s.step_date)}</p>
                  {s.note && <p className="mt-1 text-sm">{s.note}</p>}
                  {s.block_hash && <p className="mt-1 truncate font-mono text-[10px] text-muted-foreground">ref {s.block_hash.slice(0, 24)}</p>}
                </div>
                {s.document_url && (
                  <Button asChild variant="outline" size="sm"><a href={s.document_url} target="_blank" rel="noreferrer">View</a></Button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

function Stars({ value, onChange }: { value: number; onChange?: (n: number) => void }) {
  return (
    <div className="flex gap-1" role={onChange ? "radiogroup" : undefined} aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" disabled={!onChange} onClick={() => onChange?.(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} className={onChange ? "transition active:scale-90" : "cursor-default"}>
          <Star className={`h-5 w-5 ${n <= value ? "fill-primary text-primary" : "text-border"}`} />
        </button>
      ))}
    </div>
  );
}

function Tasting({ b }: { b: PublicBatch }) {
  const qc = useQueryClient();
  const submit = useServerFn(addTastingNote);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const m = useMutation({
    mutationFn: () => submit({ data: { batchId: b.id, name: name || undefined, rating, note } }),
    onSuccess: () => {
      setDone(true); setName(""); setNote(""); setRating(0);
      qc.invalidateQueries({ queryKey: ["public-batch", b.id] });
      setTimeout(() => setDone(false), 3500);
    },
    onError: () => setErr("Couldn't send your note — please try again."),
  });
  const avg = b.notes.length ? b.notes.reduce((s, n) => s + n.rating, 0) / b.notes.length : 0;
  return (
    <Section eyebrow="Tasting notes" title="What tasters say">
      {b.notes.length > 0 && <div className="-mt-2 mb-4 flex items-center gap-2 text-sm text-muted-foreground"><Stars value={Math.round(avg)} /> {avg.toFixed(1)} from {b.notes.length} taster{b.notes.length > 1 ? "s" : ""}</div>}
      <form
        className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-honey)]"
        onSubmit={(e) => {
          e.preventDefault(); setErr("");
          if (!rating) return setErr("Tap a star to rate this honey.");
          if (note.trim().length < 3) return setErr("Add a few words about the taste.");
          m.mutate();
        }}
      >
        {done ? (
          <div className="py-8 text-center" style={{ animation: "success-pop 0.5s ease-out" }}>
            <span className="mx-auto flex h-14 w-14 items-center justify-center bg-primary text-espresso" style={{ clipPath: HEX }}><Check className="h-6 w-6" /></span>
            <p className="mt-3 font-serif text-2xl">Thanks for tasting!</p>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium">Your rating</p>
            <div className="mt-2"><Stars value={rating} onChange={setRating} /></div>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={3} placeholder="Floral, buttery, a hint of citrus…" aria-label="Tasting note" className="mt-4 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30" />
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Your name (optional)" aria-label="Your name" className="mt-3 w-full rounded-full border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30" />
            {err && <p className="mt-2 text-sm text-primary-deep">{err}</p>}
            <Button type="submit" variant="honey" size="lg" className="mt-4 w-full" disabled={m.isPending}>
              {m.isPending ? <><HoneycombSpinner className="honeycomb-loader-compact" /> Sending…</> : "Share tasting note"}
            </Button>
          </>
        )}
      </form>
      <ul className="mt-5 space-y-3">
        {b.notes.map((n) => (
          <li key={n.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold">{n.name || "A honey lover"}</p>
              <Stars value={n.rating} />
            </div>
            <p className="mt-1 text-sm">{n.note}</p>
            <p className="mt-1 text-xs text-muted-foreground">{fmtD(n.created_at)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
