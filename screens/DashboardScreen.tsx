import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, useColorScheme, RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, BorderRadius, FontSizes } from '../lib/theme';
import { getProgress, UserProgress, getLevelTitle, getLevelProgress, getXPForNextLevel } from '../lib/store';
import { topics, categories } from '../lib/data';
import { useSubscription } from '../contexts/SubscriptionContext';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { isPremium, subscription } = useSubscription();

  const loadProgress = async () => {
    const p = await getProgress();
    setProgress(p);
  };

  useEffect(() => { loadProgress(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProgress();
    setRefreshing(false);
  };

  if (!progress) return null;

  const levelTitle = getLevelTitle(progress.level);
  const levelProg = getLevelProgress(progress.xp);
  const xpToNext = getXPForNextLevel(progress.xp);
  const accuracy = progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;
  const completedCount = progress.completedTopics.length;
  const totalCount = topics.length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: t.textSecondary }]}>Welcome back</Text>
            <Text style={[styles.title, { color: t.text }]}>ZION ANATOMY</Text>
          </View>
          <TouchableOpacity
            style={[styles.profileBtn, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person" size={22} color={t.accent} />
          </TouchableOpacity>
        </View>

        {/* Premium Subscription Banner */}
        {!isPremium ? (
          <TouchableOpacity
            style={[styles.premiumBanner, { backgroundColor: t.accent + '15', borderColor: t.accent }]}
            onPress={() => navigation.navigate('Subscription')}
            activeOpacity={0.85}
          >
            <View style={styles.premiumBannerIcon}>
              <Ionicons name="rocket" size={28} color={t.accent} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.premiumBannerTitle, { color: t.text }]}>
                Unlock Premium Content
              </Text>
              <Text style={[styles.premiumBannerDesc, { color: t.textSecondary }]}>
                Access expert courses from R80/month
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={t.accent} />
          </TouchableOpacity>
        ) : (
          <View style={[styles.subscriptionStatus, { backgroundColor: t.surface, borderColor: subscription.tier === 'expert' ? '#FFD700' : t.accent }]}>
            <View style={[styles.subscriptionIcon, { backgroundColor: (subscription.tier === 'expert' ? '#FFD700' : t.accent) + '20' }]}>
              <Ionicons
                name={subscription.tier === 'expert' ? 'trophy' : 'rocket'}
                size={24}
                color={subscription.tier === 'expert' ? '#FFD700' : t.accent}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.subscriptionTier, { color: t.text }]}>
                {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Member
              </Text>
              <Text style={[styles.subscriptionStatusText, { color: '#4CAF50' }]}>
                Full Access Active
              </Text>
            </View>
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          </View>
        )}

        {/* Level Card */}
        <View style={[styles.levelCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.levelTop}>
            <View>
              <Text style={[styles.levelLabel, { color: t.textSecondary }]}>Level {progress.level}</Text>
              <Text style={[styles.levelTitle, { color: t.accent }]}>{levelTitle}</Text>
            </View>
            <View style={[styles.xpBadge, { backgroundColor: t.accent + '20' }]}>
              <Ionicons name="star" size={16} color={t.accent} />
              <Text style={[styles.xpText, { color: t.accent }]}>{progress.xp} XP</Text>
            </View>
          </View>
          <View style={[styles.progressTrack, { backgroundColor: t.border }]}>
            <View style={[styles.progressFill, { width: `${levelProg * 100}%` }]} />
          </View>
          <Text style={[styles.xpToNext, { color: t.textTertiary }]}>{xpToNext} XP to next level</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="flame" size={24} color="#FF6B6B" />
            <Text style={[styles.statValue, { color: t.text }]}>{progress.streak}</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Day Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="checkmark-circle" size={24} color="#00C853" />
            <Text style={[styles.statValue, { color: t.text }]}>{accuracy}%</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Accuracy</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="book" size={24} color="#448AFF" />
            <Text style={[styles.statValue, { color: t.text }]}>{completedCount}/{totalCount}</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Topics</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Quick Access</Text>
        <View style={styles.quickGrid}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: '#1a1a2e', borderColor: t.accent + '40' }]}
            onPress={() => navigation.navigate('Explorer')}
            activeOpacity={0.85}
          >
            <Ionicons name="body" size={32} color={t.accent} />
            <Text style={[styles.quickTitle, { color: '#fff' }]}>3D Explorer</Text>
            <Text style={[styles.quickSub, { color: '#aaa' }]}>Interactive Body</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.navigate('AITutor')}
            activeOpacity={0.85}
          >
            <Ionicons name="sparkles" size={32} color={t.accent} />
            <Text style={[styles.quickTitle, { color: t.text }]}>AI Tutor</Text>
            <Text style={[styles.quickSub, { color: t.textTertiary }]}>Ask anything</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.navigate('Quiz')}
            activeOpacity={0.85}
          >
            <Ionicons name="help-circle" size={32} color="#448AFF" />
            <Text style={[styles.quickTitle, { color: t.text }]}>Quiz</Text>
            <Text style={[styles.quickSub, { color: t.textTertiary }]}>Test knowledge</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.navigate('Learn')}
            activeOpacity={0.85}
          >
            <Ionicons name="school" size={32} color="#00C853" />
            <Text style={[styles.quickTitle, { color: t.text }]}>Learn</Text>
            <Text style={[styles.quickSub, { color: t.textTertiary }]}>Learning paths</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Explore Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
          {categories.slice(1).map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, { backgroundColor: t.surface, borderColor: t.border }]}
              onPress={() => navigation.navigate('TopicList', { category: cat.id, name: cat.name })}
              activeOpacity={0.8}
            >
              <Ionicons name={cat.icon as any} size={16} color={cat.color} />
              <Text style={[styles.catChipText, { color: t.text }]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Premium Courses Section */}
        <View style={{ marginTop: 24 }}>
          <View style={styles.premiumSectionHeader}>
            <Text style={[styles.sectionTitle, { color: t.text, marginBottom: 0 }]}>Premium Courses</Text>
            {!isPremium && (
              <TouchableOpacity
                style={[styles.viewAllBtn, { backgroundColor: t.accent + '20' }]}
                onPress={() => navigation.navigate('Subscription')}
              >
                <Text style={[styles.viewAllText, { color: t.accent }]}>Upgrade</Text>
                <Ionicons name="arrow-forward" size={14} color={t.accent} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12, paddingTop: 14 }}>
            {topics.filter(t => t.level === 'advanced' || t.level === 'expert').slice(0, 6).map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={[styles.premiumCourseCard, { backgroundColor: t.surface, borderColor: t.border }]}
                onPress={() => navigation.navigate('TopicDetail', { topicId: topic.id })}
                activeOpacity={0.85}
              >
                <View style={[styles.premiumCourseIcon, { backgroundColor: topic.color + '20' }]}>
                  <Text style={styles.premiumCourseEmoji}>{topic.emoji}</Text>
                </View>
                <View style={styles.premiumCourseContent}>
                  <Text style={[styles.premiumCourseTitle, { color: t.text }]} numberOfLines={2}>
                    {topic.title}
                  </Text>
                  <View style={styles.premiumCourseMeta}>
                    <View style={[styles.premiumBadge, { backgroundColor: topic.level === 'expert' ? '#FFD700' + '20' : '#D4AF37' + '20' }]}>
                      <Ionicons name={topic.level === 'expert' ? 'trophy' : 'rocket'} size={10} color={topic.level === 'expert' ? '#FFD700' : '#D4AF37'} />
                      <Text style={[styles.premiumBadgeText, { color: topic.level === 'expert' ? '#FFD700' : '#D4AF37' }]}>
                        {topic.level.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Topics */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Featured Topics</Text>
        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {topics.slice(0, 4).map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { backgroundColor: t.surface, borderColor: t.border }]}
              onPress={() => navigation.navigate('TopicDetail', { topicId: topic.id })}
              activeOpacity={0.85}
            >
              <View style={[styles.topicEmojiWrap, { backgroundColor: topic.color + '20' }]}>
                <Text style={styles.topicEmoji}>{topic.emoji}</Text>
              </View>
              <View style={styles.topicInfo}>
                <Text style={[styles.topicTitle, { color: t.text }]} numberOfLines={1}>{topic.title}</Text>
                <Text style={[styles.topicSummary, { color: t.textSecondary }]} numberOfLines={2}>{topic.summary}</Text>
                <View style={styles.topicMeta}>
                  <View style={[styles.levelBadge, { backgroundColor: topic.color + '20' }]}>
                    <Text style={[styles.levelBadgeText, { color: topic.color }]}>{topic.level}</Text>
                  </View>
                  <Text style={[styles.topicCat, { color: t.textTertiary }]}>{topic.category}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={18} color={t.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
  greeting: { fontSize: FontSizes.sm, fontWeight: '500' },
  title: { fontSize: FontSizes.xxl, fontWeight: '800', letterSpacing: 1.5 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  levelCard: { marginHorizontal: 20, borderRadius: BorderRadius.lg, padding: 20, borderWidth: 1, marginBottom: 20 },
  levelTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  levelLabel: { fontSize: FontSizes.sm, fontWeight: '600' },
  levelTitle: { fontSize: FontSizes.xl, fontWeight: '800' },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.full },
  xpText: { fontSize: FontSizes.md, fontWeight: '700' },
  progressTrack: { height: 6, borderRadius: 3, marginBottom: 8 },
  progressFill: { height: 6, borderRadius: 3, backgroundColor: '#D4AF37' },
  xpToNext: { fontSize: FontSizes.xs, fontWeight: '500' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: BorderRadius.md, padding: 14, alignItems: 'center', borderWidth: 1, gap: 4 },
  statValue: { fontSize: FontSizes.lg, fontWeight: '800' },
  statLabel: { fontSize: FontSizes.xs, fontWeight: '500' },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', paddingHorizontal: 20, marginBottom: 14 },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  quickCard: { width: (width - 50) / 2, borderRadius: BorderRadius.lg, padding: 18, borderWidth: 1, gap: 6 },
  quickTitle: { fontSize: FontSizes.md, fontWeight: '700' },
  quickSub: { fontSize: FontSizes.xs, fontWeight: '500' },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: BorderRadius.full, borderWidth: 1 },
  catChipText: { fontSize: FontSizes.sm, fontWeight: '600' },
  topicCard: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.md, padding: 14, borderWidth: 1, gap: 12 },
  topicEmojiWrap: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  topicEmoji: { fontSize: 24 },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 3 },
  topicSummary: { fontSize: FontSizes.xs, lineHeight: 17, marginBottom: 6 },
  topicMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  levelBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  topicCat: { fontSize: FontSizes.xs },
  premiumBanner: { marginHorizontal: 20, marginBottom: 16, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 2 },
  premiumBannerIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#D4AF37' + '20', justifyContent: 'center', alignItems: 'center' },
  premiumBannerTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 2 },
  premiumBannerDesc: { fontSize: FontSizes.xs },
  subscriptionStatus: { marginHorizontal: 20, marginBottom: 16, borderRadius: BorderRadius.lg, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 2 },
  subscriptionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  subscriptionTier: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 2 },
  subscriptionStatusText: { fontSize: FontSizes.xs, fontWeight: '600' },
  premiumSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.full },
  viewAllText: { fontSize: FontSizes.sm, fontWeight: '600' },
  premiumCourseCard: { width: 200, borderRadius: BorderRadius.lg, padding: 16, borderWidth: 1 },
  premiumCourseIcon: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  premiumCourseEmoji: { fontSize: 28 },
  premiumCourseContent: { flex: 1 },
  premiumCourseTitle: { fontSize: FontSizes.sm, fontWeight: '700', marginBottom: 8, lineHeight: 18 },
  premiumCourseMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  premiumBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  premiumBadgeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
});
