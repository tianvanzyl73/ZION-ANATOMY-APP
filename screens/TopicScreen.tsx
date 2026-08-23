import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { useProgress } from '../lib/store';
import { Bullets, Card, Chip, EvidenceBadge, KeyValue, LevelBadge, SectionTitle } from '../components/ui';
import { DOMAIN_LABELS, TOPIC_MAP, isMuscle, isSupplement, relatedTopics } from '../lib/data/index';

export default function TopicScreen({ route, navigation }: any) {
  const { theme } = useTheme();
  const topicId = route?.params?.topicId as string;
  const topic = TOPIC_MAP[topicId];
  const { state, toggleSaved, visitTopic } = useProgress();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (topic) visitTopic(topic.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  const related = useMemo(() => (topic ? relatedTopics(topic) : []), [topic]);
  const muscle = topic && isMuscle(topic) ? topic : null;
  const supplement = topic && isSupplement(topic) ? topic : null;
  const saved = state.savedTopics.includes(topicId);

  if (!topic) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }}>
        <Card style={{ margin: 18 }}>
          <Text style={{ color: theme.text }}>Topic not found.</Text>
        </Card>
      </SafeAreaView>
    );
  }

  const tabs = muscle
    ? ['Overview', 'Detail', 'Exercises']
    : supplement
    ? ['Overview', 'Detail', 'Evidence']
    : ['Overview', 'Detail', 'Facts'];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>{(DOMAIN_LABELS[topic.domain] ?? topic.domain).toUpperCase()} · {topic.system.toUpperCase()}</Text>
          <Text style={{ color: theme.text, fontSize: 17, fontWeight: '900' }}>{topic.title}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleSaved(topic.id)} style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.bgCard, borderWidth: 1, borderColor: saved ? theme.accent : theme.border }}>
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={17} color={saved ? theme.accent : theme.textDim} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 18, paddingBottom: 44 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
          <View style={{ marginRight: 10, marginBottom: 8 }}>
            <LevelBadge level={topic.level} />
          </View>
          {supplement && topic.evidence ? <EvidenceBadge grade={topic.evidence} /> : null}
        </View>

        <Card style={{ marginBottom: 14 }}>
          {topic.subtitle ? <Text style={{ color: theme.accent, fontSize: 12.5, fontStyle: 'italic', marginBottom: 6 }}>{topic.subtitle}</Text> : null}
          <Text style={{ color: theme.text, fontSize: 15, lineHeight: 23, fontWeight: '600' }}>{topic.summary}</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
            {topic.tags.slice(0, 6).map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </View>
        </Card>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', marginBottom: 12 }}>
          {tabs.map((t, i) => (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(i)}
              style={[styles.tab, { backgroundColor: tab === i ? theme.accentBg : 'transparent', borderBottomColor: tab === i ? theme.accent : 'transparent' }]}
            >
              <Text style={{ color: tab === i ? theme.accent : theme.textDim, fontSize: 12.5, fontWeight: '800' }}>{t.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === 0 ? (
          <View>
            {topic.sections.map((s, i) => (
              <Card key={i} style={{ marginBottom: 12 }}>
                <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1, marginBottom: 6 }}>{s.heading.toUpperCase()}</Text>
                <Text style={{ color: theme.text, fontSize: 13.5, lineHeight: 21 }}>{s.body}</Text>
                {s.bullets ? <Bullets items={s.bullets} /> : null}
              </Card>
            ))}
            {muscle ? (
              <Card style={{ marginBottom: 12 }}>
                <SectionTitle title="Attachments & Nerve" icon="git-branch-outline" />
                <KeyValue k="Origin" v={muscle.origin} />
                <KeyValue k="Insertion" v={muscle.insertion} />
                <KeyValue k="Nerve supply" v={muscle.nerve} />
                <KeyValue k="Agonists & synergists" v={muscle['agonist synergists'] ?? '—'} />
              </Card>
            ) : null}
          </View>
        ) : null}

        {tab === 1 ? (
          <View>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Functions & Actions" icon="pulse-outline" />
              {muscle ? (
                <Bullets items={muscle.actions} color={theme.accent} />
              ) : (
                <Bullets items={topic.sections.flatMap((s) => s.bullets ?? []).slice(0, 8)} color={theme.accent} />
              )}
            </Card>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Connections" icon="share-social-outline" />
              <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>
                {topic.domain === 'skeletal'
                  ? 'Bones articulate at joints, are covered by periosteum, and are moved by muscles pulling on tendons. Remodeling responds to loading, hormones and nutrition.'
                  : topic.domain === 'muscular'
                  ? 'Muscles connect to bone via tendons, are activated by motor neurons at the neuromuscular junction, and consume ATP regenerated by the three energy systems.'
                  : topic.domain === 'cardiovascular'
                  ? 'The heart, vessels and blood work with the respiratory system to deliver oxygen and remove carbon dioxide, coordinated by autonomic nerves and hormones.'
                  : topic.domain === 'nervous'
                  ? 'Neurons signal through synapses, coordinate muscles via motor units, and integrate with endocrine signals to regulate the whole body.'
                  : 'Every system interacts with the others through nerves, hormones, blood flow and metabolism — use Related Topics below to follow each connection.'}
              </Text>
            </Card>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Clinical Relevance" icon="medkit-outline" />
              {topic.sections.map((s, i) =>
                /clinical|prevent|manage|practical/i.test(s.heading) ? (
                  <View key={i} style={{ marginBottom: 8 }}>
                    <Text style={{ color: theme.text, fontSize: 13, lineHeight: 20 }}>{s.body}</Text>
                  </View>
                ) : null,
              )}
              <Text style={{ color: theme.textFaint, fontSize: 11, fontStyle: 'italic', marginTop: 6 }}>
                Educational information only — not a substitute for assessment by a qualified healthcare professional.
              </Text>
            </Card>
          </View>
        ) : null}

        {tab === 2 && muscle ? (
          <View>
            {muscle.exercises.map((ex, i) => (
              <Card key={i} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                  <View style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <Ionicons name="barbell-outline" size={15} color={theme.accent} />
                  </View>
                  <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800', flex: 1 }}>{ex.name}</Text>
                </View>
                <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19 }}>Biomechanics: {ex.biomechanics}</Text>
              </Card>
            ))}
          </View>
        ) : null}

        {tab === 2 && supplement ? (
          <View>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Mechanism" icon="flash-outline" />
              <KeyValue k="What it is" v={supplement.whatItIs} />
              <KeyValue k="Physiological mechanism" v={supplement.mechanism} />
            </Card>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Benefits & Research Uses" icon="checkmark-done-outline" />
              <Bullets items={supplement.benefits} color={theme.good} />
              <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginTop: 10, marginBottom: 4 }}>TYPICAL RESEARCH USES</Text>
              <Bullets items={supplement.researchUses} />
            </Card>
            <Card style={{ marginBottom: 12 }}>
              <SectionTitle title="Safety Profile" icon="shield-outline" />
              <KeyValue k="Timing considerations" v={supplement.timing} />
              <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginTop: 6, marginBottom: 4 }}>POTENTIAL SIDE EFFECTS</Text>
              <Bullets items={supplement.sideEffects} color={theme.warn} />
              <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginTop: 10, marginBottom: 4 }}>INTERACTIONS</Text>
              <Bullets items={supplement.interactions} color={theme.bad} />
              <KeyValue k="Who should be cautious" v={supplement.caution} />
            </Card>
            <Card style={{ marginBottom: 12, borderColor: theme.accent }}>
              <SectionTitle title="Marketing vs Science" icon="warning-outline" />
              <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>{supplement.marketingVsScience}</Text>
            </Card>
          </View>
        ) : null}

        {tab === 2 && !muscle && !supplement ? (
          <Card style={{ marginBottom: 12 }}>
            <SectionTitle title="Interesting Facts" icon="sparkles-outline" />
            <Bullets items={topic.facts} color={theme.accent} />
          </Card>
        ) : null}

        {(muscle || supplement) && tab !== 2 ? (
          <Card style={{ marginBottom: 12 }}>
            <SectionTitle title="Interesting Facts" icon="sparkles-outline" />
            <Bullets items={topic.facts} color={theme.accent} />
          </Card>
        ) : null}

        {related.length ? (
          <View>
            <SectionTitle title="Related Topics" icon="git-network-outline" actionLabel="Search all" onAction={() => navigation.navigate('SearchTab')} />
            {related.map((r) => (
              <Card key={r.id} style={{ marginBottom: 8, padding: 13 }} onPress={() => navigation.push('Topic', { topicId: r.id })}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text, fontSize: 13.5, fontWeight: '800' }}>{r.title}</Text>
                    <Text numberOfLines={1} style={{ color: theme.textFaint, fontSize: 11, marginTop: 2 }}>{DOMAIN_LABELS[r.domain]}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color={theme.textFaint} />
                </View>
              </Card>
            ))}
          </View>
        ) : null}

        {topic.refs ? (
          <Card style={{ marginTop: 6 }}>
            <SectionTitle title="References" icon="library-outline" />
            {topic.refs.map((r, i) => (
              <Text key={i} style={{ color: theme.textFaint, fontSize: 11.5, lineHeight: 17, marginBottom: 6 }}>
                {i + 1}. {r}
              </Text>
            ))}
          </Card>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 12 },
  back: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: 2, borderRadius: 4 },
});
