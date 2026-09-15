// Small inline flag glyph — used instead of a unicode flag character, which
// isn't reliably covered by the app's font stack and can render as a tiny
// or missing fallback glyph on some platforms.
export default function FlagIcon({ size = 10, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M3 1v14" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 2 L13 4.5 L3 7 Z" fill={color} />
    </svg>
  );
}
