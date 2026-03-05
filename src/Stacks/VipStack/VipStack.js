import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from '../../Screens/MainScreens/EventsScreen/EventsScreen';
import EventDetailScreen from '../../Screens/MainScreens/EventDetailScreen/EventDetailScreen';
import AttendeesScreen from '../../Screens/MainScreens/AttendeesScreen/AttendeesScreen';
import BuyTicketScreen from '../../Screens/MainScreens/BuyTicketScreen/BuyTicketScreen';
import DownloadTicket from '../../Screens/MainScreens/DownloadTicket/DownloadTicket';
import MakeEventPayment from '../../Screens/MainScreens/MakeEventPayment/MakeEventPayment';
import EventSearch from '../../Screens/MainScreens/EventSearch/EventSearch';
import LogoScreen from '../../Screens/MainScreens/LogoScreen/LogoScreen';
import LifestyleScreen from '../../Screens/MainScreens/LifestyleScreen/LifestyleScreen';
import InterestsScreen from '../../Screens/MainScreens/InterestsScreen/InterestsScreen';
import AddInterestScreen from '../../Screens/MainScreens/AddInterestScreen/AddInterestScreen';
import AddPicturesScreen from '../../Screens/MainScreens/AddPicturesScreen/AddPicturesScreen';
import DistanceScreen from '../../Screens/MainScreens/DistanceScreen/DistanceScreen';
import NextChatScreen from '../../Screens/MainScreens/NextChatScreen/NextChatScreen';
import HomeScreen from '../../Screens/MainScreens/HomeScreen/HomeScreen';
import PaymentScreen from '../../Screens/MainScreens/MakeEventPayment/MakeEventPayment';
import InviteScreen from '../../Screens/MainScreens/InviteScreen/InviteScreen';

const Stack = createStackNavigator();

const VipStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D1724' }}>
      <StatusBar
        backgroundColor="black" // Android background color
        barStyle="light-content" // White text/icons
      />
      <Stack.Navigator
        initialRouteName="EventsScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="EventsScreen" component={EventsScreen} />
        <Stack.Screen name="EventSearch" component={EventSearch} />

        <Stack.Screen name="EventDetailScreen" component={EventDetailScreen} />
        <Stack.Screen name="AttendeesScreen" component={AttendeesScreen} />
        <Stack.Screen name="BuyTicketScreen" component={BuyTicketScreen} />
        <Stack.Screen name="MakeEventPayment" component={MakeEventPayment} />
        <Stack.Screen name="DownloadTicket" component={DownloadTicket} />
        <Stack.Screen
          name="LogoScreen"
          component={LogoScreen}
          options={{ tabBarStyle: { display: 'none' } }} // Hide tab bar for this screen
        />
        <Stack.Screen name="LifestyleScreen" component={LifestyleScreen} />
        <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
        <Stack.Screen name="AddInterestScreen" component={AddInterestScreen} />
        <Stack.Screen name="AddPicturesScreen" component={AddPicturesScreen} />
        <Stack.Screen name="DistanceScreen" component={DistanceScreen} />
        <Stack.Screen name="NextChatScreen" component={NextChatScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="InviteScreen" component={InviteScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default VipStack;
