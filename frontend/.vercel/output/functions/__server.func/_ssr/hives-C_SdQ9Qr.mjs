import { t as supabase } from "./client-CjSqNCa6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hives-C_SdQ9Qr.js
function issuesFor(h) {
	const out = [];
	const t = Number(h.temperature), hu = Number(h.humidity), a = Number(h.activity_level), w = Number(h.weight_kg);
	if (t < 30 || t > 39) out.push({
		severity: 2,
		kind: "temp",
		reason: `Brood temperature ${t}°C is far outside 32–36°C`
	});
	else if (t < 32 || t > 37) out.push({
		severity: 1,
		kind: "temp",
		reason: `Temperature drifting (${t}°C)`
	});
	if (hu > 80) out.push({
		severity: 2,
		kind: "humidity",
		reason: `Humidity ${hu}% — high mould & fermentation risk`
	});
	else if (hu > 70 || hu < 40) out.push({
		severity: 1,
		kind: "humidity",
		reason: `Humidity ${hu}% outside ideal 50–65%`
	});
	if (a < 25) out.push({
		severity: 2,
		kind: "activity",
		reason: `Very low flight activity (${a}%) — possible queen loss`
	});
	else if (a < 45) out.push({
		severity: 1,
		kind: "activity",
		reason: `Activity below normal (${a}%)`
	});
	if (w < 20) out.push({
		severity: 1,
		kind: "weight",
		reason: `Low stores (${w} kg) — consider feeding`
	});
	const days = Math.floor((Date.now() - new Date(h.last_inspected).getTime()) / 864e5);
	if (days > 14) out.push({
		severity: 1,
		kind: "inspect",
		reason: `No reading for ${days} days`
	});
	return out.sort((x, y) => y.severity - x.severity);
}
function healthOf(h) {
	const i = issuesFor(h);
	if (i.some((x) => x.severity === 2)) return "critical";
	return i.length ? "attention" : "healthy";
}
async function listHives() {
	const { data, error } = await supabase.from("hives").select("*").order("created_at");
	if (error) throw error;
	return data;
}
async function getHive(id) {
	const { data, error } = await supabase.from("hives").select("*").eq("id", id).maybeSingle();
	if (error) throw error;
	return data;
}
async function listReadings(hiveId) {
	const { data, error } = await supabase.from("readings").select("*").eq("hive_id", hiveId).order("recorded_at");
	if (error) throw error;
	return data;
}
/** Flag readings that jump well outside the hive's own recent pattern (z-score > 2.2) or hard limits. */
function detectAnomalies(rs) {
	const metrics = [
		{
			key: "temperature",
			label: "Temperature",
			unit: "°C"
		},
		{
			key: "humidity",
			label: "Humidity",
			unit: "%"
		},
		{
			key: "weight_kg",
			label: "Weight",
			unit: " kg"
		},
		{
			key: "activity_level",
			label: "Activity",
			unit: "%"
		}
	];
	const out = [];
	for (const m of metrics) {
		const vals = rs.map((r) => Number(r[m.key]));
		if (vals.length < 4) continue;
		const mean = vals.reduce((s, v) => s + v, 0) / vals.length;
		const sd = Math.sqrt(vals.reduce((s, v) => s + (v - mean) ** 2, 0) / vals.length);
		if (sd === 0) continue;
		rs.forEach((r, i) => {
			const v = vals[i];
			const z = (v - mean) / sd;
			if (Math.abs(z) > 2.2) out.push({
				at: r.recorded_at,
				metric: m.label,
				value: v,
				message: `${m.label} ${z > 0 ? "spiked" : "dropped"} to ${v}${m.unit} (usual ≈ ${mean.toFixed(1)}${m.unit})`
			});
		});
	}
	return out.sort((a, b) => b.at.localeCompare(a.at));
}
//#endregion
export { listHives as a, issuesFor as i, getHive as n, listReadings as o, healthOf as r, detectAnomalies as t };
