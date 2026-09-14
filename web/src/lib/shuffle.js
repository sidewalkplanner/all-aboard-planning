import { DOMAINS, ASSESSMENTS } from '../data/domains';

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

// Draws a question set for a given assessment id from the two exam banks.
export const sample = (bank, id, bank2) => {
  const a = ASSESSMENTS.find((x) => x.id === id) || ASSESSMENTS[0];
  if (a.id === 'e1') return bank.slice();
  if (a.id === 'e2') return bank2 && bank2.length ? shuffle(bank2.slice(), 6301) : bank.slice();
  const t = a.tier === 'free' ? QUIZ_T : EXAM_T;
  const examIdx = Math.max(0, ['e1', 'e2', 'e3'].indexOf(a.id));
  const out = [];
  DOMAINS.forEach((d, di) => {
    const pool = shuffle(bank.filter((q) => q.domain === d.name), 9973 + di * 131);
    if (a.tier === 'free') {
      const k = a.id === 'q2' ? 1 : 0;
      out.push(...pool.slice(k * t[d.name], (k + 1) * t[d.name]));
    } else {
      const rest = pool;
      if (!rest.length) return;
      const off = (examIdx * t[d.name]) % rest.length;
      for (let i = 0; i < t[d.name]; i++) out.push(rest[(off + i) % rest.length]);
    }
  });
  return shuffle(out.filter(Boolean), 4211 + id.charCodeAt(1) * 7);
};
