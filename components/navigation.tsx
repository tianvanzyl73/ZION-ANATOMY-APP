import React from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useAuth } from '../lib/authContext';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import BodyExplorerScreen from '../screens/BodyExplorerScreen';
import LearnScreen from '../screens/LearnScreen';
import SearchScreen from '../screens/SearchScreen';
import TutorScreen from '../screens/TutorScreen';
import SystemScreen from '../screens/SystemScreen';
import RegionScreen from '../screens/RegionScreen';
import TopicScreen from '../screens/TopicScreen';
import CourseScreen from '../screens/CourseScreen';
import LessonScreen from '../screens/LessonScreen';
import QuizScreen from '../screens/QuizScreen';
import QuizListScreen from '../screens/QuizListScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import CertificateScreen from '../screens/CertificateScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const TabStack = createNativeStackNavigator();

function tabIcon(name: string) {
  return ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name as any} color={color} size={size} />
  );
}

function BodyStack() {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="BodyRoot" component={BodyExplorerScreen} />
      <TabStack.Screen name="System" component={SystemScreen} />
      <TabStack.Screen name="Region" component={RegionScreen} />
      <TabStack.Screen name="Topic" component={TopicScreen} />
      <TabStack.Screen name="Course" component={CourseScreen} />
      <TabStack.Screen name="Lesson" component={LessonScreen} />
      <TabStack.Screen name="Quizzes" component={QuizListScreen} />
      <TabStack.Screen name="Quiz" component={QuizScreen} />
      <TabStack.Screen name="Flashcards" component={FlashcardsScreen} />
      <TabStack.Screen name="Achievements" component={AchievementsScreen} />
      <TabStack.Screen name="Certificate" component={CertificateScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
}

function LearnStack() {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="LearnRoot" component={LearnScreen} />
      <TabStack.Screen name="Course" component={CourseScreen} />
      <TabStack.Screen name="Lesson" component={LessonScreen} />
      <TabStack.Screen name="Quizzes" component={QuizListScreen} />
      <TabStack.Screen name="Quiz" component={QuizScreen} />
      <TabStack.Screen name="Flashcards" component={FlashcardsScreen} />
      <TabStack.Screen name="Achievements" component={AchievementsScreen} />
      <TabStack.Screen name="Certificate" component={CertificateScreen} />
      <TabStack.Screen name="Topic" component={TopicScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
}

function TutorStack() {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="TutorRoot" component={TutorScreen} />
      <TabStack.Screen name="Topic" component={TopicScreen} />
      <TabStack.Screen name="Search" component={SearchScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
}

function SearchStack() {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="SearchRoot" component={SearchScreen} />
      <TabStack.Screen name="Topic" component={TopicScreen} />
      <TabStack.Screen name="System" component={SystemScreen} />
      <TabStack.Screen name="Region" component={RegionScreen} />
      <TabStack.Screen name="BodyExplorer" component={BodyExplorerScreen} />
      <TabStack.Screen name="Course" component={CourseScreen} />
      <TabStack.Screen name="Lesson" component={LessonScreen} />
      <TabStack.Screen name="Quizzes" component={QuizListScreen} />
      <TabStack.Screen name="Quiz" component={QuizScreen} />
      <TabStack.Screen name="Flashcards" component={FlashcardsScreen} />
      <TabStack.Screen name="Achievements" component={AchievementsScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
    </TabStack.Navigator>
  );
}

function HomeTabs() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.bgElev,
          borderTopColor: theme.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 64,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.textFaint,
        tabBarLabelStyle: { fontSize: 10, fontWeight: '700', letterSpacing: 0.4 },
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarIcon: tabIcon('home') }} />
      <Tab.Screen name="Body" component={BodyStack} options={{ tabBarIcon: tabIcon('body-outline') }} />
      <Tab.Screen name="Learn" component={LearnStack} options={{ tabBarIcon: tabIcon('book-outline') }} />
      <Tab.Screen name="Tutor" component={TutorStack} options={{ tabBarIcon: tabIcon('chatbubbles-outline') }} />
      <Tab.Screen name="Search" component={SearchStack} options={{ tabBarIcon: tabIcon('search-outline') }} />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <TabStack.Navigator screenOptions={{ headerShown: false }}>
      <TabStack.Screen name="Dashboard" component={DashboardScreen} />
      <TabStack.Screen name="BodyTab" component={BodyExplorerScreen} />
      <TabStack.Screen name="Region" component={RegionScreen} />
      <TabStack.Screen name="System" component={SystemScreen} />
      <TabStack.Screen name="Topic" component={TopicScreen} />
      <TabStack.Screen name="LearnTab" component={LearnScreen} />
      <TabStack.Screen name="Course" component={CourseScreen} />
      <TabStack.Screen name="Lesson" component={LessonScreen} />
      <TabStack.Screen name="Quizzes" component={QuizListScreen} />
      <TabStack.Screen name="Quiz" component={QuizScreen} />
      <TabStack.Screen name="Flashcards" component={FlashcardsScreen} />
      <TabStack.Screen name="Achievements" component={AchievementsScreen} />
      <TabStack.Screen name="Certificate" component={CertificateScreen} />
      <TabStack.Screen name="SearchTab" component={SearchScreen} />
      <TabStack.Screen name="TutorTab" component={TutorScreen} />
      <TabStack.Screen name="Settings" component={SettingsScreen} />
      <TabStack.Screen name="Profile" component={ProfileScreen} />
    </TabStack.Navigator>
  );
}

function AuthFlow() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

export default function AppNavigation() {
  const { theme, dark } = useTheme();
  const { user, ready } = useAuth();

  const navTheme = {
    ...(dark ? DarkTheme : DefaultTheme),
    colors: {
      ...(dark ? DarkTheme : DefaultTheme).colors,
      background: theme.bg,
      card: theme.bgElev,
      border: theme.border,
      text: theme.text,
      primary: theme.accent,
    },
  };

  if (!ready) return null;
  if (!user) return <NavigationContainer theme={navTheme}><AuthFlow /></NavigationContainer>;

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AppRoot" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
