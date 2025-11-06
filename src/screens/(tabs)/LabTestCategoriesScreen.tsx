import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';

const categories = [
  { id: '1', name: 'Blood Test', image: require('../Images/labtesticons/blood-test.png') },
  { id: '2', name: 'Urine Test', image: require('../Images/labtesticons/dark-urine.png') },
  { id: '3', name: 'Diabetes Panel', image: require('../Images/labtesticons/sugar-blood-level.png') },
  { id: '4', name: 'Thyroid Test', image: require('../Images/labtesticons/allergy-test.png') },
  { id: '5', name: 'Liver Function', image: require('../Images/labtesticons/liver-function-test.png') },
  { id: '6', name: 'Kidney Function', image: require('../Images/labtesticons/kidney (1).png') },
  { id: '7', name: 'Vitamin Test', image: require('../Images/labtesticons/supplement.png') },
  { id: '8', name: 'Lipid Profile', image: require('../Images/labtesticons/portfolio.png') },
  { id: '9', name: 'Complete Blood Count', image: require('../Images/labtesticons/blood-analysis.png') },
  { id: '10', name: 'COVID-19 Test', image: require('../Images/labtesticons/coronavirus.png') },
  { id: '11', name: 'Electrolyte Panel', image: require('../Images/labtesticons/hydration.png') },
  { id: '12', name: 'Hormone Panel', image: require('../Images/labtesticons/hormonal-imbalance.png') },
  { id: '13', name: 'Allergy Test', image: require('../Images/labtesticons/test.png') },
  { id: '14', name: 'Blood Culture', image: require('../Images/labtesticons/blood-donation.png') },
  { id: '15', name: 'Coagulation Test', image: require('../Images/labtesticons/tube.png') },
];

type RootStackParamList = {
  LabTestsList: { category: string };
};

const LabTestCategoriesScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleCategorySelect = (category: string) => {
    // Navigate to LabTestsList with the selected category
    navigation.navigate('LabTestsList', { 
      category: category 
    });
  };
  const renderItem = ({ item }: { item: typeof categories[0] }) => (    <TouchableOpacity
      style={[
        tw`bg-green-50 rounded-3xl py-4 px-2 items-center justify-center shadow-sm elevation-3 mb-3`,
        { width: '31%', marginHorizontal: '1%' }
      ]}
      activeOpacity={0.85}
      onPress={() => handleCategorySelect(item.name)}
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
      <PageHeader title="Lab Test Categories" backgroundColor="#16a34a" textColor="#fff" onBackPress={() => navigation.goBack()} />
      {/* Search Bar */}
      <View style={tw`flex-row items-center bg-green-50 rounded-3.5xl px-3 py-2.5 mb-5 shadow-sm elevation-3 mx-4 mt-4`}>
        <Search size={20} color="#999" style={tw`mr-2`} />
        <TextInput
          style={tw`text-base text-green-800 flex-1`}
          placeholder="Search categories"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Category Grid */}      
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={tw`justify-between`}
        contentContainerStyle={tw`pb-7.5 px-4`}
        ListEmptyComponent={
          <Text style={tw`text-center mt-12 text-base text-green-400`}>
            No categories found.
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default LabTestCategoriesScreen;
