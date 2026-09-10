import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

interface FollowUpAppointmentCardProps {
  checkup: any;
}

const FollowUpAppointmentCard: React.FC<FollowUpAppointmentCardProps> = ({ checkup }) => {
  const navigation = useNavigation<any>();
  const checkupDateFormatted = checkup.checkup_date ? new Date(checkup.checkup_date).toDateString() : 'N/A';

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
    <View style={tw`mb-4`}>
      <View
        style={[
          tw`w-full max-w-[600px] self-center bg-[#FFF7ED] rounded-[12px] p-4 md:p-6 border border-[#FED7AA] gap-[12px]`,
          {
            shadowColor: '#EA580C',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 20,
            elevation: 4,
          },
        ]}
      >

        <Text style={tw`text-[16px] md:text-[18px] font-semibold text-[#EA580C] font-['Inter'] leading-[24px] mb-[4px]`}>
          Follow-up Appointment Details
        </Text>

        {/* Follow-up ID */}
        <View style={tw`flex-row justify-between py-[8px] border-b border-[#FFEDD5]`}>
          <Text style={tw`text-[12px] md:text-[14px] flex-1 pr-2 text-[#9A3412] font-['Inter']`}>Follow-up ID</Text>
          <Text style={tw`text-[12px] md:text-[14px] text-right flex-shrink-0 text-[#7C2D12] font-semibold font-['Inter']`}>#{checkup.id}</Text>
        </View>

        {/* Follow-up Date */}
        <View style={tw`flex-row justify-between py-[8px] border-b border-[#FFEDD5]`}>
          <Text style={tw`text-[12px] md:text-[14px] flex-1 pr-2 text-[#9A3412] font-['Inter']`}>Follow-up Date</Text>
          <Text style={tw`text-[12px] md:text-[14px] text-right flex-shrink-0 text-[#7C2D12] font-semibold font-['Inter']`}>{checkupDateFormatted}</Text>
        </View>

        {/* Follow-up Time */}
        <View style={tw`flex-row justify-between py-[8px] border-b border-[#FFEDD5]`}>
          <Text style={tw`text-[12px] md:text-[14px] flex-1 pr-2 text-[#9A3412] font-['Inter']`}>Follow-up Time</Text>
          <Text style={tw`text-[12px] md:text-[14px] text-right flex-shrink-0 text-[#7C2D12] font-semibold font-['Inter']`}>
            {checkupTimeFormatted}
          </Text>
        </View>

        {/* Follow-up Status */}
        <View style={tw`flex-row justify-between py-[8px] border-b border-[#FFEDD5]`}>
          <Text style={tw`text-[12px] md:text-[14px] flex-1 pr-2 text-[#9A3412] font-['Inter']`}>Status</Text>
          <Text style={tw`text-[12px] md:text-[14px] text-right flex-shrink-0 text-[#7C2D12] font-semibold capitalize font-['Inter']`}>{checkup.checkup_status}</Text>
        </View>

        {/* Payment Status */}
        <View style={tw`flex-row justify-between py-[8px]`}>
          <Text style={tw`text-[12px] md:text-[14px] flex-1 pr-2 text-[#9A3412] font-['Inter']`}>Payment Required</Text>
          <Text style={tw`text-[12px] md:text-[14px] text-right flex-shrink-0 text-[#7C2D12] font-semibold font-['Inter']`}>
            {checkup.is_payment_required ? "Yes" : "No (Free)"}
          </Text>
        </View>

        <TouchableOpacity
          style={tw`mt-2 bg-[#EA580C] py-2.5 md:py-3.5 rounded-[8px] items-center justify-center`}
          onPress={() => navigation.push('AppointmentDetails', { appointment: checkup, selectedTab: 'Upcoming' })}
        >
          <Text style={tw`text-white font-semibold font-['Inter']`}>See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FollowUpAppointmentCard;
