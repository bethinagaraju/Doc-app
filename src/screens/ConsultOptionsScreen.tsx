import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Home, Video, Stethoscope } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../components/PageLayout';

export type RootStackParamList = {
  ConsultOptionsScreen: { specialty?: string };
  Doctors: { specialty: string; mode: string };
};

const FALLBACK_SPECIALTY = 'General Consultation';
const CARD_HEIGHT = 180;

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
    <PageLayout title="Consultation Options" headerBackgroundColor="#219F4D">
      <View style={tw`flex-1 px-4 py-8 justify-center`}>
        <Text style={tw`text-2xl font-bold text-green-900 mb-7 text-center`}>
          {specialty}
        </Text>

        {/* In-Clinic */}
        <TouchableOpacity
          style={[
            tw`bg-green-100 border border-green-300 rounded-[28px] flex-row items-center px-8 mb-7`,
            {
              height: CARD_HEIGHT,
              shadowColor: '#22C55E',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            },
          ]}
          onPress={() => handleOptionPress('Clinic')}
          activeOpacity={0.9}
        >
          <View style={tw`bg-green-200 rounded-full w-16 h-16 items-center justify-center mr-7`}>
            <Home size={30} color="#15803D" strokeWidth={2} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[22px] font-bold text-green-900 mb-1`}>
              Book In-clinic Appointment
            </Text>
            <Text style={tw`text-base text-green-700`}>
              Book a {specialty.toLowerCase()} in person in Hyderabad
            </Text>
          </View>
        </TouchableOpacity>

        {/* Video Consultation */}
        <TouchableOpacity
          style={[
            tw`bg-green-100 border border-green-300 rounded-[28px] flex-row items-center px-8`,
            {
              height: CARD_HEIGHT,
              shadowColor: '#22C55E',
              shadowOpacity: 0.15,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 5,
            },
          ]}
          onPress={() => handleOptionPress('Video')}
          activeOpacity={0.9}
        >
          <View style={tw`bg-green-200 rounded-full w-16 h-16 items-center justify-center mr-7`}>
            <Video size={30} color="#15803D" strokeWidth={2} />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[22px] font-bold text-green-900 mb-1`}>
              Book Video Consultation
            </Text>
            <Text style={tw`text-base text-green-700`}>
              Consult with a {specialty.toLowerCase()} online now!
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </PageLayout>
  );
};

export default ConsultOptionsScreen;
