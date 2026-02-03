import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  Settings,
  Bell,
  Shield,
  User,
  Palette,
  Globe,
  Lock,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { useAccessToken } from './contexts/AccessTokenContext';

type HospitalSettingsNavigationProp = NativeStackNavigationProp<any>;

const HospitalSettingsScreen = () => {
  const navigation = useNavigation<HospitalSettingsNavigationProp>();
  const { accessToken } = useAccessToken();

  const [notifications, setNotifications] = useState({
    appointmentReminders: true,
    newDoctorRequests: true,
    paymentAlerts: true,
    systemUpdates: false,
  });

  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: true,
  });

  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const API_CHANGE_PASSWORD = 'https://landing.docapp.co.in/api/auth/change-password';

  const settingsSections = [
    {
      title: 'Account Settings',
      icon: <User size={24} color="#16a34a" />,
      items: [
        {
          title: 'Profile Information',
          subtitle: 'Update hospital details and contact info',
          onPress: () => Alert.alert('Coming Soon', 'Profile settings will be available soon'),
        },
        {
          title: 'Change Password',
          subtitle: 'Update your account password',
          onPress: () => setPasswordModalVisible(true),
        },
      ],
    },
    {
      title: 'Notifications',
      icon: <Bell size={24} color="#16a34a" />,
      items: [
        {
          title: 'Appointment Reminders',
          subtitle: 'Get notified about upcoming appointments',
          type: 'switch',
          value: notifications.appointmentReminders,
          onValueChange: (value: boolean) =>
            setNotifications({ ...notifications, appointmentReminders: value }),
        },
        {
          title: 'New Doctor Requests',
          subtitle: 'Notifications for doctor approval requests',
          type: 'switch',
          value: notifications.newDoctorRequests,
          onValueChange: (value: boolean) =>
            setNotifications({ ...notifications, newDoctorRequests: value }),
        },
        {
          title: 'Payment Alerts',
          subtitle: 'Receive payment notifications',
          type: 'switch',
          value: notifications.paymentAlerts,
          onValueChange: (value: boolean) =>
            setNotifications({ ...notifications, paymentAlerts: value }),
        },
        {
          title: 'System Updates',
          subtitle: 'Important system and security updates',
          type: 'switch',
          value: notifications.systemUpdates,
          onValueChange: (value: boolean) =>
            setNotifications({ ...notifications, systemUpdates: value }),
        },
      ],
    },
    {
      title: 'Security',
      icon: <Shield size={24} color="#16a34a" />,
      items: [
        {
          title: 'Two-Factor Authentication',
          subtitle: 'Add an extra layer of security',
          type: 'switch',
          value: security.twoFactorAuth,
          onValueChange: (value: boolean) =>
            setSecurity({ ...security, twoFactorAuth: value }),
        },
        {
          title: 'Session Timeout',
          subtitle: 'Automatically log out after inactivity',
          type: 'switch',
          value: security.sessionTimeout,
          onValueChange: (value: boolean) =>
            setSecurity({ ...security, sessionTimeout: value }),
        },
      ],
    },
    {
      title: 'Preferences',
      icon: <Palette size={24} color="#16a34a" />,
      items: [
        {
          title: 'Language',
          subtitle: 'Choose your preferred language',
          onPress: () => Alert.alert('Coming Soon', 'Language settings will be available soon'),
        },
        {
          title: 'Theme',
          subtitle: 'Light or dark theme',
          onPress: () => Alert.alert('Coming Soon', 'Theme settings will be available soon'),
        },
      ],
    },
  ];

  const handleChangePassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert('Error', 'Please enter a new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setChangingPassword(true);
      const response = await fetch(API_CHANGE_PASSWORD, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        setPasswordModalVisible(false);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', result.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert('Error', 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  const renderSettingItem = (item: any, index: number) => {
    if (item.type === 'switch') {
      return (
        <View key={index} style={tw`flex-row items-center justify-between py-3`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-green-700 font-medium`}>{item.title}</Text>
            <Text style={tw`text-green-600 text-sm`}>{item.subtitle}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#d1d5db', true: '#10b981' }}
            thumbColor={item.value ? '#ffffff' : '#f3f4f6'}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={index}
        style={tw`flex-row items-center justify-between py-3`}
        onPress={item.onPress}
      >
        <View style={tw`flex-1`}>
          <Text style={tw`text-green-700 font-medium`}>{item.title}</Text>
          <Text style={tw`text-green-600 text-sm`}>{item.subtitle}</Text>
        </View>
        <ChevronRight size={20} color="#16a34a" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 p-4 flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`p-2 mr-2`}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>Settings</Text>
          <Text style={tw`text-green-100 text-sm`}>Manage your hospital preferences</Text>
        </View>
      </View>

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
            <View style={tw`flex-row items-center mb-4`}>
              {section.icon}
              <Text style={tw`text-lg font-bold text-green-700 ml-3`}>{section.title}</Text>
            </View>

            {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
          </View>
        ))}

        {/* Logout Section */}
        <View style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}>
          <TouchableOpacity
            style={tw`flex-row items-center justify-between py-3`}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: () => navigation.navigate('Login'),
                  },
                ]
              );
            }}
          >
            <View style={tw`flex-row items-center`}>
              <Lock size={24} color="#dc2626" />
              <View style={tw`ml-3`}>
                <Text style={tw`text-red-600 font-medium`}>Logout</Text>
                <Text style={tw`text-red-500 text-sm`}>Sign out of your account</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#dc2626" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={tw`bg-white rounded-2xl p-4 shadow-sm`}>
          <Text style={tw`text-center text-green-600 text-sm`}>
            DocApp Hospital Admin v1.0.0
          </Text>
          <Text style={tw`text-center text-green-500 text-xs mt-1`}>
            © 2025 DocApp. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal
        visible={passwordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPasswordModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white rounded-2xl p-6 w-80`}>
            <Text style={tw`text-xl font-bold text-green-700 mb-4`}>Change Password</Text>
            
            <TextInput
              style={tw`bg-gray-100 rounded-lg p-3 mb-4`}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            
            <TextInput
              style={tw`bg-gray-100 rounded-lg p-3 mb-6`}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-gray-300 rounded-lg p-3 flex-1 mr-2`}
                onPress={() => {
                  setPasswordModalVisible(false);
                  setNewPassword('');
                  setConfirmPassword('');
                }}
              >
                <Text style={tw`text-center text-gray-700 font-medium`}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={tw`bg-green-600 rounded-lg p-3 flex-1 ml-2 ${changingPassword ? 'opacity-50' : ''}`}
                onPress={handleChangePassword}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={tw`text-center text-white font-medium`}>Change</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HospitalSettingsScreen;