// import React from 'react';
// import { View, Text, Image, TouchableOpacity } from 'react-native';
// import tw from 'twrnc';

// interface ProfilePhotoSectionProps {
//   profilePicture: string;
//   name: string;
//   specialization: string;
//   onUploadPress: () => void;
//   onDeletePress: () => void;
// }

// const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
//   profilePicture,
//   name,
//   specialization,
//   onUploadPress,
//   onDeletePress,
// }) => {
//   return (
//     <View style={tw`items-center mb-6`}>
//       <Image source={{ uri: profilePicture }} style={tw`w-28 h-28 rounded-full`} />
//       <View style={tw`flex-row mt-3`}>
//         <TouchableOpacity style={tw`bg-green-600 px-4 py-2 rounded-full mr-2`} onPress={onUploadPress}>
//           <Text style={tw`text-white font-semibold`}>Upload Photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={tw`bg-red-500 px-4 py-2 rounded-full`} onPress={onDeletePress}>
//           <Text style={tw`text-white font-semibold`}>Delete</Text>
//         </TouchableOpacity>
//       </View>
//       <Text style={tw`text-green-700 text-xl font-bold mt-3`}>{name}</Text>
//       <Text style={tw`text-emerald-500 text-base`}>{specialization}</Text>
//     </View>
//   );
// };

// export default ProfilePhotoSection;



import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Pencil, Briefcase, IdCard, BadgeCheck } from 'lucide-react-native';
import tw from 'twrnc';

interface ProfilePhotoSectionProps {
  profilePicture: string;
  name: string;
  specialization: string;
  experienceYears?: number | string;
  licenseNumber?: string;
  isVerified?: boolean;
  onUploadPress: () => void;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({
  profilePicture,
  name,
  specialization,
  experienceYears = 14,
  licenseNumber = 'MC-99201-B',
  isVerified = true,
  onUploadPress,
}) => {
  return (
    /* Main Info Card */
    <View
      style={[
        tw`w-full bg-white/80 rounded-[8px] px-6 py-3 items-center gap-6 mb-4`
      ]}
    >
      {/* Profile Picture Container with Edit Button */}
      <View style={tw`w-[128px] h-[128px] relative justify-center items-center`}>
        {/* Overlay Border & Shadow Ring */}
        <View
          style={[
            tw`w-[128px] h-[128px] rounded-full border-4 border-white justify-center items-center bg-white/0 overflow-hidden`,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 6,
              elevation: 3,
            },
          ]}
        >
          <Image
            source={{ uri: profilePicture || 'https://via.placeholder.com/150' }}
            style={tw`w-[120px] h-[120px] rounded-full`}
            resizeMode="cover"
          />
        </View>

        {/* Floating Edit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onUploadPress}
          style={[
            tw`absolute right-[4px] bottom-[4px] w-[29.5px] h-[29.5px] bg-[#124CB8] rounded-full justify-center items-center z-10`,
            {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.1,
              shadowRadius: 15,
              elevation: 5,
            },
          ]}
        >
          <Pencil size={13.5} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Doctor Meta Info Container */}
      <View style={tw`w-[284.23px] items-center gap-[8px]`}>
        {/* Name and Verification Badge Row */}
        <View style={tw`w-full flex-row justify-center items-center gap-[8px] h-[32px]`}>
          <Text
            style={tw`text-[24px] font-semibold text-[#011D35] font-['Inter'] tracking-[-0.24px] leading-[32px] text-center`}
            numberOfLines={1}
          >
            {name}
          </Text>

          {isVerified && (
            <View style={tw`justify-center items-center ml-1`}>
              <BadgeCheck size={24} color="#3766D2" />
            </View>
          )}
        </View>

        {/* Specialization Text */}
        <Text
          style={tw`w-[283.75px] text-[18px] font-normal text-[#575F6B] font-['Inter'] leading-[28px] text-center`}
        >
          {specialization}
        </Text>

        {/* Experience & License Metadata Row */}
        <View style={tw`w-full items-center justify-center pt-[8px] gap-[8px]`}>
          {/* Experience */}
          <View style={tw`flex-row items-center gap-[8px] h-[24px]`}>
            <Briefcase size={20} color="#124CB8" />
            <Text style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}>
              {experienceYears} Years Experience
            </Text>
          </View>

          {/* License */}
          <View style={tw`flex-row items-center gap-[8px] h-[24px]`}>
            <IdCard size={20} color="#124CB8" />
            <Text style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}>
              Lic: #{licenseNumber}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePhotoSection;