import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const AvailabilityScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  return (
    <View style={tw`flex-1 bg-[#f8fafc]`}>
      <DoctorHeader title="Consultation Hours" showSettings showNotifications />
      <ScrollView contentContainerStyle={tw`p-4 pb-10`}> 
        <Text style={tw`text-2xl font-bold text-center`}>UPGRADE</Text>
      </ScrollView>
    </View>
  );
};

export default AvailabilityScreen;


