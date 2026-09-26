import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import type { Batch } from "@/lib/batches";
import { Reveal } from "@/components/Reveal";

export function BatchTrail({ batch }: { batch: Batch }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 text-left shadow-[var(--shadow-honey)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-deep">{batch.id}</p>
          <h2 className="mt-1 text-3xl">{batch.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {batch.floral} · {batch.region} · by {batch.beekeeper}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-primary-deep" /> Trust Score {batch.trustScore}
        </div>
      </div>
      <ol className="relative mt-8 space-y-6 border-l-2 border-primary/40 pl-6">
        {batch.trail.map((s, i) => (
          <Reveal key={s.stage} delay={i * 80}>
            <li className="relative">
              <span className="absolute -left-[34px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <p className="font-semibold">{s.stage}</p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {s.place} · {s.date}
              </p>
              <p className="mt-1 text-sm">{s.note}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
