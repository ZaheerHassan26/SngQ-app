// ReactNative_PersonalityQuiz_App.js
// React Native CLI app (single-file) that closely reproduces the provided UI.
// Place your background image at: ./assets/background-top.png
// If you want to use the screenshot provided in the conversation, copy it to that path.

import React, { useState } from 'react';
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
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

export default function ChatScreen({ navigation }) {
  const [selected, setSelected] = useState(null);
  const userValue = useSelector(state => state.userReducer?.userValue ?? null);
  const isQuizCompleted = userValue?.is_quiz_completed === 1 || userValue?.is_quiz_completed === true;
  const showQuiz = !isQuizCompleted;

  const options = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree',
  ];

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

      <View style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Top header row */}
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
          {/* bot bubble */}
          <View style={styles.botBubbleWrapper}>
            <View style={styles.botBubble}>
              <Text style={styles.botText}>
                Hi John, so I am gonna ask you few questions, based on that I'll
                find the perfect people for you
              </Text>
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

          {/* spacer
          </View>

          {/* user bubble */}
          <View style={styles.userBubbleWrapper}>
            <View style={styles.userBubble}>
              <Text style={styles.userText}>Hello Doc....</Text>
            </View>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?random=1' }}
              style={styles.avatar}
            />
          </View>
          {/* Quiz card: show only when is_quiz_completed === 0 */}
          {showQuiz ? (
          <View style={styles.quizCard}>
            <Text style={styles.quizTitle}>Personality Quiz</Text>
            <Text style={styles.quizSubtitle}>
              Your answers help us match you with people who truly vibe with
              your personality.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.question}>
              I’m extremely focused on building my career or legacy right now.
            </Text>

            {options.map((o, i) => {
              const isSelected = selected === o;
              return (
                <TouchableOpacity
                  key={o}
                  activeOpacity={0.85}
                  onPress={() => setSelected(o)}
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
                        {o}
                      </Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.optionPlain}>
                      <Text style={styles.optionText}>{o}</Text>
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
                onPress={() => navigation?.navigate('PlanScreen')}
              >
                <LinearGradient
                  colors={['#255A3B', '#3DA8A1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.letsStartGradient}
                >
                  <Text style={styles.letsStartText}>Let’s Start </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          ) : (
            <View style={styles.quizCard}>
              <Text style={styles.quizTitle}>Quiz completed</Text>
              <Text style={styles.quizSubtitle}>
                You've already completed the personality quiz. We're using your answers to find great matches.
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
          )}
          {/* Spacer so input bar doesn't overlay content on small screens */}
          <View style={{ height: 30 }} />
        </ScrollView>

        {/* Input bar pinned at bottom */}
        <View style={styles.inputBar}>
          <TextInput
            placeholder="Send MesSaige..."
            placeholderTextColor="#9aa0a6"
            style={styles.input}
          />
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#07120f',
  },
  safe: { flex: 1, justifyContent: 'space-between' },
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
  letsStartText: { color: '#fff', fontWeight: '700' },

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
