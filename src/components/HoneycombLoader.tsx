import { cn } from "@/lib/utils";

type HoneycombLoaderProps = {
  label?: string;
  className?: string;
  compact?: boolean;
};

export function HoneycombSpinner({ className }: { className?: string }) {
  return (
    <span className={cn("honeycomb-loader", className)} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function HoneycombLoader({
  label = "Loading…",
  className,
  compact = false,
}: HoneycombLoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-sm text-muted-foreground",
        compact ? "py-1" : "min-h-32 py-10",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <HoneycombSpinner />
      <span>{label}</span>
    </div>
  );
}

export function HoneycombPageLoader() {
  return (
    <div className="flex min-h-[45vh] items-center justify-center px-5">
      <HoneycombLoader label="Following the honey trail…" />
    </div>
  );
}
