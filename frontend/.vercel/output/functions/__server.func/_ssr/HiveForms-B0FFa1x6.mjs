import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-BOPnbRcA.mjs";
import { B as CircleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-CsBfrq0U.mjs";
import { o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/HiveForms-B0FFa1x6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
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
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: !!mode,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full overflow-y-auto sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display text-3xl",
				children: mode?.kind === "hive" ? "Add a hive" : "Field journal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: mode?.kind === "hive" ? "Name your hive and record its first reading." : "Log what you observed at the hive today." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				noValidate: true,
				className: "mt-6 space-y-4 px-1 pb-6",
				children: [
					mode?.kind === "hive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Hive name",
						error: err.name,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inp(err.name),
							value: v.name,
							onChange: set("name"),
							placeholder: "Meadow Hive 3"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Hive",
						error: err.hiveId,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: inp(err.hiveId),
							value: v.hiveId,
							onChange: set("hiveId"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a hive…"
							}), hives.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: h.id,
								children: h.name
							}, h.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Temperature °C",
								error: err.temperature,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.1",
									className: inp(err.temperature),
									value: v.temperature,
									onChange: set("temperature")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Humidity %",
								error: err.humidity,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									className: inp(err.humidity),
									value: v.humidity,
									onChange: set("humidity")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: "Weight kg",
								error: err.weight_kg,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									step: "0.1",
									className: inp(err.weight_kg),
									value: v.weight_kg,
									onChange: set("weight_kg")
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
								label: `Activity ${v.activity_level}%`,
								error: err.activity_level,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 0,
									max: 100,
									className: "mt-3 w-full accent-[var(--color-primary-deep)]",
									value: v.activity_level,
									onChange: set("activity_level")
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Location",
						error: err.location,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: inp(err.location),
							value: v.location,
							onChange: set("location"),
							placeholder: "North field, row 2"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						label: "Notes",
						error: err.notes,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 4,
							className: cn(inp(err.notes), "h-auto py-3"),
							value: v.notes,
							onChange: set("notes"),
							placeholder: "Queen spotted, calm colony, capped brood on 6 frames…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "honeycomb",
						size: "lg",
						disabled: busy,
						className: "w-full active:scale-95",
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Saving…"] }) : mode?.kind === "hive" ? "Add hive" : "Log reading"
					})
				]
			})]
		})
	});
}
function inp(error) {
	return cn("h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]", error ? "border-destructive/50 bg-destructive/5" : "border-input");
}
function F({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1.5 block text-sm font-medium",
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 flex items-center gap-1 text-xs text-destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }),
					" ",
					error
				]
			})
		]
	});
}
//#endregion
export { HiveFormSheet as t };
