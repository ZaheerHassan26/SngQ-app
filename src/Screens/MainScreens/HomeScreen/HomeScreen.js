import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getCompatibleProfilesApi } from '../../../utils/Apis';
import { API_BASE_URL } from '../../../config/api';

const { width } = Dimensions.get('window');

function imageUrl(path) {
  if (!path || typeof path !== 'string') return null;
  const base = (API_BASE_URL || '').replace(/\/+$/, '');
  return path.startsWith('http') ? path : `${base}/${path.replace(/^\//, '')}`;
}

const CompatibleProfilesScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCompatibleProfilesApi()
      .then(res => {
        const data = res?.data ?? res;
        const list = Array.isArray(data?.profiles) ? data.profiles : [];
        setProfiles(list);
      })
      .catch(() => {
        setProfiles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const isEmpty = !loading && (!profiles || profiles.length === 0);

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/addd.png')}
      style={styles.backgroundImage}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Compatible Profiles</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#A9E8D8" />
        </View>
      ) : isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No compatible profiles found</Text>
        </View>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={item => String(item?.id ?? item?.name ?? Math.random())}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
            const isMiddleItem = index % 3 === 1;
            const imageUri = imageUrl(item?.image || item?.face_image);

            return (
              <TouchableOpacity
                onPress={() => navigation?.navigate('OtherUserScreen', { userId: item?.id })}
                style={[
                  styles.cardContainer,
                  isMiddleItem && styles.cardContainerSmall,
                ]}
              >
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.profileImage} />
                ) : (
                  <View style={[styles.profileImage, styles.profileImagePlaceholder]} />
                )}
                <View style={styles.overlay}>
                  {!isMiddleItem ? (
                    <>
                      <View style={styles.infoTop}>
                        <Text style={styles.name} numberOfLines={1}>{item?.name ?? ''}</Text>
                      </View>
                      <View style={styles.infoBottom}>
                        <Text style={styles.compatibility}>
                          {item?.compatibility_percentage ?? `${item?.compatibility_score ?? '—'}%`} Compatible
                        </Text>
                      </View>
                    </>
                  ) : (
                    <View style={styles.centerTopInfo}>
                      <Text style={styles.centerCompatibility}>
                        {item?.compatibility_percentage ?? `${item?.compatibility_score ?? '—'}%`}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  headerTitleContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    left: Platform.OS === 'android' ? 68 : 100,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 100,
    paddingTop: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontFamily: 'Urbanist-Medium',
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1 / 3,
    margin: 5,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: width * 0.45,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  profileImagePlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  age: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  infoBottom: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  compatibility: {
    color: '#A9E8D8',
    fontSize: 12,
    fontFamily: 'Urbanist-Medium',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 40,
    marginHorizontal: 30,
    padding: 14,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tabLabel: {
    color: '#fff',
    fontSize: 13,
  },
  cardContainer: {
    flex: 1 / 3,
    marginVertical: -4,
    marginHorizontal: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    height: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainerSmall: {
    transform: [{ scale: 0.85 }], // Slightly smaller
    opacity: 0.95, // Optional subtle visual depth
  },
  centerTopInfo: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingVertical: 2,
    borderRadius: 12,
  },

  centerCompatibility: {
    color: '#A9E8D8',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Urbanist-Bold',
  },
});

export default CompatibleProfilesScreen;
