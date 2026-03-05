import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons'; // for eye icon
const { width } = Dimensions.get('window');

const SelectInterest = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const TOTAL_STEPS = 10;
  const [step, setStep] = useState(4);

  const genders = ['Male', 'Female', 'Everyone'];

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Registration</Text>
      </View>

      {/* Progress Bar */}
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

      {/* Question */}
      <Text style={styles.question}>What are youinterested in?</Text>
      <Text style={styles.subText}>
        Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
        nonumy eirmod
      </Text>

      <View style={styles.optionsContainer}>
        {genders.map((gender, index) => {
          const isSelected = selectedGender === gender;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedGender(gender)}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!selectedGender}
          onPress={() => navigation?.navigate('LookingForScreen')}
          style={{ marginBottom: 15, alignSelf: 'center', marginTop: 10 }} // keep spacing outside
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
      </View>
    </SafeAreaView>
  );
};

export default SelectInterest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0F1A',
    padding: 20,
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
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 120,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    textAlign: 'center',
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
  stepText: {
    color: '#fff',
    fontSize: 14,
  },
  question: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 30,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#3B3E66',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#36D399',
    backgroundColor: '#1A1E2E',
    shadowColor: '#36D399',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#36D399',
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
  nextButton: {
    backgroundColor: '#36D399',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
