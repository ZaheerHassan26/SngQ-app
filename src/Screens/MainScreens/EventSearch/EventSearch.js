import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const eventsData = [
  {
    id: '1',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    tier: 'Tier 3 Free',
    image: 'https://picsum.photos/600/400?random=1',
  },
  {
    id: '2',
    title: 'Sunset Mixer',
    location: 'NewYork City',
    date: '25 Jul',
    tier: 'Tier 3 Free',
    image: 'https://picsum.photos/600/400?random=2',
  },
];

const EventSearch = () => {
  const [searchText, setSearchText] = useState('Sunset Party');

  const renderEvent = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.dateBadge}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventLocation}>{item.location}</Text>
        <Text style={styles.eventTier}>{item.tier}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Event Search</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Events"
            placeholderTextColor="#666"
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Icon name="close" size={20} color="#aaa" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcon name="filter-variant" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tag */}
      {searchText ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{searchText}</Text>
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Icon name="close" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Event List */}
      <FlatList
        data={eventsData}
        keyExtractor={item => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default EventSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1724', // dark background
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 25,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    paddingVertical: 8,
  },
  filterBtn: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 25,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#14532d',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  tagText: {
    color: '#22c55e',
    marginRight: 6,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  dateBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#334155',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
  },
  cardContent: {
    padding: 12,
  },
  eventTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  eventLocation: {
    color: '#94A3B8',
    marginTop: 2,
  },
  eventTier: {
    color: '#22c55e',
    marginTop: 2,
    fontWeight: '500',
  },
});
