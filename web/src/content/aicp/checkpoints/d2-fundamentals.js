// Domain 2: Fundamental Planning Knowledge. Original checkpoint questions,
// written for the lessons only (none appear in the practice exams).
export default {
  // planning-history
  'cp:hist-riis': {
    text: 'Jacob Riis’s *How the Other Half Lives* (1890) mattered to early planning mainly because it:',
    options: [
      'Laid out the curving streets of the first planned suburbs',
      'Used photographs of slum conditions to build public pressure for tenement reform',
      'Launched the City Beautiful movement',
      'Became the model for the first comprehensive zoning ordinance',
    ],
    correct: 1,
    explanation: 'Riis’s photographs of crowded, unsanitary tenements built the pressure behind tenement reform, including New York’s Tenement House Act of 1901.',
  },
  'cp:hist-cb-critique': {
    text: 'Which criticism was most often made of the City Beautiful movement?',
    options: [
      'It focused on appearances and civic monuments while neglecting housing and social conditions',
      'It ignored design in favor of engineering and administration',
      'It depended on federal highway money',
      'It refused to plan beyond a single neighborhood',
    ],
    correct: 0,
    explanation: 'Critics said City Beautiful plans produced grand boulevards and civic centers but did little about housing and social conditions. The "City Practical" that followed emphasized engineering, zoning, and administration.',
  },
  'cp:hist-model-acts': {
    text: 'In the 1920s the U.S. Department of Commerce, under Herbert Hoover, published two model laws that many states used to authorize local planning and zoning. They were:',
    options: [
      'The National Environmental Policy Act and the Clean Air Act',
      'The Housing Acts of 1937 and 1949',
      'The Standard State Zoning Enabling Act and the Standard City Planning Enabling Act',
      'The Tenement House Act and the Federal-Aid Highway Act',
    ],
    correct: 2,
    explanation: 'The Standard State Zoning Enabling Act and the Standard City Planning Enabling Act gave states ready-made language for delegating zoning and planning powers to local governments.',
  },
  'cp:hist-neighborhood-unit': {
    text: 'Clarence Perry’s neighborhood unit was sized to support which facility at its center?',
    options: ['A regional shopping district', 'A commuter rail station', 'A hospital', 'An elementary school'],
    correct: 3,
    explanation: 'Perry sized the neighborhood unit around an elementary school, with arterial streets at the edges, shops at the corners, and small parks throughout.',
  },
  'cp:hist-eyes': {
    text: 'Jane Jacobs’s phrase "eyes on the street" refers to the idea that:',
    options: [
      'Streets are safer when people in buildings and on sidewalks naturally watch them',
      'Cities should install cameras on every block',
      'Planners should inspect street conditions regularly',
      'Traffic engineers should monitor congestion in real time',
    ],
    correct: 0,
    explanation: 'Jacobs argued that a fine-grained mix of uses keeps people around at all hours, and their ordinary watching keeps streets safe. She opposed superblocks and towers set apart from the street.',
  },

  // planning-theory
  'cp:theory-satisfice': {
    text: 'Short on time and data, a planning director picks the first site that meets a project’s basic requirements instead of evaluating every possible site. Herbert Simon would describe this as:',
    options: ['Mixed scanning', 'Advocacy planning', 'Satisficing under bounded rationality', 'Transactive planning'],
    correct: 2,
    explanation: 'Simon argued that real decision-makers have limited information, time, and processing ability, so they satisfice: they choose the first option that is good enough.',
  },
  'cp:theory-incremental-critique': {
    text: 'What is the most common criticism of Lindblom’s incrementalism ("muddling through")?',
    options: [
      'It requires more data than any agency can collect',
      'It ignores what is politically workable',
      'It assumes a single unitary public interest',
      'It tends to favor the status quo and can’t handle problems that need bold change',
    ],
    correct: 3,
    explanation: 'Incrementalism is realistic and politically workable, but small steps from the current situation can entrench the status quo and fall short on problems that require fundamental change.',
  },
  'cp:theory-mixed-scan': {
    text: 'A planner reviews the whole regional transportation system at a high level to set direction, then studies only the three worst corridors in depth. This approach is:',
    options: ['Rational-comprehensive planning', 'Mixed scanning', 'Satisficing', 'Communicative planning'],
    correct: 1,
    explanation: 'Etzioni’s mixed scanning pairs a broad, shallow look at the whole field with detailed examination of selected areas.',
  },
  'cp:theory-advocacy': {
    text: 'Paul Davidoff’s advocacy planning asks planners to:',
    options: [
      'Act as neutral technicians who discover the single public interest',
      'Leave every value choice to elected officials',
      'Openly represent groups whose interests are underrepresented, especially low-income and minority communities',
      'Avoid producing competing plans that could confuse decision-makers',
    ],
    correct: 2,
    explanation: 'Davidoff rejected the idea of one unitary public interest. He argued that planners should advocate openly for underrepresented groups, bringing competing plans into the open.',
  },
  'cp:theory-forester': {
    text: 'John Forester’s contribution to communicative planning focused on:',
    options: [
      'How planners’ everyday communication, including what they emphasize, omit, or frame, shapes power and outcomes',
      'Choosing the first option that is good enough',
      'Self-contained towns surrounded by greenbelts',
      'Scoring and weighting map layers to rank sites',
    ],
    correct: 0,
    explanation: 'Forester examined how the way planners talk, listen, and frame issues affects who has power and what gets decided.',
  },

  // urban-form-and-settlement
  'cp:form-nuclei': {
    text: 'Which classic model of urban structure best fits today’s metropolitan regions, with many separate job and retail centers?',
    options: ['Concentric zone (Burgess)', 'Sector (Hoyt)', 'Multiple nuclei (Harris and Ullman)', 'The neighborhood unit (Perry)'],
    correct: 2,
    explanation: 'The multiple nuclei model describes a city with several centers, each drawing related uses. That fits modern regions with many downtowns, office parks, universities, and retail hubs.',
  },
  'cp:form-threshold': {
    text: 'In central place theory, a good’s or service’s "threshold" is:',
    options: [
      'The maximum distance people will travel to get it',
      'The minimum population needed to support it',
      'The hexagonal shape of its market area',
      'The rent a business can afford to pay',
    ],
    correct: 1,
    explanation: 'Threshold is the minimum market size a good or service needs. Range is the maximum distance people will travel. A hospital needs a far larger threshold than a convenience store.',
  },
  'cp:form-shelley': {
    text: 'In *Shelley v. Kraemer* (1948), the Supreme Court held that:',
    options: [
      'Racial zoning ordinances are unconstitutional',
      'The Federal Housing Administration must stop redlining',
      'Exclusionary zoning violates the Fair Housing Act',
      'Courts could not enforce racially restrictive covenants, because judicial enforcement is state action',
    ],
    correct: 3,
    explanation: 'Shelley made racially restrictive covenants judicially unenforceable under the Fourteenth Amendment. Racial zoning had been struck down earlier, in *Buchanan v. Warley* (1917).',
  },
  'cp:form-lynch-edge': {
    text: 'In Kevin Lynch’s vocabulary, a freeway or rail yard that cuts through and divides a part of the city is best described as:',
    options: ['A node', 'A landmark', 'An edge', 'A district'],
    correct: 2,
    explanation: 'Edges are boundaries and breaks, such as shorelines, rail yards, and freeways. Nodes are focal points people enter, and landmarks are external reference points.',
  },
  'cp:form-systems': {
    text: 'Paving most of a watershed for a new subdivision increases flooding downstream. What planning lesson does this illustrate?',
    options: [
      'Natural, social, and economic systems are interrelated, so analysis should trace effects across them',
      'Each planning topic is best studied on its own',
      'Stormwater is purely an engineering question',
      'Flooding is best addressed after development is complete',
    ],
    correct: 0,
    explanation: 'An intervention in one system ripples into others. Good planning analysis follows those connections rather than treating topics in isolation.',
  },

  // land-use-law-foundations
  'cp:law-police-power': {
    text: 'Where does the power to zone ultimately come from?',
    options: [
      'The states’ inherent police power, delegated to local governments through enabling acts',
      'An express grant in the U.S. Constitution',
      'Local governments’ own inherent authority',
      'Federal housing law',
    ],
    correct: 0,
    explanation: 'The police power belongs to the states; the Constitution doesn’t grant it, and the Tenth Amendment reserves it to them. Local governments have no inherent power and zone only as states delegate.',
  },
  'cp:law-euclid-standard': {
    text: 'Under *Euclid*, a zoning ordinance is valid unless it is:',
    options: [
      'Adopted without a comprehensive plan less than five years old',
      'Opposed by a majority of affected property owners',
      'Clearly arbitrary and unreasonable, with no substantial relation to public health, safety, morals, or general welfare',
      'Adopted without paying owners for lost value',
    ],
    correct: 2,
    explanation: 'The Court upheld zoning as a valid exercise of the police power unless it is "clearly arbitrary and unreasonable," a deferential standard that made Euclidean zoning the national norm.',
  },
  'cp:law-as-applied': {
    text: 'An owner concedes that the city’s zoning ordinance is valid overall but argues that its residential classification is unconstitutional for her parcel, given what surrounds it. This is:',
    options: ['A facial challenge', 'An as-applied challenge', 'A content-based challenge', 'A class-of-one claim'],
    correct: 1,
    explanation: 'An as-applied challenge attacks how an otherwise valid ordinance works on a specific property, as in *Nectow* (1928). A facial challenge, as in *Euclid*, attacks the ordinance as a whole.',
  },
  'cp:law-cleburne': {
    text: 'A city requires a special use permit for a group home for people with intellectual disabilities, but not for similar group living arrangements. Under *City of Cleburne v. Cleburne Living Center* (1985), the requirement:',
    options: [
      'Is valid, because rational basis review is easy to meet',
      'Must pass strict scrutiny, because disability is a suspect class',
      'Is preempted by RLUIPA',
      'Violates equal protection even under rational basis review, because it rests on irrational prejudice',
    ],
    correct: 3,
    explanation: 'The Court applied rational basis review and still struck the requirement down: treating the group home differently from similar uses had no rational basis beyond prejudice.',
  },
  'cp:law-rluipa': {
    text: 'Under RLUIPA, a land use regulation that imposes a substantial burden on religious exercise is allowed only if it:',
    options: [
      'Is rationally related to a legitimate government interest',
      'Applies to congregations above a certain size',
      'Is the least restrictive means of serving a compelling government interest',
      'Was adopted before the congregation bought the property',
    ],
    correct: 2,
    explanation: 'RLUIPA requires a compelling interest and the least restrictive means for any substantial burden on religious exercise. It also bars treating religious assemblies on less than equal terms with nonreligious ones.',
  },

  // takings-and-exactions
  'cp:takings-kelo-backlash': {
    text: 'What was the most common response to *Kelo v. City of New London* (2005)?',
    options: [
      'Congress banned eminent domain for any private transfer',
      'The Supreme Court overruled it within a few years',
      'Most states passed laws or constitutional amendments restricting eminent domain for economic development',
      'Cities stopped using eminent domain altogether',
    ],
    correct: 2,
    explanation: 'Kelo upheld taking homes for an economic development plan, 5–4. The backlash was immediate, and most states tightened limits on eminent domain for economic development.',
  },
  'cp:takings-whole-parcel': {
    text: 'In *Penn Central*, what did the Court treat as the unit for measuring the landmark law’s economic impact?',
    options: ['Only the airspace above the terminal', 'The parcel as a whole', 'The owner’s entire real estate portfolio', 'The city block around the terminal'],
    correct: 1,
    explanation: 'The Court looked at the parcel as a whole, not just the airspace the owner wanted to build in, and noted the owner could still earn a reasonable return and transfer development rights.',
  },
  'cp:takings-loretto': {
    text: 'A city ordinance requires landlords to let a utility permanently attach small equipment boxes to their buildings. Under *Loretto* (1982), this is:',
    options: [
      'A per se taking, because it authorizes a permanent physical occupation, however small',
      'Not a taking, because the boxes take up so little space',
      'Decided under the *Penn Central* balancing test',
      'A valid exaction, as long as it is roughly proportional',
    ],
    correct: 0,
    explanation: 'Loretto holds that a government-authorized permanent physical occupation is a taking no matter how small. No balancing is required.',
  },
  'cp:takings-moratorium': {
    text: 'A regional agency imposes a 32-month development moratorium while it studies water quality. Under *Tahoe-Sierra* (2002), the moratorium:',
    options: [
      'Is automatically a per se taking',
      'Is automatically valid because it is temporary',
      'Must be compensated for its full length regardless of its effect',
      'Is judged under *Penn Central*, looking at the parcel over time as a whole',
    ],
    correct: 3,
    explanation: 'Tahoe-Sierra held that a temporary moratorium isn’t a per se taking. Courts weigh it under *Penn Central*, treating the parcel over time as a whole.',
  },
  'cp:takings-proportional': {
    text: 'A county approves a 10-home subdivision on condition that the developer dedicate a 5-acre regional park, without any study tying the subdivision’s impact to a park that size. Which test is the condition most likely to fail?',
    options: ['Essential nexus (*Nollan*)', 'Rough proportionality (*Dolan*)', 'Public use (*Kelo*)', 'Content neutrality (*Reed*)'],
    correct: 1,
    explanation: 'New residents do create demand for parks, so a nexus exists. But *Dolan* requires the condition to be roughly proportional to the project’s impact, based on an individualized determination, and a regional park for ten homes isn’t.',
  },

  // federal-policy-and-planning
  'cp:fed-cdbg': {
    text: 'Which law consolidated urban renewal, Model Cities, and other categorical programs into the flexible Community Development Block Grant?',
    options: ['The Housing Act of 1937', 'The Housing Act of 1954', 'The Housing and Community Development Act of 1974', 'The National Housing Act of 1934'],
    correct: 2,
    explanation: 'The Housing and Community Development Act of 1974 created CDBG and the Section 8 rental assistance program.',
  },
  'cp:fed-istea': {
    text: 'Which law gave metropolitan planning organizations more authority and let highway money be spent on transit, bicycle, and pedestrian projects?',
    options: ['The Federal-Aid Highway Act of 1956', 'The Intermodal Surface Transportation Efficiency Act (ISTEA) of 1991', 'The Clean Water Act of 1972', 'The Housing Act of 1954'],
    correct: 1,
    explanation: 'ISTEA (1991) strengthened MPOs and added flexibility to spend federal highway funds on other modes. The 1956 act built the Interstate system.',
  },
  'cp:fed-nepa-procedural': {
    text: 'Which statement about NEPA is accurate?',
    options: [
      'It is procedural: agencies must study and disclose environmental impacts, not necessarily choose the least harmful option',
      'It requires agencies to choose the least environmentally harmful alternative',
      'It applies only to state and local government actions',
      'It regulates discharges of pollutants into waters of the United States',
    ],
    correct: 0,
    explanation: 'NEPA requires federal agencies to consider and disclose environmental effects. It doesn’t dictate the outcome. The Clean Water Act regulates discharges, and "little NEPA" laws reach state and local actions.',
  },
  'cp:fed-title-vi': {
    text: 'Why does Title VI of the Civil Rights Act of 1964 matter to a metropolitan planning organization?',
    options: [
      'It requires an Environmental Impact Statement for every regional plan',
      'It created the Community Development Block Grant',
      'It prohibits discrimination based on race, color, or national origin in federally funded programs, which underpins language access and equitable engagement',
      'It sets accessibility standards for sidewalks',
    ],
    correct: 2,
    explanation: 'Title VI reaches most planning agencies and MPOs because they receive federal funds. Accessibility standards come from the Americans with Disabilities Act.',
  },
};
