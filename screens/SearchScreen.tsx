import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { searchTopics, AnatomyTopic } from '../lib/data';

export default function SearchScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AnatomyTopic[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.trim().length > 1) {
      const found = searchTopics(text);
      setResults(found);
    } else {
      setResults([]);
    }
  };

  const renderResult = ({ item }: { item: AnatomyTopic }) => (
    <TouchableOpacity
      style={[styles.resultCard, { backgroundColor: t.surface, borderColor: t.border }]}
      onPress={() => navigation.navigate('TopicDetail', { topicId: item.id })}
      activeOpacity={0.85}
    >
      <View style={[styles.resultEmoji, { backgroundColor: item.color + '20' }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.resultInfo}>
        <Text style={[styles.resultTitle, { color: t.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.resultSummary, { color: t.textSecondary }]} numberOfLines={2}>{item.summary}</Text>
        <View style={styles.resultMeta}>
          <Text style={[styles.resultCat, { color: t.textTertiary }]}>{item.category}</Text>
          <Text style={[styles.resultLevel, { color: item.color }]}>{item.level}</Text>
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
        <View style={[styles.searchBox, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Ionicons name="search" size={20} color={t.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: t.text }]}
            placeholder="Search anatomy, muscles, systems..."
            placeholderTextColor={t.textTertiary}
            value={query}
            onChangeText={handleSearch}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={t.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={results}
        renderItem={renderResult}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          query.length > 1 ? (
            <View style={styles.empty}>
              <Ionicons name="search" size={48} color={t.textTertiary} />
              <Text style={[styles.emptyTitle, { color: t.text }]}>No results found</Text>
              <Text style={[styles.emptyText, { color: t.textSecondary }]}>
                Try different keywords like "muscle", "heart", "protein", or "energy"
              </Text>
            </View>
          ) : (
            <View style={styles.empty}>
              <Ionicons name="search" size={48} color={t.textTertiary} />
              <Text style={[styles.emptyTitle, { color: t.text }]}>Search Topics</Text>
              <Text style={[styles.emptyText, { color: t.textSecondary }]}>
                Find information about muscles, bones, systems, nutrition, and more
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  searchBox: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1 },
  searchInput: { flex: 1, fontSize: FontSizes.md, fontWeight: '500' },
  resultCard: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.md, padding: 14, borderWidth: 1, gap: 12 },
  resultEmoji: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 24 },
  resultInfo: { flex: 1 },
  resultTitle: { fontSize: FontSizes.md, fontWeight: '700', marginBottom: 3 },
  resultSummary: { fontSize: FontSizes.xs, lineHeight: 17, marginBottom: 6 },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  resultCat: { fontSize: FontSizes.xs, fontWeight: '500' },
  resultLevel: { fontSize: FontSizes.xs, fontWeight: '700', textTransform: 'uppercase' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  emptyText: { fontSize: FontSizes.sm, textAlign: 'center', lineHeight: 20 },
});
