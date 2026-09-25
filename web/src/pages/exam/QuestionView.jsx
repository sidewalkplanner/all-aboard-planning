import OptionButton from '../../components/OptionButton';
import RichText from '../../components/RichText';
import ExhibitTable from '../../components/ExhibitTable';
import RunnerBar from '../../components/RunnerBar';
import { LETTERS } from '../../data/domains';
import { chipStyle } from '../../lib/style';
import { GREEN, RUST, themeTokens } from '../../lib/theme';
import { fmtClock, parseExhibit } from '../../lib/format';

export default function QuestionView(s) {
  const T = themeTokens(s.dark);
  const flagged = !!s.flags[s.i];
  const exhibit = parseExhibit(s.q.exhibit);

  return (
    <div className={T.paperClass} style={{ color: T.ink, minHeight: '100vh', '--tb-line': T.optLine, '--tb-fg': T.mute, '--tb-strong': T.ink }}>
      <RunnerBar
        T={T}
        label={`Question ${s.i + 1} of ${s.total}`}
        progress={(s.i + 1) / s.total}
        chip={<span style={chipStyle(s.practice ? T.accBg : T.warnBg, s.practice ? T.accFg : T.warnFg)}>{s.practice ? 'Practice mode' : 'Timed'}</span>}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: T.ink, minWidth: 64, textAlign: 'right' }}>
          {s.practice ? '—' : fmtClock(s.seconds)}
        </div>
        <button
          className="tool-btn"
          onClick={s.toggleDark}
          title={s.dark ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-pressed={s.dark}
        >
          {s.dark ? 'Paper' : 'Blueprint'}
        </button>
        <button className="tool-btn" onClick={s.goGrid}>Review all</button>
      </RunnerBar>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={chipStyle(T.accBg, T.accFg)}>{s.q.domain}</span>
          <button
            className="tool-btn"
            style={{ marginLeft: 'auto', ...(flagged ? { background: RUST, borderColor: RUST, color: '#FFF6F3' } : {}) }}
            onClick={s.toggleFlag}
            aria-pressed={flagged}
          >
            {flagged ? 'Flagged' : 'Flag for review'}
          </button>
        </div>

        {s.q.scenario && (
          <div style={{ background: T.surf, borderStyle: 'solid', borderWidth: '2px 2px 2px 5px', borderColor: `${T.optLine} ${T.optLine} ${T.optLine} ${GREEN}`, borderRadius: '4px 14px 12px 4px', padding: '16px 20px', margin: '20px 0 0' }}>
            <div className="hand" style={{ fontSize: 22, color: T.accFg, marginBottom: 6 }}>Scenario</div>
            <RichText as="p" text={s.q.scenario} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: 0 }} />
          </div>
        )}

        <ExhibitTable exhibit={exhibit} T={T} />

        <RichText as="p" text={s.q.text} style={{ fontSize: 'clamp(19px,2.1vw,23px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '22px 0 26px', textWrap: 'pretty', color: T.ink, whiteSpace: 'pre-line' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {s.q.options.map((text, idx) => {
            let variant = 'default';
            if (s.revealed && idx === s.q.correct) variant = 'correct';
            else if (s.revealed && idx === s.picked) variant = 'wrong';
            else if (!s.revealed && idx === s.picked) variant = 'picked';
            return (
              <OptionButton
                key={idx}
                letter={LETTERS[idx]}
                text={text}
                variant={variant}
                tokens={T}
                disabled={s.revealed}
                onClick={() => s.pick(idx)}
              />
            );
          })}
        </div>

        {s.canCheck && (
          <div style={{ marginTop: 18 }}>
            <button className="btn btn--sm btn--civic" onClick={s.checkAnswer}>Check answer</button>
          </div>
        )}

        {s.revealed && (
          <div className="fade-up" style={{ marginTop: 24, background: T.surf, borderStyle: 'solid', borderWidth: '2px 2px 2px 5px', borderColor: `${T.optLine} ${T.optLine} ${T.optLine} ${s.picked === s.q.correct ? GREEN : RUST}`, borderRadius: '4px 14px 12px 4px', padding: '18px 22px' }}>
            <div className="hand" style={{ fontSize: 28, color: s.picked === s.q.correct ? T.accFg : T.errFg }}>
              {s.picked === s.q.correct ? 'Correct!' : 'Not quite'}
            </div>
            <RichText as="p" text={s.q.explanation} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: '4px 0 0' }} />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 38, flexWrap: 'wrap' }}>
          <button className="btn btn--paper" onClick={s.prev}>Previous</button>
          <button className={`btn ${s.dark ? 'btn--butter' : 'btn--ink'}`} onClick={s.next}>
            {s.i >= s.total - 1 ? 'Finish' : 'Next question'}
          </button>
        </div>
      </section>
    </div>
  );
}
