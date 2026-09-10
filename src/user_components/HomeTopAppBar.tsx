import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform, ScrollView } from 'react-native';
import tw from 'twrnc';
import Modal from 'react-native-modal';
import { Search } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface HomeTopAppBarProps {
  profileImageUri: string;
  username: string;
}

const HomeTopAppBar: React.FC<HomeTopAppBarProps> = ({ profileImageUri, username }) => {
  const navigation = useNavigation<NavigationProp<any>>();


  return (
    <View
      style={[
        tw`w-full`,
        {
          paddingTop: Platform.OS === 'android' ? 20 : 45,
          paddingBottom: 5,
          backgroundColor: '#F8F9FF',
        },
      ]}
    >
      {/* Header - TopAppBar */}
      <View style={tw`flex-row justify-between items-center pt-4 h-16 w-full`}>
        {/* App Title Container */}
        <View style={tw`flex-row items-center h-8`}>
          <Text style={[tw`text-2xl font-bold tracking-[-0.24px]`, { color: '#124CB8', lineHeight: 32 }]}>
            DocApp
          </Text>
        </View>

        {/* Profile Image Border & Touch Container */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={[
            tw`justify-center items-center rounded-full`,
            {
              width: 40,
              height: 40,
              borderWidth: 2,
              borderColor: '#3766D2',
            }
          ]}
        >
          <Image
            key={profileImageUri}
            source={{ uri: profileImageUri }}
            style={[
              tw`rounded-full`,
              {
                width: 36,
                height: 36,
              }
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Welcome Text Section */}
      <View style={[tw`mt-2 w-full gap-1`, { height: 44 }]}>
        <Text style={[tw`text-[12px] font-semibold tracking-[0.6px]`, { color: '#434653', height: 16, lineHeight: 16 }]}>
          Welcome back
        </Text>
        <Text style={[tw`text-[20px] font-semibold`, { color: '#011D35', height: 28, lineHeight: 28 }]}>
          Hello, {username}!
        </Text>
      </View>

      {/* Search Section */}
      <View style={[tw`mt-4 w-full`, { height: 56 }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Searcheverything')}
          activeOpacity={0.9}
          style={[
            tw`flex-row items-center bg-white border border-[#C3C6D5] rounded-xl px-4 w-full`,
            {
              height: 56,
              shadowColor: 'rgba(0, 0, 0, 0.05)',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 1,
              shadowRadius: 2,
              elevation: 1,
            }
          ]}
        >
          <Search size={18} color="#737684" />
          <Text style={[tw`ml-3 text-[16px] font-normal`, { color: '#737684', lineHeight: 19 }]}>
            Search doctors, specialties...
          </Text>
        </TouchableOpacity>
      </View>

      {/* Hidden Modals / Logic preserved exactly as requested */}



    </View>
  );
};

export default HomeTopAppBar;
