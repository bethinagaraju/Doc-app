import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../screens/contexts/UserContext';

// Calendar Icon using Ionicons
const CalendarIcon = () => (
    <Icon name="calendar-outline" size={26} color="#211634" />
);

const FeaturedBentoSection = () => {
    const navigation = useNavigation<any>();
    const user = useUser();

    return (
        // Outer Bento Grid Container mapping exactly to your 358px width and 342.5px height constraints, responsive
        <View style={tw`w-full max-w-[358px] self-center gap-[16px]`}>

            {/* 1. Featured Doctor Card (192px height) */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    user.setConsultationMode('online');
                    navigation.navigate('AllSpecialtiesScreen', { mode: 'video' });
                }}
            >
                <View style={tw`w-full h-[192px] rounded-[16px] overflow-hidden`}>
                    <ImageBackground
                        source={require('../assets/images/13234650_5183184.jpg')}
                        style={tw`flex-1 justify-end`}
                        resizeMode="cover"
                    >
                        {/* Linear Gradient exactly matching Figma specs (0% transparent to 80% black) */}
                        <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.8)']}
                            locations={[0, 0.5, 1]}
                            style={tw`absolute inset-0`}
                        />

                        {/* Overlay Text Content */}
                        <View style={tw`p-[24px]`}>
                            <Text style={tw`font-bold text-[12px] leading-[16px] text-[#CAE6FF] uppercase tracking-[1.2px] pb-1`}>
                                AVAILABLE NOW
                            </Text>

                            <Text style={tw`font-bold text-[24px] leading-[32px] text-white`}>
                                Instant Video Consultation
                            </Text>

                            <Text style={tw`font-normal text-[14px] leading-[20px] text-white/80`}>
                                Connect with a GP in less than 2 minutes.
                            </Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>

            {/* 2. Manage Bookings Card (125px height) */}
            {/* Added `shadow-sm shadow-black/5` to replicate the 0px 1px 2px rgba(0,0,0,0.05) using pure Tailwind */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                    navigation.navigate('Appointments');
                }}
            >
                <View style={tw`w-full h-[125px] bg-[#ECDCFF] rounded-[16px] p-[24px] justify-between shadow-sm shadow-black/5`}>
                    <CalendarIcon />

                    <View style={tw`flex-col gap-1 mt-2`}>
                        <Text style={tw`font-bold text-[18px] leading-[22px] text-[#211634]`}>
                            Manage Your Bookings
                        </Text>

                        <Text style={tw`font-normal text-[14px] leading-[20px] text-[#211634]/80`}>
                            Check your upcoming visits
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

        </View>
    );
};

export default FeaturedBentoSection;