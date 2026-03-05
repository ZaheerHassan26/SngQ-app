// OtpVerificationScreen.js
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const ForgotPassTwo = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input automatically
    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Enter the OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the OTP sent on your Email
        </Text>

        <Text style={styles.label}>OTP</Text>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={styles.otpInput}
              value={digit}
              onChangeText={text => handleChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
            />
          ))}
        </View>

        {/* Submit button */}
        <TouchableOpacity
          onPress={() => navigation?.navigate('ForgotPassThree')}
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={['#5DAD92', '#2F5749']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Send Again button */}
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.outlineButtonText}>Send Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
  content: {
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    backgroundColor: '#161B22',
    borderRadius: 10,
    width: 50,
    height: 55,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#424E6E',
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#3BA776',
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    marginTop: 25,
    width: width * 0.9,
  },
  outlineButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
