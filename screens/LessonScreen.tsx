import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { Bullets, Card, SectionTitle } from '../components/ui';
import { COURSES } from '../lib/data/courses';
import { TOPIC_MAP } from '../lib/data/index';

export default function LessonScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const { state, completeLesson } = useProgress();
  const courseId = route?.params?.courseId as string;
  const lessonId = route?.params?.lessonId as string;
  const course = COURSES.find((c) => c.id === courseId);
  const lesson = course?.lessons.find((l) => l.id === lessonId);
  const [choice, setChoice] = useState<number | null>(null);
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 500, useNativeDriver: false }).start();
  }, [fade]);

  if (!course || !lesson) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: theme.textDim }}>Lesson not found.</Text>
      </SafeAreaView>
    );
  }

  const alreadyDone = state.completedLessons.includes(lesson.id);
  const index = course.lessons.findIndex((l) => l.id === lesson.id);
  const next = course.lessons[index + 1];
  const answered = choice !== null;
  const correct = choice === lesson.checkpoint.answer;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 6 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="close" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>{course.title.toUpperCase()}</Text>
          <Text style={{ color: theme.text, fontSize: 16, fontWeight: '900' }}>{lesson.title}</Text>
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 16, backgroundColor: theme.accentBg }}>
          <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900' }}>+{lesson.xp} XP</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fade }}>
          {lesson.blocks.map((b, i) => (
            <Card key={i} style={{ marginBottom: 12 }}>
              <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 6 }}>{b.heading.toUpperCase()}</Text>
              <Text style={{ color: theme.text, fontSize: 14, lineHeight: 22 }}>{b.body}</Text>
              {b.bullets ? <Bullets items={b.bullets} /> : null}
            </Card>
          ))}
        </Animated.View>

        {lesson.topicId && TOPIC_MAP[lesson.topicId] ? (
          <Card onPress={() => navigation.push('Topic', { topicId: lesson.topicId })} style={{ marginBottom: 12, borderColor: theme.accent }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="open-outline" size={17} color={theme.accent} style={{ marginRight: 10 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '800' }}>Deep dive: {TOPIC_MAP[lesson.topicId].title}</Text>
                <Text numberOfLines={2} style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 2 }}>{TOPIC_MAP[lesson.topicId].summary}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={theme.accent} />
            </View>
          </Card>
        ) : null}

        <Card style={{ marginBottom: 14 }}>
          <SectionTitle title="Checkpoint" icon="help-circle-outline" />
          <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '700', lineHeight: 21, marginBottom: 12 }}>{lesson.checkpoint.prompt}</Text>
          {lesson.checkpoint.options.map((opt, i) => {
            const isChosen = choice === i;
            const isAnswer = lesson.checkpoint.answer === i;
            const bg = !answered
              ? theme.bgCardAlt
              : isAnswer
              ? theme.good
              : isChosen
              ? theme.bad
              : theme.bgCardAlt;
            const fg = answered && (isAnswer || isChosen) ? '#FFFFFF' : theme.text;
            return (
              <TouchableOpacity
                key={i}
                disabled={answered}
                onPress={() => setChoice(i)}
                style={{
                  borderRadius: 14,
                  borderWidth: 1,
                  borderColor: answered && isAnswer ? theme.good : answered && isChosen ? theme.bad : theme.border,
                  backgroundColor: bg,
                  paddingHorizontal: 14,
                  paddingVertical: 13,
                  marginBottom: 9,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: fg, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Text style={{ color: fg, fontSize: 11, fontWeight: '900' }}>{String.fromCharCode(65 + i)}</Text>
                </View>
                <Text style={{ color: fg, fontSize: 13.5, flex: 1 }}>{opt}</Text>
                {answered && isAnswer ? <Ionicons name="checkmark" size={16} color="#FFF" /> : null}
              </TouchableOpacity>
            );
          })}
          {answered ? (
            <View style={{ marginTop: 6, padding: 12, borderRadius: 12, backgroundColor: theme.bgCardAlt }}>
              <Text style={{ color: correct ? theme.good : theme.bad, fontWeight: '900', fontSize: 12.5, marginBottom: 4 }}>
                {correct ? 'CORRECT' : 'NOT QUITE'}
              </Text>
              <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>{lesson.checkpoint.explanation}</Text>
            </View>
          ) : null}
        </Card>

        <TouchableOpacity
          disabled={!answered}
          onPress={() => {
            if (!alreadyDone) completeLesson(course.id, lesson.id, lesson.xp);
            if (next) navigation.replace('Lesson', { courseId: course.id, lessonId: next.id });
            else navigation.navigate('Course', { courseId: course.id });
          }}
          style={{
            borderRadius: 18,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: answered ? theme.accent : theme.bgCardAlt,
            opacity: answered ? 1 : 0.6,
          }}
        >
          <Text style={{ color: answered ? (theme.dark ? '#0B0A07' : '#FFFFFF') : theme.textFaint, fontWeight: '900', fontSize: 14.5, letterSpacing: 0.5 }}>
            {next ? 'COMPLETE & CONTINUE' : 'FINISH LESSON'}
          </Text>
        </TouchableOpacity>
        {alreadyDone ? (
          <Text style={{ color: theme.textFaint, fontSize: 11, textAlign: 'center', marginTop: 10 }}>Lesson already completed — XP already earned.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
