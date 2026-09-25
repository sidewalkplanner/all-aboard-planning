export const barStyle = (pct, color) => ({ width: `${pct}%`, height: '100%', background: color, borderRadius: 99 });
export const chipStyle = (bg, fg) => ({ fontSize: 12.5, fontWeight: 700, color: fg, background: bg, padding: '5px 10px', borderRadius: '7px 9px 6px 10px / 9px 6px 10px 7px', border: 'none', display: 'inline-block' });

// The inked paper card used across the flows: takes theme tokens so it
// also works on the blueprint (dark) pages.
export const cardStyle = (T, { radius, padding } = {}) => ({
  background: T.surf,
  border: `2px solid ${T.lineStrong}`,
  borderRadius: radius ? `${radius}px ${radius + 4}px ${radius - 2}px ${radius + 6}px / ${radius + 4}px ${radius - 2}px ${radius + 6}px ${radius}px` : 'var(--wobble)',
  boxShadow: `5px 6px 0 ${T.shadow}`,
  ...(padding !== undefined ? { padding } : {})
});
