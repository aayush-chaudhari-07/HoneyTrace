import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { C as Link2, H as Check, L as Circle, O as FileText, W as Calendar, b as MapPin, c as Star, d as ShieldCheck, f as ShieldAlert } from "../_libs/lucide-react.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-EB1gv_5A.mjs";
import { o as useQueryClient, r as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as HEX } from "./HiveHexGrid-CDqruEYc.mjs";
import { t as CUSTODY } from "./batch-manage-BjrjMpn4.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as HoneyJar } from "./HoneyJar-DUh6gVMy.mjs";
import { n as addTastingNote, r as batchQuery, t as Route } from "./verify._batchId-DfSe1eDm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-nfP0A1V8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/verify.$batchId.tsx?tsr-split=component";
var fmtD = (d) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function stageKey(s) {
	const t = s.stage.toLowerCase();
	return CUSTODY.find((c) => c.match.some((m) => t.includes(m)))?.key ?? null;
}
/** Recompute each ledger block in the browser and confirm the hash chain links up. */
async function sha(text) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function useChainCheck(b) {
	const [state, setState] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			if (!b.steps.length || b.steps.some((s) => !s.block_hash)) return live && setState("none");
			let prev = null;
			for (const s of b.steps) {
				const h = await sha([
					prev ?? "GENESIS",
					b.id,
					String(s.position),
					s.stage,
					s.place ?? "",
					s.step_date,
					s.note ?? ""
				].join("|"));
				if (s.prev_hash !== prev || h !== s.block_hash) return live && setState("broken");
				prev = h;
			}
			if (live) setState("intact");
		})();
		return () => {
			live = false;
		};
	}, [b]);
	return state;
}
function VerifyBatch() {
	const { batchId } = Route.useParams();
	const { data } = useSuspenseQuery(batchQuery(batchId));
	const b = data;
	const chain = useChainCheck(b);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hero, {
			b,
			chain
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 61,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto max-w-2xl space-y-14 px-5 pb-10 pt-4 sm:space-y-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Origin, { b }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Journey, {
					b,
					chain
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 64,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Certificates, { b }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tasting, { b }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 66,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 62,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
			className: "relative mt-6 overflow-hidden py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 3 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "relative font-serif text-lg",
					children: "Powered by HoneyTrace"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 70,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "relative mt-1 text-sm text-muted-foreground",
					children: "Real Honey. Real Journey."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 60,
		columnNumber: 10
	}, this);
}
function TrustRing({ score }) {
	const [v, setV] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / 1200);
			setV(Math.round(score * (1 - Math.pow(1 - p, 3))));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [score]);
	const r = 52, c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative h-36 w-36",
		role: "img",
		"aria-label": `Trust Score ${score} out of 100`,
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			viewBox: "0 0 120 120",
			className: "h-full w-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "60",
				cy: "60",
				r,
				fill: "var(--card)",
				stroke: "var(--border)",
				strokeWidth: "9"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("circle", {
				cx: "60",
				cy: "60",
				r,
				fill: "none",
				stroke: "var(--primary)",
				strokeWidth: "9",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - v / 100)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 97,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "font-serif text-4xl leading-none",
				children: v
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 100,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
				children: "Trust Score"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 101,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 99,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 10
	}, this);
}
function Hero({ b, chain }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "relative overflow-hidden bg-[image:var(--gradient-honey)]/10 pb-10 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, {
			count: 2,
			className: "opacity-60"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-card/80 px-3 py-1 text-xs font-semibold text-primary-deep",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 116,
							columnNumber: 11
						}, this),
						" ",
						chain === "broken" ? "Ledger check failed" : "Verified authentic"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 115,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-5 flex items-end gap-4 sm:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "h-36 w-28 sm:h-44 sm:w-36",
							style: { animation: "jar-bob 5s ease-in-out infinite" },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyJar, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 122,
								columnNumber: 14
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
							distance: 28,
							duration: 2.8,
							className: "-mt-3 scale-75"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 123,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrustRing, { score: b.trust_score }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
					children: b.id
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-1 text-4xl leading-tight sm:text-5xl",
					children: b.name
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-muted-foreground",
					children: [
						b.floral,
						" honey · ",
						b.region
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 129,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: ["Harvested by ", b.beekeeper || "a HoneyTrace beekeeper"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 112,
		columnNumber: 10
	}, this);
}
function Section({ eyebrow, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
			children: eyebrow
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "mt-1 text-3xl",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 145,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-5",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 146,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 143,
		columnNumber: 10
	}, this);
}
function Origin({ b }) {
	const hasMap = b.forage_lat != null && b.forage_lng != null;
	const lat = b.forage_lat ?? 0, lng = b.forage_lng ?? 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
		eyebrow: "Origin",
		title: "Where it began",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 160,
							columnNumber: 80
						}, this), " Harvest"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 160,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 font-semibold",
						children: b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 161,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 159,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 80
						}, this), " Forage area"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 164,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 font-semibold",
						children: b.forage_location || b.region
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 165,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 158,
				columnNumber: 7
			}, this),
			b.hives.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: b.hives.map((h) => /* @__PURE__ */ (void 0)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm",
					children: [
						/* @__PURE__ */ (void 0)("span", {
							className: "h-3 w-3 bg-primary",
							style: { clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 15
						}, this),
						" ",
						h.name,
						h.location ? ` · ${h.location}` : ""
					]
				}, h.name, true, {
					fileName: _jsxFileName,
					lineNumber: 169,
					columnNumber: 29
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 168,
				columnNumber: 30
			}, this),
			hasMap && /* @__PURE__ */ (void 0)("iframe", {
				title: "Forage location map",
				loading: "lazy",
				className: "mt-4 h-52 w-full rounded-2xl border border-border",
				src: `https://www.openstreetmap.org/export/embed.html?bbox=${lng - .03},${lat - .02},${lng + .03},${lat + .02}&layer=mapnik&marker=${lat},${lng}`
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 175,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 157,
		columnNumber: 10
	}, this);
}
function Journey({ b, chain }) {
	const byStage = /* @__PURE__ */ new Map();
	b.steps.forEach((s) => {
		const k = stageKey(s);
		if (k && !byStage.has(k)) byStage.set(k, s);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
		eyebrow: "Custody journey",
		title: "Hive to home",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: `mb-5 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm ${chain === "broken" ? "bg-destructive/10 text-destructive" : "bg-accent"}`,
			children: [
				chain === "checking" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 33
				}, this) : chain === "broken" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-4 w-4" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 114
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link2, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 192,
					columnNumber: 152
				}, this),
				chain === "checking" && "Checking the ledger on your device…",
				chain === "intact" && `Ledger intact — all ${b.steps.length} records re-checked on your device.`,
				chain === "broken" && "Warning: a record doesn't match its ledger seal.",
				chain === "none" && "No sealed ledger records for this batch yet."
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 191,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "relative",
			children: CUSTODY.map((c, i) => {
				const s = byStage.get(c.key);
				const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1].key);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: "relative flex gap-4 pb-8",
						children: [
							i < CUSTODY.length - 1 && /* @__PURE__ */ (void 0)("span", {
								className: "absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full",
								style: { background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 44
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `relative flex h-12 w-12 shrink-0 items-center justify-center ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
								style: { clipPath: HEX },
								children: s ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-5 w-5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 24
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 210,
									columnNumber: 56
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0 pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: [c.label, !s && /* @__PURE__ */ (void 0)("span", {
										className: "ml-1 text-xs font-normal text-muted-foreground",
										children: "· not yet"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 213,
										columnNumber: 64
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 213,
									columnNumber: 19
								}, this), s && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
									/* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											c.key === "beekeeper" ? b.beekeeper || s.stage : s.stage,
											s.place ? ` · ${s.place}` : "",
											" · ",
											fmtD(s.step_date)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 215,
										columnNumber: 23
									}, this),
									s.note && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 text-sm",
										children: s.note
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 216,
										columnNumber: 34
									}, this),
									s.block_hash && /* @__PURE__ */ (void 0)("p", {
										className: "mt-1 truncate font-mono text-[10px] text-muted-foreground",
										title: s.block_hash,
										children: [
											"seal ",
											s.block_hash.slice(0, 16),
											"…"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 217,
										columnNumber: 40
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 212,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 15
					}, this)
				}, c.key, false, {
					fileName: _jsxFileName,
					lineNumber: 202,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 198,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 190,
		columnNumber: 10
	}, this);
}
function Certificates({ b }) {
	const labs = b.steps.filter((s) => stageKey(s) === "lab" || s.document_url);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
		eyebrow: "Certificates",
		title: "Lab verification",
		children: labs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground",
			children: "No lab report has been added to this batch yet."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 233,
			columnNumber: 28
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid gap-3",
			children: labs.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-primary-deep",
						style: { clipPath: HEX },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileText, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 238,
							columnNumber: 14
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 17
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: s.document_label || s.stage
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 240,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									s.place,
									" · ",
									fmtD(s.step_date)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 19
							}, this),
							s.note && /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 text-sm",
								children: s.note
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 30
							}, this),
							s.block_hash && /* @__PURE__ */ (void 0)("p", {
								className: "mt-1 truncate font-mono text-[10px] text-muted-foreground",
								children: ["ref ", s.block_hash.slice(0, 24)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 243,
								columnNumber: 36
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 17
					}, this),
					s.document_url && /* @__PURE__ */ (void 0)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (void 0)("a", {
							href: s.document_url,
							target: "_blank",
							rel: "noreferrer",
							children: "View"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 80
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 245,
						columnNumber: 36
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 235,
				columnNumber: 15
			}, this) }, s.id, false, {
				fileName: _jsxFileName,
				lineNumber: 234,
				columnNumber: 26
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 233,
			columnNumber: 190
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 232,
		columnNumber: 10
	}, this);
}
function Stars({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex gap-1",
		role: onChange ? "radiogroup" : void 0,
		"aria-label": "Rating",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
			type: "button",
			disabled: !onChange,
			onClick: () => onChange?.(n),
			"aria-label": `${n} star${n > 1 ? "s" : ""}`,
			className: onChange ? "transition active:scale-90" : "cursor-default",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `h-5 w-5 ${n <= value ? "fill-primary text-primary" : "text-border"}` }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 260,
				columnNumber: 11
			}, this)
		}, n, false, {
			fileName: _jsxFileName,
			lineNumber: 259,
			columnNumber: 33
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 258,
		columnNumber: 10
	}, this);
}
function Tasting({ b }) {
	const qc = useQueryClient();
	const submit = useServerFn(addTastingNote);
	const [name, setName] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	const [note, setNote] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const m = useMutation({
		mutationFn: () => submit({ data: {
			batchId: b.id,
			name: name || void 0,
			rating,
			note
		} }),
		onSuccess: () => {
			setDone(true);
			setName("");
			setNote("");
			setRating(0);
			qc.invalidateQueries({ queryKey: ["public-batch", b.id] });
			setTimeout(() => setDone(false), 3500);
		},
		onError: () => setErr("Couldn't send your note — please try again.")
	});
	const avg = b.notes.length ? b.notes.reduce((s, n) => s + n.rating, 0) / b.notes.length : 0;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Section, {
		eyebrow: "Tasting notes",
		title: "What tasters say",
		children: [
			b.notes.length > 0 && /* @__PURE__ */ (void 0)("div", {
				className: "-mt-2 mb-4 flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (void 0)(Stars, { value: Math.round(avg) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 299,
						columnNumber: 112
					}, this),
					" ",
					avg.toFixed(1),
					" from ",
					b.notes.length,
					" taster",
					b.notes.length > 1 ? "s" : ""
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 299,
				columnNumber: 30
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				className: "rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-honey)]",
				onSubmit: (e) => {
					e.preventDefault();
					setErr("");
					if (!rating) return setErr("Tap a star to rate this honey.");
					if (note.trim().length < 3) return setErr("Add a few words about the taste.");
					m.mutate();
				},
				children: done ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-8 text-center",
					style: { animation: "success-pop 0.5s ease-out" },
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "mx-auto flex h-14 w-14 items-center justify-center bg-primary text-espresso",
						style: { clipPath: HEX },
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-6 w-6" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 312,
							columnNumber: 12
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-3 font-serif text-2xl",
						children: "Thanks for tasting!"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 307,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm font-medium",
						children: "Your rating"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 315,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stars, {
							value: rating,
							onChange: setRating
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 316,
							columnNumber: 35
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
						value: note,
						onChange: (e) => setNote(e.target.value),
						maxLength: 500,
						rows: 3,
						placeholder: "Floral, buttery, a hint of citrus…",
						"aria-label": "Tasting note",
						className: "mt-4 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 317,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 60,
						placeholder: "Your name (optional)",
						"aria-label": "Your name",
						className: "mt-3 w-full rounded-full border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 318,
						columnNumber: 13
					}, this),
					err && /* @__PURE__ */ (void 0)("p", {
						className: "mt-2 text-sm text-primary-deep",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 319,
						columnNumber: 21
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						variant: "honey",
						size: "lg",
						className: "mt-4 w-full",
						disabled: m.isPending,
						children: m.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 32
						}, this), " Sending…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 30
						}, this) : "Share tasting note"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 314,
					columnNumber: 20
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 300,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "mt-5 space-y-3",
				children: b.notes.map((n) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: n.name || "A honey lover"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 328,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Stars, { value: n.rating }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 329,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 327,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-sm",
							children: n.note
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 331,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: fmtD(n.created_at)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 332,
							columnNumber: 13
						}, this)
					]
				}, n.id, true, {
					fileName: _jsxFileName,
					lineNumber: 326,
					columnNumber: 27
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 325,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 298,
		columnNumber: 10
	}, this);
}
//#endregion
export { VerifyBatch as component };
