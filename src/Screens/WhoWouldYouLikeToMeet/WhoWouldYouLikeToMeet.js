import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader/OnboardingProgressHeader';
import { setRequestInviteData } from '../../redux/actions';

const WhoWouldYouLikeToMeet = ({ navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const name = (requestInviteData.name && String(requestInviteData.name).trim()) || 'there';

  const [selected, setSelected] = useState(
    requestInviteData.whoWouldYouLikeToMeet || null,
  );

  const options = [
    { id: 'male', label: 'Male', icon: 'male-outline' },
    { id: 'female', label: 'Female', icon: 'female-outline' },
    { id: 'nonbinary', label: 'Non-binary', icon: 'transgender-outline' },
    { id: 'everyone', label: "I'm open to everyone", icon: 'people-outline' },
  ];

  const isNextEnabled = selected !== null;

  const onNext = () => {
    dispatch(setRequestInviteData({ whoWouldYouLikeToMeet: selected }));
    navigation?.navigate('LookingForScreen');
  };

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

      <View style={styles.overlay}>
        <OnboardingProgressHeader
          screenName="WhoWouldYouLikeToMeet"
          onBack={() => navigation.goBack()}
        />

        {/* QUESTION */}
        <View style={styles.content}>
          <Text style={styles.question}>
            {name}, Who would you like to meet?
          </Text>

          {/* OPTIONS */}
          <View style={styles.optionsContainer}>
            {options.map(option => {
              const isSelectedOption = selected === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  activeOpacity={0.8}
                  onPress={() => setSelected(option.id)}
                >
                  {isSelectedOption ? (
                    <LinearGradient
                      colors={['#255A3B', '#3DA8A1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.optionButton1}
                    >
                      <View style={styles.optionContent}>
                        <Icon
                          name={option.icon}
                          size={18}
                          color="#fff"
                          style={styles.optionIcon}
                        />
                        <Text
                          style={[styles.optionText, styles.optionTextSelected]}
                        >
                          {option.label}
                        </Text>
                      </View>
                    </LinearGradient>
                  ) : (
                    <View style={styles.optionButton}>
                      <View style={styles.optionContent}>
                        <Icon
                          name={option.icon}
                          size={18}
                          color="rgba(255,255,255,0.6)"
                          style={styles.optionIcon}
                        />
                        <Text style={styles.optionText}>{option.label}</Text>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* NEXT BUTTON */}
        <TouchableOpacity
          disabled={!isNextEnabled}
          activeOpacity={0.8}
          onPress={onNext}
          style={{ marginBottom: 60 }}
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

export default WhoWouldYouLikeToMeet;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 60,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  question: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 10,
    width: '90%',
    fontFamily: 'Urbanist-Medium',
  },
  optionsContainer: {
    marginTop: '40%',
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionButton1: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 15,
    borderRadius: 60,
    alignItems: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  },
  optionText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  nextButton: {
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
  },
  nextButton1: {
    borderRadius: 60,
    alignItems: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center',
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
