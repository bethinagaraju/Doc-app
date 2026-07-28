import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Search, SlidersHorizontal, MapPin, Activity, Wifi, WifiOff } from 'lucide-react-native';

interface UsersearchFilterProps {
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedDepartment: string;
  setSelectedDepartment: (val: string) => void;
  cityPincodes: Record<string, string>;
  departments: string[];
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  selectedMode?: string;
  setSelectedMode?: (val: string) => void;
}

const UsersearchFilter: React.FC<UsersearchFilterProps> = ({
  selectedCity,
  setSelectedCity,
  selectedDepartment,
  setSelectedDepartment,
  cityPincodes,
  departments,
  searchQuery = '',
  setSearchQuery,
  selectedMode = '',
  setSelectedMode,
}) => {
  return (
    <View style={tw`self-center mt-4 gap-[16px]`}>
      {/* Search Input */}
      <View style={tw`bg-[#ECEEF4] rounded-[12px] h-[56px] px-4 flex-row items-center border border-[rgba(0,0,0,0.05)] shadow-sm`}>
        <Search size={18} color="#72777F" />
        <TextInput
          style={tw`flex-1 ml-3 text-[16px] text-[#72777F] font-normal`}
          placeholder="Search doctors, clinics, or symptoms..."
          placeholderTextColor="#72777F"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Horizontal Filter Chips */}
      <View style={tw`h-[46px]`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`items-center gap-2`}
        >
          {/* All Filters Button */}
          <TouchableOpacity
            onPress={() => {
              setSelectedDepartment('');
              setSelectedCity('');
            }}
            style={tw`flex-row items-center h-[38px] rounded-full gap-2 px-4 ${!selectedDepartment && !selectedCity ? 'bg-[#124CB8]' : 'bg-white border border-[rgba(114,119,127,0.1)]'
              }`}
          >
            <SlidersHorizontal size={14} color={!selectedDepartment && !selectedCity ? '#FFFFFF' : '#42474E'} />
            <Text style={tw`font-medium text-[14px] ${!selectedDepartment && !selectedCity ? 'text-white' : 'text-[#42474E]'}`}>
              All Filters
            </Text>
          </TouchableOpacity>

          {/* Online / Offline Mode */}
          {['online', 'offline'].map((mode) => {
            const isSelected = selectedMode === mode;
            const Icon = mode === 'online' ? Wifi : WifiOff;
            return (
              <TouchableOpacity
                key={mode}
                onPress={() => setSelectedMode?.(isSelected ? '' : mode)}
                style={tw`flex-row items-center h-[38px] px-4 rounded-full gap-2 ${isSelected ? 'bg-[#124CB8]' : 'bg-white border border-[rgba(114,119,127,0.1)]'}`}
              >
                <Icon size={14} color={isSelected ? '#FFFFFF' : '#42474E'} />
                <Text style={tw`font-medium text-[14px] ${isSelected ? 'text-white' : 'text-[#42474E]'}`}>
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Departments */}
          {departments.map((dep) => {
            const isSelected = selectedDepartment === dep;
            return (
              <TouchableOpacity
                key={dep}
                onPress={() => setSelectedDepartment(dep)}
                style={tw`flex-row items-center h-[38px] px-4 rounded-full gap-2 ${isSelected ? 'bg-[#124CB8]' : 'bg-white border border-[rgba(114,119,127,0.1)]'
                  }`}
              >
                <Activity size={14} color={isSelected ? '#FFFFFF' : '#42474E'} />
                <Text style={tw`font-medium text-[14px] ${isSelected ? 'text-white' : 'text-[#42474E]'}`}>
                  {dep}
                </Text>
              </TouchableOpacity>
            );
          })}

          {/* Locations */}
          {Object.keys(cityPincodes).map((city) => {
            const isSelected = selectedCity === city;
            return (
              <TouchableOpacity
                key={city}
                onPress={() => setSelectedCity(city)}
                style={tw`flex-row items-center h-[38px] px-4 rounded-full gap-2 ${isSelected ? 'bg-[#124CB8]' : 'bg-white border border-[rgba(114,119,127,0.1)]'
                  }`}
              >
                <MapPin size={14} color={isSelected ? '#FFFFFF' : '#42474E'} />
                <Text style={tw`font-medium text-[14px] ${isSelected ? 'text-white' : 'text-[#42474E]'}`}>
                  {city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default UsersearchFilter;
