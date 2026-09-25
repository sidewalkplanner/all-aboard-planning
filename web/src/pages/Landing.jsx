import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OptionButton from '../components/OptionButton';
import HeroTown from '../components/HeroTown';
import Art from '../components/Art';
import { DOMAINS, QOTD, LETTERS } from '../data/domains';
import { art, badgeFor, DOMAIN_COLOR } from '../lib/art';

const STEPS = [
  ['01', 'spot-mode', 320, 220, 'Pick a mode', 'Timed runs the clock and holds feedback until you submit. Practice explains each answer as you go.', 'var(--butter)'],
  ['02', 'spot-flag', 320, 240, 'Flag as you go', 'Mark anything you want a second look at and return to it from the review grid before submitting.', 'var(--blush)'],
  ['03', 'spot-score', 320, 240, 'See where you stand', 'Scores break down by domain so your next study session has an obvious starting point.', 'var(--sky)']
];

const NOTES = [
  ['What you get', 'A percentage and a fraction for all nine domains, banded from Priority to Strong.', 'tape', -1.5],
  ['Study in order', 'Domains ranked by exam weight times points lost, so a soft spot in a heavy domain outranks a bad score in a light one.', 'pin', 1],
  ['Confident but wrong', 'Tag your confidence as you go and the report surfaces the mistakes you would never have thought to check.', 'tape tape--mint', -0.8]
];

function QuestionOfTheDay() {
  const navigate = useNavigate();
  const [pick, setPick] = useState(undefined);
  const done = pick !== undefined;
  const right = pick === QOTD.correct;

  return (
    <div className="card" style={{ padding: '30px 26px 26px', '--r': '1deg', maxWidth: 520, justifySelf: 'end', width: '100%' }}>
      <span className="tape" aria-hidden="true" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span className="hand" style={{ fontSize: 28, color: 'var(--civic-ink)' }}>Question of the day</span>
        <span style={{ fontSize: 12.5, color: 'var(--ink-faint)', marginLeft: 'auto', fontWeight: 600 }}>Free &middot; no account needed</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
        <span className="chip chip--leaf">{QOTD.domain}</span>
      </div>
      <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.5, margin: '14px 0 16px' }}>{QOTD.text}</p>
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
        <div className="fade-up" style={{ marginTop: 18, paddingTop: 16, borderTop: '2px dashed var(--line-strong)' }}>
          <div className="hand" style={{ fontSize: 30, color: right ? 'var(--leaf-deep)' : 'var(--tomato-deep)' }}>
            {right ? 'Correct, nice work!' : 'Not quite...'}
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '6px 0 0' }}>{QOTD.explanation}</p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn--sm btn--civic" onClick={() => navigate('/exams')}>Take a full exam</button>
            <button className="link-btn" onClick={() => setPick(undefined)}>Try again</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const maxPct = Math.max(1, ...DOMAINS.map((d) => d.pct));

  return (
    <>
      {/* HERO: headline and question card over the paper town */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={art('hero-cloud-a')} alt="" aria-hidden="true" className="sky-bit sky-bit--cloud" style={{ width: 190, top: 96, left: '44%', opacity: 0.95 }} />
        <img src={art('hero-cloud-b')} alt="" aria-hidden="true" className="sky-bit sky-bit--cloud-b" style={{ width: 140, top: 520, left: '3%' }} />
        <img src={art('hero-sun')} alt="" aria-hidden="true" className="sky-bit sky-bit--sun" style={{ width: 150, top: 18, right: '2%' }} />

        <div className="wrap" style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48, alignItems: 'center', paddingTop: 64, paddingBottom: 8 }}>
          <div>
            <span className="chip chip--butter" style={{ transform: 'rotate(-2deg)' }}>Two free quizzes &middot; every answer explained</span>
            <h1 className="display" style={{ fontSize: 'clamp(46px,6.6vw,84px)', margin: '22px 0 0' }}>
              Practice until the real thing feels <em className="marker">familiar.</em>
            </h1>
            <p className="lede" style={{ margin: '24px 0 0', maxWidth: '46ch' }}>
              Start with two free 25-question quizzes weighted exactly like the AICP exam. Unlock three full-length 170-question exams when you are ready. Every answer comes with a plain-language explanation.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap', alignItems: 'center' }}>
              <button className="btn btn--lg btn--tomato" onClick={() => navigate('/exams')}>Start a free quiz</button>
              <button className="btn btn--lg btn--paper" onClick={() => navigate('/study')}>Browse by domain</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, margin: '10px 0 0 26px', color: 'var(--tomato-deep)' }} aria-hidden="true">
              <span className="pen-arrow" style={{ transform: 'scaleX(-1) rotate(200deg)', width: 46, height: 36 }} />
              <span className="hand" style={{ fontSize: 24, transform: 'rotate(-3deg)', marginTop: 16 }}>no account needed!</span>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' }}>
              {[['2', 'free warm-up quizzes', 'var(--butter)', -2], ['510', 'questions across three exams', 'var(--sky)', 1.5], ['9', 'domains covered', 'var(--blush)', -1]].map(([n, label, bg, r]) => (
                <div key={label} className="stat-pill" style={{ transform: `rotate(${r}deg)` }}>
                  <span className="stat-pill__num" style={{ background: bg }}>{n}</span>
                  <span className="stat-pill__label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <QuestionOfTheDay />
        </div>

        <div style={{ marginTop: 'clamp(-90px,-5vw,-20px)' }}>
          <HeroTown />
        </div>
      </section>

      {/* DIAGNOSTIC PROMO on kraft paper, continuing the embankment */}
      <section className="kraft-bg torn-top" style={{ position: 'relative', marginTop: -10 }}>
        <div className="wrap" style={{ padding: '40px 24px 76px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="stamp" style={{ color: 'var(--tomato-ink)' }}>Free &middot; 100 items &middot; untimed</span>
            <h2 className="h-section" style={{ margin: '20px 0 0' }}>
              Start by finding out where you <span className="scribble">actually</span> stand.
            </h2>
            <p className="lede" style={{ margin: '16px 0 0', color: '#3D3326', maxWidth: '54ch' }}>
              The diagnostic is not a mock exam. It is built to produce one thing: a reliable read on each of the nine domains, so your study time goes where it is losing you points. You get a ranked study plan, not a pass-fail guess.
            </p>
            <div style={{ margin: '28px 0 0' }}>
              <button className="btn btn--lg btn--ink" onClick={() => navigate('/diagnostic')}>Take the diagnostic</button>
            </div>
          </div>
          <div style={{ maxWidth: 560, justifySelf: 'center', width: '100%', transform: 'rotate(1.5deg)' }}>
            <Art name="spot-diagnostic" w={560} h={460} alt="A hand-drawn town map with a dotted route from a pin marked 'you are here' to a red X labelled 'study here!'" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 26, marginTop: 8, gridColumn: '1 / -1' }}>
            {NOTES.map(([title, body, fix, r]) => (
              <div key={title} className="card card--lift" style={{ padding: '22px 18px 18px', '--r': `${r}deg` }}>
                <span className={fix.startsWith('pin') ? 'pin' : fix} aria-hidden="true" />
                <div className="hand" style={{ fontSize: 25, color: 'var(--tomato-deep)' }}>{title}</div>
                <div style={{ fontSize: 14.5, lineHeight: 1.55, color: 'var(--ink-soft)', marginTop: 8 }}>{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WEIGHTING: nine domains, each with its own badge and paper color */}
      <section className="paper-bg torn-top" style={{ position: 'relative' }}>
        <div className="wrap" style={{ padding: '72px 24px 64px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <h2 className="h-section">How every exam is weighted</h2>
              <p className="lede" style={{ margin: '12px 0 0', maxWidth: '60ch' }}>
                Quizzes and exams alike draw from the bank in these proportions, matching the APA content outline. Your score report breaks out the same way.
              </p>
            </div>
            <span className="hand" style={{ fontSize: 26, transform: 'rotate(-4deg)', color: 'var(--civic-ink)' }}>nine lines, one exam</span>
          </div>
          <div className="card" style={{ marginTop: 34, padding: '10px 26px' }}>
            {DOMAINS.map((d, i) => (
              <div key={d.name} style={{ display: 'grid', gridTemplateColumns: '52px minmax(150px,1.3fr) minmax(100px,3fr) 46px', gap: 18, alignItems: 'center', padding: '12px 0', borderBottom: i < DOMAINS.length - 1 ? '2px dashed var(--line)' : 'none' }} className="weight-row">
                <img src={badgeFor(d.name)} alt="" aria-hidden="true" width="52" height="52" loading="lazy" style={{ display: 'block' }} />
                <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.3 }}>{d.name}</div>
                <div className="meter" role="img" aria-label={`${d.pct}% of the exam`}>
                  <span style={{ width: `${(d.pct / maxPct) * 100}%`, background: DOMAIN_COLOR[d.name], animationDelay: `${i * 60}ms` }} />
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="wrap" style={{ padding: '24px 24px 72px' }}>
        <h2 className="h-section" style={{ textAlign: 'center' }}>How a practice run works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,270px),1fr))', gap: 30, marginTop: 40 }}>
          {STEPS.map(([n, img, w, h, title, body, bg], i) => (
            <div key={n} className="card card--lift" style={{ padding: '18px 22px 26px', '--r': `${[-1, 0.8, -0.5][i]}deg` }}>
              <div style={{ background: bg, borderRadius: 'var(--wobble-sm)', border: '2px solid var(--ink)', padding: 10 }}>
                <Art name={img} w={w} h={h} style={{ maxWidth: 260, margin: '0 auto' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 18 }}>
                <span className="hand" style={{ fontSize: 30 }}>{n}</span>
                <h3 className="h-card" style={{ fontSize: 23 }}>{title}</h3>
              </div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '8px 0 0' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA with the conductor */}
      <section className="wrap" style={{ padding: '0 24px 40px' }}>
        <div className="card" style={{ background: 'var(--butter) var(--grain-tex)', padding: 'clamp(26px,4vw,44px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 28, alignItems: 'center' }}>
          <span className="tape tape--mint tape--left" aria-hidden="true" />
          <span className="tape tape--blush tape--right" aria-hidden="true" />
          <div>
            <h2 className="h-section">Your train is on the platform.</h2>
            <p className="lede" style={{ margin: '14px 0 0', color: '#3A3320' }}>
              Twenty-five questions, about thirty minutes, and a clear picture of which domains need you most. The first two rides are on us.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
              <button className="btn btn--lg btn--ink" onClick={() => navigate('/exams')}>Board a free quiz</button>
              <button className="btn btn--lg btn--paper" onClick={() => navigate('/pricing')}>See Full Access</button>
            </div>
          </div>
          <div style={{ maxWidth: 250, justifySelf: 'center', width: '100%' }}>
            <Art name="page-conductor" w={300} h={340} alt="A cheerful streetcar conductor waving you aboard, lantern in hand" />
          </div>
        </div>
      </section>
    </>
  );
}
