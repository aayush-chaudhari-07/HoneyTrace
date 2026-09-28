import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hive._id-CBTyIDdP.js
var $$splitComponentImporter = () => import("./hive._id-C1ukbdn7.mjs");
var Route = createFileRoute("/_authenticated/hive/$id")({
	head: () => ({ meta: [
		{ title: "Hive Details — HoneyTrace" },
		{
			name: "description",
			content: "Temperature, humidity, weight and activity trends with anomaly alerts for one hive."
		},
		{
			property: "og:title",
			content: "Hive Details — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Temperature, humidity, weight and activity trends with anomaly alerts for one hive."
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
