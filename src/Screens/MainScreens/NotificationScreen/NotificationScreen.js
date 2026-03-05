import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const notifications = [
  {
    id: '1',
    name: 'Emma',
    message: "It's a match! You and Emma are now connected.",
    time: '14:28',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: '2',
    name: 'Sara',
    message:
      'Sara invited you to join him at Rooftop Mixer – Aug 25. Accept or decline?',
    time: '14:28',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '3',
    name: 'Sophia',
    message:
      'Sophia wants to plan a private date on Aug 28, 7:00 PM. View details.',
    time: '14:28',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    id: '4',
    name: 'Noah',
    message: 'Noah declined your invite to Private Date.',
    time: '14:28',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: '5',
    name: 'Event',
    message: 'Just 2 days until Rooftop Mixer – Aug 25. Get ready.',
    time: '14:28',
    image: 'https://picsum.photos/200/200?random=1',
  },
  {
    id: '6',
    name: 'Reminder',
    message: "We haven't seen you in a while",
    time: '14:28',
    image: 'https://picsum.photos/200/200?random=2',
  },
];

const NotificationScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image source={{ uri: item.image }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
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

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 50,
              padding: 8,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>Notifications</Text>
          </View>
          <View style={{ width: 26 }} /> {/* spacer */}
        </View>

        {/* Notifications List */}
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NotificationScreen;

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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    color: '#fff',
    fontSize: 13.5,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    color: '#d0d0d0',
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
