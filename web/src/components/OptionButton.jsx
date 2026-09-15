import RichText from './RichText';
import { GREEN, RUST, LIGHT } from '../lib/theme';

// variant: 'default' | 'picked' (selected, not yet revealed) | 'correct' (revealed, this is the key)
// | 'wrong' (revealed, this was picked and is wrong)
export default function OptionButton({ letter, text, variant = 'default', onClick, disabled, tokens = LIGHT, size = 'md' }) {
  let border = `1px solid ${tokens.line}`;
  let bg = tokens.surf;
  let weight = 400;
  let lbg = tokens.neutralBg;
  let lfg = tokens.mute;

  if (variant === 'correct') {
    border = `1.5px solid ${GREEN}`; bg = tokens.accBg; weight = 600; lbg = GREEN; lfg = '#FFFFFF';
  } else if (variant === 'wrong') {
    border = `1.5px solid ${RUST}`; bg = tokens.errBg; weight = 600; lbg = RUST; lfg = '#FFFFFF';
  } else if (variant === 'picked') {
    border = `1.5px solid ${GREEN}`; bg = tokens.accBg; weight = 600; lbg = GREEN; lfg = '#FFFFFF';
  }

  const pad = size === 'sm' ? '12px 14px' : '15px 17px';
  const fontSize = size === 'sm' ? 14.5 : 16;
  const letterSize = size === 'sm' ? 22 : 26;

  // Correctness is never color-only: a checkmark/x glyph backs up the
  // green/red styling for colorblind users, and the aria-label spells out
  // the state for screen readers.
  const stateGlyph = variant === 'correct' ? '✓' : variant === 'wrong' ? '✕' : null;
  const stateLabel = variant === 'correct' ? ', correct answer' : variant === 'wrong' ? ', your answer, incorrect' : variant === 'picked' ? ', selected' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Option ${letter}: ${typeof text === 'string' ? text : ''}${stateLabel}`}
      style={{
        display: 'flex', gap: size === 'sm' ? 12 : 14, alignItems: 'flex-start', textAlign: 'left', width: '100%',
        padding: pad, borderRadius: 12, fontSize, fontFamily: 'inherit', transition: 'border-color .12s, background .12s',
        border, background: bg, fontWeight: weight, color: tokens.ink, cursor: disabled ? 'default' : 'pointer'
      }}
    >
      <span style={{
        flex: '0 0 auto', width: letterSize, height: letterSize, borderRadius: 7, background: lbg, color: lfg,
        fontSize: size === 'sm' ? 12 : 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {letter}
      </span>
      <RichText as="span" text={text} style={{ flex: 1, lineHeight: 1.5 }} />
      {stateGlyph && (
        <span aria-hidden="true" style={{
          flex: '0 0 auto', width: letterSize, height: letterSize, borderRadius: '50%',
          color: variant === 'correct' ? GREEN : RUST, fontSize: size === 'sm' ? 14 : 16, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {stateGlyph}
        </span>
      )}
    </button>
  );
}
