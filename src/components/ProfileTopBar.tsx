import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useUserProfile } from '../contexts/userProfileContext';
import { useUser } from '../screens/contexts/UserContext';

const ProfileTopBar = ({
    title = "DocApp",
    avatarUrl,
    onAvatarPress
}: any) => {
    const { userData } = useUserProfile();
    const userContext = useUser();
    const navigation = useNavigation();

    const activeUser = userData || userContext?.user;

    const rawProfilePic =
        avatarUrl ||
        (activeUser as any)?.doctorProfile?.profile_picture ||
        (activeUser as any)?.generalUser?.profile_picture ||
        userContext?.user?.doctorProfile?.profile_picture ||
        userContext?.user?.generalUser?.profile_picture;

    const cleanUrl = rawProfilePic ? rawProfilePic.split('?')[0] : '';
    const lastUpdated =
        (activeUser as any)?.doctorProfile?.updatedAt ||
        (activeUser as any)?.generalUser?.updatedAt ||
        userContext?.user?.doctorProfile?.updatedAt ||
        userContext?.user?.generalUser?.updatedAt;

    const ts = lastUpdated ? new Date(lastUpdated).getTime() : '';
    const finalAvatarUrl = cleanUrl
        ? (ts ? `${cleanUrl}?t=${ts}` : `${cleanUrl}?t=${new Date().getTime()}`)
        : "https://mockmind-api.uifaces.co/content/human/92.jpg";

    return (
        <View style={styles.topAppBar}>
            {/* Title Container */}
            <View style={styles.titleContainer}>
                {navigation.canGoBack() && (
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <ArrowLeft size={24} color="#124CB8" />
                    </TouchableOpacity>
                )}
                <Text style={styles.titleText}>{title}</Text>
            </View>

            {/* User Profile Avatar */}
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={onAvatarPress}
                activeOpacity={0.7}
            >
                <Image
                    key={finalAvatarUrl}
                    source={{ uri: finalAvatarUrl }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    topAppBar: {
        width: '100%',
        height: 64,
        backgroundColor: '#FDFBFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        // If you want it to sit at the absolute top of the screen as per Figma:
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // zIndex: 50, 
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12, // Note: gap requires React Native 0.71+
    },
    titleText: {
        fontFamily: 'Public Sans', // Ensure this font is linked in your RN project
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 24,
        color: '#124CB8',
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 9999, // Makes it perfectly round
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
});

export default ProfileTopBar;