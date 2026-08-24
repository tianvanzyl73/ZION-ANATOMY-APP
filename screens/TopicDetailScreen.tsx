import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getTopicById, AnatomyTopic } from '../lib/data';
import { getProgress, toggleBookmark, completeTopic } from '../lib/store';
import { useSubscription } from '../contexts/SubscriptionContext';

export default function TopicDetailScreen({ navigation, route }: any) {
  const { topicId } = route.params;
  const topic = getTopicById(topicId);
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { hasAccess, subscription } = useSubscription();

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const progress = await getProgress();
    setIsBookmarked(progress.bookmarkedTopics.includes(topicId));
    setIsCompleted(progress.completedTopics.includes(topicId));
  };

  const handleBookmark = async () => {
    await toggleBookmark(topicId);
    setIsBookmarked(!isBookmarked);
  };

  const handleComplete = async () => {
    if (!isCompleted) {
      await completeTopic(topicId);
      setIsCompleted(true);
    }
  };

  if (!topic) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
        <View style={styles.error}>
          <Text style={{ color: t.text }}>Topic not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Check if user has access to this topic
  const userHasAccess = hasAccess(topic.level);

  // Show premium upgrade prompt if no access
  if (!userHasAccess) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.headerBtn, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={t.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: t.text }]} numberOfLines={1}>{topic.category}</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          {/* Hero */}
          <View style={[styles.hero, { backgroundColor: topic.color + '15', borderColor: t.border }]}>
            <Text style={styles.heroEmoji}>{topic.emoji}</Text>
            <Text style={[styles.heroTitle, { color: t.text }]}>{topic.title}</Text>
            <View style={styles.heroMeta}>
              <View style={[styles.levelPill, { backgroundColor: topic.color + '25' }]}>
                <Text style={[styles.levelPillText, { color: topic.color }]}>{topic.level.toUpperCase()}</Text>
              </View>
              <Text style={[styles.heroSystem, { color: t.textSecondary }]}>{topic.system}</Text>
            </View>
          </View>

          {/* Premium Upgrade Card */}
          <View style={[styles.premiumCard, { backgroundColor: t.surface, borderColor: t.accent }]}>
            <View style={styles.premiumIconContainer}>
              <Ionicons name="lock-closed" size={48} color={t.accent} />
            </View>
            <Text style={[styles.premiumTitle, { color: t.text }]}>
              Premium Content
            </Text>
            <Text style={[styles.premiumDescription, { color: t.textSecondary }]}>
              This {topic.level} topic requires a {topic.level === 'expert' ? 'Expert' : 'Advanced'} subscription to access.
            </Text>
            
            <View style={styles.premiumFeatures}>
              <View style={styles.premiumFeatureRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={[styles.premiumFeatureText, { color: t.text }]}>
                  Full access to {topic.level} content
                </Text>
              </View>
              <View style={styles.premiumFeatureRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={[styles.premiumFeatureText, { color: t.text }]}>
                  Expert case studies & clinical scenarios
                </Text>
              </View>
              <View style={styles.premiumFeatureRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={[styles.premiumFeatureText, { color: t.text }]}>
                  Advanced quizzes & assessments
                </Text>
              </View>
              <View style={styles.premiumFeatureRow}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={[styles.premiumFeatureText, { color: t.text }]}>
                  Offline access & progress tracking
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.upgradeButton, { backgroundColor: topic.level === 'expert' ? '#FFD700' : '#D4AF37' }]}
              onPress={() => navigation.navigate('Subscription')}
              activeOpacity={0.85}
            >
              <Ionicons name="rocket" size={20} color="#1a1a2e" />
              <Text style={styles.upgradeButtonText}>
                Upgrade to {topic.level === 'expert' ? 'Expert' : 'Advanced'}
              </Text>
            </TouchableOpacity>

            <Text style={[styles.pricingText, { color: t.textTertiary }]}>
              Starting at {topic.level === 'expert' ? 'R150/month' : 'R80/month'} or {topic.level === 'expert' ? 'R500/year' : 'R300/year'}
            </Text>
          </View>

          {/* Preview Summary */}
          <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="eye" size={20} color={t.accent} />
              <Text style={[styles.cardTitle, { color: t.text }]}>Preview</Text>
            </View>
            <Text style={[styles.summaryText, { color: t.textSecondary }]}>{topic.summary}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]} numberOfLines={1}>{topic.category}</Text>
        <TouchableOpacity
          style={[styles.headerBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={handleBookmark}
        >
          <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={22} color={isBookmarked ? t.accent : t.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: topic.color + '15', borderColor: t.border }]}>
          <Text style={styles.heroEmoji}>{topic.emoji}</Text>
          <Text style={[styles.heroTitle, { color: t.text }]}>{topic.title}</Text>
          <View style={styles.heroMeta}>
            <View style={[styles.levelPill, { backgroundColor: topic.color + '25' }]}>
              <Text style={[styles.levelPillText, { color: topic.color }]}>{topic.level.toUpperCase()}</Text>
            </View>
            <Text style={[styles.heroSystem, { color: t.textSecondary }]}>{topic.system}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="information-circle" size={20} color={t.accent} />
            <Text style={[styles.cardTitle, { color: t.text }]}>Overview</Text>
          </View>
          <Text style={[styles.summaryText, { color: t.textSecondary }]}>{topic.summary}</Text>
        </View>

        {/* Description */}
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.descriptionText, { color: t.textSecondary }]}>{topic.description}</Text>
        </View>

        {/* Sections */}
        {topic.sections.map((section, idx) => (
          <View key={idx} style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.sectionNum, { backgroundColor: topic.color + '25' }]}>
                <Text style={[styles.sectionNumText, { color: topic.color }]}>{idx + 1}</Text>
              </View>
              <Text style={[styles.cardTitle, { color: t.text }]}>{section.title}</Text>
            </View>
            <Text style={[styles.sectionContent, { color: t.textSecondary }]}>{section.content}</Text>
          </View>
        ))}

        {/* Key Facts */}
        <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="star" size={20} color={t.accent} />
            <Text style={[styles.cardTitle, { color: t.text }]}>Key Facts</Text>
          </View>
          {topic.keyFacts.map((fact, idx) => (
            <View key={idx} style={styles.factRow}>
              <View style={[styles.factDot, { backgroundColor: topic.color }]} />
              <Text style={[styles.factText, { color: t.textSecondary }]}>{fact}</Text>
            </View>
          ))}
        </View>

        {/* Fitness Relevance */}
        <View style={[styles.card, { backgroundColor: t.accent + '10', borderColor: t.accent + '30' }]}>
          <View style={styles.cardHeader}>
            <Ionicons name="barbell" size={20} color={t.accent} />
            <Text style={[styles.cardTitle, { color: t.accent }]}>Fitness Application</Text>
          </View>
          <Text style={[styles.fitnessText, { color: t.text }]}>{topic.fitnessRelevance}</Text>
        </View>

        {/* Related Topics */}
        {topic.relatedTopics.length > 0 && (
          <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.border }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="link" size={20} color={t.accent} />
              <Text style={[styles.cardTitle, { color: t.text }]}>Related Topics</Text>
            </View>
            <View style={styles.relatedGrid}>
              {topic.relatedTopics.map((related, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.relatedChip, { backgroundColor: t.surfaceElevated, borderColor: t.border }]}
                  onPress={() => navigation.push('TopicDetail', { topicId: related.id })}
                  activeOpacity={0.8}
                >
                  <Ionicons name="arrow-forward" size={14} color={t.accent} />
                  <Text style={[styles.relatedChipText, { color: t.text }]} numberOfLines={1}>{related.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Mark Complete */}
        {!isCompleted && (
          <TouchableOpacity
            style={[styles.completeBtn, { backgroundColor: t.accent }]}
            onPress={handleComplete}
            activeOpacity={0.85}
          >
            <Ionicons name="checkmark-circle" size={20} color="#000" />
            <Text style={styles.completeBtnText}>Mark as Completed (+50 XP)</Text>
          </TouchableOpacity>
        )}
        {isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: t.success + '15', borderColor: t.success + '40' }]}>
            <Ionicons name="checkmark-circle" size={20} color={t.success} />
            <Text style={[styles.completedText, { color: t.success }]}>Topic Completed ✓</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  headerBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { flex: 1, fontSize: FontSizes.md, fontWeight: '700', textAlign: 'center' },
  hero: { margin: 20, borderRadius: BorderRadius.xl, padding: 28, alignItems: 'center', borderWidth: 1 },
  heroEmoji: { fontSize: 56, marginBottom: 12 },
  heroTitle: { fontSize: FontSizes.xl, fontWeight: '800', textAlign: 'center', marginBottom: 10 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  levelPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  levelPillText: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heroSystem: { fontSize: FontSizes.sm, fontWeight: '500' },
  card: { marginHorizontal: 20, marginBottom: 14, borderRadius: BorderRadius.lg, padding: 18, borderWidth: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  cardTitle: { fontSize: FontSizes.md, fontWeight: '700', flex: 1 },
  summaryText: { fontSize: FontSizes.md, lineHeight: 24, fontWeight: '500' },
  descriptionText: { fontSize: FontSizes.md, lineHeight: 24 },
  sectionNum: { width: 28, height: 28, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  sectionNumText: { fontSize: 13, fontWeight: '800' },
  sectionContent: { fontSize: FontSizes.md, lineHeight: 24 },
  factRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 10 },
  factDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7 },
  factText: { flex: 1, fontSize: FontSizes.sm, lineHeight: 20 },
  fitnessText: { fontSize: FontSizes.md, lineHeight: 24, fontWeight: '500' },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  relatedChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1, maxWidth: '48%' },
  relatedChipText: { fontSize: FontSizes.xs, fontWeight: '600', flex: 1 },
  completeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 10, paddingVertical: 16, borderRadius: 14 },
  completeBtnText: { fontSize: FontSizes.md, fontWeight: '700', color: '#000' },
  completedBadge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 10, paddingVertical: 14, borderRadius: 14, borderWidth: 1 },
  completedText: { fontSize: FontSizes.md, fontWeight: '700' },
  premiumCard: { marginHorizontal: 20, marginBottom: 14, borderRadius: BorderRadius.lg, padding: 24, borderWidth: 2, alignItems: 'center' },
  premiumIconContainer: { marginBottom: 16 },
  premiumTitle: { fontSize: FontSizes.xl, fontWeight: '800', marginBottom: 8, textAlign: 'center' },
  premiumDescription: { fontSize: FontSizes.md, lineHeight: 22, textAlign: 'center', marginBottom: 20 },
  premiumFeatures: { width: '100%', marginBottom: 20 },
  premiumFeatureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  premiumFeatureText: { fontSize: FontSizes.sm, fontWeight: '500', flex: 1 },
  upgradeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12, width: '100%', marginBottom: 12 },
  upgradeButtonText: { fontSize: FontSizes.md, fontWeight: '700', color: '#1a1a2e' },
  pricingText: { fontSize: FontSizes.xs, textAlign: 'center' },
});
