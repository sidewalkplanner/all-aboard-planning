// Practice pieces a lesson can place with a line like
//
//   :::try far
//
// The id's prefix names the kind, so a lesson can load just the code for the
// kinds it uses:
// - sort-…  Sort it (sorts.js): deal situations into labeled piles, with a
//           reason for every card.
// - test-…  Walk the test (tests.js): take fact patterns through a legal test
//           one stop at a time.
// - scene-… You're the planner (scenes.js): linked judgment calls, each
//           response showing what happens next.
// - anything else: Try it (calculators.js): sliders and inputs that redraw a
//           sketch, show the worked steps, and set fresh problems.
// They're practice, not graded or saved; checkpoints remain the graded
// questions. `npm run check` validates every definition and placement.
export const KINDS = [
  { kind: 'sort', prefix: 'sort-' },
  { kind: 'test', prefix: 'test-' },
  { kind: 'scene', prefix: 'scene-' },
  { kind: 'calc', prefix: '' },
];

export const kindOf = (id) => KINDS.find((k) => id.startsWith(k.prefix)).kind;

// Loads a kind's definitions on demand (the sketches pull in the drawing kit).
export const loadDefs = {
  sort: () => import('./sorts.js').then((m) => m.SORTS),
  test: () => import('./tests.js').then((m) => m.TESTS),
  scene: () => import('./scenes.js').then((m) => m.SCENES),
  calc: () => import('./calculators.js').then((m) => m.CALCULATORS),
};
