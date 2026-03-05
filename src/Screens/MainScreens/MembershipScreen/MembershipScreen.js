import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';

const MembershipScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('Freemium');

  const plans = [
    {
      id: 'Freemium',
      title: 'Freemium',
      subtitle: 'Start exploring without commitment.',
    },
    {
      id: 'Premium',
      title: 'Premium',
      subtitle: 'Get closer to the connections you want.',
    },
    {
      id: 'VIP',
      title: 'VIP',
      subtitle: 'Exclusive access and total freedom.',
    },
  ];

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
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
            style={{
              // backgroundColor: 'rgba(255,255,255,0.1)',
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
                resizeMode: 'contain',
              }}
            />{' '}
          </TouchableOpacity>
          <View style={styles.pillContainer}>
            <Text style={styles.pillText}>Membership</Text>
          </View>
          <View style={{ width: 26 }} /> {/* spacer */}
        </View>

        {/* Membership Options */}
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {plans.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selected === plan.id && styles.selectedCard,
              ]}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.8}
            >
              <View>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planSubtitle}>{plan.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Upgrade Button */}
        <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8}>
          <Text style={styles.upgradeText}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 35,
  },

  tabButton: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  tabText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 15,
    paddingTop: 25,
  },
  planCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: 'rgba(0,255,200,0.25)',
  },
  planTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  planSubtitle: {
    color: '#dcdcdc',
    fontSize: 13,
    marginTop: 3,
  },
  upgradeBtn: {
    backgroundColor: 'rgba(0,255,200,0.3)',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  upgradeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
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

export default MembershipScreen;
