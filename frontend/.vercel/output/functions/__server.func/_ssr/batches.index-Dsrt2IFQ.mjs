import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { t as Reveal } from "./Reveal-CXlgdvjn.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as CalendarDays, J as ArrowRight, T as Hexagon, Y as ArrowLeft, b as MapPin, t as X, u as Sparkles, v as Plus } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-Ciy8o7Mj.mjs";
import { a as listHives } from "./hives-BWAnFRys.mjs";
import { n as HiveHexGrid } from "./HiveHexGrid-CDqruEYc.mjs";
import { a as readingsInRange, i as listMyBatches, o as recommend } from "./batch-manage-BjrjMpn4.mjs";
import { t as StatusBadge } from "./StatusBadge-K6uhTTNS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./batches.index-Dvd1i7F9.mjs";
import { t as EmptyState } from "./EmptyState-GTNIPb_R.mjs";
import { n as Label, t as Input } from "./label-CziAkYd_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches.index-Dsrt2IFQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/_authenticated/batches.index.tsx?tsr-split=component";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative overflow-hidden rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "pointer-events-none absolute inset-0 opacity-60",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 3 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 37,
					columnNumber: 74
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 37,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 py-2 max-sm:grid-cols-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-4xl sm:text-5xl",
						children: "My Batches"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 40,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-2 text-muted-foreground",
						children: "Bundle hives into a batch, seal it, and follow it to the shelf."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
					variant: "honeycomb",
					onClick: () => setCreating(true),
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Plus, { className: "h-4 w-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 43,
						columnNumber: 73
					}, this), " Create New Batch"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 43,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 38,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 36,
			columnNumber: 7
		}, this),
		batches.isLoading && /* @__PURE__ */ (void 0)(HoneycombLoader, {
			label: "Following your batches…",
			className: "mt-6"
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 47,
			columnNumber: 29
		}, this),
		batches.data?.length === 0 && /* @__PURE__ */ (void 0)(EmptyState, {
			className: "mt-8 rounded-3xl border border-dashed border-border",
			icon: Hexagon,
			title: "No batches yet",
			description: "Create your first batch from a hive, then follow its journey from harvest to shelf.",
			action: /* @__PURE__ */ (void 0)(Button, {
				variant: "honeycomb",
				onClick: () => setCreating(true),
				children: [/* @__PURE__ */ (void 0)(Plus, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 48,
					columnNumber: 320
				}, this), " Create your first batch"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 258
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 48,
			columnNumber: 38
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
			children: batches.data?.map((b, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Reveal, {
				delay: i * 60,
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/batches/$id",
					params: { id: b.id },
					className: "group block h-full rounded-3xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-honey)] active:scale-[0.98]",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "font-mono text-sm text-muted-foreground",
								children: b.id
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 55,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(StatusBadge, { status: b.status }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 56,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 54,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "mt-3 text-2xl",
							children: b.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "mt-4 space-y-1.5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CalendarDays, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 60,
											columnNumber: 56
										}, this),
										" Harvested ",
										fmt(b.harvested)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 60,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hexagon, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 61,
											columnNumber: 56
										}, this),
										" ",
										b.batch_hives.length,
										" source hive",
										b.batch_hives.length === 1 ? "" : "s"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 61,
									columnNumber: 17
								}, this),
								b.forage_location && /* @__PURE__ */ (void 0)("p", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)(MapPin, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 62,
											columnNumber: 78
										}, this),
										" ",
										b.forage_location
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 62,
									columnNumber: 39
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 59,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-5 flex items-center gap-1 text-sm font-semibold text-primary-deep transition group-hover:gap-2",
							children: ["Open batch ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 64,
								columnNumber: 139
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 64,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 51,
					columnNumber: 13
				}, this)
			}, b.id, false, {
				fileName: _jsxFileName,
				lineNumber: 50,
				columnNumber: 38
			}, this))
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 49,
			columnNumber: 7
		}, this),
		/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "relative mt-16 h-24",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 68,
				columnNumber: 44
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 68,
			columnNumber: 7
		}, this),
		creating && /* @__PURE__ */ (void 0)(CreateBatchFlow, {
			userId: user.id,
			onClose: () => setCreating(false)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 69,
			columnNumber: 20
		}, this)
	] }, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 35,
		columnNumber: 10
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "fixed inset-0 z-50 flex justify-end bg-espresso/40 backdrop-blur-sm animate-fade-in",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "h-full w-full max-w-2xl overflow-y-auto bg-background p-6 shadow-2xl animate-slide-in-right sm:p-8",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-3xl",
						children: "New batch"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 202,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 98
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 201,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ol", {
					className: "mt-5 flex gap-2",
					children: [
						"Source hives",
						"Date range",
						"Preview & confirm"
					].map((s, i) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
						className: `flex-1 rounded-full px-3 py-1.5 text-center text-xs font-semibold transition ${i <= step ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
						children: [
							i + 1,
							". ",
							s
						]
					}, s, true, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 32
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 9
				}, this),
				step === 0 && /* @__PURE__ */ (void 0)("div", {
					className: "animate-fade-in",
					children: [
						/* @__PURE__ */ (void 0)("p", {
							className: "mt-6 text-muted-foreground",
							children: "Tap hives on your map to include them in this batch."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 210,
							columnNumber: 13
						}, this),
						hives.isLoading ? /* @__PURE__ */ (void 0)(HoneycombLoader, {
							label: "Opening your hive map…",
							className: "mt-4"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 32
						}, this) : hives.data?.length ? /* @__PURE__ */ (void 0)(HiveHexGrid, {
							hives: hives.data,
							selected: picked,
							onHiveClick: (h) => toggle(h.id),
							perRow: 3
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 123
						}, this) : /* @__PURE__ */ (void 0)("p", {
							className: "mt-6 rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground",
							children: [
								"You have no hives yet. ",
								/* @__PURE__ */ (void 0)(Link, {
									to: "/dashboard",
									className: "font-semibold text-primary-deep underline",
									children: "Add one on the dashboard"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 211,
									columnNumber: 349
								}, this),
								"."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 221
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-center text-sm font-medium",
							children: [picked.size, " selected"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 212,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 209,
					columnNumber: 24
				}, this),
				step === 1 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 grid gap-4 animate-fade-in sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "from",
								children: "Harvest window start"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 42
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "from",
								type: "date",
								value: from,
								max: to,
								onChange: (e) => setFrom(e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 216,
								columnNumber: 92
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 216,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (void 0)(Label, {
								htmlFor: "to",
								children: "Harvest date (end)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 42
							}, this), /* @__PURE__ */ (void 0)(Input, {
								id: "to",
								type: "date",
								value: to,
								max: today,
								onChange: (e) => setTo(e.target.value)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 88
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 217,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("p", {
							className: "text-sm text-muted-foreground sm:col-span-2",
							children: [
								"Readings logged for ",
								chosen.map((h) => h.name).join(", "),
								" in this window will be attached as the batch's evidence."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 215,
					columnNumber: 24
				}, this),
				step === 2 && /* @__PURE__ */ (void 0)("div", {
					className: "mt-6 space-y-6 animate-fade-in",
					children: [
						/* @__PURE__ */ (void 0)("section", {
							className: "rounded-3xl border border-border bg-card p-5",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "text-lg",
								children: "Pulled-in readings"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 223,
								columnNumber: 15
							}, this), readings.isLoading ? /* @__PURE__ */ (void 0)(HoneycombLoader, {
								compact: true,
								label: "Gathering readings…",
								className: "mt-2 justify-start"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 37
							}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (void 0)("p", {
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
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 225,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-3 max-h-48 overflow-y-auto text-sm",
									children: /* @__PURE__ */ (void 0)("table", {
										className: "w-full",
										children: [/* @__PURE__ */ (void 0)("thead", {
											className: "text-left text-xs uppercase text-muted-foreground",
											children: /* @__PURE__ */ (void 0)("tr", { children: [
												/* @__PURE__ */ (void 0)("th", {
													className: "py-1",
													children: "Hive"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 96
												}, this),
												/* @__PURE__ */ (void 0)("th", { children: "Date" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 126
												}, this),
												/* @__PURE__ */ (void 0)("th", { children: "°C" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 139
												}, this),
												/* @__PURE__ */ (void 0)("th", { children: "Hum" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 150
												}, this),
												/* @__PURE__ */ (void 0)("th", { children: "kg" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 162
												}, this),
												/* @__PURE__ */ (void 0)("th", { children: "Act." }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 228,
													columnNumber: 173
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 228,
												columnNumber: 92
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 228,
											columnNumber: 23
										}, this), /* @__PURE__ */ (void 0)("tbody", { children: (readings.data ?? []).map((r) => /* @__PURE__ */ (void 0)("tr", {
											className: "border-t border-border",
											children: [
												/* @__PURE__ */ (void 0)("td", {
													className: "py-1",
													children: chosen.find((h) => h.id === r.hive_id)?.name
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 231,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("td", { children: new Date(r.recorded_at).toLocaleDateString() }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 232,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("td", { children: Number(r.temperature) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 233,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("td", { children: [Number(r.humidity), "%"] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 233,
													columnNumber: 61
												}, this),
												/* @__PURE__ */ (void 0)("td", { children: Number(r.weight_kg) }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 233,
													columnNumber: 91
												}, this),
												/* @__PURE__ */ (void 0)("td", { children: r.activity_level }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 233,
													columnNumber: 121
												}, this)
											]
										}, r.id, true, {
											fileName: _jsxFileName,
											lineNumber: 230,
											columnNumber: 57
										}, this)) }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 229,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 227,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 19
								}, this),
								chosen.some((h) => h.location) && /* @__PURE__ */ (void 0)("p", {
									className: "mt-3 flex items-center gap-2 text-sm",
									children: [
										/* @__PURE__ */ (void 0)(MapPin, { className: "h-4 w-4 text-primary-deep" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 238,
											columnNumber: 104
										}, this),
										" Forage: ",
										[...new Set(chosen.map((h) => h.location).filter(Boolean))].join(" · ")
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 52
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 126
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 222,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("section", {
							className: "rounded-3xl border border-primary/50 bg-primary/10 p-5",
							children: [
								/* @__PURE__ */ (void 0)("h3", {
									className: "flex items-center gap-2 text-lg",
									children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-5 w-5 text-primary-deep" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 243,
										columnNumber: 63
									}, this), " Harvest recommendation"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 243,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "mt-2 text-sm",
									children: rec.text
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 244,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: followed === true ? "honeycomb" : "outline",
										size: "sm",
										onClick: () => setFollowed(true),
										children: "I'm following it"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 246,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)(Button, {
										type: "button",
										variant: followed === false ? "honeycomb" : "outline",
										size: "sm",
										onClick: () => setFollowed(false),
										children: "I'm overriding it"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 245,
									columnNumber: 15
								}, this),
								followed === false && /* @__PURE__ */ (void 0)(Input, {
									className: "mt-3",
									placeholder: "Why? e.g. frames fully capped on inspection",
									value: overrideReason,
									onChange: (e) => setOverrideReason(e.target.value)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 249,
									columnNumber: 38
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 242,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("section", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "bname",
										children: "Batch name"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 58
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "bname",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Late Summer Clover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 99
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 253,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "floral",
										children: "Floral source"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 44
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "floral",
										value: floral,
										onChange: (e) => setFloral(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 254,
										columnNumber: 89
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "jars",
										children: "Jars"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 44
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "jars",
										type: "number",
										min: 0,
										value: jars,
										onChange: (e) => setJars(Math.max(0, Number(e.target.value)))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 255,
										columnNumber: 78
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5 sm:col-span-2",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "forage",
										children: "Forage location"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 58
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "forage",
										value: forage,
										onChange: (e) => setForage(e.target.value),
										placeholder: "Valley meadows, Kodagu"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 105
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 256,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "lat",
										children: "Latitude"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 44
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "lat",
										inputMode: "decimal",
										value: lat,
										onChange: (e) => setLat(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 81
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)(Label, {
										htmlFor: "lng",
										children: "Longitude"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 258,
										columnNumber: 44
									}, this), /* @__PURE__ */ (void 0)(Input, {
										id: "lng",
										inputMode: "decimal",
										value: lng,
										onChange: (e) => setLng(e.target.value)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 258,
										columnNumber: 82
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 258,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "sm:col-span-2 sm:justify-self-start",
									onClick: locate,
									children: [/* @__PURE__ */ (void 0)(MapPin, { className: "h-4 w-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 259,
										columnNumber: 130
									}, this), " Use my current location"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 252,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 221,
					columnNumber: 24
				}, this),
				err && /* @__PURE__ */ (void 0)("p", {
					role: "alert",
					className: "mt-5 rounded-2xl border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm text-espresso animate-fade-in",
					children: err
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 263,
					columnNumber: 17
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-8 flex justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => step ? setStep(step - 1) : onClose(),
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 266,
								columnNumber: 102
							}, this),
							" ",
							step ? "Back" : "Cancel"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 266,
						columnNumber: 11
					}, this), step < 2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "honeycomb",
						onClick: next,
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowRight, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 85
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 23
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "honeycomb",
						onClick: confirm,
						disabled: busy,
						children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 217
						}, this), " Creating…"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 267,
							columnNumber: 215
						}, this) : "Confirm batch"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 267,
						columnNumber: 131
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 265,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 200,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 199,
		columnNumber: 10
	}, this);
}
//#endregion
export { BatchesPage as component };
