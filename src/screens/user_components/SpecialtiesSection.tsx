import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import tw from 'twrnc';

const specialties = [
  { name: 'General Physician', image: require('../Images/PopUpICons/general_physician.png') },
  { name: 'Cardiologist', image: require('../Images/PopUpICons/cardiology.png') },
  { name: 'Neurologist', image: require('../Images/PopUpICons/neurology.png') },
  { name: 'Dermatologist', image: require('../Images/PopUpICons/skincare.png') },
  { name: 'ENT', image: require('../Images/PopUpICons/medical.png') },
  { name: 'Dental Care', image: require('../Images/PopUpICons/tooth.png') },
  { name: 'Pediatrician', image: require('../Images/PopUpICons/pediatrician.png') },
  { name: 'Orthopedic', image: require('../Images/PopUpICons/arthritis.png') },
];

const FeatureCard = ({
  label,
  image,
  onPress,
}: {
  label: string;
  image: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      style={tw`w-[22%] mb-5 items-center`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Practo-style: Circular soft background with a smaller, crisp icon */}
      <View
        style={tw`bg-blue-50 w-16 h-16 rounded-full items-center justify-center mb-2`}
      >
        <Image
          source={image}
          style={tw`w-8 h-8`}
          resizeMode="contain"
        />
      </View>
      <Text
        style={tw`text-[11px] text-center text-gray-700 font-medium leading-tight`}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function SpecialtiesSection() {
  const navigation = useNavigation<any>();

  return (
    <View style={tw`mt-6 px-0`}>

      {/* Header section with "See All" inline */}
      <View style={tw`flex-row justify-between items-center mb-5 px-1`}>
        <Text style={tw`text-lg font-bold text-gray-900`}>
          Consult top doctors
        </Text>
        <TouchableOpacity
          style={tw`flex-row items-center`}
          onPress={() => navigation.navigate('AllSpecialtiesScreen')}
          activeOpacity={0.7}
        >
          <Text style={tw`text-sm font-semibold text-indigo-600 mr-1`}>
            See all
          </Text>
          <ChevronRight size={16} color="#4F46E5" />
        </TouchableOpacity>
      </View>

      {/* Grid: Flex-wrap with space-between */}
      <View style={tw`flex-row flex-wrap justify-between px-1`}>
        {specialties.slice(0, 8).map((item, index) => (
          <FeatureCard
            key={index}
            label={item.name}
            image={item.image}
            onPress={() =>
              navigation.navigate('ConsultOptionsScreen', { specialty: item.name })
            }
          />
        ))}
      </View>

    </View>
  );
}