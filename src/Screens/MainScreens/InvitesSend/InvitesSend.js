import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const events = [
  {
    id: '1',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    invited: 'You Invited Sarah to this event',
    image: require('../../../Assets/IMAGES/newIcon.png'),
  },
  {
    id: '2',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    invited: 'You Invited Sarah to this event',
    image: require('../../../Assets/IMAGES/newIcon.png'),
  },
  {
    id: '3',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    invited: 'You Invited Sarah to this event',
    image: require('../../../Assets/IMAGES/newIcon.png'),
  },
];

const InvitesSent = ({ navigation }) => {
  const renderCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.rowBetween}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.divider} />
        <Text style={styles.invitedText}>{item.invited}</Text>
        <TouchableOpacity>
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>See Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(80,120,110,0.6)',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 25,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerButton}>
            <Text style={styles.headerButtonText}>Invites Sent</Text>
          </View>
          <View style={{ width: 26 }} />
        </View>

        <FlatList
          data={events}
          keyExtractor={item => item.id}
          renderItem={renderCard}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: 'rgba(80,120,110,0.6)',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardContainer: {
    backgroundColor: 'rgba(50,70,60,0.7)',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  dateContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dateText: {
    color: '#fff',
    fontSize: 13,
  },
  location: {
    color: '#c0cfc8',
    fontSize: 14,
    marginTop: 3,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 10,
  },
  invitedText: {
    color: '#d5e0da',
    fontSize: 13,
    marginBottom: 14,
  },
  detailsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    width: '100%',
    height: 50,
  },

  detailsButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default InvitesSent;
