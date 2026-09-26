import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { PracticeFrame } from './PracticeFrame';

// You're the planner: linked situations, each with a few responses. Picking
// one shows what happens next and a stamp; a response that isn't the best can
// be retried. The choices are shuffled so the best one isn't always in the
// same place. Definitions: content/aicp/interactives/scenes.js. Not graded or saved.
const shuffled = (n) => {
  const a = [...Array(n).keys()];
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Scene({ def }) {
  const uid = useId();
  const [round, setRound] = useState(0);
  const orders = useMemo(() => def.steps.map((s) => shuffled(s.choices.length)), [def, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [si, setSi] = useState(0);
  const [picked, setPicked] = useState(null);
  const [tried, setTried] = useState([]);   // choice indexes tried on this step
  const [first, setFirst] = useState([]);   // first pick per step
  const [done, setDone] = useState(false);
  const headRef = useRef(null);
  const resultRef = useRef(null);
  const moved = useRef(false);

  const step = def.steps[si];
  const choice = picked !== null ? step.choices[picked] : null;

  useEffect(() => {
    if (!moved.current) return;
    if (choice) resultRef.current?.focus();
    else headRef.current?.focus();
  }, [choice, si, done]);

  const pick = (i) => {
    moved.current = true;
    setPicked(i);
    setTried((t) => (t.includes(i) ? t : [...t, i]));
    if (tried.length === 0) setFirst((f) => [...f, i]);
  };
  const retry = () => { moved.current = true; setPicked(null); };
  const next = () => {
    moved.current = true;
    setPicked(null);
    setTried([]);
    if (si < def.steps.length - 1) setSi(si + 1);
    else setDone(true);
  };
  const restart = () => {
    moved.current = true;
    setRound((r) => r + 1);
    setSi(0); setPicked(null); setTried([]); setFirst([]); setDone(false);
  };

  if (done) {
    const best = first.filter((c, i) => def.steps[i].choices[c].best).length;
    return (
      <PracticeFrame kind="scene" label="You're the planner" title={def.title} headingId={`${uid}-h`}>
        <div ref={headRef} tabIndex={-1} className="practice-done">
          <span className="stamp practice-stamp">Week done</span>
          <p className="practice-done-line">By the book on the first try: {best} of {def.steps.length}.</p>
          <ul className="scene-recap">
            {def.steps.map((s, i) => {
              const c = s.choices[first[i]];
              return (
                <li key={s.tag}>
                  <strong>{s.tag}, {s.title}:</strong>{' '}
                  <span className={`scene-recap-stamp${c.best ? ' is-best' : ''}`}>{c.stamp}</span>
                </li>
              );
            })}
          </ul>
          <button type="button" className="btn btn-secondary btn-sm" onClick={restart}>Start the week again</button>
        </div>
      </PracticeFrame>
    );
  }

  return (
    <PracticeFrame kind="scene" label="You're the planner" title={def.title} headingId={`${uid}-h`}>
      <p className="practice-intro">{def.intro}</p>
      <ol className="scene-days" aria-label="Progress">
        {def.steps.map((s, i) => (
          <li key={s.tag} className={i < si ? 'is-done' : i === si ? 'is-now' : ''} aria-current={i === si ? 'step' : undefined}>{s.tag}</li>
        ))}
      </ol>
      <div className="scene-ticket">
        <p className="scene-role small">{def.role}</p>
        <h4 ref={headRef} tabIndex={-1}><span className="scene-tag">{step.tag}:</span> {step.title}</h4>
        <p className="scene-text">{step.text}</p>
      </div>
      <p className="sort-ask" id={`${uid}-ask`}>What do you do?</p>
      <div className="scene-choices" role="group" aria-labelledby={`${uid}-ask`}>
        {orders[si].map((i) => {
          const c = step.choices[i];
          const was = tried.includes(i);
          return (
            <button
              key={i}
              type="button"
              className={`scene-choice${picked === i ? (c.best ? ' is-best' : ' is-off') : was ? ' is-tried' : ''}`}
              disabled={picked !== null}
              onClick={() => pick(i)}
            >
              {c.label}
              {was && picked !== i && <span className="visually-hidden"> (already tried: {c.stamp})</span>}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        {choice && (
          <div ref={resultRef} tabIndex={-1} className={`practice-feedback ${choice.best ? 'is-right' : 'is-wrong'} fade-up`}>
            <span className={`stamp scene-stamp${choice.best ? ' is-best' : ''}`}>{choice.stamp}</span>
            <p className="scene-result">{choice.result}</p>
            <p className="practice-feedback-why">{choice.why}</p>
            <div className="row-wrap" style={{ marginTop: 12, gap: 10 }}>
              {!choice.best && <button type="button" className="btn btn-secondary btn-sm" onClick={retry}>Try another choice</button>}
              <button type="button" className="btn btn-primary btn-sm" onClick={next}>
                {si < def.steps.length - 1 ? `On to ${def.steps[si + 1].tag}` : 'Finish the week'}
              </button>
            </div>
          </div>
        )}
      </div>
    </PracticeFrame>
  );
}
