export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <rect width="28" height="28" rx="7.5" fill="#1D5FA8" />
      <g stroke="#F6F7FB" strokeWidth="1.9" strokeLinecap="round">
        <path d="M8.2 23 L12.4 7" />
        <path d="M19.8 23 L15.6 7" />
        <path d="M7.3 19.6 H20.7" />
        <path d="M9.1 14.6 H18.9" />
        <path d="M10.6 10.2 H17.4" />
      </g>
    </svg>
  );
}
