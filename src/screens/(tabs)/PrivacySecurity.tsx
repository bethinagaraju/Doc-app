import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lock, FileText, ChevronRight, X } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const PrivacySecurityScreen = () => {
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
          // Add authorization header if available
          // 'Authorization': `Bearer ${user?.token}`,
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
    <PageLayout
      title="Privacy & Security"
      headerBackgroundColor="#2e9233ff"
      scrollable={true}
    >
      {/* Two-Factor Authentication */}
      <View style={tw`px-4`}>
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
          style={tw`flex-row items-center justify-between bg-white p-4 rounded-xl mb-4`}
          onPress={handleChangePassword}
          accessibilityRole="button"
          accessibilityLabel="Change Password"
        >
          <View style={tw`flex-row items-center`}>
            <Lock size={22} color="#555" />
            <Text style={tw`ml-3 text-base text-gray-800`}>Change Password</Text>
          </View>
          <ChevronRight size={20} color="#aaa" />
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
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-xl p-6 w-11/12 max-w-sm`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-lg font-bold text-gray-900`}>Change Password</Text>
              <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <Text style={tw`text-sm text-gray-600 mb-4`}>
              Enter your new password below. Make sure it's at least 6 characters long.
            </Text>

            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-3 text-gray-900`}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              editable={!changingPassword}
            />

            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3 mb-4 text-gray-900`}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!changingPassword}
            />

            <View style={tw`flex-row gap-3`}>
              <TouchableOpacity
                style={tw`flex-1 bg-gray-200 rounded-lg p-3 items-center`}
                onPress={() => setShowPasswordModal(false)}
                disabled={changingPassword}
              >
                <Text style={tw`text-gray-700 font-medium`}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 bg-green-600 rounded-lg p-3 items-center ${changingPassword ? 'opacity-50' : ''}`}
                onPress={submitPasswordChange}
                disabled={changingPassword}
              >
                <Text style={tw`text-white font-medium`}>
                  {changingPassword ? 'Changing...' : 'Change Password'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </PageLayout>
  );
};

export default PrivacySecurityScreen;