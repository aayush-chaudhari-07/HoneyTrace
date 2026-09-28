import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-BrSl6vQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HoneyDrip-Bm61_C9a.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/HoneyDrip.tsx";
/**
* Reusable honey-drip motif: a honey bottle gently tilts while a drop falls
* and lands with a small splash ripple. Drop it at the bottom of any section.
*/
function HoneyDrip({ distance = 72, duration = 3.2, className }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		"aria-hidden": "true",
		className: cn("pointer-events-none flex w-full flex-col items-center select-none", className),
		style: { ["--drip-distance"]: `${distance}px` },
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
			width: "44",
			height: "56",
			viewBox: "0 0 44 56",
			fill: "none",
			className: "origin-top text-primary-deep",
			style: { animation: `bottle-tilt ${duration * 2}s ease-in-out infinite` },
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("rect", {
					x: "18",
					y: "2",
					width: "8",
					height: "8",
					rx: "2",
					fill: "currentColor"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M14 12h16l5 10v26a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V22l5-10Z",
					fill: "var(--color-primary)",
					stroke: "currentColor",
					strokeWidth: "2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 32,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M11 32h22v14a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V32Z",
					fill: "var(--color-primary-deep)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 38,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M18 20l4 4 4-4",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 23,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative",
			style: { height: distance + 16 },
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
				width: "14",
				height: "20",
				viewBox: "0 0 14 20",
				fill: "none",
				className: "absolute left-1/2 top-0 -translate-x-1/2",
				style: { animation: `honey-drop-fall ${duration}s ease-in infinite` },
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
					d: "M7 0c2.6 4.4 6 8 6 12a6 6 0 1 1-12 0C1 8 4.4 4.4 7 0Z",
					fill: "var(--color-primary)"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ellipse", {
					cx: "4.8",
					cy: "12",
					rx: "1.4",
					ry: "2.4",
					fill: "var(--color-background)",
					opacity: "0.5"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 56,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 44,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "absolute left-1/2 h-2 w-8 -translate-x-1/2 rounded-full border-2 border-primary-deep/70",
				style: {
					bottom: 0,
					animation: `honey-splash ${duration}s ease-out infinite`
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 60,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 43,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 17,
		columnNumber: 5
	}, this);
}
//#endregion
export { HoneyDrip as t };
