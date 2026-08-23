import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { BrandHeader, Card, ProgressBar, SectionTitle } from '../components/ui';
import { COURSES, QUIZZES } from '../lib/data/courses';
import { FLASHCARDS, DOMAIN_LABELS } from '../lib/data/index';

export default function LearnScreen({ navigation }: any) {
  const { theme } = useTheme();
  const { state } = useProgress();

  const levelGroups: { level: string; courses: typeof COURSES }[] = [
    { level: 'Beginner', courses: COURSES.filter((c) => c.level === 'Beginner') },
    { level: 'Intermediate', courses: COURSES.filter((c) => c.level === 'Intermediate') },
    { level: 'Advanced', courses: COURSES.filter((c) => c.level === 'Advanced') },
  ];

  const totalLessons = COURSES.reduce((a, c) => a + c.lessons.length, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <BrandHeader subtitle="Courses · Quizzes · Flashcards" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 18, marginTop: 8 }}>
          <Card>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: '800' }}>Overall progress</Text>
              <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '900' }}>
                {state.completedLessons.length}/{totalLessons} lessons
              </Text>
            </View>
            <ProgressBar value={state.completedLessons.length} total={totalLessons} height={8} />
            <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 8, lineHeight: 17 }}>
              Complete every lesson in a course to unlock its certificate.
            </Text>
          </Card>
        </View>

        {levelGroups.map(
          (g) =>
            g.courses.length > 0 && (
              <View key={g.level} style={{ paddingHorizontal: 18, marginTop: 20 }}>
                <SectionTitle title={`${g.level} Courses`} icon={g.level === 'Beginner' ? 'leaf-outline' : g.level === 'Intermediate' ? 'flash-outline' : 'planet-outline'} />
                {g.courses.map((course) => {
                  const done = course.lessons.filter((l) => state.completedLessons.includes(l.id)).length;
                  const pct = Math.round((done / course.lessons.length) * 100);
                  const complete = done === course.lessons.length;
                  return (
                    <Card key={course.id} style={{ marginBottom: 12 }} onPress={() => navigation.navigate('Course', { courseId: course.id })}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                        <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                          <Ionicons name={course.icon as any} size={19} color={theme.accent} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: theme.text, fontSize: 15, fontWeight: '900' }}>{course.title}</Text>
                          <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 2 }}>
                            {course.lessons.length} lessons · {course.lessons.reduce((a, l) => a + l.minutes, 0)} min · {course.level}
                          </Text>
                        </View>
                        {complete ? <Ionicons name="checkmark-circle" size={22} color={theme.good} /> : <Ionicons name="chevron-forward" size={18} color={theme.textFaint} />}
                      </View>
                      <Text numberOfLines={2} style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18 }}>{course.description}</Text>
                      <View style={{ marginTop: 10 }}>
                        <ProgressBar value={done} total={course.lessons.length} />
                        <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 5 }}>
                          {complete ? 'COMPLETED — certificate available' : `${done}/${course.lessons.length} lessons · ${pct}%`}
                        </Text>
                      </View>
                    </Card>
                  );
                })}
              </View>
            ),
        )}

        <View style={{ paddingHorizontal: 18, marginTop: 12 }}>
          <SectionTitle title="Test Yourself" icon="help-circle-outline" actionLabel="All quizzes" onAction={() => navigation.navigate('Quizzes')} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {QUIZZES.slice(0, 4).map((q) => (
              <TouchableOpacity
                key={q.id}
                onPress={() => navigation.navigate('Quiz', { quizId: q.id })}
                style={{ width: '48.5%', marginHorizontal: 2, marginBottom: 10, borderRadius: 16, padding: 13, backgroundColor: theme.bgCard, borderWidth: 1, borderColor: theme.border }}
              >
                <Ionicons name="timer-outline" size={17} color={theme.accent} />
                <Text style={{ color: theme.text, fontSize: 13, fontWeight: '800', marginTop: 6 }}>{q.title}</Text>
                <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 3 }}>{q.questions.length} Q · {q.minutes} min</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ paddingHorizontal: 18, marginTop: 6 }}>
          <Card onPress={() => navigation.navigate('Flashcards')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name="albums-outline" size={20} color={theme.accent} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 15, fontWeight: '900' }}>Flashcards</Text>
                <Text style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 2 }}>{FLASHCARDS.length} cards across {Object.keys(DOMAIN_LABELS).length} domains</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.textFaint} />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
