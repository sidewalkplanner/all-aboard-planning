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

// Draws a question set for a given assessment id. Each full-length exam has its
// own bank; the free warm-up quizzes take a domain-weighted slice of bank 1.
export const sample = (bank, id, bank2, bank3) => {
  const a = ASSESSMENTS.find((x) => x.id === id) || ASSESSMENTS[0];
  if (a.id === 'e1') return bank.slice();
  if (a.id === 'e2') return bank2 && bank2.length ? shuffle(bank2.slice(), 6301) : bank.slice();
  if (a.id === 'e3') return bank3 && bank3.length ? shuffle(bank3.slice(), 5119) : bank.slice();
  const out = [];
  DOMAINS.forEach((d, di) => {
    const pool = shuffle(bank.filter((q) => q.domain === d.name), 9973 + di * 131);
    const k = a.id === 'q2' ? 1 : 0;
    out.push(...pool.slice(k * QUIZ_T[d.name], (k + 1) * QUIZ_T[d.name]));
  });
  return shuffle(out.filter(Boolean), 4211 + id.charCodeAt(1) * 7);
};
