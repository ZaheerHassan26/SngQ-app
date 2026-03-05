import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const EventDetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background Image */}
      <ImageBackground
        source={require('../../../Assets/IMAGES/splashBg2.png')} // your gradient bg image
        style={styles.backgroundImage}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={styles.backBtn}
            >
              <Image
                source={require('../../../Assets/IMAGES/Icon.png')} // your logo
                style={{
                  width: 40,
                  height: 40,
                  // marginRight: 15,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Events Details</Text>
            </View>
          </View>

          {/* Event Image */}
          <Image
            source={require('../../../Assets/IMAGES/fun1.png')} // your event detail image
            style={styles.eventImage}
            resizeMode="cover"
          />

          {/* Title */}
          <Text style={styles.eventTitle}>
            International Rooftop Mixer Night
          </Text>

          {/* Info Boxes */}
          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Icon
                name="calendar-outline"
                size={22}
                color="#fff"
                style={{ marginBottom: 6 }}
              />
              <Text style={styles.infoTitle}>Date & Time</Text>
              <Text style={styles.infoText}>
                Saturday 30 August 2025{'\n'}16:00 - 23:45
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Icon
                name="location-outline"
                size={22}
                color="#fff"
                style={{ marginBottom: 6 }}
              />
              <Text style={styles.infoTitle}>Location</Text>
              <Text style={styles.infoText}>
                173 7th Ave S, New York,{'\n'}NY 10014
              </Text>
            </View>
          </View>

          {/* Attendees */}
          <TouchableOpacity
            onPress={() => navigation?.navigate('AttendeesScreen')}
            style={styles.attendeesSection}
          >
            <Text style={styles.sectionTitle}>Attendees</Text>
            <View style={styles.attendeeImages}>
              <Image
                source={require('../../../Assets/IMAGES/g1.png')}
                style={styles.attendeeImg}
              />
              <Image
                source={require('../../../Assets/IMAGES/g2.png')}
                style={styles.attendeeImg}
              />
              <Image
                source={require('../../../Assets/IMAGES/g3.png')}
                style={styles.attendeeImg}
              />
            </View>
          </TouchableOpacity>

          {/* About Event */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.aboutText}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet takimata sanctus est Lorem ipsum.
            </Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']} // gradient colors
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.rsvpText}>RSVP</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate('BuyTicketScreen')}
            style={styles.priceButton}
          >
            <Text style={styles.priceText}>$120</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation?.navigate('InviteScreen')}
            style={styles.inviteButton}
          >
            <Text style={styles.inviteText}>Invite</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    left: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 36,
  },
  headerTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    fontFamily: 'Urbanist-Medium',
  },
  eventImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 15,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 15,
    width: 250,
    fontFamily: 'Urbanist-Medium',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  infoBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  infoTitle: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Urbanist-Medium',
  },
  infoText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  attendeesSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    // marginBottom: 10,
    fontFamily: 'Urbanist-Medium',
  },
  attendeeImages: {
    flexDirection: 'row',
  },
  attendeeImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  aboutSection: {
    marginTop: 20,
  },
  aboutText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 25,
    fontFamily: 'Urbanist-Medium',
  },
  rsvpButton: {
    marginTop: 25,
    backgroundColor: '#3DA8A1',
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: 'center',
  },
  rsvpText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  priceButton: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: 'center',
  },
  priceText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  inviteButton: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 25,
    paddingVertical: 20,
    alignItems: 'center',
  },
  inviteText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  gradientButton: {
    borderRadius: 60,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 55,
    justifyContent: 'center',
    marginTop: 20,
  },
  rsvpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
