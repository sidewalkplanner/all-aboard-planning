// Domain 8: Areas of Practice. Original checkpoint questions, written for
// the lessons only (none appear in the practice exams).
export default {
  // transportation-planning
  'cp:trans-mpo-3c': {
    text: 'The planning process that metropolitan planning organizations carry out is known as the "3C" process. The three Cs stand for:',
    options: [
      'Capital, construction, and congestion',
      'Continuing, comprehensive, and cooperative',
      'Corridor, community, and county',
      'Concurrency, capacity, and cost',
    ],
    correct: 1,
    explanation: 'MPOs carry out a continuing, comprehensive, and cooperative regional planning process. Their boards typically include local elected officials, the state DOT, and transit operators.',
  },
  'cp:trans-gravity': {
    text: 'In the gravity model used for trip distribution, the number of trips between two zones:',
    options: [
      'Is the same for every pair of zones',
      'Depends only on the number of roads between the zones',
      'Increases with the zones’ size and decreases with the distance or travel time between them',
      'Decreases as the zones grow larger',
    ],
    correct: 2,
    explanation: 'Like physical gravity, attraction grows with the size of the zones (households, jobs) and shrinks with distance or travel time. Distribution is the second of the four steps, after trip generation.',
  },
  'cp:trans-vmt-infill': {
    text: 'Why does using vehicle miles traveled (VMT) instead of intersection level of service tend to favor infill near transit?',
    options: [
      'Infill near transit produces less driving per person, while LOS penalizes any added delay at nearby intersections',
      'VMT ignores development near transit entirely',
      'LOS cannot be measured in urban areas',
      'VMT only counts transit trips',
    ],
    correct: 0,
    explanation: 'LOS measures driver delay, so busy infill sites look bad and road widening looks good. VMT measures total driving, which compact development near transit reduces.',
  },
  'cp:trans-safe-system': {
    text: 'The safe system approach behind Vision Zero starts from which assumption?',
    options: [
      'Crashes are mainly caused by a small number of reckless drivers, so enforcement is the answer',
      'Some traffic deaths are an acceptable cost of mobility',
      'Only highways need safety improvements',
      'People make mistakes, so streets, speeds, and vehicles should be designed to forgive them',
    ],
    correct: 3,
    explanation: 'Vision Zero treats traffic deaths and serious injuries as preventable. Because humans err, the system itself must be forgiving, through street design, managed speeds, and safer vehicles.',
  },
  'cp:trans-tod-displacement': {
    text: 'A new rail line is planned through a neighborhood of mostly lower-income renters. What should the station-area plan address alongside density and walkability?',
    options: [
      'Adding large surface parking lots at each station',
      'Displacement risk, through preservation, inclusionary requirements, and tenant protections',
      'Delaying any rezoning until land values have risen',
      'Limiting the station area to single-family homes',
    ],
    correct: 1,
    explanation: 'New transit can raise land values quickly. Pairing TOD with anti-displacement tools, and rezoning in advance of speculation, helps existing residents benefit from the investment.',
  },

  // housing-and-community-development
  'cp:housing-tenure': {
    text: 'In a housing needs assessment, "tenure" refers to:',
    options: [
      'Whether a household rents or owns its home',
      'How long a household has lived in the community',
      'The age of the housing stock',
      'The length of an affordability covenant',
    ],
    correct: 0,
    explanation: 'Tenure means renter or owner. Needs assessments project household growth by size, age, income, and tenure, alongside cost burden, housing condition, and land capacity.',
  },
  'cp:housing-vouchers': {
    text: 'How do Housing Choice Vouchers generally work?',
    options: [
      'The federal government builds and owns the housing',
      'Investors receive tax credits for building affordable units',
      'The tenant pays about 30 percent of income toward rent and the voucher pays the rest, up to a limit, to a private landlord',
      'Local governments receive block grants for public facilities',
    ],
    correct: 2,
    explanation: 'Vouchers are tenant-based rental subsidies administered by public housing agencies. LIHTC is the investor tax credit program, and CDBG is the flexible block grant.',
  },
  'cp:housing-disparate-impact': {
    text: 'Under Inclusive Communities (2015), a housing policy can violate the Fair Housing Act:',
    options: [
      'Only if the jurisdiction admits a discriminatory purpose',
      'Only if it names a protected class explicitly',
      'Never, if it was adopted through a public hearing',
      'Through an unjustified discriminatory effect, even without proof of intent',
    ],
    correct: 3,
    explanation: 'The Court held that disparate-impact claims are cognizable under the Act, though plaintiffs must show the policy caused the disparity.',
  },
  'cp:housing-builders-remedy': {
    text: 'In the later Mount Laurel decisions, what was the "builder’s remedy"?',
    options: [
      'A tax credit for builders of affordable housing',
      'Allowing developers to build inclusionary projects when towns did not meet their fair share obligation',
      'A federal grant for rebuilding after disasters',
      'A rule protecting builders from nuisance suits',
    ],
    correct: 1,
    explanation: 'Mount Laurel established that developing municipalities must provide a realistic opportunity for their fair share of regional affordable housing. The builder’s remedy gave that duty teeth.',
  },
  'cp:housing-missing-middle': {
    text: 'Which of the following is an example of "missing middle" housing?',
    options: [
      'A fourplex on a neighborhood lot',
      'A 20-story apartment tower',
      'A detached house on a two-acre lot',
      'A mobile home park on a highway',
    ],
    correct: 0,
    explanation: 'Missing middle means house-scale buildings with multiple units: duplexes, triplexes, fourplexes, townhouses, and courtyard apartments. Mid-century zoning banned them from most residential districts.',
  },

  // environmental-planning-and-hazards
  'cp:env-phase2': {
    text: 'A Phase I assessment finds that a former dry cleaner operated on a site. What typically comes next to confirm whether the soil is contaminated?',
    options: [
      'Another records search',
      'An environmental impact statement',
      'A Phase II assessment that samples soil and groundwater',
      'A certificate of appropriateness',
    ],
    correct: 2,
    explanation: 'Phase I involves no sampling: it identifies recognized environmental conditions through records, a site visit, and interviews. Phase II samples to confirm and characterize contamination.',
  },
  'cp:env-mitigation-sequence': {
    text: 'Under the Clean Water Act Section 404 mitigation sequence, what comes first?',
    options: [
      'Buy credits from a mitigation bank',
      'Restore a wetland elsewhere',
      'Minimize the impacts',
      'Avoid the impacts',
    ],
    correct: 3,
    explanation: 'The sequence is avoid, then minimize, then compensate for unavoidable losses through restoration, creation, or mitigation banking.',
  },
  'cp:env-30-year': {
    text: 'A home sits in the 1 percent annual chance floodplain. Over a 30-year mortgage, the chance of at least one base flood is roughly:',
    options: ['1 percent', 'One in four', 'About 10 percent', 'Near zero, since it is a "100-year" flood'],
    correct: 1,
    explanation: 'A 1 percent annual chance adds up to roughly 26 percent over 30 years. The "100-year flood" is not a flood that happens once a century.',
  },
  'cp:env-mitigation-example': {
    text: 'Which action is climate mitigation rather than adaptation?',
    options: [
      'Electrifying the city’s bus fleet',
      'Opening cooling centers during heat waves',
      'Raising the design standard for storm drains',
      'Restoring coastal dunes',
    ],
    correct: 0,
    explanation: 'Mitigation reduces greenhouse gas emissions. Cooling centers, bigger storm drains, and dune restoration all prepare for impacts already expected, which is adaptation.',
  },
  'cp:env-defensible-space': {
    text: 'Which is a common planning response to wildfire risk in the wildland-urban interface?',
    options: [
      'Requiring defensible space and fire-resistant construction',
      'Encouraging denser vegetation around homes',
      'Allowing single-access subdivisions in the highest-risk areas',
      'Removing hydrants to reduce costs',
    ],
    correct: 0,
    explanation: 'Planning responses include limiting development in the highest-risk areas, requiring defensible space and fire-resistant construction, and ensuring evacuation routes and water supply.',
  },

  // economic-development
  'cp:econ-basic-example': {
    text: 'Under economic base theory, which is a basic (export) activity?',
    options: [
      'A neighborhood barber shop',
      'A local dentist',
      'A regional hospital drawing patients from across the state',
      'A corner grocery store',
    ],
    correct: 2,
    explanation: 'Basic activity sells to customers outside the local economy and brings new money in. Barbers, dentists, and groceries serve local residents and recirculate money already there.',
  },
  'cp:econ-cluster-approach': {
    text: 'How does a cluster-based strategy differ from recruiting individual firms?',
    options: [
      'It offers the largest tax break to the largest single employer',
      'It avoids working with universities and trade groups',
      'It focuses only on retail businesses',
      'It strengthens the whole ecosystem of related firms, suppliers, workforce training, and institutions',
    ],
    correct: 3,
    explanation: 'Cluster-based development invests in the interconnected group, through training, supplier networks, research partnerships, and shared infrastructure, rather than chasing one firm at a time.',
  },
  'cp:econ-leakage': {
    text: 'Trade-area residents spend $40 million a year on restaurant meals, but local restaurants sell only $25 million. This indicates:',
    options: [
      'A surplus, since local restaurants draw diners from outside',
      'Leakage, suggesting an opportunity for more local restaurants',
      'A capture rate above 100 percent',
      'That the trade area is too small to analyze',
    ],
    correct: 1,
    explanation: 'When resident demand exceeds local sales, spending is leaking to stores outside the area. The capture rate here is 25 ÷ 40, about 63 percent.',
  },

  // urban-design-and-historic-preservation
  'cp:design-territorial': {
    text: 'A housing complex adds low fences, planting, and a change in paving to mark the front yards as belonging to residents. Which CPTED principle is this?',
    options: [
      'Natural surveillance',
      'Territorial reinforcement',
      'Maintenance',
      'Activity support',
    ],
    correct: 1,
    explanation: 'Territorial reinforcement defines public, semi-private, and private space so ownership is clear. Natural surveillance is about seeing and being seen.',
  },
  'cp:design-register-criteria': {
    text: 'Which is one of the National Register criteria for significance?',
    options: [
      'The property is owned by a government',
      'The property is taller than its neighbors',
      'The property is assessed at a high value',
      'The property embodies distinctive design or construction',
    ],
    correct: 3,
    explanation: 'Properties, generally at least 50 years old, qualify through association with significant events or people, distinctive design or construction, or the potential to yield important information.',
  },
  'cp:design-106-steps': {
    text: 'In Section 106 review, what happens after historic properties in the project area are identified?',
    options: [
      'The project is automatically halted',
      'The property is listed on the National Register',
      'The agency assesses whether the project’s effects on them are adverse',
      'The local historic commission issues a certificate of appropriateness',
    ],
    correct: 2,
    explanation: 'The steps are initiate and identify consulting parties, identify historic properties, assess adverse effects, then resolve them by avoiding, minimizing, or mitigating. The process is procedural, not a guarantee of preservation.',
  },
  'cp:design-local-strongest': {
    text: 'Which gives historic buildings the strongest protection from inappropriate changes by private owners?',
    options: [
      'A local historic district ordinance administered by a preservation commission',
      'Listing on the National Register',
      'Section 106 review',
      'A state historical marker',
    ],
    correct: 0,
    explanation: 'Local ordinances require certificates of appropriateness for changes and often regulate demolition. National Register listing does not by itself restrict private owners, and Section 106 applies only to federal undertakings.',
  },
  'cp:design-rehab': {
    text: 'A historic warehouse is converted into apartments while its brick walls, large windows, and timber beams are kept. Under the Secretary of the Interior’s Standards, this treatment is:',
    options: [
      'Restoration',
      'Reconstruction',
      'Preservation',
      'Rehabilitation',
    ],
    correct: 3,
    explanation: 'Rehabilitation makes possible a compatible new use while preserving the features that convey historic character. It is the most common treatment.',
  },

  // health-food-parks-and-regional-planning
  'cp:health-hia-screening': {
    text: 'What is the first step of a health impact assessment?',
    options: [
      'Screening: deciding whether an HIA will add value to the decision',
      'Monitoring the decision’s results',
      'Writing recommendations',
      'Reporting findings to decision-makers',
    ],
    correct: 0,
    explanation: 'The steps are screening, scoping, assessment, recommendations, reporting, and monitoring and evaluation.',
  },
  'cp:health-food-tools': {
    text: 'Which is a planning tool for improving access to healthy food?',
    options: [
      'Banning farmers markets from residential areas',
      'Zoning that allows community gardens, urban farms, and farm stands',
      'Removing bus routes that serve grocery stores',
      'Requiring large minimum lot sizes for grocery stores',
    ],
    correct: 1,
    explanation: 'Food systems tools include a food element in the plan, zoning for gardens, farms, and markets, healthy corner store programs, transit links to groceries, and food policy councils.',
  },
  'cp:health-park-access': {
    text: 'Why do many cities now measure the share of residents within a 10-minute walk of a park, not only acres per 1,000 residents?',
    options: [
      'Acreage is no longer measurable',
      'Walk-time measures eliminate the need for park planning',
      'Acreage alone can hide neighborhoods with no park nearby',
      'Federal law requires it',
    ],
    correct: 2,
    explanation: 'A city can have plenty of parkland overall while some neighborhoods have none within walking distance. Access measures reveal those gaps and help direct investment to underserved areas.',
  },
  'cp:health-cog': {
    text: 'A voluntary association of local governments that coordinates regional planning, data, and some services is best described as:',
    options: [
      'A special district',
      'A tribal nation',
      'A state department of transportation',
      'A council of governments',
    ],
    correct: 3,
    explanation: 'Councils of governments or regional planning commissions are voluntary associations. Regional governments with real authority are rare in the U.S.',
  },
  'cp:health-data-governance': {
    text: 'A city plans to install sensors that count pedestrians and read license plates. Which practice best addresses the concerns this raises?',
    options: [
      'Collecting as much data as possible in case it is useful later',
      'Adopting data governance policies with data minimization, transparency, and community oversight',
      'Keeping the program confidential to avoid controversy',
      'Sharing the raw data with any company that asks',
    ],
    correct: 1,
    explanation: 'Smart city data raises privacy, surveillance, and equity concerns. Good practice includes governance policies, privacy impact assessments, data minimization, transparency, and community oversight.',
  },

  // rural-small-town-and-tribal-planning
  'cp:rural-cluster': {
    text: 'A conservation (cluster) subdivision typically:',
    options: [
      'Keeps the same number of homes on smaller lots and preserves the rest of the site as open land or farmland',
      'Doubles the number of homes allowed on the site',
      'Spreads homes evenly across the entire site on large lots',
      'Prohibits any homes on farmland',
    ],
    correct: 0,
    explanation: 'Clustering groups the same number of homes on smaller lots so the remaining land stays open or in farming, which protects rural character without reducing the development yield.',
  },
  'cp:rural-trust-land': {
    text: 'Generally, how does county zoning apply to tribal trust land within a reservation?',
    options: [
      'County zoning always applies to all reservation land',
      'State and local zoning generally does not apply to tribal trust land',
      'The county and the tribe must adopt identical zoning',
      'Only the federal government may zone reservation land',
    ],
    correct: 1,
    explanation: 'Tribal nations are sovereign governments that plan and regulate their own lands. Land status within a reservation is complex, and privately owned fee land can raise different questions.',
  },

  // infrastructure-energy-and-water-planning
  'cp:infra-steers-growth': {
    text: 'A county’s land use plan calls for farmland in an area where the utility is extending a large sewer trunk line. What is most likely to happen?',
    options: [
      'The land will stay in farming because the plan says so',
      'The sewer line will be removed',
      'Development pressure will follow the new capacity, because infrastructure steers growth',
      'Nothing, since sewer lines do not affect land use',
    ],
    correct: 2,
    explanation: 'When an infrastructure plan and a land use plan disagree, the infrastructure usually wins, because private development follows capacity. That is why planners coordinate utility service areas with the land use map.',
  },
  'cp:trans-frequency': {
    text: 'A transit agency wants to raise ridership without increasing its budget. Which change is most likely to help?',
    options: [
      'Extend routes into low-density areas at the edge of the service area',
      'Buy new buses with more comfortable seats',
      'Consolidate thin routes into fewer corridors with buses every 10 to 15 minutes',
      'Add stops every block to shorten walks',
    ],
    correct: 2,
    explanation: 'Frequency drives ridership, and concentrating service on busy corridors attracts the most riders for a fixed budget. Spreading service out favors coverage, and extra stops slow every trip.',
  },
  'cp:trans-unbundling': {
    text: 'An apartment building rents parking spaces separately from the units, so tenants without cars don’t pay for a space. What is this called?',
    options: [
      'Unbundling',
      'Shared parking',
      'A parking maximum',
      'Performance pricing',
    ],
    correct: 0,
    explanation: 'Unbundling separates the cost of parking from the cost of housing. Shared parking serves uses with different peaks, and performance pricing adjusts meter rates.',
  },
  'cp:housing-rent-stabilization': {
    text: 'A city ordinance limits annual rent increases for existing tenants to the rate of inflation, but lets rents reset when a unit turns over. Which description fits?',
    options: [
      'Inclusionary zoning with an affordability term',
      'A housing choice voucher program',
      'A strict rent control cap',
      'Rent stabilization with vacancy decontrol',
    ],
    correct: 3,
    explanation: 'Limiting annual increases for sitting tenants is rent stabilization, and letting rents reset between tenants is vacancy decontrol. A strict cap would hold rents at a set level.',
  },
  'cp:env-hcp': {
    text: 'A county wants to allow development in an area that is habitat for a listed endangered species. No federal agency is involved. What does the county typically need?',
    options: [
      'A Section 404 permit',
      'An incidental take permit backed by a habitat conservation plan',
      'An environmental impact statement',
      'A FEMA-approved hazard mitigation plan',
    ],
    correct: 1,
    explanation: 'Under ESA Section 10, a nonfederal party whose activities may take a listed species needs an incidental take permit supported by a habitat conservation plan.',
  },
  'cp:env-recovery': {
    text: 'When is the best time for a community to decide how it will make rebuilding decisions after a major disaster?',
    options: [
      'Immediately after the disaster, when damage is known',
      'Once federal recovery funds are awarded',
      'Before the disaster, in a pre-disaster recovery plan',
      'After most owners have rebuilt, to guide the next disaster',
    ],
    correct: 2,
    explanation: 'Deciding in advance lets a community think clearly about who leads and which policies apply. After a disaster, pressure to rebuild quickly can lock in the same risks.',
  },
  'cp:econ-induced': {
    text: 'A new factory’s workers spend their paychecks at local restaurants and shops. In an economic impact analysis, what kind of effect is this?',
    options: [
      'A direct effect',
      'An indirect effect',
      'A substitution effect',
      'An induced effect',
    ],
    correct: 3,
    explanation: 'Household spending by workers is induced. The factory’s own jobs are direct effects, and its purchases from local suppliers are indirect effects.',
  },
  'cp:design-demolition-neglect': {
    text: 'An owner of a building in a local historic district stops maintaining it, hoping it will deteriorate enough to justify demolition. Which tool addresses this?',
    options: [
      'A demolition-by-neglect provision',
      'National Register listing',
      'The federal rehabilitation tax credit',
      'A Section 106 review',
    ],
    correct: 0,
    explanation: 'Demolition-by-neglect rules require owners of designated buildings to keep them sound. Register listing doesn’t restrict private owners, and Section 106 applies only to federal undertakings.',
  },
  'cp:health-visitability': {
    text: 'A city adopts a visitability standard for new single-family homes. Which feature does it require?',
    options: [
      'A private backyard and a two-car garage',
      'A zero-step entrance and an accessible main-floor bathroom',
      'Solar-ready roofs and electric vehicle wiring',
      'A second-floor accessory unit with its own entrance',
    ],
    correct: 1,
    explanation: 'Visitability means basic access: a zero-step entrance, wide enough doors, and an accessible bathroom on the main floor, so a person using a wheelchair can visit or stay.',
  },
  'cp:rural-gateway': {
    text: 'A small town next to a national park is growing quickly with visitors, second homes, and remote workers, and its restaurant and hotel workers can no longer afford to live there. What should its plan emphasize?',
    options: [
      'A marketing campaign to attract more tourists',
      'Larger minimum lot sizes to preserve rural character',
      'Workforce housing and rules for short-term rentals',
      'Recruiting a manufacturing plant',
    ],
    correct: 2,
    explanation: 'In a gateway community, amenity-driven growth pushes housing costs beyond local wages. Workforce housing and short-term rental rules address that directly.',
  },
  'cp:infra-prior-appropriation': {
    text: 'In a western state that follows prior appropriation, a drought reduces a river’s flow. Whose water rights are served first?',
    options: [
      'The holders with the oldest (senior) rights',
      'The landowners closest to the river',
      'All users, cut back by the same percentage',
      'The largest cities',
    ],
    correct: 0,
    explanation: 'Prior appropriation is "first in time, first in right": senior rights are served first, and junior users can be cut off. Proximity to the river matters under riparian rights, not prior appropriation.',
  },
  'cp:infra-waste-hierarchy': {
    text: 'Which solid waste strategy sits at the top of the waste management hierarchy?',
    options: [
      'Recycling',
      'Waste-to-energy incineration',
      'Composting',
      'Source reduction and reuse',
    ],
    correct: 3,
    explanation: 'The hierarchy runs from source reduction and reuse, to recycling and composting, to energy recovery, to disposal in a landfill.',
  },
};
