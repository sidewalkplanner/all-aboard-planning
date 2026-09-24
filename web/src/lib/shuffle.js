import { DOMAINS, ASSESSMENTS } from '../data/domains.js';

// Deterministic seeded PRNG (LCG) so the same seed always produces the same
// shuffle — question order is stable across a given quiz/exam id and render.
export const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

export const shuffle = (arr, seed) => {
  const r = rng(seed);
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
};

// Largest-remainder allocation of `size` items across the nine domains'
// percentage weights, so quizzes/exams sum exactly to `size`.
export const alloc = (size) => {
  const out = {};
  let used = 0;
  const rem = DOMAINS.map((d) => {
    const v = (size * d.pct) / 100;
    out[d.name] = Math.floor(v);
    used += out[d.name];
    return { name: d.name, r: v - Math.floor(v) };
  });
  rem.sort((a, b) => b.r - a.r).slice(0, size - used).forEach((x) => { out[x.name] += 1; });
  return out;
};

export const QUIZ_T = alloc(25);
export const EXAM_T = alloc(170);

// Shuffles questions while keeping the ones that share a scenario together, so
// a setup is read once and answered in a run — the way the real exam groups
// "questions 24-27 refer to the following" — instead of reappearing at
// scattered points in the paper.
const shuffleKeepingClusters = (items, seed) => {
  const groups = [];
  const byScenario = new Map();
  items.forEach((q) => {
    if (!q.scenario) { groups.push([q]); return; }
    let g = byScenario.get(q.scenario);
    if (!g) { g = []; byScenario.set(q.scenario, g); groups.push(g); }
    g.push(q);
  });
  return shuffle(groups, seed).flat();
};

// Takes `t[domain]` items from each domain, so a set matches the content
// outline's weights even when the bank runs deeper in some domains than others.
// `skip` steps past that many full sets, which is how Quiz B draws questions
// Quiz A does not use.
const weighted = (bank, t, seed, skip = 0) => {
  const out = [];
  DOMAINS.forEach((d, di) => {
    const pool = shuffle(bank.filter((q) => q.domain === d.name), seed + di * 131);
    out.push(...pool.slice(skip * t[d.name], (skip + 1) * t[d.name]));
  });
  return shuffleKeepingClusters(out, seed + 7);
};

// Draws a question set for a given assessment id. Exams 1 and 2 are each
// exactly one bank; Exam 3's bank carries extra depth in the legal and
// areas-of-practice domains, so it is weighted down to 170.
export const sample = (bank, id, bank2, bank3) => {
  const a = ASSESSMENTS.find((x) => x.id === id) || ASSESSMENTS[0];
  if (a.id === 'e1') return bank.slice();
  if (a.id === 'e2') return bank2 && bank2.length ? shuffleKeepingClusters(bank2.slice(), 6301) : bank.slice();
  if (a.id === 'e3') return bank3 && bank3.length ? weighted(bank3, EXAM_T, 5119) : bank.slice();
  return weighted(bank, QUIZ_T, 9973, a.id === 'q2' ? 1 : 0);
};
