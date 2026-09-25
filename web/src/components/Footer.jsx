import { useNavigate } from 'react-router-dom';
import { art } from '../lib/art';

const skyline = art('footer-skyline');

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer style={{ marginTop: 'auto', position: 'relative' }}>
      {/* A pen sketch of the town running along the top of the footer. */}
      <div
        aria-hidden="true"
        style={{
          height: 110, color: 'var(--ink)', opacity: 0.85,
          background: 'currentColor',
          WebkitMask: `url(${skyline}) center bottom / auto 110px repeat-x`,
          mask: `url(${skyline}) center bottom / auto 110px repeat-x`
        }}
      />
      <div className="kraft-bg" style={{ borderTop: '2px solid var(--ink)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 24px 30px', display: 'flex', gap: 20, justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', fontSize: 14, color: 'var(--ink)' }}>
          <span style={{ maxWidth: '62ch', lineHeight: 1.5 }}>
            <strong style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>All Aboard Planning</strong> &mdash; practice exams and study drills for planners. Not affiliated with the American Planning Association.
          </span>
          <span style={{ display: 'flex', gap: 18, alignItems: 'center', fontWeight: 700 }}>
            <a href="#about" style={{ color: 'var(--ink)' }}>About the exam</a>
            <a href="#contact" style={{ color: 'var(--ink)' }}>Contact</a>
            <button className="btn btn--sm btn--paper" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigate('/'); }}>
              Back to the station
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}
