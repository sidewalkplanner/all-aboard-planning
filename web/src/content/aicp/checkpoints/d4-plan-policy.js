// Domain 4: Plan and Policy Development. Original checkpoint questions,
// written for the lessons only (none appear in the practice exams).
export default {
  // the-planning-process
  'cp:process-first-step': {
    text: 'After a comprehensive plan update has been scoped, what is usually the first substantive step?',
    options: [
      'Drafting the future land use map',
      'Writing the implementation program',
      'Inventorying and analyzing existing conditions and trends',
      'Holding the adoption hearing',
    ],
    correct: 2,
    explanation: 'Existing conditions come before goals, maps, or policies. In practice the steps overlap and loop back, but the analysis of what is there now is the foundation for the rest.',
  },
  'cp:process-hazards-early': {
    text: 'Why should floodplains, steep slopes, and other natural constraints be analyzed early, before a preferred land use pattern is chosen?',
    options: [
      'They limit where growth can safely go, so they should shape the land use pattern rather than be squeezed around it',
      'They are the cheapest data to collect',
      'Federal law requires them to be the first chapter of every plan',
      'So the constraints can be adjusted to fit the preferred pattern',
    ],
    correct: 0,
    explanation: 'Hazards and natural constraints determine where development is safe. Analyzing them first lets them shape the plan instead of being treated as an afterthought.',
  },
  'cp:process-multivariate': {
    text: 'A plan update adds housing capacity near transit stations. Which statement best reflects planning as multivariate analysis?',
    options: [
      'Only the housing element needs to change',
      'The change also affects school enrollment, traffic, tree canopy, and the tax base',
      'The zoning map updates automatically once the plan is adopted',
      'Other elements can be reviewed at the next update',
    ],
    correct: 1,
    explanation: 'A comprehensive plan juggles many variables at once, and changing one affects the others. The planner traces those effects and surfaces the tradeoffs for decision-makers.',
  },
  'cp:process-amendment': {
    text: 'A city wants to redesignate a single parcel on its future land use map, in a way that is consistent with the plan’s overall direction. The right tool is:',
    options: ['A full plan update', 'A variance', 'A departmental strategic plan', 'A plan amendment'],
    correct: 3,
    explanation: 'Plan amendments handle narrow changes consistent with the plan’s direction. A full update is for when conditions have diverged from the plan’s assumptions or its horizon is running out.',
  },
  'cp:process-swot': {
    text: 'Which tool is most commonly associated with departmental strategic planning?',
    options: ['A cohort-component projection', 'A location quotient', 'A SWOT analysis (strengths, weaknesses, opportunities, threats)', 'A fiscal impact analysis'],
    correct: 2,
    explanation: 'Strategic plans focus an organization on a few near-term priorities, often using a SWOT analysis. Comprehensive plans cover the whole community over a long horizon.',
  },

  // comprehensive-plans
  'cp:comp-flu-map': {
    text: 'What does a future land use map show that a zoning map doesn’t?',
    options: [
      'The intended pattern of land uses over the plan horizon',
      'The regulations that apply to each parcel today',
      'Who owns each parcel',
      'Where building permits were issued last year',
    ],
    correct: 0,
    explanation: 'The future land use map is part of the plan and shows where the community intends to go. The zoning map shows the rules in force now. The two differ where the plan anticipates change.',
  },
  'cp:comp-internal': {
    text: 'A plan’s housing element calls for 5,000 new homes, but its future land use map leaves no room for them. This is a failure of:',
    options: ['Public participation', 'Rough proportionality', 'Internal consistency', 'Content neutrality'],
    correct: 2,
    explanation: 'A plan’s elements must work together. A housing target that the land use map can’t accommodate is an internal inconsistency.',
  },
  'cp:comp-sustaining': {
    text: 'How are APA’s Sustaining Places standards for comprehensive plans best used?',
    options: [
      'As a checklist of whether a plan addresses the full range of community needs',
      'As a zoning code that replaces local regulations',
      'As a legal requirement in every state',
      'As a condition of federal transportation funding',
    ],
    correct: 0,
    explanation: 'The standards organize sustainability principles, such as a livable built environment, a resilient economy, and interwoven equity, into a checklist for reviewing what a plan covers.',
  },
  'cp:comp-rezone-to-plan': {
    text: 'In a consistency state, a parcel’s zoning conflicts with its designation on the adopted comprehensive plan. What is the usual fix?',
    options: [
      'Grant the owner a variance',
      'Rezone the parcel to match the plan',
      'Leave the conflict in place until someone challenges it',
      'Treat the zoning as controlling, since it is the regulation',
    ],
    correct: 1,
    explanation: 'In consistency states the plan comes first, so zoning is brought into line with it. A variance requires a hardship and isn’t a tool for resolving plan conflicts.',
  },
  'cp:comp-resolution': {
    text: 'Compared with an area plan adopted as an amendment to the comprehensive plan, an area plan adopted only by council resolution as a guidance document:',
    options: [
      'Carries more weight, because it is more detailed',
      'Replaces the comprehensive plan for that area',
      'Generally carries less weight in a consistency review',
      'Carries exactly the same legal weight',
    ],
    correct: 2,
    explanation: 'An area plan adopted as a plan amendment carries the comprehensive plan’s legal weight. One adopted merely by resolution is guidance and generally counts for less.',
  },

  // goals-objectives-policies
  'cp:goals-policy-level': {
    text: '"The city shall allow duplexes and triplexes in all residential districts." In the plan hierarchy, this statement is:',
    options: ['A vision', 'A goal', 'An objective', 'A policy'],
    correct: 3,
    explanation: 'A policy states the course of action the jurisdiction commits to follow in its decisions. A goal is broad, and an objective is a measurable, time-bound target.',
  },
  'cp:goals-vision-first': {
    text: 'Why does visioning usually come before goal-setting?',
    options: [
      'It produces measurable, time-bound targets',
      'It builds a broad, shared picture of the desired future before the details are debated',
      'It assigns each task to a responsible department',
      'Federal law requires it',
    ],
    correct: 1,
    explanation: 'Visioning is deliberately broad: it describes the long-range future people want. Goal-setting then turns that picture into organized statements of intent.',
  },
  'cp:goals-redlining': {
    text: 'A plan wants to address the legacy of redlining in its disinvested neighborhoods. Which approach does an equity lens call for?',
    options: [
      'Acknowledge the history in the plan’s introduction',
      'Report only citywide averages to avoid singling out neighborhoods',
      'Set measurable objectives for those neighborhoods, such as tree canopy, sidewalk completeness, and park access, and track them over time',
      'Leave equity for a separate study after adoption',
    ],
    correct: 2,
    explanation: 'An equity lens disaggregates data and sets measurable objectives for disparities, then tracks progress. Acknowledging the history without targets changes little.',
  },

  // plan-analysis-tools
  'cp:analysis-robust': {
    text: 'In scenario planning, a "robust" strategy is one that:',
    options: [
      'Works best in the single most likely scenario',
      'Predicts which scenario will come true',
      'Costs the least to carry out',
      'Performs acceptably across all of the scenarios',
    ],
    correct: 3,
    explanation: 'Scenarios aren’t predictions. Robust strategies hold up whichever future unfolds, and signposts show which one is emerging.',
  },
  'cp:analysis-marginal': {
    text: 'Which fiscal impact method estimates the cost of serving additional growth while accounting for existing excess or deficient capacity?',
    options: ['Per capita multiplier', 'Case study', 'Marginal cost', 'Comparable city'],
    correct: 2,
    explanation: 'The marginal cost method looks at what new growth actually adds, considering spare or strained capacity. It is more accurate than average-cost methods but data-intensive.',
  },
  'cp:analysis-scope2': {
    text: 'In a greenhouse gas inventory, emissions from the electricity a city buys to power its own buildings are classified as:',
    options: ['Scope 1', 'Scope 2', 'Scope 3', 'Community-wide waste emissions'],
    correct: 1,
    explanation: 'Scope 2 covers purchased electricity. Scope 1 is direct emissions, such as fuel burned in the city’s fleet, and Scope 3 is other indirect emissions.',
  },
};
