// Original checkpoint questions, written for specific lesson sections that the
// practice exam banks don't cover. Referenced from lesson Markdown as
// `:::checkpoint cp:<id>`. Same shape as bank questions: four options, the
// index of the correct one, and an explanation. `npm run check` validates them.
export const CHECKPOINTS = {
  'cp:takings-inverse': {
    text: 'A landowner believes a new regulation has effectively taken her property, even though the government never formally condemned it. She sues for compensation. This kind of claim is called:',
    options: ['Eminent domain', 'Inverse condemnation', 'An exaction', 'Spot zoning'],
    correct: 1,
    explanation: 'Inverse condemnation is an owner-initiated suit for compensation when government action takes property without a formal condemnation proceeding. Eminent domain is the government taking title directly.',
  },
  'cp:fed-nhpa': {
    text: 'Which law created the National Register of Historic Places, State Historic Preservation Offices, and the Section 106 review process?',
    options: ['The National Environmental Policy Act', 'The Housing Act of 1954', 'The National Historic Preservation Act of 1966', 'The Coastal Zone Management Act'],
    correct: 2,
    explanation: 'The National Historic Preservation Act of 1966 established the National Register, SHPOs, and Section 106, which requires federal agencies to consider effects on historic properties.',
  },
  'cp:fed-dma': {
    text: 'Which law made a FEMA-approved local hazard mitigation plan a condition of eligibility for certain federal mitigation funding?',
    options: ['The National Flood Insurance Act of 1968', 'The Disaster Mitigation Act of 2000', 'The Coastal Zone Management Act of 1972', 'The Clean Water Act of 1972'],
    correct: 1,
    explanation: 'The Disaster Mitigation Act of 2000 amended the Stafford Act to require state and local hazard mitigation plans for certain FEMA mitigation grants. The 1968 act created the National Flood Insurance Program.',
  },
  'cp:zoning-map-text': {
    text: 'A city council changes one parcel from the R-1 district to the C-2 district on the zoning map. This action is a:',
    options: ['Text amendment', 'Variance', 'Map amendment (rezoning)', 'Conditional use permit'],
    correct: 2,
    explanation: 'Changing a parcel’s district designation is a map amendment, or rezoning. A text amendment changes the ordinance’s rules; a variance and a conditional use permit leave the district unchanged.',
  },
  'cp:zoning-cumulative': {
    text: 'Early zoning ordinances were often "cumulative" (pyramidal). Under that approach, which of the following was typically allowed?',
    options: ['A factory in a single-family residential district', 'A single-family home in a commercial or industrial district', 'Any use in any district with a special permit', 'Only the uses listed for each district, and nothing else'],
    correct: 1,
    explanation: 'Cumulative zoning let "higher" uses such as homes locate in "lower" districts such as commercial or industrial, but not the reverse. Listing only each district’s own uses is exclusive (non-cumulative) zoning.',
  },
  'cp:zoning-far': {
    text: 'Which dimensional standard limits a building’s bulk by comparing its total floor area with the area of its lot?',
    options: ['Lot coverage', 'Floor area ratio', 'Minimum lot width', 'Front setback'],
    correct: 1,
    explanation: 'Floor area ratio (FAR) is total floor area divided by lot area. Lot coverage compares only the building footprint with the lot.',
  },
  'cp:goals-shall': {
    text: 'Which policy statement actually commits the city to act?',
    options: [
      'The city should explore ways to allow accessory dwelling units.',
      'The city encourages accessory dwelling units where appropriate.',
      'The city shall allow accessory dwelling units in all residential districts.',
      'The city may consider accessory dwelling units in the future.',
    ],
    correct: 2,
    explanation: '"Shall" commits the jurisdiction. "Should," "encourage," and "may consider" leave room to do nothing, and a plan written entirely that way commits to little.',
  },
  'cp:goals-character': {
    text: 'Residents say the plan must "preserve our small-town character." What is the planner’s best next step?',
    options: [
      'Treat the comment as too vague to act on',
      'Adopt the neighboring town’s design guidelines',
      'Identify the specific qualities residents mean and translate them into measurable standards',
      'Freeze all new development until character can be defined',
    ],
    correct: 2,
    explanation: 'The value is real but needs definition. Finding out what "character" means here (building scale, setbacks, street trees, storefronts) turns it into objectives and standards that can be applied fairly.',
  },
  'cp:analysis-sensitivity': {
    text: 'Staff score three growth alternatives against the plan’s goals. A small change in the weight given to traffic delay flips which alternative ranks first. What should staff do?',
    options: [
      'Report only the original ranking, since the weights were agreed',
      'Show decision-makers that the result is sensitive to that weight, and how the ranking changes',
      'Drop traffic delay from the criteria',
      'Choose the weights that produce the most popular result',
    ],
    correct: 1,
    explanation: 'This is sensitivity analysis. When a close call depends on a value judgment, decision-makers should see that plainly rather than receive a ranking that looks more certain than it is.',
  },
  'cp:analysis-buildable': {
    text: 'In a buildable lands inventory, which land is removed from the supply before development capacity is calculated?',
    options: [
      'Vacant parcels',
      'Underused parcels with low improvement value',
      'Floodplains, wetlands, steep slopes, and land committed to public uses',
      'Parcels zoned for commercial use',
    ],
    correct: 2,
    explanation: 'The inventory starts with vacant and redevelopable land, then removes constrained land such as floodplains, wetlands, steep slopes, and land committed to public uses, before applying allowed densities.',
  },
  'cp:math-coverage': {
    text: 'A 12,000-square-foot lot has a 3,000-square-foot house and a 600-square-foot detached garage. What is the building lot coverage?',
    options: ['25%', '30%', '35%', '5%'],
    correct: 1,
    explanation: 'Lot coverage = total footprint ÷ lot area = (3,000 + 600) ÷ 12,000 = 3,600 ÷ 12,000 = 0.30, or 30%.',
  },
  'cp:math-lot-area': {
    text: 'A 10,000-square-foot lot is in a district requiring 1,500 square feet of lot area per dwelling unit. How many units are allowed?',
    options: ['5', '6', '7', '15'],
    correct: 1,
    explanation: '10,000 ÷ 1,500 = 6.67. You can’t build part of a unit, and rounding up would exceed the limit, so the answer is 6.',
  },
  'cp:math-affordable': {
    text: 'A household earns $54,000 a year. Using the 30% standard, what is the most it can spend on housing each month and still not be cost-burdened?',
    options: ['$1,125', '$1,350', '$1,620', '$1,800'],
    correct: 1,
    explanation: '$54,000 × 0.30 = $16,200 a year; $16,200 ÷ 12 = $1,350 a month.',
  },
  'cp:math-percent': {
    text: 'Employment in a county rose from 12,000 to 13,800 jobs. What was the percent change?',
    options: ['13%', '15%', '18%', '1.8%'],
    correct: 1,
    explanation: 'Percent change = (new − old) ÷ old = (13,800 − 12,000) ÷ 12,000 = 1,800 ÷ 12,000 = 0.15, or 15%.',
  },
  'cp:econ-multiplier': {
    text: 'A region has 8,000 basic jobs and 20,000 total jobs. If a new employer adds 200 basic jobs, about how many total jobs does economic base theory predict?',
    options: ['200', '300', '500', '2,500'],
    correct: 2,
    explanation: 'Multiplier = total ÷ basic = 20,000 ÷ 8,000 = 2.5. So 200 basic jobs × 2.5 ≈ 500 total jobs: the 200 new basic jobs plus about 300 nonbasic jobs.',
  },
  'cp:econ-lq-assumption': {
    text: 'Using location quotients alone to identify a region’s export industries assumes that:',
    options: [
      'The region has no nonbasic employment',
      'Local consumption patterns and productivity are similar to the nation’s',
      'Every industry with an LQ below 1.0 is declining',
      'The region’s population is growing',
    ],
    correct: 1,
    explanation: 'An LQ above 1.0 is read as exporting only if local residents consume and produce like the nation. A retirement community may have a high health care LQ because residents use more care, not because it exports care.',
  },
  'cp:econ-bre': {
    text: 'Which economic development strategy is usually the most cost-effective, because most job growth comes from firms already in the community?',
    options: ['Business attraction', 'Business retention and expansion', 'Opportunity Zone designation', 'Tax abatements for relocating firms'],
    correct: 1,
    explanation: 'Business retention and expansion helps existing employers stay and grow. It is usually cheaper and more reliable than recruiting firms from elsewhere.',
  },
  'cp:rural-growth': {
    text: 'A rural county with one part-time planner has public water and sewer only in its two villages, and faces steady demand for large-lot homes on septic systems. Which approach is most efficient?',
    options: [
      'Allow septic subdivisions anywhere, as long as lots are at least two acres',
      'Direct new growth to the villages, and protect the farmland between them',
      'Adopt a detailed form-based code for the entire county',
      'Stop issuing rural permits until sewer reaches the whole county',
    ],
    correct: 1,
    explanation: 'With limited capacity, the most efficient approach is to steer growth to places that already have, or can affordably get, adequate services, and protect the working landscape between them.',
  },
  'cp:rural-right-to-farm': {
    text: 'Right-to-farm laws are designed mainly to:',
    options: [
      'Guarantee farmers the right to subdivide their land',
      'Protect established farms from nuisance suits over normal farming practices',
      'Exempt farms from all local zoning',
      'Require counties to buy farmers’ development rights',
    ],
    correct: 1,
    explanation: 'Right-to-farm laws shield established, properly run farms from nuisance claims by newer neighbors who object to normal farm noise, odors, or hours.',
  },
  'cp:rural-tribal': {
    text: 'A regional agency’s long-range plan affects land within and near a reservation. What is the most appropriate way to involve the tribal nation?',
    options: [
      'Invite tribal members to the general public open house',
      'Begin government-to-government consultation early, through the tribe’s designated officials',
      'Send the final draft to the tribal government during the last comment period',
      'Assume county zoning applies to all land within the reservation',
    ],
    correct: 1,
    explanation: 'Tribal nations are sovereign governments. They should be engaged early, as governments, through formal consultation, not treated as one more stakeholder at a public meeting.',
  },
  'cp:infra-lifecycle': {
    text: 'When comparing two sewer extension options, which cost measure best reflects the long-term burden on the utility and its ratepayers?',
    options: ['Construction cost', 'Life-cycle cost', 'First-year operating cost', 'Cost per linear foot of pipe'],
    correct: 1,
    explanation: 'Life-cycle cost covers design, construction, operation, maintenance, and eventual replacement. Construction is usually the smallest part of what an asset costs over its life.',
  },
  'cp:infra-cso': {
    text: 'A combined sewer overflow occurs when:',
    options: [
      'Two utilities merge their service areas',
      'Heavy rain exceeds the capacity of pipes that carry both sewage and stormwater',
      'A septic system fails and contaminates a well',
      'A treatment plant runs below its design capacity',
    ],
    correct: 1,
    explanation: 'Older combined systems carry sewage and stormwater in the same pipes. In heavy rain the flow exceeds capacity and untreated water overflows into rivers, a major driver of green infrastructure and sewer separation projects.',
  },
  'cp:infra-decommissioning': {
    text: 'A township’s utility-scale solar ordinance requires a decommissioning plan backed by financial security. This provision mainly ensures that:',
    options: [
      'The project connects to the grid on schedule',
      'Panels are replaced with newer models every ten years',
      'The facility is removed and the site restored at the end of its life',
      'Neighbors receive a share of the power produced',
    ],
    correct: 2,
    explanation: 'Decommissioning requirements make the operator responsible, with money set aside, for removing equipment and restoring the site when the project ends.',
  },
  'cp:ethics-principle': {
    text: 'A planner\u2019s recommendation does less to expand opportunity for disadvantaged residents than it could, but it breaks no Rule of Conduct. Can that alone support a charge of misconduct under the AICP Code?',
    options: [
      'Yes, because seeking social justice is a Rule of Conduct',
      'No, because aspirational principles aren\u2019t enforceable on their own',
      'Yes, if a member of the public files the charge',
      'Only if the planner works for a public agency',
    ],
    correct: 1,
    explanation: 'Commitments like seeking social justice are aspirational principles. Falling short of them isn\u2019t misconduct by itself; only a violation of the Rules of Conduct can support a charge. The first step of the five-step method is asking which one applies.',
  },
};
