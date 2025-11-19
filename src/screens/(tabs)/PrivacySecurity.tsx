import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Lock, FileText, ChevronRight } from 'lucide-react-native';
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
    Alert.alert('Change Password', 'Redirecting to password reset flow...');
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
    </PageLayout>
  );
};

export default PrivacySecurityScreen;