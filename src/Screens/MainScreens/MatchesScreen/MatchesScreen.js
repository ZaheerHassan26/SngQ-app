import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const matches = [
  {
    id: '1',
    name: 'Adaline',
    age: 21,
    img: require('../../../Assets/IMAGES/img1.png'),
    compatibility: '92% Compatible',
  },
  {
    id: '2',
    name: 'Adaline',
    age: 21,
    img: require('../../../Assets/IMAGES/img2.png'),
    compatibility: '92% Compatible',
  },
  {
    id: '3',
    name: 'Adaline',
    age: 21,
    img: require('../../../Assets/IMAGES/img3.png'),
    compatibility: '92% Compatible',
  },
  {
    id: '4',
    name: 'Shea',
    age: 21,
    img: require('../../../Assets/IMAGES/img4.png'),
    compatibility: '92% Compatible',
  },
  {
    id: '5',
    name: 'Adaline',
    age: 21,
    img: require('../../../Assets/IMAGES/img1.png'),
    compatibility: '92% Compatible',
  },
];

const MatchesScreen = () => {
  const renderCard = item => (
    <View style={styles.card}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.compatibilityBadge}>
        <Text style={styles.compatibilityText}>{item.compatibility}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.age}>{item.age}</Text>
      </View>
    </View>
  );

  // Group items into rows of 2
  const groupData = [];
  for (let i = 0; i < matches.length; i += 2) {
    groupData.push(matches.slice(i, i + 2));
  }

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {renderCard(item[0])}
      {item[1] ? renderCard(item[1]) : <View style={{ flex: 1 }} />}
      {/* Add empty space if odd count */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Matches</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Grid */}
      <FlatList
        data={groupData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1724',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1C2232',
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    marginHorizontal: 4,
    height: 220,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  compatibilityBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#003C2F',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  compatibilityText: {
    color: '#00FFB3',
    fontSize: 10,
    fontWeight: '600',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  age: {
    color: '#fff',
    fontSize: 16,
  },
});
