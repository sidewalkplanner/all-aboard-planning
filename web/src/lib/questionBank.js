import { CHECKPOINTS } from '../content/aicp/checkpoints';

// Resolves question refs to question objects: "e1:115" from a practice exam
// bank, "cp:…" from the original checkpoint questions. The exam banks are
// large, so each loads on first use and is cached.
const LOADERS = {
  e1: () => import('../data/exam1-questions'),
  e2: () => import('../data/exam2-questions'),
  e3: () => import('../data/exam3-questions'),
};
const cache = {};
const loadBank = (b) => (cache[b] = cache[b] || LOADERS[b]().then((m) => m.BANK));

export async function loadQuestions(refs) {
  const banks = [...new Set(refs.map((r) => r.split(':')[0]).filter((b) => LOADERS[b]))];
  const loaded = Object.fromEntries(await Promise.all(banks.map(async (b) => [b, await loadBank(b)])));
  return refs
    .map((ref) => {
      if (ref.startsWith('cp:')) return CHECKPOINTS[ref] ? { ...CHECKPOINTS[ref], ref } : null;
      const [b, n] = ref.split(':');
      const q = loaded[b] && loaded[b].find((x) => x.n === Number(n));
      return q ? { ...q, ref } : null;
    })
    .filter(Boolean);
}
