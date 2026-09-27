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
        "flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground",
        compact ? "py-1 flex-row" : "min-h-32 py-10",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex items-center justify-center">
        <img
          src="/logo.png"
          alt="HoneyTrace Monogram"
          className={cn("object-contain animate-pulse", compact ? "h-6 w-6" : "h-12 w-12")}
        />
        {!compact && <HoneycombSpinner className="absolute -inset-3 opacity-60 scale-125" />}
      </div>
      <span className="font-medium text-foreground/80">{label}</span>
    </div>
  );
}

export function HoneycombPageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-5">
      <HoneycombLoader label="Following the honey trail…" />
    </div>
  );
}
