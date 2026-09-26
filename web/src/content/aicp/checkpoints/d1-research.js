// Domain 1: Research and Assessment Methods. Original checkpoint questions,
// written for the lessons only (none appear in the practice exams).
export default {
  // research-design-and-data
  'cp:rd-triangulation': {
    text: 'A survey shows low evening use of a riverside trail. Focus groups then reveal that residents avoid it because the path is unlit and feels unsafe. Using the focus groups to explain and confirm the survey finding is an example of:',
    options: ['Stratified sampling', 'Snowball sampling', 'Triangulation', 'Cluster analysis'],
    correct: 2,
    explanation: 'Triangulation checks a finding with more than one method or source. Here a quantitative survey and qualitative focus groups reinforce each other and point toward a solution (lighting).',
  },
  'cp:rd-acs-moe': {
    text: 'Which statement about American Community Survey (ACS) estimates is accurate?',
    options: [
      'They come from a complete count of every household',
      'Every estimate has a margin of error, because the ACS is a sample survey',
      'They are the basis for apportioning seats in the U.S. House',
      'A 5-year estimate describes conditions in the final year of the period only',
    ],
    correct: 1,
    explanation: 'The ACS is a continuous sample survey, so each estimate carries a margin of error. The decennial census is the complete count used for apportionment, and a 5-year estimate describes the whole period, not a single year.',
  },
  'cp:rd-stratified': {
    text: 'To make sure both renters and owners are well represented in a corridor survey, a planner splits the household list into renters and owners and draws a random sample from each group. This is:',
    options: ['Stratified random sampling', 'Cluster sampling', 'Systematic sampling', 'Convenience sampling'],
    correct: 0,
    explanation: 'Stratified random sampling divides the population into subgroups (strata) and samples randomly within each, which guarantees every group is represented. Cluster sampling selects whole groups, such as blocks, at random.',
  },
  'cp:rd-leading': {
    text: 'A resident survey asks: "Don’t you agree that the new bike lanes have made Main Street more dangerous?" The main problem with this question is:',
    options: ['Coverage bias', 'Nonresponse bias', 'Self-selection bias', 'Question-wording bias'],
    correct: 3,
    explanation: 'The wording pushes respondents toward an answer, which is question-wording bias. Coverage, nonresponse, and self-selection bias are about who gets surveyed or who answers, not how the question is phrased.',
  },
  'cp:rd-ethics': {
    text: 'A planner interviews tenants, some of them undocumented, about unsafe housing conditions and plans to publish the findings. Which practice best meets the planner’s research obligations?',
    options: [
      'Publish quotes with names attached so the findings are credible',
      'Obtain informed consent, store the notes securely, and report results so no individual can be identified',
      'Skip consent because the interviews are informal conversations',
      'Share the raw interview notes with the landlord so the claims can be verified',
    ],
    correct: 1,
    explanation: 'Research with people requires informed consent and confidentiality, and it matters most when the data is sensitive and participants are vulnerable. Results should be reported in ways that don’t reveal individuals.',
  },

  // statistics-for-planners
  'cp:stat-mode': {
    text: 'A planner wants to report the most common way residents get to work: drive alone, carpool, transit, bike, or walk. Which measure of center fits these categories?',
    options: ['Mean', 'Median', 'Range', 'Mode'],
    correct: 3,
    explanation: 'The mode, the most frequent value, is the only measure of center that works for categories. Mean and median need numbers that can be averaged or ordered.',
  },
  'cp:stat-r2': {
    text: 'A regression of weekday transit boardings on service frequency across a city’s routes has an R-squared of 0.40. Which reading is correct?',
    options: [
      'Frequency causes 40% of all boardings',
      'The model accounts for about 40% of the variation in boardings',
      'The correlation between frequency and boardings is −0.40',
      '40% of riders use the most frequent routes',
    ],
    correct: 1,
    explanation: 'R-squared is the share of variation in the dependent variable that the model explains. It says nothing about causation, and it isn’t the correlation coefficient.',
  },
  'cp:stat-chisq': {
    text: 'A planner wants to know whether housing tenure (own or rent) is related to how residents voted on a ballot measure (yes or no). Both variables are categories. Which test fits?',
    options: ['A t-test', 'Analysis of variance (ANOVA)', 'A chi-square test', 'A present value calculation'],
    correct: 2,
    explanation: 'A chi-square test asks whether two categorical variables are related. A t-test compares two group means, and ANOVA compares three or more.',
  },
  'cp:stat-moe-use': {
    text: 'An ACS estimate for one census tract reports 240 households below the poverty line, with a margin of error of ±210. What is the best way to use it?',
    options: [
      'Report 240 as a precise count',
      'Treat it as unreliable on its own: combine tracts or use a longer period, and report the margin of error',
      'Replace it with poverty data from the decennial census',
      'Drop the margin of error from the table, since it confuses readers',
    ],
    correct: 1,
    explanation: 'When the margin of error is nearly as large as the estimate, the estimate isn’t usable alone. Aggregate geographies or use a longer period, and always report margins of error for small areas. The decennial census doesn’t collect income.',
  },
  'cp:stat-bcr': {
    text: 'A flood wall costs $2 million today. The present value of the flood damage it will prevent over its life is $2.5 million. What is its benefit-cost ratio?',
    options: ['0.8', '$0.5 million', '4.5', '1.25'],
    correct: 3,
    explanation: 'Benefit-cost ratio = present value of benefits ÷ present value of costs = 2.5 ÷ 2 = 1.25. Because it’s above 1.0, benefits exceed costs. The $0.5 million difference is the net present value, not the ratio.',
  },

  // demographic-and-economic-analysis
  'cp:demo-cohort': {
    text: 'A school district asks how many kindergartners to expect in ten years. Why is the cohort-component method the right tool?',
    options: [
      'It extends the recent trend in total population, which is simplest',
      'It tracks age structure, moving each age cohort forward with births, deaths, and migration',
      'It estimates population from the number of building permits issued',
      'It compares local employment with the national economy',
    ],
    correct: 1,
    explanation: 'Because it follows cohorts by age, the cohort-component method can answer "how many five-year-olds?" A trend line only projects totals, the housing-unit method estimates current population, and location quotients describe employment.',
  },
  'cp:demo-housing-unit': {
    text: 'A city added 800 housing units last year. Occupancy is 95% and the average household size is 2.5. Using the housing-unit method, about how many residents did those units add?',
    options: ['760', '1,824', '1,900', '2,000'],
    correct: 2,
    explanation: '800 × 0.95 × 2.5 = 1,900. Multiplying by occupancy first matters: only occupied units house people. 2,000 skips the occupancy rate, and 1,824 uses the wrong household size.',
  },
  'cp:demo-lq': {
    text: 'Tourism provides 5,000 of a county’s 40,000 jobs (12.5%). Nationally, tourism is 5% of employment. What is the location quotient, and what does it suggest?',
    options: [
      '0.4: the county likely imports tourism services',
      '1.0: the county matches the nation',
      '2.5: tourism is more concentrated locally than nationally, so it is likely an export industry',
      '7.5: tourism is the county’s largest employer',
    ],
    correct: 2,
    explanation: 'LQ = 12.5% ÷ 5% = 2.5. An LQ above 1.0 means the industry is more concentrated locally than nationally, a sign it brings money in from outside. Treat it as a screen, not proof.',
  },
  'cp:demo-shift-local': {
    text: 'In a shift-share analysis, which component captures growth explained by local conditions, meaning the area did better or worse than the industry did nationally?',
    options: ['National growth share', 'Industry-mix share', 'Location quotient', 'Local (competitive) share'],
    correct: 3,
    explanation: 'The local (competitive) share is what remains after removing growth due to the national economy and to the industry’s own national performance. A positive local share suggests a local competitive advantage.',
  },
  'cp:demo-dissimilarity': {
    text: 'A region’s index of dissimilarity between two groups is 60. Which interpretation is correct?',
    options: [
      'About 60% of one group would have to move to a different tract for the two groups to be evenly distributed',
      '60% of the region’s income goes to one group',
      'The two groups are almost perfectly integrated',
      'Income inequality in the region is moderate',
    ],
    correct: 0,
    explanation: 'The index of dissimilarity runs from 0 (perfectly even) to 100 (completely separated) and can be read as the share of one group that would have to move. Income inequality is measured with the Gini coefficient.',
  },

  // spatial-analysis-and-gis
  'cp:gis-vector': {
    text: 'A planner is building a GIS layer set of bus stops, street centerlines, and parcel boundaries. Which data model fits these features best?',
    options: ['Vector data: points, lines, and polygons', 'Raster data: a grid of cells', 'A digital elevation model', 'Satellite land-cover imagery'],
    correct: 0,
    explanation: 'Discrete features with clear boundaries and networks call for vector data. Raster grids suit continuous surfaces such as elevation, slope, or flood depth.',
  },
  'cp:gis-weights': {
    text: 'In a GIS suitability analysis for new housing, the team must decide how much steep slopes should count compared with transit access. How should that weighting be handled?',
    options: [
      'Accept the software’s default weights, since they are objective',
      'Give every layer equal weight so no one can object',
      'Treat it as a value judgment, made transparently and ideally with stakeholders',
      'Let the classification method choose the weights',
    ],
    correct: 2,
    explanation: 'A suitability analysis is only as good as its weights, and how much one factor matters compared with another is a value judgment. Make it openly, ideally with the people affected. Equal weights are also a value judgment, just an unexamined one.',
  },
  'cp:gis-ecological': {
    text: 'A census tract has a high median household income, so a planner concludes that nearly every household in it is affluent. This error is called:',
    options: ['The modifiable areal unit problem', 'The ecological fallacy', 'Coverage bias', 'Question-wording bias'],
    correct: 1,
    explanation: 'The ecological fallacy is inferring something about individuals from area-level data. A high-income tract can still contain many low-income households.',
  },
  'cp:gis-gravity': {
    text: 'Under the gravity model, the interaction between two places:',
    options: [
      'Rises with distance and falls with their size',
      'Is the same for every pair of places',
      'Depends only on travel cost, not on the places’ size',
      'Rises with the places’ size and falls with the distance between them',
    ],
    correct: 3,
    explanation: 'Like gravity in physics, interaction increases with size (population, jobs, retail space) and decreases with distance, often with distance squared. That is why shoppers will travel farther to a larger center.',
  },
  'cp:gis-line-chart': {
    text: 'Which graphic best shows how a town’s population changed between 1970 and 2020?',
    options: ['A pie chart', 'A line chart', 'A scatter plot', 'A choropleth map'],
    correct: 1,
    explanation: 'Change over time calls for a line chart. Pie charts show parts of a whole, scatter plots show the relationship between two variables, and choropleth maps show values across geography.',
  },

  // Added with the module 1 depth review.
  'cp:rd-comparison-group': {
    text: 'After a city adds curb extensions on one corridor, pedestrian crashes there fall 25%. On similar corridors without changes, they fell 20% over the same years. What is the best reading?',
    options: [
      'The curb extensions cut crashes by 25%',
      'The curb extensions had no effect at all',
      'The extensions’ own effect was likely much smaller than 25%',
      'The comparison corridors are irrelevant to the question',
    ],
    correct: 2,
    explanation: 'Comparing with similar places that didn’t get the change separates the program’s effect from everything else that changed. Crashes fell almost as much elsewhere, so most of the 25% drop isn’t due to the curb extensions.',
  },
  'cp:rd-asset-mapping': {
    text: 'A planner begins a neighborhood plan by listing the area’s churches, small businesses, youth programs, skilled residents, and informal gathering places. This is:',
    options: ['A needs assessment', 'Asset mapping', 'A windshield survey', 'A fiscal impact analysis'],
    correct: 1,
    explanation: 'Asset mapping inventories what a community already has to build on. A needs assessment starts from gaps, a windshield survey records physical conditions, and fiscal impact analysis weighs public costs and revenues.',
  },
  'cp:rd-lehd': {
    text: 'A county wants to know how many people who work at its business park live in neighboring counties. Which source is built for that question?',
    options: [
      'The decennial census population count',
      'County Business Patterns',
      'HUD CHAS data',
      'LEHD data, through the OnTheMap tool',
    ],
    correct: 3,
    explanation: 'LEHD links where people work to where they live, so OnTheMap can show commute flows into the business park. County Business Patterns counts establishments and jobs, CHAS covers housing problems, and the decennial census counts residents where they live.',
  },
  'cp:rd-sample-size': {
    text: 'A random survey of 400 residents has a margin of error of about ±5 points. Roughly how many responses would it take to cut the margin to about ±2.5 points?',
    options: ['About 1,600', 'About 800', 'About 600', 'It depends mainly on the city’s total population'],
    correct: 0,
    explanation: 'The margin of error shrinks with the square root of the sample size, so halving it takes about four times the responses: 4 × 400 = 1,600. For a large population, the population’s size barely affects precision.',
  },
  'cp:stat-levels': {
    text: 'A survey asks residents to rate a park as poor, fair, good, or excellent. What level of measurement is this, and which summary fits it best?',
    options: [
      'Nominal; the mean',
      'Ratio; the mean',
      'Ordinal; the median or the share in each category',
      'Interval; the standard deviation',
    ],
    correct: 2,
    explanation: 'The categories have an order but no guaranteed equal spacing, so the data are ordinal. The median, or the share choosing each rating, describes them honestly; a mean assumes equal gaps.',
  },
  'cp:stat-points': {
    text: 'The share of households without a car falls from 20% to 15%. Which description is accurate?',
    options: [
      'A drop of 5 percentage points, or 25 percent',
      'A drop of 5 percent',
      'A drop of 25 percentage points',
      'A drop of 15 percent',
    ],
    correct: 0,
    explanation: 'The rate fell 5 percentage points (20 minus 15). As a percent change that’s 5 ÷ 20 = 25 percent. Mixing the two is a common error.',
  },
  'cp:demo-households': {
    text: 'A town projects 6,000 more residents living in households. Average household size is 2.4, and the plan uses a 5% vacancy allowance. About how many housing units does it need?',
    options: ['About 2,400', 'About 2,500', 'About 2,630', 'About 14,400'],
    correct: 2,
    explanation: 'Households: 6,000 ÷ 2.4 = 2,500. Units: 2,500 ÷ 0.95 ≈ 2,630. 14,400 multiplies by household size instead of dividing, and 2,500 leaves out the vacancy allowance.',
  },
  'cp:gis-scale': {
    text: 'Which map is the largest-scale, showing the smallest area in the most detail?',
    options: ['1:1,000,000', '1:250,000', '1:24,000', '1:1,200'],
    correct: 3,
    explanation: 'Scale is a ratio, so 1:1,200 is the largest fraction: one inch equals 100 feet, enough detail for a site plan. The bigger the second number, the smaller the scale and the larger the area shown.',
  },
};
