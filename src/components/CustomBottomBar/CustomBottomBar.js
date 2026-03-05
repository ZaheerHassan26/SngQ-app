import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {dispatchBottom} from '../../redux/actions';

const CustomBottomBar = ({state, descriptors, navigation}) => {
  const {userValue} = useSelector(state => state.userReducer);
  const {token} = useSelector(state => state.userReducer);
  const {bottomColor} = useSelector(state => state.userReducer);

  const userId = userValue?.id;
  const dispatch = useDispatch();
  const [messagesViewed, setMessagesViewed] = useState(false);
  const [tabBarHeight, setTabBarHeight] = useState(0);
  const [isTab, setIsTab] = useState('HomeStack');

  const images = {
    HomeStack: {
      active: require('../../Assets/IMAGES/home-selected.png'),
      inactive: require('../../Assets/IMAGES/home-tabbar.png'),
    },
    MessageStack: {
      active: require('../../Assets/IMAGES/chat-tabbar-selected.png'),
      inactive: require('../../Assets/IMAGES/chat-tabbar.png'),
    },
    VipStack: {
      active: require('../../Assets/ICONS/icontwo.png'),
      inactive: require('../../Assets/ICONS/iconone.png'),
    },
  };

  const fetchMessages = async () => {
    await getMessageApi(userId, dispatch, token);
  };

  const handleLayout = event => {
    const {height} = event.nativeEvent.layout;
    setTabBarHeight(height);
  };

  useEffect(() => {
    console.log('Tab bar height:', tabBarHeight); // You can now use this height elsewhere
  }, [tabBarHeight, isTab]);

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 45, // Reduced height for a smaller bottom tab
        // backgroundColor: '#EC9BEE',
        backgroundColor:
          bottomColor?.trim()?.toLowerCase() === 'vipstack' &&
          userValue?.gender?.trim()?.toLowerCase() === 'boy'
            ? '#3399FF'
            : bottomColor?.trim()?.toLowerCase() === 'vipstack'
            ? '#EC9BEE'
            : '#fff',

        paddingHorizontal: 45,
        paddingBottom: 10, // Adjusted padding to match the smaller height
      }}
      onLayout={handleLayout}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        // setIsTab(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);

            if (route.name === 'MessageStack') {
              fetchMessages();
              setMessagesViewed(true); // Set messages as viewed
            }
          }
          setIsTab(route.name);
          dispatch(dispatchBottom(route.name));
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const imageSource = images[route.name]
          ? isFocused
            ? images[route.name].active
            : images[route.name].inactive
          : null;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}>
            {imageSource && (
              <View>
                <Image
                  source={imageSource}
                  style={styles.tabBarImage}
                  resizeMode="contain"
                />
                {route.name === 'MessageStack' && !messagesViewed && (
                  <View style={styles.dot} />
                )}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 20, // Reduced height for a smaller bottom tab
    // backgroundColor: '#EC9BEE',

    paddingHorizontal: 45,
    paddingBottom: 10, // Adjusted padding to match the smaller height
  },
  tabBarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarImage: {
    width: 28,
    height: 28,
  },
  dot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: 'red',
  },
});

export default CustomBottomBar;
