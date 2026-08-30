import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Colors, Theme } from '../lib/theme';
import { getSettings, saveSettings } from '../lib/store';

export interface ThemeContextType {
  isDark: boolean;
  colors: Theme;
  /** True until the saved preference has loaded from storage; screens can ignore this and just render with the OS-scheme fallback. */
  loading: boolean;
  /** Direct setter matching the useState-style naming some callers expect. Equivalent to setDarkMode. */
  setIsDark: (value: boolean) => Promise<void>;
  setDarkMode: (value: boolean) => Promise<void>;
  toggleDarkMode: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  // null = the saved preference hasn't loaded yet; fall back to the OS
  // scheme in the meantime so there's no flash of the wrong theme.
  const [savedDarkMode, setSavedDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    getSettings().then((s) => setSavedDarkMode(s.darkMode));
  }, []);

  const isDark = savedDarkMode !== null ? savedDarkMode : systemScheme === 'dark';

  const setDarkMode = useCallback(async (value: boolean) => {
    setSavedDarkMode(value);
    const current = await getSettings();
    await saveSettings({ ...current, darkMode: value });
  }, []);

  const toggleDarkMode = useCallback(async () => {
    await setDarkMode(!isDark);
  }, [isDark, setDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        colors: isDark ? Colors.dark : Colors.light,
        loading: savedDarkMode === null,
        setIsDark: setDarkMode,
        setDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
