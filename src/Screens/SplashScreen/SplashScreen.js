import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const { rememberme } = useSelector(state => state.userReducer);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('IntroScreen');
    }, 2000);
  }, []);

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
