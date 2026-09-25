import Art from './Art';

// Standard page heading block: optional eyebrow, the page's single <h1>, a
// lead paragraph, and optionally a pencil note and a collage illustration
// (art name from public/art/, with its intrinsic width/height).
export default function PageHeader({ eyebrow, title, lead, children, narrow = false, note, art, artW, artH, artAlt = '', artTilt = 0 }) {
  const text = (
    <div>
      {eyebrow && <span className="eyebrow eyebrow-brand">{eyebrow}</span>}
      <h1 className="h1">{title}</h1>
      {lead && <p className="lead">{lead}</p>}
      {note && <p className="hand" style={{ fontSize: 26, margin: '14px 0 0', transform: 'rotate(-2deg)', transformOrigin: 'left' }}>{note}</p>}
      {children}
    </div>
  );
  if (!art) {
    return <header className={`${narrow ? 'container-narrow' : 'container'} page-head`}>{text}</header>;
  }
  return (
    <header className={narrow ? 'container-narrow' : 'container'}>
      <div className="page-head-art">
        {text}
        <div className="page-head-art__art float-soft" style={{ '--r': `${artTilt}deg` }}>
          <Art name={art} w={artW} h={artH} alt={artAlt} eager />
        </div>
      </div>
    </header>
  );
}
