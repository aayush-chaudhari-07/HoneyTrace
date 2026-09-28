import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-Gaq_Q82W.js
var $$splitComponentImporter = () => import("./profile-DuG-nGO6.mjs");
var Route = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Profile — HoneyTrace" },
		{
			name: "description",
			content: "Manage your HoneyTrace beekeeper profile."
		},
		{
			property: "og:title",
			content: "Profile — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Manage your HoneyTrace beekeeper profile."
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
