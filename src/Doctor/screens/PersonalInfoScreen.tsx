import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import DocProfileTopBar from '../components/DocProfileTopBar';
import ProfilePhotoSection from '../components/ProfilePhotoSection';
import DocStatCard from '../components/DocStatCard';
import AccountSecuritySettings from '../components/AccountSecuritySettings';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// ======================= API CONSTANTS =======================
const API_BASE = 'https://api.docapp.co.in';
const API_GET_USER = `${API_BASE}/api/auth/get-user-data`;
const API_UPDATE_PROFILE = `${API_BASE}/api/auth/profile/complete/doctor`;
const API_UPLOAD_PHOTO = `${API_BASE}/api/auth/upload-photo`;
const API_UPLOAD_BANK = `${API_BASE}/api/auth/upload/bank-details`;
const API_ADD_ADDRESS = `${API_BASE}/api/address/addAddress`;
const API_GET_ALL_ADDRESS = `${API_BASE}/api/address/getAllAddress`;

// Type definition for Address
interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
  active: boolean;
}

const PersonalInfoScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const { accessToken } = useAccessToken();
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔀 Tab State: 'personal' | 'bank' | 'address'
  const [activeTab, setActiveTab] = useState<'personal' | 'bank' | 'address'>('personal');

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
    confirm_account_number: '',
    ifsc_code: '',
  });

  // 📍 Address State
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    pincode: ''
  });

  // ================================================================================================
  // 🔄 Fetch profile data
  // ================================================================================================
  const fetchData = async () => {
    try {
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
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

  // ================================================================================================
  // 📍 Fetch Addresses
  // ================================================================================================
  const fetchAddresses = async () => {
    try {
      setAddressLoading(true);
      const response = await fetch(API_GET_ALL_ADDRESS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
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

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch addresses when tab switches to 'address'
  useEffect(() => {
    if (activeTab === 'address') {
      fetchAddresses();
    }
  }, [activeTab]);

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
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
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
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
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
    if (!bankForm.beneficiary_name || !bankForm.account_number || !bankForm.ifsc_code) {
      Alert.alert("Missing Fields", "Please fill in all bank details.");
      return;
    }
    if (bankForm.account_number !== bankForm.confirm_account_number) {
      Alert.alert("Mismatch", "Account numbers do not match.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        beneficiary_name: bankForm.beneficiary_name,
        account_number: bankForm.account_number,
        ifsc_code: bankForm.ifsc_code
      };

      const response = await fetch(API_UPLOAD_BANK, {
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
        Alert.alert('Success', 'Bank details updated successfully!');
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
  // 📍 Add New Address
  // ================================================================================================
  const handleAddAddress = async () => {
    // Validation
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
              const res = await fetch(`${API_BASE}/api/auth/delete-profile-pic`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
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
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>

      <View>
        <DocProfileTopBar />
      </View>


      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`p-5 pb-20`}>

          {/* 🔀 Tabs Switcher */}
          <View style={tw`flex-row justify-center mb-6 bg-white rounded-full p-1 shadow-sm`}>
            <TouchableOpacity
              onPress={() => setActiveTab('personal')}
              style={tw`flex-1 py-3 rounded-full items-center ${activeTab === 'personal' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold text-xs ${activeTab === 'personal' ? 'text-white' : 'text-gray-500'}`}>
                Personal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('address')}
              style={tw`flex-1 py-3 rounded-full items-center ${activeTab === 'address' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold text-xs ${activeTab === 'address' ? 'text-white' : 'text-gray-500'}`}>
                Address
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('bank')}
              style={tw`flex-1 py-3 rounded-full items-center ${activeTab === 'bank' ? 'bg-green-600' : 'bg-transparent'}`}
            >
              <Text style={tw`font-bold text-xs ${activeTab === 'bank' ? 'text-white' : 'text-gray-500'}`}>
                Bank Info
              </Text>
            </TouchableOpacity>
          </View>

          {/* ============================================================================
                                     VIEW 1: PERSONAL INFO
          ============================================================================ */}
          {activeTab === 'personal' && (
            <>
              {/* Profile Photo Section */}
              <ProfilePhotoSection
                profilePicture={personalInfo.profilePicture}
                name={personalInfo.name}
                specialization={personalInfo.specialization}
                onUploadPress={handlePhotoUpload}
                onDeletePress={handleDeletePhoto}
              />

              {/* Read-Only Info */}
              <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
                <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Current Details</Text>
                <Text style={tw`mb-1 text-gray-700`}>Email: {personalInfo.email}</Text>
                <Text style={tw`mb-1 text-gray-700`}>Phone: {personalInfo.phone}</Text>
                <Text style={tw`mb-1 text-gray-700`}>Experience: {personalInfo.experience} years</Text>
              </View>

              {/* Stats Card */}
              <View style={tw`mb-6`}>
                <DocStatCard
                  patientSatisfaction="4.9/5.0"
                  totalConsultations="1,240+"
                />
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

              <View style={tw`mt-6`}>
                <AccountSecuritySettings />
              </View>


            </>
          )}

          {/* ============================================================================
                                     VIEW 2: ADDRESS INFO (NEW)
          ============================================================================ */}
          {activeTab === 'address' && (
            <>
              {/* Existing Addresses List */}
              <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
                <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Clinic Addresses</Text>

                {addressLoading ? (
                  <ActivityIndicator color="green" />
                ) : addresses.length === 0 ? (
                  <Text style={tw`text-gray-500 italic`}>No addresses added yet.</Text>
                ) : (
                  addresses.map((addr) => (
                    <View key={addr.id} style={tw`border-b border-gray-100 py-3`}>
                      <Text style={tw`font-bold text-gray-800`}>{addr.street}</Text>
                      <Text style={tw`text-gray-600`}>{addr.city}, {addr.state} - {addr.pincode}</Text>
                    </View>
                  ))
                )}
              </View>

              {/* Add Address Form */}
              <View style={tw`bg-white rounded-2xl p-5 shadow-sm`}>
                <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Add New Address</Text>
                <Text style={tw`text-gray-500 text-sm mb-4`}>Where is your clinic located?</Text>

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Street / Area</Text>
                <TextInput
                  placeholder="e.g. Rangashaipet"
                  value={addressForm.street}
                  onChangeText={(t) => setAddressForm({ ...addressForm, street: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                />

                <View style={tw`flex-row justify-between`}>
                  <View style={tw`flex-1 mr-2`}>
                    <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>City</Text>
                    <TextInput
                      placeholder="e.g. Warangal"
                      value={addressForm.city}
                      onChangeText={(t) => setAddressForm({ ...addressForm, city: t })}
                      style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                    />
                  </View>
                  <View style={tw`flex-1 ml-2`}>
                    <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>Pincode</Text>
                    <TextInput
                      placeholder="e.g. 506002"
                      value={addressForm.pincode}
                      keyboardType="number-pad"
                      onChangeText={(t) => setAddressForm({ ...addressForm, pincode: t })}
                      style={tw`border border-gray-300 rounded p-3 mb-3 bg-gray-50`}
                    />
                  </View>
                </View>

                <Text style={tw`text-xs text-gray-500 mb-1 ml-1`}>State</Text>
                <TextInput
                  placeholder="e.g. Telangana"
                  value={addressForm.state}
                  onChangeText={(t) => setAddressForm({ ...addressForm, state: t })}
                  style={tw`border border-gray-300 rounded p-3 mb-5 bg-gray-50`}
                />

                <TouchableOpacity
                  style={tw`bg-emerald-500 rounded-full px-6 py-3 items-center`}
                  onPress={handleAddAddress}
                  disabled={addressLoading}
                >
                  {addressLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={tw`text-white font-bold text-base`}>Add Address</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* ============================================================================
                                     VIEW 3: BANK INFO
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
                secureTextEntry={true}
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
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;