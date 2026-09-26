## Learning objectives

- Describe the cohort-component method and explain when simpler projection methods are good enough.
- Calculate a linear and a geometric projection, a housing-unit population estimate, and a dependency ratio.
- Convert a population projection into households and the housing units needed to serve them.
- Calculate and interpret a location quotient.
- Explain the three components of shift-share analysis and compute the industry-mix effect.
- Interpret the index of dissimilarity and the Gini coefficient.

## Key concepts

### Projections, forecasts, and estimates

These words are often used loosely, but they mean different things:

- An **estimate** describes a current or past value that wasn't directly counted (this year's population, between censuses).
- A **projection** shows what would happen *if* stated assumptions hold. It's conditional: "if current trends continue…"
- A **forecast** is the projection the analyst judges most likely.

Every projection rests on assumptions, so good practice is to state them plainly and often to show low, middle, and high scenarios.

### The cohort-component method

The **cohort-component method** is the standard approach for population projection. It divides the population into cohorts (usually five-year age groups by sex) and moves each cohort forward in time using three components of change:

1. **Fertility**: births, from age-specific birth rates applied to women of childbearing age.
2. **Mortality**: deaths, from age-specific survival rates.
3. **Migration**: net movement in and out, usually the hardest component to predict locally.

Population at the next step = current population + births − deaths + net migration.

Births minus deaths is **natural increase**; in-migrants minus out-migrants is **net migration**. A place can grow through either one. Many older regions now grow mainly through migration, because deaths are catching up with births.

Because it tracks age structure, the method answers questions trend lines can't: how many school-age children or residents over 75 there will be. That makes it the right choice for school, senior-service, and housing-type planning. (The **cohort-survival** method is the same idea; the term is sometimes used for projections that age cohorts forward with survival rates and then add migration and births.)

:::figure fig-pyramid | A population pyramid with men on the left and women on the right, in 10-year age bands from 0–9 at the bottom to 80+ at the top. The 20–29 cohort is highlighted, with an arrow showing it moves up to the 30–39 band 10 years later. Notes point out that births add a new youngest cohort, deaths thin out the older cohorts, and migration adds or removes people.
Illustrative numbers. The method moves every band up one step at a time, then applies survival rates, births, and net migration. That's how it can tell you how many 75-year-olds (or kindergartners) to plan for.
:::

:::checkpoint cp:demo-cohort

### Simpler trend methods

When you need only a total, or have limited data, simpler extrapolation can work, especially over short horizons.

**Linear (arithmetic) projection** assumes the same *number* of people is added each period.

> A town grew from 20,000 to 24,000 in ten years (+4,000). A linear projection for ten years from now: 24,000 + 4,000 = **28,000**.

**Geometric projection** assumes the same *rate* of growth each period.

> Same town: growth was 4,000 ÷ 20,000 = 20% per decade. Geometric projection: 24,000 × 1.20 = **28,800**.

Geometric projections grow faster over time, and over long horizons they can become unrealistic. **Ratio (share) methods** project a small area as a share of a larger area's projection, such as a county's share of a state projection. They're useful when a reliable projection already exists for the larger area.

:::figure fig-projections | A line chart of the example town: 20,000 people ten years ago and 24,000 today. Projected forward, the linear line reaches 28,000 in 10 years and 36,000 in 30 years; the geometric line reaches 28,800 in 10 years and 41,472 in 30 years.
After one decade the two methods differ by only 800 people. After three, the gap is more than 5,000, which is why geometric projections need a hard look over long horizons.
:::

### The housing-unit method

The **housing-unit method** estimates population from housing:

> Population ≈ housing units × occupancy rate × average household size (+ people living in group quarters)

**Worked example.** A town issued permits for 500 new homes. Occupancy is 96% and the average household size is 2.4.
500 × 0.96 × 2.4 = **1,152** new residents.

:::figure fig-housing-unit | Four cards in an equation: 500 new homes, times 96% occupied, times 2.4 people per home, equals 1,152 new residents. A note says to then add anyone living in group quarters, such as dorms and nursing homes.
Every factor matters: a two-point drop in occupancy or a smaller average household changes the answer.
:::

:::checkpoint cp:demo-housing-unit

### From people to households to housing

A housing plan needs units, not people. Two steps turn a population projection into housing need:

1. **Households** = population living in households ÷ average household size. (Subtract people in group quarters, such as dormitories, nursing homes, and prisons, first.) More detailed work uses **headship rates**, the share of people in each age group who head a household, because older and younger adults form households at different rates.
2. **Housing units needed** = households ÷ (1 − the vacancy allowance). Some units are always vacant as people move, so a market needs more units than households.

**Worked example** (illustrative): a city expects 10,000 more residents in households by 2040, with an average household size of 2.5, and plans for a 5% vacancy allowance.

- 10,000 ÷ 2.5 = **4,000 households**
- 4,000 ÷ 0.95 ≈ **4,211 housing units**

Shrinking household size matters as much as growth: if the same population's average household size falls from 2.6 to 2.4, it needs about 8% more homes with no one new moving in.

:::checkpoint cp:demo-households

### Dependency ratio

The **total dependency ratio** compares people usually outside working age with those of working age:

> (population under 15 + population 65 and over) ÷ population aged 15–64 × 100

**Worked example.** 6,000 under 15, 4,000 aged 65 and over, and 20,000 aged 15–64: (6,000 + 4,000) ÷ 20,000 × 100 = **50**. That means there are 50 dependents for every 100 working-age residents. (Some sources use 18–64 as the working-age band, so check the definition.)

:::figure fig-dependency | Figures of people, each standing for 1,000. Working age, 15 to 64: 20 figures, or 20,000 people. Dependents: 6 children (6,000 under 15) and 4 older adults (4,000 aged 65 and over). The calculation (6,000 + 4,000) ÷ 20,000 × 100 = 50 gives 50 dependents per 100 working-age people.
A ratio of 50 means every two working-age residents support, on average, one child or older adult.
:::

### Location quotient

A **location quotient (LQ)** compares an industry's share of local employment with its share of a reference economy (usually the nation):

> LQ = (local industry jobs ÷ total local jobs) ÷ (national industry jobs ÷ total national jobs)

**Worked example.** A county has 6,000 manufacturing jobs out of 100,000 total (6%). Nationally, manufacturing is 3% of employment. LQ = 6% ÷ 3% = **2.0**.

- **LQ > 1.0**: the industry is more concentrated locally than nationally. It's likely an *export* (basic) industry that brings money in from outside.
- **LQ = 1.0**: the local share matches the nation.
- **LQ < 1.0**: the industry is less concentrated than nationally, suggesting the area imports those goods or services.

:::figure fig-location-quotient | Two grids of 100 squares. In this county, 6 of every 100 jobs are in manufacturing; in the nation, 3 per 100. Six percent divided by three percent gives a location quotient of 2.0. A number line from 0 to 3 marks below 1.0 as imports and above 1.0 as likely exports; this county sits at 2.0.
An LQ of 2.0 means the industry's share of local jobs is twice its national share.
:::

Location quotients assume that local consumption patterns and productivity match the nation's, which isn't always true. Treat them as a screening tool, not proof. The [economic development lesson](/aicp/lessons/economic-development) shows how LQs feed economic base analysis.

:::checkpoint cp:demo-lq

### Shift-share analysis

**Shift-share analysis** splits local employment change in an industry into three parts:

1. **National growth share**: the growth the industry would have had if it grew at the rate of the *whole national economy*.
2. **Industry-mix share**: the extra (or lost) growth because this *industry* grew faster (or slower) nationally than the economy as a whole.
3. **Local (competitive) share**: whatever is left. It's the growth explained by local conditions, meaning the area did better or worse than the industry did nationally.

**Worked example.** National employment grew 5%. A particular industry grew 12% nationally. A local area started with 1,000 jobs in that industry.

- National growth share: 1,000 × 5% = 50 jobs
- Industry-mix share: 1,000 × (12% − 5%) = **70 jobs**
- If the local industry actually grew by 150 jobs, the local share is 150 − 50 − 70 = 30 jobs, a sign of local competitive advantage.

:::figure fig-shift-share | A bar of 150 new jobs in one local industry, split into three parts: 50 jobs of national growth (1,000 × 5%), 70 jobs of industry mix (1,000 × (12% − 5%)), and a 30-job local share, which is the rest. A note says a positive local share means a competitive edge.
Only the last piece is about the place itself. The first two would have happened to any area with the same industry.
:::

:::video Location quotients and shift-share, worked through | about 4 min
Calculates a location quotient from a simple employment table, then splits one industry's growth into national, industry-mix, and local shares.
:::

:::checkpoint cp:demo-shift-local

### Measuring segregation and inequality

- The **index of dissimilarity** measures how evenly two groups are spread across the subareas (usually tracts) of a region. It runs from 0 (perfectly even) to 100 (completely separated). It can be read as the percentage of one group that would have to move to a different tract for the two groups to be evenly distributed.
- The **Gini coefficient** measures inequality in a distribution, most often of income. It runs from 0 (everyone has the same income) to 1 (one person has all of it). On a **Lorenz curve**, which lines households up from poorest to richest and plots the cumulative share of income they hold, the Gini is the area between the curve and the line of perfect equality, divided by the whole area under that line.

:::figure fig-dissimilarity | Two regions of four tracts each, where every dot is 10 people from group A or group B. Evenly spread: every tract is half A and half B, so the index of dissimilarity D = 0. Mostly apart: two tracts hold 40 A and 10 B each, the other two hold 10 A and 40 B each, so D = 60, meaning 60% of one group would have to move to even it out.
Illustrative numbers. D is half the sum, across tracts, of the gap between each group's share of its regional total: here ½ × (0.3 + 0.3 + 0.3 + 0.3) = 0.6, or 60.
:::

:::figure fig-lorenz | A Lorenz curve, with households from poorest to richest along the bottom and their cumulative share of income up the side. The straight diagonal is perfect equality. The curve passes through 3% of income at 20% of households, 11% at 40%, 25% at 60%, and 48% at 80%. Area A lies between the diagonal and the curve; area B lies under the curve. Gini = A ÷ (A + B), which is 0.45 here. The more the curve sags, the higher the Gini: no sag is 0, and all income going to one household is 1.
Illustrative income shares by fifth of households, poorest first: 3%, 8%, 14%, 23%, and 52%.
:::

:::checkpoint cp:demo-dissimilarity

## Key terms

- **Projection**: A conditional statement of what would happen if stated assumptions hold.
- **Cohort-component method**: A projection method that ages population cohorts forward using fertility, mortality, and migration.
- **Net migration**: In-migrants minus out-migrants over a period.
- **Linear projection**: Extrapolation that adds a constant amount each period.
- **Geometric projection**: Extrapolation that applies a constant growth rate each period.
- **Housing-unit method**: Estimating population from housing units, occupancy, and household size.
- **Dependency ratio**: Dependents (children and older adults) per 100 working-age people.
- **Location quotient**: The ratio of an industry's local employment share to its national share.
- **Basic (export) industry**: An industry that sells mainly to customers outside the local economy.
- **Shift-share analysis**: A breakdown of local employment change into national, industry-mix, and local components.
- **Index of dissimilarity**: A 0–100 measure of how unevenly two groups are distributed across subareas.
- **Gini coefficient**: A 0–1 measure of inequality in a distribution.
- **Natural increase**: Births minus deaths.
- **Net migration**: People moving in minus people moving out.
- **Headship rate**: The share of people in an age group who head a household, used to project households.
- **Vacancy allowance**: A margin of vacant units added to projected households so a housing market can function.
- **Lorenz curve**: A graph of the cumulative share of income held by households ranked from poorest to richest; the farther it sags below the diagonal, the greater the inequality.

## Real-world examples

**School enrollment planning.** A suburban district sees steady total population growth and assumes enrollment will keep rising. A cohort-component projection shows otherwise: the population is aging, births have fallen, and new residents are mostly empty-nesters. The district delays a new elementary school and invests in renovating existing buildings instead.

**Finding the export base.** A regional economic development agency calculates location quotients for every industry. Health care, with an LQ of 1.6, and a cluster of specialty food manufacturers, with an LQ of 2.3, stand out. The agency focuses workforce programs on those sectors and studies why the food manufacturers are thriving locally.

**Explaining job growth.** A county's software employment grew 40% in a decade. Shift-share analysis shows that most of that came from the industry-mix effect, because software boomed everywhere. The local share was actually slightly negative. That tells county leaders the area is riding a national wave rather than outcompeting peer regions.

## Exam tips

- If a question mentions fertility, mortality, and migration by age, the answer is the **cohort-component** method.
- Linear adds the same *number* each period; geometric applies the same *rate*. Check which one the question asks for before calculating.
- LQ questions usually give shares directly: divide the local share by the national share. **Above 1.0** suggests an export (basic) industry.
- In shift-share, the **industry-mix** effect is the industry's national growth minus total national growth, times local base employment.
- Index of dissimilarity runs 0–100 (segregation); Gini runs 0–1 (inequality). Don't mix up their ranges.
- For housing need, divide people by household size to get households, then add a vacancy allowance to get units.

## Summary

Use the cohort-component method when age structure matters: it moves cohorts forward with fertility, mortality, and migration. Linear projections add a constant amount; geometric projections apply a constant rate and grow faster. The housing-unit method multiplies units by occupancy and household size; running it in reverse (population ÷ household size, plus a vacancy allowance) turns a projection into housing need. A location quotient above 1.0 signals local specialization and a likely export industry. Shift-share analysis separates national growth, industry mix, and local competitiveness. The index of dissimilarity (0–100) measures segregation, and the Gini coefficient (0–1) measures inequality.
