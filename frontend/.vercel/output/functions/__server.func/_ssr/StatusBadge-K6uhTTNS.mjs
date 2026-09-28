import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as STATUS_META } from "./batch-manage-BjrjMpn4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-K6uhTTNS.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/StatusBadge.tsx";
function StatusBadge({ status }) {
	const m = STATUS_META[status] ?? STATUS_META.draft;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "inline-flex h-7 items-center px-4 text-xs font-semibold uppercase tracking-wide",
		style: {
			background: m.bg,
			color: m.fg,
			clipPath: "polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)"
		},
		children: m.label
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 6,
		columnNumber: 5
	}, this);
}
//#endregion
export { StatusBadge as t };
