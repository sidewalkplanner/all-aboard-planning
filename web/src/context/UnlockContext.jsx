import { createContext, useContext, useState } from 'react';

// Session-only paid-tier state (no backend yet), matching the prototype:
// unlocking Full Access is a demo toggle that resets on page reload.
const UnlockContext = createContext(null);

export function UnlockProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <UnlockContext.Provider value={{ unlocked, unlock: () => setUnlocked(true) }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  const ctx = useContext(UnlockContext);
  if (!ctx) throw new Error('useUnlock must be used within UnlockProvider');
  return ctx;
}
