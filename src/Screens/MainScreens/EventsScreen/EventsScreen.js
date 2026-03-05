import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const categories = [
  { id: '1', name: 'Artsy', icon: 'color-palette-outline' },
  { id: '2', name: 'Wellness', icon: 'leaf-outline' },
  { id: '3', name: 'Fun', icon: 'happy-outline' },
  { id: '4', name: 'More', icon: 'options-outline' },
];

const events = [
  {
    id: '1',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun1.png'),
  },
  {
    id: '2',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun2.png'),
  },
  {
    id: '3',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun1.png'),
  },
  {
    id: '4',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun2.png'),
  },
  {
    id: '4',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun1.png'),
  },
  {
    id: '6',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '20 June',
    image: require('../../../Assets/IMAGES/fun2.png'),
  },
];

const EventsScreen = ({ navigation }) => {
  const renderEvent = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EventDetailScreen')}
      style={styles.card}
    >
      <Image source={item.image} style={styles.eventImage} />
      <View style={styles.dateTag}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Events</Text>
          </View>
        </View>

        {/* Search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#bbb"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          {categories.map(cat => (
            <TouchableOpacity key={cat.id} style={styles.categoryChip}>
              <Icon name={cat.icon} size={16} color="#fff" />
              <Text style={styles.categoryText}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Events Grid */}
        <FlatList
          data={events}
          numColumns={2}
          renderItem={renderEvent}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safe: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 60,
    paddingVertical: 6,
    borderRadius: 20,
    fontFamily: 'Urbanist-Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 30,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 18,
    fontFamily: 'Urbanist-Medium',
  },
  searchIcon: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 50,
  },
  categories: {
    flexDirection: 'row',
    marginTop: 20,
    // flexWrap: 'wrap',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  list: {
    // marginTop: 20,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  eventImage: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  dateTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Urbanist-Medium',
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  location: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 3,
    fontFamily: 'Urbanist-Medium',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeNav: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    padding: 6,
  },
  activeCircle: {
    backgroundColor: '#4ABDAC',
    borderRadius: 30,
    padding: 10,
  },
});

export default EventsScreen;
