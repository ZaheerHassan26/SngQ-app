import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { googleSignInApi, appleSignInApi, showApiErrorToast } from '../../utils/Apis';
import { signInWithGoogle, signInWithApple, isAppleSignInAvailable } from '../../utils/socialAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

const RequestInviteOne = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.safeArea}>
      <AuthHeader title="Request Invite" onBack={() => navigation.goBack()} />
      </SafeAreaView>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Assets/IMAGES/logo2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Don't be shy... Tell us a little more about you so we can slide you
          that invite.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
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
            style={styles.button}
            disabled={loader}
          >
            <Image
              source={require('../../Assets/IMAGES/google.png')}
              style={styles.logo2}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Continue With Google</Text>
          </TouchableOpacity>

          {isAppleSignInAvailable() && (
            <TouchableOpacity
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
              style={styles.button}
              disabled={loader}
            >
              <Image
                source={require('../../Assets/IMAGES/apple.png')}
                style={styles.logo2}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Continue With Apple</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation?.navigate('LoginWithPhone')}
            style={styles.button}
            disabled={loader}
          >
            <Image
              source={require('../../Assets/IMAGES/phone.png')}
              style={styles.logo2}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Phone Number</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 10,
  },

  logo2: {
    width: 30,
    height: 30,
  },
  logoText: {
    color: '#fff',
    fontSize: 28,
    letterSpacing: 1,
  },
  content: {
    // alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 8,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: '#fff',
    // textAlign: 'center',
    fontSize: 13,
    marginBottom: 25,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    gap: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  iconApple: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  icon2: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
});

export default RequestInviteOne;
