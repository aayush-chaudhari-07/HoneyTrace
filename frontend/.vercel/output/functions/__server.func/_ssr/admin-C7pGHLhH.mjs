import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C7pGHLhH.js
var import_jsx_runtime = require_jsx_runtime();
function AdminPage() {
	const roles = useQuery({
		queryKey: ["admin-roles"],
		queryFn: async () => (await supabase.from("user_roles").select("role")).data ?? []
	});
	const counts = (roles.data ?? []).reduce((a, r) => ({
		...a,
		[r.role]: (a[r.role] ?? 0) + 1
	}), {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
		className: "flex items-center gap-3 text-4xl sm:text-5xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-9 w-9 text-primary-deep" }), " Admin"]
	}), roles.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
		label: "Gathering admin member roles…",
		className: "mt-8"
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-4 sm:grid-cols-3",
		children: Object.entries(counts).map(([role, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-card p-5 shadow-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl",
				children: n
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "capitalize text-muted-foreground",
				children: [role, "s"]
			})]
		}, role))
	})] });
}
//#endregion
export { AdminPage as component };
