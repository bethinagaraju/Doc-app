// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { Settings, Bell, ArrowLeft } from 'lucide-react-native';
// import tw from 'twrnc';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { DoctorStackParamList } from '../types/navigation';

// type DoctorHeaderProps = {
//   title: string;
//   showSettings?: boolean;
//   showNotifications?: boolean;
//   showDoctorInfo?: boolean;
// };

// const DoctorHeader: React.FC<DoctorHeaderProps> = ({
//   title,
//   showSettings = true,
//   showNotifications = true,
//   showDoctorInfo = false,
// }) => {
//   const navigation = useNavigation<NativeStackNavigationProp<DoctorStackParamList>>();
  
//   const normalizedTitle = title?.toString().trim().toLowerCase();
//   const showBack = normalizedTitle !== 'dashboard' && normalizedTitle !== 'home';
//   return (
//     <View style={tw`bg-[#059669] px-4 pt-12 pb-3`}> 
//       <View style={tw`flex-row items-center justify-between`}>
//         <View style={tw`flex-row items-center`}>
//           {showBack && (
//             <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`} accessibilityLabel="Back">
//               <ArrowLeft size={24} color="white" />
//             </TouchableOpacity>
//           )}
//           {normalizedTitle === 'dashboard' && (
//             <Text style={tw`text-white text-xl font-bold`}>DOCTO</Text>
//           )}
//           {!['dashboard', 'online reach', 'patient stories'].includes(normalizedTitle) && (
//             <Text style={tw`text-white text-lg font-semibold ml-2`}>{title}</Text>
//           )}
//         </View>
//         <View style={tw`flex-row items-center`}>
//           {showSettings && (
//             <TouchableOpacity style={tw`mr-4`} onPress={() => navigation.navigate('DoctorSettings')}>
//               <Settings size={24} color="white" />
//             </TouchableOpacity>
//           )}
//           {showNotifications && (
//             <TouchableOpacity onPress={() => navigation.navigate('DoctorNotifications')}>
//               <View>
//                 <Bell size={24} color="white" />
//                 <View style={tw`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full`} />
//               </View>
//             </TouchableOpacity>
//           )}
//         </View>
//       </View>
//       {showDoctorInfo && (
//         <View style={tw`mt-4 flex-row items-center`}>
//           <Image
//             source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
//             style={tw`w-12 h-12 rounded-full`}
//           />
//           <View style={tw`ml-3`}>
//             <Text style={tw`text-white text-lg font-bold`}>Dr. John Doe</Text>
//             <Text style={tw`text-[#1d9be3]`}>Cardiologist</Text>
//           </View>
//         </View>
//       )}
//     </View>
//   );
// };

// export default DoctorHeader;






import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Settings, Bell, ArrowLeft } from 'lucide-react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';

type DoctorHeaderProps = {
  title: string;
  showSettings?: boolean;
  showNotifications?: boolean;
  showDoctorInfo?: boolean;
};

type UserData = {
  username: string;
  email: string;
  role: string;
};

const DoctorHeader: React.FC<DoctorHeaderProps> = ({
  title,
  showSettings = true,
  showNotifications = true,
  showDoctorInfo = false,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<DoctorStackParamList>>();

  const normalizedTitle = title?.toString().trim().toLowerCase();
  const showBack = normalizedTitle !== 'dashboard' && normalizedTitle !== 'home';

  const [doctor, setDoctor] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to fetch doctor data');

      const result = await response.json();
      setDoctor(result.userData);
    } catch (error) {
      console.error('Error fetching doctor info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showDoctorInfo) {
      fetchDoctorData();
    }
  }, [showDoctorInfo]);

  return (
    <View style={tw`bg-[#059669] px-4 pt-12 pb-3`}>
      <View style={tw`flex-row items-center justify-between`}>
        {/* Back / Title */}
        <View style={tw`flex-row items-center`}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
              <ArrowLeft size={24} color="white" />
            </TouchableOpacity>
          )}
          {normalizedTitle === 'dashboard' ? (
            <Text style={tw`text-white text-xl font-bold`}>DOCTO</Text>
          ) : (
            <Text style={tw`text-white text-lg font-semibold ml-2`}>{title}</Text>
          )}
        </View>

        {/* Settings / Notifications */}
        <View style={tw`flex-row items-center`}>
          {showSettings && (
            <TouchableOpacity style={tw`mr-4`} onPress={() => navigation.navigate('DoctorSettings')}>
              <Settings size={24} color="white" />
            </TouchableOpacity>
          )}
          {showNotifications && (
            <TouchableOpacity onPress={() => navigation.navigate('DoctorNotifications')}>
              <View>
                <Bell size={24} color="white" />
                <View style={tw`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full`} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Doctor Info */}
      {showDoctorInfo && (
        <View style={tw`mt-4 flex-row items-center`}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View style={tw`ml-3`}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={tw`text-white text-lg font-bold`}>
                  {doctor?.username ? `Dr. ${doctor.username}` : 'Unknown Doctor'}
                </Text>
                <Text style={tw`text-[#1d9be3]`}>{doctor?.role || 'Doctor'}</Text>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DoctorHeader;
