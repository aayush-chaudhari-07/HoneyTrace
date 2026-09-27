import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/useSession";
import { BeeSwarm } from "@/components/BeeSwarm";
import { getMyRoles, type AppRole, PARTNER_ROLES } from "@/lib/roles";

const PUBLIC_NAV_LINKS = [
  { to: "/platform", label: "Platform" },
  { to: "/traceability", label: "Traceability" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const user = useUser();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [roles, setRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    if (user?.id) {
      getMyRoles(user.id).then((r) => setRoles(r));
    } else {
      setRoles([]);
    }
  }, [user?.id]);

  const isInternal = Boolean(
    user || ["/dashboard", "/batches", "/hive", "/partner", "/profile", "/admin"].some((p) => pathname.startsWith(p))
  );

  const isAdmin = roles.includes("admin");
  const isPartnerOnly = roles.some((r) => (PARTNER_ROLES as readonly string[]).includes(r)) && !roles.includes("beekeeper") && !isAdmin;

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      {isInternal && (
        <BeeSwarm
          count={2}
          className="internal-bee-swarm pointer-events-none absolute inset-x-0 -bottom-3 h-10 overflow-hidden"
        />
      )}
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="HoneyTrace Logo"
            className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="font-display text-xl tracking-tight text-foreground group-hover:text-primary-deep transition-colors">
            HoneyTrace
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {PUBLIC_NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeProps={{ className: "text-foreground font-semibold" }}
                className="story-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Authenticated Links based on strictly verified roles */}
          {user && (
            <>
              {isPartnerOnly ? (
                <li>
                  <Link
                    to="/partner"
                    activeProps={{ className: "text-primary-deep font-semibold" }}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Partner Portal
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      activeProps={{ className: "text-primary-deep font-semibold" }}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/batches"
                      activeProps={{ className: "text-primary-deep font-semibold" }}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Batches
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        to="/partner"
                        activeProps={{ className: "text-primary-deep font-semibold" }}
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        Partner Portal
                      </Link>
                    </li>
                  )}
                </>
              )}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin"
                    activeProps={{ className: "text-primary-deep font-semibold" }}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/profile"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border px-2.5 py-1 rounded-full bg-muted/50"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {roles[0] || "member"}
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="active:scale-95">
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/verify">Verify Jar</Link>
              </Button>
              <Button asChild variant="honey" size="sm" className="active:scale-95">
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
