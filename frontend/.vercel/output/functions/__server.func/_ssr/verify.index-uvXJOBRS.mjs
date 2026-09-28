import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify.index-uvXJOBRS.js
var $$splitComponentImporter = () => import("./verify.index-DeN5eHCd.mjs");
var Route = createFileRoute("/verify/")({
	head: () => ({ meta: [
		{ title: "Verify Your Honey — HoneyTrace" },
		{
			name: "description",
			content: "Scan the QR code on your honey jar or enter its batch code to see its verified journey from hive to home."
		},
		{
			property: "og:title",
			content: "Verify Your Honey — HoneyTrace"
		},
		{
			property: "og:description",
			content: "Scan the QR code on your jar to see its verified journey from hive to home."
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
	validateSearch: (s) => typeof s["code"] === "string" ? { code: s["code"] } : {},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
