import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { H as Check } from "../_libs/lucide-react.mjs";
import { r as healthOf } from "./hives-BWAnFRys.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HiveHexGrid-CDqruEYc.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/HiveHexGrid.tsx";
var HEX = "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)";
var HEALTH_FILL = {
	healthy: "var(--hive-healthy)",
	attention: "var(--hive-attention)",
	critical: "var(--hive-critical)"
};
var HEALTH_LABEL = {
	healthy: "Healthy",
	attention: "Needs attention",
	critical: "Critical"
};
/** Honeycomb map of hives. When `selected` is passed, tiles behave like checkboxes. */
function HiveHexGrid({ hives, onHiveClick, selected, perRow = 4 }) {
	const rows = [];
	for (let i = 0; i < hives.length; i += perRow) rows.push(hives.slice(i, i + perRow));
	const selecting = !!selected;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-6 flex flex-col items-center overflow-x-auto pb-4",
		children: rows.map((row, r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex gap-2",
			style: {
				marginTop: r ? -28 : 0,
				marginLeft: r % 2 ? 118 : 0
			},
			children: row.map((h) => {
				const s = healthOf(h);
				const on = selected?.has(h.id);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					role: selecting ? "checkbox" : void 0,
					"aria-checked": selecting ? on : void 0,
					onClick: () => onHiveClick(h),
					"aria-label": `${h.name}: ${HEALTH_LABEL[s]}`,
					className: `group relative flex h-[132px] w-[116px] shrink-0 flex-col items-center justify-center text-center transition duration-300 hover:scale-[1.07] active:scale-95 ${selecting && !on ? "opacity-55 saturate-50" : ""}`,
					style: {
						clipPath: HEX,
						background: HEALTH_FILL[s],
						animation: !selecting && s !== "healthy" ? "hex-pulse 2.4s ease-in-out infinite" : void 0
					},
					children: [
						on && /* @__PURE__ */ (void 0)("span", {
							className: "honeycomb-clip absolute top-4 flex h-6 w-6 items-center justify-center bg-espresso text-primary animate-scale-in",
							children: /* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 44,
								columnNumber: 21
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 43,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `px-3 font-display text-base leading-tight ${s === "critical" ? "text-background" : "text-espresso"}`,
							children: h.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 47,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `mt-1 text-xs ${s === "critical" ? "text-background/85" : "text-espresso/75"}`,
							children: [
								Number(h.temperature),
								"°C · ",
								Number(h.humidity),
								"%"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 48,
							columnNumber: 17
						}, this)
					]
				}, h.id, true, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 15
				}, this);
			})
		}, r, false, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 9
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 21,
		columnNumber: 5
	}, this);
}
//#endregion
export { HiveHexGrid as n, HEX as t };
