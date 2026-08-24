import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { askAITutor, suggestedQuestions } from '../lib/aiTutor';

interface Message {
  id: string;
  type: 'user' | 'ai';
  text: string;
  relatedTopics?: string[];
}

export default function AITutorScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      text: 'Hello! I\'m your AI Anatomy Tutor. Ask me anything about human anatomy, exercise physiology, nutrition, supplements, or recovery. I\'ll provide evidence-based answers tailored for fitness enthusiasts.',
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (text?: string) => {
    const question = text || input.trim();
    if (!question) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate AI thinking
    setTimeout(() => {
      const response = askAITutor(question);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        text: response.answer,
        relatedTopics: response.relatedTopics,
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 500);
  };

  const renderMessage = (msg: Message) => {
    if (msg.type === 'user') {
      return (
        <View key={msg.id} style={styles.userMsgRow}>
          <View style={[styles.userMsg, { backgroundColor: t.accent }]}>
            <Text style={styles.userMsgText}>{msg.text}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={msg.id} style={styles.aiMsgRow}>
        <View style={[styles.aiAvatar, { backgroundColor: t.accent + '20' }]}>
          <Ionicons name="sparkles" size={18} color={t.accent} />
        </View>
        <View style={[styles.aiMsg, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Text style={[styles.aiMsgText, { color: t.text }]}>{msg.text}</Text>
          {msg.relatedTopics && msg.relatedTopics.length > 0 && (
            <View style={styles.relatedWrap}>
              <Text style={[styles.relatedLabel, { color: t.textTertiary }]}>Related topics:</Text>
              <View style={styles.relatedChips}>
                {msg.relatedTopics.map((topicId, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.relatedChip, { backgroundColor: t.accent + '15', borderColor: t.accent + '30' }]}
                    onPress={() => navigation.navigate('TopicDetail', { topicId })}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.relatedChipText, { color: t.accent }]}>{topicId}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={t.text} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: t.text }]}>AI Tutor</Text>
            <Text style={[styles.headerSub, { color: t.textTertiary }]}>Ask anything about anatomy</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={{ padding: 20, gap: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}

          {messages.length === 1 && (
            <View style={styles.suggestionsWrap}>
              <Text style={[styles.suggestionsTitle, { color: t.textSecondary }]}>Try asking:</Text>
              <View style={styles.suggestionsGrid}>
                {suggestedQuestions.slice(0, 6).map((q, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={[styles.suggestionChip, { backgroundColor: t.surface, borderColor: t.border }]}
                    onPress={() => handleSend(q)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.suggestionText, { color: t.text }]} numberOfLines={2}>{q}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: t.surface, borderColor: t.border }]}>
          <TextInput
            style={[styles.input, { color: t.text }]}
            placeholder="Ask about anatomy, nutrition, training..."
            placeholderTextColor={t.textTertiary}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
            returnKeyType="send"
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: input.trim() ? t.accent : t.surfaceElevated }]}
            onPress={() => handleSend()}
            disabled={!input.trim()}
          >
            <Ionicons name="send" size={18} color={input.trim() ? '#000' : t.textTertiary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  headerSub: { fontSize: FontSizes.xs },
  messagesContainer: { flex: 1 },
  userMsgRow: { alignItems: 'flex-end' },
  userMsg: { maxWidth: '80%', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderBottomRightRadius: 4 },
  userMsgText: { fontSize: FontSizes.md, color: '#000', fontWeight: '500', lineHeight: 22 },
  aiMsgRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  aiAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  aiMsg: { flex: 1, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 18, borderBottomLeftRadius: 4, borderWidth: 1 },
  aiMsgText: { fontSize: FontSizes.md, lineHeight: 22 },
  relatedWrap: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: 'rgba(128,128,128,0.2)' },
  relatedLabel: { fontSize: FontSizes.xs, marginBottom: 8 },
  relatedChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  relatedChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1 },
  relatedChipText: { fontSize: FontSizes.xs, fontWeight: '600' },
  suggestionsWrap: { marginTop: 10 },
  suggestionsTitle: { fontSize: FontSizes.sm, fontWeight: '600', marginBottom: 12 },
  suggestionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestionChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, borderWidth: 1, maxWidth: '48%' },
  suggestionText: { fontSize: FontSizes.sm, fontWeight: '500', lineHeight: 18 },
  inputContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 20, paddingVertical: 12, gap: 10, borderTopWidth: 1 },
  input: { flex: 1, fontSize: FontSizes.md, maxHeight: 100, paddingVertical: 8 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
});
