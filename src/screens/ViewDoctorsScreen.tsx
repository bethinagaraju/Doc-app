// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   SafeAreaView,
// //   StatusBar,
// //   Alert,
// //   ActivityIndicator,
// //   FlatList,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import tw from 'twrnc';
// // import { ArrowLeft, UserX, UserCheck, Users } from 'lucide-react-native';

// // type RootStackParamList = {
// //   DoctorManagement: undefined;
// // };

// // type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // interface Doctor {
// //   id: number;
// //   name: string;
// //   specialization: string;
// //   status: string;
// //   email: string;
// //   phone: string;
// // }

// // const ViewDoctorsScreen = () => {
// //   const navigation = useNavigation<NavigationProp>();
// //   const [doctors, setDoctors] = useState<Doctor[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [removing, setRemoving] = useState<number | null>(null);

// //   // Static data - replace with actual API call
// //   const staticDoctors: Doctor[] = [
// //     {
// //       id: 1,
// //       name: 'Dr. Sarah Johnson',
// //       specialization: 'Cardiology',
// //       status: 'Active',
// //       email: 'sarah.johnson@hospital.com',
// //       phone: '+91 9876543210'
// //     },
// //     {
// //       id: 2,
// //       name: 'Dr. Michael Chen',
// //       specialization: 'Neurology',
// //       status: 'Active',
// //       email: 'michael.chen@hospital.com',
// //       phone: '+91 9876543211'
// //     },
// //     {
// //       id: 3,
// //       name: 'Dr. Emily Davis',
// //       specialization: 'Pediatrics',
// //       status: 'Active',
// //       email: 'emily.davis@hospital.com',
// //       phone: '+91 9876543212'
// //     },
// //     {
// //       id: 4,
// //       name: 'Dr. Robert Wilson',
// //       specialization: 'Orthopedics',
// //       status: 'Active',
// //       email: 'robert.wilson@hospital.com',
// //       phone: '+91 9876543213'
// //     },
// //     {
// //       id: 5,
// //       name: 'Dr. Lisa Brown',
// //       specialization: 'Dermatology',
// //       status: 'Active',
// //       email: 'lisa.brown@hospital.com',
// //       phone: '+91 9876543214'
// //     },
// //     {
// //       id: 6,
// //       name: 'Dr. James Miller',
// //       specialization: 'Psychiatry',
// //       status: 'Active',
// //       email: 'james.miller@hospital.com',
// //       phone: '+91 9876543215'
// //     },
// //   ];

// //   useEffect(() => {
// //     loadDoctors();
// //   }, []);

// //   const loadDoctors = async () => {
// //     try {
// //       setLoading(true);
// //       // Simulate API call with static data
// //       setTimeout(() => {
// //         setDoctors(staticDoctors);
// //         setLoading(false);
// //       }, 1000);
// //     } catch (error) {
// //       console.error('Error loading doctors:', error);
// //       Alert.alert('Error', 'Failed to load doctors list');
// //       setLoading(false);
// //     }
// //   };

// //   const removeDoctor = async (doctorId: number) => {
// //     Alert.alert(
// //       'Remove Doctor',
// //       'Are you sure you want to remove this doctor from your hospital?',
// //       [
// //         { text: 'Cancel', style: 'cancel' },
// //         {
// //           text: 'Remove',
// //           style: 'destructive',
// //           onPress: () => confirmRemoveDoctor(doctorId),
// //         },
// //       ]
// //     );
// //   };

// //   const confirmRemoveDoctor = async (doctorId: number) => {
// //     try {
// //       setRemoving(doctorId);

// //       // Simulate API call
// //       setTimeout(() => {
// //         // Remove doctor from local state
// //         setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
// //         Alert.alert('Success', 'Doctor removed successfully');
// //         setRemoving(null);
// //       }, 1000);

// //       // Uncomment and modify for actual API call:
// //       // const response = await fetch('https://landing.docapp.co.in/api/hospital/remove-staff', {
// //       //   method: 'DELETE',
// //       //   headers: {
// //       //     'Content-Type': 'application/json',
// //       //     // 'Authorization': `Bearer ${user?.token}`,
// //       //   },
// //       //   body: JSON.stringify({
// //       //     doctor_id: doctorId,
// //       //   }),
// //       // });
// //       //
// //       // const result = await response.json();
// //       // if (response.ok) {
// //       //   setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
// //       //   Alert.alert('Success', 'Doctor removed successfully');
// //       // } else {
// //       //   Alert.alert('Error', result.message || 'Failed to remove doctor');
// //       // }

// //     } catch (error) {
// //       console.error('Error removing doctor:', error);
// //       Alert.alert('Error', 'Failed to remove doctor. Please try again.');
// //       setRemoving(null);
// //     }
// //   };

// //   const renderDoctorItem = ({ item }: { item: Doctor }) => (
// //     <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-sm border border-blue-200`}>
// //       <View style={tw`flex-row justify-between items-start`}>
// //         <View style={tw`flex-1`}>
// //           <Text style={tw`text-blue-700 font-medium text-lg`}>{item.name}</Text>
// //           <Text style={tw`text-blue-600 text-sm`}>{item.specialization}</Text>
// //           <View style={tw`flex-row items-center mt-1`}>
// //             <View style={tw`w-2 h-2 rounded-full bg-blue-500 mr-2`} />
// //             <Text style={tw`text-blue-500 text-xs`}>{item.status}</Text>
// //           </View>
// //           <Text style={tw`text-gray-600 text-sm mt-1`}>{item.email}</Text>
// //           <Text style={tw`text-gray-600 text-sm`}>{item.phone}</Text>
// //         </View>
// //         <TouchableOpacity
// //           style={tw`bg-red-500 rounded-lg p-3 ml-3 ${removing === item.id ? 'opacity-50' : ''}`}
// //           onPress={() => removeDoctor(item.id)}
// //           disabled={removing === item.id}
// //         >
// //           {removing === item.id ? (
// //             <ActivityIndicator size="small" color="white" />
// //           ) : (
// //             <UserX size={20} color="white" />
// //           )}
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={tw`flex-1 bg-blue-50 justify-center items-center`}>
// //         <ActivityIndicator size="large" color="#1d4ed8" />
// //         <Text style={tw`text-blue-700 mt-4`}>Loading doctors...</Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-blue-50`}>
// //       <StatusBar backgroundColor="#1e40af" barStyle="light-content" />

// //       {/* Header */}
// //       <View style={tw`bg-blue-600 p-4 flex-row items-center shadow-md`}>
// //         <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
// //           <ArrowLeft size={24} color="white" />
// //         </TouchableOpacity>
// //         <View>
// //           <Text style={tw`text-white text-xl font-bold`}>View Doctors</Text>
// //           <Text style={tw`text-blue-100 text-sm`}>Manage existing staff</Text>
// //         </View>
// //       </View>

// //       <View style={tw`flex-1 p-4`}>
// //         <View style={tw`flex-row items-center justify-between mb-4`}>
// //           <Text style={tw`text-blue-700 font-medium`}>
// //             Total Doctors: {doctors.length}
// //           </Text>
// //           <TouchableOpacity
// //             style={tw`bg-blue-600 rounded-lg px-4 py-2`}
// //             onPress={loadDoctors}
// //           >
// //             <Text style={tw`text-white text-sm font-medium`}>Refresh</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {doctors.length === 0 ? (
// //           <View style={tw`flex-1 justify-center items-center`}>
// //             <UserCheck size={64} color="#9ca3af" />
// //             <Text style={tw`text-gray-500 text-lg mt-4`}>No doctors found</Text>
// //             <Text style={tw`text-gray-400 text-center mt-2`}>
// //               Doctors will appear here once added to your hospital
// //             </Text>
// //           </View>
// //         ) : (
// //           <FlatList
// //             data={doctors}
// //             keyExtractor={(item) => item.id.toString()}
// //             renderItem={renderDoctorItem}
// //             showsVerticalScrollIndicator={false}
// //             contentContainerStyle={tw`pb-4`}
// //           />
// //         )}
// //       </View>
// //     </SafeAreaView>
// //   );
// // };

// // export default ViewDoctorsScreen;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
//   FlatList,
//   Image,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import tw from 'twrnc';
// import { ArrowLeft, UserX, UserCheck, Clock, Banknote, ShieldCheck, ShieldAlert } from 'lucide-react-native';

// type RootStackParamList = {
//   DoctorManagement: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// // Interface matching the API Response
// interface APIResponse {
//   message: string;
//   allDoctorsInOrganisation: Doctor[];
// }

// interface Doctor {
//   id: number;
//   user_id: number;
//   specialization: string | null;
//   experience_years: number | null;
//   consultation_fee: string;
//   verified_status: boolean;
//   profile_picture: string;
//   gender: string | null;
//   // Add other fields if needed, but these are the ones we display
// }

// const ViewDoctorsScreen = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [removing, setRemoving] = useState<number | null>(null);

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   const loadDoctors = async () => {
//     try {
//       setLoading(true);
      
//       const response = await fetch('https://landing.docapp.co.in/api/hospital/get-doctors');
//       const data: APIResponse = await response.json();

//       if (data && data.allDoctorsInOrganisation) {
//         setDoctors(data.allDoctorsInOrganisation);
//       } else {
//         setDoctors([]);
//         Alert.alert('Info', 'No doctors found.');
//       }
//     } catch (error) {
//       console.error('Error loading doctors:', error);
//       Alert.alert('Error', 'Failed to load doctors list. Please check your connection.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const removeDoctor = async (doctorId: number) => {
//     Alert.alert(
//       'Remove Doctor',
//       'Are you sure you want to remove this doctor from your hospital?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Remove',
//           style: 'destructive',
//           onPress: () => confirmRemoveDoctor(doctorId),
//         },
//       ]
//     );
//   };

//   const confirmRemoveDoctor = async (doctorId: number) => {
//     try {
//       setRemoving(doctorId);

//       // Simulate API call for deletion (Replace with actual DELETE API when available)
//       setTimeout(() => {
//         setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
//         Alert.alert('Success', 'Doctor removed successfully');
//         setRemoving(null);
//       }, 1000);

//     } catch (error) {
//       console.error('Error removing doctor:', error);
//       Alert.alert('Error', 'Failed to remove doctor.');
//       setRemoving(null);
//     }
//   };

//   const renderDoctorItem = ({ item }: { item: Doctor }) => (
//     <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-blue-100`}>
//       <View style={tw`flex-row`}>
//         {/* Profile Image */}
//         <Image 
//           source={{ uri: item.profile_picture || 'https://via.placeholder.com/100' }} 
//           style={tw`w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-sm`}
//           resizeMode="cover"
//         />

//         {/* Content */}
//         <View style={tw`flex-1 ml-4`}>
//           <View style={tw`flex-row justify-between items-start`}>
//             <View>
//               {/* API doesn't return Name, so using generic title or Specialization as title */}
//               <Text style={tw`text-blue-900 font-bold text-lg`}>
//                 {item.specialization ? item.specialization : `Doctor #${item.user_id}`}
//               </Text>
//               <Text style={tw`text-gray-500 text-xs mb-1`}>ID: {item.id} | User ID: {item.user_id}</Text>
//             </View>
            
//             {/* Status Badge */}
//             <View style={tw`flex-row items-center px-2 py-1 rounded-full ${item.verified_status ? 'bg-green-100' : 'bg-orange-100'}`}>
//               {item.verified_status ? (
//                 <ShieldCheck size={12} color="#15803d" />
//               ) : (
//                 <ShieldAlert size={12} color="#c2410c" />
//               )}
//               <Text style={tw`text-xs ml-1 font-medium ${item.verified_status ? 'text-green-700' : 'text-orange-700'}`}>
//                 {item.verified_status ? 'Verified' : 'Pending'}
//               </Text>
//             </View>
//           </View>

//           {/* Details Grid */}
//           <View style={tw`flex-row flex-wrap mt-2`}>
            
//             {/* Experience */}
//             <View style={tw`flex-row items-center mr-4 mb-1`}>
//               <Clock size={14} color="#6b7280" />
//               <Text style={tw`text-gray-600 text-xs ml-1`}>
//                 {item.experience_years ? `${item.experience_years} Years Exp.` : 'Fresher'}
//               </Text>
//             </View>

//             {/* Fee */}
//             <View style={tw`flex-row items-center mb-1`}>
//               <Banknote size={14} color="#6b7280" />
//               <Text style={tw`text-gray-600 text-xs ml-1`}>
//                  ₹{item.consultation_fee} / Visit
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Footer Actions */}
//       <View style={tw`mt-3 pt-3 border-t border-gray-100 flex-row justify-end`}>
//         <TouchableOpacity
//           style={tw`flex-row items-center bg-red-50 px-3 py-2 rounded-lg border border-red-100 ${removing === item.id ? 'opacity-50' : ''}`}
//           onPress={() => removeDoctor(item.id)}
//           disabled={removing === item.id}
//         >
//           {removing === item.id ? (
//             <ActivityIndicator size="small" color="#ef4444" />
//           ) : (
//             <>
//               <UserX size={16} color="#ef4444" />
//               <Text style={tw`text-red-600 text-xs font-medium ml-2`}>Remove Staff</Text>
//             </>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={tw`flex-1 bg-blue-50 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#1d4ed8" />
//         <Text style={tw`text-blue-700 mt-4 font-medium`}>Fetching staff records...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={tw`flex-1 bg-blue-50`}>
//       <StatusBar backgroundColor="#1e40af" barStyle="light-content" />

//       {/* Header */}
//       <View style={tw`bg-blue-600 p-4 flex-row items-center shadow-md`}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
//           <ArrowLeft size={24} color="white" />
//         </TouchableOpacity>
//         <View>
//           <Text style={tw`text-white text-xl font-bold`}>View Doctors</Text>
//           <Text style={tw`text-blue-100 text-sm`}>Manage existing staff</Text>
//         </View>
//       </View>

//       <View style={tw`flex-1 p-4`}>
//         <View style={tw`flex-row items-center justify-between mb-4`}>
//           <Text style={tw`text-blue-800 font-bold text-base`}>
//             Total Staff: {doctors.length}
//           </Text>
//           <TouchableOpacity
//             style={tw`bg-blue-100 rounded-lg px-3 py-2 border border-blue-200`}
//             onPress={loadDoctors}
//           >
//             <Text style={tw`text-blue-700 text-xs font-bold`}>Refresh List</Text>
//           </TouchableOpacity>
//         </View>

//         {doctors.length === 0 ? (
//           <View style={tw`flex-1 justify-center items-center`}>
//             <UserCheck size={64} color="#9ca3af" />
//             <Text style={tw`text-gray-500 text-lg mt-4 font-medium`}>No doctors found</Text>
//             <Text style={tw`text-gray-400 text-center mt-2 px-8`}>
//               Doctors added to your organization will appear here.
//             </Text>
//           </View>
//         ) : (
//           <FlatList
//             data={doctors}
//             keyExtractor={(item) => item.id.toString()}
//             renderItem={renderDoctorItem}
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={tw`pb-4`}
//           />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ViewDoctorsScreen;





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { ArrowLeft, UserX, UserCheck, Clock, Banknote, ShieldCheck, ShieldAlert } from 'lucide-react-native';

type RootStackParamList = {
  DoctorManagement: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface APIResponse {
  message: string;
  allDoctorsInOrganisation: Doctor[];
}

interface Doctor {
  id: number;
  user_id: number;
  specialization: string | null;
  experience_years: number | null;
  consultation_fee: string;
  verified_status: boolean;
  profile_picture: string;
  gender: string | null;
}

const ViewDoctorsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Stores the ID of the doctor currently being removed to show spinner on specific button
  const [removing, setRemoving] = useState<number | null>(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://landing.docapp.co.in/api/hospital/get-doctors');
      const data: APIResponse = await response.json();

      if (data && data.allDoctorsInOrganisation) {
        setDoctors(data.allDoctorsInOrganisation);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
      Alert.alert('Error', 'Failed to load doctors list.');
    } finally {
      setLoading(false);
    }
  };

  // We need both 'id' (for UI list filtering) and 'userId' (for API payload)
  const removeDoctor = (id: number, userId: number) => {
    Alert.alert(
      'Remove Staff',
      'Are you sure you want to remove this doctor from your organisation? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => confirmRemoveDoctor(id, userId),
        },
      ]
    );
  };

  const confirmRemoveDoctor = async (id: number, userId: number) => {
    try {
      setRemoving(id); // Start loading spinner for this item

      const response = await fetch('https://landing.docapp.co.in/api/hospital/remove-staff', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctor_id: userId // Mapping item.user_id to doctor_id as required
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove from local state immediately for UI responsiveness
        setDoctors(prev => prev.filter(doctor => doctor.id !== id));
        Alert.alert('Success', data.message || 'Staff removed successfully');
      } else {
        Alert.alert('Error', data.message || 'Failed to remove staff member.');
      }

    } catch (error) {
      console.error('Error removing doctor:', error);
      Alert.alert('Error', 'Network request failed. Please check your connection.');
    } finally {
      setRemoving(null); // Stop loading spinner
    }
  };

  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <View style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-blue-100`}>
      <View style={tw`flex-row`}>
        {/* Profile Image */}
        <Image 
          source={{ uri: item.profile_picture || 'https://via.placeholder.com/100' }} 
          style={tw`w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-sm`}
          resizeMode="cover"
        />

        {/* Content */}
        <View style={tw`flex-1 ml-4`}>
          <View style={tw`flex-row justify-between items-start`}>
            <View>
              <Text style={tw`text-blue-900 font-bold text-lg`}>
                {item.specialization ? item.specialization : `Doctor #${item.user_id}`}
              </Text>
              <Text style={tw`text-gray-500 text-xs mb-1`}>ID: {item.id} | User ID: {item.user_id}</Text>
            </View>
            
            {/* Status Badge */}
            <View style={tw`flex-row items-center px-2 py-1 rounded-full ${item.verified_status ? 'bg-green-100' : 'bg-orange-100'}`}>
              {item.verified_status ? (
                <ShieldCheck size={12} color="#15803d" />
              ) : (
                <ShieldAlert size={12} color="#c2410c" />
              )}
              <Text style={tw`text-xs ml-1 font-medium ${item.verified_status ? 'text-green-700' : 'text-orange-700'}`}>
                {item.verified_status ? 'Verified' : 'Pending'}
              </Text>
            </View>
          </View>

          {/* Details Grid */}
          <View style={tw`flex-row flex-wrap mt-2`}>
            <View style={tw`flex-row items-center mr-4 mb-1`}>
              <Clock size={14} color="#6b7280" />
              <Text style={tw`text-gray-600 text-xs ml-1`}>
                {item.experience_years ? `${item.experience_years} Years Exp.` : 'Fresher'}
              </Text>
            </View>

            <View style={tw`flex-row items-center mb-1`}>
              <Banknote size={14} color="#6b7280" />
              <Text style={tw`text-gray-600 text-xs ml-1`}>
                 ₹{item.consultation_fee} / Visit
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Footer Actions */}
      <View style={tw`mt-3 pt-3 border-t border-gray-100 flex-row justify-end`}>
        <TouchableOpacity
          style={tw`flex-row items-center bg-red-50 px-3 py-2 rounded-lg border border-red-100 ${removing === item.id ? 'opacity-50' : ''}`}
          // Pass both Internal ID (item.id) and User ID (item.user_id)
          onPress={() => removeDoctor(item.id, item.user_id)}
          disabled={removing === item.id}
        >
          {removing === item.id ? (
            <ActivityIndicator size="small" color="#ef4444" />
          ) : (
            <>
              <UserX size={16} color="#ef4444" />
              <Text style={tw`text-red-600 text-xs font-medium ml-2`}>Remove Staff</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-blue-50 justify-center items-center`}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text style={tw`text-blue-700 mt-4 font-medium`}>Fetching staff records...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-blue-50`}>
      <StatusBar backgroundColor="#1e40af" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-blue-600 p-4 flex-row items-center shadow-md`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>View Doctors</Text>
          <Text style={tw`text-blue-100 text-sm`}>Manage existing staff</Text>
        </View>
      </View>

      <View style={tw`flex-1 p-4`}>
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <Text style={tw`text-blue-800 font-bold text-base`}>
            Total Staff: {doctors.length}
          </Text>
          <TouchableOpacity
            style={tw`bg-blue-100 rounded-lg px-3 py-2 border border-blue-200`}
            onPress={loadDoctors}
          >
            <Text style={tw`text-blue-700 text-xs font-bold`}>Refresh List</Text>
          </TouchableOpacity>
        </View>

        {doctors.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <UserCheck size={64} color="#9ca3af" />
            <Text style={tw`text-gray-500 text-lg mt-4 font-medium`}>No doctors found</Text>
            <Text style={tw`text-gray-400 text-center mt-2 px-8`}>
              Doctors added to your organization will appear here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={doctors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderDoctorItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-4`}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ViewDoctorsScreen;