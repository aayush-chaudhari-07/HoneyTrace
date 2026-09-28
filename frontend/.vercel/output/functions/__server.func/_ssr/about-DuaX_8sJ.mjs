import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Heart, d as ShieldCheck, l as Sprout, u as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DuaX_8sJ.js
var import_jsx_runtime = require_jsx_runtime();
var VALUES = [
	{
		icon: Sprout,
		title: "Beekeeper First",
		text: "Empowering small-scale and commercial beekeepers with tools that prove their craft's true worth."
	},
	{
		icon: ShieldCheck,
		title: "Radical Transparency",
		text: "Every lab certificate, harvest timestamp, and custody handoff is public and verifiable."
	},
	{
		icon: Sparkles,
		title: "AI & Environmental Harmony",
		text: "Using artificial intelligence to respect bee cycles, preventing over-harvesting and hive stress."
	},
	{
		icon: Heart,
		title: "Pure & Unadulterated",
		text: "Protecting honey lovers from ultra-processed, syrup-extended, or origin-disguised honey."
	}
];
function AboutPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "honeycomb-bg relative overflow-hidden py-20 sm:py-28",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-5 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.24em] text-primary-deep",
					children: "Our Mission"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-4 text-4xl sm:text-6xl",
					children: ["Restoring trust in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-primary-deep",
						children: "every drop"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground",
					children: "Honey is one of the most adulterated foods on earth. HoneyTrace was born to connect conscientious beekeepers directly with honey lovers through unbreakable proof."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 140,
				className: "mt-8 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "honeycomb",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Join as Beekeeper"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/verify",
						children: "Scan a Product"
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
						children: "What drives HoneyTrace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Guided by honeybee ecology and immutable cryptography."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
					children: VALUES.map((val, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group h-full rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[var(--shadow-honey)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(val.icon, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-xl",
									children: val.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: val.text
								})
							]
						})
					}, val.title))
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
export { AboutPage as component };
