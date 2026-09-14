import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Search } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const hospitals = [
  {
    id: '1',
    name: 'Apollo Hospital',
    location: 'Delhi, India',
    image:
      'https://images.unsplash.com/photo-1584438784894-089d6a62b8d5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Fortis Hospital',
    location: 'Bangalore, India',
    image:
      'https://images.unsplash.com/photo-1576765607929-58de7aa88033?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'AIIMS',
    location: 'New Delhi, India',
    image:
      'https://images.unsplash.com/photo-1588776814546-ec7b7386c79f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Max Healthcare',
    location: 'Mumbai, India',
    image:
      'https://images.unsplash.com/photo-1584036561584-b03c19da874c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Manipal Hospital',
    location: 'Chennai, India',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '6',
    name: 'Narayana Health',
    location: 'Hyderabad, India',
    image:
      'https://images.unsplash.com/photo-1588776814901-dc5a5faeb5f3?auto=format&fit=crop&w=800&q=80',
  },
];

export type RootStackParamList = {
  AllHospitalsScreen: undefined;
  HospitalDetailsScreen: { id: string };
};

const AllHospitalsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHospitalCard = ({ item }: { item: typeof hospitals[0] }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('HospitalDetailsScreen', { id: item.id })
      }
      style={tw`bg-green-50 rounded-2xl mx-4 mb-4 shadow-md overflow-hidden`}
      accessibilityRole="button"
      accessibilityLabel={`${item.name} hospital in ${item.location}`}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: Dimensions.get('window').width - 32,
          height: 180,
          resizeMode: 'cover',
        }}
      />
      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold text-green-900`}>{item.name}</Text>
        <Text style={tw`text-sm text-green-600 mt-1`}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PageLayout
      title="All Hospitals"
      headerBackgroundColor="#16a34a"
      scrollable={false}
    >
      {/* Search Bar */}
      <View style={tw`px-4 mt-4 mb-3`}>
        <View style={tw`flex-row items-center bg-green-50 rounded-full px-4 py-2 shadow`}>
          <Search size={20} color="#9CA3AF" style={tw`mr-2`} />
          <TextInput
            placeholder="Search hospitals..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={tw`flex-1 text-base text-green-800`}
            accessibilityLabel="Search hospitals"
          />
        </View>
      </View>

      {/* Hospital Cards */}
      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        renderItem={renderHospitalCard}
        contentContainerStyle={tw`pb-10`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={tw`text-center mt-10 text-base text-green-400`}>
            No hospitals found.
          </Text>
        }
      />
    </PageLayout>
  );
};

export default AllHospitalsScreen;
