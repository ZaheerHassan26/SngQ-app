import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Modal from 'react-native-modal';

const CopyModal = ({isVisible, onClose}) => {
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
      }, 1000);

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
        <Text style={styles.text}>Link copied</Text>
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
  
  text: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CopyModal;
