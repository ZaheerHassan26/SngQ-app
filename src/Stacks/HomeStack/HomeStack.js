import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../Screens/MainScreens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Screens/MainScreens/ProfileScreen/ProfileScreen';
import OtherUserScreen from '../../Screens/MainScreens/OtherUserScreen/OtherUserScreen';
import SingleChatScreen from '../../Screens/MainScreens/SingleChatScreen/SingleChatScreen';
import PrivateDateScreen from '../../Screens/MainScreens/PrivateDateScreen/PrivateDateScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'ios' ? (
        <StatusBar
          backgroundColor="black" // Android background color
          barStyle="light-content" // White text/icons
        />
      ) : (
        <StatusBar barStyle="ight-content" backgroundColor="#0D1724" />
      )}

      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SingleProfileScreen" component={OtherUserScreen} />
        <Stack.Screen name="OtherUserScreen" component={OtherUserScreen} />
        <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
        <Stack.Screen name="PrivateDateScreen" component={PrivateDateScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default HomeStack;
