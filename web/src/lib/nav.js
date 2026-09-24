import { P } from './paths.js';
import { PAID_TIER_ENABLED } from './access.js';

// Primary navigation for the AICP prep section (header).
export const AICP_NAV = [
  { label: 'Course', to: P.course, match: [P.course, `${P.aicp}/lessons`] },
  { label: 'Study plan', to: P.studyPlan },
  { label: 'Practice exams', to: P.exams, match: [P.exams, P.run, P.drills] },
  { label: 'Diagnostic', to: P.diagnostic },
  { label: 'Progress', to: P.progress },
  { label: 'Exam info', to: P.examInfo, match: [P.examInfo, P.faq] },
  // Pricing returns to the header when paid plans launch (lib/access.js).
  ...(PAID_TIER_ENABLED ? [{ label: 'Pricing', to: P.pricing }] : []),
];

// Footer sitemap, grouped. The last group is firm-level; when the consulting
// side launches, add its pages there (or as a new group).
export const FOOTER_NAV = [
  {
    heading: 'AICP exam prep',
    links: [
      { label: 'Prep home', to: P.aicp },
      { label: 'Course overview', to: P.course },
      { label: 'Study plans', to: P.studyPlan },
      { label: 'Exam info', to: P.examInfo },
      { label: 'FAQ', to: P.faq },
      { label: PAID_TIER_ENABLED ? 'Pricing' : 'Pricing (it\u2019s free)', to: P.pricing },
    ],
  },
  {
    heading: 'Practice',
    links: [
      { label: 'Diagnostic', to: P.diagnostic },
      { label: 'Practice exams & quizzes', to: P.exams },
      { label: 'Domain drills', to: P.drills },
      { label: 'Your progress', to: P.progress },
    ],
  },
  {
    heading: 'All Aboard Planning',
    links: [
      { label: 'About', to: P.about },
      { label: 'Contact', to: P.contact },
    ],
  },
];

export const isActive = (item, pathname) =>
  (item.match || [item.to]).some((m) => pathname === m || pathname.startsWith(m + '/') || pathname.startsWith(m + '?'));
