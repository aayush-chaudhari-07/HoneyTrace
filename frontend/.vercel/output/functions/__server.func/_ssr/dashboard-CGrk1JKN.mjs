import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ClipboardPlus, K as CalendarClock, X as Activity, h as Scale, j as Droplets, o as Thermometer, v as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { a as listHives, i as issuesFor, r as healthOf } from "./hives-BWAnFRys.mjs";
import { n as HiveHexGrid } from "./HiveHexGrid-CDqruEYc.mjs";
import { t as EmptyState } from "./EmptyState-GTNIPb_R.mjs";
import { t as Route } from "./dashboard-Hg6T5rTf.mjs";
import { t as HiveFormSheet } from "./HiveForms-CdJ-5t53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CGrk1JKN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/dashboard.tsx?tsr-split=component";
var FILL = {
	healthy: "var(--hive-healthy)",
	attention: "var(--hive-attention)",
	critical: "var(--hive-critical)"
};
var LABEL = {
	healthy: "Healthy",
	attention: "Needs attention",
	critical: "Critical"
};
var ICON = {
	temp: Thermometer,
	humidity: Droplets,
	activity: Activity,
	weight: Scale,
	inspect: CalendarClock
};
function DashboardPage() {
	const { user } = Route.useRouteContext();
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const hives = useQuery({
		queryKey: ["hives"],
		queryFn: listHives
	});
	const profile = useQuery({
		queryKey: ["profile", user.id],
		queryFn: async () => (await supabase.from("profiles").select("display_name").eq("id", user.id).maybeSingle()).data
	});
	const list = hives.data ?? [];
	const insights = list.map((h) => ({
		h,
		issues: issuesFor(h)
	})).filter((x) => x.issues.length).sort((a, b) => b.issues[0].severity - a.issues[0].severity || b.issues.length - a.issues.length);
	const counts = list.reduce((c, h) => ({
		...c,
		[healthOf(h)]: c[healthOf(h)] + 1
	}), {
		healthy: 0,
		attention: 0,
		critical: 0
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-8 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "honeycomb-bg absolute inset-0 opacity-50" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 67,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, {
					count: 2,
					className: "opacity-60"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 68,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 max-sm:grid-cols-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep",
								children: "Live hive dashboard"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 71,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-2 text-4xl sm:text-5xl",
								children: ["Welcome back, ", profile.data?.display_name?.split(" ")[0] || "beekeeper"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 72,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-muted-foreground",
								children: list.length ? `${counts.healthy} healthy · ${counts.attention} need attention · ${counts.critical} critical` : "Add your first hive to start monitoring."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 73,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 70,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex shrink-0 flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "honeycomb",
							onClick: () => setSheet({ kind: "hive" }),
							className: "active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 43
							}, this), " Add Hive"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 78,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "honeycomb",
							onClick: () => setSheet({ kind: "reading" }),
							disabled: !list.length,
							className: "active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ClipboardPlus, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 67
							}, this), " Log New Reading"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 81,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 77,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 69,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 66,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
				className: "rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl",
						children: "Hive map"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 91,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex gap-4 text-xs text-muted-foreground",
						children: Object.keys(FILL).map((k) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "honeycomb-clip h-3 w-3",
									style: { background: FILL[k] }
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 93,
									columnNumber: 109
								}, this),
								" ",
								LABEL[k]
							]
						}, k, true, {
							fileName: _jsxFileName,
							lineNumber: 93,
							columnNumber: 57
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 92,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 90,
					columnNumber: 11
				}, this), hives.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Opening your apiary…" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 30
				}, this) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(EmptyState, {
					title: "No hives yet",
					description: "Add your first hive to begin connecting field readings, harvest decisions, and every future jar.",
					action: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "honeycomb",
						onClick: () => setSheet({ kind: "hive" }),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 100,
							columnNumber: 13
						}, this), " Add your first hive"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 253
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 101
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombGrid, { hives: list }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 57
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "mb-3 text-2xl",
				children: "Quick insights"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 104,
				columnNumber: 11
			}, this), insights.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "rounded-3xl border border-dashed border-border p-6 text-sm text-muted-foreground",
				children: list.length ? "All hives look healthy. 🐝" : "Insights appear once you log readings."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 44
			}, this) }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 36
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-3",
				children: insights.map(({ h, issues }, i) => {
					const top = issues[0];
					const Icon = ICON[top.kind];
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/hive/$id",
							params: { id: h.id },
							className: "flex gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "honeycomb-clip flex h-10 w-10 shrink-0 items-center justify-center",
								style: { background: FILL[top.severity === 2 ? "critical" : "attention"] },
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-4 w-4 text-background" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 119,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 116,
								columnNumber: 23
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold",
									children: [
										h.name,
										" ",
										issues.length > 1 && /* @__PURE__ */ (void 0)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: [
												"+",
												issues.length - 1,
												" more"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 122,
											columnNumber: 85
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 122,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: top.reason
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 123,
									columnNumber: 25
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 121,
								columnNumber: 23
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 113,
							columnNumber: 21
						}, this)
					}, h.id, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 20
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 105,
				columnNumber: 243
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 103,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 88,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
			distance: 60,
			className: "mt-12 opacity-80"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 132,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HiveFormSheet, {
			mode: sheet,
			onClose: () => setSheet(null),
			hives: list,
			userId: user.id
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 133,
			columnNumber: 7
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 65,
		columnNumber: 10
	}, this);
}
function HoneycombGrid({ hives }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HiveHexGrid, {
		hives,
		onHiveClick: (h) => navigate({
			to: "/hive/$id",
			params: { id: h.id }
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 142,
		columnNumber: 10
	}, this);
}
//#endregion
export { DashboardPage as component };
