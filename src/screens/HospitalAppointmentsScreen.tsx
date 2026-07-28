// // import React from 'react';
// // import { SafeAreaView, View, Text, FlatList, StatusBar } from 'react-native';
// // import tw from 'twrnc';

// // type Appointment = {
// //   id: string;
// //   patientName: string;
// //   time: string;
// //   doctor: string;
// //   status: 'Scheduled' | 'Completed' | 'Cancelled';
// // };

// // const sampleAppointments: Appointment[] = [
// //   { id: '1', patientName: 'John Doe', time: '10:00 AM', doctor: 'Dr. A. Smith', status: 'Scheduled' },
// //   { id: '2', patientName: 'Mary Jane', time: '10:30 AM', doctor: 'Dr. S. Patel', status: 'Completed' },
// //   { id: '3', patientName: 'Akash Kumar', time: '11:00 AM', doctor: 'Dr. R. Rao', status: 'Scheduled' },
// // ];

// // const AppointmentItem = ({ item }: { item: Appointment }) => (
// //   <View style={tw`bg-white rounded-xl p-3 mb-3 shadow`}>
// //     <View style={tw`flex-row justify-between`}>
// //       <View>
// //         <Text style={tw`text-green-700 font-semibold`}>{item.patientName}</Text>
// //         <Text style={tw`text-xs text-gray-500`}>{item.doctor}</Text>
// //       </View>
// //       <View style={tw`items-end`}>
// //         <Text style={tw`text-sm text-gray-700`}>{item.time}</Text>
// //         <Text style={tw`text-xs mt-1 ${item.status === 'Scheduled' ? 'text-yellow-600' : item.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
// //           {item.status}
// //         </Text>
// //       </View>
// //     </View>
// //   </View>
// // );

// // export default function HospitalAppointmentsScreen() {
// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// //       <View style={tw`bg-green-600 p-4`}>
// //         <Text style={tw`text-white text-xl font-bold text-center`}>Hospital Admin</Text>
// //       </View>

// //       <View style={tw`p-4 flex-1`}>
// //         <FlatList
// //           data={sampleAppointments}
// //           keyExtractor={(item) => item.id}
// //           renderItem={({ item }) => <AppointmentItem item={item} />}
// //           ListEmptyComponent={<Text style={tw`text-center text-gray-500 mt-8`}>No appointments found.</Text>}
// //         />
// //       </View>
// //     </SafeAreaView>
// //   );
// // }






// import React, { useEffect, useState } from 'react';
// import {
//   SafeAreaView,
//   View,
//   Text,
//   FlatList,
//   StatusBar,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import tw from 'twrnc';
// import { useAccessToken } from '../screens/contexts/AccessTokenContext';

// type Appointment = {
//   id: number;
//   doctorName: string;
//   date: string;
//   startTime: string;  
//   endTime: string;
//   status: string;
//   profilePicture?: string;
// };

// const AppointmentItem = ({ item }: { item: Appointment }) => (
//   <View style={tw`bg-white rounded-xl p-4 mb-3 shadow`}>
//     <View style={tw`flex-row justify-between`}>
//       <View style={tw`flex-row`}>
//         <Image
//           source={{
//             uri:
//               item.profilePicture ||
//               'https://via.placeholder.com/60',
//           }}
//           style={tw`w-12 h-12 rounded-full mr-3`}
//         />

//         <View>
//           <Text style={tw`text-green-700 font-semibold`}>
//             {item.doctorName}
//           </Text>
//           <Text style={tw`text-xs text-gray-500`}>
//             {item.date}
//           </Text>
//         </View>
//       </View>

//       <View style={tw`items-end`}>
//         <Text style={tw`text-sm text-gray-700`}>
//           {item.startTime} - {item.endTime}
//         </Text>

//         <Text
//           style={tw`text-xs mt-1 ${
//             item.status === 'pending'
//               ? 'text-yellow-600'
//               : item.status === 'completed'
//               ? 'text-green-600'
//               : 'text-red-600'
//           }`}
//         >
//           {item.status}
//         </Text>
//       </View>
//     </View>
//   </View>
// );

// export default function HospitalAppointmentsScreen() {
//   const { accessToken } = useAccessToken();

//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchAppointments = async () => {
//     if (!accessToken) return;

//     setLoading(true);

//     try {
//       const res = await fetch(
//         'https://api.docapp.co.in/api/hospital/get-appointments',
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       const json = await res.json();

//       const doctors = json?.allAppointmentsInOrganisation || [];

//       // 🔥 Flatten doctorAppointments
//       const formattedAppointments: Appointment[] = [];

//       doctors.forEach((doctor: any) => {
//         if (doctor.user?.doctorAppointments?.length) {
//           doctor.user.doctorAppointments.forEach((appt: any) => {
//             formattedAppointments.push({
//               id: appt.id,
//               doctorName: doctor.user.username,
//               date: new Date(appt.appointment_date).toDateString(),
//               startTime: appt.appointment_start_time,
//               endTime: appt.appointment_end_time,
//               status: appt.appointment_status,
//               profilePicture: doctor.profile_picture,
//             });
//           });
//         }
//       });

//       setAppointments(formattedAppointments);
//     } catch (error) {
//       console.log('Fetch Appointment Error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [accessToken]);

//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="#059669" barStyle="light-content" />

//       <View style={tw`bg-green-600 p-4`}>
//         <Text style={tw`text-white text-xl font-bold text-center`}>
//           Hospital Admin
//         </Text>
//       </View>

//       <View style={tw`p-4 flex-1`}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#059669" />
//         ) : (
//           <FlatList
//             data={appointments}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={({ item }) => <AppointmentItem item={item} />}
//             ListEmptyComponent={
//               <Text style={tw`text-center text-gray-500 mt-8`}>
//                 No appointments found.
//               </Text>
//             }
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }








import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import tw from 'twrnc';
import { useAccessToken } from '../screens/contexts/AccessTokenContext';

type Appointment = {
  id: number;
  doctorName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  price: string;
  profilePicture?: string;
};

const AppointmentItem = ({ item }: { item: Appointment }) => (
  <View style={tw`bg-white rounded-xl p-4 mb-3 shadow`}>
    <View style={tw`flex-row justify-between`}>

      {/* LEFT SIDE */}
      <View style={tw`flex-row`}>
        <Image
          source={{
            uri: item.profilePicture || 'https://via.placeholder.com/60',
          }}
          style={tw`w-12 h-12 rounded-full mr-3`}
        />

        <View>
          <Text style={tw`text-green-700 font-semibold text-base`}>
            {item.doctorName}
          </Text>

          <Text style={tw`text-xs text-gray-500`}>
            {item.date}
          </Text>

          {/* 💰 PRICE */}
          <Text style={tw`text-sm text-green-700 font-bold mt-1`}>
            ₹ {item.price}
          </Text>
        </View>
      </View>

      {/* RIGHT SIDE */}
      <View style={tw`items-end`}>
        <Text style={tw`text-sm text-gray-700`}>
          {item.startTime} - {item.endTime}
        </Text>

        <Text
          style={tw`text-xs mt-1 ${item.status === 'pending'
              ? 'text-yellow-600'
              : item.status === 'completed'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
        >
          {item.status}
        </Text>
      </View>
    </View>
  </View>
);

export default function HospitalAppointmentsScreen() {
  const { accessToken } = useAccessToken();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    if (!accessToken) return;

    setLoading(true);

    try {
      const res = await fetch(
        'https://api.docapp.co.in/api/hospital/get-appointments',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const json = await res.json();
      const doctors = json?.allAppointmentsInOrganisation || [];

      const formattedAppointments: Appointment[] = [];

      doctors.forEach((doctor: any) => {
        if (doctor.user?.doctorAppointments?.length) {
          doctor.user.doctorAppointments.forEach((appt: any) => {
            formattedAppointments.push({
              id: appt.id,
              doctorName: doctor.user.username,
              date: new Date(appt.appointment_date).toDateString(),
              startTime: appt.appointment_start_time,
              endTime: appt.appointment_end_time,
              status: appt.appointment_status,
              price: doctor.consultation_fee,   // ✅ Added price
              profilePicture: doctor.profile_picture,
            });
          });
        }
      });

      setAppointments(formattedAppointments);
    } catch (error) {
      console.log('Fetch Appointment Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [accessToken]);

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />

      <View style={tw`bg-green-600 p-4`}>
        <Text style={tw`text-white text-xl font-bold text-center`}>
          Hospital Admin
        </Text>
      </View>

      <View style={tw`p-4 flex-1`}>
        {loading ? (
          <ActivityIndicator size="large" color="#059669" />
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <AppointmentItem item={item} />}
            ListEmptyComponent={
              <Text style={tw`text-center text-gray-500 mt-8`}>
                No appointments found.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}