import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';

const inputStyle = {
  border: '1px solid #D2D6E6', background: '#FFFFFF', borderRadius: 10, padding: '13px 14px',
  fontSize: 15.5, fontFamily: 'inherit', fontWeight: 400, color: '#1A1C2B'
};

export default function SignIn() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 430, margin: '0 auto', padding: '80px 24px 100px' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Sign in</h1>
      <p style={{ fontSize: 15.5, color: '#646A85', margin: '8px 0 30px' }}>Your progress and past exam results follow your account.</p>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
        onSubmit={(e) => { e.preventDefault(); navigate('/exams'); }}
      >
        <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 14, fontWeight: 600, color: '#3A3F57' }}>
          Email
          <input type="email" placeholder="you@city.gov" style={inputStyle} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 14, fontWeight: 600, color: '#3A3F57' }}>
          Password
          <input type="password" placeholder="••••••••" style={inputStyle} />
        </label>
        <Hoverable
          as="button"
          style={{ background: '#1D5FA8', color: '#F6F7FB', border: 'none', padding: 14, borderRadius: 10, fontSize: 16, fontWeight: 600, marginTop: 6 }}
          hoverStyle={{ background: '#164C87' }}
        >
          Continue
        </Hoverable>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#A3A8BE', fontSize: 13 }}>
          <span style={{ flex: 1, height: 1, background: '#E4E6F0' }} />or<span style={{ flex: 1, height: 1, background: '#E4E6F0' }} />
        </div>
        <Hoverable
          as="button"
          style={{ background: '#FFFFFF', color: '#1A1C2B', border: '1px solid #D2D6E6', padding: 13, borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
          hoverStyle={{ border: '1px solid #1A1C2B' }}
        >
          Continue with Google
        </Hoverable>
        <p style={{ fontSize: 14, color: '#646A85', textAlign: 'center', margin: '10px 0 0' }}>
          New here? <a href="#create-account" style={{ fontWeight: 600 }}>Create an account</a>
        </p>
      </form>
    </section>
  );
}
