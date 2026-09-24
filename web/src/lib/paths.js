// Every route in the site, in one place. Build links from these rather than
// string literals so a future restructure is a one-file change.
//
// Firm-level pages live at the root; everything AICP-prep lives under
// /aicp so a consulting homepage can take "/" later without moving anything.
export const AICP = '/aicp';

export const P = {
  home: '/',
  about: '/about',
  contact: '/contact',

  aicp: AICP,
  course: `${AICP}/course`,
  domain: (id) => `${AICP}/course#${id}`,
  lesson: (slug) => `${AICP}/lessons/${slug}`,
  studyPlan: `${AICP}/study-plan`,
  examInfo: `${AICP}/exam-info`,
  faq: `${AICP}/faq`,
  pricing: `${AICP}/pricing`,
  exams: `${AICP}/exams`,
  diagnostic: `${AICP}/diagnostic`,
  drills: `${AICP}/drills`,
  progress: `${AICP}/progress`,
  signin: `${AICP}/signin`,

  run: `${AICP}/exam/run`,
  runExam: (aid, mode = 'practice') => `${AICP}/exam/run?aid=${aid}&mode=${mode}`,
  runDrill: (domainName) => `${AICP}/exam/run?drill=${encodeURIComponent(domainName)}`,
  runSet: (slug) => `${AICP}/exam/run?set=${encodeURIComponent(slug)}&mode=practice`,
};

// Routes that render dark-mode-capable screens (the header follows their theme).
export const isDarkCapableRoute = (pathname) =>
  pathname.startsWith(P.run) || pathname.startsWith(P.diagnostic);
