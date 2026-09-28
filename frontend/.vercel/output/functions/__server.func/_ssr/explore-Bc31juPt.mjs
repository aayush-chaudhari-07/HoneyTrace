import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { T as Hexagon, V as ChevronDown, b as MapPin, d as ShieldCheck, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as EmptyState } from "./EmptyState-BzEdmw3N.mjs";
import { r as fetchBatches } from "./batches-BXSY02BD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-Bc31juPt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BatchTrail({ batch }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6 text-left shadow-[var(--shadow-honey)] sm:p-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-widest text-primary-deep",
					children: batch.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-3xl",
					children: batch.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						batch.floral,
						" · ",
						batch.region,
						" · by ",
						batch.beekeeper
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary-deep" }),
					" Trust Score ",
					batch.trustScore
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative mt-8 space-y-6 border-l-2 border-primary/40 pl-6",
			children: batch.trail.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 80,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -left-[34px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: s.stage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-1 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
								" ",
								s.place,
								" · ",
								s.date
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: s.note
						})
					]
				})
			}, s.stage))
		})]
	});
}
function BatchesPage() {
	const { data: batches = [], isLoading } = useQuery({
		queryKey: ["batches"],
		queryFn: () => fetchBatches()
	});
	const [open, setOpen] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto max-w-4xl px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 2 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-center text-4xl sm:text-5xl",
				children: "Batch Trail"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-4 max-w-lg text-center text-muted-foreground",
				children: "Every verified batch, with its full custody chain from hive to shelf."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-4",
				children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Following verified batches…" }),
					!isLoading && batches.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No verified batches yet",
						description: "Beekeepers are preparing the next seasonal harvest. Check back soon or verify a jar code.",
						icon: Hexagon
					}),
					batches.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: i * 80,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => setOpen(open === b.id ? null : b.id),
							className: "h-auto w-full justify-between whitespace-normal rounded-2xl px-6 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: b.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									b.id,
									" · ",
									b.region,
									" · ",
									b.jars,
									" jars"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-sm font-semibold text-primary-deep",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }),
										" ",
										b.trustScore
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-5 w-5 transition ${open === b.id ? "rotate-180" : ""}` })]
							})]
						}), open === b.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatchTrail, { batch: b })
						})]
					}, b.id))
				]
			})
		]
	});
}
//#endregion
export { BatchesPage as component };
