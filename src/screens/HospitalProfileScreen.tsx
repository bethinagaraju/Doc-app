// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   ScrollView,
// // //   SafeAreaView,
// // //   StatusBar,
// // //   Alert,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import tw from 'twrnc';
// // // import { ArrowLeft, Save, Building } from 'lucide-react-native';
// // // import { useUser } from './contexts/UserContext';

// // // type HospitalProfileNavigationProp = NativeStackNavigationProp<any>;

// // // interface HospitalProfileData {
// // //   org_type: string;
// // //   org_name: string;
// // //   org_license: string;
// // //   org_establishment: string;
// // //   org_url: string;
// // //   org_ambulance: boolean;
// // //   org_services: string[];
// // // }

// // // const HospitalProfileScreen = () => {
// // //   const navigation = useNavigation<HospitalProfileNavigationProp>();
// // //   const { user } = useUser();
// // //   const [loading, setLoading] = useState(false);
// // //   const [saving, setSaving] = useState(false);

// // //   const [profileData, setProfileData] = useState<HospitalProfileData>({
// // //     org_type: 'hospital',
// // //     org_name: '',
// // //     org_license: '',
// // //     org_establishment: '',
// // //     org_url: '',
// // //     org_ambulance: false,
// // //     org_services: [],
// // //   });

// // //   const availableServices = [
// // //     'physiotherapy',
// // //     'psycology',
// // //     'cardiology',
// // //     'pediatrition',
// // //   ];

// // //   const serviceLabels: { [key: string]: string } = {
// // //     physiotherapy: 'Physiotherapy',
// // //     psycology: 'Psychology',
// // //     cardiology: 'Cardiology',
// // //     pediatrition: 'Pediatrics',
// // //   };

// // //   useEffect(() => {
// // //     // Load existing profile data if available
// // //     loadProfileData();
// // //   }, []);

// // //   const loadProfileData = async () => {
// // //     try {
// // //       setLoading(true);
// // //       // TODO: Implement API call to get existing profile data
// // //       // For now, we'll use placeholder data
// // //       console.log('Loading hospital profile data...');
// // //     } catch (error) {
// // //       console.error('Error loading profile data:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSave = async () => {
// // //     // Validation
// // //     if (!profileData.org_name.trim()) {
// // //       Alert.alert('Error', 'Organization name is required');
// // //       return;
// // //     }
// // //     if (!profileData.org_license.trim()) {
// // //       Alert.alert('Error', 'Organization license is required');
// // //       return;
// // //     }
// // //     if (!profileData.org_establishment.trim()) {
// // //       Alert.alert('Error', 'Establishment year is required');
// // //       return;
// // //     }

// // //     try {
// // //       setSaving(true);

// // //       const payload = {
// // //         org_type: profileData.org_type,
// // //         org_name: profileData.org_name.trim(),
// // //         org_license: profileData.org_license.trim(),
// // //         org_establishment: profileData.org_establishment.trim(),
// // //         org_url: profileData.org_url.trim(),
// // //         org_ambulance: profileData.org_ambulance,
// // //         org_services: profileData.org_services,
// // //       };

// // //       console.log('Saving profile data:', payload);

// // //       // Make API call
// // //       const response = await fetch('https://landing.docapp.co.in/api/auth/profile/complete/hospital_organisation', {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           // Add authorization header if needed
// // //           // 'Authorization': `Bearer ${user?.token}`,
// // //         },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const result = await response.json();

// // //       if (response.ok) {
// // //         Alert.alert('Success', 'Hospital profile updated successfully!', [
// // //           { text: 'OK', onPress: () => navigation.goBack() }
// // //         ]);
// // //       } else {
// // //         Alert.alert('Error', result.message || 'Failed to update profile');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error saving profile:', error);
// // //       Alert.alert('Error', 'Failed to save profile. Please try again.');
// // //     } finally {
// // //       setSaving(false);
// // //     }
// // //   };

// // //   const toggleService = (service: string) => {
// // //     setProfileData(prev => ({
// // //       ...prev,
// // //       org_services: prev.org_services.includes(service)
// // //         ? prev.org_services.filter(s => s !== service)
// // //         : [...prev.org_services, service],
// // //     }));
// // //   };

// // //   const toggleAmbulance = () => {
// // //     setProfileData(prev => ({
// // //       ...prev,
// // //       org_ambulance: !prev.org_ambulance,
// // //     }));
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
// // //         <ActivityIndicator size="large" color="#16a34a" />
// // //         <Text style={tw`text-green-700 mt-4`}>Loading profile...</Text>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   return (
// // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />

// // //       {/* Header */}
// // //       <View style={tw`bg-green-600 p-4 flex-row items-center`}>
// // //         <TouchableOpacity
// // //           onPress={() => navigation.goBack()}
// // //           style={tw`mr-4`}
// // //         >
// // //           <ArrowLeft size={24} color="white" />
// // //         </TouchableOpacity>
// // //         <View>
// // //           <Text style={tw`text-white text-xl font-bold`}>Hospital Profile</Text>
// // //           <Text style={tw`text-green-100 text-sm`}>Complete your organization details</Text>
// // //         </View>
// // //       </View>

// // //       <ScrollView
// // //         style={tw`flex-1`}
// // //         contentContainerStyle={tw`p-4`}
// // //         showsVerticalScrollIndicator={false}
// // //       >
// // //         {/* Organization Type */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Organization Type</Text>
// // //           <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
// // //             <Text style={tw`text-green-700`}>Hospital</Text>
// // //           </View>
// // //         </View>

// // //         {/* Organization Name */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Organization Name *</Text>
// // //           <TextInput
// // //             style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
// // //             placeholder="Enter organization name"
// // //             placeholderTextColor="#9ca3af"
// // //             value={profileData.org_name}
// // //             onChangeText={(text) => setProfileData(prev => ({ ...prev, org_name: text }))}
// // //           />
// // //         </View>

// // //         {/* License */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>License Number *</Text>
// // //           <TextInput
// // //             style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
// // //             placeholder="Enter license number"
// // //             placeholderTextColor="#9ca3af"
// // //             value={profileData.org_license}
// // //             onChangeText={(text) => setProfileData(prev => ({ ...prev, org_license: text }))}
// // //           />
// // //         </View>

// // //         {/* Establishment Year */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Establishment Year *</Text>
// // //           <TextInput
// // //             style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
// // //             placeholder="e.g., 2021"
// // //             placeholderTextColor="#9ca3af"
// // //             keyboardType="numeric"
// // //             value={profileData.org_establishment}
// // //             onChangeText={(text) => setProfileData(prev => ({ ...prev, org_establishment: text }))}
// // //           />
// // //         </View>

// // //         {/* Website URL */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Website URL</Text>
// // //           <TextInput
// // //             style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
// // //             placeholder="https://example.com"
// // //             placeholderTextColor="#9ca3af"
// // //             keyboardType="url"
// // //             value={profileData.org_url}
// // //             onChangeText={(text) => setProfileData(prev => ({ ...prev, org_url: text }))}
// // //           />
// // //         </View>

// // //         {/* Ambulance Service */}
// // //         <View style={tw`mb-4`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Ambulance Service</Text>
// // //           <TouchableOpacity
// // //             style={tw`bg-white rounded-lg p-3 border border-green-200 flex-row items-center justify-between`}
// // //             onPress={toggleAmbulance}
// // //           >
// // //             <Text style={tw`text-green-700`}>Available</Text>
// // //             <View style={tw`w-6 h-6 rounded border-2 border-green-300 items-center justify-center ${profileData.org_ambulance ? 'bg-green-500' : 'bg-white'}`}>
// // //               {profileData.org_ambulance && <Text style={tw`text-white text-xs font-bold`}>✓</Text>}
// // //             </View>
// // //           </TouchableOpacity>
// // //         </View>

// // //         {/* Services Offered */}
// // //         <View style={tw`mb-6`}>
// // //           <Text style={tw`text-green-700 font-medium mb-2`}>Services Offered</Text>
// // //           <Text style={tw`text-green-600 text-sm mb-3`}>Select all services your hospital provides</Text>
// // //           <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
// // //             {availableServices.map((service) => (
// // //               <TouchableOpacity
// // //                 key={service}
// // //                 style={tw`flex-row items-center justify-between py-2 ${availableServices.indexOf(service) !== availableServices.length - 1 ? 'border-b border-green-100' : ''}`}
// // //                 onPress={() => toggleService(service)}
// // //               >
// // //                 <Text style={tw`text-green-700`}>{serviceLabels[service]}</Text>
// // //                 <View style={tw`w-5 h-5 rounded border-2 border-green-300 items-center justify-center ${profileData.org_services.includes(service) ? 'bg-green-500' : 'bg-white'}`}>
// // //                   {profileData.org_services.includes(service) && <Text style={tw`text-white text-xs font-bold`}>✓</Text>}
// // //                 </View>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </View>
// // //         </View>

// // //         {/* Save Button */}
// // //         <TouchableOpacity
// // //           style={tw`bg-green-600 rounded-lg p-4 items-center mb-6 ${saving ? 'opacity-50' : ''}`}
// // //           onPress={handleSave}
// // //           disabled={saving}
// // //         >
// // //           {saving ? (
// // //             <ActivityIndicator color="white" />
// // //           ) : (
// // //             <View style={tw`flex-row items-center`}>
// // //               <Save size={20} color="white" style={tw`mr-2`} />
// // //               <Text style={tw`text-white font-bold text-lg`}>Save Profile</Text>
// // //             </View>
// // //           )}
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default HospitalProfileScreen;



// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   ScrollView,
// //   SafeAreaView,
// //   StatusBar,
// //   Alert,
// //   ActivityIndicator,
// //   Image,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import tw from 'twrnc';
// // import { ArrowLeft, Save, Building } from 'lucide-react-native';
// // import { useUser } from './contexts/UserContext';

// // type HospitalProfileNavigationProp = NativeStackNavigationProp<any>;

// // interface HospitalProfileData {
// //   org_type: string;
// //   org_name: string;
// //   org_license: string;
// //   org_establishment: string;
// //   org_url: string;
// //   org_ambulance: boolean;
// //   org_services: string[];
// //   org_image?: string;
// //   verified_status?: boolean;
// // }

// // const HospitalProfileScreen = () => {
// //   const navigation = useNavigation<HospitalProfileNavigationProp>();
// //   const { user } = useUser();
// //   const [loading, setLoading] = useState(false);
// //   const [saving, setSaving] = useState(false);

// //   const [profileData, setProfileData] = useState<HospitalProfileData>({
// //     org_type: 'hospital',
// //     org_name: '',
// //     org_license: '',
// //     org_establishment: '',
// //     org_url: '',
// //     org_ambulance: false,
// //     org_services: [],
// //     org_image: '',
// //     verified_status: false,
// //   });

// //   const availableServices = [
// //     'physiotherapy',
// //     'psycology',
// //     'cardiology',
// //     'pediatrition',
// //   ];

// //   const serviceLabels: { [key: string]: string } = {
// //     physiotherapy: 'Physiotherapy',
// //     psycology: 'Psychology',
// //     cardiology: 'Cardiology',
// //     pediatrition: 'Pediatrics',
// //   };

// //   useEffect(() => {
// //     loadProfileData();
// //   }, []);

// //   const loadProfileData = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
// //       const data = await response.json();

// //       if (response.ok && data.userData?.organisationProfile) {
// //         const org = data.userData.organisationProfile;

// //         const services = (() => {
// //           try {
// //             return JSON.parse(org.specializations_provided);
// //           } catch {
// //             return [];
// //           }
// //         })();

// //         setProfileData({
// //           org_type: org.organisation_type || 'hospital',
// //           org_name: org.organisation_name || '',
// //           org_license: org.regestration_number || '',
// //           org_establishment: org.establishment_year
// //             ? new Date(org.establishment_year).getFullYear().toString()
// //             : '',
// //           org_url: org.website_url || '',
// //           org_ambulance: org.ambulance_available || false,
// //           org_services: services || [],
// //           org_image: org.profile_picture || '',
// //           verified_status: org.verified_status || false,
// //         });
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to fetch hospital data');
// //       }
// //     } catch (error) {
// //       console.error('Error loading profile data:', error);
// //       Alert.alert('Error', 'Failed to load profile data');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSave = async () => {
// //     if (!profileData.org_name.trim()) {
// //       Alert.alert('Error', 'Organization name is required');
// //       return;
// //     }
// //     if (!profileData.org_license.trim()) {
// //       Alert.alert('Error', 'Organization license is required');
// //       return;
// //     }
// //     if (!profileData.org_establishment.trim()) {
// //       Alert.alert('Error', 'Establishment year is required');
// //       return;
// //     }

// //     try {
// //       setSaving(true);
// //       const payload = {
// //         org_type: profileData.org_type,
// //         org_name: profileData.org_name.trim(),
// //         org_license: profileData.org_license.trim(),
// //         org_establishment: profileData.org_establishment.trim(),
// //         org_url: profileData.org_url.trim(),
// //         org_ambulance: profileData.org_ambulance,
// //         org_services: profileData.org_services,
// //       };

// //       const response = await fetch(
// //         'https://landing.docapp.co.in/api/auth/profile/complete/hospital_organisation',
// //         {
// //           method: 'PUT',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       const result = await response.json();

// //       if (response.ok) {
// //         Alert.alert('Success', 'Hospital profile updated successfully!', [
// //           { text: 'OK', onPress: () => navigation.goBack() },
// //         ]);
// //       } else {
// //         Alert.alert('Error', result.message || 'Failed to update profile');
// //       }
// //     } catch (error) {
// //       console.error('Error saving profile:', error);
// //       Alert.alert('Error', 'Failed to save profile. Please try again.');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const toggleService = (service: string) => {
// //     setProfileData((prev) => ({
// //       ...prev,
// //       org_services: prev.org_services.includes(service)
// //         ? prev.org_services.filter((s) => s !== service)
// //         : [...prev.org_services, service],
// //     }));
// //   };

// //   const toggleAmbulance = () => {
// //     setProfileData((prev) => ({
// //       ...prev,
// //       org_ambulance: !prev.org_ambulance,
// //     }));
// //   };

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
// //         <ActivityIndicator size="large" color="#16a34a" />
// //         <Text style={tw`text-green-700 mt-4`}>Loading profile...</Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// //       <StatusBar backgroundColor="#059669" barStyle="light-content" />

// //       {/* Header */}
// //       <View style={tw`bg-green-600 p-4 flex-row items-center`}>
// //         <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
// //           <ArrowLeft size={24} color="white" />
// //         </TouchableOpacity>
// //         <View>
// //           <Text style={tw`text-white text-xl font-bold`}>Hospital Profile</Text>
// //           <Text style={tw`text-green-100 text-sm`}>
// //             Complete your organization details
// //           </Text>
// //         </View>
// //       </View>

// //       <ScrollView
// //         style={tw`flex-1`}
// //         contentContainerStyle={tw`p-4`}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* Profile Picture */}
// //         {profileData.org_image ? (
// //           <View style={tw`items-center mb-6`}>
// //             <Image
// //               source={{ uri: profileData.org_image }}
// //               style={tw`w-28 h-28 rounded-full border-4 border-green-500`}
// //             />
// //             <Text style={tw`mt-2 text-green-800 font-semibold`}>
// //               {profileData.org_name || 'Hospital'}
// //             </Text>
// //             <Text style={tw`text-green-600 text-sm`}>
// //               {profileData.verified_status ? 'Verified' : 'Not Verified'}
// //             </Text>
// //           </View>
// //         ) : null}

// //         {/* Form Fields */}
// //         <Field
// //           label="Organization Type"
// //           value="Hospital"
// //           editable={false}
// //         />

// //         <InputField
// //           label="Organization Name *"
// //           placeholder="Enter organization name"
// //           value={profileData.org_name}
// //           onChangeText={(text) => setProfileData((p) => ({ ...p, org_name: text }))}
// //         />

// //         <InputField
// //           label="License Number *"
// //           placeholder="Enter license number"
// //           value={profileData.org_license}
// //           onChangeText={(text) => setProfileData((p) => ({ ...p, org_license: text }))}
// //         />

// //         <InputField
// //           label="Establishment Year *"
// //           placeholder="e.g., 1980"
// //           keyboardType="numeric"
// //           value={profileData.org_establishment}
// //           onChangeText={(text) => setProfileData((p) => ({ ...p, org_establishment: text }))}
// //         />

// //         <InputField
// //           label="Website URL"
// //           placeholder="https://example.com"
// //           keyboardType="url"
// //           value={profileData.org_url}
// //           onChangeText={(text) => setProfileData((p) => ({ ...p, org_url: text }))}
// //         />

// //         {/* Ambulance */}
// //         <View style={tw`mb-4`}>
// //           <Text style={tw`text-green-700 font-medium mb-2`}>
// //             Ambulance Service
// //           </Text>
// //           <TouchableOpacity
// //             style={tw`bg-white rounded-lg p-3 border border-green-200 flex-row items-center justify-between`}
// //             onPress={toggleAmbulance}
// //           >
// //             <Text style={tw`text-green-700`}>Available</Text>
// //             <View
// //               style={tw`w-6 h-6 rounded border-2 border-green-300 items-center justify-center ${
// //                 profileData.org_ambulance ? 'bg-green-500' : 'bg-white'
// //               }`}
// //             >
// //               {profileData.org_ambulance && (
// //                 <Text style={tw`text-white text-xs font-bold`}>✓</Text>
// //               )}
// //             </View>
// //           </TouchableOpacity>
// //         </View>

// //         {/* Services */}
// //         <View style={tw`mb-6`}>
// //           <Text style={tw`text-green-700 font-medium mb-2`}>
// //             Services Offered
// //           </Text>
// //           <Text style={tw`text-green-600 text-sm mb-3`}>
// //             Select all services your hospital provides
// //           </Text>
// //           <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
// //             {availableServices.map((service, index) => (
// //               <TouchableOpacity
// //                 key={service}
// //                 style={tw`flex-row items-center justify-between py-2 ${
// //                   index !== availableServices.length - 1
// //                     ? 'border-b border-green-100'
// //                     : ''
// //                 }`}
// //                 onPress={() => toggleService(service)}
// //               >
// //                 <Text style={tw`text-green-700`}>
// //                   {serviceLabels[service]}
// //                 </Text>
// //                 <View
// //                   style={tw`w-5 h-5 rounded border-2 border-green-300 items-center justify-center ${
// //                     profileData.org_services.includes(service)
// //                       ? 'bg-green-500'
// //                       : 'bg-white'
// //                   }`}
// //                 >
// //                   {profileData.org_services.includes(service) && (
// //                     <Text style={tw`text-white text-xs font-bold`}>✓</Text>
// //                   )}
// //                 </View>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         </View>

// //         {/* Save Button */}
// //         <TouchableOpacity
// //           style={tw`bg-green-600 rounded-lg p-4 items-center mb-6 ${
// //             saving ? 'opacity-50' : ''
// //           }`}
// //           onPress={handleSave}
// //           disabled={saving}
// //         >
// //           {saving ? (
// //             <ActivityIndicator color="white" />
// //           ) : (
// //             <View style={tw`flex-row items-center`}>
// //               <Save size={20} color="white" style={tw`mr-2`} />
// //               <Text style={tw`text-white font-bold text-lg`}>
// //                 Save Profiles
// //               </Text>
// //             </View>
// //           )}
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // // Reusable components
// // const InputField = ({ label, ...props }) => (
// //   <View style={tw`mb-4`}>
// //     <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
// //     <TextInput
// //       style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
// //       placeholderTextColor="#9ca3af"
// //       {...props}
// //     />
// //   </View>
// // );

// // const Field = ({ label, value }) => (
// //   <View style={tw`mb-4`}>
// //     <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
// //     <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
// //       <Text style={tw`text-green-700`}>{value}</Text>
// //     </View>
// //   </View>
// // );

// // export default HospitalProfileScreen;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
//   Alert,
//   ActivityIndicator,
//   Image,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import tw from 'twrnc';
// import { ArrowLeft, Save, Building, Camera } from 'lucide-react-native';
// import { useUser } from './contexts/UserContext';

// type HospitalProfileNavigationProp = NativeStackNavigationProp<any>;

// interface HospitalProfileData {
//   org_type: string;
//   org_name: string;
//   org_license: string;
//   org_establishment: string;
//   org_url: string;
//   org_ambulance: boolean;
//   org_services: string[];
//   org_image?: string;
//   verified_status?: boolean;
// }

// const HospitalProfileScreen = () => {
//   const navigation = useNavigation<HospitalProfileNavigationProp>();
//   const { user } = useUser();
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const [profileData, setProfileData] = useState<HospitalProfileData>({
//     org_type: 'hospital',
//     org_name: '',
//     org_license: '',
//     org_establishment: '',
//     org_url: '',
//     org_ambulance: false,
//     org_services: [],
//     org_image: '',
//     verified_status: false,
//   });

//   const availableServices = [
//     'physiotherapy',
//     'psycology',
//     'cardiology',
//     'pediatrition',
//   ];

//   const serviceLabels: { [key: string]: string } = {
//     physiotherapy: 'Physiotherapy',
//     psycology: 'Psychology',
//     cardiology: 'Cardiology',
//     pediatrition: 'Pediatrics',
//   };

//   useEffect(() => {
//     loadProfileData();
//   }, []);

//   const loadProfileData = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
//       const data = await response.json();

//       if (response.ok && data.userData?.organisationProfile) {
//         const org = data.userData.organisationProfile;

//         const services = (() => {
//           try {
//             return JSON.parse(org.specializations_provided);
//           } catch {
//             return [];
//           }
//         })();

//         setProfileData({
//           org_type: org.organisation_type || 'hospital',
//           org_name: org.organisation_name || '',
//           org_license: org.regestration_number || '',
//           org_establishment: org.establishment_year
//             ? new Date(org.establishment_year).getFullYear().toString()
//             : '',
//           org_url: org.website_url || '',
//           org_ambulance: org.ambulance_available || false,
//           org_services: services || [],
//           org_image: org.profile_picture || '',
//           verified_status: org.verified_status || false,
//         });
//       } else {
//         Alert.alert('Error', data.message || 'Failed to fetch hospital data');
//       }
//     } catch (error) {
//       console.error('Error loading profile data:', error);
//       Alert.alert('Error', 'Failed to load profile data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------------
//   // ✅ IMAGE UPLOAD FUNCTION (Newly Added)
//   // ---------------------------------------------------------
//   const handleImageUpload = async () => {
//     try {
//       const result = await launchImageLibrary({
//         mediaType: 'photo',
//         quality: 0.7,
//       });

//       if (result.didCancel) return;

//       const image = result.assets?.[0];
//       if (!image) return;

//       setUploading(true);

//       // CREATE FORM DATA
//       const formData = new FormData();
//       formData.append('profile_picture', {
//         uri: image.uri,
//         name: image.fileName || 'hospital.jpg',
//         type: image.type || 'image/jpeg',
//       } as any);

//       const uploadResponse = await fetch(
//         'https://landing.docapp.co.in/api/auth/profile/update/profile-picture/organisation',
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//           body: formData,
//         }
//       );

//       const uploadResult = await uploadResponse.json();

//       if (uploadResponse.ok) {
//         Alert.alert('Success', 'Profile picture updated!');
//         setProfileData((p) => ({
//           ...p,
//           org_image: uploadResult.profile_picture,
//         }));
//       } else {
//         Alert.alert('Error', uploadResult.message || 'Failed to upload image');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Error', 'Image upload failed');
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ---------------------------------------------------------
//   // SAVE PROFILE
//   // ---------------------------------------------------------
//   const handleSave = async () => {
//     if (!profileData.org_name.trim()) {
//       Alert.alert('Error', 'Organization name is required');
//       return;
//     }
//     if (!profileData.org_license.trim()) {
//       Alert.alert('Error', 'Organization license is required');
//       return;
//     }
//     if (!profileData.org_establishment.trim()) {
//       Alert.alert('Error', 'Establishment year is required');
//       return;
//     }

//     try {
//       setSaving(true);
//       const payload = {
//         org_type: profileData.org_type,
//         org_name: profileData.org_name.trim(),
//         org_license: profileData.org_license.trim(),
//         org_establishment: profileData.org_establishment.trim(),
//         org_url: profileData.org_url.trim(),
//         org_ambulance: profileData.org_ambulance,
//         org_services: profileData.org_services,
//       };

//       const response = await fetch(
//         'https://landing.docapp.co.in/api/auth/profile/complete/hospital_organisation',
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', 'Hospital profile updated successfully!', [
//           { text: 'OK', onPress: () => navigation.goBack() },
//         ]);
//       } else {
//         Alert.alert('Error', result.message || 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error saving profile:', error);
//       Alert.alert('Error', 'Failed to save profile. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const toggleService = (service: string) => {
//     setProfileData((prev) => ({
//       ...prev,
//       org_services: prev.org_services.includes(service)
//         ? prev.org_services.filter((s) => s !== service)
//         : [...prev.org_services, service],
//     }));
//   };

//   const toggleAmbulance = () => {
//     setProfileData((prev) => ({
//       ...prev,
//       org_ambulance: !prev.org_ambulance,
//     }));
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#16a34a" />
//         <Text style={tw`text-green-700 mt-4`}>Loading profile...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="transparent" barStyle="light-content" />

//       <View style={tw`bg-green-600 p-4 pt-8 flex-row items-center`}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
//           <ArrowLeft size={24} color="white" />
//         </TouchableOpacity>
//         <View>
//           <Text style={tw`text-white text-xl font-bold`}>Hospital Profile</Text>
//           <Text style={tw`text-green-100 text-sm`}>
//             Complete your organization details
//           </Text>
//         </View>
//       </View>


//       {/* <View style={tw`bg-green-600 p-4 pt-8 flex-row items-center`}>
//   <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
//     <ArrowLeft size={24} color="white" />
//   </TouchableOpacity>
//   <View>
//     <Text style={tw`text-white text-xl font-bold`}>Hospital Profile</Text>
//     <Text style={tw`text-green-100 text-sm`}>
//       Complete your organization details
//     </Text>
//   </View>
// </View> */}

//       <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4`}>
        
//         {/* IMAGE UPLOAD */}
//         <TouchableOpacity
//           onPress={handleImageUpload}
//           style={tw`items-center mb-6`}
//           disabled={uploading}
//         >
//           <Image
//             source={{
//               uri:
//                 profileData.org_image ||
//                 'https://via.placeholder.com/150/16a34a/ffffff?text=Upload',
//             }}
//             style={tw`w-28 h-28 rounded-full border-4 border-green-500`}
//           />
//           <View style={tw`mt-3 bg-green-600 p-2 rounded-full flex-row items-center`}>
//             <Camera size={18} color="white" />
//             <Text style={tw`text-white ml-2`}>
//               {uploading ? 'Uploading...' : 'Change Photo'}
//             </Text>
//           </View>
//         </TouchableOpacity>

//         {/* REST OF YOUR CODE (UNCHANGED) */}

//         <Field label="Organization Type" value="Hospital" />

//         <InputField
//           label="Organization Name *"
//           placeholder="Enter organization name"
//           value={profileData.org_name}
//           onChangeText={(text) =>
//             setProfileData((p) => ({ ...p, org_name: text }))
//           }
//         />

//         <InputField
//           label="License Number *"
//           placeholder="Enter license number"
//           value={profileData.org_license}
//           onChangeText={(text) =>
//             setProfileData((p) => ({ ...p, org_license: text }))
//           }
//         />

//         <InputField
//           label="Establishment Year *"
//           placeholder="e.g., 1980"
//           keyboardType="numeric"
//           value={profileData.org_establishment}
//           onChangeText={(text) =>
//             setProfileData((p) => ({ ...p, org_establishment: text }))
//           }
//         />

//         <InputField
//           label="Website URL"
//           placeholder="https://example.com"
//           value={profileData.org_url}
//           onChangeText={(text) =>
//             setProfileData((p) => ({ ...p, org_url: text }))
//           }
//         />

//         <View style={tw`mb-4`}>
//           <Text style={tw`text-green-700 font-medium mb-2`}>
//             Ambulance Service
//           </Text>
//           <TouchableOpacity
//             style={tw`bg-white rounded-lg p-3 border border-green-200 flex-row items-center justify-between`}
//             onPress={toggleAmbulance}
//           >
//             <Text style={tw`text-green-700`}>Available</Text>
//             <View
//               style={tw`w-6 h-6 rounded border-2 border-green-300 items-center justify-center ${
//                 profileData.org_ambulance ? 'bg-green-500' : 'bg-white'
//               }`}
//             >
//               {profileData.org_ambulance && (
//                 <Text style={tw`text-white text-xs font-bold`}>✓</Text>
//               )}
//             </View>
//           </TouchableOpacity>
//         </View>

//         <View style={tw`mb-6`}>
//           <Text style={tw`text-green-700 font-medium mb-2`}>
//             Services Offered
//           </Text>
//           <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
//             {availableServices.map((service, index) => (
//               <TouchableOpacity
//                 key={service}
//                 style={tw`flex-row items-center justify-between py-2 ${
//                   index !== availableServices.length - 1
//                     ? 'border-b border-green-100'
//                     : ''
//                 }`}
//                 onPress={() => toggleService(service)}
//               >
//                 <Text style={tw`text-green-700`}>
//                   {serviceLabels[service]}
//                 </Text>
//                 <View
//                   style={tw`w-5 h-5 rounded border-2 border-green-300 items-center justify-center ${
//                     profileData.org_services.includes(service)
//                       ? 'bg-green-500'
//                       : 'bg-white'
//                   }`}
//                 >
//                   {profileData.org_services.includes(service) && (
//                     <Text style={tw`text-white text-xs font-bold`}>✓</Text>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity
//           style={tw`bg-green-600 rounded-lg p-4 items-center mb-6 ${
//             saving ? 'opacity-50' : ''
//           }`}
//           onPress={handleSave}
//           disabled={saving}
//         >
//           {saving ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <View style={tw`flex-row items-center`}>
//               <Save size={20} color="white" style={tw`mr-2`} />
//               <Text style={tw`text-white font-bold text-lg`}>
//                 Save Profile
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// // Reusable components
// const InputField = ({ label, ...props }) => (
//   <View style={tw`mb-4`}>
//     <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
//     <TextInput
//       style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-700`}
//       placeholderTextColor="#9ca3af"
//       {...props}
//     />
//   </View>
// );

// const Field = ({ label, value }) => (
//   <View style={tw`mb-4`}>
//     <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
//     <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
//       <Text style={tw`text-green-700`}>{value}</Text>
//     </View>
//   </View>
// );

// export default HospitalProfileScreen;




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { ArrowLeft, Save, Camera, MapPin, Building2, Plus, Trash } from 'lucide-react-native';
import { useUser } from './contexts/UserContext';
import { useAccessToken } from './contexts/AccessTokenContext';

// ======================= API CONSTANTS =======================
const API_BASE = 'https://landing.docapp.co.in';
const API_GET_USER = `${API_BASE}/api/auth/get-user-data`;
const API_PROFILE_UPDATE = `${API_BASE}/api/auth/profile/complete/hospital_organisation`;
const API_IMAGE_UPDATE = `${API_BASE}/api/auth/profile/update/profile-picture/organisation`;
const API_ADD_ADDRESS = `${API_BASE}/api/address/addAddress`;
const API_GET_ALL_ADDRESS = `${API_BASE}/api/address/getAllAddress`;
const API_DELETE_PROFILE_PIC = `${API_BASE}/api/auth/delete-profile-pic`;

type HospitalProfileNavigationProp = NativeStackNavigationProp<any>;

// ======================= TYPES =======================

interface HospitalProfileData {
  org_type: string;
  org_name: string;
  org_license: string;
  org_establishment: string;
  org_url: string;
  org_ambulance: boolean;
  org_services: string[];
  org_image?: string;
  verified_status?: boolean;
}

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
  active: boolean;
}

const HospitalProfileScreen = () => {
  const navigation = useNavigation<HospitalProfileNavigationProp>();
  const { user } = useUser();
  const { accessToken } = useAccessToken();
  
  // 🔀 Tab State
  const [activeTab, setActiveTab] = useState<'profile' | 'address'>('profile');

  // Loading States
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);

  // 📝 Profile Data State
  const [profileData, setProfileData] = useState<HospitalProfileData>({
    org_type: 'hospital',
    org_name: '',
    org_license: '',
    org_establishment: '',
    org_url: '',
    org_ambulance: false,
    org_services: [],
    org_image: '',
    verified_status: false,
  });

  // 📍 Address Data State
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const availableServices = [
    'physiotherapy',
    'psycology',
    'cardiology',
    'pediatrition',
  ];

  const serviceLabels: { [key: string]: string } = {
    physiotherapy: 'Physiotherapy',
    psycology: 'Psychology',
    cardiology: 'Cardiology',
    pediatrition: 'Pediatrics',
  };

  // ======================= USE EFFECTS =======================
  useEffect(() => {
    loadProfileData();
  }, []);

  useEffect(() => {
    if (activeTab === 'address') {
      fetchAddresses();
    }
  }, [activeTab]);

  // ======================= FETCH PROFILE =======================
  const loadProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_GET_USER, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();

      if (response.ok && data.userData?.organisationProfile) {
        const org = data.userData.organisationProfile;

        const services = (() => {
          try {
            return JSON.parse(org.specializations_provided);
          } catch {
            return [];
          }
        })();

        setProfileData({
          org_type: org.organisation_type || 'hospital',
          org_name: org.organisation_name || '',
          org_license: org.regestration_number || '',
          org_establishment: org.establishment_year
            ? new Date(org.establishment_year).getFullYear().toString()
            : '',
          org_url: org.website_url || '',
          org_ambulance: org.ambulance_available || false,
          org_services: services || [],
          org_image: org.profile_picture || '',
          verified_status: org.verified_status || false,
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch hospital data');
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // ======================= FETCH ADDRESSES =======================
  const fetchAddresses = async () => {
    try {
      setAddressLoading(true);
      const response = await fetch(API_GET_ALL_ADDRESS, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      
      if (response.ok && data.addresses) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setAddressLoading(false);
    }
  };

  // ======================= ADD ADDRESS =======================
  const handleAddAddress = async () => {
    if (!addressForm.street || !addressForm.city || !addressForm.state || !addressForm.pincode) {
      Alert.alert('Missing Fields', 'Please fill in all address fields.');
      return;
    }

    try {
      setAddressLoading(true);
      const payload = {
        street: addressForm.street,
        city: addressForm.city,
        state: addressForm.state,
        pincode: addressForm.pincode
      };

      const response = await fetch(API_ADD_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Address added successfully!');
        setAddressForm({ street: '', city: '', state: '', pincode: '' }); // Reset form
        fetchAddresses(); // Refresh list
      } else {
        Alert.alert('Error', data.message || 'Failed to add address');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setAddressLoading(false);
    }
  };

  // ======================= IMAGE UPLOAD =======================
  const handleImageUpload = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });

      if (result.didCancel || !result.assets?.[0]) return;
      const image = result.assets[0];

      setUploading(true);

      const formData = new FormData();
      formData.append('image', {
        uri: image.uri,
        name: image.fileName || 'hospital.jpg',
        type: image.type || 'image/jpeg',
      } as any);

      const uploadResponse = await fetch('https://landing.docapp.co.in/api/auth/upload-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (uploadResponse.ok) {
        Alert.alert('Success', 'Profile picture updated!');
        setProfileData((p) => ({ ...p, org_image: uploadResult.profile_picture || uploadResult.image_url }));
      } else {
        Alert.alert('Error', uploadResult.message || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  // ======================= DELETE PROFILE PIC =======================
  const handleDeleteProfilePic = async () => {
    Alert.alert(
      'Delete Profile Picture',
      'Are you sure you want to delete your profile picture?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(API_DELETE_PROFILE_PIC, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
              });
              const result = await response.json();

              if (response.ok) {
                Alert.alert('Success', 'Profile picture deleted!');
                setProfileData((p) => ({ ...p, org_image: '' }));
              } else {
                Alert.alert('Error', result.message || 'Failed to delete profile picture');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Failed to delete profile picture');
            }
          },
        },
      ]
    );
  };

  // ======================= SAVE PROFILE =======================
  const handleSave = async () => {
    if (!profileData.org_name.trim() || !profileData.org_license.trim() || !profileData.org_establishment.trim()) {
      Alert.alert('Error', 'Please fill in required fields');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        org_type: profileData.org_type,
        org_name: profileData.org_name.trim(),
        org_license: profileData.org_license.trim(),
        org_establishment: profileData.org_establishment.trim(),
        org_url: profileData.org_url.trim(),
        org_ambulance: profileData.org_ambulance,
        org_services: profileData.org_services,
      };

      const response = await fetch(API_PROFILE_UPDATE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Hospital profile updated successfully!');
      } else {
        Alert.alert('Error', result.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  // Helper toggles
  const toggleService = (service: string) => {
    setProfileData((prev) => ({
      ...prev,
      org_services: prev.org_services.includes(service)
        ? prev.org_services.filter((s) => s !== service)
        : [...prev.org_services, service],
    }));
  };

  const toggleAmbulance = () => {
    setProfileData((prev) => ({ ...prev, org_ambulance: !prev.org_ambulance }));
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-green-50 justify-center items-center`}>
        <ActivityIndicator size="large" color="#16a34a" />
        <Text style={tw`text-green-700 mt-4`}>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 p-4 pt-8 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>Hospital Settings</Text>
          <Text style={tw`text-green-100 text-sm`}>Manage details & locations</Text>
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tw`flex-1`}>
        <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-4 pb-10`}>

          {/* 🔀 Custom Tab Switcher */}
          <View style={tw`flex-row bg-white rounded-lg p-1 mb-6 border border-green-200`}>
            <TouchableOpacity 
              onPress={() => setActiveTab('profile')}
              style={tw`flex-1 py-3 rounded-md items-center ${activeTab === 'profile' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold ${activeTab === 'profile' ? 'text-white' : 'text-gray-500'}`}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => setActiveTab('address')}
              style={tw`flex-1 py-3 rounded-md items-center ${activeTab === 'address' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold ${activeTab === 'address' ? 'text-white' : 'text-gray-500'}`}>Address</Text>
            </TouchableOpacity>
          </View>

          {/* ============================================================================
                                       VIEW 1: PROFILE
          ============================================================================ */}
          {activeTab === 'profile' && (
            <>
              {/* Image Upload */}
              <TouchableOpacity
                onPress={handleImageUpload}
                style={tw`items-center mb-6`}
                disabled={uploading}
              >
                <Image
                  source={{
                    uri: profileData.org_image || 'https://via.placeholder.com/150/16a34a/ffffff?text=Upload',
                  }}
                  style={tw`w-28 h-28 rounded-full border-4 border-green-500`}
                />
                <View style={tw`mt-3 flex-row items-center`}>
                  <TouchableOpacity
                    onPress={handleImageUpload}
                    style={tw`bg-green-600 p-2 rounded-full flex-row items-center mr-2`}
                    disabled={uploading}
                  >
                    <Camera size={18} color="white" />
                    <Text style={tw`text-white ml-2`}>
                      {uploading ? 'Uploading...' : 'Change Photo'}
                    </Text>
                  </TouchableOpacity>
                  {profileData.org_image ? (
                    <TouchableOpacity
                      onPress={handleDeleteProfilePic}
                      style={tw`bg-red-600 p-2 rounded-full flex-row items-center`}
                    >
                      <Trash size={18} color="white" />
                      <Text style={tw`text-white ml-2`}>Delete</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </TouchableOpacity>

              <Field label="Organization Type" value="Hospital" />

              <InputField
                label="Organization Name *"
                placeholder="Enter organization name"
                value={profileData.org_name}
                onChangeText={(text: string) => setProfileData((p) => ({ ...p, org_name: text }))}
              />

              <InputField
                label="License Number *"
                placeholder="Enter license number"
                value={profileData.org_license}
                onChangeText={(text: string) => setProfileData((p) => ({ ...p, org_license: text }))}
              />

              <InputField
                label="Establishment Year *"
                placeholder="e.g., 1980"
                keyboardType="numeric"
                value={profileData.org_establishment}
                onChangeText={(text: string) => setProfileData((p) => ({ ...p, org_establishment: text }))}
              />

              <InputField
                label="Website URL"
                placeholder="https://example.com"
                value={profileData.org_url}
                onChangeText={(text: string) => setProfileData((p) => ({ ...p, org_url: text }))}
              />

              {/* Ambulance Toggle */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-green-700 font-medium mb-2`}>Ambulance Service</Text>
                <TouchableOpacity
                  style={tw`bg-white rounded-lg p-3 border border-green-200 flex-row items-center justify-between`}
                  onPress={toggleAmbulance}
                >
                  <Text style={tw`text-green-700`}>Available</Text>
                  <View style={tw`w-6 h-6 rounded border-2 border-green-300 items-center justify-center ${profileData.org_ambulance ? 'bg-green-500' : 'bg-white'}`}>
                    {profileData.org_ambulance && <Text style={tw`text-white text-xs font-bold`}>✓</Text>}
                  </View>
                </TouchableOpacity>
              </View>

              {/* Services List */}
              <View style={tw`mb-6`}>
                <Text style={tw`text-green-700 font-medium mb-2`}>Services Offered</Text>
                <View style={tw`bg-white rounded-lg p-3 border border-green-200`}>
                  {availableServices.map((service, index) => (
                    <TouchableOpacity
                      key={service}
                      style={tw`flex-row items-center justify-between py-2 ${index !== availableServices.length - 1 ? 'border-b border-green-100' : ''}`}
                      onPress={() => toggleService(service)}
                    >
                      <Text style={tw`text-green-700`}>{serviceLabels[service]}</Text>
                      <View style={tw`w-5 h-5 rounded border-2 border-green-300 items-center justify-center ${profileData.org_services.includes(service) ? 'bg-green-500' : 'bg-white'}`}>
                        {profileData.org_services.includes(service) && <Text style={tw`text-white text-xs font-bold`}>✓</Text>}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={tw`bg-green-600 rounded-lg p-4 items-center mb-6 ${saving ? 'opacity-50' : ''}`}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <View style={tw`flex-row items-center`}>
                    <Save size={20} color="white" style={tw`mr-2`} />
                    <Text style={tw`text-white font-bold text-lg`}>Save Profile</Text>
                  </View>
                )}
              </TouchableOpacity>
            </>
          )}

          {/* ============================================================================
                                       VIEW 2: ADDRESS
          ============================================================================ */}
          {activeTab === 'address' && (
            <>
              {/* Existing Addresses List */}
              <View style={tw`bg-white rounded-xl p-5 shadow-sm mb-5 border border-green-100`}>
                <Text style={tw`text-lg font-bold text-green-800 mb-4 flex-row items-center`}>
                  <Building2 size={20} color="#166534" /> Saved Locations
                </Text>
                
                {addressLoading && addresses.length === 0 ? (
                   <ActivityIndicator color="green" />
                ) : addresses.length === 0 ? (
                  <Text style={tw`text-gray-500 italic`}>No addresses added yet.</Text>
                ) : (
                  addresses.map((addr) => (
                    <View key={addr.id} style={tw`border-b border-green-100 py-3 flex-row`}>
                      <MapPin size={20} color="#16a34a" style={tw`mt-1 mr-2`} />
                      <View>
                        <Text style={tw`font-bold text-green-900`}>{addr.street}</Text>
                        <Text style={tw`text-gray-600`}>{addr.city}, {addr.state} - {addr.pincode}</Text>
                      </View>
                    </View>
                  ))
                )}
              </View>

              {/* Add Address Form */}
              <View style={tw`bg-white rounded-xl p-5 shadow-sm border border-green-100`}>
                <Text style={tw`text-lg font-bold text-green-800 mb-2`}>Add New Location</Text>
                <Text style={tw`text-gray-500 text-sm mb-4`}>Where is your hospital branch located?</Text>

                <InputField
                  label="Street / Area"
                  placeholder="e.g. MG Road, Near Park"
                  value={addressForm.street}
                  onChangeText={(t: string) => setAddressForm({ ...addressForm, street: t })}
                />

                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-1 mr-2`}>
                    <InputField
                      label="City"
                      placeholder="e.g. Mumbai"
                      value={addressForm.city}
                      onChangeText={(t: string) => setAddressForm({ ...addressForm, city: t })}
                    />
                  </View>
                  <View style={tw`flex-1 ml-2`}>
                    <InputField
                      label="Pincode"
                      placeholder="e.g. 400001"
                      value={addressForm.pincode}
                      keyboardType="number-pad"
                      onChangeText={(t: string) => setAddressForm({ ...addressForm, pincode: t })}
                    />
                  </View>
                </View>

                <InputField
                  label="State"
                  placeholder="e.g. Maharashtra"
                  value={addressForm.state}
                  onChangeText={(t: string) => setAddressForm({ ...addressForm, state: t })}
                />

                <TouchableOpacity 
                  style={tw`bg-green-600 rounded-lg p-4 items-center mt-2 flex-row justify-center`} 
                  onPress={handleAddAddress}
                  disabled={addressLoading}
                >
                  {addressLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Plus size={20} color="white" style={tw`mr-2`} />
                      <Text style={tw`text-white font-bold text-lg`}>Add Address</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ======================= REUSABLE COMPONENTS =======================

const InputField = ({ label, style, ...props }: any) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
    <TextInput
      style={tw`bg-white rounded-lg p-3 border border-green-200 text-green-900 ${style}`}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  </View>
);

const Field = ({ label, value }: any) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-green-700 font-medium mb-2`}>{label}</Text>
    <View style={tw`bg-gray-50 rounded-lg p-3 border border-gray-200`}>
      <Text style={tw`text-gray-700`}>{value}</Text>
    </View>
  </View>
);

export default HospitalProfileScreen;