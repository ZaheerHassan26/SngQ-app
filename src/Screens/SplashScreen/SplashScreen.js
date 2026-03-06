import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  ImageBackground,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileApi, getPostLoginRedirect } from '../../utils/Apis';

const SPLASH_DELAY_MS = 2000;

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.userReducer?.token ?? '');

  useEffect(() => {
    const hasValidToken = typeof token === 'string' && token.trim().length > 0;

    const timer = setTimeout(() => {
      if (!hasValidToken) {
        navigation.replace('IntroScreen');
        return;
      }
      getProfileApi(dispatch)
        .then(data => {
          const redirect = getPostLoginRedirect(data);
          navigation.replace(redirect.screen, redirect.params);
        })
        .catch(() => {
          navigation.replace('IntroScreen');
        });
    }, SPLASH_DELAY_MS);

    return () => clearTimeout(timer);
  }, [navigation, token, dispatch]);

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Image
          source={require('../../Assets/IMAGES/logo2.png')}
          style={styles.logo}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
