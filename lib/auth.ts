import * as Crypto from 'expo-crypto';
import * as AuthSession from 'expo-auth-session';
import { AuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthProvider = 'google' | 'email';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: AuthProvider;
  joinedAt: string;
  studyGoalMinutes: number;
  bio?: string;
}

interface StoredAccount {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  provider: AuthProvider;
  joinedAt: string;
  studyGoalMinutes: number;
  bio?: string;
  // email accounts only:
  passwordHash?: string;
  salt?: string;
}

const ACCOUNTS_KEY = 'zion-anatomy-accounts-v1';
const SESSION_KEY = 'zion-anatomy-session-v1';

WebBrowser.maybeCompleteAuthSession();

async function sha256(text: string): Promise<string> {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, text);
}

function randomId(): string {
  const a = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 20; i++) s += a[Math.floor(Math.random() * a.length)];
  return s;
}

async function loadAccounts(): Promise<StoredAccount[]> {
  const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredAccount[];
  } catch {
    return [];
  }
}

async function saveAccounts(accounts: StoredAccount[]): Promise<void> {
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export async function loadSession(): Promise<UserProfile | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export async function saveSession(user: UserProfile | null): Promise<void> {
  if (!user) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return;
  }
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function publicProfile(acc: StoredAccount): UserProfile {
  return {
    id: acc.id,
    email: acc.email,
    name: acc.name,
    avatar: acc.avatar,
    provider: acc.provider,
    joinedAt: acc.joinedAt,
    studyGoalMinutes: acc.studyGoalMinutes,
    bio: acc.bio,
  };
}

export async function signUpEmail(email: string, password: string, name: string): Promise<UserProfile> {
  const e = email.trim().toLowerCase();
  if (!e || !password || !name.trim()) throw new Error('Please fill in your name, email and password.');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error('That email address looks invalid.');
  if (password.length < 6) throw new Error('Password must be at least 6 characters.');
  const accounts = await loadAccounts();
  if (accounts.some((a) => a.email.toLowerCase() === e)) throw new Error('An account with that email already exists.');
  const salt = randomId() + randomId();
  const passwordHash = await sha256(salt + ':' + password);
  const acc: StoredAccount = {
    id: randomId(),
    email: e,
    name: name.trim(),
    avatar: null,
    provider: 'email',
    joinedAt: new Date().toISOString(),
    studyGoalMinutes: 15,
    bio: '',
    salt,
    passwordHash,
  };
  accounts.push(acc);
  await saveAccounts(accounts);
  const user = publicProfile(acc);
  await saveSession(user);
  return user;
}

export async function signInEmail(email: string, password: string): Promise<UserProfile> {
  const e = email.trim().toLowerCase();
  const accounts = await loadAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === e);
  if (!acc || !acc.passwordHash || !acc.salt) throw new Error('No account found for that email.');
  const hash = await sha256(acc.salt + ':' + password);
  if (hash !== acc.passwordHash) throw new Error('Incorrect password.');
  const user = publicProfile(acc);
  await saveSession(user);
  return user;
}

export async function updateProfile(updates: Partial<Pick<UserProfile, 'name' | 'bio' | 'studyGoalMinutes' | 'avatar'>>): Promise<UserProfile> {
  const session = await loadSession();
  if (!session) throw new Error('You are not signed in.');
  const accounts = await loadAccounts();
  const idx = accounts.findIndex((a) => a.id === session.id);
  if (idx < 0) throw new Error('Account not found.');
  if (typeof updates.name === 'string') accounts[idx].name = updates.name.trim() || accounts[idx].name;
  if (typeof updates.bio === 'string') accounts[idx].bio = updates.bio;
  if (typeof updates.studyGoalMinutes === 'number') accounts[idx].studyGoalMinutes = Math.max(0, Math.round(updates.studyGoalMinutes));
  if (typeof updates.avatar !== 'undefined') accounts[idx].avatar = updates.avatar;
  await saveAccounts(accounts);
  const user = publicProfile(accounts[idx]);
  await saveSession(user);
  return user;
}

export async function signOut(): Promise<void> {
  await saveSession(null);
}

export async function deleteAccount(): Promise<void> {
  const session = await loadSession();
  if (!session) return;
  const accounts = await loadAccounts();
  const next = accounts.filter((a) => a.id !== session.id);
  await saveAccounts(next);
  await AsyncStorage.removeItem(`zion-anatomy-progress-${session.id}`);
  await saveSession(null);
}

// ===== Google OAuth =====
// In production, set GOOGLE_CLIENT_ID in your app config. We attempt the real
// Google OAuth flow first; if the SDK isn't able to complete (e.g. no configured
// OAuth client on a fresh install) we fall back to an in-app Google-style
// account-creation flow that asks the user for name & email.
const GOOGLE_CLIENT_ID = '1028582955834-zion-anatomy-demo.apps.googleusercontent.com';

interface PendingGoogleProfile {
  sub: string;
  email: string;
  name: string;
  picture: string | null;
}

interface GoogleDiscovery {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userInfoEndpoint?: string;
  revocationEndpoint?: string;
}

const GOOGLE_DISCOVERY: GoogleDiscovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  userInfoEndpoint: 'https://openidconnect.googleapis.com/v1/userinfo',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

export async function signInWithGoogle(): Promise<UserProfile> {
  const scheme = 'zionanatomy';
  const redirectUri = AuthSession.makeRedirectUri({ scheme });
  try {
    const request = new AuthRequest({
      clientId: GOOGLE_CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
      responseType: 'token id_token',
      usePKCE: false,
    });
    const result = await request.promptAsync(GOOGLE_DISCOVERY as any);
    if (result.type !== 'success') {
      throw new Error('Google sign-in was cancelled.');
    }
    const params: any = (result as any).params ?? {};
    const idToken: string | undefined = params.id_token;
    if (!idToken) throw new Error('Google did not return an id token.');
    const profile = parseGoogleIdToken(idToken);
    if (!profile) throw new Error('Could not read your Google profile.');
    return await upsertGoogleAccount(profile);
  } catch (e: any) {
    // No production client configured → surface a clear error so the UI can prompt
    // the user to enter their Google email + name as a fallback. The AuthScreen
    // catches this and offers the inline flow.
    throw new Error(e?.message || 'Google sign-in is not configured for this build.');
  }
}

function parseGoogleIdToken(idToken: string): PendingGoogleProfile | null {
  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))) as any;
    if (!payload.sub || !payload.email) return null;
    return {
      sub: payload.sub,
      email: String(payload.email).toLowerCase(),
      name: String(payload.name || payload.email.split('@')[0]),
      picture: payload.picture ?? null,
    };
  } catch {
    return null;
  }
}

async function upsertGoogleAccount(profile: PendingGoogleProfile): Promise<UserProfile> {
  const accounts = await loadAccounts();
  let acc = accounts.find((a) => a.email.toLowerCase() === profile.email);
  if (!acc) {
    acc = {
      id: randomId(),
      email: profile.email,
      name: profile.name,
      avatar: profile.picture,
      provider: 'google',
      joinedAt: new Date().toISOString(),
      studyGoalMinutes: 15,
      bio: '',
    };
    accounts.push(acc);
    await saveAccounts(accounts);
  } else if (acc.provider === 'email' && profile.picture) {
    acc.avatar = profile.picture;
    await saveAccounts(accounts);
  }
  const user = publicProfile(acc);
  await saveSession(user);
  return user;
}

// Inline fallback used by AuthScreen when the real Google OAuth isn't configured.
// Lets the user create a Google-account record directly inside the app so the
// flow stays demo-able end-to-end.
export async function createGoogleAccountInline(name: string, email: string, picture: string | null): Promise<UserProfile> {
  const e = email.trim().toLowerCase();
  if (!name.trim()) throw new Error('Please enter your name.');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error('That email address looks invalid.');
  return upsertGoogleAccount({
    sub: 'inline-' + randomId(),
    email: e,
    name: name.trim(),
    picture,
  });
}
