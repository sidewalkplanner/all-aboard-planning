## Learning objectives

- Identify a variable's level of measurement and the statistics it supports.
- Choose the right measure of central tendency and spread for a dataset, and explain what skew does to the mean.
- Interpret a normal distribution, a correlation coefficient, and R-squared.
- Explain statistical significance, the null hypothesis, and Type I and Type II errors, and match common tests to the questions they answer.
- Calculate percent change, percentage-point change, compound annual growth, and inflation-adjusted dollars.
- Read an estimate's margin of error and confidence interval correctly.
- Calculate present value, interpret a benefit-cost ratio, and know when cost-effectiveness analysis fits better.

## Key concepts

### Levels of measurement

What you can do with a variable depends on what kind of numbers it holds:

| Level | What it means | Planning example | Center you can report |
|---|---|---|---|
| **Nominal** | Categories with no order | Land use type, commute mode | Mode |
| **Ordinal** | Ordered categories, uneven gaps | Survey ratings, level of service grades A to F | Median or mode |
| **Interval** | Equal gaps, but no true zero | Temperature in degrees Fahrenheit | Mean, median, or mode |
| **Ratio** | Equal gaps and a true zero | Income, population, distance, travel time | Mean, median, or mode |

Averaging ordinal ratings ("the mean satisfaction score is 3.4") is common but shaky, because the steps between "satisfied" and "very satisfied" aren't necessarily equal. Reporting the share in each category, or the median, is safer. Only ratio data support statements like "twice as much."

:::checkpoint cp:stat-levels

### Describing a dataset: center

- **Mean**: the arithmetic average. It uses every value, so a few extreme values pull it strongly.
- **Median**: the middle value when the data are sorted. Half the values are above it and half below. It resists outliers.
- **Mode**: the most frequent value. It's the only measure that works for categories (for example, the most common commute mode).

Income, home prices, and lot sizes are usually **right-skewed**: most values cluster low, with a long tail of very high values. In a right-skewed distribution the **mean is higher than the median**. That's why planners report *median* household income. A handful of very high earners would inflate the mean and misrepresent a typical household.

:::figure fig-skew | A histogram of household incomes in $25,000 bands, from $0 to $200,000 and up. Most households fall between $25,000 and $75,000, with a long tail of higher incomes to the right. A dashed line marks the median at about $68,000; another marks the mean at about $82,000, pulled up by the long tail of high incomes.
Illustrative numbers. The few very high incomes barely move the median, but they drag the mean about $14,000 higher.
:::

:::checkpoint cp:stat-mode

### Describing a dataset: spread

- **Range**: the maximum minus the minimum. It's simple but driven by the two most extreme values.
- **Percentiles and quartiles**: the 25th, 50th (median), and 75th percentiles divide the data into quarters. The **interquartile range** (75th minus 25th) describes the spread of the middle half.
- **Standard deviation**: roughly the typical distance of values from the mean. A small standard deviation means the values are tightly clustered.

### The normal distribution

Many measurements follow a symmetric, bell-shaped **normal distribution**, in which the mean, median, and mode are equal. In a normal distribution:

- about **68%** of values fall within one standard deviation of the mean;
- about **95%** within two; and
- about **99.7%** within three.

:::figure fig-normal | A bell curve centered on the mean, where mean, median, and mode are equal, with tick marks at one, two, and three standard deviations on each side. Brackets show that about 68% of values fall within one standard deviation of the mean, 95% within two, and 99.7% within three.
Three brackets to memorize: 68, 95, and 99.7.
:::

A **z-score** (standard score) says how many standard deviations a value sits from the mean: z = (value − mean) ÷ standard deviation. If the average commute is 25 minutes with a standard deviation of 10, a 40-minute commute has z = (40 − 25) ÷ 10 = **1.5**. Z-scores put measures with different units on a common scale, which is how some indexes combine factors like income, rent burden, and job access.

### Relationships between variables

A **correlation coefficient** (*r*) runs from −1 to +1 and describes the strength and direction of a *linear* relationship.

- *r* near +1: the variables rise together (strong positive).
- *r* near −1: one rises as the other falls (strong negative). An *r* of −0.85 is a strong negative relationship.
- *r* near 0: no linear relationship (there could still be a curved one).

:::figure fig-correlation | Three scatterplots. Left: points rising from lower left to upper right, r = +0.90, strong positive. Middle: points falling from upper left to lower right, r = −0.85, strong negative. Right: points with no pattern, r = 0.00, no linear pattern.
The sign gives the direction; the size gives the strength. An *r* of −0.85 is just as strong as +0.85.
:::

**Regression** estimates how much a dependent variable changes with one or more independent variables. **R-squared** (R²) is the share of the variation in the dependent variable that the model explains. An R² of 0.65 means the model accounts for about 65% of the variation; the other 35% is due to things the model doesn't capture.

**Correlation is not causation.** Ice cream sales and drownings both rise in summer. Neither causes the other; a **confounding variable** (hot weather) drives both. Before concluding that a policy caused an outcome, ask what else changed at the same time.

:::figure fig-confounder | A smiling sun labeled "Hot weather, the confounding variable," with arrows to an ice cream cone labeled "Ice cream sales" and a life ring on the water labeled "Drownings." A dashed line between the two says "they rise together, but neither causes the other."
When two things move together, look for a third thing driving both before you credit or blame either one.
:::

:::checkpoint cp:stat-r2

### Statistical significance

**Descriptive statistics** summarize the data you have; **inferential statistics** use a sample to draw conclusions about a larger population. Inference starts with a **null hypothesis**: the assumption that there's no effect or no difference (bike lanes made no difference to crashes). A test asks whether the data are unusual enough to reject it.

A result is **statistically significant** when it would be unlikely to occur by chance alone if there were really no effect. By convention, researchers often use a threshold of *p* < 0.05: less than a 5% probability of seeing a result this strong by chance. Significance doesn't mean the effect is large or important. With a big enough sample, trivial differences become "significant."

Two kinds of mistakes are possible:

- A **Type I error** is a false positive: concluding there's an effect when there isn't. The significance threshold (often 0.05) is the chance of making this error that you're willing to accept.
- A **Type II error** is a false negative: missing an effect that's really there. Small samples make Type II errors more likely.

Common tests and when to use them:

| Question | Typical test |
|---|---|
| Are two categorical variables related? (tenure and support for a ballot measure) | Chi-square test |
| Do two groups have different means? (average commute time, before and after) | *t*-test |
| Do three or more groups have different means? | Analysis of variance (ANOVA) |
| How does one variable change with others? | Regression |

**P-hacking** is running many analyses and reporting only the ones that come out significant. The best safeguard is to **pre-specify the analysis plan** before looking at the data.

:::checkpoint cp:stat-chisq

### Rates, growth, and constant dollars

**Percent change versus percentage points.** If a tract's poverty rate rises from 10% to 12%, it rose **2 percentage points** but **20 percent** (2 ÷ 10). Mixing the two is a common error in reports and on exams.

**Rates make places comparable.** Counts mostly reflect size. Divide by population to get a **rate** (crashes per 1,000 residents, jobs per household) before comparing places of different sizes.

**Compound annual growth rate.** To turn growth over several years into a steady yearly rate:

> Annual rate = (ending value ÷ starting value)<sup>1 / years</sup> − 1

A town that grew from 20,000 to 24,000 in 10 years grew 20% in total, but (1.2)<sup>0.1</sup> − 1 ≈ **1.8% a year**, not 2% (dividing 20% by 10 ignores compounding).

**Constant dollars.** Money values from different years must be adjusted for inflation before they're compared. **Nominal** (current) dollars are the amounts as recorded; **real** (constant) dollars remove inflation, usually with the Consumer Price Index (CPI):

> Value in today’s dollars = past value × (CPI today ÷ CPI in the past year)

**Worked example** (illustrative index values): median rent was $800 when the CPI stood at 200, and the CPI is 300 today. In today's dollars that's $800 × 300 ÷ 200 = **$1,200**. If today's median rent is $1,100, rent actually fell in real terms, even though it rose in nominal terms.

:::checkpoint cp:stat-points

### Margins of error and confidence intervals

Sample estimates come with uncertainty. ACS estimates are published with a **margin of error at the 90% confidence level**. If an ACS table reports 1,200 renter households ± 350, the true value likely falls between 850 and 1,550.

:::figure fig-moe | Two confidence intervals on a scale from 0% to 35%. Tract A is 18% plus or minus 6, spanning 12% to 24%. Tract B is 22% plus or minus 7, spanning 15% to 29%. The shaded overlap from 15% to 24% is labeled "overlap: can't call them different."
The poverty-rate example from Real-world examples, below. With this much overlap, the 4-point gap could easily be sampling noise.
:::

Practical rules:

- If two estimates' confidence intervals overlap substantially, don't claim they're different without a formal test.
- If the margin of error is nearly as large as the estimate, the estimate isn't usable on its own. Aggregate geographies (combine tracts), use a longer period, or report the margin of error prominently.
- Always report margins of error for small-area estimates.

:::checkpoint cp:stat-moe-use

### Discounting: costs and benefits over time

A dollar today is worth more than a dollar in ten years, because today's dollar could be invested or used now. **Discounting** converts future values into **present value** so that costs and benefits arriving at different times can be compared.

> Present value = future value ÷ (1 + r)<sup>t</sup>, where *r* is the discount rate and *t* is the number of years.

**Worked example.** A benefit of $10,000 arrives two years from now, and the discount rate is 5%.

- (1.05)² = 1.1025
- $10,000 ÷ 1.1025 ≈ **$9,070**

A **higher discount rate** lowers the present value of future benefits and costs. Because many public investments (transit, flood protection, parks) pay off over decades, the choice of discount rate can decide whether a project looks worthwhile.

:::figure fig-discounting | A bar chart titled "What $10,000 is worth today." Paid in 2 years: $9,426 at a 3% discount rate, $9,070 at 5%, and $8,734 at 7%. Paid in 30 years: $4,120 at 3%, $2,314 at 5%, and $1,314 at 7%.
Over two years the rate barely matters. Over thirty, moving from 3% to 7% cuts the present value by more than two-thirds, which is why long-lived projects are so sensitive to the discount rate.
:::

**Net present value (NPV)** is the present value of benefits minus the present value of costs. A positive NPV means benefits exceed costs.

The **benefit-cost ratio** is the present value of benefits divided by the present value of costs. A ratio above 1.0 means benefits exceed costs. A ratio of **0.8** means the project returns only 80 cents of benefit for each dollar of cost.

When benefits are hard to put in dollars, such as lives saved, trees planted, or households housed, **cost-effectiveness analysis** compares options by cost per unit of outcome instead: cost per serious crash avoided, or cost per affordable unit. It tells you which option delivers a given result most cheaply, but not whether the result is worth its cost.

:::video Present value and benefit-cost ratios | about 3 min
Discounts a future benefit to today's dollars, shows how a higher discount rate changes the answer, and reads a benefit-cost ratio above and below 1.0.
:::

:::checkpoint cp:stat-bcr

## Key terms

- **Mean**: The arithmetic average of a set of values.
- **Median**: The middle value of sorted data; resistant to outliers.
- **Mode**: The most frequently occurring value.
- **Right-skewed distribution**: A distribution with a long tail of high values; its mean exceeds its median.
- **Standard deviation**: A measure of how widely values spread around the mean.
- **Normal distribution**: A symmetric bell curve; about 68% of values lie within one standard deviation of the mean.
- **Correlation coefficient (r)**: A number from −1 to +1 describing the strength and direction of a linear relationship.
- **R-squared**: The share of variation in a dependent variable explained by a regression model.
- **Confounding variable**: A third factor that influences both variables in an apparent relationship.
- **Statistical significance**: A result unlikely to have arisen by chance alone, often judged at p < 0.05.
- **Chi-square test**: A test of association between two categorical variables.
- **Confidence interval**: The range (estimate ± margin of error) likely to contain the true value.
- **Present value**: A future amount converted to today's dollars using a discount rate.
- **Benefit-cost ratio**: Present value of benefits divided by present value of costs.
- **Levels of measurement**: Nominal, ordinal, interval, and ratio: the kinds of values a variable holds, which determine the statistics it supports.
- **Z-score**: The number of standard deviations a value lies above or below the mean.
- **Null hypothesis**: The assumption of no effect or no difference that a statistical test tries to reject.
- **Type I error**: A false positive: finding an effect that isn't there.
- **Type II error**: A false negative: missing an effect that is there.
- **Percentage point**: The arithmetic difference between two percentages.
- **Constant (real) dollars**: Money values adjusted for inflation to a common base year.
- **Cost-effectiveness analysis**: Comparing options by their cost per unit of a non-monetary outcome.

## Real-world examples

**Reporting income.** A staff report on a proposed affordable housing program cites *mean* household income for a neighborhood that includes a few luxury condominium towers. A commissioner points out that the figure overstates what a typical household earns. Staff revise the report to use *median* household income, which is lower and more representative.

**A misleading before-and-after.** After a new bike lane opens, crashes on the street fall by 30%. Before crediting the lane, the analyst checks for confounders: citywide crashes also fell that year, and a nearby road closure reduced traffic volumes. The analyst compares the street with similar streets that didn't get bike lanes, which gives a more honest estimate of the lane's effect.

**Comparing two neighborhoods.** ACS data shows a poverty rate of 18% ± 6 points in one tract and 22% ± 7 points in another. Because the intervals (12–24% and 15–29%) overlap heavily, the planner doesn't claim the second tract has a higher poverty rate.

**Choosing a discount rate.** A flood-protection project costs $20 million now and avoids damages spread over 50 years. At a low discount rate the benefits outweigh the costs; at a high rate they don't. The analysis presents results at more than one rate so decision-makers can see how sensitive the conclusion is.

## Exam tips

- Skewed data such as income or home prices call for the **median**. If the mean is far above the median, the distribution is right-skewed.
- Memorize **68 / 95 / 99.7**: the share of a normal distribution within one, two, and three standard deviations.
- An *r* of −0.85 is a *strong* relationship; the sign only gives the direction. R² is the share of variation explained.
- Two categorical variables call for a **chi-square** test.
- A higher discount rate *lowers* present value. A benefit-cost ratio below 1.0 means costs exceed benefits.
- Watch for correlation-causation traps: look for the confounding variable in the answer choices.
- Categories without order (land use type) are **nominal** and support only the mode; ordered ratings are **ordinal**.
- A rise from 10% to 12% is **2 percentage points** but a **20 percent** increase.
- Compare dollars across years only after converting to **constant dollars**.

## Summary

Use the median for skewed data like income and home prices, and remember that skew pulls the mean toward the tail. In a normal distribution, about 68% of values fall within one standard deviation of the mean. Correlations run from −1 to +1, R² tells you how much variation a model explains, and neither proves causation. Statistical significance means an effect is unlikely to be chance, not that it matters; a false positive is a Type I error and a missed effect is a Type II error. Match statistics to the level of measurement, keep percent change and percentage points straight, and adjust dollars for inflation before comparing years. Read margins of error before comparing estimates. Discount future costs and benefits to present value: higher rates shrink the value of long-term benefits, and a benefit-cost ratio below 1.0 means costs exceed benefits.
