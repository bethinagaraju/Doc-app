import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import Toast from 'react-native-toast-message';

const AppointmentConfirmationScreen = ({ route, navigation }) => {
  const { doctor, selectedSlot } = route.params;
  const [paymentMode, setPaymentMode] = useState(null);
  const [loading, setLoading] = useState(false);

 const handleConfirm = async () => {
  if (!paymentMode) return Alert.alert('Please select a payment mode');

  if (paymentMode === 'offline') {
    try {
      setLoading(true);

      console.log("Selected Slot: ", selectedSlot);
 

      // Extract start and end time from time string
      const [start, end] = selectedSlot.time.split('-');

      const res = await fetch('https://landing.docapp.co.in/api/appointment/create-appointment', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify({
          doctor_id: doctor.user_id,
          date: selectedSlot.date,
          start: start.trim(),
          end: end.trim(),
          type: 'offline',
          
        }),
      });
      
 


      const json = await res.json();
      console.log("Create appointment response:", json);

      if (json?.message?.includes('successfully')) {
        Toast.show({
          type: 'success',
          text1: 'Appointment Booked',
          text2: 'Offline payment selected',
        });
        navigation.popToTop();
      } else {
        Alert.alert('Booking Failed', json?.message || 'Try again.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  } else {
    navigation.navigate('AppoinmentPaymentScreen', {
  doctor,
  slot: selectedSlot.time,
  date: selectedSlot.date,
  consultationType: selectedSlot.mode === 'online_video' ? 'video' : 'inclinic',
  amount: doctor.consultation_fee,
  
});

  }
};

  return (
    <ScrollView style={tw`flex-1 bg-green-50`} contentContainerStyle={tw`pt-12 px-4 pb-8`}>
      <Text style={tw`text-2xl font-bold text-green-800 mb-6 text-center`}>
        Confirm Appointment
      </Text>

      <View style={tw`bg-white p-4 rounded-2xl shadow mb-6`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-1`}>Doctor</Text>
        <Text style={tw`text-green-800 text-base mb-1`}>{doctor?.user.username}</Text>
        {doctor?.specialization && (
          <Text style={tw`text-gray-600 text-sm mb-1`}>{doctor.specialization}</Text>
        )}
        <Text style={tw`text-gray-600 text-base mb-1`}>{doctor.consultation_fee}</Text>
        <Text style={tw`text-green-700`}>
      {[
        doctor.user.address[0]?.house_no,
        doctor.user.address[0]?.street,
        doctor.user.address[0]?.landmark,
        doctor.user.address[0]?.city,
        doctor.user.address[0]?.state,
        doctor.user.address[0]?.pincode,
      ]
        .filter((item) => item && item.trim() !== '')
        .join(', ')}
    </Text>
        {doctor?.address && (
          <Text style={tw`text-gray-500 text-sm`}>{doctor.address}</Text>
        )}
      </View>

      <View style={tw`bg-white p-4 rounded-2xl shadow mb-6`}>
        <Text style={tw`text-lg font-semibold text-gray-700 mb-2`}>Appointment Details</Text>
        <Text style={tw`text-base text-gray-700`}>
          Date: <Text style={tw`text-green-800`}>{selectedSlot.date}</Text>
        </Text>
        <Text style={tw`text-base text-gray-700`}>
          Time: <Text style={tw`text-green-800`}>{selectedSlot.time}</Text>
        </Text>
        <Text style={tw`text-base text-gray-700`}>
          Mode: <Text style={tw`text-green-800`}>{selectedSlot.mode}</Text>
        </Text>
      </View>

      <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>
        Select Payment Method
      </Text>
      <View style={tw`flex-row mb-6`}>
        {['online', 'offline'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={tw`
              px-5 py-2 mr-4 rounded-full
              ${paymentMode === mode ? 'bg-green-700' : 'bg-green-200'}
            `}
            onPress={() => setPaymentMode(mode)}>
            <Text style={tw`${paymentMode === mode ? 'text-white' : 'text-green-800'}`}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={tw`bg-green-700 py-4 rounded-full items-center`}
        onPress={handleConfirm}
        disabled={loading}>
        <Text style={tw`text-white text-lg font-semibold`}>
          {loading ? 'Booking...' : 'Confirm & Proceed'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentConfirmationScreen;
