// // // // import React, { useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   Image,
// // // //   Platform,
// // // //   ActivityIndicator,
// // // //   ScrollView,
// // // //   SafeAreaView,
// // // //   Alert,
// // // //   StatusBar,
// // // //   TextInput,
// // // // } from 'react-native';
// // // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // // // import { Plus, Calendar, ImageIcon } from 'lucide-react-native';
// // // // import tw from 'twrnc';
// // // // import { useUser } from '../contexts/UserContext';

// // // // const GREEN = '#22c55e';
// // // // const API_ENDPOINT = 'https://landing.docapp.co.in/api/auth/profile/complete/general_user';

// // // // export default function CompleteProfile() {
// // // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // // //   const { user } = useUser() as { user: User | null };

// // // //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
// // // //   const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
// // // //   const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // // //   const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});

// // // //   const validateForm = (): boolean => {
// // // //     const newErrors: typeof errors = {};
// // // //     if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
// // // //     if (!gender) newErrors.gender = 'Gender is required';
// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleSubmit = async () => {
// // // //     if (!validateForm()) return;
// // // //     setLoading(true);

// // // //     try {
// // // //       const payload = {
// // // //         date_of_birth: dateOfBirth?.toISOString().split('T')[0] ?? '',
// // // //         gender,
// // // //         profile_picture: profilePictureUrl.trim() || undefined,
// // // //       };

// // // //       const response = await fetch(API_ENDPOINT, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       const data = await response.json();
// // // //       if (response.ok) {
// // // //         Alert.alert('Success', 'Profile completed successfully!', [
// // // //           { text: 'OK', onPress: () => navigation.navigate('Profile') },
// // // //         ]);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to complete profile');
// // // //       }
// // // //     } catch (error) {
// // // //       Alert.alert('Network Error', 'Please try again later.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <SafeAreaView
// // // //       style={[
// // // //         tw`flex-1 bg-white`,
// // // //         { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
// // // //       ]}
// // // //     >
// // // //       <StatusBar backgroundColor={GREEN} barStyle="light-content" />
// // // //       <ScrollView contentContainerStyle={tw`p-4 pt-20 pb-10`}>
// // // //         {/* Profile Picture URL Input */}
// // // //         <View style={tw`mb-6`}>
// // // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Profile Picture URL</Text>
// // // //           <View style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm`}>
// // // //             <ImageIcon size={18} color="gray" />
// // // //             <TextInput
// // // //               placeholder="Enter image URL"
// // // //               value={profilePictureUrl}
// // // //               onChangeText={setProfilePictureUrl}
// // // //               style={tw`ml-2 flex-1 text-sm text-gray-800`}
// // // //               autoCapitalize="none"
// // // //             />
// // // //           </View>
// // // //           {profilePictureUrl.trim() !== '' && (
// // // //             <View style={tw`items-center mt-4`}>
// // // //               <Image
// // // //                 source={{ uri: profilePictureUrl }}
// // // //                 style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}]` as any}
// // // //               />
// // // //             </View>
// // // //           )}
// // // //         </View>

// // // //         {/* User Info */}
// // // //         <View style={tw`bg-white p-4 rounded-xl mb-6 shadow border border-gray-100`}>
// // // //           <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>Your Info</Text>
// // // //           <Text style={tw`text-xs text-gray-500`}>Full Name</Text>
// // // //           <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.username || 'N/A'}</Text>
// // // //           <Text style={tw`text-xs text-gray-500`}>Email</Text>
// // // //           <Text style={tw`text-sm text-gray-800 mb-2`}>{user?.email || 'N/A'}</Text>
// // // //           <Text style={tw`text-xs text-gray-500`}>Phone</Text>
// // // //           <Text style={tw`text-sm text-gray-800`}>{user?.phone_number || '-'}</Text>
// // // //         </View>

// // // //         {/* Date of Birth */}
// // // //         <View style={tw`mb-6`}>
// // // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>Date of Birth</Text>
// // // //           <TouchableOpacity
// // // //             onPress={() => setShowDatePicker(true)}
// // // //             style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'} shadow-sm`}
// // // //             activeOpacity={0.7}
// // // //           >
// // // //             <Text style={tw`text-gray-700 text-sm`}>
// // // //               {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}
// // // //             </Text>
// // // //             <Calendar size={18} color="#6B7280" />
// // // //           </TouchableOpacity>
// // // //           {errors.dateOfBirth && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.dateOfBirth}</Text>}
// // // //           {showDatePicker && (
// // // //             <DateTimePicker
// // // //               value={dateOfBirth || new Date(2000, 0, 1)}
// // // //               mode="date"
// // // //               maximumDate={new Date()}
// // // //               display={Platform.OS === 'ios' ? 'inline' : 'default'}
// // // //               onChange={(event, selectedDate) => {
// // // //                 setShowDatePicker(Platform.OS === 'ios');
// // // //                 if (selectedDate) {
// // // //                   setDateOfBirth(selectedDate);
// // // //                   setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
// // // //                 }
// // // //               }}
// // // //             />
// // // //           )}
// // // //         </View>

// // // //         {/* Gender Selection */}
// // // //         <View style={tw`mb-6`}>
// // // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Gender</Text>
// // // //           <View style={tw`flex-row justify-between`}>
// // // //             {['Male', 'Female', 'Others'].map((g) => (
// // // //               <TouchableOpacity
// // // //                 key={g}
// // // //                 onPress={() => {
// // // //                   setGender(g as typeof gender);
// // // //                   setErrors((prev) => ({ ...prev, gender: '' }));
// // // //                 }}
// // // //                 style={tw`flex-1 mx-1 py-2 rounded-lg border ${gender === g ? `bg-[${GREEN}] border-[${GREEN}]` : 'bg-white border-gray-200'} shadow-sm items-center`}
// // // //                 activeOpacity={0.7}
// // // //               >
// // // //                 <Text style={tw`${gender === g ? 'text-white' : 'text-gray-700'} text-sm`}>
// // // //                   {g}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //             ))}
// // // //           </View>
// // // //           {errors.gender && <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>}
// // // //         </View>

// // // //         {/* Submit Button */}
// // // //         <TouchableOpacity
// // // //           onPress={handleSubmit}
// // // //           style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${loading ? 'opacity-50' : ''}`}
// // // //           disabled={loading}
// // // //           activeOpacity={0.7}
// // // //         >
// // // //           {loading ? (
// // // //             <ActivityIndicator color="#fff" />
// // // //           ) : (
// // // //             <Text style={tw`text-white text-base font-semibold`}>Complete Profile</Text>
// // // //           )}
// // // //         </TouchableOpacity>

// // // //         {/* Skip */}
// // // //         <TouchableOpacity
// // // //           onPress={() => navigation.navigate('Profile')}
// // // //           style={tw`items-center mt-6 bg-gray-100 rounded-lg py-2 px-4`}
// // // //           activeOpacity={0.7}
// // // //         >
// // // //           <Text style={tw`text-[${GREEN}] text-sm font-semibold underline`}>Skip for now</Text>
// // // //         </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </SafeAreaView>
// // // //   );
// // // // }



// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   Image,
// // //   Platform,
// // //   ActivityIndicator,
// // //   ScrollView,
// // //   SafeAreaView,
// // //   Alert,
// // //   StatusBar,
// // //   TextInput,
// // // } from 'react-native';
// // // import DateTimePicker from '@react-native-community/datetimepicker';
// // // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // // import { Calendar, ImageIcon } from 'lucide-react-native';
// // // import tw from 'twrnc';
// // // import { useUser } from '../contexts/UserContext';

// // // const GREEN = '#22c55e';
// // // const API_ENDPOINT =
// // //   'https://landing.docapp.co.in/api/auth/profile/complete/general_user';

// // // export default function CompleteProfile() {
// // //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// // //   const { user } = useUser() as { user: User | null };

// // //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
// // //   const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
// // //   const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
// // //   const [loading, setLoading] = useState(false);
// // //   const [showDatePicker, setShowDatePicker] = useState(false);
// // //   const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});

// // //   // ✅ Validation
// // //   const validateForm = (): boolean => {
// // //     const newErrors: typeof errors = {};
// // //     if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
// // //     if (!gender) newErrors.gender = 'Gender is required';
// // //     setErrors(newErrors);
// // //     return Object.keys(newErrors).length === 0;
// // //   };

// // //   // ✅ Submit API call
// // //   const handleSubmit = async () => {
// // //     if (!validateForm()) return;
// // //     setLoading(true);

// // //     try {
// // //       const payload = {
// // //         date_of_birth: dateOfBirth?.toISOString().split('T')[0] ?? '',
// // //         gender,
// // //         profile_picture: profilePictureUrl.trim() || undefined,
// // //       };

// // //       const response = await fetch(API_ENDPOINT, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           // ⚡ Add token (replace user?.token with actual JWT from login)
// // //           Authorization: `Bearer ${user?.token}`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         console.log('Profile update response:', data);
// // //         Alert.alert('✅ Success', data.message || 'Profile completed successfully!', [
// // //           { text: 'OK', onPress: () => navigation.navigate('Profile') },
// // //         ]);
// // //       } else {
// // //         Alert.alert('❌ Error', data.message || 'Failed to complete profile');
// // //       }
// // //     } catch (error) {
// // //       Alert.alert('Network Error', 'Please try again later.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView
// // //       style={[
// // //         tw`flex-1 bg-white`,
// // //         { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
// // //       ]}
// // //     >
// // //       <StatusBar backgroundColor={GREEN} barStyle="light-content" />
// // //       <ScrollView contentContainerStyle={tw`p-4 pt-20 pb-10`}>
// // //         {/* Profile Picture URL Input */}
// // //         <View style={tw`mb-6`}>
// // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
// // //             Profile Picture URL
// // //           </Text>
// // //           <View
// // //             style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm`}
// // //           >
// // //             <ImageIcon size={18} color="gray" />
// // //             <TextInput
// // //               placeholder="Enter image URL"
// // //               value={profilePictureUrl}
// // //               onChangeText={setProfilePictureUrl}
// // //               style={tw`ml-2 flex-1 text-sm text-gray-800`}
// // //               autoCapitalize="none"
// // //             />
// // //           </View>
// // //           {profilePictureUrl.trim() !== '' && (
// // //             <View style={tw`items-center mt-4`}>
// // //               <Image
// // //                 source={{ uri: profilePictureUrl }}
// // //                 style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}]` as any}
// // //               />
// // //             </View>
// // //           )}
// // //         </View>

// // //         {/* User Info */}
// // //         <View
// // //           style={tw`bg-white p-4 rounded-xl mb-6 shadow border border-gray-100`}
// // //         >
// // //           <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>
// // //             Your Info
// // //           </Text>
// // //           <Text style={tw`text-xs text-gray-500`}>Full Name</Text>
// // //           <Text style={tw`text-sm text-gray-800 mb-2`}>
// // //             {user?.username || 'N/A'}
// // //           </Text>
// // //           <Text style={tw`text-xs text-gray-500`}>Email</Text>
// // //           <Text style={tw`text-sm text-gray-800 mb-2`}>
// // //             {user?.email || 'N/A'}
// // //           </Text>
// // //           <Text style={tw`text-xs text-gray-500`}>Phone</Text>
// // //           <Text style={tw`text-sm text-gray-800`}>
// // //             {user?.phone_number || '-'}
// // //           </Text>
// // //         </View>

// // //         {/* Date of Birth */}
// // //         <View style={tw`mb-6`}>
// // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>
// // //             Date of Birth
// // //           </Text>
// // //           <TouchableOpacity
// // //             onPress={() => setShowDatePicker(true)}
// // //             style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${
// // //               errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'
// // //             } shadow-sm`}
// // //             activeOpacity={0.7}
// // //           >
// // //             <Text style={tw`text-gray-700 text-sm`}>
// // //               {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}
// // //             </Text>
// // //             <Calendar size={18} color="#6B7280" />
// // //           </TouchableOpacity>
// // //           {errors.dateOfBirth && (
// // //             <Text style={tw`text-red-500 text-xs mt-1`}>
// // //               {errors.dateOfBirth}
// // //             </Text>
// // //           )}
// // //           {showDatePicker && (
// // //             <DateTimePicker
// // //               value={dateOfBirth || new Date(2000, 0, 1)}
// // //               mode="date"
// // //               maximumDate={new Date()}
// // //               display={Platform.OS === 'ios' ? 'inline' : 'default'}
// // //               onChange={(event, selectedDate) => {
// // //                 setShowDatePicker(Platform.OS === 'ios');
// // //                 if (selectedDate) {
// // //                   setDateOfBirth(selectedDate);
// // //                   setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
// // //                 }
// // //               }}
// // //             />
// // //           )}
// // //         </View>

// // //         {/* Gender Selection */}
// // //         <View style={tw`mb-6`}>
// // //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
// // //             Gender
// // //           </Text>
// // //           <View style={tw`flex-row justify-between`}>
// // //             {['Male', 'Female', 'Others'].map((g) => (
// // //               <TouchableOpacity
// // //                 key={g}
// // //                 onPress={() => {
// // //                   setGender(g as typeof gender);
// // //                   setErrors((prev) => ({ ...prev, gender: '' }));
// // //                 }}
// // //                 style={tw`flex-1 mx-1 py-2 rounded-lg border ${
// // //                   gender === g
// // //                     ? `bg-[${GREEN}] border-[${GREEN}]`
// // //                     : 'bg-white border-gray-200'
// // //                 } shadow-sm items-center`}
// // //                 activeOpacity={0.7}
// // //               >
// // //                 <Text
// // //                   style={tw`${
// // //                     gender === g ? 'text-white' : 'text-gray-700'
// // //                   } text-sm`}
// // //                 >
// // //                   {g}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </View>
// // //           {errors.gender && (
// // //             <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>
// // //           )}
// // //         </View>

// // //         {/* Submit Button */}
// // //         <TouchableOpacity
// // //           onPress={handleSubmit}
// // //           style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${
// // //             loading ? 'opacity-50' : ''
// // //           }`}
// // //           disabled={loading}
// // //           activeOpacity={0.7}
// // //         >
// // //           {loading ? (
// // //             <ActivityIndicator color="#fff" />
// // //           ) : (
// // //             <Text style={tw`text-white text-base font-semibold`}>
// // //               Complete Profile
// // //             </Text>
// // //           )}
// // //         </TouchableOpacity>

// // //         {/* Skip */}
// // //         <TouchableOpacity
// // //           onPress={() => navigation.navigate('Profile')}
// // //           style={tw`items-center mt-6 bg-gray-100 rounded-lg py-2 px-4`}
// // //           activeOpacity={0.7}
// // //         >
// // //           <Text style={tw`text-[${GREEN}] text-sm font-semibold underline`}>
// // //             Skip for now
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // }


// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   Image,
// //   Platform,
// //   ActivityIndicator,
// //   ScrollView,
// //   SafeAreaView,
// //   Alert,
// //   StatusBar,
// //   TextInput,
// // } from 'react-native';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import { useNavigation, NavigationProp } from '@react-navigation/native';
// // import { Calendar, ImageIcon } from 'lucide-react-native';
// // import tw from 'twrnc';
// // import { useUser } from '../contexts/UserContext';

// // const GREEN = '#22c55e';
// // const API_ENDPOINT =
// //   'https://landing.docapp.co.in/api/auth/profile/complete/general_user';

// // export default function CompleteProfile() {
// //   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
// //   const { user } = useUser() as { user: User | null };

// //   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
// //   const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
// //   const [profilePictureUrl, setProfilePictureUrl] = useState<string>(''); // kept for UI only, not sent
// //   const [loading, setLoading] = useState(false);
// //   const [showDatePicker, setShowDatePicker] = useState(false);
// //   const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});

// //   // ✅ Validation
// //   const validateForm = (): boolean => {
// //     const newErrors: typeof errors = {};
// //     if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
// //     if (!gender) newErrors.gender = 'Gender is required';
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // ✅ Submit API call
// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;
// //     setLoading(true);

// //     try {
// //       const payload = {
// //         date_of_birth: dateOfBirth?.toISOString().split('T')[0] ?? '',
// //         gender,
// //       };

// //       const response = await fetch(API_ENDPOINT, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${user?.token}`, // ✅ JWT Token
// //         },
// //         credentials: 'include',
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         console.log('✅ Profile update response:', data);
// //         Alert.alert('✅ Success', data.message || 'Profile completed successfully!', [
// //           { text: 'OK', onPress: () => navigation.navigate('Profile') },
// //         ]);
// //       } else {
// //         console.error('❌ API Error:', data);
// //         Alert.alert('❌ Error', data.message || 'Failed to complete profile');
// //       }
// //     } catch (error) {
// //       console.error('❌ Network Error:', error);
// //       Alert.alert('Network Error', 'Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <SafeAreaView
// //       style={[
// //         tw`flex-1 bg-white`,
// //         { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
// //       ]}
// //     >
// //       <StatusBar backgroundColor={GREEN} barStyle="light-content" />
// //       <ScrollView contentContainerStyle={tw`p-4 pt-20 pb-10`}>
// //         {/* Profile Picture URL Input (UI Only, Not Sent to API) */}
// //         <View style={tw`mb-6`}>
// //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
// //             Profile Picture URL (Optional)
// //           </Text>
// //           <View
// //             style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm`}
// //           >
// //             <ImageIcon size={18} color="gray" />
// //             <TextInput
// //               placeholder="Enter image URL"
// //               value={profilePictureUrl}
// //               onChangeText={setProfilePictureUrl}
// //               style={tw`ml-2 flex-1 text-sm text-gray-800`}
// //               autoCapitalize="none"
// //             />
// //           </View>
// //           {profilePictureUrl.trim() !== '' && (
// //             <View style={tw`items-center mt-4`}>
// //               <Image
// //                 source={{ uri: profilePictureUrl }}
// //                 style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}]` as any}
// //               />
// //             </View>
// //           )}
// //         </View>

// //         {/* User Info */}
// //         <View
// //           style={tw`bg-white p-4 rounded-xl mb-6 shadow border border-gray-100`}
// //         >
// //           <Text style={tw`text-base font-semibold text-gray-800 mb-2`}>
// //             Your Info
// //           </Text>
// //           <Text style={tw`text-xs text-gray-500`}>Full Name</Text>
// //           <Text style={tw`text-sm text-gray-800 mb-2`}>
// //             {user?.username || 'N/A'}
// //           </Text>
// //           <Text style={tw`text-xs text-gray-500`}>Email</Text>
// //           <Text style={tw`text-sm text-gray-800 mb-2`}>
// //             {user?.email || 'N/A'}
// //           </Text>
// //           <Text style={tw`text-xs text-gray-500`}>Phone</Text>
// //           <Text style={tw`text-sm text-gray-800`}>
// //             {user?.phone_number || '-'}
// //           </Text>
// //         </View>

// //         {/* Date of Birth */}
// //         <View style={tw`mb-6`}>
// //           <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>
// //             Date of Birth
// //           </Text>
// //           <TouchableOpacity
// //             onPress={() => setShowDatePicker(true)}
// //             style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${
// //               errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'
// //             } shadow-sm`}
// //             activeOpacity={0.7}
// //           >
// //             <Text style={tw`text-gray-700 text-sm`}>
// //               {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}
// //             </Text>
// //             <Calendar size={18} color="#6B7280" />
// //           </TouchableOpacity>
// //           {errors.dateOfBirth && (
// //             <Text style={tw`text-red-500 text-xs mt-1`}>
// //               {errors.dateOfBirth}
// //             </Text>
// //           )}
// //           {showDatePicker && (
// //             <DateTimePicker
// //               value={dateOfBirth || new Date(2000, 0, 1)}
// //               mode="date"
// //               maximumDate={new Date()}
// //               display={Platform.OS === 'ios' ? 'inline' : 'default'}
// //               onChange={(event, selectedDate) => {
// //                 setShowDatePicker(Platform.OS === 'ios');
// //                 if (selectedDate) {
// //                   setDateOfBirth(selectedDate);
// //                   setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
// //                 }
// //               }}
// //             />
// //           )}
// //         </View>

// //         {/* Gender Selection */}
// //         <View style={tw`mb-6`}>
// //           <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
// //             Gender
// //           </Text>
// //           <View style={tw`flex-row justify-between`}>
// //             {['Male', 'Female', 'Others'].map((g) => (
// //               <TouchableOpacity
// //                 key={g}
// //                 onPress={() => {
// //                   setGender(g as typeof gender);
// //                   setErrors((prev) => ({ ...prev, gender: '' }));
// //                 }}
// //                 style={tw`flex-1 mx-1 py-2 rounded-lg border ${
// //                   gender === g
// //                     ? `bg-[${GREEN}] border-[${GREEN}]`
// //                     : 'bg-white border-gray-200'
// //                 } shadow-sm items-center`}
// //                 activeOpacity={0.7}
// //               >
// //                 <Text
// //                   style={tw`${
// //                     gender === g ? 'text-white' : 'text-gray-700'
// //                   } text-sm`}
// //                 >
// //                   {g}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //           {errors.gender && (
// //             <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>
// //           )}
// //         </View>

// //         {/* Submit Button */}
// //         <TouchableOpacity
// //           onPress={handleSubmit}
// //           style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${
// //             loading ? 'opacity-50' : ''
// //           }`}
// //           disabled={loading}
// //           activeOpacity={0.7}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="#fff" />
// //           ) : (
// //             <Text style={tw`text-white text-base font-semibold`}>
// //               Complete Profile
// //             </Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* Skip */}
// //         <TouchableOpacity
// //           onPress={() => navigation.navigate('Profile')}
// //           style={tw`items-center mt-6 bg-gray-100 rounded-lg py-2 px-4`}
// //           activeOpacity={0.7}
// //         >
// //           <Text style={tw`text-[${GREEN}] text-sm font-semibold underline`}>
// //             Skip for nows
// //           </Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   Platform,
//   ActivityIndicator,
//   ScrollView,
//   SafeAreaView,
//   Alert,
//   StatusBar,
//   TextInput,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// import { Calendar, ImageIcon } from 'lucide-react-native';
// import tw from 'twrnc';
// import { useUser } from '../contexts/UserContext';

// const GREEN = '#22c55e';
// const API_COMPLETE_PROFILE =
//   'https://landing.docapp.co.in/api/auth/profile/complete/general_user';
// const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';

// export default function CompleteProfile() {
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();
//   const { user } = useUser() as { user: User | null };

//   const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
//   const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
//   const [profilePictureUrl, setProfilePictureUrl] = useState<string>(''); // UI only
//   const [loading, setLoading] = useState(false);
//   const [initialCheckLoading, setInitialCheckLoading] = useState(true);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});
//   const [isCompleted, setIsCompleted] = useState(false);

//   // ✅ Validation
//   const validateForm = (): boolean => {
//     const newErrors: typeof errors = {};
//     if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
//     if (!gender) newErrors.gender = 'Gender is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // ✅ Fetch user data first
//   const fetchUserData = async () => {
//     try {
//       setInitialCheckLoading(true);
//       const response = await fetch(API_GET_USER, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       });
//       const data = await response.json();

//       if (response.ok && data.userData) {
//         const generalUser = data.userData.generalUser;

//         if (generalUser?.date_of_birth && generalUser?.gender) {
//           // ✅ Profile already completed
//           setIsCompleted(true);
//           setDateOfBirth(new Date(generalUser.date_of_birth));
//           setGender(generalUser.gender);
//           setProfilePictureUrl(generalUser.profile_picture || '');
//         }
//       } else {
//         console.error('❌ Failed fetching user data:', data);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching user data:', error);
//     } finally {
//       setInitialCheckLoading(false);
//     }
//   };

//   // ✅ Submit API call
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading(true);

//     try {
//       const payload = {
//         date_of_birth: dateOfBirth?.toISOString().split('T')[0] ?? '',
//         gender,
//       };

//       const response = await fetch(API_COMPLETE_PROFILE, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user?.token}`,
//         },
//         credentials: 'include',
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('✅ Profile update response:', data);
//         Alert.alert('✅ Success', data.message || 'Profile completed successfully!', [
//           { text: 'OK', onPress: () => navigation.navigate('Profile') },
//         ]);
//         setIsCompleted(true);
//       } else {
//         console.error('❌ API Error:', data);
//         Alert.alert('❌ Error', data.message || 'Failed to complete profile');
//       }
//     } catch (error) {
//       console.error('❌ Network Error:', error);
//       Alert.alert('Network Error', 'Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   if (initialCheckLoading) {
//     return (
//       <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
//         <ActivityIndicator size="large" color={GREEN} />
//         <Text style={tw`mt-4 text-gray-600`}>Checking profile status...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView
//       style={[
//         tw`flex-1 bg-white`,
//         { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
//       ]}
//     >
//       <StatusBar backgroundColor={GREEN} barStyle="light-content" />
//       <ScrollView contentContainerStyle={tw`p-4 pt-20 pb-10`}>
//         {isCompleted ? (
//           // ✅ Profile Already Completed
//           <View style={tw`items-center justify-center mt-20`}>
//             <Image
//               source={{
//                 uri:
//                   profilePictureUrl ||
//                   'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//               }}
//               style={tw`w-32 h-32 rounded-full mb-6`}
//             />
//             <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>
//               Profile Completed
//             </Text>
//             <Text style={tw`text-gray-600 mb-6`}>
//               Your profile is already completed 🎉
//             </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Profile')}
//               style={tw`bg-[${GREEN}] rounded-lg px-6 py-3`}
//             >
//               <Text style={tw`text-white font-semibold`}>Go to Profile</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <>
//             {/* --- Form --- */}

//             {/* Profile Picture URL Input */}
//             <View style={tw`mb-6`}>
//               <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
//                 Profile Picture URL (Optional)
//               </Text>
//               <View
//                 style={tw`flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-white shadow-sm`}
//               >
//                 <ImageIcon size={18} color="gray" />
//                 <TextInput
//                   placeholder="Enter image URL"
//                   value={profilePictureUrl}
//                   onChangeText={setProfilePictureUrl}
//                   style={tw`ml-2 flex-1 text-sm text-gray-800`}
//                   autoCapitalize="none"
//                 />
//               </View>
//               {profilePictureUrl.trim() !== '' && (
//                 <View style={tw`items-center mt-4`}>
//                   <Image
//                     source={{ uri: profilePictureUrl }}
//                     style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}]` as any}
//                   />
//                 </View>
//               )}
//             </View>

//             {/* Date of Birth */}
//             <View style={tw`mb-6`}>
//               <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>
//                 Date of Birth
//               </Text>
//               <TouchableOpacity
//                 onPress={() => setShowDatePicker(true)}
//                 style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${
//                   errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'
//                 } shadow-sm`}
//                 activeOpacity={0.7}
//               >
//                 <Text style={tw`text-gray-700 text-sm`}>
//                   {dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}
//                 </Text>
//                 <Calendar size={18} color="#6B7280" />
//               </TouchableOpacity>
//               {errors.dateOfBirth && (
//                 <Text style={tw`text-red-500 text-xs mt-1`}>
//                   {errors.dateOfBirth}
//                 </Text>
//               )}
//               {showDatePicker && (
//                 <DateTimePicker
//                   value={dateOfBirth || new Date(2000, 0, 1)}
//                   mode="date"
//                   maximumDate={new Date()}
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(event, selectedDate) => {
//                     setShowDatePicker(Platform.OS === 'ios');
//                     if (selectedDate) {
//                       setDateOfBirth(selectedDate);
//                       setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
//                     }
//                   }}
//                 />
//               )}
//             </View>

//             {/* Gender */}
//             <View style={tw`mb-6`}>
//               <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>
//                 Gender
//               </Text>
//               <View style={tw`flex-row justify-between`}>
//                 {['Male', 'Female', 'Others'].map((g) => (
//                   <TouchableOpacity
//                     key={g}
//                     onPress={() => {
//                       setGender(g as typeof gender);
//                       setErrors((prev) => ({ ...prev, gender: '' }));
//                     }}
//                     style={tw`flex-1 mx-1 py-2 rounded-lg border ${
//                       gender === g
//                         ? `bg-[${GREEN}] border-[${GREEN}]`
//                         : 'bg-white border-gray-200'
//                     } shadow-sm items-center`}
//                     activeOpacity={0.7}
//                   >
//                     <Text
//                       style={tw`${
//                         gender === g ? 'text-white' : 'text-gray-700'
//                       } text-sm`}
//                     >
//                       {g}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//               {errors.gender && (
//                 <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>
//               )}
//             </View>

//             {/* Submit */}
//             <TouchableOpacity
//               onPress={handleSubmit}
//               style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${
//                 loading ? 'opacity-50' : ''
//               }`}
//               disabled={loading}
//               activeOpacity={0.7}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={tw`text-white text-base font-semibold`}>
//                   Complete Profile
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }





import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Calendar } from 'lucide-react-native';
import tw from 'twrnc';
import { useUser } from '../contexts/UserContext';
// NEW: Import the image picker library
import { launchImageLibrary } from 'react-native-image-picker';

const GREEN = '#22c55e';

// API Endpoints
const API_COMPLETE_PROFILE =
  'https://landing.docapp.co.in/api/auth/profile/complete/general_user';
const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// NEW: Add the photo upload API endpoint
const API_UPLOAD_PHOTO = 'https://landing.docapp.co.in/api/auth/upload-photo';


export default function CompleteProfile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user } = useUser() as { user: User | null };

  // State Management
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [gender, setGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>(''); // Holds the existing or newly uploaded URL
  const [selectedImage, setSelectedImage] = useState<any>(null); // NEW: Holds the selected image file asset
  const [loading, setLoading] = useState(false);
  const [initialCheckLoading, setInitialCheckLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ dateOfBirth?: string; gender?: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch initial user data to check if profile is already complete
  const fetchUserData = async () => {
    try {
      setInitialCheckLoading(true);
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const data = await response.json();
      if (response.ok && data.userData?.generalUser) {
        const { date_of_birth, gender, profile_picture } = data.userData.generalUser;
        if (date_of_birth && gender) {
          setIsCompleted(true);
          setDateOfBirth(new Date(date_of_birth));
          setGender(gender);
          setProfilePictureUrl(profile_picture || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setInitialCheckLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // NEW: Function to handle photo selection from the gallery
  const handleSelectPhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  // MODIFIED: Main submit handler
  const handleSubmit = async () => {
    // 1. Validate Form
    const newErrors: typeof errors = {};
    if (!dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    let finalImageUrl = profilePictureUrl; // Start with the existing URL

    // 2. Upload photo if a new one is selected
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri: selectedImage.uri,
          type: selectedImage.type,
          name: selectedImage.fileName,
        });

        const uploadResponse = await fetch(API_UPLOAD_PHOTO, {
          method: 'POST',
          headers: { Authorization: `Bearer ${user?.token}` },
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadData.message || 'Photo upload failed');
        
        // Assuming the API returns the URL in a field named 'imageUrl'
        finalImageUrl = uploadData.imageUrl; 
      } catch (error) {
        Alert.alert('Upload Error', 'Could not upload the selected photo. Please try again.');
        setLoading(false);
        return;
      }
    }

    // 3. Submit all profile data
    try {
      const payload = {
        date_of_birth: dateOfBirth?.toISOString().split('T')[0],
        gender: gender,
        profile_picture_url: finalImageUrl, // Send the final URL
      };

      const response = await fetch(API_COMPLETE_PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile completed successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Profile') },
        ]);
        setIsCompleted(true);
      } else {
        Alert.alert('Error', data.message || 'Failed to complete profile');
      }
    } catch (error) {
      Alert.alert('Network Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // --- RENDER LOGIC ---

  if (initialCheckLoading) {
    return (
      <SafeAreaView style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color={GREEN} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
      <StatusBar backgroundColor={GREEN} barStyle="light-content" />
      <ScrollView contentContainerStyle={tw`p-4 pt-10 pb-10`}>
        {isCompleted ? (
          <View style={tw`items-center justify-center mt-20`}>
            <Image
              source={{ uri: profilePictureUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
              style={tw`w-32 h-32 rounded-full mb-6`}
            />
            <Text style={tw`text-lg font-semibold text-gray-800 mb-2`}>Profile Completed</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={tw`bg-[${GREEN}] rounded-lg px-6 py-3`}>
              <Text style={tw`text-white font-semibold`}>Go to Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* --- Form --- */}

            {/* MODIFIED: Profile Picture Uploader */}
            <View style={tw`mb-6 items-center`}>
              <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Profile Picture</Text>
              <Image
                source={{ uri: selectedImage?.uri || profilePictureUrl || 'https://cdn-icons-png.flaticon.com/512/847/847969.png' }}
                style={tw`w-28 h-28 rounded-full border-2 border-[${GREEN}] mb-4`}
              />
              <TouchableOpacity onPress={handleSelectPhoto} style={tw`bg-gray-200 rounded-lg px-6 py-3`}>
                <Text style={tw`text-gray-800 font-semibold`}>Select Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Date of Birth */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-sm font-semibold text-gray-800 mb-1`}>Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={tw`bg-white px-4 py-3 rounded-lg flex-row items-center justify-between border ${errors.dateOfBirth ? 'border-red-400' : 'border-gray-200'} shadow-sm`}>
                <Text style={tw`text-gray-700 text-sm`}>{dateOfBirth ? dateOfBirth.toDateString() : 'Select Date'}</Text>
                <Calendar size={18} color="#6B7280" />
              </TouchableOpacity>
              {errors.dateOfBirth && <Text style={tw`text-red-500 text-xs mt-1`}>{errors.dateOfBirth}</Text>}
              {showDatePicker && (
                <DateTimePicker
                  value={dateOfBirth || new Date(2000, 0, 1)}
                  mode="date"
                  maximumDate={new Date()}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDateOfBirth(selectedDate);
                      setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
                    }
                  }}
                />
              )}
            </View>
            
            {/* Gender */}
            <View style={tw`mb-6`}>
               <Text style={tw`text-sm font-semibold text-gray-800 mb-2`}>Gender</Text>
               <View style={tw`flex-row justify-between`}>
                 {['Male', 'Female', 'Others'].map((g) => (
                   <TouchableOpacity key={g} onPress={() => { setGender(g as typeof gender); setErrors((prev) => ({ ...prev, gender: '' })); }} style={tw`flex-1 mx-1 py-2 rounded-lg border ${gender === g ? `bg-[${GREEN}] border-[${GREEN}]` : 'bg-white border-gray-200'} shadow-sm items-center`}>
                     <Text style={tw`${gender === g ? 'text-white' : 'text-gray-700'} text-sm`}>{g}</Text>
                   </TouchableOpacity>
                 ))}
               </View>
              {errors.gender && <Text style={tw`text-red-500 text-xs mt-2`}>{errors.gender}</Text>}
            </View>
            
            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={tw`bg-[${GREEN}] rounded-lg h-12 justify-center items-center shadow-md ${loading ? 'opacity-50' : ''}`} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={tw`text-white text-base font-semibold`}>Complete ProfileS</Text>}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}