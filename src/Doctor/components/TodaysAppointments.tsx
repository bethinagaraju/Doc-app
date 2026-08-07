import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MoreVertical, ChevronRight, Video, Phone } from 'lucide-react-native';
import tw from 'twrnc';

interface Appointment {
    id: string;
    time: string;
    patientName: string;
    type: string;
    avatarUrl?: string;
    isVideoConsultation?: boolean;
}

interface TodaysAppointmentsProps {
    appointments?: Appointment[];
    onViewAllPress?: () => void;
    onActionPress?: (appointment: Appointment) => void;
    onMorePress?: (appointment: Appointment) => void;
}

const DEFAULT_APPOINTMENTS: Appointment[] = [
    {
        id: '1',
        time: '09:00 AM',
        patientName: 'Sarah Jenkins',
        type: 'Routine Checkup',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
        isVideoConsultation: true,
    },
    {
        id: '2',
        time: '10:30 AM',
        patientName: 'Michael Chen',
        type: 'Cardiology Consultation',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
        isVideoConsultation: false,
    },
    {
        id: '3',
        time: '01:15 PM',
        patientName: 'Emma Watson',
        type: 'Follow-up Visit',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150',
        isVideoConsultation: true,
    },
];

const TodaysAppointments: React.FC<TodaysAppointmentsProps> = ({
    appointments = DEFAULT_APPOINTMENTS,
    onViewAllPress,
    onActionPress,
    onMorePress,
}) => {
    return (
        /* Today's Appointments - Large Section Card */
        <View
            style={[
                tw`w-full bg-white rounded-[16px] p-[24px] border border-[#C3C6D5]/20 gap-[32px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Top Header Row */}
            <View style={tw`w-full flex-row justify-between items-center h-[88px]`}>
                <View style={tw`flex-col items-start gap-[0px]`}>
                    <Text
                        style={tw`text-[24px] font-semibold text-[#011D35] font-['Inter'] tracking-[-0.24px] leading-[32px]`}
                    >
                        Today's Appointments
                    </Text>
                    <Text
                        style={tw`text-[16px] font-normal text-[#434653] font-['Inter'] leading-[24px] mt-[8px]`}
                    >
                        {appointments.length} patients scheduled
                    </Text>
                </View>

                {/* View All Action Link */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onViewAllPress}
                    style={tw`flex-row items-center justify-center h-[32px] gap-[6px] pl-[10px]`}
                >
                    <Text
                        style={tw`text-[12px] font-semibold text-[#124CB8] font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                    >
                        SEE ALL
                    </Text>
                    <ChevronRight size={14} color="#124CB8" />
                </TouchableOpacity>
            </View>

            {/* Appointment Cards List Container */}
            <View style={tw`w-full gap-[16px]`}>
                {appointments.map((item) => (
                    <View
                        key={item.id}
                        style={tw`w-full bg-[#F8F9FF]/50 border border-[#C3C6D5]/30 rounded-[24px] p-[16px] gap-[16px]`}
                    >
                        {/* Row 1: Time Overlay & Context Menu */}
                        <View style={tw`w-full flex-row justify-between items-center h-[24px]`}>
                            <View style={tw`bg-[#124CB8]/10 rounded-full px-[12px] py-[4px]`}>
                                <Text
                                    style={tw`text-[12px] font-semibold text-[#124CB8] font-['Inter'] tracking-[0.6px] leading-[16px]`}
                                >
                                    {item.time}
                                </Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => onMorePress?.(item)}
                                style={tw`p-[4px]`}
                            >
                                <MoreVertical size={18} color="#737684" />
                            </TouchableOpacity>
                        </View>

                        {/* Row 2: Patient Profile Info */}
                        <View style={tw`w-full flex-row items-center gap-[12px]`}>
                            <Image
                                source={{ uri: item.avatarUrl || 'https://via.placeholder.com/150' }}
                                style={tw`w-[40px] h-[40px] rounded-full bg-[#DBE3F1]`}
                            />

                            <View style={tw`flex-1 flex-col items-start`}>
                                <Text
                                    style={tw`text-[16px] font-bold text-[#011D35] font-['Inter'] leading-[24px]`}
                                    numberOfLines={1}
                                >
                                    {item.patientName}
                                </Text>
                                <Text
                                    style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}
                                    numberOfLines={1}
                                >
                                    {item.type}
                                </Text>
                            </View>
                        </View>

                        {/* Row 3: Action Buttons */}
                        <View style={tw`w-full flex-row items-center gap-[8px] h-[42px]`}>
                            {/* Primary Consultation Button */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => onActionPress?.(item)}
                                style={tw`flex-1 h-[42px] bg-[#124CB8] rounded-[16px] justify-center items-center flex-row gap-[8px]`}
                            >
                                <Text
                                    style={tw`text-[12px] font-semibold text-white font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                                >
                                    {item.isVideoConsultation ? 'START CALL' : 'DETAILS'}
                                </Text>
                            </TouchableOpacity>

                            {/* Secondary Icon Action Button */}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={tw`w-[38px] h-[38px] border border-[#C3C6D5] rounded-[16px] justify-center items-center`}
                            >
                                {item.isVideoConsultation ? (
                                    <Video size={18} color="#434653" />
                                ) : (
                                    <Phone size={18} color="#434653" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default TodaysAppointments;