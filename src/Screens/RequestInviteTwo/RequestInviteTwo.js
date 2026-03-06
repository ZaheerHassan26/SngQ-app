import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { setRequestInviteData } from '../../redux/actions';

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
});

const getDisplayNameFromUserValue = (userValue) => {
  if (!userValue) return '';
  const name =
    userValue?.user?.name ??
    userValue?.data?.user?.name ??
    userValue?.data?.customer?.name ??
    userValue?.name ??
    '';
  return typeof name === 'string' ? name.trim() : '';
};

const RequestInviteTwo = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userValue = useSelector(state => state.userReducer?.userValue ?? null);
  const nameFromParams = route?.params?.name ?? '';
  const nameFromRedux = getDisplayNameFromUserValue(userValue);
  const initialName = (nameFromParams || nameFromRedux) || '';

  const { control, handleSubmit, watch } = useForm({
    defaultValues: { name: initialName },
    resolver: yupResolver(nameSchema),
  });
  const nameValue = watch('name');
  const hasName = nameValue?.trim()?.length > 0;

  const onNext = (data) => {
    const trimmedName = data.name?.trim() || '';
    if (trimmedName) {
      dispatch(setRequestInviteData({ name: trimmedName }));
      navigation?.navigate('RequestInviteThree', { name: trimmedName });
    }
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
      <AuthHeader showBackButton={false} title="Request Invite" onBack={() => navigation?.goBack()} />

      {/* Question */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>What should Saige call you?</Text>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../Assets/IMAGES/slogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Input - original design */}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <TextInput
                placeholder="Type your name"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {error?.message ? (
                <Text style={styles.errorText}>{error.message}</Text>
              ) : null}
            </>
          )}
        />
      </View>

      {/* Next Button - original conditional styling */}
      {hasName ? (
        <TouchableOpacity
          onPress={handleSubmit(onNext)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.nextButton}
          >
            <Text style={styles.nextText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <View style={styles.nextButton}>
          <LinearGradient
            colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.1)']}
            style={styles.nextButton}
          >
            <Text style={[styles.nextText, { color: 'rgba(255,255,255,0.5)' }]}>
              Next
            </Text>
          </LinearGradient>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 100,
  },
  requestInvite: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 25,
    paddingVertical: 9,
    borderRadius: 20,
  },
  requestText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  textContainer: {
    top: -60,
    width: '60%',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'Urbanist-Medium',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    bottom: 60,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
    paddingVertical: 8,
    paddingBottom: 20,
    bottom: 100,
    fontFamily: 'Urbanist-Medium',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
  },
  nextButton: {
    borderRadius: 90,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  disabledButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default RequestInviteTwo;
