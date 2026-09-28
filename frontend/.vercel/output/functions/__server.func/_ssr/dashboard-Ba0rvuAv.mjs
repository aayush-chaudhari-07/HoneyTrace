import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ClipboardPlus, K as CalendarClock, X as Activity, h as Scale, j as Droplets, o as Thermometer, v as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { a as listHives, i as issuesFor, r as healthOf } from "./hives-C_SdQ9Qr.mjs";
import { n as HiveHexGrid } from "./HiveHexGrid-CcpP1Vk-.mjs";
import { t as EmptyState } from "./EmptyState-BzEdmw3N.mjs";
import { t as Route } from "./dashboard-EepUNRmN.mjs";
import { t as HiveFormSheet } from "./HiveForms-B0FFa1x6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Ba0rvuAv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-8 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "honeycomb-bg absolute inset-0 opacity-50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, {
					count: 2,
					className: "opacity-60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-5 max-sm:grid-cols-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-[0.22em] text-primary-deep",
								children: "Live hive dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-2 text-4xl sm:text-5xl",
								children: ["Welcome back, ", profile.data?.display_name?.split(" ")[0] || "beekeeper"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: list.length ? `${counts.healthy} healthy · ${counts.attention} need attention · ${counts.critical} critical` : "Add your first hive to start monitoring."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "honeycomb",
							onClick: () => setSheet({ kind: "hive" }),
							className: "active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Hive"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "honeycomb",
							onClick: () => setSheet({ kind: "reading" }),
							disabled: !list.length,
							className: "active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPlus, { className: "h-4 w-4" }), " Log New Reading"]
						})]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 xl:grid-cols-[1fr_340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl",
						children: "Hive map"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-4 text-xs text-muted-foreground",
						children: Object.keys(FILL).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "honeycomb-clip h-3 w-3",
									style: { background: FILL[k] }
								}),
								" ",
								LABEL[k]
							]
						}, k))
					})]
				}), hives.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Opening your apiary…" }) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No hives yet",
					description: "Add your first hive to begin connecting field readings, harvest decisions, and every future jar.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "honeycomb",
						onClick: () => setSheet({ kind: "hive" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add your first hive"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombGrid, { hives: list })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 text-2xl",
				children: "Quick insights"
			}), insights.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-3xl border border-dashed border-border p-6 text-sm text-muted-foreground",
				children: list.length ? "All hives look healthy. 🐝" : "Insights appear once you log readings."
			}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: insights.map(({ h, issues }, i) => {
					const top = issues[0];
					const Icon = ICON[top.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 70,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/hive/$id",
							params: { id: h.id },
							className: "flex gap-3 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "honeycomb-clip flex h-10 w-10 shrink-0 items-center justify-center",
								style: { background: FILL[top.severity === 2 ? "critical" : "attention"] },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-background" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold",
									children: [
										h.name,
										" ",
										issues.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs font-normal text-muted-foreground",
											children: [
												"+",
												issues.length - 1,
												" more"
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: top.reason
								})]
							})]
						})
					}, h.id);
				})
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
			distance: 60,
			className: "mt-12 opacity-80"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiveFormSheet, {
			mode: sheet,
			onClose: () => setSheet(null),
			hives: list,
			userId: user.id
		})
	] });
}
function HoneycombGrid({ hives }) {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiveHexGrid, {
		hives,
		onHiveClick: (h) => navigate({
			to: "/hive/$id",
			params: { id: h.id }
		})
	});
}
//#endregion
export { DashboardPage as component };
