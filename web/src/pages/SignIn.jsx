import { useNavigate } from 'react-router-dom';
import Art from '../components/Art';

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <section className="wrap" style={{ maxWidth: 940, padding: '64px 24px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 48, alignItems: 'center' }}>
      <div style={{ maxWidth: 300, justifySelf: 'center', width: '100%' }} className="float-soft">
        <Art name="page-conductor" w={300} h={340} eager alt="A friendly conductor waving and holding a lantern" />
      </div>
      <div className="card" style={{ padding: '36px 30px 30px', '--r': '0.8deg' }}>
        <span className="tape tape--mint" aria-hidden="true" />
        <h1 className="display" style={{ fontSize: 44 }}>Welcome back.</h1>
        <p style={{ fontSize: 15.5, color: 'var(--ink-soft)', margin: '10px 0 26px', lineHeight: 1.5 }}>Your progress and past exam results follow your account.</p>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          onSubmit={(e) => { e.preventDefault(); navigate('/exams'); }}
        >
          <label className="field">
            Email
            <input type="email" placeholder="you@city.gov" autoComplete="email" />
          </label>
          <label className="field">
            Password
            <input type="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <button className="btn btn--civic btn--block" style={{ marginTop: 6 }}>Continue</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--ink-faint)' }}>
            <span style={{ flex: 1, borderTop: '2px dashed var(--line-strong)' }} /><span className="hand" style={{ fontSize: 22, color: 'var(--ink-faint)' }}>or</span><span style={{ flex: 1, borderTop: '2px dashed var(--line-strong)' }} />
          </div>
          <button type="button" className="btn btn--paper btn--block">Continue with Google</button>
          <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', textAlign: 'center', margin: '8px 0 0' }}>
            New here? <a href="#create-account" style={{ fontWeight: 700 }}>Create an account</a>
          </p>
        </form>
      </div>
    </section>
  );
}
