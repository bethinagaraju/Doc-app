import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const UpcomingAppointmentCard = () => {
    return (
        <View
            style={tw`mx-4 mt-5 px-6 py-6 rounded-2xl w-full max-w-[320px] self-center overflow-hidden bg-[#3766D2] shadow-2xl shadow-[#2558C3]/15`}>

            {/* Abstract Pulse Decoration using the provided PNG */}
            <View
                style={tw`absolute w-[149px] h-[117px] right-[2px] top-[7px] opacity-100`}
                pointerEvents="none"
            >
                <Image
                    source={require('../../assets/images/PulseDecoration.png')}
                    style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                />
            </View>

            {/* Main Content Container */}
            <View style={tw`justify-between gap-6 w-full`}>

                {/* Top Row / Header Container */}
                <View style={tw`flex-row items-center gap-2`}>
                    <View
                        style={tw`justify-center items-center w-6 h-6 bg-[#EBEEFF]/20 rounded-md`}
                    >
                        <Icon
                            name="calendar-outline"
                            size={14}
                            color="#EBEEFF"
                        />
                    </View>
                    <Text style={tw`text-xs font-semibold uppercase tracking-[0.6px] text-[#EBEEFF]`}>
                        Next Appointment
                    </Text>
                </View>

                {/* Middle Content: Doctor Details & Date Badge */}
                <View style={tw`flex-row justify-between items-start w-full gap-4`}>
                    <View style={tw`flex-1 gap-1 justify-center`}>
                        <Text style={tw`text-xl font-semibold text-[#EBEEFF] leading-[28px] tracking-[-0.24px]`}>
                            Dr. Sarah Mitchell
                        </Text>

                        <Text style={tw`text-xs font-normal text-[#EBEEFF] opacity-90 leading-4`} numberOfLines={2}>
                            Cardiologist • Heart Wellness Center
                        </Text>
                    </View>

                    {/* Date Badge */}
                    <View
                        style={tw`items-center justify-center rounded-full self-center w-[56px] h-[56px] py-1 px-2 bg-[#EBEEFF]/20`}
                    >
                        <Text style={tw`text-xl font-semibold text-center text-[#EBEEFF]`}>12</Text>
                        <Text style={tw`text-[14px] font-semibold text-center tracking-[0.6px] text-[#EBEEFF]`}>
                            OCT
                        </Text>
                    </View>
                </View>

                {/* Bottom Row: Time & Call to Action button */}
                <View style={tw`flex-row items-center justify-between w-full`}>
                    <View style={tw`flex-row items-center gap-1`}>
                        <View style={tw`w-3 h-3 justify-center items-center`}>
                            <Icon
                                name="time-outline"
                                size={12}
                                color="#EBEEFF"
                            />
                        </View>
                        <Text style={tw`text-xs font-normal text-[#EBEEFF]`}>
                            10:30 AM
                        </Text>
                    </View>

                    {/* Button with integrated Icon */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                            tw`flex-row justify-center items-center bg-white rounded-full px-5 py-3 shadow-md`,
                            { elevation: 3 },
                        ]}>
                        <Text
                            style={tw`text-xs font-bold text-center tracking-[0.6px] mr-2 text-[#124CB8]`}>
                            Join Telehealth
                        </Text>
                        <Icon name="arrow-forward" size={12} color="#124CB8" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default UpcomingAppointmentCard;