import { Link } from "@tanstack/react-router";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { to: "/platform", label: "Overview" },
      { to: "/traceability", label: "Traceability" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/login", label: "Login" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="honeycomb-bg mt-24 border-t border-border/70 bg-espresso text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="font-display text-2xl">HoneyTrace</p>
          <p className="mt-3 max-w-sm text-sm text-background/70">
            Hive-to-jar traceability and smart beekeeping, built for honest honey.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-background/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-background/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-background/55">
          © {new Date().getFullYear()} HoneyTrace. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
