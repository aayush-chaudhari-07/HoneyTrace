import { createFileRoute, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getMyRoles, PARTNER_ROLES } from "@/lib/roles";
import { AppShell } from "@/components/AppShell";
import { HoneycombLoader } from "@/components/HoneycombLoader";

export const Route = createFileRoute("/_authenticated/admin")({
  beforeLoad: async ({ context }) => {
    const roles = await getMyRoles(context.user.id);
    if (!roles.includes("admin")) {
      const isPartner = roles.some((r) => (PARTNER_ROLES as readonly string[]).includes(r as any));
      throw redirect({ to: isPartner ? "/partner" : "/dashboard" });
    }
  },
  head: () => ({
    meta: [
      { title: "Admin — HoneyTrace" },
      { name: "description", content: "HoneyTrace administration overview of members and roles." },
      { property: "og:title", content: "Admin — HoneyTrace" },
      { property: "og:description", content: "HoneyTrace administration overview of members and roles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const roles = useQuery({
    queryKey: ["admin-roles"],
    queryFn: async () => (await supabase.from("user_roles").select("role")).data ?? [],
  });
  const counts = (roles.data ?? []).reduce<Record<string, number>>((a, r) => ({ ...a, [r.role]: (a[r.role] ?? 0) + 1 }), {});
  return (
    <AppShell>
      <h1 className="flex items-center gap-3 text-4xl sm:text-5xl"><ShieldCheck className="h-9 w-9 text-primary-deep" /> Admin</h1>
      {roles.isLoading ? (
        <HoneycombLoader label="Gathering admin member roles…" className="mt-8" />
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Object.entries(counts).map(([role, n]) => (
            <div key={role} className="rounded-3xl border border-border bg-card p-5 shadow-sm">
              <p className="font-display text-3xl">{n}</p>
              <p className="capitalize text-muted-foreground">{role}s</p>
            </div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
