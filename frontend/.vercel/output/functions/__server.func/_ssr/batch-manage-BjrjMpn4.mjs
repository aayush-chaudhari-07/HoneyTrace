import { t as supabase } from "./client-DW-8h-Ow.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batch-manage-BjrjMpn4.js
var STATUS_META = {
	draft: {
		label: "Draft",
		bg: "var(--muted)",
		fg: "var(--muted-foreground)"
	},
	sealed: {
		label: "Sealed",
		bg: "var(--primary)",
		fg: "var(--espresso)"
	},
	in_custody: {
		label: "In Custody",
		bg: "var(--primary-deep)",
		fg: "var(--background)"
	},
	delivered: {
		label: "Delivered",
		bg: "var(--hive-healthy)",
		fg: "var(--espresso)"
	}
};
var SELECT = "id,name,floral,region,beekeeper,harvested,jars,trust_score,status,harvest_start,harvest_end,ai_recommendation,ai_verdict,recommendation_followed,override_reason,forage_location,forage_lat,forage_lng,sealed_at,created_at,batch_hives(hive_id,hives(id,name)),trail_steps(id,stage,place,step_date,note,position,created_at)";
async function listMyBatches(userId) {
	const { data, error } = await supabase.from("batches").select(SELECT).eq("owner_id", userId).order("created_at", { ascending: false });
	if (error) throw error;
	return data;
}
async function getMyBatch(id) {
	const { data, error } = await supabase.from("batches").select(SELECT).eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
async function readingsInRange(hiveIds, from, to) {
	if (!hiveIds.length) return [];
	const { data, error } = await supabase.from("readings").select("*").in("hive_id", hiveIds).gte("recorded_at", `${from}T00:00:00`).lte("recorded_at", `${to}T23:59:59`).order("recorded_at");
	if (error) throw error;
	return data;
}
/** Harvest guidance from the readings in the selected window (falls back to current hive state). */
function recommend(hives, readings) {
	const src = readings.length ? readings.map((r) => ({
		t: Number(r.temperature),
		h: Number(r.humidity),
		w: Number(r.weight_kg),
		a: Number(r.activity_level)
	})) : hives.map((h) => ({
		t: Number(h.temperature),
		h: Number(h.humidity),
		w: Number(h.weight_kg),
		a: Number(h.activity_level)
	}));
	if (!src.length) return {
		verdict: "caution",
		text: "No data for the selected hives — inspect frames before harvesting."
	};
	const avg = (k) => src.reduce((s, x) => s + x[k], 0) / src.length;
	const hum = avg("h"), wt = avg("w"), act = avg("a"), tmp = avg("t");
	const gain = readings.length > 1 ? Number(readings[readings.length - 1].weight_kg) - Number(readings[0].weight_kg) : 0;
	const stats = `avg ${tmp.toFixed(1)}°C, ${hum.toFixed(0)}% humidity, ${wt.toFixed(1)} kg, activity ${act.toFixed(0)}`;
	if (hum > 70) return {
		verdict: "wait",
		text: `Wait 5–7 days: humidity is high (${stats}), so honey moisture is likely above 18%.`
	};
	if (tmp < 32 || tmp > 37 || act < 40) return {
		verdict: "caution",
		text: `Harvest with caution: colony stress signs (${stats}). Leave ample stores.`
	};
	if (wt >= 45 || gain >= 3) return {
		verdict: "harvest",
		text: `Harvest now: supers are heavy and capped conditions look good (${stats}${gain ? `, +${gain.toFixed(1)} kg in window` : ""}).`
	};
	return {
		verdict: "wait",
		text: `Wait for more nectar flow: hive weight is modest (${stats}).`
	};
}
var CUSTODY = [
	{
		key: "beekeeper",
		label: "Beekeeper",
		match: [
			"hive",
			"harvest",
			"beekeeper",
			"apiary"
		]
	},
	{
		key: "lab",
		label: "Lab",
		match: ["lab", "test"]
	},
	{
		key: "bottler",
		label: "Bottler",
		match: [
			"bottl",
			"pack",
			"extract"
		]
	},
	{
		key: "distributor",
		label: "Distributor",
		match: [
			"distrib",
			"transit",
			"ship",
			"warehouse"
		]
	},
	{
		key: "shelf",
		label: "Shelf",
		match: [
			"retail",
			"shelf",
			"store"
		]
	}
];
function stageFor(step) {
	const s = step.stage.toLowerCase();
	return CUSTODY.find((c) => c.match.some((m) => s.includes(m)))?.key ?? null;
}
function verifyUrl(id) {
	return `${((typeof process !== "undefined" ? process.env["PUBLIC_SITE_URL"] || process.env["VITE_PUBLIC_SITE_URL"] : void 0) || (typeof import.meta !== "undefined" && {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:5000",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudmRuYXV3cGV6enNodXdoY2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MDg2MTQsImV4cCI6MjEwNjA4NDYxNH0.SAy5ITwQEUh22GaoOHYYkybxCFXew9u88gAFhp0zees",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_VAfUs3EoDOROs93dUOPshQ_4i7mv7gV",
		"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co",
		"VITE_USER_NODE_ENV": "development"
	} ? {
		"BASE_URL": "/",
		"DEV": true,
		"MODE": "production",
		"PROD": false,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_BACKEND_URL": "http://localhost:5000",
		"VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudmRuYXV3cGV6enNodXdoY2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MDg2MTQsImV4cCI6MjEwNjA4NDYxNH0.SAy5ITwQEUh22GaoOHYYkybxCFXew9u88gAFhp0zees",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_VAfUs3EoDOROs93dUOPshQ_4i7mv7gV",
		"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co",
		"VITE_USER_NODE_ENV": "development"
	}["VITE_PUBLIC_SITE_URL"] : void 0) || (typeof window !== "undefined" && window.location?.origin ? window.location.origin : "")).replace(/\/$/, "")}/verify/${encodeURIComponent(id)}`;
}
//#endregion
export { readingsInRange as a, verifyUrl as c, listMyBatches as i, STATUS_META as n, recommend as o, getMyBatch as r, stageFor as s, CUSTODY as t };
