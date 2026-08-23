import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { BrandHeader, Card, Chip, EmptyState, SectionTitle } from '../components/ui';
import { searchTopics, DOMAIN_LABELS } from '../lib/data/index';

export default function SearchScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [q, setQ] = useState('');

  const results = useMemo(() => (q.trim() ? searchTopics(q, 30) : []), [q]);
  const popular = ['Hamstring', 'Creatine', 'VO₂max', 'Mitochondria', 'Cortisol', 'Shoulder', 'Spine', 'Glute max', 'Diaphragm'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <BrandHeader subtitle="Search every topic" />
      <View style={{ paddingHorizontal: 18, marginTop: 6 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.bgCard, borderRadius: 16, borderWidth: 1, borderColor: theme.border, paddingHorizontal: 12 }}>
          <Ionicons name="search-outline" size={17} color={theme.textFaint} style={{ marginRight: 8 }} />
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Muscles, bones, hormones, nutrients…"
            placeholderTextColor={theme.textFaint}
            style={{ color: theme.text, flex: 1, fontSize: 14.5, paddingVertical: 12 }}
            returnKeyType="search"
            autoCorrect={false}
          />
          {q.length > 0 ? (
            <TouchableOpacity onPress={() => setQ('')}>
              <Ionicons name="close-circle" size={17} color={theme.textFaint} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 60 }}>
        {q.trim().length === 0 ? (
          <View style={{ marginTop: 14 }}>
            <SectionTitle title="Try a popular query" icon="flash-outline" />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {popular.map((p) => (
                <Chip key={p} label={p} onPress={() => setQ(p)} />
              ))}
            </View>
            <Card style={{ marginTop: 16 }}>
              <SectionTitle title="Quick links" icon="bookmark-outline" />
              <TouchableOpacity onPress={() => navigation.navigate('BodyTab')} style={styles.quickRow}>
                <Ionicons name="body-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.text, fontSize: 14, flex: 1, marginLeft: 10 }}>Open the Anatomy Explorer</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('LearnTab')} style={styles.quickRow}>
                <Ionicons name="book-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.text, fontSize: 14, flex: 1, marginLeft: 10 }}>Continue a course or take a quiz</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('TutorTab')} style={styles.quickRow}>
                <Ionicons name="chatbubbles-outline" size={18} color={theme.accent} />
                <Text style={{ color: theme.text, fontSize: 14, flex: 1, marginLeft: 10 }}>Ask the ZION AI Tutor</Text>
                <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
              </TouchableOpacity>
            </Card>
          </View>
        ) : results.length === 0 ? (
          <EmptyState icon="search-outline" title="No matches" body="Try a different term — every structure, hormone, nutrient and supplement is searchable." />
        ) : (
          <View style={{ marginTop: 14 }}>
            <SectionTitle title={`${results.length} result${results.length === 1 ? '' : 's'}`} icon="search-outline" />
            {results.map((t) => (
              <Card key={t.id} style={{ marginBottom: 9 }} onPress={() => navigation.navigate('Topic', { topicId: t.id })}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <Chip label={DOMAIN_LABELS[t.domain] ?? t.domain} color={theme.accent} />
                  <Text style={{ color: theme.textFaint, fontSize: 10.5 }}>{t.level}</Text>
                </View>
                <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800' }}>{t.title}</Text>
                {t.subtitle ? <Text style={{ color: theme.accent, fontSize: 11.5, fontStyle: 'italic', marginTop: 1 }}>{t.subtitle}</Text> : null}
                <Text numberOfLines={2} style={{ color: theme.textDim, fontSize: 12, lineHeight: 18, marginTop: 5 }}>{t.summary}</Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles: any = { quickRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 } };