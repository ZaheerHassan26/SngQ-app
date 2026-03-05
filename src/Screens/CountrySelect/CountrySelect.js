import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import countries from 'world-countries';

const { width } = Dimensions.get('window');

const CountrySelect = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Extract country names
  const countryList = countries.map(c => c.name.common).sort();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedCountry(item)}
    >
      <Text
        style={[
          styles.countryText,
          selectedCountry === item && styles.selectedCountryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Country</Text>
      </View>

      {/* List of all countries */}
      <FlatList
        data={countryList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity
        onPress={() => {
          console.log('Selected Country:', selectedCountry);
          navigation.navigate('RequestInvite');
        }}
        activeOpacity={0.8}
        style={{ marginBottom: 15, alignSelf: 'center' }} // keep spacing outside
      >
        <LinearGradient
          colors={['#5DAD92', '#2F5749']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.signInBtn, !selectedCountry && { opacity: 0.5 }]}
        >
          <Text style={styles.signInText}>Next</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CountrySelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1320',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  item: {
    paddingVertical: 12,
  },
  countryText: {
    fontSize: 16,
    color: '#9fc3c3',
  },
  selectedCountryText: {
    color: '#fff',
    fontSize: 16,
  },
  nextBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: width * 0.9,
    paddingVertical: 15,
    backgroundColor: '#3ECF8E',
    borderRadius: 30,
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#fff',
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
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
