import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';
import { User, Mail, Phone, MapPin, Calendar, User2, Lock } from 'lucide-react-native';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

interface UserData {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  doctorProfile: {
    id: number;
    date_of_birth: string;
    gender: string;
    specialization: string;
    experience_years: number;
    organisation_id: number | null;
    consultation_fee: string;
    availability_schedule: string;
    license_number: string;
    verified_status: boolean;
    profile_picture: string;
    appointment_time: number;
    rzp_account_id: string | null;
    joined_at: string | null;
    kyc_status: string;
    description: string;
    account_number: string;
    beneficiary_name: string;
    ifsc_code: string;
    createdAt: string;
    updatedAt: string;
  };
}

const AccountScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    city: '',
    pincode: '',
    street: '',
    deliveryName: '',
    deliveryPNo: '',
    state: '',
  });

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.userData) {
        const userData: UserData = data.userData;
        const doctorProfile = userData.doctorProfile;

        // Update state with fetched data
        setDoctorInfo({
          name: userData.username || '',
          email: userData.email || '',
          phone: userData.phone_number || '',
          dateOfBirth: doctorProfile?.date_of_birth 
            ? new Date(doctorProfile.date_of_birth).toISOString().split('T')[0] 
            : '',
          gender: doctorProfile?.gender || '',
          specialization: doctorProfile?.specialization || '',
          licenseNumber: doctorProfile?.license_number || '',
          experience: doctorProfile?.experience_years 
            ? `${doctorProfile.experience_years} years` 
            : '',
          city: '', // Address data would come from separate API
          pincode: '',
          street: '',
          deliveryName: '',
          deliveryPNo: '',
          state: '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Implement PUT API call to update user data
      // const response = await fetch('https://landing.docapp.co.in/api/auth/update-user-data', {
      //   method: 'PUT',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     username: doctorInfo.name,
      //     email: doctorInfo.email,
      //     phone_number: doctorInfo.phone,
      //     doctorProfile: {
      //       date_of_birth: doctorInfo.dateOfBirth,
      //       gender: doctorInfo.gender,
      //       specialization: doctorInfo.specialization,
      //       license_number: doctorInfo.licenseNumber,
      //       experience_years: parseInt(doctorInfo.experience) || 0,
      //     }
      //   }),
      // });

      // if (response.ok) {
      //   Alert.alert('Success', 'Profile updated successfully');
      //   setEditMode(false);
      // } else {
      //   const data = await response.json();
      //   Alert.alert('Error', data.message || 'Failed to update profile');
      // }

      Alert.alert('Success', 'Profile updated successfully (API integration pending)');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    // Validate passwords
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    try {
      const response = await fetch('https://landing.docapp.co.in/api/auth/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        setPasswordData({
          newPassword: '',
          confirmPassword: '',
        });
        setShowPasswordChange(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Accounts" />
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#16a34a" />
          <Text style={tw`text-green-600 mt-2`}>Loading profile...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={tw`p-4 pb-10`}>
        <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Account Information</Text>
        <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your profile details</Text>

        {/* Profile Picture Section */}
        <View style={tw`bg-white rounded-xl p-4 mb-4 items-center`}>
          <View style={tw`w-20 h-20 bg-emerald-500 rounded-full items-center justify-center mb-3`}>
            <User size={40} color="#fff" />
          </View>
          <TouchableOpacity style={tw`bg-emerald-500 rounded-lg px-4 py-2`}>
            <Text style={tw`text-white font-medium`}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-green-700`}>Personal Information</Text>
            <TouchableOpacity 
              onPress={() => setEditMode(!editMode)}
              style={tw`bg-emerald-500 rounded-lg px-3 py-1`}
            >
              <Text style={tw`text-white font-medium`}>{editMode ? 'Cancel' : 'Edit'}</Text>
            </TouchableOpacity>
          </View>

          {/* Name (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <User size={20} color="#16a34a" />
              <Text style={tw`text-green-600 font-medium ml-2`}>Full Name</Text>
            </View>
            <Text style={tw`text-green-700 font-bold ml-6`}>{doctorInfo.name}</Text>
          </View>

          {/* Email (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Mail size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Email</Text>
            </View>
            <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.email}</Text>
          </View>

          {/* Phone (Fixed) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Phone size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Phone</Text>
            </View>
            <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.phone}</Text>
          </View>

          {/* Date of Birth (Editable) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Calendar size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Date of Birth</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.dateOfBirth}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, dateOfBirth: text})}
                placeholder="YYYY-MM-DD"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.dateOfBirth}</Text>
            )}
          </View>

          {/* Gender (Editable) */}
          <View style={tw`mb-4`}>
            <View style={tw`flex-row items-center mb-2`}>
              <User2 size={20} color="#16a34a" />
              <Text style={tw`text-gray-700 font-medium ml-2`}>Gender</Text>
            </View>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.gender}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, gender: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold ml-6`}>{doctorInfo.gender}</Text>
            )}
          </View>
        </View>

        {/* Professional Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#16a34a] mb-4`}>Professional Information</Text>

          {/* Specialization (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Specialization</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.specialization}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, specialization: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.specialization}</Text>
            )}
          </View>

          {/* Experience (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Experience</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.experience}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, experience: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.experience}</Text>
            )}
          </View>

          {/* License Number (Editable) */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>License Number</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.licenseNumber}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, licenseNumber: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.licenseNumber}</Text>
            )}
          </View>
        </View>

        {/* Address Information */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-[#16a34a] mb-4`}>Address Information</Text>

          {/* Street */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Street</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.street}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, street: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.street}</Text>
            )}
          </View>

          {/* City */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>City</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.city}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, city: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.city}</Text>
            )}
          </View>

          {/* State */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>State</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.state}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, state: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.state}</Text>
            )}
          </View>

          {/* Pincode */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Pincode</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.pincode}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, pincode: text})}
                keyboardType="numeric"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.pincode}</Text>
            )}
          </View>

          {/* Delivery Name */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Delivery Name</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.deliveryName}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, deliveryName: text})}
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.deliveryName}</Text>
            )}
          </View>

          {/* Delivery Phone Number */}
          <View style={tw`mb-3`}>
            <Text style={tw`text-gray-600 text-sm`}>Delivery Phone Number</Text>
            {editMode ? (
              <TextInput
                style={tw`border border-gray-300 rounded-lg p-3 text-[#16a34a]`}
                value={doctorInfo.deliveryPNo}
                onChangeText={(text) => setDoctorInfo({...doctorInfo, deliveryPNo: text})}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={tw`text-[#16a34a] font-bold text-base`}>{doctorInfo.deliveryPNo}</Text>
            )}
          </View>
        </View>

        {/* Change Password Section */}
        <View style={tw`bg-white rounded-xl p-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-lg font-bold text-[#16a34a]`}>Change Password</Text>
            <TouchableOpacity 
              onPress={() => setShowPasswordChange(!showPasswordChange)}
              style={tw`bg-emerald-500 rounded-lg px-3 py-1`}
            >
              <Text style={tw`text-white font-medium`}>{showPasswordChange ? 'Cancel' : 'Change'}</Text>
            </TouchableOpacity>
          </View>

          {showPasswordChange && (
            <>
              {/* New Password */}
              <View style={tw`mb-3`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>New Password</Text>
                <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}>
                  <Lock size={20} color="#16a34a" />
                  <TextInput
                    style={tw`flex-1 ml-2 text-[#16a34a]`}
                    value={passwordData.newPassword}
                    onChangeText={(text) => setPasswordData({...passwordData, newPassword: text})}
                    placeholder="Enter new password"
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Confirm New Password */}
              <View style={tw`mb-4`}>
                <Text style={tw`text-gray-600 text-sm mb-1`}>Confirm New Password</Text>
                <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}>
                  <Lock size={20} color="#16a34a" />
                  <TextInput
                    style={tw`flex-1 ml-2 text-[#16a34a]`}
                    value={passwordData.confirmPassword}
                    onChangeText={(text) => setPasswordData({...passwordData, confirmPassword: text})}
                    placeholder="Confirm new password"
                    secureTextEntry
                  />
                </View>
              </View>

              <TouchableOpacity
                style={tw`bg-[#10b981] rounded-lg py-3 items-center`}
                onPress={handleChangePassword}
              >
                <Text style={tw`text-white font-bold text-base`}>Update Password</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {editMode && (
          <TouchableOpacity
            style={tw`bg-[#10b981] rounded-lg py-4 items-center mx-4 mb-4`}
            onPress={handleSave}
          >
            <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      )}
    </View>
  );
};

export default AccountScreen;