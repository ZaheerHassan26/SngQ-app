import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const CustomToast = ({ message }) => {
  return (
    <Animatable.View 
      animation="bounceIn"
      duration={1500}
      style={styles.toastContainer}
    >
      <Animatable.Text animation="swing" iterationCount="infinite" style={styles.emoji}>
        😃
      </Animatable.Text>
      <Text style={styles.toastText}>{message.message}</Text>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  toastText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomToast;
