// ForgotPasswordScreen.js – phone-based (API: forgot-password)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { forgotPasswordPhoneApi } from '../../utils/Apis';
import { validatePhoneForCountry } from '../../utils/phoneValidation';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const { width, height } = Dimensions.get('window');

const ForgotPassOne = ({ navigation }) => {
  const insets = useSafeAreaInsets();
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
      resizeMode="cover"
    >
      <Pressable style={styles.flex1} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.flex1}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView
            style={styles.flex1}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.container, { paddingTop: insets.top || (Platform.OS === 'ios' ? 60 : 15) }]}>
              <AuthHeader title="Forgot Password" onBack={() => navigation.goBack()} />

              <View style={styles.content}>
                <Text style={styles.title}>Enter your phone number</Text>
                <Text style={styles.subtitle}>
                  We will send you a one time code on your phone
                </Text>

                <View style={styles.phoneInputWrap}>
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
                </View>
              </View>

              <View style={styles.spacer} />

              <View style={[styles.buttonFooter, { paddingBottom: insets.bottom + 16 }]}>
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Pressable>
    </ImageBackground>
  );
};

export default ForgotPassOne;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  background: {
    flex: 1,
    width,
    height,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  content: {
    flexShrink: 0,
    marginTop: 40,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
    fontFamily: 'Urbanist-Medium',
  },
  phoneInputWrap: {
    marginTop: 24,
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  buttonFooter: {
    width: '100%',
  },
  button: {
    width: '100%',
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
