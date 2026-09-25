import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import MenuIcon from './MenuIcon';
import { AICP_NAV, isActive } from '../lib/nav';
import { P, isDarkCapableRoute } from '../lib/paths';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const location = useLocation();
  const { dark } = useDarkMode();
  const { user, signOut } = useAuth();

  // The mobile menu tracks the location it was opened on, so any navigation
  // (a link here, the back button, a link in the page) closes it.
  const [openAt, setOpenAt] = useState(null);
  const here = location.pathname + location.search;
  const open = openAt === here;
  const toggle = () => setOpenAt(open ? null : here);

  // Blueprint (dark) mode only exists within the exam runner and diagnostic;
  // the header only goes dark while one of those is rendering dark content.
  const showDark = dark && isDarkCapableRoute(location.pathname);
  const ink = showDark ? '#EEF3FA' : 'var(--ink)';
  const linkClass = `nav-link${showDark ? ' nav-link--dark' : ''}`;

  const links = (mobile) => AICP_NAV.map((item) => {
    const active = isActive(item, location.pathname);
    return (
      <Link
        key={item.to}
        to={item.to}
        className={linkClass}
        aria-current={active ? 'page' : undefined}
        style={mobile ? { display: 'block', width: 'fit-content', padding: '12px 8px', fontSize: 18 } : undefined}
      >
        {item.label}
      </Link>
    );
  });

  const account = (mobile) => {
    if (!user) {
      return (
        <Link to={P.signin} className={`btn btn--sm btn-coral${mobile ? ' btn-block' : ''}`} style={mobile ? { marginTop: 12 } : { marginLeft: 10 }}>
          Sign in
        </Link>
      );
    }
    // ACCOUNT PLACEHOLDER: a real account menu (profile, settings) goes here.
    const onDash = location.pathname === P.progress;
    return (
      <span style={{ display: mobile ? 'flex' : 'inline-flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'stretch' : 'center', gap: mobile ? 10 : 4, marginLeft: mobile ? 0 : 10, marginTop: mobile ? 12 : 0 }}>
        {mobile && <span className="hand" style={{ fontSize: 22, color: showDark ? '#F4C95D' : 'var(--tomato-deep)', padding: '4px 8px 0' }}>Signed in as {user.name}</span>}
        <Link
          to={P.progress}
          aria-current={onDash ? 'page' : undefined}
          title={mobile ? undefined : `Signed in as ${user.name}`}
          className={`btn btn--sm btn-coral${mobile ? ' btn-block' : ''}`}
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={() => { setOpenAt(null); signOut(); }}
          className={mobile ? 'btn btn--sm btn-secondary btn-block' : linkClass}
        >
          Sign out
        </button>
      </span>
    );
  };

  return (
    <header
      style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: showDark ? 'rgba(21,41,74,0.94)' : 'rgba(247,240,226,0.9)',
        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        borderBottom: `2px solid ${showDark ? 'rgba(143,176,218,0.35)' : 'rgba(39,35,58,0.85)'}`
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '10px var(--gutter)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link
          to={P.aicp}
          aria-label="All Aboard Planning: AICP exam prep home"
          className="wiggle-on-hover"
          style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, color: ink }}
        >
          <Logo size={40} />
          <span style={{
            fontFamily: 'var(--font-display)', fontVariationSettings: "'SOFT' 100, 'WONK' 1", fontSize: 'clamp(18px,4.4vw,22px)',
            fontWeight: 750, letterSpacing: '-0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1
          }}>
            All Aboard <span style={{ fontFamily: 'var(--font-hand)', fontWeight: 700, fontSize: '1.2em', color: showDark ? '#F4C95D' : 'var(--tomato-deep)', letterSpacing: 0 }}>Planning</span>
          </span>
        </Link>

        <nav aria-label="AICP exam prep" className="header-nav-desktop" style={{ gap: 2, marginLeft: 'auto', alignItems: 'center' }}>
          {links(false)}
          {account(false)}
        </nav>

        <button
          className="header-nav-toggle"
          onClick={toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          style={{
            marginLeft: 'auto', background: showDark ? 'transparent' : 'var(--surface)', border: `2px solid ${ink}`, borderRadius: '10px 12px 9px 13px',
            width: 42, height: 42, alignItems: 'center', justifyContent: 'center', color: ink, flex: '0 0 auto',
            boxShadow: showDark ? 'none' : '2px 3px 0 var(--ink)'
          }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="AICP exam prep"
          className={`fade-up ${showDark ? 'blueprint-bg' : 'paper-bg'}`}
          style={{ borderTop: `2px dashed ${showDark ? 'rgba(143,176,218,0.35)' : 'rgba(39,35,58,0.3)'}`, padding: '10px var(--gutter) 20px', display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          {links(true)}
          <Link to={P.faq} className={linkClass} style={{ display: 'block', width: 'fit-content', padding: '12px 8px', fontSize: 18 }}>FAQ</Link>
          {account(true)}
        </nav>
      )}
    </header>
  );
}
