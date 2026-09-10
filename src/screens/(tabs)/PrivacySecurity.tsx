import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lock, FileText, ChevronRight, X } from 'lucide-react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProfileTopBar from '../../components/ProfileTopBar';
import { useAccessToken } from '../contexts/AccessTokenContext';

const PrivacySecurityScreen = () => {
  const { accessToken } = useAccessToken();
  const navigation = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [appPermissions, setAppPermissions] = useState({
    location: true,
    notifications: true,
    camera: false,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const toggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    Alert.alert(
      'Two-Factor Authentication',
      !twoFactorEnabled ? 'Enabled' : 'Disabled'
    );
  };

  const togglePermission = (key: keyof typeof appPermissions) => {
    setAppPermissions({ ...appPermissions, [key]: !appPermissions[key] });
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const submitPasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in both password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      setChangingPassword(true);

      const response = await fetch('https://api.docapp.co.in/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          newPassword: newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', result.message || 'Password changed successfully');
        setShowPasswordModal(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'Failed to change password. Please try again.');
    } finally {
      setChangingPassword(false);
    }
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'You can link to your real privacy policy page here.'
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar title="Privacy & Security" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-10`}>
        {/* Two-Factor Authentication */}
        <View style={tw`px-4 mt-4`}>
          <View style={tw`bg-white p-4 rounded-xl mb-4 flex-row justify-between items-start`}>
            <View style={tw`flex-1 pr-3`}>
              <Text style={tw`text-base font-medium text-gray-900`}>
                Two-Factor Authentication
              </Text>
              <Text style={tw`text-gray-600 text-sm mt-1`}>
                Adds an extra layer of security to your account.
              </Text>
            </View>
            <Switch value={twoFactorEnabled} onValueChange={toggle2FA} />
          </View>

          {/* Change Password */}
          <TouchableOpacity
            style={tw`bg-[#F1F0F4] rounded-2xl p-4 flex-row justify-between items-center mb-4`}
            onPress={handleChangePassword}
          >
            <View>
              <Text style={tw`text-[12px] font-bold text-[#74777F] tracking-widest uppercase`}>
                Password
              </Text>
              <Text style={tw`text-[14px] text-[#1A1B1F] mt-1 tracking-widest`}>
                ••••••••••••
              </Text>
            </View>
            <Text style={tw`text-[#74777F] text-xl`}>›</Text>
          </TouchableOpacity>

          {/* App Permissions Header */}
          <Text style={tw`text-base font-semibold text-gray-800 mb-3 mt-4`}>
            App Permissions
          </Text>

          {/* Permissions List */}
          {Object.entries(appPermissions).map(([key, value]) => (
            <View
              key={key}
              style={tw`bg-white py-4 px-4 rounded-xl mb-3 flex-row justify-between items-center`}
            >
              <Text style={tw`text-base text-gray-900 capitalize`}>{key}</Text>
              <Switch
                value={value}
                onValueChange={() => togglePermission(key as keyof typeof appPermissions)}
              />
            </View>
          ))}

          {/* Privacy Policy */}
          <TouchableOpacity
            style={tw`flex-row items-center justify-between bg-white p-4 rounded-xl mt-4`}
            onPress={handlePrivacyPolicy}
            accessibilityRole="button"
            accessibilityLabel="View Privacy Policy"
          >
            <View style={tw`flex-row items-center`}>
              <FileText size={22} color="#555" />
              <Text style={tw`ml-3 text-base text-gray-800`}>View Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color="#aaa" />
          </TouchableOpacity>
        </View>

        {/* Password Change Modal */}
        <Modal
          visible={showPasswordModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowPasswordModal(false)}
        >
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.4)] justify-center items-center`}>
            <View style={tw`w-[85%] max-w-[500px] bg-white p-6 rounded-[24px] shadow-lg`}>
              <Text style={tw`text-lg font-bold text-[#001A41] mb-3`}>Change Password</Text>
              <TextInput
                style={tw`border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-xl mb-3 text-[#1F2937]`}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
                editable={!changingPassword}
              />
              <TextInput
                style={tw`border border-[#E5E7EB] bg-[#F9FAFB] p-3 rounded-xl mb-3 text-[#1F2937]`}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!changingPassword}
              />
              <TouchableOpacity style={tw`bg-[#124CB8] py-3 md:py-4 rounded-xl mt-3`} onPress={submitPasswordChange} disabled={changingPassword}>
                <Text style={tw`text-center text-sm md:text-base text-white font-bold`}>{changingPassword ? 'Saving...' : 'Update Password'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`bg-gray-200 py-3 md:py-4 rounded-xl mt-2`} onPress={() => {
                setShowPasswordModal(false);
                setNewPassword('');
                setConfirmPassword('');
              }}>
                <Text style={tw`text-center text-sm md:text-base text-gray-800 font-bold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacySecurityScreen;