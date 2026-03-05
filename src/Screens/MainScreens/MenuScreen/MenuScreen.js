import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    { title: 'My Profile', icon: 'person-outline', route: 'ProfileScreen' },
    {
      title: 'Notifications',
      icon: 'notifications-outline',
      route: 'NotificationScreen',
    },
    { title: 'Invites Sent', icon: 'send-outline', route: 'InvitesSend' },
    { title: 'Invite Requests', icon: 'mail-outline', route: 'RequestSend' },
    { title: 'My Events', icon: 'calendar-outline', route: 'MyEvents' },
    { title: 'Membership', icon: 'card-outline', route: 'MembershipScreen' },
    {
      title: 'Account Details',
      icon: 'settings-outline',
      route: 'AccountDetailsScreen',
    },
    {
      title: 'Payment Details',
      icon: 'wallet-outline',
      route: 'PaymentScreen',
    },
    {
      title: 'About App',
      icon: 'information-circle-outline',
      route: 'AboutScreen',
    },
    {
      title: 'Privacy Policy',
      icon: 'shield-checkmark-outline',
      route: 'PrivacyScreen',
    },
    { title: 'Support', icon: 'headset-outline', route: 'SupportScreen' },
  ];

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')} // your logo
              style={styles.icon2}
            />
          </TouchableOpacity>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>Profile</Text>
          </View>
          <View style={{ width: 26 }} /> {/* spacer */}
        </View>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={{ uri: 'https://picsum.photos/200/200?random=5' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Icon name="camera-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Rhadini Abigail</Text>
          <Text style={styles.userEmail}>johnsmith@gmail.com</Text>
        </View>

        {/* Menu List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}
        >
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuButton}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={styles.menuLeft}>
                <Icon
                  name={item.icon}
                  size={18}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.menuText}>{item.title}</Text>
              </View>
              <Icon name="chevron-forward" size={18} color="#ccc" />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => alert('Logged out')}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: 'hidden',
    fontFamily: 'Urbanist-Medium',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 90,
    borderColor: 'white',
    borderWidth: 2,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#255A3B',
    borderRadius: 60,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Urbanist-Medium',
  },
  userEmail: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 20,
    fontFamily: 'Urbanist-Medium',
  },
  menuContainer: {
    paddingBottom: 30,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginBottom: 10,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  logoutButton: {
    backgroundColor: '#FF0000',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    // alignSelf: 'center',
  },
  pillContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 50,
  },
  pillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  icon2: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
  },
});
