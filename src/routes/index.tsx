import { HoneyJar } from "@/components/HoneyJar";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Route as RouteIcon,
  Sparkles,
  Link2,
  QrCode,
  Hexagon,
  ClipboardList,
  BrainCircuit,
  ScanLine,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BeeSwarm from "@/components/BeeSwarm";
import HoneyDrip from "@/components/HoneyDrip";
import Reveal from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HoneyTrace — From Hive to Home, Verified Every Step" },
      {
        name: "description",
        content:
          "HoneyTrace brings full traceability to honey: beekeepers log hive data, AI guides harvest, blockchain records custody, and consumers verify every jar with a scan.",
      },
      { property: "og:title", content: "HoneyTrace — From Hive to Home, Verified Every Step" },
      {
        property: "og:description",
        content:
          "Full honey traceability: hive data, AI-guided harvest, blockchain custody, and one-scan consumer verification.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const STEPS = [
  {
    icon: ClipboardList,
    title: "Beekeeper logs hive data",
    text: "Hive health, weather, and inspections are recorded from the apiary in real time.",
  },
  {
    icon: BrainCircuit,
    title: "AI recommends harvest",
    text: "Smart models read the season and tell beekeepers the perfect moment to harvest.",
  },
  {
    icon: Link2,
    title: "Blockchain records custody",
    text: "Every handoff — hive, extractor, packer, shelf — is sealed into an immutable trail.",
  },
  {
    icon: ScanLine,
    title: "Consumer scans & verifies",
    text: "One QR scan reveals the jar's whole journey, from the exact hive to your home.",
  },
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Live Hive Dashboard",
    text: "Temperature, humidity, weight and colony mood — every hive, one glance.",
  },
  {
    icon: RouteIcon,
    title: "Batch Trail",
    text: "Follow each batch across every custodian with timestamps and locations.",
  },
  {
    icon: Sparkles,
    title: "Smart Harvest AI",
    text: "Season-aware recommendations that protect bees and maximize quality.",
  },
  {
    icon: Hexagon,
    title: "Blockchain Custody",
    text: "Tamper-proof custody records no one can rewrite — not even us.",
  },
  {
    icon: QrCode,
    title: "QR Verification",
    text: "Shoppers scan a jar and instantly see its verified origin story.",
  },
];

function HomePage() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="honeycomb-bg relative overflow-hidden">
        <BeeSwarm count={3} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-20 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28">
          <div>
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase">
                Honey traceability & smart beekeeping
              </p>
              <h1 className="mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
                From Hive to Home —{" "}
                <span className="text-primary-deep italic">Verified Every Step.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                HoneyTrace seals every jar's journey onto an unbreakable trail — so beekeepers
                earn trust, and you always know exactly where your honey has been.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-9 flex flex-wrap gap-4">
              <Button asChild variant="honey" size="lg">
                <Link to="/login">Get Started</Link>
              </Button>
              <Button asChild variant="espresso" size="lg">
                <Link to="/verify">
                  <QrCode /> Verify a Product
                </Link>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={220} className="relative mx-auto w-full max-w-xs lg:max-w-sm">
            <div className="honeycomb-clip absolute inset-6 bg-[image:var(--gradient-honey)] opacity-25 blur-2xl" />
            <div className="relative aspect-[5/6]">
              <HoneyJar />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="relative border-t border-border/60 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase">
              How it works
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Four steps to total trust</h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120}>
                <article className="group relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-honey)]">
                  <span className="absolute top-5 right-5 font-display text-4xl text-primary/30">
                    {i + 1}
                  </span>
                  <span className="honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          {/* honey drips from the last step into the next section */}
          <Reveal delay={200}>
            <HoneyDrip distance={64} className="mt-16" />
          </Reveal>
        </div>
      </section>

      {/* ---------- Features ---------- */}
      <section className="relative overflow-hidden">
        <BeeSwarm count={2} />
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <p className="text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase">
              The platform
            </p>
            <h2 className="mt-4 text-4xl sm:text-5xl">Everything the hive needs</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              One warm, simple system connecting beekeepers, batches and buyers.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <article className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary-deep/40 hover:shadow-[var(--shadow-honey-strong)]">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Trust band ---------- */}
      <section className="honeycomb-bg relative bg-espresso text-background">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.24em] text-primary uppercase">
                Trust, made visible
              </p>
              <h2 className="mt-4 text-4xl text-primary sm:text-5xl">
                A Trust Score no one can fake
              </h2>
              <p className="mt-5 max-w-lg text-background/75">
                Every custody event is written to the blockchain the moment it happens. The Trust
                Score on each jar is computed from that immutable record — it can't be edited,
                backdated, or bought.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-background/85">
                {[
                  "Immutable custody chain from hive to shelf",
                  "Cryptographically signed batch records",
                  "Public verification — no account needed",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={160} className="mx-auto w-full max-w-sm">
              <div className="honeycomb-clip bg-card/10 p-1">
                <div className="honeycomb-clip flex flex-col items-center bg-espresso px-10 py-14 text-center">
                  <span className="font-display text-7xl text-primary">98</span>
                  <span className="mt-2 text-sm tracking-[0.2em] text-background/70 uppercase">
                    Trust Score
                  </span>
                  <span className="mt-5 rounded-full border border-primary/40 px-4 py-1.5 text-xs text-primary">
                    Verified on-chain · Batch HT-2481
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-5 py-24 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">Ready to taste the truth?</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Whether you keep the bees or just love the honey, there's a way in.
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-9 flex flex-wrap justify-center gap-4">
            <Button asChild variant="honeycomb" size="lg">
              <Link to="/login">Join as a Beekeeper</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/explore">Explore a Batch</Link>
            </Button>
          </Reveal>
          <Reveal delay={220}>
            <HoneyDrip distance={48} duration={2.8} className="mt-14 scale-90" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
