import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { BrandHeader, Chip, SectionTitle } from '../components/ui';
import { QUIZZES } from '../lib/data/courses';
import { Card } from '../components/ui';

export default function QuizListScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string>('All');

  const all = useMemo(() => {
    const tags = new Set<string>(['All']);
    QUIZZES.forEach((q) => q.domains.forEach((d) => tags.add(d)));
    return Array.from(tags);
  }, []);

  const list = QUIZZES.filter((q) => filter === 'All' || q.domains.includes(filter as any));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 4 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <Text style={{ color: theme.text, fontSize: 17, fontWeight: '900' }}>Quiz Library</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 36 }}>
        <View style={{ paddingHorizontal: 18 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
            {all.map((f) => (
              <Chip key={f} label={f} active={filter === f} onPress={() => setFilter(f)} />
            ))}
          </View>
        </View>
        {list.map((q) => (
          <View key={q.id} style={{ paddingHorizontal: 18, marginBottom: 10 }}>
            <Card onPress={() => navigation.navigate('Quiz', { quizId: q.id })}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name="timer-outline" size={19} color={theme.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800' }}>{q.title}</Text>
                  <Text numberOfLines={2} style={{ color: theme.textDim, fontSize: 11.5, marginTop: 3, lineHeight: 17 }}>{q.description}</Text>
                  <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 4 }}>
                    {q.questions.length} questions · {q.minutes} min
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textFaint} />
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}