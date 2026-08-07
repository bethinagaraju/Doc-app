import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lock, ShieldCheck, ChevronRight } from 'lucide-react-native';
import tw from 'twrnc';

interface AccountSecuritySettingsProps {
    onPasswordChangePress?: () => void;
    onTwoFactorPress?: () => void;
    isTwoFactorEnabled?: boolean;
}

const AccountSecuritySettings: React.FC<AccountSecuritySettingsProps> = ({
    onPasswordChangePress,
    onTwoFactorPress,
    isTwoFactorEnabled = true,
}) => {
    return (
        /* Account Security Container Card */
        <View
            style={[
                tw`w-full bg-white/80 border border-[#DAE1E7]/50 rounded-[8px] flex-col items-start overflow-hidden`,
            ]}
        >
            {/* Header Banner */}
            <View style={tw`w-full bg-[#EEF4FF] border-b border-[#C3C6D5]/30 px-[24px] py-[16px]`}>
                <Text style={tw`text-[20px] font-semibold text-[#124CB8] font-['Inter'] leading-[28px]`}>
                    Account Security
                </Text>
            </View>

            {/* Settings Action Items Container */}
            <View style={tw`w-full flex-col`}>
                {/* Row 1: Password Settings */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onPasswordChangePress}
                    style={tw`w-full flex-row justify-between items-center px-[24px] py-[16px]`}
                >
                    {/* Left Icon + Text Group */}
                    <View style={tw`flex-row items-center gap-[16px] flex-1`}>
                        {/* Icon Circle Background */}
                        <View style={tw`w-[40px] h-[40px] bg-[#DBE3F1] rounded-full justify-center items-center`}>
                            <Lock size={18} color="#5D6571" />
                        </View>

                        {/* Labels */}
                        <View style={tw`flex-1 flex-col`}>
                            <Text style={tw`text-[16px] font-normal text-[#011D35] font-['Inter'] leading-[24px]`}>
                                Change Password
                            </Text>
                            <Text style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}>
                                Last changed 3 months ago
                            </Text>
                        </View>
                    </View>

                    {/* Right Chevron Arrow */}
                    <ChevronRight size={14} color="#737684" />
                </TouchableOpacity>

                {/* Row 2: Two-Factor Authentication Settings */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={onTwoFactorPress}
                    style={tw`w-full flex-row justify-between items-center px-[24px] py-[16px] border-t border-[#C3C6D5]/20`}
                >
                    {/* Left Icon + Text Group */}
                    <View style={tw`flex-row items-center gap-[16px] flex-1`}>
                        {/* Icon Circle Background */}
                        <View style={tw`w-[40px] h-[40px] bg-[#DBE3F1] rounded-full justify-center items-center`}>
                            <ShieldCheck size={18} color="#5D6571" />
                        </View>

                        {/* Labels */}
                        <View style={tw`flex-1 flex-col`}>
                            <Text style={tw`text-[16px] font-normal text-[#011D35] font-['Inter'] leading-[24px]`}>
                                Two-Factor Authentication
                            </Text>
                            <Text style={tw`text-[14px] font-normal text-[#434653] font-['Inter'] leading-[20px]`}>
                                {isTwoFactorEnabled ? 'Enabled for extra security' : 'Disabled'}
                            </Text>
                        </View>
                    </View>

                    {/* Right Status Label + Chevron */}
                    <View style={tw`flex-row items-center gap-[8px]`}>
                        <Text style={tw`text-[12px] font-bold text-[#124CB8] font-['Inter'] tracking-[0.6px] uppercase`}>
                            {isTwoFactorEnabled ? 'ON' : 'OFF'}
                        </Text>
                        <ChevronRight size={14} color="#737684" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AccountSecuritySettings;