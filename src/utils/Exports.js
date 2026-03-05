import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Purchases from 'react-native-purchases';
import {Platform} from 'react-native';
export {
  AntDesign,
  Entypo,
  Feather,
  MaterialIcons,
  Octicons,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  SimpleLineIcons,
  Foundation,
  EvilIcons,
  Fontisto,
};

const getOfferings = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      return offerings.current.availablePackages;
    } else {
      console.log('No offerings found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching offerings:', error);
    return [];
  }
};

const purchasePackage = async pkg => {
  try {
    const purchaseInfo = await Purchases.purchasePackage(pkg);
    return purchaseInfo;
  } catch (error) {
    if (!error.userCancelled) {
      console.error('Error purchasing package:', error);
    }
    return null;
  }
};

const restorePurchases = async () => {
  try {
    const purchaserInfo = await Purchases.restorePurchases();
    return purchaserInfo;
  } catch (error) {
    console.error('Error restoring purchases:', error);
    return null;
  }
};

export {getOfferings, purchasePackage, restorePurchases};
