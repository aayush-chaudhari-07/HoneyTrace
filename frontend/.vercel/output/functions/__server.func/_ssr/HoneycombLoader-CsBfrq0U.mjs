import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./button-BOPnbRcA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HoneycombLoader-CsBfrq0U.js
var import_jsx_runtime = require_jsx_runtime();
function HoneycombSpinner({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("honeycomb-loader", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		]
	});
}
function HoneycombLoader({ label = "Loading…", className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground", compact ? "py-1 flex-row" : "min-h-32 py-10", className),
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/logo.png",
				alt: "HoneyTrace Monogram",
				className: cn("object-contain animate-pulse", compact ? "h-6 w-6" : "h-12 w-12")
			}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "absolute -inset-3 opacity-60 scale-125" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-foreground/80",
			children: label
		})]
	});
}
function HoneycombPageLoader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Following the honey trail…" })
	});
}
//#endregion
export { HoneycombPageLoader as n, HoneycombSpinner as r, HoneycombLoader as t };
