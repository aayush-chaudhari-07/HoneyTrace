import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ShieldAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-CzSCMdgq.js
var import_jsx_runtime = require_jsx_runtime();
/** Recompute each ledger block in the browser and confirm the hash chain links up. */
var SplitErrorComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "mx-auto max-w-md px-5 py-24 text-center",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto h-8 w-8 text-primary-deep" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 font-semibold",
			children: "We couldn't load this batch right now."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "honey",
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/verify",
				children: "Try again"
			})
		})
	]
});
//#endregion
export { SplitErrorComponent as errorComponent };
