import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';
import OptionButton from '../components/OptionButton';
import { DOMAINS, QOTD, LETTERS } from '../data/domains';
import { barStyle } from '../lib/style';
import { GREEN } from '../lib/theme';

export default function Landing() {
  const navigate = useNavigate();
  const [pick, setPick] = useState(undefined);
  const done = pick !== undefined;
  const maxPct = Math.max(1, ...DOMAINS.map((d) => d.pct));

  return (
    <>
      {/* HERO */}
      <section style={{ background: '#10345E' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '80px 24px 88px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 99, background: 'rgba(255,112,89,0.20)', color: '#FFAD9B', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>
              Two free quizzes, every answer explained
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(44px,6.2vw,74px)', lineHeight: 0.98, letterSpacing: '-0.04em', fontWeight: 700, color: '#FFFFFF', margin: '22px 0 0' }}>
              Practice until the real thing feels familiar.
            </h1>
            <p style={{ fontSize: 18.5, lineHeight: 1.6, color: '#AEC4E0', maxWidth: '46ch', margin: '22px 0 0' }}>
              Start with two free 25-question quizzes weighted exactly like the real exam. Unlock two full-length 170-question exams when you are ready. Every answer comes with a plain-language explanation.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              <Hoverable
                style={{ background: '#FF7059', color: '#3B1008', border: 'none', padding: '16px 28px', borderRadius: 12, fontSize: 16.5, fontWeight: 700, letterSpacing: '-0.01em' }}
                hoverStyle={{ background: '#FF8B78' }}
                onClick={() => navigate('/exams')}
              >
                Start a free quiz
              </Hoverable>
              <Hoverable
                style={{ background: 'none', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.45)', padding: '16px 28px', borderRadius: 12, fontSize: 16.5, fontWeight: 700, letterSpacing: '-0.01em' }}
                hoverStyle={{ border: '1.5px solid #FFFFFF', background: 'rgba(255,255,255,0.12)' }}
                onClick={() => navigate('/study')}
              >
                Browse by domain
              </Hoverable>
            </div>
            <div style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 26 }}>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: '#FF7059' }}>2</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: '#9FB8D6', marginTop: 2 }}>free warm-up quizzes</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: '#FF7059' }}>340</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: '#9FB8D6', marginTop: 2 }}>questions across two exams</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', color: '#FF7059' }}>9</div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: '#9FB8D6', marginTop: 2 }}>domains covered</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20, padding: 28, boxShadow: '0 30px 60px -24px rgba(6,20,44,0.55)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: '#1D5FA8', display: 'block' }} />
              <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#14508C' }}>Question of the day</span>
              <span style={{ fontSize: 12.5, color: '#636987', marginLeft: 'auto' }}>Free &middot; no account needed</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#14508C', background: '#E6EEF9', padding: '5px 10px', borderRadius: 6 }}>{QOTD.domain}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A6420', background: '#FCF0DB', padding: '5px 10px', borderRadius: 6 }}>{QOTD.difficulty}</span>
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
            {done && (
              <div className="fade-up" style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #EEF0F7' }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: pick === QOTD.correct ? '#14508C' : '#A32E20' }}>
                  {pick === QOTD.correct ? 'Correct — nice.' : 'Not quite.'}
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, color: '#454A63', margin: '8px 0 0' }}>{QOTD.explanation}</p>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                  <Hoverable
                    style={{ background: '#1D5FA8', color: '#FFFFFF', border: 'none', padding: '11px 18px', borderRadius: 9, fontSize: 14.5, fontWeight: 600 }}
                    hoverStyle={{ background: '#164C87' }}
                    onClick={() => navigate('/exams')}
                  >
                    Take a full exam
                  </Hoverable>
                  <Hoverable
                    style={{ background: 'none', border: 'none', padding: 0, fontSize: 14, fontWeight: 600, color: '#646A85', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                    hoverStyle={{ color: '#1A1C2B' }}
                    onClick={() => setPick(undefined)}
                  >
                    Try again
                  </Hoverable>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* DIAGNOSTIC PROMO */}
      <section style={{ background: '#FBF6F1', borderBottom: '1px solid #EFE2D6' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 13px', borderRadius: 99, background: '#FCE6DF', color: '#A32E20', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.02em' }}>
              Free &middot; 100 items &middot; no time limit
            </div>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,3.2vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', margin: '18px 0 0', textWrap: 'pretty' }}>
              Start by finding out where you actually stand.
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.6, color: '#5A4A42', margin: '14px 0 0', maxWidth: '54ch' }}>
              The diagnostic is not a mock exam. It is built to produce one thing: a reliable read on each of the nine domains, so your study time goes where it is losing you points. You get a ranked study plan, not a pass-fail guess.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 26, flexWrap: 'wrap' }}>
              <Hoverable
                style={{ background: '#C93B2C', color: '#FFF6F3', border: 'none', padding: '15px 26px', borderRadius: 11, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}
                hoverStyle={{ background: '#A32E20' }}
                onClick={() => navigate('/diagnostic')}
              >
                Take the diagnostic
              </Hoverable>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #EFE2D6', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A32E20' }}>What you get</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3A3F57', marginTop: 8 }}>A percentage and a fraction for all nine domains, banded from Priority to Strong.</div>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #EFE2D6', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A32E20' }}>Study in order</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3A3F57', marginTop: 8 }}>Domains ranked by exam weight times points lost, so a soft spot in a heavy domain outranks a bad score in a light one.</div>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #EFE2D6', borderRadius: 14, padding: '18px 20px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#A32E20' }}>Confident but wrong</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3A3F57', marginTop: 8 }}>Tag your confidence as you go and the report surfaces the mistakes you would never have thought to check.</div>
            </div>
          </div>
        </div>
      </section>

      {/* WEIGHTING */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E4E6F0' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 24px' }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,3.4vw,40px)', fontWeight: 700, letterSpacing: '-0.03em', margin: 0 }}>
            How every exam is weighted
          </h2>
          <p style={{ fontSize: 16.5, color: '#646A85', margin: '10px 0 34px', maxWidth: '62ch' }}>
            Quizzes and exams alike draw from a 340-question bank in these proportions, matching the APA content outline. Your score report breaks out the same way.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {DOMAINS.map((d) => (
              <div key={d.name} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px,1.4fr) minmax(120px,3fr) 52px', gap: 20, alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #EEF0F7' }}>
                <div style={{ fontSize: 15.5, fontWeight: 600 }}>{d.name}</div>
                <div style={{ height: 9, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={barStyle((d.pct / maxPct) * 100, GREEN)} />
                </div>
                <div style={{ fontSize: 14.5, color: '#646A85', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '64px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 28 }}>
          {[
            ['01', 'Pick a mode', 'Timed runs the clock and holds feedback until you submit. Practice explains each answer as you go.'],
            ['02', 'Flag as you go', 'Mark anything you want a second look at and return to it from the review grid before submitting.'],
            ['03', 'See where you stand', 'Scores break down by domain so your next study session has an obvious starting point.']
          ].map(([n, title, body]) => (
            <div key={n}>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, color: '#C93B2C', fontWeight: 600 }}>{n}</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, margin: '8px 0 8px' }}>{title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#454A63', margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
