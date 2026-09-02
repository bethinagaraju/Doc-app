import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";

const getLocalDateString = (dateObj: Date) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatDayLabel = (dateObj: Date, index: number) => {
    const dayName = weekdays[dateObj.getDay()];
    const dayNum = dateObj.getDate();
    const monthName = months[dateObj.getMonth()];

    if (index === 0) {
        return `Today, ${dayNum} ${monthName}`;
    } else if (index === 1) {
        return `Tomorrow, ${dayNum} ${monthName}`;
    } else {
        return `${dayName}, ${dayNum} ${monthName}`;
    }
};

const findMatchingSlotKey = (dateStr: string, slotsByDate: any) => {
    const targetNorm = dateStr.substring(0, 10);
    return Object.keys(slotsByDate).find(k => k.substring(0, 10) === targetNorm);
};

export default function DateSelector({ slotsByDate, selectedDate, setSelectedDate }) {
    const datesToDisplay = [];
    const today = new Date();

    // 1. Generate next 10 days starting from today
    for (let i = 0; i < 10; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const dateStr = getLocalDateString(nextDate);
        datesToDisplay.push({
            dateString: dateStr,
            dateObj: nextDate,
        });
    }

    // 2. Add any dates from slotsByDate that are outside the 10 days range
    Object.keys(slotsByDate).sort().forEach(dateStr => {
        if (!datesToDisplay.some(d => d.dateString === dateStr)) {
            datesToDisplay.push({
                dateString: dateStr,
                dateObj: new Date(dateStr),
            });
        }
    });

    // 3. Sort display dates chronologically
    datesToDisplay.sort((a, b) => a.dateString.localeCompare(b.dateString));

    return (
        <View style={tw`py-2`}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`px-1 flex-row`}
            >
                {datesToDisplay.map((item, index) => {
                    const matchingKey = findMatchingSlotKey(item.dateString, slotsByDate);
                    const slots = matchingKey ? (slotsByDate[matchingKey]?.slots || []) : [];
                    const slotsCount = slots.length;
                    const hasSlots = slotsCount > 0;

                    const isSelected = selectedDate && matchingKey
                        ? matchingKey.substring(0, 10) === selectedDate.substring(0, 10)
                        : item.dateString === selectedDate;

                    const label = formatDayLabel(item.dateObj, index);

                    return (
                        <TouchableOpacity
                            key={item.dateString}
                            onPress={() => setSelectedDate(matchingKey || item.dateString)}
                            activeOpacity={0.8}
                            style={[
                                tw`flex-col items-center justify-center p-3 mr-3 border ${isSelected
                                    ? "bg-[#F0F7FF] border-[#124CB8]"
                                    : "bg-white border-[#DEE3EB]"
                                    }`,
                                {
                                    shadowColor: '#102A43',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: isSelected ? 0.05 : 0.02,
                                    shadowRadius: 8,
                                    elevation: isSelected ? 3 : 1,
                                }
                            ]}
                        >
                            <Text
                                style={tw`text-[14px] font-bold font-['Public_Sans'] ${isSelected ? "text-[#124CB8]" : "text-[#191C1E]"
                                    }`}
                            >
                                {label}
                            </Text>
                            <Text
                                style={tw`text-[11px] font-semibold mt-1 font-['Public_Sans'] ${hasSlots ? "text-[#124CB8]" : "text-gray-400"
                                    }`}
                            >
                                {hasSlots ? `${slotsCount} slots available` : "No slots available"}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}