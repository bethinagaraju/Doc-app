import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import tw from "twrnc";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { ChevronRight } from 'lucide-react-native';
import { useAccessToken } from "../contexts/AccessTokenContext";
import ProfileTopBar from "../../components/ProfileTopBar";
import AppointmentCard from "../../components/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";

type PrescriptionItem = {
  drug: string;
  qty: string;
  timing: string;
  notes: string;
};

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
  prescription: PrescriptionItem[] | string | null;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  checkupAppointment: any[];
};

const tabs = ["Upcoming", "Cancelled", "Completed"];

type RootStackParamList = {
  AppointmentDetails: {
    appointment: Appointment;
    selectedTab: string;
  };
  Appointments: undefined;
};

export default function AppointmentsScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { accessToken } = useAccessToken();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("Upcoming");

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.docapp.co.in/api/appointment/list-appointments",
        {
          credentials: "include",
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (err: any) {
      console.error("Fetch error:", err);
      Alert.alert("Error", "Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAppointments();
    });
    return unsubscribe;
  }, [navigation, accessToken]);

  const filteredAppointments = appointments.filter((appt) => {
    if (selectedTab === "Upcoming")
      return appt.appointment_status === "confirmed" || appt.appointment_status === "pending";
    if (selectedTab === "Cancelled") return appt.appointment_status === "cancelled";
    if (selectedTab === "Completed")
      return appt.appointment_status === "completed" || appt.appointment_status === "closed";
    return true;
  });

  if (loading) return <ActivityIndicator size="large" style={tw`mt-10`} />;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar />

      <ScrollView contentContainerStyle={tw`pb-10`} stickyHeaderIndices={[1]}>
        <View style={tw`px-4 mt-6 gap-2 mb-2`}>
          <Text style={tw`text-[#191C1E] font-bold text-[24px] leading-[32px]`}>
            My Appointments
          </Text>
          <Text style={tw`text-[#42474E] font-normal text-[14px] leading-[20px]`}>
            Manage your past and upcoming medical consultations.
          </Text>
        </View>

        {/* Tabs */}
        <View style={tw`bg-[#F8F9FF] py-3`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-2 flex-row gap-2 items-center`}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={tw`py-2 px-5 rounded-full justify-center items-center h-[36px] ${selectedTab === tab ? "bg-[#124CB8] shadow-sm" : "bg-[#E8E9EF]"
                  }`}
              >
                <Text
                  style={tw`text-[14px] font-medium leading-[20px] text-center ${selectedTab === tab ? "text-white" : "text-[#42474E]"
                    }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Appointment List */}
        <View style={tw`p-4`}>
          {filteredAppointments.length === 0 ? (
            <Text style={tw`text-center mt-10 text-gray-500`}>No {selectedTab.toLowerCase()} appointments found</Text>
          ) : (
            filteredAppointments.map((item) => (
              <AppointmentCard key={item.id} appointment={item as any}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AppointmentDetails", { appointment: item, selectedTab })}
                  style={tw`flex-row items-center gap-1`}
                >
                  <Text style={tw`text-[#124CB8] text-[16px]`}>Details</Text>
                  <ChevronRight size={16} color="#124CB8" />
                </TouchableOpacity>
              </AppointmentCard>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
