import FlagIcon from '../../components/FlagIcon';
import { GREEN, RUST, themeTokens } from '../../lib/theme';
import { ITEMS } from '../../data/diagnostic-items';

export default function DiagGridView(s) {
  const T = themeTokens(s.dark);
  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh' }}>
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
        <h1 className="display" style={{ fontSize: 42, color: T.ink }}>Before you submit</h1>
        <p style={{ fontSize: 16, color: T.mute, margin: '10px 0 26px' }}>
          {s.dAnsweredCount} of {s.dTotal} answered &middot; {s.dFlagCount} flagged. Anything left blank is scored as incorrect, and tracked separately in your report.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(44px,1fr))', gap: 8 }}>
          {ITEMS.map((_, idx) => {
            const a = s.dAns[idx] !== undefined, f = !!s.dFlags[idx];
            return (
              <button
                key={idx}
                className="opt opt--live"
                onClick={() => s.dGoTo(idx)}
                aria-label={`Item ${idx + 1}${f ? ', flagged' : ''}${a ? ', answered' : ', not answered'}`}
                style={{ '--opt-hover': T.lineStrong, aspectRatio: '1', borderRadius: '9px 11px 8px 12px / 11px 8px 12px 9px', border: `2px solid ${f || a ? T.lineStrong : T.optLine}`, background: f ? RUST : a ? GREEN : T.surf, color: f || a ? '#FFFFFF' : T.mute, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
              >
                <span>{idx + 1}</span>
                {f && <FlagIcon size={8} />}
                {!f && a && <span aria-hidden="true" style={{ fontSize: 9, lineHeight: 1 }}>{'✓'}</span>}
              </button>
            );
          })}
        </div>
        <p style={{ fontSize: 13.5, color: T.mute, margin: '20px 0 0' }}>Once you submit, your answers are locked against form DIAG-1.0 and the report is generated. You can replay the items in review mode afterwards.</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <button className="btn btn--paper" onClick={s.dBackToTest}>Keep working</button>
          <button className="btn btn--tomato" onClick={s.submitDiag}>Submit and see my report</button>
        </div>
      </section>
    </div>
  );
}
