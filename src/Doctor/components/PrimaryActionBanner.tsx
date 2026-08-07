import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

interface PrimaryActionBannerProps {
    statusText?: string;
    patientName?: string;
    onStartConsultation?: () => void;
    onReschedule?: () => void;
}

const PrimaryActionBanner: React.FC<PrimaryActionBannerProps> = ({
    statusText = '',
    patientName = '',
    onStartConsultation,
    onReschedule,
}) => {
    return (
        /* Status & Primary Action Banner Container */
        <View
            style={[
                tw`w-full max-w-[350px] bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[12px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Status Header Container */}
            <View style={tw`w-full gap-[4px]`}>
                {/* Status Dot & Label Row */}
                <View style={tw`flex-row items-center gap-[8px]`}>
                    <View style={tw`w-[10px] h-[10px] bg-[#124CB8] rounded-full`} />
                    <Text
                        style={tw`text-[12px] font-semibold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                    >
                        {statusText}
                    </Text>
                </View>

                {/* Consultation Heading */}
                <Text
                    style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                    numberOfLines={1}
                >
                    Consultation with {patientName}
                </Text>
            </View>

            {/* Buttons Action Group */}
            <View style={tw`w-full gap-[10px] pt-[4px]`}>
                {/* Primary Action Button: Start Consultation */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onStartConsultation}
                    style={tw`w-full h-[48px] bg-[#124CB8] rounded-[8px] flex-row justify-center items-center gap-[8px] px-[24px]`}
                >
                    {/* Video Plus Icon */}
                    <Svg width={20} height={16} viewBox="0 0 20 16" fill="none">
                        <Path
                            d="M7 12H9V9H12V7H9V4H7V7H4V9H7V12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H14C14.55 0 15.0208 0.195833 15.4125 0.5875C15.8042 0.979167 16 1.45 16 2V6.5L20 2.5V13.5L16 9.5V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2ZM2 14H14V2H2V14ZM2 14V2V14Z"
                            fill="white"
                        />
                    </Svg>
                    <Text
                        style={tw`text-[16px] font-semibold text-white font-['Inter'] leading-[24px] text-center`}
                    >
                        Start Consultation
                    </Text>
                </TouchableOpacity>

                {/* Secondary Action Button: Reschedule */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onReschedule}
                    style={tw`w-full h-[48px] bg-[#DBE3F1] rounded-[8px] flex-row justify-center items-center gap-[8px] px-[24px]`}
                >
                    {/* Edit Pencil Icon */}
                    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                        <Path
                            d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM16 3.4L14.6 2L16 3.4ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z"
                            fill="#124CB8"
                        />
                    </Svg>
                    <Text
                        style={tw`text-[16px] font-semibold text-[#124CB8] font-['Inter'] leading-[24px] text-center`}
                    >
                        Reschedule
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default PrimaryActionBanner;