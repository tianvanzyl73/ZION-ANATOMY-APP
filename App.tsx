import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { getSettings } from './lib/store';
import { syncNotificationSchedule } from './lib/notifications';

import DashboardScreen from './screens/DashboardScreen';
import ExplorerScreen from './screens/ExplorerScreen';
import TopicDetailScreen from './screens/TopicDetailScreen';
import SearchScreen from './screens/SearchScreen';
import QuizScreen from './screens/QuizScreen';
import LearnScreen from './screens/LearnScreen';
import AITutorScreen from './screens/AITutorScreen';
import ProfileScreen from './screens/ProfileScreen';
import TopicListScreen from './screens/TopicListScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  // Driven by the app's own Dark Mode setting (with the OS scheme only as a
  // fallback before that setting has loaded) -- not the raw OS scheme alone,
  // so the in-app toggle in Profile actually has an effect app-wide.
  const { isDark } = useTheme();

  // Reconcile the notification schedule with the saved setting once on
  // startup -- covers a fresh install (where `notifications` defaults to
  // true but nothing has been scheduled or permitted yet) and any case
  // where a previous session's schedule didn't stick. This intentionally
  // does not force-flip the stored setting if permission is denied; the
  // Profile toggle handles that correction the next time the user visits it.
  useEffect(() => {
    getSettings().then((s) => {
      syncNotificationSchedule(s.notifications).catch(() => {});
    });
  }, []);

  const navTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: '#0A0A0A',
          card: '#0A0A0A',
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FAFAFA',
          card: '#FAFAFA',
        },
      };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Explorer" component={ExplorerScreen} />
          <Stack.Screen name="TopicDetail" component={TopicDetailScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Learn" component={LearnScreen} />
          <Stack.Screen name="AITutor" component={AITutorScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="TopicList" component={TopicListScreen} />
          <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SubscriptionProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SubscriptionProvider>
  );
}
