import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MessageScreen from '../../Screens/MainScreens/MessageScreen/MessageScreen';
import ChatScreen from '../../Screens/MainScreens/ChatScreen/ChatScreen';
import PlanScreen from '../../Screens/PlanScreen/PlanScreen';
import SingleChatScreen from '../../Screens/MainScreens/SingleChatScreen/SingleChatScreen';

const Stack = createStackNavigator();

const MessageStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="ight-content" />
      ) : (
        <StatusBar barStyle="ight-content" backgroundColor="#0D1724" />
      )}

      <Stack.Navigator
        initialRouteName="MessageScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MessageScreen" component={MessageScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PlanScreen" component={PlanScreen} />
        <Stack.Screen name="SingleChatScreen" component={SingleChatScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default MessageStack;
