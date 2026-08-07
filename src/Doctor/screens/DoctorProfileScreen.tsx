import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  UserSquare2,
  Medal,
  Clock,
  BadgeDollarSign,
  MapPin,
  Star,
  Award,
  ChevronRight,
  ThumbsUp,
  VerifiedIcon,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';

const API_GET_USER = 'https://api.docapp.co.in/api/auth/get-user-data';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const DoctorProfileScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const { accessToken } = useAccessToken();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // No custom color objects; use Tailwind classes only

  // Menu items for navigation
  const menuItems = [
    {
      id: 1,
      title: 'Personal Information',
      subtitle: 'Update your personal details and credentials',
      icon: <UserSquare2 size={24} color="#16a34a" />,
      route: 'PersonalInfo' as const,
    },
    {
      id: 2,
      title: 'KYC',
      subtitle: 'Complete your Verification Process',
      icon: <VerifiedIcon size={24} color="#16a34a" />,
      route: 'Specializations' as const,
    },
    {
      id: 3,
      title: 'Consultation Hours',
      subtitle: 'Set your availability and consultation charges',
      icon: <Clock size={24} color="#16a34a" />,
      route: 'Availability' as const,
    },
    {
      id: 4,
      title: 'Consultation Fees',
      subtitle: 'Manage your consultation charges',
      icon: <BadgeDollarSign size={24} color="#16a34a" />,
      route: 'ConsultationFees' as const,
    },
  ];

  // Fetch user data from API
  const fetchUserData = async () => {
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
        setUserData(data.userData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Get doctor info from API data
  const getDoctorInfo = () => {
    if (!userData || !userData.doctorProfile) {
      return {
        name: 'Loading...',
        specialization: 'Loading...',
        location: 'Loading...',
        experience: '0 years',
        licenseNumber: 'Loading...',
        consultationFee: '₹0',
        rating: '0.0',
        reviews: '0',
        profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
      };
    }

    const profile = userData.doctorProfile;
    return {
      name: `Dr. ${userData.username}`,
      specialization: profile.specialization || 'Not specified',
      location: 'Hyderabad, Telangana', // This could be from address data if available
      experience: `${profile.experience_years || 0} years`,
      licenseNumber: profile.license_number || 'Not provided',
      consultationFee: `₹${profile.consultation_fee || '0'}`,
      rating: '4.8', // Placeholder, not in API response
      reviews: '15K+', // Placeholder, not in API response
      profilePicture: profile.profile_picture || 'https://randomuser.me/api/portraits/men/1.jpg',
    };
  };

  const doctorInfo = getDoctorInfo();

  if (loading) {
    return (
      <View style={tw`flex-1 bg-green-700 justify-center items-center`}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={tw`text-green-100 text-lg mt-3`}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Profile" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`pb-6`}>
        {/* Profile Card */}
        <View style={tw`p-4 shadow-sm bg-green-50`}>
          <View style={tw`flex-row`}>
            <Image
              source={{ uri: doctorInfo.profilePicture }}
              style={tw`w-24 h-24 rounded-2xl`}
            />
            <View style={tw`ml-4 flex-1`}>
              <Text style={tw`text-xl font-bold text-green-700`}>{doctorInfo.name}</Text>
              <Text style={tw`text-base text-green-600`}>{doctorInfo.specialization}</Text>
              <View style={tw`flex-row items-center mt-2`}>
                <MapPin size={16} color="#059669" />
                <Text style={tw`ml-1 text-green-600`}>{doctorInfo.location}</Text>
              </View>
              <View style={tw`flex-row items-center mt-1`}>
                <Clock size={16} color="#059669" />
                <Text style={tw`ml-1 text-green-600`}>{doctorInfo.experience} Experience</Text>
              </View>
            </View>
          </View>

          {/* Fee and License */}
          <View style={tw`mt-4 p-4 rounded-xl bg-green-100`}>
            <Text style={tw`text-base text-green-700`}>
              <Text style={tw`font-bold`}>Consultation Fee: </Text> {doctorInfo.consultationFee}
            </Text>
            <Text style={tw`text-base text-green-700 mt-1`}>
              <Text style={tw`font-bold`}>License Number: </Text> {doctorInfo.licenseNumber}
            </Text>
          </View>

          {/* Stats */}
          <View style={tw`flex-row justify-between mt-4 p-4 rounded-xl bg-green-100`}>
            <View style={tw`items-center`}>
              <Text style={tw`text-lg font-bold text-green-700`}>{doctorInfo.rating}</Text>
              <View style={tw`flex-row items-center`}>
                <Star size={14} color="#16a34a" />
                <Text style={tw`text-green-700 ml-1`}>Rating</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-lg font-bold text-green-700`}>{doctorInfo.reviews}</Text>
              <View style={tw`flex-row items-center`}>
                <ThumbsUp size={14} color="#16a34a" />
                <Text style={tw`text-green-700 ml-1`}>Reviews</Text>
              </View>
            </View>
            <View style={tw`items-center`}>
              <Text style={tw`text-lg font-bold text-green-700`}>{doctorInfo.experience}</Text>
              <View style={tw`flex-row items-center`}>
                <Award size={14} color="#16a34a" />
                <Text style={tw`text-green-700 ml-1`}>Years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={tw`px-4 mt-4`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`p-4 rounded-xl mb-3 shadow-sm flex-row items-center bg-green-50`}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={tw`w-12 h-12 rounded-full items-center justify-center mr-4 bg-green-100`}>
                {item.icon}
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`font-medium text-lg text-green-700`}>{item.title}</Text>
                <Text style={tw`text-green-600 text-sm mt-1`}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={20} color="#059669" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfileScreen;