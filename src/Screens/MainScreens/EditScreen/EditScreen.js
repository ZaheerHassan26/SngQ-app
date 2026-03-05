import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.topPill}>
            <Text style={styles.topPillText}>Edit Account</Text>
          </View>
        </View>

        {/* FORM */}
        {renderField('Name*', 'Type here')}
        {renderField('Email*', 'Johndeen@gmail.com')}
        {renderField('Password*', 'Password', true)}
        {renderField('Country', 'United States of America')}
        {renderField('State', 'Alabama')}
        {renderField('City', 'Type here')}
        {renderField('LinkedIn or Instagram handle*', '@johndoe')}

        {/* SAVE BUTTON */}
        <LinearGradient colors={['#255A3B', '#3DA8A1']} style={styles.saveBtn}>
          <TouchableOpacity>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </ImageBackground>
  );
};

const renderField = (label, placeholder, secure) => (
  <View style={{ marginBottom: 18 }}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.inputWrapper}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.6)"
        secureTextEntry={secure}
        style={styles.input}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  // ----- TOP SECTION ----- //
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 35,
    gap: 45,
  },

  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },

  topPill: {
    paddingVertical: 6,
    paddingHorizontal: 35,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'center',
  },

  topPillText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  // ----- FORM FIELDS ----- //
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '400',
  },

  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 55,
    justifyContent: 'center',
  },

  input: {
    color: '#fff',
    fontSize: 15,
  },

  // ----- SAVE BUTTON ----- //
  saveBtn: {
    marginTop: 30,
    borderRadius: 30,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditScreen;
