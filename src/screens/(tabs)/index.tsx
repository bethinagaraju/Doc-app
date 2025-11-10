import React, { useState } from 'react';
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
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
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



import { useUser } from '../contexts/UserContext';

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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const profileImageUri = 'https://randomuser.me/api/portraits/men/4.jpg';
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'हिंदी', code: 'hi' },
    { name: 'తెలుగు', code: 'te' },
    { name: 'தமிழ்', code: 'ta' },
    { name: 'ಕನ್ನಡ', code: 'kn' },
    { name: 'മലയാളം', code: 'ml' },
    { name: 'বাংলা', code: 'bn' },
    { name: 'ગુજરાતી', code: 'gu' }
  ];

  const banners = [
    require('../../assets/images/unnamed.webp'),
    require('../../assets/images/unnamed-banner.webp'),
     require('../../assets/images/9786325ef35b05c91053c663067481ff_screen.jpg'),
    // require('../Images/Banner3.jpg'),
  ];

  const specialties = [
    { name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png') },
    { name: 'Skin & Hair', image: require('../Images/PopUpICons/spots.png') },
    { name: "Women's Health", image: require('../Images/PopUpICons/prenatal-care.png') },
    { name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png') },
    { name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png') },
    // { name: 'Child Specialist', image: require('../Images/PopUpICons/skincare.png') },
    { name: 'ENT', image: require('../Images/PopUpICons/medical.png') },
    { name: 'Mental Health', image: require('../Images/PopUpICons/brain.png') },
    { name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png') },
  ];
const cityList = [
  'Bangalore',
  'Hyderabad',
  'Delhi',
  'Mumbai',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Lucknow',
];
const [selectedLocation, setSelectedLocation] = useState('Bangalore');
const [showLocationModal, setShowLocationModal] = useState(false);

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

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);
  const bannerWidth = screenWidth - 40;

  const onBannerScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    setActiveBannerIndex(Math.round(x / bannerWidth));
  };

  const iconMap: Record<string, React.ElementType> = {
    'doctor': Stethoscope,
    'calendar': Calendar,
    'user': User,
    'pie-chart': PieChart,
    'message-circle': MessageCircle,
    // add more mappings as needed
  };

  const FeatureCard = ({
    iconName,
    iconSet = 'FontAwesome5',
    label,
    badge,
    onPress,
    image,
  }: {
    iconName?: string;
    iconSet?: string;
    label: string;
    badge?: string;
    onPress?: () => void;
    image?: any;
  }) => {
    return (
      <TouchableOpacity
        style={tw`w-[30%] mb-4 items-center justify-center`}
        onPress={onPress}
      >
        <View
          style={tw`relative bg-green-50 w-[100px] h-[100px] rounded-[30px] items-center justify-center overflow-hidden shadow-sm`}
        >
          {image ? (
            <Image
              source={image}
              style={tw`w-[80%] h-[80%]`}
              resizeMode="contain"
            />
          ) : (
            iconName && iconMap[iconName] ? (
              React.createElement(iconMap[iconName], { size: 24, color: '#FFFFFF' })
            ) : null
          )}
          {badge && (
            <View style={tw`absolute top-0 right-0 bg-emerald-500 rounded-full px-2 py-1`}>
              <Text style={tw`text-white text-xs text-center`}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={tw`text-xs mt-2 text-center text-gray-600 font-medium`}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <ScrollView
        contentContainerStyle={tw`pb-20`}
        showsVerticalScrollIndicator={false}
      >
<View
  style={[
    tw`px-4 pb-4 bg-green-600`,
    {
      borderBottomLeftRadius: 35,
      borderBottomRightRadius: 35,
      paddingTop: Platform.OS === 'android' ? 35 : 60,
      height: Platform.OS === 'android' ? 170 : 180,
    },
  ]}
>
  <View style={tw`h-full justify-between`}>
    {/* Top Row: Profile | Location | Language & Notification */}
    <View style={tw`flex-row items-center justify-between mt-3`}>
      {/* Profile Image */}
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={{ uri: profileImageUri }}
          style={tw`w-14 h-14 rounded-full border-2 border-green-200`}
        />
      </TouchableOpacity>

      {/* Location */}
      <TouchableOpacity
        onPress={() => setShowLocationModal(true)}
        style={tw`flex-row items-center mx-3`}
      >
        <MapPin size={16} color="white" />
        <Text style={tw`ml-1 text-white font-medium text-sm`}>
          {selectedLocation}
        </Text>
        <ChevronDown size={16} color="white" style={tw`ml-1`} />
      </TouchableOpacity>
      <Modal isVisible={showLocationModal} onBackdropPress={() => setShowLocationModal(false)}>
        <View style={tw`bg-white p-6 rounded-2xl items-center`}>
          <Text style={tw`text-base font-semibold mb-2`}>Select your city</Text>
          {cityList.map((city) => (
            <TouchableOpacity
              key={city}
              style={tw`py-2 w-full items-center`}
              onPress={() => {
                setSelectedLocation(city);
                setShowLocationModal(false);
              }}
            >
              <Text style={tw`text-lg ${selectedLocation === city ? 'text-green-700 font-bold' : 'text-green-800'}`}>{city}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={tw`mt-4`} onPress={() => setShowLocationModal(false)}>
            <Text style={tw`text-green-700 font-bold`}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>      
      
      <View style={tw`flex-row items-center`}>
        <TouchableOpacity 
          onPress={() => setShowLanguageModal(true)} 
          style={tw`flex-row items-center`}
        >
          <Globe size={18} color="white" />
          <Text style={tw`ml-1 text-white text-xs`}>{selectedLanguage.slice(0, 2)}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')} style={tw`ml-3`}>
            <View>
              <Bell size={20} color="white" />
              <View style={tw`absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500`} />
            </View>
        </TouchableOpacity>
      </View>

      {/* Language Selection Modal */}
      <Modal 
        isVisible={showLanguageModal} 
        onBackdropPress={() => setShowLanguageModal(false)}
        style={tw`m-0 justify-end`}
      >
        <View style={tw`bg-white rounded-t-3xl`}>
          <View style={tw`p-4 border-b border-green-100`}>
            <View style={tw`w-12 h-1 bg-green-200 rounded-full mx-auto mb-4`} />
            <Text style={tw`text-xl font-bold text-center`}>Select Language</Text>
          </View>
          <ScrollView style={tw`max-h-[70%]`}>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={tw`flex-row items-center justify-between px-6 py-4 border-b border-green-50`}
                onPress={() => {
                  setSelectedLanguage(lang.name);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={tw`text-base ${selectedLanguage === lang.name ? 'text-green-700 font-bold' : 'text-green-800'}`}>
                  {lang.name}
                </Text>
                {selectedLanguage === lang.name && (
                  <View style={tw`w-6 h-6 rounded-full bg-green-600 items-center justify-center`}>
                    <Text style={tw`text-white font-bold text-sm`}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            style={tw`p-4 border-t border-green-100`}
            onPress={() => setShowLanguageModal(false)}
          >
            <Text style={tw`text-center text-green-700 font-bold text-lg`}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    {/* Search Bar */}
    <TouchableOpacity
      onPress={() => navigation.navigate('Searcheverything')}
      activeOpacity={0.9}
      style={tw`mt-4 mb-4 flex-row items-center px-4 py-2.5 bg-white rounded-full shadow-sm border border-gray-200`}
    >
      <Search size={18} color="#059669" />
      <Text style={tw`ml-3 text-green-700 text-sm`}>
        Search doctors, clinics, tests...
      </Text>
    </TouchableOpacity>
  </View>
</View>

  {/* Quick Actions Grid - Images only */}
<View style={tw`flex-row flex-wrap justify-between mx-4 mt-6 gap-2`}>
  {/* Online Consultation */}
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
    {/* <View style={tw`absolute bottom-2 left-2`}>
      <Text style={tw`text-white font-bold text-lg`}>Video Consult</Text>
      <Text style={tw`text-white text-sm`}>Consult Online Now</Text>
    </View> */}
  </TouchableOpacity>

  {/* In-Clinic Consultation */}
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
    {/* <View style={tw`absolute bottom-2 left-2`}>
      <Text style={tw`text-white font-bold text-lg`}>Visit Clinic</Text>
      <Text style={tw`text-white text-sm`}>Book Appointment</Text>
    </View> */}
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
</View>


        {/* Banner Section */}
        <View style={tw`mt-6`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onBannerScroll}
            scrollEventThrottle={16}
            snapToInterval={bannerWidth}
            decelerationRate="fast"
            contentContainerStyle={tw`px-4`}
          >
            {banners.map((source, index) => (
              <View
                key={index}
                style={tw`w-[${screenWidth - 32}px] h-40 rounded-3xl overflow-hidden mr-4 shadow-sm`}
              >
                <Image
                  source={typeof source === 'string' ? { uri: source } : source}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>
          <View style={tw`flex-row justify-center mt-3`}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={tw`w-2 h-2 bg-gray-300 rounded-full mx-1 ${
                  activeBannerIndex === index ? 'bg-green-800 w-4 shadow-sm' : ''
                }`}
              />
            ))}
          </View>
        </View>

        {/* Specialties */}
        <View style={tw`mt-6 px-6`}>
          <Text style={tw`text-lg font-semibold text-gray-900 flex-1 text-left`}>
            Find a Doctor for your Health Problem
          </Text>
          <View style={tw`mt-2`}>
            <View style={tw`flex-row flex-wrap justify-between`}>
              {specialties.slice(0, 9).map((item, index) => (
                <FeatureCard
                  key={index}
                  label={item.name}
                  image={item.image}
                  onPress={() =>
                    navigation.navigate('ConsultOptionsScreen', { specialty: item.name })
                  }
                />
              ))}
              <TouchableOpacity
                style={tw`w-[30%] mb-4 items-center`} 
                onPress={() => navigation.navigate('AllSpecialtiesScreen')}
              >
                <View style={tw`bg-green-100 w-[100px] h-[100px] rounded-[30px] items-center justify-center`}>
                  <ChevronRight size={18} color="#059669" />
                </View>
                <Text style={tw`text-xs mt-2 text-center text-green-700 font-bold`}>
                  View More
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explore Hospitals */}
        <View style={tw`mt-6 px-6`}>
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

            {/* <Image
            source={{ uri: hospital.image }}
            style={tw`w-full h-full absolute top-0 left-0 bg-white`}
            resizeMode="cover"
          /> */}
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
        </View>

        {/* Explore Pharmacies */}
        <View style={tw`mt-6 px-6`}>
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
        </View>

        {/* Bottom Banners */}
        <View style={tw`mt-6 px-6`}>
          
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
                  style={tw`w-full h-full rounded-3xl`}f
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
 
    </SafeAreaView>

  );

};

export default HomeScreen;