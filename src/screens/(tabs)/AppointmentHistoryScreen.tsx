import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import PageLayout from '../../components/PageLayout';
import AppointmentCard from '../../components/AppointmentCard';

type Appointment = {
  id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_status: string;
  appointment_type: string;
  user_id?: number;
  payment_mode?: string;
  prescription?: any;
  doctor?: any;
  patient?: any;
  patientName?: string;
  checkupAppointment?: any[];
  isFollowUp?: boolean;
  parentAppointmentId?: number;
};

const tabs = ['Upcoming', 'Cancelled', 'Completed'];

export default function AppointmentHistoryScreen() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('Upcoming');

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        'https://api.docapp.co.in/api/appointment/list-appointments',
        {
          credentials: 'include',
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
            } as any);
          });
        }
      });
      setAppointments(formatted);
    } catch (err) {
      console.error('Fetch error:', err);
      Alert.alert('Error', 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        'https://api.docapp.co.in/api/appointment/delete-appointment',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ appointment_id: id }),
        }
      );

      const data = await response.json();
      if (data.message?.toLowerCase().includes('deleted')) {
        Alert.alert('Success', 'Appointment deleted successfully');
        fetchAppointments();
      } else {
        throw new Error(data.message || 'Delete failed');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    if (selectedTab === 'Upcoming') return appt.appointment_status === 'pending';
    if (selectedTab === 'Cancelled') return appt.appointment_status === 'cancelled';
    if (selectedTab === 'Completed') return appt.appointment_status === 'completed';
    return true;
  });

  if (loading) return <ActivityIndicator size="large" style={tw`mt-10`} />;

  return (
    <PageLayout
      title="My Appointments"
      headerBackgroundColor="#16a34a"
      scrollable={true}
    >
      {/* Tabs */}
      <View style={tw`flex-row bg-white px-4 py-3 border-b justify-between`}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab)}
            style={tw`px-4 py-2 rounded-full ${selectedTab === tab ? 'bg-green-600' : 'bg-gray-200'
              }`}
          >
            <Text
              style={tw`text-sm font-semibold ${selectedTab === tab ? 'text-white' : 'text-gray-700'
                }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Appointment List */}
      <ScrollView style={tw`p-4`}>
        {filteredAppointments.length === 0 ? (
          <Text style={tw`text-center mt-10 text-gray-500`}>
            No {selectedTab.toLowerCase()} appointments found
          </Text>
        ) : (
          filteredAppointments.map((item) => (
            <AppointmentCard key={`${item.id}_${item.isFollowUp ? 'followup' : 'parent'}`} appointment={item as any}>

              <TouchableOpacity
                onPress={() => handleDelete(item.id)}
                style={tw`mt-1 bg-red-500 py-2 px-4 rounded-full`}
              >

                <Text style={tw`text-white text-center font-semibold`}>
                  Delete Appointment
                </Text>

              </TouchableOpacity>
              
            </AppointmentCard>
          ))
        )}
      </ScrollView>
    </PageLayout>
  );
}
