import { cn } from "@/lib/utils";

interface HoneyDripProps {
  /** Fall distance in pixels for the drop. */
  distance?: number;
  /** Seconds for one full drip cycle. */
  duration?: number;
  className?: string;
}

/**
 * Reusable honey-drip motif: a honey bottle gently tilts while a drop falls
 * and lands with a small splash ripple. Drop it at the bottom of any section.
 */
export function HoneyDrip({ distance = 72, duration = 3.2, className }: HoneyDripProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none flex w-full flex-col items-center select-none", className)}
      style={{ ["--drip-distance" as string]: `${distance}px` }}
    >
      {/* bottle */}
      <svg
        width="44"
        height="56"
        viewBox="0 0 44 56"
        fill="none"
        className="origin-top text-primary-deep"
        style={{ animation: `bottle-tilt ${duration * 2}s ease-in-out infinite` }}
      >
        <rect x="18" y="2" width="8" height="8" rx="2" fill="currentColor" />
        <path
          d="M14 12h16l5 10v26a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V22l5-10Z"
          fill="var(--color-primary)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M11 32h22v14a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V32Z" fill="var(--color-primary-deep)" />
        <path d="M18 20l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      {/* falling drop */}
      <div className="relative" style={{ height: distance + 16 }}>
        <svg
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
          className="absolute left-1/2 top-0 -translate-x-1/2"
          style={{ animation: `honey-drop-fall ${duration}s ease-in infinite` }}
        >
          <path
            d="M7 0c2.6 4.4 6 8 6 12a6 6 0 1 1-12 0C1 8 4.4 4.4 7 0Z"
            fill="var(--color-primary)"
          />
          <ellipse cx="4.8" cy="12" rx="1.4" ry="2.4" fill="var(--color-background)" opacity="0.5" />
        </svg>

        {/* splash ripple */}
        <span
          className="absolute left-1/2 h-2 w-8 -translate-x-1/2 rounded-full border-2 border-primary-deep/70"
          style={{
            bottom: 0,
            animation: `honey-splash ${duration}s ease-out infinite`,
          }}
        />
      </div>
    </div>
  );
}

export default HoneyDrip;
