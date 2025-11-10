// // // // // // // // // import React from 'react';
// // // // // // // // // import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // // // // // // import { Plus, Medal, Star, Brain, Heart, Activity, Stethoscope } from 'lucide-react-native';
// // // // // // // // // import { useNavigation } from '@react-navigation/native';
// // // // // // // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // // // // // // import { DoctorStackParamList } from '../types/navigation';
// // // // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // // // import tw from 'twrnc';

// // // // // // // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // // // // // // interface Specialization {
// // // // // // // // //   title: string;
// // // // // // // // //   icon: React.ReactNode;
// // // // // // // // //   years: number;
// // // // // // // // //   expertise: string[];
// // // // // // // // // }

// // // // // // // // // const SpecializationsScreen = () => {
// // // // // // // // //   const navigation = useNavigation<DoctorNavigationProp>();
  
// // // // // // // // //   const specializations: Specialization[] = [
// // // // // // // // //     {
// // // // // // // // //       title: 'Cardiology',
// // // // // // // // //       icon: <Heart size={24} color="#16a34a" />,
// // // // // // // // //       years: 10,
// // // // // // // // //       expertise: ['Interventional Cardiology', 'Heart Failure Management'],
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       title: 'Internal Medicine',
// // // // // // // // //       icon: <Stethoscope size={24} color="#16a34a" />,
// // // // // // // // //       years: 12,
// // // // // // // // //       expertise: ['General Medicine', 'Preventive Care'],
// // // // // // // // //     },    {
// // // // // // // // //       title: 'Critical Care',
// // // // // // // // //       icon: <Activity size={24} color="#16a34a" />,
// // // // // // // // //       years: 8,
// // // // // // // // //       expertise: ['ICU Management', 'Emergency Medicine'],
// // // // // // // // //     },
// // // // // // // // //   ];

// // // // // // // // //   const certifications = [
// // // // // // // // //     'American Board of Cardiology',
// // // // // // // // //     'Fellowship in Interventional Cardiology',
// // // // // // // // //     'Advanced Cardiac Life Support (ACLS)',
// // // // // // // // //   ];

// // // // // // // // //   const handleSaveChanges = () => {
// // // // // // // // //     // Logic to save changes
// // // // // // // // //     Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{ 
// // // // // // // // //       text: 'OK',
// // // // // // // // //       onPress: () => navigation.goBack()
// // // // // // // // //     }]);
// // // // // // // // //   };
// // // // // // // // //   return (
// // // // // // // // //     <View style={tw`flex-1 bg-green-50`}>
// // // // // // // // //       <DoctorHeader title="Specializations" showSettings showNotifications />
// // // // // // // // //       <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
// // // // // // // // //         <TouchableOpacity 
// // // // // // // // //           style={tw`bg-emerald-500 p-2 rounded-full`} 
// // // // // // // // //           activeOpacity={0.85}
// // // // // // // // //           onPress={() => navigation.navigate('AddSpecialization')}
// // // // // // // // //         >
// // // // // // // // //           <Plus size={20} color="white" />
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //       </View>

// // // // // // // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // // // // // // //         <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
// // // // // // // // //         <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

// // // // // // // // //         {specializations.map((spec, idx) => (
// // // // // // // // //           <View key={idx} style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // //             <View style={tw`flex-row items-center mb-3`}>
// // // // // // // // //               {spec.icon}
// // // // // // // // //               <View style={tw`ml-3 flex-1`}>
// // // // // // // // //                 <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
// // // // // // // // //                 <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
// // // // // // // // //               </View>              <TouchableOpacity 
// // // // // // // // //                 style={tw`bg-green-100 p-2 rounded-full`}
// // // // // // // // //                 onPress={() => Alert.alert('Primary Specialization', 'Mark this as your primary specialization?', [
// // // // // // // // //                   { text: 'Cancel', style: 'cancel' },
// // // // // // // // //                   { text: 'Set as Primary', style: 'default' }
// // // // // // // // //                 ])}
// // // // // // // // //               >
// // // // // // // // //                 <Star size={20} color="#1d9be3" />
// // // // // // // // //               </TouchableOpacity>
// // // // // // // // //             </View>
// // // // // // // // //             <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
// // // // // // // // //             {spec.expertise.map((exp, i) => (
// // // // // // // // //               <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
// // // // // // // // //             ))}
// // // // // // // // //           </View>
// // // // // // // // //         ))}

// // // // // // // // //         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // // //           <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
// // // // // // // // //           {certifications.map((cert, idx) => (
// // // // // // // // //             <View key={idx} style={tw`flex-row items-center mb-2`}>
// // // // // // // // //               <Medal size={16} color="#1d9be3" />
// // // // // // // // //               <Text style={tw`text-gray-600 ml-2`}>{cert}</Text>
// // // // // // // // //             </View>
// // // // // // // // //           ))}
// // // // // // // // //         </View>
        
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
// // // // // // // // //           activeOpacity={0.85}
// // // // // // // // //           onPress={handleSaveChanges}
// // // // // // // // //         >
// // // // // // // // //           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //       </ScrollView>
// // // // // // // // //     </View>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default SpecializationsScreen;

// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// // // // // // // // import { Plus, Medal, Star, Heart, Stethoscope, Activity } from 'lucide-react-native';
// // // // // // // // import { useNavigation } from '@react-navigation/native';
// // // // // // // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // // // // // // import { DoctorStackParamList } from '../types/navigation';
// // // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // // import tw from 'twrnc';

// // // // // // // // // --- TYPE DEFINITIONS ---
// // // // // // // // type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// // // // // // // // interface Specialization {
// // // // // // // //   id: string;
// // // // // // // //   title: string;
// // // // // // // //   icon: React.ReactNode;
// // // // // // // //   years: number;
// // // // // // // //   expertise: string[];
// // // // // // // //   isPrimary: boolean;
// // // // // // // // }

// // // // // // // // // --- MOCK INITIAL DATA (In a real app, this would come from an API) ---
// // // // // // // // const initialSpecializations: Specialization[] = [
// // // // // // // //   {
// // // // // // // //     id: 'spec_1',
// // // // // // // //     title: 'Cardiology',
// // // // // // // //     icon: <Heart size={24} color="#16a34a" />,
// // // // // // // //     years: 10,
// // // // // // // //     expertise: ['Interventional Cardiology', 'Heart Failure Management'],
// // // // // // // //     isPrimary: true,
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: 'spec_2',
// // // // // // // //     title: 'Internal Medicine',
// // // // // // // //     icon: <Stethoscope size={24} color="#16a34a" />,
// // // // // // // //     years: 12,
// // // // // // // //     expertise: ['General Medicine', 'Preventive Care'],
// // // // // // // //     isPrimary: false,
// // // // // // // //   },
// // // // // // // //   {
// // // // // // // //     id: 'spec_3',
// // // // // // // //     title: 'Critical Care',
// // // // // // // //     icon: <Activity size={24} color="#16a34a" />,
// // // // // // // //     years: 8,
// // // // // // // //     expertise: ['ICU Management', 'Emergency Medicine'],
// // // // // // // //     isPrimary: false,
// // // // // // // //   },
// // // // // // // // ];

// // // // // // // // const initialCertifications = [
// // // // // // // //   { id: 'cert_1', text: 'American Board of Cardiology' },
// // // // // // // //   { id: 'cert_2', text: 'Fellowship in Interventional Cardiology' },
// // // // // // // //   { id: 'cert_3', text: 'Advanced Cardiac Life Support (ACLS)' },
// // // // // // // // ];


// // // // // // // // // --- REUSABLE CARD COMPONENTS ---

// // // // // // // // // Card for displaying a single specialization
// // // // // // // // const SpecializationCard = ({ spec, onSetPrimary }: { spec: Specialization; onSetPrimary: (id: string) => void; }) => (
// // // // // // // //   <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // //     <View style={tw`flex-row items-center mb-3`}>
// // // // // // // //       {spec.icon}
// // // // // // // //       <View style={tw`ml-3 flex-1`}>
// // // // // // // //         <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
// // // // // // // //         <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
// // // // // // // //       </View>
// // // // // // // //       <TouchableOpacity
// // // // // // // //         style={tw`bg-green-100 p-2 rounded-full`}
// // // // // // // //         onPress={() => onSetPrimary(spec.id)}
// // // // // // // //       >
// // // // // // // //         <Star size={20} color={spec.isPrimary ? '#f59e0b' : '#a3a3a3'} />
// // // // // // // //       </TouchableOpacity>
// // // // // // // //     </View>
// // // // // // // //     <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
// // // // // // // //     {spec.expertise.map((exp, i) => (
// // // // // // // //       <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
// // // // // // // //     ))}
// // // // // // // //   </View>
// // // // // // // // );

// // // // // // // // // Card for displaying certifications
// // // // // // // // const CertificationsCard = ({ certifications }: { certifications: {id: string, text: string}[] }) => (
// // // // // // // //   <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
// // // // // // // //     <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
// // // // // // // //     {certifications.map((cert) => (
// // // // // // // //       <View key={cert.id} style={tw`flex-row items-center mb-2`}>
// // // // // // // //         <Medal size={16} color="#1d9be3" />
// // // // // // // //         <Text style={tw`text-gray-600 ml-2`}>{cert.text}</Text>
// // // // // // // //       </View>
// // // // // // // //     ))}
// // // // // // // //   </View>
// // // // // // // // );


// // // // // // // // // --- MAIN SCREEN COMPONENT ---

// // // // // // // // const SpecializationsScreen = () => {
// // // // // // // //   const navigation = useNavigation<DoctorNavigationProp>();
  
// // // // // // // //   // --- STATE MANAGEMENT ---
// // // // // // // //   const [specializations, setSpecializations] = useState<Specialization[]>(initialSpecializations);
// // // // // // // //   const [certifications, setCertifications] = useState(initialCertifications);

// // // // // // // //   // --- HANDLER FUNCTIONS ---
// // // // // // // //   const handleSetPrimary = (id: string) => {
// // // // // // // //     Alert.alert(
// // // // // // // //       'Primary Specialization',
// // // // // // // //       'Mark this as your primary specialization?',
// // // // // // // //       [
// // // // // // // //         { text: 'Cancel', style: 'cancel' },
// // // // // // // //         { 
// // // // // // // //           text: 'Set as Primary', 
// // // // // // // //           style: 'default',
// // // // // // // //           onPress: () => {
// // // // // // // //             const updatedSpecs = specializations.map(spec => ({
// // // // // // // //               ...spec,
// // // // // // // //               isPrimary: spec.id === id,
// // // // // // // //             }));
// // // // // // // //             setSpecializations(updatedSpecs);
// // // // // // // //           }
// // // // // // // //         }
// // // // // // // //       ]
// // // // // // // //     );
// // // // // // // //   };

// // // // // // // //   const handleSaveChanges = () => {
// // // // // // // //     // In a real app, this is where you would make an API call to your backend
// // // // // // // //     // to save the updated `specializations` and `certifications` state.
// // // // // // // //     // e.g., api.updateDoctorProfile({ specializations, certifications });

// // // // // // // //     Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{
// // // // // // // //       text: 'OK',
// // // // // // // //       onPress: () => navigation.goBack()
// // // // // // // //     }]);
// // // // // // // //   };
  
// // // // // // // //   return (
// // // // // // // //     <View style={tw`flex-1 bg-green-50`}>
// // // // // // // //       <DoctorHeader title="Specializations" showSettings showNotifications />
      
// // // // // // // //       <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
// // // // // // // //         <TouchableOpacity
// // // // // // // //           style={tw`bg-emerald-500 p-2 rounded-full`}
// // // // // // // //           activeOpacity={0.85}
// // // // // // // //           onPress={() => navigation.navigate('AddSpecialization')}
// // // // // // // //         >
// // // // // // // //           <Plus size={20} color="white" />
// // // // // // // //         </TouchableOpacity>
// // // // // // // //       </View>

// // // // // // // //       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
// // // // // // // //         <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
// // // // // // // //         <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

// // // // // // // //         {specializations.map((spec) => (
// // // // // // // //           <SpecializationCard 
// // // // // // // //             key={spec.id} 
// // // // // // // //             spec={spec} 
// // // // // // // //             onSetPrimary={handleSetPrimary} 
// // // // // // // //           />
// // // // // // // //         ))}

// // // // // // // //         <CertificationsCard certifications={certifications} />
        
// // // // // // // //         <TouchableOpacity
// // // // // // // //           style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
// // // // // // // //           activeOpacity={0.85}
// // // // // // // //           onPress={handleSaveChanges}
// // // // // // // //         >
// // // // // // // //           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
// // // // // // // //         </TouchableOpacity>
// // // // // // // //       </ScrollView>
// // // // // // // //     </View>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default SpecializationsScreen;
















// // // // // // // import React, { useState } from 'react';
// // // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // // // import DocumentPicker from '@react-native-documents/picker';
// // // // // // // import tw from 'twrnc';
// // // // // // // import axios from 'axios';

// // // // // // // const SpecializationsScreen = () => {
// // // // // // //   const [selectedFile, setSelectedFile] = useState<any>(null);
// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   // Pick a document
// // // // // // //   const handlePickDocument = async () => {
// // // // // // //     try {
// // // // // // //       const result = await DocumentPicker.pickSingle({
// // // // // // //         type: [DocumentPicker.types.allFiles],
// // // // // // //       });
// // // // // // //       setSelectedFile(result);
// // // // // // //     } catch (err) {
// // // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // // //         console.log('User cancelled document picker');
// // // // // // //       } else {
// // // // // // //         console.error('Document picker error:', err);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Upload document to API
// // // // // // //   const handleUpload = async () => {
// // // // // // //     if (!selectedFile) {
// // // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // // // //     formData.append('document', {
// // // // // // //       uri: selectedFile.uri,
// // // // // // //       type: selectedFile.type,
// // // // // // //       name: selectedFile.name,
// // // // // // //     } as any);

// // // // // // //     setLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await axios.post(
// // // // // // //         'http://127.0.0.1:5000/api/documents/upload-document',
// // // // // // //         formData,
// // // // // // //         {
// // // // // // //           headers: {
// // // // // // //             'Content-Type': 'multipart/form-data',
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // // //     } catch (error: any) {
// // // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
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
// // // // // // //         disabled={loading}
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
// // // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// // // // // // import DocumentPicker from '@react-native-documents/picker';
// // // // // // import tw from 'twrnc';
// // // // // // import axios from 'axios';

// // // // // // const SpecializationsScreen = () => {
// // // // // //   const [selectedFile, setSelectedFile] = useState<any>(null);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   // Pick a document
// // // // // //   const handlePickDocument = async () => {
// // // // // //     try {
// // // // // //       // ✅ FIX: Use array destructuring here. pickSingle often returns an array [file]
// // // // // //       const [file] = await DocumentPicker.pickSingle({
// // // // // //         type: [DocumentPicker.types.allFiles],
// // // // // //       });
      
// // // // // //       // Set the file object if it exists (i.e., not cancelled)
// // // // // //       if (file) {
// // // // // //           setSelectedFile(file);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       if (DocumentPicker.isCancel(err)) {
// // // // // //         console.log('User cancelled document picker');
// // // // // //       } else {
// // // // // //         console.error('Document picker error:', err);
// // // // // //         // Alert the user to general errors, excluding cancellation
// // // // // //         Alert.alert('Picker Error', 'Could not open document picker or select file.');
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   // Upload document to API
// // // // // //   const handleUpload = async () => {
// // // // // //     if (!selectedFile) {
// // // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // // //       return;
// // // // // //     }

// // // // // //     const formData = new FormData();
// // // // // //     // Assuming 'documentName' is a separate field for the server
// // // // // //     formData.append('documentName', selectedFile.name || 'example');
    
// // // // // //     // The main file object for multipart/form-data upload
// // // // // //     formData.append('document', {
// // // // // //       uri: selectedFile.uri,
// // // // // //       type: selectedFile.type,
// // // // // //       name: selectedFile.name,
// // // // // //     } as any);

// // // // // //     setLoading(true);
// // // // // //     try {
// // // // // //       const response = await axios.post(
// // // // // //         // NOTE: For a real device/emulator to reach a local server, 
// // // // // //         // you might need to change '127.0.0.1' to your actual local IP (e.g., 192.168.x.x) or '10.0.2.2' (Android emulator).
// // // // // //         'http://127.0.0.1:5000/api/documents/upload-document',
// // // // // //         formData,
// // // // // //         {
// // // // // //           headers: {
// // // // // //             // Note: The 'Content-Type' header for 'multipart/form-data' is usually set 
// // // // // //             // automatically by axios/FormData in React Native, but explicitly setting it is fine.
// // // // // //             'Content-Type': 'multipart/form-data', 
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       console.log('✅ Upload Response:', response.data);
// // // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // // //       // Optional: Clear the selected file after successful upload
// // // // // //       setSelectedFile(null); 
// // // // // //     } catch (error: any) {
// // // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // // //         Upload Document for Verification
// // // // // //       </Text>

// // // // // //       <TouchableOpacity
// // // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // // //         onPress={handlePickDocument}
// // // // // //       >
// // // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // // //         </Text>
// // // // // //       </TouchableOpacity>

// // // // // //       <TouchableOpacity
// // // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // // //         onPress={handleUpload}
// // // // // //         disabled={loading || !selectedFile} // Disable if loading or no file is selected
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
// // // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// // // // // // import DocumentPicker from '@react-native-document-picker/picker'; // check correct import for your lib version
// // // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // import DocumentPicker from 'react-native-document-picker';
// // // // // import tw from 'twrnc';
// // // // // import axios from 'axios';

// // // // // const SpecializationsScreen = () => {
// // // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const handlePickDocument = async () => {
// // // // //     try {
// // // // //       // DocumentPicker.pickSingle returns a single file object, not an array
// // // // //       const file = await DocumentPicker.pickSingle({
// // // // //         type: [DocumentPicker.types.allFiles],
// // // // //       });
// // // // //       setSelectedFile(file);
// // // // //     } catch (err) {
// // // // //       if (DocumentPicker.isCancel(err)) {
// // // // //         console.log('User cancelled document picker');
// // // // //       } else {
// // // // //         console.error('Document picker error:', err);
// // // // //         Alert.alert('Picker Error', 'Could not open document picker or select file.');
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   const handleUpload = async () => {
// // // // //     if (!selectedFile) {
// // // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // // //       return;
// // // // //     }

// // // // //     const formData = new FormData();
// // // // //     formData.append('documentName', selectedFile.name || 'example');
// // // // //     formData.append('document', {
// // // // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // // // //       type: selectedFile.type || 'application/octet-stream',
// // // // //       name: selectedFile.name || 'document',
// // // // //     });

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const response = await axios.post(
// // // // //         'https://landing.docapp.co.in/api/documents/upload-document',
// // // // //         formData,
// // // // //         {
// // // // //           headers: {
// // // // //             // Let axios/form-data set boundary and content-type
// // // // //             'Content-Type': 'multipart/form-data',
// // // // //             // If your API requires authentication, include tokens here
// // // // //           },
// // // // //         }
// // // // //       );
// // // // //       console.log('✅ Upload Response:', response.data);
// // // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // // //       setSelectedFile(null);
// // // // //     } catch (error) {
// // // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // // //         Upload Document for Verification
// // // // //       </Text>
// // // // //       <TouchableOpacity
// // // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // // //         onPress={handlePickDocument}
// // // // //       >
// // // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // // //           {selectedFile ? selectedFile.name : 'Select Document'}
// // // // //         </Text>
// // // // //       </TouchableOpacity>
// // // // //       <TouchableOpacity
// // // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // // //         onPress={handleUpload}
// // // // //         disabled={loading || !selectedFile}
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
// // // // import { View, Text, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
// // // // import FilePickerManager from 'react-native-file-picker';
// // // // import tw from 'twrnc';
// // // // import axios from 'axios';

// // // // const SpecializationsScreen = () => {
// // // //   const [selectedFile, setSelectedFile] = useState(null);
// // // //   const [loading, setLoading] = useState(false);

// // // //   const handlePickDocument = () => {
// // // //     FilePickerManager.showFilePicker(null, (response) => {
// // // //       if (response.didCancel) {
// // // //         console.log('User cancelled file picker');
// // // //       } else if (response.error) {
// // // //         console.error('FilePicker error:', response.error);
// // // //         Alert.alert('Picker Error', 'Could not open file picker or select file.');
// // // //       } else {
// // // //         setSelectedFile(response);
// // // //       }
// // // //     });
// // // //   };

// // // //   const handleUpload = async () => {
// // // //     if (!selectedFile) {
// // // //       Alert.alert('No Document', 'Please select a document to upload.');
// // // //       return;
// // // //     }

// // // //     const formData = new FormData();
// // // //     formData.append('documentName', selectedFile.fileName || 'example');
// // // //     formData.append('document', {
// // // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // // //       type: selectedFile.type || 'application/octet-stream',
// // // //       name: selectedFile.fileName || 'document',
// // // //     });

// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axios.post(
// // // //         'https://landing.docapp.co.in/api/documents/upload-document',
// // // //         formData,
// // // //         {
// // // //           headers: {
// // // //             'Content-Type': 'multipart/form-data',
// // // //           },
// // // //         }
// // // //       );
// // // //       console.log('✅ Upload Response:', response.data);
// // // //       Alert.alert('Success', 'Document uploaded successfully!');
// // // //       setSelectedFile(null);
// // // //     } catch (error) {
// // // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // // //       Alert.alert('Error', 'Failed to upload the document. Check your server status and network configuration.');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // // //         Upload Document for Verification
// // // //       </Text>
// // // //       <TouchableOpacity
// // // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // // //         onPress={handlePickDocument}
// // // //       >
// // // //         <Text style={tw`text-green-700 font-semibold`}>
// // // //           {selectedFile ? selectedFile.fileName : 'Select Document'}
// // // //         </Text>
// // // //       </TouchableOpacity>
// // // //       <TouchableOpacity
// // // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // // //         onPress={handleUpload}
// // // //         disabled={loading || !selectedFile}
// // // //       >
// // // //         {loading ? (
// // // //           <ActivityIndicator color="white" />
// // // //         ) : (
// // // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // // //         )}
// // // //       </TouchableOpacity>
// // // //     </View>
// // // //   );
// // // // };

// // // // export default SpecializationsScreen;




// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TouchableOpacity,
// // //   Alert,
// // //   ActivityIndicator,
// // //   Platform,
// // //   PermissionsAndroid,
// // // } from 'react-native';
// // // import FilePickerManager from 'react-native-file-picker';
// // // import tw from 'twrnc';
// // // import axios from 'axios';

// // // const SpecializationsScreen = () => {
// // //   const [selectedFile, setSelectedFile] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // 🔐 Request permission for Android 11+
// // //   const requestStoragePermission = async () => {
// // //     try {
// // //       const granted = await PermissionsAndroid.request(
// // //         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
// // //         {
// // //           title: 'Storage Permission Required',
// // //           message: 'This app needs access to your storage to pick documents.',
// // //           buttonNeutral: 'Ask Me Later',
// // //           buttonNegative: 'Cancel',
// // //           buttonPositive: 'OK',
// // //         }
// // //       );

// // //       return granted === PermissionsAndroid.RESULTS.GRANTED;
// // //     } catch (err) {
// // //       console.warn('Permission error:', err);
// // //       return false;
// // //     }
// // //   };

// // //   const handlePickDocument = async () => {
// // //     if (Platform.OS === 'android') {
// // //       const hasPermission = await requestStoragePermission();
// // //       if (!hasPermission) {
// // //         Alert.alert('Permission Denied', 'Please grant storage permission to continue.');
// // //         return;
// // //       }
// // //     }

// // //     FilePickerManager.showFilePicker(null, (response) => {
// // //       if (response.didCancel) {
// // //         console.log('User cancelled file picker');
// // //       } else if (response.error) {
// // //         console.error('FilePicker error:', response.error);
// // //         Alert.alert('Picker Error', 'Could not open file picker or select file.');
// // //       } else {
// // //         console.log('Selected file:', response);
// // //         setSelectedFile(response);
// // //       }
// // //     });
// // //   };

// // //   const handleUpload = async () => {
// // //     if (!selectedFile) {
// // //       Alert.alert('No Document', 'Please select a document to upload.');
// // //       return;
// // //     }

// // //     const formData = new FormData();
// // //     formData.append('documentName', selectedFile.fileName || 'example');
// // //     formData.append('document', {
// // //       uri: Platform.OS === 'ios' ? selectedFile.uri.replace('file://', '') : selectedFile.uri,
// // //       type: selectedFile.type || 'application/octet-stream',
// // //       name: selectedFile.fileName || 'document',
// // //     });

// // //     setLoading(true);
// // //     try {
// // //       const response = await axios.post(
// // //         'https://landing.docapp.co.in/api/documents/upload-document',
// // //         formData,
// // //         { headers: { 'Content-Type': 'multipart/form-data' } }
// // //       );

// // //       console.log('✅ Upload Response:', response.data);
// // //       Alert.alert('Success', 'Document uploaded successfully!');
// // //       setSelectedFile(null);
// // //     } catch (error) {
// // //       console.error('❌ Upload Error:', error.response?.data || error.message);
// // //       Alert.alert('Error', 'Failed to upload the document.');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// // //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// // //         Upload Document for Verification
// // //       </Text>

// // //       <TouchableOpacity
// // //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// // //         onPress={handlePickDocument}
// // //       >
// // //         <Text style={tw`text-green-700 font-semibold`}>
// // //           {selectedFile ? selectedFile.fileName : 'Select Document'}
// // //         </Text>
// // //       </TouchableOpacity>

// // //       <TouchableOpacity
// // //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// // //         onPress={handleUpload}
// // //         disabled={loading || !selectedFile}
// // //       >
// // //         {loading ? (
// // //           <ActivityIndicator color="white" />
// // //         ) : (
// // //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// // //         )}
// // //       </TouchableOpacity>
// // //     </View>
// // //   );
// // // };

// // // export default SpecializationsScreen;


// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   Alert,
// // } from 'react-native';
// // import tw from 'twrnc';
// // import axios from 'axios';
// // import * as FileAccess from 'react-native-file-access';

// // const SpecializationsScreen = () => {
// //   const [selectedFile, setSelectedFile] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handlePickDocument = async () => {
// //     try {
// //       const result = await FileAccess.pickFile();
// //       if (result) {
// //         console.log('Selected file:', result);
// //         setSelectedFile(result);
// //       }
// //     } catch (err) {
// //       console.error('File picker error:', err);
// //       Alert.alert('Error', 'Could not pick a document.');
// //     }
// //   };

// //   const handleUpload = async () => {
// //     if (!selectedFile) {
// //       Alert.alert('No Document', 'Please select a document to upload.');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('documentName', selectedFile.name || 'example');
// //     formData.append('document', {
// //       uri: selectedFile.uri,
// //       type: selectedFile.mime || 'application/octet-stream',
// //       name: selectedFile.name || 'document',
// //     });

// //     setLoading(true);
// //     try {
// //       const response = await axios.post(
// //         'https://landing.docapp.co.in/api/documents/upload-document',
// //         formData,
// //         { headers: { 'Content-Type': 'multipart/form-data' } }
// //       );

// //       console.log('Upload Response:', response.data);
// //       Alert.alert('Success', 'Document uploaded successfully!');
// //       setSelectedFile(null);
// //     } catch (error) {
// //       console.error('Upload Error:', error.response?.data || error.message);
// //       Alert.alert('Error', 'Failed to upload the document.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
// //       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
// //         Upload Document for Verification
// //       </Text>

// //       <TouchableOpacity
// //         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
// //         onPress={handlePickDocument}
// //       >
// //         <Text style={tw`text-green-700 font-semibold`}>
// //           {selectedFile ? selectedFile.name : 'Select Document'}
// //         </Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity
// //         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
// //         onPress={handleUpload}
// //         disabled={loading || !selectedFile}
// //       >
// //         {loading ? (
// //           <ActivityIndicator color="white" />
// //         ) : (
// //           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
// //         )}
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // export default SpecializationsScreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import tw from 'twrnc';
// import axios from 'axios';
// import * as FileAccess from 'react-native-file-access';

// const SpecializationsScreen = () => {
//   const [selectedFile, setSelectedFile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const handlePickDocument = async () => {
//     try {
//       const result = await FileAccess.pickFile();
//       if (result) {
//         // Check if file is an image
//         if (result.mime && result.mime.startsWith('image/')) {
//           console.log('Selected image:', result);
//           setSelectedFile(result);
//         } else {
//           Alert.alert('Invalid File', 'Please select an image file only.');
//         }
//       }
//     } catch (err) {
//       console.error('File picker error:', err);
//       Alert.alert('Error', 'Could not pick a document.');
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       Alert.alert('No Image', 'Please select an image to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('documentName', selectedFile.name || 'example');
//     formData.append('document', {
//       uri: selectedFile.uri,
//       type: selectedFile.mime || 'image/jpeg',
//       name: selectedFile.name || 'image.jpg',
//     });

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'https://landing.docapp.co.in/api/documents/upload-document',
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       console.log('Upload Response:', response.data);
//       Alert.alert('Success', 'Image uploaded successfully!');
//       setSelectedFile(null);
//     } catch (error) {
//       console.error('Upload Error:', error.response?.data || error.message);
//       Alert.alert('Error', 'Failed to upload the image.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
//       <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
//         Upload Image for Verification
//       </Text>

//       <TouchableOpacity
//         style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
//         onPress={handlePickDocument}
//       >
//         <Text style={tw`text-green-700 font-semibold`}>
//           {selectedFile ? selectedFile.name : 'Select Image'}
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
//         onPress={handleUpload}
//         disabled={loading || !selectedFile}
//       >
//         {loading ? (
//           <ActivityIndicator color="white" />
//         ) : (
//           <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SpecializationsScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

const SpecializationsScreen = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo', // Only images
        selectionLimit: 1,
      });

      if (result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image);
        console.log('Selected image:', image);
      }
    } catch (err) {
      console.error('Image picker error:', err);
      Alert.alert('Error', 'Could not pick an image.');
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('documentName', selectedImage.fileName || 'image');
    formData.append('document', {
      uri: selectedImage.uri,
      type: selectedImage.type || 'image/jpeg',
      name: selectedImage.fileName || 'image.jpg',
    });

    setLoading(true);
    try {
      const response = await axios.post(
        'https://landing.docapp.co.in/api/documents/upload-document',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log('Upload Response:', response.data);
      Alert.alert('Success', 'Image uploaded successfully!');
      setSelectedImage(null);
    } catch (error) {
      console.error('Upload Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to upload the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-green-50 p-5`}>
      <Text style={tw`text-2xl font-bold text-green-700 mb-8`}>
        Upload Image for Verification
      </Text>

      <TouchableOpacity
        style={tw`bg-white px-6 py-4 rounded-2xl shadow mb-5`}
        onPress={handlePickImage}
      >
        <Text style={tw`text-green-700 font-semibold`}>
          {selectedImage ? selectedImage.fileName : 'Select Image'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-emerald-500 px-8 py-4 rounded-full items-center`}
        onPress={handleUpload}
        disabled={loading || !selectedImage}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-white font-bold text-lg`}>Upload</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SpecializationsScreen;
