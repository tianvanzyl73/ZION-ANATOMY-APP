import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getAllQuizQuestions, getTopicById } from '../lib/data';
import { recordQuiz } from '../lib/store';

export default function QuizScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [mode, setMode] = useState<'menu' | 'quiz' | 'result'>('menu');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime] = useState(Date.now());

  const questions = useMemo(() => {
    const all = getAllQuizQuestions();
    const shuffled = [...all].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [mode]);

  const current = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    if (idx === current.question.correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    await recordQuiz({
      id: Date.now().toString(),
      date: Date.now(),
      category: 'mixed',
      score,
      total: questions.length,
      timeSpent: Date.now() - startTime,
    });
    setMode('result');
  };

  const resetQuiz = () => {
    setMode('menu');
    setCurrentIdx(0);
    setSelected(null);
    setShowAnswer(false);
    setScore(0);
  };

  if (mode === 'menu') {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]}>Quiz Mode</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.menuContent}>
          <View style={[styles.menuIcon, { backgroundColor: t.accent + '20' }]}>
            <Ionicons name="help-circle" size={64} color={t.accent} />
          </View>
          <Text style={[styles.menuTitle, { color: t.text }]}>Test Your Knowledge</Text>
          <Text style={[styles.menuDesc, { color: t.textSecondary }]}>
            Answer 10 random questions from all topics. Earn XP for each correct answer!
          </Text>

          <View style={[styles.menuStats, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={styles.menuStatRow}>
              <Ionicons name="layers" size={18} color={t.accent} />
              <Text style={[styles.menuStatText, { color: t.textSecondary }]}>10 Questions</Text>
            </View>
            <View style={styles.menuStatRow}>
              <Ionicons name="star" size={18} color={t.accent} />
              <Text style={[styles.menuStatText, { color: t.textSecondary }]}>20 XP per correct answer</Text>
            </View>
            <View style={styles.menuStatRow}>
              <Ionicons name="time" size={18} color={t.accent} />
              <Text style={[styles.menuStatText, { color: t.textSecondary }]}>No time limit</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.startBtn, { backgroundColor: t.accent }]}
            onPress={() => setMode('quiz')}
            activeOpacity={0.85}
          >
            <Text style={styles.startBtnText}>Start Quiz</Text>
            <Ionicons name="arrow-forward" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (mode === 'result') {
    const percentage = Math.round((score / questions.length) * 100);
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : percentage >= 40 ? '📚' : '💪';
    const message = percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : percentage >= 40 ? 'Keep learning!' : 'Practice makes perfect!';

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
        <View style={styles.resultContent}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={[styles.resultTitle, { color: t.text }]}>{message}</Text>
          <View style={[styles.scoreCard, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Text style={[styles.scoreNumber, { color: t.accent }]}>{score}/{questions.length}</Text>
            <Text style={[styles.scoreLabel, { color: t.textSecondary }]}>Correct Answers</Text>
            <View style={[styles.scoreBar, { backgroundColor: t.border }]}>
              <View style={[styles.scoreBarFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={[styles.scorePercent, { color: t.textSecondary }]}>{percentage}% • {score * 20} XP earned</Text>
          </View>
          <View style={styles.resultActions}>
            <TouchableOpacity
              style={[styles.resultBtn, { backgroundColor: t.accent }]}
              onPress={resetQuiz}
              activeOpacity={0.85}
            >
              <Ionicons name="refresh" size={18} color="#000" />
              <Text style={styles.resultBtnTextPrimary}>Try Again</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.resultBtn, { backgroundColor: t.surface, borderColor: t.border, borderWidth: 1 }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Ionicons name="home" size={18} color={t.text} />
              <Text style={[styles.resultBtnTextSecondary, { color: t.text }]}>Go Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => {
            Alert.alert('Quit Quiz?', 'Your progress will be lost.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Quit', style: 'destructive', onPress: () => navigation.goBack() },
            ]);
          }}
        >
          <Ionicons name="close" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>
          {currentIdx + 1}/{questions.length}
        </Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={[styles.progressBar, { backgroundColor: t.border }]}>
        <View style={[styles.progressFill, { width: `${((currentIdx + 1) / questions.length) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.categoryBadge, { backgroundColor: t.accent + '20' }]}>
          <Text style={[styles.categoryText, { color: t.accent }]}>{current.topic.category}</Text>
        </View>

        <Text style={[styles.questionText, { color: t.text }]}>{current.question.question}</Text>

        <View style={styles.optionsContainer}>
          {current.question.options.map((option, idx) => {
            const isCorrect = idx === current.question.correct;
            const isSelected = idx === selected;
            const showCorrect = showAnswer && isCorrect;
            const showWrong = showAnswer && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionBtn,
                  { backgroundColor: t.surface, borderColor: t.border },
                  showCorrect && { backgroundColor: t.success + '20', borderColor: t.success },
                  showWrong && { backgroundColor: t.error + '20', borderColor: t.error },
                ]}
                onPress={() => handleSelect(idx)}
                activeOpacity={0.8}
                disabled={showAnswer}
              >
                <View style={[
                  styles.optionLetter,
                  { backgroundColor: t.surfaceElevated },
                  showCorrect && { backgroundColor: t.success },
                  showWrong && { backgroundColor: t.error },
                ]}>
                  <Text style={[
                    styles.optionLetterText,
                    { color: t.text },
                    (showCorrect || showWrong) && { color: '#fff' },
                  ]}>
                    {String.fromCharCode(65 + idx)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: t.text }]}>{option}</Text>
                {showCorrect && <Ionicons name="checkmark-circle" size={22} color={t.success} />}
                {showWrong && <Ionicons name="close-circle" size={22} color={t.error} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {showAnswer && (
          <>
            <View style={[styles.explanationCard, { backgroundColor: t.accent + '10', borderColor: t.accent + '30' }]}>
              <Ionicons name="bulb" size={18} color={t.accent} />
              <Text style={[styles.explanationText, { color: t.text }]}>{current.question.explanation}</Text>
            </View>

            <TouchableOpacity
              style={[styles.nextBtn, { backgroundColor: t.accent }]}
              onPress={handleNext}
              activeOpacity={0.85}
            >
              <Text style={styles.nextBtnText}>
                {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Text>
              <Ionicons name="arrow-forward" size={18} color="#000" />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { fontSize: FontSizes.md, fontWeight: '700' },
  progressBar: { height: 4, marginHorizontal: 20, borderRadius: 2, marginBottom: 20 },
  progressFill: { height: 4, backgroundColor: '#D4AF37', borderRadius: 2 },
  menuContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  menuIcon: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  menuTitle: { fontSize: FontSizes.xxl, fontWeight: '800', marginBottom: 10 },
  menuDesc: { fontSize: FontSizes.md, textAlign: 'center', lineHeight: 24, marginBottom: 28 },
  menuStats: { width: '100%', borderRadius: BorderRadius.lg, padding: 18, borderWidth: 1, gap: 14, marginBottom: 30 },
  menuStatRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  menuStatText: { fontSize: FontSizes.md, fontWeight: '500' },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, paddingHorizontal: 40, borderRadius: 14, width: '100%' },
  startBtnText: { fontSize: FontSizes.lg, fontWeight: '700', color: '#000' },
  categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginBottom: 16 },
  categoryText: { fontSize: FontSizes.xs, fontWeight: '700' },
  questionText: { fontSize: FontSizes.xl, fontWeight: '700', lineHeight: 30, marginBottom: 24 },
  optionsContainer: { gap: 10 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, gap: 12, borderWidth: 1 },
  optionLetter: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  optionLetterText: { fontSize: FontSizes.sm, fontWeight: '700' },
  optionText: { flex: 1, fontSize: FontSizes.md, fontWeight: '500' },
  explanationCard: { flexDirection: 'row', borderRadius: 12, padding: 14, gap: 10, marginTop: 16, alignItems: 'flex-start', borderWidth: 1 },
  explanationText: { flex: 1, fontSize: FontSizes.sm, lineHeight: 20 },
  nextBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14, marginTop: 20 },
  nextBtnText: { fontSize: FontSizes.md, fontWeight: '700', color: '#000' },
  resultContent: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  resultEmoji: { fontSize: 72, marginBottom: 16 },
  resultTitle: { fontSize: FontSizes.xxl, fontWeight: '800', marginBottom: 24 },
  scoreCard: { borderRadius: BorderRadius.xl, padding: 30, alignItems: 'center', width: '100%', marginBottom: 30, borderWidth: 1 },
  scoreNumber: { fontSize: 48, fontWeight: '800' },
  scoreLabel: { fontSize: FontSizes.sm, marginBottom: 16 },
  scoreBar: { width: '100%', height: 8, borderRadius: 4, marginBottom: 8 },
  scoreBarFill: { height: 8, backgroundColor: '#D4AF37', borderRadius: 4 },
  scorePercent: { fontSize: FontSizes.md, fontWeight: '700' },
  resultActions: { width: '100%', gap: 12 },
  resultBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 14 },
  resultBtnTextPrimary: { fontSize: FontSizes.md, fontWeight: '700', color: '#000' },
  resultBtnTextSecondary: { fontSize: FontSizes.md, fontWeight: '700' },
});
