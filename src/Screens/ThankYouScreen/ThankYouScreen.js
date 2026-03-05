import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { onboardingApi, showApiErrorToast } from '../../utils/Apis';
import { getToastRef } from '../../utils/toastRef';

const { width } = Dimensions.get('window');

const WHAT_LOOKING_FOR_LABELS = {
  1: 'Casual Dating',
  2: 'Serious Relationship',
  3: 'Marriage',
  4: 'Discovering My Dating Goals',
};

function formatDateOfBirth(dob) {
  if (!dob) return '';
  const d = dob instanceof Date ? dob : new Date(dob);
  if (isNaN(d.getTime())) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function capitalizeFirst(str) {
  if (!str || typeof str !== 'string') return '';
  const lower = str.toLowerCase();
  if (lower === 'nonbinary') return 'Non-binary';
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

function buildOnboardingPayload(requestInviteData, userValue, dispatch, setLoading, navigation) {
  const data = requestInviteData ?? {};
  const whatId = data.whatLookingFor;
  const whatLabel =
    whatId != null && WHAT_LOOKING_FOR_LABELS[whatId] != null
      ? WHAT_LOOKING_FOR_LABELS[whatId]
      : '';

  const payload = {
    name: data.name || '',
    email: data.email || '',
    password: data.password || '',
    country_flag: data.country_flag || '',
    country_code: data.country_code || '',
    phone: data.phone || '',
    date_of_birth: formatDateOfBirth(data.dob),
    gender: capitalizeFirst(data.gender),
    country: data.country || '',
    state: data.state || '',
    city: data.city || '',
    linkedin_or_instagram_handle: data.linkedin || '',
    how_did_you_hear_about_saige: data.howDidYouHear || '',
    who_would_you_like_to_meet: capitalizeFirst(data.whoWouldYouLikeToMeet),
    what_are_you_looking_for: whatLabel,
    image_uri: data.profileImageUri || null,
    face_image_uri: data.profileImageUri || data.faceImageUri || null,
  };

  const onSuccess = (response) => {
    getToastRef()?.showSuccess?.('Profile submitted successfully.');
    const data = response?.data?.data ?? response?.data ?? {};
    if (data.is_onboarding_completed === true && navigation?.replace) {
      navigation.replace('TellUsScreen');
    }
  };
  onboardingApi(dispatch, payload, setLoading, onSuccess).catch(err => {
    showApiErrorToast(err, 'Failed to submit profile. Please try again.');
  });
}

const ThankYouScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const userValue = useSelector(
    state => state.userReducer?.userValue ?? null,
  );
  const token = useSelector(state => state.userReducer?.token ?? '');
  const [loading, setLoading] = useState(false);
  const hasCalledOnboarding = useRef(false);

  useEffect(() => {
    if (hasCalledOnboarding.current || !token) return;
    hasCalledOnboarding.current = true;
    setLoading(true);
    buildOnboardingPayload(requestInviteData, userValue, dispatch, setLoading, navigation);
  }, [token, dispatch, requestInviteData, userValue, navigation]);

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.background}
      blurRadius={6}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              // backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 50,
              // width: 40,
              // height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>Thank You</Text>
          </View>
          <View style={{ width: 26 }} /> {/* spacer for symmetry */}
        </View>
        <Text style={styles.title}>Thank You</Text>
        <Text style={styles.subtitle}>
          Saige is reviewing your details. You will be notified via email and
          app for the approval of your profile
        </Text>
        {loading && (
          <View style={styles.loaderWrap}>
            <ActivityIndicator size="large" color="#3DA8A1" />
          </View>
        )}
        {/* Content */}
        <View style={styles.content}>
          <Image
            source={require('../../Assets/IMAGES/logo2.png')} // your background image
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TellUsScreen')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextBtn}
            >
              <Text style={styles.nextText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => console.log('Share pressed')}
            activeOpacity={0.8}
            style={styles.shareBtn}
          >
            <Text style={styles.shareText}>
              Share with three people to fast track approval
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ThankYouScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pillContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 50,
  },
  pillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  loaderWrap: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  content: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 50,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
  },
  logo: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: Platform.OS === 'android' ? 80 : 200,
  },
  nextBtn: {
    width: width * 0.9,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  shareBtn: {
    width: width * 0.9,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  shareText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 15,
    fontFamily: 'Urbanist-Medium',
    width: 250,
  },
});
