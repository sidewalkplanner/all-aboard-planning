import { useId, useState } from 'react';
import { CALCULATORS } from '../content/aicp/interactives/calculators';

// An interactive calculator from a lesson's `:::calc <id>` line. The inputs
// start at the lesson's worked example; the results and the worked steps
// update as the reader types, so they can test the formula on their own numbers.
export default function Calculator({ id }) {
  const calc = CALCULATORS[id];
  const uid = useId();
  const [values, setValues] = useState(() => Object.fromEntries((calc?.inputs || []).map((i) => [i.id, String(i.value)])));
  if (!calc) return null;

  const parsed = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.trim() === '' ? NaN : Number(v.replace(/,/g, ''))]));
  const out = calc.compute(parsed);
  const reset = () => setValues(Object.fromEntries(calc.inputs.map((i) => [i.id, String(i.value)])));
  const changed = calc.inputs.some((i) => values[i.id] !== String(i.value));
  const headingId = `${uid}-heading`;

  return (
    <section className="calc" aria-labelledby={headingId}>
      <div className="calc-label">
        <span className="calc-badge" aria-hidden="true">=</span>
        <h3 id={headingId}>Try it: {calc.title}</h3>
      </div>
      <p className="calc-intro">{calc.intro}</p>
      <div className="calc-inputs">
        {calc.inputs.map((i) => (
          <label key={i.id} className="calc-field">
            <span>{i.label}</span>
            <span className="calc-input">
              {i.prefix && <span aria-hidden="true">{i.prefix}</span>}
              <input
                type="number"
                inputMode="decimal"
                value={values[i.id]}
                step={i.step}
                min={i.min}
                max={i.max}
                onChange={(e) => setValues((v) => ({ ...v, [i.id]: e.target.value }))}
              />
              {i.suffix && <span aria-hidden="true">{i.suffix}</span>}
            </span>
          </label>
        ))}
      </div>
      <div aria-live="polite">
        {out ? (
          <>
            <dl className="calc-results">
              {out.results.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <details className="calc-steps">
              <summary>Show the steps</summary>
              <ol>{out.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            </details>
          </>
        ) : (
          <p className="calc-invalid">Enter numbers in every box, within a sensible range, to see the result.</p>
        )}
      </div>
      {changed && <button type="button" className="checkpoint-retry" onClick={reset}>Back to the lesson&rsquo;s example</button>}
    </section>
  );
}
