import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const QuickActionsGrid = () => {
    const navigation = useNavigation<NavigationProp<any>>();
    // Data array for easy rendering and logic preservation
    const actions = [
        {
            id: 'find-doctor',
            label: 'Find Doctor',
            iconName: 'person-add-outline',
        },
        {
            id: 'schedule',
            label: 'Schedule',
            iconName: 'calendar-outline',
        },
        {
            id: 'records',
            label: 'Records',
            iconName: 'medkit-outline',
        },
    ];

    return (
        /* Section - Quick Actions Grid */
        <View
            style={[
                tw`flex-col my-2 w-full self-center max-w-[500px]`,
                {
                    paddingTop: 8,
                    gap: 16,
                }
            ]}
        >
            {/* Container: Heading */}
            <View
                style={[
                    tw`flex-row items-center justify-between w-full px-2`,
                    { minHeight: 28 }
                ]}
            >
                <Text
                    style={[
                        tw`font-semibold text-xl`,
                        {
                            color: '#011D35',
                            lineHeight: 28,
                        }
                    ]}
                >
                    Quick Actions
                </Text>
            </View>

            {/* Container: Grid of buttons */}
            <View
                style={[
                    tw`flex-row justify-around w-full`,
                ]}
            >
                {actions.map((action) => (
                    <TouchableOpacity
                        key={action.id}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (action.id === 'find-doctor') {
                                navigation.navigate('Doctors');
                            } else if (action.id === 'records') {
                                navigation.navigate('MedicalRecords');
                            }
                        }}
                        style={[
                            tw`flex-col items-center`,
                            {
                                gap: 8,
                                flex: 1,
                                paddingHorizontal: 4,
                            }
                        ]}
                    >
                        {/* Button */}
                        <View
                            style={[
                                tw`flex-row justify-center items-center rounded-2xl`,
                                {
                                    width: 64,
                                    height: 64,
                                    backgroundColor: '#DBE9FF',
                                    shadowColor: 'rgba(0, 0, 0, 0.05)',
                                    shadowOffset: { width: 0, height: 1 },
                                    shadowOpacity: 1,
                                    shadowRadius: 2,
                                    elevation: 1,
                                }
                            ]}
                        >
                            {/* Icon wrapper & Icon */}
                            <View
                                style={[
                                    tw`justify-center items-center`,
                                    {
                                        width: 26,
                                        height: 26,
                                    }
                                ]}
                            >
                                <Icon name={action.iconName} size={24} color="#124CB8" />
                            </View>
                        </View>

                        {/* Text Label */}
                        <Text
                            numberOfLines={2}
                            style={[
                                tw`font-semibold text-center tracking-[0.6px]`,
                                {
                                    fontSize: 12,
                                    lineHeight: 16,
                                    color: '#434653',
                                    flexShrink: 1,
                                }
                            ]}
                        >
                            {action.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default QuickActionsGrid;