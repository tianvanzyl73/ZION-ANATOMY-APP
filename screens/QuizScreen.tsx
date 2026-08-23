import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { Card, ProgressBar } from '../components/ui';
import { QUIZZES } from '../lib/data/courses';

export default function QuizScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const { state, recordQuiz } = useProgress();
  const quizId = route?.params?.quizId as string;
  const quiz = QUIZZES.find((q) => q.id === quizId);
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [finished]);

  useEffect(() => {
    slide.setValue(0);
    Animated.timing(slide, { toValue: 1, duration: 380, useNativeDriver: false }).start();
  }, [index, slide]);

  if (!quiz) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: theme.textDim }}>Quiz not found.</Text>
      </SafeAreaView>
    );
  }

  const q = quiz.questions[index];
  const answered = choice !== null;
  const correct = choice === q.answer;
  const previousBest = state.quizScores[quiz.id]?.best ?? 0;

  if (finished) {
    const pct = Math.round((score / quiz.questions.length) * 100);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 22 }}>
          <View style={{ width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: pct >= 80 ? theme.good : theme.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
            <Text style={{ color: theme.text, fontSize: 30, fontWeight: '900' }}>{pct}%</Text>
          </View>
          <Text style={{ color: theme.text, fontSize: 21, fontWeight: '900' }}>{pct >= 90 ? 'Outstanding' : pct >= 70 ? 'Strong work' : pct >= 50 ? 'Solid progress' : 'Keep studying'}</Text>
          <Text style={{ color: theme.textDim, fontSize: 13.5, marginTop: 6, textAlign: 'center', lineHeight: 20 }}>
            {score} of {quiz.questions.length} correct · {Math.floor(seconds / 60)}m {seconds % 60}s
          </Text>
          <View style={{ marginTop: 20, width: '100%' }}>
            <Card>
              <Text style={{ color: theme.textFaint, fontSize: 11, letterSpacing: 1, marginBottom: 4 }}>PREVIOUS BEST</Text>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>
                {previousBest}/{quiz.questions.length} · {Math.round((previousBest / quiz.questions.length) * 100)}%
              </Text>
              <View style={{ marginTop: 12 }}>
                <ProgressBar value={score} total={quiz.questions.length} height={8} />
              </View>
            </Card>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 18 }}>
            <TouchableOpacity
              onPress={() => {
                setIndex(0);
                setScore(0);
                setChoice(null);
                setFinished(false);
                setSeconds(0);
              }}
              style={{ paddingHorizontal: 22, paddingVertical: 14, borderRadius: 16, backgroundColor: theme.accent, marginRight: 10 }}
            >
              <Text style={{ color: theme.dark ? '#0B0A07' : '#FFF', fontWeight: '900' }}>RETRY</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 22, paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: theme.border }}>
              <Text style={{ color: theme.textDim, fontWeight: '800' }}>DONE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="close" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <ProgressBar value={index} total={quiz.questions.length} height={5} />
          <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 6, letterSpacing: 0.6 }}>
            QUESTION {index + 1} OF {quiz.questions.length} · {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
          </Text>
        </View>
      </View>

      <Animated.View style={{ flex: 1, opacity: slide, paddingHorizontal: 18, paddingTop: 6 }}>
        <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 6 }}>
          {(q.kind ?? 'concept').toUpperCase()} QUESTION
        </Text>
        <Text style={{ color: theme.text, fontSize: 17, fontWeight: '800', lineHeight: 25, marginBottom: 18 }}>{q.prompt}</Text>
        {q.options.map((opt, i) => {
          const isChosen = choice === i;
          const isAnswer = q.answer === i;
          const bg = !answered ? theme.bgCard : isAnswer ? theme.good : isChosen ? theme.bad : theme.bgCard;
          const fg = answered && (isAnswer || isChosen) ? '#FFFFFF' : theme.text;
          return (
            <TouchableOpacity
              key={i}
              disabled={answered}
              onPress={() => {
                if (choice !== null) return;
                setChoice(i);
                if (i === q.answer) setScore((s) => s + 1);
              }}
              style={{
                borderRadius: 16,
                borderWidth: 1,
                borderColor: answered && isAnswer ? theme.good : answered && isChosen ? theme.bad : theme.border,
                backgroundColor: bg,
                paddingHorizontal: 15,
                paddingVertical: 15,
                marginBottom: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: 1, borderColor: fg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ color: fg, fontSize: 12, fontWeight: '900' }}>{String.fromCharCode(65 + i)}</Text>
              </View>
              <Text style={{ color: fg, fontSize: 13.5, flex: 1, lineHeight: 19 }}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        {answered ? (
          <View style={{ padding: 14, borderRadius: 14, backgroundColor: theme.bgCardAlt, marginBottom: 12 }}>
            <Text style={{ color: correct ? theme.good : theme.bad, fontWeight: '900', fontSize: 12.5, marginBottom: 4 }}>{correct ? 'CORRECT' : 'INCORRECT'}</Text>
            <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>{q.explanation}</Text>
          </View>
        ) : null}
        <TouchableOpacity
          disabled={!answered}
          onPress={() => {
            if (index + 1 >= quiz.questions.length) {
              recordQuiz(quiz.id, score, quiz.questions.length, Math.round((score / quiz.questions.length) * 100));
              setFinished(true);
            } else {
              setIndex((i) => i + 1);
              setChoice(null);
            }
          }}
          style={{ borderRadius: 18, paddingVertical: 15, alignItems: 'center', backgroundColor: answered ? theme.accent : theme.bgCardAlt, opacity: answered ? 1 : 0.6 }}
        >
          <Text style={{ color: answered ? (theme.dark ? '#0B0A07' : '#FFF') : theme.textFaint, fontWeight: '900', letterSpacing: 0.5 }}>
            {index + 1 >= quiz.questions.length ? 'FINISH' : 'NEXT QUESTION'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
