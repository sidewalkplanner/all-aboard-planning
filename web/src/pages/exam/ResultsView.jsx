import { Link } from 'react-router-dom';
import { P } from '../../lib/paths';
import Art from '../../components/Art';
import { cardStyle } from '../../lib/style';
import { GREEN, RUST, themeTokens } from '../../lib/theme';

export default function ResultsView(s) {
  const T = themeTokens(s.dark);
  const passing = s.pct >= 70;
  const statCard = (i) => ({ ...cardStyle(T, { radius: 14, padding: 20 }), transform: `rotate(${[-0.6, 0.5, -0.4][i]}deg)` });
  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '36px 24px 80px' }}>
        <div className="pop-in" style={{ maxWidth: 340, margin: '0 auto -18px', position: 'relative', zIndex: 1 }}>
          <Art name="spot-arrived" w={400} h={270} eager alt="A station sign reading ARRIVED under colourful bunting" />
        </div>
        <div style={{ ...cardStyle(T, { radius: 18, padding: 36 }), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 36, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: T.mute }}>
              {s.activeTitle}{s.practice ? ' · Practice mode' : ' · Timed'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
              <div className="display" style={{ fontSize: 76, lineHeight: 1, color: T.ink }}>{s.pct}%</div>
              <span className="stamp" style={{ color: passing ? GREEN : RUST, fontSize: 14 }}>{passing ? '70% or better' : 'Below 70%'}</span>
            </div>
            <p style={{ fontSize: 15.5, color: T.mute, lineHeight: 1.6, margin: '14px 0 0', maxWidth: '44ch' }}>
              {passing
                ? 'A strong practice score. APA doesn’t publish a passing percentage and the real exam is scaled, so treat 70% as a benchmark, not a prediction. Keep your weaker domains warm and try another exam in about a week.'
                : 'Not there yet, and that is normal on a first attempt. Reread the lessons for your two weakest domains, answer their checkpoints, then retake this exam.'}
            </p>
            <div className="row-wrap" style={{ marginTop: 26 }}>
              <button type="button" className="btn btn-primary" onClick={s.goAnswerReview}>Review answers</button>
              <button type="button" className="btn btn-secondary" onClick={() => s.navigate(s.backTo.to)}>{s.backTo.label}</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {s.domainRows.filter((d) => d.n > 0).map((d) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                  <span style={{ fontWeight: 700 }}>{d.short}</span>
                  <span style={{ color: T.mute, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{d.got} / {d.n}</span>
                </div>
                <div className="meter meter--thin" style={{ borderColor: T.lineStrong, background: T.bg }}>
                  <span style={{ width: `${d.sessionPct}%`, background: d.sessionPct < 65 ? RUST : GREEN, borderRightColor: T.lineStrong, borderRightWidth: d.sessionPct ? 2 : 0 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {!s.signedIn && (
          <div style={{ ...cardStyle(T, { radius: 14, padding: 22 }), marginTop: 22, background: 'var(--butter)', borderColor: 'var(--ink)', color: 'var(--ink)' }}>
            <div className="hand" style={{ fontSize: 28, color: 'var(--ink)' }}>Save this score and keep going</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: '6px 0 16px', color: '#3A3320' }}>
              Create an account to keep this result, then open every lesson, all three full-length exams, and the diagnostic.
            </p>
            <Link className="btn btn-dark" to={P.createAccount(P.progress)}>Create an account</Link>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 20, marginTop: 24 }}>
          <div style={statCard(0)}>
            <div className="display" style={{ fontSize: 30, color: T.ink }}>{s.timeUsed}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: T.mute, marginTop: 5 }}>{s.timeUsedNote}</div>
          </div>
          <div style={statCard(1)}>
            <div className="display" style={{ fontSize: 30, color: T.ink }}>{s.flagCount}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: T.mute, marginTop: 5 }}>Flagged questions</div>
          </div>
          <div style={statCard(2)}>
            <div className="display" style={{ fontSize: 30, color: T.ink }}>{s.weakestDomain}</div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: T.mute, marginTop: 5 }}>Weakest domain</div>
            {s.weakestLink && (
              <Link to={s.weakestLink} className="link-underline" style={{ display: 'inline-block', marginTop: 8, fontSize: 14, color: T.accFg }}>Review this domain&rsquo;s lessons</Link>
            )}
          </div>
        </div>
        {s.reviewLessons.length > 0 && (
          <div style={{ ...cardStyle(T, { radius: 14, padding: 24 }), marginTop: 24 }}>
            <div className="hand" style={{ fontSize: 28, color: T.errFg }}>Lessons to review</div>
            <p style={{ fontSize: 15, color: T.mute, lineHeight: 1.6, margin: '6px 0 14px' }}>
              The lessons that teach the questions you missed, most-missed first. Reread them before your next attempt.
            </p>
            <ol style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {s.reviewLessons.map(({ lesson, misses }) => (
                <li key={lesson.slug} style={{ fontSize: 15.5 }}>
                  <Link to={P.lesson(lesson.slug)} className="link-underline" style={{ color: T.accFg }}>{lesson.title}</Link>
                  <span style={{ color: T.mute, fontSize: 14 }}> &middot; {misses} missed {misses === 1 ? 'question' : 'questions'}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </section>
    </div>
  );
}
