import Hoverable from '../../components/Hoverable';
import { GREEN, RUST, themeTokens } from '../../lib/theme';

export default function GridView(s) {
  const T = themeTokens(s.dark);
  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', margin: 0, color: T.ink }}>Before you submit</h1>
        <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 26px' }}>
          {s.answeredCount} of {s.total} answered &middot; {s.flagCount} flagged. Unanswered questions are scored as incorrect.
        </p>
        <div style={{ display: 'flex', gap: 18, fontSize: 13.5, color: '#646A85', marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 13, height: 13, borderRadius: 4, background: GREEN, display: 'block' }} />Answered</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 13, height: 13, borderRadius: 4, background: '#FFFFFF', border: '1px solid #D2D6E6', display: 'block' }} />Unanswered</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 13, height: 13, borderRadius: 4, background: RUST, display: 'block' }} />Flagged</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(52px,1fr))', gap: 9 }}>
          {s.QS.map((_, idx) => {
            const a = s.answers[idx] !== undefined, f = !!s.flags[idx];
            const bg = f ? RUST : a ? GREEN : T.surf;
            const fg = f || a ? '#FFFFFF' : T.mute;
            return (
              <button
                key={idx}
                onClick={() => s.goTo(idx)}
                style={{ aspectRatio: '1', borderRadius: 9, border: `1px solid ${f ? RUST : a ? GREEN : T.line}`, background: bg, color: fg, fontSize: 14.5, fontWeight: 600, fontFamily: 'inherit' }}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
          <Hoverable
            style={{ background: 'none', border: `1px solid ${T.line}`, color: T.mute, padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600, fontFamily: 'inherit' }}
            onClick={s.backToExam}
          >
            Keep working
          </Hoverable>
          <Hoverable
            style={{ background: RUST, border: 'none', color: '#FFF6F3', padding: '13px 26px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ background: '#A32E20' }}
            onClick={s.submit}
          >
            Submit exam
          </Hoverable>
        </div>
      </section>
    </div>
  );
}
