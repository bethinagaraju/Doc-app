import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import VideoCall from '@/screens/(tabs)/VideoCall';
import VideoCallScreen from '@/screens/VideoCallScreen';

const DoctorNotificationsScreen = () => {
  const notifications = [
    {
      id: 1,
      title: 'Appointment Confirmed',
      message: 'Your appointment with Jane Smith is confirmed for 2025-06-22 at 10:00 AM.'
    },
    {
      id: 2,
      title: 'New Message',
      message: 'You have received a new message from John Appleseed.'
    }
    // To test empty state, set notifications = []
  ];
  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Notifications" />
      <View style={tw`flex-1 px-4 pt-6`}>
        <Text style={tw`text-2xl text-green-700 font-bold mb-4 text-center`}>Recent Notifications</Text>
        <View style={{ width: '100%', maxWidth: 480, alignSelf: 'center' }}>
          {notifications.length === 0 ? (
            <View style={tw`items-center mt-12`}>
              <Text style={tw`text-green-300 text-lg font-bold`}>No Notifications</Text>
              <Text style={tw`text-green-400 mt-2 text-base`}>You have no new notifications at the moment.</Text>
            </View>
          ) : (
            notifications.map((item) => (
              <View key={item.id} style={tw`bg-green-100 rounded-2xl p-5 mb-4 flex-row items-center shadow-sm`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-green-700 font-bold text-lg mb-1`}>{item.title}</Text>
                  <Text style={tw`text-green-600 mb-1`}>{item.message}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      </View>



      
    </View>
  );
};

const styles = StyleSheet.create({});

export default DoctorNotificationsScreen;
