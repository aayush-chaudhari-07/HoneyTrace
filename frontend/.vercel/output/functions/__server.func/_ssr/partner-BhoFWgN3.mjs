import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-BOPnbRcA.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { D as FlaskConical, H as Check, r as Truck, s as Store, t as X, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { s as stageFor, t as CUSTODY } from "./batch-manage-CnEAzEit.mjs";
import { t as StatusBadge } from "./StatusBadge-BlRIJmGo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as getMyRoles, t as PARTNER_ROLES } from "./roles-BHJPXgNj.mjs";
import { n as Label, t as Input } from "./label-DDaOxvxf.mjs";
import { t as Route } from "./partner-d9cKklM2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-BhoFWgN3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
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
	if (roles.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Opening partner queue…" }) });
	if (!role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-5 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl",
			children: "Partner access only"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted-foreground",
			children: "This queue is for Lab, Bottler, Distributor and Retailer accounts."
		})]
	}) });
	const m = META[role];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "honeycomb-clip inline-flex h-14 w-14 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "h-6 w-6" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
					children: [m.label, " queue"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl sm:text-5xl",
					children: m.awaiting
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full border border-border bg-card px-4 py-2 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: queue.data?.length ?? "…" }),
					" batch",
					queue.data?.length === 1 ? "" : "es",
					" pending"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10",
			children: queue.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Following custody handoffs…" }) : queue.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-destructive",
				children: queue.error.message
			}) : !queue.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mx-auto h-10 w-10 text-primary-deep" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-2xl",
						children: "All caught up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							"No batches are waiting on a ",
							m.stage.toLowerCase(),
							" update right now."
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2",
				children: queue.data.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-honey)] transition-all duration-300 hover:-translate-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: b.id
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 text-xl",
										children: b.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											"Beekeeper: ",
											b.beekeeper || "—",
											b.region ? ` · ${b.region}` : ""
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniTimeline, {
								done: doneStages(b),
								current: m.key
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "honeycomb",
								className: "mt-5 w-full",
								onClick: () => setOpen(b),
								children: "Update stage"
							})
						]
					})
				}, b.id))
			})
		}),
		open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageForm, {
			batch: open,
			role,
			userId: user.id,
			onClose: () => setOpen(null),
			onDone: () => {
				setOpen(null);
				qc.invalidateQueries({ queryKey: ["partner-queue"] });
			}
		})
	] });
}
function MiniTimeline({ done, current }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-5 flex items-center",
		children: CUSTODY.map((c, i) => {
			const isDone = done.has(c.key);
			const isCur = c.key === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-1 items-center last:flex-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `honeycomb-clip flex h-7 w-7 items-center justify-center text-[10px] font-bold transition-colors ${isDone ? "bg-primary-deep text-background" : isCur ? "animate-pulse bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
						children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] ${isCur ? "font-semibold text-foreground" : "text-muted-foreground"}`,
						children: c.label
					})]
				}), i < CUSTODY.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mx-1 mb-4 h-0.5 flex-1 rounded ${done.has(CUSTODY[i + 1].key) || isDone && CUSTODY[i + 1].key === current ? "bg-primary" : "bg-border"}` })]
			}, c.key);
		})
	});
}
function Field({ label, name, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: name,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: name,
			name,
			...rest
		})]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-in fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "h-full w-full max-w-md overflow-y-auto bg-background p-6 shadow-2xl animate-in slide-in-from-right duration-300",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: batch.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl",
						children: [m.stage, " update"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: batch.name
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-6 space-y-4",
				noValidate: true,
				children: [
					role === "lab" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lab name",
							name: "lab_name",
							placeholder: "e.g. Nilgiri Food Lab"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "result",
								children: "Overall result"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "result",
								name: "result",
								className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Passed" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Passed with notes" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Failed" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Moisture %",
								name: "moisture",
								inputMode: "decimal",
								placeholder: "17.2"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "HMF (mg/kg)",
								name: "hmf",
								inputMode: "decimal",
								placeholder: "12"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Pollen analysis",
							name: "pollen",
							placeholder: "e.g. Eucalyptus dominant"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "certificate",
								children: "Certificate (PDF or image)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "certificate",
								name: "certificate",
								type: "file",
								accept: "application/pdf,image/*"
							})]
						})
					] }),
					role === "bottler" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bottling facility",
							name: "facility"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Jar count",
							name: "jars",
							type: "number",
							min: 1
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "sealed",
								className: "h-4 w-4 accent-[var(--primary)]"
							}), " Jars filled and tamper-sealed"]
						})
					] }),
					role === "distributor" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Transport details",
							name: "transport",
							placeholder: "Carrier, vehicle / tracking no."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Current location",
							name: "location",
							placeholder: "e.g. Bengaluru warehouse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Temperature log °C (optional)",
							name: "temp",
							inputMode: "decimal"
						})
					] }),
					role === "retailer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Store / location name",
							name: "store"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Shelf placement (optional)",
							name: "shelf",
							placeholder: "Aisle 4, organic shelf"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								name: "shelved",
								className: "h-4 w-4 accent-[var(--primary)]"
							}), " Batch is placed on the shelf"]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "notes",
							children: "Notes (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "notes",
							name: "notes",
							rows: 3
						})]
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "honeycomb",
						size: "lg",
						className: "w-full",
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Recording…"] }) : `Record ${m.stage.toLowerCase()}`
					})
				]
			})]
		})
	});
}
//#endregion
export { PartnerPage as component };
