import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { getRequestInviteStep } from '../../config/requestInviteSteps';
import { setRequestInviteData } from '../../redux/actions';

const { width } = Dimensions.get('window');

const PhotoUpload = ({ navigation }) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);

  const { stepIndex, totalSteps } = getRequestInviteStep('PhotoUpload');
  const progressWidth = `${(stepIndex / totalSteps) * 100}%`;

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setPhoto(result.assets[0].uri);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      blurRadius={6}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Scrollable content */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top progress and back */}
          <View style={styles.topRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../Assets/IMAGES/Icon.png')}
                style={styles.icon2}
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

          {/* Title and subtitle */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>No catfishing. Drop a photo.</Text>
            <Text style={styles.subtitle}>
              Please use a clear solo shot. No group photos or blurry pics - we
              don’t want to delay approval.
            </Text>
          </View>

          {/* Upload box */}
          <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
            <Image
              source={require('../../Assets/IMAGES/imgg.png')}
              style={{ width: 50, height: 50, resizeMode: 'contain' }}
            />
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.uploadGradientBtn}
            >
              <Text style={styles.uploadText}>Upload Photo</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Photo preview */}
          {photo && (
            <View style={styles.previewWrapper}>
              <Image source={{ uri: photo }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeBtn} onPress={removePhoto}>
                <Icon name="close" size={18} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* Fixed footer button */}
        <View style={styles.footer}>
          <TouchableOpacity
            disabled={!photo}
            onPress={() => {
              dispatch(setRequestInviteData({ profileImageUri: photo }));
              navigation.navigate('FacialScanScreen');
            }}
            activeOpacity={0.8}
            style={{ width: '100%' }}
          >
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.nextBtn, !photo && { opacity: 0.5 }]}
            >
              <Text style={styles.nextText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PhotoUpload;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // give bottom space for footer
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
    fontFamily: 'Urbanist-Medium',
  },
  textContainer: {
    marginTop: '15%',
  },
  title: {
    color: 'white',
    fontSize: 26,
    marginBottom: 12,
    width: '65%',
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: '#ffff',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
  },
  uploadBox: {
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    height: 206,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    // marginTop: 8,
    fontFamily: 'Urbanist-Medium',
  },
  previewWrapper: {
    alignItems: 'center',
    marginTop: '15%',
  },
  previewImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
  },
  removeBtn: {
    position: 'absolute',
    bottom: -8,
    right: width / 2 - 105,
    backgroundColor: '#E52E59',
    borderRadius: 20,
    padding: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  nextBtn: {
    width: '100%',
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? 10 : 50,
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  uploadBox: {
    borderRadius: 16,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    // borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  uploadButtonInner: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 150,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.2,
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'white',
    justifyContent: 'center',
  },
  uploadGradientBtn: {
    width: 180,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon2: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
