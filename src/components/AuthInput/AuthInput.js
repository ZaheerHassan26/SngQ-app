import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

/**
 * Common auth input: same style for email/text and password.
 * For password, shows an eye icon that toggles visibility.
 */
const AuthInput = ({
  label,
  value,
  onChangeText,
  onBlur,
  placeholder = '',
  placeholderTextColor = 'rgba(255,255,255,0.5)',
  error,
  secureTextEntry = false,
  editable = true,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  autoCorrect = true,
  containerStyle,
  inputWrapperStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  ...rest
}) => {
  const isPassword = secureTextEntry;
  const [visible, setVisible] = useState(false);
  const actuallySecure = isPassword && !visible;

  return (
    <View style={[styles.container, containerStyle]}>
      {label != null && label !== '' ? (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      ) : null}
      <View style={[styles.inputWrapper, inputWrapperStyle]}>
        <TextInput
          style={[
            styles.input,
            !editable && styles.inputDisabled,
            isPassword && styles.inputWithIcon,
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          secureTextEntry={actuallySecure}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          {...rest}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setVisible(v => !v)}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Icon
              name={visible ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    marginTop: 20,
    fontFamily: 'Urbanist-Medium',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    width: width * 0.91,
    alignSelf: 'center',
    borderColor: '#ccc',
  },
  input: {
    flex: 1,
    color: 'white',
    height: '100%',
    paddingVertical: 0,
    fontFamily: 'Urbanist-Medium',
  },
  inputWithIcon: {
    paddingRight: 8,
  },
  inputDisabled: {
    opacity: 0.85,
  },
  eyeButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: 'Urbanist-Medium',
  },
});

export default AuthInput;
