import { useUnlock } from '../context/UnlockContext';

// MEMBERSHIP PLACEHOLDER: the single place that answers "does this visitor
// have Full Access?". Today it reads the session-only demo toggle in
// UnlockContext. Swap in the real membership check here.
export default function useMembership() {
  const { unlocked, unlock } = useUnlock();
  return { isMember: unlocked, demoUnlock: unlock };
}
