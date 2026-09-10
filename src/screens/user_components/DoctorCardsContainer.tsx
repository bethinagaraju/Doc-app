import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

const DoctorCardsContainer = () => {
    const { width } = useWindowDimensions();

    // Dynamic Card Width:
    // On tiny phones (e.g. 320px width), the parent has 40px padding. Available space is 280px.
    // If the card is 300px, it overflows. So we cap the card width at (width - 60) to leave room for gaps.
    // On tablets (768px+), we expand the card to 340px for a more premium look.
    const cardWidth = width >= 768 ? 340 : Math.min(300, width - 60);

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
        <View style={tw`flex-col self-center my-4 w-full max-w-[600px] md:max-w-full md:px-8 gap-3`}>
            {/* Header Row: Title & See All Button */}
            <View style={tw`flex-row justify-between items-center w-full mb-2 gap-2`}>
                <Text
                    style={tw`text-[20px] md:text-2xl font-semibold text-[#011D35] flex-shrink`}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                >
                    Recommended Specialists
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={tw`text-[12px] md:text-sm font-semibold tracking-[0.6px] text-[#124CB8]`}>
                        See All
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Horizontal Row of Cards */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
                style={tw`w-full`}
                snapToInterval={cardWidth + 16}
                decelerationRate="fast"
            >
                {doctors.map((doc) => (
                    /* Doctor Card */
                    <View
                        key={doc.id}
                        style={[
                            tw`flex-col bg-white border border-[#C3C6D5] rounded-xl px-4 py-4 justify-between shadow-sm`,
                            {
                                width: cardWidth,
                                minHeight: 150,
                                elevation: 2,
                            },
                        ]}
                    >
                        {/* Top Container: Image + Texts */}
                        <View style={tw`flex-row gap-4`}>
                            {/* Doctor Image */}
                            <Image
                                source={{ uri: doc.imageUri }}
                                style={tw`w-20 h-20 md:w-24 md:h-24 rounded-lg bg-gray-100`}
                            />

                            {/* Text Container */}
                            <View style={tw`flex-1 justify-center`}>
                                {/* Doctor Name */}
                                <Text
                                    style={tw`text-[15px] md:text-lg font-semibold text-[#011D35] leading-tight`}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    minimumFontScale={0.8}
                                >
                                    {doc.name}
                                </Text>

                                {/* Subtitle / Specialty */}
                                <Text
                                    style={tw`text-[13px] md:text-base font-normal mt-1 text-[#575F6B]`}
                                    numberOfLines={1}
                                >
                                    {doc.specialty}
                                </Text>

                                {/* Rating Row */}
                                <View style={tw`flex-row flex-wrap items-center mt-1.5 gap-1`}>
                                    <Icon name="star" size={12} color="#EAB308" />
                                    <Text style={tw`text-[12px] md:text-sm font-bold text-[#011D35]`}>
                                        {doc.rating}
                                    </Text>
                                    <Text style={tw`text-[12px] md:text-sm font-semibold ml-1 text-[#737684]`}>
                                        ({doc.reviews})
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Horizontal Divider */}
                        <View style={tw`w-full border-t border-[#E4EFFF] mt-3`} />

                        {/* Bottom Row / Distance & Arrow Action Line */}
                        <View style={tw`flex-row justify-between items-center w-full mt-2 gap-2`}>
                            {/* Distance Container */}
                            <View style={tw`flex-row items-center gap-1 flex-shrink`}>
                                <Icon name="location-outline" size={14} color="#434653" />
                                <Text
                                    style={tw`text-[12px] md:text-sm font-semibold text-[#434653] flex-shrink`}
                                    numberOfLines={1}
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