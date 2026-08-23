import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { BrandHeader, Card, EmptyState, ProgressBar, SectionTitle } from '../components/ui';
import { BADGES } from '../lib/store';

export default function AchievementsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { state, levelInfo } = useProgress();
  const earned = state.badges;
  const totalXP = state.xp;

  const allDone = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
  const doneSet = new Set(state.studiedDates);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 4 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>Achievements</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 18 }}>
        <Card style={{ marginBottom: 14 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>CURRENT LEVEL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <Text style={{ color: theme.text, fontSize: 17, fontWeight: '900' }}>{levelInfo.title}</Text>
            <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '900' }}>Lvl {levelInfo.level}</Text>
          </View>
          <View style={{ marginTop: 8 }}>
            <ProgressBar value={levelInfo.intoLevel} total={levelInfo.perLevel} height={7} />
            <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 6 }}>{state.xp} XP · {levelInfo.perLevel - levelInfo.intoLevel} XP to next level</Text>
          </View>
        </Card>

        <SectionTitle title="Last 7 days" icon="calendar-outline" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
          {allDone.map((d, i) => {
            const on = doneSet.has(d);
            return (
              <View key={d} style={{ alignItems: 'center' }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    borderWidth: 1.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: on ? theme.accentBg : 'transparent',
                    borderColor: on ? theme.accent : theme.border,
                  }}
                >
                  {on ? <Ionicons name="flame" size={14} color={theme.accent} /> : <Text style={{ color: theme.textFaint, fontSize: 11 }}>·</Text>}
                </View>
                <Text style={{ color: theme.textFaint, fontSize: 9.5, marginTop: 4 }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
              </View>
            );
          })}
        </View>

        <SectionTitle title={`Badges (${earned.length}/${BADGES.length})`} icon="medal-outline" />
        {BADGES.map((b) => {
          const got = earned.includes(b.id);
          return (
            <Card key={b.id} style={{ marginBottom: 9, opacity: got ? 1 : 0.5 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 21,
                    backgroundColor: got ? theme.accentBg : theme.bgCardAlt,
                    borderWidth: 1.5,
                    borderColor: got ? theme.accent : theme.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                  }}
                >
                  <Ionicons name={b.icon as any} size={19} color={got ? theme.accent : theme.textFaint} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 14, fontWeight: '800' }}>{b.name}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 2 }}>{b.detail}</Text>
                </View>
                {got ? <Ionicons name="checkmark-circle" size={20} color={theme.good} /> : <Ionicons name="lock-closed-outline" size={18} color={theme.textFaint} />}
              </View>
            </Card>
          );
        })}

        <SectionTitle title="Quiz records" icon="stats-chart-outline" />
        {Object.keys(state.quizScores).length === 0 ? (
          <EmptyState icon="help-circle-outline" title="No quiz records yet" body="Take a quiz to start building your records." />
        ) : (
          Object.entries(state.quizScores).map(([id, score]) => (
            <Card key={id} style={{ marginBottom: 8 }}>
              <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '800' }}>{id}</Text>
              <Text style={{ color: theme.textDim, fontSize: 11.5, marginTop: 2 }}>
                Best {score.best}/{score.total} · Attempts {score.attempts}
              </Text>
              <View style={{ marginTop: 6 }}>
                <ProgressBar value={score.best} total={score.total} />
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}