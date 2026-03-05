import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

const CompleteProcess = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Registration</Text>
        </View>
        {/* Progress Bar */}
        <View style={styles.progressWrapper}>
          <View style={styles.progressBar} />
          <Text style={styles.progressText}>10/10</Text>
        </View>
        {/* Checkmark */}
        <View style={styles.checkWrapper}>
          <Icon name="checkmark" size={220} color="#5DAD92" />
        </View>
        {/* Message */}
        <Text style={styles.title}>Thank You</Text>
        <Text style={styles.subtitle}>
          Chemistry XO is reviewing your details. You{'\n'}
          will be notified via email and app for the{'\n'}
          approval of your profile
        </Text>
        {/* Buttons */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogoScreen');
          }}
        >
          <LinearGradient
            colors={['#5DAD92', '#2F5749']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signInBtn}
          >
            <Text style={styles.signInText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('PaymentScreen');
          }}
          style={styles.skipBtn}
        >
          <Text style={styles.skipText}>Pay $80 to Skip Review</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProcess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  progressWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: '#5DAD92',
    borderRadius: 3,
  },
  progressText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 14,
  },
  checkWrapper: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    fontSize: 14,
    color: '#858585',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 10,

    lineHeight: 20,
  },
  nextBtn: {
    backgroundColor: '#2E8B57',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 50,
  },
  nextText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  skipBtn: {
    borderWidth: 1,
    borderColor: '#38A69D',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipText: {
    color: '#38A69D',
    fontSize: 16,
    fontWeight: '600',
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center', // center text properly
    height: 55,
    justifyContent: 'center',
    marginBottom: 20,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
