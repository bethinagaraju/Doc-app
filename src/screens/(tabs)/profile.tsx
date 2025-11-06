// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
// } from 'react-native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import tw from 'twrnc';

// import {
//   Settings, User, Folder, CreditCard, Bell, Shield,
//   LogOut, ChevronRight, CalendarCheck, HelpCircle,
// } from 'lucide-react-native';

// import PageLayout from '../../components/PageLayout';
// import { useUser } from '../contexts/UserContext';

// type RootStackParamList = {
//   Home: undefined;
//   Settings: undefined;
//   EditProfilePage: undefined;
//   CompleteProfile: undefined;
//   Appointments: undefined;
//   PersonalDetails: undefined;
//   MedicalRecords: undefined;
//   PaymentMethods: undefined;
//   Notification: undefined;
//   PrivacySecurity: undefined;
//   TestBooking: undefined;
//   HelpCenter: undefined;
//   Login: undefined;
// };

// type DecodedUser = {
//   username: string;
//   email: string;
//   phone_number: string;
// };

// export default function ProfileScreen() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const { logout, user, setUser, setIsLoggedIn } = useUser();
//   const [loading, setLoading] = useState(true);

//   const handleLogout = async () => {
//     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Logout',
//         style: 'destructive',
//         onPress: async () => {
//           try {
//             await logout();
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Login' }],
//             });
//           } catch (error) {
//             console.error('Logout error:', error);
//             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
//           }
//         },
//       },
//     ]);
//   };

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
//         method: 'GET',
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch user data');
//       }

//       const result = await response.json();
//       setUser(result?.userData || null);
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   return (
//     <PageLayout
//       title="Profile"
//       headerBackgroundColor="#219f4dff"
//       headerRight={(
//         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
//           <Settings size={24} color="#fff" />
//         </TouchableOpacity>
//       )}
//       onBackPress={() => navigation.navigate('Home')}
//       scrollable
//     >
//       <View style={tw`items-center mt-6 mb-8`}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#059669" />
//         ) : (
//           <>
//             <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100 items-center justify-center`}>
//               {user?.username ? (
//                 <Text style={tw`text-green-700 text-4xl font-bold`}>
//                   {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
//                 </Text>
//               ) : (
//                 <User size={96} color="#059669" strokeWidth={1.2} />
//               )}
//             </View>
//             <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>{user?.username || 'Unknown User'}</Text>
//             <Text style={tw`font-normal text-sm text-green-500 mb-4`}>{user?.email || 'No Email'}</Text>
//             <View style={tw`flex-row justify-center gap-4`}>
//               <TouchableOpacity
//                 style={tw`bg-green-100 px-5 py-2 rounded-full`}
//                 onPress={() => navigation.navigate('EditProfilePage')}
//               >
//                 <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={tw`bg-green-600 px-5 py-2 rounded-full`}
//                 onPress={() => navigation.navigate('CompleteProfile')}
//               >
//                 <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//       </View>

//       {/* Menu Options */}
//       <View style={tw`px-4 mb-4`}>
//         {[
//           { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
//           { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
//           { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
//           { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
//           { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
//           { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
//           { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
//           { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
//         ].map(({ label, icon: Icon, color, bg, screen }, index) => (
//           <TouchableOpacity
//             key={index}
//             style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
//             onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
//           >
//             <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
//               <Icon size={20} color={color} />
//             </View>
//             <View style={tw`flex-1 flex-row justify-between items-center`}>
//               <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
//               <ChevronRight size={20} color="#059669" />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Logout */}
//      <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
//   <LogOut size={20} color="#cb1c42ff" />
//   <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
//     Logout
//   </Text>
// </TouchableOpacity>


//       {/* Footer */}
//       <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
//         <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
//         <View style={tw`flex-row items-center justify-center`}>
//           <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
//           <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
//           <Text style={tw`font-normal text-[10px] text-green-400`}>• © {new Date().getFullYear()} All Rights Reserved</Text>
//         </View>
//       </View>
//     </PageLayout>
//   );
// }


import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

import {
  Settings, User, Folder, CreditCard, Bell, Shield,
  LogOut, ChevronRight, CalendarCheck, HelpCircle,
} from 'lucide-react-native';

import PageLayout from '../../components/PageLayout';
import { useUser } from '../contexts/UserContext';

// ... (Your type definitions remain the same)

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
          }
        },
      },
    ]);
  };

  const fetchUserData = async () => {
    // NOTE: This fetch is missing the Authorization header.
    // It should be included to securely get user data.
    try {
      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        headers: {
            // This header is essential for authenticated requests
            'Authorization': `Bearer ${user?.token}`, 
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const result = await response.json();
      setUser(result?.userData || null);
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) { // Only fetch if token exists
        fetchUserData();
    } else {
        setLoading(false);
    }
  }, [user?.token]);

  return (
    <PageLayout
      title="Profile"
      headerBackgroundColor="#219f4dff"
      headerRight={(
        <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
          <Settings size={24} color="#fff" />
        </TouchableOpacity>
      )}
      onBackPress={() => navigation.navigate('Home')}
      scrollable
    >
      <View style={tw`items-center mt-6 mb-8`}>
        {loading ? (
          <ActivityIndicator size="large" color="#059669" />
        ) : (
          <>
            {/* MODIFIED SECTION TO DISPLAY REAL IMAGE */}
            <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100`}>
              {user?.generalUser?.profile_picture ? (
                <Image
                  source={{ uri: user.generalUser.profile_picture }}
                  style={tw`w-full h-full rounded-full`}
                />
              ) : user?.username ? (
                <View style={tw`w-full h-full items-center justify-center`}>
                  <Text style={tw`text-green-700 text-4xl font-bold`}>
                    {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
                  </Text>
                </View>
              ) : (
                <View style={tw`w-full h-full items-center justify-center`}>
                  <User size={96} color="#059669" strokeWidth={1.2} />
                </View>
              )}
            </View>

            <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>{user?.username || 'Unknown User'}</Text>
            <Text style={tw`font-normal text-sm text-green-500 mb-4`}>{user?.email || 'No Email'}</Text>
            <View style={tw`flex-row justify-center gap-4`}>
              <TouchableOpacity
                style={tw`bg-green-100 px-5 py-2 rounded-full`}
                onPress={() => navigation.navigate('EditProfilePage')}
              >
                <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-green-600 px-5 py-2 rounded-full`}
                onPress={() => navigation.navigate('CompleteProfile')}
              >
                <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {/* Menu Options */}
      <View style={tw`px-4 mb-4`}>
        {[
          { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
          { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
          { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
          { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
          { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
          { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
          { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
          { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
        ].map(({ label, icon: Icon, color, bg, screen }, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
            onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
          >
            <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
              <Icon size={20} color={color} />
            </View>
            <View style={tw`flex-1 flex-row justify-between items-center`}>
              <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
              <ChevronRight size={20} color="#059669" />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
     <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
        <LogOut size={20} color="#cb1c42ff" />
        <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
            Logout
        </Text>
    </TouchableOpacity>


      {/* Footer */}
      <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
        <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
          <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
          <Text style={tw`font-normal text-[10px] text-green-400`}>• © {new Date().getFullYear()} All Rights Reserved</Text>
        </View>
      </View>
    </PageLayout>
  );
}