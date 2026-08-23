import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/themeContext';
import { useAuth } from '../lib/authContext';
import { Card, SectionTitle } from '../components/ui';

export default function ProfileScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { user, updateProfile, signOut } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');
  const [goal, setGoal] = useState(user?.studyGoalMinutes ?? 15);

  useEffect(() => {
    if (!editing) {
      setName(user?.name ?? '');
      setBio(user?.bio ?? '');
      setGoal(user?.studyGoalMinutes ?? 15);
    }
  }, [user, editing]);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  async function save() {
    await updateProfile({ name, bio, studyGoalMinutes: goal });
    setEditing(false);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 6 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>My Profile</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Card style={{ alignItems: 'center', paddingVertical: 22 }}>
          {user.avatar ? (
            <View style={{ width: 86, height: 86, borderRadius: 43, overflow: 'hidden', borderWidth: 2, borderColor: theme.accent, marginBottom: 10 }}>
              <LinearGradient colors={[theme.accent, '#A8862B']} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#0B0A07', fontSize: 30, fontWeight: '900' }}>{initials}</Text>
              </LinearGradient>
            </View>
          ) : (
            <LinearGradient colors={[theme.accent, '#A8862B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 86, height: 86, borderRadius: 43, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
              <Text style={{ color: '#0B0A07', fontSize: 30, fontWeight: '900' }}>{initials}</Text>
            </LinearGradient>
          )}
          {editing ? (
            <TextInput placeholder="Display name" placeholderTextColor={theme.textFaint} value={name} onChangeText={setName} style={{ color: theme.text, fontSize: 16, fontWeight: '900', textAlign: 'center' }} />
          ) : (
            <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>{user.name}</Text>
          )}
          <Text style={{ color: theme.textFaint, fontSize: 12, marginTop: 4 }}>{user.email}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name={user.provider === 'google' ? 'logo-google' : 'mail-outline'} size={13} color={theme.accent} style={{ marginRight: 5 }} />
            <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '800', letterSpacing: 0.6 }}>
              {user.provider === 'google' ? 'GOOGLE ACCOUNT' : 'EMAIL ACCOUNT'}
            </Text>
          </View>
          <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 4 }}>
            Member since {new Date(user.joinedAt).toLocaleDateString()}
          </Text>
        </Card>

        <View style={{ marginTop: 18 }}>
          <SectionTitle title="About you" icon="person-outline" actionLabel={editing ? 'Save' : 'Edit'} onAction={() => (editing ? save() : setEditing(true))} />
          <Card style={{ marginBottom: 12 }}>
            {editing ? (
              <TextInput placeholder="Tell us a little about your goals" placeholderTextColor={theme.textFaint} value={bio} onChangeText={setBio} multiline style={{ color: theme.text, fontSize: 14, minHeight: 56, textAlignVertical: 'top' }} />
            ) : (
              <Text style={{ color: user.bio ? theme.textDim : theme.textFaint, fontSize: 13.5, lineHeight: 20 }}>
                {user.bio || 'No bio yet — tell yourself (or your future self) what you want to learn.'}
              </Text>
            )}
          </Card>

          <SectionTitle title="Daily study goal" icon="timer-outline" />
          <Card style={{ marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {[10, 15, 20, 30, 45].map((m) => {
                const active = goal === m;
                return (
                  <TouchableOpacity
                    key={m}
                    onPress={() => {
                      setGoal(m);
                      updateProfile({ studyGoalMinutes: m });
                    }}
                    style={{ flex: 1, marginRight: 6, paddingVertical: 10, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: active ? theme.accent : theme.border, backgroundColor: active ? theme.accentBg : 'transparent' }}
                  >
                    <Text style={{ color: active ? theme.accent : theme.textDim, fontWeight: '900', fontSize: 13 }}>{m}m</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 8 }}>
              Recommended: 15–30 minutes of focused study a day.
            </Text>
          </Card>

          <SectionTitle title="Account" icon="settings-outline" />
          <Card>
            <TouchableOpacity onPress={() => signOut()} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <Ionicons name="log-out-outline" size={17} color={theme.warn} style={{ marginRight: 10 }} />
              <Text style={{ color: theme.warn, fontWeight: '800', fontSize: 14, flex: 1 }}>Sign out</Text>
              <Ionicons name="chevron-forward" size={17} color={theme.textFaint} />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
