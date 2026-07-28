import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserProfile } from '../contexts/userProfileContext';

const ProfileTopBar = ({
    title = "DocApp",
    avatarUrl,
    onAvatarPress
}) => {
    const { userData } = useUserProfile();

    const rawProfilePic = avatarUrl || (userData as any)?.doctorProfile?.profile_picture || (userData as any)?.generalUser?.profile_picture;
    const lastUpdated = (userData as any)?.doctorProfile?.updatedAt || (userData as any)?.generalUser?.updatedAt || '1';

    // Cache bust timestamp to prevent old images showing
    const finalAvatarUrl = rawProfilePic ? `${rawProfilePic}?t=${new Date(lastUpdated).getTime() || lastUpdated}` : "https://mockmind-api.uifaces.co/content/human/92.jpg";

    return (
        <View style={styles.topAppBar}>
            {/* Title Container */}
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>

            {/* User Profile Avatar */}
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={onAvatarPress}
                activeOpacity={0.7}
            >
                <Image
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