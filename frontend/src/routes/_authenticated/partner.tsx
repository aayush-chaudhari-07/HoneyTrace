import { useState } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, FlaskConical, Package, Store, Truck, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";
import { getMyRoles, PARTNER_ROLES, type PartnerRole } from "@/lib/roles";
import { CUSTODY, stageFor, type BatchStatus, type ManagedStep } from "@/lib/batch-manage";
import { AppShell } from "@/components/AppShell";
import { HoneycombLoader, HoneycombSpinner } from "@/components/HoneycombLoader";

export const Route = createFileRoute("/_authenticated/partner")({
  beforeLoad: async ({ context }) => {
    const roles = await getMyRoles(context.user.id);
    const isPartnerOrAdmin = roles.includes("admin") || roles.some((r) => (PARTNER_ROLES as readonly string[]).includes(r));
    if (!isPartnerOrAdmin) throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Partner Queue — HoneyTrace" },
      { name: "description", content: "Labs, bottlers, distributors and retailers see honey batches awaiting their custody update." },
      { property: "og:title", content: "Partner Queue — HoneyTrace" },
      { property: "og:description", content: "Role-scoped custody updates for honey batches on HoneyTrace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PartnerPage,
});

type StageKey = (typeof CUSTODY)[number]["key"];

const META: Record<PartnerRole, { label: string; stage: string; key: StageKey; prev: StageKey; awaiting: string; icon: typeof Package }> = {
  lab: { label: "Lab", stage: "Lab test", key: "lab", prev: "beekeeper", awaiting: "Awaiting Lab Test", icon: FlaskConical },
  bottler: { label: "Bottler", stage: "Bottling", key: "bottler", prev: "lab", awaiting: "Awaiting Bottling", icon: Package },
  distributor: { label: "Distributor", stage: "Distribution", key: "distributor", prev: "bottler", awaiting: "Awaiting Distribution", icon: Truck },
  retailer: { label: "Retailer", stage: "Retail", key: "shelf", prev: "distributor", awaiting: "Awaiting Shelf Placement", icon: Store },
};

type QueueBatch = { id: string; name: string; beekeeper: string; region: string; status: BatchStatus; sealed_at: string | null; trail_steps: ManagedStep[] };

function doneStages(b: QueueBatch): Set<StageKey> {
  const s = new Set<StageKey>();
  if (b.status !== "draft") s.add("beekeeper");
  for (const st of b.trail_steps) { const k = stageFor(st); if (k) s.add(k); }
  return s;
}

async function loadQueue(role: PartnerRole): Promise<QueueBatch[]> {
  const { data, error } = await supabase
    .from("batches")
    .select("id,name,beekeeper,region,status,sealed_at,trail_steps(id,stage,place,step_date,note,position,created_at)")
    .neq("status", "draft")
    .order("created_at", { ascending: true });
  if (error) throw error;
  const m = META[role];
  return (data as unknown as QueueBatch[]).filter((b) => {
    const d = doneStages(b);
    return d.has(m.prev) && !d.has(m.key);
  });
}

function PartnerPage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const roles = useQuery({ queryKey: ["roles", user.id], queryFn: () => getMyRoles(user.id) });
  const role = roles.data?.find((r) => (PARTNER_ROLES as readonly string[]).includes(r)) as PartnerRole | undefined;
  const queue = useQuery({ queryKey: ["partner-queue", role], queryFn: () => loadQueue(role!), enabled: !!role });
  const [open, setOpen] = useState<QueueBatch | null>(null);

  if (roles.isLoading) return <AppShell><HoneycombLoader label="Opening partner queue…" /></AppShell>;
  if (!role) {
    return (
      <AppShell><div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="text-3xl">Partner access only</h1>
        <p className="mt-3 text-muted-foreground">This queue is for Lab, Bottler, Distributor and Retailer accounts.</p>
      </div></AppShell>
    );
  }
  const m = META[role];

  return (
    <AppShell>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1">
        <div className="flex min-w-0 items-center gap-4">
          <span className="honeycomb-clip inline-flex h-14 w-14 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground">
            <m.icon className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep">{m.label} queue</p>
            <h1 className="text-4xl sm:text-5xl">{m.awaiting}</h1>
          </div>
        </div>
        <span className="rounded-full border border-border bg-card px-4 py-2 text-sm">
          <strong>{queue.data?.length ?? "…"}</strong> batch{queue.data?.length === 1 ? "" : "es"} pending
        </span>
      </div>

      <div className="mt-10">
        {queue.isLoading ? <HoneycombLoader label="Following custody handoffs…" /> : queue.error ? (
          <p className="text-destructive">{(queue.error as Error).message}</p>
        ) : !queue.data?.length ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center">
            <Check className="mx-auto h-10 w-10 text-primary-deep" />
            <h2 className="mt-3 text-2xl">All caught up</h2>
            <p className="mt-1 text-muted-foreground">No batches are waiting on a {m.stage.toLowerCase()} update right now.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {queue.data.map((b, i) => (
              <Reveal key={b.id} delay={i * 60}>
                <article className="group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-honey)] transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{b.id}</p>
                      <h3 className="mt-1 text-xl">{b.name}</h3>
                      <p className="text-sm text-muted-foreground">Beekeeper: {b.beekeeper || "—"}{b.region ? ` · ${b.region}` : ""}</p>
                    </div>
                    <StatusBadge status={b.status} />
                  </div>
                  <MiniTimeline done={doneStages(b)} current={m.key} />
                  <Button variant="honeycomb" className="mt-5 w-full" onClick={() => setOpen(b)}>Update stage</Button>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {open && (
        <StageForm
          batch={open}
          role={role}
          userId={user.id}
          onClose={() => setOpen(null)}
          onDone={() => { setOpen(null); qc.invalidateQueries({ queryKey: ["partner-queue"] }); }}
        />
      )}
    </AppShell>
  );
}

function MiniTimeline({ done, current }: { done: Set<StageKey>; current: StageKey }) {
  return (
    <ol className="mt-5 flex items-center">
      {CUSTODY.map((c, i) => {
        const isDone = done.has(c.key);
        const isCur = c.key === current;
        return (
          <li key={c.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                className={`honeycomb-clip flex h-7 w-7 items-center justify-center text-[10px] font-bold transition-colors ${
                  isDone ? "bg-primary-deep text-background" : isCur ? "animate-pulse bg-primary text-espresso" : "bg-muted text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </span>
              <span className={`text-[10px] ${isCur ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{c.label}</span>
            </div>
            {i < CUSTODY.length - 1 && (
              <span className={`mx-1 mb-4 h-0.5 flex-1 rounded ${done.has(CUSTODY[i + 1]!.key) || (isDone && CUSTODY[i + 1]!.key === current) ? "bg-primary" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} {...rest} />
    </div>
  );
}

function StageForm({ batch, role, userId, onClose, onDone }: { batch: QueueBatch; role: PartnerRole; userId: string; onClose: () => void; onDone: () => void }) {
  const m = META[role];
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    let place = "";
    let note = "";
    let details: Record<string, string | number | boolean> = {};
    let document_url: string | null = null;
    let document_label: string | null = null;

    if (role === "lab") {
      const moisture = Number(g("moisture"));
      if (!g("lab_name") || !g("result")) return setErr("Lab name and overall result are required.");
      if (g("moisture") && (isNaN(moisture) || moisture < 0 || moisture > 40)) return setErr("Moisture should be a percentage between 0 and 40.");
      place = g("lab_name");
      details = { result: g("result"), moisture: g("moisture"), hmf: g("hmf"), pollen: g("pollen") };
      note = `${g("result")}${g("moisture") ? ` · moisture ${g("moisture")}%` : ""}${g("hmf") ? ` · HMF ${g("hmf")} mg/kg` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
      const file = f.get("certificate") as File | null;
      if (file && file.size) {
        if (file.size > 10 * 1024 * 1024) return setErr("Certificate must be under 10 MB.");
        setBusy(true);
        const path = `${userId}/${batch.id}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const up = await supabase.storage.from("lab-certificates").upload(path, file);
        if (up.error) { setBusy(false); return setErr(up.error.message); }
        const signed = await supabase.storage.from("lab-certificates").createSignedUrl(path, 60 * 60 * 24 * 365 * 5);
        document_url = signed.data?.signedUrl ?? null;
        document_label = `Lab certificate — ${file.name}`;
      }
    } else if (role === "bottler") {
      const jars = Number(g("jars"));
      if (!g("facility")) return setErr("Bottling facility is required.");
      if (!Number.isInteger(jars) || jars <= 0) return setErr("Enter a whole number of jars.");
      if (f.get("sealed") !== "on") return setErr("Please confirm the jars are filled and sealed.");
      place = g("facility");
      details = { jars, sealed: true };
      note = `${jars} jars filled & sealed${g("notes") ? ` · ${g("notes")}` : ""}`;
    } else if (role === "distributor") {
      if (!g("location") || !g("transport")) return setErr("Transport details and current location are required.");
      const t = g("temp");
      if (t && isNaN(Number(t))) return setErr("Temperature should be a number.");
      place = g("location");
      details = { transport: g("transport"), temperature: t };
      note = `${g("transport")}${t ? ` · ${t}°C in transit` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
    } else {
      if (!g("store")) return setErr("Store name / location is required.");
      if (f.get("shelved") !== "on") return setErr("Please confirm the batch is on the shelf.");
      place = g("store");
      details = { shelved: true, shelf: g("shelf") };
      note = `On shelf${g("shelf") ? ` · ${g("shelf")}` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
    }

    setBusy(true);
    const position = Math.max(-1, ...batch.trail_steps.map((s) => s.position)) + 1;
    const { data, error } = await supabase
      .from("trail_steps")
      .insert({ batch_id: batch.id, position, stage: m.stage, place, note, submitted_by: userId, actor_role: role, details, document_url, document_label })
      .select("block_hash")
      .single();
    setBusy(false);
    if (error) return setErr(error.message);
    toast.success(`${m.stage} recorded for ${batch.id}`, { description: `Ledger hash ${data.block_hash?.slice(0, 16)}…` });
    onDone();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <aside className="h-full w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl animate-in slide-in-from-right duration-300" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-xs text-muted-foreground">{batch.id}</p>
            <h2 className="text-2xl">{m.stage} update</h2>
            <p className="text-sm text-muted-foreground">{batch.name}</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close"><X /></Button>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          {role === "lab" && (<>
            <Field label="Lab name" name="lab_name" placeholder="e.g. Nilgiri Food Lab" />
            <div className="space-y-1.5">
              <Label htmlFor="result">Overall result</Label>
              <select id="result" name="result" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option value="">Select…</option><option>Passed</option><option>Passed with notes</option><option>Failed</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Moisture %" name="moisture" inputMode="decimal" placeholder="17.2" />
              <Field label="HMF (mg/kg)" name="hmf" inputMode="decimal" placeholder="12" />
            </div>
            <Field label="Pollen analysis" name="pollen" placeholder="e.g. Eucalyptus dominant" />
            <div className="space-y-1.5">
              <Label htmlFor="certificate">Certificate (PDF or image)</Label>
              <Input id="certificate" name="certificate" type="file" accept="application/pdf,image/*" />
            </div>
          </>)}
          {role === "bottler" && (<>
            <Field label="Bottling facility" name="facility" />
            <Field label="Jar count" name="jars" type="number" min={1} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="sealed" className="h-4 w-4 accent-[var(--primary)]" /> Jars filled and tamper-sealed</label>
          </>)}
          {role === "distributor" && (<>
            <Field label="Transport details" name="transport" placeholder="Carrier, vehicle / tracking no." />
            <Field label="Current location" name="location" placeholder="e.g. Bengaluru warehouse" />
            <Field label="Temperature log °C (optional)" name="temp" inputMode="decimal" />
          </>)}
          {role === "retailer" && (<>
            <Field label="Store / location name" name="store" />
            <Field label="Shelf placement (optional)" name="shelf" placeholder="Aisle 4, organic shelf" />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="shelved" className="h-4 w-4 accent-[var(--primary)]" /> Batch is placed on the shelf</label>
          </>)}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea id="notes" name="notes" rows={3} />
          </div>
          {err && <p className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground">{err}</p>}
          <Button type="submit" variant="honeycomb" size="lg" className="w-full" disabled={busy}>
            {busy ? (<><HoneycombSpinner className="honeycomb-loader-compact" /> Recording…</>) : `Record ${m.stage.toLowerCase()}`}
          </Button>
        </form>
      </aside>
    </div>
  );
}
