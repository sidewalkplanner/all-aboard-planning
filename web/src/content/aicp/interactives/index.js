// Every interactive exercise a lesson can place with a line like
//
//   :::try far
//
// Four kinds, each defined in its own file here:
// - calc (calculators.js): inputs, optional sliders, results, and worked steps.
// - sort (sorts.js): classify situations into categories, with feedback on each.
// - order (orders.js): put shuffled steps in the right order.
// - reveal (reveals.js): a prompt, then click to reveal the answer and why.
// They're practice, not scored or saved; checkpoints remain the graded questions.
// `npm run check` confirms every :::try id exists and each is used at most once.
import { CALCULATORS } from './calculators.js';
import { SORTS } from './sorts.js';
import { ORDERS } from './orders.js';
import { REVEALS } from './reveals.js';

const tag = (defs, type) => Object.fromEntries(Object.entries(defs).map(([id, d]) => [id, { ...d, type }]));

export const INTERACTIVES = {
  ...tag(CALCULATORS, 'calc'),
  ...tag(SORTS, 'sort'),
  ...tag(ORDERS, 'order'),
  ...tag(REVEALS, 'reveal'),
};

export const INTERACTIVE_ID_CLASHES = [CALCULATORS, SORTS, ORDERS, REVEALS]
  .flatMap((d) => Object.keys(d))
  .filter((id, i, all) => all.indexOf(id) !== i);
