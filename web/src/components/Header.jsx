import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import { useDarkMode } from '../context/DarkModeContext';

const NAV_ITEMS = [
  ['Where should I study?', '/diagnostic'],
  ['Practice exams', '/exams'],
  ['Study by domain', '/study'],
  ['Progress', '/progress']
];

// Dark mode only exists within the exam runner and diagnostic flows — the
// header should only go dark while one of those is actually rendering dark
// content below it, not carry a stale dark header onto pages (like the
// exams list or progress) that never turned it on.
const isDarkCapableRoute = (pathname) => pathname.startsWith('/exam/run') || pathname.startsWith('/diagnostic');

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark } = useDarkMode();
  const [open, setOpen] = useState(false);
  const go = (path) => { setOpen(false); navigate(path); };
  const showDark = dark && isDarkCapableRoute(location.pathname);
  const current = (path) => (location.pathname.startsWith(path) ? 'page' : undefined);

  const ink = showDark ? '#EEF3FA' : 'var(--ink)';
  const headerBg = showDark ? 'rgba(21,41,74,0.94)' : 'rgba(247,240,226,0.9)';

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 30, background: headerBg, backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)', borderBottom: `2px solid ${showDark ? 'rgba(143,176,218,0.35)' : 'rgba(39,35,58,0.85)'}`
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={() => go('/')}
          aria-label="All Aboard Planning, home"
          className="wiggle-on-hover"
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', padding: 0, minWidth: 0, color: ink }}
        >
          <Logo size={40} />
          <span style={{
            fontFamily: 'var(--font-display)', fontVariationSettings: "'SOFT' 100, 'WONK' 1", fontSize: 'clamp(18px,4.4vw,22px)',
            fontWeight: 750, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1
          }}>
            All Aboard <span style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: '1.2em', color: showDark ? '#F4C95D' : 'var(--tomato-deep)', letterSpacing: 0 }}>Planning</span>
          </span>
        </button>

        <nav className="header-nav-desktop" aria-label="Main" style={{ gap: 2, marginLeft: 'auto', alignItems: 'center' }}>
          {NAV_ITEMS.map(([label, path]) => (
            <button key={path} className="nav-link" aria-current={current(path)} onClick={() => go(path)} style={showDark ? { color: '#C9D6EA' } : undefined}>
              {label}
            </button>
          ))}
          <button className="btn btn--sm btn--butter" style={{ marginLeft: 10 }} onClick={() => go('/signin')}>
            Sign in
          </button>
        </nav>

        <button
          className="header-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{
            marginLeft: 'auto', background: showDark ? 'transparent' : 'var(--card)', border: `2px solid ${ink}`, borderRadius: '10px 12px 9px 13px',
            width: 42, height: 42, alignItems: 'center', justifyContent: 'center', color: ink, flex: '0 0 auto', boxShadow: showDark ? 'none' : '2px 3px 0 var(--ink)'
          }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav aria-label="Main" className={`fade-up ${showDark ? 'blueprint-bg' : 'paper-bg'}`} style={{ borderTop: `2px dashed ${showDark ? 'rgba(143,176,218,0.35)' : 'rgba(39,35,58,0.3)'}`, padding: '10px 24px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map(([label, path]) => (
            <button
              key={path}
              className="nav-link"
              aria-current={current(path)}
              style={{ width: 'fit-content', textAlign: 'left', padding: '12px 8px', fontSize: 18, ...(showDark ? { color: '#C9D6EA' } : {}) }}
              onClick={() => go(path)}
            >
              {label}
            </button>
          ))}
          <button className="btn btn--butter" style={{ marginTop: 10 }} onClick={() => go('/signin')}>
            Sign in
          </button>
        </nav>
      )}
    </header>
  );
}
