import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, QrCode, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QrScanner } from "@/components/QrScanner";
import { HoneyDrip } from "@/components/HoneyDrip";
import { BeeSwarm } from "@/components/BeeSwarm";
import { extractCode, SAMPLE_CODES } from "@/lib/batches";

export const Route = createFileRoute("/verify/")({
  head: () => ({
    meta: [
      { title: "Verify Your Honey — HoneyTrace" },
      { name: "description", content: "Scan the QR code on your honey jar or enter its batch code to see its verified journey from hive to home." },
      { property: "og:title", content: "Verify Your Honey — HoneyTrace" },
      { property: "og:description", content: "Scan the QR code on your jar to see its verified journey from hive to home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { code?: string } => (typeof s["code"] === "string" ? { code: s["code"] as string } : {}),
  component: VerifyEntry,
});

function VerifyEntry() {
  const { code: legacy } = Route.useSearch();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(false);

  const go = (raw: string) => {
    const id = extractCode(raw);
    if (!/^HT-\d{4}-[A-Z0-9]+$/.test(id)) {
      setError("That doesn't look like a HoneyTrace code — it starts with HT-, like HT-2026-0412.");
      return;
    }
    navigate({ to: "/verify/$batchId", params: { batchId: id } });
  };

  useEffect(() => {
    if (legacy) navigate({ to: "/verify/$batchId", params: { batchId: extractCode(legacy) }, replace: true });
  }, [legacy, navigate]);

  return (
    <div className="relative overflow-hidden">
      <BeeSwarm count={3} className="opacity-70" />
      <div className="relative mx-auto flex max-w-md flex-col items-center px-5 pb-16 pt-12 text-center sm:max-w-lg sm:pt-20">
        <span className="honeycomb-clip inline-flex h-16 w-16 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
          <QrCode className="h-7 w-7" />
        </span>
        <HoneyDrip distance={40} className="-mt-1" />
        <h1 className="mt-2 text-4xl sm:text-5xl">Is your honey real?</h1>
        <p className="mt-3 text-muted-foreground">Scan the QR code on your jar, or type the code printed under it. No account needed.</p>

        <Button variant="honey" size="lg" className="mt-8 h-14 w-full text-base" onClick={() => setScanning((s) => !s)}>
          <Camera className="h-5 w-5" /> {scanning ? "Close camera" : "Scan QR code"}
        </Button>
        {scanning && (
          <div className="mt-4 w-full">
            <QrScanner onResult={(t) => { setScanning(false); go(t); }} onClose={() => setScanning(false)} />
          </div>
        )}

        <div className="my-6 flex w-full items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> or enter code <span className="h-px flex-1 bg-border" />
        </div>
        <form className="grid w-full gap-2 min-[390px]:grid-cols-[minmax(0,1fr)_auto]" onSubmit={(e) => { e.preventDefault(); go(code); }}>
          <input
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            placeholder="HT-2026-0412"
            aria-label="Batch code"
            autoCapitalize="characters"
            className="min-w-0 flex-1 rounded-full border border-input bg-card px-5 py-3 text-base uppercase outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
          />
          <Button type="submit" variant="honey" size="lg">Verify</Button>
        </form>
        {error && <p className="mt-2 text-sm text-primary-deep">{error}</p>}
        <p className="mt-5 text-xs text-muted-foreground">
          Try a sample:
          {SAMPLE_CODES.map((c) => (
            <Button key={c} type="button" variant="link" size="sm" onClick={() => go(c)} className="mx-1 h-auto p-0 text-xs">{c}</Button>
          ))}
        </p>
        <p className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary-deep" /> Every step is sealed in a tamper-evident ledger.
        </p>
      </div>
    </div>
  );
}
