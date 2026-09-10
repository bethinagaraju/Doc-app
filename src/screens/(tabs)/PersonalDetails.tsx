



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
// import { sendEmailOtp, verifyEmailOtp } from '../../api/verify';
// import { completeGeneralUserProfile } from '../../api/profile';
// import { useAccessToken } from '../contexts/AccessTokenContext';

// const API_GET_USER = 'https://api.docapp.co.in/api/auth/get-user-data';
// const API_ADD_ADDRESS = 'https://api.docapp.co.in/api/address/addAddress';
// const API_GET_ALL_ADDRESS = 'https://api.docapp.co.in/api/address/getAllAddress';
// const API_UPDATE_ADDRESS = 'https://api.docapp.co.in/api/address/updateAddress';
// const API_DELETE_ADDRESS = 'https://api.docapp.co.in/api/address/deleteAddress';

// const PersonalDetailsScreen = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const [allAddresses, setAllAddresses] = useState([]);

//   const { accessToken } = useAccessToken();

//   // Address Form
//   const [addressForm, setAddressForm] = useState({
//     city: '',
//     pincode: '',
//     street: '',
//     state: '',
//   });

//   // Update Modal
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
//   // Email OTP states
//   const [otpModalVisible, setOtpModalVisible] = useState(false);
//   const [otpValue, setOtpValue] = useState('');
//   const [isOtpSending, setIsOtpSending] = useState(false);
//   // Edit profile modal
//   const [editProfileVisible, setEditProfileVisible] = useState(false);
//   const [editDob, setEditDob] = useState<Date | undefined>();
//   const [editGender, setEditGender] = useState<'Male' | 'Female' | 'Others' | ''>('');
//   const [editLoading, setEditLoading] = useState(false);
//   const [showEditDatePicker, setShowEditDatePicker] = useState(false);

//   const handleChange = (field, value) => {
//     setAddressForm({ ...addressForm, [field]: value });
//   };

//   const handleEditChange = (field, value) => {
//     setEditForm({ ...editForm, [field]: value });
//   };

//   // Fetch User
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(API_GET_USER, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setUserData(data.userData);
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch user data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch Addresses
//   const fetchAllAddresses = async () => {
//     try {
//       const response = await fetch(API_GET_ALL_ADDRESS, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//         },
//       });

//       const data = await response.json();
//       if (response.ok) {
//         setAllAddresses(data.addresses || []);
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to load addresses');
//     }
//   };

//   // Add Address
//   const handleAddAddress = async () => {
//     if (!addressForm.city || !addressForm.pincode || !addressForm.street || !addressForm.state) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     try {
//       const response = await fetch(API_ADD_ADDRESS, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(addressForm),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', data.message);
//         setAddressForm({ city: '', pincode: '', street: '', state: '' });
//         fetchAllAddresses();
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Network error');
//     }
//   };

//   // Update Address
//   const handleUpdateAddress = async () => {
//     try {
//       const response = await fetch(API_UPDATE_ADDRESS, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(editForm),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Success', data.message);
//         setEditModalVisible(false);
//         fetchAllAddresses();
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update address');
//     }
//   };

//   // Delete Address
//   const handleDeleteAddress = async (addressId) => {
//     Alert.alert(
//       "Delete Address",
//       "Are you sure you want to delete this address?",
//       [
//         { text: "Cancel", style: "cancel" },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               const response = await fetch(API_DELETE_ADDRESS, {
//                 method: 'DELETE',
//                 headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify({ addressId }),
//               });

//               const data = await response.json();

//               if (response.ok) {
//                 Alert.alert('Success', data.message || 'Address deleted successfully');
//                 fetchAllAddresses();
//               } else {
//                 Alert.alert('Error', data.message || 'Failed to delete address');
//               }
//             } catch (error) {
//               Alert.alert('Error', 'Network error while deleting address');
//             }
//           }
//         }
//       ]
//     );
//   };

//   // Send Email OTP
//   const handleSendEmailOtp = async () => {
//     setIsOtpSending(true);
//     try {
//       const res = await sendEmailOtp(accessToken);
//       if (res.ok) {
//         Alert.alert('Success', res.data?.message || 'OTP sent to your email');
//         setOtpModalVisible(true);
//       } else {
//         Alert.alert('Error', res.data?.message || 'Failed to send OTP');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Network error while sending OTP');
//     } finally {
//       setIsOtpSending(false);
//     }
//   };

//   // Verify Email OTP
//   const handleVerifyEmailOtp = async () => {
//     if (!otpValue) {
//       Alert.alert('Error', 'Please enter the OTP');
//       return;
//     }
//     try {
//       const res = await verifyEmailOtp(otpValue, userData.email, accessToken);
//       if (res.ok) {
//         Alert.alert('Success', res.data?.message || 'Email verified');
//         setOtpModalVisible(false);
//         setOtpValue('');
//         fetchUserData();
//       } else {
//         Alert.alert('Error', res.data?.message || 'Invalid OTP');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Network error while verifying OTP');
//     }
//   };

//   // Edit profile submit
//   const handleEditProfileSubmit = async () => {
//     // basic validation
//     if (!editDob || !editGender) {
//       Alert.alert('Error', 'Please provide date of birth and gender');
//       return;
//     }

//     setEditLoading(true);
//     try {
//       const payload = {
//         date_of_birth: editDob.toISOString().split('T')[0],
//         gender: editGender,
//       };

//       const res = await completeGeneralUserProfile(payload, accessToken);
//       if (res.ok) {
//         Alert.alert('Success', res.data?.message || 'Profile updated');
//         setEditProfileVisible(false);
//         fetchUserData();
//       } else {
//         Alert.alert('Error', res.data?.message || 'Failed to update profile');
//       }
//     } catch (err) {
//       Alert.alert('Error', 'Network error while updating profile');
//     } finally {
//       setEditLoading(false);
//     }
//   };

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
//             <View style={tw`mt-2`}>
//               <TouchableOpacity
//                 style={tw`bg-blue-600 py-2 px-4 rounded-lg self-start`}
//                 onPress={handleSendEmailOtp}
//                 disabled={isOtpSending}
//               >
//                 <Text style={tw`text-white font-semibold`}>{isOtpSending ? 'Sending...' : 'Send Email OTP'}</Text>
//               </TouchableOpacity>
//             </View>
//             <Detail label="Phone" value={userData.phone_number} />
//             <Detail label="Gender" value={general.gender} />
//             <Detail label="Date of Birth" value={general.date_of_birth?.split("T")[0]} />
//             <Detail label="Created At" value={general.createdAt?.split("T")[0]} />
//             <Detail label="Updated At" value={general.updatedAt?.split("T")[0]} />
//           </View>
//         </View>

//         {/* ----------------------------- */}
//         {/* ADD ADDRESS — SHOW ONLY IF NO ADDRESS */}
//         {/* ----------------------------- */}
//         {allAddresses.length === 0 && (
//           <View style={[tw`bg-white rounded-xl p-4 mx-4 mt-6`, { elevation: 2 }]}>
//             <Text style={tw`text-lg font-bold text-green-800 mb-4`}>Add Address</Text>

//             <TextInput style={styles.input} placeholder="City" value={addressForm.city} onChangeText={(t) => handleChange('city', t)} />
//             <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={addressForm.pincode} onChangeText={(t) => handleChange('pincode', t)} />
//             <TextInput style={styles.input} placeholder="Street" value={addressForm.street} onChangeText={(t) => handleChange('street', t)} />
//             <TextInput style={styles.input} placeholder="State" value={addressForm.state} onChangeText={(t) => handleChange('state', t)} />

//             <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-2`} onPress={handleAddAddress}>
//               <Text style={tw`text-center text-white font-bold`}>Add Address</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* ----------------------------- */}
//         {/* SHOW ADDRESSES — ONLY IF EXISTS */}
//         {/* ----------------------------- */}
//         {allAddresses.length > 0 && (
//           <View style={[tw`bg-green-50 rounded-xl p-4 mx-4 mt-6`, { elevation: 1 }]}>
//             <Text style={tw`text-lg font-bold text-green-900 mb-3`}>Your Addresss</Text>

//             {allAddresses.map((item) => (
//               <View key={item.id} style={tw`p-3 bg-white rounded-lg mb-3 border`}>
//                 <Text style={tw`text-green-900 font-bold`}>{item.street}, {item.city}</Text>
//                 <Text style={tw`text-green-700`}>{item.state} - {item.pincode}</Text>

//                 <View style={tw`flex-row mt-2`}>
//                   <TouchableOpacity
//                     style={tw`bg-blue-600 py-2 px-4 rounded-lg mr-2 self-start`}
//                     onPress={() => {
//                       setEditForm({
//                         addressId: item.id.toString(),
//                         country: item.country || 'India',
//                         state: item.state,
//                         city: item.city,
//                         pincode: item.pincode,
//                         street: item.street,
//                         landmark: item.landmark || '',
//                         houseNo: item.house_no || '',
//                       });
//                       setEditModalVisible(true);
//                     }}
//                   >
//                     <Text style={tw`text-white font-bold`}>Edit</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={tw`bg-red-600 py-2 px-4 rounded-lg self-start`}
//                     onPress={() => handleDeleteAddress(item.id.toString())}
//                   >
//                     <Text style={tw`text-white font-bold`}>Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* ----------------------------- */}
//         {/* EDIT MODAL */}
//         {/* ----------------------------- */}
//         <Modal visible={editModalVisible} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//               <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Address</Text>

//               <TextInput style={styles.input} placeholder="City" value={editForm.city} onChangeText={(t) => handleEditChange('city', t)} />
//               <TextInput style={styles.input} placeholder="State" value={editForm.state} onChangeText={(t) => handleEditChange('state', t)} />
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

//         {/* OTP VERIFY MODAL */}
//         <Modal visible={otpModalVisible} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//               <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Enter OTP</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter OTP"
//                 keyboardType="numeric"
//                 value={otpValue}
//                 onChangeText={setOtpValue}
//               />
//               <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-3`} onPress={handleVerifyEmailOtp}>
//                 <Text style={tw`text-center text-white font-bold`}>Verify OTP</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => { setOtpModalVisible(false); setOtpValue(''); }}>
//                 <Text style={tw`text-center text-white font-bold`}>Cancel</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Modal>

//         {/* EDIT PROFILE MODAL */}
//         <Modal visible={editProfileVisible} transparent animationType="slide">
//           <View style={styles.modalContainer}>
//             <View style={styles.modalBox}>
//               <Text style={tw`text-lg font-bold text-green-800 mb-3`}>Edit Profile</Text>

//               <TouchableOpacity
//                 onPress={() => setShowEditDatePicker(true)}
//                 style={tw`bg-white px-4 py-3 rounded-lg border border-gray-200 mb-3`}
//               >
//                 <Text>{editDob ? editDob.toDateString() : 'Select Date of Birth'}</Text>
//               </TouchableOpacity>
//               {showEditDatePicker && (
//                 <DateTimePicker
//                   value={editDob || new Date(2000, 0, 1)}
//                   mode="date"
//                   maximumDate={new Date()}
//                   display={Platform.OS === 'ios' ? 'inline' : 'default'}
//                   onChange={(e, d) => {
//                     setShowEditDatePicker(Platform.OS === 'ios');
//                     if (d) setEditDob(d);
//                   }}
//                 />
//               )}

//               <View style={tw`flex-row justify-between mb-3`}>
//                 {['Male', 'Female', 'Others'].map((g) => (
//                   <TouchableOpacity
//                     key={g}
//                     onPress={() => setEditGender(g as any)}
//                     style={tw`flex-1 mx-1 py-2 rounded-lg border ${editGender === g ? 'bg-green-600 border-green-600' : 'bg-white border-gray-200'}`}
//                   >
//                     <Text style={tw`${editGender === g ? 'text-white' : 'text-gray-700'} text-center`}>{g}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>

//               <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-1`} onPress={handleEditProfileSubmit} disabled={editLoading}>
//                 <Text style={tw`text-center text-white font-bold`}>{editLoading ? 'Saving...' : 'Save'}</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={tw`bg-red-600 py-3 rounded-lg mt-2`} onPress={() => setEditProfileVisible(false)}>
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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Svg, { Path } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { sendEmailOtp, verifyEmailOtp } from '../../api/verify';
import { completeGeneralUserProfile } from '../../api/profile';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUser } from '../contexts/UserContext';
import ProfileTopBar from '../../components/ProfileTopBar';
import { Camera, Trash2 } from 'lucide-react-native';

const API_GET_USER = 'https://api.docapp.co.in/api/auth/get-user-data';
const API_ADD_ADDRESS = 'https://api.docapp.co.in/api/address/addAddress';
const API_GET_ALL_ADDRESS = 'https://api.docapp.co.in/api/address/getAllAddress';
const API_UPDATE_ADDRESS = 'https://api.docapp.co.in/api/address/updateAddress';
const API_DELETE_ADDRESS = 'https://api.docapp.co.in/api/address/deleteAddress';


const PersonalDetailsScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [allAddresses, setAllAddresses] = useState([]);
  const { accessToken } = useAccessToken();
  const userContext = useUser();

  // Address Form
  const [addressModalVisible, setAddressModalVisible] = useState(false);
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
  const [editGender, setEditGender] = useState<string>('');
  const [editLoading, setEditLoading] = useState(false);
  const [showEditDatePicker, setShowEditDatePicker] = useState(false);



  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [localPhotoUri, setLocalPhotoUri] = useState<string | null>(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

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
        setAddressModalVisible(false);
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

  // Edit Profile (Patient / General User)
  const handleEditProfileSubmit = async () => {
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

      const response = await fetch('https://api.docapp.co.in/api/auth/profile/complete/general_user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (response.ok || data.success) {
        Alert.alert('Success', data.message || 'Profile updated successfully');
        setEditProfileVisible(false);
        fetchUserData(); // refresh data
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error while updating profile');
    } finally {
      setEditLoading(false);
    }
  };




  const handleUploadPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return;
    }

    const asset = result.assets[0];

    const formData = new FormData();
    formData.append('image', {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || 'profile_photo.jpg',
    } as any);

    setUploadingPhoto(true);
    setLocalPhotoUri(asset.uri || null);

    try {
      const response = await fetch('https://api.docapp.co.in/api/auth/upload-photo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message || 'Photo uploaded successfully');
        await fetchUserData();
        setImageTimestamp(Date.now());
        setLocalPhotoUri(null);
        if (userContext?.fetchUserData) {
          userContext.fetchUserData(accessToken);
        }
      } else {
        setLocalPhotoUri(null);
        Alert.alert('Error', data.message || 'Failed to upload photo');
      }
    } catch (error) {
      console.error(error);
      setLocalPhotoUri(null);
      Alert.alert('Error', 'Network error while uploading photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

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
              setUploadingPhoto(true);
              const response = await fetch('https://api.docapp.co.in/api/auth/delete-profile-pic', {
                method: 'DELETE',
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();

              if (!response.ok) {
                Alert.alert('Delete Failed', data.message || 'Unable to delete profile photo.');
                return;
              }

              Alert.alert('Success', 'Profile photo removed successfully!');
              await fetchUserData();
              setImageTimestamp(Date.now());
              setLocalPhotoUri(null);
              if (userContext?.fetchUserData) {
                userContext.fetchUserData(accessToken);
              }
            } catch (error) {
              console.error('Error deleting photo:', error);
              Alert.alert('Error', 'Failed to delete photo.');
            } finally {
              setUploadingPhoto(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchUserData();
    fetchAllAddresses();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-[#F9FAFB] justify-center items-center`}>
        <ActivityIndicator size="large" color="#124CB8" />
      </SafeAreaView>
    );
  }

  if (!userData) {
    return (
      <SafeAreaView style={tw`flex-1 bg-[#F9FAFB] justify-center items-center`}>
        <Text style={tw`text-red-500`}>No user data found</Text>
      </SafeAreaView>
    );
  }

  const general = userData.generalUser || {};
  const currentAddress = allAddresses.length > 0 ? allAddresses[0] : null;

  return (
    <SafeAreaView style={tw`flex-1 bg-white px-5 pb-6`}>
      <ProfileTopBar />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10 bg-[#FFFFFF] items-center`}>


        {/* === SECTION 1: USER PROFILE CARD === */}
        <View style={[tw`mt-6 items-center p-4 w-full max-w-[500px] self-center rounded-[24px]`, styles.profileCard]}>
          {/* Edit Button */}
          <TouchableOpacity
            style={[tw`absolute top-4 right-4 md:top-6 md:right-6 rounded-full justify-center items-center`, styles.editBtn]}
            onPress={() => {
              setEditGender(general.gender || '');
              setEditDob(general.date_of_birth ? new Date(general.date_of_birth) : new Date(2000, 0, 1));
              setEditProfileVisible(true);
            }}
          >
            <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <Path d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM16 3.4L14.6 2L16 3.4ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z" fill="#001A41" />
            </Svg>
          </TouchableOpacity>

          {/* Avatar with Active Dot */}
          <TouchableOpacity style={tw`relative mt-2`} onPress={handleUploadPhoto} disabled={uploadingPhoto}>
            <Image
              key={localPhotoUri || (general.profile_picture ? `${general.profile_picture}?t=${imageTimestamp}` : 'main_avatar')}
              source={{
                uri: localPhotoUri || (
                  general.profile_picture
                    ? `${general.profile_picture.split('?')[0]}?t=${imageTimestamp}`
                    : (userData?.doctorProfile?.profile_picture
                      ? `${userData.doctorProfile.profile_picture.split('?')[0]}?t=${imageTimestamp}`
                      : 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png')
                )
              }}
              style={[tw`w-24 h-24 md:w-28 md:h-28 rounded-full`, styles.avatarShadow]}
            />
            {uploadingPhoto ? (
              <View style={[tw`absolute w-24 h-24 md:w-28 md:h-28 rounded-full justify-center items-center`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                <ActivityIndicator color="#FFFFFF" />
              </View>
            ) : null}
            <View style={tw`absolute bottom-[5%] right-[5%] w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white bg-[#22C55E] z-10`} />
          </TouchableOpacity>

          {/* User Info */}
          <Text numberOfLines={1} style={tw`text-[20px] md:text-[24px] font-bold text-[#001A41] mt-4 text-center`}>
            {userData.username}
          </Text>
          <Text numberOfLines={1} style={tw`text-[14px] md:text-[16px] font-medium text-[#001A41]/80 mt-1 text-center`}>
            {userData.email}
          </Text>
          {general.gender && (
            <Text style={tw`text-[14px] font-medium text-[#001A41]/60 mt-1 text-center`}>
              Gender: {general.gender}
            </Text>
          )}
          {general.date_of_birth && (
            <Text style={tw`text-[14px] font-medium text-[#001A41]/60 text-center`}>
              DOB: {general.date_of_birth.split("T")[0]}
            </Text>
          )}
        </View>



        {/* === SECTION 2: ADDRESS === */}
        <View style={[tw`p-5 gap-4 mt-6 w-full max-w-[600px] self-center`]}>

          {/* Header */}
          <View style={tw`flex-row items-center gap-3 w-full`}>
            <View style={tw`w-10 h-10 bg-[#0066FF]/10 rounded-xl justify-center items-center`}>
              <Svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                <Path d="M8 10C8.55 10 9.02083 9.80417 9.4125 9.4125C9.80417 9.02083 10 8.55 10 8C10 7.45 9.80417 6.97917 9.4125 6.5875C9.02083 6.19583 8.55 6 8 6C7.45 6 6.97917 6.19583 6.5875 6.5875C6.19583 6.97917 6 7.45 6 8C6 8.55 6.19583 9.02083 6.5875 9.4125C6.97917 9.80417 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625C13.5083 10.7375 14 9.38333 14 8.2C14 6.38333 13.4208 4.89583 12.2625 3.7375C11.1042 2.57917 9.68333 2 8 2C6.31667 2 4.89583 2.57917 3.7375 3.7375C2.57917 4.89583 2 6.38333 2 8.2C2 9.38333 2.49167 10.7375 3.475 12.2625C4.45833 13.7875 5.96667 15.4833 8 17.35ZM8 20C5.31667 17.7167 3.3125 15.5958 1.9875 13.6375C0.6625 11.6792 0 9.86667 0 8.2C0 5.7 0.804167 3.70833 2.4125 2.225C4.02083 0.741667 5.88333 0 8 0C10.1167 0 11.9792 0.741667 13.5875 2.225C15.1958 3.70833 16 5.7 16 8.2C16 9.86667 15.3375 11.6792 14.0125 13.6375C12.6875 15.5958 10.6833 17.7167 8 20Z" fill="#124CB8" />
              </Svg>
            </View>
            <Text style={tw`text-lg md:text-xl font-bold text-[#1A1B1F]`}>Address</Text>
          </View>

          {/* Address Details Box */}
          <View style={tw`w-full bg-[#F1F0F4] rounded-2xl p-3 md:p-5`}>
            {currentAddress ? (
              <View style={tw`flex-col gap-1`}>
                <Text style={tw`text-sm md:text-base font-semibold text-[#1A1B1F]`}>
                  {currentAddress.landmark || 'Central Medical Plaza'}
                </Text>
                <Text style={tw`text-xs md:text-sm text-[#44474F] font-normal leading-4`}>
                  {currentAddress.house_no ? `${currentAddress.house_no} ` : ''}
                  {currentAddress.street}, {currentAddress.city}{'\n'}
                  {currentAddress.state}, {currentAddress.pincode}
                </Text>
              </View>
            ) : (
              <Text style={tw`text-xs md:text-sm text-[#44474F] font-normal leading-4`}>
                No address added yet.
              </Text>
            )}
          </View>

          {/* Action Button */}
          {currentAddress ? (
            <TouchableOpacity
              style={tw`w-full py-3 rounded-xl justify-center items-center`}
              onPress={() => {
                setEditForm({
                  addressId: currentAddress.id.toString(),
                  country: currentAddress.country || 'India',
                  state: currentAddress.state,
                  city: currentAddress.city,
                  pincode: currentAddress.pincode,
                  street: currentAddress.street,
                  landmark: currentAddress.landmark || '',
                  houseNo: currentAddress.house_no || '',
                });
                setEditModalVisible(true);
              }}
            >
              <Text style={tw`text-sm font-bold text-[#124CB8] text-center`}>Change Address</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={tw`w-full py-3 rounded-xl justify-center items-center`}
              onPress={() => setAddressModalVisible(true)}
            >
              <Text style={tw`text-sm font-bold text-[#124CB8] text-center`}>Add Address</Text>
            </TouchableOpacity>
          )}
        </View>





        {/* ========================================= */}
        {/* MODALS SECTION                            */}
        {/* ========================================= */}


        {/* Add Address Modal */}
        <Modal visible={addressModalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-[#001A41] mb-4`}>Add Address</Text>
              <TextInput style={styles.input} placeholder="City" value={addressForm.city} onChangeText={(t) => handleChange('city', t)} />
              <TextInput style={styles.input} placeholder="Pincode" keyboardType="numeric" value={addressForm.pincode} onChangeText={(t) => handleChange('pincode', t)} />
              <TextInput style={styles.input} placeholder="Street" value={addressForm.street} onChangeText={(t) => handleChange('street', t)} />
              <TextInput style={styles.input} placeholder="State" value={addressForm.state} onChangeText={(t) => handleChange('state', t)} />
              <TouchableOpacity style={tw`bg-[#124CB8] py-3 md:py-4 rounded-xl mt-2`} onPress={handleAddAddress}>
                <Text style={tw`text-center text-sm md:text-base text-white font-bold`}>Save Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-gray-200 py-3 md:py-4 rounded-xl mt-2`} onPress={() => setAddressModalVisible(false)}>
                <Text style={tw`text-center text-sm md:text-base text-gray-800 font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Edit Address Modal */}
        <Modal visible={editModalVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-[#001A41] mb-3`}>Edit Address</Text>
              <TextInput style={styles.input} placeholder="Landmark" value={editForm.landmark} onChangeText={(t) => handleEditChange('landmark', t)} />
              <TextInput style={styles.input} placeholder="House No." value={editForm.houseNo} onChangeText={(t) => handleEditChange('houseNo', t)} />
              <TextInput style={styles.input} placeholder="Street" value={editForm.street} onChangeText={(t) => handleEditChange('street', t)} />
              <TextInput style={styles.input} placeholder="City" value={editForm.city} onChangeText={(t) => handleEditChange('city', t)} />
              <TextInput style={styles.input} placeholder="State" value={editForm.state} onChangeText={(t) => handleEditChange('state', t)} />
              <TextInput style={styles.input} placeholder="Pincode" value={editForm.pincode} onChangeText={(t) => handleEditChange('pincode', t)} />
              <TouchableOpacity style={tw`bg-[#124CB8] py-3 md:py-4 rounded-xl mt-3`} onPress={handleUpdateAddress}>
                <Text style={tw`text-center text-sm md:text-base text-white font-bold`}>Update Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-gray-200 py-3 md:py-4 rounded-xl mt-2`} onPress={() => setEditModalVisible(false)}>
                <Text style={tw`text-center text-sm md:text-base text-gray-800 font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Edit Profile Modal */}
        <Modal visible={editProfileVisible} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={tw`text-lg font-bold text-[#001A41] mb-4 text-center`}>Edit Profile</Text>

              {/* Profile Photo Section in Modal */}
              <View style={tw`items-center mb-5`}>
                <View style={tw`relative`}>
                  <Image
                    key={localPhotoUri || (general.profile_picture ? `${general.profile_picture}?t=${imageTimestamp}` : 'modal_avatar')}
                    source={{
                      uri: localPhotoUri || (
                        general.profile_picture
                          ? `${general.profile_picture.split('?')[0]}?t=${imageTimestamp}`
                          : (userData?.doctorProfile?.profile_picture
                            ? `${userData.doctorProfile.profile_picture.split('?')[0]}?t=${imageTimestamp}`
                            : 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png')
                      )
                    }}
                    style={tw`w-24 h-24 rounded-full border-2 border-[#124CB8]`}
                  />
                  {uploadingPhoto && (
                    <View style={[tw`absolute w-24 h-24 rounded-full justify-center items-center`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                      <ActivityIndicator color="#FFFFFF" />
                    </View>
                  )}
                </View>

                {/* Photo Action Buttons */}
                <View style={tw`flex-row items-center gap-3 mt-3`}>
                  <TouchableOpacity
                    style={tw`flex-row items-center bg-[#124CB8] px-3.5 py-1.5 rounded-full gap-1.5`}
                    onPress={handleUploadPhoto}
                    disabled={uploadingPhoto}
                  >
                    <Camera size={14} color="#FFFFFF" />
                    <Text style={tw`text-white text-xs font-semibold`}>
                      {general.profile_picture || userData?.doctorProfile?.profile_picture ? 'Change Photo' : 'Upload Photo'}
                    </Text>
                  </TouchableOpacity>

                  {(general.profile_picture || userData?.doctorProfile?.profile_picture) && (
                    <TouchableOpacity
                      style={tw`flex-row items-center bg-red-50 border border-red-200 px-3 py-1.5 rounded-full gap-1.5`}
                      onPress={handleDeletePhoto}
                      disabled={uploadingPhoto}
                    >
                      <Trash2 size={14} color="#DC2626" />
                      <Text style={tw`text-red-600 text-xs font-semibold`}>Delete</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Date of Birth</Text>
              <TouchableOpacity
                onPress={() => setShowEditDatePicker(true)}
                style={tw`bg-[#F9FAFB] px-4 py-3 rounded-xl border border-gray-200 mb-4`}
              >
                <Text style={tw`text-gray-800`}>{editDob ? editDob.toDateString() : 'Select Date of Birth'}</Text>
              </TouchableOpacity>

              {showEditDatePicker && (
                <View style={tw`mb-4`}>
                  <DateTimePicker
                    value={editDob || new Date(2000, 0, 1)}
                    mode="date"
                    maximumDate={new Date()}
                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                    onChange={(e, d) => {
                      if (Platform.OS === 'android') {
                        setShowEditDatePicker(false);
                      }
                      if (d) setEditDob(d);
                    }}
                  />
                </View>
              )}

              <Text style={tw`text-sm font-semibold text-gray-700 mb-2`}>Gender</Text>
              <View style={tw`flex-row justify-between mb-4`}>
                {['Male', 'Female', 'Others'].map((g) => (
                  <TouchableOpacity
                    key={g}
                    onPress={() => setEditGender(g)}
                    style={tw`flex-1 mx-1 py-2 rounded-xl border ${editGender === g ? 'bg-[#124CB8] border-[#124CB8]' : 'bg-white border-gray-200'}`}
                  >
                    <Text style={tw`${editGender === g ? 'text-white' : 'text-gray-700'} text-center`}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={tw`bg-[#124CB8] py-3 md:py-4 rounded-xl mt-2`} onPress={handleEditProfileSubmit} disabled={editLoading}>
                <Text style={tw`text-center text-sm md:text-base text-white font-bold`}>{editLoading ? 'Saving...' : 'Save Profile'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={tw`bg-gray-200 py-3 md:py-4 rounded-xl mt-2`} onPress={() => setEditProfileVisible(false)}>
                <Text style={tw`text-center text-sm md:text-base text-gray-800 font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  profileCard: {
    // width: 358,
    // height: 216,
    backgroundColor: '#D8E2FF',
    borderRadius: 24,
  },
  editBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarShadow: {
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  activeDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 0,
    bottom: 0,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    zIndex: 1,
  },
  bentoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    color: '#1F2937',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    maxWidth: 500,
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
};

export default PersonalDetailsScreen;