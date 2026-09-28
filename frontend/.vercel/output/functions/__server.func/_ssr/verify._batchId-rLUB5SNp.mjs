import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as SearchX } from "../_libs/lucide-react.mjs";
import { t as Route } from "./verify._batchId-B7aO5X0n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-rLUB5SNp.js
var import_jsx_runtime = require_jsx_runtime();
function NotFound() {
	const { batchId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-5 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, { className: "mx-auto h-10 w-10 text-destructive" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-3xl",
				children: "No verified batch found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted-foreground",
				children: [
					"We couldn't find ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: batchId.toUpperCase() }),
					". Check the code on your jar — honey that isn't verified won't appear here."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "honey",
				size: "lg",
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/verify",
					children: "Enter another code"
				})
			})
		]
	});
}
//#endregion
export { NotFound as notFoundComponent };
