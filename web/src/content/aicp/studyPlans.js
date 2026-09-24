// Week-by-week study schedules. `lessons` are lesson slugs from curriculum.js
// (the checker verifies them); `practice` entries are { label, to } where `to`
// is a route from lib/paths.js. Both plans cover every lesson exactly once.
import { P } from '../../lib/paths';

const diag = { label: 'Take the free diagnostic (about 2 hours, untimed)', to: P.diagnostic };
const quizA = { label: 'Warm-up Quiz A (25 questions)', to: P.runExam('q1', 'practice') };
const quizB = { label: 'Warm-up Quiz B (25 questions)', to: P.runExam('q2', 'practice') };
const drill = (name, label) => ({ label: `${label} domain drill`, to: P.runDrill(name) });
const exam = (id, n, mode) => ({ label: `Practice Exam ${n}, ${mode === 'timed' ? 'timed (3.5 hours)' : 'practice mode'}`, to: P.runExam(id, mode) });
const review = { label: 'Review every question you missed; reread the lessons they point to', to: P.progress };
const rediag = { label: 'Retake the diagnostic to confirm your weak spots have moved', to: P.diagnostic };

export const STUDY_PLANS = [
  {
    id: '8-week',
    title: '8-week plan',
    hoursPerWeek: '8 to 10 hours a week',
    who: 'For candidates with steady planning experience who want a focused, efficient review.',
    weeks: [
      { focus: 'Baseline and planning history', lessons: ['planning-history', 'planning-theory', 'urban-form-and-settlement', 'land-use-law-foundations'], practice: [diag, quizA] },
      { focus: 'Planning law and ethics', lessons: ['takings-and-exactions', 'federal-policy-and-planning', 'aicp-code-of-ethics', 'conflicts-of-interest-and-rules-of-conduct', 'solving-ethics-questions'], practice: [quizB, drill('Code of Ethics & Professional Conduct', 'Ethics')] },
      { focus: 'Making plans', lessons: ['the-planning-process', 'comprehensive-plans', 'goals-objectives-policies', 'plan-analysis-tools'], practice: [drill('Plan & Policy Development', 'Plan & Policy')] },
      { focus: 'Zoning and development regulation', lessons: ['zoning-fundamentals', 'zoning-relief-and-nonconformities', 'subdivision-and-development-review', 'growth-management-and-innovative-tools', 'implementation-math'], practice: [drill('Plan Implementation', 'Implementation')] },
      { focus: 'Finance, monitoring, and research methods', lessons: ['capital-planning-and-finance', 'monitoring-and-implementation-programs', 'research-design-and-data', 'statistics-for-planners', 'demographic-and-economic-analysis', 'spatial-analysis-and-gis'], practice: [exam('e1', 1, 'timed')] },
      { focus: 'Communication and administration', lessons: ['public-engagement-design', 'equitable-and-accessible-engagement', 'consensus-and-negotiation', 'communicating-with-decision-makers', 'project-and-contract-management', 'managing-a-planning-agency'], practice: [drill('Communication & Interaction', 'Communication'), drill('Research & Assessment Methods', 'Research')] },
      { focus: 'Leadership and areas of practice, part 1', lessons: ['leadership-in-planning', 'mentoring-and-professional-development', 'transportation-planning', 'housing-and-community-development', 'environmental-planning-and-hazards'], practice: [exam('e2', 2, 'timed')] },
      { focus: 'Areas of practice, part 2, and final review', lessons: ['economic-development', 'urban-design-and-historic-preservation', 'health-food-parks-and-regional-planning'], practice: [exam('e3', 3, 'timed'), rediag, review] },
    ],
  },
  {
    id: '12-week',
    title: '12-week plan',
    hoursPerWeek: '5 to 7 hours a week',
    who: 'For candidates balancing a full workload, or newer planners who want more time with unfamiliar material.',
    weeks: [
      { focus: 'Baseline and planning history', lessons: ['planning-history', 'planning-theory', 'urban-form-and-settlement'], practice: [diag] },
      { focus: 'Planning law', lessons: ['land-use-law-foundations', 'takings-and-exactions', 'federal-policy-and-planning'], practice: [quizA] },
      { focus: 'The AICP Code of Ethics', lessons: ['aicp-code-of-ethics', 'conflicts-of-interest-and-rules-of-conduct', 'solving-ethics-questions'], practice: [drill('Code of Ethics & Professional Conduct', 'Ethics'), drill('Fundamental Planning Knowledge', 'Fundamentals')] },
      { focus: 'Making plans', lessons: ['the-planning-process', 'comprehensive-plans', 'goals-objectives-policies', 'plan-analysis-tools'], practice: [drill('Plan & Policy Development', 'Plan & Policy')] },
      { focus: 'Zoning', lessons: ['zoning-fundamentals', 'zoning-relief-and-nonconformities', 'subdivision-and-development-review'], practice: [quizB] },
      { focus: 'Growth management, math, and finance', lessons: ['growth-management-and-innovative-tools', 'implementation-math', 'capital-planning-and-finance', 'monitoring-and-implementation-programs'], practice: [drill('Plan Implementation', 'Implementation')] },
      { focus: 'Research and assessment methods', lessons: ['research-design-and-data', 'statistics-for-planners', 'demographic-and-economic-analysis', 'spatial-analysis-and-gis'], practice: [drill('Research & Assessment Methods', 'Research'), exam('e1', 1, 'practice')] },
      { focus: 'Communication and interaction', lessons: ['public-engagement-design', 'equitable-and-accessible-engagement', 'consensus-and-negotiation', 'communicating-with-decision-makers'], practice: [drill('Communication & Interaction', 'Communication')] },
      { focus: 'Administration and leadership', lessons: ['project-and-contract-management', 'managing-a-planning-agency', 'leadership-in-planning', 'mentoring-and-professional-development'], practice: [drill('Administration & Management', 'Administration'), drill('Leadership', 'Leadership')] },
      { focus: 'Areas of practice, part 1', lessons: ['transportation-planning', 'housing-and-community-development', 'environmental-planning-and-hazards'], practice: [exam('e2', 2, 'timed')] },
      { focus: 'Areas of practice, part 2', lessons: ['economic-development', 'urban-design-and-historic-preservation', 'health-food-parks-and-regional-planning'], practice: [drill('Areas of Practice', 'Areas of Practice')] },
      { focus: 'Final review', lessons: [], practice: [exam('e3', 3, 'timed'), rediag, review] },
    ],
  },
];
