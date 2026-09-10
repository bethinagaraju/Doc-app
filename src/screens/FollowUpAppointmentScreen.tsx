import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft } from "lucide-react-native";
import tw from "twrnc";
import Svg, { Path } from 'react-native-svg';
import DateSelector from './user_components/DateSelector';
import { useAccessToken } from "./contexts/AccessTokenContext";
import { useUser } from "./contexts/UserContext";

type Appointment = {
  id: number;
  user_id: number;
  doctor_id?: number;
  doctorId?: number;
  doctor?: {
    id: number;
    username?: string;
    doctorProfile?: {
      profile_picture?: string;
    };
  };
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_status: string;
  appointment_type: string;
  payment_mode: string;
  prescription: any;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  checkupAppointment: any[];
};

type RootStackParamList = {
  FollowUpAppointment: {
    parentAppointment: Appointment;
  };
  Appointments: undefined;
  RazorpayPaymentScreen: {
    appointmentId: number;
    doctor: any;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
    doctorId: number;
    orderId?: string;
    razorpayAmount?: number;
    razorpayKey?: string;
  };
};

type FollowUpAppointmentScreenRouteProp = RouteProp<RootStackParamList, "FollowUpAppointment">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const getSlotPeriod = (slotStr: string): 'morning' | 'afternoon' | 'evening' => {
  const startTime = slotStr.split('-')[0]?.trim();
  if (!startTime) return 'morning';
  const hour = parseInt(startTime.split(':')[0], 10);
  if (isNaN(hour)) return 'morning';

  if (hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 16) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

const formatSlotStart12Hr = (slotStr: string) => {
  const start = slotStr.split('-')[0]?.trim();
  if (!start) return slotStr;
  const timeParts = start.split(':');
  let hour = parseInt(timeParts[0], 10);
  const minute = timeParts[1] || '00';
  if (isNaN(hour)) return slotStr;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

const FollowUpAppointmentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FollowUpAppointmentScreenRouteProp>();
  const { parentAppointment } = route.params;
  const { accessToken } = useAccessToken();
  const { user } = useUser();

  const doctorUserId = parentAppointment.doctor_id || parentAppointment.doctor?.id || parentAppointment.doctorId || (user?.role?.toLowerCase() === 'doctor' ? user.id : undefined);

  // Slots state
  const [slotsByDate, setSlotsByDate] = useState<{ [date: string]: { mode: string; slots: string[] } }>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [loadingSlots, setLoadingSlots] = useState(true);

  const [followUpType, setFollowUpType] = useState<"online_video" | "in_person">("online_video");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  // Fetch doctor's available slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!doctorUserId) {
        console.log("No doctor user ID available, cannot fetch slots.");
        console.log(parentAppointment.doctor + 'doctor')
        console.log(user + 'user')
        setLoadingSlots(false);
        return;
      }
      try {
        setLoadingSlots(true);
        const response = await fetch(
          `https://api.docapp.co.in/api/auth/show-slots/${doctorUserId}`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            },
          }
        );
        console.log(doctorUserId + ' doctor_id')
        const data = await response.json();
        let parsedSlots: any[] = [];

        // Parse nested slot JSONs safely
        if (data.slots && Array.isArray(data.slots)) {
          data.slots.forEach((slotObj: any) => {
            try {
              const innerSlots = JSON.parse(slotObj.slots);
              if (Array.isArray(innerSlots)) {
                parsedSlots = parsedSlots.concat(innerSlots);
              }
            } catch (err) {
              console.error("Slot parsing error:", err);
            }
          });
        }

        // Filter slots based on appointment type and get only future dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredSlots = parsedSlots.filter((slot) => {
          const slotDate = new Date(slot.date);
          slotDate.setHours(0, 0, 0, 0);

          // Only show future dates
          if (slotDate <= today) return false;

          // Filter by mode based on followUpType
          const mode = slot.mode?.toLowerCase();
          if (followUpType === "online_video") {
            return mode === "online" || mode === "hybrid";
          } else if (followUpType === "in_person") {
            return mode === "offline" || mode === "hybrid";
          }
          return true;
        });

        // Group filtered slots by date
        const grouped: { [key: string]: { mode: string; slots: string[] } } = {};
        filteredSlots.forEach((slot) => {
          const date = slot.date;
          const mode = slot.mode || "unknown";
          if (!grouped[date]) grouped[date] = { mode, slots: [] };

          if (Array.isArray(slot.slots)) {
            slot.slots.forEach((timeSlot: any) => {
              grouped[date].slots.push(`${timeSlot.start}-${timeSlot.end}`);
            });
          }
        });

        const sortedDates = Object.keys(grouped).sort();
        setSlotsByDate(grouped);
        setSelectedDate(sortedDates[0] || "");
        setSelectedSlot(""); // Reset selected slot when type changes
      } catch (error) {
        console.error("Slot fetch error:", error);
        Alert.alert("Error", "Failed to fetch available slots");
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [doctorUserId, followUpType, accessToken]);

  // Helper function to check if follow-up is free (between 5-15 days after completion)
  const getFollowUpPricing = (completedDate: string, selectedDateStr: string) => {
    const status = parentAppointment.appointment_status?.toLowerCase();
    if (status !== "completed" && status !== "closed") {
      return {
        eligible: false,
        free: false,
        message: "Follow-up is only valid for successfully completed appointments",
      };
    }

    const completed = new Date(completedDate);
    const selected = new Date(selectedDateStr);
    const diffTime = selected.getTime() - completed.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 5) {
      return {
        eligible: false,
        free: false,
        message: "Follow-up cannot be booked before 5 days of completion",
      };
    } else if (diffDays >= 5 && diffDays <= 15) {
      return {
        eligible: true,
        free: true,
        message: "This follow-up is FREE (within 5-15 days of completion)",
      };
    } else {
      return {
        eligible: true,
        free: false,
        message: "This follow-up requires payment (after 15 days of completion)",
      };
    }
  };

  // Schedule follow-up/checkup appointment
  const handleScheduleFollowUp = async () => {
    if (!selectedDate || !selectedSlot) {
      Alert.alert("Validation", "Please select a date and time slot");
      return;
    }

    // Parse start and end time from selected slot (format: "10:00-10:30")
    const [startTime, endTime] = selectedSlot.split("-");

    // Check pricing eligibility
    const pricing = getFollowUpPricing(parentAppointment.appointment_date, selectedDate);
    if (!pricing.eligible) {
      Alert.alert("Not Eligible", pricing.message);
      return;
    }

    console.log("=== FOLLOW-UP APPOINTMENT BOOKING DETAILS ===");
    console.log("Parent Appointment ID:", parentAppointment.id);
    console.log("Parent Appointment Date:", parentAppointment.appointment_date);
    console.log("Parent Appointment Details:", JSON.stringify(parentAppointment, null, 2));
    console.log("Doctor User ID:", doctorUserId);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Slot:", selectedSlot);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("Follow-Up Type:", followUpType);
    console.log("Pricing Eligibility Status:", JSON.stringify(pricing, null, 2));
    console.log("=============================================");

    setFollowUpLoading(true);

    const requestBody = {
      date: selectedDate,
      start: startTime?.trim(),
      end: endTime?.trim(),
      type: followUpType === "online_video" ? "online_video" : "offline",
      appointment_id: String(parentAppointment.id),
      payment_mode: "card",
    };

    console.log("SENDING REQUEST BODY (schedule-checkup-appointment):", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(
        "https://api.docapp.co.in/api/appointment/schedule-checkup-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      const responseClone = response.clone();
      try {
        const responseText = await responseClone.text();
        console.log("RECEIVED RESPONSE BODY (schedule-checkup-appointment):", responseText);
      } catch (errClone) {
        console.log("Failed to clone/read response body:", errClone);
      }

      const data = await response.json();

      if (
        response.ok &&
        (data.success ||
          data.message?.toLowerCase().includes("success") ||
          data.message?.toLowerCase().includes("scheduled") ||
          data.message?.toLowerCase().includes("created"))
      ) {
        const isPaymentRequired = data.free === false || data.checkup?.is_payment_required === true || !!data.orderId;

        if (isPaymentRequired) {
          Alert.alert(
            "Payment Required",
            "This follow-up requires payment. Redirecting to checkout...",
            [
              {
                text: "Pay Now",
                onPress: () => {
                  navigation.navigate('RazorpayPaymentScreen', {
                    appointmentId: data?.appointment_id || data?.checkup?.id,
                    doctor: {
                      id: doctorUserId,
                      specialization: parentAppointment.doctor?.doctorProfile?.specialization || "Doctor",
                      consultation_fee: data.amount ? data.amount / 100 : 0,
                      profile_picture: parentAppointment.doctor?.doctorProfile?.profile_picture,
                      user: {
                        username: parentAppointment.doctor?.username || 'Doctor',
                      }
                    },
                    slot: selectedSlot,
                    date: selectedDate,
                    consultationType: followUpType === "online_video" ? "video" : "inclinic",
                    amount: data.amount ? data.amount / 100 : 0,
                    doctorId: Number(doctorUserId),
                    orderId: data.orderId,
                    razorpayAmount: data.amount,
                    razorpayKey: data.key,
                  });
                }
              }
            ]
          );
        } else {
          Alert.alert(
            "Success",
            pricing.free
              ? "Follow-up appointment scheduled successfully! (FREE - within 5-15 days)"
              : "Follow-up appointment scheduled successfully!",
            [
              {
                text: "OK",
                onPress: () => navigation.goBack(),
              },
            ]
          );
        }
      } else {
        throw new Error(data.message || "Failed to schedule follow-up appointment");
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong");
    } finally {
      setFollowUpLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      {/* Header */}
      <View style={tw`bg-white px-4 py-4 flex-row items-center border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <ArrowLeft size={24} color="#191C1E" />
        </TouchableOpacity>
        <Text style={tw`text-[#191C1E] text-lg font-bold`}>Book Follow-up Appointment</Text>
      </View>

      <ScrollView contentContainerStyle={tw`pb-10`} showsVerticalScrollIndicator={false}>
        <View style={tw`p-4 mb-6`}>
          {/* Show parent appointment info */}
          <View style={tw`bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-6 shadow-sm`}>
            <Text style={tw`text-[16px] font-bold text-[#191C1E] mb-2`}>Parent Appointment Details</Text>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-sm text-gray-500`}>Appointment ID:</Text>
              <Text style={tw`text-sm font-semibold text-[#191C1E]`}>#{parentAppointment.id}</Text>
            </View>
            <View style={tw`flex-row justify-between mb-1`}>
              <Text style={tw`text-sm text-gray-500`}>Completed on:</Text>
              <Text style={tw`text-sm font-semibold text-[#191C1E]`}>
                {new Date(parentAppointment.appointment_date).toDateString()}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-sm text-gray-500`}>Type:</Text>
              <Text style={tw`text-sm font-semibold text-[#191C1E] capitalize`}>
                {parentAppointment.appointment_type}
              </Text>
            </View>
          </View>

          {/* Appointment Type Selector */}
          <View style={tw`flex-row justify-center mb-6 bg-gray-100 rounded-full p-1 shadow-sm`}>
            <TouchableOpacity
              onPress={() => setFollowUpType("online_video")}
              style={tw`flex-1 py-3 rounded-full items-center ${followUpType === "online_video" ? "bg-[#124CB8] shadow-sm" : "bg-transparent"
                }`}
            >
              <Text style={tw`font-bold text-sm ${followUpType === "online_video" ? "text-white" : "text-gray-500"
                }`}>
                Online / Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFollowUpType("in_person")}
              style={tw`flex-1 py-3 rounded-full items-center ${followUpType === "in_person" ? "bg-[#124CB8] shadow-sm" : "bg-transparent"
                }`}
            >
              <Text style={tw`font-bold text-sm ${followUpType === "in_person" ? "text-white" : "text-gray-500"
                }`}>
                Offline / In-Clinic
              </Text>
            </TouchableOpacity>
          </View>

          {/* Availability Section */}
          {loadingSlots ? (
            <ActivityIndicator size="large" color="#124CB8" style={tw`my-8`} />
          ) : Object.keys(slotsByDate).length > 0 ? (
            <>
              {/* Date Selector */}
              <View style={tw`mb-4`}>
                <DateSelector
                  slotsByDate={slotsByDate}
                  selectedDate={selectedDate}
                  setSelectedDate={(date: string) => {
                    setSelectedDate(date);
                    setSelectedSlot("");
                  }}
                />
              </View>

              {/* Pricing indicator for selected date */}
              {selectedDate && (
                <View
                  style={tw`p-3 rounded-xl mb-6 ${getFollowUpPricing(parentAppointment.appointment_date, selectedDate).free
                    ? "bg-green-50 border border-green-200"
                    : getFollowUpPricing(parentAppointment.appointment_date, selectedDate).eligible
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-red-50 border border-red-200"
                    }`}
                >
                  <Text
                    style={tw`text-[13px] text-center font-semibold ${getFollowUpPricing(parentAppointment.appointment_date, selectedDate).free
                      ? "text-green-700"
                      : getFollowUpPricing(parentAppointment.appointment_date, selectedDate).eligible
                        ? "text-yellow-700"
                        : "text-red-700"
                      }`}
                  >
                    {getFollowUpPricing(parentAppointment.appointment_date, selectedDate).message}
                  </Text>
                </View>
              )}

              {/* Time Slots */}
              {slotsByDate[selectedDate]?.slots && slotsByDate[selectedDate].slots.length > 0 ? (() => {
                const slots = slotsByDate[selectedDate].slots;
                const morningSlots = slots.filter(s => getSlotPeriod(s) === 'morning');
                const afternoonSlots = slots.filter(s => getSlotPeriod(s) === 'afternoon');
                const eveningSlots = slots.filter(s => getSlotPeriod(s) === 'evening');

                const renderSlotGroup = (title: string, periodSlots: string[], icon: string) => {
                  if (periodSlots.length === 0) return null;
                  return (
                    <View style={tw`mb-6`}>
                      <Text style={tw`text-[16px] font-bold text-[#191C1E] font-['Public_Sans'] mb-3`}>
                        {icon}  {title}
                      </Text>
                      <View style={tw`flex-row flex-wrap -mx-1`}>
                        {periodSlots.map((item, index) => {
                          const isSelected = selectedSlot === item;
                          return (
                            <TouchableOpacity
                              key={`${item}_${index}`}
                              onPress={() => setSelectedSlot(item)}
                              activeOpacity={0.8}
                              style={[
                                tw`justify-center items-center h-[46px] border rounded-[12px] m-1`,
                                {
                                  width: '30.5%',
                                  borderColor: isSelected ? '#124CB8' : '#E6E9EC',
                                  backgroundColor: isSelected ? '#F0F7FF' : '#fff',
                                }
                              ]}
                            >
                              <Text style={tw`text-[13px] font-['Public_Sans'] ${isSelected ? 'text-[#124CB8] font-bold' : 'text-[#41484D] font-medium'}`}>
                                {formatSlotStart12Hr(item)}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  );
                };

                return (
                  <View style={tw`flex-col`}>
                    {renderSlotGroup("Morning Slots", morningSlots, "☀️")}
                    {renderSlotGroup("Afternoon Slots", afternoonSlots, "🌤️")}
                    {renderSlotGroup("Evening Slots", eveningSlots, "🌙")}
                  </View>
                );
              })() : (
                <View style={tw`py-10 bg-gray-50 border border-gray-100 rounded-[16px] items-center justify-center`}>
                  <Text style={tw`text-[#72777F] text-[15px] font-semibold font-['Public_Sans']`}>
                    No slots available for this date.
                  </Text>
                </View>
              )}

              {/* Book Button */}
              {selectedSlot && (
                <TouchableOpacity
                  style={tw`bg-[#124CB8] py-4 px-8 rounded-2xl flex-row justify-center items-center shadow-lg mt-2 mb-6 ${followUpLoading ? 'opacity-70' : ''}`}
                  onPress={handleScheduleFollowUp}
                  disabled={followUpLoading}
                >
                  {followUpLoading ? (
                    <ActivityIndicator color="#fff" style={tw`mr-2`} />
                  ) : (
                    <Text style={tw`text-white text-[16px] font-semibold mr-2`}>
                      Schedule Follow-up
                    </Text>
                  )}
                  {!followUpLoading && (
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <Path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="white" />
                    </Svg>
                  )}
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={tw`py-10 bg-gray-50 border border-gray-100 rounded-[16px] items-center justify-center`}>
              <Text style={tw`text-[#72777F] text-[15px] font-semibold font-['Public_Sans']`}>
                No {followUpType === "online_video" ? "online" : "offline"} slots available.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowUpAppointmentScreen;
