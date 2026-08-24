import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSystemById, BodySystem, Organ } from '../lib/data';

interface SystemDetailScreenProps {
  navigation: any;
  route: any;
}

export default function SystemDetailScreen({ navigation, route }: SystemDetailScreenProps) {
  const { systemId } = route.params;
  const system = getSystemById(systemId);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!system) {
    return (
      <View style={styles.errorContainer}>
        <Text>System not found</Text>
      </View>
    );
  }

  const renderOrgan = ({ item }: { item: Organ }) => (
    <TouchableOpacity
      style={[styles.organCard, isDark && styles.organCardDark]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('OrganDetail', { systemId: system.id, organId: item.id })}
    >
      <View style={styles.organHeader}>
        <Text style={styles.organEmoji}>{item.emoji}</Text>
        <View style={styles.organInfo}>
          <Text style={[styles.organName, isDark && styles.textLight]}>{item.name}</Text>
          <Text style={[styles.organDesc, isDark && styles.descDark]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
      </View>
      <View style={styles.organFooter}>
        <View style={styles.organBadge}>
          <Ionicons name="list" size={12} color="#6C63FF" />
          <Text style={styles.badgeText}>{item.functions.length} functions</Text>
        </View>
        <View style={styles.organBadge}>
          <Ionicons name="information-circle" size={12} color="#FF6B6B" />
          <Text style={styles.badgeText}>{item.facts.length} facts</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#ccc" />
      </View>
    </TouchableOpacity>
  );

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
        <Text style={[styles.headerTitle, isDark && styles.textLight]} numberOfLines={1}>{system.name}</Text>
        <View style={{ width: 44 }} />
      </View>

      <FlatList
        data={system.organs}
        renderItem={renderOrgan}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.systemBanner}>
            <View style={[styles.bannerIcon, { backgroundColor: system.color }]}>
              <Ionicons name={system.icon as any} size={40} color="#1a1a2e" />
            </View>
            <Text style={[styles.bannerTitle, isDark && styles.textLight]}>{system.name}</Text>
            <Text style={[styles.bannerDesc, isDark && styles.descDark]}>{system.description}</Text>
            <View style={[styles.funFactCard, isDark && styles.funFactCardDark]}>
              <Ionicons name="bulb" size={20} color="#FFD700" />
              <Text style={[styles.funFactText, isDark && styles.descDark]}>{system.funFact}</Text>
            </View>
          </View>
        }
        ListFooterComponent={<View style={{ height: 40 }} />}
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
  listContent: {
    paddingHorizontal: 20,
  },
  systemBanner: {
    alignItems: 'center',
    marginBottom: 24,
  },
  bannerIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  bannerDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  funFactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 14,
    gap: 10,
    alignItems: 'flex-start',
    width: '100%',
  },
  funFactCardDark: {
    backgroundColor: '#2A2A3A',
  },
  funFactText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
  organCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  organCardDark: {
    backgroundColor: '#1E1E3A',
  },
  organHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  organEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  organInfo: {
    flex: 1,
  },
  organName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  organDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 19,
  },
  organFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  organBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '600',
  },
});
