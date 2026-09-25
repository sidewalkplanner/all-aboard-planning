import { useNavigate, useSearchParams } from 'react-router-dom';
import Art from '../components/Art';

// The login portal: one card with "Sign in" and "Create account" tabs.
// The mode lives in the URL (?mode=create) so either tab can be linked to.
// There is no auth backend yet: submitting drops you at the exams list.
const MODES = {
  signin: {
    title: 'Welcome back.',
    lede: 'Sign in to pick up where you left off.',
    submit: 'Sign in',
    note: 'Pull up a seat, the conductor saved your spot.'
  },
  create: {
    title: 'Get your ticket.',
    lede: 'Create an account to keep your scores, flagged questions and diagnostic report together.',
    submit: 'Create account',
    note: 'All aboard, the first stop is a warm-up quiz.'
  }
};

export default function SignIn() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const mode = params.get('mode') === 'create' ? 'create' : 'signin';
  const m = MODES[mode];
  const setMode = (next) => setParams(next === 'create' ? { mode: 'create' } : {}, { replace: true });

  return (
    <section className="wrap" style={{ maxWidth: 980, padding: '56px 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 48, alignItems: 'center' }}>
      <div style={{ maxWidth: 300, justifySelf: 'center', width: '100%', textAlign: 'center' }}>
        <div className="float-soft">
          <Art name="page-conductor" w={300} h={340} eager alt="A friendly conductor waving and holding a lantern" />
        </div>
        <p className="hand" style={{ fontSize: 24, margin: '12px 0 0', color: 'var(--ink-soft)', transform: 'rotate(-2deg)' }}>{m.note}</p>
      </div>

      <div className="card" style={{ padding: '30px 30px 30px', '--r': '0.8deg' }}>
        <span className="tape tape--mint" aria-hidden="true" />

        <div className="portal-tabs" role="tablist" aria-label="Account">
          {[['signin', 'Sign in'], ['create', 'Create account']].map(([key, label]) => (
            <button
              key={key}
              role="tab"
              id={`tab-${key}`}
              aria-selected={mode === key}
              aria-controls="portal-panel"
              className="portal-tab"
              onClick={() => setMode(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div id="portal-panel" role="tabpanel" aria-labelledby={`tab-${mode}`} key={mode} className="fade-up">
          <h1 className="display" style={{ fontSize: 44, marginTop: 22 }}>{m.title}</h1>
          <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', margin: '10px 0 24px', lineHeight: 1.5 }}>{m.lede}</p>
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            onSubmit={(e) => { e.preventDefault(); navigate('/exams'); }}
          >
            {mode === 'create' && (
              <label className="field">
                Name
                <input type="text" placeholder="Jane Jacobs" autoComplete="name" required />
              </label>
            )}
            <label className="field">
              Email
              <input type="email" placeholder="you@city.gov" autoComplete="email" required />
            </label>
            <label className="field">
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                Password
                {mode === 'signin' && <a href="#reset-password" style={{ fontSize: 13.5, fontWeight: 600 }}>Forgot password?</a>}
              </span>
              <input
                type="password"
                placeholder={mode === 'create' ? 'At least 8 characters' : '••••••••'}
                autoComplete={mode === 'create' ? 'new-password' : 'current-password'}
                minLength={mode === 'create' ? 8 : undefined}
                required
              />
            </label>
            <button className="btn btn--civic btn--block" style={{ marginTop: 6 }}>{m.submit}</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-faint)' }}>
              <span style={{ flex: 1, borderTop: '2px dashed var(--line-strong)' }} /><span className="hand" style={{ fontSize: 22, color: 'var(--ink-faint)' }}>or</span><span style={{ flex: 1, borderTop: '2px dashed var(--line-strong)' }} />
            </div>
            <button type="button" className="btn btn--paper btn--block">
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.9 6.1C12.5 13.6 17.8 9.5 24 9.5z" /><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.7c4.3-4 6.9-9.9 6.9-17.1z" /><path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.7 10.7l7.9-6.1z" /><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2.1 1.4-4.8 2.3-8.5 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" /></svg>
              Continue with Google
            </button>
            <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', textAlign: 'center', margin: '6px 0 0' }}>
              {mode === 'signin'
                ? <>New here? <button type="button" className="link-btn" onClick={() => setMode('create')}>Create an account</button></>
                : <>Already have an account? <button type="button" className="link-btn" onClick={() => setMode('signin')}>Sign in</button></>}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
