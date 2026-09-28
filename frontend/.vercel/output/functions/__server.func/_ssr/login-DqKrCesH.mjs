import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as cn, t as Button } from "./button-BOPnbRcA.mjs";
import { t as BeeSwarm } from "./BeeSwarm-DHkKYDvK.mjs";
import { t as HoneyDrip } from "./HoneyDrip-Be1sJHXq.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as EyeOff, B as CircleAlert, D as FlaskConical, H as Check, T as Hexagon, k as Eye, r as Truck, s as Store, y as Package } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-CjSqNCa6.mjs";
import { r as HoneycombSpinner } from "./HoneycombLoader-CsBfrq0U.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as getMyRoles, r as homeFor } from "./roles-BHJPXgNj.mjs";
import { t as HoneyJar } from "./HoneyJar-B4V-P_E2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DqKrCesH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-[calc(100vh-4rem)] lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(160deg,var(--color-background)_0%,var(--color-accent)_45%,var(--color-primary)_100%)] px-8 py-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "honeycomb-bg absolute inset-0 opacity-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -left-16 top-10 h-64 w-64 rounded-full bg-primary/30 blur-3xl",
					style: { animation: "blob-float 9s ease-in-out infinite" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-primary-deep/25 blur-3xl",
					style: { animation: "blob-float 12s ease-in-out infinite reverse" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BeeSwarm, { count: 4 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mb-6 flex flex-col items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "HoneyTrace HT Monogram Logo",
						className: "h-28 w-28 object-contain drop-shadow-lg transition-transform duration-500 hover:scale-105"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative w-36 sm:w-44",
					style: { animation: "jar-bob 5s ease-in-out infinite" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[5/6]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyJar, {})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneyDrip, {
					distance: 56,
					className: "relative -mt-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "relative mt-6 max-w-sm text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-snug sm:text-3xl",
						children: ["Every jar carries a story. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-primary-deep",
							children: "Let's keep it honest, hive to home."
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center bg-background px-5 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-md rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-honey)] sm:p-9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex items-center justify-center gap-3 border-b border-border/50 pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/logo.png",
						alt: "HoneyTrace Monogram Logo",
						className: "h-10 w-10 object-contain"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold tracking-tight text-foreground",
						children: "HoneyTrace"
					})]
				}), success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "honeycomb-clip flex h-20 w-20 items-center justify-center bg-[image:var(--gradient-honey)] text-primary-foreground",
							style: { animation: "success-pop 0.6s ease-out both" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "h-9 w-9",
								strokeWidth: 3
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-display text-3xl",
							children: "Welcome to the hive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Taking you to your workspace…"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					mode !== "forgot" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						role: "tablist",
						className: "relative grid grid-cols-2 rounded-full bg-muted p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-[image:var(--gradient-honey)] shadow-[var(--shadow-honey)] transition-transform duration-300 ease-out",
							style: { transform: mode === "signup" ? "translateX(100%)" : "translateX(0)" }
						}), ["login", "signup"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							role: "tab",
							type: "button",
							variant: "ghost",
							"aria-selected": mode === m,
							onClick: () => switchMode(m),
							className: cn("relative z-10 h-auto rounded-full py-2.5 text-sm font-semibold hover:shadow-none", mode === m ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
							children: m === "login" ? "Login" : "Sign Up"
						}, m))]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "link",
						onClick: () => switchMode("login"),
						className: "h-auto px-0 text-sm text-muted-foreground",
						children: "← Back to login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-fade-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-7 text-3xl sm:text-4xl",
								children: mode === "login" ? "Welcome back" : mode === "signup" ? "Join the trail" : "Reset your password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: mode === "login" ? "Sign in to your HoneyTrace workspace." : mode === "signup" ? "Create an account for your part of the honey journey." : "We'll email you a link to choose a new one."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								noValidate: true,
								className: "mt-7 space-y-4",
								children: [
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Name",
										error: errors.name,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: name,
											onChange: (e) => setName(e.target.value),
											autoComplete: "name",
											className: inputCls(errors.name),
											placeholder: "Meera Iyer"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Email",
										error: errors.email,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											value: email,
											onChange: (e) => setEmail(e.target.value),
											autoComplete: "email",
											className: inputCls(errors.email),
											placeholder: "you@apiary.com"
										})
									}),
									mode !== "forgot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Password",
										error: errors.password,
										aside: mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "link",
											onClick: () => switchMode("forgot"),
											className: "h-auto p-0 text-xs",
											children: "Forgot password?"
										}),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: show ? "text" : "password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												autoComplete: mode === "login" ? "current-password" : "new-password",
												className: cn(inputCls(errors.password), "pr-11"),
												placeholder: "••••••••"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "ghost",
												size: "icon",
												onClick: () => setShow(!show),
												"aria-label": show ? "Hide password" : "Show password",
												className: "absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:translate-y-[-50%]",
												children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
											})]
										})
									}),
									mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Confirm password",
										error: errors.confirm,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: show ? "text" : "password",
											value: confirm,
											onChange: (e) => setConfirm(e.target.value),
											autoComplete: "new-password",
											className: inputCls(errors.confirm),
											placeholder: "••••••••"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-2 text-sm font-medium",
											children: "I am a…"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 gap-2 sm:grid-cols-5",
											children: ROLES.map((r) => {
												const active = role === r.id;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
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
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: cn("h-5 w-5 transition", active ? "text-primary-deep scale-110" : "text-muted-foreground") }), r.label]
												}, r.id);
											})
										}),
										errors.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: errors.role })
									] })] }),
									notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "rounded-2xl bg-accent px-4 py-3 text-sm",
										children: notice
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-center pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											variant: "honeycomb",
											size: "lg",
											disabled: busy,
											className: "min-w-56 active:scale-95",
											children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoneycombSpinner, { className: "honeycomb-loader-compact" }), " Connecting…"] }) : mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"
										})
									})
								]
							})
						]
					}, mode),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-7 border-t border-border pt-5 text-center text-sm text-muted-foreground",
						children: [
							"Consumers don't need an account.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/verify",
								className: "font-semibold text-primary-deep hover:underline",
								children: "Just verifying a product? Go here →"
							})
						]
					})
				] })]
			})
		})]
	});
}
function inputCls(error) {
	return cn("h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition duration-200 placeholder:text-muted-foreground/70", "focus:border-primary focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_28%,transparent)]", error ? "border-destructive/50 bg-destructive/5" : "border-input");
}
function ErrorText({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1.5 flex items-center gap-1.5 text-xs text-destructive animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
			" ",
			children
		]
	});
}
function Field({ label, error, aside, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mb-1.5 flex items-center justify-between text-sm font-medium",
				children: [label, aside]
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: error })
		]
	});
}
//#endregion
export { LoginPage as component };
