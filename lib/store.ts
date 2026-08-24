import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  PROGRESS: 'za_progress',
  BOOKMARKS: 'za_bookmarks',
  SETTINGS: 'za_settings',
  QUIZ_HISTORY: 'za_quiz_history',
  COMPLETED_TOPICS: 'za_completed',
};

export interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  lastActive: number;
  totalQuizzes: number;
  correctAnswers: number;
  totalAnswers: number;
  completedTopics: string[];
  bookmarkedTopics: string[];
}

export interface QuizResult {
  id: string;
  date: number;
  category: string;
  score: number;
  total: number;
  timeSpent: number;
}

export interface Settings {
  darkMode: boolean;
  notifications: boolean;
  soundEnabled: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: 0,
  totalQuizzes: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  completedTopics: [],
  bookmarkedTopics: [],
};

const defaultSettings: Settings = {
  darkMode: true,
  notifications: true,
  soundEnabled: true,
  fontSize: 'medium',
};

export const getProgress = async (): Promise<UserProgress> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.PROGRESS);
    if (data) {
      const parsed = JSON.parse(data);
      // Check streak
      const now = Date.now();
      const hoursSince = (now - (parsed.lastActive || 0)) / (1000 * 60 * 60);
      if (hoursSince > 48) {
        parsed.streak = 0;
      }
      return { ...defaultProgress, ...parsed };
    }
  } catch {}
  return { ...defaultProgress };
};

export const saveProgress = async (progress: UserProgress): Promise<void> => {
  await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
};

export const addXP = async (amount: number): Promise<UserProgress> => {
  const progress = await getProgress();
  progress.xp += amount;
  progress.lastActive = Date.now();
  // Level up every 500 XP
  const newLevel = Math.floor(progress.xp / 500) + 1;
  if (newLevel > progress.level) {
    progress.level = newLevel;
  }
  // Update streak
  const hoursSince = (Date.now() - progress.lastActive) / (1000 * 60 * 60);
  if (hoursSince > 24) {
    progress.streak += 1;
  }
  await saveProgress(progress);
  return progress;
};

export const completeTopic = async (topicId: string): Promise<UserProgress> => {
  const progress = await getProgress();
  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics.push(topicId);
    await addXP(50);
  }
  await saveProgress(progress);
  return progress;
};

export const toggleBookmark = async (topicId: string): Promise<UserProgress> => {
  const progress = await getProgress();
  const idx = progress.bookmarkedTopics.indexOf(topicId);
  if (idx >= 0) {
    progress.bookmarkedTopics.splice(idx, 1);
  } else {
    progress.bookmarkedTopics.push(topicId);
  }
  await saveProgress(progress);
  return progress;
};

export const recordQuiz = async (result: QuizResult): Promise<UserProgress> => {
  const progress = await getProgress();
  progress.totalQuizzes += 1;
  progress.correctAnswers += result.score;
  progress.totalAnswers += result.total;
  progress.lastActive = Date.now();
  await saveProgress(progress);
  // Save quiz history
  try {
    const historyData = await AsyncStorage.getItem(KEYS.QUIZ_HISTORY);
    const history: QuizResult[] = historyData ? JSON.parse(historyData) : [];
    history.push(result);
    await AsyncStorage.setItem(KEYS.QUIZ_HISTORY, JSON.stringify(history.slice(-50)));
  } catch {}
  await addXP(result.score * 20);
  return getProgress();
};

export const getSettings = async (): Promise<Settings> => {
  try {
    const data = await AsyncStorage.getItem(KEYS.SETTINGS);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : { ...defaultSettings };
  } catch {}
  return { ...defaultSettings };
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
};

export const getLevelTitle = (level: number): string => {
  if (level <= 3) return 'Novice';
  if (level <= 6) return 'Student';
  if (level <= 10) return 'Scholar';
  if (level <= 15) return 'Expert';
  if (level <= 20) return 'Master';
  return 'Anatomist';
};

export const getXPForNextLevel = (currentXP: number): number => {
  const currentLevel = Math.floor(currentXP / 500) + 1;
  return (currentLevel * 500) - currentXP;
};

export const getLevelProgress = (xp: number): number => {
  return (xp % 500) / 500;
};
