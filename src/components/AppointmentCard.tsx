import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
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
  checkupAppointment?: any[];
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

  const isDoctor = user?.role?.toLowerCase() === 'doctor' || !!appointment.patient;

  const displayName = isDoctor
    ? appointment.patient?.username || appointment.patientName || `Patient #${appointment.user_id || appointment.id}`
    : appointment.doctor?.username || `Doctor #${appointment.doctor_id}`;
  const rawProfilePic = isDoctor
    ? appointment.patient?.generalUser?.profile_picture
    : appointment.doctor?.doctorProfile?.profile_picture;

  const profilePic = rawProfilePic
    ? (rawProfilePic.includes('?t=') || rawProfilePic.includes('&t=')
        ? rawProfilePic
        : `${rawProfilePic}${rawProfilePic.includes('?') ? '&' : '?'}t=${new Date().getTime()}`)
    : null;

  return (
    <View style={tw`bg-white p-4 mb-4 rounded-[12px] border border-[#DAE1E7] flex-col relative`}>
      {/* Top Header */}
      <View style={tw`flex-row justify-between items-start mb-3`}>
        {/* Left Side: Icon + Details */}
        <View style={tw`flex-row items-center gap-3`}>
          {/* Avatar Background */}
          <View style={tw`w-12 h-12 bg-[#DBE3F1] rounded-lg items-center justify-center overflow-hidden`}>
            {profilePic ? (
              <Image key={profilePic} source={{ uri: profilePic }} style={tw`w-full h-full`} resizeMode="cover" />
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

      {appointment.checkupAppointment && appointment.checkupAppointment.length > 0 && (() => {
        const checkup = appointment.checkupAppointment[0];
        const cDateObj = checkup.checkup_date ? new Date(checkup.checkup_date) : null;
        const formattedCheckupDate = cDateObj && !isNaN(cDateObj.getTime())
            ? cDateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : 'N/A';
        
        const formatTimeLocal = (timeStr?: string) => {
          if (!timeStr) return '';
          const parts = timeStr.split(':');
          if (parts.length >= 2) {
            let hours = parseInt(parts[0], 10);
            const minutes = parts[1];
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
          }
          return timeStr;
        };

        const checkupTimeFormatted = `${formatTimeLocal(checkup.checkup_start_time)} - ${formatTimeLocal(checkup.checkup_end_time)}`;

        return (
          <View style={tw`bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3 flex-col gap-1`}>
            <View style={tw`flex-row items-center gap-1.5`}>
              <View style={tw`w-2 h-2 rounded-full bg-orange-500`} />
              <Text style={tw`text-orange-800 font-bold text-[14px] font-['Inter']`}>
                Follow-up Appointment Booked
              </Text>
            </View>
            <Text style={tw`text-[#434653] text-[13px] font-['Inter']`}>
              Date: <Text style={tw`font-semibold text-[#011D35]`}>{formattedCheckupDate}</Text>
            </Text>
            <Text style={tw`text-[#434653] text-[13px] font-['Inter']`}>
              Time: <Text style={tw`font-semibold text-[#011D35]`}>{checkupTimeFormatted}</Text>
            </Text>
            <Text style={tw`text-[#434653] text-[13px] font-['Inter']`}>
              Status: <Text style={tw`font-semibold capitalize text-[#011D35]`}>{checkup.checkup_status}</Text>
            </Text>
          </View>
        );
      })()}

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

export function AppointmentCardSkeleton() {
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
    <View style={tw`bg-white p-4 mb-4 rounded-[12px] border border-[#DAE1E7] flex-col relative`}>
      {/* Top Header */}
      <View style={tw`flex-row justify-between items-start mb-3`}>
        {/* Left Side: Icon + Details */}
        <View style={tw`flex-row items-center gap-3`}>
          {/* Avatar Background */}
          <Animated.View style={[tw`w-12 h-12 bg-gray-200 rounded-lg`, { opacity }]} />

          {/* Name & Type */}
          <View style={tw`flex-col justify-center h-12 gap-2`}>
            <Animated.View style={[tw`w-32 h-5 bg-gray-200 rounded`, { opacity }]} />
            <Animated.View style={[tw`w-16 h-4 bg-gray-200 rounded`, { opacity }]} />
          </View>
        </View>

        {/* Right Side: Time */}
        <Animated.View style={[tw`w-12 h-4 bg-gray-200 rounded mt-2`, { opacity }]} />
      </View>

      {/* Date Row */}
      <View style={tw`flex-row items-center gap-2 mb-3`}>
        <Animated.View style={[tw`w-24 h-4 bg-gray-200 rounded`, { opacity }]} />
      </View>

      {/* Footer / Status Row */}
      <View style={tw`flex-row justify-between items-center pt-3 border-t border-[#DAE1E7]`}>
        {/* Status Pill */}
        <Animated.View style={[tw`w-20 h-6 bg-gray-200 rounded-full`, { opacity }]} />
      </View>
    </View>
  );
}
