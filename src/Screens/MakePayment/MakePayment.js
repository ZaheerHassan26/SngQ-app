// PaymentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  confirmPlatformPayPayment,
  initStripe,
  isPlatformPaySupported,
} from '@stripe/stripe-react-native';
import {
  completePackagePaymentApi,
  createPackagePaymentIntentApi,
  showApiErrorToast,
} from '../../utils/Apis';
import {
  STRIPE_MERCHANT_COUNTRY_CODE,
  STRIPE_MERCHANT_IDENTIFIER,
  STRIPE_PUBLISHABLE_KEY,
} from '../../config/api';
const { width } = Dimensions.get('window');

const MakePayment = ({ navigation, route }) => {
  const selectedPackage = route?.params?.selectedPackage ?? null;
  const packageTitle = selectedPackage?.title || 'Selected Plan';
  const packageAmount = Number(selectedPackage?.monthly_price ?? 0);

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(
    Platform.OS === 'ios' ? 'apple_pay' : 'google_pay',
  );
  const [processing, setProcessing] = useState(false);
  const [stripeReady, setStripeReady] = useState(false);
  const [error, setError] = useState('');

  const isGooglePayAvailable = Platform.OS === 'android';
  const isApplePayAvailable = Platform.OS === 'ios';

  const formatPrice = value => {
    if (!Number.isFinite(value) || value <= 0) return 'Free';
    return `$${value.toFixed(2)}`;
  };

  const setupStripeIfNeeded = async () => {
    if (stripeReady) return;
    if (!STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key is not configured.');
    }
    await initStripe({
      publishableKey: STRIPE_PUBLISHABLE_KEY,
      merchantIdentifier: STRIPE_MERCHANT_IDENTIFIER,
    });
    setStripeReady(true);
  };

  const completeAndGoHome = async ({
    paymentMethod,
    paymentIntentId,
    packageSlug,
  }) => {
    await completePackagePaymentApi({
      package_slug: packageSlug,
      payment_method: paymentMethod,
      payment_intent_id: paymentIntentId,
    });

    Alert.alert('Payment Successful', 'Your plan is now active.');
    navigation?.reset({
      index: 0,
      routes: [{ name: 'MainStack' }],
    });
  };

  const processPlatformMerchantPayment = async method => {
    if (!selectedPackage?.slug) {
      throw new Error('Please select a package to continue.');
    }

    await setupStripeIfNeeded();

    const supportParams =
      method === 'apple_pay'
        ? {
            applePay: {
              merchantCountryCode: STRIPE_MERCHANT_COUNTRY_CODE,
            },
          }
        : {
            googlePay: {
              testEnv: __DEV__,
            },
          };

    const supported = await isPlatformPaySupported(supportParams);
    if (!supported) {
      throw new Error(
        method === 'apple_pay'
          ? 'Apple Pay is not available on this device.'
          : 'Google Pay is not available on this device.',
      );
    }

    const intent = await createPackagePaymentIntentApi({
      package_slug: selectedPackage.slug,
      payment_method: method,
      platform: Platform.OS,
    });

    if (!intent?.clientSecret) {
      throw new Error('Payment intent client secret is missing.');
    }

    const amountForWallet = Number.isFinite(packageAmount) && packageAmount > 0
      ? packageAmount.toFixed(2)
      : '0.00';

    const confirmParams =
      method === 'apple_pay'
        ? {
            applePay: {
              merchantCountryCode: STRIPE_MERCHANT_COUNTRY_CODE,
              currencyCode: 'USD',
              cartItems: [
                {
                  label: packageTitle,
                  amount: amountForWallet,
                  paymentType: 'Immediate',
                },
              ],
            },
          }
        : {
            googlePay: {
              testEnv: __DEV__,
              merchantCountryCode: STRIPE_MERCHANT_COUNTRY_CODE,
              currencyCode: 'USD',
              merchantName: 'Chemistry XO',
            },
          };

    const result = await confirmPlatformPayPayment(
      intent.clientSecret,
      confirmParams,
    );

    if (result?.error) {
      throw new Error(result.error.message || 'Payment confirmation failed.');
    }

    await completeAndGoHome({
      paymentMethod: method,
      paymentIntentId: intent.paymentIntentId,
      packageSlug: selectedPackage.slug,
    });
  };

  const handleProceed = async () => {
    if (processing) return;

    if (selectedMethod === 'google_pay' && !isGooglePayAvailable) {
      setError('Google Pay is available on Android devices only.');
      return;
    }
    if (selectedMethod === 'apple_pay' && !isApplePayAvailable) {
      setError('Apple Pay is available on iOS devices only.');
      return;
    }

    if (selectedMethod === 'card' && (!name || !cardNumber || !cvv)) {
      setError('Please enter card details to continue.');
      return;
    }

    setError('');
    setProcessing(true);
    try {
      if (selectedMethod === 'google_pay' || selectedMethod === 'apple_pay') {
        await processPlatformMerchantPayment(selectedMethod);
      } else {
        Alert.alert('Payment Successful', 'Your plan is now active.');
        navigation?.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
      }
    } catch (paymentError) {
      showApiErrorToast(paymentError, 'Payment failed. Please try again.');
      setError(paymentError?.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Make Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.packageCard}>
        <Text style={styles.packageTitle}>{packageTitle}</Text>
        <Text style={styles.packageAmount}>{formatPrice(packageAmount)}</Text>
      </View>

      <Text style={styles.sectionLabel}>Select Payment Merchant</Text>

      <View style={styles.methodRow}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.methodBtn,
            selectedMethod === 'google_pay' && styles.methodBtnActive,
            !isGooglePayAvailable && styles.methodBtnDisabled,
          ]}
          onPress={() => setSelectedMethod('google_pay')}
        >
          <Text style={styles.methodBtnText}>Google Pay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[
            styles.methodBtn,
            selectedMethod === 'apple_pay' && styles.methodBtnActive,
            !isApplePayAvailable && styles.methodBtnDisabled,
          ]}
          onPress={() => setSelectedMethod('apple_pay')}
        >
          <Text style={styles.methodBtnText}>Apple Pay</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.methodBtn,
          selectedMethod === 'card' && styles.methodBtnActive,
          { marginTop: 10, marginBottom: 20 },
        ]}
        onPress={() => setSelectedMethod('card')}
      >
        <Text style={styles.methodBtnText}>Pay with Card</Text>
      </TouchableOpacity>

      {/* Input Fields */}
      {selectedMethod === 'card' ? (
        <View style={styles.form}>
          <Text style={styles.label}>Name on Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="#777"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Expiry</Text>
              <View style={styles.row}>
                <TextInput
                  style={[styles.inputSmall, { marginRight: 10 }]}
                  placeholder="00"
                  placeholderTextColor="#777"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={expiryMonth}
                  onChangeText={setExpiryMonth}
                />
                <TextInput
                  style={styles.inputSmall}
                  placeholder="00"
                  placeholderTextColor="#777"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={expiryYear}
                  onChangeText={setExpiryYear}
                />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.inputSmall}
                placeholder="Type here"
                placeholderTextColor="#777"
                secureTextEntry
                keyboardType="number-pad"
                maxLength={4}
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.merchantHint}>
          You will continue securely with {selectedMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'}.
        </Text>
      )}

      {/* Error */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        onPress={handleProceed}
        activeOpacity={0.8}
        style={{ marginBottom: 15, alignSelf: 'center', marginTop: 10 }}
        disabled={processing}
      >
        <LinearGradient
          colors={processing ? ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)'] : ['#5DAD92', '#2F5749']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signInBtn}
        >
          {processing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signInText}>
              {selectedMethod === 'card' ? 'Pay & Continue' : 'Continue with Merchant'}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Proceed Button */}
    </SafeAreaView>
  );
};

export default MakePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1423',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  packageCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  packageTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  packageAmount: {
    color: '#9DE0C8',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionLabel: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '600',
  },
  methodRow: {
    flexDirection: 'row',
    gap: 10,
  },
  methodBtn: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#424E6E',
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#0F1629',
  },
  methodBtnActive: {
    borderColor: '#5DAD92',
    backgroundColor: 'rgba(93,173,146,0.2)',
  },
  methodBtnDisabled: {
    opacity: 0.45,
  },
  methodBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 18,
  },
  merchantHint: {
    color: '#C9D0DD',
    marginBottom: 16,
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0F1629',
    borderRadius: 30,
    padding: 14,
    paddingVertical: 20,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#424E6E',
  },
  inputSmall: {
    flex: 1,
    backgroundColor: '#0F1629',
    borderRadius: 30,
    padding: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#424E6E',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF7A7A',
    marginTop: 6,
    marginBottom: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3AA276',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#3AA276',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
    marginTop: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
