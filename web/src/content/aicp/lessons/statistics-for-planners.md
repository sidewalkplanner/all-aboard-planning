## Learning objectives

- Choose the right measure of central tendency and spread for a dataset, and explain what skew does to the mean.
- Interpret a normal distribution, a correlation coefficient, and R-squared.
- Explain statistical significance and match common tests to the questions they answer.
- Read an estimate's margin of error and confidence interval correctly.
- Calculate present value and interpret a benefit-cost ratio.

## Key concepts

### Describing a dataset: center

- **Mean**: the arithmetic average. It uses every value, so a few extreme values pull it strongly.
- **Median**: the middle value when the data are sorted. Half the values are above it and half below. It resists outliers.
- **Mode**: the most frequent value. It's the only measure that works for categories (for example, the most common commute mode).

Income, home prices, and lot sizes are usually **right-skewed**: most values cluster low, with a long tail of very high values. In a right-skewed distribution the **mean is higher than the median**. That's why planners report *median* household income. A handful of very high earners would inflate the mean and misrepresent a typical household.

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

### Relationships between variables

A **correlation coefficient** (*r*) runs from −1 to +1 and describes the strength and direction of a *linear* relationship.

- *r* near +1: the variables rise together (strong positive).
- *r* near −1: one rises as the other falls (strong negative). An *r* of −0.85 is a strong negative relationship.
- *r* near 0: no linear relationship (there could still be a curved one).

**Regression** estimates how much a dependent variable changes with one or more independent variables. **R-squared** (R²) is the share of the variation in the dependent variable that the model explains. An R² of 0.65 means the model accounts for about 65% of the variation; the other 35% is due to things the model doesn't capture.

**Correlation is not causation.** Ice cream sales and drownings both rise in summer. Neither causes the other; a **confounding variable** (hot weather) drives both. Before concluding that a policy caused an outcome, ask what else changed at the same time.

:::checkpoint cp:stat-r2

### Statistical significance

A result is **statistically significant** when it would be unlikely to occur by chance alone if there were really no effect. By convention, researchers often use a threshold of *p* < 0.05: less than a 5% probability of seeing a result this strong by chance. Significance doesn't mean the effect is large or important. With a big enough sample, trivial differences become "significant."

Common tests and when to use them:

| Question | Typical test |
|---|---|
| Are two categorical variables related? (tenure and support for a ballot measure) | Chi-square test |
| Do two groups have different means? (average commute time, before and after) | *t*-test |
| Do three or more groups have different means? | Analysis of variance (ANOVA) |
| How does one variable change with others? | Regression |

**P-hacking** is running many analyses and reporting only the ones that come out significant. The best safeguard is to **pre-specify the analysis plan** before looking at the data.

:::checkpoint cp:stat-chisq

### Margins of error and confidence intervals

Sample estimates come with uncertainty. ACS estimates are published with a **margin of error at the 90% confidence level**. If an ACS table reports 1,200 renter households ± 350, the true value likely falls between 850 and 1,550.

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

**Net present value (NPV)** is the present value of benefits minus the present value of costs. A positive NPV means benefits exceed costs.

The **benefit-cost ratio** is the present value of benefits divided by the present value of costs. A ratio above 1.0 means benefits exceed costs. A ratio of **0.8** means the project returns only 80 cents of benefit for each dollar of cost.

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

## Summary

Use the median for skewed data like income and home prices, and remember that skew pulls the mean toward the tail. In a normal distribution, about 68% of values fall within one standard deviation of the mean. Correlations run from −1 to +1, R² tells you how much variation a model explains, and neither proves causation. Statistical significance means an effect is unlikely to be chance, not that it matters. Read margins of error before comparing estimates. Discount future costs and benefits to present value: higher rates shrink the value of long-term benefits, and a benefit-cost ratio below 1.0 means costs exceed benefits.
