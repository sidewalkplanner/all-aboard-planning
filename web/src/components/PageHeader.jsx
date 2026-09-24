// Standard page heading block: optional eyebrow, the page's single <h1>, and a lead paragraph.
export default function PageHeader({ eyebrow, title, lead, children, narrow = false }) {
  return (
    <header className={`${narrow ? 'container-narrow' : 'container'} page-head`}>
      {eyebrow && <span className="eyebrow eyebrow-brand">{eyebrow}</span>}
      <h1 className="h1">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {children}
    </header>
  );
}
