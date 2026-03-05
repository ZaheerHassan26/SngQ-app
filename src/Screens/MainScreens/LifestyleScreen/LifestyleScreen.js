import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { setPostApprovalData } from '../../../redux/actions';

const { width: W, height: H } = Dimensions.get('window');
const BASE_W = 375;
const BASE_H = 812;
const sx = x => (x * W) / BASE_W;
const sy = y => (y * H) / BASE_H;

const BUBBLES = [
  { label: 'Travel', size: 120, top: 50, left: 18 },
  { label: 'Vacation', size: 84, top: 40, left: 140 },
  { label: 'Romance', size: 92, top: 30, left: 230 },
  { label: 'Chat', size: 56, top: 115, left: 200 },
  { label: 'Friends\nwith\nbenefit', size: 108, top: 130, left: 250 },
  { label: 'Joga', size: 64, top: 180, left: 20 },
  { label: 'Cooking', size: 140, top: 145, left: 90 },
  { label: 'Pets', size: 82, top: 230, left: 220 },
  { label: 'Movies', size: 56, top: 240, left: 310 },
  { label: 'Gaming', size: 140, top: 265, left: 10 },
  { label: 'Music', size: 88, top: 290, left: 155 },
  { label: 'Photography', size: 110, top: 305, left: 250 },
  { label: 'Art', size: 56, top: 410, left: 18 },
  { label: 'Experiments\nopen', size: 100, top: 400, left: 95 },
  { label: 'Sugar\ndaddy', size: 100, top: 410, left: 200 },
  { label: "Don't\nknow", size: 68, top: 440, left: 300 },
];

export default function LifestyleScreen({ navigation }) {
  const dispatch = useDispatch();
  const postApprovalData = useSelector(
    state => state.userReducer?.postApprovalData ?? {},
  );
  const customLabels = postApprovalData.customInterestLabels || [];
  const initialInterests = postApprovalData.interests || [];

  const allBubblesWithLayout = useMemo(() => {
    const base = BUBBLES.map(b => ({ ...b }));
    customLabels.forEach((label, i) => {
      base.push({
        label,
        size: 70,
        top: 460 + i * 58,
        left: 20 + (i % 4) * 88,
      });
    });
    return base;
  }, [customLabels]);

  const allLabels = useMemo(
    () => allBubblesWithLayout.map(x => x.label),
    [allBubblesWithLayout],
  );

  const [selected, setSelected] = useState(() =>
    initialInterests.filter(l =>
      allBubblesWithLayout.some(b => b.label === l),
    ),
  );

  const toggle = label => {
    setSelected(prev => {
      if (prev.includes(label)) return prev.filter(p => p !== label);
      if (prev.length >= 4) return prev;
      return [...prev, label];
    });
  };

  const canGoNext = selected.length >= 1;

  const handleNext = () => {
    if (!canGoNext) return;
    dispatch(setPostApprovalData({ interests: selected }));
    navigation.replace('AddPicturesScreen');
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.bg}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.25)', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* Top bar (no back button) */}
            <View style={styles.topRow}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../../Assets/IMAGES/Icon.png')}
                  style={{ width: 40, height: 40, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
              <View style={styles.progressRow}>
                <View style={styles.progressTrack}>
                  <View
                    style={[styles.progressFill, { width: '50%' }]}
                  />
                </View>
                <Text style={styles.progressText}>2/4</Text>
              </View>
            </View>

            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>
                Share your interests,{'\n'}hobbies or passion
              </Text>
              <Text style={styles.subtitle}>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod
              </Text>
            </View>

            {/* Bubble area */}
            <View style={styles.bubbleArea}>
              {allBubblesWithLayout.map((b, idx) => {
                const size = sx(b.size);
                const top = sy(b.top);
                const left = sx(b.left);
                const isSelected = selected.includes(b.label);
                const isDisabled = !isSelected && selected.length >= 4;

                return (
                  <TouchableOpacity
                    key={`${b.label}-${idx}`}
                    activeOpacity={0.9}
                    onPress={() => !isDisabled && toggle(b.label)}
                    disabled={isDisabled}
                    style={[
                      styles.bubbleBase,
                      {
                        width: size,
                        height: size,
                        top,
                        left,
                        borderRadius: size / 2,
                        shadowOpacity: isSelected ? 0.35 : 0.12,
                        elevation: isSelected ? 8 : 3,
                      },
                    ]}
                  >
                    {isSelected ? (
                      <LinearGradient
                        colors={['#255A3B', '#3DA8A1']}
                        style={[
                          StyleSheet.absoluteFill,
                          { borderRadius: size / 2, opacity: 0.98 },
                        ]}
                      />
                    ) : (
                      <View
                        style={[
                          StyleSheet.absoluteFill,
                          {
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            borderRadius: size / 2,
                          },
                        ]}
                      />
                    )}

                    <View
                      style={[
                        StyleSheet.absoluteFill,
                        {
                          borderRadius: size / 2,
                          borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected
                            ? 'rgba(255,255,255,0.14)'
                            : 'rgba(255,255,255,0.07)',
                        },
                      ]}
                    />

                    <Text
                      style={[
                        styles.bubbleText,
                        {
                          color: isSelected ? 'white' : 'rgba(255,255,255,0.9)',
                          fontSize: Math.max(12, Math.round(size / 7)),
                          textAlign: 'center',
                        },
                      ]}
                    >
                      {b.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Bottom buttons (inside scroll, not fixed) */}
            <View style={styles.bottomRow}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(setPostApprovalData({ interests: selected }));
                  navigation.replace('AddInterestScreen');
                }}
                style={styles.addBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.addBtnText}>Add Your Own</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleNext}
                activeOpacity={0.8}
                disabled={!canGoNext}
              >
                <LinearGradient
                  colors={
                    canGoNext
                      ? ['#255A3B', '#3DA8A1']
                      : ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.2)']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.signInBtn}
                >
                  <Text style={styles.signInText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, backgroundColor: '#000', width: '100%', height: '100%' },
  overlay: { flex: 1 },
  scrollContainer: {
    paddingBottom: sy(10),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: sx(16),
    marginTop: sy(6),
  },
  backCircle: {
    width: sx(40),
    height: sx(40),
    borderRadius: sx(20),
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressTrack: {
    height: sy(8),
    width: sx(220),
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: sy(8),
    overflow: 'hidden',
    fontFamily: 'Urbanist-Medium',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(118,200,184,0.95)',
  },
  progressText: {
    color: 'rgba(255,255,255,0.9)',
    marginLeft: sx(12),
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  header: {
    paddingHorizontal: sx(24),
    marginTop: sy(18),
  },
  title: {
    color: 'white',
    fontSize: sx(24),
    fontWeight: '600',
    lineHeight: sx(36),
    fontFamily: 'Urbanist-Medium',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    marginTop: sy(8),
    width: sx(300),
    fontSize: sx(12),
    fontFamily: 'Urbanist-Medium',
  },
  bubbleArea: {
    minHeight: sy(550),
    marginTop: sy(10),
  },
  bubbleBase: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    backgroundColor: 'transparent',
  },
  bubbleText: {
    paddingHorizontal: 6,
    fontWeight: '500',

    fontFamily: 'Urbanist-Medium',
  },
  bottomRow: {
    paddingHorizontal: sx(18),
    // paddingBottom: sy(14),
    // marginTop: sy(10),
  },
  addBtn: {
    width: '100%',
    height: sy(56),
    borderRadius: sy(28),
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sy(12),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },

  addBtnText: {
    color: 'white',
    fontSize: sx(16),
    fontFamily: 'Urbanist-Medium',
  },
  nextBtn: {
    width: '100%',
    height: sy(56),
    borderRadius: sy(28),
    backgroundColor: 'rgba(88,176,163,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnText: {
    color: 'white',
    fontSize: sx(16),
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  signInBtn: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Medium',
  },
});
