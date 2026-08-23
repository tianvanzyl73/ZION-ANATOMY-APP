import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { Card, Chip, EmptyState, SectionTitle } from '../components/ui';
import { SYSTEMS } from '../lib/data/systems';
import { Topic } from '../lib/types';
import { TOPIC_MAP, isMuscle } from '../lib/data/index';

export default function SystemScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const systemId = route?.params?.systemId as string;
  const system = SYSTEMS.find((s) => s.id === systemId);
  const [query, setQuery] = useState('');

  const topics = useMemo<Topic[]>(() => {
    if (!system) return [];
    return system.structures.map((slug) => `${system.id}-${slug}`).filter((id) => TOPIC_MAP[id]).map((id) => TOPIC_MAP[id]);
  }, [system]);

  if (!system) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <EmptyState icon="alert-circle-outline" title="System not found" body="Return to the explorer and choose a system." actionLabel="Back" onAction={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const filtered = query.trim()
    ? topics.filter((t) => (t.title + t.summary + t.tags.join(' ')).toLowerCase().includes(query.toLowerCase()))
    : topics;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>{system.name}</Text>
          <Text style={{ color: theme.accent, fontSize: 11.5, fontStyle: 'italic' }}>{system.tagline}</Text>
        </View>
        <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name={system.icon as any} size={19} color={theme.accent} />
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(t) => t.id}
        contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }}
        ListHeaderComponent={
          <View>
            <Card style={{ marginBottom: 14 }}>
              <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>{system.overview}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
                {system.stats.map((st) => (
                  <View key={st.label} style={{ marginRight: 18, marginTop: 6 }}>
                    <Text style={{ color: theme.accent, fontSize: 14, fontWeight: '900' }}>{st.value}</Text>
                    <Text style={{ color: theme.textFaint, fontSize: 9.5, letterSpacing: 0.6 }}>{st.label.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
            </Card>
            <View style={[styles.searchRow, { backgroundColor: theme.bgCard, borderColor: theme.border }]}>
              <Ionicons name="search-outline" size={15} color={theme.textFaint} style={{ marginRight: 8 }} />
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder={`Search ${filtered.length} structures…`}
                placeholderTextColor={theme.textFaint}
                style={{ color: theme.text, flex: 1, fontSize: 13.5, paddingVertical: 8 }}
                returnKeyType="search"
              />
            </View>
            <SectionTitle title={`Structures & Topics (${filtered.length})`} icon="list-outline" />
          </View>
        }
        ListEmptyComponent={<EmptyState icon="search-outline" title="No matches" body="Try another term — every structure in this system is listed." />}
        renderItem={({ item }) => {
          const muscle = isMuscle(item) ? item : null;
          return (
            <Card style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Topic', { topicId: item.id })}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: system.color, marginRight: 8 }} />
                  <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 0.5 }}>{item.level.toUpperCase()}</Text>
                </View>
                {item.evidence ? <Chip label={item.evidence} color={theme.accent} /> : null}
              </View>
              <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>{item.title}</Text>
              {item.subtitle ? <Text style={{ color: theme.accent, fontSize: 11.5, fontStyle: 'italic', marginTop: 1 }}>{item.subtitle}</Text> : null}
              <Text numberOfLines={2} style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18, marginTop: 5 }}>{item.summary}</Text>
              {muscle && muscle.exercises ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Ionicons name="barbell-outline" size={12} color={theme.textFaint} />
                  <Text style={{ color: theme.textFaint, fontSize: 11, marginLeft: 4 }}>{muscle.exercises.length} training exercises</Text>
                </View>
              ) : null}
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 12 },
  back: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  searchRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, borderWidth: 1, paddingHorizontal: 12, marginBottom: 14 },
});