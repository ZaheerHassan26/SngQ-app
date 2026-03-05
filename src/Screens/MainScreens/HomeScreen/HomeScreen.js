import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 👇 Replace this with your real image imports
const profiles = [
  {
    id: '1',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g1.png'),
  },
  {
    id: '2',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g2.png'),
  },
  {
    id: '3',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g3.png'),
  },
  {
    id: '4',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g4.png'),
  },
  {
    id: '5',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g5.png'),
  },
  {
    id: '6',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g1.png'),
  },
  {
    id: '7',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g2.png'),
  },
  {
    id: '8',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g3.png'),
  },
  {
    id: '9',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g4.png'),
  },
  {
    id: '10',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g5.png'),
  },
  {
    id: '11',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g1.png'),
  },
  {
    id: '12',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g2.png'),
  },
  {
    id: '13',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g3.png'),
  },
  {
    id: '14',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g4.png'),
  },
  {
    id: '15',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g5.png'),
  },
];

const CompatibleProfilesScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/addd.png')}
      style={styles.backgroundImage}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        {/* <TouchableOpacity style={styles.iconButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Compatible Profiles</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Profiles Grid */}
      <FlatList
        data={profiles}
        keyExtractor={item => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => {
          const isMiddleItem = index % 3 === 1; // Middle image in every row

          return (
            <TouchableOpacity
              onPress={() => navigation?.navigate('OtherUserScreen')}
              style={[
                styles.cardContainer,
                isMiddleItem && styles.cardContainerSmall, // smaller vertical scale
              ]}
            >
              <Image source={item.image} style={styles.profileImage} />
              <View style={styles.overlay}>
                {!isMiddleItem ? (
                  // Normal cards (left + right)
                  <>
                    <View style={styles.infoTop}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.age}>{item.age}</Text>
                    </View>
                    <View style={styles.infoBottom}>
                      <Text style={styles.compatibility}>92% Compatible</Text>
                    </View>
                  </>
                ) : (
                  // Middle card (only percentage on TOP)
                  <View style={styles.centerTopInfo}>
                    <Text style={styles.centerCompatibility}>92%</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  headerTitleContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    left: Platform.OS === 'android' ? 68 : 100,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    paddingTop: 20,
  },
  cardContainer: {
    flex: 1 / 3,
    margin: 5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: width * 0.45,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  age: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  infoBottom: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  compatibility: {
    color: '#A9E8D8',
    fontSize: 12,
    fontFamily: 'Urbanist-Medium',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 40,
    marginHorizontal: 30,
    padding: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
  },
  cardContainer: {
    flex: 1 / 3,
    marginVertical: -4,
    marginHorizontal: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerSmall: {
    transform: [{ scale: 0.85 }], // Slightly smaller
    opacity: 0.95, // Optional subtle visual depth
  },
  centerTopInfo: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 2,
    borderRadius: 12,
  },

  centerCompatibility: {
    color: '#A9E8D8',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
  },
});

export default CompatibleProfilesScreen;
