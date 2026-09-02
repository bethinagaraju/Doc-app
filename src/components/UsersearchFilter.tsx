import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { SlidersHorizontal, MapPin, Activity, Wifi, WifiOff, X, Check, Building2 } from 'lucide-react-native';
import SearchBar from './SearchBar';

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
  resultsCount?: number;
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
  resultsCount,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'mode' | 'department' | 'location' | 'hospital'>('mode');

  const hasActiveFilters = () => {
    return !!selectedCity || !!selectedDepartment || !!selectedMode;
  };

  const handleClearAll = () => {
    setSelectedCity('');
    setSelectedDepartment('');
    setSelectedMode?.('');
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCity) count++;
    if (selectedDepartment) count++;
    if (selectedMode) count++;
    return count;
  };

  const categories = [
    { id: 'mode', title: 'Consultation Mode', icon: Wifi },
    { id: 'department', title: 'Specialization', icon: Activity },
    { id: 'location', title: 'Location', icon: MapPin },
    { id: 'hospital', title: 'Hospital', icon: Building2 },
  ] as const;

  const renderModeOptions = () => {
    const modes = [
      { id: 'online', label: 'Online', icon: Wifi },
      { id: 'offline', label: 'Offline', icon: WifiOff },
    ];

    return (
      <View style={tw`gap-3`}>
        {modes.map((m) => {
          const isSelected = selectedMode === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              onPress={() => setSelectedMode?.(isSelected ? '' : m.id)}
              style={tw`flex-row items-center justify-between p-3.5 rounded-[12px] border ${isSelected ? 'border-[#124CB8] bg-[#EFF4FF]' : 'border-[#ECEEF4] bg-white'
                }`}
              activeOpacity={0.8}
            >
              <View style={tw`flex-row items-center gap-2.5`}>
                <m.icon size={16} color={isSelected ? '#124CB8' : '#72777F'} />
                <Text style={tw`text-[14px] ${isSelected ? 'font-bold text-[#124CB8]' : 'text-[#42474E] font-medium'}`}>
                  {m.label}
                </Text>
              </View>
              {isSelected && <Check size={16} color="#124CB8" />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderDepartmentOptions = () => {
    if (!departments || departments.length === 0) {
      return <Text style={tw`text-[#72777F] text-[14px] font-medium`}>No specializations available.</Text>;
    }

    return (
      <View style={tw`gap-2.5`}>
        {departments.map((dep) => {
          const isSelected = selectedDepartment === dep;
          return (
            <TouchableOpacity
              key={dep}
              onPress={() => setSelectedDepartment(isSelected ? '' : dep)}
              style={tw`flex-row items-center justify-between p-3.5 rounded-[12px] border ${isSelected ? 'border-[#124CB8] bg-[#EFF4FF]' : 'border-[#ECEEF4] bg-white'
                }`}
              activeOpacity={0.8}
            >
              <Text style={tw`text-[14px] flex-1 mr-2 ${isSelected ? 'font-bold text-[#124CB8]' : 'text-[#42474E] font-medium'}`}>
                {dep}
              </Text>
              {isSelected && <Check size={16} color="#124CB8" />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderLocationOptions = () => {
    const locations = Object.keys(cityPincodes);
    if (locations.length === 0) {
      return <Text style={tw`text-[#72777F] text-[14px] font-medium`}>No locations available.</Text>;
    }

    return (
      <View style={tw`gap-2.5`}>
        {locations.map((city) => {
          const isSelected = selectedCity === city;
          return (
            <TouchableOpacity
              key={city}
              onPress={() => setSelectedCity(isSelected ? '' : city)}
              style={tw`flex-row items-center justify-between p-3.5 rounded-[12px] border ${isSelected ? 'border-[#124CB8] bg-[#EFF4FF]' : 'border-[#ECEEF4] bg-white'
                }`}
              activeOpacity={0.8}
            >
              <Text style={tw`text-[14px] flex-1 mr-2 ${isSelected ? 'font-bold text-[#124CB8]' : 'text-[#42474E] font-medium'}`}>
                {city}
              </Text>
              {isSelected && <Check size={16} color="#124CB8" />}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderHospitalOptions = () => {
    return (
      <View style={tw`py-8 items-center justify-center`}>
        <Building2 size={36} color="#B3B9C4" style={tw`mb-2`} />
        <Text style={tw`text-center text-[#72777F] text-[13px] px-4 font-normal`}>
          Hospital filter options will be available when integration is completed.
        </Text>
      </View>
    );
  };

  return (
    <View style={tw`w-full px-4 mt-4 gap-4`}>
      {/* Search Input */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Clean Filter Trigger Row */}
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-[16px] font-bold text-[#1A1C1E]`}>Search Filters</Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={tw`flex-row items-center bg-white border border-[rgba(114,119,127,0.15)] h-[38px] px-4 rounded-full gap-2 shadow-sm`}
          activeOpacity={0.8}
        >
          <SlidersHorizontal size={14} color="#124CB8" />
          <Text style={tw`font-semibold text-[14px] text-[#124CB8]`}>
            {hasActiveFilters() ? `Filters (${getActiveFiltersCount()})` : 'Filters'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center px-4 py-3 border-b border-[#ECEEF4]`}>
            <View style={tw`flex-row items-center gap-2`}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={tw`p-1`}>
                <X size={22} color="#1A1C1E" />
              </TouchableOpacity>
              <Text style={tw`text-[18px] font-bold text-[#1A1C1E] ml-1`}>Filters</Text>
            </View>

            <TouchableOpacity onPress={handleClearAll} style={tw`py-1 px-2`}>
              <Text style={tw`text-[14px] font-semibold text-[#124CB8]`}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Main split-screen panel */}
          <View style={tw`flex-1 flex-row`}>
            {/* Sidebar (Left panel - categories) */}
            <View style={tw`w-[38%] bg-[#F5F6FA] border-r border-[#ECEEF4]`}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (

                    <TouchableOpacity
                      key={cat.id}
                      onPress={() => setActiveCategory(cat.id)}
                      style={tw`py-4 px-3 flex-row items-center relative ${isActive ? 'bg-white' : 'bg-transparent'
                        }`}
                    >
                      {isActive && (
                        <View style={tw`absolute left-0 top-0 bottom-0 w-[4px] bg-[#124CB8]`} />
                      )}
                      <cat.icon size={16} color={isActive ? '#124CB8' : '#72777F'} style={tw`mr-2`} />
                      <Text style={tw`flex-1 text-[13px] ${isActive ? 'font-bold text-[#124CB8]' : 'font-medium text-[#42474E]'
                        }`}>
                        {cat.title}
                      </Text>
                    </TouchableOpacity>

                  );
                })}
              </ScrollView>
            </View>

            {/* Content pane (Right panel - options) */}
            <View style={tw`w-[62%] bg-white`}>
              <ScrollView contentContainerStyle={tw`p-4 pb-10`} showsVerticalScrollIndicator={true}>
                {/* Category Title */}
                <Text style={tw`text-[16px] font-bold text-[#1A1C1E] mb-4`}>
                  {categories.find((c) => c.id === activeCategory)?.title}
                </Text>

                {/* Dynamically render options */}
                {activeCategory === 'mode' && renderModeOptions()}
                {activeCategory === 'department' && renderDepartmentOptions()}
                {activeCategory === 'location' && renderLocationOptions()}
                {activeCategory === 'hospital' && renderHospitalOptions()}
              </ScrollView>
            </View>
          </View>

          {/* Footer showing results count & Apply */}
          <View style={tw`p-4 border-t border-[#ECEEF4] bg-white`}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`bg-[#124CB8] py-3.5 rounded-[12px] items-center justify-center`}
              activeOpacity={0.85}
            >
              <Text style={tw`text-white font-bold text-[16px]`}>
                {resultsCount !== undefined ? `Show ${resultsCount} results` : 'Show results'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default UsersearchFilter;
