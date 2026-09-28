import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-CziAkYd_.mjs";
import { t as Route } from "./profile-Gaq_Q82W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-DuG-nGO6.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/profile.tsx?tsr-split=component";
function ProfilePage() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const profile = useQuery({
		queryKey: ["profile", user.id],
		queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data
	});
	const submit = async (e) => {
		e.preventDefault();
		const f = new FormData(e.currentTarget);
		const display_name = String(f.get("display_name")).trim();
		if (display_name.length < 2) {
			toast.error("Name must be at least 2 characters");
			return;
		}
		const { error } = await supabase.from("profiles").upsert({
			id: user.id,
			display_name,
			apiary_name: String(f.get("apiary_name")).trim(),
			location: String(f.get("location")).trim()
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Profile saved");
		qc.invalidateQueries({ queryKey: ["profile"] });
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-4xl sm:text-5xl",
			children: "Profile"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-2 text-muted-foreground",
			children: user.email
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 46,
			columnNumber: 7
		}, this),
		profile.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, {
			label: "Opening profile details…",
			className: "mt-8 justify-start"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 28
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: submit,
			className: "mt-8 max-w-lg space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "display_name",
						children: "Your name"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 38
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "display_name",
						name: "display_name",
						defaultValue: profile.data?.display_name ?? ""
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 48,
						columnNumber: 85
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "apiary_name",
						children: "Apiary name"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 38
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "apiary_name",
						name: "apiary_name",
						defaultValue: profile.data?.apiary_name ?? ""
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 49,
						columnNumber: 86
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "location",
						children: "Location"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 38
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "location",
						name: "location",
						defaultValue: profile.data?.location ?? ""
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 50,
						columnNumber: 80
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					variant: "honeycomb",
					children: "Save profile"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 114
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 10
	}, this);
}
//#endregion
export { ProfilePage as component };
