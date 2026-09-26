import { STATUS_META, type BatchStatus } from "@/lib/batch-manage";

export function StatusBadge({ status }: { status: BatchStatus }) {
  const m = STATUS_META[status] ?? STATUS_META.draft;
  return (
    <span
      className="inline-flex h-7 items-center px-4 text-xs font-semibold uppercase tracking-wide"
      style={{ background: m.bg, color: m.fg, clipPath: "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)" }}
    >
      {m.label}
    </span>
  );
}
