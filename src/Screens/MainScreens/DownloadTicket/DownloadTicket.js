import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const DownloadTicket = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.headerButton}>
            <Text style={styles.headerText}>Thank You</Text>
          </View>
        </View>
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.subtitle}>
          Your ticket has also been sent to your email. Please bring a valid ID
          that matches your Chemistry XO profile for entry.
        </Text>

        {/* Content */}
        <View style={styles.content}>
          {/* Checkmark */}
          <Image
            source={require('../../../Assets/IMAGES/tick.png')} // your white checkmark image
            style={styles.checkIcon}
            resizeMode="contain"
          />

          {/* Download Ticket Button */}
          <TouchableOpacity activeOpacity={0.8} style={styles.buttonWrapper}>
            <LinearGradient
              colors={['#255A3B', '#3DA8A1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>Download Ticket</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Back to Home Button */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.secondaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default DownloadTicket;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 55,
    gap: 45,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButton: {
    paddingHorizontal: 45,
    paddingVertical: 6,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 50,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    // textAlign: 'center',
    lineHeight: 20,
    // marginHorizontal: 20,
    marginBottom: 40,
  },
  checkIcon: {
    width: 120,
    height: 120,
    tintColor: '#fff',
    marginBottom: 120,
    marginTop: 10,
  },
  buttonWrapper: {
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
