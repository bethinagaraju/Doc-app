import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Bell,
  Moon,
  Key,
  Languages,
  Info,
  LogOut,
  ChevronRight
} from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';
import { useAccessToken } from '../contexts/AccessTokenContext';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const { accessToken } = useAccessToken();
  const [userData, setUserData] = useState<any>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
          method: 'GET',
          headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok && result?.userData) {
          setUserData(result.userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const profilePic = userData?.generalUser?.profile_picture || userData?.doctorProfile?.profile_picture || 'https://randomuser.me/api/portraits/men/4.jpg';
  const userName = userData?.username || 'User';
  const role = userData?.doctorProfile?.specialization || userData?.role || 'Patient';

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Logout',
        style: 'destructive',
        onPress: () => console.log('User logged out')
      },
    ]);
  };

  return (
    <PageLayout
      title="Settings"
      headerBackgroundColor="#2E3192"
      scrollable={true}
    >
      {/* Intro Section */}
      <View style={tw`flex-row items-center my-4 bg-white p-3.5 rounded-3xl shadow-sm mx-4`}>
        <Image
          source={{ uri: profilePic }}
          style={tw`w-15 h-15 rounded-full mr-3.5`}
        />
        <View>
          <Text style={tw`text-lg font-bold text-blue-500`}>{userName}</Text>
          <Text style={tw`text-sm text-gray-600 mt-1`}>{role}</Text>
        </View>
      </View>

      {/* Toggle Settings */}
      <View style={tw`mb-7.5 mx-4`}>
        <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
          <Bell size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>

        <View style={tw`bg-white flex-row items-center justify-between p-3.5 rounded-xl mb-2.5 shadow-sm`}>
          <Moon size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Dark Mode</Text>
          <Switch
            value={darkModeEnabled}
            onValueChange={setDarkModeEnabled}
          />
        </View>
      </View>

      {/* Navigation Links */}
      <View style={tw`mb-7.5 mx-4`}>
        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="Change Password"
        >
          <Key size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Change Password</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="Language settings"
        >
          <Languages size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>Language</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`bg-white flex-row items-center p-3.5 rounded-xl mb-2.5 shadow-sm`}
          accessibilityRole="button"
          accessibilityLabel="About App"
        >
          <Info size={22} color="#007bff" />
          <Text style={tw`flex-1 ml-3 text-base`}>About App</Text>
          <ChevronRight size={20} color="#aaa" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity 
        style={tw`bg-red-600 flex-row items-center justify-center p-3.5 rounded-xl mx-4 mt-2.5 min-h-12`} 
        onPress={handleLogout}
        accessibilityRole="button"
        accessibilityLabel="Logout"
      >
        <LogOut size={20} color="#fff" />
        <Text style={tw`text-white text-base ml-2`}>Logout</Text>
      </TouchableOpacity>

      {/* Version and Developer Info */}      <View style={tw`items-center mt-6 mb-20 mx-4 pt-2 border-t border-gray-200`}>
        <Text style={tw`font-normal text-xs text-gray-500 mb-2`}>App Version 1.0.0</Text>
        <View style={tw`flex-row items-center justify-center`}>
          <Text style={tw`font-normal text-[10px] text-gray-400`}>Developed by </Text>
          <Text style={tw`font-semibold text-[10px] text-[#202b6d] mx-1`}>ZYNLOGIC</Text>
          <Text style={tw`font-normal text-[10px] text-gray-400`}>• © {new Date().getFullYear()} All Rights Reserved</Text>
        </View>
      </View>
    </PageLayout>
  );
};

export default SettingsScreen;