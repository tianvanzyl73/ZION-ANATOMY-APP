import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, useColorScheme, Dimensions, ScrollView, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes, Spacing } from '../lib/theme';
import { bodyRegions, BodyRegion, getTopicById } from '../lib/data';

const { width, height } = Dimensions.get('window');

export default function ExplorerScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  const handleRegionPress = (region: BodyRegion) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  const handleTopicPress = (topicId: string) => {
    navigation.navigate('TopicDetail', { topicId });
    setSelectedRegion(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: t.text }]}>3D Body Explorer</Text>
          <Text style={[styles.headerSub, { color: t.textTertiary }]}>Tap regions to explore</Text>
        </View>
        <TouchableOpacity
          style={[styles.viewToggle, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => setViewMode(viewMode === 'front' ? 'back' : 'front')}
        >
          <Ionicons name="refresh" size={18} color={t.accent} />
        </TouchableOpacity>
      </View>

      {/* Body Model */}
      <View style={styles.bodyContainer}>
        {/* Body Silhouette */}
        <View style={[styles.bodySilhouette, { backgroundColor: t.surface, borderColor: t.border }]}>
          {/* Head */}
          <View style={[styles.bodyPart, styles.head, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          {/* Neck */}
          <View style={[styles.bodyPart, styles.neck, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          {/* Torso */}
          <View style={[styles.bodyPart, styles.torso, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          {/* Arms */}
          <View style={[styles.bodyPart, styles.armLeft, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          <View style={[styles.bodyPart, styles.armRight, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          {/* Legs */}
          <View style={[styles.bodyPart, styles.legLeft, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
          <View style={[styles.bodyPart, styles.legRight, { backgroundColor: t.surfaceElevated, borderColor: t.borderLight }]} />
        </View>

        {/* Interactive Hotspots */}
        {bodyRegions.map(region => (
          <TouchableOpacity
            key={region.id}
            style={[
              styles.hotspot,
              {
                left: `${region.x}%`,
                top: `${region.y}%`,
                width: `${region.width}%`,
                height: `${region.height}%`,
                borderColor: selectedRegion?.id === region.id ? region.color : 'transparent',
                backgroundColor: selectedRegion?.id === region.id ? region.color + '30' : 'transparent',
              }
            ]}
            onPress={() => handleRegionPress(region)}
            activeOpacity={0.7}
          >
            {selectedRegion?.id !== region.id && (
              <View style={[styles.hotspotDot, { backgroundColor: region.color }]}>
                <View style={[styles.hotspotPulse, { backgroundColor: region.color }]} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Selected Region Info */}
      {selectedRegion && (
        <View style={[styles.infoPanel, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.infoHeader}>
            <View style={[styles.infoDot, { backgroundColor: selectedRegion.color }]} />
            <Text style={[styles.infoTitle, { color: t.text }]}>{selectedRegion.name}</Text>
            <TouchableOpacity onPress={() => setSelectedRegion(null)}>
              <Ionicons name="close-circle" size={24} color={t.textTertiary} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingTop: 12 }}>
            {selectedRegion.topics.map(topicId => {
              const topic = getTopicById(topicId);
              if (!topic) return null;
              return (
                <TouchableOpacity
                  key={topicId}
                  style={[styles.topicChip, { backgroundColor: t.surfaceElevated, borderColor: t.border }]}
                  onPress={() => handleTopicPress(topicId)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.topicChipEmoji}>{topic.emoji}</Text>
                  <Text style={[styles.topicChipText, { color: t.text }]} numberOfLines={1}>{topic.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Instructions */}
      {!selectedRegion && (
        <View style={[styles.instructions, { backgroundColor: t.surface, borderColor: t.border }]}>
          <Ionicons name="hand-left" size={20} color={t.accent} />
          <Text style={[styles.instructionText, { color: t.textSecondary }]}>
            Tap on any body region to explore muscles, bones, and systems
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerCenter: { flex: 1 },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  headerSub: { fontSize: FontSizes.xs, fontWeight: '500' },
  viewToggle: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  bodyContainer: { flex: 1, position: 'relative', marginHorizontal: 20, marginBottom: 20 },
  bodySilhouette: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  bodyPart: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 8,
  },
  head: {
    left: '38%',
    top: '5%',
    width: '24%',
    height: '12%',
    borderRadius: 40,
  },
  neck: {
    left: '44%',
    top: '17%',
    width: '12%',
    height: '5%',
  },
  torso: {
    left: '30%',
    top: '22%',
    width: '40%',
    height: '30%',
    borderRadius: 20,
  },
  armLeft: {
    left: '15%',
    top: '24%',
    width: '14%',
    height: '28%',
    borderRadius: 20,
  },
  armRight: {
    left: '71%',
    top: '24%',
    width: '14%',
    height: '28%',
    borderRadius: 20,
  },
  legLeft: {
    left: '32%',
    top: '54%',
    width: '16%',
    height: '38%',
    borderRadius: 20,
  },
  legRight: {
    left: '52%',
    top: '54%',
    width: '16%',
    height: '38%',
    borderRadius: 20,
  },
  hotspot: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotspotPulse: {
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.3,
    position: 'absolute',
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  infoTitle: {
    flex: 1,
    fontSize: FontSizes.lg,
    fontWeight: '700',
  },
  topicChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    minWidth: 140,
  },
  topicChipEmoji: {
    fontSize: 20,
  },
  topicChipText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    flex: 1,
  },
  instructions: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  instructionText: {
    flex: 1,
    fontSize: FontSizes.sm,
    fontWeight: '500',
  },
});
