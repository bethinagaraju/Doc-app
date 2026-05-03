// // // // // // // // // import React from 'react';
// // // // // // // // // import { View, Text } from 'react-native';
// // // // // // // // // import tw from 'twrnc';
// // // // // // // // // import PageLayout from '../../components/PageLayout';

// // // // // // // // // const PersonalDetailsScreen = () => {
// // // // // // // // //   const name = 'John Doe';
// // // // // // // // //   const email = 'john.doe@example.com';
// // // // // // // // //   const phone = '123-456-7890';
// // // // // // // // //   const gender = 'Male';
// // // // // // // // //   const dob = '1990-01-01';
// // // // // // // // //   const address = '123 Main Street, New York';

// // // // // // // // //   return (
// // // // // // // // //     <PageLayout
// // // // // // // // //       title="Personal Details"
// // // // // // // // //       headerBackgroundColor="bg-green-600"
// // // // // // // // //       scrollable={true}
// // // // // // // // //     >
// // // // // // // // //       <View style={[tw`bg-green-50 rounded-xl p-4 mx-4`, { elevation: 1 }]}> 
// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Full Name</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{name}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Email</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{email}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Phone</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{phone}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Gender</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{gender}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Date of Birth</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{dob}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         <View style={tw`mb-4`}>
// // // // // // // // //           <Text style={tw`text-sm text-green-700`}>Address</Text>
// // // // // // // // //           <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{address}</Text>
// // // // // // // // //         </View>
// // // // // // // // //       </View>
// // // // // // // // //     </PageLayout>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default PersonalDetailsScreen;





// // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // import { View, Text, ActivityIndicator, Alert } from 'react-native';
// // // // // // // // import tw from 'twrnc';
// // // // // // // // import PageLayout from '../../components/PageLayout';

// // // // // // // // const PersonalDetailsScreen = () => {
// // // // // // // //   const [userData, setUserData] = useState(null);
// // // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // // //   const fetchUserData = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // // // // // //         method: 'GET',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           // include token if API requires authentication
// // // // // // // //           // 'Authorization': `Bearer ${token}`,
// // // // // // // //         },
// // // // // // // //       });

// // // // // // // //       const data = await response.json();

// // // // // // // //       if (response.ok) {
// // // // // // // //         setUserData(data.userData);
// // // // // // // //       } else {
// // // // // // // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error(error);
// // // // // // // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchUserData();
// // // // // // // //   }, []);

// // // // // // // //   if (loading) {
// // // // // // // //     return (
// // // // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // // // // // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // // // // // // //         </View>
// // // // // // // //       </PageLayout>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   if (!userData) {
// // // // // // // //     return (
// // // // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // // // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // // // // // // //         </View>
// // // // // // // //       </PageLayout>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const { username, email, phone_number, doctorProfile } = userData;
// // // // // // // //   const dob = doctorProfile?.date_of_birth
// // // // // // // //     ? new Date(doctorProfile.date_of_birth).toISOString().split('T')[0]
// // // // // // // //     : 'N/A';
// // // // // // // //   const gender = doctorProfile?.gender || 'N/A';
// // // // // // // //   const specialization = doctorProfile?.specialization || 'N/A';
// // // // // // // //   const experience = doctorProfile?.experience_years || 'N/A';

// // // // // // // //   return (
// // // // // // // //     <PageLayout
// // // // // // // //       title="Personal Details"
// // // // // // // //       headerBackgroundColor="bg-green-600"
// // // // // // // //       scrollable={true}
// // // // // // // //     >
// // // // // // // //       <View style={[tw`bg-green-50 rounded-xl p-4 mx-4`, { elevation: 1 }]}>
// // // // // // // //         <Detail label="Full Name" value={username} />
// // // // // // // //         <Detail label="Email" value={email} />
// // // // // // // //         <Detail label="Phone" value={phone_number} />
// // // // // // // //         <Detail label="Gender" value={gender} />
// // // // // // // //         <Detail label="Date of Birth" value={dob} />
// // // // // // // //         <Detail label="Specialization" value={specialization} />
// // // // // // // //         <Detail label="Experience (Years)" value={experience.toString()} />
// // // // // // // //       </View>
// // // // // // // //     </PageLayout>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // const Detail = ({ label, value }) => (
// // // // // // // //   <View style={tw`mb-4`}>
// // // // // // // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // // // // // // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>
// // // // // // // //       {value || 'N/A'}
// // // // // // // //     </Text>
// // // // // // // //   </View>
// // // // // // // // );

// // // // // // // // export default PersonalDetailsScreen;


// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { View, Text, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
// // // // // // // import tw from 'twrnc';
// // // // // // // import PageLayout from '../../components/PageLayout';

// // // // // // // const PersonalDetailsScreen = () => {
// // // // // // //   const [userData, setUserData] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   const fetchUserData = async () => {
// // // // // // //     try {
// // // // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // // // // //         method: 'GET',
// // // // // // //         headers: {
// // // // // // //           'Content-Type': 'application/json',
// // // // // // //           // Include auth token if required:
// // // // // // //           // 'Authorization': `Bearer ${token}`,
// // // // // // //         },
// // // // // // //       });

// // // // // // //       const data = await response.json();

// // // // // // //       if (response.ok) {
// // // // // // //         setUserData(data.userData);
// // // // // // //       } else {
// // // // // // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // // // // // //       }
// // // // // // //     } catch (error) {
// // // // // // //       console.error(error);
// // // // // // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     fetchUserData();
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return (
// // // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // // // // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // // // // // //         </View>
// // // // // // //       </PageLayout>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   if (!userData) {
// // // // // // //     return (
// // // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // // // // // //         </View>
// // // // // // //       </PageLayout>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   const { username, email, phone_number, role, is_email_verified, is_phone_verified, doctorProfile } = userData;

// // // // // // //   const dob = doctorProfile?.date_of_birth
// // // // // // //     ? new Date(doctorProfile.date_of_birth).toISOString().split('T')[0]
// // // // // // //     : 'N/A';
// // // // // // //   const gender = doctorProfile?.gender || 'N/A';
// // // // // // //   const specialization = doctorProfile?.specialization || 'N/A';
// // // // // // //   const experience = doctorProfile?.experience_years || 'N/A';
// // // // // // //   const licenseNumber = doctorProfile?.license_number || 'N/A';
// // // // // // //   const fee = doctorProfile?.consultation_fee || 'N/A';
// // // // // // //   const appointmentTime = doctorProfile?.appointment_time || 'N/A';
// // // // // // //   const verifiedStatus = doctorProfile?.verified_status ? 'Verified' : 'Not Verified';
// // // // // // //   const profilePic = doctorProfile?.profile_picture;

// // // // // // //   return (
// // // // // // //     <PageLayout
// // // // // // //       title="Personal Details"
// // // // // // //       headerBackgroundColor="bg-green-600"
// // // // // // //       scrollable={true}
// // // // // // //     >
// // // // // // //       <ScrollView contentContainerStyle={tw`pb-10`}>
// // // // // // //         <View style={tw`items-center mt-6`}>
// // // // // // //           {profilePic ? (
// // // // // // //             <Image
// // // // // // //               source={{ uri: profilePic }}
// // // // // // //               style={tw`w-32 h-32 rounded-full border-4 border-green-500`}
// // // // // // //               resizeMode="cover"
// // // // // // //             />
// // // // // // //           ) : (
// // // // // // //             <View
// // // // // // //               style={tw`w-32 h-32 rounded-full bg-green-200 justify-center items-center border-4 border-green-500`}
// // // // // // //             >
// // // // // // //               <Text style={tw`text-green-800 text-lg font-bold`}>No Image</Text>
// // // // // // //             </View>
// // // // // // //           )}
// // // // // // //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// // // // // // //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// // // // // // //         </View>

// // // // // // //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// // // // // // //           <Detail label="Email" value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`} />
// // // // // // //           <Detail label="Phone" value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`} />
// // // // // // //           <Detail label="Gender" value={gender} />
// // // // // // //           <Detail label="Date of Birth" value={dob} />
// // // // // // //           <Detail label="Specialization" value={specialization} />
// // // // // // //           <Detail label="Experience (Years)" value={experience.toString()} />
// // // // // // //           <Detail label="License Number" value={licenseNumber} />
// // // // // // //           <Detail label="Consultation Fee" value={`₹${fee}`} />
// // // // // // //           <Detail label="Appointment Duration" value={`${appointmentTime} min`} />
// // // // // // //           <Detail label="Profile Status" value={verifiedStatus} />
// // // // // // //         </View>
// // // // // // //       </ScrollView>
// // // // // // //     </PageLayout>
// // // // // // //   );
// // // // // // // };

// // // // // // // const Detail = ({ label, value }) => (
// // // // // // //   <View style={tw`mb-4`}>
// // // // // // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // // // // // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>
// // // // // // //       {value || 'N/A'}
// // // // // // //     </Text>
// // // // // // //   </View>
// // // // // // // );

// // // // // // // export default PersonalDetailsScreen;


// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { View, Text, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
// // // // // // import tw from 'twrnc';
// // // // // // import PageLayout from '../../components/PageLayout';

// // // // // // const PersonalDetailsScreen = () => {
// // // // // //   const [userData, setUserData] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   const fetchUserData = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // // // //         method: 'GET',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           // Add token if required
// // // // // //           // 'Authorization': `Bearer ${token}`,
// // // // // //         },
// // // // // //       });

// // // // // //       const data = await response.json();

// // // // // //       if (response.ok) {
// // // // // //         setUserData(data.userData);
// // // // // //       } else {
// // // // // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // // // // //       }
// // // // // //     } catch (error) {
// // // // // //       console.error(error);
// // // // // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     fetchUserData();
// // // // // //   }, []);

// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // // // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // // // // //         </View>
// // // // // //       </PageLayout>
// // // // // //     );
// // // // // //   }

// // // // // //   if (!userData) {
// // // // // //     return (
// // // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // // // // //         </View>
// // // // // //       </PageLayout>
// // // // // //     );
// // // // // //   }

// // // // // //   const {
// // // // // //     username,
// // // // // //     email,
// // // // // //     phone_number,
// // // // // //     role,
// // // // // //     is_email_verified,
// // // // // //     is_phone_verified,
// // // // // //     doctorProfile,
// // // // // //     generalUser,
// // // // // //   } = userData;

// // // // // //   // Determine if it's a doctor or general user
// // // // // //   const profileData = doctorProfile || generalUser || {};
// // // // // //   const dob = profileData.date_of_birth
// // // // // //     ? new Date(profileData.date_of_birth).toISOString().split('T')[0]
// // // // // //     : 'N/A';
// // // // // //   const gender = profileData.gender || 'N/A';
// // // // // //   const profilePic = profileData.profile_picture;

// // // // // //   // Doctor-specific details
// // // // // //   const specialization = doctorProfile?.specialization || null;
// // // // // //   const experience = doctorProfile?.experience_years || null;
// // // // // //   const licenseNumber = doctorProfile?.license_number || null;
// // // // // //   const fee = doctorProfile?.consultation_fee || null;
// // // // // //   const appointmentTime = doctorProfile?.appointment_time || null;
// // // // // //   const verifiedStatus = doctorProfile?.verified_status
// // // // // //     ? 'Verified'
// // // // // //     : doctorProfile
// // // // // //     ? 'Not Verified'
// // // // // //     : null;

// // // // // //   return (
// // // // // //     <PageLayout
// // // // // //       title="Personal Details"
// // // // // //       headerBackgroundColor="bg-green-600"
// // // // // //       scrollable={true}
// // // // // //     >bb
// // // // // //       <ScrollView contentContainerStyle={tw`pb-10`}>
// // // // // //         {/* Profile Section */}
// // // // // //         <View style={tw`items-center mt-6`}>
// // // // // //           {profilePic ? (
// // // // // //             <Image
// // // // // //               source={{ uri: profilePic }}
// // // // // //               style={tw`w-32 h-32 rounded-full border-4 border-green-500`}
// // // // // //               resizeMode="cover"
// // // // // //             />
// // // // // //           ) : (
// // // // // //             <View
// // // // // //               style={tw`w-32 h-32 rounded-full bg-green-200 justify-center items-center border-4 border-green-500`}
// // // // // //             >
// // // // // //               <Text style={tw`text-green-800 text-lg font-bold`}>No Image</Text>
// // // // // //             </View>
// // // // // //           )}
// // // // // //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// // // // // //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// // // // // //         </View>

// // // // // //         {/* Details Section */}
// // // // // //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// // // // // //           <Detail
// // // // // //             label="Email"
// // // // // //             value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`}
// // // // // //           />
// // // // // //           <Detail
// // // // // //             label="Phone"
// // // // // //             value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`}
// // // // // //           />
// // // // // //           <Detail label="Gender" value={gender} />
// // // // // //           <Detail label="Date of Birth" value={dob} />

// // // // // //           {/* Doctor-specific info */}
// // // // // //           {role === 'doctor' && (
// // // // // //             <>
// // // // // //               <Detail label="Specialization" value={specialization} />
// // // // // //               <Detail
// // // // // //                 label="Experience (Years)"
// // // // // //                 value={experience?.toString() || 'N/A'}
// // // // // //               />
// // // // // //               <Detail label="License Number" value={licenseNumber} />
// // // // // //               <Detail
// // // // // //                 label="Consultation Fee"
// // // // // //                 value={fee ? `₹${fee}` : 'N/A'}
// // // // // //               />
// // // // // //               <Detail
// // // // // //                 label="Appointment Duration"
// // // // // //                 value={appointmentTime ? `${appointmentTime} min` : 'N/A'}
// // // // // //               />
// // // // // //               <Detail label="Profile Status" value={verifiedStatus} />
// // // // // //             </>
// // // // // //           )}
// // // // // //         </View>
// // // // // //       </ScrollView>
// // // // // //     </PageLayout>
// // // // // //   );
// // // // // // };

// // // // // // const Detail = ({ label, value }) => (
// // // // // //   <View style={tw`mb-4`}>
// // // // // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // // // // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>
// // // // // //       {value || 'N/A'}
// // // // // //     </Text>
// // // // // //   </View>
// // // // // // );

// // // // // // export default PersonalDetailsScreen;



// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { View, Text, ActivityIndicator, Alert, Image, ScrollView } from 'react-native';
// // // // // import tw from 'twrnc';
// // // // // import PageLayout from '../../components/PageLayout';

// // // // // const PersonalDetailsScreen = () => {
// // // // //   const [userData, setUserData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const fetchUserData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// // // // //         method: 'GET',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //           // Add token if required
// // // // //           // 'Authorization': `Bearer ${token}`,
// // // // //         },
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       if (response.ok) {
// // // // //         setUserData(data.userData);
// // // // //       } else {
// // // // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error(error);
// // // // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchUserData();
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // // // //         </View>
// // // // //       </PageLayout>
// // // // //     );
// // // // //   }

// // // // //   if (!userData) {
// // // // //     return (
// // // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // // // //         </View>
// // // // //       </PageLayout>
// // // // //     );
// // // // //   }

// // // // //   const {
// // // // //     username,
// // // // //     email,
// // // // //     phone_number,
// // // // //     role,
// // // // //     is_email_verified,
// // // // //     is_phone_verified,
// // // // //     doctorProfile,
// // // // //     generalUser,
// // // // //     organisationProfile,
// // // // //   } = userData;

// // // // //   // Determine profile data based on role
// // // // //   const profileData = doctorProfile || generalUser || organisationProfile || {};
// // // // //   const dob = profileData.date_of_birth
// // // // //     ? new Date(profileData.date_of_birth).toISOString().split('T')[0]
// // // // //     : 'N/A';
// // // // //   const gender = profileData.gender || 'N/A';
// // // // //   const profilePic = profileData.profile_picture;

// // // // //   // Doctor-specific details
// // // // //   const specialization = doctorProfile?.specialization || null;
// // // // //   const experience = doctorProfile?.experience_years || null;
// // // // //   const licenseNumber = doctorProfile?.license_number || null;
// // // // //   const fee = doctorProfile?.consultation_fee || null;
// // // // //   const appointmentTime = doctorProfile?.appointment_time || null;
// // // // //   const verifiedStatus = doctorProfile?.verified_status
// // // // //     ? 'Verified'
// // // // //     : doctorProfile
// // // // //     ? 'Not Verified'
// // // // //     : null;

// // // // //   return (
// // // // //     <PageLayout
// // // // //       title="Personal Details"
// // // // //       headerBackgroundColor="bg-green-600"
// // // // //       scrollable={true}
// // // // //     >
// // // // //       <ScrollView contentContainerStyle={tw`pb-10`}>
// // // // //         {/* Profile Section */}
// // // // //         <View style={tw`items-center mt-6`}>
// // // // //           {profilePic ? (
// // // // //             <Image
// // // // //               source={{ uri: profilePic }}
// // // // //               style={tw`w-32 h-32 rounded-full border-4 border-green-500`}
// // // // //               resizeMode="cover"
// // // // //             />
// // // // //           ) : (
// // // // //             <View
// // // // //               style={tw`w-32 h-32 rounded-full bg-green-200 justify-center items-center border-4 border-green-500`}
// // // // //             >
// // // // //               <Text style={tw`text-green-800 text-lg font-bold`}>No Image</Text>
// // // // //             </View>
// // // // //           )}
// // // // //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// // // // //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// // // // //         </View>

// // // // //         {/* Details Section */}
// // // // //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// // // // //           <Detail
// // // // //             label="Email"
// // // // //             value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`}
// // // // //           />
// // // // //           <Detail
// // // // //             label="Phone"
// // // // //             value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`}
// // // // //           />
// // // // //           <Detail label="Gender" value={gender} />
// // // // //           <Detail label="Date of Birth" value={dob} />

// // // // //           {/* Doctor-specific info */}
// // // // //           {role === 'doctor' && (
// // // // //             <>
// // // // //               <Detail label="Specialization" value={specialization} />
// // // // //               <Detail
// // // // //                 label="Experience (Years)"
// // // // //                 value={experience?.toString() || 'N/A'}
// // // // //               />
// // // // //               <Detail label="License Number" value={licenseNumber} />
// // // // //               <Detail
// // // // //                 label="Consultation Fee"
// // // // //                 value={fee ? `₹${fee}` : 'N/A'}
// // // // //               />
// // // // //               <Detail
// // // // //                 label="Appointment Duration"
// // // // //                 value={appointmentTime ? `${appointmentTime} min` : 'N/A'}
// // // // //               />
// // // // //               <Detail label="Profile Status" value={verifiedStatus} />
// // // // //             </>
// // // // //           )}

// // // // //           {/* Hospital-specific info */}
// // // // //           {role === 'hospital_organisation' && organisationProfile && (
// // // // //             <>
// // // // //               <Detail label="Organisation Name" value={organisationProfile.organisation_name || 'N/A'} />
// // // // //               <Detail label="Registration Number" value={organisationProfile.regestration_number || 'N/A'} />
// // // // //               <Detail label="Establishment Year" value={organisationProfile.establishment_year || 'N/A'} />
// // // // //               <Detail label="Specializations Provided" value={organisationProfile.specializations_provided || 'N/A'} />
// // // // //               <Detail label="Ambulance Available" value={organisationProfile.ambulance_available ? 'Yes' : 'No'} />
// // // // //               <Detail label="Website URL" value={organisationProfile.website_url || 'N/A'} />
// // // // //               <Detail label="Profile Status" value={organisationProfile.verified_status ? 'Verified' : 'Not Verified'} />
// // // // //             </>
// // // // //           )}
// // // // //         </View>
// // // // //       </ScrollView>
// // // // //     </PageLayout>
// // // // //   );
// // // // // };

// // // // // const Detail = ({ label, value }) => (
// // // // //   <View style={tw`mb-4`}>
// // // // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // // // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>
// // // // //       {value || 'N/A'}
// // // // //     </Text>
// // // // //   </View>
// // // // // );

// // // // // export default PersonalDetailsScreen;



// // // // import React, { useEffect, useState } from 'react';
// // // // import { View, Text, ActivityIndicator, Alert, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// // // // import tw from 'twrnc';
// // // // import PageLayout from '../../components/PageLayout';

// // // // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // // // const API_ADD_ADDRESS = 'https://landing.docapp.co.in/api/address/addAddress';

// // // // const PersonalDetailsScreen = () => {
// // // //   const [userData, setUserData] = useState(null);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Address Form
// // // //   const [addressForm, setAddressForm] = useState({
// // // //     city: '',
// // // //     pincode: '',
// // // //     street: '',
// // // //     state: '',
// // // //   });

// // // //   const handleChange = (field, value) => {
// // // //     setAddressForm({ ...addressForm, [field]: value });
// // // //   };

// // // //   // Add Address Handler
// // // //   const handleAddAddress = async () => {
// // // //     if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
// // // //       Alert.alert('Error', 'Please fill all fields');
// // // //       return;
// // // //     }

// // // //     try {
// // // //       const response = await fetch(API_ADD_ADDRESS, {
// // // //         method: 'POST',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //         credentials: 'include',
// // // //         body: JSON.stringify(addressForm),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         Alert.alert('Success', data.message || 'Address added successfully');
// // // //         fetchUserData(); // reload updated user data
// // // //         setAddressForm({ city: '', pincode: '', street: '', state: '' }); // clear fields
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to add address');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       Alert.alert('Network Error', 'Please try again later');
// // // //     }
// // // //   };

// // // //   // Fetch User Data
// // // //   const fetchUserData = async () => {
// // // //     try {
// // // //       const response = await fetch(API_GET_USER, {
// // // //         method: 'GET',
// // // //         headers: { 'Content-Type': 'application/json' },
// // // //       });

// // // //       const data = await response.json();

// // // //       if (response.ok) {
// // // //         setUserData(data.userData);
// // // //       } else {
// // // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchUserData();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // // //         </View>
// // // //       </PageLayout>
// // // //     );
// // // //   }

// // // //   if (!userData) {
// // // //     return (
// // // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // // //         </View>
// // // //       </PageLayout>
// // // //     );
// // // //   }

// // // //   const {
// // // //     username,
// // // //     email,
// // // //     phone_number,
// // // //     role,
// // // //     is_email_verified,
// // // //     is_phone_verified,
// // // //     doctorProfile,
// // // //     generalUser,
// // // //     organisationProfile,
// // // //   } = userData;

// // // //   const profileData = doctorProfile || generalUser || organisationProfile || {};
// // // //   const dob = profileData.date_of_birth
// // // //     ? new Date(profileData.date_of_birth).toISOString().split('T')[0]
// // // //     : 'N/A';
// // // //   const gender = profileData.gender || 'N/A';
// // // //   const profilePic = profileData.profile_picture;

// // // //   const specialization = doctorProfile?.specialization || null;
// // // //   const experience = doctorProfile?.experience_years || null;
// // // //   const licenseNumber = doctorProfile?.license_number || null;
// // // //   const fee = doctorProfile?.consultation_fee || null;
// // // //   const appointmentTime = doctorProfile?.appointment_time || null;
// // // //   const verifiedStatus = doctorProfile?.verified_status ? 'Verified' : doctorProfile ? 'Not Verified' : null;

// // // //   return (
// // // //     <PageLayout
// // // //       title="Personal Details"
// // // //       headerBackgroundColor="bg-green-600"
// // // //       scrollable={true}
// // // //     >
// // // //       <ScrollView contentContainerStyle={tw`pb-10`}>

// // // //         {/* Profile Section */}
// // // //         <View style={tw`items-center mt-6`}>
// // // //           {profilePic ? (
// // // //             <Image
// // // //               source={{ uri: profilePic }}
// // // //               style={tw`w-32 h-32 rounded-full border-4 border-green-500`}
// // // //             />
// // // //           ) : (
// // // //             <View style={tw`w-32 h-32 rounded-full bg-green-200 justify-center items-center border-4 border-green-500`}>
// // // //               <Text style={tw`text-green-800 text-lg font-bold`}>No Image</Text>
// // // //             </View>
// // // //           )}

// // // //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// // // //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// // // //         </View>

// // // //         {/* Details Section */}
// // // //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// // // //           <Detail label="Email" value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`} />
// // // //           <Detail label="Phone" value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`} />
// // // //           <Detail label="Gender" value={gender} />
// // // //           <Detail label="Date of Birth" value={dob} />

// // // //           {role === 'doctor' && (
// // // //             <>
// // // //               <Detail label="Specialization" value={specialization} />
// // // //               <Detail label="Experience (Years)" value={experience?.toString() || 'N/A'} />
// // // //               <Detail label="License Number" value={licenseNumber} />
// // // //               <Detail label="Consultation Fee" value={fee ? `₹${fee}` : 'N/A'} />
// // // //               <Detail label="Appointment Duration" value={appointmentTime ? `${appointmentTime} min` : 'N/A'} />
// // // //               <Detail label="Profile Status" value={verifiedStatus} />
// // // //             </>
// // // //           )}
// // // //         </View>

// // // //         {/* Add Address Section */}
// // // //         <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
// // // //           <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

// // // //           <TextInput
// // // //             placeholder="City"
// // // //             value={addressForm.city}
// // // //             onChangeText={(t) => handleChange('city', t)}
// // // //             style={tw`border p-2 rounded mb-3`}
// // // //           />
// // // //           <TextInput
// // // //             placeholder="Pincode"
// // // //             keyboardType="numeric"
// // // //             value={addressForm.pincode}
// // // //             onChangeText={(t) => handleChange('pincode', t)}
// // // //             style={tw`border p-2 rounded mb-3`}
// // // //           />
// // // //           <TextInput
// // // //             placeholder="Street"
// // // //             value={addressForm.street}
// // // //             onChangeText={(t) => handleChange('street', t)}
// // // //             style={tw`border p-2 rounded mb-3`}
// // // //           />
// // // //           <TextInput
// // // //             placeholder="State"
// // // //             value={addressForm.state}
// // // //             onChangeText={(t) => handleChange('state', t)}
// // // //             style={tw`border p-2 rounded mb-3`}
// // // //           />

// // // //           <TouchableOpacity
// // // //             onPress={handleAddAddress}
// // // //             style={tw`bg-green-600 py-3 rounded-lg mt-2`}
// // // //           >
// // // //             <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
// // // //           </TouchableOpacity>
// // // //         </View>

// // // //       </ScrollView>
// // // //     </PageLayout>
// // // //   );
// // // // };

// // // // const Detail = ({ label, value }) => (
// // // //   <View style={tw`mb-4`}>
// // // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{value || 'N/A'}</Text>
// // // //   </View>
// // // // );

// // // // export default PersonalDetailsScreen;



// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ActivityIndicator,
// // //   Alert,
// // //   Image,
// // //   ScrollView,
// // //   TextInput,
// // //   TouchableOpacity,
// // // } from 'react-native';
// // // import tw from 'twrnc';
// // // import PageLayout from '../../components/PageLayout';

// // // // APIs
// // // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // // const API_ADD_ADDRESS = 'https://landing.docapp.co.in/api/address/addAddress';
// // // const API_GET_ALL_ADDRESS = 'https://landing.docapp.co.in/api/address/getAllAddress';

// // // const PersonalDetailsScreen = () => {
// // //   const [userData, setUserData] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   // Store all fetched addresses
// // //   const [addresses, setAddresses] = useState([]);

// // //   // Address Form
// // //   const [addressForm, setAddressForm] = useState({
// // //     city: '',
// // //     pincode: '',
// // //     street: '',
// // //     state: '',
// // //   });

// // //   const handleChange = (field, value) => {
// // //     setAddressForm({ ...addressForm, [field]: value });
// // //   };

// // //   // -------------------------------
// // //   // 🚀 Add New Address
// // //   // -------------------------------
// // //   const handleAddAddress = async () => {
// // //     if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
// // //       Alert.alert('Error', 'Please fill all fields');
// // //       return;
// // //     }

// // //     try {
// // //       const response = await fetch(API_ADD_ADDRESS, {
// // //         method: 'POST',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',
// // //         body: JSON.stringify(addressForm),
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         Alert.alert('Success', data.message || 'Address added successfully');
// // //         setAddressForm({ city: '', pincode: '', street: '', state: '' });
// // //         fetchAllAddresses(); // 🔄 Refresh the list
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to add address');
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Network Error', 'Please try again later');
// // //     }
// // //   };

// // //   // -------------------------------
// // //   // 🚀 Fetch User Data
// // //   // -------------------------------
// // //   const fetchUserData = async () => {
// // //     try {
// // //       const response = await fetch(API_GET_USER, {
// // //         method: 'GET',
// // //         headers: { 'Content-Type': 'application/json' },
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         setUserData(data.userData);
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       Alert.alert('Error', 'Something went wrong while fetching user data');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // -------------------------------
// // //   // 🚀 Fetch All Addresses
// // //   // -------------------------------
// // //   const fetchAllAddresses = async () => {
// // //     try {
// // //       const response = await fetch(API_GET_ALL_ADDRESS, {
// // //         method: 'GET',
// // //         headers: { 'Content-Type': 'application/json' },
// // //         credentials: 'include',
// // //       });

// // //       const data = await response.json();

// // //       if (response.ok) {
// // //         setAddresses(data.addresses || []);
// // //       } else {
// // //         Alert.alert('Error', data.message || 'Failed to fetch addresses');
// // //       }
// // //     } catch (error) {
// // //       console.log(error);
// // //       Alert.alert("Error", "Couldn't load your saved addresses.");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchUserData();
// // //     fetchAllAddresses();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // //         <View style={tw`flex-1 justify-center items-center`}>
// // //           <ActivityIndicator size="large" color="#16a34a" />
// // //           <Text style={tw`text-green-700 mt-2`}>Loading your details...</Text>
// // //         </View>
// // //       </PageLayout>
// // //     );
// // //   }

// // //   if (!userData) {
// // //     return (
// // //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// // //         <View style={tw`flex-1 justify-center items-center`}>
// // //           <Text style={tw`text-red-500`}>No user data found</Text>
// // //         </View>
// // //       </PageLayout>
// // //     );
// // //   }

// // //   // Extract user info
// // //   const {
// // //     username,
// // //     email,
// // //     phone_number,
// // //     role,
// // //     is_email_verified,
// // //     is_phone_verified,
// // //     doctorProfile,
// // //     generalUser,
// // //     organisationProfile,
// // //   } = userData;

// // //   const profileData = doctorProfile || generalUser || organisationProfile || {};
// // //   const dob = profileData.date_of_birth
// // //     ? new Date(profileData.date_of_birth).toISOString().split('T')[0]
// // //     : 'N/A';
// // //   const gender = profileData.gender || 'N/A';
// // //   const profilePic = profileData.profile_picture;

// // //   return (
// // //     <PageLayout
// // //       title="Personal Details"
// // //       headerBackgroundColor="bg-green-600"
// // //       scrollable={true}
// // //     >
// // //       <ScrollView contentContainerStyle={tw`pb-10`}>

// // //         {/* Profile Section */}
// // //         <View style={tw`items-center mt-6`}>
// // //           {profilePic ? (
// // //             <Image
// // //               source={{ uri: profilePic }}
// // //               style={tw`w-32 h-32 rounded-full border-4 border-green-500`}
// // //             />
// // //           ) : (
// // //             <View style={tw`w-32 h-32 rounded-full bg-green-200 justify-center items-center border-4 border-green-500`}>
// // //               <Text style={tw`text-green-800 text-lg font-bold`}>No Image</Text>
// // //             </View>
// // //           )}

// // //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// // //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// // //         </View>

// // //         {/* User Details */}
// // //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// // //           <Detail label="Email" value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`} />
// // //           <Detail label="Phone" value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`} />
// // //           <Detail label="Gender" value={gender} />
// // //           <Detail label="Date of Birth" value={dob} />
// // //         </View>

// // //         {/* Saved Addresses List */}
// // //         <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
// // //           <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Saved Addresses</Text>

// // //           {addresses.length === 0 ? (
// // //             <Text style={tw`text-green-600`}>No addresses added yet.</Text>
// // //           ) : (
// // //             addresses.map((addr) => (
// // //               <View
// // //                 key={addr.id}
// // //                 style={tw`border border-green-200 rounded-xl p-3 mb-3 bg-green-50`}
// // //               >
// // //                 <Text style={tw`text-green-900 font-bold`}>
// // //                   {addr.street}, {addr.city}
// // //                 </Text>
// // //                 <Text style={tw`text-green-700`}>
// // //                   {addr.state} - {addr.pincode}
// // //                 </Text>
// // //                 <Text style={tw`text-green-600 mt-1`}>
// // //                   Country: {addr.country || 'India'}
// // //                 </Text>
// // //               </View>
// // //             ))
// // //           )}
// // //         </View>

// // //         {/* Add Address Form */}
// // //         <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
// // //           <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

// // //           <TextInput
// // //             placeholder="City"
// // //             value={addressForm.city}
// // //             onChangeText={(t) => handleChange('city', t)}
// // //             style={tw`border p-2 rounded mb-3`}
// // //           />
// // //           <TextInput
// // //             placeholder="Pincode"
// // //             keyboardType="numeric"
// // //             value={addressForm.pincode}
// // //             onChangeText={(t) => handleChange('pincode', t)}
// // //             style={tw`border p-2 rounded mb-3`}
// // //           />
// // //           <TextInput
// // //             placeholder="Street"
// // //             value={addressForm.street}
// // //             onChangeText={(t) => handleChange('street', t)}
// // //             style={tw`border p-2 rounded mb-3`}
// // //           />
// // //           <TextInput
// // //             placeholder="State"
// // //             value={addressForm.state}
// // //             onChangeText={(t) => handleChange('state', t)}
// // //             style={tw`border p-2 rounded mb-3`}
// // //           />

// // //           <TouchableOpacity
// // //             onPress={handleAddAddress}
// // //             style={tw`bg-green-600 py-3 rounded-lg mt-2`}
// // //           >
// // //             <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
// // //           </TouchableOpacity>
// // //         </View>

// // //       </ScrollView>
// // //     </PageLayout>
// // //   );
// // // };

// // // const Detail = ({ label, value }) => (
// // //   <View style={tw`mb-4`}>
// // //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// // //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{value || 'N/A'}</Text>
// // //   </View>
// // // );

// // // export default PersonalDetailsScreen;



// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ActivityIndicator,
// //   Alert,
// //   Image,
// //   ScrollView,
// //   TextInput,
// //   TouchableOpacity,
// //   Modal,
// // } from 'react-native';
// // import tw from 'twrnc';
// // import PageLayout from '../../components/PageLayout';

// // const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// // const API_ADD_ADDRESS = 'https://landing.docapp.co.in/api/address/addAddress';
// // const API_GET_ALL_ADDRESS = 'https://landing.docapp.co.in/api/address/getAllAddress';
// // const API_UPDATE_ADDRESS = 'https://landing.docapp.co.in/api/address/updateAddress';

// // const PersonalDetailsScreen = () => {
// //   const [userData, setUserData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   const [allAddresses, setAllAddresses] = useState([]);

// //   // Address Form
// //   const [addressForm, setAddressForm] = useState({
// //     city: '',
// //     pincode: '',
// //     street: '',
// //     state: '',
// //   });

// //   // Update Address Modal
// //   const [editModalVisible, setEditModalVisible] = useState(false);
// //   const [editForm, setEditForm] = useState({
// //     addressId: '',
// //     country: 'India',
// //     state: '',
// //     city: '',
// //     pincode: '',
// //     street: '',
// //     landmark: '',
// //     houseNo: '',
// //   });

// //   const handleChange = (field, value) => {
// //     setAddressForm({ ...addressForm, [field]: value });
// //   };

// //   const handleEditChange = (field, value) => {
// //     setEditForm({ ...editForm, [field]: value });
// //   };

// //   // ----------------------------------------------------------------------------------------
// //   // Fetch User Details
// //   const fetchUserData = async () => {
// //     try {
// //       const response = await fetch(API_GET_USER, {
// //         method: 'GET',
// //         headers: { 'Content-Type': 'application/json' },
// //       });

// //       const data = await response.json();
// //       if (response.ok) {
// //         setUserData(data.userData);
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to fetch user data');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to fetch user details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ----------------------------------------------------------------------------------------
// //   // Fetch All Addresses
// //   const fetchAllAddresses = async () => {
// //     try {
// //       const response = await fetch(API_GET_ALL_ADDRESS, {
// //         method: 'GET',
// //         credentials: 'include',
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setAllAddresses(data.addresses || []);
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to fetch addresses');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Failed to load addresses');
// //     }
// //   };

// //   // ----------------------------------------------------------------------------------------
// //   // Add Address
// //   const handleAddAddress = async () => {
// //     if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
// //       Alert.alert('Error', 'Please fill all fields');
// //       return;
// //     }

// //     try {
// //       const response = await fetch(API_ADD_ADDRESS, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify(addressForm),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         Alert.alert('Success', data.message || 'Address added');
// //         setAddressForm({ city: '', pincode: '', street: '', state: '' });
// //         fetchAllAddresses();
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to add address');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Network error');
// //     }
// //   };

// //   // ----------------------------------------------------------------------------------------
// //   // Update Address
// //   const handleUpdateAddress = async () => {
// //     try {
// //       const response = await fetch(API_UPDATE_ADDRESS, {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json' },
// //         credentials: 'include',
// //         body: JSON.stringify(editForm),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         Alert.alert('Success', data.message || 'Address updated');
// //         setEditModalVisible(false);
// //         fetchAllAddresses();
// //       } else {
// //         Alert.alert('Error', data.message || 'Failed to update');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', 'Could not update address');
// //     }
// //   };

// //   // ----------------------------------------------------------------------------------------
// //   useEffect(() => {
// //     fetchUserData();
// //     fetchAllAddresses();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// //         <View style={tw`flex-1 justify-center items-center`}>
// //           <ActivityIndicator size="large" color="#16a34a" />
// //           <Text style={tw`text-green-700 mt-2`}>Loading...</Text>
// //         </View>
// //       </PageLayout>
// //     );
// //   }

// //   if (!userData) {
// //     return (
// //       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
// //         <View style={tw`flex-1 justify-center items-center`}>
// //           <Text style={tw`text-red-500`}>No user data found</Text>
// //         </View>
// //       </PageLayout>
// //     );
// //   }

// //   const { username, email, phone_number, role, is_email_verified, is_phone_verified } = userData;

// //   return (
// //     <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600" scrollable={true}>
// //       <ScrollView contentContainerStyle={tw`pb-10`}>

// //         {/* USER INFO */}
// //         <View style={tw`items-center mt-6`}>
// //           <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{username}</Text>
// //           <Text style={tw`text-sm text-green-700`}>{role?.toUpperCase()}</Text>
// //         </View>

// //         {/* USER DETAILS */}
// //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// //           <Detail label="Email" value={`${email} (${is_email_verified ? 'Verified' : 'Not Verified'})`} />
// //           <Detail label="Phone" value={`${phone_number} (${is_phone_verified ? 'Verified' : 'Not Verified'})`} />
// //         </View>

// //         {/* ADD ADDRESS */}
// //         <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
// //           <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

// //           <TextInput style={styles.input} placeholder="City" value={addressForm.city} onChangeText={(t) => handleChange('city', t)} />
// //           <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={addressForm.pincode} onChangeText={(t) => handleChange('pincode', t)} />
// //           <TextInput style={styles.input} placeholder="Street" value={addressForm.street} onChangeText={(t) => handleChange('street', t)} />
// //           <TextInput style={styles.input} placeholder="State" value={addressForm.state} onChangeText={(t) => handleChange('state', t)} />

// //           <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-2`} onPress={handleAddAddress}>
// //             <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
// //           </TouchableOpacity>
// //         </View>

// //         {/* SHOW ALL ADDRESSES */}
// //         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
// //           <Text style={tw`text-lg font-bold text-green-900 mb-3`}>Your Addresses</Text>

// //           {allAddresses.length === 0 ? (
// //             <Text style={tw`text-green-700`}>No addresses added yet.</Text>
// //           ) : (
// //             allAddresses.map((item) => (
// //               <View key={item.id} style={tw`p-3 bg-white rounded-lg mb-3 border`}>
// //                 <Text style={tw`text-green-900 font-bold`}>{item.street}, {item.city}</Text>
// //                 <Text style={tw`text-green-700`}>{item.state} - {item.pincode}</Text>

// //                 <TouchableOpacity
// //                   style={tw`bg-blue-600 py-2 px-4 rounded-lg mt-2 self-start`}
// //                   onPress={() => {
// //                     setEditForm({
// //                       addressId: item.id.toString(),
// //                       country: item.country || 'India',
// //                       state: item.state,
// //                       city: item.city,
// //                       pincode: item.pincode,
// //                       street: item.street,
// //                       landmark: item.landmark || '',
// //                       houseNo: item.house_no || '',
// //                     });
// //                     setEditModalVisible(true);
// //                   }}
// //                 >
// //                   <Text style={tw`text-white font-bold`}>Edit</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             ))
// //           )}
// //         </View>

// //         {/* UPDATE MODAL */}
// //         <Modal visible={editModalVisible} transparent animationType="slide">
// //           <View style={styles.modalContainer}>
// //             <View style={styles.modalBox}>
// //               <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Address</Text>

// //               <TextInput style={styles.input} placeholder="City" value={editForm.city} onChangeText={(t) => handleEditChange('city', t)} />
// //               <TextInput style={styles.input} placeholder="State" value={editForm.state} onChangeText={(t) => handleEditChange('state', t)} />
// //               <TextInput style={styles.input} placeholder="Pincode" value={editForm.pincode} onChangeText={(t) => handleEditChange('pincode', t)} />
// //               <TextInput style={styles.input} placeholder="Street" value={editForm.street} onChangeText={(t) => handleEditChange('street', t)} />
// //               <TextInput style={styles.input} placeholder="Landmark" value={editForm.landmark} onChangeText={(t) => handleEditChange('landmark', t)} />
// //               <TextInput style={styles.input} placeholder="House No." value={editForm.houseNo} onChangeText={(t) => handleEditChange('houseNo', t)} />

// //               <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-3`} onPress={handleUpdateAddress}>
// //                 <Text style={tw`text-center text-white font-bold`}>Update Address</Text>
// //               </TouchableOpacity>

// //               <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => setEditModalVisible(false)}>
// //                 <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </Modal>

// //       </ScrollView>
// //     </PageLayout>
// //   );
// // };

// // const Detail = ({ label, value }) => (
// //   <View style={tw`mb-4`}>
// //     <Text style={tw`text-sm text-green-700`}>{label}</Text>
// //     <Text style={tw`text-base text-green-900 mt-1 font-medium`}>{value || 'N/A'}</Text>
// //   </View>
// // );

// // const styles = {
// //   input: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 10,
// //     borderRadius: 8,
// //     marginBottom: 10,
// //   },
// //   modalContainer: {
// //     flex: 1,
// //     backgroundColor: '#00000099',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   modalBox: {
// //     width: '85%',
// //     backgroundColor: 'white',
// //     padding: 20,
// //     borderRadius: 12,
// //   },
// // };

// // export default PersonalDetailsScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   ActivityIndicator,
//   Alert,
//   Image,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import tw from 'twrnc';
// import PageLayout from '../../components/PageLayout';

// const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
// const API_ADD_ADDRESS = 'https://landing.docapp.co.in/api/address/addAddress';
// const API_GET_ALL_ADDRESS = 'https://landing.docapp.co.in/api/address/getAllAddress';
// const API_UPDATE_ADDRESS = 'https://landing.docapp.co.in/api/address/updateAddress';

// const PersonalDetailsScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [allAddresses, setAllAddresses] = useState([]);

//   // Address Form
//   const [addressForm, setAddressForm] = useState({
//     city: '',
//     pincode: '',
//     street: '',
//     state: '',
//   });

//   // Update Address Modal
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editForm, setEditForm] = useState({
//     addressId: '',
//     country: 'India',
//     state: '',
//     city: '',
//     pincode: '',
//     street: '',
//     landmark: '',
//     houseNo: '',
//   });

//   const handleChange = (field, value) => {
//     setAddressForm({ ...addressForm, [field]: value });
//   };

//   const handleEditChange = (field, value) => {
//     setEditForm({ ...editForm, [field]: value });
//   };

//   // -------------------------------------------------------------
//   // Fetch User Details
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(API_GET_USER, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUserData(data.userData);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to fetch user data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch user details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // -------------------------------------------------------------
//   // Fetch All Addresses
//   const fetchAllAddresses = async () => {
//     try {
//       const response = await fetch(API_GET_ALL_ADDRESS, {
//         method: 'GET',
//         credentials: 'include',
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setAllAddresses(data.addresses || []);
//       } else {
//         Alert.alert('Error', data.message || 'Failed to fetch addresses');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to load addresses');
//     }
//   };

//   // -------------------------------------------------------------
//   // Add Address
//   const handleAddAddress = async () => {
//     if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     try {
//       const response = await fetch(API_ADD_ADDRESS, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(addressForm),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', data.message || 'Address added');
//         setAddressForm({ city: '', pincode: '', street: '', state: '' });
//         fetchAllAddresses();
//       } else {
//         Alert.alert('Error', data.message || 'Failed to add address');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error');
//     }
//   };

//   // -------------------------------------------------------------
//   // Update Address
//   const handleUpdateAddress = async () => {
//     try {
//       const response = await fetch(API_UPDATE_ADDRESS, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify(editForm),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', data.message || 'Address updated');
//         setEditModalVisible(false);
//         fetchAllAddresses();
//       } else {
//         Alert.alert('Error', data.message || 'Failed to update');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not update address');
//     }
//   };

//   // -------------------------------------------------------------
//   useEffect(() => {
//     fetchUserData();
//     fetchAllAddresses();
//   }, []);

//   if (loading) {
//     return (
//       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
//         <View style={tw`flex-1 justify-center items-center`}>
//           <ActivityIndicator size="large" color="#16a34a" />
//           <Text style={tw`text-green-700 mt-2`}>Loading...</Text>
//         </View>
//       </PageLayout>
//     );
//   }

//   if (!userData) {
//     return (
//       <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
//         <View style={tw`flex-1 justify-center items-center`}>
//           <Text style={tw`text-red-500`}>No user data found</Text>
//         </View>
//       </PageLayout>
//     );
//   }

//   const general = userData.generalUser || {};

//   return (
//     <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600" scrollable={true}>
//       <ScrollView contentContainerStyle={tw`pb-10`}>

//         {/* USER DETAILS CARD */}
//         <View
//           style={[
//             tw`bg-white rounded-xl p-4 mx-4 mt-6`,
//             { elevation: 3, borderWidth: 1, borderColor: '#d1d5db' },
//           ]}
//         >
//           <View style={tw`items-center`}>
//             <Image
//               source={{ uri: general.profile_picture }}
//               style={tw`w-28 h-28 rounded-full`}
//             />
//             <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{userData.username}</Text>
//             <Text style={tw`text-sm text-green-700`}>{userData.role?.toUpperCase()}</Text>
//           </View>

//           <View style={tw`mt-4`}>
//             <Detail label="Email" value={userData.email} />
//             <Detail label="Phone" value={userData.phone_number} />
//             <Detail label="Gender" value={general.gender} />
//             <Detail
//               label="Date of Birth"
//               value={general.date_of_birth ? general.date_of_birth.split("T")[0] : ""}
//             />
//             <Detail
//               label="Created At"
//               value={general.createdAt ? general.createdAt.split("T")[0] : ""}
//             />
//             <Detail
//               label="Updated At"
//               value={general.updatedAt ? general.updatedAt.split("T")[0] : ""}
//             />
//           </View>
//         </View>

//         {/* ADD ADDRESS */}
//         <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
//           <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

//           <TextInput style={styles.input} placeholder="City" value={addressForm.city} onChangeText={(t) => handleChange('city', t)} />
//           <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={addressForm.pincode} onChangeText={(t) => handleChange('pincode', t)} />
//           <TextInput style={styles.input} placeholder="Street" value={addressForm.street} onChangeText={(t) => handleChange('street', t)} />
//           <TextInput style={styles.input} placeholder="State" value={addressForm.state} onChangeText={(t) => handleChange('state', t)} />

//           <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-2`} onPress={handleAddAddress}>
//             <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
//           </TouchableOpacity>
//         </View>

//         {/* SHOW ALL ADDRESSES */}
//         <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
//           <Text style={tw`text-lg font-bold text-green-900 mb-3`}>Your Addresses</Text>

//           {allAddresses.length === 0 ? (
//             <Text style={tw`text-green-700`}>No addresses added yet.</Text>
//           ) : (
//             allAddresses.map((item) => (
//               <View key={item.id} style={tw`p-3 bg-white rounded-lg mb-3 border`}>
//                 <Text style={tw`text-green-900 font-bold`}>{item.street}, {item.city}</Text>
//                 <Text style={tw`text-green-700`}>{item.state} - {item.pincode}</Text>

//                 <TouchableOpacity
//                   style={tw`bg-blue-600 py-2 px-4 rounded-lg mt-2 self-start`}
//                   onPress={() => {
//                     setEditForm({
//                       addressId: item.id.toString(),
//                       country: item.country || 'India',
//                       state: item.state,
//                       city: item.city,
//                       pincode: item.pincode,
//                       street: item.street,
//                       landmark: item.landmark || '',
//                       houseNo: item.house_no || '',
//                     });
//                     setEditModalVisible(true);
//                   }}
//                 >
//                   <Text style={tw`text-white font-bold`}>Edit</Text>
//                 </TouchableOpacity>
//               </View>
//             ))
//           )}
//         </View>

//         {/* UPDATE MODAL */}
//         <Modal visible={editModalVisible} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//               <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Address</Text>

//               <TextInput style={styles.input} placeholder="City" value={editForm.city} onChangeText={(t) => handleEditChange('city', t)} />
//               <TextInput style={styles.input} placeholder="State" value={editForm.state} onChangeChange={(t) => handleEditChange('state', t)} />
//               <TextInput style={styles.input} placeholder="Pincode" value={editForm.pincode} onChangeText={(t) => handleEditChange('pincode', t)} />
//               <TextInput style={styles.input} placeholder="Street" value={editForm.street} onChangeText={(t) => handleEditChange('street', t)} />
//               <TextInput style={styles.input} placeholder="Landmark" value={editForm.landmark} onChangeText={(t) => handleEditChange('landmark', t)} />
//               <TextInput style={styles.input} placeholder="House No." value={editForm.houseNo} onChangeText={(t) => handleEditChange('houseNo', t)} />

//               <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-3`} onPress={handleUpdateAddress}>
//                 <Text style={tw`text-center text-white font-bold`}>Update Address</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => setEditModalVisible(false)}>
//                 <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//       </ScrollView>
//     </PageLayout>
//   );
// };

// const Detail = ({ label, value }) => (
//   <View style={tw`mb-3`}>
//     <Text style={tw`text-xs text-gray-600`}>{label}</Text>
//     <Text style={tw`text-base text-green-900 font-semibold`}>{value || 'N/A'}</Text>
//   </View>
// );

// const styles = {
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#00000099',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     width: '85%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//   },
// };

// export default PersonalDetailsScreen;








import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';
import { sendEmailOtp, verifyEmailOtp } from '../../api/verify';
import { completeGeneralUserProfile } from '../../api/profile';
import { useAccessToken } from '../contexts/AccessTokenContext';

const API_GET_USER = 'https://landing.docapp.co.in/api/auth/get-user-data';
const API_ADD_ADDRESS = 'https://landing.docapp.co.in/api/address/addAddress';
const API_GET_ALL_ADDRESS = 'https://landing.docapp.co.in/api/address/getAllAddress';
const API_UPDATE_ADDRESS = 'https://landing.docapp.co.in/api/address/updateAddress';
const API_DELETE_ADDRESS = 'https://landing.docapp.co.in/api/address/deleteAddress';

const PersonalDetailsScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allAddresses, setAllAddresses] = useState([]);

  const { accessToken } = useAccessToken();

  // Address Form
  const [addressForm, setAddressForm] = useState({
    city: '',
    pincode: '',
    street: '',
    state: '',
  });

  // Update Modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    addressId: '',
    country: 'India',
    state: '',
    city: '',
    pincode: '',
    street: '',
    landmark: '',
    houseNo: '',
  });
  // Email OTP states
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isOtpSending, setIsOtpSending] = useState(false);
  // Edit profile modal
  const [editProfileVisible, setEditProfileVisible] = useState(false);
  const [editDob, setEditDob] = useState<Date | undefined>();
  const [editGender, setEditGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
  const [editLoading, setEditLoading] = useState(false);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);

  const handleChange = (field, value) => {
    setAddressForm({ ...addressForm, [field]: value });
  };

  const handleEditChange = (field, value) => {
    setEditForm({ ...editForm, [field]: value });
  };

  // Fetch User
  const fetchUserData = async () => {
    try {
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(data.userData);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Addresses
  const fetchAllAddresses = async () => {
    try {
      const response = await fetch(API_GET_ALL_ADDRESS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setAllAddresses(data.addresses || []);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load addresses');
    }
  };

  // Add Address
  const handleAddAddress = async () => {
    if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch(API_ADD_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(addressForm),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
        setAddressForm({ city: '', pincode: '', street: '', state: '' });
        fetchAllAddresses();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  // Update Address
  const handleUpdateAddress = async () => {
    try {
      const response = await fetch(API_UPDATE_ADDRESS, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
        setEditModalVisible(false);
        fetchAllAddresses();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update address');
    }
  };

  // Delete Address
  const handleDeleteAddress = async (addressId) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(API_DELETE_ADDRESS, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ addressId }),
              });

              const data = await response.json();

              if (response.ok) {
                Alert.alert('Success', data.message || 'Address deleted successfully');
                fetchAllAddresses();
              } else {
                Alert.alert('Error', data.message || 'Failed to delete address');
              }
            } catch (error) {
              Alert.alert('Error', 'Network error while deleting address');
            }
          }
        }
      ]
    );
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    setIsOtpSending(true);
    try {
      const res = await sendEmailOtp(accessToken);
      if (res.ok) {
        Alert.alert('Success', res.data?.message || 'OTP sent to your email');
        setOtpModalVisible(true);
      } else {
        Alert.alert('Error', res.data?.message || 'Failed to send OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error while sending OTP');
    } finally {
      setIsOtpSending(false);
    }
  };

  // Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    if (!otpValue) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    try {
      const res = await verifyEmailOtp(otpValue, userData.email, accessToken);
      if (res.ok) {
        Alert.alert('Success', res.data?.message || 'Email verified');
        setOtpModalVisible(false);
        setOtpValue('');
        fetchUserData();
      } else {
        Alert.alert('Error', res.data?.message || 'Invalid OTP');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error while verifying OTP');
    }
  };

  // Edit profile submit
  const handleEditProfileSubmit = async () => {
    // basic validation
    if (!editDob || !editGender) {
      Alert.alert('Error', 'Please provide date of birth and gender');
      return;
    }

    setEditLoading(true);
    try {
      const payload = {
        date_of_birth: editDob.toISOString().split('T')[0],
        gender: editGender,
      };

      const res = await completeGeneralUserProfile(payload, accessToken);
      if (res.ok) {
        Alert.alert('Success', res.data?.message || 'Profile updated');
        setEditProfileVisible(false);
        fetchUserData();
      } else {
        Alert.alert('Error', res.data?.message || 'Failed to update profile');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error while updating profile');
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAllAddresses();
  }, []);

  if (loading) {
    return (
      <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#16a34a" />
          <Text style={tw`text-green-700 mt-2`}>Loading...</Text>
        </View>
      </PageLayout>
    );
  }

  if (!userData) {
    return (
      <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600">
        <View style={tw`flex-1 justify-center items-center`}>
          <Text style={tw`text-red-500`}>No user data found</Text>
        </View>
      </PageLayout>
    );
  }

  const general = userData.generalUser || {};

  return (
    <PageLayout title="Personal Details" headerBackgroundColor="bg-green-600" scrollable={true}>
      <ScrollView contentContainerStyle={tw`pb-10`}>

        {/* USER DETAILS CARD */}
        <View
          style={[
            tw`bg-white rounded-xl p-4 mx-4 mt-6`,
            { elevation: 3, borderWidth: 1, borderColor: '#d1d5db' },
          ]}
        >
          <View style={tw`items-center`}>
            <Image
              source={{ uri: general.profile_picture }}
              style={tw`w-28 h-28 rounded-full`}
            />
            <Text style={tw`text-xl font-bold text-green-900 mt-3`}>{userData.username}</Text>
            <Text style={tw`text-sm text-green-700`}>{userData.role?.toUpperCase()}</Text>
          </View>

          <View style={tw`mt-4`}>
            <Detail label="Email" value={userData.email} />
            <View style={tw`mt-2`}>
              <TouchableOpacity
                style={tw`bg-blue-600 py-2 px-4 rounded-lg self-start`}
                onPress={handleSendEmailOtp}
                disabled={isOtpSending}
              >
                <Text style={tw`text-white font-semibold`}>{isOtpSending ? 'Sending...' : 'Send Email OTP'}</Text>
              </TouchableOpacity>
            </View>
            <Detail label="Phone" value={userData.phone_number} />
            <Detail label="Gender" value={general.gender} />
            <Detail label="Date of Birth" value={general.date_of_birth?.split("T")[0]} />
            <Detail label="Created At" value={general.createdAt?.split("T")[0]} />
            <Detail label="Updated At" value={general.updatedAt?.split("T")[0]} />
          </View>
        </View>

        {/* ----------------------------- */}
        {/* ADD ADDRESS — SHOW ONLY IF NO ADDRESS */}
        {/* ----------------------------- */}
        {allAddresses.length === 0 && (
          <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
            <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

            <TextInput style={styles.input} placeholder="City" value={addressForm.city} onChangeText={(t) => handleChange('city', t)} />
            <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={addressForm.pincode} onChangeText={(t) => handleChange('pincode', t)} />
            <TextInput style={styles.input} placeholder="Street" value={addressForm.street} onChangeText={(t) => handleChange('street', t)} />
            <TextInput style={styles.input} placeholder="State" value={addressForm.state} onChangeText={(t) => handleChange('state', t)} />

            <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-2`} onPress={handleAddAddress}>
              <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ----------------------------- */}
        {/* SHOW ADDRESSES — ONLY IF EXISTS */}
        {/* ----------------------------- */}
        {allAddresses.length > 0 && (
          <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
            <Text style={tw`text-lg font-bold text-green-900 mb-3`}>Your Addresss</Text>

            {allAddresses.map((item) => (
              <View key={item.id} style={tw`p-3 bg-white rounded-lg mb-3 border`}>
                <Text style={tw`text-green-900 font-bold`}>{item.street}, {item.city}</Text>
                <Text style={tw`text-green-700`}>{item.state} - {item.pincode}</Text>

                <View style={tw`flex-row mt-2`}>
                  <TouchableOpacity
                    style={tw`bg-blue-600 py-2 px-4 rounded-lg mr-2 self-start`}
                    onPress={() => {
                      setEditForm({
                        addressId: item.id.toString(),
                        country: item.country || 'India',
                        state: item.state,
                        city: item.city,
                        pincode: item.pincode,
                        street: item.street,
                        landmark: item.landmark || '',
                        houseNo: item.house_no || '',
                      });
                      setEditModalVisible(true);
                    }}
                  >
                    <Text style={tw`text-white font-bold`}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={tw`bg-red-600 py-2 px-4 rounded-lg self-start`}
                    onPress={() => handleDeleteAddress(item.id.toString())}
                  >
                    <Text style={tw`text-white font-bold`}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* ----------------------------- */}
        {/* EDIT MODAL */}
        {/* ----------------------------- */}
        <Modal visible={editModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Address</Text>

              <TextInput style={styles.input} placeholder="City" value={editForm.city} onChangeText={(t) => handleEditChange('city', t)} />
              <TextInput style={styles.input} placeholder="State" value={editForm.state} onChangeText={(t) => handleEditChange('state', t)} />
              <TextInput style={styles.input} placeholder="Pincode" value={editForm.pincode} onChangeText={(t) => handleEditChange('pincode', t)} />
              <TextInput style={styles.input} placeholder="Street" value={editForm.street} onChangeText={(t) => handleEditChange('street', t)} />
              <TextInput style={styles.input} placeholder="Landmark" value={editForm.landmark} onChangeText={(t) => handleEditChange('landmark', t)} />
              <TextInput style={styles.input} placeholder="House No." value={editForm.houseNo} onChangeText={(t) => handleEditChange('houseNo', t)} />

              <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-3`} onPress={handleUpdateAddress}>
                <Text style={tw`text-center text-white font-bold`}>Update Address</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => setEditModalVisible(false)}>
                <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* OTP VERIFY MODAL */}
        <Modal visible={otpModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Enter OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="numeric"
                value={otpValue}
                onChangeText={setOtpValue}
              />
              <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-3`} onPress={handleVerifyEmailOtp}>
                <Text style={tw`text-center text-white font-bold`}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => { setOtpModalVisible(false); setOtpValue(''); }}>
                <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* EDIT PROFILE MODAL */}
        <Modal visible={editProfileVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Profile</Text>

              <TouchableOpacity
                onPress={() => setShowEditDatePicker(true)}
                style={tw`bg-white px-4 py-3 rounded-lg border border-gray-200 mb-3`}
              >
                <Text>{editDob ? editDob.toDateString() : 'Select Date of Birth'}</Text>
              </TouchableOpacity>
              {showEditDatePicker && (
                <DateTimePicker
                  value={editDob || new Date(2000, 0, 1)}
                  mode="date"
                  maximumDate={new Date()}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={(e, d) => {
                    setShowEditDatePicker(Platform.OS === 'ios');
                    if (d) setEditDob(d);
                  }}
                />
              )}

              <View style={tw`flex-row justify-between mb-3`}>
                {['Male', 'Female', 'Others'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setEditGender(g as any)}
                    style={tw`flex-1 mx-1 py-2 rounded-lg border ${editGender === g ? 'bg-green-600 border-green-600' : 'bg-white border-gray-200'}`}
                  >
                    <Text style={tw`${editGender === g ? 'text-white' : 'text-gray-700'} text-center`}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-1`} onPress={handleEditProfileSubmit} disabled={editLoading}>
                <Text style={tw`text-center text-white font-bold`}>{editLoading ? 'Saving...' : 'Save'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => setEditProfileVisible(false)}>
                <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </PageLayout>
  );
};

const Detail = ({ label, value }) => (
  <View style={tw`mb-3`}>
    <Text style={tw`text-xs text-gray-600`}>{label}</Text>
    <Text style={tw`text-base text-green-900 font-semibold`}>{value || 'N/A'}</Text>
  </View>
);

const styles = {
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
};

export default PersonalDetailsScreen;
