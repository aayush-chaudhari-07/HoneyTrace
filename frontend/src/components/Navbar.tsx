import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/useSession";
import { BeeSwarm } from "@/components/BeeSwarm";

const NAV_LINKS = [
  { to: "/platform", label: "Platform" },
  { to: "/traceability", label: "Traceability" },
  { to: "/about", label: "About" },
] as const;

function HiveMark() {
  return (
    <span className="honeycomb-clip inline-flex h-9 w-9 shrink-0 items-center justify-center bg-[image:var(--gradient-honey)]">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2.5l8 4.6v9.8L12 21.5l-8-4.6V7.1z"
          stroke="var(--color-espresso)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M12 8.2l4 2.3v4.6L12 17.4l-4-2.3v-4.6z" fill="var(--color-espresso)" />
      </svg>
    </span>
  );
}

export function Navbar() {
  const user = useUser();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  
  const isInternal = Boolean(
    user || ["/dashboard", "/batches", "/hive", "/partner", "/profile", "/admin"].some((p) => pathname.startsWith(p))
  );

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
        <Link to="/" className="flex items-center gap-2.5">
          <HiveMark />
          <span className="font-display text-xl tracking-tight">HoneyTrace</span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
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
        </ul>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button asChild variant="honey" size="sm">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>Sign out</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/verify">Verify Jar</Link>
              </Button>
              <Button asChild variant="honey" size="sm">
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
