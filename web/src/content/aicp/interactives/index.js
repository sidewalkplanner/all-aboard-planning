// Practice pieces a lesson can place with a line like
//
//   :::try far
//
// The id's prefix names the kind, so a lesson can load just the code for the
// kinds it uses:
// - sort-…  Sort it (sorts.js): deal situations into labeled piles, with a
//           reason for every card.
// - anything else: Try it (calculators.js): sliders and inputs that redraw a
//           sketch, show the worked steps, and set fresh problems.
// They're practice, not graded or saved; checkpoints remain the graded
// questions. `npm run check` validates every definition and placement.
export const KINDS = [
  { kind: 'sort', prefix: 'sort-' },
  { kind: 'calc', prefix: '' },
];

export const kindOf = (id) => KINDS.find((k) => id.startsWith(k.prefix)).kind;

// Loads a kind's definitions on demand (the sketches pull in the drawing kit).
export const loadDefs = {
  sort: () => import('./sorts.js').then((m) => m.SORTS),
  calc: () => import('./calculators.js').then((m) => m.CALCULATORS),
};
