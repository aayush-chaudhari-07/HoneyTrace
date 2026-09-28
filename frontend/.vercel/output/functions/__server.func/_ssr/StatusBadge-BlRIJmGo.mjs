import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as STATUS_META } from "./batch-manage-CnEAzEit.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-BlRIJmGo.js
var import_jsx_runtime = require_jsx_runtime();
function StatusBadge({ status }) {
	const m = STATUS_META[status] ?? STATUS_META.draft;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-7 items-center px-4 text-xs font-semibold uppercase tracking-wide",
		style: {
			background: m.bg,
			color: m.fg,
			clipPath: "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)"
		},
		children: m.label
	});
}
//#endregion
export { StatusBadge as t };
