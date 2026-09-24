import { useAuth } from '../context/AuthContext';
import useMembership from './useMembership';
import { PAID_TIER_ENABLED, PUBLIC_ASSESSMENTS } from '../lib/access';
import { P } from '../lib/paths';

// Answers "can this visitor open X?" for every gated thing on the site, and
// where to send them if not (sign-in, or pricing once paid plans exist).
export default function useAccess() {
  const { user } = useAuth();
  const { isMember } = useMembership();
  const signedIn = !!user;
  const fullAccess = signedIn && (!PAID_TIER_ENABLED || isMember);
  const tierOk = (tier) => (tier === 'paid' ? fullAccess : signedIn);

  return {
    user,
    signedIn,
    fullAccess,
    paidTier: PAID_TIER_ENABLED,
    canOpenAssessment: (a) => PUBLIC_ASSESSMENTS.includes(a.id) || tierOk(a.tier),
    canReadLesson: (lesson) => tierOk(lesson.access),
    canDrill: fullAccess,
    // Where to send someone who can't open `next` (a route path, e.g. from useLocation).
    blockedTarget: (next) => (signedIn ? P.pricing : P.signinNext(next)),
  };
}
