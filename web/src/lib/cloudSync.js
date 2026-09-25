import { useSyncExternalStore } from 'react';
import { supabase } from './supabase';
import { scopedKey, setWriteListener } from './userStorage';

// Keeps a signed-in learner's progress in Supabase (table public.user_data),
// with the browser's localStorage as a fast local copy. The rest of the site
// keeps reading and writing localStorage exactly as before.
//
// - Every save marks that document "dirty" and pushes it to Supabase about a
//   second later (and right away when the tab is hidden or the learner signs out).
// - On sign-in, each document is pulled. If this browser has no unpushed
//   changes, Supabase's copy simply replaces the local one. If it does (for
//   example, a lesson finished while offline), the two are merged.
//
// Three documents, matching the `key` column:
const DOCS = {
  history: 'aap-history',        // scored exam attempts (lib/history.js)
  study: 'aap-study',            // lessons, checkpoints, cards, plan (lib/studyState.js)
  attempts: 'aap-exam-attempts', // exams in progress (pages/exam/useExamSession.js)
};
const DOC_FOR_BASE = Object.fromEntries(Object.entries(DOCS).map(([doc, base]) => [base, doc]));
const PUSH_DELAY_MS = 1200;
const MAX_HISTORY = 200;

let userId = null;
// Nothing is pushed until the account's copy has been pulled and merged, so a
// save made in the first moments on a new device can't overwrite the account.
let pulled = false;
const timers = {};
const pushing = {};

const readLocal = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};
const writeLocal = (key, value) => {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
};

// Which documents have local changes Supabase hasn't received yet.
const dirtyKey = (uid) => `aap-sync-dirty:u:${uid}`;
const getDirty = (uid) => readLocal(dirtyKey(uid), {});
const setDirty = (uid, doc, on) => {
  const d = getDirty(uid);
  if (on) d[doc] = true; else delete d[doc];
  writeLocal(dirtyKey(uid), d);
};

// ---------------------------------------------------------------- merging
const newer = (a, b, field) => ((b && (!a || (b[field] || 0) > (a[field] || 0))) ? b : a);

const mergeHistory = (a = [], b = []) => {
  const byId = new Map();
  [...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])].forEach((h) => { if (h && h.id) byId.set(h.id, h); });
  return [...byId.values()].sort((x, y) => (x.completedAt || 0) - (y.completedAt || 0)).slice(-MAX_HISTORY);
};

const mergeStudy = (a = {}, b = {}) => {
  const maxMap = (x = {}, y = {}) => {
    const out = { ...x };
    Object.entries(y).forEach(([k, v]) => { out[k] = Math.max(out[k] || 0, v || 0); });
    return out;
  };
  const cards = { ...(a.cards || {}) };
  Object.entries(b.cards || {}).forEach(([id, c]) => { cards[id] = newer(cards[id], c, 'seen'); });
  const checkpoints = { ...(a.checkpoints || {}) };
  Object.entries(b.checkpoints || {}).forEach(([slug, answers]) => {
    const merged = { ...(checkpoints[slug] || {}) };
    Object.entries(answers || {}).forEach(([ref, ans]) => { merged[ref] = newer(merged[ref], ans, 'at'); });
    checkpoints[slug] = merged;
  });
  return {
    ...a,
    ...b,
    completed: maxMap(a.completed, b.completed),
    planChecks: maxMap(a.planChecks, b.planChecks),
    cards,
    checkpoints,
    lastLesson: newer(a.lastLesson, b.lastLesson, 'at'),
    plan: newer(a.plan, b.plan, 'startedAt') || null,
  };
};

const mergeAttempts = (a = {}, b = {}) => {
  const out = { ...a };
  Object.entries(b || {}).forEach(([k, v]) => { out[k] = newer(out[k], v, 'savedAt'); });
  return out;
};

const MERGE = { history: mergeHistory, study: mergeStudy, attempts: mergeAttempts };
const EMPTY = { history: [], study: {}, attempts: {} };

// ---------------------------------------------------------------- pushing
async function push(doc) {
  const uid = userId;
  if (!uid || !pulled) return;
  clearTimeout(timers[doc]);
  if (pushing[doc]) { schedule(doc); return; }
  pushing[doc] = true;
  const value = readLocal(scopedKey(DOCS[doc], uid), EMPTY[doc]);
  const { error } = await supabase.from('user_data').upsert({ user_id: uid, key: doc, value });
  pushing[doc] = false;
  if (error) { schedule(doc, 10000); return; } // offline or a blip: retry later
  // Only clear the flag if nothing new was saved while this push was in flight.
  const now = readLocal(scopedKey(DOCS[doc], uid), EMPTY[doc]);
  if (uid === userId && JSON.stringify(now) === JSON.stringify(value)) setDirty(uid, doc, false);
}

function schedule(doc, delay = PUSH_DELAY_MS) {
  clearTimeout(timers[doc]);
  timers[doc] = setTimeout(() => { push(doc); }, delay);
}

// Push everything that's waiting (before sign-out, or when the tab is hidden).
export async function flushSync() {
  if (!userId || !pulled) return;
  const dirty = getDirty(userId);
  await Promise.all(Object.keys(DOCS).filter((d) => dirty[d]).map((d) => push(d)));
}

setWriteListener((base) => {
  const doc = DOC_FOR_BASE[base];
  if (!doc || !userId) return;
  setDirty(userId, doc, true);
  if (pulled) schedule(doc);
});

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flushSync(); });
}

// ---------------------------------------------------------------- pulling
// Bumped after each pull, so pages showing history can re-read it.
let version = 0;
const listeners = new Set();
const bump = () => { version += 1; listeners.forEach((l) => l()); };
export function useSyncVersion() {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => version, () => 0);
}

// Tell the sync who is signed in. Called synchronously by AuthContext (on the
// first render and on every sign-in or sign-out), so saves made before the
// first pull finishes are still marked for upload.
export function setSyncUser(uid) {
  if (uid === userId) return;
  Object.values(timers).forEach(clearTimeout);
  userId = uid || null;
  pulled = false;
}

// Pull the learner's documents and start pushing (sign-in, or returning with
// a saved session). If offline, keep using the local copy and try again later.
export async function startSync(uid, { onPulled } = {}) {
  setSyncUser(uid);
  const { data, error } = await supabase.from('user_data').select('key, value').eq('user_id', uid);
  if (uid !== userId) return;
  if (error) { setTimeout(() => { if (uid === userId && !pulled) startSync(uid, { onPulled }); }, 15000); return; }
  pulled = true;
  const remote = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  const dirty = getDirty(uid);
  for (const doc of Object.keys(DOCS)) {
    const key = scopedKey(DOCS[doc], uid);
    const local = readLocal(key, null);
    if (remote[doc] === undefined) {
      // Nothing in the account yet: upload whatever this browser has.
      if (local !== null) { setDirty(uid, doc, true); push(doc); }
    } else if (dirty[doc] && local !== null) {
      writeLocal(key, MERGE[doc](remote[doc], local));
      push(doc);
    } else {
      writeLocal(key, remote[doc]);
    }
  }
  bump();
  if (onPulled) onPulled();
}

export function stopSync() {
  setSyncUser(null);
  bump();
}

// Fold data saved under another local id (a guest, or an account from the
// old browser-only placeholder) into this learner's documents, and mark them
// for upload so they merge with the account on the next pull.
export function adoptLocalData(fromId, toId) {
  for (const doc of Object.keys(DOCS)) {
    const from = readLocal(scopedKey(DOCS[doc], fromId), null);
    if (from === null || (Array.isArray(from) && !from.length)) continue;
    const toKey = scopedKey(DOCS[doc], toId);
    const to = readLocal(toKey, null);
    writeLocal(toKey, to === null ? from : MERGE[doc](to, from));
    setDirty(toId, doc, true);
    try { window.localStorage.removeItem(scopedKey(DOCS[doc], fromId)); } catch { /* ignore */ }
  }
}
