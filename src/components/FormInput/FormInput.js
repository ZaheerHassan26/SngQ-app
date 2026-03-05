import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Controller } from 'react-hook-form';

/**
 * Common form input with react-hook-form integration.
 * Shows label, optional right element (e.g. password visibility toggle), and error below in red.
 */
const FormInput = ({
  control,
  name,
  rules,
  label,
  placeholder,
  placeholderTextColor = 'rgba(255,255,255,0.5)',
  secureTextEntry = false,
  rightElement,
  onRightPress,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  keyboardType,
  autoCapitalize,
  ...textInputProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={[styles.container, containerStyle]}>
          {label ? (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          ) : null}
          <View style={[styles.inputContainer, inputContainerStyle]}>
            <TextInput
              style={[styles.input, inputStyle]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              {...textInputProps}
            />
            {rightElement ? (
              <TouchableOpacity
                style={styles.rightElement}
                onPress={onRightPress}
                activeOpacity={0.8}
              >
                {rightElement}
              </TouchableOpacity>
            ) : null}
          </View>
          {error?.message ? (
            <Text style={[styles.errorText, errorStyle]}>{error.message}</Text>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Urbanist-Medium',
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
    paddingVertical: 0,
  },
  rightElement: {
    marginLeft: 10,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
    fontFamily: 'Urbanist-Regular',

  },
});

export default FormInput;
