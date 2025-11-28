// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   StyleSheet,
// // // // // //   FlatList,
// // // // // //   TouchableOpacity,
// // // // // //   Alert,
// // // // // //   Image,
// // // // // //   ScrollView,
// // // // // // } from 'react-native';
// // // // // // import { useNavigation } from '@react-navigation/native';

// // // // // // interface UnverifiedDoctor {
// // // // // //   user_id: number;
// // // // // //   specialization: string | null;
// // // // // //   gender: string | null;
// // // // // //   date_of_birth: string | null;
// // // // // //   experience_years: number | null;
// // // // // //   license_number: string | null;
// // // // // //   profile_picture: string;
// // // // // //   created_at: string;
// // // // // //   user: {
// // // // // //     username: string;
// // // // // //     email: string;
// // // // // //     phone_number: string;
// // // // // //     created_at: string;
// // // // // //     documents: any[];
// // // // // //     address: any[];
// // // // // //   };
// // // // // // }

// // // // // // interface ApiResponse {
// // // // // //   total_unverified_doctors: number;
// // // // // //   total_unverified_organisations: number;
// // // // // //   unverified_doctors: UnverifiedDoctor[];
// // // // // //   unverified_organisations: any[];
// // // // // // }

// // // // // // const DoctorApprovalsScreen = () => {
// // // // // //   const [data, setData] = useState<ApiResponse | null>(null);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const navigation = useNavigation();

// // // // // //   useEffect(() => {
// // // // // //     fetchUnverifiedDoctors();
// // // // // //   }, []);

// // // // // //   const fetchUnverifiedDoctors = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('https://landing.docapp.co.in/api/admin/get-unverified-acc', {
// // // // // //         method: 'GET',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //         },
// // // // // //       });

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // // // //       }

// // // // // //       const result: ApiResponse = await response.json();
// // // // // //       setData(result);
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching unverified doctors:', error);
// // // // // //       Alert.alert('Error', 'Failed to fetch unverified doctors');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleApprove = (doctorId: number) => {
// // // // // //     // TODO: Implement approve functionality
// // // // // //     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
// // // // // //   };

// // // // // //   const handleReject = (doctorId: number) => {
// // // // // //     // TODO: Implement reject functionality
// // // // // //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// // // // // //   };

// // // // // //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// // // // // //     <View style={styles.doctorCard}>
// // // // // //       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// // // // // //       <View style={styles.doctorInfo}>
// // // // // //         <Text style={styles.doctorName}>{item.user.username}</Text>
// // // // // //         <Text style={styles.doctorEmail}>{item.user.email}</Text>
// // // // // //         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
// // // // // //         {item.specialization && (
// // // // // //           <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>
// // // // // //         )}
// // // // // //         {item.experience_years && (
// // // // // //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// // // // // //         )}
// // // // // //         {item.license_number && (
// // // // // //           <Text style={styles.doctorDetail}>License: {item.license_number}</Text>
// // // // // //         )}
// // // // // //         <Text style={styles.createdAt}>
// // // // // //           Registered: {new Date(item.created_at).toLocaleDateString()}
// // // // // //         </Text>
// // // // // //       </View>
// // // // // //       <View style={styles.actionButtons}>
// // // // // //         <TouchableOpacity
// // // // // //           style={[styles.actionButton, styles.approveButton]}
// // // // // //           onPress={() => handleApprove(item.user_id)}
// // // // // //         >
// // // // // //           <Text style={styles.approveButtonText}>Approve</Text>
// // // // // //         </TouchableOpacity>
// // // // // //         <TouchableOpacity
// // // // // //           style={[styles.actionButton, styles.rejectButton]}
// // // // // //           onPress={() => handleReject(item.user_id)}
// // // // // //         >
// // // // // //           <Text style={styles.rejectButtonText}>Reject</Text>
// // // // // //         </TouchableOpacity>
// // // // // //       </View>
// // // // // //     </View>
// // // // // //   );

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <View style={styles.loadingContainer}>
// // // // // //         <Text style={styles.loadingText}>Loading...</Text>
// // // // // //       </View>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <ScrollView style={styles.container}>
// // // // // //       <Text style={styles.title}>Doctor Approvals</Text>

// // // // // //       <View style={styles.summaryContainer}>
// // // // // //         <Text style={styles.summaryText}>
// // // // // //           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
// // // // // //         </Text>
// // // // // //         <Text style={styles.summaryText}>
// // // // // //           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
// // // // // //         </Text>
// // // // // //       </View>

// // // // // //       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

// // // // // //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// // // // // //         <FlatList
// // // // // //           data={data.unverified_doctors}
// // // // // //           renderItem={renderDoctorItem}
// // // // // //           keyExtractor={(item) => item.user_id.toString()}
// // // // // //           scrollEnabled={false}
// // // // // //         />
// // // // // //       ) : (
// // // // // //         <Text style={styles.noDataText}>No unverified doctors found.</Text>
// // // // // //       )}

// // // // // //       <TouchableOpacity
// // // // // //         style={styles.backButton}
// // // // // //         onPress={() => navigation.goBack()}
// // // // // //       >
// // // // // //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// // // // // //       </TouchableOpacity>
// // // // // //     </ScrollView>
// // // // // //   );
// // // // // // };

// // // // // // const styles = StyleSheet.create({
// // // // // //   container: {
// // // // // //     flex: 1,
// // // // // //     backgroundColor: '#f5f5f5',
// // // // // //     padding: 20,
// // // // // //   },
// // // // // //   loadingContainer: {
// // // // // //     flex: 1,
// // // // // //     justifyContent: 'center',
// // // // // //     alignItems: 'center',
// // // // // //     backgroundColor: '#f5f5f5',
// // // // // //   },
// // // // // //   loadingText: {
// // // // // //     fontSize: 18,
// // // // // //     color: '#666',
// // // // // //   },
// // // // // //   title: {
// // // // // //     fontSize: 28,
// // // // // //     fontWeight: 'bold',
// // // // // //     color: '#2e7d32',
// // // // // //     textAlign: 'center',
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   summaryContainer: {
// // // // // //     backgroundColor: '#e8f5e8',
// // // // // //     padding: 15,
// // // // // //     borderRadius: 8,
// // // // // //     marginBottom: 20,
// // // // // //   },
// // // // // //   summaryText: {
// // // // // //     fontSize: 16,
// // // // // //     color: '#2e7d32',
// // // // // //     marginBottom: 5,
// // // // // //   },
// // // // // //   sectionTitle: {
// // // // // //     fontSize: 20,
// // // // // //     fontWeight: 'bold',
// // // // // //     color: '#1b5e20',
// // // // // //     marginBottom: 15,
// // // // // //   },
// // // // // //   doctorCard: {
// // // // // //     backgroundColor: '#ffffff',
// // // // // //     borderRadius: 8,
// // // // // //     padding: 15,
// // // // // //     marginBottom: 15,
// // // // // //     flexDirection: 'row',
// // // // // //     alignItems: 'center',
// // // // // //     shadowColor: '#000',
// // // // // //     shadowOffset: { width: 0, height: 2 },
// // // // // //     shadowOpacity: 0.1,
// // // // // //     shadowRadius: 4,
// // // // // //     elevation: 3,
// // // // // //   },
// // // // // //   profileImage: {
// // // // // //     width: 60,
// // // // // //     height: 60,
// // // // // //     borderRadius: 30,
// // // // // //     marginRight: 15,
// // // // // //   },
// // // // // //   doctorInfo: {
// // // // // //     flex: 1,
// // // // // //   },
// // // // // //   doctorName: {
// // // // // //     fontSize: 18,
// // // // // //     fontWeight: 'bold',
// // // // // //     color: '#2e7d32',
// // // // // //     marginBottom: 5,
// // // // // //   },
// // // // // //   doctorEmail: {
// // // // // //     fontSize: 14,
// // // // // //     color: '#666',
// // // // // //     marginBottom: 2,
// // // // // //   },
// // // // // //   doctorPhone: {
// // // // // //     fontSize: 14,
// // // // // //     color: '#666',
// // // // // //     marginBottom: 5,
// // // // // //   },
// // // // // //   doctorDetail: {
// // // // // //     fontSize: 14,
// // // // // //     color: '#444',
// // // // // //     marginBottom: 2,
// // // // // //   },
// // // // // //   createdAt: {
// // // // // //     fontSize: 12,
// // // // // //     color: '#888',
// // // // // //     marginTop: 5,
// // // // // //   },
// // // // // //   actionButtons: {
// // // // // //     flexDirection: 'row',
// // // // // //   },
// // // // // //   actionButton: {
// // // // // //     paddingVertical: 8,
// // // // // //     paddingHorizontal: 15,
// // // // // //     borderRadius: 5,
// // // // // //     marginLeft: 10,
// // // // // //   },
// // // // // //   approveButton: {
// // // // // //     backgroundColor: '#4caf50',
// // // // // //   },
// // // // // //   approveButtonText: {
// // // // // //     color: '#ffffff',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // //   rejectButton: {
// // // // // //     backgroundColor: '#f44336',
// // // // // //   },
// // // // // //   rejectButtonText: {
// // // // // //     color: '#ffffff',
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // //   noDataText: {
// // // // // //     fontSize: 16,
// // // // // //     color: '#666',
// // // // // //     textAlign: 'center',
// // // // // //     marginTop: 20,
// // // // // //   },
// // // // // //   backButton: {
// // // // // //     backgroundColor: '#2e7d32',
// // // // // //     paddingVertical: 12,
// // // // // //     borderRadius: 8,
// // // // // //     alignItems: 'center',
// // // // // //     marginTop: 20,
// // // // // //   },
// // // // // //   backButtonText: {
// // // // // //     color: '#ffffff',
// // // // // //     fontSize: 16,
// // // // // //     fontWeight: 'bold',
// // // // // //   },
// // // // // // });

// // // // // // export default DoctorApprovalsScreen;


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   StyleSheet,
// // // // //   FlatList,
// // // // //   TouchableOpacity,
// // // // //   Alert,
// // // // //   Image,
// // // // //   ScrollView,
// // // // //   Linking,
// // // // // } from 'react-native';
// // // // // import { useNavigation } from '@react-navigation/native';

// // // // // interface Document {
// // // // //   id: number;
// // // // //   document_type: string;
// // // // //   document_url: string;
// // // // //   created_at: string;
// // // // // }

// // // // // interface Address {
// // // // //   city?: string;
// // // // //   state?: string;
// // // // //   pincode?: string;
// // // // //   street?: string;
// // // // // }

// // // // // interface UnverifiedDoctor {
// // // // //   user_id: number;
// // // // //   specialization: string | null;
// // // // //   gender: string | null;
// // // // //   date_of_birth: string | null;
// // // // //   experience_years: number | null;
// // // // //   license_number: string | null;
// // // // //   profile_picture: string;
// // // // //   created_at: string;
// // // // //   user: {
// // // // //     username: string;
// // // // //     email: string;
// // // // //     phone_number: string;
// // // // //     created_at: string;
// // // // //     documents: Document[];
// // // // //     address: Address[];
// // // // //   };
// // // // // }

// // // // // interface ApiResponse {
// // // // //   total_unverified_doctors: number;
// // // // //   total_unverified_organisations: number;
// // // // //   unverified_doctors: UnverifiedDoctor[];
// // // // //   unverified_organisations: any[];
// // // // // }

// // // // // const DoctorApprovalsScreen = () => {
// // // // //   const [data, setData] = useState<ApiResponse | null>(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const navigation = useNavigation();

// // // // //   useEffect(() => {
// // // // //     fetchUnverifiedDoctors();
// // // // //   }, []);

// // // // //   const fetchUnverifiedDoctors = async () => {
// // // // //     try {
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/admin/get-unverified-acc', {
// // // // //         method: 'GET',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // // //       }

// // // // //       const result: ApiResponse = await response.json();
// // // // //       setData(result);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching unverified doctors:', error);
// // // // //       Alert.alert('Error', 'Failed to fetch unverified doctors');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleApprove = (doctorId: number) => {
// // // // //     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
// // // // //   };

// // // // //   const handleReject = (doctorId: number) => {
// // // // //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// // // // //   };

// // // // //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// // // // //     <View style={styles.doctorCard}>
// // // // //       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// // // // //       <View style={styles.doctorInfo}>
// // // // //         <Text style={styles.doctorName}>{item.user.username}</Text>
// // // // //         <Text style={styles.doctorEmail}>{item.user.email}</Text>
// // // // //         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
// // // // //         {item.specialization && <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>}
// // // // //         {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
// // // // //         {item.date_of_birth && (
// // // // //           <Text style={styles.doctorDetail}>
// // // // //             DOB: {new Date(item.date_of_birth).toLocaleDateString()}
// // // // //           </Text>
// // // // //         )}
// // // // //         {item.experience_years !== null && (
// // // // //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// // // // //         )}
// // // // //         {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
// // // // //         <Text style={styles.createdAt}>
// // // // //           Registered: {new Date(item.created_at).toLocaleDateString()}
// // // // //         </Text>

// // // // //         {/* Documents */}
// // // // //         <View style={styles.documentsContainer}>
// // // // //           <Text style={styles.documentsTitle}>Documents:</Text>
// // // // //           {item.user.documents && item.user.documents.length > 0 ? (
// // // // //             item.user.documents.map((doc) => (
// // // // //               <TouchableOpacity key={doc.id} onPress={() => Linking.openURL(doc.document_url)}>
// // // // //                 <Text style={styles.documentLink}>{doc.document_type} 📄</Text>
// // // // //               </TouchableOpacity>
// // // // //             ))
// // // // //           ) : (
// // // // //             <Text style={styles.noDocumentsText}>No documents available</Text>
// // // // //           )}
// // // // //         </View>

// // // // //         {/* Address */}
// // // // //         {item.user.address && item.user.address.length > 0 && (
// // // // //           <View style={styles.addressContainer}>
// // // // //             <Text style={styles.documentsTitle}>Address:</Text>
// // // // //             {item.user.address.map((addr, idx) => (
// // // // //               <Text key={idx} style={styles.addressText}>
// // // // //                 {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
// // // // //               </Text>
// // // // //             ))}
// // // // //           </View>
// // // // //         )}
// // // // //       </View>

// // // // //       <View style={styles.actionButtons}>
// // // // //         <TouchableOpacity
// // // // //           style={[styles.actionButton, styles.approveButton]}
// // // // //           onPress={() => handleApprove(item.user_id)}
// // // // //         >
// // // // //           <Text style={styles.approveButtonText}>Approve</Text>
// // // // //         </TouchableOpacity>
// // // // //         <TouchableOpacity
// // // // //           style={[styles.actionButton, styles.rejectButton]}
// // // // //           onPress={() => handleReject(item.user_id)}
// // // // //         >
// // // // //           <Text style={styles.rejectButtonText}>Reject</Text>
// // // // //         </TouchableOpacity>
// // // // //       </View>
// // // // //     </View>
// // // // //   );

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <View style={styles.loadingContainer}>
// // // // //         <Text style={styles.loadingText}>Loading...</Text>
// // // // //       </View>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <ScrollView style={styles.container}>
// // // // //       <Text style={styles.title}>Doctor Approvals</Text>

// // // // //       <View style={styles.summaryContainer}>
// // // // //         <Text style={styles.summaryText}>
// // // // //           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
// // // // //         </Text>
// // // // //         <Text style={styles.summaryText}>
// // // // //           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
// // // // //         </Text>
// // // // //       </View>

// // // // //       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

// // // // //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// // // // //         <FlatList
// // // // //           data={data.unverified_doctors}
// // // // //           renderItem={renderDoctorItem}
// // // // //           keyExtractor={(item) => item.user_id.toString()}
// // // // //           scrollEnabled={false}
// // // // //         />
// // // // //       ) : (
// // // // //         <Text style={styles.noDataText}>No unverified doctors found.</Text>
// // // // //       )}

// // // // //       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// // // // //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// // // // //       </TouchableOpacity>
// // // // //     </ScrollView>
// // // // //   );
// // // // // };

// // // // // const styles = StyleSheet.create({
// // // // //   container: {
// // // // //     flex: 1,
// // // // //     backgroundColor: '#f5f5f5',
// // // // //     padding: 20,
// // // // //   },
// // // // //   loadingContainer: {
// // // // //     flex: 1,
// // // // //     justifyContent: 'center',
// // // // //     alignItems: 'center',
// // // // //     backgroundColor: '#f5f5f5',
// // // // //   },
// // // // //   loadingText: {
// // // // //     fontSize: 18,
// // // // //     color: '#666',
// // // // //   },
// // // // //   title: {
// // // // //     fontSize: 28,
// // // // //     fontWeight: 'bold',
// // // // //     color: '#2e7d32',
// // // // //     textAlign: 'center',
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   summaryContainer: {
// // // // //     backgroundColor: '#e8f5e8',
// // // // //     padding: 15,
// // // // //     borderRadius: 8,
// // // // //     marginBottom: 20,
// // // // //   },
// // // // //   summaryText: {
// // // // //     fontSize: 16,
// // // // //     color: '#2e7d32',
// // // // //     marginBottom: 5,
// // // // //   },
// // // // //   sectionTitle: {
// // // // //     fontSize: 20,
// // // // //     fontWeight: 'bold',
// // // // //     color: '#1b5e20',
// // // // //     marginBottom: 15,
// // // // //   },
// // // // //   doctorCard: {
// // // // //     backgroundColor: '#ffffff',
// // // // //     borderRadius: 8,
// // // // //     padding: 15,
// // // // //     marginBottom: 15,
// // // // //     flexDirection: 'row',
// // // // //     alignItems: 'flex-start',
// // // // //     shadowColor: '#000',
// // // // //     shadowOffset: { width: 0, height: 2 },
// // // // //     shadowOpacity: 0.1,
// // // // //     shadowRadius: 4,
// // // // //     elevation: 3,
// // // // //   },
// // // // //   profileImage: {
// // // // //     width: 70,
// // // // //     height: 70,
// // // // //     borderRadius: 35,
// // // // //     marginRight: 15,
// // // // //   },
// // // // //   doctorInfo: {
// // // // //     flex: 1,
// // // // //   },
// // // // //   doctorName: {
// // // // //     fontSize: 18,
// // // // //     fontWeight: 'bold',
// // // // //     color: '#2e7d32',
// // // // //     marginBottom: 3,
// // // // //   },
// // // // //   doctorEmail: {
// // // // //     fontSize: 14,
// // // // //     color: '#666',
// // // // //     marginBottom: 2,
// // // // //   },
// // // // //   doctorPhone: {
// // // // //     fontSize: 14,
// // // // //     color: '#666',
// // // // //     marginBottom: 2,
// // // // //   },
// // // // //   doctorDetail: {
// // // // //     fontSize: 14,
// // // // //     color: '#444',
// // // // //     marginBottom: 2,
// // // // //   },
// // // // //   createdAt: {
// // // // //     fontSize: 12,
// // // // //     color: '#888',
// // // // //     marginTop: 5,
// // // // //   },
// // // // //   documentsContainer: {
// // // // //     marginTop: 8,
// // // // //   },
// // // // //   documentsTitle: {
// // // // //     fontWeight: 'bold',
// // // // //     color: '#1b5e20',
// // // // //     marginBottom: 3,
// // // // //   },
// // // // //   documentLink: {
// // // // //     color: '#1565c0',
// // // // //     textDecorationLine: 'underline',
// // // // //     marginBottom: 2,
// // // // //   },
// // // // //   noDocumentsText: {
// // // // //     fontStyle: 'italic',
// // // // //     color: '#888',
// // // // //   },
// // // // //   addressContainer: {
// // // // //     marginTop: 5,
// // // // //   },
// // // // //   addressText: {
// // // // //     fontSize: 13,
// // // // //     color: '#555',
// // // // //     marginBottom: 2,
// // // // //   },
// // // // //   actionButtons: {
// // // // //     flexDirection: 'column',
// // // // //     marginLeft: 10,
// // // // //   },
// // // // //   actionButton: {
// // // // //     paddingVertical: 8,
// // // // //     paddingHorizontal: 15,
// // // // //     borderRadius: 5,
// // // // //     marginBottom: 5,
// // // // //   },
// // // // //   approveButton: {
// // // // //     backgroundColor: '#4caf50',
// // // // //   },
// // // // //   approveButtonText: {
// // // // //     color: '#ffffff',
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // //   rejectButton: {
// // // // //     backgroundColor: '#f44336',
// // // // //   },
// // // // //   rejectButtonText: {
// // // // //     color: '#ffffff',
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // //   noDataText: {
// // // // //     fontSize: 16,
// // // // //     color: '#666',
// // // // //     textAlign: 'center',
// // // // //     marginTop: 20,
// // // // //   },
// // // // //   backButton: {
// // // // //     backgroundColor: '#2e7d32',
// // // // //     paddingVertical: 12,
// // // // //     borderRadius: 8,
// // // // //     alignItems: 'center',
// // // // //     marginTop: 20,
// // // // //   },
// // // // //   backButtonText: {
// // // // //     color: '#ffffff',
// // // // //     fontSize: 16,
// // // // //     fontWeight: 'bold',
// // // // //   },
// // // // // });

// // // // // export default DoctorApprovalsScreen;



// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   FlatList,
// // // //   TouchableOpacity,
// // // //   Alert,
// // // //   Image,
// // // //   ScrollView,
// // // //   Modal,
// // // //   Dimensions,
// // // // } from 'react-native';
// // // // import { useNavigation } from '@react-navigation/native';

// // // // interface Document {
// // // //   id: number;
// // // //   document_type: string;
// // // //   document_url: string;
// // // //   created_at: string;
// // // // }

// // // // interface Address {
// // // //   city?: string;
// // // //   state?: string;
// // // //   pincode?: string;
// // // //   street?: string;
// // // // }

// // // // interface UnverifiedDoctor {
// // // //   user_id: number;
// // // //   specialization: string | null;
// // // //   gender: string | null;
// // // //   date_of_birth: string | null;
// // // //   experience_years: number | null;
// // // //   license_number: string | null;
// // // //   profile_picture: string;
// // // //   created_at: string;
// // // //   user: {
// // // //     username: string;
// // // //     email: string;
// // // //     phone_number: string;
// // // //     created_at: string;
// // // //     documents: Document[];
// // // //     address: Address[];
// // // //   };
// // // // }

// // // // interface ApiResponse {
// // // //   total_unverified_doctors: number;
// // // //   total_unverified_organisations: number;
// // // //   unverified_doctors: UnverifiedDoctor[];
// // // //   unverified_organisations: any[];
// // // // }

// // // // const DoctorApprovalsScreen = () => {
// // // //   const [data, setData] = useState<ApiResponse | null>(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [modalVisible, setModalVisible] = useState(false);
// // // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);

// // // //   const navigation = useNavigation();

// // // //   useEffect(() => {
// // // //     fetchUnverifiedDoctors();
// // // //   }, []);

// // // //   const fetchUnverifiedDoctors = async () => {
// // // //     try {
// // // //       const response = await fetch(
// // // //         'https://landing.docapp.co.in/api/admin/get-unverified-acc',
// // // //         {
// // // //           method: 'GET',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //         }
// // // //       );

// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // //       }

// // // //       const result: ApiResponse = await response.json();
// // // //       setData(result);
// // // //     } catch (error) {
// // // //       console.error('Error fetching unverified doctors:', error);
// // // //       Alert.alert('Error', 'Failed to fetch unverified doctors');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleApprove = (doctorId: number) => {
// // // //     Alert.alert('Approve', `Approve doctor with ID: ${doctorId}`);
// // // //   };

// // // //   const handleReject = (doctorId: number) => {
// // // //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// // // //   };

// // // //   const openImageModal = (url: string) => {
// // // //     setSelectedImage(url);
// // // //     setModalVisible(true);
// // // //   };

// // // //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// // // //     <View style={styles.doctorCard}>
// // // //       <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// // // //       <View style={styles.doctorInfo}>
// // // //         <Text style={styles.doctorName}>{item.user.username}</Text>
// // // //         <Text style={styles.doctorEmail}>{item.user.email}</Text>
// // // //         <Text style={styles.doctorPhone}>{item.user.phone_number}</Text>
// // // //         {item.specialization && (
// // // //           <Text style={styles.doctorDetail}>Specialization: {item.specialization}</Text>
// // // //         )}
// // // //         {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
// // // //         {item.date_of_birth && (
// // // //           <Text style={styles.doctorDetail}>
// // // //             DOB: {new Date(item.date_of_birth).toLocaleDateString()}
// // // //           </Text>
// // // //         )}
// // // //         {item.experience_years !== null && (
// // // //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// // // //         )}
// // // //         {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
// // // //         <Text style={styles.createdAt}>
// // // //           Registered: {new Date(item.created_at).toLocaleDateString()}
// // // //         </Text>

// // // //         {/* Documents */}
// // // //         <View style={styles.documentsContainer}>
// // // //           <Text style={styles.documentsTitle}>Documents:</Text>
// // // //           {item.user.documents && item.user.documents.length > 0 ? (
// // // //             item.user.documents.map((doc) => (
// // // //               <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)}>
// // // //                 <Text style={styles.documentLink}>{doc.document_type} 🖼️</Text>
// // // //               </TouchableOpacity>
// // // //             ))
// // // //           ) : (
// // // //             <Text style={styles.noDocumentsText}>No documents available</Text>
// // // //           )}
// // // //         </View>

// // // //         {/* Address */}
// // // //         {item.user.address && item.user.address.length > 0 && (
// // // //           <View style={styles.addressContainer}>
// // // //             <Text style={styles.documentsTitle}>Address:</Text>
// // // //             {item.user.address.map((addr, idx) => (
// // // //               <Text key={idx} style={styles.addressText}>
// // // //                 {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
// // // //               </Text>
// // // //             ))}
// // // //           </View>
// // // //         )}
// // // //       </View>

// // // //       <View style={styles.actionButtons}>
// // // //         <TouchableOpacity
// // // //           style={[styles.actionButton, styles.approveButton]}
// // // //           onPress={() => handleApprove(item.user_id)}
// // // //         >
// // // //           <Text style={styles.approveButtonText}>Approve</Text>
// // // //         </TouchableOpacity>
// // // //         <TouchableOpacity
// // // //           style={[styles.actionButton, styles.rejectButton]}
// // // //           onPress={() => handleReject(item.user_id)}
// // // //         >
// // // //           <Text style={styles.rejectButtonText}>Reject</Text>
// // // //         </TouchableOpacity>
// // // //       </View>
// // // //     </View>
// // // //   );

// // // //   if (loading) {
// // // //     return (
// // // //       <View style={styles.loadingContainer}>
// // // //         <Text style={styles.loadingText}>Loading...</Text>
// // // //       </View>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <ScrollView style={styles.container}>
// // // //       <Text style={styles.title}>Doctor Approvals</Text>

// // // //       <View style={styles.summaryContainer}>
// // // //         <Text style={styles.summaryText}>
// // // //           Total Unverified Doctors: {data?.total_unverified_doctors || 0}
// // // //         </Text>
// // // //         <Text style={styles.summaryText}>
// // // //           Total Unverified Organizations: {data?.total_unverified_organisations || 0}
// // // //         </Text>
// // // //       </View>

// // // //       <Text style={styles.sectionTitle}>Unverified Doctors</Text>

// // // //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// // // //         <FlatList
// // // //           data={data.unverified_doctors}
// // // //           renderItem={renderDoctorItem}
// // // //           keyExtractor={(item) => item.user_id.toString()}
// // // //           scrollEnabled={false}
// // // //         />
// // // //       ) : (
// // // //         <Text style={styles.noDataText}>No unverified doctors found.</Text>
// // // //       )}

// // // //       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// // // //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// // // //       </TouchableOpacity>

// // // //       {/* Fullscreen Image Modal */}
// // // //       <Modal visible={modalVisible} transparent={true}>
// // // //         <View style={styles.modalContainer}>
// // // //           <TouchableOpacity
// // // //             style={styles.modalBackground}
// // // //             onPress={() => setModalVisible(false)}
// // // //           />
// // // //           {selectedImage && (
// // // //             <Image
// // // //               source={{ uri: selectedImage }}
// // // //               style={styles.fullscreenImage}
// // // //               resizeMode="contain"
// // // //             />
// // // //           )}
// // // //         </View>
// // // //       </Modal>
// // // //     </ScrollView>
// // // //   );
// // // // };

// // // // const styles = StyleSheet.create({
// // // //   container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
// // // //   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
// // // //   loadingText: { fontSize: 18, color: '#666' },
// // // //   title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
// // // //   summaryContainer: { backgroundColor: '#e8f5e8', padding: 15, borderRadius: 8, marginBottom: 20 },
// // // //   summaryText: { fontSize: 16, color: '#2e7d32', marginBottom: 5 },
// // // //   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginBottom: 15 },
// // // //   doctorCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
// // // //   profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
// // // //   doctorInfo: { flex: 1 },
// // // //   doctorName: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 3 },
// // // //   doctorEmail: { fontSize: 14, color: '#666', marginBottom: 2 },
// // // //   doctorPhone: { fontSize: 14, color: '#666', marginBottom: 2 },
// // // //   doctorDetail: { fontSize: 14, color: '#444', marginBottom: 2 },
// // // //   createdAt: { fontSize: 12, color: '#888', marginTop: 5 },
// // // //   documentsContainer: { marginTop: 8 },
// // // //   documentsTitle: { fontWeight: 'bold', color: '#1b5e20', marginBottom: 3 },
// // // //   documentLink: { color: '#1565c0', textDecorationLine: 'underline', marginBottom: 2 },
// // // //   noDocumentsText: { fontStyle: 'italic', color: '#888' },
// // // //   addressContainer: { marginTop: 5 },
// // // //   addressText: { fontSize: 13, color: '#555', marginBottom: 2 },
// // // //   actionButtons: { flexDirection: 'column', marginLeft: 10 },
// // // //   actionButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginBottom: 5 },
// // // //   approveButton: { backgroundColor: '#4caf50' },
// // // //   approveButtonText: { color: '#ffffff', fontWeight: 'bold' },
// // // //   rejectButton: { backgroundColor: '#f44336' },
// // // //   rejectButtonText: { color: '#ffffff', fontWeight: 'bold' },
// // // //   noDataText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
// // // //   backButton: { backgroundColor: '#2e7d32', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
// // // //   backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
// // // //   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // // //   modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.8 },
// // // //   fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
// // // // });

// // // // export default DoctorApprovalsScreen;



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
// // //   Modal,
// // //   Dimensions,
// // // } from 'react-native';
// // // import { useNavigation } from '@react-navigation/native';

// // //   interface Document {
// // //   id: number;
// // //   document_type: string;
// // //   document_url: string;
// // //   created_at: string;
// // // }

// // // interface Address {
// // //   city?: string;
// // //   state?: string;
// // //   pincode?: string;
// // //   street?: string;
// // // }

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
// // //     documents: Document[];
// // //     address: Address[];
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
// // //   const [modalVisible, setModalVisible] = useState(false);
// // //   const [selectedImage, setSelectedImage] = useState<string | null>(null);

// // //   const navigation = useNavigation();

// // //   useEffect(() => {
// // //     fetchUnverifiedDoctors();
// // //   }, []);

// // //   // Fetch unverified doctors
// // //   const fetchUnverifiedDoctors = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         'https://landing.docapp.co.in/api/admin/get-unverified-acc',
// // //         {
// // //           method: 'GET',
// // //           headers: {
// // //             'Content-Type': 'application/json',
// // //           },
// // //         }
// // //       );

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

// // //   // Approve doctor API call
// // //   const handleApprove = async (doctorId: number) => {
// // //     try {
// // //       const response = await fetch('https://landing.docapp.co.in/api/admin/approve-doctor', {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ doctor_id: doctorId }),
// // //       });

// // //       const result = await response.json();

// // //       if (response.ok) {
// // //         Alert.alert('Success', result.message || 'Doctor approved successfully');
// // //         // Refresh the list after approval
// // //         fetchUnverifiedDoctors();
// // //       } else {
// // //         Alert.alert('Error', result.message || 'Failed to approve doctor');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error approving doctor:', error);
// // //       Alert.alert('Error', 'Failed to approve doctor');
// // //     }
// // //   };

// // //   const handleReject = (doctorId: number) => {
// // //     Alert.alert('Reject', `Reject doctor with ID: ${doctorId}`);
// // //   };

// // //   const openImageModal = (url: string) => {
// // //     setSelectedImage(url);
// // //     setModalVisible(true);
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
// // //         {item.gender && <Text style={styles.doctorDetail}>Gender: {item.gender}</Text>}
// // //         {item.date_of_birth && (
// // //           <Text style={styles.doctorDetail}>
// // //             DOB: {new Date(item.date_of_birth).toLocaleDateString()}
// // //           </Text>
// // //         )}
// // //         {item.experience_years !== null && (
// // //           <Text style={styles.doctorDetail}>Experience: {item.experience_years} years</Text>
// // //         )}
// // //         {item.license_number && <Text style={styles.doctorDetail}>License: {item.license_number}</Text>}
// // //         <Text style={styles.createdAt}>
// // //           Registered: {new Date(item.created_at).toLocaleDateString()}
// // //         </Text>

// // //         {/* Documents */}
// // //         <View style={styles.documentsContainer}>
// // //           <Text style={styles.documentsTitle}>Documents:</Text>
// // //           {item.user.documents && item.user.documents.length > 0 ? (
// // //             item.user.documents.map((doc) => (
// // //               <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)}>
// // //                 <Text style={styles.documentLink}>{doc.document_type} 🖼️</Text>
// // //               </TouchableOpacity>
// // //             ))
// // //           ) : (
// // //             <Text style={styles.noDocumentsText}>No documents available</Text>
// // //           )}
// // //         </View>

// // //         {/* Address */}
// // //         {item.user.address && item.user.address.length > 0 && (
// // //           <View style={styles.addressContainer}>
// // //             <Text style={styles.documentsTitle}>Address:</Text>
// // //             {item.user.address.map((addr, idx) => (
// // //               <Text key={idx} style={styles.addressText}>
// // //                 {addr.street || '-'}, {addr.city || '-'}, {addr.state || '-'} - {addr.pincode || '-'}
// // //               </Text>
// // //             ))}
// // //           </View>
// // //         )}
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

// // //       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// // //         <Text style={styles.backButtonText}>Back to Admin Dashboard</Text>
// // //       </TouchableOpacity>

// // //       {/* Fullscreen Image Modal */}
// // //       <Modal visible={modalVisible} transparent={true}>
// // //         <View style={styles.modalContainer}>
// // //           <TouchableOpacity
// // //             style={styles.modalBackground}
// // //             onPress={() => setModalVisible(false)}
// // //           />
// // //           {selectedImage && (
// // //             <Image
// // //               source={{ uri: selectedImage }}
// // //               style={styles.fullscreenImage}
// // //               resizeMode="contain"
// // //             />
// // //           )}
// // //         </View>
// // //       </Modal>
// // //     </ScrollView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
// // //   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
// // //   loadingText: { fontSize: 18, color: '#666' },
// // //   title: { fontSize: 28, fontWeight: 'bold', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
// // //   summaryContainer: { backgroundColor: '#e8f5e8', padding: 15, borderRadius: 8, marginBottom: 20 },
// // //   summaryText: { fontSize: 16, color: '#2e7d32', marginBottom: 5 },
// // //   sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1b5e20', marginBottom: 15 },
// // //   doctorCard: { backgroundColor: '#ffffff', borderRadius: 8, padding: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
// // //   profileImage: { width: 70, height: 70, borderRadius: 35, marginRight: 15 },
// // //   doctorInfo: { flex: 1 },
// // //   doctorName: { fontSize: 18, fontWeight: 'bold', color: '#2e7d32', marginBottom: 3 },
// // //   doctorEmail: { fontSize: 14, color: '#666', marginBottom: 2 },
// // //   doctorPhone: { fontSize: 14, color: '#666', marginBottom: 2 },
// // //   doctorDetail: { fontSize: 14, color: '#444', marginBottom: 2 },
// // //   createdAt: { fontSize: 12, color: '#888', marginTop: 5 },
// // //   documentsContainer: { marginTop: 8 },
// // //   documentsTitle: { fontWeight: 'bold', color: '#1b5e20', marginBottom: 3 },
// // //   documentLink: { color: '#1565c0', textDecorationLine: 'underline', marginBottom: 2 },
// // //   noDocumentsText: { fontStyle: 'italic', color: '#888' },
// // //   addressContainer: { marginTop: 5 },
// // //   addressText: { fontSize: 13, color: '#555', marginBottom: 2 },
// // //   actionButtons: { flexDirection: 'column', marginLeft: 10 },
// // //   actionButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginBottom: 5 },
// // //   approveButton: { backgroundColor: '#4caf50' },
// // //   approveButtonText: { color: '#ffffff', fontWeight: 'bold' },
// // //   rejectButton: { backgroundColor: '#f44336' },
// // //   rejectButtonText: { color: '#ffffff', fontWeight: 'bold' },
// // //   noDataText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
// // //   backButton: { backgroundColor: '#2e7d32', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 20 },
// // //   backButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
// // //   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// // //   modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#000', opacity: 0.8 },
// // //   fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
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
// //   Modal,
// //   Dimensions,
// //   Linking,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';

// // // --- Interfaces ---

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

// // interface UserData {
// //   username: string;
// //   email: string;
// //   phone_number: string;
// //   created_at: string;
// //   documents: Document[];
// //   address: Address[];
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
// //   user: UserData;
// // }

// // interface UnverifiedOrganisation {
// //   id: number;
// //   organisation_name: string | null;
// //   organisation_type: string;
// //   regestration_number: string | null; // Kept typo from API response
// //   website_url: string | null;
// //   verified_status: boolean;
// //   created_at: string;
// //   user: UserData;
// // }

// // interface ApiResponse {
// //   total_unverified_doctors: number;
// //   total_unverified_organisations: number;
// //   unverified_doctors: UnverifiedDoctor[];
// //   unverified_organisations: UnverifiedOrganisation[];
// // }

// // const DoctorApprovalsScreen = () => {
// //   const [data, setData] = useState<ApiResponse | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState<string | null>(null);

// //   const navigation = useNavigation();

// //   useEffect(() => {
// //     fetchUnverifiedAccounts();
// //   }, []);

// //   // --- API Calls ---

// //   const fetchUnverifiedAccounts = async () => {
// //     try {
// //       const response = await fetch(
// //         'https://landing.docapp.co.in/api/admin/get-unverified-acc',
// //         {
// //           method: 'GET',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result: ApiResponse = await response.json();
// //       setData(result);
// //     } catch (error) {
// //       console.error('Error fetching unverified accounts:', error);
// //       Alert.alert('Error', 'Failed to fetch unverified accounts');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleApproveDoctor = async (doctorId: number) => {
// //     try {
// //       const response = await fetch('https://landing.docapp.co.in/api/admin/approve-doctor', {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ doctor_id: doctorId }),
// //       });

// //       const result = await response.json();

// //       if (response.ok) {
// //         Alert.alert('Success', result.message || 'Doctor approved successfully');
// //         fetchUnverifiedAccounts();
// //       } else {
// //         Alert.alert('Error', result.message || 'Failed to approve doctor');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to approve doctor');
// //     }
// //   };

// //   // TODO: Verify the correct endpoint for Approving Organisations
// //   const handleApproveOrg = async (orgId: number) => {
// //     Alert.alert(
// //       "Confirm Approval",
// //       "Are you sure you want to approve this organization?",
// //       [
// //         { text: "Cancel", style: "cancel" },
// //         { 
// //           text: "Approve", 
// //           onPress: async () => {
// //             try {
// //               // REPLACE THIS URL WITH YOUR ACTUAL ORG APPROVAL ENDPOINT
// //               const response = await fetch('https://landing.docapp.co.in/api/admin/approve-organisation', {
// //                 method: 'PUT',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ organisation_id: orgId }),
// //               });
        
// //               const result = await response.json();
        
// //               if (response.ok) {
// //                 Alert.alert('Success', 'Organisation approved successfully');
// //                 fetchUnverifiedAccounts();
// //               } else {
// //                 // For now, since endpoint might not exist, we just alert
// //                 Alert.alert('API Note', 'Please ensure the admin/approve-organisation endpoint exists in your backend.');
// //                 console.log('Org ID to approve:', orgId);
// //               }
// //             } catch (error) {
// //               console.error(error);
// //               Alert.alert('Error', 'Failed to approve organisation');
// //             }
// //           } 
// //         }
// //       ]
// //     );
// //   };

// //   const handleReject = (id: number, type: 'doctor' | 'org') => {
// //     Alert.alert('Reject', `Reject ${type} with ID: ${id}`);
// //   };

// //   const openImageModal = (url: string) => {
// //     setSelectedImage(url);
// //     setModalVisible(true);
// //   };

// //   const openUrl = (url: string) => {
// //     if(url) Linking.openURL(url.startsWith('http') ? url : `https://${url}`).catch(err => console.error("Couldn't load page", err));
// //   };

// //   // --- Render Helpers ---

// //   const renderAddress = (addresses: Address[]) => {
// //     if (!addresses || addresses.length === 0) return null;
// //     return (
// //       <View style={styles.addressContainer}>
// //         <Text style={styles.subHeaderTitle}>Address:</Text>
// //         {addresses.map((addr, idx) => (
// //           <Text key={idx} style={styles.addressText}>
// //             {addr.street || ''} {addr.city || ''} {addr.state || ''} {addr.pincode || ''}
// //           </Text>
// //         ))}
// //       </View>
// //     );
// //   };

// //   const renderDocuments = (documents: Document[]) => {
// //     return (
// //       <View style={styles.documentsContainer}>
// //         <Text style={styles.subHeaderTitle}>Documents:</Text>
// //         {documents && documents.length > 0 ? (
// //           <View style={styles.docList}>
// //             {documents.map((doc) => (
// //               <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)} style={styles.docBadge}>
// //                 <Text style={styles.documentLink}>{doc.document_type} 👁️</Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         ) : (
// //           <Text style={styles.noDocumentsText}>No documents available</Text>
// //         )}
// //       </View>
// //     );
// //   };

// //   // --- List Items ---

// //   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
// //     <View style={styles.card}>
// //       <View style={styles.cardHeader}>
// //         <Image source={{ uri: item.profile_picture }} style={styles.profileImage} />
// //         <View style={styles.headerInfo}>
// //           <Text style={styles.name}>{item.user.username}</Text>
// //           <Text style={styles.roleLabel}>Doctor</Text>
// //           <Text style={styles.detailText}>📧 {item.user.email}</Text>
// //           <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
// //         </View>
// //       </View>
      
// //       <View style={styles.cardBody}>
// //         {item.specialization && <Text style={styles.detailText}>Spec: {item.specialization}</Text>}
// //         {item.experience_years !== null && <Text style={styles.detailText}>Exp: {item.experience_years} Years</Text>}
// //         {item.license_number && <Text style={styles.detailText}>License: {item.license_number}</Text>}
        
// //         {renderDocuments(item.user.documents)}
// //         {renderAddress(item.user.address)}
// //       </View>

// //       <View style={styles.actionButtons}>
// //         <TouchableOpacity style={[styles.actionButton, styles.approveButton]} onPress={() => handleApproveDoctor(item.user_id)}>
// //           <Text style={styles.buttonText}>Approve</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => handleReject(item.user_id, 'doctor')}>
// //           <Text style={styles.buttonText}>Reject</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   const renderOrganisationItem = ({ item }: { item: UnverifiedOrganisation }) => (
// //     <View style={styles.card}>
// //       <View style={styles.cardHeader}>
// //         {/* Placeholder Icon for Org */}
// //         <View style={styles.orgIcon}>
// //             <Text style={{fontSize: 30}}>🏥</Text>
// //         </View>
// //         <View style={styles.headerInfo}>
// //           <Text style={styles.name}>{item.organisation_name || item.user.username}</Text>
// //           <Text style={styles.roleLabel}>{item.organisation_type.toUpperCase()}</Text>
// //           <Text style={styles.detailText}>📧 {item.user.email}</Text>
// //           <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
// //         </View>
// //       </View>

// //       <View style={styles.cardBody}>
// //         {item.regestration_number && <Text style={styles.detailText}>Reg No: {item.regestration_number}</Text>}
// //         {item.website_url && (
// //              <TouchableOpacity onPress={() => openUrl(item.website_url!)}>
// //                  <Text style={[styles.detailText, {color: 'blue', textDecorationLine: 'underline'}]}>
// //                      🌐 {item.website_url}
// //                  </Text>
// //              </TouchableOpacity>
// //         )}
        
// //         {renderDocuments(item.user.documents)}
// //         {renderAddress(item.user.address)}
// //       </View>

// //       <View style={styles.actionButtons}>
// //         <TouchableOpacity style={[styles.actionButton, styles.approveButton]} onPress={() => handleApproveOrg(item.id)}>
// //           <Text style={styles.buttonText}>Approve Org</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={[styles.actionButton, styles.rejectButton]} onPress={() => handleReject(item.id, 'org')}>
// //           <Text style={styles.buttonText}>Reject</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );

// //   // --- Main Render ---

// //   if (loading) {
// //     return (
// //       <View style={styles.loadingContainer}>
// //         <Text style={styles.loadingText}>Loading Requests...</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <ScrollView style={styles.container}>
// //       <Text style={styles.screenTitle}>Verification Requests</Text>

// //       {/* Summary Section */}
// //       <View style={styles.summaryContainer}>
// //         <View style={styles.summaryItem}>
// //             <Text style={styles.summaryCount}>{data?.total_unverified_doctors || 0}</Text>
// //             <Text style={styles.summaryLabel}>Doctors</Text>
// //         </View>
// //         <View style={styles.verticalDivider} />
// //         <View style={styles.summaryItem}>
// //             <Text style={styles.summaryCount}>{data?.total_unverified_organisations || 0}</Text>
// //             <Text style={styles.summaryLabel}>Organisations</Text>
// //         </View>
// //       </View>

// //       {/* Organisations List */}
// //       <Text style={styles.sectionHeader}>🏥 Organisations ({data?.unverified_organisations?.length || 0})</Text>
// //       {data?.unverified_organisations && data.unverified_organisations.length > 0 ? (
// //         <FlatList
// //           data={data.unverified_organisations}
// //           renderItem={renderOrganisationItem}
// //           keyExtractor={(item) => `org-${item.id}`}
// //           scrollEnabled={false}
// //         />
// //       ) : (
// //         <Text style={styles.emptyText}>No pending organisations.</Text>
// //       )}

// //       <View style={styles.divider} />

// //       {/* Doctors List */}
// //       <Text style={styles.sectionHeader}>👨‍⚕️ Doctors ({data?.unverified_doctors?.length || 0})</Text>
// //       {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
// //         <FlatList
// //           data={data.unverified_doctors}
// //           renderItem={renderDoctorItem}
// //           keyExtractor={(item) => `doc-${item.user_id}`}
// //           scrollEnabled={false}
// //         />
// //       ) : (
// //         <Text style={styles.emptyText}>No pending doctors.</Text>
// //       )}

// //       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
// //         <Text style={styles.backButtonText}>Back to Dashboard</Text>
// //       </TouchableOpacity>
      
// //       <View style={{height: 40}} />

// //       {/* Image Modal */}
// //       <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
// //         <View style={styles.modalContainer}>
// //           <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
// //           {selectedImage && (
// //             <Image
// //               source={{ uri: selectedImage }}
// //               style={styles.fullscreenImage}
// //               resizeMode="contain"
// //             />
// //           )}
// //           <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
// //               <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </Modal>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#f2f4f8', padding: 15 },
// //   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// //   loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
  
// //   screenTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  
// //   summaryContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 25, elevation: 2, justifyContent: 'space-around', alignItems: 'center' },
// //   summaryItem: { alignItems: 'center' },
// //   summaryCount: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
// //   summaryLabel: { fontSize: 14, color: '#666' },
// //   verticalDivider: { width: 1, height: '80%', backgroundColor: '#eee' },
  
// //   sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
// //   emptyText: { fontStyle: 'italic', color: '#888', marginLeft: 10, marginBottom: 20 },
// //   divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 },

// //   card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
// //   cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
// //   profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15, backgroundColor: '#eee' },
// //   orgIcon: { width: 60, height: 60, borderRadius: 8, marginRight: 15, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center' },
// //   headerInfo: { flex: 1 },
// //   name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
// //   roleLabel: { fontSize: 12, color: '#1976d2', fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  
// //   cardBody: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginBottom: 15 },
// //   detailText: { fontSize: 14, color: '#555', marginBottom: 4 },
  
// //   documentsContainer: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
// //   subHeaderTitle: { fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 5 },
// //   docList: { flexDirection: 'row', flexWrap: 'wrap' },
// //   docBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 8, marginBottom: 5 },
// //   documentLink: { fontSize: 12, color: '#3949ab' },
// //   noDocumentsText: { fontSize: 12, fontStyle: 'italic', color: '#999' },
  
// //   addressContainer: { marginTop: 8 },
// //   addressText: { fontSize: 13, color: '#666' },

// //   actionButtons: { flexDirection: 'row', justifyContent: 'space-between' },
// //   actionButton: { flex: 0.48, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
// //   approveButton: { backgroundColor: '#43a047' },
// //   rejectButton: { backgroundColor: '#e53935' },
// //   buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

// //   backButton: { backgroundColor: '#555', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
// //   backButtonText: { color: 'white', fontWeight: 'bold' },

// //   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)' },
// //   modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
// //   fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.8 },
// //   closeModalButton: { position: 'absolute', bottom: 50, backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }
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
//   Linking,
//   ActivityIndicator, // Added for better loading UI
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// // --- Interfaces ---

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

// interface UserData {
//   username: string;
//   email: string;
//   phone_number: string;
//   created_at: string;
//   documents: Document[];
//   address: Address[];
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
//   user: UserData;
// }

// interface UnverifiedOrganisation {
//   id: number;
//   organisation_name: string | null;
//   organisation_type: string;
//   regestration_number: string | null;
//   website_url: string | null;
//   verified_status: boolean;
//   created_at: string;
//   user: UserData;
// }

// interface ApiResponse {
//   total_unverified_doctors: number;
//   total_unverified_organisations: number;
//   unverified_doctors: UnverifiedDoctor[];
//   unverified_organisations: UnverifiedOrganisation[];
// }

// const DoctorApprovalsScreen = () => {
//   const [data, setData] = useState<ApiResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false); // New state for button loading
//   const [modalVisible, setModalVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const navigation = useNavigation();

//   useEffect(() => {
//     fetchUnverifiedAccounts();
//   }, []);

//   // --- API Calls ---

//   const fetchUnverifiedAccounts = async () => {
//     try {
//       const response = await fetch(
//         'https://landing.docapp.co.in/api/admin/get-unverified-acc',
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include', // Ensure we send cookies to get data
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result: ApiResponse = await response.json();
//       setData(result);
//     } catch (error) {
//       console.error('Error fetching unverified accounts:', error);
//       Alert.alert('Error', 'Failed to fetch unverified accounts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ UPDATED: Integrated strictly according to Postman screenshot
//   const handleApproveDoctor = async (doctorId: number) => {
//     Alert.alert(
//       "Confirm Approval",
//       "Are you sure you want to verify this doctor?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Verify",
//           onPress: async () => {
//             try {
//               setActionLoading(true);

//               console.log("Verifying doctor_id:", doctorId);

//               const response = await fetch('https://landing.docapp.co.in/api/admin/approve-doctor', {
//                 method: 'PUT',
//                 headers: { 
//                   'Content-Type': 'application/json' 
//                 },
//                 credentials: 'include', // <--- CRITICAL: Sends admin cookies
//                 body: JSON.stringify({ 
//                   doctor_id: doctorId // Matches Postman body
//                 }),
//               });

//               const result = await response.json();
//               console.log("Verify Response:", result);

//               if (response.ok) {
//                 Alert.alert('Success', result.message || 'Doctor verified successfully');
//                 fetchUnverifiedAccounts(); // Refresh the list
//               } else {
//                 Alert.alert('Error', result.message || 'Failed to approve doctor');
//               }
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Network Error', 'Failed to connect to server.');
//             } finally {
//               setActionLoading(false);
//             }
//           }
//         }
//       ]
//     );
//   };

//   const handleApproveOrg = async (orgId: number) => {
//     Alert.alert(
//       "Confirm Approval",
//       "Are you sure you want to approve this organization?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { 
//           text: "Approve", 
//           onPress: async () => {
//             try {
//               setActionLoading(true);
//               const response = await fetch('https://landing.docapp.co.in/api/admin/approve-organisation', {
//                 method: 'PUT',
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//                 body: JSON.stringify({ organisation_id: orgId }),
//               });
        
//               const result = await response.json();
        
//               if (response.ok) {
//                 Alert.alert('Success', 'Organisation approved successfully');
//                 fetchUnverifiedAccounts();
//               } else {
//                 Alert.alert('Error', result.message || 'Failed to approve organisation');
//               }
//             } catch (error) {
//               console.error(error);
//               Alert.alert('Error', 'Failed to approve organisation');
//             } finally {
//               setActionLoading(false);
//             }
//           } 
//         }
//       ]
//     );
//   };

//   const handleReject = (id: number, type: 'doctor' | 'org') => {
//     // Implement reject logic here later if API becomes available
//     Alert.alert('Reject', `Reject functionality for ID: ${id} is not yet integrated.`);
//   };

//   const openImageModal = (url: string) => {
//     if (!url) return;
//     setSelectedImage(url);
//     setModalVisible(true);
//   };

//   const openUrl = (url: string) => {
//     if(url) Linking.openURL(url.startsWith('http') ? url : `https://${url}`).catch(err => console.error("Couldn't load page", err));
//   };

//   // --- Render Helpers ---

//   const renderAddress = (addresses: Address[]) => {
//     if (!addresses || addresses.length === 0) return null;
//     return (
//       <View style={styles.addressContainer}>
//         <Text style={styles.subHeaderTitle}>Address:</Text>
//         {addresses.map((addr, idx) => (
//           <Text key={idx} style={styles.addressText}>
//             {addr.street || ''} {addr.city || ''} {addr.state || ''} {addr.pincode || ''}
//           </Text>
//         ))}
//       </View>
//     );
//   };

//   const renderDocuments = (documents: Document[]) => {
//     return (
//       <View style={styles.documentsContainer}>
//         <Text style={styles.subHeaderTitle}>Documents:</Text>
//         {documents && documents.length > 0 ? (
//           <View style={styles.docList}>
//             {documents.map((doc) => (
//               <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)} style={styles.docBadge}>
//                 <Text style={styles.documentLink}>{doc.document_type} 👁️</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         ) : (
//           <Text style={styles.noDocumentsText}>No documents available</Text>
//         )}
//       </View>
//     );
//   };

//   // --- List Items ---

//   const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <Image 
//           source={{ uri: item.profile_picture || 'https://via.placeholder.com/150' }} 
//           style={styles.profileImage} 
//         />
//         <View style={styles.headerInfo}>
//           <Text style={styles.name}>{item.user.username}</Text>
//           <Text style={styles.roleLabel}>Doctor</Text>
//           <Text style={styles.detailText}>📧 {item.user.email}</Text>
//           <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
//         </View>
//       </View>
      
//       <View style={styles.cardBody}>
//         {item.specialization && <Text style={styles.detailText}>Spec: {item.specialization}</Text>}
//         {item.experience_years !== null && <Text style={styles.detailText}>Exp: {item.experience_years} Years</Text>}
//         {item.license_number && <Text style={styles.detailText}>License: {item.license_number}</Text>}
        
//         {renderDocuments(item.user.documents)}
//         {renderAddress(item.user.address)}
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.approveButton]} 
//           onPress={() => handleApproveDoctor(item.user_id)}
//           disabled={actionLoading}
//         >
//           <Text style={styles.buttonText}>Verify</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.rejectButton]} 
//           onPress={() => handleReject(item.user_id, 'doctor')}
//           disabled={actionLoading}
//         >
//           <Text style={styles.buttonText}>Reject</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const renderOrganisationItem = ({ item }: { item: UnverifiedOrganisation }) => (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <View style={styles.orgIcon}>
//             <Text style={{fontSize: 30}}>🏥</Text>
//         </View>
//         <View style={styles.headerInfo}>
//           <Text style={styles.name}>{item.organisation_name || item.user.username}</Text>
//           <Text style={styles.roleLabel}>{item.organisation_type.toUpperCase()}</Text>
//           <Text style={styles.detailText}>📧 {item.user.email}</Text>
//           <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
//         </View>
//       </View>

//       <View style={styles.cardBody}>
//         {item.regestration_number && <Text style={styles.detailText}>Reg No: {item.regestration_number}</Text>}
//         {item.website_url && (
//              <TouchableOpacity onPress={() => openUrl(item.website_url!)}>
//                  <Text style={[styles.detailText, {color: 'blue', textDecorationLine: 'underline'}]}>
//                      🌐 {item.website_url}
//                  </Text>
//              </TouchableOpacity>
//         )}
        
//         {renderDocuments(item.user.documents)}
//         {renderAddress(item.user.address)}
//       </View>

//       <View style={styles.actionButtons}>
//         <TouchableOpacity 
//             style={[styles.actionButton, styles.approveButton]} 
//             onPress={() => handleApproveOrg(item.id)}
//             disabled={actionLoading}
//         >
//           <Text style={styles.buttonText}>Approve Org</Text>
//         </TouchableOpacity>
//         <TouchableOpacity 
//             style={[styles.actionButton, styles.rejectButton]} 
//             onPress={() => handleReject(item.id, 'org')}
//             disabled={actionLoading}
//         >
//           <Text style={styles.buttonText}>Reject</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   // --- Main Render ---

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#1a237e" />
//         <Text style={styles.loadingText}>Loading Requests...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={{flex: 1}}>
//       <ScrollView style={styles.container}>
//         <Text style={styles.screenTitle}>Verification Requests</Text>

//         {/* Summary Section */}
//         <View style={styles.summaryContainer}>
//           <View style={styles.summaryItem}>
//               <Text style={styles.summaryCount}>{data?.total_unverified_doctors || 0}</Text>
//               <Text style={styles.summaryLabel}>Doctors</Text>
//           </View>
//           <View style={styles.verticalDivider} />
//           <View style={styles.summaryItem}>
//               <Text style={styles.summaryCount}>{data?.total_unverified_organisations || 0}</Text>
//               <Text style={styles.summaryLabel}>Organisations</Text>
//           </View>
//         </View>

//         {/* Organisations List */}
//         <Text style={styles.sectionHeader}>🏥 Organisations ({data?.unverified_organisations?.length || 0})</Text>
//         {data?.unverified_organisations && data.unverified_organisations.length > 0 ? (
//           <FlatList
//             data={data.unverified_organisations}
//             renderItem={renderOrganisationItem}
//             keyExtractor={(item) => `org-${item.id}`}
//             scrollEnabled={false}
//           />
//         ) : (
//           <Text style={styles.emptyText}>No pending organisations.</Text>
//         )}

//         <View style={styles.divider} />

//         {/* Doctors List */}
//         <Text style={styles.sectionHeader}>👨‍⚕️ Doctors ({data?.unverified_doctors?.length || 0})</Text>
//         {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
//           <FlatList
//             data={data.unverified_doctors}
//             renderItem={renderDoctorItem}
//             keyExtractor={(item) => `doc-${item.user_id}`}
//             scrollEnabled={false}
//           />
//         ) : (
//           <Text style={styles.emptyText}>No pending doctors.</Text>
//         )}

//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>Back to Dashboard</Text>
//         </TouchableOpacity>
        
//         <View style={{height: 40}} />
//       </ScrollView>

//       {/* Global Loading Overlay for Actions */}
//       {actionLoading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#ffffff" />
//           <Text style={styles.overlayText}>Processing...</Text>
//         </View>
//       )}

//       {/* Image Modal */}
//       <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
//         <View style={styles.modalContainer}>
//           <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
//           {selectedImage && (
//             <Image
//               source={{ uri: selectedImage }}
//               style={styles.fullscreenImage}
//               resizeMode="contain"
//             />
//           )}
//           <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
//               <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f2f4f8', padding: 15 },
//   loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
  
//   loadingOverlay: {
//     position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center', alignItems: 'center',
//     zIndex: 999,
//   },
//   overlayText: { color: 'white', marginTop: 10, fontWeight: 'bold' },

//   screenTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  
//   summaryContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 25, elevation: 2, justifyContent: 'space-around', alignItems: 'center' },
//   summaryItem: { alignItems: 'center' },
//   summaryCount: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
//   summaryLabel: { fontSize: 14, color: '#666' },
//   verticalDivider: { width: 1, height: '80%', backgroundColor: '#eee' },
  
//   sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
//   emptyText: { fontStyle: 'italic', color: '#888', marginLeft: 10, marginBottom: 20 },
//   divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 },

//   card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
//   cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
//   profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15, backgroundColor: '#eee' },
//   orgIcon: { width: 60, height: 60, borderRadius: 8, marginRight: 15, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center' },
//   headerInfo: { flex: 1 },
//   name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
//   roleLabel: { fontSize: 12, color: '#1976d2', fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  
//   cardBody: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginBottom: 15 },
//   detailText: { fontSize: 14, color: '#555', marginBottom: 4 },
  
//   documentsContainer: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
//   subHeaderTitle: { fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 5 },
//   docList: { flexDirection: 'row', flexWrap: 'wrap' },
//   docBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 8, marginBottom: 5 },
//   documentLink: { fontSize: 12, color: '#3949ab' },
//   noDocumentsText: { fontSize: 12, fontStyle: 'italic', color: '#999' },
  
//   addressContainer: { marginTop: 8 },
//   addressText: { fontSize: 13, color: '#666' },

//   actionButtons: { flexDirection: 'row', justifyContent: 'space-between' },
//   actionButton: { flex: 0.48, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
//   approveButton: { backgroundColor: '#43a047' },
//   rejectButton: { backgroundColor: '#e53935' },
//   buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

//   backButton: { backgroundColor: '#555', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
//   backButtonText: { color: 'white', fontWeight: 'bold' },

//   modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)' },
//   modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
//   fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.8 },
//   closeModalButton: { position: 'absolute', bottom: 50, backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }
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
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Interfaces ---

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

interface UserData {
  username: string;
  email: string;
  phone_number: string;
  created_at: string;
  documents: Document[];
  address: Address[];
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
  user: UserData;
}

interface UnverifiedOrganisation {
  id: number;
  organisation_name: string | null;
  organisation_type: string;
  regestration_number: string | null;
  website_url: string | null;
  verified_status: boolean;
  created_at: string;
  user: UserData;
}

interface ApiResponse {
  total_unverified_doctors: number;
  total_unverified_organisations: number;
  unverified_doctors: UnverifiedDoctor[];
  unverified_organisations: UnverifiedOrganisation[];
}

const DoctorApprovalsScreen = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchUnverifiedAccounts();
  }, []);

  // --- API Calls ---

  const fetchUnverifiedAccounts = async () => {
    try {
      const response = await fetch(
        'https://landing.docapp.co.in/api/admin/get-unverified-acc',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching unverified accounts:', error);
      Alert.alert('Error', 'Failed to fetch unverified accounts');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDoctor = async (doctorId: number) => {
    Alert.alert(
      "Confirm Approval",
      "Are you sure you want to verify this doctor?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Verify",
          onPress: async () => {
            try {
              setActionLoading(true);
              const response = await fetch('https://landing.docapp.co.in/api/admin/approve-doctor', {
                method: 'PUT',
                headers: { 
                  'Content-Type': 'application/json' 
                },
                credentials: 'include',
                body: JSON.stringify({ 
                  doctor_id: doctorId 
                }),
              });

              const result = await response.json();

              if (response.ok) {
                Alert.alert('Success', result.message || 'Doctor verified successfully');
                fetchUnverifiedAccounts();
              } else {
                Alert.alert('Error', result.message || 'Failed to approve doctor');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Network Error', 'Failed to connect to server.');
            } finally {
              setActionLoading(false);
            }
          }
        }
      ]
    );
  };

  // ✅ UPDATED: Integrated approve-hospital API
  const handleApproveOrg = async (orgId: number) => {
    Alert.alert(
      "Confirm Approval",
      "Are you sure you want to approve this hospital/organization?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Approve", 
          onPress: async () => {
            try {
              setActionLoading(true);
              
              // Updated Endpoint and Body key based on request
              const response = await fetch('https://landing.docapp.co.in/api/admin/approve-hospital', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    org_id: orgId  // Changed from organisation_id to org_id
                }),
              });
        
              const result = await response.json();
        
              if (response.ok) {
                Alert.alert('Success', result.message || 'Organisation approved successfully');
                fetchUnverifiedAccounts(); // Refresh the list
              } else {
                Alert.alert('Error', result.message || 'Failed to approve organisation');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Failed to connect to server');
            } finally {
              setActionLoading(false);
            }
          } 
        }
      ]
    );
  };

  const handleReject = (id: number, type: 'doctor' | 'org') => {
    Alert.alert('Reject', `Reject functionality for ID: ${id} is not yet integrated.`);
  };

  const openImageModal = (url: string) => {
    if (!url) return;
    setSelectedImage(url);
    setModalVisible(true);
  };

  const openUrl = (url: string) => {
    if(url) Linking.openURL(url.startsWith('http') ? url : `https://${url}`).catch(err => console.error("Couldn't load page", err));
  };

  // --- Render Helpers ---

  const renderAddress = (addresses: Address[]) => {
    if (!addresses || addresses.length === 0) return null;
    return (
      <View style={styles.addressContainer}>
        <Text style={styles.subHeaderTitle}>Address:</Text>
        {addresses.map((addr, idx) => (
          <Text key={idx} style={styles.addressText}>
            {addr.street || ''} {addr.city || ''} {addr.state || ''} {addr.pincode || ''}
          </Text>
        ))}
      </View>
    );
  };

  const renderDocuments = (documents: Document[]) => {
    return (
      <View style={styles.documentsContainer}>
        <Text style={styles.subHeaderTitle}>Documents:</Text>
        {documents && documents.length > 0 ? (
          <View style={styles.docList}>
            {documents.map((doc) => (
              <TouchableOpacity key={doc.id} onPress={() => openImageModal(doc.document_url)} style={styles.docBadge}>
                <Text style={styles.documentLink}>{doc.document_type} 👁️</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={styles.noDocumentsText}>No documents available</Text>
        )}
      </View>
    );
  };

  // --- List Items ---

  const renderDoctorItem = ({ item }: { item: UnverifiedDoctor }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image 
          source={{ uri: item.profile_picture || 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.user.username}</Text>
          <Text style={styles.roleLabel}>Doctor</Text>
          <Text style={styles.detailText}>📧 {item.user.email}</Text>
          <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        {item.specialization && <Text style={styles.detailText}>Spec: {item.specialization}</Text>}
        {item.experience_years !== null && <Text style={styles.detailText}>Exp: {item.experience_years} Years</Text>}
        {item.license_number && <Text style={styles.detailText}>License: {item.license_number}</Text>}
        
        {renderDocuments(item.user.documents)}
        {renderAddress(item.user.address)}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.approveButton]} 
          onPress={() => handleApproveDoctor(item.user_id)}
          disabled={actionLoading}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.rejectButton]} 
          onPress={() => handleReject(item.user_id, 'doctor')}
          disabled={actionLoading}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderOrganisationItem = ({ item }: { item: UnverifiedOrganisation }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.orgIcon}>
            <Text style={{fontSize: 30}}>🏥</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.organisation_name || item.user.username}</Text>
          <Text style={styles.roleLabel}>{item.organisation_type.toUpperCase()}</Text>
          <Text style={styles.detailText}>📧 {item.user.email}</Text>
          <Text style={styles.detailText}>📞 {item.user.phone_number}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        {item.regestration_number && <Text style={styles.detailText}>Reg No: {item.regestration_number}</Text>}
        {item.website_url && (
             <TouchableOpacity onPress={() => openUrl(item.website_url!)}>
                 <Text style={[styles.detailText, {color: 'blue', textDecorationLine: 'underline'}]}>
                     🌐 {item.website_url}
                 </Text>
             </TouchableOpacity>
        )}
        
        {renderDocuments(item.user.documents)}
        {renderAddress(item.user.address)}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity 
            style={[styles.actionButton, styles.approveButton]} 
            onPress={() => handleApproveOrg(item.id)}
            disabled={actionLoading}
        >
          <Text style={styles.buttonText}>Approve Org</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={[styles.actionButton, styles.rejectButton]} 
            onPress={() => handleReject(item.id, 'org')}
            disabled={actionLoading}
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- Main Render ---

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1a237e" />
        <Text style={styles.loadingText}>Loading Requests...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Text style={styles.screenTitle}>Verification Requests</Text>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{data?.total_unverified_doctors || 0}</Text>
              <Text style={styles.summaryLabel}>Doctors</Text>
          </View>
          <View style={styles.verticalDivider} />
          <View style={styles.summaryItem}>
              <Text style={styles.summaryCount}>{data?.total_unverified_organisations || 0}</Text>
              <Text style={styles.summaryLabel}>Organisations</Text>
          </View>
        </View>

        {/* Organisations List */}
        <Text style={styles.sectionHeader}>🏥 Organisations ({data?.unverified_organisations?.length || 0})</Text>
        {data?.unverified_organisations && data.unverified_organisations.length > 0 ? (
          <FlatList
            data={data.unverified_organisations}
            renderItem={renderOrganisationItem}
            keyExtractor={(item) => `org-${item.id}`}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>No pending organisations.</Text>
        )}

        <View style={styles.divider} />

        {/* Doctors List */}
        <Text style={styles.sectionHeader}>👨‍⚕️ Doctors ({data?.unverified_doctors?.length || 0})</Text>
        {data?.unverified_doctors && data.unverified_doctors.length > 0 ? (
          <FlatList
            data={data.unverified_doctors}
            renderItem={renderDoctorItem}
            keyExtractor={(item) => `doc-${item.user_id}`}
            scrollEnabled={false}
          />
        ) : (
          <Text style={styles.emptyText}>No pending doctors.</Text>
        )}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
        
        <View style={{height: 40}} />
      </ScrollView>

      {/* Global Loading Overlay for Actions */}
      {actionLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.overlayText}>Processing...</Text>
        </View>
      )}

      {/* Image Modal */}
      <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullscreenImage}
              resizeMode="contain"
            />
          )}
          <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f4f8', padding: 15 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#555' },
  
  loadingOverlay: {
    position: 'absolute', left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center',
    zIndex: 999,
  },
  overlayText: { color: 'white', marginTop: 10, fontWeight: 'bold' },

  screenTitle: { fontSize: 26, fontWeight: 'bold', color: '#1a237e', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  
  summaryContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 25, elevation: 2, justifyContent: 'space-around', alignItems: 'center' },
  summaryItem: { alignItems: 'center' },
  summaryCount: { fontSize: 24, fontWeight: 'bold', color: '#2e7d32' },
  summaryLabel: { fontSize: 14, color: '#666' },
  verticalDivider: { width: 1, height: '80%', backgroundColor: '#eee' },
  
  sectionHeader: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15, marginLeft: 5 },
  emptyText: { fontStyle: 'italic', color: '#888', marginLeft: 10, marginBottom: 20 },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 20 },

  card: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15, backgroundColor: '#eee' },
  orgIcon: { width: 60, height: 60, borderRadius: 8, marginRight: 15, backgroundColor: '#e3f2fd', justifyContent: 'center', alignItems: 'center' },
  headerInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  roleLabel: { fontSize: 12, color: '#1976d2', fontWeight: 'bold', marginBottom: 4, textTransform: 'uppercase' },
  
  cardBody: { backgroundColor: '#f9f9f9', borderRadius: 8, padding: 10, marginBottom: 15 },
  detailText: { fontSize: 14, color: '#555', marginBottom: 4 },
  
  documentsContainer: { marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  subHeaderTitle: { fontSize: 13, fontWeight: 'bold', color: '#444', marginBottom: 5 },
  docList: { flexDirection: 'row', flexWrap: 'wrap' },
  docBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, marginRight: 8, marginBottom: 5 },
  documentLink: { fontSize: 12, color: '#3949ab' },
  noDocumentsText: { fontSize: 12, fontStyle: 'italic', color: '#999' },
  
  addressContainer: { marginTop: 8 },
  addressText: { fontSize: 13, color: '#666' },

  actionButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  actionButton: { flex: 0.48, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  approveButton: { backgroundColor: '#43a047' },
  rejectButton: { backgroundColor: '#e53935' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 14 },

  backButton: { backgroundColor: '#555', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  backButtonText: { color: 'white', fontWeight: 'bold' },

  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.9)' },
  modalBackground: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  fullscreenImage: { width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.8 },
  closeModalButton: { position: 'absolute', bottom: 50, backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }
});

export default DoctorApprovalsScreen;