import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import { User, Calendar as CalendarIcon } from 'lucide-react-native';
import { useUser } from '../screens/contexts/UserContext';

export type AppointmentCardData = {
  id: number;
  user_id?: number;
  doctor_id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_type: string;
  appointment_status: string;
  payment_mode?: string;
  patientName?: string;
  doctor?: {
    username?: string;
    doctorProfile?: {
      profile_picture?: string;
    };
  };
  patient?: {
    username?: string;
    generalUser?: {
      profile_picture?: string;
    };
  };
};

type AppointmentCardProps = {
  appointment: AppointmentCardData;
  children?: React.ReactNode;
};

export default function AppointmentCard({ appointment, children }: AppointmentCardProps) {
  const { user } = useUser();
  const dateObj = new Date(appointment.appointment_date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Clean up time if it's like 10:30-11:00 or something, but we'll display as-is if short
  const timeText = appointment.appointment_start_time;

  const isDoctor = user?.role === 'doctor';

  const displayName = isDoctor
    ? appointment.patient?.username || appointment.patientName || `Patient #${appointment.user_id || appointment.id}`
    : appointment.doctor?.username || `Doctor #${appointment.doctor_id}`;

  const profilePic = isDoctor
    ? appointment.patient?.generalUser?.profile_picture
    : appointment.doctor?.doctorProfile?.profile_picture;

  return (
    <View style={tw`bg-white p-4 mb-4 rounded-[12px] border border-[#DAE1E7] flex-col relative`}>
      {/* Top Header */}
      <View style={tw`flex-row justify-between items-start mb-3`}>
        {/* Left Side: Icon + Details */}
        <View style={tw`flex-row items-center gap-3`}>
          {/* Avatar Background */}
          <View style={tw`w-12 h-12 bg-[#DBE3F1] rounded-lg items-center justify-center overflow-hidden`}>
            {profilePic ? (
              <Image source={{ uri: profilePic }} style={tw`w-full h-full`} resizeMode="cover" />
            ) : (
              <User size={24} color="#124CB8" />
            )}
          </View>

          {/* Name & Type */}
          <View style={tw`flex-col justify-center h-12`}>
            <Text style={tw`text-[#011D35] font-semibold text-[20px] leading-[28px]`}>
              {displayName}
            </Text>
            {/* Type Badge */}
            <View style={tw`bg-[#3766D2]/10 rounded-[4px] px-2 py-0.5 mt-0.5 self-start`}>
              <Text style={tw`text-[#124CB8] font-semibold text-[12px] leading-[16px] tracking-[0.6px] capitalize`}>
                {appointment.appointment_type || 'General'}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Side: Time */}
        <Text style={tw`text-[#434653] font-semibold text-[12px] leading-[16px] tracking-[0.6px] mt-2`}>
          {timeText}
        </Text>
      </View>

      {/* Date Row */}
      <View style={tw`flex-row items-center gap-2 mb-3`}>
        <CalendarIcon size={16} color="#434653" />
        <Text style={tw`text-[#434653] text-[16px] leading-[24px]`}>
          {formattedDate}
        </Text>
      </View>

      {/* Footer / Status Row */}
      <View style={tw`flex-row justify-between items-center pt-3 border-t border-[#DAE1E7]`}>
        {/* Status Pill */}
        <View style={tw`bg-[#CEE5FF] px-3 py-1 rounded-full items-center justify-center h-6`}>
          <Text style={tw`text-[#2E4962] font-semibold text-[12px] leading-[16px] tracking-[0.6px] capitalize`}>
            {appointment.appointment_status}
          </Text>
        </View>

        {/* Action Button (Children) */}
        {children && <View>{children}</View>}
      </View>
    </View>
  );
}
