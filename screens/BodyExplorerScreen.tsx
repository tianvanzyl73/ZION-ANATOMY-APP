import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../lib/themeContext';
import BodyModel from '../components/BodyModel';
import { Card, Chip, SectionTitle } from '../components/ui';
import { SYSTEMS, REGIONS } from '../lib/data/systems';
import { Domain } from '../lib/types';

export default function BodyExplorerScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [system, setSystem] = useState<Domain | 'none'>('none');
  const [region, setRegion] = useState<string | null>(null);

  const activeSystem = SYSTEMS.find((s) => s.id === system) ?? null;
  const selectedRegion = REGIONS.find((r) => r.id === region) ?? null;

  const structures = useMemo(() => {
    if (!activeSystem) return [];
    return activeSystem.structures.map((s) => `${activeSystem.id}-${s}`);
  }, [activeSystem]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ paddingHorizontal: 18, paddingTop: 8 }}>
          <Text style={{ color: theme.text, fontSize: 22, fontWeight: '900', letterSpacing: 0.4 }}>Interactive Body</Text>
          <Text style={{ color: theme.textDim, fontSize: 13, marginTop: 3, lineHeight: 18 }}>
            Select a system layer, then tap any region of the model to explore its structures.
          </Text>
        </View>

        <View style={{ paddingHorizontal: 18, marginTop: 14 }}>
          <BodyModel system={system} selectedRegion={region} onSelectRegion={(id) => setRegion(id)} height={380} />
        </View>

        {/* system selector */}
        <View style={{ paddingHorizontal: 18, marginTop: 14 }}>
          <SectionTitle title="System Layers" icon="layers-outline" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 12 }}>
            <TouchableOpacity
              onPress={() => setSystem('none')}
              style={[styles.sysChip, { backgroundColor: system === 'none' ? theme.accentBg : theme.bgCard, borderColor: system === 'none' ? theme.accent : theme.border }]}
            >
              <Ionicons name="scan-outline" size={13} color={system === 'none' ? theme.accent : theme.textDim} />
              <Text style={{ color: system === 'none' ? theme.accent : theme.textDim, fontWeight: '700', fontSize: 11.5, marginLeft: 5 }}>WHOLE BODY</Text>
            </TouchableOpacity>
            {SYSTEMS.map((s) => (
              <TouchableOpacity
                key={s.id}
                onPress={() => setSystem(s.id)}
                style={[styles.sysChip, { backgroundColor: system === s.id ? theme.accentBg : theme.bgCard, borderColor: system === s.id ? theme.accent : theme.border }]}
              >
                <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: s.color, marginRight: 5 }} />
                <Text style={{ color: system === s.id ? theme.accent : theme.textDim, fontWeight: '700', fontSize: 11.5 }}>{s.short.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {activeSystem ? (
          <View style={{ paddingHorizontal: 18, marginTop: 12 }}>
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                  <Ionicons name={activeSystem.icon as any} size={19} color={theme.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 16, fontWeight: '900' }}>{activeSystem.name}</Text>
                  <Text style={{ color: theme.accent, fontSize: 11.5, fontStyle: 'italic' }}>{activeSystem.tagline}</Text>
                </View>
              </View>
              <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 20 }}>{activeSystem.overview}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                {activeSystem.stats.map((st) => (
                  <View key={st.label} style={{ marginRight: 16, marginTop: 6 }}>
                    <Text style={{ color: theme.accent, fontSize: 14, fontWeight: '900' }}>{st.value}</Text>
                    <Text style={{ color: theme.textFaint, fontSize: 9.5, letterSpacing: 0.6 }}>{st.label.toUpperCase()}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('System', { systemId: activeSystem.id })}
                style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ color: theme.accent, fontWeight: '800', fontSize: 13 }}>Explore all {activeSystem.structures.length} structures</Text>
                <Ionicons name="chevron-forward" size={15} color={theme.accent} style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            </Card>
          </View>
        ) : null}

        {/* selected region */}
        {selectedRegion ? (
          <View style={{ paddingHorizontal: 18, marginTop: 12 }}>
            <Card pressed>
              <Text style={{ color: theme.accent, fontSize: 11, fontWeight: '900', letterSpacing: 1 }}>SELECTED REGION</Text>
              <Text style={{ color: theme.text, fontSize: 18, fontWeight: '900', marginTop: 4 }}>{selectedRegion.name}</Text>
              <Text style={{ color: theme.textDim, fontSize: 12.5, lineHeight: 19, marginTop: 4 }}>{selectedRegion.blurb}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Region', { regionId: selectedRegion.id })}
                style={{ marginTop: 10, alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: theme.accentBg, borderWidth: 1, borderColor: theme.accent }}
              >
                <Text style={{ color: theme.accent, fontWeight: '800', fontSize: 12.5 }}>Open region topics</Text>
              </TouchableOpacity>
            </Card>
          </View>
        ) : null}

        {/* region list */}
        <View style={{ paddingHorizontal: 18, marginTop: 20 }}>
          <SectionTitle title="All Regions" icon="grid-outline" />
          {REGIONS.map((r) => (
            <Card key={r.id} style={{ marginBottom: 9, padding: 14 }} onPress={() => navigation.navigate('Region', { regionId: r.id })}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 34, height: 34, borderRadius: 11, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginRight: 11 }}>
                  <Ionicons name="locate-outline" size={16} color={theme.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: theme.text, fontSize: 14.5, fontWeight: '800' }}>{r.name}</Text>
                  <Text numberOfLines={1} style={{ color: theme.textFaint, fontSize: 11.5, marginTop: 2 }}>{r.blurb}</Text>
                </View>
                <Ionicons name="chevron-forward" size={17} color={theme.textFaint} />
              </View>
            </Card>
          ))}
        </View>

        {structures.length > 0 ? (
          <View style={{ paddingHorizontal: 18, marginTop: 8 }}>
            <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 1, marginTop: 10 }}>
              TIP: SWITCH LAYERS ABOVE — {activeSystem?.short.toUpperCase()} SHOWN ON MODEL
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sysChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9, borderRadius: 20, borderWidth: 1, marginRight: 8 },
});
