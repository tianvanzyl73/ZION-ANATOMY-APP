import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { useAuth } from '../lib/authContext';
import { Card } from '../components/ui';

export default function SettingsScreen({ navigation }: any) {
  const { theme, mode, setMode } = useTheme();
  const { state, reset } = useProgress();
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 4 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginBottom: 12 }}>
          <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 0.8, marginBottom: 8 }}>ACCOUNT</Text>
          {user ? (
            <>
              <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                <Ionicons name="person-circle-outline" size={20} color={theme.accent} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ color: theme.text, fontSize: 14, fontWeight: '800' }}>{user.name}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 2 }}>{user.email}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={signOut}
                style={{ marginTop: 6, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: theme.bad, alignItems: 'center' }}
              >
                <Text style={{ color: theme.bad, fontWeight: '800', fontSize: 13 }}>SIGN OUT</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 0.8, marginBottom: 8 }}>APPEARANCE</Text>
          {([
            ['system', 'Follow system'],
            ['light', 'Light'],
            ['dark', 'Dark'],
          ] as const).map(([k, label]) => (
            <TouchableOpacity
              key={k}
              onPress={() => setMode(k as any)}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
            >
              <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, borderColor: theme.accent, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                {mode === k ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.accent }} /> : null}
              </View>
              <Text style={{ color: theme.text, fontSize: 14, flex: 1 }}>{label}</Text>
              {mode === k ? <Ionicons name="checkmark" size={16} color={theme.accent} /> : null}
            </TouchableOpacity>
          ))}
        </Card>

        <Card style={{ marginBottom: 12 }}>
          <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 0.8, marginBottom: 8 }}>PROGRESS DATA</Text>
          <Row label="XP earned" value={String(state.xp)} theme={theme} />
          <Row label="Lessons completed" value={String(state.completedLessons.length)} theme={theme} />
          <Row label="Quizzes taken" value={String(Object.keys(state.quizScores).length)} theme={theme} />
          <Row label="Saved topics" value={String(state.savedTopics.length)} theme={theme} />
          <TouchableOpacity
            onPress={() => reset()}
            style={{ marginTop: 10, paddingVertical: 12, borderRadius: 14, borderWidth: 1, borderColor: theme.bad, alignItems: 'center' }}
          >
            <Text style={{ color: theme.bad, fontWeight: '800', fontSize: 13 }}>RESET MY PROGRESS</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 0.8, marginBottom: 8 }}>ABOUT</Text>
          <Text style={{ color: theme.text, fontSize: 14, fontWeight: '800', marginBottom: 4 }}>ZION ANATOMY v1.0</Text>
          <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>
            An interactive atlas of the human body for students of anatomy, physiology, exercise science, nutrition and medicine. Built on a curated knowledge base with peer-reviewed references.
          </Text>
          <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 10, lineHeight: 17 }}>
            Educational content only. This app does not diagnose, prescribe, or replace professional medical advice. Always consult a qualified clinician for medical concerns.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value, theme }: { label: string; value: string; theme: any }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
      <Text style={{ color: theme.textDim, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: theme.text, fontSize: 13, fontWeight: '800' }}>{value}</Text>
    </View>
  );
}
