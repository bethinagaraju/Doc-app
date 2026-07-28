import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";

const LeftArrow = () => (
    <Svg width={8} height={12} viewBox="0 0 8 12">
        <Path
            d="M6 12L0 6L6 0L7.4 1.4L2.8 6L7.4 10.6L6 12Z"
            fill="#191C1E"
        />
    </Svg>
);

const RightArrow = () => (
    <Svg width={8} height={12} viewBox="0 0 8 12">
        <Path
            d="M4.6 6L0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6Z"
            fill="#191C1E"
        />
    </Svg>
);

export default function DateSelector({ slotsByDate, selectedDate, setSelectedDate }) {

    const markedDates = {};

    Object.keys(slotsByDate).forEach(date => {
        markedDates[date] = {
            selected: date === selectedDate,
            selectedColor: "#124CB8",
            selectedTextColor: "#fff"
        };
    });

    return (
        <View
            style={tw`bg-white rounded-3xl border border-gray-200 p-6`}
        >
            <Calendar
                current={selectedDate}
                hideExtraDays={false}
                firstDay={0}
                enableSwipeMonths
                onDayPress={(day) => {
                    if (slotsByDate[day.dateString]) {
                        setSelectedDate(day.dateString);
                    }
                }}
                markedDates={markedDates}
                renderArrow={(direction) =>
                    direction === "left" ? <LeftArrow /> : <RightArrow />
                }
                theme={{
                    calendarBackground: "#fff",

                    textMonthFontSize: 32,
                    textMonthFontWeight: "700",
                    monthTextColor: "#191C1E",

                    textDayHeaderFontSize: 16,
                    textDayHeaderFontWeight: "500",
                    textSectionTitleColor: "#71787D",

                    textDayFontSize: 18,
                    todayTextColor: "#124CB8",

                    selectedDayBackgroundColor: "#124CB8",
                    selectedDayTextColor: "#fff",

                    arrowColor: "#191C1E",

                    dayTextColor: "#191C1E",

                    textDisabledColor: "#D1D5DB",

                    stylesheet: {
                        calendar: {
                            header: {
                                marginBottom: 15,
                            },
                        },
                    },
                }}
            />
        </View>
    );
}