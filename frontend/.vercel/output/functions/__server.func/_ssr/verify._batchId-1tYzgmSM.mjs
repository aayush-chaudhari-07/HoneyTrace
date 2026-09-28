import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { t as Reveal } from "./Reveal-Dfv0tQP7.mjs";
import { C as Link2, H as Check, L as Circle, O as FileText, W as Calendar, b as MapPin, c as Star, d as ShieldCheck, f as ShieldAlert } from "../_libs/lucide-react.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-CsBfrq0U.mjs";
import { o as useQueryClient, r as useSuspenseQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as HEX } from "./HiveHexGrid-CcpP1Vk-.mjs";
import { t as CUSTODY } from "./batch-manage-CnEAzEit.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as HoneyJar } from "./HoneyJar-B4V-P_E2.mjs";
import { n as addTastingNote, r as batchQuery, t as Route } from "./verify._batchId-Dk7SpqVA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-1tYzgmSM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var fmtD = (d) => new Date(d.length === 10 ? d + "T00:00:00" : d).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
function stageKey(s) {
	const t = s.stage.toLowerCase();
	return CUSTODY.find((c) => c.match.some((m) => t.includes(m)))?.key ?? null;
}
/** Recompute each ledger block in the browser and confirm the hash chain links up. */
async function sha(text) {
	const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
	return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function useChainCheck(b) {
	const [state, setState] = (0, import_react.useState)("checking");
	(0, import_react.useEffect)(() => {
		let live = true;
		(async () => {
			if (!b.steps.length || b.steps.some((s) => !s.block_hash)) return live && setState("none");
			let prev = null;
			for (const s of b.steps) {
				const h = await sha([
					prev ?? "GENESIS",
					b.id,
					String(s.position),
					s.stage,
					s.place ?? "",
					s.step_date,
					s.note ?? ""
				].join("|"));
				if (s.prev_hash !== prev || h !== s.block_hash) return live && setState("broken");
				prev = h;
			}
			if (live) setState("intact");
		})();
		return () => {
			live = false;
		};
	}, [b]);
	return state;
}
function VerifyBatch() {
	const { batchId } = Route.useParams();
	const { data } = useSuspenseQuery(batchQuery(batchId));
	const b = data;
	const chain = useChainCheck(b);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {
			b,
			chain
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl space-y-14 px-5 pb-10 pt-4 sm:space-y-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Origin, { b }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Journey, {
					b,
					chain
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Certificates, { b }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tasting, { b })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
			className: "relative mt-6 overflow-hidden py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 3 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative font-serif text-lg",
					children: "Powered by HoneyTrace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative mt-1 text-sm text-muted-foreground",
					children: "Real Honey. Real Journey."
				})
			]
		})
	] });
}
function TrustRing({ score }) {
	const [v, setV] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const start = performance.now();
		let raf = 0;
		const tick = (t) => {
			const p = Math.min(1, (t - start) / 1200);
			setV(Math.round(score * (1 - Math.pow(1 - p, 3))));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [score]);
	const r = 52, c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative h-36 w-36",
		role: "img",
		"aria-label": `Trust Score ${score} out of 100`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 120 120",
			className: "h-full w-full -rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r,
				fill: "var(--card)",
				stroke: "var(--border)",
				strokeWidth: "9"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "60",
				cy: "60",
				r,
				fill: "none",
				stroke: "var(--primary)",
				strokeWidth: "9",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: c * (1 - v / 100)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-4xl leading-none",
				children: v
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
				children: "Trust Score"
			})]
		})]
	});
}
function Hero({ b, chain }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-[image:var(--gradient-honey)]/10 pb-10 pt-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, {
			count: 2,
			className: "opacity-60"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex max-w-2xl flex-col items-center px-5 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-card/80 px-3 py-1 text-xs font-semibold text-primary-deep",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }),
						" ",
						chain === "broken" ? "Ledger check failed" : "Verified authentic"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-end gap-4 sm:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-36 w-28 sm:h-44 sm:w-36",
							style: { animation: "jar-bob 5s ease-in-out infinite" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyJar, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
							distance: 28,
							duration: 2.8,
							className: "-mt-3 scale-75"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustRing, { score: b.trust_score })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
					children: b.id
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-4xl leading-tight sm:text-5xl",
					children: b.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-muted-foreground",
					children: [
						b.floral,
						" honey · ",
						b.region
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: ["Harvested by ", b.beekeeper || "a HoneyTrace beekeeper"]
				})
			]
		})]
	});
}
function Section({ eyebrow, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary-deep",
			children: eyebrow
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 text-3xl",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children
		})
	] });
}
function Origin({ b }) {
	const hasMap = b.forage_lat != null && b.forage_lng != null;
	const lat = b.forage_lat ?? 0, lng = b.forage_lng ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Origin",
		title: "Where it began",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-primary-deep" }), " Harvest"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-semibold",
						children: b.harvest_start ? `${fmtD(b.harvest_start)} – ${fmtD(b.harvest_end ?? b.harvested)}` : fmtD(b.harvested)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary-deep" }), " Forage area"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-semibold",
						children: b.forage_location || b.region
					})]
				})]
			}),
			b.hives.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: b.hives.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-3 w-3 bg-primary",
							style: { clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)" }
						}),
						" ",
						h.name,
						h.location ? ` · ${h.location}` : ""
					]
				}, h.name))
			}),
			hasMap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				title: "Forage location map",
				loading: "lazy",
				className: "mt-4 h-52 w-full rounded-2xl border border-border",
				src: `https://www.openstreetmap.org/export/embed.html?bbox=${lng - .03},${lat - .02},${lng + .03},${lat + .02}&layer=mapnik&marker=${lat},${lng}`
			})
		]
	});
}
function Journey({ b, chain }) {
	const byStage = /* @__PURE__ */ new Map();
	b.steps.forEach((s) => {
		const k = stageKey(s);
		if (k && !byStage.has(k)) byStage.set(k, s);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Custody journey",
		title: "Hive to home",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: `mb-5 flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm ${chain === "broken" ? "bg-destructive/10 text-destructive" : "bg-accent"}`,
			children: [
				chain === "checking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }) : chain === "broken" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-4 w-4 text-primary-deep" }),
				chain === "checking" && "Checking the ledger on your device…",
				chain === "intact" && `Ledger intact — all ${b.steps.length} records re-checked on your device.`,
				chain === "broken" && "Warning: a record doesn't match its ledger seal.",
				chain === "none" && "No sealed ledger records for this batch yet."
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "relative",
			children: CUSTODY.map((c, i) => {
				const s = byStage.get(c.key);
				const nextDone = i < CUSTODY.length - 1 && byStage.has(CUSTODY[i + 1].key);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 60,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative flex gap-4 pb-8",
						children: [
							i < CUSTODY.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-[22px] top-12 h-[calc(100%-3rem)] w-1 rounded-full",
								style: { background: s && nextDone ? "var(--primary)" : "repeating-linear-gradient(to bottom, var(--border) 0 6px, transparent 6px 12px)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `relative flex h-12 w-12 shrink-0 items-center justify-center ${s ? "bg-primary text-espresso" : "bg-muted text-muted-foreground"}`,
								style: { clipPath: HEX },
								children: s ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 pt-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-semibold",
									children: [c.label, !s && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-1 text-xs font-normal text-muted-foreground",
										children: "· not yet"
									})]
								}), s && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											c.key === "beekeeper" ? b.beekeeper || s.stage : s.stage,
											s.place ? ` · ${s.place}` : "",
											" · ",
											fmtD(s.step_date)
										]
									}),
									s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: s.note
									}),
									s.block_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 truncate font-mono text-[10px] text-muted-foreground",
										title: s.block_hash,
										children: [
											"seal ",
											s.block_hash.slice(0, 16),
											"…"
										]
									})
								] })]
							})
						]
					})
				}, c.key);
			})
		})]
	});
}
function Certificates({ b }) {
	const labs = b.steps.filter((s) => stageKey(s) === "lab" || s.document_url);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		eyebrow: "Certificates",
		title: "Lab verification",
		children: labs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-2xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground",
			children: "No lab report has been added to this batch yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: labs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-honey)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-primary-deep",
						style: { clipPath: HEX },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: s.document_label || s.stage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									s.place,
									" · ",
									fmtD(s.step_date)
								]
							}),
							s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: s.note
							}),
							s.block_hash && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 truncate font-mono text-[10px] text-muted-foreground",
								children: ["ref ", s.block_hash.slice(0, 24)]
							})
						]
					}),
					s.document_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: s.document_url,
							target: "_blank",
							rel: "noreferrer",
							children: "View"
						})
					})
				]
			}) }, s.id))
		})
	});
}
function Stars({ value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-1",
		role: onChange ? "radiogroup" : void 0,
		"aria-label": "Rating",
		children: [
			1,
			2,
			3,
			4,
			5
		].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !onChange,
			onClick: () => onChange?.(n),
			"aria-label": `${n} star${n > 1 ? "s" : ""}`,
			className: onChange ? "transition active:scale-90" : "cursor-default",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-5 w-5 ${n <= value ? "fill-primary text-primary" : "text-border"}` })
		}, n))
	});
}
function Tasting({ b }) {
	const qc = useQueryClient();
	const submit = useServerFn(addTastingNote);
	const [name, setName] = (0, import_react.useState)("");
	const [rating, setRating] = (0, import_react.useState)(0);
	const [note, setNote] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	const m = useMutation({
		mutationFn: () => submit({ data: {
			batchId: b.id,
			name: name || void 0,
			rating,
			note
		} }),
		onSuccess: () => {
			setDone(true);
			setName("");
			setNote("");
			setRating(0);
			qc.invalidateQueries({ queryKey: ["public-batch", b.id] });
			setTimeout(() => setDone(false), 3500);
		},
		onError: () => setErr("Couldn't send your note — please try again.")
	});
	const avg = b.notes.length ? b.notes.reduce((s, n) => s + n.rating, 0) / b.notes.length : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
		eyebrow: "Tasting notes",
		title: "What tasters say",
		children: [
			b.notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mt-2 mb-4 flex items-center gap-2 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: Math.round(avg) }),
					" ",
					avg.toFixed(1),
					" from ",
					b.notes.length,
					" taster",
					b.notes.length > 1 ? "s" : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				className: "rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-honey)]",
				onSubmit: (e) => {
					e.preventDefault();
					setErr("");
					if (!rating) return setErr("Tap a star to rate this honey.");
					if (note.trim().length < 3) return setErr("Add a few words about the taste.");
					m.mutate();
				},
				children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-8 text-center",
					style: { animation: "success-pop 0.5s ease-out" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto flex h-14 w-14 items-center justify-center bg-primary text-espresso",
						style: { clipPath: HEX },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 font-serif text-2xl",
						children: "Thanks for tasting!"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: "Your rating"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, {
							value: rating,
							onChange: setRating
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: note,
						onChange: (e) => setNote(e.target.value),
						maxLength: 500,
						rows: 3,
						placeholder: "Floral, buttery, a hint of citrus…",
						"aria-label": "Tasting note",
						className: "mt-4 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						maxLength: 60,
						placeholder: "Your name (optional)",
						"aria-label": "Your name",
						className: "mt-3 w-full rounded-full border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/30"
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-primary-deep",
						children: err
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "honey",
						size: "lg",
						className: "mt-4 w-full",
						disabled: m.isPending,
						children: m.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Sending…"] }) : "Share tasting note"
					})
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-5 space-y-3",
				children: b.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-2xl border border-border bg-card p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: n.name || "A honey lover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stars, { value: n.rating })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: n.note
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: fmtD(n.created_at)
						})
					]
				}, n.id))
			})
		]
	});
}
//#endregion
export { VerifyBatch as component };
