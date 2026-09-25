import OptionButton from '../../components/OptionButton';
import RichText from '../../components/RichText';
import ExhibitTable from '../../components/ExhibitTable';
import RunnerBar from '../../components/RunnerBar';
import { LETTERS } from '../../data/domains';
import { chipStyle } from '../../lib/style';
import { GREEN, RUST, themeTokens } from '../../lib/theme';
import { parseExhibit } from '../../lib/format';

export default function TestView(s) {
  const it = s.dItem;
  if (!it) return null;
  const T = themeTokens(s.dark);
  const exhibit = parseExhibit(it.exhibit);
  const flagged = !!s.dFlags[s.dIdx];
  const pressed = (on, bg, fg, line) => (on ? { background: bg, color: fg, borderColor: line } : {});

  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh', '--tb-line': T.optLine, '--tb-fg': T.mute, '--tb-strong': T.ink }}>
      <RunnerBar
        T={T}
        label={`Item ${s.dIdx + 1} of ${s.dTotal}`}
        progress={(s.dIdx + 1) / s.dTotal}
        chip={<span style={chipStyle(T.accBg, T.accFg)}>Diagnostic &middot; untimed</span>}
      >
        <button className="tool-btn" style={pressed(s.dReveal, T.warnBg, T.warnFg, '#D79A2B')} onClick={s.toggleReveal} aria-pressed={s.dReveal}>
          {s.dReveal ? 'Answers on' : 'Answers hidden'}
        </button>
        <button
          className="tool-btn"
          onClick={s.toggleDark}
          title={s.dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={s.dark}
        >
          {s.dark ? 'Paper' : 'Blueprint'}
        </button>
        <button className="tool-btn" onClick={s.dGoGrid}>Review all</button>
      </RunnerBar>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={chipStyle(T.accBg, T.accFg)}>{it.domain}</span>
          <button className="tool-btn" style={{ marginLeft: 'auto', ...pressed(flagged, RUST, '#FFF6F3', RUST) }} onClick={s.toggleFlag} aria-pressed={flagged}>
            {flagged ? 'Flagged' : 'Flag for review'}
          </button>
        </div>

        {it.scenario && (
          <div style={{ background: T.surf, borderStyle: 'solid', borderWidth: '2px 2px 2px 5px', borderColor: `${T.optLine} ${T.optLine} ${T.optLine} ${GREEN}`, borderRadius: '4px 14px 12px 4px', padding: '16px 20px', margin: '20px 0 0' }}>
            <div className="hand" style={{ fontSize: 22, color: T.accFg, marginBottom: 6 }}>Scenario</div>
            <RichText as="p" text={it.scenario} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: 0 }} />
          </div>
        )}

        <ExhibitTable exhibit={exhibit} T={T} />

        <RichText as="p" text={it.stem} style={{ fontSize: 'clamp(19px,2.1vw,23px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '22px 0 24px', textWrap: 'pretty', whiteSpace: 'pre-line', color: T.ink }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {s.dOrder.map((orig, pos) => {
            const on = s.dPickedOrig === orig;
            let variant = on ? 'picked' : 'default';
            if (s.dShown && orig === it.correct) variant = 'correct';
            else if (s.dShown && on) variant = 'wrong';
            return (
              <OptionButton
                key={orig}
                letter={LETTERS[pos]}
                text={it.options[orig]}
                variant={variant}
                tokens={T}
                disabled={s.dShown}
                onClick={() => s.pickOption(orig)}
              />
            );
          })}
        </div>

        {s.dCanCheck && (
          <div style={{ marginTop: 18 }}>
            <button className="btn btn--sm btn--civic" onClick={s.checkAnswer}>Check answer</button>
          </div>
        )}

        {s.dShown && (
          <div className="fade-up" style={{ marginTop: 22, background: T.surf, borderStyle: 'solid', borderWidth: '2px 2px 2px 5px', borderColor: `${T.optLine} ${T.optLine} ${T.optLine} ${s.dRight ? GREEN : RUST}`, borderRadius: '4px 14px 12px 4px', padding: '18px 22px' }}>
            <div className="hand" style={{ fontSize: 28, color: s.dRight ? T.accFg : T.errFg }}>{s.dRight ? 'Correct!' : 'Not quite'}</div>
            <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: T.accFg, marginTop: 4 }}>
              Key: {LETTERS[s.dOrder.indexOf(it.correct)]}. {it.options[it.correct]}
            </div>
            <RichText as="p" text={it.why} style={{ fontSize: 15, lineHeight: 1.65, color: T.mute, margin: '10px 0 0' }} />
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, padding: '12px 16px', background: T.surf, border: `2px dashed ${T.optLine}`, borderRadius: 'var(--wobble-sm)', flexWrap: 'wrap' }}>
          <span className="hand" style={{ fontSize: 22, color: T.ink }}>How sure are you?</span>
          <button className="tool-btn" style={pressed(s.dConfTag === 'confident', T.accBg, T.accFg, GREEN)} onClick={s.setConfident} aria-pressed={s.dConfTag === 'confident'}>
            Confident
          </button>
          <button className="tool-btn" style={pressed(s.dConfTag === 'unsure', T.warnBg, T.warnFg, '#D79A2B')} onClick={s.setUnsure} aria-pressed={s.dConfTag === 'unsure'}>
            Unsure
          </button>
          <span style={{ fontSize: 13, color: T.mute, marginLeft: 'auto' }}>Optional &mdash; it sharpens the report</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 34, flexWrap: 'wrap' }}>
          <button className="btn btn--paper" onClick={s.dPrev}>Previous</button>
          <button className={`btn ${s.dark ? 'btn--butter' : 'btn--ink'}`} onClick={s.dNext}>
            {s.dIdx >= s.dTotal - 1 ? 'Review and submit' : 'Next item'}
          </button>
        </div>
        <p className="hand" style={{ fontSize: 20, color: T.mute, margin: '20px 0 0', textAlign: 'center' }}>Saved automatically &mdash; you can close this and come back.</p>
      </section>
    </div>
  );
}
