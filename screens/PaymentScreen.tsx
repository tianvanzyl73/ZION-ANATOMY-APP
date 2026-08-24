import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubscription, SubscriptionTier, BillingCycle } from '../contexts/SubscriptionContext';

export default function PaymentScreen({ navigation, route }: any) {
  const { tier, cycle } = route.params;
  const isDark = useColorScheme() === 'dark';
  const { upgradeSubscription } = useSubscription();
  const [processing, setProcessing] = useState(false);
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '').replace(/\D/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || '';
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handlePayment = async () => {
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      Alert.alert('Error', 'Please fill in all payment details');
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Error', 'Please enter a valid 16-digit card number');
      return;
    }

    if (cvv.length !== 3) {
      Alert.alert('Error', 'Please enter a valid 3-digit CVV');
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      await upgradeSubscription(tier as SubscriptionTier, cycle as BillingCycle);
      
      Alert.alert(
        'Payment Successful!',
        `Welcome to ZION ANATOMY ${tier.charAt(0).toUpperCase() + tier.slice(1)}! Your subscription is now active.`,
        [
          {
            text: 'Start Learning',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Unable to process payment. Please try again or use a different payment method.');
    } finally {
      setProcessing(false);
    }
  };

  const getPrice = () => {
    if (tier === 'advanced') {
      return cycle === 'monthly' ? 'R80' : 'R300';
    } else if (tier === 'expert') {
      return cycle === 'monthly' ? 'R150' : 'R500';
    }
    return 'Free';
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, isDark && styles.backButtonDark]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#1a1a2e'} />
          </TouchableOpacity>
          <Text style={[styles.title, isDark && styles.titleDark]}>Payment Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Order Summary */}
          <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
            <Text style={[styles.summaryTitle, isDark && styles.summaryTitleDark]}>
              Order Summary
            </Text>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>
                ZION ANATOMY {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Text>
              <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>
                {getPrice()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}>
                Billing Cycle
              </Text>
              <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]}>
                {cycle === 'monthly' ? 'Monthly' : 'Yearly'}
              </Text>
            </View>
            <View style={[styles.divider, isDark && styles.dividerDark]} />
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, isDark && styles.totalLabelDark]}>Total</Text>
              <Text style={[styles.totalValue, isDark && styles.totalValueDark]}>
                {getPrice()}
              </Text>
            </View>
          </View>

          {/* Payment Form */}
          <View style={[styles.formCard, isDark && styles.formCardDark]}>
            <Text style={[styles.formTitle, isDark && styles.formTitleDark]}>
              Payment Information
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>Cardholder Name</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="John Doe"
                placeholderTextColor={isDark ? '#666' : '#999'}
                value={cardholderName}
                onChangeText={setCardholderName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, isDark && styles.labelDark]}>Card Number</Text>
              <TextInput
                style={[styles.input, isDark && styles.inputDark]}
                placeholder="1234 5678 9012 3456"
                placeholderTextColor={isDark ? '#666' : '#999'}
                value={cardNumber}
                onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={[styles.label, isDark && styles.labelDark]}>Expiry Date</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="MM/YY"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={expiryDate}
                  onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={[styles.label, isDark && styles.labelDark]}>CVV</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark]}
                  placeholder="123"
                  placeholderTextColor={isDark ? '#666' : '#999'}
                  value={cvv}
                  onChangeText={(text) => setCvv(text.replace(/\D/g, '').substring(0, 3))}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          {/* Security Notice */}
          <View style={[styles.securityCard, isDark && styles.securityCardDark]}>
            <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[styles.securityTitle, isDark && styles.securityTitleDark]}>
                Secure Payment
              </Text>
              <Text style={[styles.securityText, isDark && styles.securityTextDark]}>
                Your payment information is encrypted and secure. We never store your card details.
              </Text>
            </View>
          </View>

          {/* Pay Button */}
          <TouchableOpacity
            style={[
              styles.payButton,
              processing && styles.payButtonDisabled,
              { backgroundColor: tier === 'expert' ? '#FFD700' : '#D4AF37' },
            ]}
            onPress={handlePayment}
            disabled={processing}
          >
            {processing ? (
              <Text style={styles.payButtonText}>Processing...</Text>
            ) : (
              <>
                <Ionicons name="lock-closed" size={18} color="#1a1a2e" />
                <Text style={styles.payButtonText}>Pay {getPrice()}</Text>
              </>
            )}
          </TouchableOpacity>

          <Text style={[styles.termsText, isDark && styles.termsTextDark]}>
            By completing this purchase, you agree to our Terms of Service and Privacy Policy.
            Your subscription will auto-renew unless cancelled at least 24 hours before the end
            of the current period.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryCardDark: {
    backgroundColor: '#1E1E3A',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  summaryTitleDark: {
    color: '#fff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryLabelDark: {
    color: '#999',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  summaryValueDark: {
    color: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8F0',
    marginVertical: 12,
  },
  dividerDark: {
    backgroundColor: '#2A2A4A',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  totalLabelDark: {
    color: '#fff',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  totalValueDark: {
    color: '#fff',
  },
  formCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  formCardDark: {
    backgroundColor: '#1E1E3A',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 16,
  },
  formTitleDark: {
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 6,
  },
  labelDark: {
    color: '#999',
  },
  input: {
    backgroundColor: '#F8F9FE',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  inputDark: {
    backgroundColor: '#0A0A0A',
    color: '#fff',
    borderColor: '#2A2A4A',
  },
  row: {
    flexDirection: 'row',
  },
  securityCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityCardDark: {
    backgroundColor: '#1A2E1A',
  },
  securityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 2,
  },
  securityTitleDark: {
    color: '#fff',
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  securityTextDark: {
    color: '#999',
  },
  payButton: {
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  payButtonDisabled: {
    opacity: 0.6,
  },
  payButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a1a2e',
    marginLeft: 8,
  },
  termsText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginHorizontal: 40,
    marginBottom: 40,
    lineHeight: 16,
  },
  termsTextDark: {
    color: '#666',
  },
});
