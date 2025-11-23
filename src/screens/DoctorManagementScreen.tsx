// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import tw from 'twrnc';
// import { ArrowLeft, UserX, UserCheck } from 'lucide-react-native';
// import { useUser } from './contexts/UserContext';

// type DoctorManagementNavigationProp = NativeStackNavigationProp<any>;

// interface Doctor {
//   id: number;
//   name: string;
//   specialization: string;
//   status: string;
// }

// const DoctorManagementScreen = () => {
//   const navigation = useNavigation<DoctorManagementNavigationProp>();
//   const { user } = useUser();
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [removing, setRemoving] = useState<number | null>(null);

//   // Placeholder data - replace with actual API call
//   const placeholderDoctors: Doctor[] = [
//     { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', status: 'Active' },
//     { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology', status: 'Active' },
//     { id: 3, name: 'Dr. Emily Davis', specialization: 'Pediatrics', status: 'Active' },
//     { id: 4, name: 'Dr. Robert Wilson', specialization: 'Orthopedics', status: 'Active' },
//     { id: 5, name: 'Dr. Lisa Brown', specialization: 'Dermatology', status: 'Active' },
//     { id: 6, name: 'Dr. James Miller', specialization: 'Psychiatry', status: 'Active' },
//   ];

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   const loadDoctors = async () => {
//     try {
//       setLoading(true);
//       // TODO: Replace with actual API call to fetch doctors
//       // For now, using placeholder data
//       setTimeout(() => {
//         setDoctors(placeholderDoctors);
//         setLoading(false);
//       }, 1000);
//     } catch (error) {
//       console.error('Error loading doctors:', error);
//       Alert.alert('Error', 'Failed to load doctors list');
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

//       const response = await fetch('https://landing.docapp.co.in/api/hospital/remove-staff', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           // Add authorization header if available
//           // 'Authorization': `Bearer ${user?.token}`,
//         },
//         body: JSON.stringify({
//           doctor_id: doctorId,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         // Remove doctor from local state
//         setDoctors(prev => prev.filter(doctor => doctor.id !== doctorId));
//         Alert.alert('Success', 'Doctor removed successfully');
//       } else {
//         Alert.alert('Error', result.message || 'Failed to remove doctor');
//       }
//     } catch (error) {
//       console.error('Error removing doctor:', error);
//       Alert.alert('Error', 'Failed to remove doctor. Please try again.');
//     } finally {
//       setRemoving(null);
//     }
//   };

//   const renderDoctorItem = ({ item }: { item: Doctor }) => (
//     <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-sm border border-green-200`}>
//       <View style={tw`flex-row justify-between items-center`}>
//         <View style={tw`flex-1`}>
//           <Text style={tw`text-green-700 font-medium text-lg`}>{item.name}</Text>
//           <Text style={tw`text-green-600 text-sm`}>{item.specialization}</Text>
//           <View style={tw`flex-row items-center mt-1`}>
//             <View style={tw`w-2 h-2 rounded-full bg-green-500 mr-2`} />
//             <Text style={tw`text-green-500 text-xs`}>{item.status}</Text>
//           </View>
//         </View>
//         <TouchableOpacity
//           style={tw`bg-red-500 rounded-lg p-3 ${removing === item.id ? 'opacity-50' : ''}`}
//           onPress={() => removeDoctor(item.id)}
//           disabled={removing === item.id}
//         >
//           {removing === item.id ? (
//             <ActivityIndicator size="small" color="white" />
//           ) : (
//             <UserX size={20} color="white" />
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text style={tw`text-green-700 mt-4`}>Loading doctors...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="#059669" barStyle="light-content" />

//       {/* Header */}
//       <View style={tw`bg-green-600 p-4 flex-row items-center`}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={tw`mr-4`}
//         >
//           <ArrowLeft size={24} color="white" />
//         </TouchableOpacity>
//         <View>
//           <Text style={tw`text-white text-xl font-bold`}>Doctor Management</Text>
//           <Text style={tw`text-green-100 text-sm`}>Manage hospital doctors</Text>
//         </View>
//       </View>

//       <View style={tw`flex-1 p-4`}>
//         <Text style={tw`text-green-700 font-medium mb-4`}>
//           Total Doctors: {doctors.length}
//         </Text>

//         {doctors.length === 0 ? (
//           <View style={tw`flex-1 justify-center items-center`}>
//             <UserCheck size={64} color="#9ca3af" />
//             <Text style={tw`text-gray-500 text-lg mt-4`}>No doctors found</Text>
//             <Text style={tw`text-gray-400 text-center mt-2`}>
//               Doctors will appear here once added to your hospital
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

// export default DoctorManagementScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { ArrowLeft, UserX, UserCheck, PlusCircle } from 'lucide-react-native';
import { useUser } from './contexts/UserContext';

type DoctorManagementNavigationProp = NativeStackNavigationProp<any>;

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  status: string;
}

const DoctorManagementScreen = () => {
  const navigation = useNavigation<DoctorManagementNavigationProp>();
  const { user } = useUser();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://landing.docapp.co.in/api/hospital/get-doctors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user?.token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setDoctors(result.staff || []);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch doctors list');
      }
    } catch (error) {
      console.error('Error loading doctors:', error);
      Alert.alert('Error', 'Failed to load doctors list');
    } finally {
      setLoading(false);
    }
  };

  const removeDoctor = async (doctorId: number) => {
    Alert.alert(
      'Remove Doctor',
      'Are you sure you want to remove this doctor from your hospital?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => confirmRemoveDoctor(doctorId),
        },
      ]
    );
  };
























  

  const confirmRemoveDoctor = async (doctorId: number) => {
    try {
      setRemoving(doctorId);
      const response = await fetch('https://landing.docapp.co.in/api/hospital/remove-staff', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ doctor_id: doctorId }),
      });

      const result = await response.json();

      if (response.ok) {
        setDoctors(prev => prev.filter(d => d.id !== doctorId));
        Alert.alert('Success', 'Doctor removed successfully');
      } else {
        Alert.alert('Error', result.message || 'Failed to remove doctor');
      }
    } catch (error) {
      console.error('Error removing doctor:', error);
      Alert.alert('Error', 'Failed to remove doctor');
    } finally {
      setRemoving(null);
    }
  };





const handleAddDoctors = async () => {
  const emails = emailInput
    .split(',')
    .map(e => e.trim())
    .filter(e => e.length > 0);

  if (emails.length === 0) {
    Alert.alert('Error', 'Please enter at least one email');
    return;
  }

  try {
    setAdding(true);

    const response = await fetch('https://landing.docapp.co.in/api/hospital/create-accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${user?.token}`,  // Add later
      },
      body: JSON.stringify({ email: emails }),
    });

    // ---- Safely read backend response ----
    const raw = await response.text();
    console.log("📥 RAW RESPONSE:", raw);

    let result;
    try {
      result = JSON.parse(raw);
    } catch (e) {
      console.log("❌ Not JSON:", raw);
      Alert.alert("Error", "Invalid response from server");
      return;
    }

    // ---- API Success ----
    if (response.ok) {

      let successMsg = "Doctors added successfully";

      if (result.createdAccounts?.length > 0) {
        successMsg +=
          "\n\nCreated:\n" +
          result.createdAccounts.map((acc: any) => "• " + acc.createdEmail).join("\n");
      }
      if (result.refusedAccounts?.length > 0) {
        successMsg +=
          "\n\nAlready Exists / Failed:\n" +
          result.refusedAccounts.map((acc: any) => "• " + acc.refusedEmail).join("\n");
      }

      Alert.alert("Success", successMsg);

      setEmailInput("");
      loadDoctors();
    } else {
      Alert.alert("Error", result?.message || "Failed to add doctors");
    }
  } catch (error) {
    console.error("❌ Error adding doctors:", error);
    Alert.alert("Error", "Failed to add doctors. Check console logs.");
  } finally {
    setAdding(false);
  }
};






  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <View style={tw`bg-white rounded-lg p-4 mb-3 shadow-sm border border-green-200`}>
      <View style={tw`flex-row justify-between items-center`}>
        <View style={tw`flex-1`}>
          <Text style={tw`text-green-700 font-medium text-lg`}>{item.name}</Text>
          <Text style={tw`text-green-600 text-sm`}>{item.specialization}</Text>
          <View style={tw`flex-row items-center mt-1`}>
            <View style={tw`w-2 h-2 rounded-full bg-green-500 mr-2`} />
            <Text style={tw`text-green-500 text-xs`}>{item.status}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={tw`bg-red-500 rounded-lg p-3 ${removing === item.id ? 'opacity-50' : ''}`}
          onPress={() => removeDoctor(item.id)}
          disabled={removing === item.id}
        >
          {removing === item.id ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <UserX size={20} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={tw`text-green-700 mt-4`}>Loading doctors...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 p-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>Doctor Management</Text>
          <Text style={tw`text-green-100 text-sm`}>Manage hospital doctors</Text>
        </View>
      </View>

      {/* Add Doctors Section */}
      <View style={tw`p-4`}>
        <Text style={tw`text-green-700 font-medium mb-2`}>Add Doctors (comma-separated emails)</Text>
        <TextInput
          style={tw`border border-green-400 rounded-lg p-3 bg-white text-green-800`}
          placeholder="e.g. first@gmail.com, second@gmail.com"
          value={emailInput}
          onChangeText={setEmailInput}
        />
        <TouchableOpacity
          onPress={handleAddDoctors}
          disabled={adding}
          style={tw`bg-green-600 rounded-lg mt-3 p-3 flex-row items-center justify-center`}
        >
          {adding ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <PlusCircle size={20} color="white" />
              <Text style={tw`text-white font-medium ml-2`}>Add Doctors</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {/* Doctor List */}
      <View style={tw`flex-1 px-4`}>
        <Text style={tw`text-green-700 font-medium mb-4`}>
          Total Doctors: {doctors.length}
        </Text>

        {doctors.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <UserCheck size={64} color="#9ca3af" />
            <Text style={tw`text-gray-500 text-lg mt-4`}>No doctors found</Text>
            <Text style={tw`text-gray-400 text-center mt-2`}>
              Doctors will appear here once added to your hospital
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

export default DoctorManagementScreen;
