import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import tw from 'twrnc';
import { useUser } from '../../screens/contexts/UserContext';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';

interface WelcomeStatusToggleProps {
    doctorName?: string;
    appointmentCount?: number;
    initialOnlineStatus?: boolean;
    onStatusChange?: (isOnline: boolean) => void;
}

const WelcomeStatusToggle: React.FC<WelcomeStatusToggleProps> = ({
    doctorName,
    appointmentCount = 8,
    initialOnlineStatus = true,
    onStatusChange,
}) => {
    const { user } = useUser();
    const { accessToken } = useAccessToken();
    const actualDoctorName = doctorName || user?.username || 'Doctor';

    const [isOnline, setIsOnline] = useState(initialOnlineStatus);
    const [animValue] = useState(new Animated.Value(initialOnlineStatus ? 1 : 0));
    const [fetchedAppointmentCount, setFetchedAppointmentCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch('https://api.docapp.co.in/api/appointment/list-appointments', {
                    headers: {
                        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                if (data.appointments && Array.isArray(data.appointments)) {
                    // Get today's date in YYYY-MM-DD
                    const today = new Date();
                    const todayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];

                    const todaysAppointments = data.appointments.filter((appt: any) => {
                        if (!appt.appointment_date) return false;
                        const apptDate = new Date(appt.appointment_date);
                        const apptDateStr = new Date(apptDate.getTime() - (apptDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
                        return apptDateStr === todayStr && appt.appointment_status !== 'cancelled';
                    });
                    setFetchedAppointmentCount(todaysAppointments.length);
                }
            } catch (err) {
                console.error('Failed to fetch appointments count:', err);
            }
        };
        fetchAppointments();
    }, [accessToken]);

    const displayCount = fetchedAppointmentCount !== null ? fetchedAppointmentCount : appointmentCount;

    const toggleStatus = () => {
        const nextState = !isOnline;
        setIsOnline(nextState);

        Animated.timing(animValue, {
            toValue: nextState ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();

        if (onStatusChange) {
            onStatusChange(nextState);
        }
    };

    // Interpolate thumb position for smooth toggle animation
    const thumbTranslateX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [4, 28], // Switches thumb from left to right inside 56px switch
    });

    return (
        /* Section - Welcome & Status Toggle */
        <View style={tw`w-full flex-col gap-0 mb-6`}>

            {/* Greeting & Appointment Count Container */}
            <View style={tw`w-full flex-col items-start`}>

                {/* Heading 1 */}
                <View style={tw`w-full justify-center mb-1`}>
                    <Text
                        style={tw`text-[28px] font-bold text-[#011D35] font-['Inter'] leading-[36px]`}
                        numberOfLines={2}
                    >
                        Good Morning, {actualDoctorName}
                    </Text>
                </View>

                {/* Subtitle / Appointment Count */}
                <View style={tw`w-full justify-center`}>
                    <Text
                        style={tw`text-[16px] font-normal text-[#434653] font-['Inter'] leading-[24px]`}
                        numberOfLines={2}
                    >
                        You have {displayCount} appointments scheduled for today.
                    </Text>
                </View>

            </View>

            {/* Status Toggle Container */}
            {/* <View style={tw`w-full items-start justify-center mt-2`}>

            
                <View
                    style={tw`w-[250.83px] h-[50px] bg-[#EEF4FF] border border-[#C3C6D5]/30 rounded-[24px] flex-row items-center px-[9px] relative`}
                >
                  
                    <Text
                        style={tw`text-[12px] font-semibold text-[#434653] font-['Inter'] tracking-[0.6px] uppercase`}
                    >
                        AVAILABILITY
                    </Text>

                 
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={toggleStatus}
                        style={[
                            tw`w-[56px] h-[32px] rounded-full justify-center mx-2.5`,
                            { backgroundColor: isOnline ? '#3766D2' : '#94A3B8' },
                        ]}
                    >
                        <Animated.View
                            style={[
                                tw`w-[24px] h-[24px] bg-white rounded-full shadow-sm`,
                                {
                                    transform: [{ translateX: thumbTranslateX }],
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 1,
                                    elevation: 2,
                                },
                            ]}
                        />
                    </TouchableOpacity>

                  
                    <Text
                        style={[
                            tw`text-[12px] font-semibold font-['Inter'] tracking-[0.6px] uppercase`,
                            { color: isOnline ? '#124CB8' : '#64748B' },
                        ]}
                    >
                        {isOnline ? 'ONLINE' : 'OFFLINE'}
                    </Text>

                </View>

            </View> */}

        </View>
    );
};

export default WelcomeStatusToggle;