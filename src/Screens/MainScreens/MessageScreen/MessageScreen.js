import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

// 👇 Replace these images with your actual ones
const matches = [
  {
    id: '1',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g1.png'),
  },
  {
    id: '2',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g2.png'),
  },
  {
    id: '3',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g3.png'),
  },
  {
    id: '4',
    name: 'Adaline',
    age: '21',
    image: require('../../../Assets/IMAGES/g4.png'),
  },
];

const chats = [
  {
    id: '1',
    name: 'Oliver Swift',
    message: 'Hi John, Its me Dr.Love',
    time: '14:28',
    count: '4',
    image: require('../../../Assets/IMAGES/g1.png'),
  },
  {
    id: '2',
    name: 'Oliver Swift',
    message: 'Hi John, Its me Dr.Love',
    time: '14:28',
    count: '4',
    image: require('../../../Assets/IMAGES/g2.png'),
  },
  {
    id: '3',
    name: 'Oliver Swift',
    message: 'Hi John, Its me Dr.Love',
    time: '14:28',
    count: '4',
    image: require('../../../Assets/IMAGES/g3.png'),
  },
  {
    id: '4',
    name: 'Oliver Swift',
    message: 'Hi John, Its me Dr.Love',
    time: '14:28',
    count: '4',
    image: require('../../../Assets/IMAGES/g4.png'),
  },
  {
    id: '5',
    name: 'Oliver Swift',
    message: 'Hi John, Its me Dr.Love',
    time: '14:28',
    count: '4',
    image: require('../../../Assets/IMAGES/g5.png'),
  },
];

const MessageScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your background image
      style={styles.backgroundImage}
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../../../Assets/IMAGES/Icon.png')}
          style={{ width: 40, height: 40, resizeMode: 'contain' }}
        />

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>

        <TouchableOpacity style={styles.iconButton}>
          <Icon name="ellipsis-horizontal" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#ddd"
          style={styles.searchInput}
        />
        <Icon
          name="search-outline"
          size={22}
          color="#fff"
          style={styles.searchIcon}
        />
      </View>

      {/* Your Matches */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Your Matches</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See More</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={matches}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.matchesList}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <Image source={item.image} style={styles.matchImage} />
            <View style={styles.matchOverlay}>
              <View style={styles.matchTop}>
                <Text style={styles.matchName}>{item.name}</Text>
                <Text style={styles.matchAge}>{item.age}</Text>
              </View>
              <View style={styles.matchBottom}>
                <Text style={styles.matchCompatibility}>92% Compatible</Text>
              </View>
            </View>
          </View>
        )}
      />

      {/* Chat list */}
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation?.navigate('SingleChatScreen')}
            style={styles.chatCard}
          >
            <Image source={item.image} style={styles.chatAvatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
            <View style={styles.chatMeta}>
              <View style={styles.messageCount}>
                <Text style={styles.countText}>{item.count}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerContainer: {
    marginTop: Platform.OS === 'ios' ? 50 : 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  headerTitleContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 60,
    paddingVertical: 8,
    borderRadius: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 25,
    marginTop: 20,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    height: 50,
  },
  sectionHeader: {
    marginTop: 25,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Urbanist-Medium',
  },
  seeMore: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Urbanist-Medium',
  },
  matchesList: {
    paddingLeft: 20,
    paddingVertical: 12,
    marginBottom: Platform.OS === 'android' ? 20 : 1,
  },
  matchCard: {
    width: width * 0.28,
    height: width * 0.38,
    marginRight: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  matchImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  matchOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  matchTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  matchName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  matchAge: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  matchBottom: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 4,
  },
  matchCompatibility: {
    color: '#A9E8D8',
    fontSize: 11,
    fontFamily: 'Urbanist-Medium',
  },
  chatList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 18,
    padding: 10,
    marginVertical: 6,
  },
  chatAvatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Urbanist-Medium',
  },
  chatMessage: {
    color: '#ccc',
    fontSize: 13,
    fontFamily: 'Urbanist-Medium',
  },
  chatMeta: {
    alignItems: 'flex-end',
    fontFamily: 'Urbanist-Medium',
  },
  messageCount: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  countText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  chatTime: {
    color: '#ccc',
    fontSize: 12,
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
});

export default MessageScreen;
