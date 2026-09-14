import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

const VideoConsultationScreen = () => {
  const navigation = useNavigation();

  const handleJoinCall = () => {
    Alert.alert("Joining Video Call", "This would open a video consultation session.");
    // Real implementation would go here (e.g., open WebRTC or Agora channel)
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100`}>

      {/* Top Header with Back Arrow */}
      <View style={tw`bg-green-600 p-5 pt-12`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute top-12 left-5`}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-green-200 text-base ml-8`}>Hello</Text>
        <Text style={tw`text-white text-xl font-bold ml-8`}>John Doe</Text>
      </View>

      <View style={tw`flex-1 p-5 items-center justify-start`}>
        <Text style={tw`text-2xl font-bold mt-8 mb-2 text-green-800`}>Video Consultation</Text>
        <Text style={tw`text-base text-green-500 mb-8 text-center`}>Talk to a doctor face-to-face now</Text>

        <TouchableOpacity
          style={tw`flex-row bg-green-600 p-4 rounded-3xl items-center gap-2.5 px-6`}
          onPress={handleJoinCall}
        >
          <Icon name="video" size={24} color="#fff" />
          <Text style={tw`text-white text-base`}>Join Video Call</Text>
        </TouchableOpacity>

        <View style={tw`mt-5 bg-green-100 rounded-xl p-4 w-full`}>
          <Text style={tw`text-green-800 text-sm text-center`}>
            Note: Ensure a stable internet connection before joining the call.
          </Text>
        </View>

        <View style={tw`mt-8 bg-green-50 rounded-xl p-4 w-full`}>
          <Text style={tw`font-bold text-base mb-1 text-green-800`}>Upcoming Appointment</Text>
          <Text style={tw`text-sm text-gray-600`}>Dr. Smith - 10:00 AM, May 20</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoConsultationScreen;
