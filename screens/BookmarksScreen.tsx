import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getProgress, UserProgress, toggleBookmark } from '../lib/store';
import { getTopicById, AnatomyTopic } from '../lib/data';

export default function BookmarksScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [bookmarkedTopics, setBookmarkedTopics] = useState<AnatomyTopic[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const p = await getProgress();
    setProgress(p);
    const topics = p.bookmarkedTopics
      .map(id => getTopicById(id))
      .filter((t): t is AnatomyTopic => t !== undefined);
    setBookmarkedTopics(topics);
  };

  const handleRemove = async (topicId: string) => {
    await toggleBookmark(topicId);
    setBookmarkedTopics(prev => prev.filter(t => t.id !== topicId));
  };

  const renderTopic = ({ item }: { item: AnatomyTopic }) => (
    <TouchableOpacity
      style={[styles.topicCard, { backgroundColor: t.surface, borderColor: t.border }]}
      onPress={() => navigation.navigate('TopicDetail', { topicId: item.id })}
      activeOpacity={0.85}
    >
      <View style={[styles.topicEmojiWrap, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.topicEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.topicInfo}>
        <Text style={[styles.topicTitle, { color: t.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.topicCat, { color: t.textTertiary }]}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => handleRemove(item.id)}
      >
        <Ionicons name="trash-outline" size={18} color={t.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Bookmarks</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={bookmarkedTopics}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
        contentContainerStyle={bookmarkedTopics.length === 0 ? styles.emptyContent : { padding: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="bookmark-outline" size={64} color={t.textTertiary} />
            <Text style={[styles.emptyTitle, { color: t.text }]}>No Bookmarks Yet</Text>
            <Text style={[styles.emptyText, { color: t.textSecondary }]}>
              Save your favorite topics to review them later
            </Text>
            <TouchableOpacity
              style={[styles.exploreBtn, { backgroundColor: t.accent }]}
              onPress={() => navigation.goBack()}
              activeOpacity={0.85}
            >
              <Text style={styles.exploreBtnText}>Explore Topics</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  topicCard: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.md, padding: 14, borderWidth: 1, gap: 12 },
  topicEmojiWrap: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  topicEmoji: { fontSize: 24 },
  topicInfo: { flex: 1 },
  topicTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 2 },
  topicCat: { fontSize: FontSizes.xs },
  removeBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(255,82,82,0.1)', justifyContent: 'center', alignItems: 'center' },
  emptyContent: { flex: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  emptyTitle: { fontSize: FontSizes.xl, fontWeight: '700', marginTop: 16, marginBottom: 8 },
  emptyText: { fontSize: FontSizes.sm, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  exploreBtn: { paddingVertical: 14, paddingHorizontal: 30, borderRadius: 12 },
  exploreBtnText: { fontSize: FontSizes.md, fontWeight: '700', color: '#000' },
});
