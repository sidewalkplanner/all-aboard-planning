// Calculators (type 'calc'). Each one practices a formula the lesson teaches,
// starting from the lesson's own worked example. Inputs marked `slider` also get
// a range slider (give them min and max). `compute` returns the results and the
// worked steps with the reader's numbers, or `null` when an input is missing or
// out of range. Keep every formula identical to the lesson's wording.

const num = (n, dp = 0) => n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
const money = (n) => `$${num(n)}`;
const pct = (n, dp = 1) => `${num(n, dp)}%`;
const ok = (...xs) => xs.every((x) => Number.isFinite(x));

export const CALCULATORS = {
  far: {
    title: 'Floor area ratio',
    intro: 'Change the lot, the FAR, or the coverage and watch the building change shape.',
    inputs: [
      { id: 'acres', label: 'Lot area', suffix: 'acres', value: 2, step: 0.25, min: 0.01 },
      { id: 'far', label: 'Floor area ratio', suffix: 'FAR', value: 2, step: 0.25, min: 0.25, max: 10, slider: true },
      { id: 'cov', label: 'Lot coverage', suffix: '%', value: 50, step: 5, min: 5, max: 100, slider: true },
    ],
    compute: ({ acres, far, cov }) => {
      if (!ok(acres, far, cov) || acres <= 0 || far <= 0 || cov <= 0 || cov > 100) return null;
      const lot = acres * 43560;
      const floor = lot * far;
      const foot = lot * cov / 100;
      const stories = floor / foot;
      return {
        results: [
          { label: 'Floor area allowed', value: `${num(floor)} sq ft` },
          { label: 'Building footprint', value: `${num(foot)} sq ft` },
          { label: 'Stories', value: Number.isInteger(+stories.toFixed(2)) ? num(stories) : num(stories, 1) },
        ],
        steps: [
          `Lot area: ${num(acres, 2)} acres × 43,560 = ${num(lot)} sq ft`,
          `Floor area: ${num(lot)} × ${num(far, 2)} = ${num(floor)} sq ft`,
          `Footprint: ${num(lot)} × ${num(cov)}% = ${num(foot)} sq ft`,
          `Stories: ${num(floor)} ÷ ${num(foot)} ≈ ${num(stories, 1)} (the shortcut: FAR ÷ coverage = ${num(far, 2)} ÷ ${num(cov / 100, 2)})`,
        ],
      };
    },
  },

  density: {
    title: 'Gross and net density',
    intro: 'Net density leaves out streets and open space, so it is always the higher number.',
    inputs: [
      { id: 'site', label: 'Total site', suffix: 'acres', value: 40, step: 1, min: 0.1 },
      { id: 'other', label: 'Streets and open space', suffix: 'acres', value: 10, step: 1, min: 0 },
      { id: 'units', label: 'Dwelling units', suffix: 'units', value: 180, step: 10, min: 1 },
    ],
    compute: ({ site, other, units }) => {
      if (!ok(site, other, units) || site <= 0 || other < 0 || other >= site || units <= 0) return null;
      const net = site - other;
      return {
        results: [
          { label: 'Gross density', value: `${num(units / site, 1)} units per acre` },
          { label: 'Net density', value: `${num(units / net, 1)} units per acre` },
        ],
        steps: [
          `Gross: ${num(units)} units ÷ ${num(site, 1)} total acres = ${num(units / site, 2)}`,
          `Net area: ${num(site, 1)} − ${num(other, 1)} = ${num(net, 1)} acres`,
          `Net: ${num(units)} units ÷ ${num(net, 1)} net acres = ${num(units / net, 2)}`,
        ],
      };
    },
  },

  affordability: {
    title: 'Housing affordability',
    intro: 'Check a household against the 30% cost-burden standard.',
    inputs: [
      { id: 'income', label: 'Annual household income', prefix: '$', value: 42000, step: 1000, min: 1 },
      { id: 'rent', label: 'Monthly housing cost', prefix: '$', value: 1300, step: 50, min: 0 },
      { id: 'ami', label: 'Area median income', prefix: '$', value: 84000, step: 1000, min: 1 },
    ],
    compute: ({ income, rent, ami }) => {
      if (!ok(income, rent, ami) || income <= 0 || rent < 0 || ami <= 0) return null;
      const burden = rent * 12 / income * 100;
      const status = burden > 50 ? 'severely cost-burdened' : burden > 30 ? 'cost-burdened' : 'not cost-burdened';
      return {
        results: [
          { label: 'Cost burden', value: `${pct(burden)} (${status})` },
          { label: 'Affordable at 30%', value: `${money(income * 0.3 / 12)} a month` },
          { label: 'Income as a share of AMI', value: pct(income / ami * 100, 0) },
        ],
        steps: [
          `Annual housing cost: ${money(rent)} × 12 = ${money(rent * 12)}`,
          `Cost burden: ${money(rent * 12)} ÷ ${money(income)} = ${pct(burden)} (over 30% is cost-burdened; over 50%, severely)`,
          `Affordable cost: ${money(income)} × 0.30 ÷ 12 = ${money(income * 0.3 / 12)}`,
          `Share of AMI: ${money(income)} ÷ ${money(ami)} × 100 = ${pct(income / ami * 100, 0)}`,
        ],
      };
    },
  },

  'percent-change': {
    title: 'Percent change and percentage points',
    intro: 'Enter two rates to see why "up 2 points" and "up 20 percent" can describe the same change.',
    inputs: [
      { id: 'old', label: 'Starting value', suffix: '', value: 10, step: 1 },
      { id: 'now', label: 'Ending value', suffix: '', value: 12, step: 1 },
    ],
    compute: ({ old, now }) => {
      if (!ok(old, now) || old === 0) return null;
      const change = (now - old) / old * 100;
      return {
        results: [
          { label: 'Percent change', value: `${change >= 0 ? '+' : ''}${pct(change)}` },
          { label: 'If these are rates: percentage points', value: `${now - old >= 0 ? '+' : ''}${num(now - old, 1)} points` },
        ],
        steps: [
          `Percent change: (${num(now, 1)} − ${num(old, 1)}) ÷ ${num(old, 1)} × 100 = ${pct(change)}`,
          `Percentage points (only when both values are percentages): ${num(now, 1)} − ${num(old, 1)} = ${num(now - old, 1)}`,
        ],
      };
    },
  },

  'present-value': {
    title: 'Present value',
    intro: 'Raise the discount rate or push the benefit further out and watch its value today shrink.',
    inputs: [
      { id: 'fv', label: 'Future amount', prefix: '$', value: 10000, step: 500, min: 0 },
      { id: 'rate', label: 'Discount rate', suffix: '%', value: 5, step: 0.5, min: 0, max: 15, slider: true },
      { id: 'years', label: 'Years from now', suffix: 'years', value: 2, step: 1, min: 0, max: 50, slider: true },
    ],
    compute: ({ fv, rate, years }) => {
      if (!ok(fv, rate, years) || fv < 0 || rate < 0 || years < 0) return null;
      const factor = (1 + rate / 100) ** years;
      return {
        results: [
          { label: 'Present value', value: money(fv / factor) },
          { label: 'Share of the future amount', value: pct(100 / factor, 0) },
        ],
        steps: [
          `Discount factor: (1 + ${num(rate / 100, 3)})^${num(years)} = ${num(factor, 4)}`,
          `Present value: ${money(fv)} ÷ ${num(factor, 4)} = ${money(fv / factor)}`,
        ],
      };
    },
  },

  lq: {
    title: 'Location quotient',
    intro: 'An LQ above 1.0 suggests the area exports that industry; below 1.0, it imports.',
    inputs: [
      { id: 'li', label: 'Local industry jobs', value: 6000, step: 100, min: 0 },
      { id: 'lt', label: 'Total local jobs', value: 100000, step: 1000, min: 1 },
      { id: 'ni', label: 'National share in that industry', suffix: '%', value: 3, step: 0.1, min: 0.01, max: 100 },
    ],
    compute: ({ li, lt, ni }) => {
      if (!ok(li, lt, ni) || li < 0 || lt <= 0 || li > lt || ni <= 0) return null;
      const local = li / lt * 100;
      const lq = local / ni;
      const read = lq > 1.05 ? 'above 1.0: likely a basic (export) industry' : lq < 0.95 ? 'below 1.0: the area likely imports this good or service' : 'about 1.0: local share matches the nation';
      return {
        results: [
          { label: 'Location quotient', value: num(lq, 2) },
          { label: 'Reading', value: read },
        ],
        steps: [
          `Local share: ${num(li)} ÷ ${num(lt)} = ${pct(local, 2)}`,
          `LQ: ${pct(local, 2)} ÷ ${pct(ni, 2)} = ${num(lq, 2)}`,
        ],
      };
    },
  },

  households: {
    title: 'From people to housing units',
    intro: 'Turn a population projection into the housing units it needs.',
    inputs: [
      { id: 'pop', label: 'Population in households', value: 10000, step: 500, min: 1 },
      { id: 'size', label: 'Average household size', suffix: 'people', value: 2.5, step: 0.1, min: 0.5 },
      { id: 'vac', label: 'Vacancy allowance', suffix: '%', value: 5, step: 1, min: 0, max: 20, slider: true },
    ],
    compute: ({ pop, size, vac }) => {
      if (!ok(pop, size, vac) || pop <= 0 || size <= 0 || vac < 0 || vac >= 100) return null;
      const hh = pop / size;
      const units = hh / (1 - vac / 100);
      return {
        results: [
          { label: 'Households', value: num(hh) },
          { label: 'Housing units needed', value: num(Math.ceil(units)) },
        ],
        steps: [
          `Households: ${num(pop)} ÷ ${num(size, 2)} = ${num(hh)}`,
          `Units: ${num(hh)} ÷ (1 − ${num(vac / 100, 2)}) = ${num(units, 1)}, rounded up to ${num(Math.ceil(units))}`,
        ],
      };
    },
  },

  multiplier: {
    title: 'Economic base multiplier',
    intro: 'The multiplier estimates how many total jobs follow each basic (export) job, in both directions.',
    inputs: [
      { id: 'total', label: 'Total employment', value: 25000, step: 500, min: 1 },
      { id: 'basic', label: 'Basic employment', value: 10000, step: 500, min: 1 },
      { id: 'change', label: 'Change in basic jobs', value: 400, step: 50 },
    ],
    compute: ({ total, basic, change }) => {
      if (!ok(total, basic, change) || total <= 0 || basic <= 0 || basic > total) return null;
      const m = total / basic;
      return {
        results: [
          { label: 'Multiplier', value: num(m, 2) },
          { label: 'Total change in jobs', value: `${change >= 0 ? '+' : ''}${num(change * m)}` },
        ],
        steps: [
          `Multiplier: ${num(total)} ÷ ${num(basic)} = ${num(m, 2)}`,
          `Total effect: ${num(change)} basic jobs × ${num(m, 2)} = ${num(change * m)} jobs (${num(change * m - change)} of them non-basic)`,
        ],
      };
    },
  },

  'flood-odds': {
    title: 'Chance of a flood over time',
    intro: 'A "100-year flood" is a 1% chance each year. See how that adds up over a mortgage.',
    inputs: [
      { id: 'annual', label: 'Annual chance', suffix: '%', value: 1, step: 0.1, min: 0.1, max: 10, slider: true },
      { id: 'years', label: 'Years', suffix: 'years', value: 30, step: 1, min: 1, max: 100, slider: true },
    ],
    compute: ({ annual, years }) => {
      if (!ok(annual, years) || annual <= 0 || annual > 100 || years < 1) return null;
      const p = 1 - (1 - annual / 100) ** years;
      return {
        results: [
          { label: 'Chance of at least one flood', value: pct(p * 100, 0) },
          { label: 'Return period', value: `a ${num(100 / annual)}-year flood` },
        ],
        steps: [
          `Chance of no flood in a year: 1 − ${num(annual / 100, 3)} = ${num(1 - annual / 100, 3)}`,
          `No flood in ${num(years)} years: ${num(1 - annual / 100, 3)}^${num(years)} = ${num(1 - p, 3)}`,
          `At least one: 1 − ${num(1 - p, 3)} = ${num(p, 3)}, or ${pct(p * 100, 0)}`,
        ],
      };
    },
  },

  'earned-value': {
    title: 'Earned value',
    intro: 'Compare the work planned, the work done, and what it cost.',
    inputs: [
      { id: 'pv', label: 'Planned value (work scheduled by now)', prefix: '$', value: 60000, step: 1000, min: 0 },
      { id: 'ev', label: 'Earned value (work actually done)', prefix: '$', value: 50000, step: 1000, min: 0 },
      { id: 'ac', label: 'Actual cost', prefix: '$', value: 55000, step: 1000, min: 0 },
    ],
    compute: ({ pv, ev, ac }) => {
      if (!ok(pv, ev, ac) || pv < 0 || ev < 0 || ac < 0) return null;
      const sv = ev - pv;
      const cv = ev - ac;
      const signed = (n) => `${n < 0 ? '−' : n > 0 ? '+' : ''}${money(Math.abs(n))}`;
      return {
        results: [
          { label: 'Schedule variance', value: `${signed(sv)} (${sv < 0 ? 'behind schedule' : sv > 0 ? 'ahead of schedule' : 'on schedule'})` },
          { label: 'Cost variance', value: `${signed(cv)} (${cv < 0 ? 'over budget' : cv > 0 ? 'under budget' : 'on budget'})` },
        ],
        steps: [
          `SV = EV − PV = ${money(ev)} − ${money(pv)} = ${signed(sv)}`,
          `CV = EV − AC = ${money(ev)} − ${money(ac)} = ${signed(cv)}`,
        ],
      };
    },
  },
};
