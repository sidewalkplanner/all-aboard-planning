import FlagIcon from '../../components/FlagIcon';
import { GREEN, RUST, themeTokens } from '../../lib/theme';

export default function GridView(s) {
  const T = themeTokens(s.dark);
  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 className="display" style={{ fontSize: 42, color: T.ink }}>Before you submit</h1>
        <p style={{ fontSize: 16, color: T.mute, margin: '12px 0 26px' }}>
          {s.answeredCount} of {s.total} answered &middot; {s.flagCount} flagged. Unanswered questions are scored as incorrect.
        </p>
        <div style={{ display: 'flex', gap: 18, fontSize: 13.5, fontWeight: 600, color: T.mute, marginBottom: 18, flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: GREEN, border: `2px solid ${T.lineStrong}`, display: 'block' }} />Answered ({'✓'})</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: T.surf, border: `2px solid ${T.optLine}`, display: 'block' }} />Unanswered</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: RUST, border: `2px solid ${T.lineStrong}`, display: 'block' }} />Flagged (<FlagIcon size={9} color={RUST} />)</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(52px,1fr))', gap: 10 }}>
          {s.QS.map((_, idx) => {
            const a = s.answers[idx] !== undefined, f = !!s.flags[idx];
            const bg = f ? RUST : a ? GREEN : T.surf;
            const fg = f || a ? '#FFFFFF' : T.mute;
            return (
              <button
                key={idx}
                className="opt opt--live"
                onClick={() => s.goTo(idx)}
                aria-label={`Question ${idx + 1}${f ? ', flagged' : ''}${a ? ', answered' : ', not answered'}${idx === s.i ? ', current' : ''}`}
                style={{
                  '--opt-hover': T.lineStrong, aspectRatio: '1', borderRadius: '10px 12px 9px 13px / 12px 9px 13px 10px',
                  border: `2px solid ${f || a ? T.lineStrong : T.optLine}`, background: bg, color: fg, fontSize: 14.5, fontWeight: 700,
                  fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
                  outline: idx === s.i ? `3px solid ${T.accFg}` : 'none', outlineOffset: 2
                }}
              >
                <span>{idx + 1}</span>
                {f && <FlagIcon size={9} />}
                {!f && a && <span aria-hidden="true" style={{ fontSize: 10, lineHeight: 1 }}>{'✓'}</span>}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
          <button className="btn btn--paper" onClick={s.backToExam}>Keep working</button>
          <button className="btn btn--tomato" onClick={s.submit}>Submit exam</button>
        </div>
      </section>
    </div>
  );
}
