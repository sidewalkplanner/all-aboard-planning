import RichText from './RichText';
import { GREEN, RUST, LIGHT } from '../lib/theme';

// variant: 'default' | 'picked' (selected, not yet revealed) | 'correct' (revealed, this is the key)
// | 'wrong' (revealed, this was picked and is wrong)
export default function OptionButton({ letter, text, variant = 'default', onClick, disabled, tokens = LIGHT, size = 'md' }) {
  let border = tokens.optLine;
  let bg = tokens.surf;
  let weight = 450;
  let lbg = tokens.neutralBg;
  let lfg = tokens.ink;
  let shadow = 'none';

  if (variant === 'correct') {
    border = GREEN; bg = tokens.accBg; weight = 600; lbg = GREEN; lfg = '#FFFFFF'; shadow = `3px 4px 0 ${GREEN}`;
  } else if (variant === 'wrong') {
    border = RUST; bg = tokens.errBg; weight = 600; lbg = RUST; lfg = '#FFFFFF'; shadow = `3px 4px 0 ${RUST}`;
  } else if (variant === 'picked') {
    border = tokens.lineStrong; bg = tokens.accBg; weight = 600; lbg = tokens.lineStrong; lfg = tokens.surf; shadow = `3px 4px 0 ${tokens.lineStrong}`;
  }

  const pad = size === 'sm' ? '11px 14px' : '15px 17px';
  const fontSize = size === 'sm' ? 14.5 : 16;
  const letterSize = size === 'sm' ? 26 : 30;

  // Correctness is never color-only: a checkmark/x glyph backs up the
  // green/red styling for colorblind users, and the aria-label spells out
  // the state for screen readers.
  const stateGlyph = variant === 'correct' ? '✓' : variant === 'wrong' ? '✕' : null;
  const stateLabel = variant === 'correct' ? ', correct answer' : variant === 'wrong' ? ', your answer, incorrect' : variant === 'picked' ? ', selected' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`opt${disabled ? '' : ' opt--live'}`}
      aria-label={`Option ${letter}: ${typeof text === 'string' ? text : ''}${stateLabel}`}
      style={{
        '--opt-hover': tokens.lineStrong,
        display: 'flex', gap: size === 'sm' ? 12 : 14, alignItems: 'flex-start', textAlign: 'left', width: '100%',
        padding: pad, borderRadius: '12px 15px 11px 16px / 15px 11px 16px 12px', fontSize, fontFamily: 'inherit',
        border: `2px solid ${border}`, background: bg, fontWeight: weight, color: tokens.ink, boxShadow: shadow,
        cursor: disabled ? 'default' : 'pointer'
      }}
    >
      <span style={{
        flex: '0 0 auto', width: letterSize, height: letterSize, borderRadius: '50%', background: lbg, color: lfg,
        border: `2px solid ${variant === 'default' ? tokens.optLine : lbg}`,
        fontFamily: 'var(--font-display)', fontSize: size === 'sm' ? 13 : 14.5, fontWeight: 800,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: size === 'sm' ? -2 : -3
      }}>
        {letter}
      </span>
      <RichText as="span" text={text} style={{ flex: 1, lineHeight: 1.5 }} />
      {stateGlyph && (
        <span aria-hidden="true" style={{
          flex: '0 0 auto', width: letterSize, height: letterSize, borderRadius: '50%',
          color: variant === 'correct' ? GREEN : RUST, fontSize: size === 'sm' ? 17 : 19, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: size === 'sm' ? -2 : -3
        }}>
          {stateGlyph}
        </span>
      )}
    </button>
  );
}
