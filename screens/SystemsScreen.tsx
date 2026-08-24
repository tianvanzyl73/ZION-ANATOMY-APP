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
import { bodySystems, BodySystem } from '../lib/data';

interface SystemsScreenProps {
  navigation: any;
}

export default function SystemsScreen({ navigation }: SystemsScreenProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const renderSystem = ({ item }: { item: BodySystem }) => (
    <TouchableOpacity
      style={[styles.systemRow, isDark && styles.systemRowDark]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SystemDetail', { systemId: item.id })}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon as any} size={28} color="#1a1a2e" />
      </View>
      <View style={styles.systemInfo}>
        <Text style={[styles.systemName, isDark && styles.textLight]}>{item.name}</Text>
        <Text style={[styles.systemDesc, isDark && styles.descDark]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.systemMeta}>
          <View style={styles.metaBadge}>
            <Ionicons name="layers" size={12} color="#6C63FF" />
            <Text style={styles.metaText}>{item.organs.length} structures</Text>
          </View>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, isDark && styles.backBtnDark]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={isDark ? '#fff' : '#1a1a2e'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.textLight]}>Body Systems</Text>
        <View style={{ width: 44 }} />
      </View>
      <FlatList
        data={bodySystems}
        renderItem={renderSystem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
  },
  textLight: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  systemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  systemRowDark: {
    backgroundColor: '#1E1E3A',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  systemInfo: {
    flex: 1,
  },
  systemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  systemDesc: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 6,
  },
  descDark: {
    color: '#999',
  },
  systemMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '600',
  },
});
