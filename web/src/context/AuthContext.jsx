import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { supabase, AUTH_STORAGE_KEY } from '../lib/supabase';
import { setStorageUser } from '../lib/userStorage';
import { notifyStudyStateChanged } from '../lib/studyState';
import { adoptLocalData, flushSync, setSyncUser, startSync, stopSync } from '../lib/cloudSync';

// ACCOUNTS: Supabase Auth (email and password). Progress is saved in the
// learner's account through lib/cloudSync.js, so it follows them across
// devices. The rest of the app only uses this context's shape:
//   { user, signUp, signIn, signOut, resetPassword, updatePassword, recovering }
// where user is { id, name, email } or null.

const AuthContext = createContext(null);

// Keys left by the earlier browser-only placeholder accounts.
const OLD_ACCOUNTS_KEY = 'aap-accounts';
const OLD_SESSION_KEY = 'aap-session';

const readJSON = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const toUser = (u) => (u ? {
  id: u.id,
  email: u.email,
  name: (u.user_metadata && u.user_metadata.name) || (u.email || '').split('@')[0],
} : null);

// Read the saved session synchronously, so a returning learner sees their
// account on the first render instead of a flash of "please sign in".
function initialUser() {
  const saved = readJSON(AUTH_STORAGE_KEY, null);
  const user = toUser(saved && saved.user);
  setStorageUser(user && user.id);
  setSyncUser(user && user.id);
  return user;
}

// Bring along progress saved before real accounts: a guest's history, and
// anything saved under an old browser-only account with the same email.
function adoptEarlierProgress(user) {
  adoptLocalData(null, user.id);
  const accounts = readJSON(OLD_ACCOUNTS_KEY, {});
  const old = accounts[normalizeEmail(user.email)];
  if (old && !old.migratedTo) {
    adoptLocalData(old.id, user.id);
    try {
      window.localStorage.setItem(OLD_ACCOUNTS_KEY, JSON.stringify({ ...accounts, [normalizeEmail(user.email)]: { ...old, pass: undefined, migratedTo: user.id } }));
    } catch { /* ignore */ }
  }
  try { window.localStorage.removeItem(OLD_SESSION_KEY); } catch { /* ignore */ }
}

// Supabase's messages, in the site's voice.
function friendly(error) {
  const msg = (error && error.message) || '';
  if (/invalid login credentials/i.test(msg)) return 'That email and password don’t match an account.';
  if (/email not confirmed/i.test(msg)) return 'Please confirm your email first. Check your inbox for the link we sent.';
  if (/already registered|already exists/i.test(msg)) return 'An account with that email already exists. Try signing in.';
  if (/password should be|weak password/i.test(msg)) return 'Please choose a longer or less common password (at least 8 characters).';
  if (/rate limit|too many/i.test(msg)) return 'Too many attempts. Please wait a few minutes and try again.';
  if (/not authorized/i.test(msg)) return 'We couldn’t send an email to that address. Please try again later.';
  if (/failed to fetch|network/i.test(msg)) return 'We couldn’t reach the server. Check your connection and try again.';
  return msg || 'Something went wrong. Please try again.';
}

const siteUrl = (path) => `${window.location.origin}${path}`;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUser);
  const [recovering, setRecovering] = useState(false);
  const currentId = useRef(user && user.id);

  // Apply a (possibly new) signed-in user: scope local storage, fold in any
  // earlier progress, and start syncing with their account.
  const apply = useCallback((authUser) => {
    const next = toUser(authUser);
    const changed = (next && next.id) !== currentId.current;
    currentId.current = next && next.id;
    setStorageUser(next && next.id);
    setSyncUser(next && next.id);
    setUser((prev) => (prev && next && prev.id === next.id && prev.name === next.name && prev.email === next.email ? prev : next));
    if (!changed && next) return;
    if (next) {
      adoptEarlierProgress(next);
      // Deferred: Supabase advises against awaiting its calls inside the
      // auth-change callback.
      setTimeout(() => { startSync(next.id, { onPulled: notifyStudyStateChanged }); }, 0);
    } else {
      stopSync();
    }
    notifyStudyStateChanged();
  }, []);

  useEffect(() => {
    // A returning learner with a saved session starts syncing right away.
    if (currentId.current) {
      const id = currentId.current;
      setTimeout(() => { startSync(id, { onPulled: notifyStudyStateChanged }); }, 0);
    }
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
      apply(session ? session.user : null);
    });
    return () => data.subscription.unsubscribe();
  }, [apply]);

  const signUp = useCallback(async ({ name, email, password }) => {
    const e = normalizeEmail(email);
    if (!name || !name.trim()) throw new Error('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('Please enter a valid email address.');
    if (!password || password.length < 8) throw new Error('Use a password of at least 8 characters.');
    const { data, error } = await supabase.auth.signUp({
      email: e,
      password,
      options: { data: { name: name.trim() }, emailRedirectTo: siteUrl('/aicp/signin') },
    });
    if (error) throw new Error(friendly(error));
    // With email confirmation on, an existing address comes back with no identities.
    if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
      throw new Error('An account with that email already exists. Try signing in.');
    }
    if (!data.session) return { needsConfirmation: true, email: e };
    apply(data.user);
    return { user: toUser(data.user) };
  }, [apply]);

  const signIn = useCallback(async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email: normalizeEmail(email), password: password || '' });
    if (error) throw new Error(friendly(error));
    apply(data.user);
    return { user: toUser(data.user) };
  }, [apply]);

  const signOut = useCallback(async () => {
    await flushSync();
    await supabase.auth.signOut();
    apply(null);
  }, [apply]);

  const resetPassword = useCallback(async (email) => {
    const e = normalizeEmail(email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('Please enter a valid email address.');
    const { error } = await supabase.auth.resetPasswordForEmail(e, { redirectTo: siteUrl('/aicp/signin?mode=reset') });
    if (error) throw new Error(friendly(error));
  }, []);

  const updatePassword = useCallback(async (password) => {
    if (!password || password.length < 8) throw new Error('Use a password of at least 8 characters.');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(friendly(error));
    setRecovering(false);
  }, []);

  const value = useMemo(
    () => ({ user, signUp, signIn, signOut, resetPassword, updatePassword, recovering }),
    [user, signUp, signIn, signOut, resetPassword, updatePassword, recovering]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
