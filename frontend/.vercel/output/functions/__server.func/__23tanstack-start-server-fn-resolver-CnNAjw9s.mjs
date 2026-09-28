//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CnNAjw9s.js
var manifest = {
	"0bf14254c2ad97f6c54bf4f802ba93fc67054028a1b07fd5fc6f37853fb3a1ae": {
		functionName: "addTastingNote_createServerFn_handler",
		importer: () => import("./_ssr/verify.functions-DiocMVu8.mjs")
	},
	"450a8db74ccb3b2700786bf29a13c29d8297ff53f3886d2a639550bf6539166d": {
		functionName: "getPublicBatch_createServerFn_handler",
		importer: () => import("./_ssr/verify.functions-DiocMVu8.mjs")
	},
	"f0ac1d35b4968a3cf80dd2fb7ed754b322579e9b7660284cb4312457064f4f96": {
		functionName: "analyzeHive_createServerFn_handler",
		importer: () => import("./_ssr/ai.functions-DGgY8flH.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
