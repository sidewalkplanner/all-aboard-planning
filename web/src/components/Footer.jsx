import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FOOTER_NAV } from '../lib/nav';
import { P } from '../lib/paths';
import { art } from '../lib/art';

const skyline = art('footer-skyline');

export default function Footer() {
  return (
    <footer className="site-footer">
      {/* A pen sketch of the town running along the top of the footer. */}
      <div
        aria-hidden="true"
        className="site-footer__skyline"
        style={{
          WebkitMask: `url(${skyline}) center bottom / auto 110px repeat-x`,
          mask: `url(${skyline}) center bottom / auto 110px repeat-x`
        }}
      />
      <div className="site-footer__paper">
        <div className="container footer-grid">
          <div>
            <Link to={P.aicp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--ink)' }}>
              <Logo size={34} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 750 }}>
                All Aboard <span style={{ fontFamily: 'var(--font-hand)', fontSize: '1.2em', color: 'var(--tomato-ink)' }}>Planning</span>
              </span>
            </Link>
            <p style={{ margin: '12px 0 0', maxWidth: '38ch', lineHeight: 1.6, fontSize: 14.5, color: '#3A3122' }}>
              Lessons, study plans, and practice exams for planners preparing for the AICP Certification Exam.
            </p>
          </div>
          {FOOTER_NAV.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((l) => (
                  <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="container footer-legal">
          <span>
            All Aboard Planning is an independent study resource. It is not affiliated with, endorsed by, or sponsored by the
            American Planning Association (APA) or the American Institute of Certified Planners (AICP).
          </span>
          <span>&copy; {new Date().getFullYear()} All Aboard Planning</span>
        </div>
      </div>
    </footer>
  );
}
