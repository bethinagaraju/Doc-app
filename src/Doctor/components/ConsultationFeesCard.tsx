import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import tw from "twrnc";

interface ConsultationFeesCardProps {
    fee: string;
    onChangeFee: (value: string) => void;
    onUpdate: () => void;
}

export default function ConsultationFeesCard({
    fee,
    onChangeFee,
    onUpdate,
}: ConsultationFeesCardProps) {
    return (
        <View
            style={tw`bg-[#124CB8] rounded-2xl p-4 shadow-lg`}
        >
            {/* Header */}
            <View>
                <MoneyIcon />

                <Text
                    style={tw`mt-2 text-[20px] font-semibold text-white`}
                >
                    Consultation Fees
                </Text>

                <Text
                    style={tw`mt-1 text-base leading-6 text-[#EBEEFF] opacity-90`}
                >
                    Set your standard rate for virtual &{"\n"}
                    in-person visits
                </Text>
            </View>

            {/* Fee Card */}
            <View
                style={tw`mt-4 flex-row items-center justify-between rounded-3xl border border-white/20 bg-white/10 px-4 py-4`}
            >
                {/* Amount */}
                <View style={tw`flex-row items-center flex-1`}>
                    <Text
                        style={tw`text-white text-[32px] font-bold tracking-[-0.64px]`}
                    >
                        $
                    </Text>

                    <TextInput
                        value={fee}
                        onChangeText={onChangeFee}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#EBEEFF"
                        cursorColor="#FFFFFF"
                        style={tw`ml-2 flex-1 p-0 text-[32px] font-bold text-white`}
                    />
                </View>

                {/* Update Button */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onUpdate}
                    style={tw`rounded-full bg-white px-8 py-2`}
                >
                    <Text
                        style={tw`text-xs font-semibold tracking-[0.6px] text-[#124CB8]`}
                    >
                        Update
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

function MoneyIcon() {
    return (
        <Svg
            width={22}
            height={16}
            viewBox="0 0 22 16"
            fill="none"
        >
            <Path
                d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16Z"
                fill="#DAE1FF"
            />
        </Svg>
    );
}