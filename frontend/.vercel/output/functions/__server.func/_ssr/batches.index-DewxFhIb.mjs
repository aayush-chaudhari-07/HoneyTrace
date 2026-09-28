import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CalendarDays, J as ArrowRight, T as Hexagon, Y as ArrowLeft, b as MapPin, t as X, u as Sparkles, v as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { a as listHives } from "./hives-C_SdQ9Qr.mjs";
import { n as HiveHexGrid } from "./HiveHexGrid-CcpP1Vk-.mjs";
import { a as readingsInRange, i as listMyBatches, o as recommend } from "./batch-manage-CnEAzEit.mjs";
import { t as StatusBadge } from "./StatusBadge-BlRIJmGo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./batches.index-6T30qW14.mjs";
import { t as EmptyState } from "./EmptyState-BzEdmw3N.mjs";
import { n as Label, t as Input } from "./label-DDaOxvxf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches.index-DewxFhIb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fmt = (d) => (/* @__PURE__ */ new Date(d + "T00:00:00")).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function BatchesPage() {
	const { user } = Route.useRouteContext();
	const [creating, setCreating] = (0, import_react.useState)(false);
	const batches = useQuery({
		queryKey: [
			"batches",
			"mine",
			user.id
		],
		queryFn: () => listMyBatches(user.id)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 py-2 max-sm:grid-cols-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl sm:text-5xl",
						children: "My Batches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Bundle hives into a batch, seal it, and follow it to the shelf."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "honeycomb",
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Create New Batch"]
				})]
			})]
		}),
		batches.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
			label: "Following your batches…",
			className: "mt-6"
		}),
		batches.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			className: "mt-8 rounded-3xl border border-dashed border-border",
			icon: Hexagon,
			title: "No batches yet",
			description: "Create your first batch from a hive, then follow its journey from harvest to shelf.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "honeycomb",
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Create your first batch"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
			children: batches.data?.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 60,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/batches/$id",
					params: { id: b.id },
					className: "group block h-full rounded-3xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm text-muted-foreground",
								children: b.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-2xl",
							children: b.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-1.5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-primary-deep" }),
										" Harvested ",
										fmt(b.harvested)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hexagon, { className: "h-4 w-4 text-primary-deep" }),
										" ",
										b.batch_hives.length,
										" source hive",
										b.batch_hives.length === 1 ? "" : "s"
									]
								}),
								b.forage_location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary-deep" }),
										" ",
										b.forage_location
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 flex items-center gap-1 text-sm font-semibold text-primary-deep transition group-hover:gap-2",
							children: ["Open batch ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})
					]
				})
			}, b.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mt-16 h-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {})
		}),
		creating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateBatchFlow, {
			userId: user.id,
			onClose: () => setCreating(false)
		})
	] });
}
function CreateBatchFlow({ userId, onClose }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const monthAgo = (/* @__PURE__ */ new Date(Date.now() - 30 * 864e5)).toISOString().slice(0, 10);
	const [step, setStep] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [from, setFrom] = (0, import_react.useState)(monthAgo);
	const [to, setTo] = (0, import_react.useState)(today);
	const [name, setName] = (0, import_react.useState)("");
	const [floral, setFloral] = (0, import_react.useState)("");
	const [jars, setJars] = (0, import_react.useState)(100);
	const [forage, setForage] = (0, import_react.useState)("");
	const [lat, setLat] = (0, import_react.useState)("");
	const [lng, setLng] = (0, import_react.useState)("");
	const [followed, setFollowed] = (0, import_react.useState)(null);
	const [overrideReason, setOverrideReason] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	const hives = useQuery({
		queryKey: ["hives"],
		queryFn: listHives
	});
	const ids = (0, import_react.useMemo)(() => [...picked], [picked]);
	const readings = useQuery({
		queryKey: [
			"readings-range",
			ids,
			from,
			to
		],
		queryFn: () => readingsInRange(ids, from, to),
		enabled: step >= 1 && ids.length > 0
	});
	const chosen = (hives.data ?? []).filter((h) => picked.has(h.id));
	const rec = recommend(chosen, readings.data ?? []);
	const toggle = (id) => setPicked((p) => {
		const n = new Set(p);
		n.has(id) ? n.delete(id) : n.add(id);
		return n;
	});
	const next = () => {
		setErr(null);
		if (step === 0 && picked.size === 0) return setErr("Tap at least one hive to include it.");
		if (step === 1 && (!from || !to || from > to)) return setErr("Pick a valid date range — start must be before end.");
		if (step === 1 && !forage && chosen[0]?.location) setForage(chosen[0].location);
		setStep(step + 1);
	};
	const locate = () => {
		if (!navigator.geolocation) {
			toast.error("Location isn't available on this device");
			return;
		}
		navigator.geolocation.getCurrentPosition((p) => {
			setLat(p.coords.latitude.toFixed(5));
			setLng(p.coords.longitude.toFixed(5));
		}, () => toast.error("Couldn't read your location"));
	};
	const confirm = async () => {
		setErr(null);
		if (name.trim().length < 2) return setErr("Give the batch a name.");
		if (followed === null) return setErr("Say whether you're following the harvest recommendation.");
		if (followed === false && overrideReason.trim().length < 3) return setErr("Add a short reason for overriding.");
		const la = lat ? Number(lat) : null, ln = lng ? Number(lng) : null;
		if (la !== null && (isNaN(la) || la < -90 || la > 90) || ln !== null && (isNaN(ln) || ln < -180 || ln > 180)) return setErr("Coordinates look off — check latitude/longitude.");
		setBusy(true);
		const id = `HT-${to.slice(0, 4)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
		const { data: prof } = await supabase.from("profiles").select("display_name").eq("id", userId).maybeSingle();
		const { error } = await supabase.from("batches").insert({
			id,
			owner_id: userId,
			name: name.trim(),
			floral: floral.trim(),
			region: forage.trim(),
			beekeeper: prof?.display_name ?? "",
			harvested: to,
			harvest_start: from,
			harvest_end: to,
			jars,
			trust_score: 85,
			status: "draft",
			ai_recommendation: rec.text,
			ai_verdict: rec.verdict,
			recommendation_followed: followed,
			override_reason: followed ? null : overrideReason.trim(),
			forage_location: forage.trim() || null,
			forage_lat: la,
			forage_lng: ln
		});
		if (error) {
			setBusy(false);
			return setErr(error.message);
		}
		const links = await supabase.from("batch_hives").insert(ids.map((hive_id) => ({
			batch_id: id,
			hive_id
		})));
		await supabase.from("trail_steps").insert({
			batch_id: id,
			position: 0,
			stage: "Hive harvest",
			place: forage.trim(),
			step_date: to,
			note: `Harvested from ${chosen.map((h) => h.name).join(", ")}.`,
			submitted_by: userId
		});
		setBusy(false);
		if (links.error) toast.error(links.error.message);
		toast.success(`Batch ${id} created`);
		qc.invalidateQueries({ queryKey: ["batches"] });
		onClose();
		navigate({
			to: "/batches/$id",
			params: { id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "h-full w-full max-w-2xl overflow-y-auto bg-background p-6 shadow-2xl animate-slide-in-right sm:p-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl",
						children: "New batch"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 flex gap-2",
					children: [
						"Source hives",
						"Date range",
						"Preview & confirm"
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: `flex-1 rounded-full px-3 py-1.5 text-center text-xs font-semibold transition ${i <= step ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
						children: [
							i + 1,
							". ",
							s
						]
					}, s))
				}),
				step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground",
							children: "Tap hives on your map to include them in this batch."
						}),
						hives.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
							label: "Opening your hive map…",
							className: "mt-4"
						}) : hives.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HiveHexGrid, {
							hives: hives.data,
							selected: picked,
							onHiveClick: (h) => toggle(h.id),
							perRow: 3
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground",
							children: [
								"You have no hives yet. ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard",
									className: "font-semibold text-primary-deep underline",
									children: "Add one on the dashboard"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm font-medium",
							children: [picked.size, " selected"]
						})
					]
				}),
				step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 animate-fade-in sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "from",
								children: "Harvest window start"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "from",
								type: "date",
								value: from,
								max: to,
								onChange: (e) => setFrom(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "to",
								children: "Harvest date (end)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "to",
								type: "date",
								value: to,
								max: today,
								onChange: (e) => setTo(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground sm:col-span-2",
							children: [
								"Readings logged for ",
								chosen.map((h) => h.name).join(", "),
								" in this window will be attached as the batch's evidence."
							]
						})
					]
				}),
				step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-6 animate-fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-3xl border border-border bg-card p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg",
								children: "Pulled-in readings"
							}), readings.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
								compact: true,
								label: "Gathering readings…",
								className: "mt-2 justify-start"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										readings.data?.length ?? 0,
										" readings from ",
										fmt(from),
										" to ",
										fmt(to),
										!readings.data?.length && " — using each hive's latest state instead",
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 max-h-48 overflow-y-auto text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "text-left text-xs uppercase text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-1",
													children: "Hive"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Date" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "°C" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Hum" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "kg" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Act." })
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (readings.data ?? []).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "py-1",
													children: chosen.find((h) => h.id === r.hive_id)?.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(r.recorded_at).toLocaleDateString() }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: Number(r.temperature) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [Number(r.humidity), "%"] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: Number(r.weight_kg) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.activity_level })
											]
										}, r.id)) })]
									})
								}),
								chosen.some((h) => h.location) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex items-center gap-2 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary-deep" }),
										" Forage: ",
										[...new Set(chosen.map((h) => h.location).filter(Boolean))].join(" · ")
									]
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "rounded-3xl border border-primary/50 bg-primary/10 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "flex items-center gap-2 text-lg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary-deep" }), " Harvest recommendation"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm",
									children: rec.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: followed === true ? "honeycomb" : "outline",
										size: "sm",
										onClick: () => setFollowed(true),
										children: "I'm following it"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: followed === false ? "honeycomb" : "outline",
										size: "sm",
										onClick: () => setFollowed(false),
										children: "I'm overriding it"
									})]
								}),
								followed === false && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-3",
									placeholder: "Why? e.g. frames fully capped on inspection",
									value: overrideReason,
									onChange: (e) => setOverrideReason(e.target.value)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "bname",
										children: "Batch name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "bname",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Late Summer Clover"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "floral",
										children: "Floral source"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "floral",
										value: floral,
										onChange: (e) => setFloral(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "jars",
										children: "Jars"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "jars",
										type: "number",
										min: 0,
										value: jars,
										onChange: (e) => setJars(Math.max(0, Number(e.target.value)))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "forage",
										children: "Forage location"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "forage",
										value: forage,
										onChange: (e) => setForage(e.target.value),
										placeholder: "Valley meadows, Kodagu"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lat",
										children: "Latitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lat",
										inputMode: "decimal",
										value: lat,
										onChange: (e) => setLat(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "lng",
										children: "Longitude"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "lng",
										inputMode: "decimal",
										value: lng,
										onChange: (e) => setLng(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "sm:col-span-2 sm:justify-self-start",
									onClick: locate,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Use my current location"]
								})
							]
						})
					]
				}),
				err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "mt-5 rounded-2xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm text-espresso animate-fade-in",
					children: err
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => step ? setStep(step - 1) : onClose(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }),
							" ",
							step ? "Back" : "Cancel"
						]
					}), step < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "honeycomb",
						onClick: next,
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "honeycomb",
						onClick: confirm,
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Creating…"] }) : "Confirm batch"
					})]
				})
			]
		})
	});
}
//#endregion
export { BatchesPage as component };
