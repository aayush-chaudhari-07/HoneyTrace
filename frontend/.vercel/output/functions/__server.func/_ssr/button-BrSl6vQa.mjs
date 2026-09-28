import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { u as Slot } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BrSl6vQa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var _jsxFileName = "C:/Users/ayush/Downloads/Honey Trace/honey-trace-main/frontend/src/components/ui/button.tsx";
var buttonVariants = cva("press-ripple inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium cursor-pointer transition-all duration-200 ease-out hover:scale-[1.035] hover:shadow-[var(--shadow-honey)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-[var(--shadow-honey)] hover:bg-primary-deep hover:shadow-[var(--shadow-honey-strong)]",
			honey: "bg-[image:var(--gradient-honey)] text-primary-foreground shadow-[var(--shadow-honey)] hover:shadow-[var(--shadow-honey-strong)]",
			honeycomb: "honeycomb-clip rounded-none bg-[image:var(--gradient-honey)] px-8 text-primary-foreground shadow-[var(--shadow-honey)] hover:shadow-[var(--shadow-honey-strong)]",
			espresso: "bg-espresso text-background shadow-[var(--shadow-honey)] hover:shadow-[var(--shadow-honey-strong)]",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-[var(--shadow-honey)]",
			outline: "border border-primary-deep/40 bg-card text-foreground hover:border-primary-deep hover:bg-accent hover:shadow-[var(--shadow-honey)]",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent hover:shadow-[var(--shadow-honey)]",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary-deep underline-offset-4 hover:underline hover:shadow-none hover:scale-100"
		},
		size: {
			default: "h-10 px-5 py-2",
			sm: "h-8 px-4 text-xs",
			lg: "h-12 px-8 text-base",
			icon: "h-10 w-10"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 50,
		columnNumber: 7
	}, void 0);
});
Button.displayName = "Button";
//#endregion
export { cn as n, Button as t };
