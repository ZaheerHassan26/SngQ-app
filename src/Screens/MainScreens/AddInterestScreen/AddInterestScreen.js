import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { setPostApprovalData } from '../../../redux/actions';

const { width } = Dimensions.get('window');

const AddInterestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const postApprovalData = useSelector(
    state => state.userReducer?.postApprovalData ?? {},
  );
  const [interest, setInterest] = useState('');

  const handleNext = () => {
    const trimmed = interest.trim();
    if (trimmed === '') return;
    const existingCustom = postApprovalData.customInterestLabels || [];
    const existingInterests = postApprovalData.interests || [];
    dispatch(
      setPostApprovalData({
        customInterestLabels: [...existingCustom, trimmed],
        interests: [...existingInterests, trimmed],
      }),
    );
    navigation.replace('LifestyleScreen');
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../Assets/IMAGES/splashBg2.png')}
        style={styles.background}
        resizeMode="cover"
        blurRadius={2}
      >
        <View style={{ flex: 1 }}>
          {/* Header (no back button) */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Image source={require('../../../Assets/IMAGES/Icon.png')} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Add Interest</Text>
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.label}>Interest</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Type here"
                placeholderTextColor="rgba(255,255,255,0.6)"
                style={styles.input}
                value={interest}
                onChangeText={setInterest}
              />
            </View>
          </View>

          {/* Next Button - returns to interests screen */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            style={styles.buttonWrapper}
            disabled={!interest.trim()}
          >
            <LinearGradient
              colors={
                interest.trim()
                  ? ['#255A3B', '#3DA8A1']
                  : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.nextButton}
            >
              <Text style={styles.nextText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 25,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 40,
    fontFamily: 'Urbanist-Medium',
  },
  titleGradient: {
    paddingVertical: 6,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  titleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  content: {
    marginHorizontal: 25,
    marginTop: 60,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'Urbanist-Medium',
  },
  inputWrapper: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    height: 50,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: Platform.OS === 'android' ? 400 : 540,
  },
  nextButton: {
    width: width * 0.9,
    height: 55,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  nextText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
});

export default AddInterestScreen;
