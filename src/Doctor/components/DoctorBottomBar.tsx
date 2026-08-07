import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import tw from 'twrnc';

type Tab = "Dashboard" | "Visits" | "Schedule" | "Profile";

interface Props {
    activeTab: Tab;
    onTabPress?: (tab: Tab) => void;
}

const PRIMARY = "#124CB8";
const BG = "#E4EFFF";
const TEXT = "#434653";
const WHITE = "#EBEEFF";

export default function DoctorBottomBar({
    activeTab,
    onTabPress,
}: Props) {
    const tabs: Tab[] = [
        "Dashboard",
        "Visits",
        "Schedule",
        "Profile",
    ];

    return (
        <View
            style={tw`absolute bottom-0 left-0 right-0 bg-[#E4EFFF] px-2 py-3 rounded-t-3xl shadow-lg flex-row justify-between items-center`}
        >
            {tabs.map((tab) => {
                const active = activeTab === tab;

                return (
                    <TouchableOpacity
                        key={tab}
                        activeOpacity={0.8}
                        onPress={() => onTabPress?.(tab)}
                        style={tw.style(
                            "items-center justify-center px-5 py-1 rounded-full",
                            active && "bg-[#124CB8]"
                        )}
                    >
                        {renderIcon(tab, active)}

                        <Text
                            style={tw.style(
                                "mt-1 text-xs font-semibold",
                                {
                                    color: active ? WHITE : TEXT,
                                    letterSpacing: 0.6,
                                }
                            )}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

function renderIcon(tab: Tab, active: boolean) {
    const color = active ? WHITE : TEXT;

    switch (tab) {
        case "Dashboard":
            return (
                <Svg width={18} height={18} viewBox="0 0 18 18">
                    <Path
                        fill={color}
                        d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z"
                    />
                </Svg>
            );

        case "Visits":
            return (
                <Svg width={18} height={20} viewBox="0 0 18 20">
                    <Path
                        fill={color}
                        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6Z"
                    />
                </Svg>
            );

        case "Schedule":
            return (
                <Svg width={18} height={20} viewBox="0 0 18 20">
                    <Path
                        fill={color}
                        d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6ZM2 6V4V6ZM4 12V10H14V12H4ZM4 16V14H11V16H4Z"
                    />
                </Svg>
            );

        case "Profile":
            return (
                <Svg width={20} height={20} viewBox="0 0 20 20">
                    <Path
                        fill={color}
                        d="M3.85 15.1C4.7 14.45 5.65 13.9375 6.7 13.5625C7.75 13.1875 8.85 13 10 13C11.15 13 12.25 13.1875 13.3 13.5625C14.35 13.9375 15.3 14.45 16.15 15.1C16.7333 14.4167 17.1875 13.6417 17.5125 12.775C17.8375 11.9083 18 10.9833 18 10C18 7.78333 17.2208 5.89583 15.6625 4.3375C14.1042 2.77917 12.2167 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 10.9833 2.1625 11.9083 2.4875 12.775C2.8125 13.6417 3.26667 14.4167 3.85 15.1ZM10 11C9.01667 11 8.1875 10.6625 7.5125 9.9875C6.8375 9.3125 6.5 8.48333 6.5 7.5C6.5 6.51667 6.8375 5.6875 7.5125 5.0125C8.1875 4.3375 9.01667 4 10 4C10.9833 4 11.8125 4.3375 12.4875 5.0125C13.1625 5.6875 13.5 6.51667 13.5 7.5C13.5 8.48333 13.1625 9.3125 12.4875 9.9875C11.8125 10.6625 10.9833 11 10 11ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C10.8833 18 11.7167 17.8708 12.5 17.6125C13.2833 17.3542 14 16.9833 14.65 16.5C14 16.0167 13.2833 15.6458 12.5 15.3875C11.7167 15.1292 10.8833 15 10 15C9.11667 15 8.28333 15.1292 7.5 15.3875C6.71667 15.6458 6 16.0167 5.35 16.5C6 16.9833 6.71667 17.3542 7.5 17.6125C8.28333 17.8708 9.11667 18 10 18ZM10 9C10.4333 9 10.7917 8.85833 11.075 8.575C11.3583 8.29167 11.5 7.93333 11.5 7.5C11.5 7.06667 11.3583 6.70833 11.075 6.425C10.7917 6.14167 10.4333 6 10 6C9.56667 6 9.20833 6.14167 8.925 6.425C8.64167 6.70833 8.5 7.06667 8.5 7.5C8.5 7.93333 8.64167 8.29167 8.925 8.575C9.20833 8.85833 9.56667 9 10 9Z"
                    />
                </Svg>
            );

        default:
            return null;
    }
}