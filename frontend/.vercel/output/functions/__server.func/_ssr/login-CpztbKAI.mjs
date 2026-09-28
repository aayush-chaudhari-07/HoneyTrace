import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { n as cn, t as Button } from "./button-BrSl6vQa.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DUogPviC.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Bm61_C9a.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as EyeOff, B as CircleAlert, D as FlaskConical, H as Check, T as Hexagon, k as Eye, r as Truck, s as Store, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-DW-8h-Ow.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-EB1gv_5A.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as getMyRoles, r as homeFor } from "./roles-CLxMAwlJ.mjs";
import { t as HoneyJar } from "./HoneyJar-DUh6gVMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-CpztbKAI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/routes/login.tsx?tsr-split=component";
var ROLES = [
	{
		id: "beekeeper",
		label: "Beekeeper",
		icon: Hexagon
	},
	{
		id: "lab",
		label: "Lab",
		icon: FlaskConical
	},
	{
		id: "bottler",
		label: "Bottler",
		icon: Package
	},
	{
		id: "distributor",
		label: "Distributor",
		icon: Truck
	},
	{
		id: "retailer",
		label: "Retailer",
		icon: Store
	}
];
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function LoginPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)(null);
	const [show, setShow] = (0, import_react.useState)(false);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const goHome = async (userId) => {
		setSuccess(true);
		const roles = await getMyRoles(userId);
		setTimeout(() => navigate({
			...homeFor(roles),
			replace: true
		}), 1100);
	};
	(0, import_react.useEffect)(() => {
		supabase.auth.getUser().then(({ data }) => {
			if (data.user) goHome(data.user.id);
		});
	}, []);
	const validate = () => {
		const e = {};
		if (mode === "signup" && name.trim().length < 2) e.name = "Tell us your name so partners know who you are.";
		if (!EMAIL_RE.test(email)) e.email = "That email doesn't look quite right.";
		if (mode === "forgot") return e;
		if (mode === "signup") {
			if (password.length < 8) e.password = "Use at least 8 characters for a strong hive lock.";
			if (confirm !== password) e.confirm = "Passwords don't match yet.";
			if (!role) e.role = "Pick the role that best describes you.";
		} else if (!password) e.password = "Enter your password.";
		return e;
	};
	const switchMode = (m) => {
		setMode(m);
		setErrors({});
		setNotice(null);
	};
	const submit = async (ev) => {
		ev.preventDefault();
		const e = validate();
		setErrors(e);
		if (Object.keys(e).length) return;
		setBusy(true);
		setNotice(null);
		try {
			if (mode === "forgot") {
				const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
				if (error) throw error;
				setNotice("If that email has an account, a reset link is on its way.");
				toast.success("Password reset email sent.");
			} else if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/login`,
						data: {
							full_name: name.trim(),
							role
						}
					}
				});
				if (error) throw error;
				const user = data.user;
				if (user) {
					const { error: userErr } = await supabase.from("users").upsert({
						id: user.id,
						email: user.email,
						name: name.trim(),
						role,
						contact: null
					});
					if (userErr) console.warn("[Supabase] Users table insert notice:", userErr.message);
					const { error: roleErr } = await supabase.from("user_roles").upsert({
						user_id: user.id,
						role
					});
					if (roleErr) console.warn("[Supabase] User roles insert notice:", roleErr.message);
					const { error: profErr } = await supabase.from("profiles").upsert({
						id: user.id,
						display_name: name.trim()
					});
					if (profErr) console.warn("[Supabase] Profiles insert notice:", profErr.message);
				}
				toast.success(`Account created for ${name.trim()} (${role})!`);
				if (data.session && data.user) await goHome(data.user.id);
				else setNotice(`Account created! Check ${email} for a confirmation link, or sign in below.`);
			} else {
				const { data, error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
				toast.success("Signed in successfully!");
				await goHome(data.user.id);
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Something went wrong during authentication";
			if (/invalid login/i.test(msg)) setErrors({ password: "Email or password isn't right — give it another try." });
			else {
				toast.error(msg);
				setNotice(`Error: ${msg}`);
			}
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "grid min-h-[calc(100vh-4rem)] lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
			className: "relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-background)_0%,var(--color-accent)_45%,var(--color-primary)_100%)] px-8 py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "honeycomb-bg absolute inset-0 opacity-40" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 186,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl",
					style: { animation: "blob-float 9s ease-in-out infinite" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 187,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary-deep/25 blur-3xl",
					style: { animation: "blob-float 12s ease-in-out infinite reverse" }
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 190,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BeeSwarm, { count: 4 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 193,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative mb-6 flex flex-col items-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/logo.png",
						alt: "HoneyTrace HT Monogram Logo",
						className: "h-28 w-28 object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 197,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative w-36 sm:w-44",
					style: { animation: "jar-bob 5s ease-in-out infinite" },
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "aspect-[5/6]",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyJar, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 203,
							columnNumber: 41
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 203,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 200,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneyDrip, {
					distance: 56,
					className: "relative -mt-2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 205,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("blockquote", {
					className: "relative mt-6 max-w-sm text-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "font-display text-2xl leading-snug sm:text-3xl",
						children: ["Every jar carries a story. ", /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "italic text-primary-deep",
							children: "Let's keep it honest, hive to home."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 40
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 206,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 185,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", {
			className: "flex items-center justify-center bg-background px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-honey)] sm:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "mb-6 flex items-center justify-center gap-3 border-b border-border/50 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Monogram Logo",
						className: "h-10 w-10 object-contain"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-display text-2xl font-bold tracking-tight text-foreground",
						children: "HoneyTrace"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 218,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 11
				}, this), success ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col items-center py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "honeycomb-clip flex h-20 w-20 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
							style: { animation: "success-pop 0.6s ease-out both" },
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, {
								className: "h-9 w-9",
								strokeWidth: 3
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 224,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-6 font-display text-3xl",
							children: "Welcome to the hive"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 226,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Taking you to your workspace…"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 227,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 220,
					columnNumber: 22
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
					mode !== "forgot" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						role: "tablist",
						className: "relative grid grid-cols-2 rounded-full bg-muted p-1",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							"aria-hidden": true,
							className: "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[image:var(--gradient-honey)] shadow-[var(--shadow-honey)] transition-transform duration-300 ease-out",
							style: { transform: mode === "signup" ? "translateX(100%)" : "translateX(0)" }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 19
						}, this), ["login", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							role: "tab",
							type: "button",
							variant: "ghost",
							"aria-selected": mode === m,
							onClick: () => switchMode(m),
							className: cn("relative z-10 h-auto rounded-full py-2.5 text-sm font-semibold hover:shadow-none", mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
							children: m === "login" ? "Login" : "Sign Up"
						}, m, false, {
							fileName: _jsxFileName,
							lineNumber: 233,
							columnNumber: 60
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 229,
						columnNumber: 36
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "link",
						onClick: () => switchMode("login"),
						className: "h-auto px-0 text-sm text-muted-foreground",
						children: "← Back to login"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 26
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
								className: "mt-7 text-3xl sm:text-4xl",
								children: mode === "login" ? "Welcome back" : mode === "signup" ? "Join the trail" : "Reset your password"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: mode === "login" ? "Sign in to your HoneyTrace workspace." : mode === "signup" ? "Create an account for your part of the honey journey." : "We'll email you a link to choose a new one."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
								onSubmit: submit,
								noValidate: true,
								className: "mt-7 space-y-4",
								children: [
									mode === "signup" && /* @__PURE__ */ (void 0)(Field, {
										label: "Name",
										error: errors.name,
										children: /* @__PURE__ */ (void 0)("input", {
											value: name,
											onChange: (e) => setName(e.target.value),
											autoComplete: "name",
											className: inputCls(errors.name),
											placeholder: "Meera Iyer"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 248,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 247,
										columnNumber: 41
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Field, {
										label: "Email",
										error: errors.email,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "email",
											className: inputCls(errors.email),
											placeholder: "you@apiary.com"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 251,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 250,
										columnNumber: 19
									}, this),
									mode !== "forgot" && /* @__PURE__ */ (void 0)(Field, {
										label: "Password",
										error: errors.password,
										aside: mode === "login" && /* @__PURE__ */ (void 0)(Button, {
											type: "button",
											variant: "link",
											onClick: () => switchMode("forgot"),
											className: "h-auto p-0 text-xs",
											children: "Forgot password?"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 116
										}, this),
										children: /* @__PURE__ */ (void 0)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (void 0)("input", {
												type: show ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												autoComplete: mode === "login" ? "current-password" : "new-password",
												className: cn(inputCls(errors.password), "pr-11"),
												placeholder: "••••••••"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 255,
												columnNumber: 25
											}, this), /* @__PURE__ */ (void 0)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												onClick: () => setShow(!show),
												"aria-label": show ? "Hide password" : "Show password",
												className: "absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:translate-y-[-50%]",
												children: show ? /* @__PURE__ */ (void 0)(EyeOff, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 257,
													columnNumber: 35
												}, this) : /* @__PURE__ */ (void 0)(Eye, { className: "h-4 w-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 257,
													columnNumber: 68
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 256,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 254,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 253,
										columnNumber: 41
									}, this),
									mode === "signup" && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Field, {
										label: "Confirm password",
										error: errors.confirm,
										children: /* @__PURE__ */ (void 0)("input", {
											type: show ? "text" : "password",
											value: confirm,
											onChange: (e) => setConfirm(e.target.value),
											autoComplete: "new-password",
											className: inputCls(errors.confirm),
											placeholder: "••••••••"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 263,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 262,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", { children: [
										/* @__PURE__ */ (void 0)("p", {
											className: "mb-2 text-sm font-medium",
											children: "I am a…"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 266,
											columnNumber: 25
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
											children: ROLES.map((r) => {
												const active = role === r.id;
												return /* @__PURE__ */ (void 0)("button", {
													type: "button",
													"aria-pressed": active,
													onClick: () => {
														setRole(r.id);
														setErrors((x) => ({
															...x,
															role: void 0
														}));
													},
													className: cn("flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-semibold transition duration-200 hover:-translate-y-0.5 active:scale-95", active ? "border-primary-deep bg-accent shadow-[var(--shadow-honey)]" : "border-border bg-background hover:border-primary/60"),
													children: [/* @__PURE__ */ (void 0)(r.icon, { className: cn("h-5 w-5 transition", active ? "text-primary-deep scale-110" : "text-muted-foreground") }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 277,
														columnNumber: 33
													}, this), r.label]
												}, r.id, true, {
													fileName: _jsxFileName,
													lineNumber: 270,
													columnNumber: 30
												}, this);
											})
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 25
										}, this),
										errors.role && /* @__PURE__ */ (void 0)(ErrorText, { children: errors.role }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 282,
											columnNumber: 41
										}, this)
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 265,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 261,
										columnNumber: 41
									}, this),
									notice && /* @__PURE__ */ (void 0)("p", {
										className: "rounded-2xl bg-accent px-4 py-3 text-sm",
										children: notice
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 286,
										columnNumber: 30
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex justify-center pt-2",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
											type: "submit",
											variant: "honeycomb",
											size: "lg",
											disabled: busy,
											className: "min-w-56 active:scale-95",
											children: busy ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(HoneycombSpinner, { className: "honeycomb-loader-compact" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 290,
												columnNumber: 34
											}, this), " Connecting…"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 290,
												columnNumber: 32
											}, this) : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 289,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 17
							}, this)
						]
					}, mode, true, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 15
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground",
						children: [
							"Consumers don't need an account.",
							" ",
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
								to: "/verify",
								className: "font-semibold text-primary-deep hover:underline",
								children: "Just verifying a product? Go here →"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 296,
						columnNumber: 15
					}, this)
				] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 228,
					columnNumber: 22
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 215,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 214,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 183,
		columnNumber: 10
	}, this);
}
function inputCls(error) {
	return cn("h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition duration-200 placeholder:text-muted-foreground/70", "focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]", error ? "border-destructive/50 bg-destructive/5" : "border-input");
}
function ErrorText({ children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
		className: "mt-1.5 flex items-center gap-1.5 text-xs text-destructive animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 314,
				columnNumber: 7
			}, this),
			" ",
			children
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 313,
		columnNumber: 10
	}, this);
}
function Field({ label, error, aside, children }) {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
				className: "mb-1.5 flex items-center justify-between text-sm font-medium",
				children: [label, aside]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 329,
				columnNumber: 7
			}, this),
			children,
			error && /* @__PURE__ */ (void 0)(ErrorText, { children: error }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 334,
				columnNumber: 17
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 328,
		columnNumber: 10
	}, this);
}
//#endregion
export { LoginPage as component };
