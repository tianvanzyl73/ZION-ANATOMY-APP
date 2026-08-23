import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createGoogleAccountInline, loadSession, signInEmail, signInWithGoogle, signOut, signUpEmail, updateProfile, UserProfile } from './auth';

interface AuthCtx {
  user: UserProfile | null;
  ready: boolean;
  signInEmail: (email: string, password: string) => Promise<UserProfile>;
  signUpEmail: (email: string, password: string, name: string) => Promise<UserProfile>;
  signInWithGoogle: () => Promise<UserProfile>;
  createGoogleAccountInline: (name: string, email: string, picture: string | null) => Promise<UserProfile>;
  signOut: () => Promise<void>;
  updateProfile: typeof updateProfile;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const u = await loadSession();
    setUser(u);
  }, []);

  useEffect(() => {
    refresh().finally(() => setReady(true));
  }, [refresh]);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      ready,
      signInEmail: async (email, password) => {
        const u = await signInEmail(email, password);
        setUser(u);
        return u;
      },
      signUpEmail: async (email, password, name) => {
        const u = await signUpEmail(email, password, name);
        setUser(u);
        return u;
      },
      signInWithGoogle: async () => {
        const u = await signInWithGoogle();
        setUser(u);
        return u;
      },
      createGoogleAccountInline: async (name, email, picture) => {
        const u = await createGoogleAccountInline(name, email, picture);
        setUser(u);
        return u;
      },
      signOut: async () => {
        await signOut();
        setUser(null);
      },
      updateProfile: async (updates) => {
        const u = await updateProfile(updates);
        setUser(u);
        return u;
      },
      refresh,
    }),
    [user, ready, refresh],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth outside provider');
  return ctx;
}
