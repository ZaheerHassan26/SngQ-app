import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const SingleProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background image + gradient overlay */}
      <ImageBackground
        source={require('../../../Assets/IMAGES/splashBg2.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(13,23,36,0.95)']}
          style={styles.overlay}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation?.goBack()}
              style={{
                backgroundColor: 'rgba(80,120,110,0.6)',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 25,
              }}
            >
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: 'rgba(80,120,110,0.6)',
                paddingHorizontal: 40,
                paddingVertical: 8,
                borderRadius: 25,
              }}
            >
              <Text style={styles.headerTitle}>Profiles</Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(80,120,110,0.6)',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 25,
              }}
            >
              <Icon name="ellipsis-horizontal" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Image + Thumbnails */}
          <View style={styles.profileSection}>
            <Image
              source={require('../../../Assets/IMAGES/ad1.png')}
              style={styles.mainImage}
            />

            {/* Thumbnail scroll row */}
            <View>
              <Image
                // key={i}
                source={require('../../../Assets/IMAGES/ad2.png')}
                style={styles.thumbImage}
                resizeMode="cover"
              />
            </View>
          </View>
          <View style={{ paddingHorizontal: 24, marginTop: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginTop: 10,
              }}
            >
              <Text style={styles.name}>Adaline - 30</Text>
              <Image
                source={require('../../../Assets/IMAGES/rou.png')}
                style={{ width: 20, height: 20 }}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.location}>Dallas, United States</Text>
            <Text style={styles.education}>BS Graduate</Text>
          </View>

          <View
            style={{
              width: '90%',
              borderWidth: 0.7,
              borderColor: 'white',
              alignSelf: 'center',
            }}
          ></View>
          {/* About Me */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <Text style={styles.sectionText}>
              Bookworm who loves deep convos and Sunday hikes. Looking for
              something real.
            </Text>
          </View>

          {/* Info chips */}
          <View style={styles.infoChips}>
            <View style={styles.row}>
              <View style={styles.chip}>
                <View>
                  <Image
                    source={require('../../../Assets/IMAGES/p1.png')}
                    style={{ width: 20, height: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.chipLabel}>Gender</Text>
                  <Text style={styles.chipValue}>Male</Text>
                </View>
              </View>
              <View style={styles.chip}>
                <View>
                  <Image
                    source={require('../../../Assets/IMAGES/p2.png')}
                    style={{ width: 20, height: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.chipLabel}>Interested In</Text>
                  <Text style={styles.chipValue}>Males</Text>
                </View>
              </View>
              <View style={styles.chip}>
                <View>
                  <Image
                    source={require('../../../Assets/IMAGES/p4.png')}
                    style={{ width: 20, height: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.chipLabel}>Smokes</Text>
                  <Text style={styles.chipValue}>No</Text>
                </View>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.chip}>
                <View>
                  <Image
                    source={require('../../../Assets/IMAGES/p5.png')}
                    style={{ width: 20, height: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.chipLabel}>Looking For</Text>
                  <Text style={styles.chipValue}>Casual Relationship</Text>
                </View>
              </View>
              <View style={styles.chip}>
                <View>
                  <Image
                    source={require('../../../Assets/IMAGES/p3.png')}
                    style={{ width: 20, height: 20 }}
                    resizeMode="cover"
                  />
                </View>
                <View>
                  <Text style={styles.chipLabel}>Drinks</Text>
                  <Text style={styles.chipValue}>Yes</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              width: '90%',
              borderWidth: 0.7,
              borderColor: 'white',
              alignSelf: 'center',
              marginTop: 10,
            }}
          ></View>
          {/* Why were you matched */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why were you Matched</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet, consectetur sadipscing elit, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua.
            </Text>
          </View>

          {/* My Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Interests</Text>
            <View style={styles.interestRow}>
              {['Travel', 'Cooking', 'Hiking', 'Photography', 'Yoga'].map(
                (item, i) => (
                  <View key={i} style={styles.interestChip}>
                    <Text style={styles.interestText}>{item}</Text>
                  </View>
                ),
              )}
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Send Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Request Private Date</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default SingleProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1724',
  },
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 25,
  },
  mainImage: {
    width: '90%',
    height: 300,
    borderRadius: 25,
  },
  thumbRow: {
    marginTop: 12,
    paddingHorizontal: 14,
    backgroundColor: '#255A3B',
    padding: 8,
    borderRadius: 15,
  },
  thumbImage: {
    width: 300,
    height: 70,
    borderRadius: 14,
    marginHorizontal: 5,
    bottom: 30,
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    // marginTop: 10,
    fontFamily: 'Urbanist-Medium',
  },
  location: {
    color: '#A5AAB3',
    fontSize: 14,
    marginTop: 10,
    fontFamily: 'Urbanist-Medium',
  },
  education: {
    color: '#A5AAB3',
    fontSize: 14,
    marginBottom: 20,
    fontFamily: 'Urbanist-Medium',
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    fontFamily: 'Urbanist-Medium',
  },
  sectionText: {
    color: '#A5AAB3',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
  },
  infoChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    marginTop: 12,
  },

  interestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    margin: 5,
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  buttons: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 50,
  },
  btn: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 14,
  },
  btnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  infoChips: {
    marginTop: 12,
    paddingHorizontal: 22,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  chip: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 7,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  chipLabel: {
    color: '#fff',
    fontSize: 10,
    marginBottom: 4,
    fontFamily: 'Urbanist-Medium',
  },

  chipValue: {
    color: '#A5AAB3',

    fontSize: 8,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
});
