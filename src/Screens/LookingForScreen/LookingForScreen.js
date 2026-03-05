import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { getRequestInviteStep } from '../../config/requestInviteSteps';
import { setRequestInviteData } from '../../redux/actions';

const { width } = Dimensions.get('window');

const LookingForScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const name = (requestInviteData.name && String(requestInviteData.name).trim()) || 'there';

  const [selected, setSelected] = useState(
    requestInviteData.whatLookingFor ?? null,
  );

  const { stepIndex, totalSteps } = getRequestInviteStep('LookingForScreen');
  const progressWidth = `${(stepIndex / totalSteps) * 100}%`;

  const options = [
    {
      id: 1,
      title: 'Casual Dating',
      description: 'No pressure, just vibes — let’s see where it goes',
    },
    {
      id: 2,
      title: 'Serious Relationship',
      description: 'I’m done playing games. Looking for something steady',
    },
    {
      id: 3,
      title: 'Marriage',
      description: 'At this point, I know what I want: a partner for life.',
    },
    {
      id: 4,
      title: 'Discovering My Dating Goals',
      description:
        'Still figuring it out, but open to good energy and real connections.',
    },
  ];

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../Assets/IMAGES/Icon.png')}
              style={styles.icon2}
            />
          </TouchableOpacity>

          <View style={styles.progressWrapper}>
            <View style={styles.progressBarBackground}>
              <View
                style={[styles.progressBarFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.stepText}>{`${stepIndex}/${totalSteps}`}</Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.content}>
          <Text style={styles.title}>{name}, What are you looking for?</Text>
          {/* <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod
          </Text> */}

          {/* Options */}
          <View style={{marginTop: '15%'}}>
          {options.map(item => {
            const isSelected = selected === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.9}
                onPress={() => setSelected(item.id)}
                style={{ marginBottom: 15, position: 'relative',borderRadius: 10 }}
              >
                {isSelected && (
                  <LinearGradient
                    colors={[
                      'rgba(37, 90, 59, 0.5)',
                      'rgba(61, 168, 161, 0.5)',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: 10,
                    }]}
                  />
                )}
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}

          </View>
        </View>

        {/* Footer Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={!selected}
            onPress={() => {
              dispatch(setRequestInviteData({ whatLookingFor: selected }));
              navigation.navigate('PhotoUpload');
            }}
          >
            <LinearGradient
              colors={
                !selected
                  ? ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']
                  : ['#255A3B', '#3DA8A1']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextButton}
            >
              <Text style={styles.nextText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LookingForScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    // padding: 8,
  },
  progressWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    marginRight: 10,
  },
  progressBarFill: {
    height: 4,
    backgroundColor: '#7FE9C3',
    borderRadius: 2,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 10,
    width: '90%',
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
    marginBottom: 25,
    fontFamily: 'Urbanist-Medium',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
    fontFamily: 'Urbanist-Medium',
  },
  cardDesc: {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 18,
    fontFamily: 'Urbanist-Medium',
  },
  footer: {
    marginBottom: 30,
  },
  nextButton: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 30,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  icon2: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
