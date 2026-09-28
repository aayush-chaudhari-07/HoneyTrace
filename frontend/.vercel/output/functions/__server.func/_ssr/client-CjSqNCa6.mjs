import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CjSqNCa6.js
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function getSupabaseEnv() {
	return {
		url: (typeof import.meta !== "undefined" && {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
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
			"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co"
		} ? {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
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
			"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co"
		}["VITE_SUPABASE_URL"] : void 0) || (typeof process !== "undefined" ? process.env["VITE_SUPABASE_URL"] || process.env["SUPABASE_URL"] : void 0),
		key: (typeof import.meta !== "undefined" && {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
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
			"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co"
		} ? {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
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
			"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co"
		}["VITE_SUPABASE_ANON_KEY"] || {
			"BASE_URL": "/",
			"DEV": false,
			"MODE": "production",
			"PROD": true,
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
			"VITE_SUPABASE_URL": "https://pnvdnauwpezzshuwhcia.supabase.co"
		}["VITE_SUPABASE_PUBLISHABLE_KEY"] : void 0) || (typeof process !== "undefined" ? process.env["VITE_SUPABASE_ANON_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_ANON_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"] : void 0)
	};
}
function isSupabaseConfigured() {
	const { url, key } = getSupabaseEnv();
	return Boolean(url && url.length > 5 && !url.includes("supabase-not-connected.invalid") && key && key.length > 10);
}
function createSupabaseClient() {
	const { url: SUPABASE_URL, key: SUPABASE_KEY } = getSupabaseEnv();
	const isConnected = isSupabaseConfigured();
	if (typeof window !== "undefined") if (isConnected) console.log(`[HoneyTrace Supabase] ✅ Connected to URL: ${SUPABASE_URL} (Key: ${SUPABASE_KEY.slice(0, 6)}...${SUPABASE_KEY.slice(-4)})`);
	else console.warn("[HoneyTrace Supabase] ⚠️ Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.");
	else if (!isConnected) console.warn("[HoneyTrace Supabase] ⚠️ Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in server environment variables.");
	const effectiveUrl = isConnected ? SUPABASE_URL : "https://supabase-not-connected.invalid";
	const effectiveKey = isConnected ? SUPABASE_KEY : "not-connected";
	return createClient(effectiveUrl, effectiveKey, {
		global: { fetch: createSupabaseFetch(effectiveKey) },
		auth: {
			storage: typeof window !== "undefined" ? localStorage : void 0,
			persistSession: typeof window !== "undefined",
			autoRefreshToken: typeof window !== "undefined"
		}
	});
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	if (!isSupabaseConfigured()) {
		if (prop === "auth") return {
			onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
			getSession: async () => ({
				data: { session: null },
				error: null
			}),
			getUser: async () => ({
				data: { user: null },
				error: null
			}),
			signInWithPassword: async () => {
				throw new Error("Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.");
			},
			signUp: async () => {
				throw new Error("Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.");
			},
			signOut: async () => {},
			resetPasswordForEmail: async () => {
				throw new Error("Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.");
			}
		};
	}
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
