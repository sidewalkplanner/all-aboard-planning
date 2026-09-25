import Art from '../../components/Art';
import { cardStyle } from '../../lib/style';
import { GREEN, RUST, themeTokens } from '../../lib/theme';

export default function ResultsView(s) {
  const T = themeTokens(s.dark);
  const passing = s.pct >= 70;
  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div className="pop-in" style={{ maxWidth: 360, margin: '0 auto -18px', position: 'relative', zIndex: 1 }}>
          <Art name="spot-arrived" w={400} h={270} eager alt="A station sign reading ARRIVED under colorful bunting" />
        </div>
        <div style={{ ...cardStyle(T, { radius: 18, padding: 36 }), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 36, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: T.mute }}>
              {s.activeTitle}{s.practice ? ' · Practice mode' : ' · Timed'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
              <div className="display" style={{ fontSize: 76, lineHeight: 1 }}>{s.pct}%</div>
              <span className="stamp" style={{ color: passing ? GREEN : RUST, fontSize: 14 }}>{passing ? 'Passing range' : 'Below passing'}</span>
            </div>
            <p style={{ fontSize: 15.5, color: T.mute, lineHeight: 1.6, margin: '14px 0 0', maxWidth: '44ch' }}>
              {passing
                ? 'You cleared the range where candidates typically pass. Keep the weaker domains warm and take the next exam in about a week.'
                : 'Not there yet, and that is normal on a first attempt. Work the two weakest domains before you retake this exam.'}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 26, flexWrap: 'wrap' }}>
              <button className="btn btn--civic" onClick={s.goAnswerReview}>Review answers</button>
              <button className="btn btn--paper" onClick={() => s.navigate('/exams')}>Back to exams</button>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 20, marginTop: 24 }}>
          {[[s.timeUsed, s.timeUsedNote], [s.flagCount, 'Flagged questions'], [s.weakestDomain, 'Weakest domain']].map(([n, label], i) => (
            <div key={label} style={{ ...cardStyle(T, { radius: 14, padding: 20 }), transform: `rotate(${[-0.6, 0.5, -0.4][i]}deg)` }}>
              <div className="display" style={{ fontSize: 30 }}>{n}</div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: T.mute, marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
