import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import tw from 'twrnc';

interface PatientAppointmentCardProps {
    appointment?: any;
    onPress?: () => void;
}

const PatientAppointmentCard: React.FC<PatientAppointmentCardProps> = ({ appointment, onPress }) => {
    const doctor = appointment?.doctor;
    const doctorName = doctor?.username || "Dr. Sarah Jenkins";
    const specialization = doctor?.doctorProfile?.specialization || "Cardiologist";
    const profilePic = doctor?.doctorProfile?.profile_picture || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200';

    // Format Date
    const dateObj = appointment?.appointment_date ? new Date(appointment.appointment_date) : null;
    const formattedDate = dateObj && !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'Oct 24, 2023';

    // Format Time
    const formatTime = (timeStr: string) => {
        if (!timeStr) return '10:30 AM';
        const parts = timeStr.split(':');
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1] || '00';
        if (isNaN(hours)) return timeStr;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const formattedTime = appointment?.appointment_start_time 
        ? formatTime(appointment.appointment_start_time) 
        : '10:30 AM';

    // Status Styling
    const getStatusStyle = (statusStr: string) => {
        const s = statusStr?.toLowerCase();
        if (s === 'confirmed') {
            return { bg: 'bg-[#E2FBE7]', text: 'text-[#0A5A1A]' };
        } else if (s === 'cancelled') {
            return { bg: 'bg-[#FFE5E5]', text: 'text-[#C53030]' };
        } else if (s === 'completed' || s === 'closed') {
            return { bg: 'bg-[#F1F3F5]', text: 'text-[#495057]' };
        }
        return { bg: 'bg-[#CAE6FF]', text: 'text-[#001E30]' };
    };

    const statusText = appointment?.appointment_status || 'Upcoming';
    const statusStyle = getStatusStyle(statusText);

    return (
        <View style={tw`flex flex-col items-start p-5 gap-4 w-full max-w-[358px] bg-white border border-[#DEE3EB] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] self-center mb-4`}>

            {/* Top Header Section */}
            <View style={tw`flex flex-row justify-between items-start w-full`}>
                {/* Doctor Info & Avatar */}
                <View style={tw`flex flex-row items-start gap-4`}>
                    <Image
                        source={{ uri: profilePic }}
                        style={tw`w-14 h-14 rounded-[12px] bg-[#CAE6FF]`}
                        resizeMode="cover"
                    />
                    <View style={tw`flex flex-col justify-center h-14`}>
                        <Text style={tw`font-bold text-[18px] leading-[28px] text-[#191C1E] font-['Public_Sans']`}>
                            {doctorName}
                        </Text>
                        <Text style={tw`font-medium text-[14px] leading-[20px] text-[#124CB8] font-['Public_Sans']`}>
                            {specialization}
                        </Text>
                    </View>
                </View>

                {/* Status Badge */}
                <View style={tw`flex flex-col items-start px-3 py-1 ${statusStyle.bg} rounded-full`}>
                    <Text style={tw`font-bold text-[12px] leading-[16px] ${statusStyle.text} font-['Public_Sans'] uppercase`}>
                        {statusText}
                    </Text>
                </View>
            </View>

            {/* Horizontal Divider */}
            <View style={tw`w-full h-[1px] bg-[#EEEEEE] my-1`} />

            {/* Date and Time Section */}
            <View style={tw`flex flex-row items-center w-full relative h-5`}>
                {/* Date */}
                <View style={tw`flex flex-row items-center gap-2 absolute left-0`}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#72777F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <Path d="M16 2v4M8 2v4M3 10h18" />
                    </Svg>
                    <Text style={tw`font-medium text-[14px] leading-[20px] text-[#191C1E] font-['Public_Sans']`}>
                        {formattedDate}
                    </Text>
                </View>

                {/* Time */}
                <View style={tw`flex flex-row items-center gap-2 absolute left-[166px]`}>
                    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#72777F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <Circle cx="12" cy="12" r="10" />
                        <Path d="M12 6v6l4 2" />
                    </Svg>
                    <Text style={tw`font-medium text-[14px] leading-[20px] text-[#191C1E] font-['Public_Sans']`}>
                        {formattedTime}
                    </Text>
                </View>
            </View>

            {appointment?.checkupAppointment && appointment.checkupAppointment.length > 0 && (() => {
                const checkup = appointment.checkupAppointment[0];
                const cDateObj = checkup.checkup_date ? new Date(checkup.checkup_date) : null;
                const formattedCheckupDate = cDateObj && !isNaN(cDateObj.getTime())
                    ? cDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : 'N/A';
                
                const checkupTimeFormatted = `${formatTime(checkup.checkup_start_time)} - ${formatTime(checkup.checkup_end_time)}`;

                return (
                    <View style={tw`w-full bg-[#FFF7ED] border border-[#FED7AA] rounded-[8px] p-3 flex-col gap-1 mt-2`}>
                        <View style={tw`flex-row items-center gap-1.5`}>
                            <View style={tw`w-2 h-2 rounded-full bg-[#EA580C]`} />
                            <Text style={tw`text-[#EA580C] font-bold text-[14px] font-['Public_Sans']`}>
                                Follow-up Booked
                            </Text>
                        </View>
                        <Text style={tw`text-[#42474E] text-[13px] font-['Public_Sans']`}>
                            Date: <Text style={tw`font-semibold text-[#191C1E]`}>{formattedCheckupDate}</Text>
                        </Text>
                        <Text style={tw`text-[#42474E] text-[13px] font-['Public_Sans']`}>
                            Time: <Text style={tw`font-semibold text-[#191C1E]`}>{checkupTimeFormatted}</Text>
                        </Text>
                        <Text style={tw`text-[#42474E] text-[13px] font-['Public_Sans']`}>
                            Status: <Text style={tw`font-semibold capitalize text-[#191C1E]`}>{checkup.checkup_status}</Text>
                        </Text>
                    </View>
                );
            })()}

            {/* Action Button */}
            <TouchableOpacity
                style={tw`flex flex-row justify-center items-center py-3 gap-2 w-full bg-[#E8E9EF] rounded-[8px] mt-2`}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Text style={tw`font-semibold text-[16px] leading-[24px] text-center text-[#0C1D29] font-['Public_Sans']`}>
                    View Details
                </Text>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0C1D29" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <Path d="M5 12h14M12 5l7 7-7 7" />
                </Svg>
            </TouchableOpacity>

        </View>
    );
};

export default PatientAppointmentCard;