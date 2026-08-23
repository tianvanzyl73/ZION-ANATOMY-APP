import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { Card, ProgressBar, SectionTitle } from '../components/ui';
import { COURSES } from '../lib/data/courses';
import { TOPIC_MAP } from '../lib/data/index';

export default function CourseScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const { state } = useProgress();
  const courseId = route?.params?.courseId as string;
  const course = COURSES.find((c) => c.id === courseId);

  if (!course) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: theme.textDim }}>Course not found.</Text>
      </SafeAreaView>
    );
  }

  const done = course.lessons.filter((l) => state.completedLessons.includes(l.id)).length;
  const complete = done === course.lessons.length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>{course.level.toUpperCase()} COURSE</Text>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>{course.title}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginBottom: 16 }}>
          <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>{course.description}</Text>
          <View style={{ marginTop: 12 }}>
            <ProgressBar value={done} total={course.lessons.length} height={8} />
            <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 6 }}>
              {done} of {course.lessons.length} lessons complete · {course.lessons.reduce((a, l) => a + l.xp, 0)} XP available
            </Text>
          </View>
        </Card>

        {complete ? (
          <Card style={{ marginBottom: 16, borderColor: theme.accent }} onPress={() => navigation.navigate('Certificate', { courseId: course.id })}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="ribbon" size={26} color={theme.accent} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.accent, fontSize: 15, fontWeight: '900' }}>Certificate unlocked</Text>
                <Text style={{ color: theme.textDim, fontSize: 12, marginTop: 2 }}>View your completion certificate</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.accent} />
            </View>
          </Card>
        ) : null}

        <SectionTitle title="Lessons" icon="book-outline" />
        {course.lessons.map((lesson, i) => {
          const isDone = state.completedLessons.includes(lesson.id);
          const locked = false;
          return (
            <Card
              key={lesson.id}
              style={{ marginBottom: 11, opacity: locked ? 0.55 : 1 }}
              onPress={() => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 12,
                    backgroundColor: isDone ? theme.accent : theme.bgCardAlt,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    borderWidth: 1,
                    borderColor: isDone ? theme.accent : theme.border,
                  }}
                >
                  {isDone ? <Ionicons name="checkmark" size={19} color={theme.dark ? '#0B0A07' : '#FFFFFF'} /> : <Text style={{ color: theme.textDim, fontWeight: '900' }}>{i + 1}</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800' }}>{lesson.title}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 2 }}>
                    {lesson.minutes} min · +{lesson.xp} XP{lesson.topicId && TOPIC_MAP[lesson.topicId] ? ` · ${TOPIC_MAP[lesson.topicId].system}` : ''}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={17} color={theme.textFaint} />
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
