import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadSession } from './auth';
import { UserProfile } from './auth';

const GUEST_KEY = 'zion-anatomy-progress-guest-v1';
const userKey = (id: string) => `zion-anatomy-progress-${id}`;

export interface QuizScore {
  best: number;
  total: number;
  attempts: number;
  lastAt: string;
}

export interface ProgressState {
  xp: number;
  completedLessons: string[];
  completedCourses: string[];
  quizScores: Record<string, QuizScore>;
  savedTopics: string[];
  recentTopics: string[];
  badges: string[];
  streakDays: number;
  lastStudyDate: string;
  studiedDates: string[];
  sessions: number;
}

const empty: ProgressState = {
  xp: 0,
  completedLessons: [],
  completedCourses: [],
  quizScores: {},
  savedTopics: [],
  recentTopics: [],
  badges: [],
  streakDays: 0,
  lastStudyDate: '',
  studiedDates: [],
  sessions: 0,
};

export interface Badge {
  id: string;
  name: string;
  detail: string;
  icon: string;
  test: (s: ProgressState) => boolean;
}

export const BADGES: Badge[] = [
  { id: 'first-step', name: 'First Dissection', detail: 'Complete your first lesson', icon: 'school-outline', test: (s) => s.completedLessons.length >= 1 },
  { id: 'xp-250', name: 'Anatomy Apprentice', detail: 'Earn 250 XP', icon: 'flash-outline', test: (s) => s.xp >= 250 },
  { id: 'xp-1000', name: 'Zion Scholar', detail: 'Earn 1000 XP', icon: 'diamond-outline', test: (s) => s.xp >= 1000 },
  { id: 'xp-3000', name: 'Physiology Master', detail: 'Earn 3000 XP', icon: 'planet-outline', test: (s) => s.xp >= 3000 },
  { id: 'streak-3', name: 'Consistent Mind', detail: '3-day learning streak', icon: 'flame-outline', test: (s) => s.streakDays >= 3 },
  { id: 'streak-7', name: 'Week of Wisdom', detail: '7-day learning streak', icon: 'flame', test: (s) => s.streakDays >= 7 },
  { id: 'quiz-5', name: 'Quiz Cadet', detail: 'Complete 5 quizzes', icon: 'help-circle-outline', test: (s) => Object.keys(s.quizScores).length >= 5 },
  { id: 'quiz-perfect', name: 'Perfect Recall', detail: 'Score 100% on any quiz', icon: 'ribbon-outline', test: (s) => Object.values(s.quizScores).some((q) => q.best === q.total && q.total > 0) },
  { id: 'lessons-10', name: 'Deep Diver', detail: 'Complete 10 lessons', icon: 'layers-outline', test: (s) => s.completedLessons.length >= 10 },
  { id: 'lessons-25', name: 'Body Cartographer', detail: 'Complete 25 lessons', icon: 'map-outline', test: (s) => s.completedLessons.length >= 25 },
  { id: 'saver-5', name: 'Curator', detail: 'Save 5 topics to your library', icon: 'bookmark-outline', test: (s) => s.savedTopics.length >= 5 },
  { id: 'explorer', name: 'Systems Explorer', detail: 'Study topics from 8 different systems', icon: 'git-network-outline', test: (s) => new Set(s.recentTopics.map((t) => t.split('-')[0])).size >= 8 },
];

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

interface Ctx {
  state: ProgressState;
  ready: boolean;
  user: UserProfile | null;
  addXp: (n: number) => void;
  completeLesson: (courseId: string, lessonId: string, xp: number) => void;
  recordQuiz: (quizId: string, best: number, total: number, xp: number) => void;
  toggleSaved: (topicId: string) => void;
  visitTopic: (topicId: string) => void;
  reset: () => void;
  levelInfo: { level: number; title: string; intoLevel: number; perLevel: number };
}

const StoreContext = createContext<Ctx | null>(null);

const LEVEL_TITLES = [
  'Anatomy Novice',
  'Tissue Student',
  'Organ Scholar',
  'Systems Analyst',
  'Physiology Adept',
  'Biomechanics Expert',
  'Clinical Reasoner',
  'Zion Anatomist',
];

export function ProgressProvider({ children, user }: { children: React.ReactNode; user: UserProfile | null }) {
  const [state, setState] = useState<ProgressState>(empty);
  const [ready, setReady] = useState(false);
  const hydratedUserRef = useRef<string | null>(null);

  const storageKey = user ? userKey(user.id) : GUEST_KEY;

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    AsyncStorage.getItem(storageKey)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          try {
            const parsed = JSON.parse(raw) as ProgressState;
            setState({ ...empty, ...parsed });
          } catch {
            setState(empty);
          }
        } else {
          setState(empty);
        }
        hydratedUserRef.current = storageKey;
        setReady(true);
      })
      .catch(() => {
        setState(empty);
        hydratedUserRef.current = storageKey;
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  useEffect(() => {
    if (ready && hydratedUserRef.current === storageKey) {
      AsyncStorage.setItem(storageKey, JSON.stringify(state)).catch(() => undefined);
    }
  }, [state, ready, storageKey]);

  // When the storageKey changes (user sign-in/sign-out/switch), reset state so
  // the previous user's data never gets persisted under the new key. The new
  // key's hydration effect will populate state.
  useEffect(() => {
    if (ready && hydratedUserRef.current !== storageKey) {
      setState(empty);
    }
  }, [storageKey, ready]);

  const mutate = (fn: (s: ProgressState) => ProgressState) =>
    setState((prev) => {
      const next = fn(prev);
      const earned = BADGES.filter((b) => b.test(next) && !next.badges.includes(b.id));
      if (earned.length) next.badges = [...next.badges, ...earned.map((b) => b.id)];
      return next;
    });

  const markStudy = (s: ProgressState): ProgressState => {
    const today = todayKey();
    if (s.lastStudyDate === today) return s;
    const streak = s.lastStudyDate === yesterdayKey() ? s.streakDays + 1 : 1;
    return {
      ...s,
      streakDays: streak,
      lastStudyDate: today,
      studiedDates: [...new Set([...s.studiedDates, today])].slice(-120),
      sessions: s.sessions + 1,
    };
  };

  const value: Ctx = useMemo(() => {
    const perLevel = 500;
    const level = Math.min(LEVEL_TITLES.length, Math.floor(state.xp / perLevel) + 1);
    return {
      state,
      ready,
      user,
      levelInfo: {
        level,
        title: LEVEL_TITLES[level - 1],
        intoLevel: state.xp % perLevel,
        perLevel,
      },
      addXp: (n) => mutate((s) => ({ ...markStudy(s), xp: s.xp + n })),
      completeLesson: (courseId, lessonId, xp) =>
        mutate((s) => {
          if (s.completedLessons.includes(lessonId)) return s;
          return { ...markStudy(s), xp: s.xp + xp, completedLessons: [...s.completedLessons, lessonId] };
        }),
      recordQuiz: (quizId, best, total, xp) =>
        mutate((s) => {
          const prevScore = s.quizScores[quizId];
          return {
            ...markStudy(s),
            xp: s.xp + xp,
            quizScores: {
              ...s.quizScores,
              [quizId]: {
                best: Math.max(best, prevScore?.best ?? 0),
                total,
                attempts: (prevScore?.attempts ?? 0) + 1,
                lastAt: new Date().toISOString(),
              },
            },
          };
        }),
      toggleSaved: (topicId) =>
        mutate((s) => ({
          ...s,
          savedTopics: s.savedTopics.includes(topicId)
            ? s.savedTopics.filter((t) => t !== topicId)
            : [topicId, ...s.savedTopics],
        })),
      visitTopic: (topicId) =>
        mutate((s) => ({ ...markStudy(s), recentTopics: [topicId, ...s.recentTopics.filter((t) => t !== topicId)].slice(0, 14) })),
      reset: () => {
        setState(empty);
        AsyncStorage.removeItem(storageKey).catch(() => undefined);
      },
    };
  }, [state, ready, user, storageKey]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
