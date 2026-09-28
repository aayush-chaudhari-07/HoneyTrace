import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { U as Camera, _ as QrCode, d as ShieldCheck, t as X } from "../_libs/lucide-react.mjs";
import { n as extractCode, t as SAMPLE_CODES } from "./batches-DD4WwbHo.mjs";
import { t as Route } from "./verify.index-pGAbySI7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify.index-nLcfyw_a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/QrScanner.tsx";
function QrScanner({ onResult, onClose }) {
	const [error, setError] = (0, import_react.useState)(null);
	const done = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		let scanner = null;
		let cancelled = false;
		(async () => {
			try {
				const { Html5Qrcode } = await import("../_libs/html5-qrcode.mjs").then((n) => n.t);
				if (cancelled) return;
				const s = new Html5Qrcode("qr-reader");
				scanner = s;
				await s.start({ facingMode: "environment" }, {
					fps: 10,
					qrbox: {
						width: 230,
						height: 230
					}
				}, (text) => {
					if (done.current) return;
					done.current = true;
					onResult(text);
				}, () => {});
			} catch {
				setError("We couldn't open your camera. Allow camera access, or type the code instead.");
			}
		})();
		return () => {
			cancelled = true;
			if (scanner?.isScanning) scanner.stop().then(() => scanner?.clear()).catch(() => {});
		};
	}, [onResult]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto mt-6 max-w-md rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-honey)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "font-semibold",
					children: "Point your camera at the jar's QR tag"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 41,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "Close scanner",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 43,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 42,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 40,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				id: "qr-reader",
				className: "overflow-hidden rounded-2xl bg-muted"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 46,
				columnNumber: 7
			}, this),
			error && /* @__PURE__ */ (void 0)("p", {
				className: "mt-3 text-sm text-destructive",
				children: error
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 47,
				columnNumber: 17
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 39,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/verify.index.tsx?tsr-split=component";
function VerifyEntry() {
	const { code: legacy } = Route.useSearch();
	const navigate = useNavigate();
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const go = (raw) => {
		const id = extractCode(raw);
		if (!/^HT-\d{4}-[A-Z0-9]+$/.test(id)) {
			setError("That doesn't look like a HoneyTrace code — it starts with HT-, like HT-2026-0412.");
			return;
		}
		navigate({
			to: "/verify/$batchId",
			params: { batchId: id }
		});
	};
	(0, import_react.useEffect)(() => {
		if (legacy) navigate({
			to: "/verify/$batchId",
			params: { batchId: extractCode(legacy) },
			replace: true
		});
	}, [legacy, navigate]);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, {
			count: 3,
			className: "opacity-70"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 41,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative mx-auto flex max-w-md flex-col items-center px-5 pb-16 pt-12 text-center sm:max-w-lg sm:pt-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "honeycomb-clip inline-flex h-16 w-16 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QrCode, { className: "h-7 w-7" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 44,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
					distance: 40,
					className: "-mt-1"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "mt-2 text-4xl sm:text-5xl",
					children: "Is your honey real?"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 47,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Scan the QR code on your jar, or type the code printed under it. No account needed."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "honey",
					size: "lg",
					className: "mt-8 h-14 w-full text-base",
					onClick: () => setScanning((s) => !s),
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Camera, { className: "h-5 w-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 51,
							columnNumber: 11
						}, this),
						" ",
						scanning ? "Close camera" : "Scan QR code"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 50,
					columnNumber: 9
				}, this),
				scanning && /* @__PURE__ */ (void 0)("div", {
					className: "mt-4 w-full",
					children: /* @__PURE__ */ (void 0)(QrScanner, {
						onResult: (t) => {
							setScanning(false);
							go(t);
						},
						onClose: () => setScanning(false)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 54,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 53,
					columnNumber: 22
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "my-6 flex w-full items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-px flex-1 bg-border" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 11
						}, this),
						" or enter code ",
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-px flex-1 bg-border" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 68
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 60,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					className: "grid w-full gap-2 min-[390px]:grid-cols-[minmax(0,1fr)_auto]",
					onSubmit: (e) => {
						e.preventDefault();
						go(code);
					},
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
						value: code,
						onChange: (e) => {
							setCode(e.target.value);
							setError("");
						},
						placeholder: "HT-2026-0412",
						"aria-label": "Batch code",
						autoCapitalize: "characters",
						className: "min-w-0 flex-1 rounded-full border border-input bg-card px-5 py-3 text-base uppercase outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 67,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						variant: "honey",
						size: "lg",
						children: "Verify"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 71,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 63,
					columnNumber: 9
				}, this),
				error && /* @__PURE__ */ (void 0)("p", {
					className: "mt-2 text-sm text-primary-deep",
					children: error
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 19
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-5 text-xs text-muted-foreground",
					children: ["Try a sample:", SAMPLE_CODES.map((c) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "link",
						size: "sm",
						onClick: () => go(c),
						className: "mx-1 h-auto p-0 text-xs",
						children: c
					}, c, false, {
						fileName: _jsxFileName,
						lineNumber: 76,
						columnNumber: 34
					}, this))]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 74,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-10 flex items-center gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 79,
						columnNumber: 11
					}, this), " Every step is sealed in a tamper-evident ledger."]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 78,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 42,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 40,
		columnNumber: 10
	}, this);
}
//#endregion
export { VerifyEntry as component };
