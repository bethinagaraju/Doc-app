import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Calendar } from 'lucide-react-native'; // Clean alternative to rendering raw SVG paths
import tw from 'twrnc';

interface BookButtonProps {
  handleBookNowPress: () => void;
}

const BookAppointmentButton: React.FC<BookButtonProps> = ({ handleBookNowPress }) => {
  return (
    /* Fixed Booking CTA */
    <View style={[
      tw`absolute bottom-0 left-0 right-0 h-[90px] bg-white flex-col items-center pt-[24px] border-t border-[rgba(222,227,235,0.2)]`,
      {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.04,
        shadowRadius: 30,
        elevation: 10,
      }
    ]}>
      {/* Container */}
      <View style={tw`w-[320px] max-w-[672px] h-[56px] flex-row items-center`}>

        {/* Button */}
        <TouchableOpacity
          onPress={handleBookNowPress}
          style={[
            tw`flex-1 h-full flex-row justify-center items-center gap-[12px] bg-[#124CB8] rounded-[16px]`,
            {
              shadowColor: 'rgba(0, 100, 148, 0.25)',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 1,
              shadowRadius: 15,
              elevation: 8,
            }
          ]}
        >
          {/* Text */}
          <Text style={tw`text-[18px] font-bold text-white text-center font-['Public Sans'] leading-7`}>
            Book Appointment
          </Text>

          {/* Container for Icon */}
          <View style={tw`w-[18px] h-[20px] justify-center items-center`}>
            <Calendar size={18} color="#FFFFFF" strokeWidth={2.5} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookAppointmentButton;
