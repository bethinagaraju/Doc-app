import React from 'react';
import { SafeAreaView, View, Text, FlatList, StatusBar } from 'react-native';
import tw from 'twrnc';

type Appointment = {
  id: string;
  patientName: string;
  time: string;
  doctor: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
};

const sampleAppointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', time: '10:00 AM', doctor: 'Dr. A. Smith', status: 'Scheduled' },
  { id: '2', patientName: 'Mary Jane', time: '10:30 AM', doctor: 'Dr. S. Patel', status: 'Completed' },
  { id: '3', patientName: 'Akash Kumar', time: '11:00 AM', doctor: 'Dr. R. Rao', status: 'Scheduled' },
];

const AppointmentItem = ({ item }: { item: Appointment }) => (
  <View style={tw`bg-white rounded-xl p-3 mb-3 shadow`}>
    <View style={tw`flex-row justify-between`}>
      <View>
        <Text style={tw`text-green-700 font-semibold`}>{item.patientName}</Text>
        <Text style={tw`text-xs text-gray-500`}>{item.doctor}</Text>
      </View>
      <View style={tw`items-end`}>
        <Text style={tw`text-sm text-gray-700`}>{item.time}</Text>
        <Text style={tw`text-xs mt-1 ${item.status === 'Scheduled' ? 'text-yellow-600' : item.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
          {item.status}
        </Text>
      </View>
    </View>
  </View>
);

export default function HospitalAppointmentsScreen() {
  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />
      <View style={tw`bg-green-600 p-4`}>
        <Text style={tw`text-white text-xl font-bold text-center`}>Hospital Admin</Text>
      </View>

      <View style={tw`p-4 flex-1`}>
        <FlatList
          data={sampleAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AppointmentItem item={item} />}
          ListEmptyComponent={<Text style={tw`text-center text-gray-500 mt-8`}>No appointments found.</Text>}
        />
      </View>
    </SafeAreaView>
  );
}
