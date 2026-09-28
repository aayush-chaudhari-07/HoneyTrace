import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as SearchX } from "../_libs/lucide-react.mjs";
import { t as Route } from "./verify._batchId-DfSe1eDm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-BjEW5MAw.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/verify.$batchId.tsx?tsr-split=notFoundComponent";
function NotFound() {
	const { batchId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-md px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SearchX, { className: "mx-auto h-10 w-10 text-destructive" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 10,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "mt-4 text-3xl",
				children: "No verified batch found"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 11,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mt-2 text-muted-foreground",
				children: [
					"We couldn't find ",
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: batchId.toUpperCase() }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 12,
						columnNumber: 66
					}, this),
					". Check the code on your jar — honey that isn't verified won't appear here."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 12,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
				asChild: true,
				variant: "honey",
				size: "lg",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/verify",
					children: "Enter another code"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 13,
					columnNumber: 66
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 13,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 9,
		columnNumber: 10
	}, this);
}
//#endregion
export { NotFound as notFoundComponent };
