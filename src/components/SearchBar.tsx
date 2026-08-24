import React from 'react';
import { View, TextInput } from 'react-native';
import tw from 'twrnc';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search doctors, clinics, or symptoms...",
}) => {
  return (
    <View style={tw`bg-[#ECEEF4] rounded-[12px] h-[56px] px-4 flex-row items-center border border-[rgba(0,0,0,0.05)] shadow-sm`}>
      <Search size={18} color="#72777F" />
      <TextInput
        style={tw`flex-1 ml-3 text-[16px] text-[#72777F] font-normal`}
        placeholder={placeholder}
        placeholderTextColor="#72777F"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
