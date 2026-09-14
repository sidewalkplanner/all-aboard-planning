import Hoverable from '../../components/Hoverable';
import { barStyle, chipStyle } from '../../lib/style';
import { GREEN, RUST, TEAL_TXT } from '../../lib/theme';

export default function ResultsView(s) {
  const passing = s.pct >= 70;
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 80px' }}>
      <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 18, padding: 36, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 36, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#636987' }}>
            {s.activeTitle}{s.practice ? ' · Practice mode' : ' · Timed'}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 10 }}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 66, lineHeight: 1, fontWeight: 700 }}>{s.pct}%</div>
            <div style={chipStyle(passing ? '#E6EEF9' : '#FCEAE6', passing ? TEAL_TXT : '#A32E20')}>{passing ? 'Passing range' : 'Below passing'}</div>
          </div>
          <p style={{ fontSize: 15.5, color: '#454A63', lineHeight: 1.6, margin: '14px 0 0', maxWidth: '44ch' }}>
            {passing
              ? 'You cleared the range where candidates typically pass. Keep the weaker domains warm and take Exam 2 in about a week.'
              : 'Not there yet, and that is normal on a first attempt. Work the two weakest domains before you retake this exam.'}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <Hoverable
              style={{ background: '#1D5FA8', border: 'none', color: '#F6F7FB', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
              hoverStyle={{ background: '#164C87' }}
              onClick={s.goAnswerReview}
            >
              Review answers
            </Hoverable>
            <Hoverable
              style={{ background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
              hoverStyle={{ border: '1px solid #1A1C2B' }}
              onClick={() => s.navigate('/exams')}
            >
              Back to exams
            </Hoverable>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {s.domainRows.map((d) => (
            <div key={d.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 14, marginBottom: 6 }}>
                <span style={{ fontWeight: 600 }}>{d.short}</span>
                <span style={{ color: '#646A85', fontVariantNumeric: 'tabular-nums' }}>{d.got} / {d.n}</span>
              </div>
              <div style={{ height: 8, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
                <div style={barStyle(d.sessionPct, d.sessionPct < 65 ? RUST : GREEN)} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginTop: 20 }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 14, padding: 20 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.timeUsed}</div>
          <div style={{ fontSize: 13.5, color: '#646A85', marginTop: 3 }}>{s.timeUsedNote}</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 14, padding: 20 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.flagCount}</div>
          <div style={{ fontSize: 13.5, color: '#646A85', marginTop: 3 }}>Flagged questions</div>
        </div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 14, padding: 20 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 700 }}>{s.weakestDomain}</div>
          <div style={{ fontSize: 13.5, color: '#646A85', marginTop: 3 }}>Weakest domain</div>
        </div>
      </div>
    </section>
  );
}
