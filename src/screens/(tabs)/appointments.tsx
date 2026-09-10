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
import AppointmentCard, { AppointmentCardSkeleton } from "../../components/AppointmentCard";
import { SafeAreaView } from "react-native-safe-area-context";
import PatientAppointmentCard from "../../components/PatientAppointmentCard";
import { useUser } from "../contexts/UserContext";
import DoctorBottomBar from "../../Doctor/components/DoctorBottomBar";
import AppointmentsHeader from "../user_components/AppointmentsHeader";

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
  isFollowUp?: boolean;
  parentAppointmentId?: number;
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
  const { user } = useUser();
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
      const rawAppointments = data.appointments || [];
      const formatted: Appointment[] = [];
      rawAppointments.forEach((appt: any) => {
        formatted.push(appt);
        if (appt.checkupAppointment && Array.isArray(appt.checkupAppointment)) {
          appt.checkupAppointment.forEach((checkup: any) => {
            formatted.push({
              id: checkup.id,
              isFollowUp: true,
              parentAppointmentId: appt.id,
              user_id: checkup.user_id,
              doctor_id: checkup.doctor_id,
              appointment_date: checkup.checkup_date,
              appointment_start_time: checkup.checkup_start_time,
              appointment_end_time: checkup.checkup_end_time,
              appointment_status: checkup.checkup_status,
              appointment_type: "Follow-up",
              payment_mode: appt.payment_mode,
              prescription: appt.prescription,
              doctor: appt.doctor,
              patient: appt.patient,
              patientName: appt.patientName,
              checkupAppointment: [],
              created_at: checkup.created_at,
              createdAt: checkup.createdAt,
              updatedAt: checkup.updatedAt,
            } as any);
          });
        }
      });
      setAppointments(formatted);
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

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar />

      <ScrollView contentContainerStyle={tw`pb-28`} stickyHeaderIndices={[1]} showsVerticalScrollIndicator={false}>
        <AppointmentsHeader />

        {/* Tabs */}
        <View style={tw`bg-[#F8F9FF] py-3 w-full max-w-[800px] self-center`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            contentContainerStyle={tw`min-w-full px-4 md:px-8 flex-row gap-3 items-center md:justify-center`}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                onPress={() => setSelectedTab(tab)}
                style={tw`py-2 px-5 md:px-8 rounded-full justify-center items-center h-[36px] md:h-[44px] ${selectedTab === tab ? "bg-[#124CB8] shadow-sm" : "bg-[#E8E9EF]"
                  }`}
              >
                <Text
                  style={tw`text-[14px] md:text-[16px] font-medium leading-tight text-center ${selectedTab === tab ? "text-white" : "text-[#42474E]"
                    }`}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Appointment List */}
        <View style={tw`p-4`}>
          {loading ? (
            <>
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
              <AppointmentCardSkeleton />
            </>
          ) : filteredAppointments.length === 0 ? (
            <Text style={tw`text-center mt-10 text-gray-500`}>No {selectedTab.toLowerCase()} appointments found</Text>
          ) : (
            filteredAppointments.map((item) => {
              const itemKey = `${item.id}_${item.isFollowUp ? 'followup' : 'parent'}`;
              if (user?.role === "general_user") {
                return (
                  <PatientAppointmentCard
                    key={itemKey}
                    appointment={item}
                    onPress={() => navigation.navigate("AppointmentDetails", { appointment: item, selectedTab })}
                  />
                );
              }
              return (
                <AppointmentCard key={itemKey} appointment={item as any}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("AppointmentDetails", { appointment: item, selectedTab })}
                    style={tw`flex-row items-center gap-1`}
                  >
                    <Text style={tw`text-[#124CB8] text-[16px]`}>Details</Text>
                    <ChevronRight size={16} color="#124CB8" />
                  </TouchableOpacity>
                </AppointmentCard>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
