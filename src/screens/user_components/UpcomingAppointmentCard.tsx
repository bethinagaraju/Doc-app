import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useNavigation } from '@react-navigation/native';

const getMockAppointment = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return {
        id: 0,
        appointment_date: tomorrow.toISOString(),
        appointment_start_time: '10:00:00',
        doctor: {
            username: 'Dr. Elena Rodriguez',
            doctorProfile: {
                specialization: 'Pediatrician',
            },
        },
    };
};

const UpcomingAppointmentCard = () => {
    const navigation = useNavigation<any>();
    const [appointment, setAppointment] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { accessToken } = useAccessToken();

    useEffect(() => {
        const fetchNextAppointment = async () => {
            if (!accessToken) {
                setAppointment(getMockAppointment());
                setLoading(false);
                return;
            }
            try {
                const response = await fetch('https://api.docapp.co.in/api/appointment/next', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.appointment) {
                        setAppointment(data.appointment);
                    } else {
                        setAppointment(getMockAppointment());
                    }
                } else {
                    setAppointment(getMockAppointment());
                }
            } catch (error) {
                console.error('Error fetching next appointment:', error);
                setAppointment(getMockAppointment());
            } finally {
                setLoading(false);
            }
        };

        fetchNextAppointment();
    }, [accessToken]);

    if (loading || !appointment) {
        return null;
    }

    const dateObj = new Date(appointment.appointment_date);
    const day = isNaN(dateObj.getTime()) ? '' : dateObj.getDate();
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const month = isNaN(dateObj.getTime()) ? '' : months[dateObj.getMonth()];

    const formatTime = (timeStr: string) => {
        if (!timeStr) return '';
        const parts = timeStr.split(':');
        let hours = parseInt(parts[0], 10);
        const minutes = parts[1] || '00';
        if (isNaN(hours)) return timeStr;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    const formattedTime = formatTime(appointment.appointment_start_time);

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
                        <Text style={tw`text-xl font-semibold text-[#EBEEFF] leading-[28px] tracking-[-0.24px]`} numberOfLines={1}>
                            {appointment.doctor?.username || 'Doctor'}
                        </Text>

                        <Text style={tw`text-xs font-normal text-[#EBEEFF] opacity-90 leading-4`} numberOfLines={2}>
                            {appointment.doctor?.doctorProfile?.specialization || 'General Physician'}
                        </Text>
                    </View>

                    {/* Date Badge */}
                    <View
                        style={tw`items-center justify-center rounded-full self-center w-[56px] h-[56px] py-1 px-2 bg-[#EBEEFF]/20`}
                    >
                        <Text style={tw`text-xl font-semibold text-center text-[#EBEEFF]`}>{day}</Text>
                        <Text style={tw`text-[14px] font-semibold text-center tracking-[0.6px] text-[#EBEEFF]`}>
                            {month}
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
                            {formattedTime}
                        </Text>
                    </View>

                    {/* Button with integrated Icon */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('PatientVideoCall', {
                                appointmentId: appointment.id,
                            });
                        }}
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