import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getLearningPath } from '../lib/data';
import { getProgress, UserProgress } from '../lib/store';
import { useSubscription } from '../contexts/SubscriptionContext';

export default function LearnScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const learningPath = getLearningPath();
  const { hasAccess, isPremium } = useSubscription();

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  if (!progress) return null;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return '#00C853';
      case 'intermediate': return '#448AFF';
      case 'advanced': return '#FF6B6B';
      case 'expert': return '#D4AF37';
      default: return t.accent;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner': return 'leaf';
      case 'intermediate': return 'trending-up';
      case 'advanced': return 'flame';
      case 'expert': return 'trophy';
      default: return 'star';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Learning Path</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.intro}>
          <Text style={[styles.introTitle, { color: t.text }]}>Master Human Anatomy</Text>
          <Text style={[styles.introDesc, { color: t.textSecondary }]}>
            Progress through four levels from fundamentals to expert-level knowledge
          </Text>
        </View>

        {/* Premium Banner */}
        {!isPremium && (
          <TouchableOpacity
            style={[styles.premiumBanner, { backgroundColor: t.accent + '15', borderColor: t.accent }]}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.85}
          >
            <Ionicons name="rocket" size={24} color={t.accent} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.premiumBannerTitle, { color: t.text }]}>
                Unlock Premium Content
              </Text>
              <Text style={[styles.premiumBannerDesc, { color: t.textSecondary }]}>
                Get access to advanced & expert topics
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={t.accent} />
          </TouchableOpacity>
        )}

        {learningPath.map((level, levelIdx) => {
          const color = getLevelColor(level.level);
          const completedInLevel = level.topics.filter(t => progress.completedTopics.includes(t.id)).length;
          const progressPct = level.topics.length > 0 ? (completedInLevel / level.topics.length) * 100 : 0;
          const levelRequiresPremium = level.level === 'advanced' || level.level === 'expert';
          const userHasLevelAccess = hasAccess(level.level);

          return (
            <View key={level.level} style={styles.levelSection}>
              <View style={[styles.levelHeader, { borderColor: t.border }]}>
                <View style={[styles.levelIcon, { backgroundColor: color + '20' }]}>
                  <Ionicons name={getLevelIcon(level.level) as any} size={24} color={color} />
                </View>
                <View style={styles.levelInfo}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={[styles.levelTitle, { color: t.text }]}>{level.title}</Text>
                    {levelRequiresPremium && !userHasLevelAccess && (
                      <View style={styles.premiumBadge}>
                        <Ionicons name="lock-closed" size={10} color={t.accent} />
                        <Text style={[styles.premiumBadgeText, { color: t.accent }]}>PREMIUM</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.levelDesc, { color: t.textSecondary }]}>{level.description}</Text>
                  <View style={styles.levelProgress}>
                    <View style={[styles.levelProgressBar, { backgroundColor: t.border }]}>
                      <View style={[styles.levelProgressFill, { width: `${progressPct}%`, backgroundColor: color }]} />
                    </View>
                    <Text style={[styles.levelProgressText, { color: t.textTertiary }]}>
                      {completedInLevel}/{level.topics.length}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.topicsList}>
                {level.topics.map((topic, idx) => {
                  const isCompleted = progress.completedTopics.includes(topic.id);
                  const topicHasAccess = hasAccess(topic.level);
                  
                  return (
                    <TouchableOpacity
                      key={topic.id}
                      style={[
                        styles.topicRow,
                        { backgroundColor: t.surface, borderColor: t.border },
                        !topicHasAccess && styles.topicRowLocked,
                      ]}
                      onPress={() => navigation.navigate('TopicDetail', { topicId: topic.id })}
                      activeOpacity={0.85}
                    >
                      <View style={[styles.topicCheck, { backgroundColor: isCompleted ? t.success : t.surfaceElevated, borderColor: isCompleted ? t.success : t.border }]}>
                        {isCompleted && <Ionicons name="checkmark" size={16} color="#fff" />}
                        {!isCompleted && !topicHasAccess && <Ionicons name="lock-closed" size={14} color={t.accent} />}
                      </View>
                      <View style={styles.topicContent}>
                        <Text style={[styles.topicTitle, { color: t.text }, !topicHasAccess && styles.topicTitleLocked]} numberOfLines={1}>
                          {topic.title}
                        </Text>
                        <Text style={[styles.topicCat, { color: t.textTertiary }]}>{topic.category}</Text>
                      </View>
                      <Text style={styles.topicEmoji}>{topic.emoji}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  intro: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  introTitle: { fontSize: FontSizes.xl, fontWeight: '800', marginBottom: 8 },
  introDesc: { fontSize: FontSizes.sm, lineHeight: 20 },
  premiumBanner: { marginHorizontal: 20, marginBottom: 20, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1 },
  premiumBannerTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 2 },
  premiumBannerDesc: { fontSize: FontSizes.xs },
  levelSection: { marginBottom: 24 },
  levelHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 14, paddingBottom: 14, borderBottomWidth: 1 },
  levelIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  levelInfo: { flex: 1 },
  levelTitle: { fontSize: FontSizes.lg, fontWeight: '700', marginBottom: 2 },
  levelDesc: { fontSize: FontSizes.xs, marginBottom: 8 },
  levelProgress: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  levelProgressBar: { flex: 1, height: 4, borderRadius: 2 },
  levelProgressFill: { height: 4, borderRadius: 2 },
  levelProgressText: { fontSize: FontSizes.xs, fontWeight: '600' },
  premiumBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#D4AF37' + '20', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  premiumBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  topicsList: { paddingHorizontal: 20, paddingTop: 10, gap: 8 },
  topicRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 14, borderWidth: 1, gap: 12 },
  topicRowLocked: { opacity: 0.7 },
  topicCheck: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  topicContent: { flex: 1 },
  topicTitle: { fontSize: FontSizes.md, fontWeight: '600', marginBottom: 2 },
  topicTitleLocked: { opacity: 0.8 },
  topicCat: { fontSize: FontSizes.xs },
  topicEmoji: { fontSize: 20 },
});
