import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const AppointmentsHeader = () => {
  return (
    <View style={tw`px-4 md:px-8 mt-6 gap-2 mb-2 w-full max-w-[800px] self-center`}>
      <Text
        style={tw`text-[#191C1E] font-bold text-[24px] md:text-3xl leading-tight`}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
      >
        My Appointments
      </Text>
      <Text
        style={tw`text-[#42474E] font-normal text-[14px] md:text-base leading-tight`}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        Manage your past and upcoming medical consultations.
      </Text>
    </View>
  );
};

export default AppointmentsHeader;
