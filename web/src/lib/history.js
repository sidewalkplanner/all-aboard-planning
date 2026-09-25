import { scopedKey } from './userStorage';

// Real (frontend-only, localStorage) attempt history, kept per account
// (see lib/userStorage.js) — replaces the
// hardcoded "canned" numbers the Progress dashboard used to show. Every
// completed exam/quiz/drill/diagnostic attempt is appended here on submit;
// Progress.jsx derives all of its stats from this instead of static data.
const HISTORY_KEY = 'aap-history';
const MAX_ENTRIES = 200;

export const getHistory = () => {
  try {
    const raw = window.localStorage.getItem(scopedKey(HISTORY_KEY));
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
};

export const recordAttempt = (entry) => {
  try {
    const list = getHistory();
    list.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, completedAt: Date.now(), ...entry });
    // Keep the file bounded — oldest entries drop off first.
    while (list.length > MAX_ENTRIES) list.shift();
    window.localStorage.setItem(scopedKey(HISTORY_KEY), JSON.stringify(list));
  } catch (e) { /* ignore */ }
};

// Rolls the raw history array up into what the Progress dashboard needs:
// average score, distinct assessments completed, total questions
// attempted, total time spent, per-domain accuracy (summed across every
// attempt that touched that domain), and a most-recent-first feed.
export const summarizeHistory = (history) => {
  const n = history.length;
  const avgScore = n ? Math.round(history.reduce((s, h) => s + (h.pct || 0), 0) / n) : null;
  const examIds = new Set(history.filter((h) => h.kind === 'exam' && h.assessmentId).map((h) => h.assessmentId));
  const questionsAttempted = history.reduce((s, h) => s + (h.answeredCount || 0), 0);
  const timeSeconds = history.reduce((s, h) => s + (h.elapsedSeconds || 0), 0);
  const domainTotals = {};
  history.forEach((h) => (h.domainBreakdown || []).forEach((d) => {
    if (!domainTotals[d.short]) domainTotals[d.short] = { got: 0, n: 0 };
    domainTotals[d.short].got += d.got;
    domainTotals[d.short].n += d.n;
  }));
  const recent = history.slice().sort((a, b) => b.completedAt - a.completedAt);
  return { n, avgScore, examIds, questionsAttempted, timeSeconds, domainTotals, recent };
};
