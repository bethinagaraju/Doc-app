
import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';
import VideoCall from './VideoCall';

type RootStackParamList = {
  Wallet: undefined;
};
type NavigationProps = NavigationProp<RootStackParamList>;

const PaymentMethods: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleSave = () => {
    // Save payment method logic
  };

  return (
    <PageLayout sectionTitle="Payment Options" title="Payment Methodses">
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <View>
        <VideoCall />
      </View>

      {/* <View style={tw`flex-1 bg-green-50 p-4`}>
        <Text style={tw`text-xl font-bold text-green-900 mb-2`}>Payment Methods</Text>
        <Text style={tw`text-sm text-green-800 mb-1`}>Card Number</Text>
        <TextInput style={tw`bg-green-100 rounded-lg px-4 py-2 text-base border border-green-200 text-green-800 mb-2`} placeholder="Enter card number" placeholderTextColor="#6ee7b7" />
        <Text style={tw`text-sm text-green-800 mb-1`}>Expiry Date</Text>
        <TextInput style={tw`bg-green-100 rounded-lg px-4 py-2 text-base border border-green-200 text-green-800 mb-2`} placeholder="MM/YY" placeholderTextColor="#6ee7b7" />
        <Text style={tw`text-sm text-green-800 mb-1`}>CVV</Text>
        <TextInput style={tw`bg-green-100 rounded-lg px-4 py-2 text-base border border-green-200 text-green-800 mb-4`} placeholder="CVV" placeholderTextColor="#6ee7b7" secureTextEntry />
        <TouchableOpacity style={tw`bg-green-600 py-3 rounded-lg mt-4`} onPress={handleSave}>
          <Text style={tw`text-base text-white text-center`}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-green-50 px-4 py-4 flex-row justify-between items-center mt-4`} onPress={() => navigation.navigate('Wallet')} accessibilityRole="button">
          <Text style={tw`text-green-800 text-base`}>Go to Wallet</Text>
        </TouchableOpacity> */}

       
      {/* </View> */}
    </PageLayout>
  );
};

export default PaymentMethods;
