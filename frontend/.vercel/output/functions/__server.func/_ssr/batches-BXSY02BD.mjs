import { t as supabase } from "./client-CjSqNCa6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches-BXSY02BD.js
var SAMPLE_CODES = [
	"HT-2026-0412",
	"HT-2026-0527",
	"HT-2026-0703"
];
var fmt = (d) => (/* @__PURE__ */ new Date(d + "T00:00:00")).toLocaleDateString("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
var SELECT = "id,name,floral,region,beekeeper,harvested,trust_score,jars,owner_id,trail_steps(stage,place,step_date,note,position)";
function toBatch(r) {
	return {
		id: r.id,
		name: r.name,
		floral: r.floral,
		region: r.region,
		beekeeper: r.beekeeper,
		harvested: fmt(r.harvested),
		trustScore: r.trust_score,
		jars: r.jars,
		ownerId: r.owner_id,
		trail: [...r.trail_steps ?? []].sort((a, b) => a.position - b.position).map((s) => ({
			stage: s.stage,
			place: s.place,
			date: fmt(s.step_date),
			note: s.note
		}))
	};
}
async function fetchBatches(ownerId) {
	let q = supabase.from("batches").select(SELECT).order("harvested", { ascending: false });
	if (ownerId) q = q.eq("owner_id", ownerId);
	const { data, error } = await q;
	if (error) throw error;
	return data.map(toBatch);
}
/** Pull a batch code out of a scanned QR payload (plain code or a URL containing it). */
function extractCode(text) {
	const m = text.match(/HT-\d{4}-[A-Z0-9]+/i);
	return (m ? m[0] : text).trim().toUpperCase();
}
//#endregion
export { extractCode as n, fetchBatches as r, SAMPLE_CODES as t };
