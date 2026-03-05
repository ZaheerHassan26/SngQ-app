import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const attendees = [
  {
    id: '1',
    name: 'Oliver Swift',
    image: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: '2',
    name: 'Carmilla Lively',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: '3',
    name: 'Sarah Will',
    image: 'https://randomuser.me/api/portraits/women/13.jpg',
  },
  {
    id: '4',
    name: 'Brad Pitt',
    image: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    id: '5',
    name: 'Oliver Swift',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
  },
  {
    id: '6',
    name: 'Carmilla Lively',
    image: 'https://randomuser.me/api/portraits/women/16.jpg',
  },
  {
    id: '7',
    name: 'Sarah Will',
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
  },
  {
    id: '8',
    name: 'Brad Pitt',
    image: 'https://randomuser.me/api/portraits/men/18.jpg',
  },
  {
    id: '9',
    name: 'Carmilla Lively',
    image: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
];

const AttendeesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.image }} style={styles.avatar} />
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity style={styles.inviteButton}>
          <Text style={styles.inviteText}>Invite</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <ImageBackground
        source={require('../../../Assets/IMAGES/splashBg2.png')} // your gradient bg image
        style={styles.background}
        resizeMode="cover"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation?.goBack()}
            style={styles.backButton}
          >
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')} // your logo
              style={{
                width: 40,
                height: 40,
                marginRight: 15,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Attendees</Text>
          </View>

          <View style={{ width: 24 }} />
        </View>

        {/* Attendees List */}
        <FlatList
          data={attendees}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </ImageBackground>
    </View>
  );
};

export default AttendeesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  backButton: {
    // backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    // padding: 6,
  },
  headerTitleContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    marginVertical: 8,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  inviteButton: {
    // backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  inviteText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
