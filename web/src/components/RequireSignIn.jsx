import AccessGate from './AccessGate';
import useAccess from '../hooks/useAccess';
import usePageTitle from '../hooks/usePageTitle';

// Route wrapper: renders the page only for signed-in visitors; otherwise a
// full-page sign-in prompt (with the page's single <h1>).
export default function RequireSignIn({ children, title, what }) {
  const { signedIn } = useAccess();
  usePageTitle(signedIn ? undefined : title);
  if (signedIn) return children;
  return (
    <div className="container-narrow" style={{ paddingTop: 40, paddingBottom: 80 }}>
      <AccessGate what={what} headingLevel={1} />
    </div>
  );
}
