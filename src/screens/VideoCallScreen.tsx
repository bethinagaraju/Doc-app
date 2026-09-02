import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import VideoCall from './(tabs)/VideoCall';
import { useUser } from './contexts/UserContext';

export type RootStackParamList = {
  VideoCallScreen: { roomId?: string };
};

type VideoCallScreenRouteProp = RouteProp<RootStackParamList, 'VideoCallScreen'>;

const VideoCallScreen = () => {
  const route = useRoute<VideoCallScreenRouteProp>();
  const { roomId } = route.params || {};
  const { user } = useUser();
  
  const role = user?.role === 'doctor' ? 'doctor' : 'patient';

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        <VideoCall
          embeddedRole={role}
          embeddedApptId={roomId ? String(roomId) : ''}
        />
      </View>
    </SafeAreaView>
  );
};

export default VideoCallScreen;