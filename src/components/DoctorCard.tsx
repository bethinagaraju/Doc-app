// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import tw from 'twrnc';
// import { Clock, Star, ThumbsUp, MapPin } from 'lucide-react-native';

// interface DoctorCardProps {
//   item: any;
//   onPress: () => void;
// }

// const DoctorCard: React.FC<DoctorCardProps> = ({ item, onPress }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       style={tw`bg-white p-4 mb-4 rounded-xl`}
//     >
//       <View style={tw`flex-row`}>
//         <Image
//           source={{
//             uri:
//               item.profile_picture
//           }}
//           style={tw`w-20 h-20 rounded-lg`}
//         />

//         <View style={tw`flex-1 ml-3`}>
//           <Text style={tw`text-lg font-bold text-green-800`}>
//             {item.user?.username}
//           </Text>

//           <Text style={tw`text-green-600`}>
//             {item.specialization}
//           </Text>

//           <View style={tw`flex-row items-center mt-1`}>
//             <Clock size={14} color="#666" />
//             <Text style={tw`ml-1`}>
//               {item.experience_years} Years
//             </Text>
//           </View>

//           {item.user?.address?.[0] && (
//             <View style={tw`flex-row items-center mt-1`}>
//               <MapPin size={14} color="#666" />
//               <Text style={tw`ml-1 text-gray-600`} numberOfLines={1}>
//                 {item.user.address[0].street ? `${item.user.address[0].street.trim()}, ` : ''}{item.user.address[0].city}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>

//       <View
//         style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-green-100`}
//       >
//         <View style={tw`flex-row items-center`}>
//           <Star size={14} color="#22c55e" />
//           <Text style={tw`ml-1`}>
//             {item.rating || '--'}
//           </Text>

//           <ThumbsUp size={14} color="#22c55e" style={tw`ml-4`} />
//           <Text style={tw`ml-1`}>
//             {item.recommendation || '--'}
//           </Text>
//         </View>

//         <Text style={tw`font-bold text-green-800`}>
//           ₹{item.consultation_fee}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default DoctorCard;














import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { MapPin, Star } from 'lucide-react-native';

interface DoctorCardProps {
  item: any;
  onPress: () => void;
}

const calculateExperience = (startDateStr: string | null) => {
  if (!startDateStr) return 0;
  const startDate = new Date(startDateStr);
  const currentDate = new Date();
  let years = currentDate.getFullYear() - startDate.getFullYear();
  const m = currentDate.getMonth() - startDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < startDate.getDate())) {
    years--;
  }
  return Math.max(0, years);
};

const getDoctorProfilePicture = (item: any) => {
  if (!item) return 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png';

  const rawPic =
    item.profile_picture ||
    item.doctorProfile?.profile_picture ||
    item.user?.doctorProfile?.profile_picture ||
    item.doctor?.doctorProfile?.profile_picture ||
    item.doctor?.profile_picture ||
    item.user?.profile_picture ||
    item.user?.generalUser?.profile_picture;

  if (!rawPic || typeof rawPic !== 'string' || rawPic.trim() === '') {
    return 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png';
  }

  const cleanUrl = rawPic.split('?')[0];
  const dateStr =
    item.updatedAt ||
    item.doctorProfile?.updatedAt ||
    item.user?.updatedAt ||
    item.user?.doctorProfile?.updatedAt ||
    item.doctor?.updatedAt;

  const ts = dateStr ? new Date(dateStr).getTime() : '';
  return ts ? `${cleanUrl}?t=${ts}` : `${cleanUrl}?t=${new Date().getTime()}`;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ item, onPress }) => {
  const address = item.user?.address?.[0];
  const fullLocation = address
    ? `${address.street ? `${address.street.trim()}, ` : ''}${address.city}`
    : 'Location N/A';

  const experience = item.practice_start_date
    ? calculateExperience(item.practice_start_date)
    : (item.experience_years || "NA");

  const profilePicUri = getDoctorProfilePicture(item);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-white p-3 border border-[rgba(114,119,127,0.05)] shadow-sm rounded-[16px] flex-row items-center min-h-[120px]`}
    >
      {/* Profile Image */}
      <View style={tw`w-24 h-24 rounded-[12px] overflow-hidden bg-gray-100`}>
        <Image
          key={profilePicUri}
          source={{ uri: profilePicUri }}
          style={tw`w-full h-full`}
        />
      </View>

      {/* Main Content Container */}
      <View style={tw`flex-1 ml-3 justify-center py-1`}>

        {/* Top Section: Name/Specialization and Rating */}
        <View style={tw`flex-row justify-between items-start mb-3`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[16px] font-bold text-[#191C1E]`}>
              {item.user?.username}
            </Text>
            <Text style={tw`text-[12px] font-medium text-[#124CB8]`}>
              {item.specialization} • {experience} yrs exp
            </Text>
          </View>


          {/* Fee Badge */}

        </View>

        {/* Bottom Section: Location and Book Now Button */}
        <View style={tw`gap-2`}>
          <View style={tw`flex-row items-center`}>
            <MapPin size={12} color="#42474E" />
            <Text style={tw`ml-1 text-[12px] text-[#42474E]`} numberOfLines={1}>
              {fullLocation}
            </Text>
          </View>

          <View style={tw`flex-row justify-between items-center mt-2`}>
            <View style={tw`bg-[#ECEEF4] px-2 py-1.5 rounded-[8px] flex-row items-center`}>
              <Text style={tw`text-[12px] font-bold text-[#191C1E]`}>₹{item.consultation_fee}</Text>
            </View>
            <TouchableOpacity
              onPress={onPress}
              style={tw`bg-[#124CB8] px-4 py-2 rounded-full items-center justify-center`}
            >
              <Text style={tw`text-white font-bold text-[12px]`}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const DoctorCardSkeleton: React.FC = () => {
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
      {/* Profile Image */}
      <Animated.View style={[tw`w-24 h-24 rounded-[12px] bg-gray-200`, { opacity }]} />

      {/* Main Content Container */}
      <View style={tw`flex-1 ml-3 justify-center py-1`}>
        {/* Top Section: Name/Specialization */}
        <View style={tw`flex-row justify-between items-start mb-3`}>
          <View style={tw`flex-1 gap-2`}>
            <Animated.View style={[tw`w-32 h-5 bg-gray-200 rounded`, { opacity }]} />
            <Animated.View style={[tw`w-24 h-4 bg-gray-200 rounded`, { opacity }]} />
          </View>
        </View>

        {/* Bottom Section */}
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

export default DoctorCard;