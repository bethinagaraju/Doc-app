// import React from 'react';
// import { View, Text, Image } from 'react-native';
// import { Briefcase, IndianRupee, ShieldCheck } from 'lucide-react-native';
// import tw from 'twrnc';

// interface DoctorProfileInfoProps {
//   doctor: any;
//   consultationMode: string;
// }

// const DoctorProfileInfo: React.FC<DoctorProfileInfoProps> = ({ doctor, consultationMode }) => {
//   return (
//     <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
//       <View style={tw`flex-row items-center mb-4`}>
//         <Image
//           source={{ uri: doctor.profile_picture || 'https://via.placeholder.com/150' }}
//           style={tw`w-24 h-24 rounded-full border-4 border-green-200 mr-4`}
//         />
//         <View style={tw`flex-1`}>
//           <Text style={tw`text-xl font-bold text-green-900`}>{doctor.user?.username}</Text>
//           <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{doctor.specialization}</Text>
//           <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{consultationMode}</Text>
//           <View style={tw`flex-row items-center mt-2`}>
//             <Briefcase size={16} color="#6b7280" />
//             <Text style={tw`text-sm text-green-600 ml-2`}>
//               {doctor.experience_years} years experience
//             </Text>
//           </View>
//         </View>
//       </View>

//       <View style={tw`flex-row justify-between bg-green-50 rounded-xl px-4 py-3`}>
//         <View style={tw`flex-row items-center`}>
//           <IndianRupee size={16} color="#059669" />
//           <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
//             ₹{doctor.consultation_fee}
//           </Text>
//         </View>
//         <View style={tw`flex-row items-center`}>
//           <ShieldCheck size={16} color="#059669" />
//           <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
//             {doctor.license_number}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default DoctorProfileInfo;










import React from 'react';
import { View, Text, Image } from 'react-native';
import { ShieldCheck, Star } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

interface DoctorProfileInfoProps {
  doctor: any;
}

const calculateExperience = (startDateStr?: string) => {
  if (!startDateStr) return null;
  const startYear = parseInt(startDateStr.substring(0, 4), 10);
  if (isNaN(startYear)) return null;
  const currentYear = new Date().getFullYear();
  const diff = currentYear - startYear;
  return diff > 0 ? diff.toString() : '0';
};

const DoctorProfileInfo: React.FC<DoctorProfileInfoProps> = ({ doctor }) => {
  const rawPic =
    doctor?.profile_picture ||
    doctor?.doctorProfile?.profile_picture ||
    doctor?.user?.doctorProfile?.profile_picture ||
    doctor?.doctor?.doctorProfile?.profile_picture ||
    doctor?.doctor?.profile_picture ||
    doctor?.user?.profile_picture ||
    doctor?.user?.generalUser?.profile_picture;

  const cleanUrl = rawPic ? rawPic.split('?')[0] : 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png';
  const dateStr =
    doctor?.updatedAt ||
    doctor?.doctorProfile?.updatedAt ||
    doctor?.user?.updatedAt ||
    doctor?.user?.doctorProfile?.updatedAt ||
    doctor?.doctor?.updatedAt;

  const ts = dateStr ? new Date(dateStr).getTime() : '';
  const profilePicUri = rawPic ? (ts ? `${cleanUrl}?t=${ts}` : `${cleanUrl}?t=${new Date().getTime()}`) : cleanUrl;

  return (
    /* Doctor Hero Section */
    <View style={tw`bg-white border border-[#DEE3EB]/30 rounded-xl p-6  flex-col items-center gap-6 shadow-sm self-stretch`}>

      {/* Profile Image Container with Badge */}
      <View style={tw`w-32 h-32 relative justify-center items-start`}>
        <Image
          key={profilePicUri}
          source={{ uri: profilePicUri }}
          style={tw`w-32 h-32 rounded-2xl shadow-md`}
        />
        {/* Verification Badge */}
        <View style={tw`absolute -right-2 -bottom-2 w-[28.5px] h-[27.75px] bg-[#124CB8] rounded-lg justify-center items-center shadow-lg z-10 p-[6px]`}>
          <Svg width="17" height="16" viewBox="0 0 17 16" fill="none">
            <Path d="M5.7 15.75L4.275 13.35L1.575 12.75L1.8375 9.975L0 7.875L1.8375 5.775L1.575 3L4.275 2.4L5.7 0L8.25 1.0875L10.8 0L12.225 2.4L14.925 3L14.6625 5.775L16.5 7.875L14.6625 9.975L14.925 12.75L12.225 13.35L10.8 15.75L8.25 14.6625L5.7 15.75ZM7.4625 10.5375L11.7 6.3L10.65 5.2125L7.4625 8.4L5.85 6.825L4.8 7.875L7.4625 10.5375Z" fill="white" />
          </Svg>
        </View>
      </View>

      {/* Info Container */}
      <View style={tw`w-[251.98px] flex-col items-center gap-1`}>

        {/* Name and Tag Container */}
        <View style={tw`w-full flex-col items-center gap-2 mb-1`}>
          <Text style={tw`text-2xl font-bold text-[#191C1E] text-center font-['Public Sans']`}>
            {doctor.user?.username || 'Dr. Name'}
          </Text>

          {/* Specialist Tag */}
          <View style={tw`w-full bg-[#EADCFF] rounded-full py-1 px-3 justify-center items-center`}>
            <Text style={tw`text-[12px] font-bold text-[#201635] text-center uppercase tracking-wider font-['Public Sans']`}>
              Specialist
            </Text>
          </View>
        </View>

        {/* Subtitle / Specialization */}
        <Text style={tw`text-base font-semibold text-[#124CB8] text-center font-['Public Sans'] mb-2`}>
          {doctor.specialization || 'Senior Cardiologist'}
        </Text>

        {/* Stats Row Container */}
        <View style={tw`w-full flex-row justify-center items-start pt-3 gap-4`}>

          {/* Experience Stat */}
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-[12px] font-bold text-[#42474E] text-center uppercase tracking-[0.6px] font-['Public Sans'] mb-0.5`}>
              EXPERIENCE
            </Text>
            <Text style={tw`text-[18px] font-bold text-[#191C1E] text-center font-['Public Sans']`}>
              {calculateExperience(doctor.practice_start_date) || doctor.experience_years || '0'} Years
            </Text>
          </View>

          {/* Divider 1 */}
          {/* <View style={tw`w-[1px] h-11 justify-center items-center`}>
            <View style={tw`w-[1px] h-8 bg-[#DEE3EB]`} />
          </View> */}

          {/* Reviews Stat */}
          {/* <View style={tw`flex-col items-center`}>
            <Text style={tw`text-[12px] font-bold text-[#42474E] text-center uppercase tracking-[0.6px] font-['Public Sans'] mb-0.5`}>
              REVIEWS
            </Text>
            <View style={tw`flex-row items-center gap-1`}>
              <Text style={tw`text-[18px] font-bold text-[#191C1E] text-center font-['Public Sans']`}>
                {doctor.rating || '4.9'}
              </Text>
              <Star size={14.25} color="#EAB308" fill="#EAB308" />
            </View>
          </View> */}

          {/* Divider 2 */}
          <View style={tw`w-[1px] h-11 justify-center items-center`}>
            <View style={tw`w-[1px] h-8 bg-[#DEE3EB]`} />
          </View>

          {/* Fee Stat */}
          <View style={tw`flex-col items-center`}>
            <Text style={tw`text-[12px] font-bold text-[#42474E] text-center uppercase tracking-[0.6px] font-['Public Sans'] mb-0.5`}>
              FEE
            </Text>
            <Text style={tw`text-[18px] font-bold text-[#124CB8] text-center font-['Public Sans']`}>
              ${doctor.consultation_fee || '0'}
            </Text>
          </View>

        </View>

      </View>
    </View>
  );
};

export default DoctorProfileInfo;