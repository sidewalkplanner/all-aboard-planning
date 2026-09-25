import { useEffect, useState } from 'react';
import OptionButton from './OptionButton';
import RichText from './RichText';
import { LETTERS } from '../data/domains';

// Three questions from a lesson's practice set, answered right on the lesson
// page with instant feedback: retrieval practice at the moment it helps most.
// The question banks are large, so they load only when this block mounts.
const LOADERS = {
  e1: () => import('../data/exam1-questions'),
  e2: () => import('../data/exam2-questions'),
  e3: () => import('../data/exam3-questions'),
};

// Stable pseudo-random order per lesson, so the same three questions appear
// each visit (and different lessons don't all start with their first ref).
const hash = (str) => [...str].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

async function pickQuestions(slug, refs, count) {
  const banks = [...new Set(refs.map((r) => r.split(':')[0]))];
  const loaded = Object.fromEntries(await Promise.all(banks.map(async (b) => [b, (await LOADERS[b]()).BANK])));
  const qs = refs
    .map((ref) => {
      const [b, n] = ref.split(':');
      const q = loaded[b].find((x) => x.n === Number(n));
      return q ? { ...q, ref } : null;
    })
    .filter(Boolean)
    // Standalone items read best out of context: skip scenario and exhibit items.
    .filter((q) => !q.scenario && !q.exhibit)
    .sort((a, b) => hash(slug + a.ref) - hash(slug + b.ref));
  return qs.slice(0, count);
}

export default function QuickCheck({ lesson, count = 3 }) {
  const [state, setState] = useState({ slug: null, qs: [] });
  const [picks, setPicks] = useState({});
  const qs = state.slug === lesson.slug ? state.qs : [];

  useEffect(() => {
    let live = true;
    pickQuestions(lesson.slug, lesson.practice || [], count).then((picked) => {
      if (live) { setState({ slug: lesson.slug, qs: picked }); setPicks({}); }
    });
    return () => { live = false; };
  }, [lesson.slug, lesson.practice, count]);

  if (!qs.length) return null;
  const answered = qs.filter((q) => picks[q.ref] !== undefined).length;
  const right = qs.filter((q) => picks[q.ref] === q.correct).length;

  return (
    <section aria-labelledby="quick-check-heading" className="card" style={{ marginTop: 40 }}>
      <span className="eyebrow eyebrow-brand">Check yourself</span>
      <h2 id="quick-check-heading" className="h3" style={{ marginBottom: 6 }}>Three quick questions</h2>
      <p className="body-text" style={{ margin: '0 0 18px' }}>
        Answer before you look back at the lesson. Trying to recall is what makes it stick.
      </p>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 26 }}>
        {qs.map((q, qi) => {
          const pick = picks[q.ref];
          const done = pick !== undefined;
          return (
            <li key={q.ref}>
              <div className="small" style={{ fontWeight: 700, marginBottom: 6 }}>Question {qi + 1} of {qs.length}</div>
              <RichText as="p" text={q.text} style={{ fontSize: 16.5, fontWeight: 500, lineHeight: 1.5, margin: '0 0 12px', whiteSpace: 'pre-line' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {q.options.map((opt, idx) => {
                  let variant = 'default';
                  if (done && idx === q.correct) variant = 'correct';
                  else if (done && idx === pick) variant = 'wrong';
                  return (
                    <OptionButton
                      key={idx}
                      letter={LETTERS[idx]}
                      text={opt}
                      variant={variant}
                      size="sm"
                      disabled={done}
                      onClick={() => { if (!done) setPicks((p) => ({ ...p, [q.ref]: idx })); }}
                    />
                  );
                })}
              </div>
              <div aria-live="polite">
                {done && (
                  <div className="fade-up callout" style={{ marginTop: 12, ...(pick === q.correct ? {} : { borderLeftColor: 'var(--rust)', background: 'var(--err-bg)' }) }}>
                    <p style={{ margin: '0 0 4px', fontWeight: 700 }}>{pick === q.correct ? 'Correct.' : `Not quite. The answer is ${LETTERS[q.correct]}.`}</p>
                    <RichText as="p" text={q.explanation} style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }} />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {answered === qs.length && (
        <p className="body-text" role="status" style={{ margin: '20px 0 0', fontWeight: 600 }}>
          {right} of {qs.length} correct. {right === qs.length ? 'Nice work. The full practice set below goes deeper.' : 'Reread the sections those questions came from, then try the full practice set below.'}
        </p>
      )}
    </section>
  );
}
