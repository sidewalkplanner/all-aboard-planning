import { createContext, useContext, useState } from 'react';

// Session-only dark mode for the exam-taking screens (matches the
// prototype: the toggle lives in the exam header and is not persisted).
const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [dark, setDark] = useState(false);
  return (
    <DarkModeContext.Provider value={{ dark, toggleDark: () => setDark((d) => !d) }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
  return ctx;
}
