// Hamburger / close icon for the mobile nav toggle — an inline SVG rather
// than a unicode glyph (☰/✕ aren't reliably covered by the font stack).
export default function MenuIcon({ open, size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" style={{ display: 'block' }}>
      {open ? (
        <g stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <path d="M4 4 L16 16" />
          <path d="M16 4 L4 16" />
        </g>
      ) : (
        <g stroke={color} strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 5.5 H17" />
          <path d="M3 10 H17" />
          <path d="M3 14.5 H17" />
        </g>
      )}
    </svg>
  );
}
