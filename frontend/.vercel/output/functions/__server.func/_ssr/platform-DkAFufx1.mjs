import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Hexagon, X as Activity, d as ShieldCheck, j as Droplets, o as Thermometer, q as BrainCircuit } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/platform-DkAFufx1.js
var import_jsx_runtime = require_jsx_runtime();
var CAPABILITIES = [
	{
		icon: Thermometer,
		title: "Broodnest Thermal Guard",
		text: "Continuous temperature monitoring flags queen loss or brood disease before colony weakness becomes visible."
	},
	{
		icon: Droplets,
		title: "Humidity & Capping Sensor",
		text: "Track nectar moisture reduction inside the super so honey is harvested at peak maturity and density."
	},
	{
		icon: Activity,
		title: "Acoustic & Flight Activity",
		text: "Acoustic frequency analysis detects swarming intent, queen cell production, and foraging vigor."
	},
	{
		icon: BrainCircuit,
		title: "AI Harvest Recommendation Engine",
		text: "Weather forecasts combined with hive weight logs calculate the exact day to harvest without stressing bees."
	},
	{
		icon: Hexagon,
		title: "Hive Genealogy Graph",
		text: "Link every frame and batch directly back to individual hive origins and seasonal forage maps."
	},
	{
		icon: ShieldCheck,
		title: "Blockchain Proof Ledger",
		text: "Cryptographically seal harvest events to prevent batch duplication, adulteration, or false origin claims."
	}
];
function PlatformPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "honeycomb-bg relative overflow-hidden py-20 sm:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep",
					children: "Apiary Intelligence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-4xl sm:text-6xl",
					children: ["Precision technology for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-primary-deep",
						children: "honest hives"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground",
					children: "HoneyTrace combines non-invasive hive sensors, ambient intelligence, and cryptographic lineage to turn beekeeping intuition into verifiable proof."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 120,
				className: "mt-8 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "honey",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Open Beekeeper Workspace"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/verify",
						children: "Verify a Jar Code"
					})
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-t border-border/60 bg-secondary/40 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl sm:text-4xl",
						children: "Built for modern apiary operations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted-foreground",
						children: "Everything needed from brood inspection to jar sealing."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: CAPABILITIES.map((cap, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-honey)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(cap.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-xl",
									children: cap.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: cap.text
								})
							]
						})
					}, cap.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
						distance: 52,
						className: "mt-16"
					})
				})
			]
		})
	})] });
}
//#endregion
export { PlatformPage as component };
