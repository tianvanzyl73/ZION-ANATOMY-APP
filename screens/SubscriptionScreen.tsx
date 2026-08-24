import React, { useState } from 'react';
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
import { useSubscription, SubscriptionTier, BillingCycle } from '../contexts/SubscriptionContext';

export default function SubscriptionScreen({ navigation }: any) {
  const isDark = useColorScheme() === 'dark';
  const { subscription, upgradeSubscription } = useSubscription();
  const [selectedTier, setSelectedTier] = useState<SubscriptionTier>('advanced');
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>('monthly');
  const [processing, setProcessing] = useState(false);

  const handleUpgrade = async () => {
    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      await upgradeSubscription(selectedTier, selectedCycle);
      Alert.alert(
        'Success!',
        `Welcome to ZION ANATOMY ${selectedTier.charAt(0).toUpperCase() + selectedTier.slice(1)}! Your subscription is now active.`,
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to process subscription. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const getPrice = (tier: SubscriptionTier, cycle: BillingCycle) => {
    if (tier === 'advanced') {
      return cycle === 'monthly' ? 'R80' : 'R300';
    } else if (tier === 'expert') {
      return cycle === 'monthly' ? 'R150' : 'R500';
    }
    return 'Free';
  };

  const getSavings = (tier: SubscriptionTier) => {
    if (tier === 'advanced') {
      return 'Save R660/year';
    } else if (tier === 'expert') {
      return 'Save R1,300/year';
    }
    return '';
  };

  const features = {
    free: [
      'Beginner & Intermediate content',
      'Basic 3D Body Explorer',
      'Limited quiz access',
      'Basic search functionality',
    ],
    advanced: [
      'All Free features',
      'Advanced learning paths',
      'Full 3D Body Explorer',
      'Advanced quizzes & case studies',
      'Priority search results',
      'Offline access to advanced content',
      'Progress tracking & analytics',
    ],
    expert: [
      'All Advanced features',
      'Expert-level content',
      'Specialized courses (Sports Medicine, Biomechanics, Physics)',
      'Expert case studies & clinical scenarios',
      'AI Tutor advanced mode',
      'Custom learning paths',
      'Certificate of completion',
      'Priority support',
    ],
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, isDark && styles.backButtonDark]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#1a1a2e'} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.titleDark]}>Premium Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerSection}>
          <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
            Unlock Your Full Potential
          </Text>
          <Text style={[styles.description, isDark && styles.descriptionDark]}>
            Choose the plan that matches your learning goals
          </Text>
        </View>

        {/* Billing Cycle Toggle */}
        <View style={styles.cycleToggle}>
          <TouchableOpacity
            style={[
              styles.cycleButton,
              selectedCycle === 'monthly' && styles.cycleButtonActive,
              isDark && selectedCycle !== 'monthly' && styles.cycleButtonDark,
            ]}
            onPress={() => setSelectedCycle('monthly')}
          >
            <Text
              style={[
                styles.cycleButtonText,
                selectedCycle === 'monthly' && styles.cycleButtonTextActive,
                isDark && selectedCycle !== 'monthly' && styles.cycleButtonTextDark,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.cycleButton,
              selectedCycle === 'yearly' && styles.cycleButtonActive,
              isDark && selectedCycle !== 'yearly' && styles.cycleButtonDark,
            ]}
            onPress={() => setSelectedCycle('yearly')}
          >
            <Text
              style={[
                styles.cycleButtonText,
                selectedCycle === 'yearly' && styles.cycleButtonTextActive,
                isDark && selectedCycle !== 'yearly' && styles.cycleButtonTextDark,
              ]}
            >
              Yearly
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 37%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Subscription Tiers */}
        {(['advanced', 'expert'] as SubscriptionTier[]).map((tier) => (
          <TouchableOpacity
            key={tier}
            style={[
              styles.tierCard,
              isDark && styles.tierCardDark,
              selectedTier === tier && styles.tierCardSelected,
              selectedTier === tier && { borderColor: tier === 'expert' ? '#FFD700' : '#D4AF37' },
            ]}
            onPress={() => setSelectedTier(tier)}
          >
            {tier === 'expert' && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
              </View>
            )}

            <View style={styles.tierHeader}>
              <View style={styles.tierIconContainer}>
                <Ionicons
                  name={tier === 'advanced' ? 'rocket' : 'trophy'}
                  size={32}
                  color={tier === 'expert' ? '#FFD700' : '#D4AF37'}
                />
              </View>
              <View style={styles.tierInfo}>
                <Text style={[styles.tierName, isDark && styles.tierNameDark]}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </Text>
                <Text style={[styles.tierPrice, isDark && styles.tierPriceDark]}>
                  {getPrice(tier, selectedCycle)}
                  <Text style={styles.pricePeriod}>
                    /{selectedCycle === 'monthly' ? 'month' : 'year'}
                  </Text>
                </Text>
                {selectedCycle === 'yearly' && (
                  <Text style={styles.savingsText}>{getSavings(tier)}</Text>
                )}
              </View>
              {selectedTier === tier && (
                <Ionicons name="checkmark-circle" size={28} color={tier === 'expert' ? '#FFD700' : '#D4AF37'} />
              )}
            </View>

            <View style={styles.featuresList}>
              {features[tier].map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <Ionicons name="checkmark" size={18} color={tier === 'expert' ? '#FFD700' : '#D4AF37'} />
                  <Text style={[styles.featureText, isDark && styles.featureTextDark]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
        ))}

        {/* Current Subscription Info */}
        {subscription.isActive && (
          <View style={[styles.currentPlanCard, isDark && styles.currentPlanCardDark]}>
            <Ionicons name="information-circle" size={20} color="#6C63FF" />
            <Text style={[styles.currentPlanText, isDark && styles.currentPlanTextDark]}>
              Current Plan: {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
            </Text>
          </View>
        )}

        {/* Upgrade Button */}
        <TouchableOpacity
          style={[
            styles.upgradeButton,
            processing && styles.upgradeButtonDisabled,
            { backgroundColor: selectedTier === 'expert' ? '#FFD700' : '#D4AF37' },
          ]}
          onPress={handleUpgrade}
          disabled={processing}
        >
          <Text style={styles.upgradeButtonText}>
            {processing
              ? 'Processing...'
              : subscription.isActive
              ? 'Change Plan'
              : 'Subscribe Now'}
          </Text>
        </TouchableOpacity>

        <Text style={[styles.termsText, isDark && styles.termsTextDark]}>
          By subscribing, you agree to our Terms of Service and Privacy Policy.
          Subscription auto-renews unless cancelled.
        </Text>
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
    backgroundColor: '#0A0A0A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
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
  backButtonDark: {
    backgroundColor: '#1E1E3A',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  titleDark: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
    marginBottom: 8,
  },
  subtitleDark: {
    color: '#fff',
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  descriptionDark: {
    color: '#999',
  },
  cycleToggle: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cycleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cycleButtonActive: {
    backgroundColor: '#6C63FF',
  },
  cycleButtonDark: {
    backgroundColor: '#1E1E3A',
  },
  cycleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  cycleButtonTextActive: {
    color: '#fff',
  },
  cycleButtonTextDark: {
    color: '#999',
  },
  saveBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  saveBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  tierCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  tierCardDark: {
    backgroundColor: '#1E1E3A',
  },
  tierCardSelected: {
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 16,
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 1,
  },
  popularBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tierIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F8F9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tierInfo: {
    flex: 1,
  },
  tierName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 4,
  },
  tierNameDark: {
    color: '#fff',
  },
  tierPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  tierPriceDark: {
    color: '#fff',
  },
  pricePeriod: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  savingsText: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 2,
  },
  featuresList: {
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  featureTextDark: {
    color: '#ccc',
  },
  currentPlanCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#F0EEFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPlanCardDark: {
    backgroundColor: '#2A2A4A',
  },
  currentPlanText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
    marginLeft: 10,
  },
  currentPlanTextDark: {
    color: '#A5A0FF',
  },
  upgradeButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  upgradeButtonDisabled: {
    opacity: 0.6,
  },
  upgradeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  termsText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
    lineHeight: 18,
  },
  termsTextDark: {
    color: '#666',
  },
});
