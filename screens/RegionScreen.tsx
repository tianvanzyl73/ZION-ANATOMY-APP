import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { Card, Chip, SectionTitle } from '../components/ui';
import { REGIONS } from '../lib/data/systems';
import { TOPIC_MAP, DOMAIN_LABELS } from '../lib/data/index';

export default function RegionScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const regionId = route?.params?.regionId as string;
  const region = REGIONS.find((r) => r.id === regionId);

  if (!region) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: theme.textDim }}>Region not found.</Text>
      </SafeAreaView>
    );
  }

  const topics = region.topics.map((id) => TOPIC_MAP[id]).filter(Boolean);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 10 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>BODY REGION</Text>
          <Text style={{ color: theme.text, fontSize: 19, fontWeight: '900' }}>{region.name}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <Card style={{ marginBottom: 14 }}>
          <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>{region.blurb}</Text>
        </Card>
        <SectionTitle title={`Structures here (${topics.length})`} icon="locate-outline" />
        {topics.map((t) => (
          <Card key={t.id} style={{ marginBottom: 10 }} onPress={() => navigation.navigate('Topic', { topicId: t.id })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <Chip label={DOMAIN_LABELS[t.domain] ?? t.domain} color={theme.accent} />
              <Text style={{ color: theme.textFaint, fontSize: 10.5 }}>{t.level}</Text>
            </View>
            <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800' }}>{t.title}</Text>
            {t.subtitle ? <Text style={{ color: theme.accent, fontSize: 11.5, fontStyle: 'italic', marginTop: 1 }}>{t.subtitle}</Text> : null}
            <Text numberOfLines={3} style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 18, marginTop: 5 }}>{t.summary}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
