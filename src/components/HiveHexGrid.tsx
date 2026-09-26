import { Check } from "lucide-react";
import { healthOf, type Health, type Hive } from "@/lib/hives";

export const HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
export const HEALTH_FILL: Record<Health, string> = { healthy: "var(--hive-healthy)", attention: "var(--hive-attention)", critical: "var(--hive-critical)" };
export const HEALTH_LABEL: Record<Health, string> = { healthy: "Healthy", attention: "Needs attention", critical: "Critical" };

type Props = {
  hives: Hive[];
  onHiveClick: (h: Hive) => void;
  selected?: Set<string>;
  perRow?: number;
};

/** Honeycomb map of hives. When `selected` is passed, tiles behave like checkboxes. */
export function HiveHexGrid({ hives, onHiveClick, selected, perRow = 4 }: Props) {
  const rows: Hive[][] = [];
  for (let i = 0; i < hives.length; i += perRow) rows.push(hives.slice(i, i + perRow));
  const selecting = !!selected;
  return (
    <div className="mt-6 flex flex-col items-center overflow-x-auto pb-4">
      {rows.map((row, r) => (
        <div key={r} className="flex gap-2" style={{ marginTop: r ? -28 : 0, marginLeft: r % 2 ? 118 : 0 }}>
          {row.map((h) => {
            const s = healthOf(h);
            const on = selected?.has(h.id);
            return (
              <button
                key={h.id}
                type="button"
                role={selecting ? "checkbox" : undefined}
                aria-checked={selecting ? on : undefined}
                onClick={() => onHiveClick(h)}
                aria-label={`${h.name}: ${HEALTH_LABEL[s]}`}
                className={`group relative flex h-[132px] w-[116px] shrink-0 flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.07] active:scale-95 ${selecting && !on ? "opacity-55 saturate-50" : ""}`}
                style={{
                  clipPath: HEX,
                  background: HEALTH_FILL[s],
                  animation: !selecting && s !== "healthy" ? "hex-pulse 2.4s ease-in-out infinite" : undefined,
                }}
              >
                {on && (
                  <span className="honeycomb-clip absolute top-4 flex h-6 w-6 items-center justify-center bg-espresso text-primary animate-scale-in">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                )}
                <span className={`px-3 font-display text-base leading-tight ${s === "critical" ? "text-background" : "text-espresso"}`}>{h.name}</span>
                <span className={`mt-1 text-xs ${s === "critical" ? "text-background/85" : "text-espresso/75"}`}>{Number(h.temperature)}°C · {Number(h.humidity)}%</span>
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
