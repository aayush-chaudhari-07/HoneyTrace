import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Check, L as Circle, M as Download, N as Copy, R as CircleX, S as Lock, Y as ArrowLeft, b as MapPin, u as Sparkles, z as CircleCheck } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner, t as HoneycombLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { i as useQuery, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as AppShell } from "./AppShell-CUcjp3HK.mjs";
import { t as Route } from "./batches._id-DWPWyYTR.mjs";
import { t as HEX } from "./HiveHexGrid-CcpP1Vk-.mjs";
import { c as verifyUrl, r as getMyBatch, s as stageFor, t as CUSTODY } from "./batch-manage-CnEAzEit.mjs";
import { t as StatusBadge } from "./StatusBadge-BlRIJmGo.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches._id-DgzwHuVB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var fmtD = (d) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function BatchDetail() {
	const { id } = Route.useParams();
	const q = useQuery({
		queryKey: ["batch", id],
		queryFn: () => getMyBatch(id)
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, { label: "Opening batch trail…" }) });
	const b = q.data;
	if (!b) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-lg",
		children: "Batch not found."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/batches",
		className: "mt-3 inline-block font-semibold text-primary-deep underline",
		children: "Back to batches"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/batches",
			className: "inline-flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All batches"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-sm:grid-cols-1 animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-muted-foreground",
						children: b.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl sm:text-5xl",
						children: b.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: [
							b.floral,
							`${b.jars} jars`,
							`Harvested ${fmtD(b.harvested)}`
						].filter(Boolean).join(" · ")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 lg:col-span-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Genealogy, { b }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 80,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recommendation, { b })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 160,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timeline, { b })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealCard, { b })
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mt-16 h-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {})
		})
	] });
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl",
			children: title
		}), children]
	});
}
function Genealogy({ b }) {
	const hasMap = b.forage_lat != null && b.forage_lng != null;
	const lat = Number(b.forage_lat), lng = Number(b.forage_lng);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: "Genealogy",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
				children: "Source hives"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [b.batch_hives.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No source hives linked."
				}), b.batch_hives.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hive/$id",
					params: { id: l.hive_id },
					className: "flex h-16 w-14 items-center justify-center bg-primary px-1 text-center text-[11px] font-semibold leading-tight text-espresso transition hover:scale-110 active:scale-95",
					style: { clipPath: HEX },
					children: l.hives?.name ?? "Hive"
				}, l.hive_id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-3 text-sm sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Harvest window:"
					}),
					" ",
					b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary-deep" }),
						" ",
						b.forage_location || b.region || "Location not recorded"
					]
				})]
			}),
			hasMap ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Forage location map",
				className: "mt-4 h-56 w-full rounded-2xl border border-border",
				loading: "lazy",
				src: `https://www.openstreetmap.org/export/embed.html?bbox=${lng - .03},${lat - .02},${lng + .03},${lat + .02}&layer=mapnik&marker=${lat},${lng}`
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground",
				children: "No map coordinates were saved for this batch."
			})
		]
	});
}
function Recommendation({ b }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		title: "Harvest decision",
		children: b.ai_recommendation ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border border-primary/50 bg-primary/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary-deep" }), " AI recommendation at harvest"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: b.ai_recommendation
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 flex items-center gap-2 text-sm font-medium",
				children: b.recommendation_followed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-hive-healthy" }), " Beekeeper followed the recommendation"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-5 w-5 text-primary-deep" }), " Beekeeper overrode it"] })
			}),
			!b.recommendation_followed && b.override_reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 pl-7 text-sm text-muted-foreground",
				children: [
					"“",
					b.override_reason,
					"”"
				]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-muted-foreground",
			children: "No recommendation was recorded for this batch."
		})
	});
}
function Timeline({ b }) {
	const byStage = /* @__PURE__ */ new Map();
	[...b.trail_steps].sort((x, y) => x.position - y.position).forEach((s) => {
		const k = stageFor(s);
		if (k && !byStage.has(k)) byStage.set(k, s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		title: "Custody timeline",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative mt-6",
			children: CUSTODY.map((c, i) => {
				const s = byStage.get(c.key);
				const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1].key);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative flex gap-4 pb-8 last:pb-0",
					children: [
						i < CUSTODY.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full",
							style: { background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `relative flex h-12 w-12 shrink-0 items-center justify-center transition ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
							style: {
								clipPath: HEX,
								animation: s ? void 0 : !byStage.has(CUSTODY[i - 1]?.key ?? "") ? void 0 : "hex-pulse 2.4s ease-in-out infinite"
							},
							children: s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-semibold",
								children: [
									c.label,
									" ",
									!s && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-xs font-normal text-muted-foreground",
										children: "· pending"
									})
								]
							}), s && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [c.key === "beekeeper" ? b.beekeeper || "Beekeeper" : s.stage, s.place ? ` · ${s.place}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										fmtD(s.step_date),
										" · logged ",
										new Date(s.created_at).toLocaleString()
									]
								}),
								s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: s.note
								})
							] })]
						})
					]
				}, c.key);
			})
		})
	});
}
function SealCard({ b }) {
	const qc = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [qr, setQr] = (0, import_react.useState)(null);
	const url = verifyUrl(b.id);
	const sealed = b.status !== "draft";
	const reqs = [
		{
			ok: b.batch_hives.length > 0,
			label: "At least one source hive linked"
		},
		{
			ok: b.recommendation_followed !== null,
			label: "Harvest decision recorded"
		},
		{
			ok: b.trail_steps.some((s) => stageFor(s) === "beekeeper"),
			label: "Beekeeper custody step logged"
		},
		{
			ok: !!(b.forage_location || b.region),
			label: "Forage location recorded"
		}
	];
	const ready = reqs.every((r) => r.ok);
	(0, import_react.useEffect)(() => {
		if (!sealed) return;
		import_lib.toDataURL(url, {
			width: 480,
			margin: 2,
			color: {
				dark: "#2b1d0e",
				light: "#fdf8ec"
			}
		}).then(setQr);
	}, [sealed, url]);
	const seal = async () => {
		setBusy(true);
		const { error } = await supabase.from("batches").update({
			status: "sealed",
			sealed_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", b.id);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Batch sealed — QR code ready");
		qc.invalidateQueries({ queryKey: ["batch", b.id] });
		qc.invalidateQueries({ queryKey: ["batches"] });
	};
	if (sealed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-primary/60 bg-card p-6 text-center shadow-[var(--shadow-honey)] animate-scale-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Verification QR"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: ["Sealed ", b.sealed_at ? new Date(b.sealed_at).toLocaleString() : ""]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-5 w-fit rounded-3xl bg-linen p-3",
				children: qr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: qr,
					alt: `QR code for batch ${b.id}`,
					className: "h-56 w-56 max-w-full"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombLoader, {
					label: "Preparing QR…",
					className: "h-56 w-56 max-w-full"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-mono text-sm",
				children: b.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "honeycomb",
					disabled: !qr,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: qr ?? "#",
						download: `${b.id}-qr.png`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download QR"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: url,
						target: "_blank",
						rel: "noreferrer",
						className: "flex-1 truncate text-primary-deep underline",
						children: url
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": "Copy link",
						onClick: () => {
							navigator.clipboard.writeText(url);
							toast.success("Link copied");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {})
					})]
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-primary-deep" }), " Seal batch"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Sealing locks the batch and creates its public verification QR code."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2 text-sm",
				children: reqs.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [r.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-hive-healthy" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: r.ok ? "" : "text-muted-foreground",
						children: r.label
					})]
				}, r.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "honeycomb",
				size: "lg",
				className: "mt-6 w-full",
				disabled: !ready || busy,
				onClick: seal,
				children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Sealing…"] }) : "Seal Batch"
			})
		]
	});
}
//#endregion
export { BatchDetail as component };
