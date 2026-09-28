import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith('sb_publishable_') || value.startsWith('sb_secret_');
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    // New Supabase API keys are opaque strings, not bearer JWTs.
    if (isNewSupabaseApiKey(supabaseKey) && headers.get('Authorization') === `Bearer ${supabaseKey}`) {
      headers.delete('Authorization');
    }

    headers.set('apikey', supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export function getSupabaseEnv() {
  const url =
    (typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env['VITE_SUPABASE_URL'] as string) : undefined) ||
    (typeof process !== 'undefined' ? (process.env['VITE_SUPABASE_URL'] || process.env['SUPABASE_URL']) : undefined);

  const key =
    (typeof import.meta !== 'undefined' && import.meta.env
      ? (import.meta.env['VITE_SUPABASE_ANON_KEY'] || import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY']) as string
      : undefined) ||
    (typeof process !== 'undefined'
      ? (process.env['VITE_SUPABASE_ANON_KEY'] ||
          process.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
          process.env['SUPABASE_ANON_KEY'] ||
          process.env['SUPABASE_PUBLISHABLE_KEY'])
      : undefined);

  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseEnv();
  return Boolean(url && url.length > 5 && !url.includes('supabase-not-connected.invalid') && key && key.length > 10);
}

function createSupabaseClient() {
  const { url: SUPABASE_URL, key: SUPABASE_KEY } = getSupabaseEnv();
  const isConnected = isSupabaseConfigured();

  if (typeof window !== 'undefined') {
    if (isConnected) {
      console.log(`[HoneyTrace Supabase] ✅ Connected to URL: ${SUPABASE_URL} (Key: ${SUPABASE_KEY!.slice(0, 6)}...${SUPABASE_KEY!.slice(-4)})`);
    } else {
      console.warn('[HoneyTrace Supabase] ⚠️ Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.');
    }
  } else if (!isConnected) {
    console.warn('[HoneyTrace Supabase] ⚠️ Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in server environment variables.');
  }

  const effectiveUrl = isConnected ? SUPABASE_URL! : 'https://supabase-not-connected.invalid';
  const effectiveKey = isConnected ? SUPABASE_KEY! : 'not-connected';

  return createClient<Database>(effectiveUrl, effectiveKey, {
    global: {
      fetch: createSupabaseFetch(effectiveKey),
    },
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    if (!isSupabaseConfigured()) {
      if (prop === 'auth') {
        return {
          onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
          getSession: async () => ({ data: { session: null }, error: null }),
          getUser: async () => ({ data: { user: null }, error: null }),
          signInWithPassword: async () => {
            throw new Error('Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.');
          },
          signUp: async () => {
            throw new Error('Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.');
          },
          signOut: async () => {},
          resetPasswordForEmail: async () => {
            throw new Error('Configuration missing: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_KEY) must be set in Vercel environment variables.');
          },
        };
      }
    }
    return Reflect.get(_supabase, prop, receiver);
  },
});
