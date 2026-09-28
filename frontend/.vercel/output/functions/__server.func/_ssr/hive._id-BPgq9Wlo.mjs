import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ClipboardPlus, Y as ArrowLeft, a as Trash2, i as TriangleAlert, u as Sparkles } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DwOL9bpj.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { i as issuesFor, n as getHive, o as listReadings, r as healthOf, t as detectAnomalies } from "./hives-BWAnFRys.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as HiveFormSheet } from "./HiveForms-CdJ-5t53.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D_ohKVkn.mjs";
import { t as Route } from "./hive._id-VwQBVZor.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hive._id-BPgq9Wlo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
/** Ask the AI to review a hive's recent readings and flag anomalies. */
var analyzeHive = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({ hiveId: stringType().uuid() }).parse(d)).handler(createSsrRpc("f0ac1d35b4968a3cf80dd2fb7ed754b322579e9b7660284cb4312457064f4f96"));
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/hive.$id.tsx?tsr-split=component";
var CHARTS = [
	{
		key: "temperature",
		label: "Temperature",
		unit: "°C"
	},
	{
		key: "humidity",
		label: "Humidity",
		unit: "%"
	},
	{
		key: "weight_kg",
		label: "Weight",
		unit: "kg"
	},
	{
		key: "activity_level",
		label: "Activity",
		unit: "%"
	}
];
var fmt = (d) => new Date(d).toLocaleString("en-US", {
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "2-digit"
});
function HivePage() {
	const { id } = Route.useParams();
	const { user } = Route.useRouteContext();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [sheet, setSheet] = (0, import_react.useState)(false);
	const hive = useQuery({
		queryKey: ["hive", id],
		queryFn: () => getHive(id)
	});
	const readings = useQuery({
		queryKey: ["readings", id],
		queryFn: () => listReadings(id)
	});
	const analyze = useServerFn(analyzeHive);
	const ai = useMutation({
		mutationFn: () => analyze({ data: { hiveId: id } }),
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("hives").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["hives"] });
			toast.success("Hive removed");
			navigate({ to: "/dashboard" });
		}
	});
	if (hive.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Opening hive readings…" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 40
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 87,
		columnNumber: 30
	}, this);
	if (!hive.data) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Hive not found." }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 71
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/dashboard",
			className: "text-primary-deep underline",
			children: "Back to dashboard"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 93
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 88,
		columnNumber: 36
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 88,
		columnNumber: 26
	}, this);
	const h = hive.data;
	const rs = readings.data ?? [];
	const anomalies = detectAnomalies(rs);
	const issues = issuesFor(h);
	const status = healthOf(h);
	const data = rs.map((r) => ({
		...r,
		t: new Date(r.recorded_at).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric"
		})
	}));
	const flagged = [
		...issues.map((i) => i.reason),
		...anomalies.slice(0, 4).map((a) => `${a.message} on ${fmt(a.at)}`),
		...ai.data?.anomalies ?? []
	];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
			to: "/dashboard",
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 124
			}, this), " Dashboard"]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 103,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep",
						children: status === "healthy" ? "Healthy" : status === "critical" ? "Critical" : "Needs attention"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-5xl",
						children: h.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 107,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground",
						children: [
							h.location || "No location set",
							" · ",
							rs.length,
							" readings"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 108,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "outline",
						onClick: () => ai.mutate(),
						disabled: ai.isPending || rs.length < 2,
						children: [ai.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 29
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 89
						}, this), " AI check"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "honeycomb",
						onClick: () => setSheet(true),
						className: "active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardPlus, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 98
						}, this), " Log New Reading"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 114,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Delete hive",
						onClick: () => confirm(`Delete ${h.name} and all its readings?`) && del.mutate(),
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 115,
							columnNumber: 154
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 115,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 110,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 104,
			columnNumber: 7
		}, this),
		flagged.length > 0 && /* @__PURE__ */ (void 0)("div", {
			className: "animate-fade-in mt-6 rounded-3xl border border-primary/50 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_22%,var(--color-card)),var(--color-card))] p-5 shadow-[var(--shadow-honey)]",
			children: [/* @__PURE__ */ (void 0)("p", {
				className: "flex items-center gap-2 font-semibold",
				children: [
					/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-5 w-5 text-primary-deep" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 120,
						columnNumber: 64
					}, this),
					" ",
					ai.data ? "Flagged anomalies (incl. AI review)" : "Flagged anomalies"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 120,
				columnNumber: 11
			}, this), /* @__PURE__ */ (void 0)("ul", {
				className: "mt-2 list-disc space-y-1 pl-6 text-sm",
				children: flagged.map((f, i) => /* @__PURE__ */ (void 0)("li", { children: f }, i, false, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 88
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 121,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 119,
			columnNumber: 30
		}, this),
		ai.data && ai.data.anomalies.length === 0 && /* @__PURE__ */ (void 0)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "AI review found nothing unusual in recent readings."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 123,
			columnNumber: 53
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 grid gap-5 md:grid-cols-2",
			children: CHARTS.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-semibold",
					children: [
						c.label,
						" ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-sm font-normal text-muted-foreground",
							children: [
								"(",
								c.unit,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 52
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 127,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-3 h-48",
					children: data.length < 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "flex h-full items-center justify-center text-sm text-muted-foreground",
						children: "Log more readings to see a trend."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 34
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LineChart, {
							data,
							margin: {
								left: -18,
								right: 8,
								top: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 135,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(XAxis, {
									dataKey: "t",
									tick: {
										fontSize: 11,
										fill: "var(--color-muted-foreground)"
									}
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 136,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(YAxis, {
									tick: {
										fontSize: 11,
										fill: "var(--color-muted-foreground)"
									},
									domain: ["auto", "auto"]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Tooltip, { contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-border)",
									borderRadius: 12
								} }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Line, {
									type: "monotone",
									dataKey: c.key,
									stroke: "var(--color-primary-deep)",
									strokeWidth: 2.5,
									dot: {
										r: 3,
										fill: "var(--color-primary)"
									}
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 149,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 130,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 129,
						columnNumber: 159
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 128,
					columnNumber: 13
				}, this)]
			}, c.key, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 26
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 125,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "mt-8 rounded-3xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl",
				children: "History log"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 160,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
						className: "text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
							className: "border-b border-border",
							children: [
								"When",
								"Temp",
								"Humidity",
								"Weight",
								"Activity",
								"Location",
								"Notes"
							].map((x) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
								className: "px-3 py-2 font-medium",
								children: x
							}, x, false, {
								fileName: _jsxFileName,
								lineNumber: 164,
								columnNumber: 136
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 164,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 163,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: [[...rs].reverse().map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
						className: "border-b border-border/60 transition hover:bg-accent/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "whitespace-nowrap px-3 py-2",
								children: fmt(r.recorded_at)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 168,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-3 py-2",
								children: [Number(r.temperature), "°C"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 169,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-3 py-2",
								children: [Number(r.humidity), "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 170,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-3 py-2",
								children: [Number(r.weight_kg), " kg"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-3 py-2",
								children: [r.activity_level, "%"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 172,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "px-3 py-2",
								children: r.location || "—"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 173,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
								className: "max-w-xs truncate px-3 py-2",
								title: r.notes ?? "",
								children: r.notes || "—"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 174,
								columnNumber: 19
							}, this)
						]
					}, r.id, true, {
						fileName: _jsxFileName,
						lineNumber: 167,
						columnNumber: 43
					}, this)), rs.length === 0 && /* @__PURE__ */ (void 0)("tr", { children: /* @__PURE__ */ (void 0)("td", {
						colSpan: 7,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "No readings yet."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 39
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 176,
						columnNumber: 35
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 162,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 161,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 159,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HiveFormSheet, {
			mode: sheet ? {
				kind: "reading",
				hiveId: id
			} : null,
			onClose: () => setSheet(false),
			hives: [h],
			userId: user.id
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 182,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 102,
		columnNumber: 10
	}, this);
}
//#endregion
export { HivePage as component };
