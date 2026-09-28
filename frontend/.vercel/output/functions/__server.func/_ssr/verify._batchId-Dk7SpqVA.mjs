import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D_ohKVkn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify._batchId-Dk7SpqVA.js
var getPublicBatch = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ id: stringType().trim().min(1).max(40) }).parse(d)).handler(createSsrRpc("450a8db74ccb3b2700786bf29a13c29d8297ff53f3886d2a639550bf6539166d"));
var addTastingNote = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	batchId: stringType().trim().min(1).max(40),
	name: stringType().trim().max(60).optional(),
	rating: numberType().int().min(1).max(5),
	note: stringType().trim().min(3).max(500)
}).parse(d)).handler(createSsrRpc("0bf14254c2ad97f6c54bf4f802ba93fc67054028a1b07fd5fc6f37853fb3a1ae"));
var batchQuery = (id) => queryOptions({
	queryKey: ["public-batch", id.toUpperCase()],
	queryFn: () => getPublicBatch({ data: { id } })
});
var $$splitComponentImporter = () => import("./verify._batchId-1tYzgmSM.mjs");
var $$splitErrorComponentImporter = () => import("./verify._batchId-CzSCMdgq.mjs");
var $$splitNotFoundComponentImporter = () => import("./verify._batchId-D7CCfHTL.mjs");
var Route = createFileRoute("/verify/$batchId")({
	loader: async ({ context, params }) => {
		const b = await context.queryClient.ensureQueryData(batchQuery(params.batchId));
		if (!b) throw notFound();
		return {
			name: b.name,
			floral: b.floral,
			region: b.region,
			score: b.trust_score
		};
	},
	head: ({ loaderData, params }) => {
		const title = loaderData ? `${loaderData.name} — Verified by HoneyTrace` : `Batch ${params.batchId} — HoneyTrace`;
		const desc = loaderData ? `${loaderData.floral} honey from ${loaderData.region}. Trust Score ${loaderData.score}. See its full journey from hive to home.` : "See this honey's verified journey from hive to home.";
		return { meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: desc
			},
			{
				property: "og:type",
				content: "article"
			},
			{
				name: "twitter:card",
				content: "summary"
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { addTastingNote as n, batchQuery as r, Route as t };
