import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import {AntDesign, Entypo, Ionicons, MaterialIcons} from '../../utils/Exports';
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import RNFetchBlob from 'rn-fetch-blob';
import {styles} from './Style';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import Theme from '../../utils/Theme';
import Clipboard from '@react-native-clipboard/clipboard';
import {dispatchSocialType} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import InstaCopyModal from '../InstaCopyModal/InstaCopyModal';
import SnapchatModal from '../SnapchatModal/SnapchatModal';

const ShareModal = ({
  visible,
  onClose,
  colors,
  textValue,
  copyText,
  setModalVisibleF,
}) => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [selectedIcon, setSelectedIcon] = useState('snapchat');
  const [base64Image, setBase64Image] = useState('');
  const [loading, setLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);
  const [instagramImage, setInstagramImage] = useState(null);
  const viewShotRefsnap = useRef(null);
  const viewShotRefInsta = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [snapVisible, setSnapVisible] = useState(false);
  const dispatch = useDispatch();

  // Adding animated values for fading effect
  const fadeAnimSnapchat = useRef(new Animated.Value(1)).current;
  const fadeAnimInstagram = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    copyToClipboard();
    if (visible) {
      captureAndConvertToBase64();
    }
  }, [visible]);

  const toggleModal100 = () => {
    setModalVisibleF(false);
  };

  const copyToClipboard = () => {
    Clipboard.setString(copyText);
  };

  const toggleSnapModal = () => {
    setSnapVisible(!snapVisible);
  };

  const toggleModal1 = () => {
    setModalVisible(!modalVisible);
  };

  const captureAndConvertToBase64 = async () => {
    if (!isImageLoaded || !isLogoLoaded) return;
    try {
      const uri = await viewShotRefsnap.current.capture();
      const instaUri = await viewShotRefInsta.current.capture();
      const base64Data = await RNFetchBlob.fs.readFile(uri, 'base64');
      const instaBase64Data = await RNFetchBlob.fs.readFile(instaUri, 'base64');
      setBase64Image(base64Data);
      setInstagramImage(instaBase64Data);
      setLoading(false);
    } catch (error) {
      console.error('Error capturing image:', error);
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (visible) {
  //     const delayCapture = setTimeout(() => {
  //       captureAndConvertToBase64();
  //     }, 500);

  //     return () => clearTimeout(delayCapture);
  //   }
  // }, [visible, isImageLoaded, isLogoLoaded]);

  useEffect(() => {
    if (visible && isImageLoaded && isLogoLoaded) {
      const delayCapture = setTimeout(() => {
        captureAndConvertToBase64();
      }, 500);

      return () => clearTimeout(delayCapture);
    }
  }, [visible, isImageLoaded, isLogoLoaded]);

  const snapImages = {
    1: require('../../Assets/IMAGES/rly-snap-flow-1.png'),
    2: require('../../Assets/IMAGES/rly-snap-flow-2.png'),
    3: require('../../Assets/IMAGES/rly-snap-flow-3.png'),
    4: require('../../Assets/IMAGES/rly-snap-flow-4.png'),
  };

  const instaImages = {
    1: require('../../Assets/IMAGES/rly-insta-flow-1.png'),
    2: require('../../Assets/IMAGES/rly-insta-flow-2.png'),
    3: require('../../Assets/IMAGES/rly-insta-flow-3.png'),
    4: require('../../Assets/IMAGES/rly-insta-flow-3new-flatpng.png'),
  };

  const handleNext = () => {
    const totalSteps = selectedIcon === 'snapchat' ? 4 : 4;
    if (selectedStep < totalSteps) {
      setSelectedStep(selectedStep + 1);
    } else {
      if (selectedIcon === 'snapchat') {
        shareToSnapchat();
      } else {
        shareToInstagram();
      }
    }
  };

  const handleIconPress = iconName => {
    if (iconName === 'snapchat') {
      setSelectedIcon('snapchat');
      // Animate the fade effect
      Animated.timing(fadeAnimSnapchat, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeAnimInstagram, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setSelectedIcon('instagram');
      // Animate the fade effect
      Animated.timing(fadeAnimInstagram, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(fadeAnimSnapchat, {
        toValue: 0.3,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setSelectedStep(1);
  };

  const shareToInstagram = async () => {
    try {
      dispatch(dispatchSocialType('IG'));
      if (!base64Image) {
        throw new Error('Base64 image data is empty.');
      }
      const shareOptions = {
        url: `data:image/png;base64,${instagramImage}`,
        social: Share.Social.INSTAGRAM_STORIES,
        appId: '862365949284326',
        backgroundImage: `data:image/png;base64,${instagramImage}`,
      };
      toggleModal1(); // Show popup after sharing to Instagram

      await Share.shareSingle(shareOptions);
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
    }
  };

  const shareToSnapchat = async () => {
    try {
      // Check if Snapchat is installed on iOS
      dispatch(dispatchSocialType('Snap'));

      const uri = await viewShotRefsnap.current.capture();

      toggleSnapModal();

      await CameraRoll.save(uri, {type: 'photo'});
    } catch (error) {
      console.error('Error sharing to Snapchat:', error.message);
    }
  };
  const stepImages = selectedIcon === 'snapchat' ? snapImages : instaImages;
  const totalSteps = selectedIcon === 'instagram' ? 4 : 4;

  const stepDescriptions = {
    snapchat: [
      'Open Snapchat and select the downloaded image',
      'Tap the link icon',
      'Paste link and tap go',
      'Tap "Attach to Snap"',
    ],
    instagram: [
      'When IG opens, tap sticker',
      'Tap on LINK icon',
      'Open IG and paste the link',
      'Open RLY app and tap copy link',
    ],
  };
  // console.log('copyText=========>', textValue);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <ViewShot
        ref={viewShotRefsnap}
        options={{format: 'png', quality: 1}}
        style={styles.hiddenViewShot}>
        <LinearGradient colors={colors} style={styles.viewShotGradient}>
          <View style={styles.viewShotContent}>
            <View style={styles.viewShotTextContainer}>
              <Text style={styles.viewShotText}>{textValue}</Text>
            </View>
            <Image
              source={require('../../Assets/IMAGES/downloadhere.png')}
              style={styles.viewShotImage}
              onLoad={() => setIsImageLoaded(true)} // Set flag when image is loaded
            />
            <View style={styles.viewShotLinkContainer}>
              <Image
                source={require('../../Assets/IMAGES/paste-sticker.png')}
                style={styles.linkImage}
              />
            </View>
          </View>

          <Image
            source={require('../../Assets/IMAGES/RLYLogo.png')}
            style={styles.viewShotLogo}
            resizeMode="contain"
            onLoad={() => setIsLogoLoaded(true)} // Set flag when image is loaded
          />
        </LinearGradient>
      </ViewShot>
      <ViewShot
        ref={viewShotRefInsta}
        options={{format: 'png', quality: 1}}
        style={styles.hiddenViewShot}>
        <LinearGradient colors={colors} style={styles.viewShotGradient}>
          <View style={styles.viewShotContent}>
            <View style={styles.viewShotTextContainer}>
              <Text style={styles.viewShotText}>{textValue}</Text>
            </View>
            <Image
              source={require('../../Assets/IMAGES/downloadhere.png')}
              style={styles.viewShotImage}
              onLoad={() => setIsImageLoaded(true)} // Set flag when image is loaded
            />
            <View style={styles.viewShotLinkContainer2}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: Theme.wp(3),
                  fontWeight: 'bold',
                  color: '#007AFF',
                }}>
                Paste Your LINK here
              </Text>
            </View>
          </View>

          <Image
            source={require('../../Assets/IMAGES/RLYLogo.png')}
            style={styles.viewShotLogo}
            resizeMode="contain"
            onLoad={() => setIsLogoLoaded(true)} // Set flag when image is loaded
          />
        </LinearGradient>
      </ViewShot>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleIconPress('snapchat')}>
              <Animated.View style={{opacity: fadeAnimSnapchat}}>
                <Image
                  source={require('../../Assets/ICONS/snapchat-btn.png')}
                  style={styles.iconImage}
                />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress('instagram')}>
              <Animated.View style={{opacity: fadeAnimInstagram}}>
                <Image
                  source={require('../../Assets/ICONS/instagram-btn.png')}
                  style={styles.iconImage}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>
            How to add the link to{' '}
            {selectedIcon === 'snapchat' ? 'Snapchat' : 'Instagram'} Story
          </Text>
          <View style={styles.steps}>
            {Array.from({length: totalSteps}).map((_, index) => {
              const step = index + 1;
              return (
                <TouchableOpacity
                  key={step}
                  onPress={() => setSelectedStep(step)}
                  style={[
                    styles.stepButton,
                    selectedStep === step && styles.stepButtonActive,
                  ]}>
                  <Text
                    style={[
                      styles.stepButtonText,
                      selectedStep === step && styles.stepButtonTextActive,
                    ]}>
                    {step}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.stepText}>
            {selectedIcon === 'snapchat'
              ? stepDescriptions.snapchat[selectedStep - 1]
              : stepDescriptions.instagram[selectedStep - 1]}
          </Text>
          <View style={styles.stepImageContainer}>
            <Image source={stepImages[selectedStep]} style={styles.stepImage} />
          </View>
          {/* <Text style={styles.instructions}>
            Attach to {selectedIcon === 'snapchat' ? 'Snap' : 'Story'}
          </Text> */}

          <TouchableOpacity
            onPress={handleNext}
            colors={colors}
            style={styles.postButton}>
            <View>
              <Text style={styles.postButtonText}>
                {selectedStep === totalSteps
                  ? selectedIcon === 'snapchat'
                    ? 'Save Image'
                    : 'Post to Instagram'
                  : 'Next'}
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              color={'white'}
              size={Theme.wp('7')}
              style={{left: 50}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.close} onPress={toggleModal100}>
            <Entypo name="cross" color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <InstaCopyModal
        copyText={copyText}
        isVisible={modalVisible}
        close={toggleModal1}
      />
      <SnapchatModal isVisible={snapVisible} onClose={toggleSnapModal} />
    </Modal>
  );
};

export default ShareModal;
