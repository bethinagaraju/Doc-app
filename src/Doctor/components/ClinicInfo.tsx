import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Edit2 } from 'lucide-react-native';
import tw from 'twrnc';

interface ClinicInfoProps {
    clinicName?: string;
    location?: string;
    workingHours?: string;
    onEditPress?: () => void;
}

const ClinicInfo: React.FC<ClinicInfoProps> = ({
    clinicName = 'Central Medical Hub',
    location = 'Building A, Room 302',
    workingHours = '08:00 AM - 05:00 PM',
    onEditPress,
}) => {
    return (
        /* Clinic Info Main Section Card */
        <View
            style={[
                tw`w-full max-w-[350px] bg-white rounded-[16px] p-[24px] border border-[#C3C6D5]/20 flex-col items-start`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Header Container */}
            <View style={tw`w-full pb-[24px]`}>
                <Text
                    style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                >
                    Clinic Info
                </Text>
            </View>

            {/* Info Items Stack Container */}
            <View style={tw`w-full flex-col gap-[24px]`}>
                {/* Item 1: Clinic Name & Location */}
                <View style={tw`w-full flex-row items-start gap-[16px]`}>
                    {/* Location Icon Container */}
                    <View style={tw`w-[16px] pt-[2px] justify-start items-center`}>
                        <MapPin size={20} color="#124CB8" />
                    </View>

                    {/* Details */}
                    <View style={tw`flex-1 flex-col items-start`}>
                        <Text
                            style={tw`text-[16px] font-semibold text-[#011D35] font-['Inter'] leading-[24px]`}
                            numberOfLines={1}
                        >
                            {clinicName}
                        </Text>
                        <Text
                            style={tw`text-[16px] font-normal text-[#434653] font-['Inter'] leading-[24px]`}
                            numberOfLines={1}
                        >
                            {location}
                        </Text>
                    </View>
                </View>

                {/* Item 2: Working Hours */}
                <View style={tw`w-full flex-row items-start gap-[16px]`}>
                    {/* Clock Icon Container */}
                    <View style={tw`w-[20px] pt-[2px] justify-start items-center`}>
                        <Clock size={20} color="#124CB8" />
                    </View>

                    {/* Details */}
                    <View style={tw`flex-1 flex-col items-start`}>
                        <Text
                            style={tw`text-[16px] font-semibold text-[#011D35] font-['Inter'] leading-[24px]`}
                            numberOfLines={1}
                        >
                            Working Hours
                        </Text>
                        <Text
                            style={tw`text-[16px] font-normal text-[#434653] font-['Inter'] leading-[24px]`}
                            numberOfLines={1}
                        >
                            {workingHours}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Action Button Container */}
            <View style={tw`w-full pt-[24px]`}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onEditPress}
                    style={tw`w-full h-[44px] bg-[#DBE3F1] rounded-[16px] flex-row justify-center items-center gap-[8px]`}
                >
                    <Edit2 size={15} color="#5D6571" />
                    <Text
                        style={tw`text-[14px] font-normal text-[#5D6571] font-['Inter'] leading-[20px] text-center`}
                    >
                        Edit Quick Info
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ClinicInfo;