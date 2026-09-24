import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FOOTER_NAV } from '../lib/nav';
import { P } from '../lib/paths';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to={P.aicp} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'var(--ink)' }}>
            <Logo size={24} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>All Aboard Planning</span>
          </Link>
          <p className="small" style={{ margin: '12px 0 0', maxWidth: '38ch', lineHeight: 1.6 }}>
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
    </footer>
  );
}
