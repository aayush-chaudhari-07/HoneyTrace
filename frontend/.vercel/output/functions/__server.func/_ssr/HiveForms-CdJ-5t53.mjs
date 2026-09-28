import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-BrSl6vQa.mjs";
import { B as CircleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-EB1gv_5A.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HiveForms-CdJ-5t53.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/ui/sheet.tsx";
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 22,
	columnNumber: 3
}, void 0));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetOverlay, {}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 62,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 65,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 66,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 64,
		columnNumber: 7
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 63,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$1,
	lineNumber: 61,
	columnNumber: 3
}, void 0));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 75,
	columnNumber: 3
}, void 0);
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 80,
	columnNumber: 3
}, void 0);
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 91,
	columnNumber: 3
}, void 0));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$1,
	lineNumber: 103,
	columnNumber: 3
}, void 0));
SheetDescription.displayName = DialogDescription.displayName;
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/HiveForms.tsx";
var blank = {
	name: "",
	hiveId: "",
	temperature: "34.5",
	humidity: "60",
	weight_kg: "40",
	activity_level: "70",
	location: "",
	notes: ""
};
var RANGES = {
	temperature: [
		-10,
		60,
		"°C"
	],
	humidity: [
		0,
		100,
		"%"
	],
	weight_kg: [
		0,
		200,
		"kg"
	],
	activity_level: [
		0,
		100,
		"%"
	]
};
function HiveFormSheet({ mode, onClose, hives, userId }) {
	const qc = useQueryClient();
	const [v, setV] = (0, import_react.useState)(blank);
	const [err, setErr] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [lastMode, setLastMode] = (0, import_react.useState)(null);
	if (mode !== lastMode) {
		setLastMode(mode);
		if (mode) {
			setErr({});
			setV({
				...blank,
				hiveId: mode.kind === "reading" ? mode.hiveId ?? hives[0]?.id ?? "" : ""
			});
		}
	}
	const set = (k) => (e) => setV((x) => ({
		...x,
		[k]: e.target.value
	}));
	const validate = () => {
		const e = {};
		if (mode?.kind === "hive" && v.name.trim().length < 2) e.name = "Give the hive a name (2+ characters).";
		if (mode?.kind === "hive" && v.name.length > 60) e.name = "Keep the name under 60 characters.";
		if (mode?.kind === "reading" && !v.hiveId) e.hiveId = "Pick which hive this reading is for.";
		Object.keys(RANGES).forEach((k) => {
			const n = Number(v[k]);
			const [lo, hi, u] = RANGES[k];
			if (v[k] === "" || Number.isNaN(n)) e[k] = "Enter a number.";
			else if (n < lo || n > hi) e[k] = `Should be between ${lo} and ${hi} ${u}.`;
		});
		if (v.location.length > 120) e.location = "Keep location under 120 characters.";
		if (v.notes.length > 1e3) e.notes = "Notes are limited to 1000 characters.";
		return e;
	};
	const submit = async (ev) => {
		ev.preventDefault();
		const e = validate();
		setErr(e);
		if (Object.keys(e).length) return;
		setBusy(true);
		const nums = {
			temperature: Number(v.temperature),
			humidity: Number(v.humidity),
			weight_kg: Number(v.weight_kg),
			activity_level: Number(v.activity_level)
		};
		try {
			let hiveId = v.hiveId;
			if (mode?.kind === "hive") {
				const { data, error } = await supabase.from("hives").insert({
					owner_id: userId,
					name: v.name.trim(),
					location: v.location.trim() || null,
					notes: v.notes.trim() || null,
					...nums
				}).select("id").single();
				if (error) throw error;
				hiveId = data.id;
			}
			const { error } = await supabase.from("readings").insert({
				owner_id: userId,
				hive_id: hiveId,
				location: v.location.trim() || null,
				notes: v.notes.trim() || null,
				...nums
			});
			if (error) throw error;
			toast.success(mode?.kind === "hive" ? "Hive added to your apiary" : "Reading logged");
			qc.invalidateQueries({ queryKey: ["hives"] });
			qc.invalidateQueries({ queryKey: ["hive"] });
			qc.invalidateQueries({ queryKey: ["readings"] });
			onClose();
		} catch (x) {
			toast.error(x instanceof Error ? x.message : "Couldn't save");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sheet, {
		open: !!mode,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetContent, {
			className: "w-full overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetTitle, {
				className: "font-display text-3xl",
				children: mode?.kind === "hive" ? "Add a hive" : "Field journal"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 89,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SheetDescription, { children: mode?.kind === "hive" ? "Name your hive and record its first reading." : "Log what you observed at the hive today." }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 90,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: submit,
				noValidate: true,
				className: "mt-6 space-y-4 px-1 pb-6",
				children: [
					mode?.kind === "hive" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
						label: "Hive name",
						error: err.name,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							className: inp(err.name),
							value: v.name,
							onChange: set("name"),
							placeholder: "Meadow Hive 3"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 94,
							columnNumber: 51
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
						label: "Hive",
						error: err.hiveId,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							className: inp(err.hiveId),
							value: v.hiveId,
							onChange: set("hiveId"),
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: "",
								children: "Select a hive…"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 98,
								columnNumber: 17
							}, this), hives.map((h) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: h.id,
								children: h.name
							}, h.id, false, {
								fileName: _jsxFileName,
								lineNumber: 99,
								columnNumber: 35
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 97,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 96,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
								label: "Temperature °C",
								error: err.temperature,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									step: "0.1",
									className: inp(err.temperature),
									value: v.temperature,
									onChange: set("temperature")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 104,
									columnNumber: 63
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 104,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
								label: "Humidity %",
								error: err.humidity,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									className: inp(err.humidity),
									value: v.humidity,
									onChange: set("humidity")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 105,
									columnNumber: 56
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 105,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
								label: "Weight kg",
								error: err.weight_kg,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "number",
									step: "0.1",
									className: inp(err.weight_kg),
									value: v.weight_kg,
									onChange: set("weight_kg")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 106,
									columnNumber: 56
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
								label: `Activity ${v.activity_level}%`,
								error: err.activity_level,
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									type: "range",
									min: 0,
									max: 100,
									className: "mt-3 w-full accent-[var(--color-primary-deep)]",
									value: v.activity_level,
									onChange: set("activity_level")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 108,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 107,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
						label: "Location",
						error: err.location,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
							className: inp(err.location),
							value: v.location,
							onChange: set("location"),
							placeholder: "North field, row 2"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 52
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 111,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(F, {
						label: "Notes",
						error: err.notes,
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
							rows: 4,
							className: cn(inp(err.notes), "h-auto py-3"),
							value: v.notes,
							onChange: set("notes"),
							placeholder: "Queen spotted, calm colony, capped brood on 6 frames…"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 112,
							columnNumber: 46
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 112,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						variant: "honeycomb",
						size: "lg",
						disabled: busy,
						className: "w-full active:scale-95",
						children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 23
						}, this), " Saving…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 114,
							columnNumber: 21
						}, this) : mode?.kind === "hive" ? "Add hive" : "Log reading"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 113,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 92,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 86,
		columnNumber: 5
	}, this);
}
function inp(error) {
	return cn("h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]", error ? "border-destructive/50 bg-destructive/5" : "border-input");
}
function F({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "mb-1.5 block text-sm font-medium",
				children: label
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 7
			}, this),
			children,
			error && /* @__PURE__ */ (void 0)("span", {
				className: "mt-1 flex items-center gap-1 text-xs text-destructive",
				children: [
					/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 89
					}, this),
					" ",
					error
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 134,
				columnNumber: 17
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 131,
		columnNumber: 5
	}, this);
}
//#endregion
export { HiveFormSheet as t };
