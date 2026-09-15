import Hoverable from '../../components/Hoverable';
import FlagIcon from '../../components/FlagIcon';
import { GREEN, RUST } from '../../lib/theme';
import { ITEMS } from '../../data/diagnostic-items';

export default function DiagGridView(s) {
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Before you submit</h1>
      <p style={{ fontSize: 16, color: '#646A85', margin: '10px 0 26px' }}>
        {s.dAnsweredCount} of {s.dTotal} answered &middot; {s.dFlagCount} flagged. Anything left blank is scored as incorrect, and tracked separately in your report.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(44px,1fr))', gap: 8 }}>
        {ITEMS.map((_, idx) => {
          const a = s.dAns[idx] !== undefined, f = !!s.dFlags[idx];
          return (
            <button
              key={idx}
              onClick={() => s.dGoTo(idx)}
              aria-label={`Item ${idx + 1}${f ? ', flagged' : ''}${a ? ', answered' : ', not answered'}`}
              style={{ aspectRatio: '1', borderRadius: 9, border: `1px solid ${f ? RUST : a ? GREEN : '#D2D6E6'}`, background: f ? RUST : a ? GREEN : '#FFFFFF', color: f || a ? '#FFFFFF' : '#646A85', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}
            >
              <span>{idx + 1}</span>
              {f && <FlagIcon size={8} />}
              {!f && a && <span aria-hidden="true" style={{ fontSize: 9, lineHeight: 1 }}>{'✓'}</span>}
            </button>
          );
        })}
      </div>
      <p style={{ fontSize: 13.5, color: '#646A85', margin: '20px 0 0' }}>Once you submit, your answers are locked against form DIAG-1.0 and the report is generated. You can replay the items in review mode afterwards.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Hoverable
          style={{ background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
          hoverStyle={{ border: '1px solid #1A1C2B' }}
          onClick={s.dBackToTest}
        >
          Keep working
        </Hoverable>
        <Hoverable
          style={{ background: '#C93B2C', border: 'none', color: '#FFF6F3', padding: '13px 26px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
          hoverStyle={{ background: '#A32E20' }}
          onClick={s.submitDiag}
        >
          Submit and see my report
        </Hoverable>
      </div>
    </section>
  );
}
