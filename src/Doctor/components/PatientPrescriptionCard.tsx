import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Pill, Plus, Eye, FileText } from 'lucide-react-native';
import tw from 'twrnc';

export type PrescriptionItem = {
    drug: string;
    qty: string;
    timing: string;
    notes: string;
};

interface PatientPrescriptionCardProps {
    prescriptionList?: PrescriptionItem[];
    onAddPrescription?: () => void;
    onViewPrescription?: (items: PrescriptionItem[]) => void;
}

const PatientPrescriptionCard: React.FC<PatientPrescriptionCardProps> = ({
    prescriptionList = [],
    onAddPrescription,
    onViewPrescription,
}) => {
    return (
        /* Section - Prescription Card Container */
        <View
            style={[
                tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[16px]`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Header Row Container */}
            <View style={tw`w-full flex-row justify-between items-center h-[28px]`}>
                <Text
                    style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                >
                    Prescription
                </Text>

                {/* Right Header Group: Count Badge + Add Prescription Button */}
                <View style={tw`flex-row items-center gap-[10px]`}>
                    {/* Count Pill Badge */}
                    <View style={tw`bg-[#DBE3F1] rounded-full px-[10px] py-[4px] justify-center items-center`}>
                        <Text
                            style={tw`text-[12px] font-semibold text-[#124CB8] font-['Inter'] tracking-[0.6px] leading-[16px]`}
                        >
                            {prescriptionList.length} {prescriptionList.length === 1 ? 'Item' : 'Items'}
                        </Text>
                    </View>

                    {/* Plus Icon Button to Add Prescription */}
                    {onAddPrescription && (
                        <TouchableOpacity
                            onPress={onAddPrescription}
                            activeOpacity={0.7}
                            style={tw`bg-[#124CB8] w-[28px] h-[28px] rounded-full justify-center items-center`}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                        >
                            <Plus size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Prescription Items List */}
            {prescriptionList.length === 0 ? (
                <View style={tw`py-4 items-center justify-center`}>
                    <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>
                        No prescription added yet.
                    </Text>
                </View>
            ) : (
                <View style={tw`w-full flex-col gap-[12px]`}>
                    {prescriptionList.map((item, index) => (
                        <View
                            key={index}
                            style={tw`w-full border border-[#C3C6D5] rounded-[8px] p-[12px] flex-row items-center gap-[12px] bg-[#FAFBFD]`}
                        >
                            {/* Left Pill Icon */}
                            <View style={tw`w-[40px] h-[40px] rounded-[6px] bg-[#EEF4FF] justify-center items-center`}>
                                <Pill size={20} color="#124CB8" />
                            </View>

                            {/* Drug Name & Details */}
                            <View style={tw`flex-1 flex-col justify-center`}>
                                <Text
                                    style={tw`text-[14px] font-semibold text-[#011D35] font-['Inter'] leading-[20px]`}
                                    numberOfLines={1}
                                >
                                    {item.drug || 'Unspecified Drug'}
                                </Text>
                                <Text
                                    style={tw`text-[11px] font-normal text-[#434653] font-['Inter'] leading-[16px]`}
                                    numberOfLines={1}
                                >
                                    Qty: {item.qty || '-'} • Timing: {item.timing || '-'}
                                </Text>
                            </View>

                            {/* View Action Icon */}
                            {onViewPrescription && (
                                <TouchableOpacity
                                    onPress={() => onViewPrescription(prescriptionList)}
                                    style={tw`p-[6px] bg-[#EEF4FF] rounded-[6px]`}
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                    <Eye size={18} color="#124CB8" />
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default PatientPrescriptionCard;
