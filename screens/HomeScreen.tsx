import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bodySystems, BodySystem } from '../lib/data';
import { getQuizProgress, QuizProgress } from '../lib/bookmarks';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [progress, setProgress] = useState<QuizProgress>({ totalAttempted: 0, totalCorrect: 0, lastPlayed: 0, streak: 0 });

  useEffect(() => {
    getQuizProgress().then(setProgress);
  }, []);

  const accuracy = progress.totalAttempted > 0
    ? Math.round((progress.totalCorrect / progress.totalAttempted) * 100)
    : 0;

  const renderSystemCard = ({ item }: { item: BodySystem }) => (
    <TouchableOpacity
      style={[styles.systemCard, { backgroundColor: item.color }]}
      activeOpacity={0.85}
      onPress={() => navigation.navigate('SystemDetail', { systemId: item.id })}
    >
      <View style={styles.systemCardIcon}>
        <Ionicons name={item.icon as any} size={32} color="#1a1a2e" />
      </View>
      <Text style={styles.systemCardTitle}>{item.name}</Text>
      <Text style={styles.systemCardOrgans}>{item.organs.length} structures</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <FlatList
        data={bodySystems}
        renderItem={renderSystemCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={[styles.greeting, isDark && styles.textLight]}>Welcome to</Text>
                <Text style={[styles.title, isDark && styles.titleDark]}>ZION ANATOMY</Text>
              </View>
              <TouchableOpacity
                style={[styles.avatarBtn, isDark && styles.avatarBtnDark]}
                onPress={() => navigation.navigate('Bookmarks')}
              >
                <Ionicons name="bookmark" size={22} color={isDark ? '#fff' : '#1a1a2e'} />
              </TouchableOpacity>
            </View>

            {/* Stats Card */}
            <View style={[styles.statsCard, isDark && styles.statsCardDark]}>
              <View style={styles.statItem}>
                <Ionicons name="trophy" size={24} color="#FFD700" />
                <Text style={[styles.statValue, isDark && styles.textLight]}>{progress.streak}</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Streak</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <Text style={[styles.statValue, isDark && styles.textLight]}>{accuracy}%</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Accuracy</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Ionicons name="school" size={24} color="#2196F3" />
                <Text style={[styles.statValue, isDark && styles.textLight]}>{progress.totalAttempted}</Text>
                <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Quizzes</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={[styles.quickActionBtn, isDark && styles.quickActionBtnDark]}
                onPress={() => navigation.navigate('Quiz')}
              >
                <Ionicons name="help-circle" size={20} color="#6C63FF" />
                <Text style={[styles.quickActionText, isDark && styles.quickActionTextDark]}>Take a Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.quickActionBtn, isDark && styles.quickActionBtnDark]}
                onPress={() => navigation.navigate('Systems')}
              >
                <Ionicons name="grid" size={20} color="#FF6B6B" />
                <Text style={[styles.quickActionText, isDark && styles.quickActionTextDark]}>All Systems</Text>
              </TouchableOpacity>
            </View>

            {/* Section Title */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Body Systems</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Systems')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FE',
  },
  containerDark: {
    backgroundColor: '#0D0D1A',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    letterSpacing: 1,
  },
  titleDark: {
    color: '#fff',
  },
  textLight: {
    color: '#ccc',
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarBtnDark: {
    backgroundColor: '#1E1E3A',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  statsCardDark: {
    backgroundColor: '#1E1E3A',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E8E8F0',
    marginVertical: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  statLabelDark: {
    color: '#999',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  quickActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionBtnDark: {
    backgroundColor: '#1E1E3A',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  quickActionTextDark: {
    color: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  seeAll: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  systemCard: {
    width: (width - 52) / 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  systemCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  systemCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  systemCardOrgans: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
});
