import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const DoctorCardsContainer = () => {
    // Sample data array for multiple Doctor Cards looping 
    const doctors = [
        {
            id: '1',
            name: 'Dr. Elena Rodriguez',
            specialty: 'Pediatrician',
            rating: '4.9',
            reviews: '130 reviews',
            distance: '2.4 miles away',
            imageUri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
        },
        {
            id: '2',
            name: 'Dr. Elena Rodriguez',
            specialty: 'Pediatrician',
            rating: '4.9',
            reviews: '130 reviews',
            distance: '2.4 miles away',
            imageUri: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
        },
    ];

    return (
        /* Section Wrapper to center and align elements with other app blocks */
        <View style={tw`flex-col self-center my-4 w-full max-w-[320px] gap-3`}>
            {/* Header Row: Title & See All Button */}
            <View style={tw`flex-row justify-between items-center w-full h-7 mb-2`}>
                <Text
                    style={[
                        tw`font-semibold`,
                        {
                            fontSize: 20,
                            lineHeight: 28,
                            color: '#011D35',
                        }
                    ]}
                >
                    Recommended Specialists
                </Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { }}>
                    <Text
                        style={[
                            tw`font-semibold tracking-[0.6px]`,
                            {
                                fontSize: 12,
                                lineHeight: 16,
                                color: '#124CB8',
                            }
                        ]}
                    >
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Horizontal Row of Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 12,
                }}
                style={[
                    tw`w-full`,
                    {
                        height: 160,
                    },
                ]}
            >
                {doctors.map((doc) => (
                    /* Doctor Card */
                    <View
                        key={doc.id}
                        style={[
                            tw`flex-col bg-white border border-[#C3C6D5] rounded-xl px-4 py-4`,
                            {
                                width: 300,
                                minWidth: 300,
                                height: 150,
                                shadowColor: 'rgba(0, 0, 0, 0.05)',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 1,
                                shadowRadius: 2,
                                elevation: 1,
                                justifyContent: 'space-between',
                            },
                        ]}
                    >
                        {/* Top Container: Image + Texts */}
                        <View style={tw`flex-row gap-4`}>
                            {/* Doctor Image */}
                            <Image
                                source={{ uri: doc.imageUri }}
                                style={[
                                    tw`rounded-lg`,
                                    {
                                        width: 80,
                                        height: 80,
                                    },
                                ]}
                            />

                            {/* Text Container */}
                            <View style={tw`flex-1 justify-center`}>
                                {/* Doctor Name */}
                                <Text
                                    style={[
                                        tw`font-semibold`,
                                        {
                                            fontSize: 15,
                                            lineHeight: 20,
                                            color: '#011D35',
                                        },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {doc.name}
                                </Text>

                                {/* Subtitle / Specialty */}
                                <Text
                                    style={[
                                        tw`font-normal mt-1`,
                                        {
                                            fontSize: 13,
                                            lineHeight: 18,
                                            color: '#575F6B',
                                        },
                                    ]}
                                    numberOfLines={1}
                                >
                                    {doc.specialty}
                                </Text>

                                {/* Rating Row */}
                                <View style={tw`flex-row items-center mt-1.5 gap-1`}>
                                    <Icon name="star" size={11} color="#EAB308" />
                                    <Text
                                        style={[
                                            tw`font-bold`,
                                            {
                                                fontSize: 12,
                                                color: '#011D35',
                                            },
                                        ]}
                                    >
                                        {doc.rating}
                                    </Text>
                                    <Text
                                        style={[
                                            tw`font-semibold ml-1`,
                                            {
                                                fontSize: 12,
                                                color: '#737684',
                                            },
                                        ]}
                                    >
                                        ({doc.reviews})
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Horizontal Divider */}
                        <View style={[tw`w-full border-t border-[#E4EFFF] mt-2`]} />

                        {/* Bottom Row / Distance & Arrow Action Line */}
                        <View style={tw`flex-row justify-between items-center w-full mt-1.5`}>
                            {/* Distance Container */}
                            <View style={tw`flex-row items-center gap-1`}>
                                <Icon name="location-outline" size={12} color="#434653" />
                                <Text
                                    style={[
                                        tw`font-semibold`,
                                        {
                                            fontSize: 12,
                                            color: '#434653',
                                        },
                                    ]}
                                >
                                    {doc.distance}
                                </Text>
                            </View>

                            {/* Forward Arrow Action Icon */}
                            <Icon name="arrow-forward-outline" size={16} color="#124CB8" />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default DoctorCardsContainer;