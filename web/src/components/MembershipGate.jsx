import { Link } from 'react-router-dom';
import useMembership from '../hooks/useMembership';
import { P } from '../lib/paths';

// MEMBERSHIP PLACEHOLDER
// Wraps Full Access content. There is no login or payment system yet, so this
// reads the session-only demo toggle via hooks/useMembership.js. When a real
// membership tool is added, replace the check in that hook (and the matching
// guard in pages/exam/useExamSession.js); callers shouldn't need to change.
//
// Note: gated content still ships in the JavaScript bundle. Real protection
// needs the content delivered from a server only to signed-in members.
export default function MembershipGate({ children, what = 'the rest of this lesson' }) {
  const { isMember, demoUnlock } = useMembership();
  if (isMember) return children;
  return (
    <section className="placeholder-box" aria-labelledby="gate-heading" style={{ marginTop: 32 }}>
      <span className="chip chip-warn">Membership placeholder</span>
      <h2 id="gate-heading" className="h3" style={{ margin: '14px 0 8px' }}>
        {what.charAt(0).toUpperCase() + what.slice(1)} is part of Full Access
      </h2>
      <p className="body-text" style={{ margin: '0 0 18px', maxWidth: '60ch' }}>
        Full Access includes every lesson in the course, each lesson&rsquo;s practice set, all three full-length practice
        exams, and untimed drills in all nine domains. The first lesson in every domain is free.
      </p>
      <div className="row-wrap">
        <Link className="btn btn-primary" to={P.pricing}>See Full Access pricing</Link>
        <button type="button" className="btn btn-secondary" onClick={demoUnlock}>Preview with the demo unlock</button>
      </div>
      <p className="small" style={{ margin: '16px 0 0' }}>
        Accounts and payments aren&rsquo;t built yet. This box marks where a membership check will go. The demo unlock lasts
        until you reload the page.
      </p>
    </section>
  );
}
