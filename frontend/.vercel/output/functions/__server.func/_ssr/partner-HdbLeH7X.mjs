import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getMyRoles, t as PARTNER_ROLES } from "./roles-CLxMAwlJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner-HdbLeH7X.js
var $$splitComponentImporter = () => import("./partner-OfjBn2EO.mjs");
var Route = createFileRoute("/_authenticated/partner")({
	beforeLoad: async ({ context }) => {
		const roles = await getMyRoles(context.user.id);
		if (!(roles.includes("admin") || roles.some((r) => PARTNER_ROLES.includes(r)))) throw redirect({ to: "/dashboard" });
	},
	head: () => ({ meta: [
		{ title: "Partner Queue — HoneyTrace" },
		{
			name: "description",
			content: "Labs, bottlers, distributors and retailers see honey batches awaiting their custody update."
		},
		{
			property: "og:title",
			content: "Partner Queue — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Role-scoped custody updates for honey batches on HoneyTrace."
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
//#endregion
export { Route as t };
