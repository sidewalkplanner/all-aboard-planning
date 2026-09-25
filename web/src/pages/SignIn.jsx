import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import usePageTitle from '../hooks/usePageTitle';
import { useAuth } from '../context/AuthContext';
import { P } from '../lib/paths';

const inputStyle = {
  border: '1px solid var(--line-strong)', background: '#FFFFFF', borderRadius: 10, padding: '13px 14px',
  fontSize: 15.5, fontWeight: 400, color: 'var(--ink)'
};
const labelStyle = { display: 'flex', flexDirection: 'column', gap: 7, fontSize: 14, fontWeight: 600, color: 'var(--text)' };

// Only return to in-app paths (never an external URL passed in ?next=).
const safeNext = (next) => (next && next.startsWith('/') && !next.startsWith('//') ? next : P.course);

// ACCOUNT PLACEHOLDER: this page works against the browser-only placeholder
// in context/AuthContext.jsx. When a real auth provider is added, keep this
// form (or swap in the provider's hosted UI) and point it at the provider.
export default function SignIn() {
  const [params, setParams] = useSearchParams();
  const creating = params.get('mode') === 'create';
  const next = safeNext(params.get('next'));
  const navigate = useNavigate();
  const { user, signIn, signUp, signOut } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  usePageTitle(creating ? 'Create a free account' : 'Sign in');

  const setMode = (mode) => {
    const p = new URLSearchParams(params);
    if (mode === 'create') p.set('mode', 'create'); else p.delete('mode');
    setParams(p, { replace: true });
    setError('');
  };
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      if (creating) await signUp(form); else await signIn(form);
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (user) {
    return (
      <>
        <PageHeader title="You're signed in" lead={`Signed in as ${user.name} (${user.email}).`} narrow />
        <div className="container-narrow" style={{ maxWidth: 480, paddingBottom: 90 }}>
          <div className="row-wrap">
            <Link className="btn btn-primary" to={next}>Continue</Link>
            <button type="button" className="btn btn-secondary" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={creating ? 'Create a free account' : 'Sign in'}
        lead={creating
          ? 'Everything in the course is free. An account keeps your scores and progress in one place.'
          : 'Welcome back. Your progress and past results follow your account.'}
        narrow
      />
      <div className="container-narrow" style={{ maxWidth: 480, paddingBottom: 90 }}>
        <div role="group" aria-label="Sign in or create an account" style={{ display: 'flex', gap: 6, marginBottom: 22, background: 'var(--neutral-bg)', padding: 4, borderRadius: 10 }}>
          {[['signin', 'Sign in'], ['create', 'Create account']].map(([mode, label]) => {
            const active = (mode === 'create') === creating;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={active}
                onClick={() => setMode(mode)}
                style={{ flex: 1, border: 'none', borderRadius: 8, padding: '10px 12px', fontSize: 15, fontWeight: 700, background: active ? '#FFFFFF' : 'transparent', color: active ? 'var(--ink)' : 'var(--muted)', boxShadow: active ? '0 1px 3px rgba(26,28,43,0.12)' : 'none' }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={submit} noValidate>
          {creating && (
            <label style={labelStyle}>
              Name
              <input type="text" autoComplete="name" required value={form.name} onChange={update('name')} style={inputStyle} />
            </label>
          )}
          <label style={labelStyle}>
            Email
            <input type="email" autoComplete="email" required placeholder="you@city.gov" value={form.email} onChange={update('email')} style={inputStyle} />
          </label>
          <label style={labelStyle}>
            Password
            <input
              type="password"
              autoComplete={creating ? 'new-password' : 'current-password'}
              required
              minLength={creating ? 8 : undefined}
              value={form.password}
              onChange={update('password')}
              style={inputStyle}
              aria-describedby={creating ? 'pw-hint' : undefined}
            />
            {creating && <span id="pw-hint" style={{ fontSize: 13, fontWeight: 400, color: 'var(--muted)' }}>At least 8 characters.</span>}
          </label>
          {error && <p role="alert" className="callout callout-warn" style={{ margin: 0, fontSize: 15 }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }} disabled={busy}>
            {busy ? 'Please wait…' : creating ? 'Create my free account' : 'Sign in'}
          </button>
        </form>

        <div className="placeholder-box" style={{ marginTop: 28 }}>
          <span className="chip chip-warn">Accounts placeholder</span>
          <p className="body-text" style={{ margin: '10px 0 0', fontSize: 14.5 }}>
            Accounts are kept only in this browser for now. Nothing you enter is sent anywhere, an account made on one device
            won&rsquo;t appear on another, and clearing your browser data removes it.
          </p>
        </div>
        <p className="small" style={{ textAlign: 'center', margin: '18px 0 0' }}>
          Just want to try it? <Link className="link-underline" to={P.runExam('q1', 'practice')}>Take Warm-up Quiz A</Link>, no account needed.
        </p>
      </div>
    </>
  );
}
