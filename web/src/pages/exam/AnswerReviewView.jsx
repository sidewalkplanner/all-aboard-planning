import RichText from '../../components/RichText';
import ExhibitTable from '../../components/ExhibitTable';
import { chipStyle, cardStyle } from '../../lib/style';
import { GREEN, themeTokens } from '../../lib/theme';

export default function AnswerReviewView(s) {
  const T = themeTokens(s.dark);
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Review answers</h1>
        <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 28px' }}>{s.activeTitle} &middot; showing the questions you missed first.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {s.reviewItems.map((r) => (
            <div key={r.idx} style={cardStyle(T, { padding: 24 })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span style={chipStyle(r.right ? T.accBg : T.errBg, r.right ? T.accFg : T.errFg)}>{r.mark}</span>
                <span style={chipStyle(T.accBg, T.accFg)}>{r.domain}</span>
                <span style={{ fontSize: 13, color: T.mute, marginLeft: 'auto' }}>{r.numLabel}</span>
              </div>
              {r.scenario && (
                <div style={{ border: `1px solid ${T.line}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '0 10px 10px 0', padding: '13px 16px', margin: '16px 0 0', fontSize: 14.5, lineHeight: 1.6, color: T.mute }}>
                  {r.scenario}
                </div>
              )}
              <ExhibitTable exhibit={r.exhibit} T={T} />
              <RichText as="p" text={r.text} style={{ fontSize: 17.5, fontWeight: 500, lineHeight: 1.55, margin: '16px 0 16px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 14.5, padding: '11px 14px', borderRadius: 9, background: T.accBg, border: `1px solid ${T.line}`, color: T.ink }}>
                  <strong style={{ fontWeight: 600 }}>Correct:</strong> {r.correctText}
                </div>
                {r.showYours && (
                  <div style={{ fontSize: 14.5, padding: '11px 14px', borderRadius: 9, background: T.errBg, border: `1px solid ${T.line}`, color: T.ink }}>
                    <strong style={{ fontWeight: 600 }}>You chose:</strong> {r.yourText}
                  </div>
                )}
              </div>
              <RichText as="p" text={r.explanation} style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: '16px 0 0', paddingTop: 16, borderTop: `1px solid ${T.line}` }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
