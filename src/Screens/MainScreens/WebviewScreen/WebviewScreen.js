import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import WebView from 'react-native-webview';
import Theme from '../../../utils/Theme';
import {Entypo, MaterialCommunityIcons} from '../../../utils/Exports';

const CustomWebView = ({url, onClose}) => {
  return (
    <Modal visible={true} animationType="slide">
      <WebView source={{uri: url}} style={styles.webView} />
      <TouchableOpacity
        onPress={onClose}
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 20,
          top: 50,
        }}>
        <Entypo name="cross" size={24} color={'white'} />
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color of the web view container
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FF3399', // Header background color
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50', // Custom button background color
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
  },
});

export default CustomWebView;
