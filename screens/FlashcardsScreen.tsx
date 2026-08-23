import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import { Card } from '../components/ui';
import { FLASHCARDS, DOMAIN_LABELS } from '../lib/data/index';

export default function FlashcardsScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const flip = useRef(new Animated.Value(0)).current;

  const cards = FLASHCARDS;
  const card = cards[index];

  useEffect(() => {
    flip.setValue(0);
    setRevealed(false);
  }, [index, flip]);

  function next() {
    if (index + 1 >= cards.length) {
      navigation.goBack();
    } else {
      setIndex((i) => i + 1);
    }
  }

  function flipCard() {
    Animated.spring(flip, { toValue: revealed ? 0 : 1, useNativeDriver: false, friction: 7, tension: 8 }).start();
    setRevealed((r) => !r);
  }

  const frontRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const backRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  if (!card) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 10, paddingBottom: 6 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', marginRight: 6 }}>
          <Ionicons name="chevron-back" size={20} color={theme.text} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ color: theme.textFaint, fontSize: 10, letterSpacing: 1 }}>FLASHCARDS</Text>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900' }}>{DOMAIN_LABELS[card.domain] ?? 'Knowledge'}</Text>
        </View>
        <Text style={{ color: theme.textFaint, fontSize: 11 }}>{index + 1} / {cards.length}</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 22, justifyContent: 'center' }}>
        <TouchableOpacity activeOpacity={0.95} onPress={flipCard} style={{ width: '100%', minHeight: 320 }}>
          <Animated.View style={[{ backfaceVisibility: 'hidden' as any, position: 'absolute' as any, top: 0, left: 0, right: 0 }, { transform: [{ perspective: 1000 }, { rotateY: frontRotate }] }]}>
            <Card style={{ minHeight: 320, alignItems: 'center', justifyContent: 'center', padding: 22, borderColor: theme.accent }}>
              <Text style={{ color: theme.accent, fontSize: 10.5, letterSpacing: 1.5, marginBottom: 14, fontWeight: '900' }}>CONCEPT</Text>
              <Text style={{ color: theme.text, fontSize: 22, fontWeight: '900', textAlign: 'center', lineHeight: 30 }}>{card.front}</Text>
              <Text style={{ color: theme.textFaint, fontSize: 11, marginTop: 18 }}>Tap to reveal</Text>
            </Card>
          </Animated.View>
          <Animated.View style={[{ backfaceVisibility: 'hidden' as any }, { transform: [{ perspective: 1000 }, { rotateY: backRotate }] }]}>
            <Card style={{ minHeight: 320, padding: 22, borderColor: theme.accent }}>
              <Text style={{ color: theme.accent, fontSize: 10.5, letterSpacing: 1.5, marginBottom: 14, fontWeight: '900' }}>EXPLANATION</Text>
              <Text style={{ color: theme.text, fontSize: 14, lineHeight: 22 }}>{card.back}</Text>
            </Card>
          </Animated.View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginTop: 22 }}>
          <TouchableOpacity onPress={() => setIndex((i) => Math.max(0, i - 1))} style={{ flex: 1, marginRight: 8, paddingVertical: 14, borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: theme.border }}>
            <Text style={{ color: theme.textDim, fontWeight: '800' }}>PREV</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={next} style={{ flex: 2, paddingVertical: 14, borderRadius: 16, alignItems: 'center', backgroundColor: theme.accent }}>
            <Text style={{ color: theme.dark ? '#0B0A07' : '#FFF', fontWeight: '900' }}>{index + 1 >= cards.length ? 'FINISH' : 'NEXT CARD'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}