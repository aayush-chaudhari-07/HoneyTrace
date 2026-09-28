import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getMyRoles } from "./roles-BHJPXgNj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-EepUNRmN.js
var $$splitComponentImporter = () => import("./dashboard-Ba0rvuAv.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	beforeLoad: async ({ context }) => {
		const roles = await getMyRoles(context.user.id);
		if (!(roles.includes("admin") || roles.includes("beekeeper"))) throw redirect({ to: "/partner" });
	},
	head: () => ({ meta: [
		{ title: "Live Hive Dashboard — HoneyTrace" },
		{
			name: "description",
			content: "See every hive's health at a glance, log field readings and spot problems early."
		},
		{
			property: "og:title",
			content: "Live Hive Dashboard — HoneyTrace"
		},
		{
			property: "og:description",
			content: "See every hive's health at a glance, log field readings and spot problems early."
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
