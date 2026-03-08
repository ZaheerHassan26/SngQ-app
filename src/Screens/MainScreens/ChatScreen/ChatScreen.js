// ReactNative_PersonalityQuiz_App.js
// React Native CLI app (single-file) that closely reproduces the provided UI.
// Place your background image at: ./assets/background-top.png
// If you want to use the screenshot provided in the conversation, copy it to that path.

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  getGreetingApi,
  getQuizQuestionsApi,
  submitQuizApi,
  submitThisOrThatApi,
  getProfileApi,
  getChatQuestionsApi,
  submitChatResponseApi,
  completeChatIntakeApi,
} from '../../../utils/Apis';
import { getToastRef } from '../../../utils/toastRef';

const INITIAL_GREETING = 'Hi John';
const DEFAULT_GREETING =
  "Hi John, so I am gonna ask you few questions, based on that I'll find the perfect people for you";

export default function ChatScreen({ navigation }) {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const [greetingMessage, setGreetingMessage] = useState(INITIAL_GREETING);
  const [loadingGreeting, setLoadingGreeting] = useState(true);
  const [inputText, setInputText] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [showQuizCard, setShowQuizCard] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [submitOverlayVisible, setSubmitOverlayVisible] = useState(false);
  const [tieBreakerData, setTieBreakerData] = useState(null);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [chatQuestions, setChatQuestions] = useState(null);
  const [currentChatQuestionIndex, setCurrentChatQuestionIndex] = useState(0);
  const [chatIntakeComplete, setChatIntakeComplete] = useState(false);
  const [chatProgress, setChatProgress] = useState({ answered: 0, total: 0 });
  const [chatMessageList, setChatMessageList] = useState([]);
  const [quizConversationList, setQuizConversationList] = useState([]);

  const userValue = useSelector(state => state.userReducer?.userValue ?? null);
  console.log(userValue, '===');
  const isQuizCompleted =
    userValue?.is_quiz_completed === 1 || userValue?.is_quiz_completed === true;
  const isChatIntakeCompleted =
    userValue?.is_chat_intake_completed === 1 || userValue?.is_chat_intake_completed === true;

  useEffect(() => {
    setLoadingGreeting(true);
    getGreetingApi()
      .then(data => {
        const message = data?.message;
        if (message && typeof message === 'string' && message.trim()) {
          setGreetingMessage(message.trim());
        } else {
          setGreetingMessage(DEFAULT_GREETING);
        }
      })
      .catch(() => {
        setGreetingMessage(DEFAULT_GREETING);
      })
      .finally(() => setLoadingGreeting(false));
  }, []);

  // Refetch profile on mount so is_quiz_completed / is_chat_intake_completed are up to date (ensures correct quiz vs chat intake flow).
  useEffect(() => {
    getProfileApi(dispatch).catch(() => { });
  }, [dispatch]);

  // When quiz is completed and chat intake is not, show the chat intake card on mount (no need for user to type first).
  useEffect(() => {
    if (
      isQuizCompleted &&
      !isChatIntakeCompleted &&
      chatQuestions === null
    ) {
      setShowQuizCard(true);
      startChatIntake();
    }
  }, [isQuizCompleted, isChatIntakeCompleted, chatQuestions]);

  const fetchQuestions = useCallback(() => {
    if (questions !== null) return;
    setLoadingQuestions(true);
    getQuizQuestionsApi()
      .then(qs => setQuestions(Array.isArray(qs) ? qs : []))
      .catch(() => setQuestions([]))
      .finally(() => setLoadingQuestions(false));
  }, [questions]);


  const inChatIntake =
    chatQuestions != null &&
    chatQuestions.length > 0 &&
    !chatIntakeComplete;


  const handleSend = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    if (inChatIntake) {
      const current = chatQuestions[currentChatQuestionIndex];
      if (!current || submitOverlayVisible) return;
      if (trimmed.length < 10) {
        getToastRef()?.showError?.('Please enter at least 10 characters.');
        return;
      }
      setSubmitOverlayVisible(true);
      const questionText = current.question_text ?? '';
      submitChatResponseApi(current.id, trimmed, current.question_number)
        .then((res) => {
          const data = res?.data ?? res;
          const saved = data?.saved === true;
          const isComplete = data?.is_complete === true;
          const sageMessage = data?.sage_message;
          const nextAction = data?.next_action;
          const answered = data?.answered ?? 0;
          const total = data?.total ?? chatQuestions.length;

          if (sageMessage && typeof sageMessage === 'string') {
            getToastRef()?.showSuccess?.(sageMessage);
          }
          setChatProgress({ answered, total });
          setChatMessageList(prev => [
            ...prev,
            { type: 'bot', text: questionText, id: `q-${current.id}-${current.question_number}` },
            { type: 'user', text: trimmed, id: `a-${current.id}-${Date.now()}` },
          ]);

          if (isComplete) {
            return completeChatIntakeApi().then(async () => {
              setChatIntakeComplete(true);
              await getProfileApi(dispatch);
              navigation?.navigate('PlanScreen');
            });
          }
          setCurrentChatQuestionIndex(prev => prev + 1);
        })
        .catch(() => { })
        .finally(() => setSubmitOverlayVisible(false));
      setInputText('');
      return;
    }

    setUserMessage(trimmed);
    setInputText('');
    setShowQuizCard(true);
    if (isQuizCompleted && !isChatIntakeCompleted) {
      startChatIntake();
    } else if (questions === null && !isQuizCompleted) {
      fetchQuestions();
    }
  }, [
    inputText,
    questions,
    isQuizCompleted,
    isChatIntakeCompleted,
    fetchQuestions,
    startChatIntake,
    inChatIntake,
    chatQuestions,
    currentChatQuestionIndex,
    submitOverlayVisible,
    dispatch,
    navigation,
  ]);

  const handleLetsStart = useCallback(() => {
    setQuizConversationList([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
  }, []);

  const handleSelectOption = useCallback((questionId, value) => {
    setSelectedOption(value);
    setAnswers(prev => [
      ...prev.filter(a => a.question_id !== questionId),
      { question_id: questionId, response_value: value },
    ]);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < 9 && questions && questions[currentQuestionIndex]) {
      const q = questions[currentQuestionIndex];
      const questionText = q?.question_text ?? '';
      const selectedLabel = (q?.options || []).find(o => o.value === selectedOption)?.label ?? selectedOption ?? '';
      setQuizConversationList(prev => [
        ...prev,
        { type: 'bot', text: questionText, id: `quiz-q-${q.id}` },
        { type: 'user', text: String(selectedLabel), id: `quiz-a-${q.id}-${Date.now()}` },
      ]);
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    }
  }, [currentQuestionIndex, questions, selectedOption]);

  const startChatIntake = useCallback(() => {
    setSubmitOverlayVisible(true);
    setChatMessageList([]);
    return getChatQuestionsApi()
      .then(qs => {
        const list = Array.isArray(qs) ? qs : [];
        setChatQuestions(list);
        setCurrentChatQuestionIndex(0);
        setChatIntakeComplete(false);
        setChatProgress({ answered: 0, total: list.length });
      })
      .catch(() => setChatQuestions([]))
      .finally(() => setSubmitOverlayVisible(false));
  }, []);

  const handleSubmitQuiz = useCallback(async () => {
    if (!questions || questions.length === 0 || submittingQuiz) return;
    const lastQ = questions[9];
    const lastLabel = lastQ
      ? (lastQ.options || []).find(o => o.value === selectedOption)?.label ?? selectedOption ?? ''
      : '';
    const responses = questions.map(q => ({
      question_id: q.id,
      response_value:
        answers.find(a => a.question_id === q.id)?.response_value ?? 0,
    }));
    setSubmittingQuiz(true);
    setSubmitOverlayVisible(true);
    try {
      const response = await submitQuizApi(responses);
      const data = response?.data ?? response;
      const requiresTieBreaker = data?.requires_tie_breaker === true;
      setQuizConversationList(prev => [
        ...prev,
        ...(lastQ
          ? [
            { type: 'bot', text: lastQ.question_text ?? '', id: `quiz-q-${lastQ.id}` },
            { type: 'user', text: String(lastLabel), id: `quiz-a-${lastQ.id}-${Date.now()}` },
          ]
          : []),
      ]);
      if (requiresTieBreaker) {
        const question =
          data?.this_or_that?.question ||
          'Which is more attractive in a partner?';
        const options =
          data?.this_or_that?.options ||
          (Array.isArray(data?.traits) ? data.traits : []);
        setTieBreakerData({ question, options });
        setSelectedTrait(null);
      } else {
        await getProfileApi(dispatch);
        startChatIntake();
      }
    } catch (err) {
      // showApiErrorToast in Apis
    } finally {
      setSubmittingQuiz(false);
      setSubmitOverlayVisible(false);
    }
  }, [questions, answers, selectedOption, submittingQuiz, dispatch, startChatIntake]);

  const handleSubmitThisOrThat = useCallback(async () => {
    if (!selectedTrait || submitOverlayVisible) return;
    const questionText = tieBreakerData?.question ?? 'Which is more attractive in a partner?';
    setQuizConversationList(prev => [
      ...prev,
      { type: 'bot', text: questionText, id: 'tiebreaker-q' },
      { type: 'user', text: String(selectedTrait), id: `tiebreaker-a-${Date.now()}` },
    ]);
    setSubmitOverlayVisible(true);
    try {
      const response = await submitThisOrThatApi(selectedTrait);
      const message =
        response?.message || 'Quiz completed successfully.';
      getToastRef()?.showSuccess?.(message);
      await getProfileApi(dispatch);
      await startChatIntake();
    } catch (err) {
      setSubmitOverlayVisible(false);
    }
  }, [selectedTrait, submitOverlayVisible, tieBreakerData, dispatch, startChatIntake]);

  const scrollToBottom = useCallback((animated = true) => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd?.({ animated });
    });
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [scrollToBottom]);

  useEffect(() => {
    scrollToBottom(true);
  }, [
    userMessage,
    showQuizCard,
    inChatIntake,
    currentChatQuestionIndex,
    currentQuestionIndex,
    tieBreakerData,
    loadingGreeting,
    chatMessageList.length,
    quizConversationList.length,
    scrollToBottom,
  ]);


  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // gradient background image
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={styles.topRow}>
        <Image
          source={require('../../../Assets/IMAGES/Icon.png')}
          style={{ width: 40, height: 40, resizeMode: 'contain' }}
        />

        <View style={styles.titlePill}>
          <Text style={styles.titleText}>Saige AI</Text>
        </View>

        <TouchableOpacity style={styles.roundBtn} activeOpacity={0.7}>
          <Text style={styles.iconText}>⋯</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {submitOverlayVisible ? (
          <Modal visible transparent animationType="fade">
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#3DA8A1" />
            </View>
          </Modal>
        ) : null}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          onContentSizeChange={() => scrollToBottom(true)}
        >
          {/* Top header row */}

          {/* bot bubble: always show greeting (chat questions go in the card below) */}
          {loadingGreeting ? (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: '40%' }}>
              <ActivityIndicator
                size="small"
                color="#ffff"
                style={styles.greetingLoader}
              />
            </View>
          ) : (
            <View style={styles.botBubbleWrapper}>
              <View style={styles.botBubble}>
                <Text style={styles.botText}>{greetingMessage}</Text>
                <View
                  style={{
                    borderWidth: 0.5,
                    borderColor: '#5C5C5C',
                    marginTop: 12,
                  }}
                />
                <View style={styles.botRowIcons}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Image
                      source={require('../../../Assets/IMAGES/m2.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                    <Image
                      source={require('../../../Assets/IMAGES/m5.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                    <Image
                      source={require('../../../Assets/IMAGES/m6.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  </View>
                  <View>
                    <Image
                      source={require('../../../Assets/IMAGES/m1.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* user bubble: only after first send */}
          {userMessage !== '' ? (
            <View style={styles.userBubbleWrapper}>
              <View style={styles.userBubble}>
                <Text style={styles.userText}>{userMessage}</Text>
              </View>
              <Image
                source={{ uri: 'https://picsum.photos/200/200?random=1' }}
                style={styles.avatar}
              />
            </View>
          ) : null}

          {/* Chat intake: keep quiz + This or That visible, then chat Q&A, then current question card */}
          {inChatIntake ? (
            <>
              {quizConversationList.map(item =>
                item.type === 'bot' ? (
                  <View key={item.id} style={styles.botBubbleWrapper}>
                    <View style={styles.botBubble}>
                      <Text style={styles.botText}>{item.text}</Text>
                      <View style={styles.botRowIcons}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <Image
                            source={require('../../../Assets/IMAGES/m2.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m5.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m6.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                        <View>
                          <Image
                            source={require('../../../Assets/IMAGES/m1.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={item.id} style={styles.userBubbleWrapper}>
                    <View style={styles.userBubble}>
                      <Text style={styles.userText}>{item.text}</Text>
                    </View>
                    <Image
                      source={{ uri: 'https://picsum.photos/200/200?random=1' }}
                      style={styles.avatar}
                    />
                  </View>
                )
              )}
              {chatMessageList.map(item => (
                item.type === 'bot' ? (
                  <View key={item.id} style={styles.botBubbleWrapper}>
                    <View style={styles.botBubble}>
                      <Text style={styles.botText}>{item.text}</Text>
                      <View style={styles.botRowIcons}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <Image
                            source={require('../../../Assets/IMAGES/m2.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m5.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m6.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                        <View>
                          <Image
                            source={require('../../../Assets/IMAGES/m1.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={item.id} style={styles.userBubbleWrapper}>
                    <View style={styles.userBubble}>
                      <Text style={styles.userText}>{item.text}</Text>
                    </View>
                    <Image
                      source={{ uri: 'https://picsum.photos/200/200?random=1' }}
                      style={styles.avatar}
                    />
                  </View>
                )
              ))}
              <View style={styles.quizCard}>
                <Text style={styles.quizTitle}>A few more questions</Text>
                <Text style={styles.quizSubtitle}>
                  {chatProgress.total > 0
                    ? `Question ${currentChatQuestionIndex + 1} of ${chatProgress.total}`
                    : 'Your answers help us match you better.'}
                </Text>
                <View style={styles.divider} />
                <Text style={styles.question}>
                  {chatQuestions[currentChatQuestionIndex]?.question_text ?? ''}
                </Text>
                <View style={styles.cardFooterRow}>
                  <View style={styles.footerIconsRow}>
                    <Image
                      source={require('../../../Assets/IMAGES/m2.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                    <Image
                      source={require('../../../Assets/IMAGES/m5.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                    <Image
                      source={require('../../../Assets/IMAGES/m6.png')}
                      style={{ width: 20, height: 20, resizeMode: 'contain' }}
                    />
                  </View>
                </View>
              </View>
            </>
          ) : showQuizCard ? (
            <>
              {quizConversationList.map(item =>
                item.type === 'bot' ? (
                  <View key={item.id} style={styles.botBubbleWrapper}>
                    <View style={styles.botBubble}>
                      <Text style={styles.botText}>{item.text}</Text>
                      <View style={styles.botRowIcons}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <Image
                            source={require('../../../Assets/IMAGES/m2.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m5.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m6.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                        <View>
                          <Image
                            source={require('../../../Assets/IMAGES/m1.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View key={item.id} style={styles.userBubbleWrapper}>
                    <View style={styles.userBubble}>
                      <Text style={styles.userText}>{item.text}</Text>
                    </View>
                    <Image
                      source={{ uri: 'https://picsum.photos/200/200?random=1' }}
                      style={styles.avatar}
                    />
                  </View>
                )
              )}
              {isQuizCompleted && isChatIntakeCompleted ? (
                <View style={styles.quizCard}>
                  <Text style={styles.quizTitle}>Quiz completed</Text>
                  <Text style={styles.quizSubtitle}>
                    You've already completed the personality quiz. We're using
                    your answers to find great matches.
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={styles.letsStartBtn}
                    onPress={() => navigation?.navigate('MessageScreen')}
                  >
                    <LinearGradient
                      colors={['#255A3B', '#3DA8A1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.letsStartGradient}
                    >
                      <Text style={styles.letsStartText}>Go to Messages</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : tieBreakerData ? (
                <View style={styles.quizCard}>
                  <Text style={styles.quizTitle}>This or That</Text>
                  <Text style={styles.quizSubtitle}>
                    Your answers help us match you with people who truly vibe
                    with your personality.
                  </Text>
                  <View style={styles.divider} />
                  <Text style={styles.question}>{tieBreakerData.question}</Text>
                  {(tieBreakerData.options || []).map(opt => {
                    const isSelected = selectedTrait === opt;
                    return (
                      <TouchableOpacity
                        key={opt}
                        activeOpacity={0.85}
                        onPress={() => setSelectedTrait(opt)}
                        style={[
                          styles.optionRow,
                          isSelected && styles.optionRowSelected,
                        ]}
                      >
                        {isSelected ? (
                          <LinearGradient
                            colors={['#255A3B', '#3DA8A1']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.optionGradient}
                          >
                            <Text
                              style={[
                                styles.optionText,
                                styles.optionTextSelected,
                              ]}
                            >
                              {opt}
                            </Text>
                          </LinearGradient>
                        ) : (
                          <View style={styles.optionPlain}>
                            <Text style={styles.optionText}>{opt}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                  <View style={styles.cardFooterRow}>
                    <View style={styles.footerIconsRow}>
                      <Image
                        source={require('../../../Assets/IMAGES/m2.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                      />
                      <Image
                        source={require('../../../Assets/IMAGES/m5.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                      />
                      <Image
                        source={require('../../../Assets/IMAGES/m6.png')}
                        style={{ width: 20, height: 20, resizeMode: 'contain' }}
                      />
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.letsStartBtn}
                      onPress={handleSubmitThisOrThat}
                      disabled={!selectedTrait || submitOverlayVisible}
                    >
                      <LinearGradient
                        colors={['#255A3B', '#3DA8A1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[
                          styles.letsStartGradient,
                          (!selectedTrait || submitOverlayVisible) &&
                          styles.letsStartGradientDisabled,
                        ]}
                      >
                        <Text style={styles.letsStartText}>Submit</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : currentQuestionIndex === -1 ? (
                <View style={styles.quizCard}>
                  <Text style={styles.quizTitle}>Personality Quiz</Text>
                  <Text style={styles.quizSubtitle}>
                    Your answers help us match you with people who truly vibe
                    with your personality.
                  </Text>
                  {loadingQuestions ? (
                    <View style={styles.loadingWrap}>
                      <ActivityIndicator size="small" color="#3DA8A1" />
                    </View>
                  ) : (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.letsStartBtn}
                      onPress={handleLetsStart}
                    >
                      <LinearGradient
                        colors={['#255A3B', '#3DA8A1']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.letsStartGradient}
                      >
                        <Text style={styles.letsStartText}>Let's Start</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )}
                </View>
              ) : currentQuestionIndex >= 0 ? (
                <View style={styles.quizCard}>
                  <Text style={styles.quizTitle}>Personality Quiz</Text>
                  <Text style={styles.quizSubtitle}>
                    Your answers help us match you with people who truly vibe with
                    your personality.
                  </Text>

                  {!questions || loadingQuestions ? (
                    <View style={styles.loadingWrap}>
                      <ActivityIndicator size="small" color="#3DA8A1" />
                    </View>
                  ) : (
                    <>
                      <View style={styles.divider} />

                      <Text style={styles.question}>
                        {questions[currentQuestionIndex]?.question_text ?? ''}
                      </Text>

                      {(questions[currentQuestionIndex]?.options || []).map(opt => {
                        const isSelected = selectedOption === opt.value;
                        return (
                          <TouchableOpacity
                            key={opt.value}
                            activeOpacity={0.85}
                            onPress={() => {
                              if (questions && questions[currentQuestionIndex]) {
                                handleSelectOption(questions[currentQuestionIndex].id, opt.value);
                              }
                            }}
                            style={[
                              styles.optionRow,
                              isSelected && styles.optionRowSelected,
                            ]}
                          >
                            {isSelected ? (
                              <LinearGradient
                                colors={['#255A3B', '#3DA8A1']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.optionGradient}
                              >
                                <Text
                                  style={[styles.optionText, styles.optionTextSelected]}
                                >
                                  {opt.label}
                                </Text>
                              </LinearGradient>
                            ) : (
                              <View style={styles.optionPlain}>
                                <Text style={styles.optionText}>{opt.label}</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}

                      <View style={styles.cardFooterRow}>
                        <View style={styles.footerIconsRow}>
                          <Image
                            source={require('../../../Assets/IMAGES/m2.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m5.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                          <Image
                            source={require('../../../Assets/IMAGES/m6.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          />
                        </View>

                        {currentQuestionIndex < 9 ? (
                          <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.letsStartBtn}
                            onPress={handleNext}
                          >
                            <LinearGradient
                              colors={['#255A3B', '#3DA8A1']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.letsStartGradient}
                            >
                              <Text style={styles.letsStartText}>Next</Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.letsStartBtn}
                            onPress={handleSubmitQuiz}
                            disabled={submittingQuiz || selectedOption == null}
                          >
                            <LinearGradient
                              colors={['#255A3B', '#3DA8A1']}
                              start={{ x: 0, y: 0 }}
                              end={{ x: 1, y: 0 }}
                              style={[
                                styles.letsStartGradient,
                                (submittingQuiz || selectedOption == null) &&
                                styles.letsStartGradientDisabled,
                              ]}
                            >
                              {submittingQuiz ? (
                                <ActivityIndicator size="small" color="#fff" />
                              ) : (
                                <Text style={styles.letsStartText}>Submit</Text>
                              )}
                            </LinearGradient>
                          </TouchableOpacity>
                        )}
                      </View>
                    </>
                  )}
                </View>
              ) : null}
            </>
          ) : null}
          {/* Spacer so input bar doesn't overlay content on small screens */}
          <View style={{ height: 30 }} />
        </ScrollView>

        {/* Input bar pinned at bottom */}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="Send MesSaige..."
            placeholderTextColor="#9aa0a6"
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            blurOnSubmit={false}
            onFocus={() => scrollToBottom(true)}
          />
          <TouchableOpacity style={styles.iconBtn} onPress={handleSend}>
            <Icon name="send" size={22} color="#3DA8A1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              source={require('../../../Assets/IMAGES/m3.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Image
              source={require('../../../Assets/IMAGES/m4.png')}
              style={{ width: 20, height: 20, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#07120f',
    paddingTop: 60,
  },
  safe: { flex: 1, justifyContent: 'space-between' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: Platform.OS === 'ios' ? 50 : 50,
    paddingBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 18,

  },
  roundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { color: '#fff', fontSize: 18 },
  titlePill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  titleText: { color: '#e9f8f0', fontSize: 15, fontWeight: '600' },

  botBubbleWrapper: { marginTop: 8, alignItems: 'flex-start' },
  botBubble: {
    backgroundColor: 'rgba(46,51,44,0.88)',
    padding: 16,
    // borderRadius: 18,
    maxWidth: '82%',
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
    borderBottomEndRadius: 18,
  },
  botText: { color: '#e6efe9', fontSize: 14, lineHeight: 20 },
  greetingLoaderWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  greetingLoader: { marginLeft: 4 },
  botRowIcons: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },

  userBubbleWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  userBubble: {
    backgroundColor: '#2f8e7b',
    paddingVertical: 12,
    paddingHorizontal: 16, // ✔ normal padding
    // borderRadius: 20,
    marginRight: 8,
    width: 280,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
    borderBottomStartRadius: 18,
  },
  userText: { color: '#ffffff', fontSize: 14, textAlign: 'right' },
  avatar: { width: 36, height: 36, borderRadius: 18 },

  quizCard: {
    marginTop: 18,
    backgroundColor: 'rgba(46,51,44,0.88)',
    // borderRadius: 22,
    borderTopEndRadius: 18,
    borderTopStartRadius: 18,
    borderBottomEndRadius: 18,
    padding: 18,
    // subtle shadow
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  quizTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  quizSubtitle: { color: '#fff', fontSize: 13, marginBottom: 12 },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginVertical: 6,
  },
  question: { color: '#f0f7f4', fontSize: 15, marginBottom: 12 },

  optionRow: { marginBottom: 10 },
  optionPlain: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
  },
  optionText: { color: '#c9d6d2', fontSize: 15 },

  optionGradient: {
    borderRadius: 90,

    alignItems: 'center',
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  optionTextSelected: { color: '#fff', fontWeight: '700' },

  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  footerIconsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  smallIcon: { color: '#9fb7af', marginRight: 10 },

  letsStartBtn: {},
  letsStartGradient: {
    borderRadius: 60,
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letsStartGradientDisabled: { opacity: 0.6 },
  letsStartText: { color: '#fff', fontWeight: '700' },
  loadingWrap: { marginTop: 12, alignItems: 'center', paddingVertical: 8 },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    marginHorizontal: 18,
    marginBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 26,
    borderColor: '#C0C0C0',
    borderWidth: 0.2,
  },
  input: { flex: 1, color: '#fff', paddingVertical: 6, paddingHorizontal: 8 },
  iconBtn: { paddingHorizontal: 8 },
});
