// ACCESS SETTINGS: the one place that decides who can open what.
//
// Today the whole course is free with an account. Only the assessments in
// PUBLIC_ASSESSMENTS can be taken without signing in.
//
// To launch paid plans later, set PAID_TIER_ENABLED = true. Everything tagged
// `access: 'paid'` (lessons in curriculum.js) or `tier: 'paid'` (exams in
// data/domains.js), plus domain drills, then needs Full Access, which comes
// from hooks/useMembership.js. Pricing copy and "Free / Full Access" labels
// reappear automatically.
export const PAID_TIER_ENABLED = false;

// Open to everyone, no account: Warm-up Quiz A.
export const PUBLIC_ASSESSMENTS = ['q1'];
