import { useState } from 'react';
import { Link } from 'react-router-dom';
import OptionButton from './OptionButton';
import { QOTD, LETTERS } from '../data/domains';
import { P } from '../lib/paths';

// The free "question of the day" card from the original landing page.
export default function QuestionOfTheDay() {
  const [pick, setPick] = useState(undefined);
  const done = pick !== undefined;

  return (
    <div style={{ background: '#FFFFFF', color: 'var(--ink)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: 28, boxShadow: '0 30px 60px -24px rgba(6,20,44,0.55)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: 99, background: '#1D5FA8', display: 'block' }} />
        <h2 style={{ margin: 0, fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#14508C' }}>Question of the day</h2>
        <span style={{ fontSize: 12.5, color: '#5B6180', marginLeft: 'auto' }}>Free &middot; no account needed</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
        <span className="chip chip-brand">{QOTD.domain}</span>
      </div>
      <p style={{ fontSize: 17.5, fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '14px 0 16px' }}>{QOTD.text}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {QOTD.options.map((text, idx) => {
          let variant = 'default';
          if (done && idx === QOTD.correct) variant = 'correct';
          else if (done && idx === pick) variant = 'wrong';
          return (
            <OptionButton
              key={idx}
              letter={LETTERS[idx]}
              text={text}
              variant={variant}
              size="sm"
              disabled={done}
              onClick={() => { if (!done) setPick(idx); }}
            />
          );
        })}
      </div>
      <div aria-live="polite">
        {done && (
          <div className="fade-up" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #EEF0F7' }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: pick === QOTD.correct ? '#14508C' : '#A32E20' }}>
              {pick === QOTD.correct ? 'Correct. Nice.' : 'Not quite.'}
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#454A63', margin: '8px 0 0' }}>{QOTD.explanation}</p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary btn-sm" to={P.lesson('aicp-code-of-ethics')}>Read the ethics lesson</Link>
              <button
                type="button"
                onClick={() => setPick(undefined)}
                style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, fontWeight: 600, color: '#5B6180', textDecoration: 'underline', textUnderlineOffset: '3px' }}
              >
                Try again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
