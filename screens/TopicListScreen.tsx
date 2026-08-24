import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getTopicsByCategory, AnatomyTopic } from '../lib/data';

export default function TopicListScreen({ navigation, route }: any) {
  const { category, name } = route.params;
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const topics = getTopicsByCategory(category);

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
        <Text style={[styles.topicSummary, { color: t.textSecondary }]} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.topicMeta}>
          <View style={[styles.levelBadge, { backgroundColor: item.color + '20' }]}>
            <Text style={[styles.levelBadgeText, { color: item.color }]}>{item.level}</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={t.textTertiary} />
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
        <Text style={[styles.headerTitle, { color: t.text }]}>{name}</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={topics}
        renderItem={renderTopic}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyText, { color: t.textSecondary }]}>No topics in this category yet</Text>
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
  topicTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 3 },
  topicSummary: { fontSize: FontSizes.xs, lineHeight: 17, marginBottom: 6 },
  topicMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  levelBadgeText: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase' },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { fontSize: FontSizes.md },
});
