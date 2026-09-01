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
 *
 * These are the REAL Google Play subscription Product IDs.
 *
 * Google Play structure:
 *
 * zion_advanced
 *   ├── monthly  -> R80
 *   └── yearly   -> R300
 *
 * zion_expert
 *   ├── monthly  -> R150
 *   └── yearly   -> R500
 */
const PRODUCT_IDS = {
  advanced: 'zion_advanced',
  expert: 'zion_expert',
} as const;

/*
 * Maps Google Play subscription Product IDs to our
 * internal subscription tiers.
 */
const PRODUCT_TO_TIER: Record<
  string,
  SubscriptionTier
> = {
  [PRODUCT_IDS.advanced]: 'advanced',
  [PRODUCT_IDS.expert]: 'expert',
};

const STORAGE_KEY = '@zion_anatomy_subscription';

const SubscriptionContext =
  createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [subscription, setSubscription] =
    useState<Subscription>(defaultSubscription);

  const [loading, setLoading] = useState(true);

  const {
    connected: iapConnected,
    subscriptions: iapSubscriptions,
    fetchProducts,
    requestPurchase,
    finishTransaction,
    getAvailablePurchases,
  } = useIAP({
    /*
     * Purchase completed successfully.
     *
     * IMPORTANT:
     * For production, Google Play purchase tokens should be
     * verified by a secure backend before granting permanent
     * premium access.
     */
    onPurchaseSuccess: async (purchase) => {
      try {
        console.log(
          '[ZION IAP] Purchase received:',
          purchase.productId
        );

        const productId = purchase.productId;

        const tier = PRODUCT_TO_TIER[productId];

        if (!tier) {
          console.warn(
            '[ZION IAP] Unknown subscription product:',
            productId
          );
          return;
        }

        /*
         * Determine the billing cycle from the Android
         * subscription offer that was purchased.
         *
         * Google Play identifies the actual base plan
         * through the offer/base-plan information.
         */
        let billingCycle: BillingCycle = 'monthly';

        const purchaseAny = purchase as any;

        const purchasedOffer =
          purchaseAny.subscriptionOfferDetailsAndroid ??
          purchaseAny.offerDetailsAndroid ??
          purchaseAny.offerDetails ??
          [];

        if (Array.isArray(purchasedOffer)) {
          const offerText = JSON.stringify(purchasedOffer).toLowerCase();

          if (
            offerText.includes('year') ||
            offerText.includes('annual')
          ) {
            billingCycle = 'yearly';
          }
        }

        /*
         * Temporary local entitlement cache.
         *
         * The real Google Play subscription status should
         * eventually be verified server-side.
         */
        const now = new Date();
        const endDate = new Date();

        if (billingCycle === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const newSubscription: Subscription = {
          tier,
          billingCycle,
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
         * Subscriptions are not consumables.
         */
        await finishTransaction({
          purchase,
          isConsumable: false,
        });

        console.log(
          '[ZION IAP] Transaction finished successfully.'
        );
      } catch (error) {
        console.error(
          '[ZION IAP] Error processing purchase:',
          error
        );
      }
    },

    onPurchaseError: (error) => {
      console.error(
        '[ZION IAP] Purchase error:',
        error
      );
    },
  });

  /*
   * Load locally cached subscription.
   */
  useEffect(() => {
    loadSubscription();
  }, []);

  /*
   * Load the actual Google Play subscription products.
   */
  useEffect(() => {
    if (!iapConnected || Platform.OS !== 'android') {
      return;
    }

    loadIAPProducts();
  }, [iapConnected]);

  /*
   * Restore previous purchases.
   */
  useEffect(() => {
    if (!iapConnected || Platform.OS !== 'android') {
      return;
    }

    restorePurchases();
  }, [iapConnected]);

  /*
   * Load local subscription cache.
   */
  const loadSubscription = async () => {
    try {
      const stored =
        await AsyncStorage.getItem(STORAGE_KEY);

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

  /*
   * Fetch the two REAL Google Play subscriptions.
   */
  const loadIAPProducts = async () => {
    try {
      await fetchProducts({
        skus: [
          PRODUCT_IDS.advanced,
          PRODUCT_IDS.expert,
        ],
        type: 'subs',
      });

      console.log(
        '[ZION IAP] Google Play subscriptions loaded:',
        [
          PRODUCT_IDS.advanced,
          PRODUCT_IDS.expert,
        ]
      );
    } catch (error) {
      console.error(
        '[ZION IAP] Failed to load subscriptions:',
        error
      );
    }
  };

  /*
   * Restore previous Google Play purchases.
   */
  const restorePurchases = async () => {
    try {
      const purchases = await getAvailablePurchases();

      if (!purchases || purchases.length === 0) {
        return;
      }

      /*
       * Find a purchase belonging to one of our
       * real Google Play subscription products.
       */
      const validPurchase = [...purchases]
        .reverse()
        .find(
          (purchase) =>
            PRODUCT_TO_TIER[purchase.productId]
        );

      if (!validPurchase) {
        return;
      }

      const productId = validPurchase.productId;

      const tier =
        PRODUCT_TO_TIER[productId];

      if (!tier) {
        return;
      }

      /*
       * If we already have a valid local entitlement
       * for this product, keep it.
       */
      const stored =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (stored) {
        try {
          const parsed: Subscription =
            JSON.parse(stored);

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
          // Rebuild entitlement below.
        }
      }

      /*
       * Determine cycle from the available subscription
       * information when possible.
       */
      let billingCycle: BillingCycle = 'monthly';

      const purchaseAny =
        validPurchase as any;

      const purchaseText =
        JSON.stringify(purchaseAny).toLowerCase();

      if (
        purchaseText.includes('year') ||
        purchaseText.includes('annual')
      ) {
        billingCycle = 'yearly';
      }

      const now = new Date();
      const endDate = new Date();

      if (billingCycle === 'monthly') {
        endDate.setMonth(
          endDate.getMonth() + 1
        );
      } else {
        endDate.setFullYear(
          endDate.getFullYear() + 1
        );
      }

      const restoredSubscription: Subscription = {
        tier,
        billingCycle,
        startDate: now.toISOString(),
        endDate: endDate.toISOString(),
        isActive: true,
        productId,
        purchaseToken:
          validPurchase.purchaseToken,
      };

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          restoredSubscription
        )
      );

      setSubscription(
        restoredSubscription
      );
    } catch (error) {
      console.error(
        '[ZION IAP] Error restoring purchases:',
        error
      );
    }
  };

  /*
   * Start a REAL Google Play subscription purchase.
   *
   * IMPORTANT:
   *
   * tier + cycle are converted into:
   *
   * Advanced monthly -> zion_advanced + monthly offer
   * Advanced yearly  -> zion_advanced + yearly offer
   * Expert monthly   -> zion_expert + monthly offer
   * Expert yearly    -> zion_expert + yearly offer
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
        ? PRODUCT_IDS.advanced
        : PRODUCT_IDS.expert;

    /*
     * Find the Google Play subscription product.
     */
    let subscriptionProduct =
      iapSubscriptions.find(
        (product) =>
          product.id === productId
      );

    /*
     * If it wasn't loaded yet, request it again.
     */
    if (!subscriptionProduct) {
      await fetchProducts({
        skus: [productId],
        type: 'subs',
      });

      /*
       * The hook updates iapSubscriptions
       * asynchronously, so the user may need to
       * retry if the product was not available yet.
       */
      subscriptionProduct =
        iapSubscriptions.find(
          (product) =>
            product.id === productId
        );
    }

    if (!subscriptionProduct) {
      throw new Error(
        `Google Play subscription "${productId}" was not found.`
      );
    }

    /*
     * Google Play returns the available base plans
     * as subscription offers.
     */
    const offers =
      (
        subscriptionProduct as any
      ).subscriptionOfferDetailsAndroid ??
      [];

    if (!offers.length) {
      throw new Error(
        `No Google Play offers are available for "${productId}". Make sure the base plans are active.`
      );
    }

    /*
     * Try to find the requested base plan.
     *
     * Google Play normally exposes basePlanId
     * inside the offer details.
     */
    const matchingOffer =
      offers.find((offer: any) => {
        const basePlanId =
          offer.basePlanId ??
          offer.basePlanID ??
          offer.basePlan;

        return (
          basePlanId === cycle
        );
      }) ?? offers[0];

    const offerToken =
      matchingOffer?.offerToken;

    if (!offerToken) {
      throw new Error(
        `Google Play did not provide an offer token for ${productId} (${cycle}).`
      );
    }

    console.log(
      `[ZION IAP] Starting purchase: ${productId} / ${cycle}`
    );

    /*
     * Open the REAL Google Play billing screen.
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
   * Clear only the local subscription cache.
   *
   * This does NOT cancel the Google Play subscription.
   */
  const cancelSubscription = async () => {
    try {
      await AsyncStorage.removeItem(
        STORAGE_KEY
      );

      setSubscription(
        defaultSubscription
      );
    } catch (error) {
      console.error(
        '[ZION IAP] Error clearing local subscription:',
        error
      );

      throw error;
    }
  };

  /*
   * Access control.
   */
  const hasAccess = (
    requiredLevel: string
  ): boolean => {
    const levelHierarchy: Record<
      string,
      number
    > = {
      beginner: 1,
      intermediate: 2,
      advanced: 3,
      expert: 4,
    };

    const tierAccess: Record<
      SubscriptionTier,
      number
    > = {
      free: 2,
      advanced: 3,
      expert: 4,
    };

    /*
     * Free users:
     * beginner + intermediate
     */
    if (!subscription.isActive) {
      return (
        requiredLevel === 'beginner' ||
        requiredLevel === 'intermediate'
      );
    }

    const requiredAccess =
      levelHierarchy[
        requiredLevel
      ] ?? 1;

    const userAccess =
      tierAccess[
        subscription.tier
      ];

    return (
      userAccess >= requiredAccess
    );
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
  const context =
    useContext(
      SubscriptionContext
    );

  if (!context) {
    throw new Error(
      'useSubscription must be used within SubscriptionProvider'
    );
  }

  return context;
};
```
