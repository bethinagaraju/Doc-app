import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Bell } from 'lucide-react-native';
import tw from 'twrnc';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import { useUser } from '../../screens/contexts/UserContext';

interface DocProfileTopBarProps {
    userProfilePicture?: string;
    appName?: string;
    onNotificationPress?: () => void;
}

const DocProfileTopBar: React.FC<DocProfileTopBarProps> = ({
    userProfilePicture,
    appName = 'DocApp',
    onNotificationPress,
}) => {
    const { user, fetchUserData } = useUser();
    const { accessToken } = useAccessToken();
    const [localDoctor, setLocalDoctor] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchDoctorData = async () => {
        if (!accessToken) return;
        try {
            setLoading(true);
            const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });

            if (!response.ok) throw new Error('Failed to fetch doctor data');

            const result = await response.json();
            setLocalDoctor(result.userData);
        } catch (error) {
            console.error('Error fetching doctor info:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user && accessToken) {
            fetchDoctorData();
        }
    }, [user, accessToken]);

    const rawPic =
        userProfilePicture ||
        user?.doctorProfile?.profile_picture ||
        user?.generalUser?.profile_picture ||
        localDoctor?.doctorProfile?.profile_picture ||
        localDoctor?.generalUser?.profile_picture;

    const profilePicUri = rawPic || 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png';

    return (
        /* Header - TopAppBar */
        <View style={tw`w-full max-w-[1280px] h-[64px] bg-[#F8F9FF] shadow-sm`}>
            {/* Container */}
            <View style={tw`w-full h-full flex-row justify-between items-center px-5`}>

                {/* Left Side Container (Profile Pic + App Title) */}
                <View style={tw`flex-row items-center gap-3`}>
                    {/* Doctor profile picture */}
                    {loading && !rawPic ? (
                        <ActivityIndicator size="small" color="#124CB8" style={tw`w-10 h-10`} />
                    ) : (
                        <Image
                            key={profilePicUri}
                            source={{ uri: profilePicUri }}
                            style={tw`w-10 h-10 rounded-full border-2 border-[#DAE1FF]`}
                        />
                    )}

                    {/* App Name / Brand Title */}
                    <Text
                        style={tw`text-[24px] font-bold text-[#124CB8] font-['Inter'] tracking-tight leading-8`}
                    >
                        {appName}
                    </Text>
                </View>

                {/* Right Side Action Button (Notification Bell) */}
                <TouchableOpacity
                    onPress={onNotificationPress}
                    activeOpacity={0.7}
                    style={tw`w-8 h-9 rounded-full justify-center items-center p-2`}
                >
                    <Bell size={20} color="#124CB8" />
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default DocProfileTopBar;