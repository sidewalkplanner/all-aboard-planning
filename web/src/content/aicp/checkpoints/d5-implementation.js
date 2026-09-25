// Domain 5: Plan Implementation and Administration. Original checkpoint
// questions, written for the lessons only (none appear in the practice exams).
export default {
  // zoning-fundamentals
  'cp:zoning-plan-vs-code': {
    text: 'Which statement best describes how a comprehensive plan and a zoning ordinance relate?',
    options: [
      'They are two names for the same document',
      'The plan sets long-range policy; the zoning ordinance turns it into enforceable, parcel-level rules',
      'The zoning ordinance sets policy and the plan enforces it parcel by parcel',
      'Once a zoning ordinance is adopted, the plan no longer matters',
    ],
    correct: 1,
    explanation: 'The comprehensive plan is a policy guide. The zoning ordinance is a regulation that implements it, one of several implementation tools alongside subdivision rules, the CIP, and the official map.',
  },
  'cp:zoning-accessory': {
    text: 'A homeowner builds a detached garage behind a single-family house in a residential district. In zoning terms, the garage is most likely:',
    options: [
      'A conditional use',
      'A prohibited use',
      'A nonconforming use',
      'An accessory use',
    ],
    correct: 3,
    explanation: 'An accessory use is customarily incidental and subordinate to the principal use on the same lot. Detached garages, home occupations, and accessory dwelling units are common examples.',
  },
  'cp:zoning-floating': {
    text: 'An ordinance describes a "regional mixed-use center" district in its text, but the district appears nowhere on the zoning map until an owner applies and meets its criteria. This is a:',
    options: [
      'Floating zone',
      'Overlay district',
      'Nonconforming district',
      'Conditional use',
    ],
    correct: 0,
    explanation: 'A floating zone is written into the text but not mapped. It "lands" on a property through a rezoning once an owner applies and meets its criteria, which suits uses whose location cannot be predicted in advance.',
  },

  // zoning-relief-and-nonconformities
  'cp:relief-financial': {
    text: 'An owner asks for a variance to add two apartments to a lot, explaining that the extra units would bring in more rent. The lot is the same shape and size as every other lot on the block. How should the request fare?',
    options: [
      'It should be granted, because earning a return is a reasonable use',
      'It should be granted if the neighbors do not object',
      'It should be denied: financial gain alone is not a hardship, and nothing about the lot is unique',
      'It should be granted as an area variance, which needs no findings',
    ],
    correct: 2,
    explanation: 'A variance requires a hardship arising from conditions unique to the property. The ability to earn more money is not enough, and conditions shared by the whole block point to a rezoning, not a variance.',
  },
  'cp:relief-fasano-burden': {
    text: 'Under the Fasano approach to site-specific rezonings, which of the following is true?',
    options: [
      'The rezoning is presumed valid if the question is fairly debatable',
      'The applicant bears the burden of proving the change is justified',
      'No hearing is required because the decision is legislative',
      'The decision may be made without regard to the comprehensive plan',
    ],
    correct: 1,
    explanation: 'Fasano treats site-specific rezonings as quasi-judicial. The applicant carries the burden of proof, the change must be consistent with the plan, parties get procedural protections, and the decision needs written findings.',
  },
  'cp:relief-spot-defensible': {
    text: 'A city rezones one small parcel for a neighborhood grocery store. Which fact would most help the city defend the rezoning against a spot-zoning claim?',
    options: [
      'The owner requested the rezoning in writing',
      'The parcel is smaller than an acre',
      'The owner will earn a higher return on the property',
      'The comprehensive plan calls for neighborhood-serving retail at that location',
    ],
    correct: 3,
    explanation: 'Small-parcel rezonings are not automatically illegal. They are defensible when they implement the plan and serve a public purpose; the vice of spot zoning is singling out one parcel mainly for the owner’s benefit.',
  },
  'cp:relief-rebuild': {
    text: 'A legal nonconforming salvage yard in a residential district is 70 percent destroyed by fire. The ordinance bars rebuilding nonconformities destroyed beyond 50 percent of their value. What typically follows?',
    options: [
      'The salvage yard may not be rebuilt, and future use of the site must conform',
      'The owner may rebuild as long as the yard is no larger than before',
      'The owner may rebuild and expand to recover the loss',
      'The owner must be compensated before any restriction applies',
    ],
    correct: 0,
    explanation: 'Ordinances aim for nonconformities to fade away over time. Once destruction passes the threshold, the right to rebuild the nonconforming use is lost, and the site generally must be used in conformity with current zoning.',
  },
  'cp:relief-moratorium-weak': {
    text: 'Which development moratorium is most vulnerable to legal challenge?',
    options: [
      'A six-month pause on new subdivisions while a sewer capacity study is completed',
      'A one-year pause on building in a mapped floodplain while new flood rules are drafted',
      'An open-ended halt on all new building permits with no study or work plan',
      'A nine-month pause on new drive-throughs in one corridor while an area plan is adopted',
    ],
    correct: 2,
    explanation: 'Courts uphold moratoria that are limited in duration and scope, tied to an identified regulatory purpose, and pursued diligently. An indefinite, citywide halt with no work plan fails all three tests.',
  },

  // subdivision-and-development-review
  'cp:subdiv-preliminary': {
    text: 'At which stage of the typical subdivision process do lot layout, street pattern, utilities, grading, and drainage receive their main design review?',
    options: [
      'Final plat',
      'Acceptance and maintenance',
      'Recording with the county recorder',
      'Preliminary plat',
    ],
    correct: 3,
    explanation: 'The preliminary plat is the main design review, often approved by the planning commission with conditions. The final plat that follows is the precise surveyed map that legally creates the lots.',
  },
  'cp:subdiv-popular': {
    text: 'A popular project conflicts with the adopted plan, and the council is likely to approve it anyway. What is the best role for the staff report?',
    options: [
      'State the inconsistency clearly so that any plan amendment is made knowingly',
      'Leave out the inconsistency, since the outcome is already clear',
      'Recommend approval without analysis to avoid appearing obstructive',
      'Refuse to prepare a report until the plan is amended',
    ],
    correct: 0,
    explanation: 'The planner reports the inconsistency even when a project is popular. Decision-makers may still amend the plan, but they should do so with full knowledge of the conflict.',
  },
  'cp:subdiv-vesting-statute': {
    text: 'How do some states change the common law vested-rights rule by statute?',
    options: [
      'By abolishing vested rights entirely',
      'By vesting rights earlier, for example at the filing of a complete application or approval of a preliminary plat',
      'By vesting rights only after the certificate of occupancy is issued',
      'By letting neighbors decide when rights vest',
    ],
    correct: 1,
    explanation: 'The common law rule vests rights after substantial good-faith expenditures under a valid permit. Some states move that point earlier by statute, giving developers certainty sooner.',
  },
  'cp:subdiv-da-benefits': {
    text: 'In a development agreement, what does the local government typically receive in exchange for giving the developer certainty?',
    options: [
      'A waiver of the jurisdiction’s statutory limits',
      'The right to change the standards at any time during the agreement',
      'Public benefits such as infrastructure, affordable housing, parks, or phasing commitments',
      'Exemption from public hearings on the project',
    ],
    correct: 2,
    explanation: 'Development agreements lock in standards for a defined period in return for public benefits. They are adopted through a public process and must stay within the jurisdiction’s statutory authority.',
  },
  'cp:subdiv-map-limit': {
    text: 'Why do many states limit how long an official map can reserve private land for a future street or park?',
    options: [
      'Because official maps have no legal effect',
      'Because the reservation can restrict private land for long periods, so the government must eventually acquire it or release it',
      'Because the federal government must approve every reservation',
      'Because reserved land cannot be taxed',
    ],
    correct: 1,
    explanation: 'An official map keeps planned public improvements from being built over, but a reservation that lasts indefinitely places a heavy burden on the owner. Time limits force a decision to acquire or release.',
  },

  // growth-management-and-innovative-tools
  'cp:growth-regulating-plan': {
    text: 'In a form-based code, what is the regulating plan?',
    options: [
      'A map showing where the different form standards apply',
      'A list of permitted and prohibited uses by district',
      'The jurisdiction’s capital improvements program',
      'A schedule of impact fees',
    ],
    correct: 0,
    explanation: 'The regulating plan maps where each set of form standards applies. Building form standards, street standards, and frontage types then govern what gets built there, with use regulated only broadly.',
  },
  'cp:growth-performance-any-use': {
    text: 'Under a performance zoning system, a proposed use not named anywhere in the ordinance would most likely be:',
    options: [
      'Prohibited, because it is not on the permitted-use list',
      'Allowed only through a use variance',
      'Allowed only in a floating zone',
      'Allowed if it meets the standards for traffic, noise, impervious surface, and other impacts',
    ],
    correct: 3,
    explanation: 'Performance zoning regulates measurable impacts rather than listing permitted uses. Any use that meets the performance standards is allowed, which is flexible but can be complex to administer.',
  },
  'cp:growth-pdr': {
    text: 'How does purchase of development rights (PDR) differ from transfer of development rights (TDR)?',
    options: [
      'PDR requires designated receiving areas; TDR does not',
      'PDR uses public or nonprofit funds to buy rights directly, usually as a conservation easement, rather than relying on a private market for credits',
      'PDR only applies to historic buildings',
      'PDR lets developers build above base density in the sending area',
    ],
    correct: 1,
    explanation: 'TDR depends on developers in receiving areas wanting to buy credits. PDR skips that market and buys the rights with public or nonprofit money, so it needs a funding source instead.',
  },
  'cp:growth-service-boundary': {
    text: 'A county adopts a line beyond which it will not extend water and sewer lines. This tool is best described as:',
    options: [
      'An urban service boundary',
      'A concurrency requirement',
      'A transfer of development rights program',
      'An overlay district',
    ],
    correct: 0,
    explanation: 'An urban service boundary limits where the jurisdiction will extend water and sewer. It is related to an urban growth boundary, which limits the outward expansion of urban development itself.',
  },
  'cp:growth-petaluma': {
    text: 'The Petaluma case (9th Circuit, 1975) upheld which kind of growth control?',
    options: [
      'An urban growth boundary required by state law',
      'A development moratorium tied to a sewer study',
      'An annual cap on the number of building permits',
      'A statewide concurrency requirement',
    ],
    correct: 2,
    explanation: 'The court upheld the "Petaluma Plan," an annual cap on building permits, as a legitimate way to preserve small-town character and control the rate of growth.',
  },

  // implementation-math
  'cp:math-far-stories': {
    text: 'A 20,000 square foot lot is zoned for a floor area ratio of 1.5. If every floor has a footprint covering 25 percent of the lot, how many stories can the building have?',
    options: ['3', '4', '6', '8'],
    correct: 2,
    explanation: 'Stories ≈ FAR ÷ lot coverage = 1.5 ÷ 0.25 = 6. Checking the long way: 20,000 × 1.5 = 30,000 sq ft of floor area; footprint 20,000 × 0.25 = 5,000 sq ft; 30,000 ÷ 5,000 = 6.',
  },
  'cp:math-net-units': {
    text: 'A 20-acre site is zoned for 8 dwelling units per net acre. If 30 percent of the site must go to streets and required open space, how many units can be built?',
    options: ['112', '160', '120', '48'],
    correct: 0,
    explanation: 'Net area = 20 × (1 − 0.30) = 14 acres. Units = 14 × 8 = 112. That works out to 5.6 units per gross acre, lower than the net figure, as gross density always is.',
  },
  'cp:math-parking-spaces': {
    text: 'A 30,000 square foot office building must provide 3 parking spaces per 1,000 square feet of gross floor area. How many spaces are required?',
    options: ['30', '100', '300', '90'],
    correct: 3,
    explanation: 'Required spaces = 30,000 ÷ 1,000 × 3 = 90.',
  },

  // capital-planning-and-finance
  'cp:cip-capital-budget': {
    text: 'What happens to the first year of a capital improvements program?',
    options: [
      'It becomes the capital budget, adopted alongside the operating budget',
      'It is dropped, since the CIP only covers years two through six',
      'It becomes the comprehensive plan’s land use element',
      'It is used to set staff salaries',
    ],
    correct: 0,
    explanation: 'The CIP is a multi-year schedule, and its first year becomes the annual capital budget. Each year, completed projects drop off and a new final year is added.',
  },
  'cp:cip-revenue-bond': {
    text: 'A city wants to expand its water treatment plant and repay the debt from water rates. Which financing tool fits best?',
    options: [
      'A general obligation bond backed by the property tax',
      'A revenue bond backed by the water system’s revenues',
      'A business improvement district assessment',
      'A special assessment on downtown businesses',
    ],
    correct: 1,
    explanation: 'Revenue bonds are repaid from the project’s own revenues, which suits enterprise facilities with user fees like water and sewer. They usually do not need voter approval, though interest costs are somewhat higher.',
  },
  'cp:cip-tif-schools': {
    text: 'Why do school districts often raise concerns when a city creates a tax increment financing district?',
    options: [
      'TIF raises the tax rate on every property in the school district',
      'TIF requires schools to pay for the district’s improvements',
      'TIF can divert increment revenue that schools and other taxing bodies would otherwise receive',
      'TIF freezes school enrollment inside the district',
    ],
    correct: 2,
    explanation: 'Taxes on the frozen base keep flowing to the usual taxing bodies, but the increment is captured for the district’s improvements. Critics add that TIF can capture growth that would have happened anyway.',
  },
  'cp:cip-special-assessment': {
    text: 'A city builds a new sewer line and charges the properties it serves for part of the cost. For this special assessment to be valid, each property’s charge must be:',
    options: [
      'Equal for every property in the city',
      'Approved by a majority of all city voters',
      'Based on the owner’s income',
      'Proportional to the special benefit that property receives',
    ],
    correct: 3,
    explanation: 'Special assessments charge properties that receive a special benefit from a public improvement, and each charge must be proportional to the benefit received.',
  },
  'cp:cip-impact-fee-use': {
    text: 'Which expense could an impact fee on a new subdivision most defensibly pay for?',
    options: [
      'Added park capacity needed to serve the subdivision’s residents',
      'Repairs to an existing park that was already rundown',
      'Salaries for the parks department',
      'A park across the county that the residents will not use',
    ],
    correct: 0,
    explanation: 'Impact fees fund new capacity needed to serve the development, with a rational nexus and rough proportionality. They cannot fund existing deficiencies or operating costs, and the fee payer must benefit.',
  },

  // monitoring-and-implementation-programs
  'cp:monitor-action-table': {
    text: 'An implementation program is most useful when it:',
    options: [
      'Restates the plan’s vision in more detail',
      'Assigns specific actions, responsible parties, and timeframes',
      'Lists every policy without ranking or scheduling them',
      'Is kept internal so priorities can shift freely',
    ],
    correct: 1,
    explanation: 'An action table answers what will be done, who leads, when, how much it costs and from where, and how success will be measured. That turns policies into work.',
  },
  'cp:monitor-turnover': {
    text: 'A plan’s main champions on the council are about to leave office. Which mitigation best protects the plan’s implementation?',
    options: [
      'Delay all actions until the new council is seated',
      'Rewrite the plan to match the likely preferences of the new members',
      'Build broad community support and institutional ownership, and report progress publicly',
      'Move implementation responsibility to a single staff member',
    ],
    correct: 2,
    explanation: 'Political turnover is a common obstacle. Plans survive it when the community and institutions own them, and when regular public progress reports keep them visible.',
  },
  'cp:monitor-los-example': {
    text: 'Which of the following is an example of a level-of-service standard?',
    options: [
      'A policy to "improve parks citywide"',
      'A vision statement calling for a green city',
      'A list of parks shown on the future land use map',
      'Five acres of parkland per 1,000 residents',
    ],
    correct: 3,
    explanation: 'A level-of-service standard is a measurable threshold for a public facility. It is used to plan capital needs, calculate impact fees, and, under concurrency, decide whether development can proceed.',
  },
  'cp:monitor-outcome': {
    text: 'Which is an outcome indicator rather than an implementation (output) indicator for a plan goal of more bicycling?',
    options: [
      'Change in the share of residents who commute by bicycle',
      'Miles of bike lanes striped this year',
      'Whether the bike parking ordinance was adopted',
      'Number of bike racks installed',
    ],
    correct: 0,
    explanation: 'Output monitoring asks whether the actions happened: lanes striped, ordinance adopted, racks installed. Outcome monitoring asks whether it made a difference, such as more people actually commuting by bike.',
  },
};
