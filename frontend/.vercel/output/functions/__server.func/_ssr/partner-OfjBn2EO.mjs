import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-BrSl6vQa.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { D as FlaskConical, H as Check, r as Truck, s as Store, t as X, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { s as stageFor, t as CUSTODY } from "./batch-manage-BjrjMpn4.mjs";
import { t as StatusBadge } from "./StatusBadge-K6uhTTNS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as getMyRoles, t as PARTNER_ROLES } from "./roles-CLxMAwlJ.mjs";
import { n as Label, t as Input } from "./label-CziAkYd_.mjs";
import { t as Route } from "./partner-HdbLeH7X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-OfjBn2EO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Textarea.displayName = "Textarea";
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/partner.tsx?tsr-split=component";
var META = {
	lab: {
		label: "Lab",
		stage: "Lab test",
		key: "lab",
		prev: "beekeeper",
		awaiting: "Awaiting Lab Test",
		icon: FlaskConical
	},
	bottler: {
		label: "Bottler",
		stage: "Bottling",
		key: "bottler",
		prev: "lab",
		awaiting: "Awaiting Bottling",
		icon: Package
	},
	distributor: {
		label: "Distributor",
		stage: "Distribution",
		key: "distributor",
		prev: "bottler",
		awaiting: "Awaiting Distribution",
		icon: Truck
	},
	retailer: {
		label: "Retailer",
		stage: "Retail",
		key: "shelf",
		prev: "distributor",
		awaiting: "Awaiting Shelf Placement",
		icon: Store
	}
};
function doneStages(b) {
	const s = /* @__PURE__ */ new Set();
	if (b.status !== "draft") s.add("beekeeper");
	for (const st of b.trail_steps) {
		const k = stageFor(st);
		if (k) s.add(k);
	}
	return s;
}
async function loadQueue(role) {
	const { data, error } = await supabase.from("batches").select("id,name,beekeeper,region,status,sealed_at,trail_steps(id,stage,place,step_date,note,position,created_at)").neq("status", "draft").order("created_at", { ascending: true });
	if (error) throw error;
	const m = META[role];
	return data.filter((b) => {
		const d = doneStages(b);
		return d.has(m.prev) && !d.has(m.key);
	});
}
function PartnerPage() {
	const { user } = Route.useRouteContext();
	const qc = useQueryClient();
	const roles = useQuery({
		queryKey: ["roles", user.id],
		queryFn: () => getMyRoles(user.id)
	});
	const role = roles.data?.find((r) => PARTNER_ROLES.includes(r));
	const queue = useQuery({
		queryKey: ["partner-queue", role],
		queryFn: () => loadQueue(role),
		enabled: !!role
	});
	const [open, setOpen] = (0, import_react.useState)(null);
	if (roles.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Opening partner queue…" }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 107,
		columnNumber: 41
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 107,
		columnNumber: 31
	}, this);
	if (!role) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "mx-auto max-w-xl px-5 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
			className: "text-3xl",
			children: "Partner access only"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 110,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "mt-3 text-muted-foreground",
			children: "This queue is for Lab, Bottler, Distributor and Retailer accounts."
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 111,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 109,
		columnNumber: 22
	}, this) }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 109,
		columnNumber: 12
	}, this);
	const m = META[role];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex min-w-0 items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "honeycomb-clip inline-flex h-14 w-14 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(m.icon, { className: "h-6 w-6" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 119,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 118,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
					children: [m.label, " queue"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 122,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-4xl sm:text-5xl",
					children: m.awaiting
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 123,
					columnNumber: 13
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 121,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 117,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "rounded-full border border-border bg-card px-4 py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: queue.data?.length ?? "…" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this),
					" batch",
					queue.data?.length === 1 ? "" : "es",
					" pending"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 126,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 116,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-10",
			children: queue.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombLoader, { label: "Following custody handoffs…" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 28
			}, this) : queue.error ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-destructive",
				children: queue.error.message
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 100
			}, this) : !queue.data?.length ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "mx-auto h-10 w-10 text-primary-deep" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "mt-3 text-2xl",
						children: "All caught up"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							"No batches are waiting on a ",
							m.stage.toLowerCase(),
							" update right now."
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 135,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 132,
				columnNumber: 193
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: queue.data.map((b, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("article", {
						className: "group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-honey)] transition-all duration-300 hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: b.id
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 141,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
										className: "mt-1 text-xl",
										children: b.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 142,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											"Beekeeper: ",
											b.beekeeper || "—",
											b.region ? ` · ${b.region}` : ""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 143,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 140,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { status: b.status }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 145,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 139,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MiniTimeline, {
								done: doneStages(b),
								current: m.key
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 147,
								columnNumber: 19
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								variant: "honeycomb",
								className: "mt-5 w-full",
								onClick: () => setOpen(b),
								children: "Update stage"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 148,
								columnNumber: 19
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 17
					}, this)
				}, b.id, false, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 39
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 136,
				columnNumber: 20
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 131,
			columnNumber: 7
		}, this),
		open && /* @__PURE__ */ (void 0)(StageForm, {
			batch: open,
			role,
			userId: user.id,
			onClose: () => setOpen(null),
			onDone: () => {
				setOpen(null);
				qc.invalidateQueries({ queryKey: ["partner-queue"] });
			}
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 154,
			columnNumber: 16
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 115,
		columnNumber: 10
	}, this);
}
function MiniTimeline({ done, current }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
		className: "mt-5 flex items-center",
		children: CUSTODY.map((c, i) => {
			const isDone = done.has(c.key);
			const isCur = c.key === current;
			return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: `honeycomb-clip flex h-7 w-7 items-center justify-center text-[10px] font-bold transition-colors ${isDone ? "bg-primary-deep text-background" : isCur ? "animate-pulse bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
						children: isDone ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 27
						}, this) : i + 1
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: `text-[10px] ${isCur ? "font-semibold text-foreground" : "text-muted-foreground"}`,
						children: c.label
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 178,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 174,
					columnNumber: 13
				}, this), i < CUSTODY.length - 1 && /* @__PURE__ */ (void 0)("span", { className: `mx-1 mb-4 h-0.5 flex-1 rounded ${done.has(CUSTODY[i + 1].key) || isDone && CUSTODY[i + 1].key === current ? "bg-primary" : "bg-border"}` }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 180,
					columnNumber: 40
				}, this)]
			}, c.key, true, {
				fileName: _jsxFileName,
				lineNumber: 173,
				columnNumber: 14
			}, this);
		})
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 169,
		columnNumber: 10
	}, this);
}
function Field({ label, name, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
			htmlFor: name,
			children: label
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 194,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
			id: name,
			name,
			...rest
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 195,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 193,
		columnNumber: 10
	}, this);
}
function StageForm({ batch, role, userId, onClose, onDone }) {
	const m = META[role];
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const submit = async (e) => {
		e.preventDefault();
		setErr(null);
		const f = new FormData(e.currentTarget);
		const g = (k) => String(f.get(k) ?? "").trim();
		let place = "";
		let note = "";
		let details = {};
		let document_url = null;
		let document_label = null;
		if (role === "lab") {
			const moisture = Number(g("moisture"));
			if (!g("lab_name") || !g("result")) return setErr("Lab name and overall result are required.");
			if (g("moisture") && (isNaN(moisture) || moisture < 0 || moisture > 40)) return setErr("Moisture should be a percentage between 0 and 40.");
			place = g("lab_name");
			details = {
				result: g("result"),
				moisture: g("moisture"),
				hmf: g("hmf"),
				pollen: g("pollen")
			};
			note = `${g("result")}${g("moisture") ? ` · moisture ${g("moisture")}%` : ""}${g("hmf") ? ` · HMF ${g("hmf")} mg/kg` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
			const file = f.get("certificate");
			if (file && file.size) {
				if (file.size > 10 * 1024 * 1024) return setErr("Certificate must be under 10 MB.");
				setBusy(true);
				const path = `${userId}/${batch.id}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
				const up = await supabase.storage.from("lab-certificates").upload(path, file);
				if (up.error) {
					setBusy(false);
					return setErr(up.error.message);
				}
				document_url = (await supabase.storage.from("lab-certificates").createSignedUrl(path, 3600 * 24 * 365 * 5)).data?.signedUrl ?? null;
				document_label = `Lab certificate — ${file.name}`;
			}
		} else if (role === "bottler") {
			const jars = Number(g("jars"));
			if (!g("facility")) return setErr("Bottling facility is required.");
			if (!Number.isInteger(jars) || jars <= 0) return setErr("Enter a whole number of jars.");
			if (f.get("sealed") !== "on") return setErr("Please confirm the jars are filled and sealed.");
			place = g("facility");
			details = {
				jars,
				sealed: true
			};
			note = `${jars} jars filled & sealed${g("notes") ? ` · ${g("notes")}` : ""}`;
		} else if (role === "distributor") {
			if (!g("location") || !g("transport")) return setErr("Transport details and current location are required.");
			const t = g("temp");
			if (t && isNaN(Number(t))) return setErr("Temperature should be a number.");
			place = g("location");
			details = {
				transport: g("transport"),
				temperature: t
			};
			note = `${g("transport")}${t ? ` · ${t}°C in transit` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
		} else {
			if (!g("store")) return setErr("Store name / location is required.");
			if (f.get("shelved") !== "on") return setErr("Please confirm the batch is on the shelf.");
			place = g("store");
			details = {
				shelved: true,
				shelf: g("shelf")
			};
			note = `On shelf${g("shelf") ? ` · ${g("shelf")}` : ""}${g("notes") ? ` · ${g("notes")}` : ""}`;
		}
		setBusy(true);
		const position = Math.max(-1, ...batch.trail_steps.map((s) => s.position)) + 1;
		const { data, error } = await supabase.from("trail_steps").insert({
			batch_id: batch.id,
			position,
			stage: m.stage,
			place,
			note,
			submitted_by: userId,
			actor_role: role,
			details,
			document_url,
			document_label
		}).select("block_hash").single();
		setBusy(false);
		if (error) return setErr(error.message);
		toast.success(`${m.stage} recorded for ${batch.id}`, { description: `Ledger hash ${data.block_hash?.slice(0, 16)}…` });
		onDone();
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-in fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "h-full w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl animate-in slide-in-from-right duration-300",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: batch.id
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 309,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl",
						children: [m.stage, " update"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 310,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground",
						children: batch.name
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 311,
						columnNumber: 13
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 308,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 313,
						columnNumber: 98
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 313,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 307,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: submit,
				className: "mt-6 space-y-4",
				noValidate: true,
				children: [
					role === "lab" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (void 0)(Field, {
							label: "Lab name",
							name: "lab_name",
							placeholder: "e.g. Nilgiri Food Lab"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 317,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "result",
								children: "Overall result"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 319,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("select", {
								id: "result",
								name: "result",
								className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
								children: [
									/* @__PURE__ */ (void 0)("option", {
										value: "",
										children: "Select…"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("option", { children: "Passed" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 50
									}, this),
									/* @__PURE__ */ (void 0)("option", { children: "Passed with notes" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 73
									}, this),
									/* @__PURE__ */ (void 0)("option", { children: "Failed" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 107
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 318,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (void 0)(Field, {
								label: "Moisture %",
								name: "moisture",
								inputMode: "decimal",
								placeholder: "17.2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 325,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Field, {
								label: "HMF (mg/kg)",
								name: "hmf",
								inputMode: "decimal",
								placeholder: "12"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 326,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Pollen analysis",
							name: "pollen",
							placeholder: "e.g. Eucalyptus dominant"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 328,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "certificate",
								children: "Certificate (PDF or image)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "certificate",
								name: "certificate",
								type: "file",
								accept: "application/pdf,image/*"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 329,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 316,
						columnNumber: 30
					}, this),
					role === "bottler" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (void 0)(Field, {
							label: "Bottling facility",
							name: "facility"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 335,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Jar count",
							name: "jars",
							type: "number",
							min: 1
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 336,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "checkbox",
								name: "sealed",
								className: "h-4 w-4 accent-[var(--primary)]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 64
							}, this), " Jars filled and tamper-sealed"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 334,
						columnNumber: 34
					}, this),
					role === "distributor" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (void 0)(Field, {
							label: "Transport details",
							name: "transport",
							placeholder: "Carrier, vehicle / tracking no."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Current location",
							name: "location",
							placeholder: "e.g. Bengaluru warehouse"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Temperature log °C (optional)",
							name: "temp",
							inputMode: "decimal"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 342,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 339,
						columnNumber: 38
					}, this),
					role === "retailer" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (void 0)(Field, {
							label: "Store / location name",
							name: "store"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 345,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)(Field, {
							label: "Shelf placement (optional)",
							name: "shelf",
							placeholder: "Aisle 4, organic shelf"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 346,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (void 0)("input", {
								type: "checkbox",
								name: "shelved",
								className: "h-4 w-4 accent-[var(--primary)]"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 347,
								columnNumber: 64
							}, this), " Batch is placed on the shelf"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 347,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 344,
						columnNumber: 35
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
							htmlFor: "notes",
							children: "Notes (optional)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 350,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
							id: "notes",
							name: "notes",
							rows: 3
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 351,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 349,
						columnNumber: 11
					}, this),
					err && /* @__PURE__ */ (void 0)("p", {
						className: "rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground",
						children: err
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 353,
						columnNumber: 19
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "submit",
						variant: "honeycomb",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 23
						}, this), " Recording…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 21
						}, this) : `Record ${m.stage.toLowerCase()}`
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 354,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 315,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 306,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 305,
		columnNumber: 10
	}, this);
}
//#endregion
export { PartnerPage as component };
