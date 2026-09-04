// import React from 'react';
// import { View, Text } from 'react-native';
// import tw from 'twrnc';

// interface AppointmentAdditionalInfoProps {
//     appointmentId: number | string;
//     paymentMode?: string;
//     appointmentDate: string;
//     startTime: string;
//     endTime: string;
//     status: string;
//     type: string;
// }

// const AppointmentAdditionalInfoCard: React.FC<AppointmentAdditionalInfoProps> = ({
//     appointmentId,
//     paymentMode = 'Not specified',
//     appointmentDate,
//     startTime,
//     endTime,
//     status,
//     type,
// }) => {
//     const formattedDate = appointmentDate ? new Date(appointmentDate).toDateString() : 'N/A';

//     return (
//         <View
//             style={[
//                 tw`w-full bg-white rounded-[12px] p-[24px] border border-[#DAE1E7] gap-[12px]`,
//                 {
//                     shadowColor: '#102A43',
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.05,
//                     shadowRadius: 20,
//                     elevation: 4,
//                 },
//             ]}
//         >
//             <Text style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter'] leading-[24px] mb-[4px]`}>
//                 Additional Info
//             </Text>

//             {/* Appointment ID */}
//             <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment ID</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>#{appointmentId}</Text>
//             </View>

//             {/* Payment Mode */}
//             <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Payment Mode</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>
//                     {paymentMode || 'Not specified'}
//                 </Text>
//             </View>

//             {/* Appointment Date */}
//             <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment Date</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>{formattedDate}</Text>
//             </View>

//             {/* Appointment Time */}
//             <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Appointment Time</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold font-['Inter']`}>
//                     {startTime} - {endTime}
//                 </Text>
//             </View>

//             {/* Status */}
//             <View style={tw`flex-row justify-between py-[8px] border-b border-[#F0F3F6]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Status</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>{status}</Text>
//             </View>

//             {/* Type */}
//             <View style={tw`flex-row justify-between py-[8px]`}>
//                 <Text style={tw`text-[14px] text-[#434653] font-['Inter']`}>Type</Text>
//                 <Text style={tw`text-[14px] text-[#011D35] font-semibold capitalize font-['Inter']`}>{type}</Text>
//             </View>
//         </View>
//     );
// };

// export default AppointmentAdditionalInfoCard;





import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

interface AppointmentAdditionalInfoProps {
    appointmentId: number | string;
    paymentMode?: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    status: string;
    type: string;
}

const AppointmentAdditionalInfoCard: React.FC<
    AppointmentAdditionalInfoProps
> = ({
    appointmentId,
    paymentMode = 'Not specified',
    appointmentDate,
    startTime,
    endTime,
    status,
    type,
}) => {
        const formattedDate = appointmentDate
            ? new Date(appointmentDate).toLocaleDateString('en-US', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
            })
            : 'N/A';

        const getStatus = () => {
            switch (status?.toLowerCase()) {
                case 'completed':
                    return {
                        background: '#ECFDF3',
                        color: '#027A48',
                        dot: '#12B76A',
                    };

                case 'confirmed':
                    return {
                        background: '#EFF8FF',
                        color: '#175CD3',
                        dot: '#2E90FA',
                    };

                case 'pending':
                    return {
                        background: '#FFFAEB',
                        color: '#B54708',
                        dot: '#F79009',
                    };

                case 'cancelled':
                case 'canceled':
                    return {
                        background: '#FEF3F2',
                        color: '#B42318',
                        dot: '#F04438',
                    };

                default:
                    return {
                        background: '#F2F4F7',
                        color: '#475467',
                        dot: '#667085',
                    };
            }
        };

        const statusConfig = getStatus();

        return (
            <View
                style={[
                    tw`w-full bg-white rounded-[24px] border border-[#E2E8F0] overflow-hidden`,
                    {
                        shadowColor: '#0F172A',
                        shadowOffset: {
                            width: 0,
                            height: 8,
                        },
                        shadowOpacity: 0.04,
                        shadowRadius: 24,
                        elevation: 4,
                    },
                ]}
            >
                {/* ================= HEADER ================= */}
                <View style={tw`px-[20px] pt-[20px] pb-[18px]`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`flex-1`}>
                            <Text
                                style={tw`text-[20px] font-bold text-[#0F172A] font-['Inter']`}
                            >
                                Appointment Details
                            </Text>

                            <Text
                                style={tw`text-[13px] text-[#64748B] mt-[4px] font-['Inter']`}
                            >
                                Information about this appointment
                            </Text>
                        </View>

                        {/* ID */}
                        <View
                            style={tw`bg-[#EBF1FF] border border-[#D1E0FF] rounded-full px-[12px] py-[6px] items-center justify-center`}
                        >
                            <Text
                                style={tw`text-[12px] text-[#124CB8] font-bold font-['Inter'] uppercase tracking-wider`}
                            >
                                ID: #{appointmentId}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ================= APPOINTMENT TIME CARD ================= */}
                <View style={tw`px-[20px]`}>
                    <View
                        style={tw`bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-[16px]`}
                    >
                        <View style={tw`flex-row items-center`}>
                            {/* Calendar */}
                            <View
                                style={tw`w-[48px] h-[48px] bg-white rounded-full border border-[#E2E8F0] items-center justify-center shadow-sm`}
                            >
                                <Text style={tw`text-[20px]`}>
                                    📅
                                </Text>
                            </View>

                            {/* Date */}
                            <View style={tw`ml-[14px] flex-1`}>
                                <Text
                                    style={tw`text-[11px] text-[#64748B] font-semibold uppercase tracking-wider font-['Inter']`}
                                >
                                    Appointment Date
                                </Text>

                                <Text
                                    style={tw`text-[15px] text-[#0F172A] font-bold mt-[2px] font-['Inter']`}
                                >
                                    {formattedDate}
                                </Text>
                            </View>
                        </View>

                        {/* Time */}
                        <View
                            style={tw`flex-row items-center mt-[16px] pt-[16px] border-t border-[#E2E8F0]`}
                        >
                            <View
                                style={tw`w-[48px] h-[48px] rounded-full bg-white border border-[#E2E8F0] items-center justify-center shadow-sm`}
                            >
                                <Text style={tw`text-[18px]`}>
                                    🕐
                                </Text>
                            </View>

                            <View style={tw`ml-[14px]`}>
                                <Text
                                    style={tw`text-[11px] text-[#64748B] font-semibold uppercase tracking-wider font-['Inter']`}
                                >
                                    Time
                                </Text>

                                <Text
                                    style={tw`text-[15px] text-[#0F172A] font-bold mt-[2px] font-['Inter']`}
                                >
                                    {startTime} - {endTime}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* ================= INFORMATION ================= */}
                <View style={tw`px-[20px] pt-[18px] pb-[20px]`}>

                    <Text
                        style={tw`text-[14px] font-bold text-[#0F172A] mb-[12px] font-['Inter']`}
                    >
                        Appointment Information
                    </Text>

                    <View style={tw`flex-row justify-between`}>
                        {/* Payment */}
                        <View
                            style={tw`flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-[14px] mr-[8px] items-start`}
                        >
                            <View
                                style={tw`w-[34px] h-[34px] rounded-[10px] bg-white border border-[#E2E8F0] items-center justify-center mb-[10px] shadow-sm`}
                            >
                                <Text style={tw`text-[16px]`}>
                                    💳
                                </Text>
                            </View>

                            <Text
                                style={tw`text-[11px] text-[#64748B] font-semibold font-['Inter']`}
                            >
                                Payment
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={tw`text-[13px] text-[#0F172A] font-bold capitalize mt-[4px] font-['Inter']`}
                            >
                                {paymentMode || 'Not specified'}
                            </Text>
                        </View>

                        {/* Type */}
                        <View
                            style={tw`flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-[14px] mx-[4px] items-start`}
                        >
                            <View
                                style={tw`w-[34px] h-[34px] rounded-[10px] bg-white border border-[#E2E8F0] items-center justify-center mb-[10px] shadow-sm`}
                            >
                                <Text style={tw`text-[16px]`}>
                                    📋
                                </Text>
                            </View>

                            <Text
                                style={tw`text-[11px] text-[#64748B] font-semibold font-['Inter']`}
                            >
                                Type
                            </Text>

                            <Text
                                numberOfLines={1}
                                style={tw`text-[13px] text-[#0F172A] font-bold capitalize mt-[4px] font-['Inter']`}
                            >
                                {type || 'N/A'}
                            </Text>
                        </View>

                        {/* Status */}
                        <View
                            style={tw`flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[14px] p-[14px] ml-[8px] items-start`}
                        >
                            <View
                                style={tw`w-[34px] h-[34px] rounded-[10px] bg-white border border-[#E2E8F0] items-center justify-center mb-[10px] shadow-sm`}
                            >
                                <View
                                    style={[
                                        tw`w-[10px] h-[10px] rounded-full`,
                                        {
                                            backgroundColor:
                                                statusConfig.dot,
                                        },
                                    ]}
                                />
                            </View>

                            <Text
                                style={tw`text-[11px] text-[#64748B] font-semibold font-['Inter']`}
                            >
                                Status
                            </Text>

                            <View
                                style={[
                                    tw`self-start rounded-full px-[8px] py-[3px] mt-[4px]`,
                                    {
                                        backgroundColor:
                                            statusConfig.background,
                                    },
                                ]}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={[
                                        tw`text-[11px] font-bold capitalize font-['Inter']`,
                                        {
                                            color: statusConfig.color,
                                        },
                                    ]}
                                >
                                    {status || 'Unknown'}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

export default AppointmentAdditionalInfoCard;