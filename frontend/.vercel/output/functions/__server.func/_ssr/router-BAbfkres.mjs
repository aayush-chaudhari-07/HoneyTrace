import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as CloudOff } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { n as HoneycombPageLoader } from "./HoneycombLoader-EB1gv_5A.mjs";
import { a as QueryClientProvider, o as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route } from "./batches._id-3lK-Gprk.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as getMyRoles, t as PARTNER_ROLES } from "./roles-CLxMAwlJ.mjs";
import { t as Route$11 } from "./batches.index-Dvd1i7F9.mjs";
import { t as Route$12 } from "./dashboard-Hg6T5rTf.mjs";
import { t as Route$13 } from "./hive._id-VwQBVZor.mjs";
import { t as Route$14 } from "./partner-HdbLeH7X.mjs";
import { t as Route$15 } from "./profile-Gaq_Q82W.mjs";
import { t as Route$16 } from "./verify.index-pGAbySI7.mjs";
import { t as Route$17 } from "./verify._batchId-DfSe1eDm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BAbfkres.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var styles_default = "/assets/styles-CvCYeH3C.css";
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
var _jsxFileName$4 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/Navbar.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
		className: "sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md",
		children: [isInternal && /* @__PURE__ */ (void 0)(BeeSwarm, {
			count: 2,
			className: "internal-bee-swarm pointer-events-none absolute inset-x-0 -bottom-3 h-10 overflow-hidden"
		}, void 0, false, {
			fileName: _jsxFileName$4,
			lineNumber: 48,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "flex items-center gap-3 group",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Logo",
						className: "h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 55,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-xl tracking-tight text-foreground group-hover:text-primary-deep transition-colors",
						children: "HoneyTrace"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 60,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 54,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
					className: "hidden items-center gap-6 md:flex",
					children: [PUBLIC_NAV_LINKS.map((link) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: link.to,
						activeProps: { className: "text-foreground font-semibold" },
						className: "story-link text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: link.label
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 68,
						columnNumber: 15
					}, this) }, link.to, false, {
						fileName: _jsxFileName$4,
						lineNumber: 67,
						columnNumber: 13
					}, this)), user && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [isPartnerOnly ? /* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)(Link, {
						to: "/partner",
						activeProps: { className: "text-primary-deep font-semibold" },
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: "Partner Portal"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 83,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 82,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [
						/* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)(Link, {
							to: "/dashboard",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Dashboard"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 94,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 93,
							columnNumber: 19
						}, this),
						/* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)(Link, {
							to: "/batches",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Batches"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 103,
							columnNumber: 21
						}, this) }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 102,
							columnNumber: 19
						}, this),
						isAdmin && /* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)(Link, {
							to: "/partner",
							activeProps: { className: "text-primary-deep font-semibold" },
							className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: "Partner Portal"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 113,
							columnNumber: 23
						}, this) }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 112,
							columnNumber: 21
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 92,
						columnNumber: 17
					}, this), isAdmin && /* @__PURE__ */ (void 0)("li", { children: /* @__PURE__ */ (void 0)(Link, {
						to: "/admin",
						activeProps: { className: "text-primary-deep font-semibold" },
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: "Admin"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 126,
						columnNumber: 19
					}, this) }, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 125,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 80,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 65,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3",
					children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
						to: "/profile",
						className: "hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground border border-border px-2.5 py-1 rounded-full bg-muted/50",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 146,
							columnNumber: 17
						}, this), roles[0] || "member"]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 142,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: signOut,
						className: "active:scale-95",
						children: "Sign out"
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 149,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 141,
						columnNumber: 13
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/verify",
							children: "Verify Jar"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 156,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 155,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "honey",
						size: "sm",
						className: "active:scale-95",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/login",
							children: "Login"
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 159,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$4,
						lineNumber: 158,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 154,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 139,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 53,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$4,
		lineNumber: 46,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/Footer.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
		className: "honeycomb-bg mt-24 border-t border-border/70 bg-espresso text-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 md:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "sm:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					className: "inline-flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Logo",
						className: "h-10 w-10 object-contain"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 26,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-2xl text-background",
						children: "HoneyTrace"
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 27,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 25,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-3 max-w-sm text-sm text-background/70",
					children: "Hive-to-jar traceability and smart beekeeping, built for honest honey."
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 29,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 24,
				columnNumber: 9
			}, this), COLUMNS.map((col) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-xs font-semibold tracking-[0.18em] text-primary uppercase",
				children: col.title
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 36,
				columnNumber: 13
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
				className: "mt-4 space-y-2.5",
				children: col.links.map((link) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: link.to,
					className: "text-sm text-background/70 transition-colors hover:text-primary",
					children: link.label
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 42,
					columnNumber: 19
				}, this) }, link.to, false, {
					fileName: _jsxFileName$3,
					lineNumber: 41,
					columnNumber: 17
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 39,
				columnNumber: 13
			}, this)] }, col.title, true, {
				fileName: _jsxFileName$3,
				lineNumber: 35,
				columnNumber: 11
			}, this))]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 23,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "border-t border-background/15",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "mx-auto max-w-6xl px-5 py-5 text-xs text-background/55",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" HoneyTrace. All rights reserved."
				]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 56,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$3,
			lineNumber: 55,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$3,
		lineNumber: 22,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/PageTransition.tsx";
/** Fades + slides route content on every navigation. */
function PageTransition({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "animate-page-enter",
		children
	}, pathname, false, {
		fileName: _jsxFileName$2,
		lineNumber: 9,
		columnNumber: 5
	}, this);
}
var _jsxFileName$1 = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/ui/sonner.tsx";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 7,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/__root.tsx";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 26,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 27,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 28,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "honey",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							children: "Go home"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 32,
							columnNumber: 43
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 32,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 31,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 24,
		columnNumber: 5
	}, this);
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 49,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						onClick: () => {
							router.invalidate();
							reset();
						},
						children: "Try again"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 53,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/",
							children: "Go home"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 61,
							columnNumber: 45
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 61,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 52,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 45,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 44,
		columnNumber: 5
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HeadContent, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 114,
			columnNumber: 9
		}, this) }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 113,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 118,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 116,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 112,
		columnNumber: 5
	}, this);
}
function CloudBanner() {
	const [status, setStatus] = (0, import_react.useState)("disconnected");
	(0, import_react.useEffect)(() => {
		if (!"https://pnvdnauwpezzshuwhcia.supabase.co".includes("supabase-not-connected.invalid")) setStatus("connected");
		else setStatus("disconnected");
	}, []);
	if (status === "connected") return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		role: "status",
		className: "border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-900 dark:text-amber-200 sm:text-sm",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "inline-flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudOff, { className: "h-4 w-4 shrink-0 text-amber-600" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 141,
				columnNumber: 9
			}, this), "HoneyTrace Supabase backend is not connected. Please add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to frontend/.env and restart the dev server."]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 140,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 139,
		columnNumber: 5
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Navbar, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 163,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CloudBanner, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 13
					}, this) }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 166,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 165,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Footer, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toaster$1, {
					position: "top-right",
					richColors: true
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 162,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 161,
		columnNumber: 5
	}, this);
}
var $$splitComponentImporter$8 = () => import("./routes-BSEiU0Y7.mjs");
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
var $$splitComponentImporter$7 = () => import("./route-fkbqH-mD.mjs");
var Route$8 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/login" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./about-BE7YHhkk.mjs");
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
var $$splitComponentImporter$5 = () => import("./explore-CEVmQTf8.mjs");
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
var $$splitComponentImporter$4 = () => import("./login-CpztbKAI.mjs");
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
var $$splitComponentImporter$3 = () => import("./platform-DJDB2tHo.mjs");
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
var $$splitComponentImporter$2 = () => import("./reset-password-B-yDQTGc.mjs");
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
var $$splitComponentImporter$1 = () => import("./traceability-B3kLFSq9.mjs");
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
var $$splitComponentImporter = () => import("./admin-C4Hv4FIs.mjs");
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
