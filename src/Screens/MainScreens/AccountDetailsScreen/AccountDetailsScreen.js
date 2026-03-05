import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountDetailsScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation?.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Account Details</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation?.navigate('EditScreen')}
          style={styles.headerEdit}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Name */}
        <Text style={styles.label}>Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#b5b5b5"
        />

        {/* Email */}
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          value="Johndeen@gmail.com"
          placeholderTextColor="#b5b5b5"
        />

        {/* Password */}
        <Text style={styles.label}>Password*</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#b5b5b5"
          secureTextEntry
        />

        {/* Country */}
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value="United States of America"
          placeholderTextColor="#b5b5b5"
        />

        {/* State */}
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          value="Alabama"
          placeholderTextColor="#b5b5b5"
        />

        {/* City */}
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#b5b5b5"
        />

        {/* LinkedIn / Instagram */}
        <Text style={styles.label}>LinkedIn or Instagram handle*</Text>
        <TextInput
          style={styles.input}
          value="@johndoe"
          placeholderTextColor="#b5b5b5"
        />

        {/* Delete Account */}
        <TouchableOpacity
          onPress={() => navigation?.navigate('DeleteScreen')}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 25,
  },
  headerCenter: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
  },
  headerEdit: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Urbanist-Medium',
  },
  input: {
    height: 52,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',
  },
  deleteBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
});

export default AccountDetailsScreen;
