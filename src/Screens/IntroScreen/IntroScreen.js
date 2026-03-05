import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const IntroScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
    >
      <View style={styles.content}>

        <Image
          source={require('../../Assets/IMAGES/logo2.png')}
          style={{ width: 84, height: 84, resizeMode: 'contain' }}
          resizeMode="contain"
        />
        <Image
          source={require('../../Assets/IMAGES/intro_group.png')}
          style={{ width: width * 0.9, height: 300, marginTop: '5%', alignSelf: "center" }}
        />


        <Text style={styles.title}>
          Designed for AI, curated for connection.
        </Text>
        <Text style={styles.description}>
          By tapping Sign in/Request invite you agree to our Terms of Service.
          Learn how we process your data in our Privacy Policy (and Cookies
          Policy).
        </Text>

        {/* Gradient Button */}
        <TouchableOpacity
          onPress={() => navigation?.navigate('LoginScreen')}
          activeOpacity={0.8}
          style={{}}
        >
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signInBtn}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation?.navigate('RequestInviteOne')}
          style={styles.requestBtn}
        >
          <Text style={styles.requestText}>Request Invite</Text>
        </TouchableOpacity>

        <Text style={styles.description2}>
          “Saige is an invite only membership. Click below to request access”
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  circleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#3ECF8E',
  },
  content: {
    marginTop: '20%',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: '10%',
    fontSize: 25,
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Urbanist-Medium',
  },
  description: {
    fontSize: 12,
    color: 'white',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: 'Urbanist-Regular',
  },
  description2: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    lineHeight: 20,
    marginHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 10 : 20,
    marginBottom: Platform.OS === 'android' ? 10 : 2,
    fontFamily: 'Urbanist-SemiBold',
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestBtn: {
    // borderWidth: 1.5,
    // borderColor: '#3ECF8E',
    width: width * 0.9,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    opacity: 1000000,
    justifyContent: 'center',
    marginTop: 10,
  },
  requestText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IntroScreen;
