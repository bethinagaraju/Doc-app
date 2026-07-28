// // // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // // import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // // // // // // // // // // // import { Plus, Medal, Star, Brain, Heart, Activity, Stethoscope } from 'lucide-react-native';
// // // // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';
// // // // // // // // // // // // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // // // // // // // // // // // import { DoctorStackParamList } from '../types/navigation';
// // // // // // // // // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // // // // // // // // import tw from 'twrnc';

// // // // // // // // // // // // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // // // // // // // // // // // interface Specialization {
// // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // //   icon: React.ReactNode;
// // // // // // // // // // // // // //   years: number;
// // // // // // // // // // // // // //   expertise: string[];
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // // // // // // //   const navigation = useNavigation<DoctorNavigationProp>();

// // // // // // // // // // // // // //   const specializations: Specialization[] = [
// // // // // // // // // // // // // //     {
// // // // // // // // // // // // // //       title: 'Cardiology',
// // // // // // // // // // // // // //       icon: <Heart size={24} color="#16a34a" />,
// // // // // // // // // // // // // //       years: 10,
// // // // // // // // // // // // // //       expertise: ['Interventional Cardiology', 'Heart Failure Management'],
// // // // // // // // // // // // // //     },
// // // // // // // // // // // // // //     {
// // // // // // // // // // // // // //       title: 'Internal Medicine',
// // // // // // // // // // // // // //       icon: <Stethoscope size={24} color="#16a34a" />,
// // // // // // // // // // // // // //       years: 12,
// // // // // // // // // // // // // //       expertise: ['General Medicine', 'Preventive Care'],
// // // // // // // // // // // // // //     },    {
// // // // // // // // // // // // // //       title: 'Critical Care',
// // // // // // // // // // // // // //       icon: <Activity size={24} color="#16a34a" />,
// // // // // // // // // // // // // //       years: 8,
// // // // // // // // // // // // // //       expertise: ['ICU Management', 'Emergency Medicine'],
// // // // // // // // // // // // // //     },
// // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // //   const certifications = [
// // // // // // // // // // // // // //     'American Board of Cardiology',
// // // // // // // // // // // // // //     'Fellowship in Interventional Cardiology',
// // // // // // // // // // // // // //     'Advanced Cardiac Life Support (ACLS)',
// // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // //   const handleSaveChanges = () => {
// // // // // // // // // // // // // //     // Logic to save changes
// // // // // // // // // // // // // //     Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{ 
// // // // // // // // // // // // // //       text: 'OK',
// // // // // // // // // // // // // //       onPress: () => navigation.goBack()
// // // // // // // // // // // // // //     }]);
// // // // // // // // // // // // // //   };
// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <View style={tw`flex-1 bg-green-50`}>
// // // // // // // // // // // // // //       <DoctorHeader title="Specializations" showSettings showNotifications />
// // // // // // // // // // // // // //       <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
// // // // // // // // // // // // // //         <TouchableOpacity 
// // // // // // // // // // // // // //           style={tw`bg-emerald-500 p-2 rounded-full`} 
// // // // // // // // // // // // // //           activeOpacity={0.85}
// // // // // // // // // // // // // //           onPress={() => navigation.navigate('AddSpecialization')}
// // // // // // // // // // // // // //         >
// // // // // // // // // // // // // //           <Plus size={20} color="white" />
// // // // // // // // // // // // // //         </TouchableOpacity>
// // // // // // // // // // // // // //       </View>

// // // // // // // // // // // // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // // // // // // // // // // // //         <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
// // // // // // // // // // // // // //         <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

// // // // // // // // // // // // // //         {specializations.map((spec, idx) => (
// // // // // // // // // // // // // //           <View key={idx} style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // // // // // // //             <View style={tw`flex-row items-center mb-3`}>
// // // // // // // // // // // // // //               {spec.icon}
// // // // // // // // // // // // // //               <View style={tw`ml-3 flex-1`}>
// // // // // // // // // // // // // //                 <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
// // // // // // // // // // // // // //                 <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
// // // // // // // // // // // // // //               </View>              <TouchableOpacity 
// // // // // // // // // // // // // //                 style={tw`bg-green-100 p-2 rounded-full`}
// // // // // // // // // // // // // //                 onPress={() => Alert.alert('Primary Specialization', 'Mark this as your primary specialization?', [
// // // // // // // // // // // // // //                   { text: 'Cancel', style: 'cancel' },
// // // // // // // // // // // // // //                   { text: 'Set as Primary', style: 'default' }
// // // // // // // // // // // // // //                 ])}
// // // // // // // // // // // // // //               >
// // // // // // // // // // // // // //                 <Star size={20} color="#1d9be3" />
// // // // // // // // // // // // // //               </TouchableOpacity>
// // // // // // // // // // // // // //             </View>
// // // // // // // // // // // // // //             <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
// // // // // // // // // // // // // //             {spec.expertise.map((exp, i) => (
// // // // // // // // // // // // // //               <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
// // // // // // // // // // // // // //             ))}
// // // // // // // // // // // // // //           </View>
// // // // // // // // // // // // // //         ))}

// // // // // // // // // // // // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // // // // // // //           <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
// // // // // // // // // // // // // //           {certifications.map((cert, idx) => (
// // // // // // // // // // // // // //             <View key={idx} style={tw`flex-row items-center mb-2`}>
// // // // // // // // // // // // // //               <Medal size={16} color="#1d9be3" />
// // // // // // // // // // // // // //               <Text style={tw`text-gray-600 ml-2`}>{cert}</Text>
// // // // // // // // // // // // // //             </View>
// // // // // // // // // // // // // //           ))}
// // // // // // // // // // // // // //         </View>

// // // // // // // // // // // // // //         <TouchableOpacity
// // // // // // // // // // // // // //           style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
// // // // // // // // // // // // // //           activeOpacity={0.85}
// // // // // // // // // // // // // //           onPress={handleSaveChanges}
// // // // // // // // // // // // // //         >
// // // // // // // // // // // // // //           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
// // // // // // // // // // // // // //         </TouchableOpacity>
// // // // // // // // // // // // // //       </ScrollView>
// // // // // // // // // // // // // //     </View>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default SpecializationsScreen;

// // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // // // // // // // // // // import { Plus, Medal, Star, Heart, Stethoscope, Activity } from 'lucide-react-native';
// // // // // // // // // // // // // import { useNavigation } from '@react-navigation/native';
// // // // // // // // // // // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // // // // // // // // // // import { DoctorStackParamList } from '../types/navigation';
// // // // // // // // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // // // // // // // import tw from 'twrnc';

// // // // // // // // // // // // // // --- TYPE DEFINITIONS ---
// // // // // // // // // // // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // // // // // // // // // // interface Specialization {
// // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // //   icon: React.ReactNode;
// // // // // // // // // // // // //   years: number;
// // // // // // // // // // // // //   expertise: string[];
// // // // // // // // // // // // //   isPrimary: boolean;
// // // // // // // // // // // // // }

// // // // // // // // // // // // // // --- MOCK INITIAL DATA (In a real app, this would come from an API) ---
// // // // // // // // // // // // // const initialSpecializations: Specialization[] = [
// // // // // // // // // // // // //   {
// // // // // // // // // // // // //     id: 'spec_1',
// // // // // // // // // // // // //     title: 'Cardiology',
// // // // // // // // // // // // //     icon: <Heart size={24} color="#16a34a" />,
// // // // // // // // // // // // //     years: 10,
// // // // // // // // // // // // //     expertise: ['Interventional Cardiology', 'Heart Failure Management'],
// // // // // // // // // // // // //     isPrimary: true,
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   {
// // // // // // // // // // // // //     id: 'spec_2',
// // // // // // // // // // // // //     title: 'Internal Medicine',
// // // // // // // // // // // // //     icon: <Stethoscope size={24} color="#16a34a" />,
// // // // // // // // // // // // //     years: 12,
// // // // // // // // // // // // //     expertise: ['General Medicine', 'Preventive Care'],
// // // // // // // // // // // // //     isPrimary: false,
// // // // // // // // // // // // //   },
// // // // // // // // // // // // //   {
// // // // // // // // // // // // //     id: 'spec_3',
// // // // // // // // // // // // //     title: 'Critical Care',
// // // // // // // // // // // // //     icon: <Activity size={24} color="#16a34a" />,
// // // // // // // // // // // // //     years: 8,
// // // // // // // // // // // // //     expertise: ['ICU Management', 'Emergency Medicine'],
// // // // // // // // // // // // //     isPrimary: false,
// // // // // // // // // // // // //   },
// // // // // // // // // // // // // ];

// // // // // // // // // // // // // const initialCertifications = [
// // // // // // // // // // // // //   { id: 'cert_1', text: 'American Board of Cardiology' },
// // // // // // // // // // // // //   { id: 'cert_2', text: 'Fellowship in Interventional Cardiology' },
// // // // // // // // // // // // //   { id: 'cert_3', text: 'Advanced Cardiac Life Support (ACLS)' },
// // // // // // // // // // // // // ];


// // // // // // // // // // // // // // --- REUSABLE CARD COMPONENTS ---

// // // // // // // // // // // // // // Card for displaying a single specialization
// // // // // // // // // // // // // const SpecializationCard = ({ spec, onSetPrimary }: { spec: Specialization; onSetPrimary: (id: string) => void; }) => (
// // // // // // // // // // // // //   <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // // // // // //     <View style={tw`flex-row items-center mb-3`}>
// // // // // // // // // // // // //       {spec.icon}
// // // // // // // // // // // // //       <View style={tw`ml-3 flex-1`}>
// // // // // // // // // // // // //         <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
// // // // // // // // // // // // //         <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
// // // // // // // // // // // // //       </View>
// // // // // // // // // // // // //       <TouchableOpacity
// // // // // // // // // // // // //         style={tw`bg-green-100 p-2 rounded-full`}
// // // // // // // // // // // // //         onPress={() => onSetPrimary(spec.id)}
// // // // // // // // // // // // //       >
// // // // // // // // // // // // //         <Star size={20} color={spec.isPrimary ? '#f59e0b' : '#a3a3a3'} />
// // // // // // // // // // // // //       </TouchableOpacity>
// // // // // // // // // // // // //     </View>
// // // // // // // // // // // // //     <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
// // // // // // // // // // // // //     {spec.expertise.map((exp, i) => (
// // // // // // // // // // // // //       <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
// // // // // // // // // // // // //     ))}
// // // // // // // // // // // // //   </View>
// // // // // // // // // // // // // );

// // // // // // // // // // // // // // Card for displaying certifications
// // // // // // // // // // // // // const CertificationsCard = ({ certifications }: { certifications: {id: string, text: string}[] }) => (
// // // // // // // // // // // // //   <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // // // // // //     <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
// // // // // // // // // // // // //     {certifications.map((cert) => (
// // // // // // // // // // // // //       <View key={cert.id} style={tw`flex-row items-center mb-2`}>
// // // // // // // // // // // // //         <Medal size={16} color="#1d9be3" />
// // // // // // // // // // // // //         <Text style={tw`text-gray-600 ml-2`}>{cert.text}</Text>
// // // // // // // // // // // // //       </View>
// // // // // // // // // // // // //     ))}
// // // // // // // // // // // // //   </View>
// // // // // // // // // // // // // );


// // // // // // // // // // // // // // --- MAIN SCREEN COMPONENT ---

// // // // // // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // // // // // //   const navigation = useNavigation<DoctorNavigationProp>();

// // // // // // // // // // // // //   // --- STATE MANAGEMENT ---
// // // // // // // // // // // // //   const [specializations, setSpecializations] = useState<Specialization[]>(initialSpecializations);
// // // // // // // // // // // // //   const [certifications, setCertifications] = useState(initialCertifications);

// // // // // // // // // // // // //   // --- HANDLER FUNCTIONS ---
// // // // // // // // // // // // //   const handleSetPrimary = (id: string) => {
// // // // // // // // // // // // //     Alert.alert(
// // // // // // // // // // // // //       'Primary Specialization',
// // // // // // // // // // // // //       'Mark this as your primary specialization?',
// // // // // // // // // // // // //       [
// // // // // // // // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // // // // // // // //         { 
// // // // // // // // // // // // //           text: 'Set as Primary', 
// // // // // // // // // // // // //           style: 'default',
// // // // // // // // // // // // //           onPress: () => {
// // // // // // // // // // // // //             const updatedSpecs = specializations.map(spec => ({
// // // // // // // // // // // // //               ...spec,
// // // // // // // // // // // // //               isPrimary: spec.id === id,
// // // // // // // // // // // // //             }));
// // // // // // // // // // // // //             setSpecializations(updatedSpecs);
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       ]
// // // // // // // // // // // // //     );
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleSaveChanges = () => {
// // // // // // // // // // // // //     // In a real app, this is where you would make an API call to your backend
// // // // // // // // // // // // //     // to save the updated `specializations` and `certifications` state.
// // // // // // // // // // // // //     // e.g., api.updateDoctorProfile({ specializations, certifications });

// // // // // // // // // // // // //     Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{
// // // // // // // // // // // // //       text: 'OK',
// // // // // // // // // // // // //       onPress: () => navigation.goBack()
// // // // // // // // // // // // //     }]);
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <View style={tw`flex-1 bg-green-50`}>
// // // // // // // // // // // // //       <DoctorHeader title="Specializations" showSettings showNotifications />

// // // // // // // // // // // // //       <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
// // // // // // // // // // // // //         <TouchableOpacity
// // // // // // // // // // // // //           style={tw`bg-emerald-500 p-2 rounded-full`}
// // // // // // // // // // // // //           activeOpacity={0.85}
// // // // // // // // // // // // //           onPress={() => navigation.navigate('AddSpecialization')}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           <Plus size={20} color="white" />
// // // // // // // // // // // // //         </TouchableOpacity>
// // // // // // // // // // // // //       </View>

// // // // // // // // // // // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // // // // // // // // // // //         <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
// // // // // // // // // // // // //         <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

// // // // // // // // // // // // //         {specializations.map((spec) => (
// // // // // // // // // // // // //           <SpecializationCard 
// // // // // // // // // // // // //             key={spec.id} 
// // // // // // // // // // // // //             spec={spec} 
// // // // // // // // // // // // //             onSetPrimary={handleSetPrimary} 
// // // // // // // // // // // // //           />
// // // // // // // // // // // // //         ))}

// // // // // // // // // // // // //         <CertificationsCard certifications={certifications} />

// // // // // // // // // // // // //         <TouchableOpacity
// // // // // // // // // // // // //           style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
// // // // // // // // // // // // //           activeOpacity={0.85}
// // // // // // // // // // // // //           onPress={handleSaveChanges}
// // // // // // // // // // // // //         >
// // // // // // // // // // // // //           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
// // // // // // // // // // // // //         </TouchableOpacity>
// // // // // // // // // // // // //       </ScrollView>
// // // // // // // // // // // // //     </View>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default SpecializationsScreen;
















// // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// // // // // // // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // // // // // // import DocumentPicker from '@react-native-documents/picker';
// // // // // // // // // // // // import tw from 'twrnc';
// // // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // // // // //   const [selectedFile, setSelectedFile] = useState<any>(null);
// // // // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // // // //   // Pick a document
// // // // // // // // // // // //   const handlePickDocument = async () => {
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const result = await DocumentPicker.pickSingle({
// // // // // // // // // // // //         type: [DocumentPicker.types.allFiles],
// // // // // // // // // // // //       });
// // // // // // // // // // // //       setSelectedFile(result);
// // // // // // // // // // // //     } catch (err) {
// // // // // // // // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // // // // // // // //         console.log('User cancelled document picker');
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         console.error('Document picker error:', err);
// // // // // // // // // // // //       }
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Upload document to API
// // // // // // // // // // // //   const handleUpload = async () => {
// // // // // // // // // // // //     if (!selectedFile) {
// // // // // // // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // // // // // // //       return;
// // // // // // // // // // // //     }

// // // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // // // // // // // // //     formData.append('document', {
// // // // // // // // // // // //       uri: selectedFile.uri,
// // // // // // // // // // // //       type: selectedFile.type,
// // // // // // // // // // // //       name: selectedFile.name,
// // // // // // // // // // // //     } as any);

// // // // // // // // // // // //     setLoading(true);
// // // // // // // // // // // //     try {
// // // // // // // // // // // //       const response = await axios.post(
// // // // // // // // // // // //         'http://127.0.0.1:5000/api/documents/upload-document',
// // // // // // // // // // // //         formData,
// // // // // // // // // // // //         {
// // // // // // // // // // // //           headers: {
// // // // // // // // // // // //             'Content-Type': 'multipart/form-data',
// // // // // // // // // // // //           },
// // // // // // // // // // // //         }
// // // // // // // // // // // //       );

// // // // // // // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // // // // // // // //       Alert.alert('Error', 'Failed to upload the document.');
// // // // // // // // // // // //     } finally {
// // // // // // // // // // // //       setLoading(false);
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // // // // // // //         Upload Document for Verification
// // // // // // // // // // // //       </Text>

// // // // // // // // // // // //       <TouchableOpacity
// // // // // // // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // // // // // // //         onPress={handlePickDocument}
// // // // // // // // // // // //       >
// // // // // // // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // // // // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // // // // // // // // //         </Text>
// // // // // // // // // // // //       </TouchableOpacity>

// // // // // // // // // // // //       <TouchableOpacity
// // // // // // // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // // // // // // //         onPress={handleUpload}
// // // // // // // // // // // //         disabled={loading}
// // // // // // // // // // // //       >
// // // // // // // // // // // //         {loading ? (
// // // // // // // // // // // //           <ActivityIndicator color="white" />
// // // // // // // // // // // //         ) : (
// // // // // // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // // // // // // //         )}
// // // // // // // // // // // //       </TouchableOpacity>
// // // // // // // // // // // //     </View>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default SpecializationsScreen;


// // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// // // // // // // // // // // import DocumentPicker from '@react-native-documents/picker';
// // // // // // // // // // // import tw from 'twrnc';
// // // // // // // // // // // import axios from 'axios';

// // // // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // // // //   const [selectedFile, setSelectedFile] = useState<any>(null);
// // // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // // //   // Pick a document
// // // // // // // // // // //   const handlePickDocument = async () => {
// // // // // // // // // // //     try {
// // // // // // // // // // //       // ✅ FIX: Use array destructuring here. pickSingle often returns an array [file]
// // // // // // // // // // //       const [file] = await DocumentPicker.pickSingle({
// // // // // // // // // // //         type: [DocumentPicker.types.allFiles],
// // // // // // // // // // //       });

// // // // // // // // // // //       // Set the file object if it exists (i.e., not cancelled)
// // // // // // // // // // //       if (file) {
// // // // // // // // // // //           setSelectedFile(file);
// // // // // // // // // // //       }
// // // // // // // // // // //     } catch (err) {
// // // // // // // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // // // // // // //         console.log('User cancelled document picker');
// // // // // // // // // // //       } else {
// // // // // // // // // // //         console.error('Document picker error:', err);
// // // // // // // // // // //         // Alert the user to general errors, excluding cancellation
// // // // // // // // // // //         Alert.alert('Picker Error', 'Could not open document picker or select file.');
// // // // // // // // // // //       }
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   // Upload document to API
// // // // // // // // // // //   const handleUpload = async () => {
// // // // // // // // // // //     if (!selectedFile) {
// // // // // // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // // // // // //       return;
// // // // // // // // // // //     }

// // // // // // // // // // //     const formData = new FormData();
// // // // // // // // // // //     // Assuming 'documentName' is a separate field for the server
// // // // // // // // // // //     formData.append('documentName', selectedFile.name || 'example');

// // // // // // // // // // //     // The main file object for multipart/form-data upload
// // // // // // // // // // //     formData.append('document', {
// // // // // // // // // // //       uri: selectedFile.uri,
// // // // // // // // // // //       type: selectedFile.type,
// // // // // // // // // // //       name: selectedFile.name,
// // // // // // // // // // //     } as any);

// // // // // // // // // // //     setLoading(true);
// // // // // // // // // // //     try {
// // // // // // // // // // //       const response = await axios.post(
// // // // // // // // // // //         // NOTE: For a real device/emulator to reach a local server, 
// // // // // // // // // // //         // you might need to change '127.0.0.1' to your actual local IP (e.g., 192.168.x.x) or '10.0.2.2' (Android emulator).
// // // // // // // // // // //         'http://127.0.0.1:5000/api/documents/upload-document',
// // // // // // // // // // //         formData,
// // // // // // // // // // //         {
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             // Note: The 'Content-Type' header for 'multipart/form-data' is usually set 
// // // // // // // // // // //             // automatically by axios/FormData in React Native, but explicitly setting it is fine.
// // // // // // // // // // //             'Content-Type': 'multipart/form-data', 
// // // // // // // // // // //           },
// // // // // // // // // // //         }
// // // // // // // // // // //       );

// // // // // // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // // // // // //       // Optional: Clear the selected file after successful upload
// // // // // // // // // // //       setSelectedFile(null); 
// // // // // // // // // // //     } catch (error: any) {
// // // // // // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // // // // // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // // // // // // // // //     } finally {
// // // // // // // // // // //       setLoading(false);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // // // // // //         Upload Document for Verification
// // // // // // // // // // //       </Text>

// // // // // // // // // // //       <TouchableOpacity
// // // // // // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // // // // // //         onPress={handlePickDocument}
// // // // // // // // // // //       >
// // // // // // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // // // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // // // // // // // //         </Text>
// // // // // // // // // // //       </TouchableOpacity>

// // // // // // // // // // //       <TouchableOpacity
// // // // // // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // // // // // //         onPress={handleUpload}
// // // // // // // // // // //         disabled={loading || !selectedFile} // Disable if loading or no file is selected
// // // // // // // // // // //       >
// // // // // // // // // // //         {loading ? (
// // // // // // // // // // //           <ActivityIndicator color="white" />
// // // // // // // // // // //         ) : (
// // // // // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // // // // // //         )}
// // // // // // // // // // //       </TouchableOpacity>
// // // // // // // // // // //     </View>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default SpecializationsScreen;

// // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// // // // // // // // // // // import DocumentPicker from '@react-native-document-picker/picker'; // check correct import for your lib version
// // // // // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // // // // import tw from 'twrnc';
// // // // // // // // // // import axios from 'axios';

// // // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // // //   const handlePickDocument = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       // DocumentPicker.pickSingle returns a single file object, not an array
// // // // // // // // // //       const file = await DocumentPicker.pickSingle({
// // // // // // // // // //         type: [DocumentPicker.types.allFiles],
// // // // // // // // // //       });
// // // // // // // // // //       setSelectedFile(file);
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // // // // // //         console.log('User cancelled document picker');
// // // // // // // // // //       } else {
// // // // // // // // // //         console.error('Document picker error:', err);
// // // // // // // // // //         Alert.alert('Picker Error', 'Could not open document picker or select file.');
// // // // // // // // // //       }
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleUpload = async () => {
// // // // // // // // // //     if (!selectedFile) {
// // // // // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     const formData = new FormData();
// // // // // // // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // // // // // // //     formData.append('document', {
// // // // // // // // // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // // // // // // // // //       type: selectedFile.type || 'application/octet-stream',
// // // // // // // // // //       name: selectedFile.name || 'document',
// // // // // // // // // //     });

// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await axios.post(
// // // // // // // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // // // // // // //         formData,
// // // // // // // // // //         {
// // // // // // // // // //           headers: {
// // // // // // // // // //             // Let axios/form-data set boundary and content-type
// // // // // // // // // //             'Content-Type': 'multipart/form-data',
// // // // // // // // // //             // If your API requires authentication, include tokens here
// // // // // // // // // //           },
// // // // // // // // // //         }
// // // // // // // // // //       );
// // // // // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // // // // //       setSelectedFile(null);
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // // // // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // // // // //         Upload Document for Verification
// // // // // // // // // //       </Text>
// // // // // // // // // //       <TouchableOpacity
// // // // // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // // // // //         onPress={handlePickDocument}
// // // // // // // // // //       >
// // // // // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // // // // // // //         </Text>
// // // // // // // // // //       </TouchableOpacity>
// // // // // // // // // //       <TouchableOpacity
// // // // // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // // // // //         onPress={handleUpload}
// // // // // // // // // //         disabled={loading || !selectedFile}
// // // // // // // // // //       >
// // // // // // // // // //         {loading ? (
// // // // // // // // // //           <ActivityIndicator color="white" />
// // // // // // // // // //         ) : (
// // // // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // // // // //         )}
// // // // // // // // // //       </TouchableOpacity>
// // // // // // // // // //     </View>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default SpecializationsScreen;





// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// // // // // // // // // import FilePickerManager from 'react-native-file-picker';
// // // // // // // // // import tw from 'twrnc';
// // // // // // // // // import axios from 'axios';

// // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // // //   const handlePickDocument = () => {
// // // // // // // // //     FilePickerManager.showFilePicker(null, (response) => {
// // // // // // // // //       if (response.didCancel) {
// // // // // // // // //         console.log('User cancelled file picker');
// // // // // // // // //       } else if (response.error) {
// // // // // // // // //         console.error('FilePicker error:', response.error);
// // // // // // // // //         Alert.alert('Picker Error', 'Could not open file picker or select file.');
// // // // // // // // //       } else {
// // // // // // // // //         setSelectedFile(response);
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   };

// // // // // // // // //   const handleUpload = async () => {
// // // // // // // // //     if (!selectedFile) {
// // // // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     const formData = new FormData();
// // // // // // // // //     formData.append('documentName', selectedFile.fileName || 'example');
// // // // // // // // //     formData.append('document', {
// // // // // // // // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // // // // // // // //       type: selectedFile.type || 'application/octet-stream',
// // // // // // // // //       name: selectedFile.fileName || 'document',
// // // // // // // // //     });

// // // // // // // // //     setLoading(true);
// // // // // // // // //     try {
// // // // // // // // //       const response = await axios.post(
// // // // // // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // // // // // //         formData,
// // // // // // // // //         {
// // // // // // // // //           headers: {
// // // // // // // // //             'Content-Type': 'multipart/form-data',
// // // // // // // // //           },
// // // // // // // // //         }
// // // // // // // // //       );
// // // // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // // // //       setSelectedFile(null);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // // // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // // // //         Upload Document for Verification
// // // // // // // // //       </Text>
// // // // // // // // //       <TouchableOpacity
// // // // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // // // //         onPress={handlePickDocument}
// // // // // // // // //       >
// // // // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // // // //           {selectedFile ? selectedFile.fileName : 'Select Document'}
// // // // // // // // //         </Text>
// // // // // // // // //       </TouchableOpacity>
// // // // // // // // //       <TouchableOpacity
// // // // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // // // //         onPress={handleUpload}
// // // // // // // // //         disabled={loading || !selectedFile}
// // // // // // // // //       >
// // // // // // // // //         {loading ? (
// // // // // // // // //           <ActivityIndicator color="white" />
// // // // // // // // //         ) : (
// // // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // // // //         )}
// // // // // // // // //       </TouchableOpacity>
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default SpecializationsScreen;




// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import {
// // // // // // // //   View,
// // // // // // // //   Text,
// // // // // // // //   TouchableOpacity,
// // // // // // // //   Alert,
// // // // // // // //   ActivityIndicator,
// // // // // // // //   Platform,
// // // // // // // //   PermissionsAndroid,
// // // // // // // // } from 'react-native';
// // // // // // // // import FilePickerManager from 'react-native-file-picker';
// // // // // // // // import tw from 'twrnc';
// // // // // // // // import axios from 'axios';

// // // // // // // // const SpecializationsScreen = () => {
// // // // // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // // //   // 🔐 Request permission for Android 11+
// // // // // // // //   const requestStoragePermission = async () => {
// // // // // // // //     try {
// // // // // // // //       const granted = await PermissionsAndroid.request(
// // // // // // // //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
// // // // // // // //         {
// // // // // // // //           title: 'Storage Permission Required',
// // // // // // // //           message: 'This app needs access to your storage to pick documents.',
// // // // // // // //           buttonNeutral: 'Ask Me Later',
// // // // // // // //           buttonNegative: 'Cancel',
// // // // // // // //           buttonPositive: 'OK',
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       return granted === PermissionsAndroid.RESULTS.GRANTED;
// // // // // // // //     } catch (err) {
// // // // // // // //       console.warn('Permission error:', err);
// // // // // // // //       return false;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handlePickDocument = async () => {
// // // // // // // //     if (Platform.OS === 'android') {
// // // // // // // //       const hasPermission = await requestStoragePermission();
// // // // // // // //       if (!hasPermission) {
// // // // // // // //         Alert.alert('Permission Denied', 'Please grant storage permission to continue.');
// // // // // // // //         return;
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     FilePickerManager.showFilePicker(null, (response) => {
// // // // // // // //       if (response.didCancel) {
// // // // // // // //         console.log('User cancelled file picker');
// // // // // // // //       } else if (response.error) {
// // // // // // // //         console.error('FilePicker error:', response.error);
// // // // // // // //         Alert.alert('Picker Error', 'Could not open file picker or select file.');
// // // // // // // //       } else {
// // // // // // // //         console.log('Selected file:', response);
// // // // // // // //         setSelectedFile(response);
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const handleUpload = async () => {
// // // // // // // //     if (!selectedFile) {
// // // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append('documentName', selectedFile.fileName || 'example');
// // // // // // // //     formData.append('document', {
// // // // // // // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // // // // // // //       type: selectedFile.type || 'application/octet-stream',
// // // // // // // //       name: selectedFile.fileName || 'document',
// // // // // // // //     });

// // // // // // // //     setLoading(true);
// // // // // // // //     try {
// // // // // // // //       const response = await axios.post(
// // // // // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // // // // //         formData,
// // // // // // // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // // // // // // //       );

// // // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // // //       setSelectedFile(null);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // // // //       Alert.alert('Error', 'Failed to upload the document.');
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // // //         Upload Document for Verification
// // // // // // // //       </Text>

// // // // // // // //       <TouchableOpacity
// // // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // // //         onPress={handlePickDocument}
// // // // // // // //       >
// // // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // // //           {selectedFile ? selectedFile.fileName : 'Select Document'}
// // // // // // // //         </Text>
// // // // // // // //       </TouchableOpacity>

// // // // // // // //       <TouchableOpacity
// // // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // // //         onPress={handleUpload}
// // // // // // // //         disabled={loading || !selectedFile}
// // // // // // // //       >
// // // // // // // //         {loading ? (
// // // // // // // //           <ActivityIndicator color="white" />
// // // // // // // //         ) : (
// // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // // //         )}
// // // // // // // //       </TouchableOpacity>
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SpecializationsScreen;


// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   TouchableOpacity,
// // // // // // //   ActivityIndicator,
// // // // // // //   Alert,
// // // // // // // } from 'react-native';
// // // // // // // import tw from 'twrnc';
// // // // // // // import axios from 'axios';
// // // // // // // import * as FileAccess from 'react-native-file-access';

// // // // // // // const SpecializationsScreen = () => {
// // // // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const handlePickDocument = async () => {
// // // // // // //     try {
// // // // // // //       const result = await FileAccess.pickFile();
// // // // // // //       if (result) {
// // // // // // //         console.log('Selected file:', result);
// // // // // // //         setSelectedFile(result);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error('File picker error:', err);
// // // // // // //       Alert.alert('Error', 'Could not pick a document.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleUpload = async () => {
// // // // // // //     if (!selectedFile) {
// // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // // // //     formData.append('document', {
// // // // // // //       uri: selectedFile.uri,
// // // // // // //       type: selectedFile.mime || 'application/octet-stream',
// // // // // // //       name: selectedFile.name || 'document',
// // // // // // //     });

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.post(
// // // // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // // // //         formData,
// // // // // // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // // // // // //       );

// // // // // // //       console.log('Upload Response:', response.data);
// // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // //       setSelectedFile(null);
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Upload Error:', error.response?.data || error.message);
// // // // // // //       Alert.alert('Error', 'Failed to upload the document.');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // // //         Upload Document for Verification
// // // // // // //       </Text>

// // // // // // //       <TouchableOpacity
// // // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // // //         onPress={handlePickDocument}
// // // // // // //       >
// // // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // // // //         </Text>
// // // // // // //       </TouchableOpacity>

// // // // // // //       <TouchableOpacity
// // // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // // //         onPress={handleUpload}
// // // // // // //         disabled={loading || !selectedFile}
// // // // // // //       >
// // // // // // //         {loading ? (
// // // // // // //           <ActivityIndicator color="white" />
// // // // // // //         ) : (
// // // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // // //         )}
// // // // // // //       </TouchableOpacity>
// // // // // // //     </View>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default SpecializationsScreen;


// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   TouchableOpacity,
// // // // // //   ActivityIndicator,
// // // // // //   Alert,
// // // // // // } from 'react-native';
// // // // // // import tw from 'twrnc';
// // // // // // import axios from 'axios';
// // // // // // import * as FileAccess from 'react-native-file-access';

// // // // // // const SpecializationsScreen = () => {
// // // // // //   const [selectedFile, setSelectedFile] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const handlePickDocument = async () => {
// // // // // //     try {
// // // // // //       const result = await FileAccess.pickFile();
// // // // // //       if (result) {
// // // // // //         // Check if file is an image
// // // // // //         if (result.mime && result.mime.startsWith('image/')) {
// // // // // //           console.log('Selected image:', result);
// // // // // //           setSelectedFile(result);
// // // // // //         } else {
// // // // // //           Alert.alert('Invalid File', 'Please select an image file only.');
// // // // // //         }
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error('File picker error:', err);
// // // // // //       Alert.alert('Error', 'Could not pick a document.');
// // // // // //     }
// // // // // //   };

// // // // // //   const handleUpload = async () => {
// // // // // //     if (!selectedFile) {
// // // // // //       Alert.alert('No Image', 'Please select an image to upload.');
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // // //     formData.append('document', {
// // // // // //       uri: selectedFile.uri,
// // // // // //       type: selectedFile.mime || 'image/jpeg',
// // // // // //       name: selectedFile.name || 'image.jpg',
// // // // // //     });

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // // //         formData,
// // // // // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // // // // //       );

// // // // // //       console.log('Upload Response:', response.data);
// // // // // //       Alert.alert('Success', 'Image uploaded successfully!');
// // // // // //       setSelectedFile(null);
// // // // // //     } catch (error) {
// // // // // //       console.error('Upload Error:', error.response?.data || error.message);
// // // // // //       Alert.alert('Error', 'Failed to upload the image.');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // //         Upload Image for Verification
// // // // // //       </Text>

// // // // // //       <TouchableOpacity
// // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // //         onPress={handlePickDocument}
// // // // // //       >
// // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // //           {selectedFile ? selectedFile.name : 'Select Image'}
// // // // // //         </Text>
// // // // // //       </TouchableOpacity>

// // // // // //       <TouchableOpacity
// // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // //         onPress={handleUpload}
// // // // // //         disabled={loading || !selectedFile}
// // // // // //       >
// // // // // //         {loading ? (
// // // // // //           <ActivityIndicator color="white" />
// // // // // //         ) : (
// // // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // // //         )}
// // // // // //       </TouchableOpacity>
// // // // // //     </View>
// // // // // //   );
// // // // // // };

// // // // // // export default SpecializationsScreen;



// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   TouchableOpacity,
// // // // //   ActivityIndicator,
// // // // //   Alert,
// // // // // } from 'react-native';
// // // // // import tw from 'twrnc';
// // // // // import axios from 'axios';
// // // // // import { launchImageLibrary } from 'react-native-image-picker';

// // // // // const SpecializationsScreen = () => {
// // // // //   const [selectedImage, setSelectedImage] = useState<any>(null);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const handlePickImage = async () => {
// // // // //     try {
// // // // //       const result = await launchImageLibrary({
// // // // //         mediaType: 'photo', // Only images
// // // // //         selectionLimit: 1,
// // // // //       });

// // // // //       if (result.assets && result.assets.length > 0) {
// // // // //         const image = result.assets[0];
// // // // //         setSelectedImage(image);
// // // // //         console.log('Selected image:', image);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error('Image picker error:', err);
// // // // //       Alert.alert('Error', 'Could not pick an image.');
// // // // //     }
// // // // //   };

// // // // //   const handleUpload = async () => {
// // // // //     if (!selectedImage) {
// // // // //       Alert.alert('No Image', 'Please select an image to upload.');
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('documentName', selectedImage.fileName || 'image');
// // // // //     formData.append('document', {
// // // // //       uri: selectedImage.uri,
// // // // //       type: selectedImage.type || 'image/jpeg',
// // // // //       name: selectedImage.fileName || 'image.jpg',
// // // // //     });

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // // //         formData,
// // // // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // // // //       );

// // // // //       console.log('Upload Response:', response.data);
// // // // //       Alert.alert('Success', 'Image uploaded successfully!');
// // // // //       setSelectedImage(null);
// // // // //     } catch (error) {
// // // // //       console.error('Upload Error:', error.response?.data || error.message);
// // // // //       Alert.alert('Error', 'Failed to upload the image.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // //         Upload Image for Verification
// // // // //       </Text>

// // // // //       <TouchableOpacity
// // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // //         onPress={handlePickImage}
// // // // //       >
// // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // //           {selectedImage ? selectedImage.fileName : 'Select Image'}
// // // // //         </Text>
// // // // //       </TouchableOpacity>

// // // // //       <TouchableOpacity
// // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // //         onPress={handleUpload}
// // // // //         disabled={loading || !selectedImage}
// // // // //       >
// // // // //         {loading ? (
// // // // //           <ActivityIndicator color="white" />
// // // // //         ) : (
// // // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // // //         )}
// // // // //       </TouchableOpacity>
// // // // //     </View>
// // // // //   );
// // // // // };

// // // // // export default SpecializationsScreen;



// // // // import React, { useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   TouchableOpacity,
// // // //   ActivityIndicator,
// // // //   Image,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { useNavigation } from '@react-navigation/native';
// // // // import tw from 'twrnc';
// // // // import axios from 'axios';
// // // // import { launchImageLibrary } from 'react-native-image-picker';
// // // // import { ArrowLeft, Upload, ImageIcon } from 'lucide-react-native';

// // // // const SpecializationsScreen = () => {
// // // //   const navigation = useNavigation();
// // // //   const [selectedImage, setSelectedImage] = useState<any>(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   // 📸 Pick image from gallery
// // // //   const handlePickImage = async () => {
// // // //     try {
// // // //       const result = await launchImageLibrary({
// // // //         mediaType: 'photo',
// // // //         selectionLimit: 1,
// // // //       });

// // // //       if (result.assets && result.assets.length > 0) {
// // // //         const image = result.assets[0];
// // // //         setSelectedImage(image);
// // // //         console.log('Selected image:', image);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Image picker error:', err);
// // // //       Alert.alert('Error', 'Could not pick an image.');
// // // //     }
// // // //   };

// // // //   // ☁️ Upload image to API
// // // //   const handleUpload = async () => {
// // // //     if (!selectedImage) {
// // // //       Alert.alert('No Image', 'Please select an image to upload.');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('documentName', selectedImage.fileName || 'image');
// // // //     formData.append('document', {
// // // //       uri: selectedImage.uri,
// // // //       type: selectedImage.type || 'image/jpeg',
// // // //       name: selectedImage.fileName || 'image.jpg',
// // // //     });

// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post(
// // // //         'https://api.docapp.co.in/api/documents/upload-document',
// // // //         formData,
// // // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // // //       );

// // // //       console.log('Upload Response:', response.data);
// // // //       Alert.alert('✅ Success', 'Document uploaded successfully!');
// // // //       setSelectedImage(null);
// // // //     } catch (error) {
// // // //       console.error('Upload Error:', error.response?.data || error.message);
// // // //       Alert.alert('❌ Error', 'Failed to upload the document.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (

// // // //     <View style={tw`flex-1 bg-green-50 p-5`}>
// // // //       {/* 🔙 Header */}
// // // //       <View style={tw`flex-row items-center mb-6 mt-6`}>
// // // //         <TouchableOpacity
// // // //           onPress={() => navigation.goBack()}
// // // //           style={tw`p-2 rounded-full bg-white shadow`}
// // // //         >
// // // //           <ArrowLeft size={22} color="#047857" />
// // // //         </TouchableOpacity>
// // // //         <Text style={tw`text-xl font-bold text-green-700 ml-3`}>
// // // //           KYC Verification
// // // //         </Text>
// // // //       </View>

// // // //       {/* 🪪 Title */}
// // // //       <View style={tw`items-center justify-center mb-6`}>
// // // //         <Text style={tw`text-2xl font-bold text-green-800 text-center`}>
// // // //           Upload Document for the KYC Verification
// // // //         </Text>
// // // //         <Text style={tw`text-gray-600 text-center mt-2`}>
// // // //           Please upload a valid government-issued ID or certification document.
// // // //         </Text>
// // // //       </View>

// // // //       {/* 📸 Image Preview */}
// // // //       {selectedImage && (
// // // //         <View style={tw`items-center mb-5`}>
// // // //           <Image
// // // //             source={{ uri: selectedImage.uri }}
// // // //             style={tw`w-48 h-48 rounded-xl border-2 border-green-400`}
// // // //             resizeMode="cover"
// // // //           />
// // // //           <Text style={tw`mt-2 text-green-700`}>
// // // //             {selectedImage.fileName || 'Selected Image'}
// // // //           </Text>
// // // //         </View>
// // // //       )}

// // // //       {/* 🧾 Select Image */}
// // // //       <TouchableOpacity
// // // //         style={tw`flex-row items-center justify-center bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // //         onPress={handlePickImage}
// // // //       >
// // // //         <ImageIcon size={22} color="#047857" />
// // // //         <Text style={tw`text-green-700 font-semibold ml-2`}>
// // // //           {selectedImage ? 'Change Image' : 'Select Image'}
// // // //         </Text>
// // // //       </TouchableOpacity>

// // // //       {/* ☁️ Upload Button */}
// // // //       <TouchableOpacity
// // // //         style={tw`flex-row items-center justify-center bg-emerald-500 px-8 py-4 rounded-full shadow-lg`}
// // // //         onPress={handleUpload}
// // // //         disabled={loading || !selectedImage}
// // // //       >
// // // //         {loading ? (
// // // //           <ActivityIndicator color="white" />
// // // //         ) : (
// // // //           <>
// // // //             <Upload size={22} color="white" />
// // // //             <Text style={tw`text-white font-bold text-lg ml-2`}>Upload</Text>
// // // //           </>
// // // //         )}
// // // //       </TouchableOpacity>
// // // //     </View>

// // // //   );
// // // // };

// // // // export default SpecializationsScreen;






// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   ActivityIndicator,
// // //   Image,
// // //   Alert,
// // //   ScrollView,
// // //   FlatList,
// // //   RefreshControl,
// // // } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';
// // // import tw from 'twrnc';
// // // import axios from 'axios';
// // // import { launchImageLibrary } from 'react-native-image-picker';
// // // import { ArrowLeft, Upload, ImageIcon, FileText, CheckCircle, Clock, XCircle } from 'lucide-react-native';

// // // const SpecializationsScreen = () => {
// // //   const navigation = useNavigation();
// // //   const [selectedImage, setSelectedImage] = useState<any>(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [documents, setDocuments] = useState<any[]>([]);
// // //   const [documentsLoading, setDocumentsLoading] = useState(true);
// // //   const [refreshing, setRefreshing] = useState(false);

// // //   // 📋 Fetch documents from API
// // //   const fetchDocuments = async () => {
// // //     try {
// // //       const response = await axios.get('https://api.docapp.co.in/api/documents/get-documents');
// // //       console.log('Documents Response:', response.data);

// // //       if (response.data && response.data.userDocuments) {
// // //         setDocuments(response.data.userDocuments);
// // //       }
// // //     } catch (error) {
// // //       console.error('Fetch Documents Error:', error.response?.data || error.message);
// // //       Alert.alert('❌ Error', 'Failed to fetch documents.');
// // //     } finally {
// // //       setDocumentsLoading(false);
// // //       setRefreshing(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchDocuments();
// // //   }, []);

// // //   // 🔄 Pull to refresh
// // //   const onRefresh = () => {
// // //     setRefreshing(true);
// // //     fetchDocuments();
// // //   };

// // //   // 📸 Pick image from gallery
// // //   const handlePickImage = async () => {
// // //     try {
// // //       const result = await launchImageLibrary({
// // //         mediaType: 'photo',
// // //         selectionLimit: 1,
// // //       });

// // //       if (result.assets && result.assets.length > 0) {
// // //         const image = result.assets[0];
// // //         setSelectedImage(image);
// // //         console.log('Selected image:', image);
// // //       }
// // //     } catch (err) {
// // //       console.error('Image picker error:', err);
// // //       Alert.alert('Error', 'Could not pick an image.');
// // //     }
// // //   };

// // //   // ☁️ Upload image to API
// // //   const handleUpload = async () => {
// // //     if (!selectedImage) {
// // //       Alert.alert('No Image', 'Please select an image to upload.');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('documentName', selectedImage.fileName || 'image');
// // //     formData.append('document', {
// // //       uri: selectedImage.uri,
// // //       type: selectedImage.type || 'image/jpeg',
// // //       name: selectedImage.fileName || 'image.jpg',
// // //     });

// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post(
// // //         'https://api.docapp.co.in/api/documents/upload-document',
// // //         formData,
// // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // //       );

// // //       console.log('Upload Response:', response.data);
// // //       Alert.alert('✅ Success', 'Document uploaded successfully!');
// // //       setSelectedImage(null);

// // //       // Refresh documents list after successful upload
// // //       fetchDocuments();
// // //     } catch (error) {
// // //       console.error('Upload Error:', error.response?.data || error.message);
// // //       Alert.alert('❌ Error', 'Failed to upload the document.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // 🎨 Status indicator component
// // //   const StatusIndicator = ({ status }: { status: string }) => {
// // //     const getStatusConfig = (status: string) => {
// // //       switch (status?.toLowerCase()) {
// // //         case 'approved':
// // //           return { color: '#10b981', icon: CheckCircle, text: 'Approved' };
// // //         case 'rejected':
// // //           return { color: '#ef4444', icon: XCircle, text: 'Rejected' };
// // //         case 'pending':
// // //         default:
// // //           return { color: '#f59e0b', icon: Clock, text: 'Pending' };
// // //       }
// // //     };

// // //     const config = getStatusConfig(status);
// // //     const IconComponent = config.icon;

// // //     return (
// // //       <View style={tw`flex-row items-center`}>
// // //         <IconComponent size={16} color={config.color} />
// // //         <Text style={[tw`ml-1 text-xs font-medium`, { color: config.color }]}>
// // //           {config.text}
// // //         </Text>
// // //       </View>
// // //     );
// // //   };

// // //   // 📄 Document item component
// // //   const DocumentItem = ({ item, index }: { item: any; index: number }) => (
// // //     <View style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}>
// // //       <View style={tw`flex-row justify-between items-start mb-3`}>
// // //         <View style={tw`flex-1`}>
// // //           <View style={tw`flex-row items-center mb-1`}>
// // //             <FileText size={18} color="#047857" />
// // //             <Text style={tw`text-green-800 font-semibold ml-2`}>
// // //               Document {index + 1}
// // //             </Text>
// // //           </View>
// // //           <Text style={tw`text-gray-600 text-sm`}>
// // //             Type: {item.document_type || 'Unknown'}
// // //           </Text>
// // //           <Text style={tw`text-gray-500 text-xs mt-1`}>
// // //             Uploaded: {new Date(item.created_at).toLocaleDateString()}
// // //           </Text>
// // //         </View>
// // //         <StatusIndicator status={item.document_status} />
// // //       </View>

// // //       <Image
// // //         source={{ uri: item.document_url }}
// // //         style={tw`w-full h-40 rounded-lg bg-gray-100`}
// // //         resizeMode="contain"
// // //         onError={() => console.log('Error loading image:', item.document_url)}
// // //       />
// // //     </View>
// // //   );

// // //   return (
// // //     <View style={tw`flex-1 bg-green-50`}>
// // //       {/* 🔙 Header */}
// // //       <View style={tw`flex-row items-center p-5 bg-green-600`}>
// // //         <TouchableOpacity
// // //           onPress={() => navigation.goBack()}
// // //           style={tw`p-2 rounded-full bg-green-500`}
// // //         >
// // //           <ArrowLeft size={22} color="white" />
// // //         </TouchableOpacity>
// // //         <Text style={tw`text-xl font-bold text-white ml-3`}>
// // //           KYC Verification
// // //         </Text>
// // //       </View>

// // //       <ScrollView 
// // //         style={tw`flex-1 p-5`}
// // //         refreshControl={
// // //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// // //         }
// // //       >
// // //         {/* 🪪 Title */}
// // //         <View style={tw`items-center justify-center mb-6`}>
// // //           <Text style={tw`text-2xl font-bold text-green-800 text-center`}>
// // //             Upload Document for KYC Verification
// // //           </Text>
// // //           <Text style={tw`text-gray-600 text-center mt-2`}>
// // //             Please upload a valid government-issued ID or certification document.
// // //           </Text>
// // //         </View>

// // //         {/* 📸 Image Preview */}
// // //         {selectedImage && (
// // //           <View style={tw`items-center mb-5`}>
// // //             <Image
// // //               source={{ uri: selectedImage.uri }}
// // //               style={tw`w-48 h-48 rounded-xl border-2 border-green-400`}
// // //               resizeMode="cover"
// // //             />
// // //             <Text style={tw`mt-2 text-green-700`}>
// // //               {selectedImage.fileName || 'Selected Image'}
// // //             </Text>
// // //           </View>
// // //         )}

// // //         {/* 🧾 Select Image */}
// // //         <TouchableOpacity
// // //           style={tw`flex-row items-center justify-center bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // //           onPress={handlePickImage}
// // //         >
// // //           <ImageIcon size={22} color="#047857" />
// // //           <Text style={tw`text-green-700 font-semibold ml-2`}>
// // //             {selectedImage ? 'Change Image' : 'Select Image'}
// // //           </Text>
// // //         </TouchableOpacity>

// // //         {/* ☁️ Upload Button */}
// // //         <TouchableOpacity
// // //           style={tw`flex-row items-center justify-center bg-emerald-500 px-8 py-4 rounded-full shadow-lg mb-8`}
// // //           onPress={handleUpload}
// // //           disabled={loading || !selectedImage}
// // //         >
// // //           {loading ? (
// // //             <ActivityIndicator color="white" />
// // //           ) : (
// // //             <>
// // //               <Upload size={22} color="white" />
// // //               <Text style={tw`text-white font-bold text-lg ml-2`}>Upload</Text>
// // //             </>
// // //           )}
// // //         </TouchableOpacity>

// // //         {/* 📋 Uploaded Documents Section */}
// // //         <View style={tw`mb-6`}>
// // //           <View style={tw`flex-row justify-between items-center mb-4`}>
// // //             <Text style={tw`text-xl font-bold text-green-800`}>
// // //               Uploaded Documents
// // //             </Text>
// // //             <Text style={tw`text-green-600 font-medium`}>
// // //               {documents.length} document(s)
// // //             </Text>
// // //           </View>

// // //           {documentsLoading ? (
// // //             <View style={tw`items-center py-8`}>
// // //               <ActivityIndicator size="large" color="#047857" />
// // //               <Text style={tw`text-gray-600 mt-2`}>Loading documents...</Text>
// // //             </View>
// // //           ) : documents.length === 0 ? (
// // //             <View style={tw`items-center py-8 bg-white rounded-xl`}>
// // //               <FileText size={48} color="#9ca3af" />
// // //               <Text style={tw`text-gray-500 mt-2 text-center`}>
// // //                 No documents uploaded yet.{'\n'}Upload your first document above.
// // //               </Text>
// // //             </View>
// // //           ) : (
// // //             <FlatList
// // //               data={documents}
// // //               keyExtractor={(item) => item.id.toString()}
// // //               renderItem={({ item, index }) => (
// // //                 <DocumentItem item={item} index={index} />
// // //               )}
// // //               scrollEnabled={false}
// // //               showsVerticalScrollIndicator={false}
// // //             />
// // //           )}
// // //         </View>
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // };

// // // export default SpecializationsScreen;











// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Image,
// //   Alert,
// //   ScrollView,
// //   FlatList,
// //   RefreshControl,
// //   TextInput,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import tw from 'twrnc';
// // import axios from 'axios';
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import {
// //   ArrowLeft,
// //   Upload,
// //   ImageIcon,
// //   FileText,
// //   CheckCircle,
// //   Clock,
// //   XCircle,
// // } from 'lucide-react-native';

// // /* ================= CONFIG ================= */
// // const API_BASE = 'https://api.docapp.co.in/api';
// // const DOCTOR_ID = 36; // 🔴 replace with logged-in doctor id

// // /* ================= COMPONENT ================= */
// // const SpecializationsScreen = () => {
// //   const navigation = useNavigation();

// //   /* ---------- STATE ---------- */
// //   const [selectedImage, setSelectedImage] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);

// //   const [documents, setDocuments] = useState<any[]>([]);
// //   const [documentsLoading, setDocumentsLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);

// //   // New KYC states
// //   const [docType, setDocType] = useState<'pan' | 'bank_account' | 'address'>(
// //     'pan'
// //   );
// //   const [panNumber, setPanNumber] = useState('');
// //   const [accountNumber, setAccountNumber] = useState('');
// //   const [ifsc, setIfsc] = useState('');
// //   const [addressLine1, setAddressLine1] = useState('');

// //   const [linkedAccountCreated, setLinkedAccountCreated] = useState(false);

// //   /* ---------- CREATE LINKED ACCOUNT ---------- */
// //   const createLinkedAccount = async () => {
// //     try {
// //       setLoading(true);
// //       await axios.post(
// //         `${API_BASE}/doctor/${DOCTOR_ID}/create-linked-account`
// //       );
// //       setLinkedAccountCreated(true);
// //       Alert.alert('✅ Success', 'Doctor linked account created');
// //     } catch (err: any) {
// //       Alert.alert(
// //         '❌ Error',
// //         err.response?.data?.error || 'Failed to create linked account'
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ---------- FETCH DOCUMENTS ---------- */
// //   const fetchDocuments = async () => {
// //     try {
// //       const response = await axios.get(
// //         `${API_BASE}/documents/get-documents`
// //       );

// //       if (response.data?.userDocuments) {
// //         setDocuments(response.data.userDocuments);
// //       }
// //     } catch (error: any) {
// //       Alert.alert('❌ Error', 'Failed to fetch documents');
// //     } finally {
// //       setDocumentsLoading(false);
// //       setRefreshing(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDocuments();
// //   }, []);

// //   const onRefresh = () => {
// //     setRefreshing(true);
// //     fetchDocuments();
// //   };

// //   /* ---------- IMAGE PICK ---------- */
// //   const handlePickImage = async () => {
// //     const result = await launchImageLibrary({
// //       mediaType: 'photo',
// //       selectionLimit: 1,
// //     });

// //     if (result.assets?.length) {
// //       setSelectedImage(result.assets[0]);
// //     }
// //   };

// //   /* ---------- UPLOAD KYC ---------- */
// //   const handleUpload = async () => {
// //     if (!selectedImage) {
// //       Alert.alert('No Image', 'Please select a document');
// //       return;
// //     }

// //     const formData = new FormData();

// //     formData.append('document', {
// //       uri: selectedImage.uri,
// //       type: selectedImage.type || 'image/jpeg',
// //       name: selectedImage.fileName || 'document.jpg',
// //     });

// //     formData.append('type', docType);

// //     if (docType === 'pan') {
// //       if (!panNumber) return Alert.alert('PAN number required');
// //       formData.append('pan_number', panNumber);
// //     }

// //     if (docType === 'bank_account') {
// //       if (!accountNumber || !ifsc)
// //         return Alert.alert('Account number & IFSC required');
// //       formData.append('account_number', accountNumber);
// //       formData.append('ifsc', ifsc);
// //     }

// //     if (docType === 'address') {
// //       if (!addressLine1) return Alert.alert('Address required');
// //       formData.append('address_line1', addressLine1);
// //     }

// //     setLoading(true);
// //     try {
// //       await axios.post(
// //         `${API_BASE}/doctor/${DOCTOR_ID}/upload-kyc`,
// //         formData,
// //         { headers: { 'Content-Type': 'multipart/form-data' } }
// //       );

// //       Alert.alert('✅ Success', 'KYC document uploaded');
// //       setSelectedImage(null);
// //       fetchDocuments();
// //     } catch (error: any) {
// //       Alert.alert(
// //         '❌ Error',
// //         error.response?.data?.error || 'Upload failed'
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ---------- STATUS INDICATOR ---------- */
// //   const StatusIndicator = ({ status }: { status: string }) => {
// //     const map: any = {
// //       approved: { icon: CheckCircle, color: '#10b981', text: 'Approved' },
// //       rejected: { icon: XCircle, color: '#ef4444', text: 'Rejected' },
// //       pending: { icon: Clock, color: '#f59e0b', text: 'Pending' },
// //     };

// //     const cfg = map[status?.toLowerCase()] || map.pending;
// //     const Icon = cfg.icon;

// //     return (
// //       <View style={tw`flex-row items-center`}>
// //         <Icon size={16} color={cfg.color} />
// //         <Text style={[tw`ml-1 text-xs font-medium`, { color: cfg.color }]}>
// //           {cfg.text}
// //         </Text>
// //       </View>
// //     );
// //   };

// //   /* ---------- DOCUMENT ITEM ---------- */
// //   const DocumentItem = ({ item, index }: any) => (
// //     <View style={tw`bg-white rounded-xl p-4 mb-3 border border-gray-100`}>
// //       <View style={tw`flex-row justify-between mb-2`}>
// //         <Text style={tw`font-semibold text-green-800`}>
// //           Document {index + 1} ({item.document_type})
// //         </Text>
// //         <StatusIndicator status={item.document_status} />
// //       </View>

// //       <Image
// //         source={{ uri: item.document_url }}
// //         style={tw`w-full h-40 rounded-lg bg-gray-100`}
// //         resizeMode="contain"
// //       />
// //     </View>
// //   );

// //   /* ---------- UI ---------- */
// //   return (
// //     <View style={tw`flex-1 bg-green-50`}>
// //       {/* Header */}
// //       <View style={tw`flex-row items-center p-5 bg-green-600`}>
// //         <TouchableOpacity onPress={() => navigation.goBack()}>
// //           <ArrowLeft size={22} color="white" />
// //         </TouchableOpacity>
// //         <Text style={tw`text-xl font-bold text-white ml-3`}>
// //           KYC Verification
// //         </Text>
// //       </View>

// //       <ScrollView
// //         style={tw`flex-1 p-5`}
// //         refreshControl={
// //           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
// //         }
// //       >
// //         {/* Step 1: Create Linked Account */}
// //         {!linkedAccountCreated && (
// //           <TouchableOpacity
// //             onPress={createLinkedAccount}
// //             style={tw`bg-green-700 p-4 rounded-xl mb-5`}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color="white" />
// //             ) : (
// //               <Text style={tw`text-white text-center font-bold`}>
// //                 Create Razorpay Linked Account
// //               </Text>
// //             )}
// //           </TouchableOpacity>
// //         )}

// //         {/* Document Type Selector */}
// //         <View style={tw`flex-row justify-between mb-4`}>
// //           {['pan', 'bank_account', 'address'].map(type => (
// //             <TouchableOpacity
// //               key={type}
// //               onPress={() => setDocType(type as any)}
// //               style={tw`${docType === type ? 'bg-green-600' : 'bg-white'} px-4 py-2 rounded-full`}
// //             >
// //               <Text
// //                 style={tw`${docType === type ? 'text-white' : 'text-green-700'} font-semibold`}
// //               >
// //                 {type.toUpperCase()}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* Extra Fields */}
// //         {docType === 'pan' && (
// //           <TextInput
// //             placeholder="PAN Number"
// //             value={panNumber}
// //             onChangeText={setPanNumber}
// //             style={tw`bg-white p-4 rounded-xl mb-3`}
// //           />
// //         )}

// //         {docType === 'bank_account' && (
// //           <>
// //             <TextInput
// //               placeholder="Account Number"
// //               value={accountNumber}
// //               onChangeText={setAccountNumber}
// //               style={tw`bg-white p-4 rounded-xl mb-3`}
// //             />
// //             <TextInput
// //               placeholder="IFSC Code"
// //               value={ifsc}
// //               onChangeText={setIfsc}
// //               style={tw`bg-white p-4 rounded-xl mb-3`}
// //             />
// //           </>
// //         )}

// //         {docType === 'address' && (
// //           <TextInput
// //             placeholder="Address Line 1"
// //             value={addressLine1}
// //             onChangeText={setAddressLine1}
// //             style={tw`bg-white p-4 rounded-xl mb-3`}
// //           />
// //         )}

// //         {/* Image Picker */}
// //         <TouchableOpacity
// //           onPress={handlePickImage}
// //           style={tw`bg-white p-4 rounded-xl flex-row justify-center mb-4`}
// //         >
// //           <ImageIcon size={20} color="#047857" />
// //           <Text style={tw`ml-2 text-green-700 font-semibold`}>
// //             {selectedImage ? 'Change Image' : 'Select Image'}
// //           </Text>
// //         </TouchableOpacity>

// //         {/* Upload Button */}
// //         <TouchableOpacity
// //           onPress={handleUpload}
// //           disabled={loading}
// //           style={tw`bg-emerald-500 p-4 rounded-full items-center mb-6`}
// //         >
// //           {loading ? (
// //             <ActivityIndicator color="white" />
// //           ) : (
// //             <Text style={tw`text-white font-bold text-lg`}>
// //               Upload KYC Document
// //             </Text>
// //           )}
// //         </TouchableOpacity>

// //         {/* Uploaded Documents */}
// //         <Text style={tw`text-xl font-bold text-green-800 mb-3`}>
// //           Uploaded Documents
// //         </Text>

// //         {documentsLoading ? (
// //           <ActivityIndicator />
// //         ) : documents.length === 0 ? (
// //           <Text style={tw`text-gray-500 text-center`}>
// //             No documents uploaded yet
// //           </Text>
// //         ) : (
// //           <FlatList
// //             data={documents}
// //             keyExtractor={item => item.id.toString()}
// //             renderItem={({ item, index }) => (
// //               <DocumentItem item={item} index={index} />
// //             )}
// //             scrollEnabled={false}
// //           />
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default SpecializationsScreen;








// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Image,
//   Alert,
//   ScrollView,
//   FlatList,
//   RefreshControl,
//   TextInput,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import tw from 'twrnc';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';
// import {
//   ArrowLeft,
//   ImageIcon,
//   CheckCircle,
//   Clock,
//   XCircle,
// } from 'lucide-react-native';

// /* ================= CONFIG ================= */
// const API_BASE = 'https://api.docapp.co.in/api';
// const DOCTOR_ID = 50;

// /* ================= COMPONENT ================= */
// const SpecializationsScreen = () => {
//   const navigation = useNavigation();

//   /* ---------- STEP STATE ---------- */
//   const [step, setStep] = useState(1);

//   /* ---------- STATES ---------- */
//   const [selectedImage, setSelectedImage] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [documents, setDocuments] = useState<any[]>([]);
//   const [documentsLoading, setDocumentsLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   const [docType, setDocType] = useState<'pan' | 'bank_account' | 'address'>(
//     'pan'
//   );
//   const [panNumber, setPanNumber] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const [ifsc, setIfsc] = useState('');
//   const [addressLine1, setAddressLine1] = useState('');

//   /* ---------- API CALLS ---------- */
//   const createLinkedAccount = async () => {
//     try {
//       setLoading(true);
//       await axios.post(
//         `${API_BASE}/doctor/${DOCTOR_ID}/create-linked-account`
//       );
//       Alert.alert('Success', 'Linked account created');
//       setStep(2);
//     } catch (err: any) {
//       Alert.alert('Error', err.response?.data?.error || 'Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDocuments = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/documents/get-documents`);
//       if (res.data?.userDocuments) {
//         setDocuments(res.data.userDocuments);
//       }
//     } catch {
//       Alert.alert('Error', 'Failed to fetch documents');
//     } finally {
//       setDocumentsLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchDocuments();
//   };

//   /* ---------- IMAGE PICK ---------- */
//   const handlePickImage = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       selectionLimit: 1,
//     });
//     if (result.assets?.length) setSelectedImage(result.assets[0]);
//   };

//   /* ---------- UPLOAD ---------- */
//   const handleUpload = async () => {
//     if (!selectedImage) return Alert.alert('Select document image');

//     const formData = new FormData();
//     formData.append('document', {
//       uri: selectedImage.uri,
//       type: selectedImage.type || 'image/jpeg',
//       name: selectedImage.fileName || 'doc.jpg',
//     });
//     formData.append('type', docType);

//     if (docType === 'pan') {
//       if (!panNumber) return Alert.alert('PAN required');
//       formData.append('pan_number', panNumber);
//     }
//     if (docType === 'bank_account') {
//       if (!accountNumber || !ifsc)
//         return Alert.alert('Account & IFSC required');
//       formData.append('account_number', accountNumber);
//       formData.append('ifsc', ifsc);
//     }
//     if (docType === 'address') {
//       if (!addressLine1) return Alert.alert('Address required');
//       formData.append('address_line1', addressLine1);
//     }

//     try {
//       setLoading(true);
//       await axios.post(
//         `${API_BASE}/doctor/${DOCTOR_ID}/upload-kyc`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );
//       Alert.alert('Uploaded', 'Document uploaded successfully');
//       setSelectedImage(null);
//       setStep(2);
//       fetchDocuments();
//     } catch (err: any) {
//       Alert.alert('Error', err.response?.data?.error || 'Upload failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------- STEP INDICATOR ---------- */
//   const StepIndicator = () => {
//     const steps = ['Account', 'Type', 'Details', 'Upload'];
//     return (
//       <View style={tw`flex-row justify-between mb-6`}>
//         {steps.map((s, i) => {
//           const active = step === i + 1;
//           const done = step > i + 1;
//           return (
//             <View key={s} style={tw`items-center flex-1`}>
//               <View
//                 style={[
//                   tw`w-8 h-8 rounded-full items-center justify-center`,
//                   done
//                     ? { backgroundColor: '#10b981' }
//                     : active
//                     ? { backgroundColor: '#047857' }
//                     : { backgroundColor: '#d1d5db' },
//                 ]}
//               >
//                 <Text style={tw`text-white font-bold`}>
//                   {done ? '✓' : i + 1}
//                 </Text>
//               </View>
//               <Text
//                 style={tw`text-xs mt-1 ${
//                   active ? 'text-green-700 font-bold' : 'text-gray-400'
//                 }`}
//               >
//                 {s}
//               </Text>
//             </View>
//           );
//         })}
//       </View>
//     );
//   };

//   /* ---------- STATUS ---------- */
//   const StatusIndicator = ({ status }: { status: string }) => {
//     const map: any = {
//       approved: { icon: CheckCircle, color: '#10b981', text: 'Approved' },
//       rejected: { icon: XCircle, color: '#ef4444', text: 'Rejected' },
//       pending: { icon: Clock, color: '#f59e0b', text: 'Pending' },
//     };
//     const cfg = map[status?.toLowerCase()] || map.pending;
//     const Icon = cfg.icon;
//     return (
//       <View style={tw`flex-row items-center`}>
//         <Icon size={16} color={cfg.color} />
//         <Text style={[tw`ml-1 text-xs font-medium`, { color: cfg.color }]}>
//           {cfg.text}
//         </Text>
//       </View>
//     );
//   };

//   /* ================= UI ================= */
//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       {/* Header */}
//       <View style={tw`flex-row items-center p-5 bg-green-600`}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <ArrowLeft size={22} color="white" />
//         </TouchableOpacity>
//         <Text style={tw`text-xl font-bold text-white ml-3`}>
//           KYC Verification
//         </Text>
//       </View>

//       <ScrollView
//         style={tw`flex-1 p-5`}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         <StepIndicator />

//         {/* STEP 1 */}
//         {step === 1 && (
//           <TouchableOpacity
//             onPress={createLinkedAccount}
//             style={tw`bg-green-700 p-4 rounded-xl`}
//           >
//             {loading ? (
//               <ActivityIndicator color="white" />
//             ) : (
//               <Text style={tw`text-white text-center font-bold`}>
//                 Create Razorpay Linked Account
//               </Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {/* STEP 2 */}
//         {step === 2 && (
//           <View>
//             <Text style={tw`font-bold text-lg mb-3 text-green-800`}>
//               Select Document Type
//             </Text>
//             <View style={tw`flex-row justify-between`}>
//               {['pan', 'bank_account', 'address'].map(t => (
//                 <TouchableOpacity
//                   key={t}
//                   onPress={() => {
//                     setDocType(t as any);
//                     setStep(3);
//                   }}
//                   style={tw`bg-white px-4 py-3 rounded-xl`}
//                 >
//                   <Text style={tw`text-green-700 font-semibold`}>
//                     {t.toUpperCase()}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         )}

//         {/* STEP 3 */}
//         {step === 3 && (
//           <View>
//             {docType === 'pan' && (
//               <TextInput
//                 placeholder="PAN Number"
//                 value={panNumber}
//                 onChangeText={setPanNumber}
//                 style={tw`bg-white p-4 rounded-xl mb-4`}
//               />
//             )}
//             {docType === 'bank_account' && (
//               <>
//                 <TextInput
//                   placeholder="Account Number"
//                   value={accountNumber}
//                   onChangeText={setAccountNumber}
//                   style={tw`bg-white p-4 rounded-xl mb-3`}
//                 />
//                 <TextInput
//                   placeholder="IFSC Code"
//                   value={ifsc}
//                   onChangeText={setIfsc}
//                   style={tw`bg-white p-4 rounded-xl mb-3`}
//                 />
//               </>
//             )}
//             {docType === 'address' && (
//               <TextInput
//                 placeholder="Address Line 1"
//                 value={addressLine1}
//                 onChangeText={setAddressLine1}
//                 style={tw`bg-white p-4 rounded-xl mb-3`}
//               />
//             )}

//             <TouchableOpacity
//               onPress={() => setStep(4)}
//               style={tw`bg-green-600 p-4 rounded-full`}
//             >
//               <Text style={tw`text-white text-center font-bold`}>
//                 Continue
//               </Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* STEP 4 */}
//         {step === 4 && (
//           <View>
//             <TouchableOpacity
//               onPress={handlePickImage}
//               style={tw`bg-white p-4 rounded-xl flex-row justify-center mb-4`}
//             >
//               <ImageIcon size={20} color="#047857" />
//               <Text style={tw`ml-2 text-green-700 font-semibold`}>
//                 {selectedImage ? 'Change Image' : 'Select Image'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handleUpload}
//               style={tw`bg-emerald-500 p-4 rounded-full`}
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={tw`text-white text-center font-bold`}>
//                   Upload Document
//                 </Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* DOCUMENT LIST */}
//         <Text style={tw`text-xl font-bold text-green-800 mt-8 mb-3`}>
//           Uploaded Documents
//         </Text>

//         {documentsLoading ? (
//           <ActivityIndicator />
//         ) : (
//           <FlatList
//             data={documents}
//             keyExtractor={item => item.id.toString()}
//             renderItem={({ item, index }) => (
//               <View style={tw`bg-white p-4 mb-3 rounded-xl`}>
//                 <View style={tw`flex-row justify-between mb-2`}>
//                   <Text style={tw`font-semibold`}>
//                     Document {index + 1} ({item.document_type})
//                   </Text>
//                   <StatusIndicator status={item.document_status} />
//                 </View>
//                 <Image
//                   source={{ uri: item.document_url }}
//                   style={tw`h-40 rounded-lg`}
//                   resizeMode="contain"
//                 />
//               </View>
//             )}
//             scrollEnabled={false}
//           />
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default SpecializationsScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
//   ScrollView,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import tw from 'twrnc';
// import axios from 'axios';
// import { ArrowLeft, CheckCircle, Clock } from 'lucide-react-native';

// /* ================= CONFIG ================= */
// const API_BASE = 'https://api.docapp.co.in/api';
// const DOCTOR_ID = 53;

// /* ================= COMPONENT ================= */
// const SpecializationsScreen = () => {
//   const navigation = useNavigation();

//   const [loading, setLoading] = useState(false);
//   const [account, setAccount] = useState<any>(null);
//   const [statusLoading, setStatusLoading] = useState(true);

//   /* ================= START ONBOARDING ================= */
//   const startOnboarding = async () => {
//     try {
//       setLoading(true);

//       await axios.post(
//         `${API_BASE}/kyc/doctor/${DOCTOR_ID}/start-onboarding`,
//         {
//           legal_business_name: 'Dr Anupraja',
//           contact_name: 'Dr Anupraja',
//           business_type: 'individual',
//           subcategory: 'clinic',
//           address_line1: '123 Test Street',
//           address_line2: 'Near Test Hospital',
//           city: 'Bengaluru',
//           state: 'KARNATAKA',
//           postal_code: '560034',
//           business_pan: 'AVOJB1111K',
//           personal_pan: 'AVOPB1234K',
//           beneficiary_name: 'Dr Anupraja',
//           account_number: '222222222222',
//           ifsc_code: 'HDFC0000001',
//         }
//       );

//       Alert.alert('Success', 'Onboarding started');
//       fetchStatus();
//     } catch (err: any) {
//       Alert.alert('Error', err.response?.data?.message || 'Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= FETCH STATUS ================= */
//   const fetchStatus = async () => {
//     try {
//       setStatusLoading(true);

//       const res = await axios.get(
//         `${API_BASE}/kyc/doctor/${DOCTOR_ID}/onboarding-status`
//       );

//       setAccount(res.data.account);
//     } catch {
//       Alert.alert('Error', 'Failed to fetch onboarding status');
//     } finally {
//       setStatusLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStatus();
//   }, []);

//   /* ================= STATUS BADGE ================= */
//   const StatusBadge = ({ status }: { status: string }) => {
//     const isCreated = status === 'created';

//     return (
//       <View style={tw`flex-row items-center mt-1`}>
//         {isCreated ? (
//           <Clock size={16} color="#f59e0b" />
//         ) : (
//           <CheckCircle size={16} color="#10b981" />
//         )}
//         <Text
//           style={[
//             tw`ml-2 font-semibold`,
//             { color: isCreated ? '#f59e0b' : '#10b981' },
//           ]}
//         >
//           {status?.toUpperCase()}
//         </Text>
//       </View>
//     );
//   };

//   /* ================= STATUS READABLE ================= */
//   const readableStatus: any = {
//     created: 'KYC Submitted',
//     activated: 'KYC Verified',
//     suspended: 'KYC Rejected',
//   };

//   /* ================= UI ================= */
//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       {/* HEADER */}
//       <View style={tw`flex-row items-center p-5 bg-green-600`}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <ArrowLeft size={22} color="white" />
//         </TouchableOpacity>
//         <Text style={tw`text-xl font-bold text-white ml-3`}>
//           KYC Onboarding
//         </Text>
//       </View>

//       <ScrollView style={tw`flex-1`} contentContainerStyle={tw`p-5 pb-10`}>
//         {/* START BUTTON */}
//         <TouchableOpacity
//           onPress={startOnboarding}
//           style={tw`bg-green-700 p-4 rounded-xl`}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={tw`text-white text-center font-bold`}>
//               Start Razorpay Onboarding
//             </Text>
//           )}
//         </TouchableOpacity>

//         {/* DETAILS CARD */}
//         <View style={tw`mt-6 bg-white p-5 rounded-xl`}>
//           <Text style={tw`text-lg font-bold text-green-800 mb-3`}>
//             Onboarding Details
//           </Text>

//           {statusLoading ? (
//             <ActivityIndicator />
//           ) : account ? (
//             <>
//               <Text style={tw`font-semibold`}>Account ID</Text>
//               <Text>{account.id}</Text>

//               <Text style={tw`font-semibold mt-3`}>Status</Text>
//               <Text>{readableStatus[account.status] || account.status}</Text>
//               <StatusBadge status={account.status} />

//               <Text style={tw`font-semibold mt-3`}>Business Name</Text>
//               <Text>{account.legal_business_name}</Text>

//               <Text style={tw`font-semibold mt-3`}>Contact Name</Text>
//               <Text>{account.contact_name}</Text>

//               <Text style={tw`font-semibold mt-3`}>Email</Text>
//               <Text>{account.email}</Text>

//               <Text style={tw`font-semibold mt-3`}>Phone</Text>
//               <Text>{account.phone}</Text>

//               <Text style={tw`font-semibold mt-3`}>Category</Text>
//               <Text>{account.profile?.category}</Text>

//               <Text style={tw`font-semibold mt-3`}>Subcategory</Text>
//               <Text>{account.profile?.subcategory}</Text>

//               <Text style={tw`font-semibold mt-3`}>Business Type</Text>
//               <Text>{account.business_type}</Text>

//               <Text style={tw`font-semibold mt-3`}>PAN</Text>
//               <Text>{account.legal_info?.pan}</Text>

//               <Text style={tw`font-semibold mt-3`}>Address</Text>
//               <Text>
//                 {account.profile?.addresses?.registered?.street1},{' '}
//                 {account.profile?.addresses?.registered?.street2}
//               </Text>
//               <Text>
//                 {account.profile?.addresses?.registered?.city},{' '}
//                 {account.profile?.addresses?.registered?.state} -{' '}
//                 {account.profile?.addresses?.registered?.postal_code}
//               </Text>

//               <Text style={tw`font-semibold mt-3`}>Created At</Text>
//               <Text>
//                 {new Date(account.created_at * 1000).toLocaleString()}
//               </Text>
//             </>
//           ) : (
//             <Text>No onboarding found</Text>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default SpecializationsScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react-native';
import { useUser } from '../../screens/contexts/UserContext';

/* ================= CONFIG ================= */
const API_BASE = 'https://api.docapp.co.in/api';


/* ================= COMPONENT ================= */
const SpecializationsScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const DOCTOR_ID = user?.doctorProfile?.id;

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState<any>({
    legal_business_name: '',
    contact_name: '',
    business_type: 'individual',
    subcategory: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    business_pan: '',
    personal_pan: '',
    beneficiary_name: '',
    account_number: '',
    ifsc_code: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  /* ================= FETCH STATUS ================= */
  const fetchStatus = async () => {
    try {
      setStatusLoading(true);

      const res = await axios.get(
        `${API_BASE}/kyc/doctor/${DOCTOR_ID}/onboarding-status`
      );

      if (res.data?.account) {
        setAccount(res.data.account);
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } catch (err: any) {
      if (err.response?.data?.message === 'Doctor not onboarded yet') {
        setShowForm(true);
      } else {
        Alert.alert('Error', 'Failed to fetch status');
      }
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  /* ================= START ONBOARDING ================= */
  const startOnboarding = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${API_BASE}/kyc/doctor/${DOCTOR_ID}/start-onboarding`,
        form
      );

      Alert.alert('Success', 'Onboarding started');
      fetchStatus();
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATUS BADGE ================= */
  const StatusBadge = ({ status }: { status: string }) => {
    const isCreated = status === 'created';
    return (
      <View style={tw`flex-row items-center mt-1`}>
        {isCreated ? (
          <Clock size={16} color="#f59e0b" />
        ) : (
          <CheckCircle size={16} color="#10b981" />
        )}
        <Text
          style={[
            tw`ml-2 font-semibold`,
            { color: isCreated ? '#f59e0b' : '#10b981' },
          ]}
        >
          {status?.toUpperCase()}
        </Text>
      </View>
    );
  };

  /* ================= UI ================= */
  return (
    <View style={tw`flex-1 bg-green-50`}>
      {/* HEADER */}
      <View style={tw`flex-row items-center p-5 bg-green-600`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-bold text-white ml-3`}>
          KYC Onboarding
        </Text>
      </View>

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={[tw`p-5 pb-10`, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        {statusLoading ? (
          <ActivityIndicator />
        ) : showForm ? (
          <>
            <Text style={tw`text-lg font-bold mb-3`}>Register KYC</Text>

            {Object.keys(form).map(key => (
              <TextInput
                key={key}
                placeholder={key.replace(/_/g, ' ')}
                value={form[key]}
                onChangeText={v => handleChange(key, v)}
                style={tw`bg-white p-4 rounded-xl mb-3`}
              />
            ))}

            <TouchableOpacity
              onPress={startOnboarding}
              style={tw`bg-green-700 p-4 rounded-xl`}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-center font-bold`}>
                  Submit KYC
                </Text>
              )}
            </TouchableOpacity>

          </>
        ) : (
          <View style={tw`bg-white p-5 rounded-xl`}>
            <Text style={tw`font-semibold`}>Account ID</Text>
            <Text>{account.id}</Text>

            <Text style={tw`font-semibold mt-3`}>Status</Text>
            <StatusBadge status={account.status} />

            <Text style={tw`font-semibold mt-3`}>Business Name</Text>
            <Text>{account.legal_business_name}</Text>

            <Text style={tw`font-semibold mt-3`}>PAN</Text>
            <Text>{account.legal_info?.pan}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SpecializationsScreen;