import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches._id-DWPWyYTR.js
var $$splitComponentImporter = () => import("./batches._id-DgzwHuVB.mjs");
var Route = createFileRoute("/_authenticated/batches/$id")({
	head: ({ params }) => ({ meta: [
		{ title: `Batch ${params.id} — HoneyTrace` },
		{
			name: "description",
			content: "Batch genealogy, harvest decision, custody timeline and verification QR."
		},
		{
			property: "og:title",
			content: `Batch ${params.id} — HoneyTrace`
		},
		{
			property: "og:description",
			content: "Batch genealogy, harvest decision, custody timeline and verification QR."
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
