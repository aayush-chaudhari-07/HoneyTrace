import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-BrSl6vQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HoneycombLoader-EB1gv_5A.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/HoneycombLoader.tsx";
function HoneycombSpinner({ className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("honeycomb-loader", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 14,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 11,
		columnNumber: 5
	}, this);
}
function HoneycombLoader({ label = "Loading…", className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground", compact ? "py-1 flex-row" : "min-h-32 py-10", className),
		role: "status",
		"aria-live": "polite",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative flex items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
				src: "/logo.png",
				alt: "HoneyTrace Monogram",
				className: cn("object-contain animate-pulse", compact ? "h-6 w-6" : "h-12 w-12")
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 9
			}, this), !compact && /* @__PURE__ */ (void 0)(HoneycombSpinner, { className: "absolute -inset-3 opacity-60 scale-125" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 40,
				columnNumber: 22
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 34,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "font-medium text-foreground/80",
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 25,
		columnNumber: 5
	}, this);
}
function HoneycombPageLoader() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-[50vh] items-center justify-center px-5",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Following the honey trail…" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 50,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 49,
		columnNumber: 5
	}, this);
}
//#endregion
export { HoneycombPageLoader as n, HoneycombSpinner as r, HoneycombLoader as t };
