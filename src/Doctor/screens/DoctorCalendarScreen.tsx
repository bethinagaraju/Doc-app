// import React, { useEffect, useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import DoctorHeader from '../components/DoctorHeader';
// import { Calendar } from 'react-native-calendars';
// import tw from 'twrnc';

// const DoctorCalendarScreen = () => {
//   const [selected, setSelected] = useState('');
//   const [appointments, setAppointments] = useState<{
//     [date: string]: { time: string; title: string; description: string; datetime: string; userId: number }[];
//   }>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const res = await fetch('https://landing.docapp.co.in/api/appointment/list-appointments', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       const data = await res.json();

//       if (data?.appointments) {
//         const formatted: {
//           [date: string]: {
//             time: string;
//             title: string;
//             description: string;
//             datetime: string;
//             userId: number;
//           }[];
//         } = {};

//         data.appointments.forEach((appt: any) => {
//           const date = appt.appointment_date.split('T')[0];
//           const start = appt.appointment_start_time?.slice(0, 5);
//           const end = appt.appointment_end_time?.slice(0, 5);

//           if (!formatted[date]) formatted[date] = [];

//           formatted[date].push({
//             time: `${start} - ${end}`,
//             title: `Patient ID: ${appt.user_id}`,
//             description: `${appt.appointment_type === 'online' ? 'Video' : 'In-clinic'} - ${appt.appointment_status}`,
//             datetime: `${date}T${appt.appointment_start_time}`,
//             userId: appt.user_id,
//           });
//         });

//         setAppointments(formatted);

//         const availableDates = Object.keys(formatted);
//         if (availableDates.length > 0) setSelected(availableDates[0]);
//       }
//     } catch (err) {
//       console.error('Failed to load appointments:', err);
//       Alert.alert('Error', 'Unable to fetch appointments.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const initiateCall = async (callToUserId: number) => {
//     try {
//       const response = await fetch('https://landing.docapp.co.in/api/call/initialise-call', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           call_to_user: callToUserId,
//           offer: {
//             sdp: 'offer_sdp',
//             type: 'offer',
//           },
//         }),
//       });

//       const data = await response.json();

//       if (data?.call_id) {
//         Alert.alert('Call Started', `Call ID: ${data.call_id}`);
//         console.log('Call initiated:', data.call_id);
//       } else {
//         Alert.alert('Failed', 'Could not start the call.');
//       }
//     } catch (err) {
//       console.error('Call initiation error:', err);
//       Alert.alert('Error', 'Could not initiate call.');
//     }
//   };

//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       <DoctorHeader title="Calendar" showSettings showNotifications />
//       <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
//         <Text style={tw`text-2xl font-bold text-green-700 mb-4 text-center`}>Your Calendar</Text>
//         <Text style={tw`text-base text-green-600 mb-4 text-center`}>
//           View and manage your upcoming meetings and appointments.
//         </Text>

//         {loading ? (
//           <ActivityIndicator size="large" color="#059669" />
//         ) : (
//           <>
//             <Calendar
//               current={selected}
//               onDayPress={day => setSelected(day.dateString)}
//               markedDates={{
//                 ...Object.keys(appointments).reduce((acc: Record<string, any>, date) => {
//                   acc[date] = {
//                     marked: true,
//                     dotColor: '#059669',
//                     selected: date === selected,
//                     selectedColor: '#059669',
//                   };
//                   return acc;
//                 }, {}),
//                 [selected]: {
//                   selected: true,
//                   selectedColor: '#059669',
//                   marked: !!appointments[selected],
//                   dotColor: '#059669',
//                 },
//               }}
//               theme={{
//                 todayTextColor: '#059669',
//                 arrowColor: '#059669',
//                 selectedDayBackgroundColor: '#059669',
//                 selectedDayTextColor: '#fff',
//                 dotColor: '#059669',
//               }}
//               style={tw`rounded-2xl bg-green-100 shadow-sm mb-6`}
//               enableSwipeMonths={true}
//             />

//             <View style={tw`mt-2`}>
//               <Text style={tw`text-lg font-semibold text-green-700 mb-2`}>
//                 Meetings on {selected}
//               </Text>

//               {Array.isArray(appointments[selected]) ? (
//                 appointments[selected].map((meeting, idx) => (
//                   <View key={idx} style={tw`bg-green-100 rounded-xl p-4 mb-3 shadow-sm`}>
//                     <Text style={tw`text-green-700 font-bold text-base`}>
//                       {meeting.time} - {meeting.title}
//                     </Text>
//                     <Text style={tw`text-green-600 text-sm mt-1`}>{meeting.description}</Text>

//                     <TouchableOpacity
//                       onPress={() => initiateCall(meeting.userId)}
//                       style={tw`mt-3 bg-green-600 rounded-full px-4 py-2 items-center flex-row justify-center`}
//                       activeOpacity={0.8}
//                     >
//                       <Text style={tw`text-white font-bold mr-2`}>Start Call</Text>
//                       <Text style={tw`text-white text-lg`}>📞</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))
//               ) : (
//                 <Text style={tw`text-green-400 text-center mt-4`}>
//                   No meetings scheduled for this day.
//                 </Text>
//               )}
//             </View>
//           </>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default DoctorCalendarScreen;


import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { RTCView } from 'react-native-webrtc';
// import { useCall } from 'D:/CRMTOOL/DOCAPP/DocApp-CLI/src/Doctor/screens/CallContext.tsx';
import { useCall } from './CallContext';

export default function CallerScreen() {
  const { startLocalStream, createPeerConnection, pc, localStream, remoteStream } = useCall();
  const [callId, setCallId] = useState('');

  const startCall = async () => {
    const stream = await startLocalStream();
    const connection = createPeerConnection();
    connection.addStream(stream);

    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);

    const response = await fetch('https://landing.docapp.co.in/api/call/initialise-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ call_to_user: 29, offer }),
    });
    const data = await response.json();
    setCallId(data.call_id);
  };

  return (
    <View>
      <Text>Caller View</Text>
      <Button title="Start Call" onPress={startCall} />
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ height: 200, width: '100%' }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ height: 200, width: '100%' }} />}
    </View>
  );
}
