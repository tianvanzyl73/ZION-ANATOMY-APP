import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSystemById, getOrganById, Organ, BodySystem } from '../lib/data';
import { isBookmarked, addBookmark, removeBookmark } from '../lib/bookmarks';

interface OrganDetailScreenProps {
  navigation: any;
  route: any;
}

export default function OrganDetailScreen({ navigation, route }: OrganDetailScreenProps) {
  const { systemId, organId } = route.params;
  const system = getSystemById(systemId);
  const organ = getOrganById(systemId, organId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    isBookmarked(systemId, organId).then(setBookmarked);
  }, []);

  const toggleBookmark = async () => {
    if (bookmarked) {
      await removeBookmark(systemId, organId);
      setBookmarked(false);
    } else {
      await addBookmark(systemId, organId);
      setBookmarked(true);
    }
  };

  if (!system || !organ) {
    return (
      <View style={styles.errorContainer}>
        <Text>Structure not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, isDark && styles.backBtnDark]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={isDark ? '#fff' : '#1a1a2e'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textLight]} numberOfLines={1}>{organ.name}</Text>
        <TouchableOpacity
          style={[styles.bookmarkBtn, isDark && styles.backBtnDark]}
          onPress={toggleBookmark}
        >
          <Ionicons
            name={bookmarked ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={bookmarked ? '#6C63FF' : isDark ? '#fff' : '#1a1a2e'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={[styles.heroCard, { backgroundColor: system.color }]}>
          <Text style={styles.heroEmoji}>{organ.emoji}</Text>
          <Text style={styles.heroName}>{organ.name}</Text>
          <Text style={styles.heroSystem}>{system.name}</Text>
        </View>

        {/* Description */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={20} color="#6C63FF" />
            <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Overview</Text>
          </View>
          <Text style={[styles.descriptionText, isDark && styles.descDark]}>
            {organ.description}
          </Text>
        </View>

        {/* Key Facts */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color="#FF6B6B" />
            <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Key Facts</Text>
          </View>
          {organ.facts.map((fact, index) => (
            <View key={index} style={styles.factRow}>
              <View style={styles.factNumber}>
                <Text style={styles.factNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.factText, isDark && styles.descDark]}>{fact}</Text>
            </View>
          ))}
        </View>

        {/* Functions */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="flash" size={20} color="#4CAF50" />
            <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Functions</Text>
          </View>
          {organ.functions.map((func, index) => (
            <View key={index} style={styles.functionRow}>
              <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />
              <Text style={[styles.functionText, isDark && styles.descDark]}>{func}</Text>
            </View>
          ))}
        </View>

        {/* Common Conditions */}
        <View style={[styles.section, isDark && styles.sectionDark]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="warning" size={20} color="#FF9800" />
            <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Common Conditions</Text>
          </View>
          <View style={styles.conditionsWrap}>
            {organ.commonConditions.map((condition, index) => (
              <View key={index} style={[styles.conditionBadge, isDark && styles.conditionBadgeDark]}>
                <Text style={[styles.conditionText, isDark && styles.conditionTextDark]}>{condition}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backBtnDark: {
    backgroundColor: '#1E1E3A',
  },
  bookmarkBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    flex: 1,
    textAlign: 'center',
  },
  textLight: {
    color: '#fff',
  },
  descDark: {
    color: '#999',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  heroCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  heroName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  heroSystem: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionDark: {
    backgroundColor: '#1E1E3A',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  factNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFE8E8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  factNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF6B6B',
  },
  factText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  functionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    gap: 10,
  },
  functionText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  conditionsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  conditionBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  conditionBadgeDark: {
    backgroundColor: '#2A2A3A',
  },
  conditionText: {
    fontSize: 13,
    color: '#E65100',
    fontWeight: '600',
  },
  conditionTextDark: {
    color: '#FFB74D',
  },
});
