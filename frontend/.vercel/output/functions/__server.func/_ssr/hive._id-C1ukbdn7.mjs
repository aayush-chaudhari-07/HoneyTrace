import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ClipboardPlus, Y as ArrowLeft, a as Trash2, i as TriangleAlert, u as Sparkles } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery, o as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-DwOL9bpj.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { i as issuesFor, n as getHive, o as listReadings, r as healthOf, t as detectAnomalies } from "./hives-C_SdQ9Qr.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as HiveFormSheet } from "./HiveForms-B0FFa1x6.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as createSsrRpc } from "./createSsrRpc-CChK3Lja.mjs";
import { t as Route } from "./hive._id-CBTyIDdP.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hive._id-C1ukbdn7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Ask the AI to review a hive's recent readings and flag anomalies. */
var analyzeHive = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((d) => objectType({ hiveId: stringType().uuid() }).parse(d)).handler(createSsrRpc("f0ac1d35b4968a3cf80dd2fb7ed754b322579e9b7660284cb4312457064f4f96"));
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
	if (hive.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Opening hive readings…" }) });
	if (!hive.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-20 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hive not found." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/dashboard",
			className: "text-primary-deep underline",
			children: "Back to dashboard"
		})]
	}) });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/dashboard",
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Dashboard"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep",
						children: status === "healthy" ? "Healthy" : status === "critical" ? "Critical" : "Needs attention"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl sm:text-5xl",
						children: h.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							h.location || "No location set",
							" · ",
							rs.length,
							" readings"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => ai.mutate(),
						disabled: ai.isPending || rs.length < 2,
						children: [ai.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {}), " AI check"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "honeycomb",
						onClick: () => setSheet(true),
						className: "active:scale-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPlus, { className: "h-4 w-4" }), " Log New Reading"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						"aria-label": "Delete hive",
						onClick: () => confirm(`Delete ${h.name} and all its readings?`) && del.mutate(),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			})]
		}),
		flagged.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in mt-6 rounded-3xl border border-primary/50 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_22%,var(--color-card)),var(--color-card))] p-5 shadow-[var(--shadow-honey)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex items-center gap-2 font-semibold",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-primary-deep" }),
					" ",
					ai.data ? "Flagged anomalies (incl. AI review)" : "Flagged anomalies"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 list-disc space-y-1 pl-6 text-sm",
				children: flagged.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, i))
			})]
		}),
		ai.data && ai.data.anomalies.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: "AI review found nothing unusual in recent readings."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-5 md:grid-cols-2",
			children: CHARTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-semibold",
					children: [
						c.label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-normal text-muted-foreground",
							children: [
								"(",
								c.unit,
								")"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-48",
					children: data.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex h-full items-center justify-center text-sm text-muted-foreground",
						children: "Log more readings to see a trend."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data,
							margin: {
								left: -18,
								right: 8,
								top: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 3"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "t",
									tick: {
										fontSize: 11,
										fill: "var(--color-muted-foreground)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tick: {
										fontSize: 11,
										fill: "var(--color-muted-foreground)"
									},
									domain: ["auto", "auto"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-border)",
									borderRadius: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: c.key,
									stroke: "var(--color-primary-deep)",
									strokeWidth: 2.5,
									dot: {
										r: 3,
										fill: "var(--color-primary)"
									}
								})
							]
						})
					})
				})]
			}, c.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-3xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "History log"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: [
								"When",
								"Temp",
								"Humidity",
								"Weight",
								"Activity",
								"Location",
								"Notes"
							].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2 font-medium",
								children: x
							}, x))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [[...rs].reverse().map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60 transition hover:bg-accent/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "whitespace-nowrap px-3 py-2",
								children: fmt(r.recorded_at)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [Number(r.temperature), "°C"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [Number(r.humidity), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [Number(r.weight_kg), " kg"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2",
								children: [r.activity_level, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: r.location || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "max-w-xs truncate px-3 py-2",
								title: r.notes ?? "",
								children: r.notes || "—"
							})
						]
					}, r.id)), rs.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "px-3 py-6 text-center text-muted-foreground",
						children: "No readings yet."
					}) })] })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiveFormSheet, {
			mode: sheet ? {
				kind: "reading",
				hiveId: id
			} : null,
			onClose: () => setSheet(false),
			hives: [h],
			userId: user.id
		})
	] });
}
//#endregion
export { HivePage as component };
