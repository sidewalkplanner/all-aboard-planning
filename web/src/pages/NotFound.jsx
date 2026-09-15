import { useNavigate } from 'react-router-dom';
import Hoverable from '../components/Hoverable';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 560, margin: '0 auto', padding: '100px 24px 120px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, color: '#C93B2C', fontWeight: 600 }}>404</div>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 38, fontWeight: 700, letterSpacing: '-0.02em', margin: '10px 0 0' }}>
        Page not found
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.6, color: '#646A85', margin: '14px 0 0' }}>
        That page doesn&rsquo;t exist, or the link is out of date. Head back to the homepage to find your way.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
        <Hoverable
          style={{ background: '#1A1C2B', color: '#F6F7FB', border: 'none', padding: '13px 24px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
          hoverStyle={{ background: '#1D5FA8' }}
          onClick={() => navigate('/')}
        >
          Back to home
        </Hoverable>
        <Hoverable
          style={{ background: 'none', border: '1px solid #D2D6E6', color: '#1A1C2B', padding: '13px 22px', borderRadius: 10, fontSize: 15.5, fontWeight: 600 }}
          hoverStyle={{ border: '1px solid #1A1C2B' }}
          onClick={() => navigate('/exams')}
        >
          Browse practice exams
        </Hoverable>
      </div>
    </section>
  );
}
