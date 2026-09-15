import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Hoverable from './Hoverable';
import MenuIcon from './MenuIcon';
import { LIGHT, GREEN } from '../lib/theme';

const navLinkStyle = {
  background: 'none', border: 'none', padding: '8px 12px', borderRadius: 8,
  fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', color: LIGHT.mute
};
const navLinkHover = { background: LIGHT.neutralBg, color: LIGHT.ink };

const NAV_ITEMS = [
  ['Where should I study?', '/diagnostic'],
  ['Practice exams', '/exams'],
  ['Study by domain', '/study'],
  ['Progress', '/progress'],
  ['Pricing', '/pricing']
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const go = (path) => { setOpen(false); navigate(path); };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(246,247,251,0.92)', backdropFilter: 'blur(8px)', borderBottom: `1px solid ${LIGHT.line}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => go('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, minWidth: 0 }}
        >
          <Logo />
          <span style={{
            fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(17px,4.2vw,21px)', fontWeight: 600, letterSpacing: '-0.01em',
            color: LIGHT.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>
            All Aboard Planning
          </span>
        </button>

        <nav className="header-nav-desktop" style={{ gap: 6, marginLeft: 'auto', alignItems: 'center', flexWrap: 'wrap' }}>
          {NAV_ITEMS.map(([label, path]) => (
            <Hoverable key={path} style={navLinkStyle} hoverStyle={navLinkHover} onClick={() => go(path)}>{label}</Hoverable>
          ))}
          <Hoverable
            style={{ marginLeft: 8, background: LIGHT.ink, color: LIGHT.bg, border: 'none', padding: '9px 18px', borderRadius: 9, fontSize: 14.5, fontWeight: 700, whiteSpace: 'nowrap' }}
            hoverStyle={{ background: GREEN }}
            onClick={() => go('/signin')}
          >
            Sign in
          </Hoverable>
        </nav>

        <button
          className="header-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ marginLeft: 'auto', background: 'none', border: '1px solid #D2D6E6', borderRadius: 8, width: 38, height: 38, alignItems: 'center', justifyContent: 'center', color: LIGHT.ink, flex: '0 0 auto' }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav style={{ borderTop: `1px solid ${LIGHT.line}`, background: LIGHT.bg, padding: '10px 24px 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(([label, path]) => (
            <Hoverable
              key={path}
              style={{ ...navLinkStyle, width: '100%', textAlign: 'left', padding: '12px 10px', fontSize: 16 }}
              hoverStyle={navLinkHover}
              onClick={() => go(path)}
            >
              {label}
            </Hoverable>
          ))}
          <Hoverable
            style={{ marginTop: 8, background: LIGHT.ink, color: LIGHT.bg, border: 'none', padding: '12px 18px', borderRadius: 9, fontSize: 15.5, fontWeight: 700, textAlign: 'center' }}
            hoverStyle={{ background: GREEN }}
            onClick={() => go('/signin')}
          >
            Sign in
          </Hoverable>
        </nav>
      )}
    </header>
  );
}
