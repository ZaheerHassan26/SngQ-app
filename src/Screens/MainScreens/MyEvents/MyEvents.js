import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const events = [
  {
    id: '1',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    status: 'Going',
    image: 'https://picsum.photos/200/200?random=1',
  },
  {
    id: '2',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    status: 'Going',
    image: 'https://picsum.photos/200/200?random=2',
  },
  {
    id: '3',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    status: 'Going',
    image: 'https://picsum.photos/200/200?random=3',
  },
  {
    id: '4',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    status: 'Going',
    image: 'https://picsum.photos/200/200?random=4',
  },
  {
    id: '5',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    status: 'Going',
    image: 'https://picsum.photos/200/200?random=5',
  },
];

const MyEvents = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.eventCard}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
      </View>

      <View style={styles.rightSection}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <View style={styles.header}>
          <TouchableOpacity
            style={{
              borderRadius: 50,
              padding: 8,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')} // your logo
              style={{
                width: 40,
                height: 40,
                marginRight: -25,
                resizeMode: 'contain',
              }}
            />{' '}
          </TouchableOpacity>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>Events</Text>
          </View>
          <View style={{ width: 26 }} /> {/* spacer */}
        </View>

        {/* Events List */}
        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
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
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    marginHorizontal: 20,
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 30,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  eventImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#fff',
  },
  eventLocation: {
    fontSize: 13,
    color: '#d0d0d0',
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    // paddingHorizontal: 10,
    marginBottom: 20,
  },
  pillContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  pillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
});

export default MyEvents;
