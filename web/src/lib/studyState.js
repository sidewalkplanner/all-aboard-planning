import { useSyncExternalStore } from 'react';
import { scopedKey, noteWrite } from './userStorage';

// Per-account study state that isn't a scored attempt (scored attempts live in
// lib/history.js). One small JSON document per account:
//
//   completed:  { [lessonSlug]: timestamp }       lessons marked complete
//   lastLesson: { slug, at }                        most recently opened lesson
//   plan:       { id, startedAt } | null            the study plan being followed
//   planChecks: { [itemKey]: timestamp }            practice items ticked off in a plan
//   cards:      { [cardId]: { box, seen } }         flashcard boxes (0 = new/missed … 4 = mastered)
//   checkpoints:{ [lessonSlug]: { [ref]: { pick, correct, at } } }  mid-lesson checkpoint answers
//
// Like history, it lives in localStorage and is synced to the learner's
// Supabase account by lib/cloudSync.js.
const BASE = 'aap-study';
const EMPTY = { completed: {}, lastLesson: null, plan: null, planChecks: {}, cards: {}, checkpoints: {} };

const listeners = new Set();
let cache = { key: null, raw: undefined, value: EMPTY };

function readState() {
  const key = scopedKey(BASE);
  let raw = null;
  try { raw = window.localStorage.getItem(key); } catch { /* storage unavailable */ }
  if (cache.key === key && cache.raw === raw) return cache.value;
  let value = EMPTY;
  try { value = raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY; } catch { value = EMPTY; }
  cache = { key, raw, value };
  return value;
}

function writeState(update) {
  const next = update(readState());
  try { window.localStorage.setItem(scopedKey(BASE), JSON.stringify(next)); } catch { /* ignore */ }
  noteWrite(BASE);
  listeners.forEach((l) => l());
}

const subscribe = (l) => {
  listeners.add(l);
  const onStorage = (e) => { if (!e.key || e.key.startsWith(BASE)) l(); };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(l); window.removeEventListener('storage', onStorage); };
};

// Re-render subscribers when the signed-in account changes (AuthProvider calls this).
export const notifyStudyStateChanged = () => listeners.forEach((l) => l());

export function useStudyState() {
  return useSyncExternalStore(subscribe, readState, () => EMPTY);
}

export const getStudyState = readState;

export const setLessonComplete = (slug, done) => writeState((s) => {
  const completed = { ...s.completed };
  if (done) completed[slug] = Date.now(); else delete completed[slug];
  return { ...s, completed };
});

export const noteLessonOpened = (slug) => {
  const s = readState();
  if (s.lastLesson && s.lastLesson.slug === slug) return;
  writeState((st) => ({ ...st, lastLesson: { slug, at: Date.now() } }));
};

export const choosePlan = (id) => writeState((s) => ({ ...s, plan: id ? { id, startedAt: Date.now() } : null }));

export const setPlanCheck = (itemKey, done) => writeState((s) => {
  const planChecks = { ...s.planChecks };
  if (done) planChecks[itemKey] = Date.now(); else delete planChecks[itemKey];
  return { ...s, planChecks };
});

// Leitner-style flashcards: "got it" moves a card up a box, "again" sends it back to 0.
export const MASTERED_BOX = 3;
export const gradeCard = (id, gotIt) => writeState((s) => {
  const prev = s.cards[id] || { box: 0 };
  const box = gotIt ? Math.min(4, prev.box + 1) : 0;
  return { ...s, cards: { ...s.cards, [id]: { box, seen: Date.now() } } };
});
export const resetCards = (ids) => writeState((s) => {
  const cards = { ...s.cards };
  ids.forEach((id) => { delete cards[id]; });
  return { ...s, cards };
});

// Mid-lesson checkpoints: the latest answer to each question, per lesson.
export const recordCheckpoint = (slug, ref, pick, correct) => writeState((s) => ({
  ...s,
  checkpoints: { ...s.checkpoints, [slug]: { ...(s.checkpoints[slug] || {}), [ref]: { pick, correct, at: Date.now() } } },
}));
export const clearCheckpoint = (slug, ref) => writeState((s) => {
  const mine = { ...(s.checkpoints[slug] || {}) };
  delete mine[ref];
  return { ...s, checkpoints: { ...s.checkpoints, [slug]: mine } };
});
