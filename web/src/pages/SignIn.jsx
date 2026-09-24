import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import usePageTitle from '../hooks/usePageTitle';
import { P } from '../lib/paths';

const inputStyle = {
  border: '1px solid var(--line-strong)', background: '#FFFFFF', borderRadius: 10, padding: '13px 14px',
  fontSize: 15.5, fontWeight: 400, color: 'var(--ink)'
};
const labelStyle = { display: 'flex', flexDirection: 'column', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--text)' };

// ACCOUNT PLACEHOLDER: there is no login system. This form is a visual
// placeholder for the future membership tool; submitting it just goes to the course.
export default function SignIn() {
  usePageTitle('Sign in');
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Sign in" lead="Your progress and past exam results will follow your account." narrow />
      <div className="container-narrow" style={{ maxWidth: 480, paddingBottom: 90 }}>
        <div className="placeholder-box" style={{ marginBottom: 24 }}>
          <span className="chip chip-warn">Accounts placeholder</span>
          <p className="body-text" style={{ margin: '10px 0 0', fontSize: 15 }}>
            Accounts aren&rsquo;t available yet. Your practice history is saved in this browser for now, and nothing you enter here is sent anywhere.
          </p>
        </div>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          onSubmit={(e) => { e.preventDefault(); navigate(P.course); }}
        >
          <label style={labelStyle}>
            Email
            <input type="email" autoComplete="email" placeholder="you@city.gov" style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Password
            <input type="password" autoComplete="current-password" style={inputStyle} />
          </label>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }}>Continue</button>
          <p className="small" style={{ textAlign: 'center', margin: '10px 0 0' }}>
            New here? Everything free works without an account. <Link className="link-underline" to={P.course}>Browse the course</Link>
          </p>
        </form>
      </div>
    </>
  );
}
