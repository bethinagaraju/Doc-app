import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, Video, ChevronRight } from 'lucide-react-native';
import tw from 'twrnc';
import ProfileTopBar from '../components/ProfileTopBar';

export type RootStackParamList = {
  ConsultOptionsScreen: { specialty?: string };
  Doctors: { specialty: string; mode: string };
};

const FALLBACK_SPECIALTY = 'General Consultation';

type ConsultOptionsScreenRouteProp = RouteProp<RootStackParamList, 'ConsultOptionsScreen'>;
type ConsultOptionsScreenNavProp = NavigationProp<RootStackParamList, 'ConsultOptionsScreen'>;

const ConsultOptionsScreen = () => {
  const navigation = useNavigation<ConsultOptionsScreenNavProp>();
  const route = useRoute<ConsultOptionsScreenRouteProp>();
  const specialty = route.params?.specialty || FALLBACK_SPECIALTY;

  const handleOptionPress = (mode: string) => {
    const standardMode = mode === 'Clinic' ? 'inclinic' : mode.toLowerCase();
    navigation.navigate('Doctors', { specialty, mode: standardMode });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-50`}>
      <ProfileTopBar title="Consultation Options" />
      {/* Off-white background for contrast against white cards */}
      <View style={tw`flex-1 bg-gray-50 px-4 pt-6`}>

        {/* Header Section */}
        <View style={tw`mb-6 px-1`}>
          <Text style={tw`text-xl font-bold text-gray-900 mb-1`}>
            {specialty}
          </Text>
          <Text style={tw`text-sm text-gray-500`}>
            How would you like to consult the doctor?
          </Text>
        </View>

        {/* In-Clinic Card */}
        <TouchableOpacity
          style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex-row items-center shadow-sm`}
          onPress={() => handleOptionPress('Clinic')}
          activeOpacity={0.7}
        >
          {/* Practo-style soft icon container */}
          <View style={tw`bg-blue-50 rounded-full w-14 h-14 items-center justify-center mr-4`}>
            <Home size={24} color="#4F46E5" />
          </View>

          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-base font-bold text-gray-900 mb-1`}>
              In-Clinic Consultation
            </Text>
            <Text style={tw`text-sm text-gray-500`}>
              Visit the doctor in person at the clinic or hospital
            </Text>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Video Consultation Card */}
        <TouchableOpacity
          style={tw`bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex-row items-center shadow-sm`}
          onPress={() => handleOptionPress('Video')}
          activeOpacity={0.7}
        >
          <View style={tw`bg-purple-50 rounded-full w-14 h-14 items-center justify-center mr-4`}>
            <Video size={24} color="#9333EA" />
          </View>

          <View style={tw`flex-1 pr-2`}>
            <Text style={tw`text-base font-bold text-gray-900 mb-1`}>
              Video Consultation
            </Text>
            <Text style={tw`text-sm text-gray-500`}>
              Consult with a doctor online via a secure video call
            </Text>
          </View>

          <ChevronRight size={20} color="#9CA3AF" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

export default ConsultOptionsScreen;