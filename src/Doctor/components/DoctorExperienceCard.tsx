import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Stethoscope } from "lucide-react-native";
import tw from "twrnc";

interface DoctorExperienceCardProps {
    experience: string;
    onChangeExperience: (value: string) => void;
    onUpdate: () => void;
}

export default function DoctorExperienceCard({
    experience,
    onChangeExperience,
    onUpdate,
}: DoctorExperienceCardProps) {
    return (
        <View style={tw`bg-white border border-[#DAE1E7] rounded-2xl p-4 shadow-sm`}>
            {/* Header */}
            <View>
                <Stethoscope size={24} color="#124CB8" />

                <Text style={tw`mt-2 text-[20px] font-semibold text-[#011D35]`}>
                    Experience
                </Text>

                <Text
                    style={tw`mt-1 text-sm text-[#434653]`}
                >
                    Update your total years of professional practice
                </Text>
            </View>

            {/* Experience Box */}
            <View
                style={tw`mt-5 flex-row items-center justify-between rounded-2xl border border-[#E8E9EF] bg-[#F8F9FF] px-4 py-3`}
            >
                <View style={tw`flex-row items-center flex-1`}>
                    <TextInput
                        value={experience}
                        onChangeText={onChangeExperience}
                        keyboardType="numeric"
                        placeholder="0"
                        placeholderTextColor="#A0ABC0"
                        cursorColor="#124CB8"
                        style={tw`text-[28px] font-bold text-[#124CB8] p-0 min-w-[50px]`}
                    />

                    <Text
                        style={tw`ml-2 text-lg font-semibold text-[#434653]`}
                    >
                        Years
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onUpdate}
                    style={tw`rounded-full bg-[#124CB8] px-6 py-2.5 shadow-sm`}
                >
                    <Text
                        style={tw`text-[13px] font-semibold tracking-[0.5px] text-white`}
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}