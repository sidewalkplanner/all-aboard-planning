// The strip across the top of the exam and diagnostic runners: position,
// a marker-style progress bar, a mode chip, and small tool buttons. The
// tool buttons take their colors from --tb-* set by the runner page.
export default function RunnerBar({ T, label, progress, chip, children }) {
  return (
    <div
      style={{
        borderBottom: `2px solid ${T.lineStrong}`, background: T.surf
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>{label}</div>
        <div className="meter meter--thin" style={{ flex: 1, minWidth: 120, borderColor: T.lineStrong, background: T.bg }}>
          <span style={{ width: `${progress * 100}%`, background: 'var(--butter)', borderRightColor: T.lineStrong, animation: 'none', transition: 'width .3s ease' }} />
        </div>
        {chip}
        {children}
      </div>
    </div>
  );
}
