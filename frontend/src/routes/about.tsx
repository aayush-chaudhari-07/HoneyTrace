import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, ShieldCheck, Sparkles, Sprout } from "lucide-react";
import Reveal from "@/components/Reveal";
import BeeSwarm from "@/components/BeeSwarm";
import HoneyDrip from "@/components/HoneyDrip";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Honest Honey Verified — HoneyTrace" },
      {
        name: "description",
        content: "HoneyTrace exists to protect real beekeepers and ensure consumers enjoy 100% pure, verified honey.",
      },
      { property: "og:title", content: "About — Honest Honey Verified — HoneyTrace" },
      {
        property: "og:description",
        content: "HoneyTrace exists to protect real beekeepers and ensure consumers enjoy 100% pure, verified honey.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: Sprout,
    title: "Beekeeper First",
    text: "Empowering small-scale and commercial beekeepers with tools that prove their craft's true worth.",
  },
  {
    icon: ShieldCheck,
    title: "Radical Transparency",
    text: "Every lab certificate, harvest timestamp, and custody handoff is public and verifiable.",
  },
  {
    icon: Sparkles,
    title: "AI & Environmental Harmony",
    text: "Using artificial intelligence to respect bee cycles, preventing over-harvesting and hive stress.",
  },
  {
    icon: Heart,
    title: "Pure & Unadulterated",
    text: "Protecting honey lovers from ultra-processed, syrup-extended, or origin-disguised honey.",
  },
];

function AboutPage() {
  return (
    <div>
      <section className="honeycomb-bg relative overflow-hidden py-20 sm:py-28">
        <BeeSwarm count={3} />
        <div className="mx-auto max-w-6xl px-5 text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep">
              Our Mission
            </p>
            <h1 className="mt-4 text-4xl sm:text-6xl">
              Restoring trust in <span className="italic text-primary-deep">every drop</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              Honey is one of the most adulterated foods on earth. HoneyTrace was born to connect conscientious beekeepers directly with honey lovers through unbreakable proof.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex justify-center gap-4">
            <Button asChild variant="honeycomb" size="lg">
              <Link to="/login">Join as Beekeeper</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/verify">Scan a Product</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal className="text-center">
            <h2 className="text-3xl sm:text-4xl">What drives HoneyTrace</h2>
            <p className="mt-2 text-muted-foreground">Guided by honeybee ecology and immutable cryptography.</p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((val, i) => (
              <Reveal key={val.title} delay={i * 80}>
                <article className="group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-honey)]">
                  <span className="honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
                    <val.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl">{val.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{val.text}</p>
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
