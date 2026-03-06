import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFullOnboardingStep } from '../../config/requestInviteSteps';

/**
 * Shared onboarding header: back button + progress bar (X/10) + step text.
 * Use on GenderSelection, WhoWouldYouLikeToMeet, LookingForScreen, PhotoUpload, FacialScanScreen, ThankYouScreen.
 *
 * @param {string} screenName - Screen name for step (e.g. 'GenderSelection')
 * @param {function} onBack - Called when back is pressed (e.g. () => navigation.goBack())
 */
const OnboardingProgressHeader = ({ screenName, onBack }) => {
  const { stepIndex, totalSteps } = getFullOnboardingStep(screenName);
  const progressWidth = `${(stepIndex / totalSteps) * 100}%`;

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Image
          source={require('../../Assets/IMAGES/Icon.png')}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.progressWrapper}>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.stepText}>{`${stepIndex}/${totalSteps}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
  progressWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginRight: 10,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#7FE9C3',
    borderRadius: 2,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
});

export default OnboardingProgressHeader;
