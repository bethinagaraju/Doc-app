import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import {
  Home,
  Calendar,
  User,
  PieChart,
  MessageCircle,
  Search,
  Hospital,
  Pill,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  FileText,
  Video,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  HelpCircle,
  Star,
  Stethoscope,
  Heart,
  ClipboardList,
  FilePlus,
  FileCheck,
  FileX,
  FileMinus,
  File,
  Camera,
  Upload,
  Download,
  Trash,
  Eye,
  EyeOff,
  Mail,
  Phone as PhoneIcon,
  Globe
} from 'lucide-react-native';
import tw from 'twrnc'; // Import twrnc
import Modal from 'react-native-modal'; // or 'react-native' if you use the built-in Modal
import Footer from './Footer';
import Svg, { Path } from 'react-native-svg';



import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';
import UpcomingAppointmentCard from '../user_components/UpcomingAppointmentCard';
import QuickActionsGrid from '../user_components/QuickActionsGrid';
import DoctorCardsContainer from '../user_components/DoctorCardsContainer';
import SpecialtiesSection from '../user_components/SpecialtiesSection';
import HomeTopAppBar from '../../user_components/HomeTopAppBar';
import HomeBannerSection from '../../user_components/HomeBannerSection';
const { width: screenWidth } = Dimensions.get('window');

// Define your stack param list for navigation typing
export type RootStackParamList = {
  index: undefined;
  AllHospitals: undefined;
  AllPharmacies: undefined;
  Onboarding: undefined;
  Search: undefined;
  VideoCall: undefined;
  Profile: undefined;
  Language: undefined;
  Notification: undefined;
  Searcheverything: undefined;
  AllSpecialtiesScreen: { mode?: string } | undefined;
  Doctors: { specialty?: string; mode?: string };
  ConsultOptionsScreen: { specialty: string };
  HospitalDetailsScreen: { id: number; name: string; location: string; image: string };
  PharmacyDetailsScreen: { id: number; name: string; location: string; image: string };
  LabTestCategoriesScreen: undefined;
  pharmacytestcategories: undefined;
  AllOffersScreen: undefined;
  // ...add more as needed
};

const HomeScreen = () => {

  const [userData, setUserData] = useState<any>(null);

  const user = useUser();
  const { accessToken } = useAccessToken();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const activeUser = userData || user?.user;
  const rawProfilePic =
    activeUser?.generalUser?.profile_picture ||
    activeUser?.doctorProfile?.profile_picture ||
    user?.user?.generalUser?.profile_picture ||
    user?.user?.doctorProfile?.profile_picture;

  const cleanUrl = rawProfilePic ? rawProfilePic.split('?')[0] : '';
  const lastUpdated =
    activeUser?.generalUser?.updatedAt ||
    activeUser?.doctorProfile?.updatedAt ||
    user?.user?.generalUser?.updatedAt ||
    user?.user?.doctorProfile?.updatedAt;

  const ts = lastUpdated ? new Date(lastUpdated).getTime() : '';
  const profileImageUri = cleanUrl
    ? (ts ? `${cleanUrl}?t=${ts}` : `${cleanUrl}?t=${new Date().getTime()}`)
    : 'https://randomuser.me/api/portraits/men/4.jpg';



  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        if (!accessToken) return;
        try {
          const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const result = await response.json();

          if (!response.ok) {
            console.error('Fetch failed:', result);
            return;
          }

          if (result?.userData) {
            const fetched = result.userData;
            const now = new Date().getTime();
            if (fetched.generalUser?.profile_picture) {
              fetched.generalUser.profile_picture = `${fetched.generalUser.profile_picture.split('?')[0]}?t=${now}`;
            }
            if (fetched.doctorProfile?.profile_picture) {
              fetched.doctorProfile.profile_picture = `${fetched.doctorProfile.profile_picture.split('?')[0]}?t=${now}`;
            }
            setUserData(fetched);
            console.log('User Data in HomeScreen:', fetched);
          } else {
            console.log('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }, [accessToken])
  );







  const bottomBanners = [
    require('../Images/BottomBanner1.jpg'),
    require('../Images/BottomBanner2.jpg'),
    require('../Images/BottomBanner3.jpg'),
  ];

  const hospitals = [
    {
      id: 1,
      name: 'Apollo Hospital',
      location: 'Delhi, India',
      image: require('../../assets/images/Logo-medicover.png'),
    },
    {
      id: 2,
      name: 'Fortis Healthcare',
      location: 'Mumbai, India',
      image: require('../../assets/images/Logo-medicover.png'),
    },
    {
      id: 3,
      name: 'AIIMS',
      location: 'New Delhi, India',
      image: require('../../assets/images/Logo-medicover.png'),
    },
  ];

  const pharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      location: 'Delhi, India',
      image: 'https://images.unsplash.com/photo-1606813902532-0fdd8b6a3caa',
    },
    {
      id: 2,
      name: 'MedPlus',
      location: 'Bangalore, India',
      image: 'https://images.unsplash.com/photo-1601022353923-5226cb45e8f4',
    },
    {
      id: 3,
      name: '1MG Pharmacy',
      location: 'Hyderabad, India',
      image: 'https://images.unsplash.com/photo-1580281657527-47aab76dfdc1',
    },
  ];





  return (
    <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#F8F9FF' }]}>
      <StatusBar backgroundColor="#F8F9FF" barStyle="dark-content" />
      <ScrollView
        style={[tw`flex-1 px-5`, { backgroundColor: '#F8F9FF' }]}
        contentContainerStyle={tw`pb-20`}
        showsVerticalScrollIndicator={false}
      >





        <HomeTopAppBar profileImageUri={profileImageUri} username={userData?.username || user?.user?.username || 'User'} />




        <UpcomingAppointmentCard />




        {/* Old Quick Actions Grid - Images only */}
        {/* <View style={tw`flex-row flex-wrap justify-between mx-4 mt-6 gap-2`}>
          
          <TouchableOpacity
            onPress={() => {
              user.setConsultationMode('online');
              navigation.navigate('AllSpecialtiesScreen', { mode: 'video' });
            }}
            style={tw`relative`}
          >
            <Image
              source={require('../../assets/images/13234650_5183184.jpg')}
              style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
              resizeMode="cover"
            />
            <View style={tw`absolute bottom-2 left-2 bg-black/30 p-2 rounded-lg`}>
              <Text style={tw`text-white font-bold text-lg`}>Video Consult</Text>
              <Text style={tw`text-white text-sm`}>Consult Online Now</Text>
            </View>
          </TouchableOpacity>

          
          <TouchableOpacity
            onPress={() => {
              user.setConsultationMode('offline');
              navigation.navigate('AllSpecialtiesScreen', { mode: 'inclinic' });
            }}
            style={tw`relative`}
          >
            <Image
              source={require('../../assets/images/18706987_TaeAugust07.jpg')}
              style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
              resizeMode="cover"
            />
            <View style={tw`absolute bottom-2 left-2 bg-black/30 p-2 rounded-lg`}>
              <Text style={tw`text-white font-bold text-lg`}>Visit Clinic</Text>
              <Text style={tw`text-white text-sm`}>Book Appointment</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LabTestCategoriesScreen')}>
            <Image
              source={require('../../assets/images/2148958363.jpg')}
              style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
              resizeMode="cover"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('pharmacytestcategories')}>
            <Image
              source={require('../../assets/images/images.jpg')}
              style={tw`w-[${(screenWidth - 48) / 2}px] h-30 rounded-3xl`}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View> */}


        <View style={tw`items-center w-full`}>
          <QuickActionsGrid />
        </View>



        {/* Banner Section */}
        <HomeBannerSection />







        {/* Specialties */}
        <SpecialtiesSection />

        <DoctorCardsContainer />

        {/* Explore Hospitals */}
        {/* <View style={tw`mt-6 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Top Hospitals
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllHospitals')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-green-700 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >

            {hospitals.map((hospital) => (
              <TouchableOpacity
                key={hospital.id}
                style={tw`w-[${screenWidth - 150}px] h-40 rounded-3xl overflow-hidden mr-6 shadow-sm`}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('HospitalDetailsScreen', { id: hospital.id, name: hospital.name, location: hospital.location, image: hospital.image })}
              >
                <Image
                  source={require('../../assets/images/Logo-medicover.png')}
                  style={tw`w-full h-full absolute top-0 left-0 bg-white`}
                  resizeMode="cover"
                />

                <View style={tw`absolute bottom-0 left-0 right-0 bg-black/50 py-1.5 px-2`}>
                  <Text style={tw`text-sm font-bold text-white`}>{hospital.name}</Text>
                  <View style={tw`flex-row items-center mt-0.5`}>
                    <MapPin size={10} color="#bbf7d0" />
                    <Text style={tw`text-xs text-green-100 ml-1`}>{hospital.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}



          </ScrollView>
        </View> */}

        {/* Explore Pharmacies */}
        {/* <View style={tw`mt-6 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Nearby Pharmacies
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllPharmacies')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-green-700 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >
            {pharmacies.map((pharmacy) => (
              <TouchableOpacity
                key={pharmacy.id}
                style={tw`w-[${screenWidth - 150}px] h-40 rounded-3xl overflow-hidden mr-6 shadow-sm`}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('PharmacyDetailsScreen', { id: pharmacy.id, name: pharmacy.name, location: pharmacy.location, image: pharmacy.image })}
              >
                <Image
                  source={require('../Images/medpluse1.jpg')}
                  style={tw`w-full h-full absolute top-0 left-0`}
                  resizeMode="cover"
                />
                <View style={tw`absolute bottom-0 left-0 right-0 bg-black/50 py-1.5 px-2`}>
                  <Text style={tw`text-sm font-bold text-white`}>{pharmacy.name}</Text>
                  <View style={tw`flex-row items-center mt-0.5`}>
                    <MapPin size={12} color="#bbf7d0" />
                    <Text style={tw`text-xs text-green-100 ml-1`}>{pharmacy.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}

        {/* Bottom Banners */}
        {/* <View style={tw`mt-6 px-6`}>

          <View style={tw`flex-row justify-between items-center mb-2`}>
            <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
              Special Offers
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AllOffersScreen')}
              activeOpacity={0.7}
            >
              <Text style={tw`text-xs text-green-700 font-semibold py-2 px-2`}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2`}
          >
            {bottomBanners.map((imgSrc, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={tw`w-70 h-30 rounded-3xl overflow-hidden mr-4 shadow-sm`}
              >
                <Image
                  source={imgSrc}
                  style={tw`w-full h-full rounded-3xl`}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>

      {/* Floating Action Chat Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AIPatientChat')}
        activeOpacity={0.85}
        style={[
          tw`absolute justify-center items-center bg-[#3766D2] rounded-full`,
          {
            width: 56,
            height: 56,
            right: 20,
            bottom: 86,
            shadowColor: '#3766D2',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }
        ]}
      >
        <Svg width={24} height={24} viewBox="28.33 24.33 23.33 23.33">
          <Path
            d="M33 38.3334H42.3333V36H33V38.3334ZM33 34.8334H47V32.5H33V34.8334ZM33 31.3334H47V29H33V31.3334ZM28.3333 47.6667V26.6667C28.3333 26.025 28.5618 25.4757 29.0188 25.0188C29.4757 24.5618 30.025 24.3334 30.6667 24.3334H49.3333C49.975 24.3334 50.5243 24.5618 50.9813 25.0188C51.4382 25.4757 51.6667 26.025 51.6667 26.6667V40.6667C51.6667 41.3084 51.4382 41.8577 50.9813 42.3146C50.5243 42.7716 49.975 43 49.3333 43H33L28.3333 47.6667ZM32.0083 40.6667H49.3333V26.6667H30.6667V41.9792L32.0083 40.6667ZM30.6667 40.6667V26.6667V40.6667Z"
            fill="white"
          />
        </Svg>
      </TouchableOpacity>
    </SafeAreaView>

  );

};

export default HomeScreen;