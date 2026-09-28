import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Link2, I as ClipboardList, T as Hexagon, _ as QrCode, d as ShieldCheck, g as Route, m as ScanLine, q as BrainCircuit, u as Sparkles, w as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { t as HoneyJar } from "./HoneyJar-DUh6gVMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BSEiU0Y7.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/index.tsx?tsr-split=component";
var STEPS = [
	{
		icon: ClipboardList,
		title: "Beekeeper logs hive data",
		text: "Hive health, weather, and inspections are recorded from the apiary in real time."
	},
	{
		icon: BrainCircuit,
		title: "AI recommends harvest",
		text: "Smart models read the season and tell beekeepers the perfect moment to harvest."
	},
	{
		icon: Link2,
		title: "Blockchain records custody",
		text: "Every handoff — hive, extractor, packer, shelf — is sealed into an immutable trail."
	},
	{
		icon: ScanLine,
		title: "Consumer scans & verifies",
		text: "One QR scan reveals the jar's whole journey, from the exact hive to your home."
	}
];
var FEATURES = [
	{
		icon: LayoutDashboard,
		title: "Live Hive Dashboard",
		text: "Temperature, humidity, weight and colony mood — every hive, one glance."
	},
	{
		icon: Route,
		title: "Batch Trail",
		text: "Follow each batch across every custodian with timestamps and locations."
	},
	{
		icon: Sparkles,
		title: "Smart Harvest AI",
		text: "Season-aware recommendations that protect bees and maximize quality."
	},
	{
		icon: Hexagon,
		title: "Blockchain Custody",
		text: "Tamper-proof custody records no one can rewrite — not even us."
	},
	{
		icon: QrCode,
		title: "QR Verification",
		text: "Shoppers scan a jar and instantly see its verified origin story."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "honeycomb-bg relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 3 }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pt-20 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
						children: "Honey traceability & smart beekeeping"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl",
						children: [
							"From Hive to Home —",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-primary-deep italic",
								children: "Verified Every Step."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 59,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-6 max-w-xl text-lg text-muted-foreground",
						children: "HoneyTrace seals every jar's journey onto an unbreakable trail — so beekeepers earn trust, and you always know exactly where your honey has been."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 140,
					className: "mt-9 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "honey",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/login",
							children: "Get Started"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 68,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "espresso",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/verify",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 19
							}, this), " Verify a Product"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 71,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 220,
					className: "relative mx-auto w-full max-w-xs lg:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "honeycomb-clip absolute inset-6 bg-[image:var(--gradient-honey)] opacity-25 blur-2xl" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative aspect-[5/6]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyJar, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 80,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative border-t border-border/60 bg-secondary/50",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
							children: "How it works"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 91,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 text-4xl sm:text-5xl",
							children: "Four steps to total trust"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 90,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
							delay: i * 120,
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
								className: "group relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-honey)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "absolute top-5 right-5 font-display text-4xl text-primary/30",
										children: i + 1
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 100,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(step.icon, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 104,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 103,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-5 text-xl",
										children: step.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 106,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: step.text
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 107,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 17
							}, this)
						}, step.title, false, {
							fileName: _jsxFileName,
							lineNumber: 98,
							columnNumber: 37
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 200,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
							distance: 64,
							className: "mt-16"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 2 }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
							children: "The platform"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 text-4xl sm:text-5xl",
							children: "Everything the hive needs"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mx-auto mt-4 max-w-2xl text-muted-foreground",
							children: "One warm, simple system connecting beekeepers, batches and buyers."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 128,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: i * 90,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
							className: "group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary-deep/40 hover:shadow-[var(--shadow-honey-strong)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep transition-transform duration-300 group-hover:scale-110",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(f.icon, { className: "h-6 w-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 137,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "mt-5 text-xl",
									children: f.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 139,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: f.text
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 135,
							columnNumber: 17
						}, this)
					}, f.title, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 37
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 133,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 122,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 120,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "honeycomb-bg relative bg-espresso text-background",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid items-center gap-12 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary uppercase",
							children: "Trust, made visible"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-4 text-4xl text-primary sm:text-5xl",
							children: "A Trust Score no one can fake"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 155,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 max-w-lg text-background/75",
							children: "Every custody event is written to the blockchain the moment it happens. The Trust Score on each jar is computed from that immutable record — it can't be edited, backdated, or bought."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 158,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
							className: "mt-7 space-y-3 text-sm text-background/85",
							children: [
								"Immutable custody chain from hive to shelf",
								"Cryptographically signed batch records",
								"Public verification — no account needed"
							].map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 165,
									columnNumber: 21
								}, this), item]
							}, item, true, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 162
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 163,
							columnNumber: 15
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 151,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 160,
						className: "mx-auto w-full max-w-sm",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "honeycomb-clip bg-card/10 p-1",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "honeycomb-clip flex flex-col items-center bg-espresso px-10 py-14 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-display text-7xl text-primary",
										children: "98"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 174,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mt-2 text-sm tracking-[0.2em] text-background/70 uppercase",
										children: "Trust Score"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 175,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mt-5 rounded-full border border-primary/40 px-4 py-1.5 text-xs text-primary",
										children: "Verified on-chain · Batch HT-2481"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 178,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 172,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 171,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 150,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 149,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 148,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-6xl px-5 py-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-4xl sm:text-5xl",
						children: "Ready to taste the truth?"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mx-auto mt-4 max-w-xl text-muted-foreground",
						children: "Whether you keep the bees or just love the honey, there's a way in."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 140,
						className: "mt-9 flex flex-wrap justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "honeycomb",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/login",
								children: "Join as a Beekeeper"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 199,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 198,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/explore",
								children: "Explore a Batch"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 202,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 201,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 220,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
							distance: 48,
							duration: 2.8,
							className: "mt-14 scale-90"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 206,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 190,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 189,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 47,
		columnNumber: 10
	}, this);
}
//#endregion
export { HomePage as component };
