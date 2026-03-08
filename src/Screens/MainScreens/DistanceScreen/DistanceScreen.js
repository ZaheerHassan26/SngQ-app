import React, { useState, useEffect, useCallback } from 'react';
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
import MapView, { Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '@react-native-community/slider';
import Geolocation from '@react-native-community/geolocation';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { setPostApprovalData } from '../../../redux/actions';
import { postApprovalApi } from '../../../utils/Apis';
import { getToastRef } from '../../../utils/toastRef';

const { width } = Dimensions.get('window');

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

// Scale map zoom so the distance circle doesn't fill the whole map (~1° ≈ 111 km)
const getDeltasForDistanceKm = (km) => {
  const deg = Math.max(0.02, Math.min(2, (km * 10) / 111));
  return { latitudeDelta: deg, longitudeDelta: deg };
};

const INTEREST_VALUE_MAP = {
  Travel: 'travel',
  Vacation: 'vacation',
  Romance: 'romance',
  Chat: 'chat',
  'Friends\nwith\nbenefit': 'friends_with_benefit',
  Joga: 'joga',
  Cooking: 'cooking',
  Pets: 'pets',
  Movies: 'movies',
  Gaming: 'gaming',
  Music: 'music',
  Photography: 'photography',
  Art: 'art',
  'Experiments\nopen': 'experiments_open',
  'Sugar\ndaddy': 'sugar_daddy',
  "Don't\nknow": 'dont_know',
};

const DistanceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const mapRef = React.useRef(null);
  const postApprovalData = useSelector(
    state => state.userReducer?.postApprovalData ?? {},
  );
  const [distance, setDistance] = useState(15);
  const [loading, setLoading] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [mapRegion, setMapRegion] = useState(DEFAULT_REGION);
  const [userLocation, setUserLocation] = useState(null);

  const stepIndex = 4;
  const totalSteps = 4;
  const progressWidth = '100%';

  const centerCoord = {
    latitude: mapRegion.latitude,
    longitude: mapRegion.longitude,
  };

  useEffect(() => {
    const fetchLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          dispatch(
            setPostApprovalData({
              latitude: String(latitude),
              longitude: String(longitude),
            }),
          );
          const deltas = getDeltasForDistanceKm(distance);
          setMapRegion({
            latitude,
            longitude,
            ...deltas,
          });
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

  const goToCurrentLocation = useCallback(() => {
    const deltas = getDeltasForDistanceKm(distance);
    if (userLocation) {
      const region = {
        ...userLocation,
        ...deltas,
      };
      setMapRegion(region);
      mapRef.current?.animateToRegion?.(region, 400);
      dispatch(
        setPostApprovalData({
          latitude: String(userLocation.latitude),
          longitude: String(userLocation.longitude),
        }),
      );
    } else {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          const region = {
            latitude,
            longitude,
            ...getDeltasForDistanceKm(distance),
          };
          setMapRegion(region);
          mapRef.current?.animateToRegion?.(region, 400);
          dispatch(
            setPostApprovalData({
              latitude: String(latitude),
              longitude: String(longitude),
            }),
          );
        },
        () => getToastRef()?.showError?.('Could not get location.'),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, [userLocation, dispatch, distance]);

  const handleRegionChangeComplete = useCallback(
    region => {
      setMapRegion(prev => {
        if (!prev) return { ...region };
        const centerMoved =
          Math.abs(prev.latitude - region.latitude) > 1e-5 ||
          Math.abs(prev.longitude - region.longitude) > 1e-5;
        if (!centerMoved) return prev;
        dispatch(
          setPostApprovalData({
            latitude: String(region.latitude),
            longitude: String(region.longitude),
          }),
        );
        return { ...prev, latitude: region.latitude, longitude: region.longitude };
      });
    },
    [dispatch],
  );

  const handleNext = () => {
    const selectedInterests = postApprovalData.interests || [];
    const customInterestLabels = (postApprovalData.customInterestLabels || [])
      .map(label => String(label || '').trim())
      .filter(Boolean);

    const normalizedInterests = selectedInterests
      .map(item => {
        const label = String(item || '').trim();
        if (!label) return null;
        return INTEREST_VALUE_MAP[label] || label;
      })
      .filter(Boolean);

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
      interests: normalizedInterests,
      customInterestLabels,
      pictureUris: postApprovalData.pictureUris || [],
    };
    if (__DEV__) {
      console.log('[PostApproval][Payload]', {
        interests: payload.interests,
        customInterestLabels: payload.customInterestLabels,
        preferred_distance_km: payload.preferred_distance_km,
        latitude: payload.latitude,
        longitude: payload.longitude,
        pictureCount: payload.pictureUris.length,
      });
    }
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

        {/* Map Section - center marker overlay + translucent circle by distance */}
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            style={styles.map}
            region={{ ...mapRegion, ...getDeltasForDistanceKm(distance) }}
            showsUserLocation={false}
            showsMyLocationButton={false}
            onRegionChangeComplete={handleRegionChangeComplete}
          >
            <Circle
              center={centerCoord}
              radius={distance * 1000}
              fillColor="rgba(59, 130, 246, 0.28)"
              strokeColor="rgba(59, 130, 246, 0.6)"
              strokeWidth={1.5}
            />
          </MapView>
          {/* Fixed center marker (overlay) */}
          <View style={styles.centerMarkerOverlay} pointerEvents="none">
            <Image
              source={require('../../../Assets/IMAGES/rrr.png')}
              style={styles.centerMarkerImage}
              resizeMode="contain"
            />
          </View>
          {/* Current location button */}
          <TouchableOpacity
            style={styles.currentLocationButton}
            onPress={goToCurrentLocation}
            activeOpacity={0.8}
          >
            <Icon name="locate" size={24} color="#fff" />
          </TouchableOpacity>
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
    height: 219,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 30,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  centerMarkerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerMarkerImage: {
    width: 52,
    height: 52,
    marginTop: -26,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(52, 211, 153, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: { elevation: 4 },
    }),
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
