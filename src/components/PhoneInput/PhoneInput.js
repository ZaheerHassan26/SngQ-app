import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Common phone input: country picker + phone field.
 * Design matches Forgot Password screen (rounded row, label, error below).
 * Use with react-hook-form Controller or controlled value/onChange.
 *
 * @param {string} value - Phone number (digits only or formatted)
 * @param {function} onChangeText - (text) => void
 * @param {string} countryCode - ISO 3166-1 alpha-2 (e.g. 'US')
 * @param {string} callingCode - e.g. '1'
 * @param {function} onSelectCountry - (country) => void; country.cca2, country.callingCode[0]
 * @param {string} [error] - Error message to show below input
 * @param {string} [label] - Label above input (default 'Phone')
 * @param {string} [placeholder] - Placeholder (default '1234567890')
 * @param {boolean} [editable] - If false, field is read-only (default true)
 */
const PhoneInput = ({
  containerStyle,
  value,
  onChangeText,
  countryCode,
  callingCode,
  onSelectCountry,
  error,
  label = 'Phone',
  placeholder = '1234567890',
  editable = true,
}) => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.phoneRow, !editable && styles.phoneRowDisabled, containerStyle]}>
        <TouchableOpacity
          onPress={() => editable && setVisible(true)}
          style={styles.countryTouch}
          disabled={!editable}
          activeOpacity={editable ? 0.7 : 1}
        >
          <CountryPicker
            countryCode={countryCode}
            withFlag
            withCallingCode
            withModal
            visible={visible}
            withCloseButton
            withFilter
            filterProps={{ placeholder: 'Search country...' }}
            onSelect={country => {
              onSelectCountry(country);
              setVisible(false);
            }}
            onClose={() => setVisible(false)}
          />
          <Icon name="chevron-down" size={16} color="#fff" />
        </TouchableOpacity>
        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={value}
          onChangeText={onChangeText}
          keyboardType="phone-pad"
          editable={editable}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Urbanist-Medium',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 8,
    height: 60,
  },
  phoneRowDisabled: {
    opacity: 0.8,
  },
  countryTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderColor:'#FFFFFF1A',
    borderRadius: 30,
    height: 60,
    borderWidth:1,
    gap: 6,
  },
  callingCode: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  phoneInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingLeft: 10,
    fontFamily: 'Urbanist-Medium',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 16,
    fontFamily: 'Urbanist-Medium',
  },
});
