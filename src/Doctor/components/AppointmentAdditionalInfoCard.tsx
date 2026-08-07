import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface AppointmentAdditionalInfoProps {
    appointmentId: number | string;
    paymentMode?: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    status: string;
    type: string;
}

const AppointmentAdditionalInfoCard: React.FC<AppointmentAdditionalInfoProps> = ({
    appointmentId,
    paymentMode = 'Not specified',
    appointmentDate,
    startTime,
    endTime,
    status,
    type,
}) => {
    const formattedDate = appointmentDate ? new Date(appointmentDate).toDateString() : 'N/A';

    return (
        <View
            style={[
                tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[12px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            <Text style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter'] leading-[24px] mb-[4px]`}>
                Additional Info
            </Text>

            {/* Appointment ID */}
            <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment ID</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>#{appointmentId}</Text>
            </View>

            {/* Payment Mode */}
            <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Payment Mode</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>
                    {paymentMode || 'Not specified'}
                </Text>
            </View>

            {/* Appointment Date */}
            <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment Date</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>{formattedDate}</Text>
            </View>

            {/* Appointment Time */}
            <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment Time</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>
                    {startTime} - {endTime}
                </Text>
            </View>

            {/* Status */}
            <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Status</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>{status}</Text>
            </View>

            {/* Type */}
            <View style={tw`flex-row justify-between py-[8px]`}>
                <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Type</Text>
                <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>{type}</Text>
            </View>
        </View>
    );
};

export default AppointmentAdditionalInfoCard;
