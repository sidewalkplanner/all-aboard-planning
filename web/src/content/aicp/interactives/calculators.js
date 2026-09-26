// Try it (id with no kind prefix): each one practices a formula or a model the
// lesson teaches. A definition has:
//
//   title, intro          heading and one-line setup
//   predict               optional "Predict first" question the sliders answer
//   illustrative          true when the numbers are invented (shows a label)
//   inputs                [{ id, label, value, step, min, max, slider, prefix, suffix }]
//                         `value` is the lesson's worked example
//   compute(v)            { results: [{ label, value }], steps: [...], raw } or
//                         null when an input is missing or out of range
//   draw(v, out)          optional live sketch: { w, h, svg } (components/interactives/sketchKit.js)
//   describe(v, out)      one sentence saying what the sketch shows (read to screen readers)
//   expect                { [result label]: text the default result must contain };
//                         `npm run check` confirms the lesson's worked example
//   problems              optional "Your turn" generators: (pick) => { text, values,
//                         answer, unit, dp }; the steps come from compute(values)
//
// Keep every formula identical to the lesson's wording.
import { P, box, disc, line, text, note, sketch, num, money, pct } from '../../../components/interactives/sketchKit.js';

const ok = (...xs) => xs.every((x) => Number.isFinite(x));
// HUD's categories are ceilings; "moderate" is set by each program.
const category = (share) => (share <= 30 ? 'extremely low income' : share <= 50 ? 'very low income' : share <= 80 ? 'low income'
  : share <= 120 ? 'moderate income (commonly up to 120%; programs vary)' : 'above moderate income');
const signed = (n, f = (x) => num(x, 1)) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${f(Math.abs(n))}`;

export const CALCULATORS = {
  far: {
    title: 'Floor area ratio',
    intro: 'Change the FAR or the lot coverage and watch the building change shape.',
    predict: 'Keep the FAR at 2.0 and cut the coverage from 50% to 25%. How many stories will the building need?',
    inputs: [
      { id: 'acres', label: 'Lot area', suffix: 'acres', value: 2, step: 0.25, min: 0.01 },
      { id: 'far', label: 'Floor area ratio', suffix: 'FAR', value: 2, step: 0.25, min: 0.25, max: 8, slider: true },
      { id: 'cov', label: 'Lot coverage', suffix: '%', value: 50, step: 5, min: 10, max: 100, slider: true },
    ],
    compute: ({ acres, far, cov }) => {
      if (!ok(acres, far, cov) || acres <= 0 || far <= 0 || cov <= 0 || cov > 100) return null;
      const lot = acres * 43560;
      const floor = lot * far;
      const foot = lot * cov / 100;
      const stories = floor / foot;
      const st = Number.isInteger(+stories.toFixed(2)) ? num(stories) : num(stories, 1);
      return {
        raw: { stories, st },
        results: [
          { label: 'Floor area allowed', value: `${num(floor)} sq ft` },
          { label: 'Building footprint', value: `${num(foot)} sq ft` },
          { label: 'Stories', value: st },
        ],
        steps: [
          `Lot area: ${num(acres, 2)} acres × 43,560 = ${num(lot)} sq ft`,
          `Floor area: ${num(lot)} × ${num(far, 2)} = ${num(floor)} sq ft`,
          `Footprint: ${num(lot)} × ${num(cov)}% = ${num(foot)} sq ft`,
          `Stories: ${num(floor)} ÷ ${num(foot)} = ${st} (the shortcut: FAR ÷ coverage = ${num(far, 2)} ÷ ${num(cov / 100, 2)})`,
        ],
      };
    },
    draw: ({ cov }, { raw }) => {
      const ground = 222;
      const fw = 340 * cov / 100;
      const x = 30 + (340 - fw) / 2;
      const full = Math.floor(raw.stories + 1e-9);
      const part = raw.stories - full;
      const sh = Math.min(30, 178 / Math.ceil(raw.stories));
      let s = box(20, ground, 360, 10, { fill: P.sage, seed: 1 });
      for (let i = 0; i < full; i++) s += box(x, ground - (i + 1) * sh, fw, sh, { fill: P.butter, seed: i });
      if (part > 0.01) s += box(x, ground - full * sh - part * sh, fw, part * sh, { fill: P.butter, seed: 99 });
      const top = ground - raw.stories * sh;
      s += text(200, Math.max(18, top - 10), `${raw.st} ${raw.stories === 1 ? 'story' : 'stories'}`, { size: 20, weight: 700 });
      s += text(200, ground + 32, `the lot · ${num(cov)}% covered`, { color: P.ink });
      return sketch(262, s);
    },
    describe: ({ cov }, { raw }) => `A building ${raw.st} ${raw.stories === 1 ? 'story' : 'stories'} tall covering ${num(cov)}% of the lot.`,
    expect: { Stories: '4', 'Floor area allowed': '174,240' },
    problems: [
      (pick) => {
        const v = { acres: pick([0.5, 1, 1.5, 2, 3]), far: pick([1.5, 2, 3, 4, 6]), cov: pick([25, 50, 75]) };
        return { values: v, text: `A ${num(v.acres, 1)}-acre site is zoned for a FAR of ${num(v.far, 1)}, and the building will cover ${v.cov}% of the lot. How many stories can it have?`, answer: v.far / (v.cov / 100), unit: 'stories', dp: 1 };
      },
      (pick) => {
        const v = { acres: pick([0.5, 1, 2, 2.5, 4]), far: pick([0.5, 1.5, 2, 3]), cov: 50 };
        return { values: v, text: `How much floor area does a FAR of ${num(v.far, 1)} allow on a ${num(v.acres, 1)}-acre lot?`, answer: v.acres * 43560 * v.far, unit: 'sq ft', dp: 0 };
      },
    ],
  },

  density: {
    title: 'Gross and net density',
    intro: 'Zoning sets units per net acre. Take out the streets and open space first, then multiply.',
    predict: 'The same 180 homes sit on 40 acres. Is their gross density higher or lower than 6 per acre?',
    inputs: [
      { id: 'site', label: 'Total site', suffix: 'acres', value: 40, step: 1, min: 1 },
      { id: 'share', label: 'Share for streets and open space', suffix: '%', value: 25, step: 5, min: 0, max: 50, slider: true },
      { id: 'per', label: 'Units allowed per net acre', suffix: 'units', value: 6, step: 1, min: 1, max: 40, slider: true },
    ],
    compute: ({ site, share, per }) => {
      if (!ok(site, share, per) || site <= 0 || share < 0 || share >= 100 || per <= 0) return null;
      const net = site * (1 - share / 100);
      const units = Math.floor(net * per + 1e-9);
      return {
        raw: { net, units },
        results: [
          { label: 'Net area', value: `${num(net, 1)} acres` },
          { label: 'Units allowed', value: num(units) },
          { label: 'Gross density', value: `${num(units / site, 1)} units per acre` },
        ],
        steps: [
          `Net area: ${num(site)} × (1 − ${num(share / 100, 2)}) = ${num(net, 1)} acres`,
          `Units: ${num(net, 1)} × ${num(per)} = ${num(units)}${Number.isInteger(+(net * per).toFixed(6)) ? '' : ' (rounded down)'}`,
          `Gross density: ${num(units)} ÷ ${num(site)} = ${num(units / site, 2)} units per gross acre`,
        ],
      };
    },
    draw: ({ site, share }, { raw }) => {
      const netW = 360 * (1 - share / 100);
      let s = box(20, 16, netW, 140, { fill: P.butter, seed: 2 });
      if (share > 0) s += box(20 + netW, 16, 360 - netW, 140, { fill: P.sage, seed: 3 });
      // One house mark per unit when there are few, otherwise per 10 units.
      const per = [1, 2, 5, 10, 20, 50, 100].find((u) => raw.units / u <= 60) || 100;
      const n = Math.round(raw.units / per);
      const cols = Math.max(1, Math.floor((netW - 14) / 17));
      const rows = Math.ceil(n / cols);
      const gap = rows > 1 ? Math.min(17, 116 / (rows - 1)) : 0;
      for (let i = 0; i < n; i++) {
        const cx = 28 + (i % cols) * 17;
        const cy = 28 + Math.floor(i / cols) * gap;
        s += `<rect x="${cx}" y="${cy.toFixed(1)}" width="10" height="10" fill="${P.tomato}" stroke="${P.ink}" stroke-width="1.2"/>`;
      }
      s += text(20, 182, `net ${num(raw.net, 1)} ac`, { anchor: 'start' });
      if (share > 0) s += text(380, 182, `streets, open ${num(site - raw.net, 1)} ac`, { anchor: 'end' });
      s += text(20, 206, per === 1 ? 'each square is one home' : `each square is ${per} homes`, { anchor: 'start', weight: 500, color: '#5A5468' });
      return sketch(216, s);
    },
    describe: ({ site }, { raw }) => `${num(raw.units)} homes on ${num(raw.net, 1)} net acres, out of ${num(site)} acres in all.`,
    expect: { 'Units allowed': '180', 'Gross density': '4.5', 'Net area': '30' },
    problems: [
      (pick) => {
        const v = { site: pick([20, 30, 50, 80]), share: pick([20, 25, 30]), per: pick([4, 5, 8, 10]) };
        return { values: v, text: `A ${v.site}-acre parcel is zoned for ${v.per} units per net acre, and ${v.share}% of it must go to streets and open space. How many units are allowed?`, answer: Math.floor(v.site * (1 - v.share / 100) * v.per + 1e-9), unit: 'units', dp: 0 };
      },
      (pick) => {
        const v = { site: pick([20, 40, 60]), share: pick([20, 25]), per: pick([6, 8, 12]) };
        const units = Math.floor(v.site * (1 - v.share / 100) * v.per + 1e-9);
        return { values: v, text: `A ${v.site}-acre subdivision has ${units} homes. What is its gross density, in units per acre?`, answer: units / v.site, unit: 'units per acre', dp: 1 };
      },
    ],
  },

  parking: {
    title: 'Parking: spaces and the land they take',
    intro: 'Multiply the size by the rate, then see how much land the spaces cover next to a one-story store.',
    predict: 'At 4 spaces per 1,000 sq ft and 350 sq ft per space, which takes more land: the store or its parking?',
    inputs: [
      { id: 'floor', label: 'Store floor area', suffix: 'sq ft', value: 60000, step: 5000, min: 1000 },
      { id: 'rate', label: 'Spaces per 1,000 sq ft', suffix: 'spaces', value: 4, step: 0.5, min: 0.5, max: 8, slider: true },
      { id: 'each', label: 'Land per space, with aisles', suffix: 'sq ft', value: 350, step: 25, min: 200, max: 450 },
    ],
    compute: ({ floor, rate, each }) => {
      if (!ok(floor, rate, each) || floor <= 0 || rate <= 0 || each <= 0) return null;
      const spaces = Math.ceil(floor / 1000 * rate - 1e-9);
      const area = spaces * each;
      return {
        raw: { spaces, area },
        results: [
          { label: 'Required spaces', value: num(spaces) },
          { label: 'Parking land', value: `${num(area)} sq ft (${num(area / 43560, 2)} acres)` },
          { label: 'Parking compared with the store', value: `${num(area / floor, 1)} times its size` },
        ],
        steps: [
          `Spaces: ${num(floor)} ÷ 1,000 × ${num(rate, 1)} = ${num(spaces)}`,
          `Land: ${num(spaces)} × ${num(each)} = ${num(area)} sq ft`,
          `Acres: ${num(area)} ÷ 43,560 = ${num(area / 43560, 2)}`,
        ],
      };
    },
    draw: ({ floor }, { raw }) => {
      const total = floor + raw.area;
      const sw = 352 * floor / total;
      const pw = 352 - sw;
      let s = box(20, 20, sw, 120, { fill: P.butter, seed: 4 });
      s += box(28 + sw, 20, pw, 120, { fill: '#D9D3C7', seed: 5 });
      for (let x = 36 + sw; x < 20 + sw + pw; x += 12) s += `<line x1="${x.toFixed(1)}" y1="26" x2="${x.toFixed(1)}" y2="60" stroke="#fff" stroke-width="2"/><line x1="${x.toFixed(1)}" y1="100" x2="${x.toFixed(1)}" y2="134" stroke="#fff" stroke-width="2"/>`;
      s += text(20, 166, 'store', { anchor: 'start', weight: 700 });
      s += text(20, 186, `${num(floor)} sq ft`, { anchor: 'start', weight: 500 });
      s += text(380, 166, `parking: ${num(raw.spaces)} spaces`, { anchor: 'end', weight: 700 });
      s += text(380, 186, `${num(raw.area)} sq ft`, { anchor: 'end', weight: 500 });
      return sketch(198, s);
    },
    describe: ({ floor }, { raw }) => `Parking covers ${num(raw.area)} square feet beside a ${num(floor)} square foot store: ${raw.area > floor ? 'more land than the store' : 'less land than the store'}.`,
    expect: { 'Required spaces': '240', 'Parking land': '1.93 acres' },
    problems: [
      (pick) => {
        const v = { floor: pick([20000, 40000, 45000, 80000]), rate: pick([2.5, 3, 4, 5]), each: 350 };
        return { values: v, text: `A ${num(v.floor)} sq ft store must provide ${num(v.rate, 1)} spaces per 1,000 sq ft. How many spaces is that?`, answer: Math.ceil(v.floor / 1000 * v.rate - 1e-9), unit: 'spaces', dp: 0 };
      },
      (pick) => {
        const v = { floor: pick([30000, 50000, 60000]), rate: pick([3, 4, 5]), each: pick([300, 350]) };
        const sp = Math.ceil(v.floor / 1000 * v.rate - 1e-9);
        return { values: v, text: `A lot needs ${num(sp)} spaces at ${v.each} sq ft each, aisles included. How many acres of land is that?`, answer: sp * v.each / 43560, unit: 'acres', dp: 2 };
      },
    ],
  },

  affordability: {
    title: 'Housing affordability',
    intro: 'Check a household against the 30% cost-burden standard and the AMI income categories. It starts from the worked example in Implementation math.',
    inputs: [
      { id: 'income', label: 'Annual household income', prefix: '$', value: 42000, step: 1000, min: 1 },
      { id: 'rent', label: 'Monthly housing cost', prefix: '$', value: 1300, step: 50, min: 0, max: 4000, slider: true },
      { id: 'ami', label: 'Area median income', prefix: '$', value: 84000, step: 1000, min: 1 },
    ],
    compute: ({ income, rent, ami }) => {
      if (!ok(income, rent, ami) || income <= 0 || rent < 0 || ami <= 0) return null;
      const burden = rent * 12 / income * 100;
      const status = burden > 50 ? 'severely cost-burdened' : burden > 30 ? 'cost-burdened' : 'not cost-burdened';
      return {
        raw: { burden, status },
        results: [
          { label: 'Cost burden', value: `${pct(burden, 0)} (${status})` },
          { label: 'Affordable at 30%', value: `${money(income * 0.3 / 12)} a month` },
          { label: 'Income as a share of AMI', value: pct(income / ami * 100, 0) },
          { label: 'Income category', value: category(income / ami * 100) },
        ],
        steps: [
          `Annual housing cost: ${money(rent)} × 12 = ${money(rent * 12)}`,
          `Cost burden: ${money(rent * 12)} ÷ ${money(income)} = ${pct(burden)} (over 30% is cost-burdened; over 50%, severely)`,
          `Affordable cost: ${money(income)} × 0.30 ÷ 12 = ${money(income * 0.3 / 12)}`,
          `Share of AMI: ${money(income)} ÷ ${money(ami)} × 100 = ${pct(income / ami * 100, 0)}, so ${category(income / ami * 100)}`,
        ],
      };
    },
    draw: ({ income, rent }, { raw }) => {
      const m = income / 12;
      const f = Math.min(1, rent / m);
      const fill = raw.burden > 50 ? P.tomato : raw.burden > 30 ? P.butter : P.sage;
      let s = box(20, 56, 360, 46, { fill: P.paper, seed: 6 });
      if (f > 0) s += box(20, 56, 360 * f, 46, { fill, seed: 7, ink: false });
      s += box(20, 56, 360, 46, { fill: 'none', seed: 6 });
      for (const [p, lab] of [[0.3, '30%'], [0.5, '50%']]) {
        const x = 20 + 360 * p;
        s += line([[x, 42], [x, 116]], { dash: true, color: P.ink, size: 2 });
        s += text(x, 34, lab, { weight: 700 });
      }
      s += text(20, 138, `housing ${money(rent)} of ${money(m)} a month`, { anchor: 'start' });
      s += note(20, 170, raw.status, { anchor: 'start', color: raw.burden > 30 ? P.tomatoDeep : P.leafDeep });
      return sketch(180, s);
    },
    describe: (v, { raw }) => `Housing takes ${pct(raw.burden, 0)} of monthly income: ${raw.status}.`,
    expect: { 'Cost burden': '37%', 'Affordable at 30%': '$1,050', 'Income as a share of AMI': '50%', 'Income category': 'very low' },
    problems: [
      (pick) => {
        const v = { income: pick([36000, 48000, 54000, 60000, 72000]), rent: 1000, ami: 80000 };
        return { values: v, text: `A household earns ${money(v.income)} a year. What is the most it can pay for housing each month and stay under the 30% standard?`, answer: v.income * 0.3 / 12, unit: 'dollars a month', dp: 0 };
      },
      (pick) => {
        const v = { income: pick([30000, 40000, 50000]), rent: pick([900, 1100, 1250, 1500]), ami: 80000 };
        return { values: v, text: `A household earning ${money(v.income)} a year pays ${money(v.rent)} a month for housing. What share of its income is that, in percent?`, answer: v.rent * 12 / v.income * 100, unit: 'percent', dp: 0 };
      },
      (pick) => {
        const v = { income: pick([32000, 45000, 60000, 72000]), rent: 1000, ami: pick([80000, 90000]) };
        return { values: v, text: `The area median income is ${money(v.ami)}. A household earns ${money(v.income)}. What percent of AMI is that?`, answer: v.income / v.ami * 100, unit: 'percent of AMI', dp: 0 };
      },
    ],
  },

  households: {
    title: 'From people to housing units',
    intro: 'Turn a population projection into the housing units it needs.',
    inputs: [
      { id: 'pop', label: 'New residents in households', value: 10000, step: 500, min: 1 },
      { id: 'size', label: 'Average household size', suffix: 'people', value: 2.5, step: 0.1, min: 1.5, max: 3.5, slider: true },
      { id: 'vac', label: 'Vacancy allowance', suffix: '%', value: 5, step: 1, min: 0, max: 15, slider: true },
    ],
    compute: ({ pop, size, vac }) => {
      if (!ok(pop, size, vac) || pop <= 0 || size <= 0 || vac < 0 || vac >= 100) return null;
      const hh = pop / size;
      const units = Math.ceil(hh / (1 - vac / 100) - 1e-9);
      return {
        raw: { hh, units },
        results: [
          { label: 'Households', value: num(hh) },
          { label: 'Housing units needed', value: num(units) },
        ],
        steps: [
          `Households: ${num(pop)} ÷ ${num(size, 1)} = ${num(hh)}`,
          `Units: ${num(hh)} ÷ (1 − ${num(vac / 100, 2)}) = ${num(hh / (1 - vac / 100), 1)}, rounded up to ${num(units)}`,
        ],
      };
    },
    draw: (v, { raw }) => {
      const scale = 250 / Math.max(raw.units, 1);
      const hw = raw.hh * scale;
      const uw = raw.units * scale;
      let s = text(20, 40, 'households', { anchor: 'start' });
      s += box(126, 20, hw, 30, { fill: P.sky, seed: 8 });
      s += text(20, 92, 'units', { anchor: 'start' });
      s += box(126, 72, hw, 30, { fill: P.butter, seed: 9 });
      if (uw - hw > 1) s += box(126 + hw, 72, uw - hw, 30, { fill: P.paper, seed: 10 });
      s += text(20, 138, `${num(raw.units)} units for ${num(raw.hh)} households`, { anchor: 'start', weight: 500 });
      if (uw - hw > 1) s += note(20, 168, `${num(raw.units - raw.hh)} extra units allow for vacancy`, { anchor: 'start' });
      return sketch(178, s);
    },
    describe: (v, { raw }) => `${num(raw.hh)} households need ${num(raw.units)} housing units, including some that sit vacant as people move.`,
    expect: { Households: '4,000', 'Housing units needed': '4,211' },
    problems: [
      (pick) => {
        const v = { pop: pick([6000, 9000, 12000, 15000]), size: pick([2.4, 2.5, 3]), vac: pick([4, 5, 6]) };
        return { values: v, text: `A town expects ${num(v.pop)} more residents in households. Average household size is ${num(v.size, 1)}, and the plan allows ${v.vac}% vacancy. How many housing units are needed?`, answer: Math.ceil(v.pop / v.size / (1 - v.vac / 100) - 1e-9), unit: 'units', dp: 0 };
      },
    ],
  },

  'pct-change': {
    title: 'Percent change and percentage points',
    intro: 'When the numbers are rates, the same change has two names. Move the ending rate and compare them.',
    predict: 'A poverty rate goes from 10% to 12%. Did it rise 2 percent, 2 points, or 20 percent?',
    inputs: [
      { id: 'old', label: 'Starting rate', suffix: '%', value: 10, step: 0.5, min: 0.5, max: 40, slider: true },
      { id: 'now', label: 'Ending rate', suffix: '%', value: 12, step: 0.5, min: 0, max: 40, slider: true },
    ],
    compute: ({ old, now }) => {
      if (!ok(old, now) || old <= 0 || now < 0) return null;
      const change = (now - old) / old * 100;
      return {
        raw: { change },
        results: [
          { label: 'Change in percentage points', value: `${signed(now - old)} points` },
          { label: 'Percent change', value: `${signed(change)}%` },
        ],
        steps: [
          `Percentage points: ${num(now, 1)} − ${num(old, 1)} = ${signed(now - old)}`,
          `Percent change: (${num(now, 1)} − ${num(old, 1)}) ÷ ${num(old, 1)} × 100 = ${signed(change)}%`,
        ],
      };
    },
    draw: ({ old, now }, { raw }) => {
      const scale = 220 / Math.max(old, now, 1);
      let s = text(20, 42, 'before', { anchor: 'start' });
      s += box(84, 22, old * scale, 30, { fill: P.sky, seed: 11 });
      s += text(90 + old * scale, 43, `${num(old, 1)}%`, { anchor: 'start', weight: 700 });
      s += text(20, 94, 'after', { anchor: 'start' });
      const base = Math.min(old, now) * scale;
      s += box(84, 74, base, 30, { fill: P.sky, seed: 12 });
      if (now > old) s += box(84 + base, 74, (now - old) * scale, 30, { fill: P.butter, seed: 13 });
      if (now < old) s += box(84 + base, 74, (old - now) * scale, 30, { fill: 'none', seed: 13 });
      s += text(90 + Math.max(old, now) * scale, 95, `${num(now, 1)}%`, { anchor: 'start', weight: 700 });
      s += note(20, 142, `${signed(now - old)} points = ${signed(raw.change, (x) => num(x, 0))}% of the old rate`, { anchor: 'start' });
      return sketch(152, s);
    },
    describe: ({ old, now }, { raw }) => `From ${num(old, 1)}% to ${num(now, 1)}%: ${signed(now - old)} percentage points, or ${signed(raw.change)} percent.`,
    expect: { 'Percent change': '+20.0%', 'Change in percentage points': '+2.0' },
    problems: [
      (pick) => {
        const v = { old: pick([8, 10, 15, 20, 25]), now: 0 };
        v.now = v.old + pick([-3, -2, 2, 3, 5]);
        return { values: v, text: `A tract's vacancy rate went from ${v.old}% to ${v.now}%. What was the percent change? (Use a minus sign for a decrease.)`, answer: (v.now - v.old) / v.old * 100, unit: 'percent', dp: 1 };
      },
      (pick) => {
        const v = { old: pick([30, 40, 50]), now: 0 };
        v.now = v.old + pick([4, 6, 10]);
        return { values: v, text: `The share of commuters who drive alone rose from ${v.old}% to ${v.now}%. By how many percentage points?`, answer: v.now - v.old, unit: 'points', dp: 1 };
      },
    ],
  },

  'present-value': {
    title: 'Present value',
    intro: 'Raise the discount rate or push the benefit further out and watch its value today shrink.',
    predict: 'The same $10,000 at the same 5% rate: how much of its value is left if it arrives in 30 years instead of 2?',
    inputs: [
      { id: 'fv', label: 'Future amount', prefix: '$', value: 10000, step: 500, min: 0 },
      { id: 'rate', label: 'Discount rate', suffix: '%', value: 5, step: 0.5, min: 0, max: 10, slider: true },
      { id: 'years', label: 'Years from now', suffix: 'years', value: 2, step: 1, min: 0, max: 50, slider: true },
    ],
    compute: ({ fv, rate, years }) => {
      if (!ok(fv, rate, years) || fv < 0 || rate < 0 || years < 0) return null;
      const factor = (1 + rate / 100) ** years;
      return {
        raw: { pv: fv / factor },
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
    draw: ({ fv, rate, years }, { raw }) => {
      const R = 62;
      const r = fv > 0 ? R * Math.sqrt(raw.pv / fv) : 0;
      let s = line([[84, 92], [310, 92]], { size: 2, dash: true });
      s += disc(310, 92, R, { fill: P.butter, seed: 14 });
      s += disc(84, 92, Math.max(r, 2), { fill: P.butter, seed: 15 });
      s += text(310, 98, money(fv), { weight: 700 });
      s += text(84, 180, `${money(raw.pv)} today`, { weight: 700 });
      s += text(310, 180, `in ${num(years)} ${years === 1 ? 'year' : 'years'}`, { weight: 600 });
      s += note(200, 24, `discounted at ${num(rate, 1)}% a year`);
      return sketch(194, s);
    },
    describe: ({ fv, years }, { raw }) => `${money(fv)} arriving in ${num(years)} years is worth ${money(raw.pv)} today; the coins' areas are drawn to scale.`,
    expect: { 'Present value': '$9,070' },
    problems: [
      (pick) => {
        const v = { fv: pick([5000, 10000, 20000, 50000]), rate: pick([3, 4, 5, 6]), years: pick([1, 2, 3]) };
        return { values: v, text: `A benefit of ${money(v.fv)} arrives ${v.years} ${v.years === 1 ? 'year' : 'years'} from now. At a ${v.rate}% discount rate, what is it worth today?`, answer: v.fv / (1 + v.rate / 100) ** v.years, unit: 'dollars', dp: 0 };
      },
    ],
  },

  lq: {
    title: 'Location quotient',
    intro: 'Compare an industry’s share of local jobs with its share nationally.',
    inputs: [
      { id: 'li', label: 'Local jobs in the industry', value: 6000, step: 500, min: 0 },
      { id: 'lt', label: 'Total local jobs', value: 100000, step: 5000, min: 1 },
      { id: 'ni', label: 'Industry’s share of national jobs', suffix: '%', value: 3, step: 0.5, min: 0.5, max: 20, slider: true },
    ],
    compute: ({ li, lt, ni }) => {
      if (!ok(li, lt, ni) || li < 0 || lt <= 0 || li > lt || ni <= 0) return null;
      const local = li / lt * 100;
      const lq = local / ni;
      const read = lq > 1.05 ? 'above 1.0: likely a basic (export) industry' : lq < 0.95 ? 'below 1.0: the area likely imports this' : 'about 1.0: the local share matches the nation';
      return {
        raw: { local, lq },
        results: [
          { label: 'Location quotient', value: num(lq, 2) },
          { label: 'Reading', value: read },
        ],
        steps: [
          `Local share: ${num(li)} ÷ ${num(lt)} = ${pct(local, 1)}`,
          `LQ: ${pct(local, 1)} ÷ ${pct(ni, 1)} = ${num(lq, 2)}`,
        ],
      };
    },
    draw: ({ ni }, { raw }) => {
      const scale = 220 / Math.max(raw.local, ni, 0.1);
      let s = text(20, 36, 'here', { anchor: 'start' });
      s += box(90, 16, Math.max(raw.local * scale, 1), 28, { fill: P.civic, seed: 16 });
      s += text(98 + raw.local * scale, 36, pct(raw.local, 1), { anchor: 'start', weight: 700 });
      s += text(20, 80, 'nation', { anchor: 'start' });
      s += box(90, 60, ni * scale, 28, { fill: P.sky, seed: 17 });
      s += text(98 + ni * scale, 80, pct(ni, 1), { anchor: 'start', weight: 700 });
      // Number line 0 to 3.
      const X = (v) => 30 + Math.min(v, 3) / 3 * 340;
      s += line([[X(0), 132], [X(3), 132]], { size: 2.2 });
      for (const t of [0, 1, 2, 3]) s += line([[X(t), 126], [X(t), 138]], { size: 2 }) + text(X(t), 158, t === 3 ? '3+' : String(t), { weight: 500 });
      s += note((X(0) + X(1)) / 2, 118, 'imports', { color: '#5A5468' }) + note((X(1) + X(3)) / 2, 118, 'likely exports', { color: '#5A5468' });
      s += disc(X(raw.lq), 132, 8, { fill: P.tomato, seed: 18 });
      s += text(X(raw.lq), 184, `LQ ${num(raw.lq, 2)}`, { weight: 700 });
      return sketch(194, s);
    },
    describe: ({ ni }, { raw }) => `The industry is ${pct(raw.local, 1)} of local jobs and ${pct(ni, 1)} nationally, a location quotient of ${num(raw.lq, 2)}.`,
    expect: { 'Location quotient': '2.00' },
    problems: [
      (pick) => {
        const lt = pick([50000, 80000, 200000]);
        const v = { li: lt * pick([0.02, 0.04, 0.05, 0.09]), lt, ni: pick([2, 3, 4.5, 6]) };
        return { values: v, text: `A county has ${num(v.li)} jobs in an industry out of ${num(v.lt)} total. Nationally the industry is ${num(v.ni, 1)}% of jobs. What is the location quotient?`, answer: (v.li / v.lt * 100) / v.ni, unit: '', dp: 2 };
      },
    ],
  },

  multiplier: {
    title: 'Economic base multiplier',
    intro: 'Each basic (export) job supports some nonbasic jobs. Add or cut basic jobs and count the total.',
    inputs: [
      { id: 'total', label: 'Total employment', value: 25000, step: 1000, min: 1 },
      { id: 'basic', label: 'Basic employment', value: 10000, step: 1000, min: 1 },
      { id: 'change', label: 'Change in basic jobs', value: 100, step: 50, min: -1000, max: 1000, slider: true },
    ],
    compute: ({ total, basic, change }) => {
      if (!ok(total, basic, change) || total <= 0 || basic <= 0 || basic > total) return null;
      const m = total / basic;
      return {
        raw: { m, all: change * m },
        results: [
          { label: 'Multiplier', value: num(m, 2) },
          { label: 'Total change in jobs', value: signed(change * m, (x) => num(x)) },
        ],
        steps: [
          `Multiplier: ${num(total)} ÷ ${num(basic)} = ${num(m, 2)}`,
          `Total effect: ${num(change)} basic jobs × ${num(m, 2)} = ${num(change * m)} jobs (${num(change * m - change)} of them nonbasic)`,
        ],
      };
    },
    draw: ({ change }, { raw }) => {
      const a = Math.abs(change);
      const all = Math.abs(raw.all);
      const unit = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000].find((u) => all / u <= 60) || 1000;
      const nb = Math.round(a / unit);
      const nn = Math.max(0, Math.round(all / unit) - nb);
      const lost = change < 0;
      let s = '';
      for (let i = 0; i < nb + nn; i++) {
        const x = 26 + (i % 12) * 30;
        const y = 16 + Math.floor(i / 12) * 30;
        const basicSq = i < nb;
        s += box(x, y, 22, 22, { fill: lost ? (basicSq ? P.blush : P.paper) : basicSq ? P.civic : P.butter, seed: i, size: 1.4 });
      }
      s += text(20, 186, `each square is ${num(unit)} ${unit === 1 ? 'job' : 'jobs'}`, { anchor: 'start', weight: 500, color: '#5A5468' });
      s += text(20, 210, lost ? `${num(a)} basic jobs lost, ${num(all - a)} more follow` : `${num(a)} basic (blue) + ${num(all - a)} nonbasic (yellow)`, { anchor: 'start' });
      return sketch(220, s);
    },
    describe: ({ change }, { raw }) => `${signed(change, (x) => num(x))} basic jobs means ${signed(raw.all, (x) => num(x))} jobs in all.`,
    expect: { Multiplier: '2.50', 'Total change in jobs': '+250' },
    problems: [
      (pick) => {
        const v = { total: pick([30000, 40000, 60000]), basic: pick([10000, 12000, 15000]), change: pick([100, 200, 300, -200]) };
        return { values: v, text: `A region has ${num(v.basic)} basic jobs and ${num(v.total)} jobs in all. A basic employer ${v.change > 0 ? 'adds' : 'cuts'} ${num(Math.abs(v.change))} jobs. How many jobs does the region ${v.change > 0 ? 'gain' : 'lose'} in total?`, answer: Math.abs(v.change * v.total / v.basic), unit: 'jobs', dp: 0 };
      },
    ],
  },

  'flood-odds': {
    title: 'The odds of a flood over time',
    intro: 'A "100-year flood" has a 1% chance each year. See how that adds up over the life of a mortgage.',
    predict: 'Over a 30-year mortgage, is the chance of at least one 100-year flood closer to 1 in 100, 1 in 10, or 1 in 4?',
    inputs: [
      { id: 'annual', label: 'Chance each year', suffix: '%', value: 1, step: 0.2, min: 0.2, max: 5, slider: true },
      { id: 'years', label: 'Years', suffix: 'years', value: 30, step: 1, min: 1, max: 100, slider: true },
    ],
    compute: ({ annual, years }) => {
      if (!ok(annual, years) || annual <= 0 || annual > 100 || years < 1) return null;
      const p = 1 - (1 - annual / 100) ** years;
      return {
        raw: { p },
        results: [
          { label: 'Chance of at least one flood', value: pct(p * 100, 0) },
          { label: 'Name for this flood', value: `a ${num(100 / annual)}-year flood` },
        ],
        steps: [
          `Chance of no flood in one year: 1 − ${num(annual / 100, 3)} = ${num(1 - annual / 100, 3)}`,
          `No flood in ${num(years)} years: ${num(1 - annual / 100, 3)}^${num(years)} = ${num(1 - p, 3)}`,
          `At least one: 1 − ${num(1 - p, 3)} = ${num(p, 3)}, or ${pct(p * 100, 0)}`,
        ],
      };
    },
    draw: ({ years }, { raw }) => {
      const hit = Math.round(raw.p * 100);
      let s = '';
      for (let i = 0; i < 100; i++) {
        const x = 22 + (i % 20) * 18;
        const y = 14 + Math.floor(i / 20) * 18;
        s += i < hit
          ? `<rect x="${x}" y="${y}" width="13" height="13" rx="2" fill="${P.civic}" stroke="${P.ink}" stroke-width="1.3"/>`
          : `<rect x="${x}" y="${y}" width="13" height="13" rx="2" fill="#FFFDF8" stroke="#8C8698" stroke-width="1.2"/>`;
      }
      s += note(20, 138, `${hit} in 100 homes flood in ${num(years)} ${years === 1 ? 'year' : 'years'}`, { anchor: 'start' });
      return sketch(148, s);
    },
    describe: ({ years }, { raw }) => `About ${Math.round(raw.p * 100)} of every 100 such homes would flood at least once in ${num(years)} years.`,
    expect: { 'Chance of at least one flood': '26%' },
    problems: [
      (pick) => {
        const v = { annual: pick([1, 0.2, 2]), years: pick([10, 30, 50]) };
        return { values: v, text: `A home sits where the flood has a ${num(v.annual, 1)}% chance each year. What is the chance, in percent, of at least one such flood in ${v.years} years?`, answer: (1 - (1 - v.annual / 100) ** v.years) * 100, unit: 'percent', dp: 0 };
      },
    ],
  },

  'earned-value': {
    title: 'Earned value',
    intro: 'Compare the work planned, the work done, and what it cost.',
    inputs: [
      { id: 'pv', label: 'Planned value (work scheduled by now)', prefix: '$', value: 60000, step: 5000, min: 0, max: 100000, slider: true },
      { id: 'ev', label: 'Earned value (work actually done)', prefix: '$', value: 50000, step: 5000, min: 0, max: 100000, slider: true },
      { id: 'ac', label: 'Actual cost', prefix: '$', value: 55000, step: 5000, min: 0, max: 100000, slider: true },
    ],
    compute: ({ pv, ev, ac }) => {
      if (!ok(pv, ev, ac) || pv < 0 || ev < 0 || ac < 0) return null;
      const sv = ev - pv;
      const cv = ev - ac;
      const $ = (n) => signed(n, money);
      return {
        raw: { sv, cv },
        results: [
          { label: 'Schedule variance', value: `${$(sv)} (${sv < 0 ? 'behind schedule' : sv > 0 ? 'ahead of schedule' : 'on schedule'})` },
          { label: 'Cost variance', value: `${$(cv)} (${cv < 0 ? 'over budget' : cv > 0 ? 'under budget' : 'on budget'})` },
        ],
        steps: [
          `SV = EV − PV = ${money(ev)} − ${money(pv)} = ${$(sv)}`,
          `CV = EV − AC = ${money(ev)} − ${money(ac)} = ${$(cv)}`,
        ],
      };
    },
    draw: ({ pv, ev, ac }) => {
      const scale = 150 / Math.max(pv, ev, ac, 1);
      const rows = [['planned', pv, P.sky], ['earned', ev, P.leaf], ['actual cost', ac, P.blush]];
      let s = '';
      rows.forEach(([lab, v, fill], i) => {
        const y = 14 + i * 44;
        s += text(20, y + 22, lab, { anchor: 'start' });
        s += box(132, y, Math.max(v * scale, 1), 30, { fill, seed: 20 + i });
        s += text(140 + v * scale, y + 22, money(v), { anchor: 'start', weight: 700 });
      });
      s += note(20, 168, 'compare earned with the other two', { anchor: 'start' });
      return sketch(180, s);
    },
    describe: ({ pv, ev, ac }) => `Planned ${money(pv)}, earned ${money(ev)}, actual cost ${money(ac)}.`,
    expect: { 'Schedule variance': '−$10,000', 'Cost variance': '−$5,000' },
    problems: [
      (pick) => {
        const v = { pv: pick([40000, 80000, 100000]), ev: 0, ac: 0 };
        v.ev = v.pv + pick([-15000, -10000, 5000]);
        v.ac = v.ev + pick([-5000, 5000, 10000]);
        return { values: v, text: `By this month, ${money(v.pv)} of work was planned, ${money(v.ev)} worth has been done, and ${money(v.ac)} has been spent. What is the cost variance? (Use a minus sign if over budget.)`, answer: v.ev - v.ac, unit: 'dollars', dp: 0 };
      },
      (pick) => {
        const v = { pv: pick([30000, 50000, 90000]), ev: 0, ac: 0 };
        v.ev = v.pv + pick([-12000, -5000, 4000]);
        v.ac = v.ev;
        return { values: v, text: `Planned value is ${money(v.pv)} and earned value is ${money(v.ev)}. What is the schedule variance? (Use a minus sign if behind.)`, answer: v.ev - v.pv, unit: 'dollars', dp: 0 };
      },
    ],
  },

  'bid-rent': {
    title: 'Bid-rent: who can afford the center?',
    intro: 'Offices, homes, and farms each bid for land. Each bid falls with distance from downtown, and every spot goes to the highest bidder.',
    predict: 'Streetcars, then cars, made commuting cheaper. Before you move the slider: does the ring of homes get wider or narrower?',
    illustrative: true,
    inputs: [
      { id: 'commute', label: 'Cost of commuting (how fast home bids fall)', suffix: 'per mile', value: 6, step: 0.5, min: 3, max: 10, slider: true },
    ],
    compute: ({ commute }) => {
      if (!ok(commute) || commute < 1) return null;
      const bids = [
        { use: 'offices', a: 100, b: 20 },
        { use: 'homes', a: 60, b: commute },
        { use: 'farms', a: 20, b: 1 },
      ];
      // Walk outward and record where the highest bidder changes.
      const rings = [];
      for (let i = 0; i <= 2000; i++) {
        const d = i / 100;
        const best = bids.map((x) => ({ ...x, v: x.a - x.b * d })).filter((x) => x.v > 0).sort((p, q) => q.v - p.v)[0];
        const use = best ? best.use : null;
        const last = rings[rings.length - 1];
        if (last) last.to = d;
        if (!last || last.use !== use) rings.push({ use, from: d, to: d });
      }
      const shown = rings.filter((r) => r.use);
      const span = (r) => (r.from < 0.01 ? `0 to ${num(r.to, 1)} miles` : r.to > 19.9 ? `beyond ${num(r.from, 1)} miles` : `${num(r.from, 1)} to ${num(r.to, 1)} miles`);
      const homes = shown.find((r) => r.use === 'homes');
      return {
        raw: { bids, rings: shown },
        results: shown.map((r) => ({ label: r.use[0].toUpperCase() + r.use.slice(1), value: span(r) })),
        steps: [
          'Offices bid 100 − 20 × miles: being central is worth the most to them, so their bid falls fastest.',
          `Homes bid 60 − ${num(commute, 1)} × miles: every mile out adds commuting cost.`,
          'Farms bid 20 − 1 × miles: they barely care about the center.',
          homes ? `Homes win from ${num(homes.from, 1)} to ${num(homes.to, 1)} miles, where their bid is the highest of the three.` : 'At this commuting cost, homes never outbid both offices and farms.',
        ],
      };
    },
    draw: (v, { raw }) => {
      const X = (d) => 50 + d / 20 * 330;
      const Y = (r) => 190 - r / 100 * 146;
      const color = { offices: P.tomato, homes: P.butterDeep, farms: P.leafDeep };
      const fill = { offices: P.tomato, homes: P.butter, farms: P.sage };
      let s = line([[X(0), Y(0)], [X(20), Y(0)]], { size: 2 }) + line([[X(0), Y(0)], [X(0), Y(100)]], { size: 2 });
      s += text(X(0) + 8, Y(100) + 6, 'rent', { anchor: 'start', weight: 500 });
      [['offices', 150], ['homes', 245], ['farms', 330]].forEach(([u, x]) => {
        s += box(x - 22, 12, 16, 16, { fill: fill[u], seed: x, size: 1.4 }) + text(x, 26, u, { anchor: 'start', weight: 600 });
      });
      for (const b of raw.bids) {
        const end = Math.min(20, b.a / b.b);
        s += line([[X(0), Y(b.a)], [X(end), Y(b.a - b.b * end)]], { size: 4.5, color: color[b.use], seed: b.a });
      }
      for (const r of raw.rings) {
        s += box(X(r.from), 206, Math.max(1, X(r.to) - X(r.from)), 26, { fill: fill[r.use], seed: Math.round(r.from * 10), ink: false });
      }
      s += box(X(0), 206, X(20) - X(0), 26, { fill: 'none', seed: 3 });
      s += text(X(0), 258, 'downtown', { anchor: 'start', weight: 500 });
      s += text(X(10), 258, '10', { weight: 500 });
      s += text(X(20), 258, '20 miles', { anchor: 'end', weight: 500 });
      return sketch(266, s);
    },
    describe: (v, { raw }) => `From downtown outward: ${raw.rings.map((r) => r.use).join(', then ')}.`,
    expect: { Homes: '2.9 to 8.0 miles', Offices: '0 to 2.9 miles' },
  },
};

