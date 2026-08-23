import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider, useTheme } from './lib/themeContext';
import { AuthProvider, useAuth } from './lib/authContext';
import { ProgressProvider } from './lib/store';
import AppNavigation from './components/navigation';

function ThemedShell() {
  const { theme, dark } = useTheme();
  return (
    <>
      <AppNavigation />
      <StatusBar style={dark ? 'light' : 'dark'} />
    </>
  );
}

function AuthGate() {
  const auth = useAuth();
  if (!auth.ready) {
    return <View style={{ flex: 1, backgroundColor: '#07070A' }} />;
  }
  return (
    <ProgressProvider key={auth.user?.id ?? 'guest'} user={auth.user}>
      <AppNavigation />
    </ProgressProvider>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({ ...Ionicons.font });
  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <AuthGate />
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
