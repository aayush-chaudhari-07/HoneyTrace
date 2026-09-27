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
  const url = import.meta.env['VITE_SUPABASE_URL'] || (typeof process !== 'undefined' ? process.env['SUPABASE_URL'] : undefined);
  const key = 
    import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] || 
    import.meta.env['VITE_SUPABASE_ANON_KEY'] || 
    (typeof process !== 'undefined' ? (process.env['SUPABASE_PUBLISHABLE_KEY'] || process.env['SUPABASE_ANON_KEY']) : undefined);
  
  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseEnv();
  return Boolean(url && url.length > 5 && !url.includes('supabase-not-connected.invalid') && key && key.length > 10);
}

function createSupabaseClient() {
  const { url: SUPABASE_URL, key: SUPABASE_KEY } = getSupabaseEnv();

  const isConnected = Boolean(SUPABASE_URL && SUPABASE_KEY);

  if (typeof window !== 'undefined') {
    if (isConnected) {
      console.log(`[HoneyTrace Supabase] ✅ Connected to URL: ${SUPABASE_URL} (Key: ${SUPABASE_KEY!.slice(0, 6)}...${SUPABASE_KEY!.slice(-4)})`);
    } else {
      console.warn('[HoneyTrace Supabase] ⚠️ Not connected! Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY) to frontend/.env');
    }
  }

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return createClient<Database>('https://supabase-not-connected.invalid', 'not-connected', {
      global: {
        fetch: createSupabaseFetch('not-connected'),
      },
      auth: {
        storage: typeof window !== 'undefined' ? localStorage : undefined,
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    global: {
      fetch: createSupabaseFetch(SUPABASE_KEY),
    },
    auth: {
      storage: typeof window !== 'undefined' ? localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
