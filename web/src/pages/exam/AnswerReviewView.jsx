import RichText from '../../components/RichText';
import { chipStyle } from '../../lib/style';
import { TEAL_TXT } from '../../lib/theme';

export default function AnswerReviewView(s) {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Review answers</h1>
      <p style={{ fontSize: 16, color: '#646A85', margin: '10px 0 28px' }}>{s.activeTitle} &middot; showing the questions you missed first.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {s.reviewItems.map((r) => (
          <div key={r.idx} style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={chipStyle(r.right ? '#E6EEF9' : '#FCEAE6', r.right ? TEAL_TXT : '#A32E20')}>{r.mark}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#14508C', background: '#E6EEF9', padding: '5px 10px', borderRadius: 6 }}>{r.domain}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#8A6420', background: '#FCF0DB', padding: '5px 10px', borderRadius: 6 }}>{r.difficulty}</span>
              <span style={{ fontSize: 13, color: '#636987', marginLeft: 'auto' }}>{r.numLabel}</span>
            </div>
            {r.scenario && (
              <div style={{ border: '1px solid #E4E6F0', borderLeft: '3px solid #1D5FA8', borderRadius: '0 10px 10px 0', padding: '13px 16px', margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.6, color: '#3A3F57' }}>
                {r.scenario}
              </div>
            )}
            <RichText as="p" text={r.text} style={{ fontSize: 17.5, fontWeight: 500, lineHeight: 1.55, margin: '16px 0 16px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 14.5, padding: '11px 14px', borderRadius: 9, background: '#E6EEF9', border: '1px solid #C2D6EE', color: '#1A1C2B' }}>
                <strong style={{ fontWeight: 600 }}>Correct:</strong> {r.correctText}
              </div>
              {r.showYours && (
                <div style={{ fontSize: 14.5, padding: '11px 14px', borderRadius: 9, background: '#FCEAE6', border: '1px solid #F2C8BE', color: '#1A1C2B' }}>
                  <strong style={{ fontWeight: 600 }}>You chose:</strong> {r.yourText}
                </div>
              )}
            </div>
            <RichText as="p" text={r.explanation} style={{ fontSize: 15, lineHeight: 1.65, color: '#454A63', margin: '16px 0 0', paddingTop: 16, borderTop: '1px solid #EEF0F7' }} />
          </div>
        ))}
      </div>
    </section>
  );
}
