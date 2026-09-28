import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Label, t as Input } from "./label-CziAkYd_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-B-yDQTGc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/reset-password.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
		className: "honeycomb-bg flex min-h-[70vh] items-center justify-center px-5 py-20",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
			onSubmit: submit,
			className: "w-full max-w-sm space-y-4 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-honey)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl",
					children: "Set a new password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
						htmlFor: "pw",
						children: "New password"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 38
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
						id: "pw",
						type: "password",
						value: pw,
						onChange: (e) => setPw(e.target.value)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 37,
						columnNumber: 78
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "submit",
					variant: "honeycomb",
					size: "lg",
					disabled: busy,
					className: "w-full",
					children: "Update password"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 35,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 34,
		columnNumber: 10
	}, this);
}
//#endregion
export { ResetPage as component };
