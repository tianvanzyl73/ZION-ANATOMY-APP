import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'zion_anatomy_bookmarks';
const PROGRESS_KEY = 'zion_anatomy_progress';

export interface Bookmark {
  systemId: string;
  organId: string;
  addedAt: number;
}

export interface QuizProgress {
  totalAttempted: number;
  totalCorrect: number;
  lastPlayed: number;
  streak: number;
}

export const getBookmarks = async (): Promise<Bookmark[]> => {
  try {
    const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addBookmark = async (systemId: string, organId: string): Promise<void> => {
  const bookmarks = await getBookmarks();
  const exists = bookmarks.find(b => b.systemId === systemId && b.organId === organId);
  if (!exists) {
    bookmarks.push({ systemId, organId, addedAt: Date.now() });
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }
};

export const removeBookmark = async (systemId: string, organId: string): Promise<void> => {
  const bookmarks = await getBookmarks();
  const filtered = bookmarks.filter(b => !(b.systemId === systemId && b.organId === organId));
  await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(filtered));
};

export const isBookmarked = async (systemId: string, organId: string): Promise<boolean> => {
  const bookmarks = await getBookmarks();
  return bookmarks.some(b => b.systemId === systemId && b.organId === organId);
};

export const getQuizProgress = async (): Promise<QuizProgress> => {
  try {
    const data = await AsyncStorage.getItem(PROGRESS_KEY);
    return data ? JSON.parse(data) : { totalAttempted: 0, totalCorrect: 0, lastPlayed: 0, streak: 0 };
  } catch {
    return { totalAttempted: 0, totalCorrect: 0, lastPlayed: 0, streak: 0 };
  }
};

export const updateQuizProgress = async (correct: boolean): Promise<QuizProgress> => {
  const progress = await getQuizProgress();
  progress.totalAttempted += 1;
  if (correct) {
    progress.totalCorrect += 1;
    progress.streak += 1;
  } else {
    progress.streak = 0;
  }
  progress.lastPlayed = Date.now();
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  return progress;
};
