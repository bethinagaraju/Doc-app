import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';

interface PatientCardProps {
    patientName?: string;
    patientId?: string;
    avatarUrl?: string;
    ageGender?: string;
    appointmentIdDisplay?: string;
    appointmentTime?: string;
    appointmentType?: string;
    // Backward compatibility props (optional)
    bloodType?: string;
    lastVisit?: string;
    weight?: string;
}

const PatientCard: React.FC<PatientCardProps> = ({
    patientName = 'Sarah Johnson',
    patientId = 'Patient ID: #SJ-8829',
    avatarUrl = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    ageGender = '',
    appointmentIdDisplay = '#',
    appointmentTime = '',
    appointmentType = '',
}) => {
    return (
        /* Section - Patient Card Container */
        <View
            style={[
                tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[24px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Top Patient Meta Info Row */}
            <View style={tw`w-full flex-row items-center gap-[16px]`}>
                {/* Patient Profile Avatar */}
                <Image
                    source={{ uri: avatarUrl }}
                    style={tw`w-[64px] h-[64px] rounded-[12px] bg-[#DBE9FF]`}
                    resizeMode="cover"
                />

                {/* Name and ID Group */}
                <View style={tw`flex-1 flex-col justify-center`}>
                    <Text
                        style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                        numberOfLines={1}
                    >
                        {patientName}
                    </Text>
                    <Text
                        style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}
                        numberOfLines={1}
                    >
                        {patientId}
                    </Text>
                </View>
            </View>

            {/* 2x2 Grid Info Blocks Container (4 Boxes) */}
            <View style={tw`w-full flex-col gap-[16px]`}>
                {/* Row 1: Age / Gender & Appointment ID */}
                <View style={tw`w-full flex-row gap-[16px]`}>
                    {/* Age / Gender Block */}
                    <View style={tw`flex-1 bg-[#EEF4FF] rounded-[8px] p-[12px] h-[63px] justify-center`}>
                        <Text
                            style={tw`text-[10px] font-bold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[15px]`}
                        >
                            AGE / GENDER
                        </Text>
                        <Text
                            style={tw`text-[15px] font-semibold text-[#011D35] font-['Inter'] leading-[22px]`}
                            numberOfLines={1}
                        >
                            {ageGender}
                        </Text>
                    </View>

                    {/* Appointment ID Block */}
                    <View style={tw`flex-1 bg-[#EEF4FF] rounded-[8px] p-[12px] h-[63px] justify-center`}>
                        <Text
                            style={tw`text-[10px] font-bold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[15px]`}
                        >
                            APPOINTMENT ID
                        </Text>
                        <Text
                            style={tw`text-[15px] font-semibold text-[#011D35] font-['Inter'] leading-[22px]`}
                            numberOfLines={1}
                        >
                            {appointmentIdDisplay}
                        </Text>
                    </View>
                </View>

                {/* Row 2: Appointment Time & Type */}
                <View style={tw`w-full flex-row gap-[16px]`}>
                    {/* Appointment Time Block */}
                    <View style={tw`flex-1 bg-[#EEF4FF] rounded-[8px] p-[12px] h-[63px] justify-center`}>
                        <Text
                            style={tw`text-[10px] font-bold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[15px]`}
                        >
                            DURATION
                        </Text>
                        <Text
                            style={tw`text-[15px] font-semibold text-[#011D35] font-['Inter'] leading-[22px]`}
                            numberOfLines={1}
                        >
                            {appointmentTime}
                        </Text>
                    </View>

                    {/* Type Block */}
                    <View style={tw`flex-1 bg-[#EEF4FF] rounded-[8px] p-[12px] h-[63px] justify-center`}>
                        <Text
                            style={tw`text-[10px] font-bold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[15px]`}
                        >
                            TYPE
                        </Text>
                        <Text
                            style={tw`text-[15px] font-semibold text-[#011D35] font-['Inter'] leading-[22px] capitalize`}
                            numberOfLines={1}
                        >
                            {appointmentType}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PatientCard;