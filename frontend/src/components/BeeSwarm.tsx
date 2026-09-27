import { cn } from "@/lib/utils";

interface BeeSwarmProps {
  /** Number of bees (2-4 recommended). */
  count?: number;
  className?: string;
}

function Bee({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 32 23" fill="none">
      <ellipse cx="13" cy="14" rx="9" ry="6.5" fill="var(--color-primary)" />
      <path d="M10 8.2c1.1 3.6 1.1 7.9 0 11.4" stroke="var(--color-espresso)" strokeWidth="2.2" />
      <path d="M15 8c1.2 3.7 1.2 8 0 11.8" stroke="var(--color-espresso)" strokeWidth="2.2" />
      <circle cx="22" cy="12.6" r="4.2" fill="var(--color-espresso)" />
      <path
        d="M24.6 8.6c1-2.2 3-3.4 4-2.8"
        stroke="var(--color-espresso)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="4"
        fill="var(--color-card)"
        opacity="0.85"
        transform="rotate(-18 12 6)"
      />
    </svg>
  );
}

const PATHS = ["bee-roam-a", "bee-roam-b", "bee-roam-a", "bee-roam-b"];

/**
 * Reusable ambient bee swarm: a few bees drift along soft curved paths across
 * the section, each with its own speed, delay and vertical flutter.
 */
export function BeeSwarm({ count = 3, className }: BeeSwarmProps) {
  const bees = Array.from({ length: Math.min(Math.max(count, 1), 4) });

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className,
      )}
    >
      {bees.map((_, i) => {
        const top = [18, 52, 34, 72][i % 4];
        const duration = [26, 33, 29, 38][i % 4];
        const delay = [0, -7, -14, -19][i % 4];
        const flutter = [2.1, 2.7, 1.8, 3.1][i % 4];
        const size = [22, 18, 26, 16][i % 4] ?? 22;

        return (
          <span
            key={i}
            className="absolute left-0"
            style={{
              top: `${top}%`,
              animation: `${PATHS[i % 4]} ${duration}s linear ${delay}s infinite`,
            }}
          >
            <span
              className="block opacity-80"
              style={{ animation: `bee-flutter ${flutter}s ease-in-out infinite` }}
            >
              <Bee size={size} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default BeeSwarm;
