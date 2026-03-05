import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Theme from '../../utils/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {getMessageApi} from '../../utils/Apis';
import moment from 'moment'; // Install this library: npm install moment

export default function MessageFlatlist() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const messages = useSelector(state => state.userReducer.messages);
  const {userValue, token} = useSelector(state => state.userReducer);
  const userId = userValue?.id;

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setRefreshing(true);
    await getMessageApi(userId, dispatch, token);
    setRefreshing(false);
  };

  // Combine and reverse data for most recent messages on top
  const combinedData = [
    ...messages?.messages.map(item => ({...item, type: 'message'})),
    ...messages?.quiz?.map(item => ({...item, type: 'quiz'})),
  ];

  const sortedData = combinedData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  const renderItem = ({item}) => {
    // Relative date display
    const messageTime = moment(item.created_at).fromNow(); // E.g., "1 day ago", "1 week ago"
    const title = item.type === 'message' ? 'Message' : 'Message 🔥';

    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() => {
          navigation.navigate('ShareScreen', {item: item});
        }}>
        <LinearGradient
          colors={['#FF3399', '#9E53DA']}
          style={styles.iconContainer}>
          <Image
            source={require('../../Assets/ICONS/msg-icon.png')}
            style={{width: 40, height: 40}}
          />
        </LinearGradient>
        <View style={styles.textContainer}>
          <Text style={styles.messageTitle}>{title}</Text>
          <Text style={styles.messageTime}>{messageTime}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: Theme.wp(5),
          marginBottom: 10,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Messages
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={sortedData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={fetchMessages}
        ListHeaderComponent={() => (
          <Text style={styles.emptyMessage}>
            Pull to refresh to load new msgs
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5F7F8',
    marginVertical: 2,
    borderRadius: 15,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {width: 100},
  messageTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    width: 120,
  },
  messageTime: {
    fontSize: 12,
    color: 'grey',
    position: 'absolute',
    right: Platform.OS === 'ios' ? -160 : -125,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'grey',
    fontSize: 16,
    marginBottom: 30,
  },
});
