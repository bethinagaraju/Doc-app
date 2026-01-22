import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CheckSquare, Square } from 'lucide-react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';

const TEST_DATA = [
  { id: '1', name: 'Complete Blood Count (CBC)', price: 400 },
  { id: '2', name: 'Lipid Profile', price: 700 },
  { id: '3', name: 'Thyroid Test (T3, T4, TSH)', price: 500 },
  { id: '4', name: 'Vitamin D Test', price: 900 },
  { id: '5', name: 'COVID-19 RTPCR', price: 800 },
];

const TestBookingScreen = () => {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedTests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBooking = () => {
    if (selectedTests.length === 0) {
      Alert.alert('No Test Selected', 'Please select at least one test to book.');
      return;
    }
    const selectedNames = TEST_DATA.filter((test) =>
      selectedTests.includes(test.id)
    ).map((test) => test.name);

    Alert.alert('Test Booked', `You have booked:\n\n• ${selectedNames.join('\n• ')}`);
    setSelectedTests([]);
  };

  const totalAmount = selectedTests.reduce((sum, id) => {
    const test = TEST_DATA.find((item) => item.id === id);
    return sum + (test?.price || 0);
  }, 0);

  const renderItem = ({ item }: { item: typeof TEST_DATA[0] }) => {
    const isSelected = selectedTests.includes(item.id);
    return (
          <TouchableOpacity
            style={tw`bg-green-50 p-4 rounded-xl mb-3 mx-4 border ${
              isSelected ? 'border-green-600 bg-green-100' : 'border-green-200'
            }`}
        onPress={() => toggleSelection(item.id)}
        activeOpacity={0.8}
        accessibilityRole="checkbox"
        accessibilityLabel={item.name}
        accessibilityState={{ checked: isSelected }}
      >
        <View style={tw`flex-row items-center`}>
          {isSelected ? (
                <CheckSquare size={24} color="#16a34a" />
          ) : (
            <Square size={24} color="#888" />
          )}
          <View style={tw`ml-3 flex-1`}>
            <Text style={tw`text-base font-medium text-green-900`}>{item.name}</Text>
            <Text style={tw`text-sm text-green-700 mt-1`}>₹{item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <PageLayout
      title="Book a Test"
      headerBackgroundColor="#2E3192"
      scrollable={false}
    >
      <FlatList
        data={TEST_DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-32 pt-4`}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Bar */}
      {selectedTests.length > 0 && (
        <View style={tw`absolute bottom-0 left-0 right-0 bg-green-50 px-4 py-3 border-t border-green-200 flex-row justify-between items-center`}>
          <Text style={tw`text-base font-medium text-green-800`}>
            {selectedTests.length} test(s) — ₹{totalAmount}
          </Text>
          <TouchableOpacity
              style={tw`bg-green-600 py-2 px-5 rounded-2xl`}
            onPress={handleBooking}
            accessibilityRole="button"
            accessibilityLabel={`Book ${selectedTests.length} tests for ₹${totalAmount}`}
          >
            <Text style={tw`text-white text-base font-semibold`}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </PageLayout>
  );
};

export default TestBookingScreen;
