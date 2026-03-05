import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { Camera } from 'react-native-camera-kit';
import { getRequestInviteStep } from '../../config/requestInviteSteps';
import { setRequestInviteData } from '../../redux/actions';

const { width, height } = Dimensions.get('window');

const FacialScanScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const [hasPermission, setHasPermission] = useState(false);

  const { stepIndex, totalSteps } = getRequestInviteStep('FacialScanScreen');
  const progressWidth = `${(stepIndex / totalSteps) * 100}%`;

  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera for facial scan.',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    };
    requestPermission();
  }, []);

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      blurRadius={6}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.topRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>

          <View style={styles.progressBarWrapper}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.progressText}>{`${stepIndex}/${totalSteps}`}</Text>
          </View>
        </View>

        {/* Camera View */}
        <View style={styles.contentContainer}>
          <View style={styles.faceBoxContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../Assets/IMAGES/face_image.png')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
            {/* <View style={styles.faceFrame}>
              {hasPermission ? (
                <Camera
                  style={styles.cameraPreview}
                  cameraType="front" 
                  flashMode="off"
                  focusMode="on"
                  zoomMode="off"
                />
              ) : (
                <Text style={styles.permissionText}>
                  Waiting for camera permission...
                </Text>
              )}
            </View> */}
          </View>

          {/* Text section */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Position your face in the Box</Text>
            <Text style={styles.subtitle}>
              Please use a clear solo shot. No group photos or blurry pics — we
              don’t want to delay approval.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => {
              if (requestInviteData.profileImageUri) {
                dispatch(
                  setRequestInviteData({
                    faceImageUri:
                      requestInviteData.faceImageUri ||
                      requestInviteData.profileImageUri,
                  }),
                );
              }
              navigation.navigate('ThankYouScreen');
            }}
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
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default FacialScanScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#5DAD92',
    borderRadius: 4,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  faceBoxContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    width: 350,
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
  },
  faceFrame: {
    width: width * 0.8,
    height: width * 1.0,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#5DAD92',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPreview: {
    width: '100%',
    height: '100%',
  },
  permissionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  textContainer: {
    marginTop: 40,
    paddingHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  nextBtn: {
    width: width * 0.9,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
});
