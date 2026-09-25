import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { setStorageUser, scopedKey } from '../lib/userStorage';
import { notifyStudyStateChanged } from '../lib/studyState';

// ACCOUNT PLACEHOLDER
// A stand-in for a real authentication service. Accounts, hashed passwords,
// and progress live only in this browser's localStorage: nothing is sent to a
// server, an account made on a phone doesn't exist on a laptop, and clearing
// browser data deletes it. That's enough to put the course "behind a login"
// and keep progress per person, but it is NOT real security.
//
// To go live, replace the bodies of signUp / signIn / signOut (and the
// initial session read) with calls to a hosted auth provider (Supabase Auth,
// Firebase Auth, Auth0, Clerk, ...), and move history from localStorage to
// that provider's database. The context's shape ({ user, signUp, signIn,
// signOut }) is what the rest of the app relies on; keep it the same.
const ACCOUNTS_KEY = 'aap-accounts';
const SESSION_KEY = 'aap-session';
const HISTORY_BASE = 'aap-history';

const AuthContext = createContext(null);

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
};

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

async function hashPassword(email, password) {
  const data = new TextEncoder().encode(`aap:${email}:${password}`);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Carry a guest's history (for example, Warm-up Quiz A taken before signing
// up) into their new account so it shows up in Progress.
function adoptGuestHistory(userId) {
  const guest = read(scopedKey(HISTORY_BASE, null), []);
  if (!Array.isArray(guest) || !guest.length) return;
  const mine = read(scopedKey(HISTORY_BASE, userId), []);
  const ids = new Set(mine.map((h) => h.id));
  write(scopedKey(HISTORY_BASE, userId), mine.concat(guest.filter((h) => !ids.has(h.id))));
  write(scopedKey(HISTORY_BASE, null), []);
}

function initialUser() {
  const session = read(SESSION_KEY, null);
  const user = session && session.id ? session : null;
  setStorageUser(user && user.id);
  return user;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  const startSession = useCallback((account) => {
    const u = { id: account.id, name: account.name, email: account.email };
    write(SESSION_KEY, u);
    setStorageUser(u.id);
    setUser(u);
    notifyStudyStateChanged();
    return u;
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    const e = normalizeEmail(email);
    if (!name || !name.trim()) throw new Error('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) throw new Error('Please enter a valid email address.');
    if (!password || password.length < 8) throw new Error('Use a password of at least 8 characters.');
    const accounts = read(ACCOUNTS_KEY, {});
    if (accounts[e]) throw new Error('An account with that email already exists on this device. Try signing in.');
    const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    const account = { id, name: name.trim(), email: e, pass: await hashPassword(e, password), createdAt: Date.now() };
    write(ACCOUNTS_KEY, { ...accounts, [e]: account });
    adoptGuestHistory(id);
    return startSession(account);
  }, [startSession]);

  const signIn = useCallback(async ({ email, password }) => {
    const e = normalizeEmail(email);
    const account = read(ACCOUNTS_KEY, {})[e];
    if (!account || account.pass !== await hashPassword(e, password || '')) {
      throw new Error('That email and password don’t match an account on this device.');
    }
    return startSession(account);
  }, [startSession]);

  const signOut = useCallback(() => {
    try { window.localStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    setStorageUser(null);
    setUser(null);
    notifyStudyStateChanged();
  }, []);

  const value = useMemo(() => ({ user, signUp, signIn, signOut }), [user, signUp, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
