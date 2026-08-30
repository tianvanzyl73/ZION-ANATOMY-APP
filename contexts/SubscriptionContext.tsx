import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { useIAP } from 'expo-iap';

export type SubscriptionTier = 'free' | 'advanced' | 'expert';
export type BillingCycle = 'monthly' | 'yearly';

export interface Subscription {
  tier: SubscriptionTier;
  billingCycle: BillingCycle;
  startDate: string;
  endDate: string;
  isActive: boolean;
  productId?: string;
  purchaseToken?: string;
}

export interface SubscriptionContextType {
  subscription: Subscription;
  loading: boolean;
  upgradeSubscription: (
    tier: SubscriptionTier,
    cycle: BillingCycle
  ) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  hasAccess: (requiredLevel: string) => boolean;
  isPremium: boolean;
  iapConnected: boolean;
}

const defaultSubscription: Subscription = {
  tier: 'free',
  billingCycle: 'monthly',
  startDate: '',
  endDate: '',
  isActive: false,
};

/*
 * IMPORTANT:
 * These are temporary product IDs.
 *
 * Once you create the subscriptions in Google Play Console,
 * replace these four values with the EXACT Product IDs from Play Console.
 */
const PRODUCT_IDS = {
  advancedMonthly: 'advanced_monthly',
  advancedYearly: 'advanced_yearly',
  expertMonthly: 'expert_monthly',
  expertYearly: 'expert_yearly',
} as const;

const PRODUCT_TO_PLAN: Record<
  string,
  { tier: SubscriptionTier; cycle: BillingCycle }
> = {
  [PRODUCT_IDS.advancedMonthly]: {
    tier: 'advanced',
    cycle: 'monthly',
  },
  [PRODUCT_IDS.advancedYearly]: {
    tier: 'advanced',
    cycle: 'yearly',
  },
  [PRODUCT_IDS.expertMonthly]: {
    tier: 'expert',
    cycle: 'monthly',
  },
  [PRODUCT_IDS.expertYearly]: {
    tier: 'expert',
    cycle: 'yearly',
  },
};

const STORAGE_KEY = '@zion_anatomy_subscription';

const SubscriptionContext =
  createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [subscription, setSubscription] =
    useState<Subscription>(defaultSubscription);

  const [loading, setLoading] = useState(true);

  /*
   * Google Play / App Store connection.
   *
   * Purchase results are delivered through onPurchaseSuccess.
   */
  const {
    connected: iapConnected,
    subscriptions: iapSubscriptions,
    fetchProducts,
    requestPurchase,
    finishTransaction,
    getAvailablePurchases,
  } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      try {
        console.log(
          '[ZION IAP] Purchase received:',
          purchase.productId
        );

        const productId = purchase.productId;

        const plan = PRODUCT_TO_PLAN[productId];

        if (!plan) {
          console.warn(
            '[ZION IAP] Unknown subscription product:',
            productId
          );
          return;
        }

        /*
         * IMPORTANT:
         *
         * For production, this purchase must be verified on a secure
         * backend before premium access is permanently granted.
         *
         * We are storing the purchase locally here as an entitlement
         * cache so we can continue building/testing the Play Billing flow.
         */

        const now = new Date();
        const endDate = new Date();

        if (plan.cycle === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const newSubscription: Subscription = {
          tier: plan.tier,
          billingCycle: plan.cycle,
          startDate: now.toISOString(),
          endDate: endDate.toISOString(),
          isActive: true,
          productId,
          purchaseToken: purchase.purchaseToken,
        };

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(newSubscription)
        );

        setSubscription(newSubscription);

        /*
         * Subscriptions are NOT consumables.
         *
         * finishTransaction must be called after successful processing.
         */
        await finishTransaction({
          purchase,
          isConsumable: false,
        });

        console.log('[ZION IAP] Transaction finished successfully.');
      } catch (error) {
        console.error(
          '[ZION IAP] Error processing purchase:',
          error
        );
      }
    },

    onPurchaseError: (error) => {
      console.error('[ZION IAP] Purchase error:', error);
    },
  });

  /*
   * Load the locally cached subscription.
   */
  useEffect(() => {
    loadSubscription();
  }, []);

  /*
   * Load available subscriptions from Google Play.
   */
  useEffect(() => {
    if (!iapConnected || Platform.OS !== 'android') {
      return;
    }

    loadIAPProducts();
  }, [iapConnected]);

  /*
   * Restore previous purchases when the IAP connection is ready.
   */
  useEffect(() => {
    if (!iapConnected || Platform.OS !== 'android') {
      return;
    }

    restorePurchases();
  }, [iapConnected]);

  const loadSubscription = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      if (!stored) {
        setSubscription(defaultSubscription);
        return;
      }

      const parsed: Subscription = JSON.parse(stored);

      if (
        parsed.isActive &&
        parsed.endDate &&
        new Date(parsed.endDate) > new Date()
      ) {
        setSubscription(parsed);
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setSubscription(defaultSubscription);
      }
    } catch (error) {
      console.error(
        '[ZION IAP] Error loading subscription:',
        error
      );

      setSubscription(defaultSubscription);
    } finally {
      setLoading(false);
    }
  };

  const loadIAPProducts = async () => {
    try {
      await fetchProducts({
        skus: Object.values(PRODUCT_IDS),
        type: 'subs',
      });

      console.log(
        '[ZION IAP] Google Play subscriptions loaded.'
      );
    } catch (error) {
      console.error(
        '[ZION IAP] Failed to load subscriptions:',
        error
      );
    }
  };

  const restorePurchases = async () => {
    try {
      const purchases = await getAvailablePurchases();

      if (!purchases || purchases.length === 0) {
        return;
      }

      /*
       * Find the most recent ZION Anatomy subscription purchase.
       */
      const validPurchase = [...purchases]
        .reverse()
        .find((purchase) =>
          Object.prototype.hasOwnProperty.call(
            PRODUCT_TO_PLAN,
            purchase.productId
          )
        );

      if (!validPurchase) {
        return;
      }

      const productId = validPurchase.productId;
      const plan = PRODUCT_TO_PLAN[productId];

      if (!plan) {
        return;
      }

      const stored = await AsyncStorage.getItem(STORAGE_KEY);

      /*
       * If we already have a valid local entitlement, don't
       * overwrite it unnecessarily.
       */
      if (stored) {
        try {
          const parsed: Subscription = JSON.parse(stored);

          if (
            parsed.isActive &&
            parsed.productId === productId &&
            parsed.endDate &&
            new Date(parsed.endDate) > new Date()
          ) {
            setSubscription(parsed);
            return;
          }
        } catch {
          // Continue and rebuild the local entitlement.
        }
      }

      /*
       * Local restoration cache.
       *
       * Final production implementation should verify the
       * purchase token with Google Play on a secure backend.
       */
      const now = new Date();
      const endDate = new Date();

      if (plan.cycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const restoredSubscription: Subscription = {
        tier: plan.tier,
        billingCycle: plan.cycle,
        startDate: now.toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        productId,
        purchaseToken: validPurchase.purchaseToken,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(restoredSubscription)
      );

      setSubscription(restoredSubscription);
    } catch (error) {
      console.error(
        '[ZION IAP] Error restoring purchases:',
        error
      );
    }
  };

  /*
   * Start the REAL Google Play subscription purchase.
   */
  const upgradeSubscription = async (
    tier: SubscriptionTier,
    cycle: BillingCycle
  ) => {
    if (Platform.OS !== 'android') {
      throw new Error(
        'Google Play subscriptions are currently configured for Android.'
      );
    }

    if (!iapConnected) {
      throw new Error(
        'Google Play Billing is not connected. Please try again.'
      );
    }

    if (tier === 'free') {
      throw new Error(
        'The free plan cannot be purchased.'
      );
    }

    const productId =
      tier === 'advanced'
        ? cycle === 'monthly'
          ? PRODUCT_IDS.advancedMonthly
          : PRODUCT_IDS.advancedYearly
        : cycle === 'monthly'
          ? PRODUCT_IDS.expertMonthly
          : PRODUCT_IDS.expertYearly;

    /*
     * Find the subscription returned by Google Play.
     */
    const subscriptionProduct = iapSubscriptions.find(
      (product) => product.id === productId
    );

    if (!subscriptionProduct) {
      /*
       * Refresh the products once in case they were not loaded yet.
       */
      await fetchProducts({
        skus: Object.values(PRODUCT_IDS),
        type: 'subs',
      });

      throw new Error(
        `Subscription "${productId}" was not found in Google Play.`
      );
    }

    /*
     * Google Play requires an offer token for subscription purchases.
     */
    const offers =
      (subscriptionProduct as any)
        .subscriptionOfferDetailsAndroid ?? [];

    if (!offers.length) {
      throw new Error(
        `No Google Play subscription offer is available for "${productId}".`
      );
    }

    const offerToken = offers[0]?.offerToken;

    if (!offerToken) {
      throw new Error(
        `Google Play did not provide an offer token for "${productId}".`
      );
    }

    console.log(
      `[ZION IAP] Starting purchase: ${productId}`
    );

    /*
     * This opens the REAL Google Play billing interface.
     *
     * The result is handled by onPurchaseSuccess above.
     */
    await requestPurchase({
      request: {
        google: {
          skus: [productId],
          subscriptionOffers: [
            {
              sku: productId,
              offerToken,
            },
          ],
        },
      },
      type: 'subs',
    });
  };

  /*
   * Clear only the LOCAL cached entitlement.
   *
   * IMPORTANT:
   * This does NOT cancel the user's Google Play subscription.
   * Actual cancellation must happen through Google Play.
   */
  const cancelSubscription = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSubscription(defaultSubscription);
    } catch (error) {
      console.error(
        '[ZION IAP] Error clearing local subscription:',
        error
      );

      throw error;
    }
  };

  const hasAccess = (requiredLevel: string): boolean => {
    const levelHierarchy: Record<string, number> = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };

    const tierAccess: Record<SubscriptionTier, number> = {
      free: 2,
      advanced: 3,
      expert: 4,
    };

    /*
     * Free users get beginner/intermediate.
     */
    if (!subscription.isActive) {
      return (
        requiredLevel === 'beginner' ||
        requiredLevel === 'intermediate'
      );
    }

    const requiredAccess =
      levelHierarchy[requiredLevel] ?? 1;

    const userAccess =
      tierAccess[subscription.tier];

    return userAccess >= requiredAccess;
  };

  const isPremium =
    subscription.tier !== 'free' &&
    subscription.isActive;

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        loading,
        upgradeSubscription,
        cancelSubscription,
        hasAccess,
        isPremium,
        iapConnected,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      'useSubscription must be used within SubscriptionProvider'
    );
  }

  return context;
};
