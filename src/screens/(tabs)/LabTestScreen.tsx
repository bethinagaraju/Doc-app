import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, NavigationProp, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

type RootStackParamList = {
  LabTest: { test: { id: string; name: string; description: string; price: string } };
};

const LabTestScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LabTest'>>();
  const { test } = route.params;

      return (
        <View style={tw`flex-1 bg-green-50`}>
          <PageHeader
            title={test.name}
            backgroundColor="#16a34a"
            textColor="#fff"
            onBackPress={() => navigation.goBack()}
          />
          <View style={tw`flex-1 justify-center items-center px-6`}>
            <View style={tw`bg-green-50 rounded-3xl shadow-lg p-7 w-full max-w-xl items-center`}>
              <Text style={tw`text-2xl font-bold text-green-800 mb-2 text-center`}>{test.name}</Text>
              <Text style={tw`text-base text-green-700 mb-4 text-center`}>{test.description}</Text>
              <Text style={tw`text-xl font-bold text-green-600 mb-6`}>{test.price}</Text>
              <TouchableOpacity
                style={tw`bg-green-600 px-8 py-3 rounded-xl`}
                activeOpacity={0.85}
                onPress={() => { console.log('handle booking or add to cart here ') }}
              >
                <Text style={tw`text-white text-lg font-semibold`}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
};

export default LabTestScreen;
