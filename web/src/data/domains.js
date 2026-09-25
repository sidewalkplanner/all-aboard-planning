// The nine AICP Exam Content Outline domains and their exam weight.
export const DOMAINS = [
  { name: 'Fundamental Planning Knowledge', short: 'Fundamentals', pct: 15, blurb: 'History, theory, law, and the foundations of the profession.' },
  { name: 'Plan & Policy Development', short: 'Plan & Policy', pct: 15, blurb: 'Visioning, goals and objectives, plan elements, and policy tools.' },
  { name: 'Communication & Interaction', short: 'Communication', pct: 13, blurb: 'Engagement, facilitation, equity in outreach, and public process.' },
  { name: 'Plan Implementation', short: 'Implementation', pct: 12, blurb: 'Zoning, subdivision, exactions, monitoring, and regulatory practice.' },
  { name: 'Areas of Practice', short: 'Areas of Practice', pct: 12, blurb: 'Transportation, housing, environment, hazards, and economic development.' },
  { name: 'Research & Assessment Methods', short: 'Research', pct: 11, blurb: 'Projections, statistics, GIS, and quantitative analysis.' },
  { name: 'Code of Ethics & Professional Conduct', short: 'Ethics', pct: 10, blurb: 'Aspirational principles, Rules of Conduct, and conflicts of interest.' },
  { name: 'Administration & Management', short: 'Administration', pct: 6, blurb: 'Budgeting, procurement, supervision, and office operations.' },
  { name: 'Leadership', short: 'Leadership', pct: 6, blurb: 'Leading teams, ethical advocacy, mentoring, and public trust.' }
];

export const PRICE = '$59';

export const ASSESSMENTS = [
  { id: 'e1', tier: 'paid', title: 'Practice Exam 1', size: 170, mins: 210, blurb: 'The full-length exam, weighted to the nine domains of the APA content outline, with scenario clusters and combination items.', taken: 'No attempts yet' },
  { id: 'e2', tier: 'paid', title: 'Practice Exam 2', size: 170, mins: 210, blurb: 'A second full-length exam, all original items, delivered in randomized order across the nine domains.', taken: 'No attempts yet' },
  { id: 'e3', tier: 'paid', title: 'Practice Exam 3', size: 170, mins: 210, blurb: 'A third full-length exam, weighted to the nine domains, with eight scenario clusters and two data exhibits. Deepest of the three on planning law.', taken: 'No attempts yet' }
];

// Sample question bank used only as an ultimate fallback (should never be
// hit in production since the real banks are bundled directly).
export const QUESTIONS = [
  {
    domain: 'Plan Making and Implementation', difficulty: 'Medium',
    text: "A municipality's adopted comprehensive plan designates a parcel for low-density residential use, but the zoning map still permits light industrial. State law requires zoning to be consistent with the adopted plan. What is the planner's most appropriate first step?",
    options: [
      'Approve a pending light industrial permit because the use is vested under existing zoning',
      'Initiate a rezoning to bring the zoning map into consistency with the comprehensive plan',
      'Recommend that the owner apply for a use variance to continue industrial operations',
      'Amend the comprehensive plan to redesignate the parcel for light industrial use'
    ],
    correct: 1,
    explanation: 'In a consistency state, the comprehensive plan governs and the zoning map is the implementing tool. The planner corrects the inconsistency by initiating a rezoning. A variance is inappropriate because it requires a hardship finding and cannot be used to grant a use the plan does not support.'
  },
  {
    domain: 'Areas of Practice', difficulty: 'Hard',
    text: 'In Village of Euclid v. Ambler Realty Co. (1926), the U.S. Supreme Court upheld comprehensive zoning primarily on what grounds?',
    options: [
      'Zoning constitutes a taking that requires just compensation',
      'Zoning is a valid exercise of the police power to protect public health, safety, and welfare',
      'Zoning is authorized under the Commerce Clause',
      'Zoning is permissible only when it advances a legally adopted comprehensive plan'
    ],
    correct: 1,
    explanation: 'Euclid established that comprehensive zoning is a legitimate exercise of the police power. The Court found the ordinance was not clearly arbitrary or unreasonable and bore a substantial relation to public health, safety, morals, and general welfare.'
  },
  {
    domain: 'Public Participation and Social Justice', difficulty: 'Easy',
    text: 'A planning department wants residents of a historically excluded neighborhood to shape a corridor plan rather than react to a finished draft. Which engagement approach best fits that goal?',
    options: [
      'A public hearing held after the draft plan is released',
      'A mailed survey with fixed-choice questions about the draft',
      'A multi-day design charrette held in the neighborhood with residents as participants',
      'A project website with a comment form open through the review period'
    ],
    correct: 2,
    explanation: "A charrette brings residents into the generative phase of design, when decisions are still open. Hearings, surveys about a draft, and comment forms all collect reaction to work already done, which sits lower on Arnstein’s ladder of citizen participation."
  },
  {
    domain: 'Spatial Areas of Practice', difficulty: 'Medium',
    text: 'A regional agency is allocating growth to station areas along a new light rail line. Which tool most directly ties local land use decisions to that regional allocation?',
    options: [
      'A regional housing needs allocation adopted with local implementation requirements',
      'A municipal capital improvements program',
      'A neighborhood conservation district overlay',
      'A design review ordinance for station-area buildings'
    ],
    correct: 0,
    explanation: 'A housing needs allocation distributes regional growth targets to local governments and obligates them to plan for that share. The other tools operate at the municipal or neighborhood scale and do not carry a regional allocation.'
  },
  {
    domain: 'Functional Topics of Planning', difficulty: 'Medium',
    text: 'A city replaces intersection level of service (LOS) with vehicle miles traveled (VMT) as its transportation impact metric. What is the most likely planning consequence?',
    options: [
      'Suburban greenfield projects become easier to approve',
      'Infill projects near transit face lower measured impacts than dispersed projects',
      'Roadway widening becomes the preferred mitigation measure',
      'Pedestrian and bicycle projects require additional impact analysis'
    ],
    correct: 1,
    explanation: 'VMT measures how much driving a project induces, so compact infill near transit scores well while dispersed development scores poorly. LOS did the reverse, penalizing infill for congestion and favoring widening as mitigation.'
  }
];

export const LETTERS = ['A', 'B', 'C', 'D'];
