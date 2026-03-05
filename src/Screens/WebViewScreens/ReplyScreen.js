import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getQuesApi, sendMessageApi} from '../../utils/Apis';
import {useSelector} from 'react-redux';
const ReplyScreen = ({navigation, route}) => {
  const data = route?.params?.data; // URL passed from the previous screen
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [questShow, setQuestShow] = useState('');
  const {showData, isVip, userValue, token} = useSelector(
    state => state.userReducer,
  );

  const userId1 = userValue?.id;
  const [lastText, setLastText] = useState('');
  const useFoced = useIsFocused();

  useEffect(() => {
    if ((data, useFoced)) {
      const parts = data?.split('/');
      // Extract user ID, question ID, and the last part of the URL
      const userIdExtracted = parts[parts?.length - 4]; // "176"
      const questionIdExtracted = parts[parts?.length - 2]; // "1"
      const lastTextExtracted = parts[parts?.length - 1]; // "Snap"

      setUserId(userIdExtracted);
      setQuestionId(questionIdExtracted);
      setLastText(lastTextExtracted);
    }
  }, [data, navigation, useFoced, questShow]);

  useEffect(() => {
    const parentNavigation = navigation.getParent();
    if (parentNavigation) {
      parentNavigation.setOptions({tabBarStyle: {display: 'none'}});
    }

    return () => {
      if (parentNavigation) {
        parentNavigation.setOptions({tabBarStyle: undefined});
      }
    };
  }, [navigation]);

  useEffect(() => {
    getQuesApi(questionId, setQuestShow, token);
  }, [questShow]);

  const sendMessage = () => {
    sendMessageApi(
      name,
      userId,
      questionId,
      userId1,
      lastText,
      navigation,
      token,
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient colors={['#FF3399', '#9E53DA']} style={styles.container}>
        <Text style={styles.question}>{questShow}</Text>
        <TextInput
          placeholder="Write your anonymous message here..."
          placeholderTextColor={'black'}
          style={styles.textInput}
          multiline={true}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TouchableOpacity
          style={styles.sendButton}
          // onPress={() => navigation.navigate('SentScreen')}>
          onPress={() => sendMessage()}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        {/* <Text>User ID: {userId}</Text>
        <Text>Question ID: {questionId}</Text>
        <Text>Last Text: {lastText}</Text> */}

        <Text style={styles.downloadTExt}>Download RLY app now!</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Anonymous Messages</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default ReplyScreen;

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
  question: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});
