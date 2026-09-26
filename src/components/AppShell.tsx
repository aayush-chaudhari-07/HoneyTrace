import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Hexagon, LayoutDashboard, LogOut, Package, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { BeeSwarm } from "@/components/BeeSwarm";
import { Button } from "@/components/ui/button";

const ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/batches", label: "My Batches", icon: Package },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const logout = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };
  const linkCls = "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground active:scale-[0.97]";
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
      <aside className="relative lg:sticky lg:top-20 lg:h-fit lg:w-56 lg:shrink-0">
        <BeeSwarm count={2} className="internal-bee-swarm -top-8 h-12" />
        <nav className="relative flex gap-1 overflow-x-auto rounded-3xl border border-border bg-card p-2 lg:flex-col">
          <p className="hidden items-center gap-2 px-4 pb-3 pt-2 font-display text-lg lg:flex">
            <Hexagon className="h-5 w-5 text-primary-deep" /> Apiary
          </p>
          {ITEMS.map((i) => (
            <Link key={i.to} to={i.to} className={linkCls} activeProps={{ className: cn(linkCls, "bg-accent text-foreground shadow-[var(--shadow-honey)]") }}>
              <i.icon className="h-4 w-4" /> {i.label}
            </Link>
          ))}
          <Button type="button" variant="ghost" onClick={logout} className={cn(linkCls, "h-auto justify-start lg:mt-4")}>
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
