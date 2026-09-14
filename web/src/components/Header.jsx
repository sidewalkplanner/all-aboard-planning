import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Hoverable from './Hoverable';

const navLinkStyle = {
  background: 'none', border: 'none', padding: '8px 12px', borderRadius: 8,
  fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', color: '#3A3F57'
};
const navLinkHover = { background: '#ECEDF6', color: '#1A1C2B' };

export default function Header() {
  const navigate = useNavigate();
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(246,247,251,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #E4E6F0' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 28 }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0 }}
        >
          <Logo />
          <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 21, fontWeight: 600, letterSpacing: '-0.01em', color: '#1A1C2B' }}>All Aboard Planning</span>
        </button>
        <nav style={{ display: 'flex', gap: 6, marginLeft: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>
          <Hoverable style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => navigate('/diagnostic')}>Where should I study?</Hoverable>
          <Hoverable style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => navigate('/exams')}>Practice exams</Hoverable>
          <Hoverable style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => navigate('/study')}>Study by domain</Hoverable>
          <Hoverable style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => navigate('/progress')}>Progress</Hoverable>
          <Hoverable style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => navigate('/pricing')}>Pricing</Hoverable>
          <Hoverable
            style={{ marginLeft: 8, background: '#1A1C2B', color: '#F6F7FB', border: 'none', padding: '9px 18px', borderRadius: 9, fontSize: 14.5, fontWeight: 700, whiteSpace: 'nowrap' }}
            hoverStyle={{ background: '#1D5FA8' }}
            onClick={() => navigate('/signin')}
          >
            Sign in
          </Hoverable>
        </nav>
      </div>
    </header>
  );
}
