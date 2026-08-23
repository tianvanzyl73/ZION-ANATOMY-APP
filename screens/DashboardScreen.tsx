import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { useAuth } from '../lib/authContext';
import { BrandHeader, Card, Chip, GoldBadge, ProgressBar, SectionTitle } from '../components/ui';
import { ALL_TOPICS, TOPIC_MAP, DOMAIN_LABELS } from '../lib/data/index';
import { COURSES } from '../lib/data/courses';
import { REGIONS } from '../lib/data/systems';

export default function DashboardScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { state, levelInfo } = useProgress();
  const { user } = useAuth();

  const recommended = useMemo(() => {
    const studied = new Set(state.recentTopics);
    const pool = ALL_TOPICS.filter((t) => !studied.has(t.id));
    const picks: typeof pool = [];
    const domains = ['energy', 'muscular', 'cardiovascular', 'endocrine', 'nutrition', 'skeletal', 'nervous', 'supplement'];
    for (const d of domains) {
      const found = pool.find((t) => t.domain === d);
      if (found) picks.push(found);
    }
    return picks.slice(0, 6);
  }, [state.recentTopics]);

  const currentCourse = useMemo(() => {
    for (const c of COURSES) {
      const next = c.lessons.find((l) => !state.completedLessons.includes(l.id));
      if (next) return { course: c, lesson: next };
    }
    return null;
  }, [state.completedLessons]);

  const dailyLesson = currentCourse?.lesson ?? COURSES[0].lessons[0];
  const recent = state.recentTopics.map((id) => TOPIC_MAP[id]).filter(Boolean).slice(0, 5);
  const saved = state.savedTopics.map((id) => TOPIC_MAP[id]).filter(Boolean).slice(0, 5);
  const quizAverage = useMemo(() => {
    const scores = Object.values(state.quizScores);
    if (!scores.length) return null;
    const pct = scores.reduce((a, s) => a + s.best / Math.max(1, s.total), 0) / scores.length;
    return Math.round(pct * 100);
  }, [state.quizScores]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <BrandHeader
        subtitle={user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Human Body Intelligence'}
        right={
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ padding: 0 }}>
            <LinearGradient colors={[theme.accent, '#A8862B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#0B0A07', fontSize: 13, fontWeight: '900' }}>
                {(user?.name ?? 'ZA').split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero */}
        <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
          <Card style={{ overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <GoldBadge label={`Level ${levelInfo.level}`} icon="ribbon" />
                </View>
                <Text style={{ color: theme.text, fontSize: 21, fontWeight: '900', letterSpacing: 0.3 }}>{levelInfo.title}</Text>
                <Text style={{ color: theme.textDim, fontSize: 12.5, marginTop: 4, marginBottom: 10 }}>
                  {state.xp} XP · {levelInfo.perLevel - levelInfo.intoLevel} XP to next level
                </Text>
                <ProgressBar value={levelInfo.intoLevel} total={levelInfo.perLevel} />
              </View>
              <View style={{ alignItems: 'center', marginLeft: 14 }}>
                <View style={{ width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: theme.accent, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.accentBg }}>
                  <Ionicons name="flame" size={26} color={theme.accent} />
                  <Text style={{ color: theme.text, fontSize: 15, fontWeight: '900', marginTop: -2 }}>{state.streakDays}</Text>
                </View>
                <Text style={{ color: theme.textFaint, fontSize: 9.5, letterSpacing: 0.8, marginTop: 4 }}>STREAK</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick stats */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 14, marginTop: 14 }}>
          {[
            { l: 'Lessons', v: String(state.completedLessons.length), i: 'school-outline', go: () => navigation.navigate('LearnTab') },
            { l: 'Quizzes', v: String(Object.keys(state.quizScores).length), i: 'help-circle-outline', go: () => navigation.navigate('Quizzes') },
            { l: 'Avg', v: quizAverage !== null ? `${quizAverage}%` : '—', i: 'stats-chart-outline', go: () => navigation.navigate('Quizzes') },
            { l: 'Badges', v: String(state.badges.length), i: 'medal-outline', go: () => navigation.navigate('Achievements') },
          ].map((s) => (
            <TouchableOpacity key={s.l} onPress={s.go} style={{ flex: 1, marginHorizontal: 4, borderRadius: 16, padding: 12, backgroundColor: theme.bgCard, borderWidth: 1, borderColor: theme.border, alignItems: 'center' }}>
              <Ionicons name={s.i as any} size={18} color={theme.accent} />
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: '900', marginTop: 6 }}>{s.v}</Text>
              <Text style={{ color: theme.textFaint, fontSize: 9.5, letterSpacing: 0.5, marginTop: 2 }}>{s.l.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Daily lesson */}
        <View style={{ paddingHorizontal: 18, marginTop: 22 }}>
          <SectionTitle title="Daily Lesson" icon="sunny-outline" actionLabel="All courses" onAction={() => navigation.navigate('LearnTab')} />
          <Card onPress={() => navigation.navigate('Lesson', { courseId: (currentCourse?.course.id ?? COURSES[0].id), lessonId: dailyLesson.id })} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
              <Ionicons name="book-outline" size={20} color={theme.accent} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.textDim, fontSize: 10.5, letterSpacing: 0.8, marginBottom: 2 }}>
                {(currentCourse?.course.title ?? COURSES[0].title).toUpperCase()}
              </Text>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>{dailyLesson.title}</Text>
              <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 3 }}>{dailyLesson.minutes} min · +{dailyLesson.xp} XP</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textFaint} />
          </Card>
        </View>

        {/* Explorer shortcut */}
        <View style={{ paddingHorizontal: 18, marginTop: 22 }}>
          <SectionTitle title="Anatomy Explorer" icon="body-outline" actionLabel="Open" onAction={() => navigation.navigate('BodyTab')} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {REGIONS.slice(0, 6).map((r) => (
              <Chip key={r.id} label={r.name} onPress={() => navigation.navigate('Region', { regionId: r.id })} />
            ))}
          </View>
        </View>

        {/* Recommended */}
        <View style={{ paddingHorizontal: 18, marginTop: 16 }}>
          <SectionTitle title="Recommended Topics" icon="sparkles-outline" actionLabel="Search" onAction={() => navigation.navigate('SearchTab')} />
          {recommended.map((t) => (
            <Card key={t.id} style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Topic', { topicId: t.id })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <Chip label={DOMAIN_LABELS[t.domain] ?? t.domain} color={theme.accent} />
                <Text style={{ color: theme.textFaint, fontSize: 10.5 }}>{t.level}</Text>
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>{t.title}</Text>
              <Text numberOfLines={2} style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18, marginTop: 4 }}>{t.summary}</Text>
            </Card>
          ))}
        </View>

        {recent.length > 0 ? (
          <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
            <SectionTitle title="Recently Studied" icon="time-outline" />
            {recent.map((t) => (
              <Card key={t.id} style={{ marginBottom: 8, padding: 12 }} onPress={() => navigation.navigate('Topic', { topicId: t.id })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="ellipse" size={7} color={theme.accent} style={{ marginRight: 9 }} />
                  <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '700', flex: 1 }}>{t.title}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 10.5 }}>{DOMAIN_LABELS[t.domain]}</Text>
                </View>
              </Card>
            ))}
          </View>
        ) : null}

        {saved.length > 0 ? (
          <View style={{ paddingHorizontal: 18, marginTop: 10 }}>
            <SectionTitle title="Saved Topics" icon="bookmark-outline" />
            {saved.map((t) => (
              <Card key={t.id} style={{ marginBottom: 8, padding: 12 }} onPress={() => navigation.navigate('Topic', { topicId: t.id })}>
                <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '700' }}>{t.title}</Text>
                <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 2 }}>{DOMAIN_LABELS[t.domain]}</Text>
              </Card>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
