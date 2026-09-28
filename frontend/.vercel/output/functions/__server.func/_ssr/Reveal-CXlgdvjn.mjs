import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn } from "./button-BrSl6vQa.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Reveal-CXlgdvjn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/Reveal.tsx";
/** Fade-up-on-scroll wrapper used site-wide for section content. */
function Reveal({ children, delay = 0, className }) {
	const ref = (0, import_react.useRef)(null);
	const [shown, setShown] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setShown(true);
					observer.disconnect();
				}
			});
		}, {
			threshold: .12,
			rootMargin: "0px 0px -8% 0px"
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		ref,
		className: cn(shown ? "reveal-shown" : "reveal-hidden", className),
		style: { transitionDelay: `${delay}ms` },
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 5
	}, this);
}
//#endregion
export { Reveal as t };
