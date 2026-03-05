// DeleteAccountScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DeleteScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');

  const handleDelete = () => {
    // TODO: Implement delete account logic
    console.log('Deleting account with password:', password);
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.background}
      blurRadius={1}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
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
          <TouchableOpacity style={styles.topButton}>
            <Text style={styles.topButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.infoText}>
            To delete your account please enter your password
          </Text>

          <Text style={styles.label}>Password*</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 50 : 25,
  },
  topButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 20,
  },
  topButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  body: {
    flex: 1,
    marginTop: 80,
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 50,
    width: 300,
    fontFamily: 'Urbanist-Medium',
  },
  label: {
    color: '#fff',
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    height: 50,
    marginBottom: 40,
    fontFamily: 'Urbanist-Medium',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
});

export default DeleteScreen;
