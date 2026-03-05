import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MatchesScreen from '../../Screens/MainScreens/MatchesScreen/MatchesScreen';

const Stack = createStackNavigator();

const ShareStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle="ight-content" backgroundColor={'#1C2232'} />
      ) : (
        <StatusBar barStyle="ight-content" backgroundColor="#0D1724" />
      )}

      <Stack.Navigator
        initialRouteName="MatchesScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="MatchesScreen" component={MatchesScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default ShareStack;
