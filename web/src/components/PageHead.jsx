import Art from './Art';

// Title block for inner pages: headline and intro on the left, a collage
// illustration on the right (stacked above on narrow screens).
export default function PageHead({ title, children, note, art, artW, artH, artAlt = '', artTilt = 0 }) {
  return (
    <div className="page-head">
      <div>
        <h1 className="display" style={{ fontSize: 'clamp(40px,5.4vw,64px)' }}>{title}</h1>
        {children && <div className="lede" style={{ marginTop: 16 }}>{children}</div>}
        {note && <div className="hand" style={{ fontSize: 26, marginTop: 14, transform: 'rotate(-2deg)', transformOrigin: 'left' }}>{note}</div>}
      </div>
      {art && (
        <div className="page-head__art float-soft" style={{ '--r': `${artTilt}deg` }}>
          <Art name={art} w={artW} h={artH} alt={artAlt} eager />
        </div>
      )}
    </div>
  );
}
