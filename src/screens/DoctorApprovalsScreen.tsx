// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   FlatList,
// // //   TouchableOpacity,
// // //   Alert,
// // //   Image,
// // //   ScrollView,
// // // } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';

// // // interface UnverifiedDoctor {
// // //   user_id: number;
// // //   specialization: string | null;
// // //   gender: string | null;
// // //   date_of_birth: string | null;
// // //   experience_years: number | null;
// // //   license_number: string | null;
// // //   profile_picture: string;
// // //   created_at: string;
// // //   user: {
// // //     username: string;
// // //     email: string;
// // //     phone_number: string;
// // //     created_at: string;
// // //     documents: any[];
// // //     address: any[];
// // //   };
// // // }

// // // interface ApiResponse {
// // //   total_unverified_doctors: number;
// // //   total_unverified_organisations: number;
// // //   unverified_doctors: UnverifiedDoctor[];
// // //   unverified_organisations: any[];
// // // }

// // // const DoctorApprovalsScreen = () => {
// // //   const [data, setData] = useState<ApiResponse | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigation = useNavigation();

// // //   useEffect(() => {
// // //     fetchUnverifiedDoctors();
// // //   }, []);

// // //   const fetchUnverifiedDoctors = async () => {
// // //     try {
// // //       const response = await fetch('https://landing.docapp.co.in/api/admin/get-unverified-acc', {
// // //         method: 'GET',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //       });

// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }

// // //       const result: ApiResponse = await response.json();
// // //       setData(result);
// // //     } catch (error) {
// // //       console.error('Error fetching unverified doctors:', error);
// // //       Alert.alert('Error', 'Failed to fetch unverified doctors');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleApprove = (doctorId: number) => {
// // //     // TODO: Implement approve functionality
// // //     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
// // //   };

// // //   const handleReject = (doctorId: number) => {
// // //     // TODO: Implement reject functionality
// // //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// // //   };

// // //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// // //     <View style={styles.doctorCard}>
// // //       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// // //       <View style={styles.doctorInfo}>
// // //         <Text style={styles.doctorName}>{item.user.username}</Text>
// // //         <Text style={styles.doctorEmail}>{item.user.email}</Text>
// // //         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
// // //         {item.specialization && (
// // //           <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>
// // //         )}
// // //         {item.experience_years && (
// // //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// // //         )}
// // //         {item.license_number && (
// // //           <Text style={styles.doctorDetail}>License: {item.license_number}</Text>
// // //         )}
// // //         <Text style={styles.createdAt}>
// // //           Registered: {new Date(item.created_at).toLocaleDateString()}
// // //         </Text>
// // //       </View>
// // //       <View style={styles.actionButtons}>
// // //         <TouchableOpacity
// // //           style={[styles.actionButton, styles.approveButton]}
// // //           onPress={() => handleApprove(item.user_id)}
// // //         >
// // //           <Text style={styles.approveButtonText}>Approve</Text>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           style={[styles.actionButton, styles.rejectButton]}
// // //           onPress={() => handleReject(item.user_id)}
// // //         >
// // //           <Text style={styles.rejectButtonText}>Reject</Text>
// // //         </TouchableOpacity>
// // //       </View>
// // //     </View>
// // //   );

// // //   if (loading) {
// // //     return (
// // //       <View style={styles.loadingContainer}>
// // //         <Text style={styles.loadingText}>Loading...</Text>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <ScrollView style={styles.container}>
// // //       <Text style={styles.title}>Doctor Approvals</Text>

// // //       <View style={styles.summaryContainer}>
// // //         <Text style={styles.summaryText}>
// // //           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
// // //         </Text>
// // //         <Text style={styles.summaryText}>
// // //           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
// // //         </Text>
// // //       </View>

// // //       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

// // //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// // //         <FlatList
// // //           data={data.unverified_doctors}
// // //           renderItem={renderDoctorItem}
// // //           keyExtractor={(item) => item.user_id.toString()}
// // //           scrollEnabled={false}
// // //         />
// // //       ) : (
// // //         <Text style={styles.noDataText}>No unverified doctors found.</Text>
// // //       )}

// // //       <TouchableOpacity
// // //         style={styles.backButton}
// // //         onPress={() => navigation.goBack()}
// // //       >
// // //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// // //       </TouchableOpacity>
// // //     </ScrollView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#f5f5f5',
// // //     padding: 20,
// // //   },
// // //   loadingContainer: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#f5f5f5',
// // //   },
// // //   loadingText: {
// // //     fontSize: 18,
// // //     color: '#666',
// // //   },
// // //   title: {
// // //     fontSize: 28,
// // //     fontWeight: 'bold',
// // //     color: '#2e7d32',
// // //     textAlign: 'center',
// // //     marginBottom: 20,
// // //   },
// // //   summaryContainer: {
// // //     backgroundColor: '#e8f5e8',
// // //     padding: 15,
// // //     borderRadius: 8,
// // //     marginBottom: 20,
// // //   },
// // //   summaryText: {
// // //     fontSize: 16,
// // //     color: '#2e7d32',
// // //     marginBottom: 5,
// // //   },
// // //   sectionTitle: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     color: '#1b5e20',
// // //     marginBottom: 15,
// // //   },
// // //   doctorCard: {
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 8,
// // //     padding: 15,
// // //     marginBottom: 15,
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowOpacity: 0.1,
// // //     shadowRadius: 4,
// // //     elevation: 3,
// // //   },
// // //   profileImage: {
// // //     width: 60,
// // //     height: 60,
// // //     borderRadius: 30,
// // //     marginRight: 15,
// // //   },
// // //   doctorInfo: {
// // //     flex: 1,
// // //   },
// // //   doctorName: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#2e7d32',
// // //     marginBottom: 5,
// // //   },
// // //   doctorEmail: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     marginBottom: 2,
// // //   },
// // //   doctorPhone: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //     marginBottom: 5,
// // //   },
// // //   doctorDetail: {
// // //     fontSize: 14,
// // //     color: '#444',
// // //     marginBottom: 2,
// // //   },
// // //   createdAt: {
// // //     fontSize: 12,
// // //     color: '#888',
// // //     marginTop: 5,
// // //   },
// // //   actionButtons: {
// // //     flexDirection: 'row',
// // //   },
// // //   actionButton: {
// // //     paddingVertical: 8,
// // //     paddingHorizontal: 15,
// // //     borderRadius: 5,
// // //     marginLeft: 10,
// // //   },
// // //   approveButton: {
// // //     backgroundColor: '#4caf50',
// // //   },
// // //   approveButtonText: {
// // //     color: '#ffffff',
// // //     fontWeight: 'bold',
// // //   },
// // //   rejectButton: {
// // //     backgroundColor: '#f44336',
// // //   },
// // //   rejectButtonText: {
// // //     color: '#ffffff',
// // //     fontWeight: 'bold',
// // //   },
// // //   noDataText: {
// // //     fontSize: 16,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //     marginTop: 20,
// // //   },
// // //   backButton: {
// // //     backgroundColor: '#2e7d32',
// // //     paddingVertical: 12,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //     marginTop: 20,
// // //   },
// // //   backButtonText: {
// // //     color: '#ffffff',
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default DoctorApprovalsScreen;


// // import React, { useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   FlatList,
// //   TouchableOpacity,
// //   Alert,
// //   Image,
// //   ScrollView,
// //   Linking,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';

// // interface Document {
// //   id: number;
// //   document_type: string;
// //   document_url: string;
// //   created_at: string;
// // }

// // interface Address {
// //   city?: string;
// //   state?: string;
// //   pincode?: string;
// //   street?: string;
// // }

// // interface UnverifiedDoctor {
// //   user_id: number;
// //   specialization: string | null;
// //   gender: string | null;
// //   date_of_birth: string | null;
// //   experience_years: number | null;
// //   license_number: string | null;
// //   profile_picture: string;
// //   created_at: string;
// //   user: {
// //     username: string;
// //     email: string;
// //     phone_number: string;
// //     created_at: string;
// //     documents: Document[];
// //     address: Address[];
// //   };
// // }

// // interface ApiResponse {
// //   total_unverified_doctors: number;
// //   total_unverified_organisations: number;
// //   unverified_doctors: UnverifiedDoctor[];
// //   unverified_organisations: any[];
// // }

// // const DoctorApprovalsScreen = () => {
// //   const [data, setData] = useState<ApiResponse | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     fetchUnverifiedDoctors();
// //   }, []);

// //   const fetchUnverifiedDoctors = async () => {
// //     try {
// //       const response = await fetch('https://landing.docapp.co.in/api/admin/get-unverified-acc', {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //       });

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result: ApiResponse = await response.json();
// //       setData(result);
// //     } catch (error) {
// //       console.error('Error fetching unverified doctors:', error);
// //       Alert.alert('Error', 'Failed to fetch unverified doctors');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleApprove = (doctorId: number) => {
// //     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
// //   };

// //   const handleReject = (doctorId: number) => {
// //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// //   };

// //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// //     <View style={styles.doctorCard}>
// //       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// //       <View style={styles.doctorInfo}>
// //         <Text style={styles.doctorName}>{item.user.username}</Text>
// //         <Text style={styles.doctorEmail}>{item.user.email}</Text>
// //         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
// //         {item.specialization && <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>}
// //         {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
// //         {item.date_of_birth && (
// //           <Text style={styles.doctorDetail}>
// //             DOB: {new Date(item.date_of_birth).toLocaleDateString()}
// //           </Text>
// //         )}
// //         {item.experience_years !== null && (
// //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// //         )}
// //         {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
// //         <Text style={styles.createdAt}>
// //           Registered: {new Date(item.created_at).toLocaleDateString()}
// //         </Text>

// //         {/* Documents */}
// //         <View style={styles.documentsContainer}>
// //           <Text style={styles.documentsTitle}>Documents:</Text>
// //           {item.user.documents && item.user.documents.length > 0 ? (
// //             item.user.documents.map((doc) => (
// //               <TouchableOpacity key={doc.id} onPress={() => Linking.openURL(doc.document_url)}>
// //                 <Text style={styles.documentLink}>{doc.document_type} 📄</Text>
// //               </TouchableOpacity>
// //             ))
// //           ) : (
// //             <Text style={styles.noDocumentsText}>No documents available</Text>
// //           )}
// //         </View>

// //         {/* Address */}
// //         {item.user.address && item.user.address.length > 0 && (
// //           <View style={styles.addressContainer}>
// //             <Text style={styles.documentsTitle}>Address:</Text>
// //             {item.user.address.map((addr, idx) => (
// //               <Text key={idx} style={styles.addressText}>
// //                 {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
// //               </Text>
// //             ))}
// //           </View>
// //         )}
// //       </View>

// //       <View style={styles.actionButtons}>
// //         <TouchableOpacity
// //           style={[styles.actionButton, styles.approveButton]}
// //           onPress={() => handleApprove(item.user_id)}
// //         >
// //           <Text style={styles.approveButtonText}>Approve</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity
// //           style={[styles.actionButton, styles.rejectButton]}
// //           onPress={() => handleReject(item.user_id)}
// //         >
// //           <Text style={styles.rejectButtonText}>Reject</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <Text style={styles.loadingText}>Loading...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.title}>Doctor Approvals</Text>

// //       <View style={styles.summaryContainer}>
// //         <Text style={styles.summaryText}>
// //           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
// //         </Text>
// //         <Text style={styles.summaryText}>
// //           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
// //         </Text>
// //       </View>

// //       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

// //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// //         <FlatList
// //           data={data.unverified_doctors}
// //           renderItem={renderDoctorItem}
// //           keyExtractor={(item) => item.user_id.toString()}
// //           scrollEnabled={false}
// //         />
// //       ) : (
// //         <Text style={styles.noDataText}>No unverified doctors found.</Text>
// //       )}

// //       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#f5f5f5',
// //     padding: 20,
// //   },
// //   loadingContainer: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#f5f5f5',
// //   },
// //   loadingText: {
// //     fontSize: 18,
// //     color: '#666',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#2e7d32',
// //     textAlign: 'center',
// //     marginBottom: 20,
// //   },
// //   summaryContainer: {
// //     backgroundColor: '#e8f5e8',
// //     padding: 15,
// //     borderRadius: 8,
// //     marginBottom: 20,
// //   },
// //   summaryText: {
// //     fontSize: 16,
// //     color: '#2e7d32',
// //     marginBottom: 5,
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#1b5e20',
// //     marginBottom: 15,
// //   },
// //   doctorCard: {
// //     backgroundColor: '#ffffff',
// //     borderRadius: 8,
// //     padding: 15,
// //     marginBottom: 15,
// //     flexDirection: 'row',
// //     alignItems: 'flex-start',
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //     elevation: 3,
// //   },
// //   profileImage: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: 35,
// //     marginRight: 15,
// //   },
// //   doctorInfo: {
// //     flex: 1,
// //   },
// //   doctorName: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#2e7d32',
// //     marginBottom: 3,
// //   },
// //   doctorEmail: {
// //     fontSize: 14,
// //     color: '#666',
// //     marginBottom: 2,
// //   },
// //   doctorPhone: {
// //     fontSize: 14,
// //     color: '#666',
// //     marginBottom: 2,
// //   },
// //   doctorDetail: {
// //     fontSize: 14,
// //     color: '#444',
// //     marginBottom: 2,
// //   },
// //   createdAt: {
// //     fontSize: 12,
// //     color: '#888',
// //     marginTop: 5,
// //   },
// //   documentsContainer: {
// //     marginTop: 8,
// //   },
// //   documentsTitle: {
// //     fontWeight: 'bold',
// //     color: '#1b5e20',
// //     marginBottom: 3,
// //   },
// //   documentLink: {
// //     color: '#1565c0',
// //     textDecorationLine: 'underline',
// //     marginBottom: 2,
// //   },
// //   noDocumentsText: {
// //     fontStyle: 'italic',
// //     color: '#888',
// //   },
// //   addressContainer: {
// //     marginTop: 5,
// //   },
// //   addressText: {
// //     fontSize: 13,
// //     color: '#555',
// //     marginBottom: 2,
// //   },
// //   actionButtons: {
// //     flexDirection: 'column',
// //     marginLeft: 10,
// //   },
// //   actionButton: {
// //     paddingVertical: 8,
// //     paddingHorizontal: 15,
// //     borderRadius: 5,
// //     marginBottom: 5,
// //   },
// //   approveButton: {
// //     backgroundColor: '#4caf50',
// //   },
// //   approveButtonText: {
// //     color: '#ffffff',
// //     fontWeight: 'bold',
// //   },
// //   rejectButton: {
// //     backgroundColor: '#f44336',
// //   },
// //   rejectButtonText: {
// //     color: '#ffffff',
// //     fontWeight: 'bold',
// //   },
// //   noDataText: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //     marginTop: 20,
// //   },
// //   backButton: {
// //     backgroundColor: '#2e7d32',
// //     paddingVertical: 12,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //     marginTop: 20,
// //   },
// //   backButtonText: {
// //     color: '#ffffff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default DoctorApprovalsScreen;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ScrollView,
//   Modal,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// interface Document {
//   id: number;
//   document_type: string;
//   document_url: string;
//   created_at: string;
// }

// interface Address {
//   city?: string;
//   state?: string;
//   pincode?: string;
//   street?: string;
// }

// interface UnverifiedDoctor {
//   user_id: number;
//   specialization: string | null;
//   gender: string | null;
//   date_of_birth: string | null;
//   experience_years: number | null;
//   license_number: string | null;
//   profile_picture: string;
//   created_at: string;
//   user: {
//     username: string;
//     email: string;
//     phone_number: string;
//     created_at: string;
//     documents: Document[];
//     address: Address[];
//   };
// }

// interface ApiResponse {
//   total_unverified_doctors: number;
//   total_unverified_organisations: number;
//   unverified_doctors: UnverifiedDoctor[];
//   unverified_organisations: any[];
// }

// const DoctorApprovalsScreen = () => {
//   const [data, setData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchUnverifiedDoctors();
//   }, []);

//   const fetchUnverifiedDoctors = async () => {
//     try {
//       const response = await fetch(
//         'https://landing.docapp.co.in/api/admin/get-unverified-acc',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result: ApiResponse = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching unverified doctors:', error);
//       Alert.alert('Error', 'Failed to fetch unverified doctors');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = (doctorId: number) => {
//     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
//   };

//   const handleReject = (doctorId: number) => {
//     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
//   };

//   const openImageModal = (url: string) => {
//     setSelectedImage(url);
//     setModalVisible(true);
//   };

//   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
//     <View style={styles.doctorCard}>
//       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
//       <View style={styles.doctorInfo}>
//         <Text style={styles.doctorName}>{item.user.username}</Text>
//         <Text style={styles.doctorEmail}>{item.user.email}</Text>
//         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
//         {item.specialization && (
//           <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>
//         )}
//         {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
//         {item.date_of_birth && (
//           <Text style={styles.doctorDetail}>
//             DOB: {new Date(item.date_of_birth).toLocaleDateString()}
//           </Text>
//         )}
//         {item.experience_years !== null && (
//           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
//         )}
//         {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
//         <Text style={styles.createdAt}>
//           Registered: {new Date(item.created_at).toLocaleDateString()}
//         </Text>

//         {/* Documents */}
//         <View style={styles.documentsContainer}>
//           <Text style={styles.documentsTitle}>Documents:</Text>
//           {item.user.documents && item.user.documents.length > 0 ? (
//             item.user.documents.map((doc) => (
//               <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)}>
//                 <Text style={styles.documentLink}>{doc.document_type} 🖼️</Text>
//               </TouchableOpacity>
//             ))
//           ) : (
//             <Text style={styles.noDocumentsText}>No documents available</Text>
//           )}
//         </View>

//         {/* Address */}
//         {item.user.address && item.user.address.length > 0 && (
//           <View style={styles.addressContainer}>
//             <Text style={styles.documentsTitle}>Address:</Text>
//             {item.user.address.map((addr, idx) => (
//               <Text key={idx} style={styles.addressText}>
//                 {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
//               </Text>
//             ))}
//           </View>
//         )}
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.approveButton]}
//           onPress={() => handleApprove(item.user_id)}
//         >
//           <Text style={styles.approveButtonText}>Approve</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionButton, styles.rejectButton]}
//           onPress={() => handleReject(item.user_id)}
//         >
//           <Text style={styles.rejectButtonText}>Reject</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Doctor Approvals</Text>

//       <View style={styles.summaryContainer}>
//         <Text style={styles.summaryText}>
//           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
//         </Text>
//         <Text style={styles.summaryText}>
//           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
//         </Text>
//       </View>

//       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

//       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
//         <FlatList
//           data={data.unverified_doctors}
//           renderItem={renderDoctorItem}
//           keyExtractor={(item) => item.user_id.toString()}
//           scrollEnabled={false}
//         />
//       ) : (
//         <Text style={styles.noDataText}>No unverified doctors found.</Text>
//       )}

//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
//       </TouchableOpacity>

//       {/* Fullscreen Image Modal */}
//       <Modal visible={modalVisible} transparent={true}>
//         <View style={styles.modalContainer}>
//           <TouchableOpacity
//             style={styles.modalBackground}
//             onPress={() => setModalVisible(false)}
//           />
//           {selectedImage && (
//             <Image
//               source={{ uri: selectedImage }}
//               style={styles.fullscreenImage}
//               resizeMode="contain"
//             />
//           )}
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
//   loadingText: { fontSize: 18, color: '#666' },
//   title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
//   summaryContainer: { backgroundColor: '#e8f5e8', padding: 15, borderRadius: 8, marginBottom: 20 },
//   summaryText: { fontSize: 16, color: '#2e7d32', marginBottom: 5 },
//   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginBottom: 15 },
//   doctorCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
//   profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
//   doctorInfo: { flex: 1 },
//   doctorName: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 3 },
//   doctorEmail: { fontSize: 14, color: '#666', marginBottom: 2 },
//   doctorPhone: { fontSize: 14, color: '#666', marginBottom: 2 },
//   doctorDetail: { fontSize: 14, color: '#444', marginBottom: 2 },
//   createdAt: { fontSize: 12, color: '#888', marginTop: 5 },
//   documentsContainer: { marginTop: 8 },
//   documentsTitle: { fontWeight: 'bold', color: '#1b5e20', marginBottom: 3 },
//   documentLink: { color: '#1565c0', textDecorationLine: 'underline', marginBottom: 2 },
//   noDocumentsText: { fontStyle: 'italic', color: '#888' },
//   addressContainer: { marginTop: 5 },
//   addressText: { fontSize: 13, color: '#555', marginBottom: 2 },
//   actionButtons: { flexDirection: 'column', marginLeft: 10 },
//   actionButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginBottom: 5 },
//   approveButton: { backgroundColor: '#4caf50' },
//   approveButtonText: { color: '#ffffff', fontWeight: 'bold' },
//   rejectButton: { backgroundColor: '#f44336' },
//   rejectButtonText: { color: '#ffffff', fontWeight: 'bold' },
//   noDataText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
//   backButton: { backgroundColor: '#2e7d32', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
//   backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.8 },
//   fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
// });

// export default DoctorApprovalsScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Document {
  id: number;
  document_type: string;
  document_url: string;
  created_at: string;
}

interface Address {
  city?: string;
  state?: string;
  pincode?: string;
  street?: string;
}

interface UnverifiedDoctor {
  user_id: number;
  specialization: string | null;
  gender: string | null;
  date_of_birth: string | null;
  experience_years: number | null;
  license_number: string | null;
  profile_picture: string;
  created_at: string;
  user: {
    username: string;
    email: string;
    phone_number: string;
    created_at: string;
    documents: Document[];
    address: Address[];
  };
}

interface ApiResponse {
  total_unverified_doctors: number;
  total_unverified_organisations: number;
  unverified_doctors: UnverifiedDoctor[];
  unverified_organisations: any[];
}

const DoctorApprovalsScreen = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchUnverifiedDoctors();
  }, []);

  // Fetch unverified doctors
  const fetchUnverifiedDoctors = async () => {
    try {
      const response = await fetch(
        'https://landing.docapp.co.in/api/admin/get-unverified-acc',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching unverified doctors:', error);
      Alert.alert('Error', 'Failed to fetch unverified doctors');
    } finally {
      setLoading(false);
    }
  };

  // Approve doctor API call
  const handleApprove = async (doctorId: number) => {
    try {
      const response = await fetch('https://landing.docapp.co.in/api/admin/approve-doctor', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctor_id: doctorId }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', result.message || 'Doctor approved successfully');
        // Refresh the list after approval
        fetchUnverifiedDoctors();
      } else {
        Alert.alert('Error', result.message || 'Failed to approve doctor');
      }
    } catch (error) {
      console.error('Error approving doctor:', error);
      Alert.alert('Error', 'Failed to approve doctor');
    }
  };

  const handleReject = (doctorId: number) => {
    Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
  };

  const openImageModal = (url: string) => {
    setSelectedImage(url);
    setModalVisible(true);
  };

  const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
    <View style={styles.doctorCard}>
      <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.user.username}</Text>
        <Text style={styles.doctorEmail}>{item.user.email}</Text>
        <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
        {item.specialization && (
          <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>
        )}
        {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
        {item.date_of_birth && (
          <Text style={styles.doctorDetail}>
            DOB: {new Date(item.date_of_birth).toLocaleDateString()}
          </Text>
        )}
        {item.experience_years !== null && (
          <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
        )}
        {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
        <Text style={styles.createdAt}>
          Registered: {new Date(item.created_at).toLocaleDateString()}
        </Text>

        {/* Documents */}
        <View style={styles.documentsContainer}>
          <Text style={styles.documentsTitle}>Documents:</Text>
          {item.user.documents && item.user.documents.length > 0 ? (
            item.user.documents.map((doc) => (
              <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)}>
                <Text style={styles.documentLink}>{doc.document_type} 🖼️</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDocumentsText}>No documents available</Text>
          )}
        </View>

        {/* Address */}
        {item.user.address && item.user.address.length > 0 && (
          <View style={styles.addressContainer}>
            <Text style={styles.documentsTitle}>Address:</Text>
            {item.user.address.map((addr, idx) => (
              <Text key={idx} style={styles.addressText}>
                {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
              </Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.approveButton]}
          onPress={() => handleApprove(item.user_id)}
        >
          <Text style={styles.approveButtonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleReject(item.user_id)}
        >
          <Text style={styles.rejectButtonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Doctor Approvals</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>
          Total Unverified Doctors: {data?.total_unverified_doctors || 0}
        </Text>
        <Text style={styles.summaryText}>
          Total Unverified Organizations: {data?.total_unverified_organisations || 0}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Unverified Doctors</Text>

      {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
        <FlatList
          data={data.unverified_doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item.user_id.toString()}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noDataText}>No unverified doctors found.</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
      </TouchableOpacity>

      {/* Fullscreen Image Modal */}
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setModalVisible(false)}
          />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  loadingText: { fontSize: 18, color: '#666' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
  summaryContainer: { backgroundColor: '#e8f5e8', padding: 15, borderRadius: 8, marginBottom: 20 },
  summaryText: { fontSize: 16, color: '#2e7d32', marginBottom: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginBottom: 15 },
  doctorCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
  doctorInfo: { flex: 1 },
  doctorName: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 3 },
  doctorEmail: { fontSize: 14, color: '#666', marginBottom: 2 },
  doctorPhone: { fontSize: 14, color: '#666', marginBottom: 2 },
  doctorDetail: { fontSize: 14, color: '#444', marginBottom: 2 },
  createdAt: { fontSize: 12, color: '#888', marginTop: 5 },
  documentsContainer: { marginTop: 8 },
  documentsTitle: { fontWeight: 'bold', color: '#1b5e20', marginBottom: 3 },
  documentLink: { color: '#1565c0', textDecorationLine: 'underline', marginBottom: 2 },
  noDocumentsText: { fontStyle: 'italic', color: '#888' },
  addressContainer: { marginTop: 5 },
  addressText: { fontSize: 13, color: '#555', marginBottom: 2 },
  actionButtons: { flexDirection: 'column', marginLeft: 10 },
  actionButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginBottom: 5 },
  approveButton: { backgroundColor: '#4caf50' },
  approveButtonText: { color: '#ffffff', fontWeight: 'bold' },
  rejectButton: { backgroundColor: '#f44336' },
  rejectButtonText: { color: '#ffffff', fontWeight: 'bold' },
  noDataText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
  backButton: { backgroundColor: '#2e7d32', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.8 },
  fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
});

export default DoctorApprovalsScreen;
