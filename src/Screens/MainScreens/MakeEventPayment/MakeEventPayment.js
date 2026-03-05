import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

const PaymentScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation?.goBack()}
        >
          <Icon name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Payment</Text>
        </View>

        <View style={styles.headerRightPlaceholder} />
      </View>

      {/* Form */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Name on Card */}
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#b5b5b5"
          value={name}
          onChangeText={setName}
        />

        {/* Card Number */}
        <Text style={styles.label}>Card Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Type here"
          placeholderTextColor="#b5b5b5"
          keyboardType="number-pad"
          value={cardNumber}
          onChangeText={setCardNumber}
        />

        {/* Expiry & CVC */}
        <View style={styles.row}>
          <View style={[styles.column, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="MM/YYYY"
              placeholderTextColor="#b5b5b5"
              value={expiry}
              onChangeText={setExpiry}
            />
          </View>

          <View style={[styles.column, { flex: 1 }]}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="Type here"
              placeholderTextColor="#b5b5b5"
              keyboardType="number-pad"
              value={cvc}
              onChangeText={setCvc}
            />
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation?.navigate('DownloadTicket')}
        >
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']} // Left to right gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.nextBtn}
          >
            <Text style={styles.nextText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10,
    borderRadius: 25,
  },
  headerCenter: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },
  headerRightPlaceholder: {
    width: 42,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Urbanist-Medium',
  },
  input: {
    height: 52,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  inputSmall: {
    height: 52,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'Urbanist-Medium',
  },
  nextBtn: {
    borderRadius: 60,

    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 220 : 390,
    marginBottom: 60,
    width: '100%',
    height: 55,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Urbanist-SemiBold',
  },
});

export default PaymentScreen;
