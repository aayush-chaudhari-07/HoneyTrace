import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as CloudOff } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { n as HoneycombPageLoader } from "./HoneycombLoader-CsBfrq0U.mjs";
import { a as QueryClientProvider, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route } from "./batches._id-DWPWyYTR.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as getMyRoles, t as PARTNER_ROLES } from "./roles-BHJPXgNj.mjs";
import { t as Route$11 } from "./batches.index-6T30qW14.mjs";
import { t as Route$12 } from "./dashboard-EepUNRmN.mjs";
import { t as Route$13 } from "./hive._id-CBTyIDdP.mjs";
import { t as Route$14 } from "./partner-d9cKklM2.mjs";
import { t as Route$15 } from "./profile-BY5Bq-B5.mjs";
import { t as Route$16 } from "./verify.index-uvXJOBRS.mjs";
import { t as Route$17 } from "./verify._batchId-B7aO5X0n.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Cccge0x8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DcW1v9Hr.css";
/** Current signed-in user (client-side). `undefined` while loading. */
function useUser() {
	const [user, setUser] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
		const { data } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
		return () => data.subscription.unsubscribe();
	}, []);
	return user;
}
var PUBLIC_NAV_LINKS = [
	{
		to: "/platform",
		label: "Platform"
	},
	{
		to: "/traceability",
		label: "Traceability"
	},
	{
		to: "/about",
		label: "About"
	}
];
function Navbar() {
	const user = useUser();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [roles, setRoles] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (user?.id) getMyRoles(user.id).then((r) => setRoles(r));
		else setRoles([]);
	}, [user?.id]);
	const isInternal = Boolean(user || [
		"/dashboard",
		"/batches",
		"/hive",
		"/partner",
		"/profile",
		"/admin"
	].some((p) => pathname.startsWith(p)));
	const isAdmin = roles.includes("admin");
	const isPartnerOnly = roles.some((r) => PARTNER_ROLES.includes(r)) && !roles.includes("beekeeper") && !isAdmin;
	const signOut = async () => {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/login",
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md",
		children: [isInternal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, {
			count: 2,
			className: "internal-bee-swarm pointer-events-none absolute inset-x-0 -bottom-3 h-10 overflow-hidden"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3 group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Logo",
						className: "h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl tracking-tight text-foreground group-hover:text-primary-deep transition-colors",
						children: "HoneyTrace"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "hidden items-center gap-6 md:flex",
					children: [PUBLIC_NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						activeProps: { className: "text-foreground font-semibold" },
						className: "story-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: link.label
					}) }, link.to)), user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isPartnerOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/partner",
						activeProps: { className: "text-primary-deep font-semibold" },
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: "Partner Portal"
					}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Dashboard"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/batches",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Batches"
						}) }),
						isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Partner Portal"
						}) })
					] }), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						activeProps: { className: "text-primary-deep font-semibold" },
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: "Admin"
					}) })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/profile",
						className: "hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border px-2.5 py-1 rounded-full bg-muted/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), roles[0] || "member"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: signOut,
						className: "active:scale-95",
						children: "Sign out"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/verify",
							children: "Verify Jar"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "honey",
						size: "sm",
						className: "active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Login"
						})
					})] })
				})
			]
		})]
	});
}
var COLUMNS = [{
	title: "Platform",
	links: [{
		to: "/platform",
		label: "Overview"
	}, {
		to: "/traceability",
		label: "Traceability"
	}]
}, {
	title: "Company",
	links: [{
		to: "/about",
		label: "About"
	}, {
		to: "/login",
		label: "Login"
	}]
}];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "honeycomb-bg mt-24 border-t border-border/70 bg-espresso text-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "inline-flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Logo",
						className: "h-10 w-10 object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-background",
						children: "HoneyTrace"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-sm text-sm text-background/70",
					children: "Hive-to-jar traceability and smart beekeeping, built for honest honey."
				})]
			}), COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-primary uppercase",
				children: col.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2.5",
				children: col.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					className: "text-sm text-background/70 transition-colors hover:text-primary",
					children: link.label
				}) }, link.to))
			})] }, col.title))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-background/15",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-5 py-5 text-xs text-background/55",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" HoneyTrace. All rights reserved."
				]
			})
		})]
	});
}
/** Fades + slides route content on every navigation. */
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "animate-page-enter",
		children
	}, pathname);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "honey",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Go home"
						})
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const errorMessage = error?.message || String(error || "Unknown error");
	const errorStack = error?.stack || "";
	console.error("[HoneyTrace Root Error]", errorMessage, errorStack);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-lg text-center w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong rendering this page."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "mt-4 text-left border border-destructive/30 bg-destructive/10 rounded-lg p-3 text-xs text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "cursor-pointer font-medium hover:underline",
						children: ["Error Details: ", errorMessage]
					}), errorStack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-2 max-h-48 overflow-auto whitespace-pre-wrap font-mono text-[10px] opacity-90",
						children: errorStack
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Go home"
						})
					})]
				})
			]
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "HoneyTrace — Honey Traceability & Smart Beekeeping" },
			{
				name: "description",
				content: "Hive-to-jar honey traceability and smart beekeeping tools."
			},
			{
				property: "og:title",
				content: "HoneyTrace"
			},
			{
				property: "og:description",
				content: "Hive-to-jar honey traceability and smart beekeeping tools."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png"
			},
			{
				rel: "icon",
				href: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
				sizes: "180x180"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	pendingComponent: HoneycombPageLoader,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function CloudBanner() {
	const [status, setStatus] = (0, import_react.useState)("disconnected");
	(0, import_react.useEffect)(() => {
		if (!"https://pnvdnauwpezzshuwhcia.supabase.co".includes("supabase-not-connected.invalid")) setStatus("connected");
		else setStatus("disconnected");
	}, []);
	if (status === "connected") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "status",
		className: "border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-900 dark:text-amber-200 sm:text-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "h-4 w-4 shrink-0 text-amber-600" }), "HoneyTrace Supabase backend is not connected. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to frontend/.env and restart the dev server."]
		})
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => data.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudBanner, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
					position: "top-right",
					richColors: true
				})
			]
		})
	});
}
var $$splitComponentImporter$8 = () => import("./routes-DE3E73kj.mjs");
var Route$9 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "HoneyTrace — From Hive to Home, Verified Every Step" },
		{
			name: "description",
			content: "HoneyTrace brings full traceability to honey: beekeepers log hive data, AI guides harvest, blockchain records custody, and consumers verify every jar with a scan."
		},
		{
			property: "og:title",
			content: "HoneyTrace — From Hive to Home, Verified Every Step"
		},
		{
			property: "og:description",
			content: "Full honey traceability: hive data, AI-guided harvest, blockchain custody, and one-scan consumer verification."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./route-Di7iQBCH.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/login" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./about-DuaX_8sJ.mjs");
var Route$7 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About — Honest Honey Verified — HoneyTrace" },
		{
			name: "description",
			content: "HoneyTrace exists to protect real beekeepers and ensure consumers enjoy 100% pure, verified honey."
		},
		{
			property: "og:title",
			content: "About — Honest Honey Verified — HoneyTrace"
		},
		{
			property: "og:description",
			content: "HoneyTrace exists to protect real beekeepers and ensure consumers enjoy 100% pure, verified honey."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./explore-Bc31juPt.mjs");
var Route$6 = createFileRoute("/explore")({
	head: () => ({ meta: [
		{ title: "Batch Trail — HoneyTrace" },
		{
			name: "description",
			content: "Explore HoneyTrace honey batches and their verified custody trails."
		},
		{
			property: "og:title",
			content: "Batch Trail — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Explore HoneyTrace honey batches and their verified custody trails."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./login-DqKrCesH.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [
		{ title: "Sign In or Join — HoneyTrace" },
		{
			name: "description",
			content: "Beekeepers, labs, bottlers, distributors and retailers sign in to HoneyTrace to log every step from hive to home."
		},
		{
			property: "og:title",
			content: "Sign In or Join — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Beekeepers and supply-chain partners sign in to HoneyTrace to log every step from hive to home."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./platform-DkAFufx1.mjs");
var Route$4 = createFileRoute("/platform")({
	head: () => ({ meta: [
		{ title: "Platform — Smart Beekeeping & Telemetry — HoneyTrace" },
		{
			name: "description",
			content: "Smart apiary tools for live hive monitoring, ambient environmental tracking, and AI-guided harvest decisions."
		},
		{
			property: "og:title",
			content: "Platform — Smart Beekeeping & Telemetry — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Smart apiary tools for live hive monitoring, ambient environmental tracking, and AI-guided harvest decisions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./reset-password-98v7abct.mjs");
var Route$3 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Reset Password — HoneyTrace" },
		{
			name: "description",
			content: "Choose a new password for your HoneyTrace account."
		},
		{
			property: "og:title",
			content: "Reset Password — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Choose a new password for your HoneyTrace account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./traceability-C-MLahwH.mjs");
var Route$2 = createFileRoute("/traceability")({
	head: () => ({ meta: [
		{ title: "Traceability — Hive to Home — HoneyTrace" },
		{
			name: "description",
			content: "Follow every jar of honey back to its hive, harvest date, lab test certificates, and beekeeper custody."
		},
		{
			property: "og:title",
			content: "Traceability — Hive to Home — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Follow every jar of honey back to its hive, harvest date, lab test certificates, and beekeeper custody."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin-C7pGHLhH.mjs");
var Route$1 = createFileRoute("/_authenticated/admin")({
	beforeLoad: async ({ context }) => {
		const roles = await getMyRoles(context.user.id);
		if (!roles.includes("admin")) throw redirect({ to: roles.some((r) => PARTNER_ROLES.includes(r)) ? "/partner" : "/dashboard" });
	},
	head: () => ({ meta: [
		{ title: "Admin — HoneyTrace" },
		{
			name: "description",
			content: "HoneyTrace administration overview of members and roles."
		},
		{
			property: "og:title",
			content: "Admin — HoneyTrace"
		},
		{
			property: "og:description",
			content: "HoneyTrace administration overview of members and roles."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$10
});
var AuthenticatedRouteRoute = Route$8.update({
	id: "/_authenticated",
	getParentRoute: () => Route$10
});
var AboutRoute = Route$7.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$10
});
var ExploreRoute = Route$6.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$10
});
var LoginRoute = Route$5.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$10
});
var PlatformRoute = Route$4.update({
	id: "/platform",
	path: "/platform",
	getParentRoute: () => Route$10
});
var ResetPasswordRoute = Route$3.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$10
});
var TraceabilityRoute = Route$2.update({
	id: "/traceability",
	path: "/traceability",
	getParentRoute: () => Route$10
});
var AuthenticatedAdminRoute = Route$1.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$12.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPartnerRoute = Route$14.update({
	id: "/partner",
	path: "/partner",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$15.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var VerifyIndexRoute = Route$16.update({
	id: "/verify/",
	path: "/verify/",
	getParentRoute: () => Route$10
});
var VerifyBatchIdRoute = Route$17.update({
	id: "/verify/$batchId",
	path: "/verify/$batchId",
	getParentRoute: () => Route$10
});
var AuthenticatedBatchesIndexRoute = Route$11.update({
	id: "/batches/",
	path: "/batches/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedPartnerRoute,
	AuthenticatedProfileRoute,
	AuthenticatedBatchesIdRoute: Route.update({
		id: "/batches/$id",
		path: "/batches/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedHiveIdRoute: Route$13.update({
		id: "/hive/$id",
		path: "/hive/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedBatchesIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	ExploreRoute,
	LoginRoute,
	PlatformRoute,
	ResetPasswordRoute,
	TraceabilityRoute,
	VerifyBatchIdRoute,
	VerifyIndexRoute
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
