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














import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { MapPin, Star } from 'lucide-react-native';

interface DoctorCardProps {
  item: any;
  onPress: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ item, onPress }) => {
  const address = item.user?.address?.[0];
  const fullLocation = address
    ? `${address.street ? `${address.street.trim()}, ` : ''}${address.city}`
    : 'Location N/A';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-white py-4 px-2 border border-[rgba(114,119,127,0.05)] shadow-sm rounded-[16px] flex-row h-[138px]`}
    >
      {/* Profile Image - 96x96 */}
      <View style={tw`w-[96px] h-[96px] rounded-[12px] overflow-hidden`}>
        <Image
          source={{ uri: item.profile_picture }}
          style={tw`w-full h-full`}
        />
      </View>

      {/* Main Content Container - 212px */}
      <View style={tw`flex-1 ml-4 justify-center`}>

        {/* Top Section: Name/Specialization and Rating */}
        <View style={tw`flex-row justify-between items-start mb-3`}>
          <View style={tw`flex-1`}>
            <Text style={tw`text-[16px] font-bold text-[#191C1E]`}>
              {item.user?.username}
            </Text>
            <Text style={tw`text-[12px] font-medium text-[#124CB8]`}>
              {item.specialization} • {item.experience_years} yrs exp
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

          <View style={tw`flex-row justify-between items-center`}>
            <View style={tw`bg-[#ECEEF4] px-1 py-1 rounded-[8px] flex-row items-center gap-1`}>
              <Text style={tw`text-[12px] font-bold text-[#191C1E]`}>₹{item.consultation_fee}</Text>
            </View>
            <TouchableOpacity
              onPress={onPress}
              style={tw`bg-[#124CB8] px-2 mr-4 py-2 rounded-full w-[90px] items-center justify-center`}
            >
              <Text style={tw`text-white font-bold text-[12px]`}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DoctorCard;