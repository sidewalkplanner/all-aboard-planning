import { P } from './paths.js';
import { PAID_TIER_ENABLED, STUDY_PLANS_ENABLED } from './access.js';

// Primary navigation for the AICP prep section (header).
export const AICP_NAV = [
  { label: 'Course', to: P.course, match: [P.course, `${P.aicp}/lessons`] },
  ...(STUDY_PLANS_ENABLED ? [{ label: 'Study plan', to: P.studyPlan }] : []),
  { label: 'Practice', to: P.exams, match: [P.exams, P.run] },
  { label: 'Review', to: P.review, match: [P.review] },
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
      ...(STUDY_PLANS_ENABLED ? [{ label: 'Study plans', to: P.studyPlan }] : []),
      { label: 'Exam info', to: P.examInfo },
      { label: 'FAQ', to: P.faq },
      // Pricing appears once paid plans launch (lib/access.js).
      ...(PAID_TIER_ENABLED ? [{ label: 'Pricing', to: P.pricing }] : []),
    ],
  },
  {
    heading: 'Practice',
    links: [
      { label: 'Your dashboard', to: P.progress },
      { label: 'Practice exams', to: P.exams },
    ],
  },
  {
    heading: 'Review',
    links: [
      { label: 'Exam strategy guide', to: P.strategy },
      { label: 'Flashcards', to: P.flashcards },
      { label: 'Quick reference', to: P.quickRef },
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
