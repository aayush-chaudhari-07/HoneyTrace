import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Hexagon, ShieldCheck } from "lucide-react";
import { BatchTrail } from "@/components/BatchTrail";
import { Reveal } from "@/components/Reveal";
import { useQuery } from "@tanstack/react-query";
import { fetchBatches } from "@/lib/batches";
import { HoneycombLoader } from "@/components/HoneycombLoader";
import { EmptyState } from "@/components/EmptyState";
import { BeeSwarm } from "@/components/BeeSwarm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Batch Trail — HoneyTrace" },
      { name: "description", content: "Explore HoneyTrace honey batches and their verified custody trails." },
      { property: "og:title", content: "Batch Trail — HoneyTrace" },
      { property: "og:description", content: "Explore HoneyTrace honey batches and their verified custody trails." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BatchesPage,
});

function BatchesPage() {
  const { data: batches = [], isLoading } = useQuery({ queryKey: ["batches"], queryFn: () => fetchBatches() });
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="relative mx-auto max-w-4xl px-5 py-20">
      <BeeSwarm count={2} />
      <h1 className="text-center text-4xl sm:text-5xl">Batch Trail</h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-muted-foreground">
        Every verified batch, with its full custody chain from hive to shelf.
      </p>
      <div className="mt-10 space-y-4">
        {isLoading && <HoneycombLoader label="Following verified batches…" />}
        {!isLoading && batches.length === 0 && (
          <EmptyState
            title="No verified batches yet"
            description="Beekeepers are preparing the next seasonal harvest. Check back soon or verify a jar code."
            icon={Hexagon}
          />
        )}
        {batches.map((b, i) => (
          <Reveal key={b.id} delay={i * 80}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(open === b.id ? null : b.id)}
              className="h-auto w-full justify-between whitespace-normal rounded-2xl px-6 py-4 text-left"
            >
              <div>
                <p className="font-semibold">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.id} · {b.region} · {b.jars} jars</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-sm font-semibold text-primary-deep">
                  <ShieldCheck className="h-4 w-4" /> {b.trustScore}
                </span>
                <ChevronDown className={`h-5 w-5 transition ${open === b.id ? "rotate-180" : ""}`} />
              </div>
            </Button>
            {open === b.id && <div className="mt-3"><BatchTrail batch={b} /></div>}
          </Reveal>
        ))}
      </div>
    </div>
  );
}
