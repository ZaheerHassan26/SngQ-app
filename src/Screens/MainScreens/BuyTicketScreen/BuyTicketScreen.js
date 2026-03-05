import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BuyTicketScreen = ({ navigation }) => {
  const [quantity, setQuantity] = useState(2);
  const pricePerTicket = 120;
  const totalPrice = pricePerTicket * quantity;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')} // your gradient bg image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <View style={styles.buyTicketButton}>
            <Text style={styles.buyTicketText}>Buy Ticket</Text>
          </View>
        </View>

        {/* Event Image */}
        <Image
          source={require('../../../Assets/IMAGES/fun1.png')} // your event detail image
          style={styles.eventImage}
        />

        {/* Event Info */}
        <View style={styles.infoSection}>
          <View style={styles.titleRow}>
            <Text style={styles.eventTitle}>
              International{'\n'}Rooftop Mixer Night
            </Text>
            <View style={styles.priceCircle}>
              <Text style={styles.priceText}>${pricePerTicket}</Text>
            </View>
          </View>
          <View
            style={{ borderWidth: 0.5, borderColor: 'white', marginTop: 20 }}
          ></View>
          {/* Location */}
          <View style={styles.infoRow}>
            <MaterialIcon name="map-marker-outline" size={20} color="#fff" />
            <Text style={styles.infoText}>
              173 7th Ave S, New York, NY 10014
            </Text>
          </View>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <MaterialIcon
              name="calendar-blank-outline"
              size={20}
              color="#fff"
            />
            <Text style={styles.infoText}>
              Saturday 30 August 2025 from 16:00 - 23:45
            </Text>
          </View>
          <View
            style={{ borderWidth: 0.5, borderColor: 'white', marginTop: 20 }}
          ></View>
          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <TouchableOpacity
              onPress={handleDecrease}
              style={styles.circleButton}
            >
              <Text style={styles.circleText}>-</Text>
            </TouchableOpacity>

            <View style={styles.quantityBox}>
              <Text style={styles.quantityText}>
                {quantity < 10 ? `0${quantity}` : quantity}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleIncrease}
              style={styles.circleButton}
            >
              <Text style={styles.circleText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.totalText}>${totalPrice}</Text>
          </View>

          {/* Proceed Button */}
          <LinearGradient
            colors={['#255A3B', '#3DA8A1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.proceedButton}
          >
            <TouchableOpacity
              onPress={() => navigation?.navigate('PaymentScreen')}
            >
              <Text style={styles.proceedText}>Proceed</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BuyTicketScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 60,
    gap: 55,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyTicketButton: {
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buyTicketText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  eventImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    // borderWidth: 2,
    // borderColor: '#00AEEF',
    marginTop: 25,
  },
  infoSection: {
    marginTop: 25,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  priceCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#fff',
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityBox: {
    marginHorizontal: 15,
    backgroundColor: '#4E9E91',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 6,
  },
  quantityText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 'auto',
  },
  proceedButton: {
    marginTop: 35,
    borderRadius: 30,
    alignItems: 'center',
    height: 55,
    justifyContent: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
