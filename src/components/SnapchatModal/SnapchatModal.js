import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {Entypo} from '../../utils/Exports';

const SnapchatModal = ({isVisible, onClose}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();

      const timer = setTimeout(() => {
        onClose();
      }, 90000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, animation, onClose]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });

  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.close} onPress={onClose}>
          <Entypo name="cross" color={'white'} size={20} />
        </TouchableOpacity>
        <Text style={styles.text}>Saved! Now open Snapchat</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'black',
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default SnapchatModal;
