import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import { setPostApprovalData } from '../../../redux/actions';
import { getToastRef } from '../../../utils/toastRef';

const { width } = Dimensions.get('window');
const MAX_IMAGES = 6;
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB

const initialSlots = Array.from({ length: MAX_IMAGES }, (_, i) => ({
  id: `slot-${i}`,
  uri: null,
}));

const AddPicturesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [slots, setSlots] = useState(initialSlots);

  const pickImageForSlot = index => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, result => {
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const fileSize = asset.fileSize;
        if (fileSize != null && fileSize > MAX_IMAGE_SIZE_BYTES) {
          getToastRef()?.showError?.('Image must be less than 2 MB. Please choose a smaller image.');
          return;
        }
        setSlots(prev =>
          prev.map((s, i) => (i === index ? { ...s, uri: asset.uri } : s)),
        );
      }
    });
  };

  const clearSlot = index => {
    setSlots(prev =>
      prev.map((s, i) => (i === index ? { ...s, uri: null } : s)),
    );
  };

  const pictureUris = slots.map(s => s.uri).filter(Boolean);

  const handleNext = () => {
    if (pictureUris.length < 1) {
      getToastRef()?.showError?.('Image is required.');
      return;
    }
    dispatch(setPostApprovalData({ pictureUris }));
    navigation.navigate('DistanceScreen');
  };

  const renderItem = ({ item, index }) => {
    if (item.uri) {
      return (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.uri }} style={styles.image} />
          <TouchableOpacity
            style={styles.removeIcon}
            onPress={() => clearSlot(index)}
          >
            <Icon name="close-circle" size={22} color="#E52E59" />
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={styles.placeholder}
        onPress={() => pickImageForSlot(index)}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {/* HEADER (no back button) */}
        <View style={styles.header}>
          <View style={styles.backButton} />

          <View style={styles.progressWrapper}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
            <Text style={styles.stepText}>3/4</Text>
          </View>
        </View>

        {/* CONTENT */}
        <View style={styles.content}>
          <Text style={styles.title}>Add Picture </Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod
          </Text>

          <FlatList
            data={slots}
            keyExtractor={item => item.id}
            numColumns={3}
            renderItem={({ item, index }) => renderItem({ item, index })}
            contentContainerStyle={styles.grid}
          />
        </View>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleNext} activeOpacity={0.8}>
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
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

export default AddPicturesScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: Platform.OS === 'ios' ? 4 : 4,
  },
  backButton: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    padding: 8,
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
    width: '30%',
    height: 4,
    backgroundColor: '#7FE9C3',
    borderRadius: 2,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  content: {
    flex: 1,
    fontFamily: 'Urbanist-Medium',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily: 'Urbanist-Medium',
    width: 260,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Urbanist-Medium',
    width: 300,
  },
  grid: { justifyContent: 'center' },
  imageWrapper: {
    margin: 8,
    flex: 1,
    height: 140,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { width: '100%', height: '100%', borderRadius: 10 },
  removeIcon: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    borderRadius: 12,
    padding: 2,
    zIndex: 1000,
  },

  placeholder: {
    margin: 8,
    flex: 1,
    height: 140,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: { fontSize: 48, color: '#858585' },
  footer: {
    marginBottom: 40,
  },
  nextButton: {
    width: width * 0.9,
    alignSelf: 'center',
    borderRadius: 30,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
});
