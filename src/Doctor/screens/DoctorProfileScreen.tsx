import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import {
  UserSquare2,
  Clock,
  BadgeDollarSign,
  MapPin,
  Star,
  Award,
  ChevronRight,
  ThumbsUp,
  VerifiedIcon,
  ShieldCheck,
} from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import { useUser } from '../../screens/contexts/UserContext';

const API_GET_USER = 'https://api.docapp.co.in/api/auth/get-user-data';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const DoctorProfileSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={tw`flex-1 bg-[#F8F9FF]`}>
      <DoctorHeader title="Profile" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`pb-28`} showsVerticalScrollIndicator={false}>
        {/* Profile Card Skeleton */}
        <Animated.View style={[tw`p-4`, { opacity: pulseAnim }]}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`w-24 h-24 rounded-2xl bg-[#DAE1FF]/50`} />
            <View style={tw`ml-4 flex-1 gap-2`}>
              <View style={tw`w-36 h-6 bg-[#DAE1FF]/50 rounded-md`} />
              <View style={tw`w-28 h-4 bg-[#DAE1FF]/50 rounded`} />
              <View style={tw`w-32 h-4 bg-[#DAE1FF]/50 rounded mt-1`} />
              <View style={tw`w-24 h-4 bg-[#DAE1FF]/50 rounded`} />
            </View>
          </View>

          {/* Fee and License Skeleton */}
          <View style={tw`mt-4 p-4 rounded-xl bg-[#EEF4FF] gap-2`}>
            <View style={tw`w-48 h-5 bg-[#DAE1FF]/50 rounded`} />
            <View style={tw`w-40 h-5 bg-[#DAE1FF]/50 rounded`} />
          </View>

          {/* Stats Skeleton */}
          <View style={tw`flex-row justify-between mt-4 p-4 rounded-xl bg-[#EEF4FF]`}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={tw`items-center flex-1 gap-1.5`}>
                <View style={tw`w-12 h-6 bg-[#DAE1FF]/50 rounded`} />
                <View style={tw`w-14 h-4 bg-[#DAE1FF]/50 rounded`} />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Menu Items Skeleton */}
        <Animated.View style={[tw`px-4 mt-2 gap-3`, { opacity: pulseAnim }]}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View
              key={i}
              style={tw`p-4 rounded-xl flex-row items-center bg-white border border-[#DAE1FF]/60`}
            >
              <View style={tw`w-12 h-12 rounded-full bg-[#EEF4FF] mr-4`} />
              <View style={tw`flex-1 gap-2`}>
                <View style={tw`w-36 h-5 bg-[#DAE1FF]/50 rounded`} />
                <View style={tw`w-52 h-4 bg-[#DAE1FF]/50 rounded`} />
              </View>
              <View style={tw`w-5 h-5 bg-[#DAE1FF]/50 rounded`} />
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const DoctorProfileScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const { accessToken } = useAccessToken();
  const { user, fetchUserData: refreshGlobalUser } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Menu items for navigation
  const menuItems = [
    {
      id: 1,
      title: 'Personal Information',
      subtitle: 'Update your personal details, credentials and clinic address',
      icon: <UserSquare2 size={24} color="#124CB8" />,
      route: 'PersonalInfo' as const,
    },
    {
      id: 2,
      title: 'KYC & Verifications',
      subtitle: 'Complete your verification process',
      icon: <VerifiedIcon size={24} color="#124CB8" />,
      route: 'Specializations' as const,
    },
    {
      id: 3,
      title: 'Consultation Hours',
      subtitle: 'Set your availability and consultation slots',
      icon: <Clock size={24} color="#124CB8" />,
      route: 'Availability' as const,
    },
    {
      id: 4,
      title: 'Consultation Fees',
      subtitle: 'Manage your consultation charges',
      icon: <BadgeDollarSign size={24} color="#124CB8" />,
      route: 'ConsultationFees' as const,
    },
    {
      id: 5,
      title: 'Security',
      subtitle: 'Manage password and two-factor authentication',
      icon: <ShieldCheck size={24} color="#124CB8" />,
      route: 'AccountSecurity' as const,
    },
  ];

  // Fetch user data from API
  const fetchUserData = async () => {
    if (!accessToken) return;
    try {
      setLoading(true);
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.userData) {
        const fetched = data.userData;
        const ts = new Date().getTime();
        if (fetched.doctorProfile?.profile_picture) {
          fetched.doctorProfile.profile_picture += (fetched.doctorProfile.profile_picture.includes('?') ? '&' : '?') + 't=' + ts;
        }
        setUserData(fetched);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
      if (refreshGlobalUser && accessToken) {
        refreshGlobalUser(accessToken);
      }
    }, [accessToken])
  );

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
      specialization: profile.specialization || 'General Physician',
      location: 'Hyderabad, Telangana',
      experience: `${profile.experience_years || 0} years`,
      licenseNumber: profile.license_number || 'Not provided',
      consultationFee: `₹${profile.consultation_fee || '0'}`,
      rating: '4.8',
      reviews: '15K+',
      profilePicture: profile.profile_picture || 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
    };
  };

  const doctorInfo = getDoctorInfo();

  if (loading) {
    return <DoctorProfileSkeleton />;
  }

  return (
    <View style={tw`flex-1 bg-[#F8F9FF]`}>
      <DoctorHeader title="Profile" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={tw`p-4`}>
          <View
            style={[
              tw`bg-white rounded-2xl p-4 border border-[#DAE1FF]/80`,
              {
                shadowColor: '#102A43',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 16,
                elevation: 3,
              },
            ]}
          >
            <View style={tw`flex-row`}>
              <Image
                source={{ uri: doctorInfo.profilePicture }}
                style={tw`w-24 h-24 rounded-2xl border-2 border-[#DAE1FF]`}
              />
              <View style={tw`ml-4 flex-1`}>
                <Text style={tw`text-xl font-bold text-[#011D35]`}>{doctorInfo.name}</Text>
                <Text style={tw`text-base text-[#124CB8] font-medium`}>{doctorInfo.specialization}</Text>
                <View style={tw`flex-row items-center mt-2`}>
                  <MapPin size={15} color="#124CB8" />
                  <Text style={tw`ml-1 text-[#434653] text-sm`}>{doctorInfo.location}</Text>
                </View>
                <View style={tw`flex-row items-center mt-1`}>
                  <Clock size={15} color="#124CB8" />
                  <Text style={tw`ml-1 text-[#434653] text-sm`}>{doctorInfo.experience} Experience</Text>
                </View>
              </View>
            </View>

            {/* Fee and License */}
            <View style={tw`mt-4 p-3.5 rounded-xl bg-[#EEF4FF] border border-[#DAE1FF]/60`}>
              <Text style={tw`text-sm text-[#011D35]`}>
                <Text style={tw`font-semibold text-[#124CB8]`}>Consultation Fee: </Text> {doctorInfo.consultationFee}
              </Text>
              <Text style={tw`text-sm text-[#011D35] mt-1`}>
                <Text style={tw`font-semibold text-[#124CB8]`}>License Number: </Text> {doctorInfo.licenseNumber}
              </Text>
            </View>

            {/* Stats */}
            <View style={tw`flex-row justify-between mt-4 p-3.5 rounded-xl bg-[#EEF4FF] border border-[#DAE1FF]/60`}>
              <View style={tw`items-center flex-1`}>
                <Text style={tw`text-lg font-bold text-[#011D35]`}>{doctorInfo.rating}</Text>
                <View style={tw`flex-row items-center mt-0.5`}>
                  <Star size={13} color="#124CB8" />
                  <Text style={tw`text-[#434653] text-xs ml-1`}>Rating</Text>
                </View>
              </View>
              <View style={tw`items-center flex-1 border-x border-[#DAE1FF]`}>
                <Text style={tw`text-lg font-bold text-[#011D35]`}>{doctorInfo.reviews}</Text>
                <View style={tw`flex-row items-center mt-0.5`}>
                  <ThumbsUp size={13} color="#124CB8" />
                  <Text style={tw`text-[#434653] text-xs ml-1`}>Reviews</Text>
                </View>
              </View>
              <View style={tw`items-center flex-1`}>
                <Text style={tw`text-lg font-bold text-[#011D35]`}>{doctorInfo.experience}</Text>
                <View style={tw`flex-row items-center mt-0.5`}>
                  <Award size={13} color="#124CB8" />
                  <Text style={tw`text-[#434653] text-xs ml-1`}>Years</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={tw`px-4`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              style={[
                tw`p-4 rounded-2xl mb-3 bg-white border border-[#DAE1FF]/80 flex-row items-center shadow-sm`,
                {
                  shadowColor: '#102A43',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.04,
                  shadowRadius: 10,
                  elevation: 2,
                },
              ]}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={tw`w-12 h-12 rounded-xl items-center justify-center mr-4 bg-[#EEF4FF]`}>
                {item.icon}
              </View>
              <View style={tw`flex-1`}>
                <Text style={tw`font-semibold text-base text-[#011D35]`}>{item.title}</Text>
                <Text style={tw`text-[#434653] text-xs mt-0.5`} numberOfLines={1}>{item.subtitle}</Text>
              </View>
              <ChevronRight size={18} color="#124CB8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DoctorProfileScreen;