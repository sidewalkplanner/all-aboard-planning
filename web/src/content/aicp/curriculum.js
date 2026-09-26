// The AICP course: domains and lessons, in course order.
//
// Source of truth for the course overview, lesson pages, Previous/Next
// navigation, and study plans. Lesson bodies live in
// ./lessons/<slug>.md. See CLAUDE.md, "How to add a new lesson".
//
// Domains follow the nine areas of the AICP exam content outline, in outline
// order, with the weights recorded in uploads/aicp-diagnostic-exam-spec.md.
// `bankName` is the domain name the question banks use.
//
// `practice` lists the exam items a lesson teaches: "e1:115" = item n=115 in
// Practice Exam 1's bank (src/data/exam1-questions.js); e2/e3 likewise. They
// are never shown in the lesson. Exam results use them to point each missed
// question back to the lessons that cover it (see lessonsToReview).

export const DOMAINS = [
  {
    id: 'research', code: 1, weight: 11,
    name: 'Research and Assessment Methods', bankName: 'Research & Assessment Methods', short: 'Research',
    summary: 'How planners gather, analyze, and interpret evidence: research design, data sources, statistics, projections, and spatial analysis.',
    lessons: [
      {
        slug: 'research-design-and-data', title: 'Research design and data sources', minutes: 30, access: 'free',
        description: 'Research designs, community-based methods like asset mapping, the Census, ACS, and other data sources, survey design and sampling, and valid, reliable evidence.',
        outline: ['1.1 Conducting research and acquiring knowledge', '1.2 Data and source interpretation and evaluation', '1.4 Community involvement to develop understanding of a community', '1.5 Data collection strategies'],
        practice: ['e1:67', 'e1:121', 'e1:125', 'e1:126', 'e1:129', 'e1:131', 'e2:63', 'e2:64', 'e2:71', 'e2:121', 'e3:1', 'e3:3', 'e3:4', 'e3:7', 'e3:8', 'e3:9', 'e3:11', 'e3:12', 'e3:17', 'e3:18'],
      },
      {
        slug: 'statistics-for-planners', title: 'Statistics and quantitative evaluation', minutes: 30, access: 'paid',
        description: 'Levels of measurement, central tendency and spread, correlation, significance and error types, rates and constant dollars, margins of error, and discounting.',
        outline: ['1.2 Data and source interpretation and evaluation'],
        practice: ['e1:119', 'e1:120', 'e1:122', 'e1:123', 'e1:124', 'e2:122', 'e2:123', 'e2:124', 'e2:125', 'e2:126', 'e2:131', 'e2:132', 'e3:2', 'e3:10', 'e3:16', 'e3:19', 'e3:134'],
      },
      {
        slug: 'demographic-and-economic-analysis', title: 'Population projections and economic analysis', minutes: 27, access: 'paid',
        description: 'Cohort-component and trend projections, households and housing need, dependency ratios, location quotients, shift-share, and measures of inequality.',
        outline: ['1.1 Conducting research and acquiring knowledge', '1.2 Data and source interpretation and evaluation'],
        practice: ['e1:115', 'e1:116', 'e1:117', 'e1:118', 'e1:130', 'e2:114', 'e2:115', 'e2:116', 'e2:117', 'e2:118', 'e2:119', 'e2:120', 'e3:5', 'e3:6', 'e3:14'],
      },
      {
        slug: 'spatial-analysis-and-gis', title: 'Spatial analysis and GIS', minutes: 24, access: 'paid',
        description: 'Vector and raster data, map scale and projections, data sources like LiDAR, overlay and suitability analysis, map types, the modifiable areal unit problem, and gravity models.',
        outline: ['1.3 Spatial analysis'],
        practice: ['e1:7', 'e1:127', 'e1:128', 'e1:133', 'e2:59', 'e2:60', 'e3:8', 'e3:13', 'e3:15', 'e3:34'],
      },
    ],
  },
  {
    id: 'fundamentals', code: 2, weight: 15,
    name: 'Fundamental Planning Knowledge', bankName: 'Fundamental Planning Knowledge', short: 'Fundamentals',
    summary: 'The history, theory, and legal foundations of the profession, and the forces that shaped American cities and regions.',
    lessons: [
      {
        slug: 'planning-history', title: 'A history of American planning', minutes: 34, access: 'free',
        description: 'From colonial town plans and sanitary reform through the City Beautiful, the Garden City, the New Deal, urban renewal, the quiet revolution, New Urbanism, and Smart Growth.',
        outline: ['2.1 History of planning and planning movements'],
        practice: ['e1:1', 'e1:2', 'e1:3', 'e1:4', 'e1:5', 'e1:6', 'e1:8', 'e1:20', 'e1:21', 'e1:23', 'e2:3', 'e2:9', 'e2:12', 'e2:13', 'e2:14', 'e2:22', 'e3:21', 'e3:22'],
      },
      {
        slug: 'planning-theory', title: 'Planning theory', minutes: 26, access: 'paid',
        description: 'Rational-comprehensive planning, incrementalism, mixed scanning, advocacy, equity, radical and insurgent, transactive and communicative planning, and the just city.',
        outline: ['2.4 Planning theory'],
        practice: ['e1:11', 'e1:12', 'e1:13', 'e1:14', 'e1:19', 'e1:22', 'e1:26', 'e2:16', 'e2:17', 'e2:18', 'e2:19', 'e2:21', 'e2:43', 'e3:28', 'e3:30', 'e3:31', 'e3:32', 'e3:43'],
      },
      {
        slug: 'urban-form-and-settlement', title: 'Patterns of human settlement and urban form', minutes: 27, access: 'paid',
        description: 'Classic models of urban structure, bid-rent and central place theory, suburbanization, redlining and segregation, neighborhood change, and how cities are perceived.',
        outline: ['2.2 Patterns of human settlement', '2.7 Natural, social, and economic systems'],
        practice: ['e1:17', 'e1:18', 'e1:24', 'e1:25', 'e2:15', 'e3:33', 'e3:35', 'e3:36', 'e3:45', 'e3:47'],
      },
      {
        slug: 'land-use-law-foundations', title: 'Foundations of land use law', minutes: 32, access: 'paid',
        description: 'The police power, enabling acts, Dillon’s Rule and home rule, due process, equal protection, the First Amendment, cell tower siting, and the landmark zoning cases.',
        outline: ['2.3 Foundational legal principles'],
        practice: ['e1:9', 'e1:10', 'e1:15', 'e1:16', 'e1:46', 'e2:2', 'e2:8', 'e3:37', 'e3:38', 'e3:39', 'e3:40', 'e3:78', 'e3:79', 'e3:80', 'e3:81', 'e3:82', 'e3:83', 'e3:84', 'e3:170'],
      },
      {
        slug: 'takings-and-exactions', title: 'Takings, exactions, and property rights', minutes: 28, access: 'paid',
        description: 'Eminent domain and public use, regulatory takings tests, per se takings, and the nexus and proportionality rules for exactions.',
        outline: ['2.3 Foundational legal principles'],
        practice: ['e2:4', 'e2:5', 'e2:6', 'e2:78', 'e3:95', 'e3:96', 'e3:97', 'e3:98', 'e3:99', 'e3:100', 'e3:101', 'e3:102', 'e3:103', 'e3:104', 'e3:105', 'e3:106', 'e3:107', 'e3:126'],
      },
      {
        slug: 'federal-policy-and-planning', title: 'Federal laws and programs that shaped planning', minutes: 25, access: 'paid',
        description: 'Housing acts, the Interstate highway program and the transportation laws that followed, NEPA, civil rights, fair housing and fair lending law, and the federal grant programs planners still use.',
        outline: ['2.3 Foundational legal principles', "4.3 Familiarity with states' and federal laws"],
        practice: ['e2:23', 'e2:24', 'e2:25', 'e2:26', 'e3:23', 'e3:46', 'e3:48', 'e3:49', 'e3:50'],
      },
    ],
  },
  {
    id: 'communication', code: 3, weight: 13,
    name: 'Communication and Interaction', bankName: 'Communication & Interaction', short: 'Communication',
    summary: 'Engaging the public, communicating clearly and equitably, building consensus, and advising decision-makers.',
    lessons: [
      {
        slug: 'public-engagement-design', title: 'Designing public engagement', minutes: 27, access: 'free',
        description: 'Arnstein’s ladder, the IAP2 spectrum, stakeholder analysis, choosing outreach and deliberative techniques, and evaluating whether engagement actually worked.',
        outline: ['3.1 Communication', '3.9 Outreach strategies and techniques', '3.10 Evaluation of outreach strategy', '1.4 Community involvement to develop understanding of a community'],
        practice: ['e1:53', 'e1:58', 'e1:68', 'e1:71', 'e1:72', 'e1:73', 'e2:20', 'e2:54', 'e2:55', 'e2:57', 'e2:67', 'e2:72', 'e3:29', 'e3:55', 'e3:56', 'e3:59', 'e3:203'],
      },
      {
        slug: 'equitable-and-accessible-engagement', title: 'Equitable, inclusive, and accessible engagement', minutes: 23, access: 'paid',
        description: 'Reaching people who are usually left out, equity analysis, language access, culturally appropriate communication, and accessible digital media.',
        outline: ['3.2 Nondiscriminatory and accessible electronic media', '3.5 Social justice', '3.6 Culturally appropriate communication'],
        practice: ['e1:52', 'e1:54', 'e1:57', 'e1:66', 'e2:56', 'e2:65', 'e2:66', 'e3:27', 'e3:58', 'e3:64', 'e3:70'],
      },
      {
        slug: 'consensus-and-negotiation', title: 'Facilitation, consensus building, and negotiation', minutes: 28, access: 'paid',
        description: 'Running fair meetings, active listening, group dynamics, structured group techniques, conflict styles, interest-based negotiation, opposition, mediation, and arbitration.',
        outline: ['3.3 Listening, comprehension, and reflection of needs', '3.7 Processes and techniques for consensus', '4.8 Mediation, negotiation, facilitation'],
        practice: ['e1:42', 'e1:59', 'e1:62', 'e1:63', 'e2:52', 'e2:53', 'e2:68', 'e2:69', 'e3:57', 'e3:60', 'e3:61', 'e3:66', 'e3:204'],
      },
      {
        slug: 'communicating-with-decision-makers', title: 'Staff reports, hearings, and the media', minutes: 26, access: 'paid',
        description: 'Writing staff reports, presentations and honest visuals, the roles of staff and officials, meeting procedure, hearings and ex parte contacts, evidence-based arguments, and working with the press.',
        outline: ['3.4 Leadership and influencing decision-making', '3.8 Role of organizational structures and functions', '3.11 Evidence-based argument formulation', '3.12 Sensitive or complex political situation management'],
        practice: ['e1:55', 'e1:56', 'e1:60', 'e1:61', 'e1:64', 'e1:65', 'e1:69', 'e2:58', 'e2:61', 'e2:62', 'e2:70', 'e2:73', 'e3:62', 'e3:63', 'e3:65', 'e3:67', 'e3:201', 'e3:202', 'e3:205', 'e3:206'],
      },
    ],
  },
  {
    id: 'plan-policy', code: 4, weight: 15,
    name: 'Plan and Policy Development', bankName: 'Plan & Policy Development', short: 'Plan & Policy',
    summary: 'Turning community values and analysis into plans: the planning process, plan types and elements, policy writing, and evaluating alternatives.',
    lessons: [
      {
        slug: 'the-planning-process', title: 'The planning process, from scoping to adoption', minutes: 26, access: 'free',
        description: 'Preparing to plan, the steps of a plan-making process, policy analysis, existing conditions, adoption, and when a plan needs an amendment or a full update.',
        outline: ['4.1 Preparing to plan', '4.2 Planning as sequential steps and multivariate analyses'],
        practice: ['e1:27', 'e1:30', 'e1:50', 'e2:29', 'e2:46', 'e2:47', 'e2:48', 'e3:24', 'e3:193', 'e3:198'],
      },
      {
        slug: 'comprehensive-plans', title: 'Comprehensive plans, elements, and consistency', minutes: 22, access: 'paid',
        description: 'What a comprehensive plan is (and isn’t), typical elements, area and functional plans, and the consistency doctrine.',
        outline: ["4.3 Familiarity with states' and federal laws", '4.12 Community character and form', '4.14 Conversance with related disciplines'],
        practice: ['e1:31', 'e1:32', 'e1:33', 'e1:104', 'e2:27', 'e2:32', 'e2:34', 'e2:42', 'e2:51', 'e3:195', 'e3:197', 'e3:199'],
      },
      {
        slug: 'goals-objectives-policies', title: 'Vision, goals, objectives, and policies', minutes: 22, access: 'paid',
        description: 'The plan hierarchy from vision to action, writing measurable objectives, drafting policy, building in an equity framework, and setting priorities.',
        outline: ['4.4 Formulating and drafting policies', '4.5 Vision, goal, objective, policy, and priority statements', '4.6 Objectives and actions within an equity framework'],
        practice: ['e1:29', 'e1:34', 'e1:39', 'e1:41', 'e2:28', 'e2:31', 'e2:35', 'e3:25', 'e3:26', 'e3:74', 'e3:192'],
      },
      {
        slug: 'plan-analysis-tools', title: 'Scenario planning, fiscal impact, and consequence analysis', minutes: 28, access: 'paid',
        description: 'Comparing alternatives, scenario planning under uncertainty, buildable lands, fiscal impact methods, greenhouse gas inventories, impact assessments, and funding versus financing.',
        outline: ['4.9 Applying innovations and best practices', '4.10 Identifying and evaluating consequences', '4.11 Funding and financing considerations'],
        practice: ['e1:35', 'e1:43', 'e1:132', 'e2:30', 'e2:36', 'e2:37', 'e2:40', 'e2:41', 'e2:45', 'e3:136'],
      },
    ],
  },
  {
    id: 'implementation', code: 5, weight: 12,
    name: 'Plan Implementation', bankName: 'Plan Implementation', short: 'Implementation',
    summary: 'The regulatory, financial, and administrative tools that turn an adopted plan into what actually gets built.',
    lessons: [
      {
        slug: 'zoning-fundamentals', title: 'Zoning fundamentals', minutes: 27, access: 'free',
        description: 'How a zoning ordinance is built: districts, the map and text, permitted and conditional uses, dimensional standards, overlays, enforcement, and newer uses such as short-term rentals.',
        outline: ['5.1 Develop and interpret rules and regulations'],
        practice: ['e1:31', 'e1:74', 'e1:75', 'e1:82', 'e2:75', 'e2:91'],
      },
      {
        slug: 'zoning-relief-and-nonconformities', title: 'Variances, rezonings, and nonconformities', minutes: 27, access: 'paid',
        description: 'Area and use variances, rezonings and spot zoning, contract zoning, quasi-judicial decisions, nonconforming uses, amortization, moratoria, and appeals and judicial review.',
        outline: ['5.1 Develop and interpret rules and regulations'],
        practice: ['e1:47', 'e1:76', 'e1:77', 'e1:78', 'e2:74', 'e2:76', 'e2:77', 'e2:88', 'e2:89', 'e2:93', 'e3:85', 'e3:86', 'e3:87', 'e3:88', 'e3:89', 'e3:128'],
      },
      {
        slug: 'subdivision-and-development-review', title: 'Subdivision and development review', minutes: 23, access: 'paid',
        description: 'Plats, improvement guarantees, site plan review, consistency findings, vested rights, development agreements, the official map, and private covenants and HOAs.',
        outline: ['5.1 Develop and interpret rules and regulations', '5.3 Proposal assessment for consistency'],
        practice: ['e1:79', 'e1:80', 'e1:83', 'e1:86', 'e1:89', 'e2:85', 'e2:86', 'e2:87', 'e3:90', 'e3:127', 'e3:129'],
      },
      {
        slug: 'growth-management-and-innovative-tools', title: 'Growth management and innovative land use tools', minutes: 26, access: 'paid',
        description: 'Form-based codes, PUDs, performance zoning, cluster subdivisions, TDR and PDR, inclusionary zoning, urban growth boundaries, and concurrency.',
        outline: ['5.1 Develop and interpret rules and regulations', '4.9 Applying innovations and best practices'],
        practice: ['e1:38', 'e1:40', 'e1:44', 'e1:45', 'e1:48', 'e1:51', 'e1:87', 'e1:88', 'e1:91', 'e1:92', 'e2:33', 'e2:79', 'e2:82', 'e2:84', 'e3:71', 'e3:75', 'e3:76', 'e3:165'],
      },
      {
        slug: 'implementation-math', title: 'Implementation math: FAR, density, parking, and more', minutes: 20, access: 'paid',
        description: 'Worked examples of the calculations the exam asks for: floor area ratio, net and gross density, parking, trip generation, and affordability.',
        outline: ['5.1 Develop and interpret rules and regulations'],
        practice: ['e2:127', 'e2:128', 'e2:129', 'e2:130', 'e3:108', 'e3:111', 'e3:121'],
      },
      {
        slug: 'capital-planning-and-finance', title: 'Capital planning and public finance', minutes: 27, access: 'paid',
        description: 'The capital improvements program, bonds, tax increment financing, special assessments, impact fees, business improvement districts, and life-cycle costs and debt capacity.',
        outline: ['5.2 Aligning and activating funding and financing', '4.11 Funding and financing considerations'],
        practice: ['e1:36', 'e1:37', 'e1:81', 'e1:157', 'e2:80', 'e2:92', 'e2:102', 'e2:154', 'e2:155', 'e3:130', 'e3:131', 'e3:132', 'e3:133', 'e3:135', 'e3:137', 'e3:141', 'e3:142', 'e3:143', 'e3:144'],
      },
      {
        slug: 'monitoring-and-implementation-programs', title: 'Implementation programs, partnerships, and monitoring', minutes: 23, access: 'paid',
        description: 'Action plans with owners and timelines, strategic partnerships, redevelopment tools such as land banks, removing obstacles, logic models and indicators, and keeping a plan current.',
        outline: ['5.4 Developing strategic partnerships', '5.5 Identifying and mitigating implementation obstacles', '5.6 Drafting action steps and assigning responsibility', '5.7 Monitoring, evaluating, and updating plans'],
        practice: ['e1:84', 'e1:85', 'e1:90', 'e1:93', 'e3:194', 'e3:196', 'e3:200'],
      },
    ],
  },
  {
    id: 'administration', code: 6, weight: 6,
    name: 'Administration and Management', bankName: 'Administration & Management', short: 'Administration',
    summary: 'Running projects, budgets, contracts, and people inside a public agency or consulting practice.',
    lessons: [
      {
        slug: 'project-and-contract-management', title: 'Project, procurement, and contract management', minutes: 20, access: 'free',
        description: 'Scopes of work, schedules and the critical path, RFQs and RFPs, qualifications-based selection, managing consultants, and quality control.',
        outline: ['6.1 Project or program management', '6.3 Management of external relationships'],
        practice: ['e1:152', 'e1:155', 'e1:158', 'e1:160', 'e2:150', 'e2:151', 'e3:145', 'e3:146', 'e3:147', 'e3:148', 'e3:153', 'e3:154'],
      },
      {
        slug: 'managing-a-planning-agency', title: 'Managing a planning agency', minutes: 22, access: 'paid',
        description: 'Forms of government, organizational structures, budget formats, performance measures, supervising staff, and public records and open meetings.',
        outline: ['6.2 Internal organizational management', '6.4 Mentoring and motivating staff', '6.5 Results-oriented management and accountability'],
        practice: ['e1:151', 'e1:153', 'e1:154', 'e1:156', 'e1:159', 'e2:152', 'e2:153', 'e2:156', 'e2:157', 'e2:158', 'e2:159', 'e2:160', 'e3:149', 'e3:150', 'e3:151', 'e3:155', 'e3:156'],
      },
    ],
  },
  {
    id: 'leadership', code: 7, weight: 6,
    name: 'Leadership', bankName: 'Leadership', short: 'Leadership',
    summary: 'Leading with and without formal authority: serving the public interest, advocating ethically, and developing the next generation of planners.',
    lessons: [
      {
        slug: 'leadership-in-planning', title: 'Leadership in planning', minutes: 20, access: 'free',
        description: 'Leadership styles, influence without authority, the public interest, ethical advocacy, and promoting the value of planning.',
        outline: ['7.2 Ethical aspects of advocacy', "7.6 A planner's comprehensive approach to complex problems", '7.9 Discerning and promoting the public interest', '7.11 Promoting the value of planning'],
        practice: ['e1:161', 'e1:162', 'e1:163', 'e1:167', 'e1:168', 'e1:170', 'e2:161', 'e2:162', 'e2:163', 'e2:165', 'e2:167', 'e2:168', 'e2:169', 'e3:44', 'e3:68', 'e3:69', 'e3:188', 'e3:189', 'e3:191'],
      },
      {
        slug: 'mentoring-and-professional-development', title: 'Mentoring, teams, and professional development', minutes: 18, access: 'paid',
        description: 'Delegation, resolving staff conflict, coaching and mentoring, succession planning, institutional accountability, and certification maintenance.',
        outline: ['7.5 Institutional structures and accountability', '7.8 Coaching and mentoring', '7.10 Professional development expectations and standards'],
        practice: ['e1:164', 'e1:165', 'e1:166', 'e1:169', 'e2:143', 'e2:164', 'e2:166', 'e2:170', 'e3:152', 'e3:157', 'e3:180', 'e3:190'],
      },
    ],
  },
  {
    id: 'practice', code: 8, weight: 12,
    name: 'Areas of Practice', bankName: 'Areas of Practice', short: 'Areas of Practice',
    summary: 'The specialized fields planners work in: transportation, housing, environment and hazards, economic development, urban design, preservation, health, and regional planning.',
    lessons: [
      {
        slug: 'transportation-planning', title: 'Transportation planning', minutes: 24, access: 'free',
        description: 'MPOs and their plans, the four-step model, level of service versus VMT, induced demand, complete streets, Vision Zero, TOD, and TDM.',
        outline: ['8.5 Transportation mobility and access planning'],
        practice: ['e1:94', 'e1:95', 'e1:96', 'e1:97', 'e1:98', 'e1:105', 'e1:106', 'e2:94', 'e2:95', 'e2:96', 'e2:97', 'e3:41', 'e3:52', 'e3:53', 'e3:54', 'e3:120', 'e3:122', 'e3:123', 'e3:124', 'e3:125'],
      },
      {
        slug: 'housing-and-community-development', title: 'Housing and community development', minutes: 26, access: 'paid',
        description: 'Affordability and cost burden, area median income, LIHTC and vouchers, CDBG, fair housing, fair share, missing middle, and displacement.',
        outline: ['8.11 Housing planning'],
        practice: ['e1:99', 'e1:100', 'e1:114', 'e2:7', 'e2:49', 'e2:50', 'e2:98', 'e2:99', 'e2:100', 'e2:109', 'e3:51', 'e3:77', 'e3:108', 'e3:109', 'e3:110', 'e3:112', 'e3:113', 'e3:115', 'e3:116', 'e3:117', 'e3:118', 'e3:119'],
      },
      {
        slug: 'environmental-planning-and-hazards', title: 'Environmental planning, hazards, and resilience', minutes: 26, access: 'paid',
        description: 'Environmental review, brownfields, floodplains and the NFIP, hazard mitigation plans, climate mitigation and adaptation, and green infrastructure.',
        outline: ['8.7 Hazard mitigation and resiliency planning', '8.8 Natural resources planning'],
        practice: ['e1:30', 'e1:101', 'e1:102', 'e1:108', 'e1:111', 'e2:39', 'e2:44', 'e2:103', 'e2:107', 'e2:112', 'e3:72', 'e3:91', 'e3:92', 'e3:93', 'e3:168', 'e3:169', 'e3:197'],
      },
      {
        slug: 'economic-development', title: 'Economic development', minutes: 20, access: 'paid',
        description: 'Economic base theory and multipliers, location quotients in practice, clusters, retail analysis, incentives, and place-based tax programs.',
        outline: [],
        practice: ['e1:110', 'e1:116', 'e1:117', 'e2:101', 'e2:102', 'e3:138', 'e3:139', 'e3:140', 'e3:158', 'e3:159', 'e3:160', 'e3:161'],
      },
      {
        slug: 'urban-design-and-historic-preservation', title: 'Urban design and historic preservation', minutes: 24, access: 'paid',
        description: 'Principles of urban form, placemaking, CPTED, the transect, the National Register, Section 106, local historic districts, and rehabilitation tax credits.',
        outline: ['8.10 Urban design', '8.13 Historic and cultural resource planning'],
        practice: ['e1:70', 'e1:107', 'e1:109', 'e1:112', 'e2:38', 'e2:104', 'e2:105', 'e2:106', 'e3:33', 'e3:162', 'e3:163', 'e3:164', 'e3:165'],
      },
      {
        slug: 'health-food-parks-and-regional-planning', title: 'Health, food systems, parks, and regional planning', minutes: 22, access: 'paid',
        description: 'Health impact assessment, food access, park classification and level of service, smart-city data, and planning across jurisdictions.',
        outline: ['8.12 Parks, recreation, and open space', '8.15 Food planning', '8.16 Health planning', '8.19 Regional and multijurisdictional planning'],
        practice: ['e1:98', 'e1:103', 'e1:104', 'e1:113', 'e2:111', 'e2:113', 'e3:42', 'e3:166', 'e3:167'],
      },
      {
        slug: 'rural-small-town-and-tribal-planning', title: 'Rural, small-town, and tribal planning', minutes: 18, access: 'paid',
        description: 'Planning with limited capacity, protecting farmland and rural character, directing rural growth, and working with tribal nations as sovereign governments.',
        outline: [],
        practice: ['e1:48', 'e3:71', 'e3:72', 'e3:73', 'e3:74', 'e3:164', 'e3:165'],
      },
      {
        slug: 'infrastructure-energy-and-water-planning', title: 'Infrastructure, energy, and water planning', minutes: 18, access: 'paid',
        description: 'How infrastructure steers growth, asset management, water supply, wastewater and stormwater, energy siting, broadband, and fair siting.',
        outline: [],
        practice: ['e1:38', 'e1:85', 'e1:93', 'e2:33', 'e2:51', 'e2:86', 'e2:112', 'e3:72', 'e3:168', 'e3:200'],
      },
    ],
  },
  {
    id: 'ethics', code: 9, weight: 10,
    name: 'AICP Code of Ethics and Professional Conduct', bankName: 'Code of Ethics & Professional Conduct', short: 'Ethics',
    summary: 'The AICP Code: its aspirational principles, its enforceable Rules of Conduct, how it is enforced, and how to reason through ethics scenarios.',
    lessons: [
      {
        slug: 'aicp-code-of-ethics', title: 'How the AICP Code of Ethics is organized', minutes: 20, access: 'free',
        description: 'Aspirational principles versus enforceable rules, the three responsibilities, advisory opinions, charges, and sanctions.',
        outline: ['9.1 Overall responsibility to the public', '9.2 Responsibility to clients and employers', '9.3 Responsibility to the profession and colleagues', '9.4 Upholding the rules of conduct'],
        practice: ['e1:137', 'e1:138', 'e1:139', 'e1:142', 'e1:144', 'e1:147', 'e1:149', 'e2:133', 'e2:134', 'e2:135', 'e2:142', 'e2:148', 'e3:171', 'e3:177', 'e3:178', 'e3:179', 'e3:186'],
      },
      {
        slug: 'conflicts-of-interest-and-rules-of-conduct', title: 'Conflicts of interest and the Rules of Conduct', minutes: 22, access: 'paid',
        description: 'Gifts, financial interests, disclosure and recusal, confidential information, competence, honest claims about qualifications, and prior relationships.',
        outline: ['9.4 Upholding the rules of conduct'],
        practice: ['e1:134', 'e1:135', 'e1:140', 'e1:143', 'e1:146', 'e2:136', 'e2:138', 'e2:139', 'e2:140', 'e2:141', 'e2:149', 'e3:172', 'e3:173', 'e3:174', 'e3:175', 'e3:176', 'e3:184', 'e3:187'],
      },
      {
        slug: 'solving-ethics-questions', title: 'Working through ethics scenarios', minutes: 20, access: 'paid',
        description: 'A repeatable method for ethics questions, with worked cases on political pressure, client advocacy, and objective analysis.',
        outline: ['9.1 Overall responsibility to the public', '9.4 Upholding the rules of conduct'],
        practice: ['e1:136', 'e1:141', 'e1:145', 'e1:148', 'e1:150', 'e2:137', 'e2:144', 'e2:145', 'e2:146', 'e2:147', 'e3:181', 'e3:182', 'e3:183', 'e3:185'],
      },
    ],
  },
];

// Flattened course order, each lesson annotated with its domain and position.
export const LESSONS = DOMAINS.flatMap((d) => d.lessons.map((l, i) => ({ ...l, domainId: d.id, lessonInDomain: i + 1 })))
  .map((l, i) => ({ ...l, number: i + 1 }));

export const lessonBySlug = (slug) => LESSONS.find((l) => l.slug === slug) || null;
export const domainById = (id) => DOMAINS.find((d) => d.id === id) || null;
export const domainByBankName = (name) => DOMAINS.find((d) => d.bankName === name) || null;

export const neighbors = (slug) => {
  const i = LESSONS.findIndex((l) => l.slug === slug);
  return { prev: i > 0 ? LESSONS[i - 1] : null, next: i >= 0 && i < LESSONS.length - 1 ? LESSONS[i + 1] : null };
};

// Reverse index: exam question ref -> slugs of the lessons that teach it.
// Lessons never show these items (their checkpoints are original); the map
// only lets exam results point missed questions back to lessons.
export const LESSONS_FOR_REF = LESSONS.reduce((m, l) => {
  (l.practice || []).forEach((r) => { (m[r] = m[r] || []).push(l.slug); });
  return m;
}, {});

// Rank lessons by how many of the given missed refs they cover (most first).
export const lessonsToReview = (missedRefs, limit = 5) => {
  const counts = {};
  (missedRefs || []).forEach((r) => (LESSONS_FOR_REF[r] || []).forEach((slug) => { counts[slug] = (counts[slug] || 0) + 1; }));
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || lessonBySlug(a[0]).number - lessonBySlug(b[0]).number)
    .slice(0, limit)
    .map(([slug, misses]) => ({ lesson: lessonBySlug(slug), misses }));
};

export const TOTAL_MINUTES = LESSONS.reduce((s, l) => s + l.minutes, 0);
