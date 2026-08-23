import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, makeTheme, gold } from './theme';

interface ThemeCtx {
  theme: Theme;
  dark: boolean;
  mode: 'system' | 'light' | 'dark';
  setMode: (m: 'system' | 'light' | 'dark') => void;
  toggle: () => void;
}

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setMode] = useState<'system' | 'light' | 'dark'>('system');
  const dark = mode === 'system' ? system === 'dark' : mode === 'dark';
  const value = useMemo<ThemeCtx>(
    () => ({
      theme: makeTheme(dark),
      dark,
      mode,
      setMode,
      toggle: () => setMode(dark ? 'light' : 'dark'),
    }),
    [dark, mode],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useTheme outside provider');
  return ctx;
}

export const ACCENT = gold;
