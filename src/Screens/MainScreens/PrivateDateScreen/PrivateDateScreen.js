import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Modal,
  Animated,
  Easing,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PrivateDateScreen = () => {
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  return (
    <ImageBackground
      source={require('../../../Assets/IMAGES/splashBg2.png')}
      style={styles.bg}
      blurRadius={15}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back + Title */}

        <View style={styles.header}>
          <TouchableOpacity>
            <Image
              source={require('../../../Assets/IMAGES/Icon.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Request Private Date</Text>
          </View>
        </View>

        {/* <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <LinearGradient
            colors={['#ffffff55', '#ffffff30']}
            style={styles.headerTag}
          >
            <Text style={{ color: '#fff', fontSize: 12 }}>
              Request Private Date
            </Text>
          </LinearGradient>
        </View> */}

        {/* Select Date */}
        <Text style={styles.label}>Select Date</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setDateModal(true)}
        >
          <Text style={styles.inputText}>{'Select'}</Text>
          <Ionicons name="calendar-outline" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Select Time */}
        <Text style={styles.label}>Select Time</Text>
        <TouchableOpacity
          style={styles.inputBox}
          onPress={() => setTimeModal(true)}
        >
          <Text style={styles.inputText}>{'Select'}</Text>
          <Ionicons name="time-outline" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Location */}
        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder="Type here"
          placeholderTextColor="#ccc"
          style={styles.textInput}
        />

        {/* Map Link */}
        <Text style={styles.label}>Location Google Map Link</Text>
        <TextInput
          placeholder="Type here"
          placeholderTextColor="#ccc"
          style={styles.textInput}
        />

        {/* Next Button */}
        <LinearGradient colors={['#255A3B', '#3DA8A1']} style={styles.nextBtn}>
          <Text style={styles.nextBtnText}>Next</Text>
        </LinearGradient>
      </ScrollView>

      {/* ---------------------------------------------------------------------- */}
      {/* 📅 DATE PICKER MODAL */}
      {/* ---------------------------------------------------------------------- */}
      <Modal visible={dateModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Date</Text>

            {/* SIMPLE CUSTOM DATE GRID */}
            <View style={styles.calendarHeader}>
              <Ionicons name="chevron-back" size={20} color="#fff" />
              <Text style={styles.monthTitle}>October 2025</Text>
              <Ionicons name="chevron-forward" size={20} color="#fff" />
            </View>

            {/* WEEK ROW */}
            <View style={styles.weekRow}>
              {['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'].map(d => (
                <Text key={d} style={styles.weekText}>
                  {d}
                </Text>
              ))}
            </View>

            {/* DATE GRID (Sample) */}
            <View style={styles.dateGrid}>
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                const active = day === 7;

                return (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dateCircle,
                      active && styles.activeDateCircle,
                    ]}
                    onPress={() => {
                      setSelectedDate(`October ${day}, 2025`);
                      setDateModal(false);
                    }}
                  >
                    <Text
                      style={[styles.dateNumber, active && { color: '#fff' }]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>

      {/* ---------------------------------------------------------------------- */}
      {/* ⏰ TIME PICKER MODAL */}
      {/* ---------------------------------------------------------------------- */}
      <Modal visible={timeModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Time</Text>

            <View style={styles.timeRow}>
              {/* Hour */}
              <View style={styles.timeCol}>
                <Text style={styles.timeLabel}>Hour</Text>
                <TouchableOpacity
                  style={styles.timeSlot}
                  onPress={() => {
                    setSelectedTime('07:00 PM');
                    setTimeModal(false);
                  }}
                >
                  <Text style={styles.timeSlotText}>07</Text>
                </TouchableOpacity>
              </View>

              {/* Minute */}
              <View style={styles.timeCol}>
                <Text style={styles.timeLabel}>Minute</Text>
                <TouchableOpacity
                  style={styles.timeSlot}
                  onPress={() => {
                    setSelectedTime('07:30 PM');
                    setTimeModal(false);
                  }}
                >
                  <Text style={styles.timeSlotText}>30</Text>
                </TouchableOpacity>
              </View>

              {/* AM/PM */}
              <View style={styles.timeCol}>
                <Text style={styles.timeLabel}> </Text>
                <View style={styles.ampmRow}>
                  <TouchableOpacity style={styles.ampmBtn}>
                    <Text style={{ color: '#fff' }}>AM</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.ampmBtn, styles.activeAmpm]}>
                    <Text style={{ color: '#fff' }}>PM</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default PrivateDateScreen;

/* ------------------------------------------------------ */
/* 🌈 STYLES */
/* ------------------------------------------------------ */
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    padding: 20,
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  headerTag: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  label: {
    color: '#fff',
    marginTop: 25,
    marginBottom: 6,
    fontSize: 15,
  },
  inputBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: { color: '#fff' },

  textInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    height: 52,
    borderRadius: 30,
    paddingHorizontal: 20,
    color: '#fff',
  },

  nextBtn: {
    height: 55,
    borderRadius: 30,
    marginTop: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  /* Modal */
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '88%',
    backgroundColor: 'rgba(40,40,40,0.9)',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
    marginBottom: 15,
  },
  monthTitle: { color: '#fff', fontSize: 16 },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekText: { color: '#ccc', width: 35, textAlign: 'center' },

  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  activeDateCircle: {
    backgroundColor: '#63d3b4',
  },
  dateNumber: {
    color: '#ddd',
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  timeCol: { alignItems: 'center', width: '30%' },
  timeLabel: { color: '#ccc', marginBottom: 5 },

  timeSlot: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeSlotText: { color: '#fff', fontSize: 17 },

  ampmRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 5,
  },
  ampmBtn: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeAmpm: {
    backgroundColor: '#63d3b4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 25,
    paddingVertical: 7,
    borderRadius: 20,
    fontFamily: 'Urbanist-Medium',
    right: 10,
  },
});
