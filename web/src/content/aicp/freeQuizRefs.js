// Exam 1 items that appear in the free warm-up quizzes (Quiz A and Quiz B).
// When paid plans are enabled (lib/access.js), free lessons serve only these
// items from their practice sets without Full Access, so no paid exam
// question is given away.
//
// This list is derived from the seeded sampler in lib/shuffle.js;
// `npm run check` recomputes it and fails if it has drifted (for example
// after a change to the Exam 1 bank or the quiz seeds).
export const FREE_QUIZ_REFS = new Set([
  // Warm-up Quiz A
  'e1:1', 'e1:8', 'e1:15', 'e1:26', 'e1:32', 'e1:39', 'e1:48', 'e1:49', 'e1:55', 'e1:67', 'e1:72', 'e1:77', 'e1:81',
  'e1:82', 'e1:102', 'e1:103', 'e1:110', 'e1:117', 'e1:124', 'e1:127', 'e1:134', 'e1:138', 'e1:147', 'e1:158', 'e1:163',
  // Warm-up Quiz B
  'e1:4', 'e1:7', 'e1:11', 'e1:16', 'e1:31', 'e1:33', 'e1:47', 'e1:50', 'e1:53', 'e1:57', 'e1:73', 'e1:74', 'e1:88',
  'e1:91', 'e1:95', 'e1:105', 'e1:112', 'e1:115', 'e1:118', 'e1:126', 'e1:135', 'e1:141', 'e1:148', 'e1:160', 'e1:167',
]);

const refOrder = (a, b) => {
  const [ba, na] = a.split(':');
  const [bb, nb] = b.split(':');
  return ba === bb ? Number(na) - Number(nb) : ba.localeCompare(bb);
};

// The refs a visitor may open for a lesson, given { signedIn, fullAccess }
// from hooks/useAccess.js: all of them with full access; signed in without
// full access (only possible once paid plans exist), a free lesson's
// free-quiz items; signed out, none. Sorted by bank and item number so
// scenario clusters stay together.
export const accessibleRefs = (lesson, { signedIn, fullAccess }) => {
  const refs = (lesson.practice || []).slice().sort(refOrder);
  if (fullAccess) return refs;
  if (signedIn && lesson.access === 'free') return refs.filter((r) => FREE_QUIZ_REFS.has(r));
  return [];
};
