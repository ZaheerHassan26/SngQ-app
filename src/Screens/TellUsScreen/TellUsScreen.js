import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useDispatch } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { setPostApprovalData } from '../../redux/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const TellUsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const inset = useSafeAreaInsets();
  const [smoke, setSmoke] = useState(null);
  const [alcohol, setAlcohol] = useState(null);
  const [politics, setPolitics] = useState(null);
  const [familyPlan, setFamilyPlan] = useState(null);
  const [validationMessage, setValidationMessage] = useState('');

  const allSelected = smoke && alcohol && politics && familyPlan;

  const handleNext = () => {
    if (!allSelected) {
      setValidationMessage('Please select one option in each section.');
      return;
    }
    setValidationMessage('');
    dispatch(
      setPostApprovalData({
        do_you_smoke: smoke,
        do_you_consume_alcohol: alcohol,
        political_views: politics,
        family_plan: familyPlan,
      }),
    );
    navigation.replace('LifestyleScreen');
  };

  // Fixed renderOption function
  const renderOption = (label, selected, onPress) => {
    return (
      <TouchableOpacity
        style={styles.option}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {selected ? (
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.optionInner}
          >
            <Text style={[styles.optionText, styles.optionTextSelected]}>
              {label}
            </Text>
          </LinearGradient>
        ) : (
          <View style={styles.optionInner}>
            <Text style={styles.optionText}>{label}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={[styles.headerRow, { paddingTop: inset.top }]}>
            <View style={styles.backBtn} />

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '25%' }]} />
            </View>

            <Text style={styles.pageText}>1/4</Text>
          </View>
        <ScrollView
          contentContainerStyle={[styles.container, { paddingTop: 0 }]}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress bar + top content (no back button) */}
          

          {/* Title */}
          <Text style={styles.title}>Tell us about your lifestyle</Text>
          <Text style={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam
            nonummy euismod.
          </Text>

          {/* Smoking */}
          <Text style={styles.question}>Do you Smoke</Text>
          {renderOption('Yes', smoke === 'Yes', () => setSmoke('Yes'))}
          {renderOption('No', smoke === 'No', () => setSmoke('No'))}
          {renderOption('Sometime', smoke === 'Sometimes', () =>
            setSmoke('Sometimes'),
          )}

          {/* Alcohol */}
          <Text style={styles.question}>Do you consume alcohol?</Text>
          {renderOption('Yes', alcohol === 'Yes', () => setAlcohol('Yes'))}
          {renderOption('No', alcohol === 'No', () => setAlcohol('No'))}
          {renderOption('Sometime', alcohol === 'Sometime', () =>
            setAlcohol('Sometime'),
          )}

          {/* Political Views */}
          <Text style={styles.question}>What are your Political Views?</Text>
          {renderOption('Liberal', politics === 'Liberal', () =>
            setPolitics('Liberal'),
          )}
          {renderOption('Conservative', politics === 'Conservative', () =>
            setPolitics('Conservative'),
          )}
          {renderOption('Moderate', politics === 'Moderate', () =>
            setPolitics('Moderate'),
          )}
          {renderOption('Non Political', politics === 'Non Political', () =>
            setPolitics('Non Political'),
          )}

          {/* Family Plan */}
          <Text style={styles.question}>
            Which best describes your family plans or situation?
          </Text>
          {renderOption(
            'Have kids and don\u2019t want more',
            familyPlan === 'Have kids and don\u2019t want more',
            () => setFamilyPlan('Have kids and don\u2019t want more'),
          )}
          {renderOption(
            'Have kids and open to more',
            familyPlan === 'Have kids and open to more',
            () => setFamilyPlan('Have kids and open to more'),
          )}
          {renderOption(
            'No kids but want someday',
            familyPlan === 'No kids but want someday',
            () => setFamilyPlan('No kids but want someday'),
          )}
          {renderOption(
            'No kids and unsure',
            familyPlan === 'No kids and unsure',
            () => setFamilyPlan('No kids and unsure'),
          )}

          {validationMessage ? (
            <Text style={styles.validationText}>{validationMessage}</Text>
          ) : null}

          {/* Next Button */}
          <TouchableOpacity
            onPress={handleNext}
            style={{ marginTop: 30, marginBottom: 30 }}
            activeOpacity={0.8}
            disabled={!allSelected}
          >
            <LinearGradient
              colors={allSelected ? ['#255A3B', '#3DA8A1'] : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)']}
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

export default TellUsScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  container: {
    padding: 20,
    paddingBottom: 10,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },

  backBtn: {
    padding: 10,
  },

  progressBar: {
    height: 6,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 6,
    marginHorizontal: 12,
  },

  progressFill: {
    height: '100%',
    width: '10%',
    backgroundColor: '#6cd1b7',
    borderRadius: 6,
  },

  pageText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
  },

  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 6,
    width: '300',
  },

  subtitle: {
    color: 'white',
    opacity: 0.7,
    marginBottom: 20,
    fontSize: 14,
    width: '310',
  },

  validationText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 12,
  },
  question: {
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },

  option: {
    width: '100%',
    marginVertical: 6,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden', // Important for gradient border radius
  },

  optionInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },

  optionText: {
    color: 'white',
    fontSize: 15,
  },

  optionTextSelected: {
    color: 'white',
    fontWeight: '700',
  },

  nextBtn: {
    borderRadius: 35,
    // marginTop: 20,
    // marginBottom: 30,
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
