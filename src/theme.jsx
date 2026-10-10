import { createContext, useContext, useEffect, useState } from 'react';

// Keep these in sync with the palettes in styles/theme.css
export const THEMES = [
  { id: 'ocean', name: 'Ocean Blue', colors: ['#7dd3fc', '#38bdf8', '#818cf8'] },
  { id: 'aurora', name: 'Aurora Violet', colors: ['#c4b5fd', '#a78bfa', '#f472b6'] },
  { id: 'emerald', name: 'Emerald', colors: ['#6ee7b7', '#34d399', '#22d3ee'] },
  { id: 'sunset', name: 'Sunset', colors: ['#fdba74', '#fb923c', '#f43f5e'] }
];

const STORAGE_KEY = 'fws-theme';
const ThemeContext = createContext(null);

function readSaved() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (THEMES.some((t) => t.id === saved)) return saved;
  } catch {
    /* storage blocked: fall back to the default */
  }
  return THEMES[0].id;
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(readSaved);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      /* ignore */
    }
  }, [themeId]);

  const theme = THEMES.find((t) => t.id === themeId);
  return (
    <ThemeContext.Provider value={{ theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
