import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

type TabName = 'Home' | 'Appointments' | 'Records' | 'Profile';

const BottomNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabName>('Home');

    const tabs: { name: TabName; icon: string }[] = [
        { name: 'Home', icon: 'home' },
        { name: 'Appointments', icon: 'calendar' },
        { name: 'Records', icon: 'document' },
        { name: 'Profile', icon: 'person' },
    ];

    return (
        <View style={styles.navContainer}>
            {/* Decorative Shadow Overlay */}
            <View style={styles.shadowOverlay} />

            {tabs.map((tab) => {
                const isActive = activeTab === tab.name;

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => setActiveTab(tab.name)}
                        style={[
                            styles.tabButton,
                            isActive ? styles.activeTab : styles.inactiveTab,
                        ]}
                    >
                        <View style={tw`items-center`}>
                            <Icon
                                name={isActive ? tab.icon : `${tab.icon}-outline`}
                                size={isActive ? 18 : 20}
                                color={isActive ? '#EBEEFF' : '#3F4752'}
                            />
                        </View>

                        {isActive && (
                            <Text style={styles.activeText}>
                                {tab.name}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    navContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 17,
        backgroundColor: '#E4EFFF',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    shadowOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 10,
        zIndex: 0,
    },
    tabButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 9999,
    },
    activeTab: {
        backgroundColor: '#3766D2',
        height: 42,
        gap: 8,
    },
    inactiveTab: {
        height: 44,
        gap: 4,
    },
    activeText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 12,
        color: '#EBEEFF',
        letterSpacing: 0.6,
    },
});

export default BottomNavBar;