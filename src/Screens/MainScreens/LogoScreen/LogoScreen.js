import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LogoScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation?.goBack()}
        style={styles.backArrow}
      >
        <Image
          source={require('../../../Assets/ICONS/back.png')} // replace with your logo path
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* Logo / AI Image */}
      <View style={styles.aiWrapper}>
        <Image
          source={require('../../../Assets/IMAGES/welcome.png')} // replace with your logo path
          style={styles.aiImage}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Welcome to <Text style={styles.highlight}>Chemistry XO</Text>
      </Text>

      {/* Description */}
      <Text style={styles.description}>
        where deeper connections are made{'\n'}
        possible through intention, insight, and{'\n'}
        technology.
      </Text>

      <Text style={styles.subText}>
        Let’s get to know you and help you find{'\n'}
        someone who truly aligns
      </Text>

      {/* Next Button */}
      <TouchableOpacity
        onPress={() => navigation?.navigate('LifestyleScreen')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

LogoScreen.navigationOptions = {
  tabBarVisible: false,
};

export default LogoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12151C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 30,
    left: 20,
    fontSize: 28,
    color: 'white',
  },
  aiWrapper: {
    marginBottom: 40,
    alignItems: 'center',
  },
  aiImage: {
    width: Platform.OS === 'android' ? 380 : 440,
    height: 280,
  },
  aiLabel: {
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
  },
  aiText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
    width: 200,
  },
  highlight: {
    color: '#5BBF9A',
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4BA07B',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '95%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
