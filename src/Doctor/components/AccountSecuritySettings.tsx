import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import {
    Lock,
    ShieldCheck,
    ChevronRight,
    Eye,
    EyeOff,
    X,
    KeyRound,
    CheckCircle2,
} from 'lucide-react-native';
import tw from 'twrnc';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';

const API_CHANGE_PASSWORD = 'https://api.docapp.co.in/api/auth/change-password';

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
    const { accessToken } = useAccessToken();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpenModal = () => {
        setNewPassword('');
        setConfirmPassword('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    const handlePasswordChangeSubmit = async () => {
        if (!newPassword.trim()) {
            Alert.alert('Required Field', 'Please enter your new password.');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Mismatch', 'New password and confirm password do not match.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(API_CHANGE_PASSWORD, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                },
                credentials: 'include',
                body: JSON.stringify({
                    newPassword: newPassword.trim(),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', data.message || 'Password changed successfully!');
                handleCloseModal();
            } else {
                Alert.alert('Error', data.message || 'Failed to change password. Please try again.');
            }
        } catch (error) {
            console.error('❌ Error changing password:', error);
            Alert.alert('Network Error', 'Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordRowPress = () => {
        if (onPasswordChangePress) {
            onPasswordChangePress();
        } else {
            handleOpenModal();
        }
    };

    return (
        <>
            {/* Account Security Container Card */}
            <View
                style={[
                    tw`w-full bg-white rounded-2xl border border-[#DAE1FF]/80 overflow-hidden shadow-sm`,
                    {
                        shadowColor: '#102A43',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.05,
                        shadowRadius: 16,
                        elevation: 3,
                    },
                ]}
            >
                {/* Header Banner */}
                <View style={tw`w-full bg-[#EEF4FF] border-b border-[#DAE1FF] px-6 py-4 flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center gap-2.5`}>
                        <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                            <ShieldCheck size={17} color="#124CB8" />
                        </View>
                        <Text style={tw`text-[17px] font-bold text-[#011D35] font-['Inter']`}>
                            Account Security
                        </Text>
                    </View>
                </View>

                {/* Settings Action Items Container */}
                <View style={tw`w-full flex-col`}>
                    {/* Row 1: Password Settings */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handlePasswordRowPress}
                        style={tw`w-full flex-row justify-between items-center px-6 py-4.5`}
                    >
                        {/* Left Icon + Text Group */}
                        <View style={tw`flex-row items-center gap-3.5 flex-1`}>
                            {/* Icon Circle Background */}
                            <View style={tw`w-10 h-10 bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl justify-center items-center`}>
                                <Lock size={18} color="#124CB8" />
                            </View>

                            {/* Labels */}
                            <View style={tw`flex-1 flex-col`}>
                                <Text style={tw`text-[15px] font-bold text-[#011D35]`}>
                                    Change Password
                                </Text>
                                <Text style={tw`text-[13px] text-[#434653] mt-0.5`}>
                                    Update your account password directly
                                </Text>
                            </View>
                        </View>

                        {/* Right Chevron Arrow */}
                        <View style={tw`w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] items-center justify-center`}>
                            <ChevronRight size={14} color="#64748B" />
                        </View>
                    </TouchableOpacity>

                    {/* Row 2: Two-Factor Authentication Settings */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onTwoFactorPress}
                        style={tw`w-full flex-row justify-between items-center px-6 py-4.5 border-t border-[#DAE1FF]/50`}
                    >
                        {/* Left Icon + Text Group */}
                        <View style={tw`flex-row items-center gap-3.5 flex-1`}>
                            {/* Icon Circle Background */}
                            <View style={tw`w-10 h-10 bg-[#EFF6FF] border border-[#DBEAFE] rounded-xl justify-center items-center`}>
                                <ShieldCheck size={18} color="#124CB8" />
                            </View>

                            {/* Labels */}
                            <View style={tw`flex-1 flex-col`}>
                                <Text style={tw`text-[15px] font-bold text-[#011D35]`}>
                                    Two-Factor Authentication
                                </Text>
                                <Text style={tw`text-[13px] text-[#434653] mt-0.5`}>
                                    {isTwoFactorEnabled ? 'Enabled for extra account protection' : 'Disabled'}
                                </Text>
                            </View>
                        </View>

                        {/* Right Status Label + Chevron */}
                        <View style={tw`flex-row items-center gap-2`}>
                            <View style={tw`px-2.5 py-1 rounded-full ${isTwoFactorEnabled ? 'bg-[#E8F5E9]' : 'bg-[#F1F5F9]'}`}>
                                <Text style={tw`text-[11px] font-bold ${isTwoFactorEnabled ? 'text-[#16A34A]' : 'text-[#64748B]'}`}>
                                    {isTwoFactorEnabled ? 'ACTIVE' : 'OFF'}
                                </Text>
                            </View>
                            <View style={tw`w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] items-center justify-center`}>
                                <ChevronRight size={14} color="#64748B" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* 🔐 Change Password Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={tw`flex-1 bg-black/50 justify-end`}
                >
                    <View style={tw`bg-white rounded-t-3xl border-t border-[#DAE1FF] max-h-[85%]`}>
                        {/* Modal Header */}
                        <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-6 py-4 flex-row items-center justify-between rounded-t-3xl`}>
                            <View style={tw`flex-row items-center gap-2.5`}>
                                <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                                    <KeyRound size={17} color="#124CB8" />
                                </View>
                                <Text style={tw`text-[18px] font-bold text-[#011D35] font-['Inter']`}>
                                    Change Password
                                </Text>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleCloseModal}
                                style={tw`w-8 h-8 rounded-full bg-white border border-[#DAE1FF] items-center justify-center`}
                            >
                                <X size={16} color="#434653" />
                            </TouchableOpacity>
                        </View>

                        {/* Modal Body */}
                        <ScrollView contentContainerStyle={tw`p-6 gap-4 pb-10`}>
                            <Text style={tw`text-[13px] text-[#434653] leading-4.5`}>
                                Enter your new password below. You can change your password directly without OTP validation.
                            </Text>

                            {/* New Password Input */}
                            <View>
                                <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                                    New Password
                                </Text>
                                <View style={tw`flex-row items-center border border-[#DAE1FF] rounded-xl bg-[#F8F9FF] px-3`}>
                                    <TextInput
                                        placeholder="Enter new password"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showPassword}
                                        value={newPassword}
                                        onChangeText={setNewPassword}
                                        style={tw`flex-1 py-3 text-[14px] text-[#011D35]`}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={tw`p-2`}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} color="#64748B" />
                                        ) : (
                                            <Eye size={18} color="#64748B" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Confirm Password Input */}
                            <View>
                                <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                                    Confirm New Password
                                </Text>
                                <View style={tw`flex-row items-center border border-[#DAE1FF] rounded-xl bg-[#F8F9FF] px-3`}>
                                    <TextInput
                                        placeholder="Re-enter new password"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry={!showConfirmPassword}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        style={tw`flex-1 py-3 text-[14px] text-[#011D35]`}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                        style={tw`p-2`}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff size={18} color="#64748B" />
                                        ) : (
                                            <Eye size={18} color="#64748B" />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Password Match / Helper Indicator */}
                            {confirmPassword.length > 0 && (
                                <View style={tw`flex-row items-center gap-1.5 ml-1`}>
                                    <CheckCircle2
                                        size={14}
                                        color={newPassword === confirmPassword ? '#16A34A' : '#DC2626'}
                                    />
                                    <Text
                                        style={tw`text-[12px] font-medium ${
                                            newPassword === confirmPassword ? 'text-[#16A34A]' : 'text-[#DC2626]'
                                        }`}
                                    >
                                        {newPassword === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                                    </Text>
                                </View>
                            )}

                            {/* Submit Button */}
                            <TouchableOpacity
                                activeOpacity={0.85}
                                style={tw`bg-[#124CB8] rounded-xl py-3.5 items-center justify-center mt-3 flex-row gap-2 shadow-sm`}
                                onPress={handlePasswordChangeSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                ) : (
                                    <>
                                        <Lock size={16} color="#FFFFFF" />
                                        <Text style={tw`text-white font-bold text-[15px]`}>
                                            Update Password
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </>
    );
};

export default AccountSecuritySettings;