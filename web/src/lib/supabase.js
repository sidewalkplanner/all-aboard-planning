import { createClient } from '@supabase/supabase-js';

// The Supabase project behind accounts and saved progress. The publishable key
// is meant to ship in browser code: it only identifies the project, and
// row-level security on the database (see supabase/migrations) limits each
// signed-in learner to their own rows.
export const SUPABASE_URL = 'https://eawdxearyzkkloivokdh.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_hdurAaKf1PFo9Kbei-cc3g_fDBwQILu';

// Where the signed-in session is kept in localStorage. AuthContext reads it
// synchronously on load so a returning learner isn't bounced to sign-in while
// Supabase confirms the session.
export const AUTH_STORAGE_KEY = 'aap-auth';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storageKey: AUTH_STORAGE_KEY,
    persistSession: true,
    autoRefreshToken: true,
    // Email links (confirm your address, reset your password) land back on the
    // site with the session in the URL; pick it up automatically.
    detectSessionInUrl: true,
    // Implicit flow so those links work even when opened on a different
    // device or browser from the one that asked for them.
    flowType: 'implicit',
  },
});
