import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, TrendingUp } from 'lucide-react-native';
import tw from 'twrnc';

interface EarningsSnapshotProps {
    amount?: string;
    percentageChange?: string;
    timeframe?: string;
    onFilterPress?: () => void;
}

const EarningsSnapshot: React.FC<EarningsSnapshotProps> = ({
    amount = '$1,240.00',
    percentageChange = '+12% vs yesterday',
    timeframe = 'Today',
    onFilterPress,
}) => {
    return (
        /* Earnings Snapshot Container */
        <View
            style={[
                tw`w-full bg-white rounded-[16px] p-[24px] border border-[#C3C6D5]/20 flex-col gap-[24px]`,
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
            <View style={tw`w-full flex-row justify-between items-center h-[28px]`}>
                {/* Heading */}
                <Text
                    style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                >
                    Earnings
                </Text>

                {/* Filter Dropdown Badge */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onFilterPress}
                    style={tw`bg-[#EEF4FF] rounded-[16px] px-[12px] py-[4px] flex-row items-center gap-[6px]`}
                >
                    <Text
                        style={tw`text-[12px] font-semibold text-[#124CB8] font-['Inter'] tracking-[0.6px] leading-[16px]`}
                    >
                        {timeframe}
                    </Text>
                    <ChevronDown size={14} color="#124CB8" />
                </TouchableOpacity>
            </View>

            {/* Net Income Details Container */}
            <View style={tw`w-full gap-[4px]`}>
                {/* Label */}
                <Text
                    style={tw`text-[12px] font-semibold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase leading-[16px]`}
                >
                    NET INCOME
                </Text>

                {/* Amount */}
                <Text
                    style={tw`text-[32px] font-bold text-[#124CB8] font-['Inter'] tracking-[-0.64px] leading-[40px]`}
                >
                    {amount}
                </Text>

                {/* Growth Trend Row */}
                <View style={tw`flex-row items-center gap-[4px] mt-[2px]`}>
                    <TrendingUp size={14} color="#16A34A" />
                    <Text
                        style={tw`text-[12px] font-semibold text-[#16A34A] font-['Inter'] tracking-[0.6px] leading-[16px]`}
                    >
                        {percentageChange}
                    </Text>
                </View>
            </View>

            {/* Visual Bar Chart Container */}
            <View style={tw`w-full h-[96px] flex-row justify-between items-end px-[4px] gap-[8px]`}>
                {/* Bar 1 - 50% opacity equivalent */}
                <View style={tw`flex-1 h-[48px] bg-[#124CB8]/10 rounded-t-[2px]`} />

                {/* Bar 2 - 20% opacity */}
                <View style={tw`flex-1 h-[64px] bg-[#124CB8]/20 rounded-t-[2px]`} />

                {/* Bar 3 - 40% opacity */}
                <View style={tw`flex-1 h-[32px] bg-[#124CB8]/40 rounded-t-[2px]`} />

                {/* Bar 4 - 60% opacity */}
                <View style={tw`flex-1 h-[72px] bg-[#124CB8]/60 rounded-t-[2px]`} />

                {/* Bar 5 - Active (100% Solid Primary Blue) */}
                <View style={tw`flex-1 h-[96px] bg-[#124CB8] rounded-t-[2px]`} />
            </View>
        </View>
    );
};

export default EarningsSnapshot;