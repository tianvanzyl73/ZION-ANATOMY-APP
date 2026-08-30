import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const STREAK_REMINDER_ID = 'zion-anatomy-streak-reminder';
const REMINDER_HOUR = 19; // 7 PM local time -- a reasonable end-of-day nudge
const REMINDER_MINUTE = 0;

// Controls how notifications behave while the app is open in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('reminders', {
    name: 'Streak reminders',
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

/**
 * Requests notification permission if not already determined. Returns
 * whether the app is actually allowed to schedule notifications afterward.
 */
export async function requestNotificationPermission(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  if (!existing.canAskAgain) return false;

  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function getNotificationPermissionStatus() {
  return Notifications.getPermissionsAsync();
}

/**
 * Schedules a single daily local reminder (or replaces the existing one).
 * Safe to call repeatedly -- it always cancels first so there's never more
 * than one reminder scheduled, regardless of how many times the setting is
 * toggled on.
 */
async function scheduleStreakReminder(): Promise<void> {
  await ensureAndroidChannel();
  await Notifications.cancelScheduledNotificationAsync(STREAK_REMINDER_ID).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: STREAK_REMINDER_ID,
    content: {
      title: 'Keep your streak alive 🔥',
      body: "You haven't studied today yet — a quick 5-minute session keeps your streak going.",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: REMINDER_HOUR,
      minute: REMINDER_MINUTE,
    },
  });
}

async function cancelStreakReminder(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(STREAK_REMINDER_ID).catch(() => {});
}

/**
 * Single entry point the rest of the app should call whenever the
 * `notifications` setting changes (including on app startup, to reconcile
 * state -- e.g. a fresh install defaults this to true before permission has
 * ever actually been granted).
 *
 * Returns false if the user wanted notifications on but permission was
 * denied, so the caller can revert the UI toggle and inform them.
 */
export async function syncNotificationSchedule(enabled: boolean): Promise<boolean> {
  if (!enabled) {
    await cancelStreakReminder();
    return true;
  }

  const granted = await requestNotificationPermission();
  if (!granted) {
    return false;
  }

  await scheduleStreakReminder();
  return true;
}
