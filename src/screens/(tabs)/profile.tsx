

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';
import {
  Settings,
  User,
  Folder,
  CreditCard,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  CalendarCheck,
  HelpCircle,
  Trash2,
} from 'lucide-react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import ProfileTopBar from '../../components/ProfileTopBar';
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUserProfile } from '../../contexts/userProfileContext';

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout, user, setUser, checkingLogin } = useUser();
  const { accessToken, clearAccessToken } = useAccessToken();
  const { userData, setUserData, clearUserData, fetchAndStoreUserData } = useUserProfile();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (accessToken) {
        fetchAndStoreUserData(accessToken).catch(console.error);
      }
    }, [accessToken, fetchAndStoreUserData])
  );

  const rawProfilePic = (userData as any)?.doctorProfile?.profile_picture || (userData as any)?.generalUser?.profile_picture || user?.generalUser?.profile_picture;
  const profileImageSource = useMemo(() => rawProfilePic ? { uri: rawProfilePic } : undefined, [rawProfilePic]);

  // ===========================
  // 🚀 Upload Photo Integration
  // ===========================
  const handlePhotoUpload = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
      });

      if (result.didCancel) return;

      const photo = result.assets?.[0];
      if (!photo) return;

      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || 'photo.jpg',
      } as any);

      setLoading(true);

      const response = await fetch('https://api.docapp.co.in/api/auth/upload-photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Upload Failed', data.message || 'Something went wrong.');
        return;
      }

      if (data?.image_url) {
        // Append a timestamp to bypass React Native's aggressive image caching
        const freshImageUrl = data.image_url + (data.image_url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
        setUserData(prev => {
          // prefer updating doctorProfile if present, otherwise update generalUser
          if (prev && (prev as any).doctorProfile) {
            return {
              ...(prev || {}),
              doctorProfile: {
                ...((prev as any).doctorProfile || {}),
                profile_picture: freshImageUrl,
              },
            }
          }

          return {
            ...(prev || {}),
            ...({ generalUser: { ...(((prev as any)?.generalUser) || {}), profile_picture: freshImageUrl } } as any),
          }
        })
      }

      Alert.alert('Success', 'Profile photo uploaded successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo.');
      console.error('Error uploading photo:', error);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // ❌ DELETE PHOTO API
  // ===========================

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
              setLoading(true);

              const response = await fetch(
                'https://api.docapp.co.in/api/auth/delete-profile-pic',
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              );

              const data = await response.json();

              if (!response.ok) {
                Alert.alert('Delete Failed', data.message || 'Unable to delete profile photo.');
                return;
              }

              // Remove from profile context (doctorProfile if present, otherwise generalUser)
              setUserData(prev => {
                if (prev && (prev as any).doctorProfile) {
                  return {
                    ...(prev || {}),
                    doctorProfile: {
                      ...((prev as any).doctorProfile || {}),
                      profile_picture: null,
                    },
                  }
                }

                return {
                  ...(prev || {}),
                  ...({ generalUser: { ...(((prev as any)?.generalUser) || {}), profile_picture: null } } as any),
                }
              });

              Alert.alert('Success', 'Profile photo deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete photo.');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Logout Handler
  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
            clearAccessToken();
            clearUserData();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          } catch (error) {
            Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`items-center mt-6 mb-8`}>
          {loading ? (
            <ActivityIndicator size="large" color="#124CB8" />
          ) : (
            <>
              <View style={tw`w-28 h-28 rounded-full mb-4 shadow-md bg-[#D8E2FF] overflow-hidden`}>
                {profileImageSource ? (
                  <Image
                    source={profileImageSource}
                    style={tw`w-full h-full rounded-full`}
                    resizeMode="cover"
                  />
                ) : (userData?.username || user?.username) ? (
                  <View style={tw`w-full h-full items-center justify-center`}>
                    <Text style={tw`text-[#124CB8] text-4xl font-bold`}>
                      {(userData?.username || user?.username)
                        .split(' ')
                        .map((part: string) => part[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2)}
                    </Text>
                  </View>
                ) : (
                  <View style={tw`w-full h-full items-center justify-center`}>
                    <User size={96} color="#124CB8" strokeWidth={1.2} />
                  </View>
                )}
              </View>

              {/* Upload Photo Button */}
              {/* <TouchableOpacity
                style={tw`bg-[#124CB8] px-5 py-2 rounded-full mb-3`}
                onPress={handlePhotoUpload}
              >
                <Text style={tw`text-white font-semibold`}>Upload Photo</Text>
              </TouchableOpacity> */}

              {/* DELETE Photo Button (Visible only when photo exists) */}
              {/* {(
                (userData as any)?.doctorProfile?.profile_picture ||
                (userData as any)?.generalUser?.profile_picture ||
                user?.generalUser?.profile_picture
              ) && (
                  <TouchableOpacity
                    style={tw`flex-row items-center px-4 py-2 rounded-full bg-red-100 mb-3`}
                    onPress={handleDeletePhoto}
                  >
                    <Trash2 size={18} color="red" />
                    <Text style={tw`text-red-600 font-semibold ml-2`}>Delete Photo</Text>
                  </TouchableOpacity>
                )} */}

              <Text style={tw`font-bold text-xl text-[#001A41] mb-1`}>
                {userData?.username || user?.username || 'Unknown User'}
              </Text>
              {/* <Text style={tw`font-medium text-sm text-[#001A41]/80 mb-4`}>
                {userData?.email || user?.email || 'No Email'}
              </Text> */}
            </>
          )}
        </View>

        {/* Menu */}
        <View style={tw`px-4 mb-4`}>
          {[
            { label: 'Appointments', icon: CalendarCheck, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'Appointments' },
            { label: 'Personal Details', icon: User, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'PersonalDetails' },
            { label: 'My Medical Records', icon: Folder, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'MedicalRecords' },
            { label: 'Payment Methods', icon: CreditCard, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'PaymentMethods' },
            { label: 'Notifications', icon: Bell, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'Notification' },
            { label: 'Privacy & Security', icon: Shield, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'PrivacySecurity' },
            { label: 'Test Bookings', icon: CalendarCheck, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'TestBooking' },
            { label: 'Help Center', icon: HelpCircle, color: '#124CB8', bg: 'bg-[#D8E2FF]', screen: 'HelpCenter' },
          ].map(({ label, icon: Icon, color, bg, screen }, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center bg-[#F1F0F4] rounded-2xl p-4 mb-3 shadow-sm`}
              onPress={() => navigation.navigate(screen)}
            >
              <View style={tw`w-10 h-10 rounded-full ${bg} justify-center items-center mr-4`}>
                <Icon size={20} color={color} />
              </View>
              <View style={tw`flex-1 flex-row justify-between items-center`}>
                <Text style={tw`font-bold text-base text-[#1A1B1F]`}>{label}</Text>
                <ChevronRight size={20} color="#74777F" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={tw`mx-4 mb-6 flex-row items-center`}>
          <LogOut size={20} color="#cb1c42ff" />
          <Text style={[tw`ml-3 font-semibold text-base`, { color: '#cb1c42ff' }]}>Logout</Text>
        </TouchableOpacity>

        <View style={tw`items-center mb-20 pt-4 mt-2 border-t border-[#E5E7EB]`}>
          <Text style={tw`font-medium text-xs text-[#44474F] mb-2`}>App Version 1.0.0</Text>
          <View style={tw`flex-row items-center justify-center`}>
            <Text style={tw`font-medium text-[10px] text-[#44474F]/80`}>Developed by </Text>
            <Text style={tw`font-bold text-[10px] text-[#124CB8] mx-1`}>ZYNLOGIC</Text>
            <Text style={tw`font-medium text-[10px] text-[#44474F]/80`}>
              • © {new Date().getFullYear()} All Rights Reserved
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
