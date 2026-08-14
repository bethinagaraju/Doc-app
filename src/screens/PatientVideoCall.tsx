import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import VideoCall from './(tabs)/VideoCall';
import tw from 'twrnc';

const PatientVideoCall = () => {
  const route = useRoute<any>();
  const { appointmentId } = route.params || {};

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        <VideoCall
          embeddedRole="patient"
          embeddedApptId={appointmentId ? String(appointmentId) : '30'}
        />
      </View>
    </SafeAreaView>
  );
};

export default PatientVideoCall;
