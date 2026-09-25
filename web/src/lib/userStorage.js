// Per-account localStorage keys, so each account keeps its own progress on a
// shared device. AuthProvider calls setStorageUser() whenever the signed-in
// account changes. Signed-out visitors use the unscoped legacy keys (which is
// also where any history from before accounts existed lives).
let currentUserId = null;

export const setStorageUser = (id) => { currentUserId = id || null; };

export const scopedKey = (base, userId = currentUserId) => (userId ? `${base}:u:${userId}` : base);
