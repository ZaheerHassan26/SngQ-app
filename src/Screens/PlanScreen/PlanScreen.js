// ReactNative_MembershipPlan_App.js
// React Native CLI single-file screen implementation that reproduces the provided UI.
// Place your background image at: ./assets/background-top.png
// Usage: replace your App.js with this file or import the component.

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { getPackagesApi } from '../../utils/Apis';

/** Map API package to display subtitle (keeps UI copy consistent) */
function getPlanSubtitle(tierType) {
  switch (tierType) {
    case 'tier_1':
      return 'Start exploring without commitment.';
    case 'tier_2':
      return 'Get closer to the connections you want.';
    case 'tier_3':
      return 'Exclusive access and total freedom.';
    default:
      return 'Membership plan.';
  }
}

/** Format monthly_price for display */
function getPriceLabel(monthlyPrice) {
  if (monthlyPrice == null || monthlyPrice === '' || Number(monthlyPrice) === 0) {
    return 'Free';
  }
  const n = Number(monthlyPrice);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : `$${monthlyPrice}`;
}

export default function PlanScreen({ navigation }) {
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state?.userReducer?.token ?? '');

  // progress example: 1/10
  const progress = 0.1;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getPackagesApi()
      .then(response => {
        const list = response?.data?.data ?? response?.data ?? [];
        const arr = Array.isArray(list) ? list : [];
        setPackages(arr);
      })
      .catch(() => {
        setPackages([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Default selected to first package when packages load and none selected
  useEffect(() => {
    if (packages.length > 0 && selected == null) {
      setSelected(packages[0].slug);
    }
  }, [packages, selected]);

  const plansForUi = packages.map(p => ({
    id: p.slug,
    title: p.title ?? p.slug ?? '',
    subtitle: getPlanSubtitle(p.tier_type),
    priceLabel: getPriceLabel(p.monthly_price),
  }));

  const handleProceed = () => {
    const selectedPackage = packages.find(p => p.slug === selected) || null;
    if (!selectedPackage) return;

    const amount = Number(selectedPackage.monthly_price ?? 0);
    if (Number.isFinite(amount) && amount > 0) {
      navigation?.navigate('MakePayment', {
        selectedPackage: {
          slug: selectedPackage.slug,
          title: selectedPackage.title,
          monthly_price: selectedPackage.monthly_price,
          yearly_price: selectedPackage.yearly_price,
          tier_type: selectedPackage.tier_type,
        },
      });
      return;
    }

    navigation?.replace('MainStack');
  };

  return (
    <ImageBackground
      source={require('../../Assets/IMAGES/splashBg2.png')} // gradient background image
      style={styles.bg}
      resizeMode="cover"
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header row with back, progress and step count */}
          <View style={styles.headerRow}>
            <Image
              source={require('../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />

            <View style={styles.progressWrapper}>
              <View style={styles.progressTrack}>
                <LinearGradient
                  colors={['#255A3B', '#3DA8A1']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[
                    styles.progressFill,
                    { width: `${Math.round(progress * 100)}%` },
                  ]}
                />
              </View>
            </View>

            <Text style={styles.stepCount}>1/10</Text>
          </View>

          {/* Title */}
          <Text style={styles.title}>Select{'\n'}Membership Plan</Text>

          <Text style={styles.subtitle}>
            Choose the plan that matches your vibe —{'\n'}upgrade anytime
          </Text>

          {/* Plan cards */}
          <View style={{ marginTop: 18 }}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3DA8A1" />
                <Text style={styles.loadingText}>Loading plans</Text>
              </View>
            ) : (
              plansForUi.map(p => {
                const active = selected === p.id;
                return (
                <TouchableOpacity
                  key={p.id}
                  activeOpacity={0.8}
                  onPress={() => setSelected(p.id)}
                  style={[styles.planCard, active && styles.planCardActive]}
                >
                  <View style={styles.cardContent}>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          styles.planTitle,
                          active && styles.planTitleActive,
                        ]}
                      >
                        {p.title}
                      </Text>
                      <Text
                        style={[
                          styles.planSubtitle,
                          active && styles.planSubtitleActive,
                        ]}
                      >
                        {p.subtitle}
                      </Text>
                    </View>

                    <View style={styles.priceWrapper}>
                      <LinearGradient
                        colors={
                          active
                            ? ['#255A3B', '#3DA8A1']
                            : ['#3a5a50', '#2b4b44']
                        }
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.priceCircle}
                      >
                        <Text
                          style={[
                            styles.priceText,
                            active && styles.priceTextActive,
                          ]}
                        >
                          {p.priceLabel}
                        </Text>
                      </LinearGradient>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
            )}
          </View>

          {/* Spacer */}
          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Proceed button pinned to bottom */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            onPress={handleProceed}
            activeOpacity={0.9}
            style={styles.proceedBtn}
            disabled={loading || plansForUi.length === 0 || !selected}
          >
            <LinearGradient
              colors={
                loading || plansForUi.length === 0 || !selected
                  ? ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)']
                  : ['#3b8e75', '#69b79e']
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.proceedGradient}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#06120f' },
  safe: { flex: 1, justifyContent: 'space-between' },
  scroll: { paddingHorizontal: 20, paddingTop: 58 },

  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backChevron: { color: '#fff', fontSize: 22 },

  progressWrapper: { flex: 1, paddingHorizontal: 12 },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: { height: 8, borderRadius: 6 },

  stepCount: { color: '#e6f6f0', fontSize: 13, width: 36, textAlign: 'right' },

  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginTop: 8,
    lineHeight: 36,
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: '#9fb7af',
    fontSize: 13,
    marginTop: 10,
    fontFamily: 'Urbanist-Medium',
  },

  loadingContainer: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  loadingText: {
    color: '#9fb7af',
    fontSize: 15,
    marginTop: 12,
    fontFamily: 'Urbanist-Medium',
  },

  planCard: {
    marginTop: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  planCardActive: {
    backgroundColor: '#308F71',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  cardContent: { flexDirection: 'row', alignItems: 'center' },
  planTitle: { color: '#eaf7f2', fontSize: 16, fontWeight: '600' },
  planTitleActive: {
    color: '#ffffff',

    fontFamily: 'Urbanist-Medium',
  },
  planSubtitle: {
    color: '#b8cfc7',
    fontSize: 13,
    marginTop: 6,
    fontFamily: 'Urbanist-Medium',
  },
  planSubtitleActive: { color: '#dff2ea', fontFamily: 'Urbanist-Medium' },

  priceWrapper: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#cfe6df',
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
  priceTextActive: { color: '#fff', fontFamily: 'Urbanist-Medium' },

  bottomBar: { padding: 18, backgroundColor: 'transparent', paddingBottom: 50 },
  proceedBtn: { borderRadius: 30, overflow: 'hidden' },
  proceedGradient: {
    alignItems: 'center',
    borderRadius: 30,
    width: '100%',
    height: 55,
    justifyContent: 'center',
  },
  proceedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
});
