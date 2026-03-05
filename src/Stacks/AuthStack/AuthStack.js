import { StatusBar, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../../Screens/SignupScreen.js/SignupScreen';
import LoginScreen from '../../Screens/LoginScreen/LoginScreen';
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';
import IntroScreen from '../../Screens/IntroScreen/IntroScreen';
import CountrySelect from '../../Screens/CountrySelect/CountrySelect';
import RequestInvite from '../../Screens/RequestInvite/RequestInvite';
import GenderSelection from '../../Screens/GenderSelection/GenderSelection';
import WhoWouldYouLikeToMeet from '../../Screens/WhoWouldYouLikeToMeet/WhoWouldYouLikeToMeet';
import SelectDate from '../../Screens/SelectDate/SelectDate';
import SelectInterest from '../../Screens/SelectInterest/SelectInterest';
import LookingForScreen from '../../Screens/LookingForScreen/LookingForScreen';
import PhotoUpload from '../../Screens/PhotoUpload/PhotoUpload';
import FacialScanScreen from '../../Screens/FacialScanScreen/FacialScanScreen';
import CompleteProcess from '../../Screens/CompleteProcess/CompleteProcess';
import PaymentScreen from '../../Screens/PaymentScreen/PaymentScreen';
import MakePayment from '../../Screens/MakePayment/MakePayment';
import ThankYouScreen from '../../Screens/ThankYouScreen/ThankYouScreen';
import RequestInviteScreen from '../../Screens/RequestInviteScreen/RequestInviteScreen';
import ForgotPassOne from '../../Screens/ForgotPassOne/ForgotPassOne';
import ForgotPassTwo from '../../Screens/ForgotPassTwo/ForgotPassTwo';
import PlanScreen from '../../Screens/PlanScreen/PlanScreen';

import ForgotPassThree from '../../Screens/ForgotPassThree/ForgotPassThree';

import MainStack from '../MainStack/MainStack';
import LogoScreen from '../../Screens/MainScreens/LogoScreen/LogoScreen';
import LifestyleScreen from '../../Screens/MainScreens/LifestyleScreen/LifestyleScreen';
import InterestsScreen from '../../Screens/MainScreens/InterestsScreen/InterestsScreen';
import AddInterestScreen from '../../Screens/MainScreens/AddInterestScreen/AddInterestScreen';
import AddPicturesScreen from '../../Screens/MainScreens/AddPicturesScreen/AddPicturesScreen';
import DistanceScreen from '../../Screens/MainScreens/DistanceScreen/DistanceScreen';
import NextChatScreen from '../../Screens/MainScreens/NextChatScreen/NextChatScreen';
import RequestInviteOne from '../../Screens/RequestInviteOne/RequestInviteOne';
import RequestInviteTwo from '../../Screens/RequestInviteTwo/RequestInviteTwo';
import RequestInviteThree from '../../Screens/RequestInviteThree/RequestInviteThree';
import LoginWithPhone from '../../Screens/LoginWithPhone/LoginWithPhone';
import OtpVerificationScreen from '../../Screens/OtpVerificationScreen/OtpVerificationScreen';
import ChangePasswordScreen from '../../Screens/ChangePasswordScreen/ChangePasswordScreen';
import ChatScreen from '../../Screens/MainScreens/ChatScreen/ChatScreen';
import MembershipPlanScreen from '../../Screens/PaymentScreen/PaymentScreen';
import TellUsScreen from '../../Screens/TellUsScreen/TellUsScreen';
import ProfileScreen from '../../Screens/MainScreens/ProfileScreen/ProfileScreen';
import MyEvents from '../../Screens/MainScreens/MyEvents/MyEvents';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* StatusBar settings */}
      <StatusBar
        backgroundColor="black" // Android background color
        barStyle="light-content" // White text/icons
      />

      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} />
        <Stack.Screen name="CountrySelect" component={CountrySelect} />
        <Stack.Screen name="RequestInvite" component={RequestInvite} />
        <Stack.Screen name="GenderSelection" component={GenderSelection} />
        <Stack.Screen name="WhoWouldYouLikeToMeet" component={WhoWouldYouLikeToMeet} />
        <Stack.Screen name="SelectDate" component={SelectDate} />
        <Stack.Screen name="SelectInterest" component={SelectInterest} />
        <Stack.Screen name="LookingForScreen" component={LookingForScreen} />
        <Stack.Screen name="PhotoUpload" component={PhotoUpload} />
        <Stack.Screen name="FacialScanScreen" component={FacialScanScreen} />
        <Stack.Screen name="CompleteProcess" component={CompleteProcess} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="MakePayment" component={MakePayment} />
        <Stack.Screen name="ThankYouScreen" component={ThankYouScreen} />
        <Stack.Screen
          name="RequestInviteScreen"
          component={RequestInviteScreen}
        />
        <Stack.Screen name="ForgotPassOne" component={ForgotPassOne} />
        <Stack.Screen name="ForgotPassTwo" component={ForgotPassTwo} />
        <Stack.Screen name="ForgotPassThree" component={ForgotPassThree} />
        <Stack.Screen name="MainStack" component={MainStack} />
        <Stack.Screen name="LogoScreen" component={LogoScreen} />

        <Stack.Screen
          name="LifestyleScreen"
          component={LifestyleScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
        <Stack.Screen
          name="AddInterestScreen"
          component={AddInterestScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="AddPicturesScreen"
          component={AddPicturesScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="DistanceScreen"
          component={DistanceScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="NextChatScreen" component={NextChatScreen} />
        <Stack.Screen name="RequestInviteOne" component={RequestInviteOne} />
        <Stack.Screen name="RequestInviteTwo" component={RequestInviteTwo} />
        <Stack.Screen
          name="RequestInviteThree"
          component={RequestInviteThree}
        />
        <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
        <Stack.Screen
          name="OtpVerificationScreen"
          component={OtpVerificationScreen}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PlanScreen" component={PlanScreen} />
        <Stack.Screen
          name="MembershipPlanScreen"
          component={MembershipPlanScreen}
        />
        <Stack.Screen
          name="TellUsScreen"
          component={TellUsScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyEvents" component={MyEvents} />
      </Stack.Navigator>
    </View>
  );
};

export default AuthStack;
