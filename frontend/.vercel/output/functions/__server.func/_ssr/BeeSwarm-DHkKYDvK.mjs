import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./button-BOPnbRcA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BeeSwarm-DHkKYDvK.js
var import_jsx_runtime = require_jsx_runtime();
function Bee({ size = 22 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size * .72,
		viewBox: "0 0 32 23",
		fill: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "13",
				cy: "14",
				rx: "9",
				ry: "6.5",
				fill: "var(--color-primary)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10 8.2c1.1 3.6 1.1 7.9 0 11.4",
				stroke: "var(--color-espresso)",
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M15 8c1.2 3.7 1.2 8 0 11.8",
				stroke: "var(--color-espresso)",
				strokeWidth: "2.2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "22",
				cy: "12.6",
				r: "4.2",
				fill: "var(--color-espresso)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24.6 8.6c1-2.2 3-3.4 4-2.8",
				stroke: "var(--color-espresso)",
				strokeWidth: "1.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "12",
				cy: "6",
				rx: "7",
				ry: "4",
				fill: "var(--color-card)",
				opacity: "0.85",
				transform: "rotate(-18 12 6)"
			})
		]
	});
}
var PATHS = [
	"bee-roam-a",
	"bee-roam-b",
	"bee-roam-a",
	"bee-roam-b"
];
/**
* Reusable ambient bee swarm: a few bees drift along soft curved paths across
* the section, each with its own speed, delay and vertical flutter.
*/
function BeeSwarm({ count = 3, className }) {
	const bees = Array.from({ length: Math.min(Math.max(count, 1), 4) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-hidden": "true",
		className: cn("pointer-events-none absolute inset-0 overflow-hidden select-none", className),
		children: bees.map((_, i) => {
			const top = [
				18,
				52,
				34,
				72
			][i % 4];
			const duration = [
				26,
				33,
				29,
				38
			][i % 4];
			const delay = [
				0,
				-7,
				-14,
				-19
			][i % 4];
			const flutter = [
				2.1,
				2.7,
				1.8,
				3.1
			][i % 4];
			const size = [
				22,
				18,
				26,
				16
			][i % 4] ?? 22;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute left-0",
				style: {
					top: `${top}%`,
					animation: `${PATHS[i % 4]} ${duration}s linear ${delay}s infinite`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block opacity-80",
					style: { animation: `bee-flutter ${flutter}s ease-in-out infinite` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bee, { size })
				})
			}, i);
		})
	});
}
//#endregion
export { BeeSwarm as t };
