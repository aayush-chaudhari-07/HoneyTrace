import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-BrSl6vQa.mjs";
import { T as Hexagon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmptyState-GTNIPb_R.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/EmptyState.tsx";
function EmptyState({ title, description, action, icon: Icon = Hexagon, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: cn("empty-state-illustration px-5 py-12 text-center sm:py-16", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative mx-auto h-24 w-32",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "honeycomb-clip absolute left-1 top-7 h-12 w-12 bg-secondary" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 24,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "honeycomb-clip absolute right-1 top-3 h-14 w-14 bg-accent" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 25,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "honeycomb-clip absolute left-1/2 top-9 flex h-16 w-16 -translate-x-1/2 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground shadow-[var(--shadow-honey)]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-7 w-7" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 26,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 23,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
				className: "mt-2 text-2xl",
				children: title
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 30,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: description
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 31,
				columnNumber: 7
			}, this),
			action && /* @__PURE__ */ (void 0)("div", {
				className: "mt-5 flex justify-center",
				children: action
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 32,
				columnNumber: 18
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
//#endregion
export { EmptyState as t };
