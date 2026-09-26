// ACCESS SETTINGS: the one place that decides who can open what.
//
// Today the whole course is free with an account. Assessments listed in
// PUBLIC_ASSESSMENTS could be taken without signing in (none today).
//
// To launch paid plans later, set PAID_TIER_ENABLED = true. Everything tagged
// `access: 'paid'` (lessons in curriculum.js) or `tier: 'paid'` (exams in
// data/domains.js) then needs Full Access, which comes
// from hooks/useMembership.js. Pricing copy and "Free / Full Access" labels
// reappear automatically.
export const PAID_TIER_ENABLED = false;

// Assessments open to everyone without an account. Empty: the warm-up quizzes
// were a free teaser for a paid course, and were retired once it became free.
export const PUBLIC_ASSESSMENTS = [];

// The 8- and 12-week study plans (pages/aicp/StudyPlan.jsx, content/aicp/studyPlans.js)
// are hidden for now: while false, /aicp/study-plan redirects to the course, and the
// nav, dashboard card, and links to the plans don't render. Set true to bring them back
// (then restore the plan links in the Markdown pages, which can't read this switch).
export const STUDY_PLANS_ENABLED = false;
