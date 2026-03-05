import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  loginApiFun,
  googleSignInApi,
  appleSignInApi,
} from '../../utils/Apis';
import { signInWithGoogle, signInWithApple, isAppleSignInAvailable } from '../../utils/socialAuth';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import FormInput from '../../components/FormInput/FormInput';

const { width } = Dimensions.get('window');

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const { control, handleSubmit, setError, clearErrors, watch } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(loginSchema),
  });

  const emailVal = watch('email');
  const passwordVal = watch('password');

  useEffect(() => {
    clearErrors('email');
  }, [emailVal]);

  useEffect(() => {
    clearErrors('password');
  }, [passwordVal]);

  const onLogin = data => {
    const setFieldErrors = errors => {
      if (!errors) return;
      const formMsg = errors.form;
      ['email', 'password'].forEach(field => {
        const msg = errors[field] || (field === 'password' ? formMsg : null);
        if (msg) setError(field, { type: 'manual', message: msg });
      });
    };
    loginApiFun(data.email, data.password, navigation, setLoader, dispatch, setFieldErrors);
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.background}
      blurRadius={6}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <AuthHeader title="Login" onBack={() => navigation.goBack()} />

          {/* Title */}
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            I am happy to see you back. You can continue from where you left
          </Text>

          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Johndeen@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            rightElement={
              <Icon
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="rgba(255,255,255,0.6)"
              />
            }
            onRightPress={() => setPasswordVisible(prev => !prev)}
          />

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassOne')}
            style={styles.forgotWrapper}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSubmit(onLogin)}
            activeOpacity={0.8}
            disabled={loader}
          >
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signInBtn}
            >
              {loader ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.signInText}>Sign In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or</Text>
            <View style={styles.line} />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity
            style={styles.socialBtn}
            onPress={async () => {
              try {
                const { idToken, email, name } = await signInWithGoogle();
                googleSignInApi(name, email, idToken, navigation, setLoader, dispatch);
              } catch (e) {
                if (e?.message !== 'Sign in canceled') {
                  showApiErrorToast(e, 'Google sign in failed. Please try again.');
                }
              }
            }}
            disabled={loader}
          >
            <Image
              source={require('../../Assets/IMAGES/google.png')}
              style={styles.icon}
            />
            <Text style={styles.socialText}>Continue With Google</Text>
          </TouchableOpacity>

          {isAppleSignInAvailable() && (
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={async () => {
                try {
                  const result = await signInWithApple();
                  if (result) {
                    appleSignInApi(
                      result.name,
                      result.email,
                      result.identityToken,
                      navigation,
                      setLoader,
                      dispatch,
                    );
                  }
                } catch (e) {
                  const isCancel = e?.code === '1001' ||
                    e?.message?.toLowerCase()?.includes('cancel');
                  if (!isCancel) {
                    showApiErrorToast(e, 'Apple sign in failed. Please try again.');
                  }
                }
              }}
              disabled={loader}
            >
              <Image
                source={require('../../Assets/IMAGES/apple.png')}
                style={styles.icon}
              />
              <Text style={styles.socialText}>Continue With Apple</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate('LoginWithPhone')}
            style={styles.socialBtn}
          >
            <Image
              source={require('../../Assets/IMAGES/phone.png')} // your logo
              style={styles.icon}
            />
            <Text style={styles.socialText}>Phone Number</Text>
          </TouchableOpacity>

          {/* Footer */}
          <TouchableOpacity
            onPress={() => navigation.navigate('RequestInviteOne')}
            style={styles.footer}
          >
            <Text style={styles.footerText}>
              Not a member?{' '}
              <Text style={styles.footerHighlight}>Request Invite</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 40,
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
  forgotWrapper: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    color: '#BFFFFF',
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  signInBtn: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    width: '35%',
  },
  orText: {
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 11,
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 15,
    resizeMode: 'contain',
  },
  socialText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',

    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  footerHighlight: {
    color: '#5DAD92',
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
});
