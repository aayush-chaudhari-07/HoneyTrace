import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Fades + slides route content on every navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div key={pathname} className="animate-page-enter">
      {children}
    </div>
  );
}

export default PageTransition;
