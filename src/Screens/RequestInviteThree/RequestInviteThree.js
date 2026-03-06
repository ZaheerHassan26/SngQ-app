import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { getToastRef } from '../../utils/toastRef';
import { setRequestInviteData } from '../../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const getInitialDate = () => {
  const today = new Date();
  return new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
};

const isAtLeast18 = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;
  return age >= 18;
};

const formatDateDisplay = (d) =>
  `${d.toLocaleString('en-US', { month: 'long' })}  ${d.getDate()}  ${d.getFullYear()}`;

const RequestInviteThree = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const { name } = route.params || {};
  const displayName = (name && String(name).trim()) || (requestInviteData.name && String(requestInviteData.name).trim()) || 'there';

  const [date, setDate] = useState(getInitialDate);

  const onChange = (event, selectedDate) => {
    if (Platform.OS === 'android' && event?.type === 'dismissed') {
      return;
    }
    const newDate = selectedDate || date;
    setDate(newDate);
  };

  const openAndroidPicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      display: 'default',
      maximumDate: new Date(),
      onChange,
    });
  };

  const onNext = () => {
    if (!isAtLeast18(date)) {
      getToastRef()?.showError?.('You must be at least 18 years old to continue.');
      return;
    }
    dispatch(setRequestInviteData({ dob: date }));
    navigation.navigate('RequestInviteScreen', { name: displayName });
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView style={styles.safeArea}>

      <AuthHeader title="Request Invite" onBack={() => navigation.goBack()} />
      </SafeAreaView>


      {/* Title Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Thanks, {displayName}. When do we get to celebrate you?
        </Text>
      </View>

      {/* Date Picker: iOS = inline spinner; Android = tap to open picker */}
      <View style={styles.datePickerContainer}>
        {Platform.OS === 'ios' ? (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            onChange={onChange}
            locale="en-US"
            textColor="#ffffff"
            style={styles.datePicker}
            maximumDate={new Date()}
          />
        ) : (
          <TouchableOpacity
            onPress={openAndroidPicker}
            style={styles.dateDisplay}
            activeOpacity={0.7}
          >
            <Text style={styles.dateText}>{formatDateDisplay(date)}</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        onPress={onNext}
        activeOpacity={0.8}
        style={{ marginBottom: 15, alignSelf: 'center' }}
      >
        <LinearGradient
          colors={['#255A3B', '#3DA8A1']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signInBtn}
        >
          <Text style={styles.signInText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 60 : 30,
  },

  textContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginHorizontal:20
  },
  title: {
    color: '#fff',
    fontSize: 26,
    textAlign: 'center',
    width: '90%',
    fontFamily: 'Urbanist-Medium',
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  datePicker: {
    backgroundColor: 'transparent',
  },
  dateDisplay: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Urbanist-Medium',
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    // marginTop: 20,
    marginBottom: 40,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Urbanist-Medium',
  },
});

export default RequestInviteThree;
