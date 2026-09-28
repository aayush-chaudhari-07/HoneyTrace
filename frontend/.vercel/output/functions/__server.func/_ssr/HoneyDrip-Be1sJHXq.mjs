import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./button-BOPnbRcA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HoneyDrip-Be1sJHXq.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Reusable honey-drip motif: a honey bottle gently tilts while a drop falls
* and lands with a small splash ripple. Drop it at the bottom of any section.
*/
function HoneyDrip({ distance = 72, duration = 3.2, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": "true",
		className: cn("pointer-events-none flex w-full flex-col items-center select-none", className),
		style: { ["--drip-distance"]: `${distance}px` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "44",
			height: "56",
			viewBox: "0 0 44 56",
			fill: "none",
			className: "origin-top text-primary-deep",
			style: { animation: `bottle-tilt ${duration * 2}s ease-in-out infinite` },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "18",
					y: "2",
					width: "8",
					height: "8",
					rx: "2",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 12h16l5 10v26a4 4 0 0 1-4 4H13a4 4 0 0 1-4-4V22l5-10Z",
					fill: "var(--color-primary)",
					stroke: "currentColor",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M11 32h22v14a4 4 0 0 1-4 4H15a4 4 0 0 1-4-4V32Z",
					fill: "var(--color-primary-deep)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M18 20l4 4 4-4",
					stroke: "currentColor",
					strokeWidth: "1.6",
					strokeLinecap: "round"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			style: { height: distance + 16 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "14",
				height: "20",
				viewBox: "0 0 14 20",
				fill: "none",
				className: "absolute left-1/2 top-0 -translate-x-1/2",
				style: { animation: `honey-drop-fall ${duration}s ease-in infinite` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M7 0c2.6 4.4 6 8 6 12a6 6 0 1 1-12 0C1 8 4.4 4.4 7 0Z",
					fill: "var(--color-primary)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "4.8",
					cy: "12",
					rx: "1.4",
					ry: "2.4",
					fill: "var(--color-background)",
					opacity: "0.5"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-1/2 h-2 w-8 -translate-x-1/2 rounded-full border-2 border-primary-deep/70",
				style: {
					bottom: 0,
					animation: `honey-splash ${duration}s ease-out infinite`
				}
			})]
		})]
	});
}
//#endregion
export { HoneyDrip as t };
