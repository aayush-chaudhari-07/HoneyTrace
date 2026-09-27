import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, BrainCircuit, Droplets, Hexagon, ShieldCheck, Sparkles, Thermometer } from "lucide-react";
import Reveal from "@/components/Reveal";
import HoneyDrip from "@/components/HoneyDrip";
import BeeSwarm from "@/components/BeeSwarm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/platform")({
  head: () => ({
    meta: [
      { title: "Platform — Smart Beekeeping & Telemetry — HoneyTrace" },
      {
        name: "description",
        content: "Smart apiary tools for live hive monitoring, ambient environmental tracking, and AI-guided harvest decisions.",
      },
      { property: "og:title", content: "Platform — Smart Beekeeping & Telemetry — HoneyTrace" },
      {
        property: "og:description",
        content: "Smart apiary tools for live hive monitoring, ambient environmental tracking, and AI-guided harvest decisions.",
      },
    ],
  }),
  component: PlatformPage,
});

const CAPABILITIES = [
  {
    icon: Thermometer,
    title: "Broodnest Thermal Guard",
    text: "Continuous temperature monitoring flags queen loss or brood disease before colony weakness becomes visible.",
  },
  {
    icon: Droplets,
    title: "Humidity & Capping Sensor",
    text: "Track nectar moisture reduction inside the super so honey is harvested at peak maturity and density.",
  },
  {
    icon: Activity,
    title: "Acoustic & Flight Activity",
    text: "Acoustic frequency analysis detects swarming intent, queen cell production, and foraging vigor.",
  },
  {
    icon: BrainCircuit,
    title: "AI Harvest Recommendation Engine",
    text: "Weather forecasts combined with hive weight logs calculate the exact day to harvest without stressing bees.",
  },
  {
    icon: Hexagon,
    title: "Hive Genealogy Graph",
    text: "Link every frame and batch directly back to individual hive origins and seasonal forage maps.",
  },
  {
    icon: ShieldCheck,
    title: "Blockchain Proof Ledger",
    text: "Cryptographically seal harvest events to prevent batch duplication, adulteration, or false origin claims.",
  },
];

function PlatformPage() {
  return (
    <div>
      <section className="honeycomb-bg relative overflow-hidden py-20 sm:py-28">
        <BeeSwarm count={3} />
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep">
              Apiary Intelligence
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl">
              Precision technology for <span className="italic text-primary-deep">honest hives</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              HoneyTrace combines non-invasive hive sensors, ambient intelligence, and cryptographic lineage to turn beekeeping intuition into verifiable proof.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex justify-center gap-4">
            <Button asChild variant="honey" size="lg">
              <Link to="/login">Open Beekeeper Workspace</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/verify">Verify a Jar Code</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="text-3xl sm:text-4xl">Built for modern apiary operations</h2>
            <p className="mt-3 text-muted-foreground">Everything needed from brood inspection to jar sealing.</p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 80}>
                <article className="group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-honey)]">
                  <span className="honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
                    <cap.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cap.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <HoneyDrip distance={52} className="mt-16" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
