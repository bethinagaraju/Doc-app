import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

interface DocStatCardProps {
    patientSatisfaction?: string;
    totalConsultations?: string;
}

const DocStatCard: React.FC<DocStatCardProps> = ({
    patientSatisfaction = '4.9/5.0',
    totalConsultations = '0',
}) => {
    return (
        /* Stats Card Container */
        <View
            style={[
                tw`w-full bg-[#3766D2] rounded-[8px] p-[24px] border border-[#DAE1E7]/50 justify-between items-start h-[174px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Top Metric Block - Patient Satisfaction */}
            <View style={tw`w-full gap-[4px]`}>
                {/* Label */}
                <Text
                    style={tw`text-[12px] font-semibold text-[#EBEEFF]/80 font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                >
                    PATIENT SATISFACTION
                </Text>

                {/* Value */}
                <Text
                    style={tw`text-[32px] font-bold text-[#EBEEFF] font-['Inter'] tracking-[-0.64px] leading-[40px]`}
                >
                    {patientSatisfaction}
                </Text>
            </View>

            {/* Bottom Metric Block & Icon Indicator */}
            <View style={tw`w-full pt-[16px]`}>
                <View style={tw`w-full flex-row justify-between items-end`}>
                    {/* Consultations Counter */}
                    <View style={tw`flex-col items-start`}>
                        <Text
                            style={tw`text-[12px] font-semibold text-[#EBEEFF]/80 font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                        >
                            CONSULTATIONS
                        </Text>
                        <Text
                            style={tw`text-[24px] font-semibold text-[#EBEEFF] font-['Inter'] tracking-[-0.24px] leading-[32px]`}
                        >
                            {totalConsultations}
                        </Text>
                    </View>

                    {/* Trend Overlay Box */}
                    <View
                        style={tw`w-[96px] h-[48px] bg-white/20 rounded-[4px] justify-center items-center`}
                    >
                        {/* SVG Trend Arrow Icon */}
                        <Svg width={25} height={15} viewBox="0 0 25 15" fill="none">
                            <Path
                                d="M1.75 15L0 13.25L9.25 3.9375L14.25 8.9375L20.75 2.5H17.5V0H25V7.5H22.5V4.25L14.25 12.5L9.25 7.5L1.75 15Z"
                                fill="#EBEEFF"
                            />
                        </Svg>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DocStatCard;