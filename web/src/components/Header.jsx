import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Hoverable from './Hoverable';
import MenuIcon from './MenuIcon';
import { GREEN, themeTokens } from '../lib/theme';
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

  // Dark mode only exists within the exam runner and diagnostic flows; the
  // header only goes dark while one of those is rendering dark content.
  const showDark = dark && isDarkCapableRoute(location.pathname);
  const T = themeTokens(showDark);
  const navLinkStyle = {
    display: 'inline-block', padding: '8px 11px', borderRadius: 8,
    fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', color: T.mute
  };
  const navLinkHover = { background: T.neutralBg, color: T.ink };
  const activeStyle = { color: T.ink, background: T.neutralBg };
  const headerBg = showDark ? 'rgba(16,19,32,0.92)' : 'rgba(246,247,251,0.92)';

  const links = (mobile) => AICP_NAV.map((item) => {
    const active = isActive(item, location.pathname);
    const base = mobile ? { ...navLinkStyle, display: 'block', padding: '12px 10px', fontSize: 16 } : navLinkStyle;
    return (
      <Hoverable
        as={Link}
        key={item.to}
        to={item.to}
        aria-current={active ? 'page' : undefined}
        style={active ? { ...base, ...activeStyle } : base}
        hoverStyle={navLinkHover}
      >
        {item.label}
      </Hoverable>
    );
  });

  const accountBtn = (mobile) => {
    const box = mobile
      ? { display: 'block', width: '100%', marginTop: 8, padding: '12px 18px', borderRadius: 9, fontSize: 15.5, fontWeight: 700, textAlign: 'center' }
      : { marginLeft: 8, padding: '9px 18px', borderRadius: 9, fontSize: 14.5, fontWeight: 700, whiteSpace: 'nowrap' };
    if (!user) {
      return (
        <Hoverable as={Link} to={P.signin} style={{ ...box, background: T.ink, color: T.bg }} hoverStyle={{ background: GREEN, color: '#FFFFFF' }}>
          Sign in
        </Hoverable>
      );
    }
    // ACCOUNT PLACEHOLDER: a real account menu (profile, settings) goes here.
    return (
      <span style={{ display: mobile ? 'block' : 'inline-flex', alignItems: 'center', gap: 8, marginLeft: mobile ? 0 : 8 }}>
        <span style={{ display: mobile ? 'block' : 'inline', fontSize: 14, color: T.mute, padding: mobile ? '12px 10px 0' : 0, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span className="visually-hidden">Signed in as </span>{user.name}
        </span>
        <Hoverable
          as="button"
          type="button"
          onClick={() => { setOpenAt(null); signOut(); }}
          style={{ ...box, background: 'none', border: `1px solid ${T.line}`, color: T.ink, marginLeft: mobile ? 0 : 4 }}
          hoverStyle={{ border: `1px solid ${T.ink}` }}
        >
          Sign out
        </Hoverable>
      </span>
    );
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: headerBg, backdropFilter: 'blur(8px)', borderBottom: `1px solid ${T.line}` }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '14px var(--gutter)', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link
          to={P.aicp}
          aria-label="All Aboard Planning: AICP exam prep home"
          style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0, color: T.ink }}
        >
          <Logo />
          <span style={{
            fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(17px,4.2vw,21px)', fontWeight: 600, letterSpacing: '-0.01em',
            color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
          }}>
            All Aboard Planning
          </span>
        </Link>

        <nav aria-label="AICP exam prep" className="header-nav-desktop" style={{ gap: 2, marginLeft: 'auto', alignItems: 'center' }}>
          {links(false)}
          {accountBtn(false)}
        </nav>

        <button
          className="header-nav-toggle"
          onClick={toggle}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          style={{ marginLeft: 'auto', background: 'none', border: `1px solid ${T.line}`, borderRadius: 8, width: 38, height: 38, alignItems: 'center', justifyContent: 'center', color: T.ink, flex: '0 0 auto' }}
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="AICP exam prep" style={{ borderTop: `1px solid ${T.line}`, background: T.bg, padding: '10px var(--gutter) 18px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {links(true)}
          <Hoverable as={Link} to={P.drills} style={{ ...navLinkStyle, display: 'block', padding: '12px 10px', fontSize: 16 }} hoverStyle={navLinkHover}>Domain drills</Hoverable>
          <Hoverable as={Link} to={P.faq} style={{ ...navLinkStyle, display: 'block', padding: '12px 10px', fontSize: 16 }} hoverStyle={navLinkHover}>FAQ</Hoverable>
          {accountBtn(true)}
        </nav>
      )}
    </header>
  );
}
