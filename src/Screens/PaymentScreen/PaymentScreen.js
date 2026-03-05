// MembershipPlanScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
  textLight: '#E9EEF5',
  textDim: '#C4CAD5',
  white: '#FFFFFF',
  mint: '#5DAD92',
  dark: '#0B1423',
  accent: '#3DDC97',
  transparentWhite: 'rgba(255,255,255,0.1)',
  cardBg: 'rgba(72, 135, 114, 0.3)',
  innerCard: 'rgba(255,255,255,0.12)',
};

export default function MembershipPlanScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Image
            source={require('../../Assets/IMAGES/Icon.png')}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Membership Plan</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Select{'\n'}Membership Plan</Text>
      <Text style={styles.subtitle}>
        Choose the plan that matches your vibe —{'\n'}upgrade anytime
      </Text>

      {/* Scrollable Cards */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ alignItems: 'center' }}
        style={{ marginTop: Platform.OS === 'android' ? 10 : 50 }}
      >
        {/* Freemium Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            {/* Icon */}
            <View style={styles.iconWrap}>
              <Image
                source={require('../../Assets/IMAGES/ms.png')}
                style={styles.icon}
              />
            </View>

            {/* Price */}
            <Text style={styles.priceFree}>Free</Text>

            {/* Plan Title */}
            <Text style={styles.planTitle}>Freemium</Text>
            <Text style={styles.planDesc}>
              Dip your toes into Chemistry XO — start exploring without
              commitment.
            </Text>

            {/* Feature List */}
            <View style={styles.featuresBox}>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.white}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.featureText}>Event schedule access</Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.white}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.featureText}>
                  Paid event ticket purchase
                </Text>
              </View>
              <View style={styles.featureRow}>
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color={COLORS.white}
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.featureText}>
                  Basic match visibility (Name, Photo, Age)
                </Text>
              </View>
            </View>

            {/* Proceed Button */}
            <TouchableOpacity
              style={styles.proceedBtn}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MainStack')}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>

            <Text style={styles.note}>Payment is non-refundable.</Text>
          </View>
        </View>

        {/* Premium Card */}
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.iconWrap}>
              <Image
                source={require('../../Assets/IMAGES/ms.png')}
                style={styles.icon}
              />
            </View>

            <Text style={styles.price}>US$20.00</Text>
            <Text style={styles.oneTime}>One Time</Text>

            <Text style={styles.planTitle}>Premium</Text>
            <Text style={styles.planDesc}>
              Step up your game — get closer to the connections you want.
            </Text>

            <View style={styles.featuresBox}>
              {[
                'Event schedule access',
                'Paid event ticket purchase',
                'Free tickets to select events',
                'Full match profile access',
                'Priority RSVP access',
              ].map((item, i) => (
                <View key={i} style={styles.featureRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={COLORS.white}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.featureText}>{item}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.proceedBtn}
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MainStack')}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>

            <Text style={styles.note}>Payment is non-refundable.</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.dark },
  bg: { flex: 1, width: '100%', height: '100%' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: Platform.OS === 'android' ? 40 : 40,
  },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.transparentWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  headerBadgeText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 13,
  },

  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 10,
    marginLeft: 30,
    lineHeight: 36,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: COLORS.textDim,
    fontSize: 14,
    marginLeft: 30,
    marginTop: 8,
    lineHeight: 20,
    fontFamily: 'Urbanist-Medium',
  },

  cardWrapper: {
    width: width,
    alignItems: 'center',
  },
  card: {
    width: Platform.OS === 'android' ? width * 0.8 : width * 0.82,
    borderRadius: 24,
    padding: Platform.OS === 'android' ? 10 : 20,
    backgroundColor: COLORS.cardBg,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    // backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS === 'android' ? -30 : 6,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  priceFree: {
    position: 'absolute',
    right: 20,
    top: 28,
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  price: {
    position: 'absolute',
    right: 20,
    top: 24,
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  oneTime: {
    position: 'absolute',
    right: 20,
    top: 45,
    color: COLORS.textDim,
    fontSize: 11,
    fontFamily: 'Urbanist-Medium',
  },
  planTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '800',
    marginTop: 35,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  planDesc: {
    color: COLORS.textDim,
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 14,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  featuresBox: {
    backgroundColor: COLORS.innerCard,
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 8,
    borderColor: '#3DA8A1',
    borderWidth: 0.3,
    gap: 15,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  featureText: {
    color: COLORS.white,
    fontSize: 13.5,
    lineHeight: 20,
    flex: 1,
    fontFamily: 'Urbanist-Medium',
  },
  proceedBtn: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
  },
  proceedText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  note: {
    color: COLORS.textDim,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Urbanist-Medium',
  },
});
