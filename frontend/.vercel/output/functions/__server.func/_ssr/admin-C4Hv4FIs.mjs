import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { d as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C4Hv4FIs.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/admin.tsx?tsr-split=component";
function AdminPage() {
	const roles = useQuery({
		queryKey: ["admin-roles"],
		queryFn: async () => (await supabase.from("user_roles").select("role")).data ?? []
	});
	const counts = (roles.data ?? []).reduce((a, r) => ({
		...a,
		[r.role]: (a[r.role] ?? 0) + 1
	}), {});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
		className: "flex items-center gap-3 text-4xl sm:text-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-9 w-9 text-primary-deep" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 16,
			columnNumber: 68
		}, this), " Admin"]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 16,
		columnNumber: 7
	}, this), roles.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, {
		label: "Gathering admin member roles…",
		className: "mt-8"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 26
	}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mt-8 grid gap-4 sm:grid-cols-3",
		children: Object.entries(counts).map(([role, n]) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "rounded-3xl border border-border bg-card p-5 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-display text-3xl",
				children: n
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 15
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "capitalize text-muted-foreground",
				children: [role, "s"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 20,
				columnNumber: 15
			}, this)]
		}, role, true, {
			fileName: _jsxFileName,
			lineNumber: 18,
			columnNumber: 54
		}, this))
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 103
	}, this)] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
