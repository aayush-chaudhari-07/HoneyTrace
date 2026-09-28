import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn } from "./button-BOPnbRcA.mjs";
import { T as Hexagon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmptyState-BzEdmw3N.js
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, description, action, icon: Icon = Hexagon, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("empty-state-illustration px-5 py-12 text-center sm:py-16", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto h-24 w-32",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "honeycomb-clip absolute left-1 top-7 h-12 w-12 bg-secondary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "honeycomb-clip absolute right-1 top-3 h-14 w-14 bg-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "honeycomb-clip absolute left-1/2 top-9 flex h-16 w-16 -translate-x-1/2 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground shadow-[var(--shadow-honey)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 text-2xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground",
				children: description
			}),
			action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex justify-center",
				children: action
			})
		]
	});
}
//#endregion
export { EmptyState as t };
