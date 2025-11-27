// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
// // // // // import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
// // // // // import { useNavigation } from '@react-navigation/native';
// // // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // // import { DoctorStackParamList } from '../types/navigation';
// // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // import tw from 'twrnc';

// // // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // // const PersonalInfoScreen = () => {
// // // // //   const navigation = useNavigation<DoctorNavigationProp>();
// // // // //   const [personalInfo, setPersonalInfo] = useState({
// // // // //     name: '',
// // // // //     email: '',
// // // // //     phone: '',
// // // // //     address: '',
// // // // //     specialization: '',
// // // // //     experience: '',
// // // // //     consultationFee: '',
// // // // //     dateOfBirth: '',
// // // // //     gender: '',
// // // // //     profilePicture: 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
// // // // //   });
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   useEffect(() => {
// // // // //     // Simulate fetching data from APIs with HTTP-only cookie authentication
// // // // //     // - https://landing.docapp.co.in/api/auth/get-user-data
// // // // //     // - https://landing.docapp.co.in/api/filter/filter-doctors
// // // // //     const fetchData = async () => {
// // // // //       try {
// // // // //         // Mock response for get-user-data
// // // // //         const userResponse = {
// // // // //           message: 'succesfully fetched the user details',
// // // // //           userData: {
// // // // //             username: 'premchandu',
// // // // //             email: 'premmekiri22@gmail.com',
// // // // //             phone_number: '9381197503',
// // // // //             role: 'doctor',
// // // // //           },
// // // // //         };

// // // // //         // Mock response for filter-doctors (filtered for user_id: 21)
// // // // //         const filterResponse = {
// // // // //           doctors: [
// // // // //             {
// // // // //               user_id: 21,
// // // // //               date_of_birth: '2002-02-22T00:00:00.000Z',
// // // // //               gender: 'Male',
// // // // //               specialization: 'Cardiologist',
// // // // //               experience_years: 2,
// // // // //               consultation_fee: '540.00',
// // // // //               profile_picture: 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
// // // // //               user: {
// // // // //                 address: [
// // // // //                   {
// // // // //                     street: 'madhapur',
// // // // //                     city: 'Hyderabad',
// // // // //                     state: 'Telangana',
// // // // //                     pincode: '500018',
// // // // //                   },
// // // // //                 ],
// // // // //               },
// // // // //             },
// // // // //           ],
// // // // //         };

// // // // //         const doctor = filterResponse.doctors.find((d) => d.user_id === 21);
// // // // //         setPersonalInfo({
// // // // //           name: `Dr. ${userResponse.userData.username}`,
// // // // //           email: userResponse.userData.email,
// // // // //           phone: userResponse.userData.phone_number,
// // // // //           address: doctor?.user.address[0]
// // // // //             ? `${doctor.user.address[0].street}, ${doctor.user.address[0].city}, ${doctor.user.address[0].state}, ${doctor.user.address[0].pincode}`
// // // // //             : '',
// // // // //           specialization: doctor?.specialization || '',
// // // // //           experience: doctor?.experience_years ? `${doctor.experience_years} years` : '',
// // // // //           consultationFee: doctor?.consultation_fee ? `₹${doctor.consultation_fee}` : '',
// // // // //           dateOfBirth: doctor?.date_of_birth ? doctor.date_of_birth.split('T')[0] : '',
// // // // //           gender: doctor?.gender || '',
// // // // //           profilePicture: doctor?.profile_picture || personalInfo.profilePicture,
// // // // //         });
// // // // //         setLoading(false);
// // // // //       } catch (error) {
// // // // //         console.error('Error fetching data:', error);
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchData();
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
// // // // //         <Text style={tw`text-green-100 text-lg`}>Loading...</Text>
// // // // //       </View>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <View style={tw`flex-1 bg-green-50`}>
// // // // //       <DoctorHeader title="Personal Information" showSettings showNotifications />
// // // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // // //         <View style={tw`items-center mb-6`}>
// // // // //           <View style={tw`relative`}>
// // // // //             <Image
// // // // //               source={{ uri: personalInfo.profilePicture }}
// // // // //               style={tw`w-24 h-24 rounded-full`}
// // // // //             />
// // // // //             <TouchableOpacity
// // // // //               style={tw`absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full`}
// // // // //               activeOpacity={0.7}
// // // // //             >
// // // // //               <Camera size={20} color="#fff" />
// // // // //             </TouchableOpacity>
// // // // //           </View>
// // // // //           <Text style={tw`text-green-700 text-xl font-bold mt-3`}>{personalInfo.name}</Text>
// // // // //           <Text style={tw`text-emerald-500 text-base`}>{personalInfo.specialization}</Text>
// // // // //         </View>

// // // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Contact Information</Text>
// // // // //           <View style={tw`flex-row items-center mb-3`}>
// // // // //             <Mail size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>{personalInfo.email}</Text>
// // // // //           </View>
// // // // //           <View style={tw`flex-row items-center mb-3`}>
// // // // //             <Phone size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>{personalInfo.phone}</Text>
// // // // //           </View>
// // // // //           {personalInfo.address && (
// // // // //             <View style={tw`flex-row items-center`}>
// // // // //               <MapPin size={20} color="#16a34a" />
// // // // //               <Text style={tw`text-green-600 ml-3`}>{personalInfo.address}</Text>
// // // // //             </View>
// // // // //           )}
// // // // //         </View>

// // // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Doctor Details</Text>
// // // // //           <View style={tw`flex-row items-center mb-3`}>
// // // // //             <Briefcase size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>Experience: {personalInfo.experience}</Text>
// // // // //           </View>
// // // // //           <View style={tw`flex-row items-center mb-3`}>
// // // // //             <Briefcase size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>Consultation Fee: {personalInfo.consultationFee}</Text>
// // // // //           </View>
// // // // //           <View style={tw`flex-row items-center mb-3`}>
// // // // //             <Calendar size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>Date of Birth: {personalInfo.dateOfBirth}</Text>
// // // // //           </View>
// // // // //           <View style={tw`flex-row items-center`}>
// // // // //             <User2 size={20} color="#16a34a" />
// // // // //             <Text style={tw`text-green-600 ml-3`}>Gender: {personalInfo.gender}</Text>
// // // // //           </View>
// // // // //         </View>

// // // // //         <TouchableOpacity
// // // // //           style={tw`mt-6 bg-emerald-500 rounded-full px-6 py-3 items-center`}
// // // // //           activeOpacity={0.85}
// // // // //           onPress={() => navigation.navigate('EditDoctorProfile')}
// // // // //         >
// // // // //           <Text style={tw`text-white font-bold text-base`}>Edit Information</Text>
// // // // //         </TouchableOpacity>
// // // // //       </ScrollView>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default PersonalInfoScreen;






// // // // import React, { useState, useEffect } from 'react';
// // // // import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
// // // // import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // import { DoctorStackParamList } from '../types/navigation';
// // // // import DoctorHeader from '../components/DoctorHeader';
// // // // import tw from 'twrnc';

// // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // // // const API_UPDATE_PROFILE = 'https://landing.docapp.co.in/api/auth/profile/complete/doctor';

// // // // const PersonalInfoScreen = () => {
// // // //   const navigation = useNavigation<DoctorNavigationProp>();
// // // //   const [personalInfo, setPersonalInfo] = useState({
// // // //     name: '',
// // // //     email: '',
// // // //     phone: '',
// // // //     address: '',
// // // //     specialization: '',
// // // //     experience: '',
// // // //     consultationFee: '',
// // // //     dateOfBirth: '',
// // // //     gender: '',
// // // //     licenseNumber: '',
// // // //     profilePicture:
// // // //       'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
// // // //   });
// // // //   const [loading, setLoading] = useState(true);

// // // //   // ✅ Fetch doctor info
// // // //   useEffect(() => {
// // // //     const fetchData = async () => {
// // // //       try {
// // // //         const response = await fetch(API_GET_USER, {
// // // //           method: 'GET',
// // // //           credentials: 'include', // ✅ include cookies
// // // //         });
// // // //         const data = await response.json();

// // // //         if (response.ok && data.userData) {
// // // //           const user = data.userData;
// // // //           const profile = user.doctorProfile;

// // // //           setPersonalInfo({
// // // //             name: `Dr. ${user.username}`,
// // // //             email: user.email,
// // // //             phone: user.phone_number,
// // // //             address: '', // not present in doctorProfile
// // // //             specialization: profile?.specialization || '',
// // // //             experience: profile?.experience_years ? `${profile.experience_years} years` : '',
// // // //             consultationFee: profile?.consultation_fee ? `₹${profile.consultation_fee}` : '',
// // // //             dateOfBirth: profile?.date_of_birth
// // // //               ? profile.date_of_birth.split('T')[0]
// // // //               : '',
// // // //             gender: profile?.gender || '',
// // // //             licenseNumber: profile?.license_number || '',
// // // //             profilePicture: profile?.profile_picture || personalInfo.profilePicture,
// // // //           });
// // // //         } else {
// // // //           console.error('❌ Failed to fetch user data:', data);
// // // //           Alert.alert('Error', data.message || 'Failed to load profile');
// // // //         }
// // // //       } catch (error) {
// // // //         console.error('❌ Network Error:', error);
// // // //         Alert.alert('Network Error', 'Please try again later.');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, []);

// // // //   // ✅ Update doctor profile
// // // //   const handleUpdateProfile = async () => {
// // // //     try {
// // // //       const payload = {
// // // //         date_of_birth: personalInfo.dateOfBirth,
// // // //         gender: personalInfo.gender,
// // // //         specialization: personalInfo.specialization,
// // // //         license_number: personalInfo.licenseNumber,
// // // //         experience_years: personalInfo.experience
// // // //           ? parseInt(personalInfo.experience)
// // // //           : 0,
// // // //       };

// // // //       const response = await fetch(API_UPDATE_PROFILE, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         credentials: 'include', // ✅ important for cookies
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         Alert.alert('✅ Success', data.message || 'Profile updated successfully');
// // // //       } else {
// // // //         console.error('❌ API Error:', data);
// // // //         Alert.alert('Error', data.message || 'Failed to update profile');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('❌ Network Error:', error);
// // // //       Alert.alert('Network Error', 'Please try again later.');
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
// // // //         <Text style={tw`text-green-100 text-lg`}>Loading...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <View style={tw`flex-1 bg-green-50`}>
// // // //       <DoctorHeader title="Personal Information" showSettings showNotifications />
// // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // //         <View style={tw`items-center mb-6`}>
// // // //           <View style={tw`relative`}>
// // // //             <Image
// // // //               source={{ uri: personalInfo.profilePicture }}
// // // //               style={tw`w-24 h-24 rounded-full`}
// // // //             />
// // // //             <TouchableOpacity
// // // //               style={tw`absolute bottom-0 right-0 bg-emerald-500 p-2 rounded-full`}
// // // //               activeOpacity={0.7}
// // // //             >
// // // //               <Camera size={20} color="#fff" />
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //           <Text style={tw`text-green-700 text-xl font-bold mt-3`}>{personalInfo.name}</Text>
// // // //           <Text style={tw`text-emerald-500 text-base`}>
// // // //             {personalInfo.specialization || 'Specialization not set'}
// // // //           </Text>
// // // //         </View>

// // // //         {/* Contact Info */}
// // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Contact Information</Text>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <Mail size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>{personalInfo.email}</Text>
// // // //           </View>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <Phone size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>{personalInfo.phone}</Text>
// // // //           </View>
// // // //           {personalInfo.address ? (
// // // //             <View style={tw`flex-row items-center`}>
// // // //               <MapPin size={20} color="#16a34a" />
// // // //               <Text style={tw`text-green-600 ml-3`}>{personalInfo.address}</Text>
// // // //             </View>
// // // //           ) : null}
// // // //         </View>

// // // //         {/* Doctor Details */}
// // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Doctor Details</Text>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <Briefcase size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>
// // // //               Experience: {personalInfo.experience || 'N/A'}
// // // //             </Text>
// // // //           </View>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <Briefcase size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>
// // // //               Consultation Fee: {personalInfo.consultationFee || 'N/A'}
// // // //             </Text>
// // // //           </View>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <Calendar size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>
// // // //               Date of Birth: {personalInfo.dateOfBirth || 'N/A'}
// // // //             </Text>
// // // //           </View>
// // // //           <View style={tw`flex-row items-center mb-3`}>
// // // //             <User2 size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>
// // // //               Gender: {personalInfo.gender || 'N/A'}
// // // //             </Text>
// // // //           </View>
// // // //           <View style={tw`flex-row items-center`}>
// // // //             <User2 size={20} color="#16a34a" />
// // // //             <Text style={tw`text-green-600 ml-3`}>
// // // //               License: {personalInfo.licenseNumber || 'N/A'}
// // // //             </Text>
// // // //           </View>
// // // //         </View>

// // // //         {/* Update Button */}
// // // //         <TouchableOpacity
// // // //           style={tw`mt-6 bg-emerald-500 rounded-full px-6 py-3 items-center`}
// // // //           activeOpacity={0.85}
// // // //           onPress={handleUpdateProfile}
// // // //         >
// // // //           <Text style={tw`text-white font-bold text-base`}>Update Profiles</Text>
// // // //         </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default PersonalInfoScreen;









// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   Image,
// // //   Alert,
// // //   Modal,
// // //   TextInput,
// // // } from 'react-native';
// // // import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { DoctorStackParamList } from '../types/navigation';
// // // import DoctorHeader from '../components/DoctorHeader';
// // // import tw from 'twrnc';

// // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // // const API_UPDATE_PROFILE = 'https://landing.docapp.co.in/api/auth/profile/complete/doctor';

// // // const PersonalInfoScreen = () => {
// // //   const navigation = useNavigation<DoctorNavigationProp>();
// // //   const [personalInfo, setPersonalInfo] = useState({
// // //     name: '',
// // //     email: '',
// // //     phone: '',
// // //     address: '',
// // //     specialization: '',
// // //     experience: '',
// // //     consultationFee: '',
// // //     dateOfBirth: '',
// // //     gender: '',
// // //     licenseNumber: '',
// // //     profilePicture:
// // //       'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
// // //   });
// // //   const [loading, setLoading] = useState(true);
// // //   const [modalVisible, setModalVisible] = useState(false);

// // //   // ✅ Form states for modal
// // //   const [dob, setDob] = useState('');
// // //   const [gender, setGender] = useState('');
// // //   const [specialization, setSpecialization] = useState('');
// // //   const [license, setLicense] = useState('');
// // //   const [experience, setExperience] = useState('');

// // //   // ✅ Fetch doctor info
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const response = await fetch(API_GET_USER, {
// // //           method: 'GET',
// // //           credentials: 'include',
// // //         });
// // //         const data = await response.json();

// // //         if (response.ok && data.userData) {
// // //           const user = data.userData;
// // //           const profile = user.doctorProfile;

// // //           setPersonalInfo({
// // //             name: `Dr. ${user.username}`,
// // //             email: user.email,
// // //             phone: user.phone_number,
// // //             address: '',
// // //             specialization: profile?.specialization || '',
// // //             experience: profile?.experience_years
// // //               ? `${profile.experience_years} years`
// // //               : '',
// // //             consultationFee: profile?.consultation_fee
// // //               ? `₹${profile.consultation_fee}`
// // //               : '',
// // //             dateOfBirth: profile?.date_of_birth
// // //               ? profile.date_of_birth.split('T')[0]
// // //               : '',
// // //             gender: profile?.gender || '',
// // //             licenseNumber: profile?.license_number || '',
// // //             profilePicture:
// // //               profile?.profile_picture || personalInfo.profilePicture,
// // //           });
// // //         } else {
// // //           Alert.alert('Error', data.message || 'Failed to load profile');
// // //         }
// // //       } catch (error) {
// // //         Alert.alert('Network Error', 'Please try again later.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   // ✅ Update doctor profile API
// // //   const handleUpdateProfile = async () => {
// // //     try {
// // //       const payload = {
// // //         date_of_birth: dob,
// // //         gender,
// // //         specialization,
// // //         license_number: license,
// // //         experience_years: parseInt(experience) || 0,
// // //       };

// // //       const response = await fetch(API_UPDATE_PROFILE, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         credentials: 'include',
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         Alert.alert('✅ Success', data.message || 'Profile updated successfully');
// // //         setModalVisible(false); // close modal after success
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to update profile');
// // //       }
// // //     } catch (error) {
// // //       Alert.alert('Network Error', 'Please try again later.');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
// // //         <Text style={tw`text-green-100 text-lg`}>Loading...</Text>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <View style={tw`flex-1 bg-green-50`}>
// // //       <DoctorHeader
// // //         title="Personal Information"
// // //         showSettings
// // //         showNotifications
// // //       />
// // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // //         {/* ... existing profile UI ... */}

// // //         {/* Update Button */}
// // //         <TouchableOpacity
// // //           style={tw`mt-6 bg-emerald-500 rounded-full px-6 py-3 items-center`}
// // //           activeOpacity={0.85}
// // //           onPress={() => setModalVisible(true)}
// // //         >
// // //           <Text style={tw`text-white font-bold text-base`}>
// // //             Update Profile
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>

// // //       {/* Modal Form */}
// // //       <Modal visible={modalVisible} animationType="slide" transparent>
// // //         <View
// // //           style={tw`flex-1 bg-black/40 justify-center items-center p-5`}
// // //         >
// // //           <View style={tw`bg-white w-full rounded-2xl p-5`}>
// // //             <Text style={tw`text-xl font-bold text-green-700 mb-4`}>
// // //               Update Profile
// // //             </Text>

// // //             <TextInput
// // //               style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
// // //               placeholder="Date of Birth (YYYY-MM-DD)"
// // //               value={dob}
// // //               onChangeText={setDob}
// // //             />
// // //             <TextInput
// // //               style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
// // //               placeholder="Gender"
// // //               value={gender}
// // //               onChangeText={setGender}
// // //             />
// // //             <TextInput
// // //               style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
// // //               placeholder="Specialization"
// // //               value={specialization}
// // //               onChangeText={setSpecialization}
// // //             />
// // //             <TextInput
// // //               style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
// // //               placeholder="License Number"
// // //               value={license}
// // //               onChangeText={setLicense}
// // //             />
// // //             <TextInput
// // //               style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
// // //               placeholder="Experience (years)"
// // //               keyboardType="numeric"
// // //               value={experience}
// // //               onChangeText={setExperience}
// // //             />

// // //             <View style={tw`flex-row justify-end mt-4`}>
// // //               <TouchableOpacity
// // //                 style={tw`px-4 py-2 mr-2 rounded-lg bg-gray-300`}
// // //                 onPress={() => setModalVisible(false)}
// // //               >
// // //                 <Text>Cancel</Text>
// // //               </TouchableOpacity>
// // //               <TouchableOpacity
// // //                 style={tw`px-4 py-2 rounded-lg bg-emerald-500`}
// // //                 onPress={handleUpdateProfile}
// // //               >
// // //                 <Text style={tw`text-white font-bold`}>Save</Text>
// // //               </TouchableOpacity>
// // //             </View>
// // //           </View>
// // //         </View>
// // //       </Modal>
// // //     </View>
// // //   );
// // // };

// // // export default PersonalInfoScreen;







// // import React, { useState, useEffect } from 'react';
// // import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput } from 'react-native';
// // import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { DoctorStackParamList } from '../types/navigation';
// // import DoctorHeader from '../components/DoctorHeader';
// // import tw from 'twrnc';

// // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // const API_UPDATE_PROFILE = 'https://landing.docapp.co.in/api/auth/profile/complete/doctor';

// // const PersonalInfoScreen = () => {
// //   const navigation = useNavigation<DoctorNavigationProp>();
// //   const [personalInfo, setPersonalInfo] = useState<any>(null);
// //   const [loading, setLoading] = useState(true);

// //   // 📝 Editable form state
// //   const [form, setForm] = useState({
// //     date_of_birth: '',
// //     gender: '',
// //     specialization: '',
// //     license_number: '',
// //     experience_years: '',
// //   });

// //   // ✅ Fetch doctor info
// //   const fetchData = async () => {
// //     try {
// //       const response = await fetch(API_GET_USER, {
// //         method: 'GET',
// //         credentials: 'include',
// //       });
// //       const data = await response.json();

// //       if (response.ok && data.userData) {
// //         const user = data.userData;
// //         const profile = user.doctorProfile;

// //         setPersonalInfo({
// //           name: `Dr. ${user.username}`,
// //           email: user.email,
// //           phone: user.phone_number,
// //           specialization: profile?.specialization || '',
// //           experience: profile?.experience_years || '',
// //           consultationFee: profile?.consultation_fee || '',
// //           dateOfBirth: profile?.date_of_birth
// //             ? profile.date_of_birth.split('T')[0]
// //             : '',
// //           gender: profile?.gender || '',
// //           licenseNumber: profile?.license_number || '',
// //           profilePicture:
// //             profile?.profile_picture ||
// //             'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
// //         });

// //         // prefill form values
// //         setForm({
// //           date_of_birth: profile?.date_of_birth
// //             ? profile.date_of_birth.split('T')[0]
// //             : '',
// //           gender: profile?.gender || '',
// //           specialization: profile?.specialization || '',
// //           license_number: profile?.license_number || '',
// //           experience_years: profile?.experience_years?.toString() || '',
// //         });
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to load profile');
// //       }
// //     } catch (error) {
// //       console.error('❌ Network Error:', error);
// //       Alert.alert('Network Error', 'Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, []);

// //   // ✅ Update doctor profile
// //   const handleUpdateProfile = async () => {
// //     try {
// //       const payload = {
// //         ...form,
// //         experience_years: form.experience_years
// //           ? parseInt(form.experience_years)
// //           : 0,
// //       };

// //       const response = await fetch(API_UPDATE_PROFILE, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         Alert.alert('✅ Success', data.message || 'Profile updated successfully');
// //         fetchData(); // refresh details
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to update profile');
// //       }
// //     } catch (error) {
// //       console.error('❌ Network Error:', error);
// //       Alert.alert('Network Error', 'Please try again later.');
// //     }
// //   };

// //   if (loading || !personalInfo) {
// //     return (
// //       <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
// //         <Text style={tw`text-green-100 text-lg`}>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={tw`flex-1 bg-green-50`}>
// //       <DoctorHeader title="Personal Information" showSettings showNotifications />
// //       <ScrollView contentContainerStyle={tw`p-5 pb-20`}>
// //         {/* Profile Section */}
// //         <View style={tw`items-center mb-6`}>
// //           <Image
// //             source={{ uri: personalInfo.profilePicture }}
// //             style={tw`w-24 h-24 rounded-full`}
// //           />
// //           <Text style={tw`text-green-700 text-xl font-bold mt-3`}>
// //             {personalInfo.name}
// //           </Text>
// //           <Text style={tw`text-emerald-500 text-base`}>
// //             {personalInfo.specialization || 'Specialization not set'}
// //           </Text>
// //         </View>

// //         {/* Display Info */}
// //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>
// //             Current Profile
// //           </Text>
// //           <Text>Email: {personalInfo.email}</Text>
// //           <Text>Phone: {personalInfo.phone}</Text>
// //           <Text>Specialization: {personalInfo.specialization}</Text>
// //           <Text>Experience: {personalInfo.experience || 'N/A'}</Text>
// //           <Text>Date of Birth: {personalInfo.dateOfBirth || 'N/A'}</Text>
// //           <Text>Gender: {personalInfo.gender || 'N/A'}</Text>
// //           <Text>License: {personalInfo.licenseNumber || 'N/A'}</Text>
// //         </View>

// //         {/* Update Form */}
// //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
// //           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>
// //             Update Profile
// //           </Text>

// //           <TextInput
// //             placeholder="Date of Birth (YYYY-MM-DD)"
// //             value={form.date_of_birth}
// //             onChangeText={(t) => setForm({ ...form, date_of_birth: t })}
// //             style={tw`border border-gray-300 rounded p-2 mb-3`}
// //           />
// //           <TextInput
// //             placeholder="Gender"
// //             value={form.gender}
// //             onChangeText={(t) => setForm({ ...form, gender: t })}
// //             style={tw`border border-gray-300 rounded p-2 mb-3`}
// //           />
// //           <TextInput
// //             placeholder="Specialization"
// //             value={form.specialization}
// //             onChangeText={(t) => setForm({ ...form, specialization: t })}
// //             style={tw`border border-gray-300 rounded p-2 mb-3`}
// //           />
// //           <TextInput
// //             placeholder="License Number"
// //             value={form.license_number}
// //             onChangeText={(t) => setForm({ ...form, license_number: t })}
// //             style={tw`border border-gray-300 rounded p-2 mb-3`}
// //           />
// //           <TextInput
// //             placeholder="Experience Years"
// //             value={form.experience_years}
// //             keyboardType="numeric"
// //             onChangeText={(t) => setForm({ ...form, experience_years: t })}
// //             style={tw`border border-gray-300 rounded p-2 mb-5`}
// //           />

// //           <TouchableOpacity
// //             style={tw`bg-emerald-500 rounded-full px-6 py-3 items-center`}
// //             onPress={handleUpdateProfile}
// //           >
// //             <Text style={tw`text-white font-bold text-base`}>Update Profile</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default PersonalInfoScreen;




// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator } from 'react-native';
// import { Camera, Mail, Phone, MapPin, Briefcase, Calendar, User2 } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { DoctorStackParamList } from '../types/navigation';
// import DoctorHeader from '../components/DoctorHeader';
// import tw from 'twrnc';
// import { launchImageLibrary } from 'react-native-image-picker';

// type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// const API_UPDATE_PROFILE = 'https://landing.docapp.co.in/api/auth/profile/complete/doctor';
// const API_UPLOAD_PHOTO = 'https://landing.docapp.co.in/api/auth/upload-photo';

// const PersonalInfoScreen = () => {
//   const navigation = useNavigation<DoctorNavigationProp>();
//   const [personalInfo, setPersonalInfo] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // 📝 Editable form state
//   const [form, setForm] = useState({
//     date_of_birth: '',
//     gender: '',
//     specialization: '',
//     license_number: '',
//     experience_years: '',
//   });

//   // ================================================================================================
//   // 🚀 Profile Photo Upload Handler
//   // ================================================================================================
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
//         name: photo.fileName || 'profile.jpg',
//       });

//       setLoading(true);

//       const res = await fetch(API_UPLOAD_PHOTO, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           // cookie-based auth → no token required
//         },
//         credentials: 'include',
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         Alert.alert('Error', data.message || 'Upload failed');
//         return;
//       }

//       Alert.alert('Success', 'Profile picture updated!');
//       fetchData();
//     } catch (error) {
//       console.log(error);
//       Alert.alert('Error', 'Failed to upload photo');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================================================================================================
//   // 🔄 Fetch profile data
//   // ================================================================================================
//   const fetchData = async () => {
//     try {
//       const response = await fetch(API_GET_USER, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (response.ok && data.userData) {
//         const user = data.userData;
//         const profile = user.doctorProfile;

//         setPersonalInfo({
//           name: `Dr. ${user.username}`,
//           email: user.email,
//           phone: user.phone_number,
//           specialization: profile?.specialization || '',
//           experience: profile?.experience_years || '',
//           consultationFee: profile?.consultation_fee || '',
//           dateOfBirth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
//           gender: profile?.gender || '',
//           licenseNumber: profile?.license_number || '',
//           profilePicture:
//             profile?.profile_picture ||
//             'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
//         });

//         // prefill form values
//         setForm({
//           date_of_birth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
//           gender: profile?.gender || '',
//           specialization: profile?.specialization || '',
//           license_number: profile?.license_number || '',
//           experience_years: profile?.experience_years?.toString() || '',
//         });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to load profile');
//       }
//     } catch (error) {
//       console.error('❌ Network Error:', error);
//       Alert.alert('Network Error', 'Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ================================================================================================
//   // 🔄 Update doctor profile
//   // ================================================================================================
//   const handleUpdateProfile = async () => {
//     try {
//       const payload = {
//         ...form,
//         experience_years: form.experience_years ? parseInt(form.experience_years) : 0,
//       };

//       const response = await fetch(API_UPDATE_PROFILE, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', data.message || 'Profile updated successfully');
//         fetchData(); // refresh details
//       } else {
//         Alert.alert('Error', data.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('❌ Network Error:', error);
//       Alert.alert('Network Error', 'Please try again later.');
//     }
//   };


//   // ================================================================================================
// // 🗑 Delete Profile Photo
// // ================================================================================================
// const handleDeletePhoto = async () => {
//   Alert.alert(
//     "Delete Profile Picture",
//     "Are you sure you want to delete your profile photo?",
//     [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setLoading(true);

//             const res = await fetch(
//               "https://landing.docapp.co.in/api/auth/delete-profile-pic",
//               {
//                 method: "DELETE",
//                 credentials: "include", // cookie auth
//               }
//             );

//             const data = await res.json();

//             if (!res.ok) {
//               Alert.alert("Error", data.message || "Unable to delete picture");
//               return;
//             }

//             Alert.alert("Success", "Profile picture removed successfully!");
//             fetchData(); // refresh UI
//           } catch (error) {
//             console.log(error);
//             Alert.alert("Error", "Network issue, try again.");
//           } finally {
//             setLoading(false);
//           }
//         },
//       },
//     ]
//   );
// };


//   if (loading || !personalInfo) {
//     return (
//       <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#fff" />
//         <Text style={tw`text-green-100 text-lg mt-3`}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       <DoctorHeader title="Personal Information" showSettings showNotifications />
//       <ScrollView contentContainerStyle={tw`p-5 pb-20`}>

//         {/* Profile Section */}
//         <View style={tw`items-center mb-6`}>
//           <Image
//             source={{ uri: personalInfo.profilePicture }}
//             style={tw`w-28 h-28 rounded-full`}
//           />

//           {/* Upload Button */}
//           <TouchableOpacity
//             style={tw`bg-green-600 px-4 py-2 rounded-full mt-3`}
//             onPress={handlePhotoUpload}
//           >
//             <Text style={tw`text-white font-semibold`}>Upload New Photo</Text>
//           </TouchableOpacity>


//           <TouchableOpacity
//   style={tw`bg-red-500 px-4 py-2 rounded-full mt-2`}
//   onPress={handleDeletePhoto}
// >
//   <Text style={tw`text-white font-semibold`}>Delete Photo</Text>
// </TouchableOpacity>

//           <Text style={tw`text-green-700 text-xl font-bold mt-3`}>
//             {personalInfo.name}
//           </Text>
//           <Text style={tw`text-emerald-500 text-base`}>
//             {personalInfo.specialization || 'Specialization not set'}
//           </Text>
//         </View>

//         {/* Display Info */}
//         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
//           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>
//             Current Profile
//           </Text>
//           <Text>Email: {personalInfo.email}</Text>
//           <Text>Phone: {personalInfo.phone}</Text>
//           <Text>Specialization: {personalInfo.specialization}</Text>
//           <Text>Experience: {personalInfo.experience || 'N/A'} years</Text>
//           <Text>Date of Birth: {personalInfo.dateOfBirth || 'N/A'}</Text>
//           <Text>Gender: {personalInfo.gender || 'N/A'}</Text>
//           <Text>License: {personalInfo.licenseNumber || 'N/A'}</Text>
//         </View>

//         {/* Update Form */}
//         <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
//           <Text style={tw`text-lg font-bold text-green-700 mb-4`}>
//             Update Profile
//           </Text>

//           <TextInput
//             placeholder="Date of Birth (YYYY-MM-DD)"
//             value={form.date_of_birth}
//             onChangeText={(t) => setForm({ ...form, date_of_birth: t })}
//             style={tw`border border-gray-300 rounded p-2 mb-3`}
//           />
//           <TextInput
//             placeholder="Gender"
//             value={form.gender}
//             onChangeText={(t) => setForm({ ...form, gender: t })}
//             style={tw`border border-gray-300 rounded p-2 mb-3`}
//           />
//           <TextInput
//             placeholder="Specialization"
//             value={form.specialization}
//             onChangeText={(t) => setForm({ ...form, specialization: t })}
//             style={tw`border border-gray-300 rounded p-2 mb-3`}
//           />
//           <TextInput
//             placeholder="License Number"
//             value={form.license_number}
//             onChangeText={(t) => setForm({ ...form, license_number: t })}
//             style={tw`border border-gray-300 rounded p-2 mb-3`}
//           />
//           <TextInput
//             placeholder="Experience Years"
//             value={form.experience_years}
//             keyboardType="numeric"
//             onChangeText={(t) => setForm({ ...form, experience_years: t })}
//             style={tw`border border-gray-300 rounded p-2 mb-5`}
//           />

//           <TouchableOpacity
//             style={tw`bg-emerald-500 rounded-full px-6 py-3 items-center`}
//             onPress={handleUpdateProfile}
//           >
//             <Text style={tw`text-white font-bold text-base`}>
//               Update Profile
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default PersonalInfoScreen;






import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { launchImageLibrary } from 'react-native-image-picker';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
const API_UPDATE_PROFILE = 'https://landing.docapp.co.in/api/auth/profile/complete/doctor';
const API_UPLOAD_PHOTO = 'https://landing.docapp.co.in/api/auth/upload-photo';
const API_UPLOAD_BANK = 'https://landing.docapp.co.in/api/auth/upload/bank-details';

const PersonalInfoScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // 🔀 Tab State: 'personal' | 'bank'
  const [activeTab, setActiveTab] = useState<'personal' | 'bank'>('personal');

  // 📝 Personal Form State
  const [form, setForm] = useState({
    date_of_birth: '',
    gender: '',
    specialization: '',
    license_number: '',
    experience_years: '',
  });

  // 🏦 Bank Form State
  const [bankForm, setBankForm] = useState({
    beneficiary_name: '',
    account_number: '',
    confirm_account_number: '', // Field for validation
    ifsc_code: '',
  });

  // ================================================================================================
  // 🔄 Fetch profile data
  // ================================================================================================
  const fetchData = async () => {
    try {
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.userData) {
        const user = data.userData;
        const profile = user.doctorProfile;

        setPersonalInfo({
          name: `Dr. ${user.username}`,
          email: user.email,
          phone: user.phone_number,
          specialization: profile?.specialization || '',
          experience: profile?.experience_years || '',
          consultationFee: profile?.consultation_fee || '',
          dateOfBirth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
          gender: profile?.gender || '',
          licenseNumber: profile?.license_number || '',
          profilePicture:
            profile?.profile_picture ||
            'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
        });

        // prefill personal form values
        setForm({
          date_of_birth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
          gender: profile?.gender || '',
          specialization: profile?.specialization || '',
          license_number: profile?.license_number || '',
          experience_years: profile?.experience_years?.toString() || '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================================================================================================
  // 🚀 Profile Photo Upload Handler
  // ================================================================================================
  const handlePhotoUpload = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
      if (result.didCancel || !result.assets?.[0]) return;

      const photo = result.assets[0];
      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName || 'profile.jpg',
      });

      setLoading(true);
      const res = await fetch(API_UPLOAD_PHOTO, {
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.message || 'Upload failed');
        return;
      }
      Alert.alert('Success', 'Profile picture updated!');
      fetchData();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  // ================================================================================================
  // 🔄 Update Personal Profile
  // ================================================================================================
  const handleUpdateProfile = async () => {
    try {
      const payload = {
        ...form,
        experience_years: form.experience_years ? parseInt(form.experience_years) : 0,
      };

      const response = await fetch(API_UPDATE_PROFILE, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message || 'Profile updated successfully');
        fetchData(); 
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    }
  };

  // ================================================================================================
  // 🏦 Update Bank Details
  // ================================================================================================
  const handleUpdateBankDetails = async () => {
    // 1. Validation
    if (!bankForm.beneficiary_name || !bankForm.account_number || !bankForm.ifsc_code) {
      Alert.alert("Missing Fields", "Please fill in all bank details.");
      return;
    }

    // 2. Account Number Match Check
    if (bankForm.account_number !== bankForm.confirm_account_number) {
      Alert.alert("Mismatch", "Account numbers do not match. Please verify.");
      return;
    }

    try {
      setLoading(true);
      
      // Prepare payload (exclude confirm_account_number)
      const payload = {
        beneficiary_name: bankForm.beneficiary_name,
        account_number: bankForm.account_number,
        ifsc_code: bankForm.ifsc_code
      };

      const response = await fetch(API_UPLOAD_BANK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Bank details updated successfully!');
        // Optional: Clear form or navigate
        setBankForm({ beneficiary_name: '', account_number: '', confirm_account_number: '', ifsc_code: '' });
      } else {
        Alert.alert('Error', data.message || 'Failed to update bank details');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // ================================================================================================
  // 🗑 Delete Profile Photo
  // ================================================================================================
  const handleDeletePhoto = async () => {
    Alert.alert(
      "Delete Profile Picture",
      "Are you sure you want to delete your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await fetch("https://landing.docapp.co.in/api/auth/delete-profile-pic", {
                method: "DELETE",
                credentials: "include",
              });
              const data = await res.json();
              if (!res.ok) {
                Alert.alert("Error", data.message || "Unable to delete picture");
                return;
              }
              Alert.alert("Success", "Profile picture removed successfully!");
              fetchData();
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Network issue, try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading || !personalInfo) {
    return (
      <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={tw`text-green-100 text-lg mt-3`}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Profile Settings" showSettings showNotifications />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`p-5 pb-20`}>

          {/* 🔀 Tabs Switcher */}
          <View style={tw`flex-row justify-center mb-6 bg-white rounded-full p-1 shadow-sm`}>
            <TouchableOpacity 
              onPress={() => setActiveTab('personal')}
              style={tw`flex-1 py-3 rounded-full items-center ${activeTab === 'personal' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold ${activeTab === 'personal' ? 'text-white' : 'text-gray-500'}`}>
                Personal Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveTab('bank')}
              style={tw`flex-1 py-3 rounded-full items-center ${activeTab === 'bank' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold ${activeTab === 'bank' ? 'text-white' : 'text-gray-500'}`}>
                Bank A/c Info
              </Text>
            </TouchableOpacity>
          </View>

          {/* ============================================================================
                                    VIEW 1: PERSONAL INFO
          ============================================================================ */}
          {activeTab === 'personal' && (
            <>
              {/* Profile Photo Section */}
              <View style={tw`items-center mb-6`}>
                <Image source={{ uri: personalInfo.profilePicture }} style={tw`w-28 h-28 rounded-full`} />
                <View style={tw`flex-row mt-3`}>
                  <TouchableOpacity style={tw`bg-green-600 px-4 py-2 rounded-full mr-2`} onPress={handlePhotoUpload}>
                    <Text style={tw`text-white font-semibold`}>Upload Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`bg-red-500 px-4 py-2 rounded-full`} onPress={handleDeletePhoto}>
                    <Text style={tw`text-white font-semibold`}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <Text style={tw`text-green-700 text-xl font-bold mt-3`}>{personalInfo.name}</Text>
                <Text style={tw`text-emerald-500 text-base`}>{personalInfo.specialization}</Text>
              </View>

              {/* Read-Only Info */}
              <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
                <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Current Details</Text>
                <Text style={tw`mb-1 text-gray-700`}>Email: {personalInfo.email}</Text>
                <Text style={tw`mb-1 text-gray-700`}>Phone: {personalInfo.phone}</Text>
                <Text style={tw`mb-1 text-gray-700`}>Experience: {personalInfo.experience} years</Text>
              </View>

              {/* Editable Form */}
              <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
                <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Update Personal Info</Text>

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Date of Birth</Text>
                <TextInput
                  placeholder="YYYY-MM-DD"
                  value={form.date_of_birth}
                  onChangeText={(t) => setForm({ ...form, date_of_birth: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                />

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Gender</Text>
                <TextInput
                  placeholder="Male / Female"
                  value={form.gender}
                  onChangeText={(t) => setForm({ ...form, gender: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                />

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Specialization</Text>
                <TextInput
                  placeholder="e.g. Cardiologist"
                  value={form.specialization}
                  onChangeText={(t) => setForm({ ...form, specialization: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                />

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>License Number</Text>
                <TextInput
                  placeholder="Medical License No."
                  value={form.license_number}
                  onChangeText={(t) => setForm({ ...form, license_number: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                />

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Experience (Years)</Text>
                <TextInput
                  placeholder="0"
                  value={form.experience_years}
                  keyboardType="numeric"
                  onChangeText={(t) => setForm({ ...form, experience_years: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-5 bg-gray-50`}
                />

                <TouchableOpacity style={tw`bg-emerald-500 rounded-full px-6 py-3 items-center`} onPress={handleUpdateProfile}>
                  <Text style={tw`text-white font-bold text-base`}>Save Personal Info</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ============================================================================
                                    VIEW 2: BANK INFO
          ============================================================================ */}
          {activeTab === 'bank' && (
            <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
              <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Bank Account Details</Text>
              <Text style={tw`text-gray-500 text-sm mb-6`}>Please provide your bank details to receive payouts.</Text>

              <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Beneficiary Name</Text>
              <TextInput
                placeholder="Name as per Bank Records"
                value={bankForm.beneficiary_name}
                onChangeText={(t) => setBankForm({ ...bankForm, beneficiary_name: t })}
                style={tw`border border-gray-300 rounded p-3 mb-4 bg-gray-50`}
              />

              <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Account Number</Text>
              <TextInput
                placeholder="Enter Account Number"
                value={bankForm.account_number}
                keyboardType="number-pad"
                secureTextEntry={true} // Hidden for security until confirmed
                onChangeText={(t) => setBankForm({ ...bankForm, account_number: t })}
                style={tw`border border-gray-300 rounded p-3 mb-4 bg-gray-50`}
              />

              <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Confirm Account Number</Text>
              <TextInput
                placeholder="Re-enter Account Number"
                value={bankForm.confirm_account_number}
                keyboardType="number-pad"
                onChangeText={(t) => setBankForm({ ...bankForm, confirm_account_number: t })}
                style={tw`border border-gray-300 rounded p-3 mb-4 bg-gray-50`}
              />

              <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>IFSC Code</Text>
              <TextInput
                placeholder="e.g. HDFC0001234"
                value={bankForm.ifsc_code}
                autoCapitalize="characters"
                onChangeText={(t) => setBankForm({ ...bankForm, ifsc_code: t })}
                style={tw`border border-gray-300 rounded p-3 mb-6 bg-gray-50`}
              />

              <TouchableOpacity 
                style={tw`bg-emerald-500 rounded-full px-6 py-3 items-center`} 
                onPress={handleUpdateBankDetails}
              >
                <Text style={tw`text-white font-bold text-base`}>Save Bank Details</Text>
              </TouchableOpacity>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PersonalInfoScreen;