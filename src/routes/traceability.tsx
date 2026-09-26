import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FlaskConical, Hexagon, Package, QrCode, Store, Truck } from "lucide-react";
import Reveal from "@/components/Reveal";
import BeeSwarm from "@/components/BeeSwarm";
import HoneyDrip from "@/components/HoneyDrip";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/traceability")({
  head: () => ({
    meta: [
      { title: "Traceability — Hive to Home — HoneyTrace" },
      {
        name: "description",
        content: "Follow every jar of honey back to its hive, harvest date, lab test certificates, and beekeeper custody.",
      },
      { property: "og:title", content: "Traceability — Hive to Home — HoneyTrace" },
      {
        property: "og:description",
        content: "Follow every jar of honey back to its hive, harvest date, lab test certificates, and beekeeper custody.",
      },
    ],
  }),
  component: TraceabilityPage,
});

const CHAIN_STEPS = [
  {
    icon: Hexagon,
    stage: "1. Hive Harvest",
    actor: "Beekeeper",
    detail: "Field telemetry logged: ambient temp, hive weight, forage location & frames extracted.",
  },
  {
    icon: FlaskConical,
    stage: "2. Lab Purity Test",
    actor: "Independent Lab",
    detail: "HMF level, moisture content, pollen fingerprint & antibiotic screening uploaded & attached.",
  },
  {
    icon: Package,
    stage: "3. Bottling & Seal",
    actor: "Bottling Facility",
    detail: "Batch parsed into glass jars, tamper-proof neck seal applied & unique QR code burned.",
  },
  {
    icon: Truck,
    stage: "4. Cold Logistics",
    actor: "Distributor",
    detail: "Transit temperature records and handoff signatures signed into immutable ledger.",
  },
  {
    icon: Store,
    stage: "5. Retail Shelf",
    actor: "Stockist / Market",
    detail: "Shelf placement confirmed so consumers receive fresh, unheated honey at retail.",
  },
  {
    icon: QrCode,
    stage: "6. Consumer Verification",
    actor: "You",
    detail: "Instant phone scan reveals the jar's entire journey, map coordinates, and trust score.",
  },
];

function TraceabilityPage() {
  return (
    <div>
      <section className="honeycomb-bg relative overflow-hidden py-20 sm:py-28">
        <BeeSwarm count={3} />
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep">
              Unbroken Custody
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl">
              From hive to jar to shelf — <span className="italic text-primary-deep">verified.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Commercial honey is frequently blended, heated, or diluted. HoneyTrace locks every batch into an unbroken chain so real honey never gets lost.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex justify-center gap-4">
            <Button asChild variant="honey" size="lg">
              <Link to="/verify">Try Scanning a Jar</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/explore">Explore Verified Batches</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal className="text-center">
            <h2 className="text-3xl sm:text-4xl">The 6-step custody chain</h2>
            <p className="mt-2 text-muted-foreground">No gaps, no retroactive edits, no mystery origin.</p>
          </Reveal>

          <div className="mt-14 space-y-6">
            {CHAIN_STEPS.map((step, i) => (
              <Reveal key={step.stage} delay={i * 70}>
                <div className="flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)]">
                  <span className="honeycomb-clip flex h-12 w-12 shrink-0 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-xl font-semibold">{step.stage}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-deep">
                        <CheckCircle2 className="h-4 w-4" /> {step.actor}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <HoneyDrip distance={56} className="mt-16" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
