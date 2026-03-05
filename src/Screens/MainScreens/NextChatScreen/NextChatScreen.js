import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const NextChatScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // gradient background image
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')} // your logo
              style={{
                width: 40,
                height: 40,
                marginRight: 15,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.headerTitleBg}>
              <Text style={styles.headerTitle}>Saige AI</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Image
              source={require('../../../Assets/IMAGES/thisssss.png')}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Center Holographic Image */}
        <View style={styles.centerImageContainer}>
          <Image
            source={require('../../../Assets/IMAGES/thissss.png')}
            style={styles.centerImage}
          />
        </View>

        {/* Intro Text */}
        <View style={styles.textContainer}>
          <Text style={styles.description}>
            Hey, I’m Saige! Your guide to better connections. Think of me as
            your personal matchmaker. The more real you are with me, the more
            intentional your matches will be. Are you ready to get started?
          </Text>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity>
            <View style={styles.smallircle}>
              <Image
                source={require('../../../Assets/IMAGES/thisss.png')}
                style={styles.smallIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation?.navigate('ChatScreen')}>
            <View style={styles.bigCicle}>
              <Image
                source={require('../../../Assets/IMAGES/thiss.png')}
                style={styles.bigIcon}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.smallircle}>
              <Image
                source={require('../../../Assets/IMAGES/this.png')}
                style={styles.smallIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleBg: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 15,
  },
  centerImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  centerImage: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
  },
  centerLabel: {
    position: 'absolute',
    color: '#C7DAD0',
    fontSize: 14,
    fontWeight: '500',
  },
  textContainer: {
    marginTop: 20,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'left',
    fontFamily: 'Urbanist-Medium',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  smallCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallIcon: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  bigCircle: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigIcon: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
});

export default NextChatScreen;
