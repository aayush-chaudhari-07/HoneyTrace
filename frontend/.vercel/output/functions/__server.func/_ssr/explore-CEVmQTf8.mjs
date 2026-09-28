import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { T as Hexagon, V as ChevronDown, b as MapPin, d as ShieldCheck, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as EmptyState } from "./EmptyState-GTNIPb_R.mjs";
import { r as fetchBatches } from "./batches-DD4WwbHo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-CEVmQTf8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/BatchTrail.tsx";
function BatchTrail({ batch }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "rounded-3xl border border-border bg-card p-6 text-left shadow-[var(--shadow-honey)] sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary-deep",
					children: batch.id
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 10,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-1 text-3xl",
					children: batch.name
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 11,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						batch.floral,
						" · ",
						batch.region,
						" · by ",
						batch.beekeeper
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 12,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 9,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 17,
						columnNumber: 11
					}, this),
					" Trust Score ",
					batch.trustScore
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 16,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 8,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "relative mt-8 space-y-6 border-l-2 border-primary/40 pl-6",
			children: batch.trail.map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "absolute -left-[34px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 25,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 24,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "font-semibold",
							children: s.stage
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 27,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "flex items-center gap-1 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 29,
									columnNumber: 17
								}, this),
								" ",
								s.place,
								" · ",
								s.date
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 28,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm",
							children: s.note
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 31,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 23,
					columnNumber: 13
				}, this)
			}, s.stage, false, {
				fileName: _jsxFileName$1,
				lineNumber: 22,
				columnNumber: 11
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 20,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/explore.tsx?tsr-split=component";
function BatchesPage() {
	const { data: batches = [], isLoading } = useQuery({
		queryKey: ["batches"],
		queryFn: () => fetchBatches()
	});
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative mx-auto max-w-4xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 2 }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-center text-4xl sm:text-5xl",
				children: "Batch Trail"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 22,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mx-auto mt-4 max-w-lg text-center text-muted-foreground",
				children: "Every verified batch, with its full custody chain from hive to shelf."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-10 space-y-4",
				children: [
					isLoading && /* @__PURE__ */ (void 0)(HoneycombLoader, { label: "Following verified batches…" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 27,
						columnNumber: 23
					}, this),
					!isLoading && batches.length === 0 && /* @__PURE__ */ (void 0)(EmptyState, {
						title: "No verified batches yet",
						description: "Beekeepers are preparing the next seasonal harvest. Check back soon or verify a jar code.",
						icon: Hexagon
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 28,
						columnNumber: 48
					}, this),
					batches.map((b, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: i * 80,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setOpen(open === b.id ? null : b.id),
							className: "h-auto w-full justify-between whitespace-normal rounded-2xl px-6 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: b.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 32,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									b.id,
									" · ",
									b.region,
									" · ",
									b.jars,
									" jars"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 33,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "flex items-center gap-1 text-sm font-semibold text-primary-deep",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 37,
											columnNumber: 19
										}, this),
										" ",
										b.trustScore
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 36,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronDown, { className: `h-5 w-5 transition ${open === b.id ? "rotate-180" : ""}` }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 39,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 35,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 30,
							columnNumber: 13
						}, this), open === b.id && /* @__PURE__ */ (void 0)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (void 0)(BatchTrail, { batch: b }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 42,
								columnNumber: 53
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 42,
							columnNumber: 31
						}, this)]
					}, b.id, true, {
						fileName: _jsxFileName,
						lineNumber: 29,
						columnNumber: 32
					}, this))
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 26,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 20,
		columnNumber: 10
	}, this);
}
//#endregion
export { BatchesPage as component };
