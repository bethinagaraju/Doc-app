import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, RouteProp, NavigationProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X } from 'lucide-react-native';
import tw from 'twrnc';
import ProfileTopBar from '../../components/ProfileTopBar';

const specialties = [
  { name: 'Internal Medicine', image: require('../Images/PopUpICons/general_physician.png') },
  { name: 'Pediatrics', image: require('../Images/PopUpICons/pediatrician.png') },
  { name: 'Gynecology', image: require('../Images/PopUpICons/gynecologist.png') },
  { name: 'Dentistry', image: require('../Images/PopUpICons/tooth.png') },
  { name: 'Dermatology', image: require('../Images/PopUpICons/skincare.png') },
  { name: 'Cardiology', image: require('../Images/PopUpICons/cardiology.png') },
  { name: 'Orthopedics', image: require('../Images/PopUpICons/arthritis.png') },
  { name: 'ENT', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Obstetrics', image: require('../Images/PopUpICons/prenatal-care.png') },
  { name: 'Ophthalmology', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Gastroenterology', image: require('../Images/PopUpICons/stomach.png') },
  { name: 'Psychiatry', image: require('../Images/PopUpICons/psychiatrist.png') },
  { name: 'Psychology', image: require('../Images/PopUpICons/brain.png') },
  { name: 'Diabetology', image: require('../Images/PopUpICons/endocrine.png') },
  { name: 'Endocrinology', image: require('../Images/PopUpICons/endocrine.png') },
  { name: 'Pulmonology', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Neurology', image: require('../Images/PopUpICons/neurology.png') },
  { name: 'Urology', image: require('../Images/PopUpICons/kidney.png') },
  { name: 'Nephrology', image: require('../Images/PopUpICons/kidney.png') },
  { name: 'Oncology', image: require('../Images/PopUpICons/oncology.png') },
  { name: 'General Surgery', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Physiotherapy', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Diet & Nutrition', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Rheumatology', image: require('../Images/PopUpICons/arthritis.png') },
  { name: 'Ayurveda', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Homeopathy', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Sexology', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Plastic Surgery', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Unani', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Siddha', image: require('../Images/PopUpICons/medical.png') },
];

export type RootStackParamList = {
  AllSpecialtiesScreen: { mode?: string };
  Doctors: { mode?: string; specialty: string };
  ConsultOptionsScreen: { specialty: string };
};

type AllSpecialtiesScreenRouteProp = RouteProp<RootStackParamList, 'AllSpecialtiesScreen'>;
type AllSpecialtiesScreenNavProp = NavigationProp<RootStackParamList, 'AllSpecialtiesScreen'>;

const AllSpecialtiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation<AllSpecialtiesScreenNavProp>();
  const route = useRoute<AllSpecialtiesScreenRouteProp>();
  const mode = route.params?.mode;

  const { width } = useWindowDimensions();
  // Dynamically calculate columns based on width to prevent stretching on tablets
  const numColumns = Math.max(4, Math.floor(width / 90));

  const filtered = specialties.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSpecialtyPress = (specialty: string) => {
    if (mode === 'video' || mode === 'inclinic') {
      navigation.navigate('Doctors', { mode, specialty });
    } else {
      navigation.navigate('ConsultOptionsScreen', { specialty });
    }
  };

  const renderItem = ({ item }: { item: typeof specialties[0] }) => (
    <TouchableOpacity
      style={[tw`items-center mb-6`, { width: `${100 / numColumns}%` }]}
      activeOpacity={0.7}
      onPress={() => handleSpecialtyPress(item.name)}
    >
      {/* Matched to the Home Screen UI: Soft circular background */}
      <View style={tw`w-16 h-16 rounded-full bg-blue-50 items-center justify-center mb-2`}>
        <Image
          source={item.image}
          style={tw`w-8 h-8`}
          resizeMode="contain"
        />
      </View>
      <Text
        style={tw`text-[11px] font-medium text-center text-gray-700 px-1 leading-tight`}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>

      <ProfileTopBar title="All Specialties" />

      <View style={tw`flex-1 w-full max-w-[800px] self-center`}>
        {/* Modernised Search Bar */}
        <View style={tw`px-4 mt-3 mb-2`}>
          <View
            style={[
              tw`flex-row items-center bg-white border rounded-[16px] px-4 h-[52px] ${isFocused ? 'border-[#124CB8]' : 'border-[#E2E8F0]'
                }`,
              {
                shadowColor: isFocused ? '#124CB8' : '#94A3B8',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isFocused ? 0.08 : 0.06,
                shadowRadius: 10,
                elevation: 2,
              }
            ]}
          >
            <Search size={20} color={isFocused ? "#124CB8" : "#64748B"} />
            <TextInput
              placeholder="Search specialties, symptoms..."
              placeholderTextColor="#94A3B8"
              style={tw`flex-1 ml-3 text-[15px] text-[#1E293B] font-semibold p-0`}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              selectionColor="#124CB8"
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={tw`p-1`}
                activeOpacity={0.7}
              >
                <X size={18} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <FlatList
          key={numColumns} // Force re-render when columns change
          data={filtered}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={tw`pb-25 pt-4`}
          columnWrapperStyle={tw`justify-start px-2`}
          style={tw`flex-1`}
          ListEmptyComponent={
            <View style={tw`items-center mt-12 px-6`}>
              <Text style={tw`text-base font-medium text-gray-800 text-center`}>
                No specialties found
              </Text>
              <Text style={tw`text-sm text-gray-500 text-center mt-1`}>
                Try searching for something else like "Dental" or "Heart"
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default AllSpecialtiesScreen;