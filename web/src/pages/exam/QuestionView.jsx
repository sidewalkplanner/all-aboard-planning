import Hoverable from '../../components/Hoverable';
import OptionButton from '../../components/OptionButton';
import RichText from '../../components/RichText';
import ExhibitTable from '../../components/ExhibitTable';
import { LETTERS } from '../../data/domains';
import { GREEN, RUST, themeTokens } from '../../lib/theme';
import { fmtClock, parseExhibit } from '../../lib/format';

export default function QuestionView(s) {
  const T = themeTokens(s.dark);
  const flagged = !!s.flags[s.i];
  const exhibit = parseExhibit(s.q.exhibit);

  return (
    <div style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      <div style={{ borderBottom: `1px solid ${T.line}`, background: T.surf }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: T.ink }}>Question {s.i + 1} of {s.total}</div>
          <div style={{ flex: 1, minWidth: 120, height: 6, background: T.neutralBg, borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ width: `${((s.i + 1) / s.total) * 100}%`, height: '100%', background: GREEN, borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: s.practice ? T.accFg : T.warnFg, background: s.practice ? T.accBg : T.warnBg, padding: '5px 10px', borderRadius: 6 }}>
            {s.practice ? 'Practice mode' : 'Timed'}
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: T.mute, minWidth: 64, textAlign: 'right' }}>
            {s.practice ? '—' : fmtClock(s.seconds)}
          </div>
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
            style={{ background: 'none', border: `1px solid ${T.line}`, padding: '7px 13px', borderRadius: 8, fontSize: 13.5, fontWeight: 600, fontFamily: 'inherit', color: T.mute }}
            hoverStyle={{ border: `1px solid ${T.ink}` }}
            onClick={s.goGrid}
          >
            Review all
          </Hoverable>
        </div>
      </div>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 90px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: T.accFg, background: T.accBg, padding: '5px 10px', borderRadius: 6 }}>{s.q.domain}</span>
          <Hoverable
            style={{
              marginLeft: 'auto', fontSize: 12.5, fontWeight: 600, padding: '5px 12px', borderRadius: 6, fontFamily: 'inherit',
              border: `1px solid ${flagged ? RUST : T.line}`, background: flagged ? RUST : 'transparent', color: flagged ? '#FFF6F3' : T.mute
            }}
            onClick={s.toggleFlag}
            aria-pressed={flagged}
          >
            {flagged ? 'Flagged' : 'Flag for review'}
          </Hoverable>
        </div>

        {s.q.scenario && (
          <div style={{ background: T.surf, border: `1px solid ${T.line}`, borderLeft: `3px solid ${GREEN}`, borderRadius: '0 12px 12px 0', padding: '16px 20px', margin: '20px 0 0' }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.accFg, marginBottom: 7 }}>Scenario</div>
            <RichText as="p" text={s.q.scenario} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: 0 }} />
          </div>
        )}

        <ExhibitTable exhibit={exhibit} T={T} />

        <RichText as="p" text={s.q.text} style={{ fontSize: 'clamp(19px,2.1vw,23px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.005em', margin: '20px 0 26px', textWrap: 'pretty', color: T.ink, whiteSpace: 'pre-line' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
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

        {s.revealed && (
          <div className="fade-up" style={{ marginTop: 24, borderLeft: `3px solid ${GREEN}`, background: T.surf, borderRadius: '0 12px 12px 0', padding: '20px 22px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: s.picked === s.q.correct ? T.accFg : T.errFg }}>
              {s.picked === s.q.correct ? 'Correct' : 'Not quite'}
            </div>
            <RichText as="p" text={s.q.explanation} style={{ fontSize: 15.5, lineHeight: 1.6, color: T.mute, margin: 0 }} />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
          <Hoverable
            style={{ background: 'none', border: `1px solid ${T.line}`, color: T.mute, padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600, fontFamily: 'inherit' }}
            onClick={s.prev}
          >
            Previous
          </Hoverable>
          <Hoverable
            style={{ background: s.dark ? GREEN : '#1A1C2B', border: 'none', color: '#F6F7FB', padding: '13px 26px', borderRadius: 10, fontSize: 15.5, fontWeight: 600, fontFamily: 'inherit' }}
            onClick={s.next}
          >
            {s.i >= s.total - 1 ? 'Finish' : 'Next question'}
          </Hoverable>
        </div>
      </section>
    </div>
  );
}
