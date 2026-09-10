

import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Calendar, FileText, User } from 'lucide-react-native';
import tw from 'twrnc';

const Footer = () => {
  const navigation = useNavigation<any>();
  const state = useNavigationState(state => state);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Scale icons by 40% on tablets (768px+)
  const isTablet = width >= 768;
  const iconScale = isTablet ? 1.4 : 1;

  const getActiveRouteName = (navState: any): string => {
    if (!navState) return 'Home';
    const route = navState.routes[navState.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  const currentRoute = getActiveRouteName(state);

  const getIsActive = (tabRoute: string) => {
    if (tabRoute === 'Home') {
      return currentRoute === 'Home' || currentRoute === 'index' || currentRoute === 'TabsLayout';
    }
    return currentRoute === tabRoute;
  };

  const tabs = [
    {
      name: 'Home',
      route: 'Home',
      icon: Home,
      size: 16,
    },
    {
      name: 'Appointments',
      route: 'Appointments',
      icon: Calendar,
      size: 18,
    },
    {
      name: 'Records',
      route: 'MedicalRecords',
      icon: FileText,
      size: 16,
    },
    {
      name: 'Profile',
      route: 'Profile',
      icon: User,
      size: 16,
    },
  ];

  return (
    <View
      style={[
        tw`absolute bottom-0 self-center bg-[#E4EFFF] rounded-t-xl md:rounded-t-3xl flex-row items-center justify-around px-2 md:px-8 z-10 w-full max-w-[800px]`,
        {
          height: (isTablet ? 84 : 68) + insets.bottom,
          paddingBottom: insets.bottom,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 15,
          elevation: 10,
        }
      ]}
    >
      {tabs.map((tab) => {
        const isActive = getIsActive(tab.route);
        const IconComponent = tab.icon;

        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate(tab.route);
            }}
            style={tw`flex-1 flex-col justify-center items-center py-1 mx-1 md:mx-2 ${isActive ? 'bg-[#3766D2] rounded-full h-[42px] md:h-[54px]' : 'h-[44px] md:h-[54px]'
              }`}
          >
            <IconComponent
              size={tab.size * iconScale}
              color={isActive ? '#EBEEFF' : '#3F4752'}
            />
            <Text
              style={tw`text-[12px] md:text-[14px] font-semibold tracking-[0.6px] mt-0.5 md:mt-1 ${isActive ? 'text-[#EBEEFF]' : 'text-[#3F4752]'
                }`}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;