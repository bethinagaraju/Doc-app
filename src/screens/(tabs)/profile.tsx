// // // // // import React, { useEffect, useState } from 'react';
// // // // // import {
// // // // //   View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
// // // // // } from 'react-native';
// // // // // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // // // // import tw from 'twrnc';

// // // // // import {
// // // // //   Settings, User, Folder, CreditCard, Bell, Shield,
// // // // //   LogOut, ChevronRight, CalendarCheck, HelpCircle,
// // // // // } from 'lucide-react-native';

// // // // // import PageLayout from '../../components/PageLayout';
// // // // // import { useUser } from '../contexts/UserContext';

// // // // // type RootStackParamList = {
// // // // //   Home: undefined;
// // // // //   Settings: undefined;
// // // // //   EditProfilePage: undefined;
// // // // //   CompleteProfile: undefined;
// // // // //   Appointments: undefined;
// // // // //   PersonalDetails: undefined;
// // // // //   MedicalRecords: undefined;
// // // // //   PaymentMethods: undefined;
// // // // //   Notification: undefined;
// // // // //   PrivacySecurity: undefined;
// // // // //   TestBooking: undefined;
// // // // //   HelpCenter: undefined;
// // // // //   Login: undefined;
// // // // // };

// // // // // type DecodedUser = {
// // // // //   username: string;
// // // // //   email: string;
// // // // //   phone_number: string;
// // // // // };

// // // // // export default function ProfileScreen() {
// // // // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // // // //   const { logout, user, setUser, setIsLoggedIn } = useUser();
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const handleLogout = async () => {
// // // // //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// // // // //       { text: 'Cancel', style: 'cancel' },
// // // // //       {
// // // // //         text: 'Logout',
// // // // //         style: 'destructive',
// // // // //         onPress: async () => {
// // // // //           try {
// // // // //             await logout();
// // // // //             navigation.reset({
// // // // //               index: 0,
// // // // //               routes: [{ name: 'Login' }],
// // // // //             });
// // // // //           } catch (error) {
// // // // //             console.error('Logout error:', error);
// // // // //             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
// // // // //           }
// // // // //         },
// // // // //       },
// // // // //     ]);
// // // // //   };

// // // // //   const fetchUserData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // // //         method: 'GET',
// // // // //         credentials: 'include',
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error('Failed to fetch user data');
// // // // //       }

// // // // //       const result = await response.json();
// // // // //       setUser(result?.userData || null);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching user:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchUserData();
// // // // //   }, []);

// // // // //   return (
// // // // //     <PageLayout
// // // // //       title="Profile"
// // // // //       headerBackgroundColor="#219f4dff"
// // // // //       headerRight={(
// // // // //         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
// // // // //           <Settings size={24} color="#fff" />
// // // // //         </TouchableOpacity>
// // // // //       )}
// // // // //       onBackPress={() => navigation.navigate('Home')}
// // // // //       scrollable
// // // // //     >
// // // // //       <View style={tw`items-center mt-6 mb-8`}>
// // // // //         {loading ? (
// // // // //           <ActivityIndicator size="large" color="#059669" />
// // // // //         ) : (
// // // // //           <>
// // // // //             <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100 items-center justify-center`}>
// // // // //               {user?.username ? (
// // // // //                 <Text style={tw`text-green-700 text-4xl font-bold`}>
// // // // //                   {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
// // // // //                 </Text>
// // // // //               ) : (
// // // // //                 <User size={96} color="#059669" strokeWidth={1.2} />
// // // // //               )}
// // // // //             </View>
// // // // //             <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>{user?.username || 'Unknown User'}</Text>
// // // // //             <Text style={tw`font-normal text-sm text-green-500 mb-4`}>{user?.email || 'No Email'}</Text>
// // // // //             <View style={tw`flex-row justify-center gap-4`}>
// // // // //               <TouchableOpacity
// // // // //                 style={tw`bg-green-100 px-5 py-2 rounded-full`}
// // // // //                 onPress={() => navigation.navigate('EditProfilePage')}
// // // // //               >
// // // // //                 <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
// // // // //               </TouchableOpacity>
// // // // //               <TouchableOpacity
// // // // //                 style={tw`bg-green-600 px-5 py-2 rounded-full`}
// // // // //                 onPress={() => navigation.navigate('CompleteProfile')}
// // // // //               >
// // // // //                 <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
// // // // //               </TouchableOpacity>
// // // // //             </View>
// // // // //           </>
// // // // //         )}
// // // // //       </View>

// // // // //       {/* Menu Options */}
// // // // //       <View style={tw`px-4 mb-4`}>
// // // // //         {[
// // // // //           { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
// // // // //           { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
// // // // //           { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
// // // // //           { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
// // // // //           { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
// // // // //           { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
// // // // //           { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
// // // // //           { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
// // // // //         ].map(({ label, icon: Icon, color, bg, screen }, index) => (
// // // // //           <TouchableOpacity
// // // // //             key={index}
// // // // //             style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
// // // // //             onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
// // // // //           >
// // // // //             <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
// // // // //               <Icon size={20} color={color} />
// // // // //             </View>
// // // // //             <View style={tw`flex-1 flex-row justify-between items-center`}>
// // // // //               <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
// // // // //               <ChevronRight size={20} color="#059669" />
// // // // //             </View>
// // // // //           </TouchableOpacity>
// // // // //         ))}
// // // // //       </View>

// // // // //       {/* Logout */}
// // // // //      <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
// // // // //   <LogOut size={20} color="#cb1c42ff" />
// // // // //   <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
// // // // //     Logout
// // // // //   </Text>
// // // // // </TouchableOpacity>


// // // // //       {/* Footer */}
// // // // //       <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
// // // // //         <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
// // // // //         <View style={tw`flex-row items-center justify-center`}>
// // // // //           <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
// // // // //           <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
// // // // //           <Text style={tw`font-normal text-[10px] text-green-400`}>• © {new Date().getFullYear()} All Rights Reserved</Text>
// // // // //         </View>
// // // // //       </View>
// // // // //     </PageLayout>
// // // // //   );
// // // // // }


// // // // import React, { useEffect, useState } from 'react';
// // // // import {
// // // //   View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
// // // // } from 'react-native';
// // // // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // // // import tw from 'twrnc';

// // // // import {
// // // //   Settings, User, Folder, CreditCard, Bell, Shield,
// // // //   LogOut, ChevronRight, CalendarCheck, HelpCircle,
// // // // } from 'lucide-react-native';

// // // // import PageLayout from '../../components/PageLayout';
// // // // import { useUser } from '../contexts/UserContext';

// // // // // ... (Your type definitions remain the same)

// // // // export default function ProfileScreen() {
// // // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // // //   const { logout, user, setUser } = useUser();
// // // //   const [loading, setLoading] = useState(true);

// // // //   const handleLogout = async () => {
// // // //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// // // //       { text: 'Cancel', style: 'cancel' },
// // // //       {
// // // //         text: 'Logout',
// // // //         style: 'destructive',
// // // //         onPress: async () => {
// // // //           try {
// // // //             await logout();
// // // //             navigation.reset({
// // // //               index: 0,
// // // //               routes: [{ name: 'Login' }],
// // // //             });
// // // //           } catch (error) {
// // // //             console.error('Logout error:', error);
// // // //             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
// // // //           }
// // // //         },
// // // //       },
// // // //     ]);
// // // //   };

// // // //   const fetchUserData = async () => {
// // // //     // NOTE: This fetch is missing the Authorization header.
// // // //     // It should be included to securely get user data.
// // // //     try {
// // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // //         method: 'GET',
// // // //         headers: {
// // // //             // This header is essential for authenticated requests
// // // //             'Authorization': `Bearer ${user?.token}`, 
// // // //         },
// // // //       });

// // // //       if (!response.ok) {
// // // //         throw new Error('Failed to fetch user data');
// // // //       }

// // // //       const result = await response.json();
// // // //       setUser(result?.userData || null);
// // // //     } catch (error) {
// // // //       console.error('Error fetching user:', error);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (user?.token) { // Only fetch if token exists
// // // //         fetchUserData();
// // // //     } else {
// // // //         setLoading(false);
// // // //     }
// // // //   }, [user?.token]);

// // // //   return (
// // // //     <PageLayout
// // // //       title="Profile"
// // // //       headerBackgroundColor="#219f4dff"
// // // //       headerRight={(
// // // //         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
// // // //           <Settings size={24} color="#fff" />
// // // //         </TouchableOpacity>
// // // //       )}
// // // //       onBackPress={() => navigation.navigate('Home')}
// // // //       scrollable
// // // //     >
// // // //       <View style={tw`items-center mt-6 mb-8`}>
// // // //         {loading ? (
// // // //           <ActivityIndicator size="large" color="#059669" />
// // // //         ) : (
// // // //           <>
// // // //             {/* MODIFIED SECTION TO DISPLAY REAL IMAGE */}
// // // //             <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100`}>
// // // //               {user?.generalUser?.profile_picture ? (
// // // //                 <Image
// // // //                   source={{ uri: user.generalUser.profile_picture }}
// // // //                   style={tw`w-full h-full rounded-full`}
// // // //                 />
// // // //               ) : user?.username ? (
// // // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // // //                   <Text style={tw`text-green-700 text-4xl font-bold`}>
// // // //                     {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
// // // //                   </Text>
// // // //                 </View>
// // // //               ) : (
// // // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // // //                   <User size={96} color="#059669" strokeWidth={1.2} />
// // // //                 </View>
// // // //               )}
// // // //             </View>

// // // //             <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>{user?.username || 'Unknown User'}</Text>
// // // //             <Text style={tw`font-normal text-sm text-green-500 mb-4`}>{user?.email || 'No Email'}</Text>
// // // //             <View style={tw`flex-row justify-center gap-4`}>
// // // //               <TouchableOpacity
// // // //                 style={tw`bg-green-100 px-5 py-2 rounded-full`}
// // // //                 onPress={() => navigation.navigate('EditProfilePage')}
// // // //               >
// // // //                 <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
// // // //               </TouchableOpacity>
// // // //               <TouchableOpacity
// // // //                 style={tw`bg-green-600 px-5 py-2 rounded-full`}
// // // //                 onPress={() => navigation.navigate('CompleteProfile')}
// // // //               >
// // // //                 <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
// // // //               </TouchableOpacity>
// // // //             </View>
// // // //           </>
// // // //         )}
// // // //       </View>

// // // //       {/* Menu Options */}
// // // //       <View style={tw`px-4 mb-4`}>
// // // //         {[
// // // //           { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
// // // //           { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
// // // //           { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
// // // //           { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
// // // //           { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
// // // //           { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
// // // //           { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
// // // //           { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
// // // //         ].map(({ label, icon: Icon, color, bg, screen }, index) => (
// // // //           <TouchableOpacity
// // // //             key={index}
// // // //             style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
// // // //             onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
// // // //           >
// // // //             <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
// // // //               <Icon size={20} color={color} />
// // // //             </View>
// // // //             <View style={tw`flex-1 flex-row justify-between items-center`}>
// // // //               <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
// // // //               <ChevronRight size={20} color="#059669" />
// // // //             </View>
// // // //           </TouchableOpacity>
// // // //         ))}
// // // //       </View>

// // // //       {/* Logout */}
// // // //      <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
// // // //         <LogOut size={20} color="#cb1c42ff" />
// // // //         <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
// // // //             Logout
// // // //         </Text>
// // // //     </TouchableOpacity>


// // // //       {/* Footer */}
// // // //       <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
// // // //         <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
// // // //         <View style={tw`flex-row items-center justify-center`}>
// // // //           <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
// // // //           <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
// // // //           <Text style={tw`font-normal text-[10px] text-green-400`}>• © {new Date().getFullYear()} All Rights Reserved</Text>
// // // //         </View>
// // // //       </View>
// // // //     </PageLayout>
// // // //   );
// // // // }


// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
// // // } from 'react-native';
// // // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // // import tw from 'twrnc';
// // // import {
// // //   Settings, User, Folder, CreditCard, Bell, Shield,
// // //   LogOut, ChevronRight, CalendarCheck, HelpCircle,
// // // } from 'lucide-react-native';

// // // import PageLayout from '../../components/PageLayout';
// // // import { useUser } from '../contexts/UserContext';

// // // export default function ProfileScreen() {
// // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // //   const { logout, user, setUser } = useUser();
// // //   const [loading, setLoading] = useState(true);

// // //   // ✅ Properly fetch user data
// // //   const fetchUserData = async () => {
// // //     try {
// // //       if (!user?.token) {
// // //         console.warn('⚠️ No token found, skipping fetch.');
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // //         method: 'GET',
// // //         headers: {
// // //           'Authorization': `Bearer ${user.token}`,
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       const result = await response.json();

// // //       if (!response.ok) {
// // //         console.error('❌ Fetch failed:', result);
// // //         Alert.alert('Error', result?.message || 'Failed to fetch user data.');
// // //         return;
// // //       }

// // //       console.log('✅ User Data Fetched:', result);

// // //       if (result?.userData) {
// // //         setUser({
// // //           ...user,
// // //           id: result.userData.id,
// // //           username: result.userData.username,
// // //           email: result.userData.email,
// // //           phone_number: result.userData.phone_number,
// // //           role: result.userData.role,
// // //           generalUser: result.userData.generalUser || {},
// // //         });
// // //       } else {
// // //         console.warn('⚠️ Invalid userData structure:', result);
// // //       }
// // //     } catch (error) {
// // //       console.error('🔥 Error fetching user data:', error);
// // //       Alert.alert('Error', 'Something went wrong while fetching user data.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Fetch data when token available
// // //   useEffect(() => {
// // //     fetchUserData();
// // //   }, [user?.token]);

// // //   // ✅ Logout handler
// // //   const handleLogout = async () => {
// // //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// // //       { text: 'Cancel', style: 'cancel' },
// // //       {
// // //         text: 'Logout',
// // //         style: 'destructive',
// // //         onPress: async () => {
// // //           try {
// // //             await logout();
// // //             navigation.reset({
// // //               index: 0,
// // //               routes: [{ name: 'Login' }],
// // //             });
// // //           } catch (error) {
// // //             console.error('Logout error:', error);
// // //             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
// // //           }
// // //         },
// // //       },
// // //     ]);
// // //   };

// // //   return (
// // //     <PageLayout
// // //       title="Profile"
// // //       headerBackgroundColor="#219f4dff"
// // //       headerRight={(
// // //         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
// // //           <Settings size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //       )}
// // //       onBackPress={() => navigation.navigate('Home')}
// // //       scrollable
// // //     >
// // //       <View style={tw`items-center mt-6 mb-8`}>
// // //         {loading ? (
// // //           <ActivityIndicator size="large" color="#059669" />
// // //         ) : (
// // //           <>
// // //             {/* ✅ Profile Picture */}
// // //             <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100`}>
// // //               {user?.generalUser?.profile_picture ? (
// // //                 <Image
// // //                   source={{ uri: user.generalUser.profile_picture }}
// // //                   style={tw`w-full h-full rounded-full`}
// // //                 />
// // //               ) : user?.username ? (
// // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // //                   <Text style={tw`text-green-700 text-4xl font-bold`}>
// // //                     {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
// // //                   </Text>
// // //                 </View>
// // //               ) : (
// // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // //                   <User size={96} color="#059669" strokeWidth={1.2} />
// // //                 </View>
// // //               )}
// // //             </View>

// // //             {/* ✅ User Info */}
// // //             <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>
// // //               {user?.username || 'Unknown User'}
// // //             </Text>
// // //             <Text style={tw`font-normal text-sm text-green-500 mb-4`}>
// // //               {user?.email || 'No Email'}
// // //             </Text>

// // //             {/* ✅ Buttons */}
// // //             <View style={tw`flex-row justify-center gap-4`}>
// // //               <TouchableOpacity
// // //                 style={tw`bg-green-100 px-5 py-2 rounded-full`}
// // //                 onPress={() => navigation.navigate('EditProfilePage')}
// // //               >
// // //                 <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
// // //               </TouchableOpacity>
// // //               <TouchableOpacity
// // //                 style={tw`bg-green-600 px-5 py-2 rounded-full`}
// // //                 onPress={() => navigation.navigate('CompleteProfile')}
// // //               >
// // //                 <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </>
// // //         )}
// // //       </View>

// // //       {/* ✅ Menu Options */}
// // //       <View style={tw`px-4 mb-4`}>
// // //         {[
// // //           { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
// // //           { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
// // //           { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
// // //           { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
// // //           { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
// // //           { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
// // //           { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
// // //           { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
// // //         ].map(({ label, icon: Icon, color, bg, screen }, index) => (
// // //           <TouchableOpacity
// // //             key={index}
// // //             style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
// // //             onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
// // //           >
// // //             <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
// // //               <Icon size={20} color={color} />
// // //             </View>
// // //             <View style={tw`flex-1 flex-row justify-between items-center`}>
// // //               <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
// // //               <ChevronRight size={20} color="#059669" />
// // //             </View>
// // //           </TouchableOpacity>
// // //         ))}
// // //       </View>

// // //       {/* ✅ Logout */}
// // //       <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
// // //         <LogOut size={20} color="#cb1c42ff" />
// // //         <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
// // //           Logout
// // //         </Text>
// // //       </TouchableOpacity>

// // //       {/* ✅ Footer */}
// // //       <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
// // //         <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
// // //         <View style={tw`flex-row items-center justify-center`}>
// // //           <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
// // //           <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
// // //           <Text style={tw`font-normal text-[10px] text-green-400`}>
// // //             • © {new Date().getFullYear()} All Rights Reserved
// // //           </Text>
// // //         </View>
// // //       </View>
// // //     </PageLayout>
// // //   );
// // // }


// // // import React, { useState, useCallback } from 'react';
// // // import {
// // //   View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert,
// // // } from 'react-native';
// // // import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
// // // import tw from 'twrnc';
// // // import {
// // //   Settings, User, Folder, CreditCard, Bell, Shield,
// // //   LogOut, ChevronRight, CalendarCheck, HelpCircle,
// // // } from 'lucide-react-native';

// // // import PageLayout from '../../components/PageLayout';
// // // import { useUser } from '../contexts/UserContext';

// // // export default function ProfileScreen() {
// // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // //   const { logout, user, setUser } = useUser();
// // //   const [loading, setLoading] = useState(true);

// // //   // ✅ Fetch user data
// // //   const fetchUserData = async () => {
// // //     try {
// // //       if (!user?.token) {
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       setLoading(true);
// // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // //         method: 'GET',
// // //         headers: {
// // //           'Authorization': `Bearer ${user.token}`,
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       const result = await response.json();

// // //       if (!response.ok) {
// // //         console.error('Fetch failed:', result);
// // //         Alert.alert('Error', result?.message || 'Failed to fetch user data.');
// // //         return;
// // //       }

// // //       if (result?.userData) {
// // //         setUser(prev => ({
// // //           ...prev,
// // //           id: result.userData.id,
// // //           username: result.userData.username,
// // //           email: result.userData.email,
// // //           phone_number: result.userData.phone_number,
// // //           role: result.userData.role,
// // //           generalUser: result.userData.generalUser || {},
// // //         }));
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching user data:', error);
// // //       Alert.alert('Error', 'Failed to fetch user data.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ✅ Fetch data whenever screen is focused
// // //   useFocusEffect(
// // //     useCallback(() => {
// // //       fetchUserData();
// // //     }, [user?.token])
// // //   );

// // //   // ✅ Logout handler
// // //   const handleLogout = async () => {
// // //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// // //       { text: 'Cancel', style: 'cancel' },
// // //       {
// // //         text: 'Logout',
// // //         style: 'destructive',
// // //         onPress: async () => {
// // //           try {
// // //             await logout();
// // //             navigation.reset({
// // //               index: 0,
// // //               routes: [{ name: 'Login' }],
// // //             });
// // //           } catch (error) {
// // //             console.error('Logout error:', error);
// // //             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
// // //           }
// // //         },
// // //       },
// // //     ]);
// // //   };

// // //   return (
// // //     <PageLayout
// // //       title="Profile"
// // //       headerBackgroundColor="#219f4dff"
// // //       headerRight={(
// // //         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
// // //           <Settings size={24} color="#fff" />
// // //         </TouchableOpacity>
// // //       )}
// // //       onBackPress={() => navigation.navigate('Home')}
// // //       scrollable
// // //     >
// // //       <View style={tw`items-center mt-6 mb-8`}>
// // //         {loading ? (
// // //           <ActivityIndicator size="large" color="#059669" />
// // //         ) : (
// // //           <>
// // //             {/* Profile Picture */}
// // //             <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100`}>
// // //               {user?.generalUser?.profile_picture ? (
// // //                 <Image
// // //                   source={{ uri: user.generalUser.profile_picture }}
// // //                   style={tw`w-full h-full rounded-full`}
// // //                 />
// // //               ) : user?.username ? (
// // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // //                   <Text style={tw`text-green-700 text-4xl font-bold`}>
// // //                     {user.username.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)}
// // //                   </Text>
// // //                 </View>
// // //               ) : (
// // //                 <View style={tw`w-full h-full items-center justify-center`}>
// // //                   <User size={96} color="#059669" strokeWidth={1.2} />
// // //                 </View>
// // //               )}
// // //             </View>

// // //             {/* User Info */}
// // //             <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>
// // //               {user?.username || 'Unknown User'}
// // //             </Text>
// // //             <Text style={tw`font-normal text-sm text-green-500 mb-4`}>
// // //               {user?.email || 'No Email'}
// // //             </Text>

// // //             {/* Buttons */}
// // //             <View style={tw`flex-row justify-center gap-4`}>
// // //               <TouchableOpacity
// // //                 style={tw`bg-green-100 px-5 py-2 rounded-full`}
// // //                 onPress={() => navigation.navigate('EditProfilePage')}
// // //               >
// // //                 <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
// // //               </TouchableOpacity>
// // //               <TouchableOpacity
// // //                 style={tw`bg-green-600 px-5 py-2 rounded-full`}
// // //                 onPress={() => navigation.navigate('CompleteProfile')}
// // //               >
// // //                 <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </>
// // //         )}
// // //       </View>

// // //       {/* Menu Options */}
// // //       <View style={tw`px-4 mb-4`}>
// // //         {[
// // //           { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
// // //           { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
// // //           { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
// // //           { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
// // //           { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
// // //           { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
// // //           { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
// // //           { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
// // //         ].map(({ label, icon: Icon, color, bg, screen }, index) => (
// // //           <TouchableOpacity
// // //             key={index}
// // //             style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
// // //             onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
// // //           >
// // //             <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
// // //               <Icon size={20} color={color} />
// // //             </View>
// // //             <View style={tw`flex-1 flex-row justify-between items-center`}>
// // //               <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
// // //               <ChevronRight size={20} color="#059669" />
// // //             </View>
// // //           </TouchableOpacity>
// // //         ))}
// // //       </View>

// // //       {/* Logout */}
// // //       <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
// // //         <LogOut size={20} color="#cb1c42ff" />
// // //         <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
// // //           Logout
// // //         </Text>
// // //       </TouchableOpacity>

// // //       {/* Footer */}
// // //       <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
// // //         <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
// // //         <View style={tw`flex-row items-center justify-center`}>
// // //           <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
// // //           <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
// // //           <Text style={tw`font-normal text-[10px] text-green-400`}>
// // //             • © {new Date().getFullYear()} All Rights Reserved
// // //           </Text>
// // //         </View>
// // //       </View>
// // //     </PageLayout>
// // //   );
// // // }



// // import React, { useState, useCallback, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   Image,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Alert,
// // } from 'react-native';
// // import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
// // import tw from 'twrnc';
// // import {
// //   Settings,
// //   User,
// //   Folder,
// //   CreditCard,
// //   Bell,
// //   Shield,
// //   LogOut,
// //   ChevronRight,
// //   CalendarCheck,
// //   HelpCircle,
// // } from 'lucide-react-native';

// // import PageLayout from '../../components/PageLayout';
// // import { useUser } from '../contexts/UserContext';

// // export default function ProfileScreen() {
// //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// //   const { logout, user, setUser } = useUser();
// //   const [loading, setLoading] = useState(true);

// //   // ✅ Fetch user data
// //   const fetchUserData = async () => {
// //     try {
// //       if (!user?.token) {
// //         console.log('No token found, skipping fetch');
// //         setLoading(false);
// //         return;
// //       }

// //       console.log('Fetching user data with token:', user.token);
// //       setLoading(true);

// //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// //         method: 'GET',
// //         headers: {
// //           Authorization: `Bearer ${user.token}`,
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         console.error('Fetch failed:', result);
// //         Alert.alert('Error', result?.message || 'Failed to fetch user data.');
// //         return;
// //       }

// //       if (result?.userData) {
// //         console.log('User data fetched successfully:', result.userData);

// //         setUser((prev) => ({
// //           ...prev,
// //           id: result.userData.id,
// //           username: result.userData.username,
// //           email: result.userData.email,
// //           phone_number: result.userData.phone_number,
// //           role: result.userData.role,
// //           generalUser: result.userData.generalUser || {},
// //         }));
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       Alert.alert('Error', 'Failed to fetch user data.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✅ Run fetch when screen is focused
// //   useFocusEffect(
// //     useCallback(() => {
// //       let isActive = true;

// //       const getData = async () => {
// //         if (isActive && user?.token) {
// //           await fetchUserData();
// //         } else {
// //           setLoading(false);
// //         }
// //       };

// //       getData();

// //       return () => {
// //         isActive = false;
// //       };
// //     }, [user?.token])
// //   );

// //   // ✅ Also run fetch once when token becomes available (e.g. after login)
// //   useEffect(() => {
// //     if (user?.token) {
// //       fetchUserData();
// //     }
// //   }, [user?.token]);

// //   // ✅ Logout handler
// //   const handleLogout = async () => {
// //     Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
// //       { text: 'Cancel', style: 'cancel' },
// //       {
// //         text: 'Logout',
// //         style: 'destructive',
// //         onPress: async () => {
// //           try {
// //             await logout();
// //             navigation.reset({
// //               index: 0,
// //               routes: [{ name: 'Login' }],
// //             });
// //           } catch (error) {
// //             console.error('Logout error:', error);
// //             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
// //           }
// //         },
// //       },
// //     ]);
// //   };

// //   return (
// //     <PageLayout
// //       title="Profile"
// //       headerBackgroundColor="#219f4dff"
// //       headerRight={
// //         <TouchableOpacity
// //           style={tw`p-2 rounded-full`}
// //           onPress={() => navigation.navigate('Settings')}
// //         >
// //           <Settings size={24} color="#fff" />
// //         </TouchableOpacity>
// //       }
// //       onBackPress={() => navigation.navigate('Home')}
// //       scrollable
// //     >
// //       <ScrollView showsVerticalScrollIndicator={false}>
// //         <View style={tw`items-center mt-6 mb-8`}>
// //           {loading ? (
// //             <ActivityIndicator size="large" color="#059669" />
// //           ) : (
// //             <>
// //               {/* ✅ Profile Picture */}
// //               <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100 overflow-hidden`}>
// //                 {user?.generalUser?.profile_picture ? (
// //                   <Image
// //                     source={{ uri: user.generalUser.profile_picture }}
// //                     style={tw`w-full h-full rounded-full`}
// //                     resizeMode="cover"
// //                   />
// //                 ) : user?.username ? (
// //                   <View style={tw`w-full h-full items-center justify-center`}>
// //                     <Text style={tw`text-green-700 text-4xl font-bold`}>
// //                       {user.username
// //                         .split(' ')
// //                         .map((part) => part[0])
// //                         .join('')
// //                         .toUpperCase()
// //                         .slice(0, 2)}
// //                     </Text>
// //                   </View>
// //                 ) : (
// //                   <View style={tw`w-full h-full items-center justify-center`}>
// //                     <User size={96} color="#059669" strokeWidth={1.2} />
// //                   </View>
// //                 )}
// //               </View>

// //               {/* ✅ User Info */}
// //               <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>
// //                 {user?.username || 'Unknown User'}
// //               </Text>
// //               <Text style={tw`font-normal text-sm text-green-500 mb-4`}>
// //                 {user?.email || 'No Email'}
// //               </Text>

// //               {/* ✅ Buttons */}
// //               <View style={tw`flex-row justify-center gap-4`}>
// //                 <TouchableOpacity
// //                   style={tw`bg-green-100 px-5 py-2 rounded-full`}
// //                   onPress={() => navigation.navigate('EditProfilePage')}
// //                 >
// //                   <Text style={tw`font-medium text-sm text-green-600`}>Edit Profile</Text>
// //                 </TouchableOpacity>
// //                 <TouchableOpacity
// //                   style={tw`bg-green-600 px-5 py-2 rounded-full`}
// //                   onPress={() => navigation.navigate('CompleteProfile')}
// //                 >
// //                   <Text style={tw`font-medium text-sm text-white`}>Complete Profile</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </>
// //           )}
// //         </View>

// //         {/* ✅ Menu Options */}
// //         <View style={tw`px-4 mb-4`}>
// //           {[
// //             { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
// //             { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
// //             { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
// //             { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
// //             { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
// //             { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
// //             { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
// //             { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
// //           ].map(({ label, icon: Icon, color, bg, screen }, index) => (
// //             <TouchableOpacity
// //               key={index}
// //               style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
// //               onPress={() => navigation.navigate(screen as keyof RootStackParamList)}
// //             >
// //               <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
// //                 <Icon size={20} color={color} />
// //               </View>
// //               <View style={tw`flex-1 flex-row justify-between items-center`}>
// //                 <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
// //                 <ChevronRight size={20} color="#059669" />
// //               </View>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* ✅ Logout */}
// //         <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
// //           <LogOut size={20} color="#cb1c42ff" />
// //           <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>
// //             Logout
// //           </Text>
// //         </TouchableOpacity>

// //         {/* ✅ Footer */}
// //         <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
// //           <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
// //           <View style={tw`flex-row items-center justify-center`}>
// //             <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
// //             <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
// //             <Text style={tw`font-normal text-[10px] text-green-400`}>
// //               • © {new Date().getFullYear()} All Rights Reserved
// //             </Text>
// //           </View>
// //         </View>
// //       </ScrollView>
// //     </PageLayout>
// //   );
// // }



// import React, { useState, useCallback, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
// import tw from 'twrnc';
// import {
//   Settings,
//   User,
//   Folder,
//   CreditCard,
//   Bell,
//   Shield,
//   LogOut,
//   ChevronRight,
//   CalendarCheck,
//   HelpCircle,
// } from 'lucide-react-native';

// import { launchImageLibrary } from 'react-native-image-picker';

// import PageLayout from '../../components/PageLayout';
// import { useUser } from '../contexts/UserContext';

// export default function ProfileScreen() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const { logout, user, setUser } = useUser();
//   const [loading, setLoading] = useState(true);

//   // Fetch user data
//   const fetchUserData = async () => {
//     try {
//       if (!user?.token) {
//         setLoading(false);
//         return;
//       }

//       setLoading(true);

//       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         Alert.alert('Error', result?.message || 'Failed to fetch user data.');
//         return;
//       }

//       if (result?.userData) {
//         setUser(prev => ({
//           ...prev,
//           id: result.userData.id,
//           username: result.userData.username,
//           email: result.userData.email,
//           phone_number: result.userData.phone_number,
//           role: result.userData.role,
//           generalUser: result.userData.generalUser || {},
//         }));
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch user data.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       let isActive = true;

//       const getData = async () => {
//         if (isActive && user?.token) {
//           await fetchUserData();
//         } else {
//           setLoading(false);
//         }
//       };

//       getData();

//       return () => {
//         isActive = false;
//       };
//     }, [user?.token])
//   );

//   useEffect(() => {
//     if (user?.token) {
//       fetchUserData();
//     }
//   }, [user?.token]);

//   // ===========================
//   // 🚀 Upload Photo Integration
//   // ===========================
//   const handlePhotoUpload = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         quality: 0.7,
//       });

//       if (result.didCancel) return;

//       const photo = result.assets?.[0];
//       if (!photo) return;

//       const formData = new FormData();
//       formData.append('image', {
//         uri: photo.uri,
//         type: photo.type,
//         name: photo.fileName || 'photo.jpg',
//       });

//       setLoading(true);

//       const response = await fetch('https://landing.docapp.co.in/api/auth/upload-photo', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${user.token}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         Alert.alert('Upload Failed', data.message || 'Something went wrong.');
//         return;
//       }

//       if (data?.image_url) {
//         setUser(prev => ({
//           ...prev,
//           generalUser: {
//             ...prev.generalUser,
//             profile_picture: data.image_url,
//           },
//         }));
//       }

//       Alert.alert('Success', 'Profile photo uploaded successfully!');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to upload photo.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout Handler
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
//             Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
//           }
//         },
//       },
//     ]);
//   };

//   return (
//     <PageLayout
//       title="Profile"
//       headerBackgroundColor="#219f4dff"
//       headerRight={
//         <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
//           <Settings size={24} color="#fff" />
//         </TouchableOpacity>
//       }
//       onBackPress={() => navigation.navigate('Home')}
//       scrollable
//     >
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={tw`items-center mt-6 mb-8`}>
//           {loading ? (
//             <ActivityIndicator size="large" color="#059669" />
//           ) : (
//             <>
//               <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100 overflow-hidden`}>
//                 {user?.generalUser?.profile_picture ? (
//                   <Image
//                     source={{ uri: user.generalUser.profile_picture }}
//                     style={tw`w-full h-full rounded-full`}
//                     resizeMode="cover"
//                   />
//                 ) : user?.username ? (
//                   <View style={tw`w-full h-full items-center justify-center`}>
//                     <Text style={tw`text-green-700 text-4xl font-bold`}>
//                       {user.username
//                         .split(' ')
//                         .map(part => part[0])
//                         .join('')
//                         .toUpperCase()
//                         .slice(0, 2)}
//                     </Text>
//                   </View>
//                 ) : (
//                   <View style={tw`w-full h-full items-center justify-center`}>
//                     <User size={96} color="#059669" strokeWidth={1.2} />
//                   </View>
//                 )}
//               </View>

//               {/* Upload Photo Button */}
//               <TouchableOpacity
//                 style={tw`bg-green-600 px-5 py-2 rounded-full mb-3`}
//                 onPress={handlePhotoUpload}
//               >
//                 <Text style={tw`text-white font-semibold`}>Upload Photo</Text>
//               </TouchableOpacity>

//               <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>
//                 {user?.username || 'Unknown User'}
//               </Text>
//               <Text style={tw`font-normal text-sm text-green-500 mb-4`}>
//                 {user?.email || 'No Email'}
//               </Text>
//             </>
//           )}
//         </View>

//         {/* Menu */}
//         <View style={tw`px-4 mb-4`}>
//           {[
//             { label: 'Appointments', icon: CalendarCheck, color: '#059669', bg: 'bg-green-100', screen: 'Appointments' },
//             { label: 'Personal Details', icon: User, color: '#10B981', bg: 'bg-emerald-100', screen: 'PersonalDetails' },
//             { label: 'My Medical Records', icon: Folder, color: '#34D399', bg: 'bg-green-200', screen: 'MedicalRecords' },
//             { label: 'Payment Methods', icon: CreditCard, color: '#059669', bg: 'bg-green-100', screen: 'PaymentMethods' },
//             { label: 'Notifications', icon: Bell, color: '#86EFAC', bg: 'bg-green-100', screen: 'Notification' },
//             { label: 'Privacy & Security', icon: Shield, color: '#10B981', bg: 'bg-emerald-100', screen: 'PrivacySecurity' },
//             { label: 'Test Bookings', icon: CalendarCheck, color: '#34D399', bg: 'bg-green-200', screen: 'TestBooking' },
//             { label: 'Help Center', icon: HelpCircle, color: '#059669', bg: 'bg-green-100', screen: 'HelpCenter' },
//           ].map(({ label, icon: Icon, color, bg, screen }, index) => (
//             <TouchableOpacity
//               key={index}
//               style={tw`flex-row items-center bg-green-50 rounded-2xl p-4 mb-3 shadow-sm`}
//               onPress={() => navigation.navigate(screen)}
//             >
//               <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
//                 <Icon size={20} color={color} />
//               </View>
//               <View style={tw`flex-1 flex-row justify-between items-center`}>
//                 <Text style={tw`font-medium text-base text-green-800`}>{label}</Text>
//                 <ChevronRight size={20} color="#059669" />
//               </View>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Logout */}
//         <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
//           <LogOut size={20} color="#cb1c42ff" />
//           <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>Logout</Text>
//         </TouchableOpacity>

//         <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
//           <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
//           <View style={tw`flex-row items-center justify-center`}>
//             <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
//             <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
//             <Text style={tw`font-normal text-[10px] text-green-400`}>
//               • © {new Date().getFullYear()} All Rights Reserved
//             </Text>
//           </View>
//         </View>
//       </ScrollView>
//     </PageLayout>
//   );
// }





// =========================
// 🚀 Profile Screen (FINAL)
// =========================




import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';
import {
  Settings,
  User,
  Folder,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  CalendarCheck,
  HelpCircle,
  Trash2,
} from 'lucide-react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import PageLayout from '../../components/PageLayout';
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, user, setUser, checkingLogin } = useUser();
  const { accessToken, clearAccessToken } = useAccessToken();
  const [loading, setLoading] = useState(true);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      if (!accessToken) {
        setLoading(false);
        return;
      }

      setLoading(true);

      console.log('Profile fetch with accessToken:', accessToken);

      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Profile fetch response status:', response.status);

      const result = await response.json();

      console.log('Profile fetch result:', result);

      if (!response.ok) {
        Alert.alert('Error', result?.message || 'Failed to fetch user data.');
        return;
      }

      if (result?.userData) {
        setUser(prev => ({
          ...prev,
          id: result.userData.id,
          username: result.userData.username,
          email: result.userData.email,
          phone_number: result.userData.phone_number,
          role: result.userData.role,
          generalUser: result.userData.generalUser || {},
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const getData = async () => {
        if (isActive && accessToken) {
          await fetchUserData();
        }
      };

      getData();

      return () => {
        isActive = false;
      };
    }, [accessToken])
  );

  useEffect(() => {
    if (accessToken) {
      fetchUserData();
    }
  }, [accessToken]);

  // ===========================
  // 🚀 Upload Photo Integration
  // ===========================
  const handlePhotoUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
      });

      if (result.didCancel) return;

      const photo = result.assets?.[0];
      if (!photo) return;

      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName || 'photo.jpg',
      });

      setLoading(true);

      const response = await fetch('https://landing.docapp.co.in/api/auth/upload-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Upload Failed', data.message || 'Something went wrong.');
        return;
      }

      if (data?.image_url) {
        setUser(prev => ({
          ...prev,
          generalUser: {
            ...prev.generalUser,
            profile_picture: data.image_url,
          },
        }));
      }

      Alert.alert('Success', 'Profile photo uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo.');
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // ❌ DELETE PHOTO API
  // ===========================
  const handleDeletePhoto = async () => {
    Alert.alert(
      'Delete Photo',
      'Are you sure you want to delete your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              const response = await fetch(
                'https://landing.docapp.co.in/api/auth/delete-profile-pic',
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              const data = await response.json();

              if (!response.ok) {
                Alert.alert('Delete Failed', data.message || 'Unable to delete profile photo.');
                return;
              }

              // Remove from context
              setUser(prev => ({
                ...prev,
                generalUser: {
                  ...prev.generalUser,
                  profile_picture: null,
                },
              }));

              Alert.alert('Success', 'Profile photo deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete photo.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Logout Handler
  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            clearAccessToken();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <PageLayout
      title="Profile"
      headerBackgroundColor="#219f4dff"
      headerRight={
        <TouchableOpacity style={tw`p-2 rounded-full`} onPress={() => navigation.navigate('Settings')}>
          <Settings size={24} color="#fff" />
        </TouchableOpacity>
      }
      onBackPress={() => navigation.navigate('Home')}
      scrollable
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`items-center mt-6 mb-8`}>
          {loading ? (
            <ActivityIndicator size="large" color="#059669" />
          ) : (
            <>
              <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-green-100 overflow-hidden`}>
                {user?.generalUser?.profile_picture ? (
                  <Image
                    source={{ uri: user.generalUser.profile_picture }}
                    style={tw`w-full h-full rounded-full`}
                    resizeMode="cover"
                  />
                ) : user?.username ? (
                  <View style={tw`w-full h-full items-center justify-center`}>
                    <Text style={tw`text-green-700 text-4xl font-bold`}>
                      {user.username
                        .split(' ')
                        .map(part => part[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </Text>
                  </View>
                ) : (
                  <View style={tw`w-full h-full items-center justify-center`}>
                    <User size={96} color="#059669" strokeWidth={1.2} />
                  </View>
                )}
              </View>

              {/* Upload Photo Button */}
              <TouchableOpacity
                style={tw`bg-green-600 px-5 py-2 rounded-full mb-3`}
                onPress={handlePhotoUpload}
              >
                <Text style={tw`text-white font-semibold`}>Upload Photo</Text>
              </TouchableOpacity>

              {/* DELETE Photo Button (Visible only when photo exists) */}
              {user?.generalUser?.profile_picture && (
                <TouchableOpacity
                  style={tw`flex-row items-center px-4 py-2 rounded-full bg-red-100 mb-3`}
                  onPress={handleDeletePhoto}
                >
                  <Trash2 size={18} color="red" />
                  <Text style={tw`text-red-600 font-semibold ml-2`}>Delete Photo</Text>
                </TouchableOpacity>
              )}

              <Text style={tw`font-semibold text-xl text-green-800 mb-1`}>
                {user?.username || 'Unknown User'}
              </Text>
              <Text style={tw`font-normal text-sm text-green-500 mb-4`}>
                {user?.email || 'No Email'}
              </Text>
            </>
          )}
        </View>

        {/* Menu */}
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
              onPress={() => navigation.navigate(screen)}
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
          <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>Logout</Text>
        </TouchableOpacity>

        <View style={tw`items-center mb-20 pt-2 border-t border-green-100`}>
          <Text style={tw`font-normal text-xs text-green-500 mb-2`}>App Version 1.0.0</Text>
          <View style={tw`flex-row items-center justify-center`}>
            <Text style={tw`font-normal text-[10px] text-green-400`}>Developed by </Text>
            <Text style={tw`font-semibold text-[10px] text-green-700 mx-1`}>ZYNLOGIC</Text>
            <Text style={tw`font-normal text-[10px] text-green-400`}>
              • © {new Date().getFullYear()} All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
}
