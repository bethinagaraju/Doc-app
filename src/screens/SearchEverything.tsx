import React, { useState } from 'react';
import {
  View, Text, TextInput, Pressable, FlatList, Modal, TouchableOpacity, Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import {
  ArrowLeft,
  Search,
  MapPin,
  User,
  CalendarCheck,
  FlaskConical,
  ShoppingBag,
  FileText,
  Settings,
  HelpCircle,
  Stethoscope,
} from 'lucide-react-native';

// Define a type for your search items
interface SearchItem {
  title: string;
  type: string;
  icon: React.ReactElement;
  action: () => void;
}

const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [showLocationModal, setShowLocationModal] = useState(false);

  const allSearchOptions: SearchItem[] = [
    { title: 'Find Doctors', type: 'Service', icon: <Stethoscope size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Doctors') },
    { title: 'Book Appointment', type: 'Service', icon: <CalendarCheck size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Appointments') },
    { title: 'Lab Tests', type: 'Service', icon: <FlaskConical size={20} color="#202b6d" />, action: () => (navigation as any).navigate('LabTestsList') },
    { title: 'Lab Test Categories', type: 'Service', icon: <FlaskConical size={20} color="#202b6d" />, action: () => (navigation as any).navigate('LabTestCategoriesScreen') },
    { title: 'Pharmacy', type: 'Service', icon: <ShoppingBag size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Pharmacy') },
    { title: 'Pharmacy Test Categories', type: 'Service', icon: <ShoppingBag size={20} color="#202b6d" />, action: () => (navigation as any).navigate('pharmacytestcategories') },
    { title: 'Medical Records', type: 'Service', icon: <FileText size={20} color="#202b6d" />, action: () => (navigation as any).navigate('MedicalRecords') },
    { title: 'All Hospitals', type: 'Service', icon: <FileText size={20} color="#202b6d" />, action: () => (navigation as any).navigate('AllHospitals') },
    { title: 'All Pharmacies', type: 'Service', icon: <FileText size={20} color="#202b6d" />, action: () => (navigation as any).navigate('AllPharmacies') },
    { title: 'All Specialties', type: 'Service', icon: <FileText size={20} color="#202b6d" />, action: () => (navigation as any).navigate('AllSpecialtiesScreen') },
    { title: 'Consult Options', type: 'Service', icon: <Stethoscope size={20} color="#202b6d" />, action: () => (navigation as any).navigate('ConsultOptionsScreen') },
    { title: 'Video Consultation', type: 'Service', icon: <Stethoscope size={20} color="#202b6d" />, action: () => (navigation as any).navigate('VideoConsultationScreen') },
    { title: 'Video Call', type: 'Service', icon: <Stethoscope size={20} color="#202b6d" />, action: () => (navigation as any).navigate('VideoCall') },
    { title: 'Appointment Success', type: 'Service', icon: <CalendarCheck size={20} color="#202b6d" />, action: () => (navigation as any).navigate('AppointmentSuccess') },
    { title: 'Profile', type: 'Account', icon: <User size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Profile') },
    { title: 'Edit Profile', type: 'Account', icon: <User size={20} color="#202b6d" />, action: () => (navigation as any).navigate('EditProfilePage') },
    { title: 'Personal Details', type: 'Account', icon: <User size={20} color="#202b6d" />, action: () => (navigation as any).navigate('PersonalDetails') },
    { title: 'Payment Methods', type: 'Account', icon: <User size={20} color="#202b6d" />, action: () => (navigation as any).navigate('PaymentMethods') },
    { title: 'Settings', type: 'Account', icon: <Settings size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Settings') },
    { title: 'Privacy & Security', type: 'Account', icon: <Settings size={20} color="#202b6d" />, action: () => (navigation as any).navigate('PrivacySecurity') },
    { title: 'Notification', type: 'Account', icon: <Settings size={20} color="#202b6d" />, action: () => (navigation as any).navigate('Notification') },
    { title: 'Help Center', type: 'Support', icon: <HelpCircle size={20} color="#202b6d" />, action: () => (navigation as any).navigate('HelpCenter') },
    { title: 'Emergency Services', type: 'Support', icon: <HelpCircle size={20} color="#202b6d" />, action: () => (navigation as any).navigate('EmergencyServices') }

    // ...add more as needed
  ];

  const clearAll = () => setSearchHistory([]);
  const removeItem = (index: number) =>
    setSearchHistory(prev => prev.filter((_, i) => i !== index));

  const filteredResults = allSearchOptions.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const onResultSelect = (item: SearchItem) => {
    setSearchHistory(prev => {
      const exists = prev.find(i => i.title === item.title);
      if (exists) return prev;
      return [item, ...prev];
    });
    setSearchText('');
    Keyboard.dismiss();
    if (item.action) item.action();
  };

  return (
    <View style={tw`flex-1 bg-green-50`}>
      {/* Safe area and header container */}
      <View style={tw`bg-green-50 pt-12 px-4 shadow-sm`}>
        {/* Header */}
        <View style={tw`flex-row items-center justify-between mb-4`}>
          <View style={tw`flex-row items-center flex-1`}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={tw`p-2 mr-3`}
            >
              <ArrowLeft size={24} color="#202b6d" />
            </Pressable>
            <Pressable
              onPress={() => setShowLocationModal(true)}
              style={tw`flex-row items-center bg-green-100 px-3 py-1.5 rounded-full max-w-[140px]`}
            >
              <MapPin size={16} color="#202b6d" />
              <Text style={tw`ml-1 font-medium text-[#202b6d] text-sm`} numberOfLines={1}>
                {selectedLocation}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Search Bar */}
        <View style={tw`mb-3`}>
          <View style={tw`flex-row items-center bg-green-100 rounded-lg px-3 py-2.5`}>
            <Search size={18} color="#666" />
            <TextInput
              placeholder="Search for doctors, services, labs..."
              placeholderTextColor="#666"
              style={tw`ml-2 flex-1 text-sm text-green-800`}
              value={searchText}
              onChangeText={setSearchText}
              returnKeyType="search"
            />
          </View>
        </View>
      </View>

      {/* Search Results / History */}
      <View style={tw`flex-1 px-4 bg-green-50`}>
        <View style={tw`mt-6`}> {/* Results section */}
          {(searchText.length > 0 ? filteredResults : searchHistory).length > 0 && (
            <>
              <View style={tw`flex-row justify-between mb-2`}> {/* Section title */}
                <Text style={tw`text-green-800 font-semibold`}>{searchText.length > 0 ? 'Results' : 'Recent Searches'}</Text>
                {searchText.length === 0 && (
                  <Pressable onPress={clearAll}>
                    <Text style={tw`text-green-600 text-sm font-semibold`}>CLEAR</Text>
                  </Pressable>
                )}
              </View>

              <FlatList
                data={searchText.length > 0 ? filteredResults : searchHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    onPress={() => onResultSelect(item)}
                    style={tw`flex-row items-center justify-between py-3 border-b border-green-100 bg-green-50 rounded-lg px-2 mb-1`}
                  >
                    <View style={tw`flex-row items-start`}>
                      {item.icon}
                      <View style={tw`ml-3`}>
                        <Text style={tw`text-green-900 font-semibold text-base`}>{item.title}</Text>
                        <Text style={tw`text-xs text-green-600 mt-0.5`}>{item.type}</Text>
                      </View>
                    </View>
                    {searchText.length === 0 && (
                      <Pressable onPress={() => removeItem(index)}>
                        {/* You may want to use a Lucide icon here for consistency */}
                        <Text style={tw`text-lg text-green-400`}>×</Text>
                      </Pressable>
                    )}
                  </Pressable>
                )}
              />
            </>
          )}
          {searchText.length > 0 && filteredResults.length === 0 && (
            <Text style={tw`text-center text-green-400 mt-10`}>No results found. Try another search.</Text>
          )}
        </View>

        {/* Location Picker Modal */}
        <Modal visible={showLocationModal} transparent animationType="slide">
          <View style={tw`flex-1 justify-end bg-green-900/10`}>
            <View style={tw`bg-green-50 rounded-t-2xl p-4`}>
              <Text style={tw`text-lg font-semibold mb-4`}>Select Location</Text>
              {locations.map(loc => (
                <TouchableOpacity
                  key={loc}
                  onPress={() => {
                    setSelectedLocation(loc);
                    setShowLocationModal(false);
                  }}
                  style={tw`py-2`}
                >
                  <Text style={tw`text-base text-green-800`}>{loc}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowLocationModal(false)} style={tw`mt-4`}>
                <Text style={tw`text-center text-green-600 font-semibold`}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default SearchScreen;
