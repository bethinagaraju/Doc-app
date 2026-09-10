import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShieldCheck, ShieldAlert, KeyRound } from 'lucide-react-native';
import tw from 'twrnc';
import { DoctorStackParamList } from '../types/navigation';
import DocProfileTopBar from '../components/DocProfileTopBar';
import AccountSecuritySettings from '../components/AccountSecuritySettings';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const AccountSecurityScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>
      <DocProfileTopBar />

      <ScrollView contentContainerStyle={tw`p-5 pb-28`} showsVerticalScrollIndicator={false}>
        {/* Security Overview Card */}
        <View
          style={[
            tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 p-5 mb-5 flex-row items-center gap-4`,
            {
              shadowColor: '#102A43',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 3,
            },
          ]}
        >
          <View style={tw`w-12 h-12 rounded-full bg-[#EEF4FF] items-center justify-center`}>
            <ShieldCheck size={26} color="#124CB8" />
          </View>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[17px] font-bold text-[#011D35] font-['Inter']`}>
              Security & Credentials
            </Text>
            <Text style={tw`text-[13px] text-[#434653] mt-0.5 leading-4`}>
              Manage your password and protect your doctor account with authentication.
            </Text>
          </View>
        </View>

        {/* Account Security Settings Component */}
        <AccountSecuritySettings
          onTwoFactorPress={() => { }}
        />

        {/* Security Tips */}
        <View
          style={[
            tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 p-5 mt-5`,
            {
              shadowColor: '#102A43',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 3,
            },
          ]}
        >
          <Text style={tw`text-[15px] font-bold text-[#011D35] mb-2.5`}>
            Security Best Practices
          </Text>

          <View style={tw`gap-2.5`}>
            <View style={tw`flex-row items-start gap-2.5`}>
              <KeyRound size={15} color="#124CB8" style={tw`mt-0.5`} />
              <Text style={tw`text-[13px] text-[#434653] flex-1 leading-4.5`}>
                Use a strong, unique password containing uppercase letters, numbers, and symbols.
              </Text>
            </View>

            <View style={tw`flex-row items-start gap-2.5`}>
              <ShieldAlert size={15} color="#124CB8" style={tw`mt-0.5`} />
              <Text style={tw`text-[13px] text-[#434653] flex-1 leading-4.5`}>
                Never share your login credentials or OTPs with anyone claiming to represent DocApp.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSecurityScreen;
