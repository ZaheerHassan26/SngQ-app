import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { registerPhoneApi } from '../../utils/Apis';
import { validatePhoneForCountry } from '../../utils/phoneValidation';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import PhoneInput from '../../components/PhoneInput/PhoneInput';

const { width, height } = Dimensions.get('window');

const LoginWithPhone = ({ navigation }) => {
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
    registerPhoneApi(
      countryCode.toLowerCase(),
      `+${callingCode}`,
      phoneTrimmed,
      setLoader,
      navigation,
      errors => setApiError(errors?.phone || errors?.form || ''),
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
              <AuthHeader title="Login" onBack={() => navigation.goBack()} />

              <View style={styles.content}>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>Enter your Phone Number</Text>
                  <Text style={styles.subtitle}>
                    Add your number. We’ll send you a verification code so we know
                    you’re real.
                  </Text>
                </View>

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
                        label="Phone Number"
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
                  activeOpacity={0.8}
                  disabled={loader}
                >
                  <LinearGradient
                    colors={['#5DAD92', '#2F5749']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.signInBtn}
                  >
                    {loader ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.signInText}>Submit</Text>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 10,
  },
  pillContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 60,
  },
  pillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  loginBtn: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Regular',
  },
  textContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 10,
    lineHeight: 22,
    fontFamily: 'Urbanist-Medium',
  },
  signInBtn: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default LoginWithPhone;
