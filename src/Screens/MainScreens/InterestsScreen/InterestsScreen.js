// InterestsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const interests = [
  'Travel',
  'Vacation',
  'Romance',
  'Chat',
  'Friends with benefit',
  'Joga',
  'Cooking',
  'Pets',
  'Movies',
  'Gaming',
  'Music',
  'Photography',
  'Art',
  'Experiments open',
  'Sugar daddy',
  'Don’t know',
];

const InterestsScreen = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = item => {
    if (selected.includes(item)) {
      setSelected(selected.filter(i => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.bgImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.topBar}>
            <TouchableOpacity style={styles.backButton}>
              <Image
                source={require('../../../Assets/IMAGES/Icon.png')}
                style={{ width: 40, height: 40, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressText}>1/10</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.title}>
              Share your interests,{'\n'}hobbies or passion
            </Text>
            <Text style={styles.subtitle}>
              Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam
              nonumy eirmod
            </Text>

            <View style={styles.bubblesContainer}>
              {interests.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleSelect(item)}
                  activeOpacity={0.8}
                  style={[
                    styles.bubble,
                    selected.includes(item) && styles.selectedBubble,
                    {
                      width: getSize(index),
                      height: getSize(index),
                      borderRadius: getSize(index) / 2,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      selected.includes(item) && { color: '#fff' },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Your Own</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

// helper to vary circle sizes
const getSize = index => {
  const sizes = [120, 100, 90, 80, 70, 60];
  return sizes[index % sizes.length];
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    padding: 6,
  },
  progressContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 3,
    width: width * 0.5,
    marginHorizontal: 10,
  },
  progressFill: {
    height: 6,
    width: width * 0.15,
    backgroundColor: '#58b5a9',
    borderRadius: 3,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginVertical: 10,
    width: '80%',
  },
  bubblesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 30,
    gap: 12,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBubble: {
    backgroundColor: '#5ac0b0',
  },
  bubbleText: {
    color: '#ddd',
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 6,
  },
  addButton: {
    width: '85%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    width: '85%',
    paddingVertical: 14,
    borderRadius: 30,
    backgroundColor: '#5ac0b0',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default InterestsScreen;
