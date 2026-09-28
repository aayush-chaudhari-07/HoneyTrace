import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-DDaOxvxf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-98v7abct.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPage() {
	const navigate = useNavigate();
	const [pw, setPw] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		if (pw.length < 8) {
			toast.error("Use at least 8 characters");
			return;
		}
		setBusy(true);
		const { error } = await supabase.auth.updateUser({ password: pw });
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Password updated");
		navigate({ to: "/login" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "honeycomb-bg flex min-h-[70vh] items-center justify-center px-5 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-honey)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl",
					children: "Set a new password"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "pw",
						children: "New password"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "pw",
						type: "password",
						value: pw,
						onChange: (e) => setPw(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "honeycomb",
					size: "lg",
					disabled: busy,
					className: "w-full",
					children: "Update password"
				})
			]
		})
	});
}
//#endregion
export { ResetPage as component };
