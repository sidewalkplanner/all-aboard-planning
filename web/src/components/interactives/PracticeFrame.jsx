// The shared frame: a "Practice" label (so it never reads as a graded
// checkpoint), the kind's name, and a heading.
export function PracticeFrame({ kind, label, title, headingId, children }) {
  return (
    <section className={`practice practice--${kind}`} aria-labelledby={headingId}>
      <span className="practice-tape" aria-hidden="true" />
      <div className="practice-label">
        <span className="practice-kind">Practice &middot; {label}</span>
        <h3 id={headingId}>{title}</h3>
      </div>
      {children}
    </section>
  );
}
