import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as FlaskConical, T as Hexagon, _ as QrCode, r as Truck, s as Store, y as Package, z as CircleCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/traceability-C-MLahwH.js
var import_jsx_runtime = require_jsx_runtime();
var CHAIN_STEPS = [
	{
		icon: Hexagon,
		stage: "1. Hive Harvest",
		actor: "Beekeeper",
		detail: "Field telemetry logged: ambient temp, hive weight, forage location & frames extracted."
	},
	{
		icon: FlaskConical,
		stage: "2. Lab Purity Test",
		actor: "Independent Lab",
		detail: "HMF level, moisture content, pollen fingerprint & antibiotic screening uploaded & attached."
	},
	{
		icon: Package,
		stage: "3. Bottling & Seal",
		actor: "Bottling Facility",
		detail: "Batch parsed into glass jars, tamper-proof neck seal applied & unique QR code burned."
	},
	{
		icon: Truck,
		stage: "4. Cold Logistics",
		actor: "Distributor",
		detail: "Transit temperature records and handoff signatures signed into immutable ledger."
	},
	{
		icon: Store,
		stage: "5. Retail Shelf",
		actor: "Stockist / Market",
		detail: "Shelf placement confirmed so consumers receive fresh, unheated honey at retail."
	},
	{
		icon: QrCode,
		stage: "6. Consumer Verification",
		actor: "You",
		detail: "Instant phone scan reveals the jar's entire journey, map coordinates, and trust score."
	}
];
function TraceabilityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "honeycomb-bg relative overflow-hidden py-20 sm:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep",
					children: "Unbroken Custody"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-4xl sm:text-6xl",
					children: ["From hive to jar to shelf — ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-primary-deep",
						children: "verified."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground",
					children: "Commercial honey is frequently blended, heated, or diluted. HoneyTrace locks every batch into an unbroken chain so real honey never gets lost."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 120,
				className: "mt-8 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "honey",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/verify",
						children: "Try Scanning a Jar"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/explore",
						children: "Explore Verified Batches"
					})
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60 bg-secondary/40 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl sm:text-4xl",
						children: "The 6-step custody chain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "No gaps, no retroactive edits, no mystery origin."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 space-y-6",
					children: CHAIN_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "honeycomb-clip flex h-12 w-12 shrink-0 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-semibold",
										children: step.stage
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5 text-xs font-medium text-primary-deep",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }),
											" ",
											step.actor
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: step.detail
								})]
							})]
						})
					}, step.stage))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
						distance: 56,
						className: "mt-16"
					})
				})
			]
		})
	})] });
}
//#endregion
export { TraceabilityPage as component };
