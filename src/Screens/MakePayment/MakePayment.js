// PaymentScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

const MakePayment = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState(''); // show error for demo

  const handleProceed = () => {
    if (!name || !cardNumber || !cvv) {
      setError('Payment Denied');
    } else {
      setError('');
      alert('Processing Payment...');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={styles.headerTitle}>Make Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#777"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>Expiry</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.inputSmall, { marginRight: 10 }]}
                placeholder="00"
                placeholderTextColor="#777"
                keyboardType="number-pad"
                maxLength={2}
                value={expiryMonth}
                onChangeText={setExpiryMonth}
              />
              <TextInput
                style={styles.inputSmall}
                placeholder="00"
                placeholderTextColor="#777"
                keyboardType="number-pad"
                maxLength={2}
                value={expiryYear}
                onChangeText={setExpiryYear}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="Type here"
              placeholderTextColor="#777"
              secureTextEntry
              keyboardType="number-pad"
              maxLength={4}
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        {/* Error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <TouchableOpacity
        onPress={() => navigation?.navigate('ThankYouScreen')}
        activeOpacity={0.8}
        style={{ marginBottom: 15, alignSelf: 'center', marginTop: 10 }} // keep spacing outside
      >
        <LinearGradient
          colors={['#5DAD92', '#2F5749']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.signInBtn}
        >
          <Text style={styles.signInText}>Proceed</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Proceed Button */}
    </SafeAreaView>
  );
};

export default MakePayment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1423',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#0F1629',
    borderRadius: 30,
    padding: 14,
    paddingVertical: 20,
    color: '#fff',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#424E6E',
  },
  inputSmall: {
    flex: 1,
    backgroundColor: '#0F1629',
    borderRadius: 30,
    padding: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#424E6E',
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#3AA276',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#3AA276',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
    marginTop: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
