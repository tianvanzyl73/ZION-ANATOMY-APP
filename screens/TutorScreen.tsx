import React, { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { BrandHeader, Card } from '../components/ui';
import { askTutor, TUTOR_SUGGESTIONS, TutorAnswer } from '../lib/tutor';
import { TOPIC_MAP, DOMAIN_LABELS } from '../lib/data/index';

interface Msg {
  id: string;
  role: 'user' | 'tutor';
  text?: string;
  answer?: TutorAnswer;
}

export default function TutorScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: 'welcome',
      role: 'tutor',
      answer: {
        question: 'Welcome to ZION EDUCATOR',
        simple: 'I am the ZION ANATOMY tutor. Ask anything about the human body — muscles, bones, organs, energy, hormones, nutrition or recovery.',
        detailed: 'Every answer is layered: simple for an instant grasp, detailed for the full picture, and scientific for the precise mechanism. I link related anatomy, suggest visual learning and give you a self-check question.',
        scientific: 'The tutor searches a curated knowledge base — anatomy, physiology, endocrinology, exercise physiology, nutrition, supplements and injury science — and ranks entries by semantic overlap with your question.',
        anatomy: ['cell-overview', 'muscular-sarcomere', 'cardio-heart', 'energy-atp'],
        relatedTopics: ['nutrition-protein', 'exercise-strength', 'nervous-motor-units'],
        visual: ['Open the Anatomy Explorer for a guided tour', 'Try a Daily Lesson on the Dashboard'],
        quiz: { prompt: 'What are the three depths of every answer?', options: ['Simple, detailed, scientific', 'Slow, medium, fast', 'Yes, no, maybe', 'Cold, warm, hot'], answer: 0, explanation: 'Read each layer to go as deep as you like — from a 5-second summary to a precise mechanism.' },
        sources: ['ZION ANATOMY knowledge base.'],
      },
    },
  ]);
  const [q, setQ] = useState('');
  const listRef = useRef<FlatList>(null);

  function send(text: string) {
    const t = text.trim();
    if (!t) return;
    const u: Msg = { id: `u-${Date.now()}`, role: 'user', text: t };
    const a: Msg = { id: `a-${Date.now()}`, role: 'tutor', answer: askTutor(t) };
    setMsgs((m) => [...m, u, a]);
    setQ('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <BrandHeader subtitle="AI Body Educator" />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={0}>
        <FlatList
          ref={listRef}
          data={msgs}
          keyExtractor={(m) => m.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 6 }}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 12 }}>
              {item.role === 'user' ? (
                <View style={{ alignSelf: 'flex-end', maxWidth: '86%', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 11, backgroundColor: theme.accentBg, borderWidth: 1, borderColor: theme.accent }}>
                  <Text style={{ color: theme.text, fontSize: 14, lineHeight: 21 }}>{item.text}</Text>
                </View>
              ) : (
                <TutorCard answer={item.answer!} theme={theme} onOpenTopic={(id) => navigation.navigate('Topic', { topicId: id })} onExplore={() => navigation.navigate('BodyTab')} />
              )}
            </View>
          )}
        />

        {msgs.length === 1 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 6 }}>
            {TUTOR_SUGGESTIONS.map((s) => (
              <TouchableOpacity key={s} onPress={() => send(s)} style={{ paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.bgCard, marginRight: 8 }}>
                <Text style={{ color: theme.textDim, fontSize: 12, fontWeight: '700' }}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : null}

        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1, borderColor: theme.border, backgroundColor: theme.bgElev }}>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder="Ask anything about the human body…"
            placeholderTextColor={theme.textFaint}
            style={{ flex: 1, color: theme.text, fontSize: 14, paddingHorizontal: 14, paddingVertical: 11, borderRadius: 22, backgroundColor: theme.bgCard, borderWidth: 1, borderColor: theme.border }}
            returnKeyType="send"
            onSubmitEditing={() => send(q)}
          />
          <TouchableOpacity onPress={() => send(q)} style={{ width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: q.trim() ? theme.accent : theme.bgCardAlt, marginLeft: 8 }}>
            <Ionicons name="send" size={18} color={q.trim() ? (theme.dark ? '#0B0A07' : '#FFFFFF') : theme.textFaint} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TutorCard({ answer, theme, onOpenTopic, onExplore }: { answer: TutorAnswer; theme: any; onOpenTopic: (id: string) => void; onExplore: () => void }) {
  return (
    <View style={{ alignSelf: 'flex-start', maxWidth: '94%' }}>
      <View style={{ borderRadius: 18, padding: 14, backgroundColor: theme.bgCard, borderWidth: 1, borderColor: theme.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <View style={{ width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.accentBg }}>
            <Ionicons name="school-outline" size={14} color={theme.accent} />
          </View>
          <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginLeft: 6 }}>ZION EDUCATOR</Text>
        </View>
        <Text style={{ color: theme.textDim, fontSize: 11, fontStyle: 'italic', marginBottom: 10 }}>{answer.question}</Text>

        <Layer label="SIMPLE" body={answer.simple} theme={theme} />
        <Layer label="DETAILED" body={answer.detailed} theme={theme} />
        <Layer label="SCIENTIFIC" body={answer.scientific} theme={theme} />

        {answer.anatomy && answer.anatomy.length ? (
          <View style={{ marginTop: 8 }}>
            <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 5 }}>RELATED ANATOMY</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {answer.anatomy.map((id) => {
                const t = TOPIC_MAP[id];
                if (!t) return null;
                return (
                  <TouchableOpacity key={id} onPress={() => onOpenTopic(id)} style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, borderWidth: 1, borderColor: theme.accent, backgroundColor: theme.accentBg, marginRight: 6, marginBottom: 6 }}>
                    <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '800' }}>{t.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}

        {answer.relatedTopics && answer.relatedTopics.length ? (
          <View style={{ marginTop: 6 }}>
            <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 5 }}>RELATED TOPICS</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {answer.relatedTopics.map((id) => {
                const t = TOPIC_MAP[id];
                if (!t) return null;
                return (
                  <TouchableOpacity key={id} onPress={() => onOpenTopic(id)} style={{ paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.bgCardAlt, marginRight: 6, marginBottom: 6 }}>
                    <Text style={{ color: theme.textDim, fontSize: 11, fontWeight: '700' }}>{t.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}

        {answer.visual && answer.visual.length ? (
          <View style={{ marginTop: 6 }}>
            <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 5 }}>VISUAL LEARNING</Text>
            {answer.visual.map((v, i) => (
              <Text key={i} style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19, marginBottom: 2 }}>• {v}</Text>
            ))}
          </View>
        ) : null}

        <View style={{ marginTop: 10, padding: 10, borderRadius: 12, backgroundColor: theme.bgCardAlt }}>
          <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 4 }}>CHECK YOUR UNDERSTANDING</Text>
          <Text style={{ color: theme.text, fontSize: 13, fontWeight: '700', marginBottom: 6 }}>{answer.quiz.prompt}</Text>
          {answer.quiz.options.map((o, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 3 }}>
              <Text style={{ color: i === answer.quiz.answer ? theme.good : theme.textFaint, fontWeight: '900', width: 18 }}>{String.fromCharCode(65 + i)}.</Text>
              <Text style={{ color: theme.textDim, fontSize: 12, lineHeight: 18, flex: 1 }}>{o}</Text>
            </View>
          ))}
          <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 4, fontStyle: 'italic' }}>{answer.quiz.explanation}</Text>
        </View>

        {answer.sources && answer.sources.length ? (
          <View style={{ marginTop: 10 }}>
            <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 3 }}>SOURCES</Text>
            {answer.sources.map((s, i) => (
              <Text key={i} style={{ color: theme.textFaint, fontSize: 11, lineHeight: 17 }}>{i + 1}. {s}</Text>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

function Layer({ label, body, theme }: { label: string; body: string; theme: any }) {
  return (
    <View style={{ marginBottom: 8 }}>
      <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '900', letterSpacing: 0.8, marginBottom: 3 }}>{label}</Text>
      <Text style={{ color: theme.text, fontSize: 13, lineHeight: 20 }}>{body}</Text>
    </View>
  );
}