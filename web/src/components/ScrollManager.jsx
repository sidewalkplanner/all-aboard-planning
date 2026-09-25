import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Client-side navigation doesn't reset scroll the way a page load does.
// On every route change: jump to the #hash target if there is one (retrying
// briefly while lazy content mounts), otherwise go to the top. Focus moves to
// the target (or <main>) so keyboard and screen-reader users land in the new
// content instead of staying on the link they clicked.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    let tries = 0;
    let timer;
    const initial = first.current;
    first.current = false;
    const focusEl = (el) => {
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    };
    const go = () => {
      if (hash) {
        const el = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (el) {
          el.scrollIntoView();
          focusEl(el);
          return;
        }
        if (tries++ < 20) { timer = setTimeout(go, 50); return; }
      }
      window.scrollTo(0, 0);
      const main = document.getElementById('main');
      // Leave focus alone on the initial load so the skip link stays first.
      if (main && !initial) focusEl(main);
    };
    go();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
