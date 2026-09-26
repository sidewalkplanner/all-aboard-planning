import { P } from './paths.js';
import { PAID_TIER_ENABLED, STUDY_PLANS_ENABLED } from './access.js';

// Primary navigation for the AICP prep section (header). Each item names one
// kind of thing, and the pages use the same names (Lessons, Practice exams, ...).
// `exact` items are active only on their own path; `match` lists other paths
// that count as that section.
export const AICP_NAV = [
  { label: 'Overview', to: P.aicp, exact: true },
  { label: 'Lessons', to: P.course, match: [P.course, `${P.aicp}/lessons`] },
  { label: 'Practice exams', to: P.exams, match: [P.exams, P.run] },
  { label: 'Flashcards', to: P.flashcards },
  { label: 'Study guides', to: P.review, exact: true, match: [P.strategy, P.quickRef] },
  ...(STUDY_PLANS_ENABLED ? [{ label: 'Study plan', to: P.studyPlan }] : []),
  { label: 'Exam info', to: P.examInfo, match: [P.examInfo, P.faq] },
  // Pricing returns to the header when paid plans launch (lib/access.js).
  ...(PAID_TIER_ENABLED ? [{ label: 'Pricing', to: P.pricing }] : []),
  { label: 'About', to: P.about },
];

// Footer sitemap, grouped. The last group is firm-level; when the consulting
// side launches, add its pages there (or as a new group).
export const FOOTER_NAV = [
  {
    heading: 'Study',
    links: [
      { label: 'Overview', to: P.aicp },
      { label: 'Lessons', to: P.course },
      { label: 'Practice exams', to: P.exams },
      { label: 'Flashcards', to: P.flashcards },
      { label: 'Your dashboard', to: P.progress },
      ...(STUDY_PLANS_ENABLED ? [{ label: 'Study plans', to: P.studyPlan }] : []),
    ],
  },
  {
    heading: 'Guides',
    links: [
      { label: 'Exam strategy guide', to: P.strategy },
      { label: 'Quick reference', to: P.quickRef },
      { label: 'Exam info', to: P.examInfo },
      { label: 'FAQ', to: P.faq },
      // Pricing appears once paid plans launch (lib/access.js).
      ...(PAID_TIER_ENABLED ? [{ label: 'Pricing', to: P.pricing }] : []),
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

const under = (m, pathname) => pathname === m || pathname.startsWith(m + '/') || pathname.startsWith(m + '?');

export const isActive = (item, pathname) => {
  if (item.exact && pathname === item.to) return true;
  const paths = item.match || (item.exact ? [] : [item.to]);
  return paths.some((m) => under(m, pathname));
};
