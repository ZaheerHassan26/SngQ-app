// ForgotPasswordScreen.js – phone-based (API: forgot-password)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { forgotPasswordPhoneApi } from '../../utils/Apis';
import { validatePhoneForCountry } from '../../utils/phoneValidation';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const { width } = Dimensions.get('window');

const ForgotPassOne = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState('');

  const { control, handleSubmit, setError } = useForm({
    defaultValues: { phone: '' },
  });

  const onSubmit = data => {
    setApiError('');
    const phoneTrimmed = (data.phone || '').trim();
    const validation = validatePhoneForCountry(phoneTrimmed, countryCode, callingCode);
    if (!validation.valid) {
      setError('phone', { type: 'manual', message: validation.message });
      return;
    }
    forgotPasswordPhoneApi(
      `+${callingCode}`,
      phoneTrimmed,
      setLoader,
      navigation,
      errors => setError('phone', { type: 'manual', message: errors?.phone || errors?.form || '' }),
    );
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      blurRadius={6}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <AuthHeader title="Forgot Password" onBack={() => navigation.goBack()} />

          <View style={styles.content}>
            <Text style={styles.title}>Enter your phone number</Text>
            <Text style={styles.subtitle}>
              We will send you a one time code on your phone
            </Text>

            <Controller
              control={control}
              name="phone"
              rules={{ required: 'Phone number is required' }}
              render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
                <PhoneInput
                  value={value}
                  onChangeText={onChange}
                  countryCode={countryCode}
                  callingCode={callingCode}
                  onSelectCountry={country => {
                    setCountryCode(country.cca2);
                    setCallingCode(country.callingCode[0] || '1');
                  }}
                  error={fieldError?.message || apiError}
                  label="Phone"
                  placeholder="1234567890"
                />
              )}
            />

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.buttonWrapper}
              disabled={loader}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#255A3B', '#3DA8A1']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                {loader ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Submit</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgotPassOne;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  content: {
    marginTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 40,
    marginBottom: 5,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 30,
    fontFamily: 'Urbanist-Medium',
  },
  buttonWrapper: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: width * 0.9,
    maxWidth: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
});
