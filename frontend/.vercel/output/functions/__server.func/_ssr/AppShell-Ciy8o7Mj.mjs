import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Hexagon, n as User, w as LayoutDashboard, x as LogOut, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-Ciy8o7Mj.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/AppShell.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "relative lg:sticky lg:top-20 lg:h-fit lg:w-56 lg:shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, {
				count: 2,
				className: "internal-bee-swarm -top-8 h-12"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 29,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "relative flex gap-1 overflow-x-auto rounded-3xl border border-border bg-card p-2 lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "hidden items-center gap-2 px-4 pb-3 pt-2 font-display text-lg lg:flex",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hexagon, { className: "h-5 w-5 text-primary-deep" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 13
						}, this), " Apiary"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 31,
						columnNumber: 11
					}, this),
					ITEMS.map((i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: i.to,
						className: linkCls,
						activeProps: { className: cn(linkCls, "bg-accent text-foreground shadow-[var(--shadow-honey)]") },
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(i.icon, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 36,
								columnNumber: 15
							}, this),
							" ",
							i.label
						]
					}, i.to, true, {
						fileName: _jsxFileName,
						lineNumber: 35,
						columnNumber: 13
					}, this)),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "ghost",
						onClick: logout,
						className: cn(linkCls, "h-auto justify-start lg:mt-4"),
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 40,
							columnNumber: 13
						}, this), " Logout"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 39,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 28,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "min-w-0 flex-1",
			children
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 44,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 27,
		columnNumber: 5
	}, this);
}
//#endregion
export { AppShell as t };
