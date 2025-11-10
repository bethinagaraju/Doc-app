// import React, { useState, useRef } from 'react';
// import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
// import { useNavigation, NavigationProp } from '@react-navigation/native';
// // import Animated from 'react-native-reanimated';

// import tw from 'twrnc';

// const { width } = Dimensions.get('window');

// const onboardingData = [
//   {
//     id: '1',
//     title: 'Find Trusted Doctors',
//     description: 'Discover top-rated medical professionals for quality healthcare',
//     image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: '2',
//     title: 'Choose Best Doctors',
//     description: 'Select the best specialists based on ratings and reviews',
//     image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
//   {
//     id: '3',
//     title: 'Easy Appointments',
//     description: 'Book and manage appointments with just a few taps',
//     image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
//   },
// ];

// // Define your stack param list for navigation typing
// export type RootStackParamList = {
//   onboarding: undefined;
//   login: undefined;
// };

// export default function Onboarding() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const flatListRef = useRef<FlatList>(null);
//   const navigation = useNavigation<NavigationProp<RootStackParamList>>();

//   const handleNext = () => {
//     if (currentIndex < onboardingData.length - 1) {
//       flatListRef.current?.scrollToIndex({
//         index: currentIndex + 1,
//         animated: true,
//       });
//     } else {
//       navigation.navigate('login');
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('login');
//   };

//   const viewableItemsChanged = ({ viewableItems }: any) => {
//     if (viewableItems.length > 0) {
//       setCurrentIndex(viewableItems[0].index);
//     }
//   };

//   const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
//     return (
//       <View style={tw`w-[${width}px] items-center bg-green-50`}>
//         <Image
//           source={{ uri: item.image }}
//           style={tw`w-[${width * 0.8}px] h-[${width * 0.8}px] rounded-full mt-25`}
//         />
//         <View style={tw`mt-12 px-5 items-center`}>
//           <Text style={tw`text-3xl font-bold text-green-700 mb-3 text-center`}>{item.title}</Text>
//           <Text style={tw`text-base text-green-800 text-center leading-6`}>{item.description}</Text>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       <TouchableOpacity style={tw`absolute top-15 right-5 z-10`} onPress={handleSkip}>
//         <Text style={tw`text-base text-emerald-600 font-medium`}>Skip</Text>
//       </TouchableOpacity>

//       <FlatList
//         ref={flatListRef}
//         data={onboardingData}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         bounces={false}
//         keyExtractor={(item) => item.id}
//         onViewableItemsChanged={viewableItemsChanged}
//         viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
//       />

//       <View style={tw`flex-row justify-center mb-5`}>
//         {onboardingData.map((_, index) => (
//           <View
//             key={index}
//             style={tw`h-2 w-2 rounded-full mx-1 ${
//               index === currentIndex ? 'bg-green-600' : 'bg-green-200'
//             }`}
//           />
//         ))}
//       </View>

//       <TouchableOpacity
//         style={tw`bg-green-600 py-4 px-10 rounded-full mb-12 self-center`}
//         onPress={handleNext}
//       >
//         <Text style={tw`text-white text-base font-semibold`}>
//           {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import React, { useState, useRef } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Find Trusted Doctors',
    description: 'Discover top-rated medical professionals for quality healthcare',
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '2',
    title: 'Choose Best Doctors',
    description: 'Select the best specialists based on ratings and reviews',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: '3',
    title: 'Easy Appointments',
    description: 'Book and manage appointments with just a few taps',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export type RootStackParamList = {
  onboarding: undefined;
  login: undefined;
};

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('login');
  };

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => (
    <View style={[tw`items-center bg-green-50`, { width }]}>
      <Image
        source={{ uri: item.image }}
        style={[tw`rounded-full mt-25`, { width: width * 0.8, height: width * 0.8 }]}
      />
      <View style={tw`mt-12 px-5 items-center`}>
        <Text style={tw`text-3xl font-bold text-green-700 mb-3 text-center`}>{item.title}</Text>
        <Text style={tw`text-base text-green-800 text-center leading-6`}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <TouchableOpacity style={tw`absolute top-15 right-5 z-10`} onPress={handleSkip}>
        <Text style={tw`text-base text-emerald-600 font-medium`}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <View style={tw`flex-row justify-center mb-5`}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={tw`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-green-600' : 'bg-green-200'
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        style={tw`bg-green-600 py-4 px-10 rounded-full mb-12 self-center`}
        onPress={handleNext}
      >
        <Text style={tw`text-white text-base font-semibold`}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
