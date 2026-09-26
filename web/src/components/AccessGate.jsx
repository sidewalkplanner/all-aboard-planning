import { Link, useLocation } from 'react-router-dom';
import useAccess from '../hooks/useAccess';
import { P } from '../lib/paths';

// Shown in place of gated content. Signed-out visitors get a create-an-account
// prompt. Once paid plans are enabled (lib/access.js), signed-in visitors
// without Full Access get a pricing prompt instead.
//
// `headingLevel` lets page-level gates (RequireSignIn) render the page's <h1>.
export default function AccessGate({ what = 'the rest of this lesson', headingLevel = 2 }) {
  const { signedIn } = useAccess();
  const { pathname, search } = useLocation();
  const next = pathname + search;
  const H = `h${headingLevel}`;
  const What = what.charAt(0).toUpperCase() + what.slice(1);

  if (signedIn) {
    // Only reachable when PAID_TIER_ENABLED is true.
    return (
      <section className="placeholder-box" aria-labelledby="gate-heading" style={{ marginTop: 32 }}>
        <span className="chip chip-warn">Membership placeholder</span>
        <H id="gate-heading" className={headingLevel === 1 ? 'h1' : 'h3'} style={{ margin: '14px 0 8px' }}>{What} is part of Full Access</H>
        <div className="row-wrap" style={{ marginTop: 16 }}>
          <Link className="btn btn-primary" to={P.pricing}>See pricing</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card" aria-labelledby="gate-heading" style={{ marginTop: 32, borderColor: 'var(--brand)', borderWidth: 2 }}>
      <span className="chip chip-ok">Open with an account</span>
      <H id="gate-heading" className={headingLevel === 1 ? 'h1' : 'h3'} style={{ margin: '14px 0 8px' }}>
        Create an account to see {what}
      </H>
      <p className="body-text" style={{ margin: '0 0 18px', maxWidth: '60ch' }}>
        Every lesson and full-length practice exam is open to you. An account keeps your scores and progress
        in one place so you can see where to study next.
      </p>
      <div className="row-wrap">
        <Link className="btn btn-primary" to={P.signinNext(next, 'create')}>Create an account</Link>
        <Link className="btn btn-secondary" to={P.signinNext(next)}>Sign in</Link>
      </div>
      <p className="small" style={{ margin: '16px 0 0' }}>
        Just looking? The <Link to={P.course} className="link-underline">course overview</Link> is open to everyone.
      </p>
    </section>
  );
}
