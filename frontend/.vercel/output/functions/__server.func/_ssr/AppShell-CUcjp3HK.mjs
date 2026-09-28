import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Hexagon, n as User, w as LayoutDashboard, x as LogOut, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CUcjp3HK.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/batches",
		label: "My Batches",
		icon: Package
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
function AppShell({ children }) {
	const navigate = useNavigate();
	const qc = useQueryClient();
	const logout = async () => {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/login",
			replace: true
		});
	};
	const linkCls = "flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground active:scale-[0.97]";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative lg:sticky lg:top-20 lg:h-fit lg:w-56 lg:shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, {
				count: 2,
				className: "internal-bee-swarm -top-8 h-12"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "relative flex gap-1 overflow-x-auto rounded-3xl border border-border bg-card p-2 lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden items-center gap-2 px-4 pb-3 pt-2 font-display text-lg lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-5 w-5 text-primary-deep" }), " Apiary"]
					}),
					ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: i.to,
						className: linkCls,
						activeProps: { className: cn(linkCls, "bg-accent text-foreground shadow-[var(--shadow-honey)]") },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-4 w-4" }),
							" ",
							i.label
						]
					}, i.to)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						onClick: logout,
						className: cn(linkCls, "h-auto justify-start lg:mt-4"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Logout"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
//#endregion
export { AppShell as t };
