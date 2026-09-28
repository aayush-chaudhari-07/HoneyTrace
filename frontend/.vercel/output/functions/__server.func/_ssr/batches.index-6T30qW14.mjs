import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getMyRoles } from "./roles-BHJPXgNj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches.index-6T30qW14.js
var $$splitComponentImporter = () => import("./batches.index-DewxFhIb.mjs");
var Route = createFileRoute("/_authenticated/batches/")({
	beforeLoad: async ({ context }) => {
		const roles = await getMyRoles(context.user.id);
		if (!(roles.includes("admin") || roles.includes("beekeeper"))) throw redirect({ to: "/partner" });
	},
	head: () => ({ meta: [
		{ title: "My Batches — HoneyTrace" },
		{
			name: "description",
			content: "Create honey batches from your hives, track status and seal them with a verification QR."
		},
		{
			property: "og:title",
			content: "My Batches — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Create honey batches from your hives, track status and seal them with a verification QR."
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
