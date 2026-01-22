import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

// Define your stack param list for navigation typing
export type RootStackParamList = {
  VideoConsultationScreen: { roomId?: string };
  // ...other routes
};

type VideoConsultationScreenRouteProp = RouteProp<RootStackParamList, 'VideoConsultationScreen'>;
type VideoConsultationScreenNavProp = NavigationProp<RootStackParamList, 'VideoConsultationScreen'>;

const VideoConsultationScreen = () => {
  const route = useRoute<VideoConsultationScreenRouteProp>();
  const navigation = useNavigation<VideoConsultationScreenNavProp>();
  const { roomId } = route.params || {};

  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center p-5`}>
      <Text style={tw`text-2xl font-bold mb-3`}>Video Call Room</Text>
      <Text style={tw`text-base mb-7`}>Room ID: {roomId}</Text>

      <View
        style={tw`w-full h-75 rounded-xl border-2 border-green-300 justify-center items-center bg-green-50 mb-7`}
      >
        <Text style={tw`text-green-800`}>Video call UI will be here</Text>
      </View>

      <TouchableOpacity
        style={tw`bg-green-600 py-3 px-10 rounded-full`}
        onPress={() => navigation.goBack()}
      >
        <Text style={tw`text-white text-lg font-semibold`}>End Call</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VideoConsultationScreen;