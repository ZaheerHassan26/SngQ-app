import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

/**
 * Common header for auth flow screens: back button, center title pill, right spacer.
 * Use in LoginScreen, LoginWithPhone, OtpVerificationScreen, ForgotPassOne, etc.
 */
const AuthHeader = ({ title = '', onBack }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backTouch} onPress={onBack}>
        <Image
          source={require('../../Assets/IMAGES/Icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={styles.pillContainer}>
          <Text style={styles.pillText}>{title}</Text>
      </View>
      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backTouch: {
    padding: 8,
  },
  icon: {
    width: 40,
    height: 40,
  },
  pillContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 60,
  },
  pillText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  spacer: {
    width: 26,
  },
});

export default AuthHeader;
