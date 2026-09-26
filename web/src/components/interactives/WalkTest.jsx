import { useEffect, useId, useRef, useState } from 'react';
import { PracticeFrame } from './PracticeFrame';

// Walk the test: a fact pattern goes down a legal test stop by stop, drawn as
// a transit line. The reader decides at each stop, then sees the right call
// and why. A case ends at its last step (often the first failed stop).
// Definitions: content/aicp/interactives/tests.js. Not graded or saved.
export default function WalkTest({ def }) {
  const uid = useId();
  const [ci, setCi] = useState(0);           // case index
  const [si, setSi] = useState(0);           // step index within the case
  const [picked, setPicked] = useState(null); // reader's answer at this stop
  const [calls, setCalls] = useState([]);     // [{ case, step, right }]
  const [finished, setFinished] = useState(false);
  const feedbackRef = useRef(null);
  const headRef = useRef(null);
  const moved = useRef(false);

  const kase = def.cases[ci];
  const step = kase.steps[si];
  const gate = def.gates[si];
  const answered = picked !== null;
  const lastStep = si === kase.steps.length - 1;
  const lastCase = ci === def.cases.length - 1;

  useEffect(() => {
    if (!moved.current) return;
    if (answered) feedbackRef.current?.focus();
    else headRef.current?.focus();
  }, [answered, ci, si, finished]);

  const answer = (yes) => {
    moved.current = true;
    setPicked(yes);
    setCalls((c) => [...c, { right: yes === step.answer }]);
  };
  const next = () => {
    moved.current = true;
    setPicked(null);
    if (!lastStep) setSi(si + 1);
    else if (!lastCase) { setCi(ci + 1); setSi(0); }
    else setFinished(true);
  };
  const restart = () => {
    moved.current = true;
    setCi(0); setSi(0); setPicked(null); setCalls([]); setFinished(false);
  };

  const ended = answered && lastStep;

  if (finished) {
    const right = calls.filter((c) => c.right).length;
    return (
      <PracticeFrame kind="test" label="Walk the test" title={def.title} headingId={`${uid}-h`}>
        <div ref={headRef} tabIndex={-1} className="practice-done">
          <span className="stamp practice-stamp">Line complete</span>
          <p className="practice-done-line">You called {right} of {calls.length} stops correctly across {def.cases.length} cases.</p>
          <ul className="walk-recap">
            {def.cases.map((c) => (
              <li key={c.title}><strong>{c.title}:</strong> {c.outcome.stamp}</li>
            ))}
          </ul>
          <button type="button" className="btn btn-secondary btn-sm" onClick={restart}>Walk it again</button>
        </div>
      </PracticeFrame>
    );
  }

  return (
    <PracticeFrame kind="test" label="Walk the test" title={def.title} headingId={`${uid}-h`}>
      <p className="practice-intro">{def.intro}</p>
      <p className="walk-case-count small">Case {ci + 1} of {def.cases.length}</p>
      <div className="walk-facts">
        <h4 ref={headRef} tabIndex={-1}>{kase.title}</h4>
        <p>{kase.facts}</p>
      </div>
      <div className="walk-body">
        <ol className="walk-line" aria-label="The stops in this test">
          {def.gates.map((g, i) => {
            const s = kase.steps[i];
            const shown = i < si || (i === si && answered);
            const state = shown ? (ended && i === si ? 'end' : 'done') : i === si ? 'current' : ended && i > si ? 'skipped' : 'ahead';
            return (
              <li key={g.label} className={`walk-stop is-${state}`} aria-current={i === si ? 'step' : undefined}>
                <span className="walk-dot" aria-hidden="true">{i + 1}</span>
                <span className="walk-stop-label">
                  {g.label}
                  {g.cite && <span className="walk-cite"> ({g.cite})</span>}
                  {shown && <span className="walk-said">{s.answer ? (g.yes || 'yes') : (g.no || 'no')}</span>}
                  {state === 'skipped' && <span className="walk-said walk-said--skip">not reached</span>}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="walk-ask">
          <p className="walk-question"><span className="walk-stop-n">Stop {si + 1}:</span> {gate.question}</p>
          <div className="walk-buttons" role="group" aria-label={`Stop ${si + 1} answer`}>
            {[true, false].map((yes) => {
              const label = yes ? (gate.yes || 'Yes') : (gate.no || 'No');
              const cls = answered && yes === step.answer ? ' is-answer' : answered && yes === picked ? ' is-wrong' : '';
              return (
                <button key={label} type="button" className={`walk-btn${cls}`} disabled={answered} aria-pressed={answered ? picked === yes : undefined} onClick={() => answer(yes)}>
                  {label}
                </button>
              );
            })}
          </div>
          <div aria-live="polite">
            {answered && (
              <div ref={feedbackRef} tabIndex={-1} className={`practice-feedback ${picked === step.answer ? 'is-right' : 'is-wrong'} fade-up`}>
                <p className="practice-feedback-head">
                  {picked === step.answer ? 'Right call.' : `The answer is ${step.answer ? (gate.yes || 'yes') : (gate.no || 'no')}.`}
                </p>
                <p className="practice-feedback-why">{step.why}</p>
                {ended && (
                  <div className="walk-outcome">
                    <span className={`stamp walk-stamp walk-stamp--${kase.outcome.tone}`}>{kase.outcome.stamp}</span>
                    <p>{kase.outcome.text}</p>
                  </div>
                )}
                <button type="button" className="btn btn-primary btn-sm" onClick={next}>
                  {!lastStep ? 'Next stop' : !lastCase ? 'Next case' : 'See how you did'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PracticeFrame>
  );
}
