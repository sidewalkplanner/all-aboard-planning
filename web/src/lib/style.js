export const barStyle = (pct, color) => ({ width: `${pct}%`, height: '100%', background: color, borderRadius: 999 });
export const chipStyle = (bg, fg) => ({ fontSize: 12.5, fontWeight: 600, color: fg, background: bg, padding: '5px 10px', borderRadius: 6, border: 'none', display: 'inline-block' });

// The "white card" pattern (surface + 1px border) repeated across most
// pages — takes theme tokens so it also works inside dark-mode-aware flows.
export const cardStyle = (T, { radius = 16, padding } = {}) => ({
  background: T.surf,
  border: `1px solid ${T.line}`,
  borderRadius: radius,
  ...(padding !== undefined ? { padding } : {})
});
