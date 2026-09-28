import { t as supabase } from "./client-DW-8h-Ow.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roles-CLxMAwlJ.js
var PARTNER_ROLES = [
	"lab",
	"bottler",
	"distributor",
	"retailer"
];
async function getMyRoles(userId) {
	if (!userId) return [];
	try {
		const { data: userRoles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
		if (userRoles && userRoles.length > 0) return userRoles.map((r) => r.role);
		const { data: userRow } = await supabase.from("users").select("role").eq("id", userId).maybeSingle();
		if (userRow?.role) return [userRow.role];
		const { data: authUser } = await supabase.auth.getUser();
		if (authUser?.user?.user_metadata?.role) return [authUser.user.user_metadata.role];
	} catch (err) {
		console.warn("getMyRoles fallback notice:", err);
	}
	return ["beekeeper"];
}
/** Where a user should land after signing in, based on their role. */
function homeFor(roles) {
	if (roles.includes("admin")) return { to: "/admin" };
	if (roles.some((r) => PARTNER_ROLES.includes(r))) return { to: "/partner" };
	return { to: "/dashboard" };
}
//#endregion
export { getMyRoles as n, homeFor as r, PARTNER_ROLES as t };
