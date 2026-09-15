import Hoverable from '../../components/Hoverable';
import { barStyle, chipStyle, cardStyle } from '../../lib/style';
import { GREEN, RUST, themeTokens } from '../../lib/theme';

export default function ResultsView(s) {
  const T = themeTokens(s.dark);
  const passing = s.pct >= 70;
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 80px' }}>
        <div style={{ ...cardStyle(T, { radius: 18, padding: 36 }), display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 36, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.mute }}>
              {s.activeTitle}{s.practice ? ' · Practice mode' : ' · Timed'}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 10 }}>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 66, lineHeight: 1, fontWeight: 700 }}>{s.pct}%</div>
              <div style={chipStyle(passing ? T.accBg : T.errBg, passing ? T.accFg : T.errFg)}>{passing ? 'Passing range' : 'Below passing'}</div>
            </div>
            <p style={{ fontSize: 15.5, color: T.mute, lineHeight: 1.6, margin: '14px 0 0', maxWidth: '44ch' }}>
              {passing
                ? 'You cleared the range where candidates typically pass. Keep the weaker domains warm and take Exam 2 in about a week.'
                : 'Not there yet, and that is normal on a first attempt. Work the two weakest domains before you retake this exam.'}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
              <Hoverable
                style={{ background: GREEN, border: 'none', color: '#FFFFFF', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
                hoverStyle={{ background: '#164C87' }}
                onClick={s.goAnswerReview}
              >
                Review answers
              </Hoverable>
              <Hoverable
                style={{ background: 'none', border: `1px solid ${T.line}`, color: T.ink, padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
                hoverStyle={{ border: `1px solid ${T.ink}` }}
                onClick={() => s.navigate('/exams')}
              >
                Back to exams
              </Hoverable>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {s.domainRows.filter((d) => d.n > 0).map((d) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{d.short}</span>
                  <span style={{ color: T.mute, fontVariantNumeric: 'tabular-nums' }}>{d.got} / {d.n}</span>
                </div>
                <div style={{ height: 8, background: T.neutralBg, borderRadius: 99, overflow: 'hidden' }}>
                  <div style={barStyle(d.sessionPct, d.sessionPct < 65 ? RUST : GREEN)} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 20 }}>
          <div style={cardStyle(T, { radius: 14, padding: 20 })}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.timeUsed}</div>
            <div style={{ fontSize: 13.5, color: T.mute, marginTop: 3 }}>{s.timeUsedNote}</div>
          </div>
          <div style={cardStyle(T, { radius: 14, padding: 20 })}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.flagCount}</div>
            <div style={{ fontSize: 13.5, color: T.mute, marginTop: 3 }}>Flagged questions</div>
          </div>
          <div style={cardStyle(T, { radius: 14, padding: 20 })}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.weakestDomain}</div>
            <div style={{ fontSize: 13.5, color: T.mute, marginTop: 3 }}>Weakest domain</div>
          </div>
        </div>
      </section>
    </div>
  );
}
