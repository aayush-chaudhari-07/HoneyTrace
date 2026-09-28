import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-DDaOxvxf.mjs";
import { t as Route } from "./profile-BY5Bq-B5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Ck0yt3oD.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl sm:text-5xl",
			children: "Profile"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground",
			children: user.email
		}),
		profile.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
			label: "Opening profile details…",
			className: "mt-8 justify-start"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-8 max-w-lg space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "display_name",
						children: "Your name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "display_name",
						name: "display_name",
						defaultValue: profile.data?.display_name ?? ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "apiary_name",
						children: "Apiary name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "apiary_name",
						name: "apiary_name",
						defaultValue: profile.data?.apiary_name ?? ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "location",
						children: "Location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "location",
						name: "location",
						defaultValue: profile.data?.location ?? ""
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "honeycomb",
					children: "Save profile"
				})
			]
		})
	] });
}
//#endregion
export { ProfilePage as component };
