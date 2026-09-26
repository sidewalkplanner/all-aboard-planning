import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from 'react';
import { PracticeFrame } from './PracticeFrame';
import { num } from './sketchKit';

// Try it: a calculator with a live sketch (Explore) and fresh problems to
// solve by hand (Your turn). Definitions live in
// content/aicp/interactives/calculators.js. Nothing here is graded or saved.
const parse = (v) => (String(v).trim() === '' ? NaN : Number(String(v).replace(/[,$%\s]/g, '')));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const defaults = (def) => Object.fromEntries(def.inputs.map((i) => [i.id, String(i.value)]));

function Field({ input, value, onChange, uid }) {
  const id = `${uid}-${input.id}`;
  const n = parse(value);
  const unit = [input.prefix, input.suffix].filter(Boolean).join(' ');
  const box = (
    <span className="try-number">
      {input.prefix && <span aria-hidden="true">{input.prefix}</span>}
      <input
        id={input.slider ? undefined : id}
        aria-label={input.slider ? `${input.label}, exact value` : undefined}
        type="text"
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {input.suffix && <span aria-hidden="true">{input.suffix}</span>}
    </span>
  );
  if (!input.slider) {
    return (
      <div className="try-field">
        <label htmlFor={id}>{input.label}</label>
        {box}
      </div>
    );
  }
  return (
    <div className="try-field try-field--slider">
      <label htmlFor={id}>{input.label}</label>
      <div className="try-slider-row">
        <input
          id={id}
          type="range"
          min={input.min}
          max={input.max}
          step={input.step}
          value={Number.isFinite(n) ? Math.min(input.max, Math.max(input.min, n)) : input.value}
          aria-valuetext={Number.isFinite(n) ? `${input.prefix || ''}${num(n, String(input.step).includes('.') ? 1 : 0)} ${input.suffix || ''}`.trim() : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
        {box}
      </div>
      {unit && <span className="visually-hidden">Unit: {unit}</span>}
    </div>
  );
}

function Explore({ def, uid }) {
  const [values, setValues] = useState(() => defaults(def));
  const parsed = useMemo(() => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, parse(v)])), [values]);
  const out = def.compute(parsed);
  // The sketch trails the inputs a little while a slider moves.
  const drawn = useDeferredValue(parsed);
  const sketch = useMemo(() => {
    const o = def.compute(drawn);
    return o && def.draw ? def.draw(drawn, o) : null;
  }, [def, drawn]);
  const describe = out && def.describe ? def.describe(parsed, out) : '';
  const changed = def.inputs.some((i) => values[i.id] !== String(i.value));

  // Screen readers hear a summary once the reader stops adjusting.
  const [spoken, setSpoken] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setSpoken(out ? [describe, ...out.results.map((r) => `${r.label}: ${r.value}`)].filter(Boolean).join('. ') : 'Enter a number in every box.'), 700);
    return () => clearTimeout(t);
  }, [describe, out]);

  return (
    <>
      {def.predict && (
        <p className="try-predict"><span className="try-predict-label">Predict first:</span> {def.predict}</p>
      )}
      {sketch && (
        <div className="try-sketch">
          <svg viewBox={`0 0 ${sketch.w} ${sketch.h}`} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: sketch.svg }} />
        </div>
      )}
      {describe && <p className="try-describe">{describe}</p>}
      <div className="try-inputs">
        {def.inputs.map((i) => (
          <Field key={i.id} uid={uid} input={i} value={values[i.id]} onChange={(v) => setValues((s) => ({ ...s, [i.id]: v }))} />
        ))}
      </div>
      {out ? (
        <>
          <dl className="try-results">
            {out.results.map((r) => (
              <div key={r.label}>
                <dt>{r.label}</dt>
                <dd className={r.value.length > 18 ? 'is-long' : undefined}>{r.value}</dd>
              </div>
            ))}
          </dl>
          <details className="try-steps">
            <summary>Show the steps</summary>
            <ol>{out.steps.map((s) => <li key={s}>{s}</li>)}</ol>
          </details>
        </>
      ) : (
        <p className="try-invalid">Enter a number in every box, within a sensible range, to see the result.</p>
      )}
      <p className="visually-hidden" aria-live="polite">{spoken}</p>
      {changed && (
        <button type="button" className="practice-link" onClick={() => setValues(defaults(def))}>
          Back to the lesson&rsquo;s example
        </button>
      )}
    </>
  );
}

function YourTurn({ def, uid }) {
  const newProblem = () => pick(def.problems)(pick);
  const [problem, setProblem] = useState(newProblem);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null); // null | { right, shown }
  const [solved, setSolved] = useState(0);
  const inputRef = useRef(null);
  const feedbackRef = useRef(null);
  const tol = Math.max(Math.abs(problem.answer) * 0.01, 0.5 * 10 ** -problem.dp);
  const correct = num(problem.answer, problem.dp);

  const check = (e) => {
    e.preventDefault();
    const n = parse(answer.replace(/[−–]/g, '-'));
    if (!Number.isFinite(n)) { setResult({ empty: true }); return; }
    const right = Math.abs(n - problem.answer) <= tol;
    setResult({ right });
    if (right) setSolved((s) => s + 1);
  };
  useEffect(() => { if (result && !result.empty && feedbackRef.current) feedbackRef.current.focus(); }, [result]);
  const next = () => {
    setProblem(newProblem());
    setAnswer('');
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 0);
  };
  const steps = result && !result.empty ? def.compute(problem.values).steps : null;

  return (
    <>
      <p className="try-problem">{problem.text}</p>
      <form className="try-answer" onSubmit={check}>
        <label htmlFor={`${uid}-answer`}>Your answer{problem.unit ? ` (${problem.unit})` : ''}</label>
        <div className="try-answer-row">
          <input ref={inputRef} id={`${uid}-answer`} type="text" inputMode="decimal" autoComplete="off" value={answer} onChange={(e) => { setAnswer(e.target.value); if (result && result.empty) setResult(null); }} disabled={!!result && !result.empty} />
          {(!result || result.empty) && <button type="submit" className="btn btn-primary btn-sm">Check</button>}
        </div>
        {result && result.empty && <p className="try-invalid" role="alert">Type a number first. You can use a calculator; round to {problem.dp ? `${problem.dp} decimal place${problem.dp > 1 ? 's' : ''}` : 'a whole number'}.</p>}
      </form>
      {steps && (
        <div ref={feedbackRef} tabIndex={-1} className={`practice-feedback ${result.right ? 'is-right' : 'is-wrong'}`}>
          <p className="practice-feedback-head">{result.right ? `Right: ${correct}.` : `Not quite. The answer is ${correct}.`}</p>
          <ol className="try-steps-list">{steps.map((s) => <li key={s}>{s}</li>)}</ol>
          <button type="button" className="btn btn-secondary btn-sm" onClick={next}>Another problem</button>
        </div>
      )}
      {solved > 0 && <p className="small try-tally" aria-live="polite">Solved this visit: {solved}</p>}
    </>
  );
}

export default function TryIt({ id, def }) {
  const uid = useId();
  const [mode, setMode] = useState('explore');
  const hasProblems = def.problems && def.problems.length > 0;
  return (
    <PracticeFrame kind="calc" label="Try it" title={def.title} headingId={`${uid}-h`}>
      <p className="practice-intro">
        {def.intro}
        {def.illustrative && <> <span className="chip chip-warn">Illustrative numbers</span></>}
      </p>
      {hasProblems && (
        <div className="try-modes" role="group" aria-label="Choose a mode">
          <button type="button" aria-pressed={mode === 'explore'} onClick={() => setMode('explore')}>Explore</button>
          <button type="button" aria-pressed={mode === 'turn'} onClick={() => setMode('turn')}>Your turn</button>
        </div>
      )}
      {mode === 'explore' ? <Explore key={id} def={def} uid={uid} /> : <YourTurn def={def} uid={uid} />}
    </PracticeFrame>
  );
}
