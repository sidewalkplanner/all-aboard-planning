import Hoverable from '../../components/Hoverable';
import RichText from '../../components/RichText';
import { LETTERS } from '../../data/domains';
import { FORMAT_LABEL } from '../../data/diagDomains';
import { GREEN, RUST } from '../../lib/theme';
import { parseExhibit } from '../../lib/format';

export default function TestView(s) {
  const it = s.dItem;
  if (!it) return null;
  const exhibit = parseExhibit(it.exhibit);
  const flagged = !!s.dFlags[s.dIdx];

  return (
    <>
      <div style={{ borderBottom: '1px solid #E4E6F0', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Item {s.dIdx + 1} of {s.dTotal}</div>
          <div style={{ flex: 1, minWidth: 120, height: 6, background: '#ECEDF6', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: `${((s.dIdx + 1) / s.dTotal) * 100}%`, height: '100%', background: GREEN, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: '#14508C', background: '#E6EEF9', padding: '5px 10px', borderRadius: 6 }}>Diagnostic &middot; untimed</div>
          <Hoverable
            style={{ background: s.dReveal ? '#FCF0DB' : 'transparent', border: `1px solid ${s.dReveal ? '#D79A2B' : '#D2D6E6'}`, padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', color: s.dReveal ? '#8A6420' : '#3A3F57' }}
            onClick={s.toggleReveal}
          >
            {s.dReveal ? 'Answers on' : 'Answers hidden'}
          </Hoverable>
          <Hoverable
            style={{ background: 'none', border: '1px solid #D2D6E6', padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: '#3A3F57' }}
            hoverStyle={{ border: '1px solid #1A1C2B' }}
            onClick={s.dGoGrid}
          >
            Review all
          </Hoverable>
        </div>
      </div>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#14508C', background: '#E6EEF9', padding: '5px 10px', borderRadius: 6 }}>{it.domain}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#3A3F57', background: '#ECEDF6', padding: '5px 10px', borderRadius: 6 }}>{FORMAT_LABEL[it.format] || it.format}</span>
          <Hoverable
            style={{ fontSize: 12.5, fontWeight: 600, padding: '5px 12px', borderRadius: 6, fontFamily: 'inherit', border: `1px solid ${flagged ? RUST : '#D2D6E6'}`, background: flagged ? RUST : 'transparent', color: flagged ? '#FFF6F3' : '#646A85' }}
            onClick={s.toggleFlag}
          >
            {flagged ? 'Flagged' : 'Flag for review'}
          </Hoverable>
        </div>

        {it.scenario && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderLeft: `3px solid ${GREEN}`, borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0 0' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#14508C', marginBottom: 7 }}>Scenario</div>
            <RichText as="p" text={it.scenario} style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3A3F57', margin: 0 }} />
          </div>
        )}

        {exhibit && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 12, padding: '6px 6px', margin: '20px 0 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>
              <thead>
                <tr>
                  {exhibit.headers.map((h) => (
                    <th key={h.key} style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#646A85', borderBottom: '1px solid #E4E6F0' }}>{h.v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exhibit.rows.map((r) => (
                  <tr key={r.key}>
                    {r.cells.map((c) => (
                      <td key={c.key} style={{ padding: '11px 14px', borderBottom: '1px solid #F2F3F8', color: '#1A1C2B', fontVariantNumeric: 'tabular-nums' }}>{c.v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <RichText as="p" text={it.stem} style={{ fontSize: 'clamp(19px,2.1vw,23px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '22px 0 24px', textWrap: 'pretty', whiteSpace: 'pre-line' }} />

        {it.calc && (
          <p style={{ fontSize: 13.5, color: '#646A85', margin: '-12px 0 20px' }}>A calculator is expected for this item. 1 acre = 43,560 sq ft.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {s.dOrder.map((orig, pos) => {
            const on = s.dPickedOrig === orig;
            let border = on ? `1.5px solid ${GREEN}` : '1px solid #E4E6F0';
            let bg = on ? '#E6EEF9' : '#FFFFFF';
            let lbg = on ? GREEN : '#ECEDF6';
            let lfg = on ? '#FFFFFF' : '#646A85';
            let weight = on ? 600 : 400;
            if (s.dShown && orig === it.correct) { border = `1.5px solid ${GREEN}`; bg = '#E6EEF9'; lbg = GREEN; lfg = '#FFFFFF'; weight = 600; }
            else if (s.dShown && on) { border = `1.5px solid ${RUST}`; bg = '#FCEAE6'; lbg = RUST; lfg = '#FFFFFF'; weight = 600; }
            return (
              <button
                key={orig}
                onClick={() => s.pickOption(orig)}
                disabled={s.dShown}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', width: '100%', padding: '15px 17px', borderRadius: 12, fontSize: 16, fontFamily: 'inherit', transition: 'border-color .12s', border, background: bg, fontWeight: weight, color: '#1A1C2B' }}
              >
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: 7, background: lbg, color: lfg, fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{LETTERS[pos]}</span>
                <RichText as="span" text={it.options[orig]} style={{ flex: 1, lineHeight: 1.5 }} />
              </button>
            );
          })}
        </div>

        {s.dShown && (
          <div className="fade-up" style={{ marginTop: 22, background: '#FFFFFF', border: '1px solid #E4E6F0', borderLeft: `3px solid ${GREEN}`, borderRadius: '0 12px 12px 0', padding: '20px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.dRight ? '#14508C' : '#A32E20' }}>{s.dRight ? 'Correct' : 'Not quite'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: '#14508C', marginTop: 8 }}>
              Key: {LETTERS[s.dOrder.indexOf(it.correct)]}. {it.options[it.correct]}
            </div>
            <RichText as="p" text={it.why} style={{ fontSize: 15, lineHeight: 1.65, color: '#454A63', margin: '10px 0 0' }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, padding: '14px 16px', background: '#FFFFFF', border: '1px solid #E4E6F0', borderRadius: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#3A3F57' }}>How sure are you?</span>
          <Hoverable
            style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, fontFamily: 'inherit', border: `1px solid ${s.dConfTag === 'confident' ? GREEN : '#D2D6E6'}`, background: s.dConfTag === 'confident' ? '#E6EEF9' : 'transparent', color: s.dConfTag === 'confident' ? '#14508C' : '#646A85' }}
            onClick={s.setConfident}
          >
            Confident
          </Hoverable>
          <Hoverable
            style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, fontFamily: 'inherit', border: `1px solid ${s.dConfTag === 'unsure' ? '#D79A2B' : '#D2D6E6'}`, background: s.dConfTag === 'unsure' ? '#FCF0DB' : 'transparent', color: s.dConfTag === 'unsure' ? '#8A6420' : '#646A85' }}
            onClick={s.setUnsure}
          >
            Unsure
          </Hoverable>
          <span style={{ fontSize: 13, color: '#8A8FA6', marginLeft: 'auto' }}>Optional &mdash; it sharpens the report</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Hoverable
            style={{ background: 'none', border: '1px solid #D2D6E6', color: '#3A3F57', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ border: '1px solid #1A1C2B', color: '#1A1C2B' }}
            onClick={s.dPrev}
          >
            Previous
          </Hoverable>
          <Hoverable
            style={{ background: '#1A1C2B', border: 'none', color: '#F6F7FB', padding: '13px 26px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ background: '#1D5FA8' }}
            onClick={s.dNext}
          >
            {s.dIdx >= s.dTotal - 1 ? 'Review and submit' : 'Next item'}
          </Hoverable>
        </div>
        <p style={{ fontSize: 13, color: '#8A8FA6', margin: '18px 0 0', textAlign: 'center' }}>Saved automatically &mdash; you can close this and come back.</p>
      </section>
    </>
  );
}
