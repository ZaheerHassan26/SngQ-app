import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
  Dimensions,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import countries from 'world-countries';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import AuthInput from '../../components/AuthInput/AuthInput';
import PhoneInput from '../../components/PhoneInput/PhoneInput';
import { setRequestInviteData } from '../../redux/actions';
import { validatePhoneForCountry } from '../../utils/phoneValidation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width } = Dimensions.get('window');

const requestInviteSchema = yup.object().shape({
  country: yup.string().required('Country is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  email: yup
    .string()
    .required('Email is required')
    .trim()
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .trim()
    .transform(v => (v === '' ? undefined : v))
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  phone: yup.string().required('Phone number is required').trim(),
  linkedin: yup
    .string()
    .required('LinkedIn or Instagram handle is required')
    .trim()
    .min(2, 'Handle must be at least 2 characters'),
});

const RequestInviteScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const requestInviteData = useSelector(
    state => state.userReducer?.requestInviteData ?? {},
  );
  const userValue = useSelector(state => state.userReducer?.userValue ?? null);
  const { name } = route.params || {};
  const displayName = (name && String(name).trim()) || (requestInviteData.name && String(requestInviteData.name).trim()) || 'there';

  const emailFromLogin = userValue?.email ?? userValue?.data?.email ?? '';
  const phoneFromLogin = userValue?.phone ?? userValue?.data?.phone ?? '';
  const countryCodeFromLogin = (userValue?.country_flag ?? userValue?.data?.country_flag ?? 'US').toUpperCase().slice(0, 2);
  const countryCodeRaw = userValue?.country_code ?? userValue?.data?.country_code ?? '+1';
  const callingCodeFromLogin = String(countryCodeRaw).replace(/^\+/, '') || '1';
  const isEmailFromSocial = !!emailFromLogin && !phoneFromLogin;
  const isPhoneFromRegistration = !!phoneFromLogin;

  const defaultEmail = requestInviteData.email || emailFromLogin || '';
  const defaultPhone = requestInviteData.phone || phoneFromLogin || '';
  const [phoneCountryCode, setPhoneCountryCode] = useState(
    requestInviteData.country_flag ? requestInviteData.country_flag.toUpperCase().slice(0, 2) : countryCodeFromLogin,
  );
  const [phoneCallingCode, setPhoneCallingCode] = useState(
    requestInviteData.country_code ? String(requestInviteData.country_code).replace(/^\+/, '') : callingCodeFromLogin,
  );

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      country: requestInviteData.country || '',
      state: requestInviteData.state || '',
      city: requestInviteData.city || '',
      email: defaultEmail,
      password: requestInviteData.password || '',
      phone: defaultPhone,
      linkedin: requestInviteData.linkedin || '',
    },
    resolver: yupResolver(requestInviteSchema),
  });

  const country = watch('country');
  const state = watch('state');
  const city = watch('city');
  const email = watch('email');
  const phone = watch('phone');

  const [countryModal, setCountryModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [cityModal, setCityModal] = useState(false);

  const countryList = [
    'United States',
    ...countries
      .map(c => c.name.common)
      .filter(name => name !== 'United States')
      .sort(),
  ];
  const stateList = [
    'California',
    'Texas',
    'Florida',
    'New York',
    'Illinois',
    'Pennsylvania',
    'Ohio',
    'Georgia',
    'North Carolina',
    'Michigan',
  ];
  const cityList = [
    'New York City, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA',
    'Austin, TX',
    'Jacksonville, FL',
    'San Francisco, CA',
    'Columbus, OH',
    'Fort Worth, TX',
    'Indianapolis, IN',
    'Charlotte, NC',
    'Seattle, WA',
    'Denver, CO',
    'Washington, D.C.',
    'Boston, MA',
    'Nashville, TN',
    'El Paso, TX',
    'Detroit, MI',
    'Oklahoma City, OK',
    'Portland, OR',
    'Las Vegas, NV',
    'Memphis, TN',
    'Louisville, KY',
    'Baltimore, MD',
    'Milwaukee, WI',
    'Albuquerque, NM',
    'Tucson, AZ',
    'Fresno, CA',
    'Sacramento, CA',
    'Kansas City, MO',
    'Mesa, AZ',
    'Atlanta, GA',
    'Omaha, NE',
    'Colorado Springs, CO',
    'Raleigh, NC',
    'Miami, FL',
    'Long Beach, CA',
    'Virginia Beach, VA',
    'Oakland, CA',
    'Minneapolis, MN',
    'Tulsa, OK',
    'Tampa, FL',
    'New Orleans, LA',
    'Arlington, TX',
  ];

  const renderModalItem = (item, fieldName, setModal, selectedValue) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setValue(fieldName, item);
        setModal(false);
      }}
    >
      <Text
        style={[
          styles.modalText,
          { color: item === selectedValue ? '#fff' : '#a0b4ab' },
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const onNext = (data) => {
    const phoneTrimmed = (data.phone || '').trim();
    if (!isPhoneFromRegistration && phoneTrimmed) {
      const validation = validatePhoneForCountry(phoneTrimmed, phoneCountryCode, phoneCallingCode);
      if (!validation.valid) {
        setError('phone', { type: 'manual', message: validation.message });
        return;
      }
    }
    const countryCodeForApi = phoneCallingCode.startsWith('+') ? phoneCallingCode : `+${phoneCallingCode}`;
    dispatch(
      setRequestInviteData({
        country: data.country,
        state: data.state,
        city: data.city,
        email: (data.email || '').trim(),
        password: (data.password || '').trim(),
        phone: phoneTrimmed,
        country_code: countryCodeForApi,
        country_flag: phoneCountryCode.toLowerCase(),
        linkedin: data.linkedin,
      }),
    );
    navigation.navigate('RequestInvite');
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.bgImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <AuthHeader title="Request Invite" onBack={() => navigation.goBack()} />

        {/* Scroll Content */}
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
        >
          <Text style={styles.title}>
            Thanks, {displayName}. Where are you located?
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthInput
                label="Email*"
                placeholder="your@email.com"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isEmailFromSocial}
                inputStyle={isEmailFromSocial ? styles.inputDisabled : undefined}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthInput
                label="Password"
                placeholder="Enter your password"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                error={errors.password?.message}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          {/* Phone */}
          <View style={{ marginTop: 20, width: "107%", right: 12 }}>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
                <PhoneInput
                  value={value}
                  onChangeText={onChange}
                  countryCode={phoneCountryCode}
                  callingCode={phoneCallingCode}
                  onSelectCountry={country => {
                    setPhoneCountryCode(country.cca2);
                    setPhoneCallingCode(country.callingCode[0] || '1');
                  }}
                  error={fieldError?.message}
                  label="Phone number*"
                  placeholder="1234567890"
                  editable={!isPhoneFromRegistration}
                  containerStyle={{ marginBottom: 12, borderWidth: 0 }}
                />
              )}
            />
          </View>

          {/* Country */}
          <Text style={styles.label}>Select your Country*</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setCountryModal(true)}
          >
            <Text style={{ color: country ? '#fff' : '#a0b4ab', flex: 1 }}>
              {country || 'Select Country'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {errors.country ? (
            <Text style={styles.errorText}>{errors.country.message}</Text>
          ) : null}

          {/* State */}
          <Text style={styles.label}>Select your State*</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setStateModal(true)}
          >
            <Text style={{ color: state ? '#fff' : '#a0b4ab', flex: 1 }}>
              {state || 'Select State'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {errors.state ? (
            <Text style={styles.errorText}>{errors.state.message}</Text>
          ) : null}

          {/* City */}
          <Text style={styles.label}>Select your City*</Text>
          <TouchableOpacity
            style={styles.dropdownBox}
            onPress={() => setCityModal(true)}
          >
            <Text style={{ color: city ? '#fff' : '#a0b4ab', flex: 1 }}>
              {city || 'Select City'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#fff" />
          </TouchableOpacity>
          {errors.city ? (
            <Text style={styles.errorText}>{errors.city.message}</Text>
          ) : null}

          {/* LinkedIn */}
          <Text style={styles.label}>LinkedIn or Instagram handle*</Text>
          <Controller
            control={control}
            name="linkedin"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. @username or linkedin.com/in/username"
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
                {errors.linkedin ? (
                  <Text style={styles.errorText}>{errors.linkedin.message}</Text>
                ) : null}
              </>
            )}
          />
        </KeyboardAwareScrollView>


        {/* Button */}
        <TouchableOpacity
          onPress={handleSubmit(onNext)}
          activeOpacity={0.8}
          style={{ marginVertical: 15, alignSelf: 'center' }}
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

        {/* Country Modal */}
        <Modal visible={countryModal} animationType="slide" transparent={false}>
          <ImageBackground
            source={require('../../Assets/IMAGES/splashBg2.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.modalContainerOverlay}>
              <View style={styles.topContainer2}>
                <TouchableOpacity
                  onPress={() => setCountryModal(false)}
                  style={styles.backButton}
                >
                  <Icon name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.requestInvite}>
                  <Text style={styles.requestText}>Select Country</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>Select Country</Text>
              <FlatList
                data={countryList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  renderModalItem(item, 'country', setCountryModal, country)
                }
              />
            </View>
          </ImageBackground>
        </Modal>

        {/* State Modal */}
        <Modal visible={stateModal} animationType="slide" transparent={false}>
          <ImageBackground
            source={require('../../Assets/IMAGES/splashBg2.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.modalContainerOverlay}>

              {/* <AuthHeader title="Select State" onBack={() => setStateModal(false)} /> */}
              <View style={styles.topContainer2}>
                <TouchableOpacity
                  onPress={() => setStateModal(false)}
                  style={styles.backButton}
                >
                  <Icon name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.requestInvite}>
                  <Text style={styles.requestText}>Select State</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>Select State</Text>
              <FlatList
                data={stateList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  renderModalItem(item, 'state', setStateModal, state)
                }
              />
            </View>
          </ImageBackground>
        </Modal>

        {/* City Modal */}
        <Modal visible={cityModal} animationType="slide" transparent={false}>
          <ImageBackground
            source={require('../../Assets/IMAGES/splashBg2.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.modalContainerOverlay}>
              <View style={styles.topContainer2}>
                <TouchableOpacity
                  onPress={() => setCityModal(false)}
                  style={styles.backButton}
                >
                  <Icon name="chevron-back" size={22} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.requestInvite}>
                  <Text style={styles.requestText}>Select City</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.modalTitle}>Select City</Text>
              <FlatList
                data={cityList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                  renderModalItem(item, 'city', setCityModal, city)
                }
              />
            </View>
          </ImageBackground>
        </Modal>
      </SafeAreaView>
    </ImageBackground >
  );
};

export default RequestInviteScreen;

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 12,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 15,
    width: '90%',
    fontFamily: 'Urbanist-Medium',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    marginTop: 20,
    fontFamily: 'Urbanist-Medium',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: 'Urbanist-Medium',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingHorizontal: 20,
    color: 'white',
    height: 60,
    marginBottom: 2,
    width: width * 0.91,
    fontFamily: 'Urbanist-Medium',
    alignSelf: 'center',
    borderColor: '#ccc',
  },
  inputDisabled: {
    opacity: 0.85,
  },
  dropdownBox: {
    width: width * 0.91,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 15,
    paddingVertical: 14,
    marginBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    fontFamily: 'Urbanist-Medium',
  },
  modalItem: {
    paddingVertical: 12,
    // borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  topContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 60 : 40,
  },
  topContainer2: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    gap: Platform.OS === 'ios' ? 90 : 60,
    marginTop: Platform.OS === 'ios' ? 50 : 4,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FFFFFF1A',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 8,
  },
  requestInvite: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  requestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // adds a subtle dark overlay for readability
    padding: 20,
  },
});
