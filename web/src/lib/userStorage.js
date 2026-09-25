// Per-account localStorage keys, so each account keeps its own progress on a
// shared device. AuthProvider calls setStorageUser() whenever the signed-in
// account changes. Signed-out visitors use the unscoped legacy keys (which is
// also where any history from before accounts existed lives).
let currentUserId = null;

export const setStorageUser = (id) => { currentUserId = id || null; };
export const getStorageUser = () => currentUserId;

export const scopedKey = (base, userId = currentUserId) => (userId ? `${base}:u:${userId}` : base);

// Modules that save progress (history, study state, in-progress exams) call
// noteWrite(base) after writing, so lib/cloudSync.js can copy the change to
// the signed-in learner's Supabase account. A listener keeps this module free
// of any dependency on the sync code.
let writeListener = null;
export const setWriteListener = (fn) => { writeListener = fn; };
export const noteWrite = (base) => { if (writeListener) writeListener(base); };
