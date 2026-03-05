import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';

import HomeStack from '../HomeStack/HomeStack';
import MessageStack from '../MessageStack/MessageStack';
import VipStack from '../VipStack/VipStack';
import ShareStack from '../ShareStack/ShareStack';
import ManuStack from '../ManuStack/ManuStack';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const getTabBarVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'EventsScreen';

  const hideTabBarRoutes = [
    'LogoScreen',
    'EventDetailScreen',
    'LifestyleScreen',
    'InterestsScreen',
    'AddInterestScreen',
    'AddPicturesScreen',
    'DistanceScreen',
    'BuyTicketScreen',
    'ChatScreen',
    'AccountDetailsScreen',
    'NextChatScreen',
    'EventSearch',
    'ProfileScreen',
    'NotificationScreen',
    'AccountDetailsScreen',
    'InvitesSend',
    'RequestSend',
    'MyEvents',
    'MembershipScreen',
    'MakeEventPayment',
    'MenuScreen',
    'DownloadTicket',
    'AttendeesScreen',
    'PaymentScreen',
    'DeleteScreen',
    'InviteScreen',
    'EditScreen',
    'OtherUserScreen',
    'SingleChatScreen',
    'PrivateDateScreen',
  ];

  return hideTabBarRoutes.includes(routeName) ? 'none' : 'flex';
};

const icons = {
  HomeStack: { icon: require('../../Assets/IMAGES/ok4.png'), label: 'Home' },
  Chat: { icon: require('../../Assets/IMAGES/ok3.png'), label: 'Chat' },
  VipStack: { icon: require('../../Assets/IMAGES/ok5.png'), label: 'Events' },
  ShareStack: {
    icon: require('../../Assets/IMAGES/ok1.png'),
    label: 'Matches',
  },
  ManuStack: { icon: require('../../Assets/IMAGES/ok2.png'), label: 'Profile' },
};

const CustomTabBar = ({ state, navigation, display }) => {
  if (display === 'none') return null;

  return (
    <View style={styles.container}>
      {/* Use gradient as a fallback background on Android */}
      {Platform.OS === 'android' ? (
        <LinearGradient
          colors={['rgba(30,37,55,0.9)', 'rgba(30,37,55,0.95)']}
          style={styles.blurBackground}
        >
          <View style={styles.row}>
            {state.routes.map((route, index) => {
              const focused = state.index === index;
              const { icon, label } = icons[route.name] || {};
              const isVipStack = route.name === 'VipStack';
              const onPress = () => {
                if (!focused) navigation.navigate(route.name);
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  activeOpacity={0.9}
                  style={styles.button}
                >
                  {focused ? (
                    <LinearGradient
                      colors={['#255A3B', '#3DA8A1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activePill}
                    >
                      <Image
                        source={icon}
                        style={{
                          width: isVipStack ? 20 : 22,
                          height: isVipStack ? 20 : 22,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={styles.activeLabel}>{label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveCircle}>
                      <Image
                        source={icon}
                        style={{
                          width: isVipStack ? 17 : 22,
                          height: isVipStack ? 17 : 22,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>
      ) : (
        <BlurView
          style={styles.blurBackground}
          blurType="dark"
          blurAmount={18}
          reducedTransparencyFallbackColor="#1E2537"
        >
          <View style={styles.row}>
            {state.routes.map((route, index) => {
              const focused = state.index === index;
              const { icon, label } = icons[route.name] || {};
              const isVipStack = route.name === 'VipStack';
              const onPress = () => {
                if (!focused) navigation.navigate(route.name);
              };

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  activeOpacity={0.9}
                  style={styles.button}
                >
                  {focused ? (
                    <LinearGradient
                      colors={['#255A3B', '#3DA8A1']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.activePill}
                    >
                      <Image
                        source={icon}
                        style={{
                          width: isVipStack ? 20 : 22,
                          height: isVipStack ? 20 : 22,
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={styles.activeLabel}>{label}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.inactiveCircle}>
                      <Image
                        source={icon}
                        style={{
                          width: isVipStack ? 17 : 22,
                          height: isVipStack ? 17 : 22,
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      )}
    </View>
  );
};

const MainStack = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#0D1724' }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Tab.Navigator
        initialRouteName="HomeStack"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            display: getTabBarVisibility(route),
            position: 'absolute',
            bottom: Platform.OS === 'android' ? 20 : 34,
            height: 80,
            backgroundColor: 'transparent',
          },
        })}
        tabBar={props => {
          // Get the current route safely for React Navigation v6+
          const currentRoute = props.state.routes[props.state.index];
          const display = getTabBarVisibility(currentRoute);

          return <CustomTabBar {...props} display={display} />;
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStack} />
        <Tab.Screen name="Chat" component={MessageStack} />
        <Tab.Screen name="VipStack" component={VipStack} />
        {/* <Tab.Screen name="ShareStack" component={ShareStack} /> */}
        <Tab.Screen name="ManuStack" component={ManuStack} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 10 : 34,
    alignSelf: 'center',
    width: width * 0.9,
    height: 70,
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 10, // adds shadow on Android
    // backgroundColor: 'rgba(30,37,55,0.85)', // fallback to avoid transparent glitch
  },
  blurBackground: {
    flex: 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    height: 50,
    width: 95,
  },
  activeLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  inactiveCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MainStack;
