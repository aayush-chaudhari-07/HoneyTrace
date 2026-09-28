import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verify.functions-DiocMVu8.js
function publicClient() {
	const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"];
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_ANON_KEY"];
	if (!url || !key) return null;
	return createClient(url, key, { auth: {
		storage: void 0,
		persistSession: false,
		autoRefreshToken: false
	} });
}
var getPublicBatch_createServerFn_handler = createServerRpc({
	id: "450a8db74ccb3b2700786bf29a13c29d8297ff53f3886d2a639550bf6539166d",
	name: "getPublicBatch",
	filename: "src/lib/verify.functions.ts"
}, (opts) => getPublicBatch.__executeServer(opts));
var getPublicBatch = createServerFn({ method: "GET" }).inputValidator((d) => objectType({ id: stringType().trim().min(1).max(40) }).parse(d)).handler(getPublicBatch_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	if (!sb) return null;
	const id = data.id.toUpperCase();
	const [b, hives, notes] = await Promise.all([
		sb.from("batches").select("id,name,floral,region,beekeeper,harvested,harvest_start,harvest_end,jars,trust_score,status,forage_location,forage_lat,forage_lng,sealed_at,trail_steps(id,position,stage,place,step_date,note,created_at,document_url,document_label,prev_hash,block_hash)").eq("id", id).maybeSingle(),
		sb.rpc("public_batch_hives", { _batch_id: id }),
		sb.from("tasting_notes").select("id,name,rating,note,created_at").eq("batch_id", id).order("created_at", { ascending: false }).limit(50)
	]);
	if (b.error) throw new Error(b.error.message);
	if (!b.data) return null;
	const { trail_steps, ...rest } = b.data;
	return {
		...rest,
		forage_lat: rest.forage_lat == null ? null : Number(rest.forage_lat),
		forage_lng: rest.forage_lng == null ? null : Number(rest.forage_lng),
		steps: [...trail_steps ?? []].sort((x, y) => x.position - y.position),
		hives: hives.data ?? [],
		notes: notes.data ?? []
	};
});
var addTastingNote_createServerFn_handler = createServerRpc({
	id: "0bf14254c2ad97f6c54bf4f802ba93fc67054028a1b07fd5fc6f37853fb3a1ae",
	name: "addTastingNote",
	filename: "src/lib/verify.functions.ts"
}, (opts) => addTastingNote.__executeServer(opts));
var addTastingNote = createServerFn({ method: "POST" }).inputValidator((d) => objectType({
	batchId: stringType().trim().min(1).max(40),
	name: stringType().trim().max(60).optional(),
	rating: numberType().int().min(1).max(5),
	note: stringType().trim().min(3).max(500)
}).parse(d)).handler(addTastingNote_createServerFn_handler, async ({ data }) => {
	const sb = publicClient();
	if (!sb) throw new Error("HoneyTrace's data service isn't connected yet — please try again later.");
	const { data: row, error } = await sb.from("tasting_notes").insert({
		batch_id: data.batchId.toUpperCase(),
		name: data.name || null,
		rating: data.rating,
		note: data.note
	}).select("id,name,rating,note,created_at").single();
	if (error) throw new Error(error.message);
	return row;
});
//#endregion
export { addTastingNote_createServerFn_handler, getPublicBatch_createServerFn_handler };
