import type { LucideIcon } from "lucide-react";
import { Hexagon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

export function EmptyState({
  title,
  description,
  action,
  icon: Icon = Hexagon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("empty-state-illustration px-5 py-12 text-center sm:py-16", className)}>
      <div className="relative mx-auto h-24 w-32" aria-hidden="true">
        <span className="honeycomb-clip absolute left-1 top-7 h-12 w-12 bg-secondary" />
        <span className="honeycomb-clip absolute right-1 top-3 h-14 w-14 bg-accent" />
        <span className="honeycomb-clip absolute left-1/2 top-9 flex h-16 w-16 -translate-x-1/2 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground shadow-[var(--shadow-honey)]">
          <Icon className="h-7 w-7" />
        </span>
      </div>
      <h3 className="mt-2 text-2xl">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
