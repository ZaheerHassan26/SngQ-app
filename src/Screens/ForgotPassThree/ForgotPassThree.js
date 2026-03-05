// ChangePasswordScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

const ForgotPassThree = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = () => {
    if (!password || !confirmPassword) {
      alert('Please fill in both fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Forgot Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>Please set your new Password</Text>

      {/* Password Input */}
      <View style={styles.inputWrapper1}>
        <Text style={styles.label}>Password*</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8A8A8A"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirm Password*</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8A8A8A"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8A8A8A"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <LinearGradient
          colors={['#5DAD92', '#2F5749']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1A',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 5,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputWrapper1: {
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1F2E',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    borderWidth: 2,
    borderColor: '#424E6E',
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  eyeIcon: {
    padding: 5,
  },
  button: {
    marginTop: 30,
  },
  gradientButton: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ForgotPassThree;
