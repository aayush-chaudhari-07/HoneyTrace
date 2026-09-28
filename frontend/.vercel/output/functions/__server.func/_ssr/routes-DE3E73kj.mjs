import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Link2, I as ClipboardList, T as Hexagon, _ as QrCode, d as ShieldCheck, g as Route, m as ScanLine, q as BrainCircuit, u as Sparkles, w as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { t as HoneyJar } from "./HoneyJar-B4V-P_E2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DE3E73kj.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "honeycomb-bg relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pt-20 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
						children: "Honey traceability & smart beekeeping"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl",
						children: [
							"From Hive to Home —",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary-deep italic",
								children: "Verified Every Step."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl text-lg text-muted-foreground",
						children: "HoneyTrace seals every jar's journey onto an unbreakable trail — so beekeepers earn trust, and you always know exactly where your honey has been."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 140,
					className: "mt-9 flex flex-wrap gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "honey",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Get Started"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "espresso",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/verify",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {}), " Verify a Product"]
						})
					})]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					delay: 220,
					className: "relative mx-auto w-full max-w-xs lg:max-w-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "honeycomb-clip absolute inset-6 bg-[image:var(--gradient-honey)] opacity-25 blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative aspect-[5/6]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyJar, {})
					})]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative border-t border-border/60 bg-secondary/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
							children: "How it works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl sm:text-5xl",
							children: "Four steps to total trust"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4",
						children: STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: i * 120,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "group relative h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-honey)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute top-5 right-5 font-display text-4xl text-primary/30",
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "honeycomb-clip inline-flex h-12 w-12 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 text-xl",
										children: step.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										children: step.text
									})
								]
							})
						}, step.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 200,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
							distance: 64,
							className: "mt-16"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 2 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary-deep uppercase",
							children: "The platform"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl sm:text-5xl",
							children: "Everything the hive needs"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-4 max-w-2xl text-muted-foreground",
							children: "One warm, simple system connecting beekeepers, batches and buyers."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
					children: FEATURES.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 90,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-2 hover:border-primary-deep/40 hover:shadow-[var(--shadow-honey-strong)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary-deep transition-transform duration-300 group-hover:scale-110",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 text-xl",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: f.text
								})
							]
						})
					}, f.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "honeycomb-bg relative bg-espresso text-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-center gap-12 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-[0.24em] text-primary uppercase",
							children: "Trust, made visible"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-4xl text-primary sm:text-5xl",
							children: "A Trust Score no one can fake"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-lg text-background/75",
							children: "Every custody event is written to the blockchain the moment it happens. The Trust Score on each jar is computed from that immutable record — it can't be edited, backdated, or bought."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-7 space-y-3 text-sm text-background/85",
							children: [
								"Immutable custody chain from hive to shelf",
								"Cryptographically signed batch records",
								"Public verification — no account needed"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-primary" }), item]
							}, item))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 160,
						className: "mx-auto w-full max-w-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "honeycomb-clip bg-card/10 p-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "honeycomb-clip flex flex-col items-center bg-espresso px-10 py-14 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-7xl text-primary",
										children: "98"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 text-sm tracking-[0.2em] text-background/70 uppercase",
										children: "Trust Score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-5 rounded-full border border-primary/40 px-4 py-1.5 text-xs text-primary",
										children: "Verified on-chain · Batch HT-2481"
									})
								]
							})
						})
					})]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-5 py-24 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl sm:text-5xl",
						children: "Ready to taste the truth?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-muted-foreground",
						children: "Whether you keep the bees or just love the honey, there's a way in."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						delay: 140,
						className: "mt-9 flex flex-wrap justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "honeycomb",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Join as a Beekeeper"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/explore",
								children: "Explore a Batch"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 220,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
							distance: 48,
							duration: 2.8,
							className: "mt-14 scale-90"
						})
					})
				]
			})
		})
	] });
}
//#endregion
export { HomePage as component };
