import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ArrowLeft, Search } from 'lucide-react-native';
import { useNavigation, RouteProp, NavigationProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
3
const specialties = [
  { name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png') },
  { name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png') },
  { name: 'Dermatologist', image: require('../Images/PopUpICons/skincare.png') },
  { name: 'Neurologist', image: require('../Images/PopUpICons/neurology.png') },
  { name: 'Pediatrician', image: require('../Images/PopUpICons/pediatrician.png') },
  { name: 'Psychiatrist', image: require('../Images/PopUpICons/psychiatrist.png') },
  { name: 'Oncologist', image: require('../Images/PopUpICons/oncology.png') },
  { name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png') },
  { name: 'ENT Specialist', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Gastroenterologist', image: require('../Images/PopUpICons/stomach.png') },
  { name: 'Endocrinologist', image: require('../Images/PopUpICons/endocrine.png') },
  { name: 'Urologist', image: require('../Images/PopUpICons/kidney.png') },
  { name: 'Gynecologist', image: require('../Images/PopUpICons/gynecologist.png') },
  { name: 'Skin & Hair', image: require('../Images/PopUpICons/spots.png') },
  { name: "Women's Health", image: require('../Images/PopUpICons/prenatal-care.png') },
  { name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png') },
  { name: 'Ear, Nose, Throat', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Mental Wellness', image: require('../Images/PopUpICons/brain.png') },
 
];

// Define your stack param list for navigation typing
export type RootStackParamList = {
  AllSpecialtiesScreen: { mode?: string };
  Doctors: { mode?: string; specialty: string };
  ConsultOptionsScreen: { specialty: string };
  // ...other routes
};

type AllSpecialtiesScreenRouteProp = RouteProp<RootStackParamList, 'AllSpecialtiesScreen'>;
type AllSpecialtiesScreenNavProp = NavigationProp<RootStackParamList, 'AllSpecialtiesScreen'>;

const AllSpecialtiesScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<AllSpecialtiesScreenNavProp>();
  const route = useRoute<AllSpecialtiesScreenRouteProp>();
  const mode = route.params?.mode;

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
      style={[
        tw`bg-green-50 rounded-3xl py-4 px-2 items-center justify-center shadow-sm elevation-3`,
        { width: '31%', marginHorizontal: '1%', marginBottom: 12 }
      ]}
      activeOpacity={0.85}
      onPress={() => handleSpecialtyPress(item.name)}
    >
      <View style={[tw`w-12 h-12 rounded-2xl mb-2 bg-green-100`, { overflow: 'hidden' }]}> 
        <Image
          source={item.image}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
      <Text style={tw`text-[12px] font-medium text-center text-green-800`} numberOfLines={2}> 
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <PageHeader title="All Specialties" backgroundColor="#16a34a" textColor="#fff" onBackPress={() => navigation.goBack()} />
      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-green-50 rounded-3xl px-3 py-2.5 mb-5 shadow-sm elevation-3 mx-4 mt-4`}>
        <Search size={20} color="#999" style={tw`mr-2`} />
        <TextInput
          placeholder="Search specialties"
          style={tw`text-base text-green-800 flex-1`}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
      </View>            
      <FlatList
        data={filtered}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={tw`pb-32 px-3`}
        columnWrapperStyle={tw`justify-center`}
        style={tw`flex-1`}
        ListEmptyComponent={
          <Text style={tw`text-center mt-12 text-base text-green-400`}>
            No specialties found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AllSpecialtiesScreen;