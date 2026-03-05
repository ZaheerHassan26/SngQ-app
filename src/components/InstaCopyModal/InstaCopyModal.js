import React, {useState} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Entypo, FontAwesome5} from '../../utils/Exports';
import Clipboard from '@react-native-clipboard/clipboard';

const InstaCopyModal = ({isVisible, close, copyText}) => {
  const [changeVal, setChangeVal] = useState('Copy Link');
  const handelCopy = () => {
    Clipboard.setString(copyText);
    setChangeVal('Link Copied');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={close}>
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={[styles.iconButton]}>
            <Image
              source={require('../../Assets/ICONS/instagram-btn.png')}
              style={styles.iconImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={close}>
            <Entypo name="cross" color={'white'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#000',
              borderRadius: 20,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
            onPress={handelCopy}>
            <FontAwesome5 name="link" color={'#000'} size={18} />
            <Text
              style={{
                marginHorizontal: 10,
                fontSize: 18,
                color: '#000',
                fontWeight: 'bold',
              }}>
              {changeVal}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  container: {
    width: '100%',
    height: 500,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    gap: 40,
    justifyContent: 'center',
    borderRadius: 20,
  },
  modalText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  iconImage: {
    width: 50,
    height: 50,
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
});

export default InstaCopyModal;
