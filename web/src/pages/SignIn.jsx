import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Art from '../components/Art';
import usePageTitle from '../hooks/usePageTitle';
import { useAuth } from '../context/AuthContext';
import { P } from '../lib/paths';

// Only return to in-app paths (never an external URL passed in ?next=).
const safeNext = (next) => (next && next.startsWith('/') && !next.startsWith('//') ? next : P.course);

const MODES = {
  signin: {
    title: 'Welcome back.',
    lede: 'Sign in to pick up where you left off. Your progress and past results follow your account.',
    submit: 'Sign in',
    note: 'Pull up a seat, the conductor saved your spot.'
  },
  create: {
    title: 'Get your ticket.',
    lede: 'An account keeps your scores, lesson progress, and diagnostic report in one place.',
    submit: 'Create my account',
    note: 'All aboard! The first stop is lesson one.'
  }
};

// The login portal: one card with "Sign in" and "Create account" tabs. The
// mode lives in the URL (?mode=create) so either tab can be linked to.
//
// ACCOUNT PLACEHOLDER: this page works against the browser-only placeholder
// in context/AuthContext.jsx. When a real auth provider is added, keep this
// form (or swap in the provider's hosted UI) and point it at the provider.
export default function SignIn() {
  const [params, setParams] = useSearchParams();
  const creating = params.get('mode') === 'create';
  const mode = creating ? 'create' : 'signin';
  const m = MODES[mode];
  const next = safeNext(params.get('next'));
  const navigate = useNavigate();
  const { user, signIn, signUp, signOut } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  usePageTitle(creating ? 'Create an account' : 'Sign in');

  const setMode = (to) => {
    const p = new URLSearchParams(params);
    if (to === 'create') p.set('mode', 'create'); else p.delete('mode');
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

  const conductor = (note) => (
    <div style={{ maxWidth: 300, justifySelf: 'center', width: '100%', textAlign: 'center' }}>
      <div className="float-soft">
        <Art name="page-conductor" w={300} h={340} eager alt="A friendly conductor waving and holding a lantern" />
      </div>
      <p className="hand" style={{ fontSize: 24, margin: '12px 0 0', color: 'var(--ink-soft)', transform: 'rotate(-2deg)' }}>{note}</p>
    </div>
  );

  const layout = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 48, alignItems: 'center', paddingTop: 56, paddingBottom: 96, maxWidth: 980 };

  if (user) {
    return (
      <section className="container" style={layout}>
        {conductor('Tickets, please! Oh, you already have one.')}
        <div className="card" style={{ padding: '34px 30px 30px', '--r': '0.8deg' }}>
          <span className="tape tape--mint" aria-hidden="true" />
          <h1 className="h1" style={{ fontSize: 44 }}>You&rsquo;re signed in</h1>
          <p className="body-text" style={{ margin: '10px 0 24px' }}>Signed in as {user.name} ({user.email}).</p>
          <div className="row-wrap">
            <Link className="btn btn-primary" to={next}>Continue</Link>
            <button type="button" className="btn btn-secondary" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container" style={layout}>
      {conductor(m.note)}

      <div className="card" style={{ padding: '30px 30px 28px', '--r': '0.8deg' }}>
        <span className="tape tape--mint" aria-hidden="true" />

        <div className="portal-tabs" role="group" aria-label="Sign in or create an account">
          {[['signin', 'Sign in'], ['create', 'Create account']].map(([key, label]) => (
            <button key={key} type="button" className="portal-tab" aria-pressed={mode === key} onClick={() => setMode(key)}>
              {label}
            </button>
          ))}
        </div>

        <div key={mode} className="fade-up">
          <h1 className="h1" style={{ fontSize: 44, marginTop: 22 }}>{m.title}</h1>
          <p className="body-text" style={{ margin: '10px 0 24px' }}>{m.lede}</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={submit} noValidate>
            {creating && (
              <label className="field">
                Name
                <input type="text" autoComplete="name" required placeholder="Jane Jacobs" value={form.name} onChange={update('name')} />
              </label>
            )}
            <label className="field">
              Email
              <input type="email" autoComplete="email" required placeholder="you@city.gov" value={form.email} onChange={update('email')} />
            </label>
            <label className="field">
              Password
              <input
                type="password"
                autoComplete={creating ? 'new-password' : 'current-password'}
                required
                minLength={creating ? 8 : undefined}
                placeholder={creating ? 'At least 8 characters' : '••••••••'}
                value={form.password}
                onChange={update('password')}
                aria-describedby={creating ? 'pw-hint' : undefined}
              />
              {creating && <span id="pw-hint" style={{ fontSize: 13, fontWeight: 500, color: 'var(--muted)' }}>At least 8 characters.</span>}
            </label>
            {error && <p role="alert" className="callout callout-warn" style={{ margin: 0, fontSize: 15 }}>{error}</p>}
            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 6 }} disabled={busy}>
              {busy ? 'Please wait…' : m.submit}
            </button>
          </form>

          <p style={{ fontSize: 14.5, color: 'var(--muted)', textAlign: 'center', margin: '18px 0 0' }}>
            {creating
              ? <>Already have an account? <button type="button" className="link-btn" onClick={() => setMode('signin')}>Sign in</button></>
              : <>New here? <button type="button" className="link-btn" onClick={() => setMode('create')}>Create an account</button></>}
          </p>
        </div>

        <div className="placeholder-box" style={{ marginTop: 24, padding: '16px 18px' }}>
          <span className="chip chip-warn">Accounts placeholder</span>
          <p className="body-text" style={{ margin: '8px 0 0', fontSize: 14 }}>
            Accounts are kept only in this browser for now. Nothing you enter is sent anywhere, an account made on one device
            won&rsquo;t appear on another, and clearing your browser data removes it.
          </p>
        </div>
        <p className="small" style={{ textAlign: 'center', margin: '16px 0 0' }}>
          Just looking? <Link className="link-underline" to={P.course}>Browse the course</Link>, no account needed.
        </p>
      </div>
    </section>
  );
}
