import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

const SelectDate = ({ navigation }) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [step, setStep] = useState(5); // Changed from 3 to 5
  const TOTAL_STEPS = 10;
  const [selectedGender, setSelectedGender] = useState(null);

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      console.log('Selected Gender:', selectedGender);
    } else {
      console.log('Form Completed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F2F" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Registration</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(step / TOTAL_STEPS) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.stepText}>
          {step}/{TOTAL_STEPS}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>What is your date of birth</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
        nonumy eirmod
      </Text>

      {/* Input fields */}
      <View style={styles.inputRow}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Day</Text>
          <TextInput
            style={styles.input}
            placeholder="DD"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
            value={day}
            onChangeText={setDay}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Month</Text>
          <TextInput
            style={styles.input}
            placeholder="MM"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={2}
            value={month}
            onChangeText={setMonth}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Year</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY"
            placeholderTextColor="#999"
            keyboardType="numeric"
            maxLength={4}
            value={year}
            onChangeText={setYear}
          />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation?.navigate('SelectInterest')}
        style={{ marginBottom: 15, alignSelf: 'center', marginTop: 10 }}
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
    </SafeAreaView>
  );
};

export default SelectDate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0F1A',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#2E335A',
    borderRadius: 3,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#36D399',
    borderRadius: 3,
  },
  signInBtn: {
    width: width * 0.9,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
    width: 180,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 30,
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputLabel: {
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: '#3B3B98',
    borderRadius: 25,
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#141A3B',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
});
