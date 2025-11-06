// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import tw from 'twrnc';
// import PageLayout from '../../components/PageLayout';

// type Appointment = {
//   id: number;
//   doctor_id: number;
//   appointment_date: string;
//   appointment_start_time: string;
//   appointment_end_time: string;
//   appointment_status: string;
//   appointment_type: string;
// };

// const tabs = ['Upcoming', 'Cancelled', 'Completed'];

// export default function AppointmentsScreen() {
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTab, setSelectedTab] = useState('Upcoming');

//   const fetchAppointments = async () => {
//     try {
//       const response = await fetch(
//         'https://landing.docapp.co.in/api/appointment/list-appointments',
//         {
//           credentials: 'include',
//         }
//       );
//       const data = await response.json();
//       setAppointments(data.appointments || []);
//     } catch (err) {
//       console.error('Fetch error:', err);
//       Alert.alert('Error', 'Failed to fetch appointments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const handleDelete = async (id: number) => {
//     try {
//       const response = await fetch(
//         'https://landing.docapp.co.in/api/appointment/delete-appointment',
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({ appointment_id: id }),
//         }
//       );

//       const data = await response.json();
//       if (data.message?.toLowerCase().includes('deleted')) {
//         Alert.alert('Success', 'Appointment deleted successfully');
//         fetchAppointments();
//       } else {
//         throw new Error(data.message || 'Delete failed');
//       }
//     } catch (err: any) {
//       Alert.alert('Error', err.message || 'Something went wrong');
//     }
//   };

//   const filteredAppointments = appointments.filter((appt) => {
//     if (selectedTab === 'Upcoming') return appt.appointment_status === 'pending';
//     if (selectedTab === 'Cancelled') return appt.appointment_status === 'cancelled';
//     if (selectedTab === 'Completed') return appt.appointment_status === 'completed';
//     return true;
//   });

//   if (loading) return <ActivityIndicator size="large" style={tw`mt-10`} />;

//   return (
//     <PageLayout
//       title="My Appointments"
//       headerBackgroundColor="#16a34a"
//       scrollable={true}
//     >
//       {/* Tabs */}
//       <View style={tw`flex-row bg-white px-4 py-3 border-b justify-between`}>
//         {tabs.map((tab) => (
//           <TouchableOpacity
//             key={tab}
//             onPress={() => setSelectedTab(tab)}
//             style={tw`px-4 py-2 rounded-full ${
//               selectedTab === tab ? 'bg-green-600' : 'bg-gray-200'
//             }`}
//           >
//             <Text
//               style={tw`text-sm font-semibold ${
//                 selectedTab === tab ? 'text-white' : 'text-gray-700'
//               }`}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Appointment List */}
//       <ScrollView style={tw`p-4`}>
//         {filteredAppointments.length === 0 ? (
//           <Text style={tw`text-center mt-10 text-gray-500`}>
//             No {selectedTab.toLowerCase()} appointments found
//           </Text>
//         ) : (
//           filteredAppointments.map((item) => (
//             <View
//               key={item.id}
//               style={tw`bg-white p-4 mb-4 rounded-xl shadow-sm border border-gray-200`}
//             >
//               <Text style={tw`text-lg font-bold text-green-700`}>
//                 Doctor ID: #{item.doctor_id}
//               </Text>
//               <Text style={tw`text-gray-800`}>
//                 Date: {new Date(item.appointment_date).toDateString()}
//               </Text>
//               <Text style={tw`text-gray-800`}>
//                 Time: {item.appointment_start_time} - {item.appointment_end_time}
//               </Text>
//               <Text style={tw`text-gray-800 capitalize`}>
//                 Type: {item.appointment_type}
//               </Text>
//               <Text style={tw`text-gray-800 capitalize`}>
//                 Status: {item.appointment_status}
//               </Text>

//               <TouchableOpacity
//                 onPress={() => handleDelete(item.id)}
//                 style={tw`mt-3 bg-red-500 py-2 px-4 rounded-full`}
//               >
//                 <Text style={tw`text-white text-center font-semibold`}>
//                   Delete Appointment
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))
//         )}
//       </ScrollView>
//     </PageLayout>
//   );
// }

import React, { useEffect, useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { RTCView } from 'react-native-webrtc';
// import { useCall } from 'D:/CRMTOOL/DOCAPP/DocApp-CLI/src/Doctor/screens/CallContext.tsx';
import { useCall } from '../../Doctor/screens/CallContext';

export default function ReceiverScreen() {
  const { startLocalStream, createPeerConnection, pc, localStream, remoteStream } = useCall();
  const [callId, setCallId] = useState('');

  const answerCall = async () => {
    const response = await fetch(`https://landing.docapp.co.in/api/call/get-offer?call_id=${callId}`);
    const data = await response.json();
    const offer = data.offer;

    const stream = await startLocalStream();
    const connection = createPeerConnection();
    connection.addStream(stream);

    await connection.setRemoteDescription(offer);
    const answer = await connection.createAnswer();
    await connection.setLocalDescription(answer);

    await fetch('https://landing.docapp.co.in/api/call/recieve-call', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ call_id: callId, answer }),
    });
  };

  return (
    <View>
      <Text>Receiver View</Text>
      <TextInput
        placeholder="Enter Call ID"
        onChangeText={(text) => setCallId(text)}
        value={callId}
        style={{ borderWidth: 1, margin: 8, padding: 6 }}
      />
      <Button title="Answer Call" onPress={answerCall} />
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ height: 200, width: '100%' }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ height: 200, width: '100%' }} />}
    </View>
  );
}

