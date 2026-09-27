import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Check, Eye, EyeOff, FlaskConical, Hexagon, Package, Store, Truck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { HoneyDrip } from "@/components/HoneyDrip";
import { BeeSwarm } from "@/components/BeeSwarm";
import { HoneyJar } from "@/components/HoneyJar";
import { cn } from "@/lib/utils";
import { getMyRoles, homeFor } from "@/lib/roles";
import { HoneycombSpinner } from "@/components/HoneycombLoader";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In or Join — HoneyTrace" },
      { name: "description", content: "Beekeepers, labs, bottlers, distributors and retailers sign in to HoneyTrace to log every step from hive to home." },
      { property: "og:title", content: "Sign In or Join — HoneyTrace" },
      { property: "og:description", content: "Beekeepers and supply-chain partners sign in to HoneyTrace to log every step from hive to home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LoginPage,
});

const ROLES = [
  { id: "beekeeper", label: "Beekeeper", icon: Hexagon },
  { id: "lab", label: "Lab", icon: FlaskConical },
  { id: "bottler", label: "Bottler", icon: Package },
  { id: "distributor", label: "Distributor", icon: Truck },
  { id: "retailer", label: "Retailer", icon: Store },
] as const;
type Role = (typeof ROLES)[number]["id"];
type Mode = "login" | "signup" | "forgot";
type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "role", string | undefined>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role | null>(null);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const goHome = async (userId: string) => {
    setSuccess(true);
    const roles = await getMyRoles(userId);
    setTimeout(() => navigate({ ...homeFor(roles), replace: true }), 1100);
  };

  // Already signed in (or returning from a confirmation link) → go straight to the right place.
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) goHome(data.user.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (): Errors => {
    const e: Errors = {};
    if (mode === "signup" && name.trim().length < 2) e.name = "Tell us your name so partners know who you are.";
    if (!EMAIL_RE.test(email)) e.email = "That email doesn't look quite right.";
    if (mode === "forgot") return e;
    if (mode === "signup") {
      if (password.length < 8) e.password = "Use at least 8 characters for a strong hive lock.";
      if (confirm !== password) e.confirm = "Passwords don't match yet.";
      if (!role) e.role = "Pick the role that best describes you.";
    } else if (!password) e.password = "Enter your password.";
    return e;
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setErrors({});
    setNotice(null);
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    setNotice(null);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setNotice("If that email has an account, a reset link is on its way.");
        toast.success("Password reset email sent.");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/login`, data: { full_name: name.trim(), role } },
        });
        if (error) throw error;

        const user = data.user;
        if (user) {
          // 1. Ensure user row exists in `users` table
          const { error: userErr } = await supabase.from("users").upsert({
            id: user.id,
            email: user.email!,
            name: name.trim(),
            role: role!,
            contact: null,
          });
          if (userErr) console.warn("[Supabase] Users table insert notice:", userErr.message);

          // 2. Ensure role exists in `user_roles` table
          const { error: roleErr } = await supabase.from("user_roles").upsert({
            user_id: user.id,
            role: role as any,
          });
          if (roleErr) console.warn("[Supabase] User roles insert notice:", roleErr.message);

          // 3. Ensure profile exists in `profiles` table
          const { error: profErr } = await supabase.from("profiles").upsert({
            id: user.id,
            display_name: name.trim(),
          });
          if (profErr) console.warn("[Supabase] Profiles insert notice:", profErr.message);
        }

        toast.success(`Account created for ${name.trim()} (${role})!`);

        if (data.session && data.user) {
          await goHome(data.user.id);
        } else {
          setNotice(`Account created! Check ${email} for a confirmation link, or sign in below.`);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in successfully!");
        await goHome(data.user.id);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong during authentication";
      if (/invalid login/i.test(msg)) {
        setErrors({ password: "Email or password isn't right — give it another try." });
      } else {
        toast.error(msg);
        setNotice(`Error: ${msg}`);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* ---------- Visual panel ---------- */}
      <aside className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-background)_0%,var(--color-accent)_45%,var(--color-primary)_100%)] px-8 py-14">
        <div className="honeycomb-bg absolute inset-0 opacity-40" />
        <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl" style={{ animation: "blob-float 9s ease-in-out infinite" }} />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary-deep/25 blur-3xl" style={{ animation: "blob-float 12s ease-in-out infinite reverse" }} />
        <BeeSwarm count={4} />
        
        {/* Gold Monogram HT Logo Emblem */}
        <div className="relative mb-6 flex flex-col items-center">
          <img src="/logo.png" alt="HoneyTrace HT Monogram Logo" className="h-28 w-28 object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105" />
        </div>

        <div className="relative w-36 sm:w-44" style={{ animation: "jar-bob 5s ease-in-out infinite" }}>
          <div className="aspect-[5/6]"><HoneyJar /></div>
        </div>
        <HoneyDrip distance={56} className="relative -mt-2" />
        <blockquote className="relative mt-6 max-w-sm text-center">
          <p className="font-display text-2xl leading-snug sm:text-3xl">
            Every jar carries a story. <span className="italic text-primary-deep">Let's keep it honest, hive to home.</span>
          </p>
        </blockquote>
      </aside>

      {/* ---------- Form panel ---------- */}
      <section className="flex items-center justify-center bg-background px-5 py-12">
        <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-honey)] sm:p-9">
          <div className="mb-6 flex items-center justify-center gap-3 border-b border-border/50 pb-4">
            <img src="/logo.png" alt="HoneyTrace Monogram Logo" className="h-10 w-10 object-contain" />
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">HoneyTrace</span>
          </div>
          {success ? (
            <div className="flex flex-col items-center py-16 text-center">
              <span className="honeycomb-clip flex h-20 w-20 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground" style={{ animation: "success-pop 0.6s ease-out both" }}>
                <Check className="h-9 w-9" strokeWidth={3} />
              </span>
              <p className="mt-6 font-display text-3xl">Welcome to the hive</p>
              <p className="mt-2 text-sm text-muted-foreground">Taking you to your workspace…</p>
            </div>
          ) : (
            <>
              {mode !== "forgot" ? (
                <div role="tablist" className="relative grid grid-cols-2 rounded-full bg-muted p-1">
                  <span
                    aria-hidden
                    className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[image:var(--gradient-honey)] shadow-[var(--shadow-honey)] transition-transform duration-300 ease-out"
                    style={{ transform: mode === "signup" ? "translateX(100%)" : "translateX(0)" }}
                  />
                  {(["login", "signup"] as const).map((m) => (
                    <Button
                      key={m}
                      role="tab"
                      type="button"
                      variant="ghost"
                      aria-selected={mode === m}
                      onClick={() => switchMode(m)}
                      className={cn("relative z-10 h-auto rounded-full py-2.5 text-sm font-semibold hover:shadow-none", mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
                    >
                      {m === "login" ? "Login" : "Sign Up"}
                    </Button>
                  ))}
                </div>
              ) : (
                <Button type="button" variant="link" onClick={() => switchMode("login")} className="h-auto px-0 text-sm text-muted-foreground">← Back to login</Button>
              )}

              <div key={mode} className="animate-fade-in">
                <h1 className="mt-7 text-3xl sm:text-4xl">
                  {mode === "login" ? "Welcome back" : mode === "signup" ? "Join the trail" : "Reset your password"}
                </h1>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {mode === "login" ? "Sign in to your HoneyTrace workspace." : mode === "signup" ? "Create an account for your part of the honey journey." : "We'll email you a link to choose a new one."}
                </p>

                <form onSubmit={submit} noValidate className="mt-7 space-y-4">
                  {mode === "signup" && (
                    <Field label="Name" error={errors.name}>
                      <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={inputCls(errors.name)} placeholder="Meera Iyer" />
                    </Field>
                  )}
                  <Field label="Email" error={errors.email}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" className={inputCls(errors.email)} placeholder="you@apiary.com" />
                  </Field>
                  {mode !== "forgot" && (
                    <Field
                      label="Password"
                      error={errors.password}
                      aside={mode === "login" && (
                        <Button type="button" variant="link" onClick={() => switchMode("forgot")} className="h-auto p-0 text-xs">Forgot password?</Button>
                      )}
                    >
                      <div className="relative">
                        <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} className={cn(inputCls(errors.password), "pr-11")} placeholder="••••••••" />
                        <Button type="button" variant="ghost" size="icon" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:translate-y-[-50%]">
                          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </Field>
                  )}
                  {mode === "signup" && (
                    <>
                      <Field label="Confirm password" error={errors.confirm}>
                        <input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" className={inputCls(errors.confirm)} placeholder="••••••••" />
                      </Field>
                      <div>
                        <p className="mb-2 text-sm font-medium">I am a…</p>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                          {ROLES.map((r) => {
                            const active = role === r.id;
                            return (
                              <button
                                key={r.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => { setRole(r.id); setErrors((x) => ({ ...x, role: undefined })); }}
                                className={cn(
                                  "flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95",
                                  active ? "border-primary-deep bg-accent shadow-[var(--shadow-honey)]" : "border-border bg-background hover:border-primary/60",
                                )}
                              >
                                <r.icon className={cn("h-5 w-5 transition", active ? "text-primary-deep scale-110" : "text-muted-foreground")} />
                                {r.label}
                              </button>
                            );
                          })}
                        </div>
                        {errors.role && <ErrorText>{errors.role}</ErrorText>}
                      </div>
                    </>
                  )}

                  {notice && <p className="rounded-2xl bg-accent px-4 py-3 text-sm">{notice}</p>}

                  <div className="flex justify-center pt-2">
                    <Button type="submit" variant="honeycomb" size="lg" disabled={busy} className="min-w-56 active:scale-95">
                       {busy ? (<><HoneycombSpinner className="honeycomb-loader-compact" /> Connecting…</>) : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
                    </Button>
                  </div>
                </form>
              </div>

              <p className="mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground">
                Consumers don't need an account.{" "}
                <Link to="/verify" className="font-semibold text-primary-deep hover:underline">Just verifying a product? Go here →</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function inputCls(error?: string | undefined) {
  return cn(
    "h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition duration-200 placeholder:text-muted-foreground/70",
    "focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]",
    error ? "border-destructive/50 bg-destructive/5" : "border-input",
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive animate-fade-in">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" /> {children}
    </p>
  );
}

function Field({ label, error, aside, children }: { label: string; error?: string | undefined; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-sm font-medium">
        {label}
        {aside}
      </span>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </label>
  );
}
