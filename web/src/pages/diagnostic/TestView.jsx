import Hoverable from '../../components/Hoverable';
import RichText from '../../components/RichText';
import { LETTERS } from '../../data/domains';
import { FORMAT_LABEL } from '../../data/diagDomains';
import { GREEN, RUST, themeTokens } from '../../lib/theme';
import { parseExhibit } from '../../lib/format';

export default function TestView(s) {
  const it = s.dItem;
  if (!it) return null;
  const T = themeTokens(s.dark);
  const exhibit = parseExhibit(it.exhibit);
  const flagged = !!s.dFlags[s.dIdx];

  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <div style={{ borderBottom: `1px solid ${T.line}`, background: T.surf }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 14.5, fontWeight: 600 }}>Item {s.dIdx + 1} of {s.dTotal}</div>
          <div style={{ flex: 1, minWidth: 120, height: 6, background: T.neutralBg, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: `${((s.dIdx + 1) / s.dTotal) * 100}%`, height: '100%', background: GREEN, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: T.accFg, background: T.accBg, padding: '5px 10px', borderRadius: 6 }}>Diagnostic &middot; untimed</div>
          <Hoverable
            style={{ background: s.dReveal ? T.warnBg : 'transparent', border: `1px solid ${s.dReveal ? '#D79A2B' : T.line}`, padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', color: s.dReveal ? T.warnFg : T.mute }}
            onClick={s.toggleReveal}
            aria-pressed={s.dReveal}
          >
            {s.dReveal ? 'Answers on' : 'Answers hidden'}
          </Hoverable>
          <Hoverable
            style={{ background: 'none', border: `1px solid ${T.line}`, padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', color: T.mute }}
            hoverStyle={{ border: `1px solid ${T.ink}` }}
            onClick={s.toggleDark}
            title={s.dark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={s.dark}
          >
            {s.dark ? 'Light' : 'Dark'}
          </Hoverable>
          <Hoverable
            style={{ background: 'none', border: `1px solid ${T.line}`, padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, color: T.mute }}
            hoverStyle={{ border: `1px solid ${T.ink}` }}
            onClick={s.dGoGrid}
          >
            Review all
          </Hoverable>
        </div>
      </div>
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: T.accFg, background: T.accBg, padding: '5px 10px', borderRadius: 6 }}>{it.domain}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: T.mute, background: T.neutralBg, padding: '5px 10px', borderRadius: 6 }}>{FORMAT_LABEL[it.format] || it.format}</span>
          <Hoverable
            style={{ fontSize: 12.5, fontWeight: 600, padding: '5px 12px', borderRadius: 6, fontFamily: 'inherit', border: `1px solid ${flagged ? RUST : T.line}`, background: flagged ? RUST : 'transparent', color: flagged ? '#FFF6F3' : T.mute }}
            onClick={s.toggleFlag}
            aria-pressed={flagged}
          >
            {flagged ? 'Flagged' : 'Flag for review'}
          </Hoverable>
        </div>

        {it.scenario && (
          <div style={{ background: T.surf, border: `1px solid ${T.line}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0 0' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.accFg, marginBottom: 7 }}>Scenario</div>
            <RichText as="p" text={it.scenario} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: 0 }} />
          </div>
        )}

        {exhibit && (
          <div style={{ background: T.surf, border: `1px solid ${T.line}`, borderRadius: 12, padding: '6px 6px', margin: '20px 0 0', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14.5 }}>
              <thead>
                <tr>
                  {exhibit.headers.map((h) => (
                    <th key={h.key} style={{ textAlign: 'left', padding: '11px 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: T.mute, borderBottom: `1px solid ${T.line}` }}>{h.v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exhibit.rows.map((r) => (
                  <tr key={r.key}>
                    {r.cells.map((c) => (
                      <td key={c.key} style={{ padding: '11px 14px', borderBottom: `1px solid ${T.line}`, color: T.ink, fontVariantNumeric: 'tabular-nums' }}>{c.v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <RichText as="p" text={it.stem} style={{ fontSize: 'clamp(19px,2.1vw,23px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '22px 0 24px', textWrap: 'pretty', whiteSpace: 'pre-line', color: T.ink }} />

        {it.calc && (
          <p style={{ fontSize: 13.5, color: T.mute, margin: '-12px 0 20px' }}>A calculator is expected for this item. 1 acre = 43,560 sq ft.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {s.dOrder.map((orig, pos) => {
            const on = s.dPickedOrig === orig;
            let border = on ? `1.5px solid ${GREEN}` : `1px solid ${T.line}`;
            let bg = on ? T.accBg : T.surf;
            let lbg = on ? GREEN : T.neutralBg;
            let lfg = on ? '#FFFFFF' : T.mute;
            let weight = on ? 600 : 400;
            let glyph = null, glyphColor = null;
            if (s.dShown && orig === it.correct) { border = `1.5px solid ${GREEN}`; bg = T.accBg; lbg = GREEN; lfg = '#FFFFFF'; weight = 600; glyph = '✓'; glyphColor = GREEN; }
            else if (s.dShown && on) { border = `1.5px solid ${RUST}`; bg = T.errBg; lbg = RUST; lfg = '#FFFFFF'; weight = 600; glyph = '✕'; glyphColor = RUST; }
            const stateLabel = glyph === '✓' ? ', correct answer' : glyph === '✕' ? ', your answer, incorrect' : on ? ', selected' : '';
            return (
              <button
                key={orig}
                onClick={() => s.pickOption(orig)}
                disabled={s.dShown}
                aria-label={`Option ${LETTERS[pos]}: ${it.options[orig]}${stateLabel}`}
                style={{ display: 'flex', gap: 14, alignItems: 'flex-start', textAlign: 'left', width: '100%', padding: '15px 17px', borderRadius: 12, fontSize: 16, fontFamily: 'inherit', transition: 'border-color .12s', border, background: bg, fontWeight: weight, color: T.ink }}
              >
                <span style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: 7, background: lbg, color: lfg, fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{LETTERS[pos]}</span>
                <RichText as="span" text={it.options[orig]} style={{ flex: 1, lineHeight: 1.5 }} />
                {glyph && (
                  <span aria-hidden="true" style={{ flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%', color: glyphColor, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {glyph}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {s.dCanCheck && (
          <div style={{ marginTop: 16 }}>
            <Hoverable
              style={{ background: GREEN, border: 'none', color: '#FFFFFF', padding: '11px 20px', borderRadius: 9, fontSize: 14.5, fontWeight: 600 }}
              hoverStyle={{ background: '#164C87' }}
              onClick={s.checkAnswer}
            >
              Check answer
            </Hoverable>
          </div>
        )}

        {s.dShown && (
          <div className="fade-up" style={{ marginTop: 22, background: T.surf, border: `1px solid ${T.line}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '0 12px 12px 0', padding: '20px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.dRight ? T.accFg : T.errFg }}>{s.dRight ? 'Correct' : 'Not quite'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: T.accFg, marginTop: 8 }}>
              Key: {LETTERS[s.dOrder.indexOf(it.correct)]}. {it.options[it.correct]}
            </div>
            <RichText as="p" text={it.why} style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: '10px 0 0' }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, padding: '14px 16px', background: T.surf, border: `1px solid ${T.line}`, borderRadius: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: T.mute }}>How sure are you?</span>
          <Hoverable
            style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, fontFamily: 'inherit', border: `1px solid ${s.dConfTag === 'confident' ? GREEN : T.line}`, background: s.dConfTag === 'confident' ? T.accBg : 'transparent', color: s.dConfTag === 'confident' ? T.accFg : T.mute }}
            onClick={s.setConfident}
            aria-pressed={s.dConfTag === 'confident'}
          >
            Confident
          </Hoverable>
          <Hoverable
            style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 8, fontFamily: 'inherit', border: `1px solid ${s.dConfTag === 'unsure' ? '#D79A2B' : T.line}`, background: s.dConfTag === 'unsure' ? T.warnBg : 'transparent', color: s.dConfTag === 'unsure' ? T.warnFg : T.mute }}
            onClick={s.setUnsure}
            aria-pressed={s.dConfTag === 'unsure'}
          >
            Unsure
          </Hoverable>
          <span style={{ fontSize: 13, color: T.mute, marginLeft: 'auto' }}>Optional &mdash; it sharpens the report</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Hoverable
            style={{ background: 'none', border: `1px solid ${T.line}`, color: T.mute, padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ border: `1px solid ${T.ink}`, color: T.ink }}
            onClick={s.dPrev}
          >
            Previous
          </Hoverable>
          <Hoverable
            style={{ background: s.dark ? GREEN : '#1A1C2B', border: 'none', color: '#F6F7FB', padding: '13px 26px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
            hoverStyle={{ background: '#1D5FA8' }}
            onClick={s.dNext}
          >
            {s.dIdx >= s.dTotal - 1 ? 'Review and submit' : 'Next item'}
          </Hoverable>
        </div>
        <p style={{ fontSize: 13, color: T.mute, margin: '18px 0 0', textAlign: 'center' }}>Saved automatically &mdash; you can close this and come back.</p>
      </section>
    </div>
  );
}
