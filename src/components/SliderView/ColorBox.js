import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
  Alert,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../utils/Theme';
import {FontAwesome5} from '../../utils/Exports';
import ShareModal from '../ShareModal/ShareModal';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './Style';
import {getMessageApi, handleTextChange} from '../../utils/Apis';
import {OneSignal} from 'react-native-onesignal';
import {Mixpanel} from 'mixpanel-react-native';

const ColorBox = question => {
  const [colors, setColors] = useState(['#FF3399', '#9E53DA']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openLink, setOpenLink] = useState(false);
  const [userQuestId, setUserQuestId] = useState(1);

  const {socialType} = useSelector(state => state.userReducer);
  const {getQuestions, userValue, updatedId, token} = useSelector(
    state => state.userReducer,
  );
  const userId = userValue?.id;
  console.log('userQuestId', userQuestId);

  const messages = useSelector(state => state.userReducer.messages);
  const textInputRef = useRef();
  useEffect(() => {
    getMessageApi(userId, dispatch, token);
  }, []);

  useEffect(() => {
    OneSignal.login(userId.toString());
  }, []);

  const dispatch = useDispatch();

  const questions = getQuestions ? getQuestions : question;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState(1); // New state for question ID

  const [textValue, setTextValue] = useState(questions[0]?.question);
  const [copyText, setCopyText] = useState('');

  const [mixpanel, setMixpanel] = useState(null);

  useEffect(() => {
    const initMixpanel = async () => {
      try {
        const instance = new Mixpanel(
          '6a22aa662fda9238f378f6231d8901d2',
          false,
        ); // Explicitly set auto-tracking to false
        await instance.init();
        setMixpanel(instance);
        console.log('Mixpanel initialized');
      } catch (error) {
        console.error('Mixpanel initialization failed:', error);
      }
    };

    initMixpanel();
  }, []);

  useEffect(() => {
    if (getQuestions && getQuestions.length > 0) {
      setCopyText(
        `https://rlyapp.link/rly-app/user/${userId}/question/${userQuestId}/${socialType}`,
      );
    }
  }, [getQuestions, socialType, userQuestId, currentQuestionId]);

  useEffect(() => {
    if (getQuestions && getQuestions.length > 0) {
      const initialQuestion = getQuestions[0]?.question;
      setTextValue(initialQuestion);
    }
  }, [getQuestions]);

  console.log('copyText=========>', textValue);

  const gradients = [
    ['#FF3399', '#9E53DA'],
    ['#21D2FE', '#8A50FD'],
    ['#000000', '#8794AF'],
    ['#7FF6E7', '#B5F7BA'], // 4th gradient (black text)
    ['#F79CEF', '#B695EA'], // 5th gradient (black text)
    ['#FFCC00', '#FF3366'],
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = async () => {
    setModalVisible(prev => !prev); // Ensure modal state is flipped correctly

    // Store the current text before calling API
    const currentText = textValue;

    await handleTextChange(
      currentText,
      dispatch,
      token,
      userId,
      currentQuestionId,
      updatedId => {
        setUserQuestId(updatedId);
      },
    );

    // Ensure userQuestId is updated before setting copyText
    setCopyText(
      prev =>
        `https://rlyapp.link/rly-app/user/${userId}/question/${userQuestId}/${socialType}`,
    );

    Clipboard.setString(copyText); // This might be executing multiple times
  };

  const copyToClipboard = () => {
    Clipboard.setString(copyText);
    Alert.alert('Link copied to clipboard');
    setTimeout(() => {
      setOpenLink(false);
    }, 1000);
  };

  const showNextQuestion = () => {
    if (questions && questions.length > 0) {
      if (mixpanel) {
        mixpanel.track('Another Qustion', {
          platform: Platform.OS === 'android' ? 'Android' : 'IOS',
        });
      } else {
        console.warn('Mixpanel not initialized');
      }

      const nextIndex = (currentQuestionIndex + 1) % questions.length;

      setCurrentQuestionIndex(nextIndex);
      console.log('nextIndex', nextIndex);

      const nextQuestion = questions[nextIndex];

      const nextQuestion1 = questions[nextIndex].question;
      setTextValue(nextQuestion1);

      setCopyText(
        `https://rlyapp.link/rly-app/user/${userId}/question/${userQuestId}/${socialType}`,
      );
      setCurrentQuestionId(nextQuestion.id); // Save the ID of the current question
    }
  };

  const isBlackText = selectedIndex === 3 || selectedIndex === 4;

  return (
    <View style={styles.container}>
      <View style={styles.secondMainContainer}>
        <View style={styles.row}>
          <View style={styles.questionContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={showNextQuestion}>
              <Image
                source={require('../../Assets/ICONS/loop.png')}
                style={{width: 25, height: 25}}
              />
              <Text style={styles.questionText}>Another Question</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LinearGradient colors={colors} style={styles.gradientBox}>
          <TextInput
            ref={textInputRef}
            style={{
              color: isBlackText ? '#000000' : '#FFFFFF', // Black text for 4th and 5th gradients, white for others
              fontSize: Platform.OS === 'ios' ? 24 : 16,
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            value={textValue}
            onChangeText={txt => setTextValue(txt)}
            multiline={true}
            returnKeyType="done"
            blurOnSubmit={true}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 20,
            }}
            onPress={() => textInputRef.current.focus()} // Focus the TextInput when "Edit" is pressed
          >
            <Text style={{color: 'white'}}>Edit</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.buttonContainer}>
          {gradients.map((gradient, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                {backgroundColor: gradient[0]},
                selectedIndex === index && styles.selectedButton,
              ]}
              onPress={() => {
                setColors(gradient);
                setSelectedIndex(index);
              }}>
              <LinearGradient colors={gradient} style={styles.buttonGradient} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.linkContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 19,
              color: Theme.black,
              fontWeight: 'bold',
            }}>
            Share link on your story
          </Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
            }}></TouchableOpacity>

          <LinearGradient
            colors={['#FF3399', '#9E53DA']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: '80%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 60,
              marginVertical: 10,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                toggleModal();
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Share!
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <ShareModal
            visible={modalVisible}
            onClose={toggleModal}
            colors={colors}
            textValue={textValue}
            copyText={copyText}
            setModalVisibleF={setModalVisible}
          />
        </View>

        <View style={styles.linkContainer}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 19,
              color: Theme.black,
              fontWeight: 'bold',
            }}>
            Share link on your IG Bio
          </Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginVertical: 10,
              alignItems: 'center',
            }}>
            <Text style={{color: Theme.grey, fontSize: 15}}>
              rlyapp.link/{userValue?.username}
            </Text>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'black',
                paddingVertical: 5,
                borderRadius: 20,
                paddingHorizontal: 10,
              }}
              onPress={copyToClipboard}>
              <FontAwesome5 name="link" color={'black'} size={18} />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 18,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                Copy Link
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ColorBox;
