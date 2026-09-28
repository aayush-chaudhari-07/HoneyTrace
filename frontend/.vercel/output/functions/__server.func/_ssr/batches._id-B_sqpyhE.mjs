import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Check, L as Circle, M as Download, N as Copy, R as CircleX, S as Lock, Y as ArrowLeft, b as MapPin, u as Sparkles, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { t as Route } from "./batches._id-3lK-Gprk.mjs";
import { t as HEX } from "./HiveHexGrid-CDqruEYc.mjs";
import { c as verifyUrl, r as getMyBatch, s as stageFor, t as CUSTODY } from "./batch-manage-BjrjMpn4.mjs";
import { t as StatusBadge } from "./StatusBadge-K6uhTTNS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches._id-B_sqpyhE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/batches.$id.tsx?tsr-split=component";
var fmtD = (d) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function BatchDetail() {
	const { id } = Route.useParams();
	const q = useQuery({
		queryKey: ["batch", id],
		queryFn: () => getMyBatch(id)
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Opening batch trail…" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 37
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 30,
		columnNumber: 27
	}, this);
	const b = q.data;
	if (!b) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "text-lg",
		children: "Batch not found."
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
		to: "/batches",
		className: "mt-3 inline-block font-semibold text-primary-deep underline",
		children: "Back to batches"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 32,
		columnNumber: 18
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/batches",
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 37,
				columnNumber: 133
			}, this), " All batches"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1 animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-mono text-sm text-muted-foreground",
						children: b.id
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-5xl",
						children: b.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							b.floral,
							`${b.jars} jars`,
							`Harvested ${fmtD(b.harvested)}`
						].filter(Boolean).join(" · ")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 39,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { status: b.status }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 38,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6 lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Genealogy, { b }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Recommendation, { b }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 50,
							columnNumber: 30
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: 160,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Timeline, { b }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 31
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 51,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SealCard, { b }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 60
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 40
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative mt-16 h-24",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 55,
				columnNumber: 44
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 55,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 10
	}, this);
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-2xl",
			children: title
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this), children]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 10
	}, this);
}
function Genealogy({ b }) {
	const hasMap = b.forage_lat != null && b.forage_lng != null;
	const lat = Number(b.forage_lat), lng = Number(b.forage_lng);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		title: "Genealogy",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Source hives"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 79,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [b.batch_hives.length === 0 && /* @__PURE__ */ (void 0)("p", {
					className: "text-sm text-muted-foreground",
					children: "No source hives linked."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 81,
					columnNumber: 40
				}, this), b.batch_hives.map((l) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/hive/$id",
					params: { id: l.hive_id },
					className: "flex h-16 w-14 items-center justify-center bg-primary px-1 text-center text-[11px] font-semibold leading-tight text-espresso transition hover:scale-110 active:scale-95",
					style: { clipPath: HEX },
					children: l.hives?.name ?? "Hive"
				}, l.hive_id, false, {
					fileName: _jsxFileName,
					lineNumber: 82,
					columnNumber: 33
				}, this))]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 80,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 grid gap-3 text-sm sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "text-muted-foreground",
						children: "Harvest window:"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 12
					}, this),
					" ",
					b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 91,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MapPin, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 92,
							columnNumber: 48
						}, this),
						" ",
						b.forage_location || b.region || "Location not recorded"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 92,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 7
			}, this),
			hasMap ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("iframe", {
				title: "Forage location map",
				className: "mt-4 h-56 w-full rounded-2xl border border-border",
				loading: "lazy",
				src: `https://www.openstreetmap.org/export/embed.html?bbox=${lng - .03},${lat - .02},${lng + .03},${lat + .02}&layer=mapnik&marker=${lat},${lng}`
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 17
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground",
				children: "No map coordinates were saved for this batch."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 94,
				columnNumber: 286
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 78,
		columnNumber: 10
	}, this);
}
function Recommendation({ b }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		title: "Harvest decision",
		children: b.ai_recommendation ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 rounded-2xl border border-primary/50 bg-primary/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 74
					}, this), " AI recommendation at harvest"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-1 text-sm",
					children: b.ai_recommendation
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 106,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 11
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-4 flex items-center gap-2 text-sm font-medium",
				children: b.recommendation_followed ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-5 w-5 text-hive-healthy" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 44
				}, this), " Beekeeper followed the recommendation"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 42
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleX, { className: "h-5 w-5 text-primary-deep" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 144
				}, this), " Beekeeper overrode it"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 109,
					columnNumber: 142
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 108,
				columnNumber: 11
			}, this),
			!b.recommendation_followed && b.override_reason && /* @__PURE__ */ (void 0)("p", {
				className: "mt-1 pl-7 text-sm text-muted-foreground",
				children: [
					"“",
					b.override_reason,
					"”"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 63
			}, this)
		] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 30
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "No recommendation was recorded for this batch."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 112,
			columnNumber: 15
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 10
	}, this);
}
function Timeline({ b }) {
	const byStage = /* @__PURE__ */ new Map();
	[...b.trail_steps].sort((x, y) => x.position - y.position).forEach((s) => {
		const k = stageFor(s);
		if (k && !byStage.has(k)) byStage.set(k, s);
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
		title: "Custody timeline",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
			className: "relative mt-6",
			children: CUSTODY.map((c, i) => {
				const s = byStage.get(c.key);
				const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1].key);
				return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "relative flex gap-4 pb-8 last:pb-0",
					children: [
						i < CUSTODY.length - 1 && /* @__PURE__ */ (void 0)("span", {
							className: "absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full",
							style: { background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 131,
							columnNumber: 42
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: `relative flex h-12 w-12 shrink-0 items-center justify-center transition ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
							style: {
								clipPath: HEX,
								animation: s ? void 0 : !byStage.has(CUSTODY[i - 1]?.key ?? "") ? void 0 : "hex-pulse 2.4s ease-in-out infinite"
							},
							children: s ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 22
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 138,
								columnNumber: 54
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-semibold",
								children: [
									c.label,
									" ",
									!s && /* @__PURE__ */ (void 0)("span", {
										className: "ml-1 text-xs font-normal text-muted-foreground",
										children: "· pending"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 63
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 141,
								columnNumber: 17
							}, this), s && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground",
									children: [c.key === "beekeeper" ? b.beekeeper || "Beekeeper" : s.stage, s.place ? ` · ${s.place}` : ""]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 143,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										fmtD(s.step_date),
										" · logged ",
										new Date(s.created_at).toLocaleString()
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 21
								}, this),
								s.note && /* @__PURE__ */ (void 0)("p", {
									className: "mt-1 text-sm",
									children: s.note
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 32
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 142,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 140,
							columnNumber: 15
						}, this)
					]
				}, c.key, true, {
					fileName: _jsxFileName,
					lineNumber: 130,
					columnNumber: 16
				}, this);
			})
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 126,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 125,
		columnNumber: 10
	}, this);
}
function SealCard({ b }) {
	const qc = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [qr, setQr] = (0, import_react.useState)(null);
	const url = verifyUrl(b.id);
	const sealed = b.status !== "draft";
	const reqs = [
		{
			ok: b.batch_hives.length > 0,
			label: "At least one source hive linked"
		},
		{
			ok: b.recommendation_followed !== null,
			label: "Harvest decision recorded"
		},
		{
			ok: b.trail_steps.some((s) => stageFor(s) === "beekeeper"),
			label: "Beekeeper custody step logged"
		},
		{
			ok: !!(b.forage_location || b.region),
			label: "Forage location recorded"
		}
	];
	const ready = reqs.every((r) => r.ok);
	(0, import_react.useEffect)(() => {
		if (!sealed) return;
		import_lib.toDataURL(url, {
			width: 480,
			margin: 2,
			color: {
				dark: "#2b1d0e",
				light: "#fdf8ec"
			}
		}).then(setQr);
	}, [sealed, url]);
	const seal = async () => {
		setBusy(true);
		const { error } = await supabase.from("batches").update({
			status: "sealed",
			sealed_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", b.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Batch sealed — QR code ready");
		qc.invalidateQueries({ queryKey: ["batch", b.id] });
		qc.invalidateQueries({ queryKey: ["batches"] });
	};
	if (sealed) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "rounded-3xl border border-primary/60 bg-card p-6 text-center shadow-[var(--shadow-honey)] animate-scale-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl",
				children: "Verification QR"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 211,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Sealed ", b.sealed_at ? new Date(b.sealed_at).toLocaleString() : ""]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 212,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto mt-5 w-fit rounded-3xl bg-linen p-3",
				children: qr ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
					src: qr,
					alt: `QR code for batch ${b.id}`,
					className: "h-56 w-56 max-w-full"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 17
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, {
					label: "Preparing QR…",
					className: "h-56 w-56 max-w-full"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 103
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 213,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-3 font-mono text-sm",
				children: b.id
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 216,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					asChild: true,
					variant: "honeycomb",
					disabled: !qr,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: qr ?? "#",
						download: `${b.id}-qr.png`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Download, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 61
						}, this), " Download QR"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 218,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
						href: url,
						target: "_blank",
						rel: "noreferrer",
						className: "flex-1 truncate text-primary-deep underline",
						children: url
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 222,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": "Copy link",
						onClick: () => {
							navigator.clipboard.writeText(url);
							toast.success("Link copied");
						},
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Copy, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 14
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 223,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 221,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 217,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 210,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "flex items-center gap-2 text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-5 w-5 text-primary-deep" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 232,
					columnNumber: 56
				}, this), " Seal batch"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 232,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Sealing locks the batch and creates its public verification QR code."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 233,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "mt-4 space-y-2 text-sm",
				children: reqs.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
					className: "flex items-center gap-2",
					children: [r.ok ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-4 w-4 text-hive-healthy" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 21
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-4 w-4 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 78
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: r.ok ? "" : "text-muted-foreground",
						children: r.label
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this)]
				}, r.label, true, {
					fileName: _jsxFileName,
					lineNumber: 235,
					columnNumber: 24
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 234,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				variant: "honeycomb",
				size: "lg",
				className: "mt-6 w-full",
				disabled: !ready || busy,
				onClick: seal,
				children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 19
				}, this), " Sealing…"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 241,
					columnNumber: 17
				}, this) : "Seal Batch"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 240,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 231,
		columnNumber: 10
	}, this);
}
//#endregion
export { BatchDetail as component };
