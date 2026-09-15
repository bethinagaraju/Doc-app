import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { MapPin, Star } from 'lucide-react-native';

interface HospitalCardProps {
  item: any;
  onPress: () => void;
}

const getHospitalProfilePicture = (item: any) => {
  if (!item) return 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270847/hospital-building_4821512_qr0gvo.png';
  const rawPic = item.profile_picture;
  if (!rawPic || typeof rawPic !== 'string' || rawPic.trim() === '') {
    return 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270847/hospital-building_4821512_qr0gvo.png';
  }
  return rawPic;
};

const HospitalCard: React.FC<HospitalCardProps> = ({ item, onPress }) => {
  const address = item.address;
  const fullLocation = address
    ? `${address.street ? `${address.street.trim()}, ` : ''}${address.city}`
    : 'Location N/A';

  const profilePicUri = getHospitalProfilePicture(item);

  let specializationsText = 'Multispecialty Hospital';
  if (item.specializations_provided) {
    try {
      const parsed = JSON.parse(item.specializations_provided);
      if (Array.isArray(parsed)) {
        specializationsText = parsed.join(', ');
      }
    } catch (e) {
      specializationsText = item.specializations_provided;
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-white p-3 border border-[rgba(114,119,127,0.05)] shadow-sm rounded-[16px] flex-row items-center min-h-[120px] mb-4`}
    >
      {/* Profile Image */}
      <View style={tw`w-24 h-24 rounded-[12px] overflow-hidden bg-gray-100`}>
        <Image
          source={{ uri: profilePicUri }}
          style={tw`w-full h-full`}
          resizeMode="cover"
        />
      </View>

      {/* Main Content Container */}
      <View style={tw`flex-1 ml-3 justify-center py-1`}>
        {/* Top Section */}
        <View style={tw`flex-row justify-between items-start mb-3`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[16px] font-bold text-[#191C1E]`}>
              {item.organisation_name}
            </Text>
            <Text style={tw`text-[12px] font-medium text-[#124CB8] mt-1`} numberOfLines={1}>
              {specializationsText}
            </Text>
            {/* <View style={tw`flex-row items-center mt-1`}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={tw`text-[12px] font-bold text-[#191C1E] ml-1`}>4.5</Text>
              <Text style={tw`text-[12px] text-[#737684] ml-1`}>(12.4K reviews)</Text>
            </View> */}
          </View>
        </View>

        {/* Bottom Section */}
        <View style={tw`gap-2`}>
          <View style={tw`flex-row items-center`}>
            <MapPin size={12} color="#42474E" />
            <Text style={tw`ml-1 text-[12px] text-[#42474E]`} numberOfLines={1}>
              {fullLocation}
            </Text>
          </View>

          <View style={tw`flex-row justify-end items-center mt-2`}>
            <TouchableOpacity
              onPress={onPress}
              style={tw`bg-[#124CB8] px-4 py-2 rounded-full items-center justify-center`}
            >
              <Text style={tw`text-white font-bold text-[12px]`}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const HospitalCardSkeleton: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacity]);

  return (
    <View
      style={tw`bg-white p-3 border border-[rgba(114,119,127,0.05)] shadow-sm rounded-[16px] flex-row items-center min-h-[120px] mb-4`}
    >
      <Animated.View style={[tw`w-24 h-24 rounded-[12px] bg-gray-200`, { opacity }]} />
      <View style={tw`flex-1 ml-3 justify-center py-1`}>
        <View style={tw`flex-row justify-between items-start mb-3`}>
          <View style={tw`flex-1 gap-2`}>
            <Animated.View style={[tw`w-32 h-5 bg-gray-200 rounded`, { opacity }]} />
            <Animated.View style={[tw`w-24 h-4 bg-gray-200 rounded`, { opacity }]} />
          </View>
        </View>
        <View style={tw`gap-2 mt-2`}>
          <View style={tw`flex-row items-center`}>
            <Animated.View style={[tw`w-3/4 h-4 bg-gray-200 rounded`, { opacity }]} />
          </View>
          <View style={tw`flex-row justify-between items-center mt-1`}>
            <Animated.View style={[tw`w-12 h-6 bg-gray-200 rounded-[8px]`, { opacity }]} />
            <Animated.View style={[tw`w-[80px] h-[32px] bg-gray-200 rounded-full`, { opacity }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HospitalCard;
