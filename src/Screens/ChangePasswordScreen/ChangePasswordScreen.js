import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthHeader from '../../components/AuthHeader/AuthHeader';

const ChangePasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <AuthHeader title="Change Password" onBack={() => navigation.goBack()} />

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>Please set your new Password</Text>
        </View>

        {/* Password Input */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#ccc"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Change Password Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('OtpVerificationScreen')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#5DAD92', '#2F5749']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signInBtn}
          >
            <Text style={styles.signInText}>Change Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: Platform.OS === 'ios' ? 55 : 25,
  },
  backButton: {
    // width: 40,
    // height: 40,
    borderRadius: 20,
    // borderColor: 'rgba(255,255,255,0.3)',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    // borderWidth: 1,
  },
  loginText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: '#fff',
    marginTop: 6,
    fontFamily: 'Urbanist-Medium',
  },
  label: {
    color: '#fff',
    fontSize: 15,
    marginTop: 25,
    fontFamily: 'Urbanist-Medium',
  },
  inputContainer: {
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
    fontFamily: 'Urbanist-Medium',
  },
  iconContainer: {
    paddingHorizontal: 8,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  forgotText: {
    color: '#b8e0de',
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  buttonContainer: {
    marginTop: 50,
  },
  buttonGradient: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  signInBtn: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 350 : 250,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
});
