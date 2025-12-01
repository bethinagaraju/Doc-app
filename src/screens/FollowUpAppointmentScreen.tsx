import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowLeft } from "lucide-react-native";
import tw from "twrnc";

type Appointment = {
  id: number;
  user_id: number;
  doctor_id: number;
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
};

type FollowUpAppointmentScreenRouteProp = RouteProp<RootStackParamList, "FollowUpAppointment">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FollowUpAppointmentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<FollowUpAppointmentScreenRouteProp>();
  const { parentAppointment } = route.params;

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
      try {
        setLoadingSlots(true);
        const response = await fetch(
          `https://landing.docapp.co.in/api/auth/show-slots/${parentAppointment.doctor_id}`
        );
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
  }, [parentAppointment.doctor_id, followUpType]);

  // Helper function to check if follow-up is free (between 5-15 days after completion)
  const getFollowUpPricing = (completedDate: string, selectedDateStr: string) => {
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

    setFollowUpLoading(true);

    try {
      const response = await fetch(
        "https://landing.docapp.co.in/api/appointment/schedule-checkup-appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            date: selectedDate,
            start: startTime,
            end: endTime,
            type: followUpType,
            appointment_id: String(parentAppointment.id),
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok &&
        (data.success ||
          data.message?.toLowerCase().includes("success") ||
          data.message?.toLowerCase().includes("scheduled") ||
          data.message?.toLowerCase().includes("created"))
      ) {
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
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#16a34a" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 px-4 py-4 flex-row items-center`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-3`}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-white text-xl font-bold`}>Book Follow-up Appointment</Text>
      </View>

      <ScrollView style={tw`flex-1 p-4`}>
        {/* Info about pricing */}
        {/* <View style={tw`bg-blue-50 p-4 rounded-xl mb-4`}>
          <Text style={tw`text-base text-blue-800 text-center font-medium`}>
            📌 Follow-up is FREE if booked between 5-15 days after appointment completion.
          </Text>
          <Text style={tw`text-sm text-blue-600 text-center mt-2`}>
            Before 5 days: Not eligible | After 15 days: Paid
          </Text>
        </View> */}

        {/* Show parent appointment info */}
        <View style={tw`bg-white p-4 rounded-xl mb-4 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-2`}>Parent Appointment Details</Text>
          <Text style={tw`text-base text-gray-700`}>
            Appointment ID: #{parentAppointment.id}
          </Text>
          <Text style={tw`text-base text-gray-700`}>
            Doctor ID: #{parentAppointment.doctor_id}
          </Text>
          <Text style={tw`text-base text-gray-700`}>
            Completed on: {new Date(parentAppointment.appointment_date).toDateString()}
          </Text>
          <Text style={tw`text-base text-gray-700 capitalize`}>
            Type: {parentAppointment.appointment_type}
          </Text>
        </View>

        {/* Appointment Type Selector */}
        <View style={tw`bg-white p-4 rounded-xl mb-4 shadow-sm`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Appointment Type</Text>
          <View style={tw`flex-row bg-green-100 rounded-xl p-2`}>
            <TouchableOpacity
              onPress={() => setFollowUpType("online_video")}
              style={tw`flex-1 py-3 rounded-lg ${
                followUpType === "online_video" ? "bg-green-600" : "bg-transparent"
              }`}
            >
              <Text
                style={tw`text-center font-semibold ${
                  followUpType === "online_video" ? "text-white" : "text-green-800"
                }`}
              >
                Online Video
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFollowUpType("in_person")}
              style={tw`flex-1 py-3 rounded-lg ${
                followUpType === "in_person" ? "bg-green-600" : "bg-transparent"
              }`}
            >
              <Text
                style={tw`text-center font-semibold ${
                  followUpType === "in_person" ? "text-white" : "text-green-800"
                }`}
              >
                In Person
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Availability Section */}
        <View style={tw`bg-white rounded-xl shadow-sm p-4 mb-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
            Available Slots ({followUpType === "online_video" ? "ONLINE" : "OFFLINE"})
          </Text>

          {loadingSlots ? (
            <ActivityIndicator size="large" color="#16a34a" style={tw`my-8`} />
          ) : Object.keys(slotsByDate).length > 0 ? (
            <>
              {/* Date Selector */}
              <Text style={tw`text-base font-semibold text-green-700 mb-2`}>Select Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
                {Object.keys(slotsByDate).map((date) => {
                  const pricing = getFollowUpPricing(parentAppointment.appointment_date, date);
                  return (
                    <TouchableOpacity
                      key={date}
                      style={tw`px-4 py-3 mr-3 rounded-xl ${
                        selectedDate === date ? "bg-green-600" : "bg-green-100"
                      }`}
                      onPress={() => {
                        setSelectedDate(date);
                        setSelectedSlot("");
                      }}
                    >
                      <Text
                        style={tw`text-base font-semibold ${
                          selectedDate === date ? "text-white" : "text-green-800"
                        }`}
                      >
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>
                      <Text
                        style={tw`text-xs mt-1 ${
                          selectedDate === date ? "text-green-100" : pricing.free ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {pricing.free ? "FREE" : pricing.eligible ? "PAID" : "N/A"}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Pricing indicator for selected date */}
              {selectedDate && (
                <View
                  style={tw`p-3 rounded-lg mb-4 ${
                    getFollowUpPricing(parentAppointment.appointment_date, selectedDate).free
                      ? "bg-green-100"
                      : getFollowUpPricing(parentAppointment.appointment_date, selectedDate).eligible
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  }`}
                >
                  <Text
                    style={tw`text-sm text-center font-medium ${
                      getFollowUpPricing(parentAppointment.appointment_date, selectedDate).free
                        ? "text-green-800"
                        : getFollowUpPricing(parentAppointment.appointment_date, selectedDate).eligible
                        ? "text-yellow-800"
                        : "text-red-800"
                    }`}
                  >
                    {getFollowUpPricing(parentAppointment.appointment_date, selectedDate).message}
                  </Text>
                </View>
              )}

              {/* Time Slots */}
              <Text style={tw`text-base font-semibold text-green-700 mb-2`}>Select Time Slot</Text>
              {slotsByDate[selectedDate]?.slots?.length > 0 ? (
                <FlatList
                  data={slotsByDate[selectedDate].slots}
                  keyExtractor={(item, index) => `${item}_${index}`}
                  numColumns={3}
                  scrollEnabled={false}
                  columnWrapperStyle={tw`justify-between mb-2`}
                  renderItem={({ item }) => {
                    const isSelected = selectedSlot === item;
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedSlot(item)}
                        style={tw`px-3 py-3 rounded-xl flex-1 mx-1 border ${
                          isSelected
                            ? "bg-green-600 border-green-700"
                            : "bg-green-100 border-green-300"
                        }`}
                      >
                        <Text
                          style={tw`${
                            isSelected ? "text-white" : "text-green-800"
                          } font-semibold text-xs text-center`}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              ) : (
                <Text style={tw`text-green-400 text-base`}>
                  No slots available for this date.
                </Text>
              )}
            </>
          ) : (
            <Text style={tw`text-green-400 text-base text-center py-4`}>
              No {followUpType === "online_video" ? "online" : "offline"} slots available.
            </Text>
          )}
        </View>

        {/* Book Button */}
        {selectedSlot && (
          <View style={tw`mb-6`}>
            <TouchableOpacity
              onPress={handleScheduleFollowUp}
              style={tw`bg-orange-500 py-4 rounded-full items-center justify-center mb-3`}
              disabled={followUpLoading}
            >
              {followUpLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={tw`text-white text-center font-bold text-base`}>
                  Schedule Follow-up
                </Text>
              )}
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={tw`bg-gray-400 py-3 rounded-full`}
            >
              <Text style={tw`text-white text-center font-semibold`}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FollowUpAppointmentScreen;
