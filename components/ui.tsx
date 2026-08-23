import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../lib/themeContext';
import { Theme } from '../lib/theme';
import { EvidenceGrade, Level } from '../lib/types';

export function Card({ children, style, onPress, pressed }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[]; onPress?: () => void; pressed?: boolean }) {
  const { theme } = useTheme();
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.card, { backgroundColor: pressed ? theme.bgCardAlt : theme.bgCard, borderColor: theme.border }, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return <View style={[styles.card, { backgroundColor: theme.bgCard, borderColor: theme.border }, style]}>{children}</View>;
}

export function SectionTitle({ title, actionLabel, onAction, icon }: { title: string; actionLabel?: string; onAction?: () => void; icon?: keyof typeof Ionicons.glyphMap }) {
  const { theme } = useTheme();
  return (
    <View style={styles.sectionRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon ? <Ionicons name={icon} size={15} color={theme.accent} style={{ marginRight: 6 }} /> : null}
        <Text style={{ color: theme.text, fontSize: 15, fontWeight: '800', letterSpacing: 0.4 }}>{title}</Text>
      </View>
      {actionLabel && onAction ? (
        <TouchableOpacity onPress={onAction} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={{ color: theme.accent, fontSize: 12.5, fontWeight: '700' }}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function Chip({ label, color, icon, onPress, active }: { label: string; color?: string; icon?: string; onPress?: () => void; active?: boolean }) {
  const { theme } = useTheme();
  const bg = active ? theme.accentBg : theme.bgCardAlt;
  const border = active ? theme.accent : theme.border;
  const fg = color ?? (active ? theme.accent : theme.textDim);
  const El: any = onPress ? TouchableOpacity : View;
  return (
    <El onPress={onPress} style={[styles.chip, { backgroundColor: bg, borderColor: border }]}>
      {icon ? <Ionicons name={icon as any} size={12} color={fg} style={{ marginRight: 4 }} /> : null}
      <Text style={{ color: fg, fontSize: 11.5, fontWeight: '700', letterSpacing: 0.3 }}>{label.toUpperCase()}</Text>
    </El>
  );
}

export function GoldBadge({ label, icon }: { label: string; icon?: string }) {
  return (
    <LinearGradient colors={['#E8CE7A', '#D4AF37', '#A8862B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.goldBadge}>
      {icon ? <Ionicons name={icon as any} size={12} color="#1A1508" style={{ marginRight: 4 }} /> : null}
      <Text style={{ color: '#1A1508', fontSize: 10.5, fontWeight: '900', letterSpacing: 0.6 }}>{label.toUpperCase()}</Text>
    </LinearGradient>
  );
}

export function EvidenceBadge({ grade }: { grade: EvidenceGrade }) {
  const { theme } = useTheme();
  const map: Record<EvidenceGrade, { c: string; i: string }> = {
    Strong: { c: theme.good, i: 'checkmark-circle' },
    Moderate: { c: theme.warn, i: 'checkmark-circle-outline' },
    Limited: { c: theme.textDim, i: 'alert-circle-outline' },
    Inconclusive: { c: theme.bad, i: 'close-circle-outline' },
  };
  const g = map[grade];
  return (
    <View style={[styles.evidence, { borderColor: g.c, backgroundColor: theme.dark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.03)' }]}>
      <Ionicons name={g.i as any} size={13} color={g.c} style={{ marginRight: 5 }} />
      <Text style={{ color: g.c, fontSize: 11, fontWeight: '800', letterSpacing: 0.4 }}>EVIDENCE: {grade.toUpperCase()}</Text>
    </View>
  );
}

export function LevelBadge({ level }: { level: Level }) {
  const { theme } = useTheme();
  const color = level === 'Beginner' ? theme.good : level === 'Intermediate' ? theme.warn : theme.accent;
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="school-outline" size={12} color={color} style={{ marginRight: 4 }} />
      <Text style={{ color, fontSize: 11, fontWeight: '700', letterSpacing: 0.3 }}>{level}</Text>
    </View>
  );
}

export function ProgressBar({ value, total, height = 6 }: { value: number; total: number; height?: number }) {
  const { theme } = useTheme();
  const pct = total > 0 ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return (
    <View style={{ height, borderRadius: height / 2, backgroundColor: theme.bgCardAlt, overflow: 'hidden' }}>
      <LinearGradient colors={['#E8CE7A', '#D4AF37']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: `${Math.max(3, pct)}%`, height, borderRadius: height / 2 }} />
    </View>
  );
}

export function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, minWidth: '46%', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: theme.bgCardAlt, marginBottom: 8, marginHorizontal: 4 }}>
      <Text style={{ color: accent ? theme.accent : theme.text, fontSize: 17, fontWeight: '900' }}>{value}</Text>
      <Text style={{ color: theme.textFaint, fontSize: 10.5, marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</Text>
    </View>
  );
}

export function BrandHeader({ subtitle, right }: { subtitle?: string; right?: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 4 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <LinearGradient colors={['#E8CE7A', '#D4AF37', '#8F6E1F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          <Ionicons name="body" size={19} color="#0B0A07" />
        </LinearGradient>
        <View>
          <Text style={{ color: theme.text, fontSize: 17, fontWeight: '900', letterSpacing: 2.2 }}>ZION ANATOMY</Text>
          {subtitle ? <Text style={{ color: theme.textFaint, fontSize: 10.5, letterSpacing: 1.1, marginTop: 1 }}>{subtitle.toUpperCase()}</Text> : null}
        </View>
      </View>
      {right}
    </View>
  );
}

export function EmptyState({ icon, title, body, actionLabel, onAction }: { icon: string; title: string; body: string; actionLabel?: string; onAction?: () => void }) {
  const { theme } = useTheme();
  return (
    <View style={{ alignItems: 'center', padding: 32 }}>
      <View style={{ width: 62, height: 62, borderRadius: 31, backgroundColor: theme.accentBg, alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Ionicons name={icon as any} size={26} color={theme.accent} />
      </View>
      <Text style={{ color: theme.text, fontSize: 16, fontWeight: '800', marginBottom: 6 }}>{title}</Text>
      <Text style={{ color: theme.textDim, fontSize: 13, textAlign: 'center', lineHeight: 19, maxWidth: 300 }}>{body}</Text>
      {actionLabel && onAction ? (
        <TouchableOpacity onPress={onAction} style={{ marginTop: 16, paddingHorizontal: 18, paddingVertical: 10, borderRadius: 22, backgroundColor: theme.accentBg, borderWidth: 1, borderColor: theme.accent }}>
          <Text style={{ color: theme.accent, fontWeight: '800', fontSize: 13 }}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export function Loading() {
  const { theme } = useTheme();
  return <ActivityIndicator color={theme.accent} />;
}

export function KeyValue({ k, v }: { k: string; v: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: theme.accent, fontSize: 10.5, fontWeight: '800', letterSpacing: 0.8, marginBottom: 3 }}>{k.toUpperCase()}</Text>
      <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 19 }}>{v}</Text>
    </View>
  );
}

export function Bullets({ items, color }: { items: string[]; color?: string }) {
  const { theme } = useTheme();
  return (
    <View style={{ marginTop: 6 }}>
      {items.map((b, i) => (
        <View key={String(i)} style={{ flexDirection: 'row', marginBottom: 6 }}>
          <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: color ?? theme.accent, marginTop: 7, marginRight: 9 }} />
          <Text style={{ color: theme.textDim, fontSize: 13, lineHeight: 19, flex: 1 }}>{b}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 16 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, marginTop: 6 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  goldBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 12 },
  evidence: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 },
});
