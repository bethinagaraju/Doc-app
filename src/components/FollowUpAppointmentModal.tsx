import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
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

type FollowUpAppointmentModalProps = {
  visible: boolean;
  onClose: () => void;
  parentAppointment: Appointment | null;
  onSuccess: () => void;
};

const FollowUpAppointmentModal: React.FC<FollowUpAppointmentModalProps> = ({
  visible,
  onClose,
  parentAppointment,
  onSuccess,
}) => {
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpStartTime, setFollowUpStartTime] = useState("");
  const [followUpEndTime, setFollowUpEndTime] = useState("");
  const [followUpType, setFollowUpType] = useState<"online_video" | "in_person">("online_video");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  // Helper function to check if follow-up is free (between 5-15 days after completion)
  const getFollowUpPricing = (completedDate: string, selectedDate: string) => {
    const completed = new Date(completedDate);
    const selected = new Date(selectedDate);
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

  // Reset form
  const resetForm = () => {
    setFollowUpDate("");
    setFollowUpStartTime("");
    setFollowUpEndTime("");
    setFollowUpType("online_video");
  };

  // Handle close
  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Schedule follow-up/checkup appointment
  const handleScheduleFollowUp = async () => {
    if (!parentAppointment) {
      Alert.alert("Error", "No appointment selected");
      return;
    }
    if (!followUpDate || !followUpStartTime || !followUpEndTime) {
      Alert.alert("Validation", "Please fill in all fields (date, start time, end time)");
      return;
    }

    // Validate date format (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(followUpDate)) {
      Alert.alert("Validation", "Please enter date in YYYY-MM-DD format (e.g., 2025-12-15)");
      return;
    }

    // Validate time format (HH:MM)
    const timeRegex = /^\d{2}:\d{2}$/;
    if (!timeRegex.test(followUpStartTime) || !timeRegex.test(followUpEndTime)) {
      Alert.alert("Validation", "Please enter time in HH:MM format (e.g., 10:00)");
      return;
    }

    // Check pricing eligibility
    const pricing = getFollowUpPricing(parentAppointment.appointment_date, followUpDate);
    if (!pricing.eligible) {
      Alert.alert("Not Eligible", pricing.message);
      return;
    }

    console.log("=== FOLLOW-UP APPOINTMENT BOOKING DETAILS (MODAL) ===");
    console.log("Parent Appointment ID:", parentAppointment.id);
    console.log("Parent Appointment Date:", parentAppointment.appointment_date);
    console.log("Parent Appointment Details:", JSON.stringify(parentAppointment, null, 2));
    console.log("Follow-Up Date:", followUpDate);
    console.log("Start Time:", followUpStartTime);
    console.log("End Time:", followUpEndTime);
    console.log("Follow-Up Type:", followUpType);
    console.log("Pricing Eligibility Status:", JSON.stringify(pricing, null, 2));
    console.log("====================================================");

    setFollowUpLoading(true);

    const requestBody = {
      date: followUpDate,
      start: followUpStartTime,
      end: followUpEndTime,
      type: followUpType,
      appointment_id: String(parentAppointment.id),
    };

    console.log("SENDING REQUEST BODY (schedule-checkup-appointment) [MODAL]:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(
        "https://api.docapp.co.in/api/appointment/schedule-checkup-appointment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      const responseClone = response.clone();
      try {
        const responseText = await responseClone.text();
        console.log("RECEIVED RESPONSE BODY (schedule-checkup-appointment) [MODAL]:", responseText);
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
        Alert.alert(
          "Success",
          pricing.free
            ? "Follow-up appointment scheduled successfully! (FREE - within 5-15 days)"
            : "Follow-up appointment scheduled successfully!"
        );
        resetForm();
        onClose();
        onSuccess();
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
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={tw`flex-1 justify-center bg-black/50 p-4`}>
        <View style={tw`bg-white p-5 rounded-2xl max-h-[85%]`}>
          <Text style={tw`text-xl font-bold mb-2 text-center`}>Book Follow-up Appointment</Text>

          {/* Info about pricing */}
          <View style={tw`bg-blue-50 p-3 rounded-lg mb-4`}>
            <Text style={tw`text-sm text-blue-800 text-center`}>
              📌 Follow-up is FREE if booked between 5-15 days after appointment completion.
            </Text>
            <Text style={tw`text-xs text-blue-600 text-center mt-1`}>
              Before 5 days: Not eligible | After 15 days: Paid
            </Text>
          </View>

          {/* Show parent appointment info */}
          {parentAppointment && (
            <View style={tw`bg-gray-100 p-3 rounded-lg mb-4`}>
              <Text style={tw`text-sm text-gray-700`}>
                Parent Appointment: #{parentAppointment.id}
              </Text>
              <Text style={tw`text-sm text-gray-700`}>
                Completed on: {new Date(parentAppointment.appointment_date).toDateString()}
              </Text>
            </View>
          )}

          <ScrollView style={tw`mb-3`}>
            {/* Date Input */}
            <Text style={tw`text-sm font-semibold mb-1`}>Date (YYYY-MM-DD)</Text>
            <TextInput
              placeholder="e.g., 2025-12-15"
              value={followUpDate}
              onChangeText={setFollowUpDate}
              style={tw`border border-gray-300 p-3 rounded-lg mb-3`}
            />

            {/* Pricing indicator based on selected date */}
            {followUpDate && parentAppointment && (
              <View
                style={tw`p-2 rounded-lg mb-3 ${getFollowUpPricing(parentAppointment.appointment_date, followUpDate).free
                  ? "bg-green-100"
                  : getFollowUpPricing(parentAppointment.appointment_date, followUpDate).eligible
                    ? "bg-yellow-100"
                    : "bg-red-100"
                  }`}
              >
                <Text
                  style={tw`text-sm text-center ${getFollowUpPricing(parentAppointment.appointment_date, followUpDate).free
                    ? "text-green-800"
                    : getFollowUpPricing(parentAppointment.appointment_date, followUpDate).eligible
                      ? "text-yellow-800"
                      : "text-red-800"
                    }`}
                >
                  {getFollowUpPricing(parentAppointment.appointment_date, followUpDate).message}
                </Text>
              </View>
            )}

            {/* Start Time Input */}
            <Text style={tw`text-sm font-semibold mb-1`}>Start Time (HH:MM)</Text>
            <TextInput
              placeholder="e.g., 10:00"
              value={followUpStartTime}
              onChangeText={setFollowUpStartTime}
              style={tw`border border-gray-300 p-3 rounded-lg mb-3`}
            />

            {/* End Time Input */}
            <Text style={tw`text-sm font-semibold mb-1`}>End Time (HH:MM)</Text>
            <TextInput
              placeholder="e.g., 10:30"
              value={followUpEndTime}
              onChangeText={setFollowUpEndTime}
              style={tw`border border-gray-300 p-3 rounded-lg mb-3`}
            />

            {/* Appointment Type Selector */}
            <Text style={tw`text-sm font-semibold mb-2`}>Appointment Type</Text>
            <View style={tw`flex-row justify-around mb-4`}>
              <TouchableOpacity
                onPress={() => setFollowUpType("online_video")}
                style={tw`px-4 py-2 rounded-full ${followUpType === "online_video" ? "bg-green-600" : "bg-gray-200"
                  }`}
              >
                <Text
                  style={tw`${followUpType === "online_video" ? "text-white" : "text-gray-700"
                    } font-semibold`}
                >
                  Online Video
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFollowUpType("in_person")}
                style={tw`px-4 py-2 rounded-full ${followUpType === "in_person" ? "bg-green-600" : "bg-gray-200"
                  }`}
              >
                <Text
                  style={tw`${followUpType === "in_person" ? "text-white" : "text-gray-700"
                    } font-semibold`}
                >
                  In Person
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleScheduleFollowUp}
            style={tw`bg-orange-500 py-3 rounded-full mb-2 items-center justify-center`}
            disabled={followUpLoading}
          >
            {followUpLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={tw`text-white text-center font-semibold`}>Schedule Follow-up</Text>
            )}
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity onPress={handleClose} style={tw`bg-gray-400 py-2 rounded-full`}>
            <Text style={tw`text-white text-center`}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FollowUpAppointmentModal;
