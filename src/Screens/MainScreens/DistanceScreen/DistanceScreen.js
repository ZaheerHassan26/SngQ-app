import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
  ActivityIndicator,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { setPostApprovalData } from '../../../redux/actions';
import { postApprovalApi } from '../../../utils/Apis';
import { getToastRef } from '../../../utils/toastRef';

const { width } = Dimensions.get('window');

const DistanceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postApprovalData = useSelector(
    state => state.userReducer?.postApprovalData ?? {},
  );
  const [distance, setDistance] = useState(15);
  const [loading, setLoading] = useState(false);
  const [locationReady, setLocationReady] = useState(false);

  const stepIndex = 4;
  const totalSteps = 4;
  const progressWidth = '100%';

  useEffect(() => {
    const fetchLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          dispatch(
            setPostApprovalData({
              latitude: String(latitude),
              longitude: String(longitude),
            }),
          );
          setLocationReady(true);
        },
        () => {
          dispatch(
            setPostApprovalData({
              latitude: '0',
              longitude: '0',
            }),
          );
          setLocationReady(true);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    };

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(() => fetchLocation());
    } else {
      fetchLocation();
    }
  }, [dispatch]);

  const handleNext = () => {
    dispatch(
      setPostApprovalData({
        preferred_distance_km: String(Math.round(distance)),
      }),
    );
    const payload = {
      ...postApprovalData,
      preferred_distance_km: String(Math.round(distance)),
      latitude: postApprovalData.latitude || '0',
      longitude: postApprovalData.longitude || '0',
      interests: (postApprovalData.interests || []).map(i =>
        typeof i === 'string' ? i.toLowerCase().replace(/\s+/g, '_') : String(i),
      ),
      pictureUris: postApprovalData.pictureUris || [],
    };
    setLoading(true);
    postApprovalApi(dispatch, payload, setLoading, () => {
      getToastRef()?.showSuccess?.('Submitted successfully.');
      navigation.replace('NextChatScreen');
    }).catch((error) => {
      console.log('error=======>', error.response);
      setLoading(false);
    });
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {/* Header (no back button) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <View style={styles.progressWrapper}>
            <View style={styles.progressTrack}>
              <View
                style={[styles.progressFill, { width: progressWidth }]}
              />
            </View>
            <Text style={styles.progressText}>{`${stepIndex}/${totalSteps}`}</Text>
          </View>
        </View>

        {/* Title & Description */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            What distance you want your partner to be
          </Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod
          </Text>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <ImageBackground
            source={require('../../../Assets/IMAGES/newc.png')}
            resizeMode="cover"
            style={styles.map}
          >
            <Image
              source={require('../../../Assets/IMAGES/rrr.png')}
              style={styles.mapCircle}
            />
          </ImageBackground>
        </View>

        {/* Slider */}
        <View style={styles.sliderLabelRow}>
          <Text style={styles.sliderLabel}>Preferred Distance</Text>
          <Text style={styles.sliderValue}>{distance}KM</Text>
        </View>

        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={100}
          step={1}
          value={distance}
          minimumTrackTintColor="#34D399"
          maximumTrackTintColor="#222E2B"
          thumbTintColor="#34D399"
          onValueChange={setDistance}
        />

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.9}
          disabled={loading}
          style={{
            marginTop: Platform.OS === 'android' ? 100 : 170,
            alignSelf: 'center',
          }}
        >
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.nextText}>Next</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    // flex: 1,
    alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
  },
  progressTrack: {
    width: '85%',
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ADE80',
  },
  progressText: {
    position: 'absolute',
    right: 0,
    color: '#B4CEC2',
    fontSize: 13,
  },
  textContainer: {
    marginTop: 40,
    marginBottom: 25,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
  },
  subtitle: {
    color: '#B6CFC3',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  mapContainer: {
    height: 220,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
  },
  map: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapCircle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sliderLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  sliderValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  nextButton: {
    width: width * 0.9,
    height: 55,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DistanceScreen;
