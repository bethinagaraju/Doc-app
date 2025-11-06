import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
import { 
  X, 
  ShoppingCart, 
  Search, 
  Clock, 
  Home, 
  Calendar, 
  Check, 
  AlertCircle,
  ChevronRight 
} from 'lucide-react-native';

const mockTests = [
  { id: '1', name: 'Blood Test', description: 'Includes CBC, ESR, and Blood Sugar', price: '₹499', category: 'Blood Test' },
  { id: '2', name: 'Advanced Panel', description: 'Thyroid, Kidney & Liver function tests', price: '₹999', category: 'Thyroid Test' },
  { id: '3', name: 'Diabetes Package', description: 'Fasting Glucose, HbA1c, Lipid profile', price: '₹799', category: 'Diabetes Panel' },
  { id: '4', name: 'Heart Health', description: 'ECG, Cholesterol, Blood Pressure', price: '₹899', category: 'Lipid Profile' },
  { id: '5', name: 'Full Body Checkup', description: 'All major tests included', price: '₹1499', category: 'Full Body Checkup' },
  { id: '6', name: 'Vitamin Deficiency', description: 'Vitamin B12, D3 & Iron', price: '₹699', category: 'Vitamin Test' },
  { id: '7', name: 'Urine Test', description: 'Routine Urine Analysis', price: '₹299', category: 'Urine Test' },
  { id: '8', name: 'Kidney Function', description: 'Creatinine, Urea, Electrolytes', price: '₹599', category: 'Kidney Function' },
  { id: '9', name: 'Liver Function', description: 'SGPT, SGOT, Bilirubin', price: '₹699', category: 'Liver Function' },
  { id: '10', name: 'COVID-19 Test', description: 'RT-PCR, Antibody Test', price: '₹999', category: 'COVID-19 Test' },
];

const categories = [
  { id: '1', name: 'All tests', category: '' },
  { id: '2', name: 'Blood Test', category: 'Blood Test' },
  { id: '3', name: 'Diabetes', category: 'Diabetes Panel' },
  { id: '4', name: 'Heart', category: 'Lipid Profile' },
  { id: '5', name: 'Thyroid', category: 'Thyroid Test' },
  { id: '6', name: 'Full Body', category: 'Full Body Checkup' },
  { id: '7', name: 'Kidney', category: 'Kidney Function' },
  { id: '8', name: 'Liver', category: 'Liver Function' },
];

type RootStackParamList = {
  LabTestsList: { category: string };
  LabTest: { test: typeof mockTests[0] };
};

type RouteParams = {
  params: {
    category: string;
    showAllTests?: boolean;
  };
};

interface FeaturedPackageProps {
  title: string;
  price: number;
  features: string[];
  onPress: () => void;
}

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

interface TestCardProps {
  test: {
    id: string;
    name: string;
    description: string;
    price: string;
  };
  inCart: boolean;
  onAddToCart: (test: any) => void;
  onRemoveFromCart: (id: string) => void;
  onPress: () => void;
}

const featuredPackages = [
  {
    id: '1',
    title: 'Senior citizen health checkup',
    price: 299,
    features: [
      'Full body checkup',
      'Free home sample pickup',
      'Digital reports in 24 hours'
    ]
  },
  {
    id: '2',
    title: 'Diabetes Screening',
    price: 599,
    features: [
      'Comprehensive diabetes panel',
      'Free doctor consultation',
      'Regular monitoring'
    ]
  }
];

const LabTestsListScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const initialCategory = route.params.category;
  const initialShowAllTests = route.params.showAllTests || false;

  const [search, setSearch] = useState('');  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    // Directly use the incoming category parameter
    return initialCategory || 'All tests';
  });
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);  const [cart, setCart] = useState<typeof mockTests>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [showAllTests, setShowAllTests] = useState(initialShowAllTests);
  const flatListRef = React.useRef<FlatList>(null);
  // Get the category value from the selected category name
  const getSelectedCategoryValue = (categoryName: string) => {
    const found = categories.find(cat => cat.name === categoryName);
    return found?.category || '';
  };

  // Filter tests by category (if set) and search
  const filteredTests = useMemo(() =>
    [...mockTests, ...featuredPackages].filter((item) => {
      const matchesSearch =
        search.length === 0 ||
        ('name' in item && item.name.toLowerCase().includes(search.toLowerCase())) ||
        ('description' in item && item.description.toLowerCase().includes(search.toLowerCase())) ||
        ('features' in item && item.features.some(feature => feature.toLowerCase().includes(search.toLowerCase())));

      const currentCategoryValue = getSelectedCategoryValue(selectedCategory);
      const matchesCategory =
        !currentCategoryValue || ('category' in item && item.category === currentCategoryValue);

      return matchesSearch && matchesCategory;
    }),
    [selectedCategory, search]
  );

  const selectedTest = filteredTests.find((test) => test.id === selectedTestId);

  // Cart logic
  const isInCart = (testId: string) => cart.some((t) => t.id === testId);
  const addToCart = (test: typeof mockTests[0]) => setCart((prev) => [...prev, test]);
  const removeFromCart = (testId: string) => setCart((prev) => prev.filter((t) => t.id !== testId));

  // Cart icon with badge for header
  const CartIcon = (
    <TouchableOpacity onPress={() => setCartVisible(true)} style={tw`relative`} accessibilityLabel="View cart">
      <ShoppingCart size={26} color="#fff" />
      {cart.length > 0 && (
        <View style={tw`absolute -top-1 -right-1 bg-green-600 rounded-full w-5 h-5 items-center justify-center`}>
          <Text style={tw`text-xs text-white font-bold`}>{cart.length}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const handleTestPress = (test: typeof mockTests[0]) => {
    navigation.navigate('LabTest', { test });
  };

  const handleSearchSubmit = () => {
    setSelectedCategory('All tests');
    setShowAllTests(true);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleSearchFocus = () => {
    setSelectedCategory('All tests');
    setShowAllTests(true);
  };

  const handleSearchBlur = () => {
    setShowAllTests(false);
  };

  // Featured Package Card Component
  const FeaturedPackageCard = ({ title, price, features, onPress }: FeaturedPackageProps) => (
    <TouchableOpacity 
      onPress={onPress}
      style={tw`bg-[#E5ECF6] rounded-2xl p-4 mb-4`}
    >
      <Text style={tw`text-[#202b6d] text-lg font-bold mb-1`}>{title}</Text>
      <View style={tw`flex-row items-baseline mb-2`}>
        <Text style={tw`text-[#202b6d] text-sm`}>Start from </Text>
        <Text style={tw`text-[#202b6d] text-xl font-bold`}>₹{price}</Text>
      </View>
      {features.map((feature, index) => (
        <View key={index} style={tw`flex-row items-center mb-1`}>
          <View style={tw`w-1.5 h-1.5 rounded-full bg-[#1d9be3] mr-2`} />
          <Text style={tw`text-green-700 text-sm`}>{feature}</Text>
        </View>
      ))}
      <TouchableOpacity 
        style={tw`bg-[#202b6d] self-start px-4 py-2 rounded-lg mt-3`}
      >
        <Text style={tw`text-white font-medium`}>Book Now →</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Category Chip Component
  const CategoryChip = ({ label, isSelected, onPress }: CategoryChipProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`px-4 py-2 rounded-full mr-3 ${
        isSelected ? 'bg-[#202b6d]' : 'bg-[#E5ECF6]'
      }`}
    >
      <Text style={tw`${
        isSelected ? 'text-white' : 'text-green-800'
      } font-medium`}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  // Test Card Component
  const TestCard = ({ test, inCart, onAddToCart, onRemoveFromCart, onPress }: TestCardProps) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-green-50 rounded-2xl shadow-sm mb-4 overflow-hidden`}
    >
      <View style={tw`p-4`}>
        <Text style={tw`text-[#202b6d] text-lg font-bold mb-1`}>{test.name}</Text>
        <Text style={tw`text-green-700 text-sm mb-3`}>{test.description}</Text>
        
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-baseline`}>
            <Text style={tw`text-[#1d9be3] text-lg font-bold`}>{test.price}</Text>
            <Text style={tw`text-green-400 text-xs ml-1`}>onwards</Text>
          </View>
          <TouchableOpacity
            onPress={() => inCart ? onRemoveFromCart(test.id) : onAddToCart(test)}
            style={tw`${
              inCart ? 'bg-green-100' : 'bg-green-600'
            } px-4 py-2 rounded-lg`}
          >
            <Text style={tw`${
              inCart ? 'text-green-700' : 'text-white'
            } font-medium`}>
              {inCart ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
  // Header component for FlatList
  const renderHeader = () => {
    if (showAllTests) {
      return (
        <View style={tw`px-4 mt-2`}>
          <Text style={tw`text-[#202b6d] text-xl font-bold mb-3`}>All Lab Tests</Text>
          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`pb-2`}
          >
            {categories.map(cat => (
              <CategoryChip
                key={cat.id}
                label={cat.name}
                isSelected={selectedCategory === cat.name}
                onPress={() => setSelectedCategory(cat.name)}
              />
            ))}
          </ScrollView>
        </View>
      );
    }    return (
      <>
        {/* Featured Packages */}
        <View style={tw`p-4`}>
          {featuredPackages.map(pkg => (
            <FeaturedPackageCard
              key={pkg.id}
              title={pkg.title}
              price={pkg.price}
              features={pkg.features}
              onPress={() => {}}
            />
          ))}
        </View>

        {/* Lab Tests Section Header */}
        <View style={tw`px-4 mb-4`}>
          <View style={tw`flex-row justify-between items-center mb-3`}>
            <Text style={tw`text-[#202b6d] text-xl font-bold`}>Book Lab Tests</Text>
            <TouchableOpacity 
              onPress={() => {
                setSelectedCategory('All tests');
                setSearch('');
                setShowAllTests(true);
                flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
              }}
              style={tw`flex-row items-center`}
            >
              <Text style={tw`text-[#1d9be3] font-medium mr-1`}>SEE ALL</Text>
              <ChevronRight size={16} color="#1d9be3" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`pb-2`}
          >
            {categories.map(cat => (
              <CategoryChip
                key={cat.id}
                label={cat.name}
                isSelected={selectedCategory === cat.name}
                onPress={() => setSelectedCategory(cat.name)}
              />
            ))}
          </ScrollView>
        </View>
      </>
    );
  };

  // Footer component for FlatList
  const renderFooter = () => (
    <View style={tw`px-4 mb-4`}>
      {/* Safety Info */}
      <View style={tw`bg-[#E5ECF6] rounded-2xl p-4 mt-4`}>
        <View style={tw`flex-row items-center mb-2`}>
          <View style={tw`w-8 h-8 bg-[#202b6d] rounded-full items-center justify-center mr-3`}>
            <Check size={20} color="#fff" />
          </View>
          <Text style={tw`text-[#202b6d] font-bold`}>100% Safe & Hygienic</Text>
        </View>
        <Text style={tw`text-green-700 text-sm`}>
          All safety measures are followed while collecting samples
        </Text>
      </View>
    </View>
  );

  // Empty list component for FlatList
  const renderEmptyList = () => (
    <View style={tw`p-8 items-center justify-center`}>
      <View style={tw`w-16 h-16 bg-[#E5ECF6] rounded-full items-center justify-center mb-4`}>
        <AlertCircle size={32} color="#202b6d" />
      </View>
      <Text style={tw`text-lg font-semibold text-[#202b6d] mb-1 text-center`}>
        No tests found
      </Text>
      <Text style={tw`text-green-400 text-center mb-4`}>        {selectedCategory ? `No tests available in "${selectedCategory}"` : ''}
        {search ? `No results matching "${search}"` : ''}
      </Text>
      {(selectedCategory || search) && (
        <TouchableOpacity
          onPress={() => {
            setSearch('');
            setSelectedCategory('');
          }}
          style={tw`px-6 py-3 bg-[#202b6d] rounded-xl`}
        >
          <Text style={tw`text-white font-semibold`}>Clear Filters</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  // Main render

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <PageHeader
        title="Lab Tests"
        backgroundColor="#16a34a"
        textColor="#fff"
        onBackPress={() => navigation.goBack()}
        rightComponent={CartIcon}
      />

      {/* Search Bar */}
      <View style={tw`mx-4 mt-4 mb-2`}>
        <View style={tw`flex-row items-center bg-green-50 rounded-3xl px-4 py-2.5 shadow-sm elevation-3`}>
          <Search size={20} color="#999" style={tw`mr-2`} />
          <TextInput
            placeholder="Search for tests, packages..."
            style={tw`flex-1 text-base text-green-800`}
            value={search}
            onChangeText={setSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={tw`p-1`}>
              <X size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>      
      <FlatList
        ref={flatListRef}
        data={filteredTests}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`${showAllTests ? 'pb-32' : 'pb-24'}`}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        renderItem={({ item: test }) => (
          <View style={tw`px-4`}>
            <TestCard
              test={test}
              inCart={isInCart(test.id)}
              onAddToCart={addToCart}
              onRemoveFromCart={removeFromCart}
              onPress={() => handleTestPress(test)}
            />
          </View>
        )}
      />

      {/* Cart Modal */}
      <Modal visible={cartVisible} animationType="slide" transparent onRequestClose={() => setCartVisible(false)}>
        <View style={tw`flex-1 bg-green-900/10 justify-end`}>
          <View style={tw`bg-green-50 rounded-t-3xl pt-6 pb-8`}>
            <View style={tw`px-6 flex-row justify-between items-center mb-4`}>
              <View>
                <Text style={tw`text-2xl font-bold text-[#202b6d]`}>Your Cart</Text>
                <Text style={tw`text-sm text-green-600`}>{cart.length} tests selected</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setCartVisible(false)}
                style={tw`p-2 -mr-2`}
              >
                <X size={24} color="#202b6d" />
              </TouchableOpacity>
            </View>
            
            {cart.length === 0 ? (
              <View style={tw`p-6 items-center justify-center`}>
                <View style={tw`w-16 h-16 bg-[#E5ECF6] rounded-full items-center justify-center mb-4`}>
                  <ShoppingCart size={32} color="#202b6d" />
                </View>
                <Text style={tw`text-lg font-semibold text-[#202b6d] mb-1`}>Your cart is empty</Text>
                <Text style={tw`text-green-400 text-center mb-4`}>
                  Add tests to your cart and they will appear here
                </Text>
                <TouchableOpacity 
                  onPress={() => setCartVisible(false)}
                  style={tw`px-6 py-3 bg-[#202b6d] rounded-xl`}
                >
                  <Text style={tw`text-white font-semibold`}>Browse Tests</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <ScrollView style={tw`max-h-96 px-6`}>
                  {cart.map((test) => (
                    <View key={test.id} style={tw`bg-[#E5ECF6] rounded-xl p-4 mb-3`}>
                      <View style={tw`flex-row justify-between items-start`}>
                        <View style={tw`flex-1 mr-3`}>
                          <Text style={tw`font-bold text-[#202b6d] mb-1`}>{test.name}</Text>
                          <Text style={tw`text-sm text-green-700`}>{test.description}</Text>
                        </View>
                        <TouchableOpacity 
                          onPress={() => removeFromCart(test.id)}
                          style={tw`p-2 -mt-2 -mr-2`}
                        >
                          <X size={18} color="#DC2626" />
                        </TouchableOpacity>
                      </View>
                      <Text style={tw`text-[#1d9be3] font-bold mt-2`}>{test.price}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={tw`px-6 pt-4 border-t border-green-100`}>
                  <View style={tw`flex-row justify-between items-center mb-4`}>
                    <Text style={tw`text-green-700`}>Total Amount</Text>
                    <Text style={tw`text-xl font-bold text-[#202b6d]`}>
                      ₹{cart.reduce((total, item) => total + parseInt(item.price.replace('₹', '')), 0)}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={tw`py-4 rounded-xl bg-[#202b6d] items-center`}
                    onPress={() => console.log('Handle checkout')}
                  >
                    <Text style={tw`text-white font-bold text-base`}>Proceed to Book Tests</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LabTestsListScreen;
