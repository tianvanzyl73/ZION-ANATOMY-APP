import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, Switch, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BorderRadius, FontSizes } from '../lib/theme';
import { getProgress, UserProgress, getLevelTitle, getLevelProgress, getXPForNextLevel, getSettings, saveSettings, Settings } from '../lib/store';
import { useSubscription } from '../contexts/SubscriptionContext';

export default function ProfileScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const t = isDark ? Colors.dark : Colors.light;
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const { subscription, isPremium, cancelSubscription } = useSubscription();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [p, s] = await Promise.all([getProgress(), getSettings()]);
    setProgress(p);
    setSettings(s);
  };

  const toggleDarkMode = async () => {
    if (!settings) return;
    const newSettings = { ...settings, darkMode: !settings.darkMode };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      'Cancel Subscription',
      'Are you sure you want to cancel your subscription? You will lose access to premium content at the end of your billing period.',
      [
        { text: 'Keep Subscription', style: 'cancel' },
        {
          text: 'Cancel Subscription',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelSubscription();
              Alert.alert('Success', 'Your subscription has been cancelled.');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel subscription. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (!progress || !settings) return null;

  const levelTitle = getLevelTitle(progress.level);
  const levelProg = getLevelProgress(progress.xp);
  const xpToNext = getXPForNextLevel(progress.xp);
  const accuracy = progress.totalAnswers > 0 ? Math.round((progress.correctAnswers / progress.totalAnswers) * 100) : 0;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: t.background }]} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backBtn, { backgroundColor: t.surface, borderColor: t.border }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={t.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: t.text }]}>Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={[styles.avatar, { backgroundColor: t.accent + '20' }]}>
            <Ionicons name="person" size={40} color={t.accent} />
          </View>
          <Text style={[styles.profileName, { color: t.text }]}>Anatomy Student</Text>
          <Text style={[styles.profileLevel, { color: t.accent }]}>Level {progress.level} • {levelTitle}</Text>
          <View style={[styles.xpBar, { backgroundColor: t.border }]}>
            <View style={[styles.xpFill, { width: `${levelProg * 100}%` }]} />
          </View>
          <Text style={[styles.xpText, { color: t.textTertiary }]}>{progress.xp} XP • {xpToNext} XP to next level</Text>
        </View>

        {/* Subscription Status */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Subscription</Text>
        <View style={[styles.subscriptionCard, { backgroundColor: t.surface, borderColor: isPremium ? t.accent : t.border }]}>
          {isPremium ? (
            <>
              <View style={styles.subscriptionHeader}>
                <View style={[styles.subscriptionIcon, { backgroundColor: subscription.tier === 'expert' ? '#FFD700' + '20' : '#D4AF37' + '20' }]}>
                  <Ionicons
                    name={subscription.tier === 'expert' ? 'trophy' : 'rocket'}
                    size={28}
                    color={subscription.tier === 'expert' ? '#FFD700' : '#D4AF37'}
                  />
                </View>
                <View style={styles.subscriptionInfo}>
                  <Text style={[styles.subscriptionTier, { color: t.text }]}>
                    {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)} Plan
                  </Text>
                  <Text style={[styles.subscriptionStatus, { color: '#4CAF50' }]}>
                    Active
                  </Text>
                </View>
              </View>
              
              <View style={[styles.subscriptionDivider, { backgroundColor: t.border }]} />
              
              <View style={styles.subscriptionDetails}>
                <View style={styles.subscriptionDetailRow}>
                  <Text style={[styles.subscriptionDetailLabel, { color: t.textTertiary }]}>
                    Billing Cycle
                  </Text>
                  <Text style={[styles.subscriptionDetailValue, { color: t.text }]}>
                    {subscription.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}
                  </Text>
                </View>
                <View style={styles.subscriptionDetailRow}>
                  <Text style={[styles.subscriptionDetailLabel, { color: t.textTertiary }]}>
                    Renews On
                  </Text>
                  <Text style={[styles.subscriptionDetailValue, { color: t.text }]}>
                    {formatDate(subscription.endDate)}
                  </Text>
                </View>
              </View>

              <View style={[styles.subscriptionDivider, { backgroundColor: t.border }]} />

              <TouchableOpacity
                style={styles.subscriptionAction}
                onPress={handleCancelSubscription}
              >
                <Ionicons name="close-circle" size={20} color="#FF5252" />
                <Text style={[styles.subscriptionActionText, { color: '#FF5252' }]}>
                  Cancel Subscription
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.subscriptionHeader}>
                <View style={[styles.subscriptionIcon, { backgroundColor: t.border }]}>
                  <Ionicons name="person" size={28} color={t.textTertiary} />
                </View>
                <View style={styles.subscriptionInfo}>
                  <Text style={[styles.subscriptionTier, { color: t.text }]}>Free Plan</Text>
                  <Text style={[styles.subscriptionStatus, { color: t.textTertiary }]}>
                    Limited Access
                  </Text>
                </View>
              </View>
              
              <View style={[styles.subscriptionDivider, { backgroundColor: t.border }]} />
              
              <Text style={[styles.subscriptionDescription, { color: t.textSecondary }]}>
                Upgrade to unlock advanced and expert-level content, case studies, and premium features.
              </Text>

              <TouchableOpacity
                style={[styles.upgradeButton, { backgroundColor: t.accent }]}
                onPress={() => navigation.navigate('Subscription')}
                activeOpacity={0.85}
              >
                <Ionicons name="rocket" size={20} color="#1a1a2e" />
                <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={[styles.statBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="flame" size={28} color="#FF6B6B" />
            <Text style={[styles.statValue, { color: t.text }]}>{progress.streak}</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Day Streak</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="trophy" size={28} color="#FFB300" />
            <Text style={[styles.statValue, { color: t.text }]}>{progress.totalQuizzes}</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Quizzes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="checkmark-circle" size={28} color="#00C853" />
            <Text style={[styles.statValue, { color: t.text }]}>{accuracy}%</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Accuracy</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: t.surface, borderColor: t.border }]}>
            <Ionicons name="book" size={28} color="#448AFF" />
            <Text style={[styles.statValue, { color: t.text }]}>{progress.completedTopics.length}</Text>
            <Text style={[styles.statLabel, { color: t.textTertiary }]}>Completed</Text>
          </View>
        </View>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Settings</Text>
        <View style={[styles.settingsCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="moon" size={22} color={t.accent} />
              <Text style={[styles.settingText, { color: t.text }]}>Dark Mode</Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleDarkMode}
              trackColor={{ false: t.border, true: t.accent }}
              thumbColor="#fff"
            />
          </View>
          <View style={[styles.settingDivider, { backgroundColor: t.border }]} />
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={22} color={t.accent} />
              <Text style={[styles.settingText, { color: t.text }]}>Notifications</Text>
            </View>
            <Switch
              value={settings.notifications}
              onValueChange={async (val) => {
                const newSettings = { ...settings, notifications: val };
                setSettings(newSettings);
                await saveSettings(newSettings);
              }}
              trackColor={{ false: t.border, true: t.accent }}
              thumbColor="#fff"
            />
          </View>
          <View style={[styles.settingDivider, { backgroundColor: t.border }]} />
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="volume-medium" size={22} color={t.accent} />
              <Text style={[styles.settingText, { color: t.text }]}>Sound Effects</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={async (val) => {
                const newSettings = { ...settings, soundEnabled: val };
                setSettings(newSettings);
                await saveSettings(newSettings);
              }}
              trackColor={{ false: t.border, true: t.accent }}
              thumbColor="#fff"
            />
          </View>
        </View>

        {/* Quick Links */}
        <Text style={[styles.sectionTitle, { color: t.text }]}>Quick Links</Text>
        <View style={[styles.linksCard, { backgroundColor: t.surface, borderColor: t.border }]}>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => navigation.navigate('Bookmarks')}
          >
            <Ionicons name="bookmark" size={22} color={t.accent} />
            <Text style={[styles.linkText, { color: t.text }]}>Bookmarked Topics</Text>
            <Ionicons name="chevron-forward" size={18} color={t.textTertiary} />
          </TouchableOpacity>
          <View style={[styles.linkDivider, { backgroundColor: t.border }]} />
          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="help-circle" size={22} color={t.accent} />
            <Text style={[styles.linkText, { color: t.text }]}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={18} color={t.textTertiary} />
          </TouchableOpacity>
          <View style={[styles.linkDivider, { backgroundColor: t.border }]} />
          <TouchableOpacity style={styles.linkRow}>
            <Ionicons name="information-circle" size={22} color={t.accent} />
            <Text style={[styles.linkText, { color: t.text }]}>About ZION ANATOMY</Text>
            <Ionicons name="chevron-forward" size={18} color={t.textTertiary} />
          </TouchableOpacity>
        </View>

        <Text style={[styles.version, { color: t.textTertiary }]}>ZION ANATOMY v2.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
  backBtn: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', borderWidth: 1 },
  headerTitle: { fontSize: FontSizes.lg, fontWeight: '700' },
  profileCard: { margin: 20, borderRadius: BorderRadius.xl, padding: 28, alignItems: 'center', borderWidth: 1 },
  avatar: { width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  profileName: { fontSize: FontSizes.xl, fontWeight: '700', marginBottom: 4 },
  profileLevel: { fontSize: FontSizes.md, fontWeight: '600', marginBottom: 16 },
  xpBar: { width: '100%', height: 6, borderRadius: 3, marginBottom: 8 },
  xpFill: { height: 6, borderRadius: 3, backgroundColor: '#D4AF37' },
  xpText: { fontSize: FontSizes.xs, fontWeight: '500' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  statBox: { width: '48%', borderRadius: BorderRadius.md, padding: 16, alignItems: 'center', borderWidth: 1, gap: 6 },
  statValue: { fontSize: FontSizes.xl, fontWeight: '800' },
  statLabel: { fontSize: FontSizes.xs, fontWeight: '500' },
  sectionTitle: { fontSize: FontSizes.lg, fontWeight: '700', paddingHorizontal: 20, marginBottom: 14 },
  settingsCard: { marginHorizontal: 20, borderRadius: BorderRadius.lg, borderWidth: 1, marginBottom: 24 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingText: { fontSize: FontSizes.md, fontWeight: '500' },
  settingDivider: { height: 1, marginHorizontal: 16 },
  linksCard: { marginHorizontal: 20, borderRadius: BorderRadius.lg, borderWidth: 1, marginBottom: 24 },
  linkRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  linkText: { flex: 1, fontSize: FontSizes.md, fontWeight: '500' },
  linkDivider: { height: 1, marginHorizontal: 16 },
  version: { textAlign: 'center', fontSize: FontSizes.xs, fontWeight: '500', marginTop: 20 },
  subscriptionCard: { marginHorizontal: 20, borderRadius: BorderRadius.lg, padding: 20, borderWidth: 2, marginBottom: 24 },
  subscriptionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subscriptionIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  subscriptionInfo: { flex: 1 },
  subscriptionTier: { fontSize: FontSizes.lg, fontWeight: '700', marginBottom: 2 },
  subscriptionStatus: { fontSize: FontSizes.sm, fontWeight: '600' },
  subscriptionDivider: { height: 1, marginVertical: 16 },
  subscriptionDetails: { gap: 12 },
  subscriptionDetailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  subscriptionDetailLabel: { fontSize: FontSizes.sm, fontWeight: '500' },
  subscriptionDetailValue: { fontSize: FontSizes.sm, fontWeight: '600' },
  subscriptionAction: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12 },
  subscriptionActionText: { fontSize: FontSizes.md, fontWeight: '600' },
  subscriptionDescription: { fontSize: FontSizes.md, lineHeight: 22, marginBottom: 16 },
  upgradeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  upgradeButtonText: { fontSize: FontSizes.md, fontWeight: '700', color: '#1a1a2e' },
});
