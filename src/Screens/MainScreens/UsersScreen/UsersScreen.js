import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TextInput,
  Platform,
} from 'react-native';
import {Ionicons, MaterialIcons} from '../../../utils/Exports';
import {deleteUserApi, getAllUserApi} from '../../../utils/Apis';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const UsersScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const {token} = useSelector(state => state.userReducer);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllUserApi(token, setUsers);
    }
  }, [isFocused]);

  const handleDeleteUser = userId => {
    Alert.alert(
      'Remove Contact',
      'Are you sure you want to remove this contact?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteUserApi(userId, token); // Ensure the delete request is complete
            getAllUserApi(token, setUsers); // Refresh the user list
          },
        },
      ],
    );
  };

  const renderItem = ({item}) => (
    <View style={styles.userContainer}>
      {/* <Image source={{uri: item.photo}} style={styles.userPhoto} /> */}
      <View style={styles.userDetails}>
        <Text style={styles.userName}>
          {item?.contact_user?.full_name
            ? item?.contact_user?.full_name
            : item?.contact_user?.username}
        </Text>
        {/* <Text style={styles.userDate}>
          Joined: {moment(item?.created_at).format('MMM Do YYYY')}
        </Text> */}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteUser(item?.contact_user?.id)}>
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <MaterialIcons name="arrow-back-ios" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Friends</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SearchScreen')}
          style={styles.inputContainer}>
          <Image
            source={require('../../../Assets/ICONS/person.png')}
            style={{width: 25, height: 25, marginRight: 10}}
          />
          <Text>Add friend username</Text>
          {/* <TextInput
            style={styles.textInput}
            placeholder="Add friend username"
            placeholderTextColor="black"
            editable={false} // Disables the TextInput
          /> */}
        </TouchableOpacity>
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()} // Ensure unique keys
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                You have not added any friends yet.
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    left: 120,
  },
  listContainer: {
    paddingBottom: 60,
  },
  userContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},

    // alignSelf: 'center',
    marginTop: 20,
    marginHorizontal: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F8',
    marginVertical: 2,
    borderRadius: 15,
    // marginBottom: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7F8',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    width: Platform.OS === 'ios' ? 340 : 300,
    opacity: 1,
    alignSelf: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
});

export default UsersScreen;
