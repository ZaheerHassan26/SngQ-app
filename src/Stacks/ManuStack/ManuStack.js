// MenuStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MenuScreen from '../../Screens/MainScreens/MenuScreen/MenuScreen'; // Profile screen
import ProfileScreen from '../../Screens/MainScreens/ProfileScreen/ProfileScreen'; // Profile screen
import AccountDetailsScreen from '../../Screens/MainScreens/AccountDetailsScreen/AccountDetailsScreen'; // Profile screen
import NotificationScreen from '../../Screens/MainScreens/NotificationScreen/NotificationScreen'; // Profile screen
import InvitesSend from '../../Screens/MainScreens/InvitesSend/InvitesSend'; // Profile screen
import RequestSend from '../../Screens/MainScreens/RequestSend/RequestSend'; // Profile screen
import MyEvents from '../../Screens/MainScreens/MyEvents/MyEvents'; // Profile screen
import MembershipScreen from '../../Screens/MainScreens/MembershipScreen/MembershipScreen'; // Profile screen
import MakeEventPayment from '../../Screens/MainScreens/MakeEventPayment/MakeEventPayment'; // Profile screen
import PaymentScreen from '../../Screens/MainScreens/MakeEventPayment/MakeEventPayment';
import DeleteScreen from '../../Screens/MainScreens/DeleteScreen/DeleteScreen';
import EditScreen from '../../Screens/MainScreens/EditScreen/EditScreen';

const Stack = createStackNavigator();

const ManuStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      screenOptions={{ headerShown: false }} // Optionally hide headers for all screens
    >
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="AccountDetailsScreen"
        component={AccountDetailsScreen}
      />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="InvitesSend" component={InvitesSend} />
      <Stack.Screen name="RequestSend" component={RequestSend} />
      <Stack.Screen name="MyEvents" component={MyEvents} />
      <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
      <Stack.Screen name="MakeEventPayment" component={MakeEventPayment} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
      <Stack.Screen name="EditScreen" component={EditScreen} />
    </Stack.Navigator>
  );
};

export default ManuStack;
