import { useEffect, useState } from 'react';
import OptionButton from './OptionButton';
import RichText from './RichText';
import OptionNotes from './OptionNotes';
import { LETTERS } from '../data/domains';
import { loadQuestions } from '../lib/questionBank';
import { useStudyState, recordCheckpoint, clearCheckpoint } from '../lib/studyState';

// A mid-lesson checkpoint: one or more questions on the section just read,
// answered in place with instant feedback. Answers are saved per account
// (lib/studyState.js), so a returning reader sees their result and can retry.
export default function Checkpoint({ slug, refs, number, total }) {
  const [qs, setQs] = useState(null);
  const study = useStudyState();
  const saved = study.checkpoints[slug] || {};

  useEffect(() => {
    let live = true;
    loadQuestions(refs).then((loaded) => { if (live) setQs(loaded); });
    return () => { live = false; };
  }, [refs]);

  const headingId = `checkpoint-${number}-heading`;
  return (
    <section className="checkpoint" aria-labelledby={headingId}>
      <div className="checkpoint-label">
        <span aria-hidden="true" className="checkpoint-badge">{number}</span>
        <h3 id={headingId}>Checkpoint {number} of {total}</h3>
      </div>
      {!qs && <p className="small" role="status">Loading the checkpoint&hellip;</p>}
      {qs && qs.map((q) => {
        const answer = saved[q.ref];
        const done = !!answer;
        return (
          <div key={q.ref} className="checkpoint-q">
            {q.scenario && <RichText as="p" text={q.scenario} className="checkpoint-scenario" />}
            <RichText as="p" text={q.text} className="checkpoint-stem" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }} role="group" aria-label="Answer choices">
              {q.options.map((opt, idx) => {
                let variant = 'default';
                if (done && idx === q.correct) variant = 'correct';
                else if (done && idx === answer.pick) variant = 'wrong';
                return (
                  <OptionButton
                    key={idx}
                    letter={LETTERS[idx]}
                    text={opt}
                    variant={variant}
                    size="sm"
                    disabled={done}
                    onClick={() => { if (!done) recordCheckpoint(slug, q.ref, idx, idx === q.correct); }}
                  />
                );
              })}
            </div>
            <div aria-live="polite">
              {done && (
                <div className={`checkpoint-feedback ${answer.correct ? 'is-right' : 'is-wrong'} fade-up`}>
                  <p style={{ margin: '0 0 4px', fontWeight: 700 }}>
                    {answer.correct ? 'Correct.' : `Not quite. The answer is ${LETTERS[q.correct]}.`}
                  </p>
                  <RichText as="p" text={q.explanation} style={{ margin: 0 }} />
                  <OptionNotes q={q} picked={answer.pick} style={{ margin: '10px 0 0' }} />
                  {!answer.correct && (
                    <p style={{ margin: '8px 0 0' }}>Reread the section above, then try again.</p>
                  )}
                  <button type="button" className="checkpoint-retry" onClick={() => clearCheckpoint(slug, q.ref)}>
                    Try this question again
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
