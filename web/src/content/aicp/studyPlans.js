// Week-by-week study schedules. `lessons` are lesson slugs from curriculum.js
// (the checker verifies them); `practice` entries are { label, to } where `to`
// is a route from lib/paths.js. Both plans cover every lesson exactly once.
import { P } from '../../lib/paths.js';

const diag = { label: 'Take the diagnostic (about 2 hours, untimed)', to: P.diagnostic };
// Revisit a domain's lessons: reread any section whose checkpoint you missed.
const revisit = (id, label) => ({ label: `Revisit the ${label} lessons: redo any checkpoint you missed`, to: P.domain(id) });
const exam = (id, n, mode) => ({ label: `Practice Exam ${n}, ${mode === 'timed' ? 'timed (3.5 hours)' : 'practice mode'}`, to: P.runExam(id, mode) });
const review = { label: 'Review every question you missed; reread the lessons they point to', to: P.progress };
const strategy = { label: 'Read the exam strategy guide', to: P.strategy };
const cards = (label) => ({ label: `Flashcards: ${label}`, to: P.flashcards });
const quickRef = { label: 'Work through the quick reference: cases, laws, people, formulas', to: P.quickRef };
const rediag = { label: 'Retake the diagnostic to confirm your weak spots have moved', to: P.diagnostic };

export const STUDY_PLANS = [
  {
    id: '8-week',
    title: '8-week plan',
    hoursPerWeek: '8 to 10 hours a week',
    who: 'For candidates with steady planning experience who want a focused, efficient review.',
    weeks: [
      { focus: 'Baseline and planning history', lessons: ['planning-history', 'planning-theory', 'urban-form-and-settlement', 'land-use-law-foundations'], practice: [strategy, diag] },
      { focus: 'Planning law and ethics', lessons: ['takings-and-exactions', 'federal-policy-and-planning', 'aicp-code-of-ethics', 'conflicts-of-interest-and-rules-of-conduct', 'solving-ethics-questions'], practice: [revisit('ethics', 'Ethics'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Making plans', lessons: ['the-planning-process', 'comprehensive-plans', 'goals-objectives-policies', 'plan-analysis-tools'], practice: [revisit('plan-policy', 'Plan & Policy'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Zoning and development regulation', lessons: ['zoning-fundamentals', 'zoning-relief-and-nonconformities', 'subdivision-and-development-review', 'growth-management-and-innovative-tools', 'implementation-math'], practice: [revisit('implementation', 'Implementation'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Finance, monitoring, and research methods', lessons: ['capital-planning-and-finance', 'monitoring-and-implementation-programs', 'research-design-and-data', 'statistics-for-planners', 'demographic-and-economic-analysis', 'spatial-analysis-and-gis'], practice: [exam('e1', 1, 'timed'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Communication and administration', lessons: ['public-engagement-design', 'equitable-and-accessible-engagement', 'consensus-and-negotiation', 'communicating-with-decision-makers', 'project-and-contract-management', 'managing-a-planning-agency'], practice: [revisit('communication', 'Communication'), revisit('research', 'Research'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Leadership and areas of practice, part 1', lessons: ['leadership-in-planning', 'mentoring-and-professional-development', 'transportation-planning', 'housing-and-community-development', 'environmental-planning-and-hazards'], practice: [exam('e2', 2, 'timed'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Areas of practice, part 2, and final review', lessons: ['economic-development', 'urban-design-and-historic-preservation', 'health-food-parks-and-regional-planning', 'rural-small-town-and-tribal-planning', 'infrastructure-energy-and-water-planning'], practice: [exam('e3', 3, 'timed'), quickRef, rediag, review, cards('your weakest cards, every day this week')] },
    ],
  },
  {
    id: '12-week',
    title: '12-week plan',
    hoursPerWeek: '5 to 7 hours a week',
    who: 'For candidates balancing a full workload, or newer planners who want more time with unfamiliar material.',
    weeks: [
      { focus: 'Baseline and planning history', lessons: ['planning-history', 'planning-theory', 'urban-form-and-settlement'], practice: [strategy, diag] },
      { focus: 'Planning law', lessons: ['land-use-law-foundations', 'takings-and-exactions', 'federal-policy-and-planning'], practice: [revisit('fundamentals', 'Fundamentals'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'The AICP Code of Ethics', lessons: ['aicp-code-of-ethics', 'conflicts-of-interest-and-rules-of-conduct', 'solving-ethics-questions'], practice: [revisit('ethics', 'Ethics'), revisit('fundamentals', 'Fundamentals'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Making plans', lessons: ['the-planning-process', 'comprehensive-plans', 'goals-objectives-policies', 'plan-analysis-tools'], practice: [revisit('plan-policy', 'Plan & Policy'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Zoning', lessons: ['zoning-fundamentals', 'zoning-relief-and-nonconformities', 'subdivision-and-development-review'], practice: [revisit('implementation', 'Implementation'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Growth management, math, and finance', lessons: ['growth-management-and-innovative-tools', 'implementation-math', 'capital-planning-and-finance', 'monitoring-and-implementation-programs'], practice: [revisit('implementation', 'Implementation'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Research and assessment methods', lessons: ['research-design-and-data', 'statistics-for-planners', 'demographic-and-economic-analysis', 'spatial-analysis-and-gis'], practice: [revisit('research', 'Research'), exam('e1', 1, 'practice'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Communication and interaction', lessons: ['public-engagement-design', 'equitable-and-accessible-engagement', 'consensus-and-negotiation', 'communicating-with-decision-makers'], practice: [revisit('communication', 'Communication'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Administration and leadership', lessons: ['project-and-contract-management', 'managing-a-planning-agency', 'leadership-in-planning', 'mentoring-and-professional-development'], practice: [revisit('administration', 'Administration'), revisit('leadership', 'Leadership'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Areas of practice, part 1', lessons: ['transportation-planning', 'housing-and-community-development', 'environmental-planning-and-hazards'], practice: [exam('e2', 2, 'timed'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Areas of practice, part 2', lessons: ['economic-development', 'urban-design-and-historic-preservation', 'health-food-parks-and-regional-planning', 'rural-small-town-and-tribal-planning', 'infrastructure-energy-and-water-planning'], practice: [revisit('practice', 'Areas of Practice'), cards('10 minutes a day on this week\'s topics')] },
      { focus: 'Final review', lessons: [], practice: [exam('e3', 3, 'timed'), quickRef, rediag, review, cards('your weakest cards, every day this week')] },
    ],
  },
];

// ---------------------------------------------------------------- progress
// Keys and helpers used by the study plan page and the dashboard.
export const planById = (id) => STUDY_PLANS.find((p) => p.id === id) || null;
export const planItemKey = (planId, weekIndex, label) => `${planId}:w${weekIndex}:${label}`;

// For each week: lessons done (from lesson completion) and practice items
// ticked (from planChecks). `current` is the first week that isn't finished.
export function planProgress(plan, study) {
  const weeks = plan.weeks.map((w, i) => {
    const lessonsDone = w.lessons.filter((s) => study.completed[s]).length;
    const practiceDone = w.practice.filter((p) => study.planChecks[planItemKey(plan.id, i, p.label)]).length;
    const total = w.lessons.length + w.practice.length;
    return { lessonsDone, practiceDone, done: lessonsDone + practiceDone, total, complete: lessonsDone + practiceDone === total };
  });
  const current = weeks.findIndex((w) => !w.complete);
  const done = weeks.reduce((s, w) => s + w.done, 0);
  const total = weeks.reduce((s, w) => s + w.total, 0);
  return { weeks, current: current === -1 ? null : current, done, total };
}
