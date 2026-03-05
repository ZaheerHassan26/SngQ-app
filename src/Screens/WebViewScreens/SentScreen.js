import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

const SentScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient colors={['#FF3399', '#9E53DA']} style={styles.container}>
        <Image
          source={require('../../Assets/ICONS/sent-icon.png')}
          style={styles.image}
        />

        <Text style={styles.question}>Reply Sent</Text>

        <Text style={styles.downloadTExt}>Download RLY app now!</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Anonymous Messages</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default SentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginBottom: 25,
    marginTop: 25,
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
  },
  question: {
    color: 'white',
    fontSize: 20,
    marginBottom: 50,
  },
  textInput: {
    height: 200,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 20,
    marginVertical: 20,
    textAlignVertical: 'top',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sendButton: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'white',
    height: 60,
    paddingVertical: 10,
    marginVertical: 20,
  },
  sendButtonText: {
    color: 'black',
    fontSize: 18, // Larger font size for better readability
    fontWeight: 'bold',
  },
  downloadTExt: {
    color: 'white',
    fontSize: 13,
    marginTop: 20,
  },
  button: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: 'black',
    height: 60,
    paddingVertical: 10,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18, // Larger font size for better readability
    fontWeight: 'bold',
  },
});
