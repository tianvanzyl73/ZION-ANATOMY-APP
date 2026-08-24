import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type SubscriptionTier = 'free' | 'advanced' | 'expert';
export type BillingCycle = 'monthly' | 'yearly';

export interface Subscription {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface SubscriptionContextType {
  subscription: Subscription;
  loading: boolean;
  upgradeSubscription: (tier: SubscriptionTier, cycle: BillingCycle) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  hasAccess: (requiredLevel: string) => boolean;
  isPremium: boolean;
}

const defaultSubscription: Subscription = {
  tier: 'free',
  billingCycle: 'monthly',
  startDate: '',
  endDate: '',
  isActive: false,
};

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<Subscription>(defaultSubscription);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem('@zion_anatomy_subscription');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if subscription is still active
        if (parsed.endDate && new Date(parsed.endDate) > new Date()) {
          setSubscription(parsed);
        } else {
          setSubscription(defaultSubscription);
        }
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const upgradeSubscription = async (tier: SubscriptionTier, cycle: BillingCycle) => {
    const now = new Date();
    const endDate = new Date();
    
    if (cycle === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const newSubscription: Subscription = {
      tier,
      billingCycle: cycle,
      startDate: now.toISOString(),
      endDate: endDate.toISOString(),
      isActive: true,
    };

    try {
      await AsyncStorage.setItem('@zion_anatomy_subscription', JSON.stringify(newSubscription));
      setSubscription(newSubscription);
    } catch (error) {
      console.error('Error saving subscription:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      await AsyncStorage.removeItem('@zion_anatomy_subscription');
      setSubscription(defaultSubscription);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  };

  const hasAccess = (requiredLevel: string): boolean => {
    if (!subscription.isActive) {
      return requiredLevel === 'beginner' || requiredLevel === 'intermediate';
    }

    const levelHierarchy = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };

    const tierAccess = {
      free: 2, // Can access beginner and intermediate
      advanced: 3, // Can access up to advanced
      expert: 4, // Can access everything
    };

    const requiredAccess = levelHierarchy[requiredLevel as keyof typeof levelHierarchy] || 1;
    const userAccess = tierAccess[subscription.tier];

    return userAccess >= requiredAccess;
  };

  const isPremium = subscription.tier !== 'free' && subscription.isActive;

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        upgradeSubscription,
        cancelSubscription,
        hasAccess,
        isPremium,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
