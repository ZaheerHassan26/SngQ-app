import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { setRequestInviteData } from '../../redux/actions';

const RequestInvite = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    'LinkedIn or Instagram',
    'App Store Ads',
    'Tiktok',
    'Snapchat',
    'Other',
  ];

  const isNextEnabled = selectedOption !== null;

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={require('../../Assets/IMAGES/Icon.png')}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require('../../Assets/IMAGES/slogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>How did you hear about</Text>
        <Text style={styles.subtitle}>Saige</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedOption === option;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedOption(option)}
                activeOpacity={0.8}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#255A3B', '#3DA8A1']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.optionButton1, styles.optionSelected]}
                  >
                    <Text
                      style={[styles.optionText, styles.optionTextSelected]}
                    >
                      {option}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.optionButton}>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          disabled={!isNextEnabled}
          onPress={() => {
            dispatch(setRequestInviteData({ howDidYouHear: selectedOption }));
            navigation?.navigate('GenderSelection');
          }}
          activeOpacity={0.8}
          style={{ marginTop: Platform.OS === 'android' ? 40 : 100 }}
        >
          {isNextEnabled ? (
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextButton1}
            >
              <Text style={styles.nextText}>Next</Text>
            </LinearGradient>
          ) : (
            <View style={[styles.nextButton, styles.nextButtonDisabled]}>
              <Text style={styles.nextText}>Next</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default RequestInvite;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    borderRadius: 50,
    padding: 8,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginVertical: 20
  },
  title: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 20,
    fontFamily: 'Urbanist-Medium',
  },
  optionsContainer: {
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  optionButton1: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 60,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  optionSelected: {
    borderWidth: 0,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },
  nextButton1: {
    borderRadius: 60,
    // paddingVertical: 18,
    width: '100%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
});
