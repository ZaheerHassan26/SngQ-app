import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Platform,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { verifyOtpApi, resendOtpApi } from '../../utils/Apis';
import AuthHeader from '../../components/AuthHeader/AuthHeader';

const RESEND_COOLDOWN_SECONDS = 60;

const OtpVerificationScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const params = route?.params || {};
  const phone = params.phone || '';
  const callingCode = params.callingCode || '1';
  const countryCodeForApi = callingCode.startsWith('+') ? callingCode : `+${callingCode}`;

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const intervalRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendCooldown <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [resendCooldown]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    if (text.length > 1) {
      const digits = text.replace(/\D/g, '').slice(0, 6).split('');
      digits.forEach((d, i) => {
        if (index + i < 6) newOtp[index + i] = d;
      });
      setOtp(newOtp);
      const lastFilled = Math.min(index + digits.length, 6) - 1;
      if (lastFilled < 5) {
        inputRefs.current[lastFilled + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
      return;
    }
    if (text.length === 1) {
      newOtp[index] = text;
      setOtp(newOtp);
      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    } else if (text === '') {
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const otpString = otp.join('').trim();
  const handleVerify = () => {
    if (otpString.length !== 6) {
      setError('Please enter 6-digit OTP.');
      return;
    }
    verifyOtpApi(
      countryCodeForApi,
      phone,
      otpString,
      dispatch,
      navigation,
      setLoader,
      errors =>
        setError(
          errors?.otp ||
            errors?.country_code ||
            errors?.phone ||
            errors?.form ||
            '',
        ),
    );
  };


  const handleResend = () => {
    if (resendCooldown > 0 || resendLoading) return;
    resendOtpApi(
      countryCodeForApi,
      phone,
      setResendLoading,
      errors =>
        setError(
          errors?.otp ||
            errors?.country_code ||
            errors?.phone ||
            errors?.form ||
            '',
        ),
      setSuccessMsg,
    );
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.bgImage}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.container}>
        <AuthHeader title="Verify OTP" onBack={() => navigation.goBack()} />

        {/* OTP Text */}
        <View style={styles.textContainer}>

          <Text style={styles.title}>Enter the OTP</Text>
          <Text style={styles.subtitle}>
            Please enter the OTP sent on your Email
          </Text>
        </View>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={el => (inputRefs.current[index] = el)}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={text => handleChange(text, index)}
            />
          ))}
        </View>

        {error ? (
          <Text style={styles.validationError}>{error}</Text>
        ) : null}
        {successMsg ? (
          <Text style={{ color: '#5DAD92', marginBottom: 8, fontSize: 14 ,marginHorizontal:10}}>
            {successMsg}
          </Text>
        ) : null}

        {/* Submit Button */}
        <View style={{ gap: 20, marginTop: '100%' }}>
          <TouchableOpacity
            onPress={handleVerify}
            disabled={loader || otpString.length !== 6}
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
          <TouchableOpacity
            onPress={handleResend}
            activeOpacity={0.8}
            disabled={resendLoading || resendCooldown > 0}
            style={styles.sendAgainTouch}
          >

            {resendLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.sendAgainText}>
                {resendCooldown > 0
                  ? `Send Again (${resendCooldown}s)`
                  : 'Send Again'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    gap: Platform.OS === 'ios' ? 70 : 38,
  },
  backButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleContainer: {
    marginLeft: Platform.OS === 'ios' ? 12 : 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  textContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'Urbanist-Medium',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    gap: Platform.OS === 'ios' ? 1 : 5,
  },
  otpInput: {
    width: 53,
    height: 53,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sendAgainButton: {
    marginTop: 16,
  },
  sendAgainGradient: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  sendAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  signInBtn: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  sendAgainTouch: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF1A',
  },
  sendAgainBtn: {
    width: '100%',
    height: 55,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  sendAgainBtnDisabled: {
    opacity: 0.9,
  },
  sendAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  validationError: {
    color: '#FF0000',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
});
