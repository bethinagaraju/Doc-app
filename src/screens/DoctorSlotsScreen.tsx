import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import Svg, { Path } from 'react-native-svg';

import { useAccessToken } from './contexts/AccessTokenContext';
import DateSelector from './user_components/DateSelector';
import ProfileTopBar from '../components/ProfileTopBar';

const DoctorSlotsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { doctor, doctorId, consultationMode } = route.params as any;

  const [slotsByDate, setSlotsByDate] = useState<{ [date: string]: { mode: string; slots: string[] } }>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [isCreatingAppointment, setIsCreatingAppointment] = useState(false);

  const { accessToken } = useAccessToken();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        console.log("Fetching slots for doctor user_id:", doctorId);
        const response = await fetch(`https://api.docapp.co.in/api/auth/show-slots/${doctorId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log("Slots API response:", data);

        let parsedSlots: any[] = [];

        if (data.slots && Array.isArray(data.slots)) {
          data.slots.forEach((slotObj: any) => {
            try {
              const innerSlots = JSON.parse(slotObj.slots);
              if (Array.isArray(innerSlots)) {
                parsedSlots = parsedSlots.concat(innerSlots);
              }
            } catch (err) {
              console.error('Slot parsing error:', err);
            }
          });
        }

        const filteredSlots = parsedSlots.filter((slot) => {
          const mode = slot.mode?.toLowerCase();
          if (consultationMode === 'online') {
            return mode === 'online' || mode === 'hybrid';
          } else if (consultationMode === 'offline') {
            return mode === 'offline' || mode === 'hybrid';
          }
          return false;
        });

        const grouped: { [key: string]: { mode: string; slots: string[] } } = {};
        filteredSlots.forEach((slot) => {
          const date = slot.date;
          const mode = slot.mode || 'unknown';
          if (!grouped[date]) grouped[date] = { mode, slots: [] };

          if (Array.isArray(slot.slots)) {
            slot.slots.forEach((timeSlot: any) => {
              grouped[date].slots.push(`${timeSlot.start}-${timeSlot.end}`);
            });
          }
        });

        const sortedDates = Object.keys(grouped).sort();
        setSlotsByDate(grouped);
        setSelectedDate(sortedDates[0] || '');
      } catch (error) {
        console.error('Slot fetch error:', error);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [doctorId, consultationMode, accessToken]);

  const handleBookAppointment = async () => {
    if (isCreatingAppointment) return;
    try {
      console.log('--- CREATING APPOINTMENT INIT (DoctorSlotsScreen) ---');
      console.log('Params:', { doctorId, selectedSlot, selectedDate, consultationMode });
      console.log('Access Token present:', !!accessToken);

      setIsCreatingAppointment(true);
      const payload = {
        doctor_id: String(doctorId),
        date: selectedDate,
        start: selectedSlot.split('-')[0]?.trim() || '09:00',
        end: selectedSlot.split('-')[1]?.trim() || '09:30',
        type: ['video', 'online', 'online_video'].includes(consultationMode) ? 'online_video' : 'offline',
        payment_mode: 'card',
      };

      console.log('📤 Sending Appointment Payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(
        'https://api.docapp.co.in/api/appointment/create-appointment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          body: JSON.stringify(payload),
        }

      );


      console.log('📥 Response Status:', response.status);

      const data = await response.json();
      console.log('📥 Appointment Response Data:', JSON.stringify(data, null, 2));

      if (response.ok && data?.success === true) {
        console.log('✅ Appointment Created successfully. Navigating to Payment.');
        navigation.navigate('RazorpayPaymentScreen', {
          appointmentId: data?.createdAppointment?.id,
          doctor,
          slot: selectedSlot,
          date: selectedDate,
          consultationType: consultationMode,
          amount: doctor?.consultation_fee,
          doctorId,
          orderId: data?.orderId,
          razorpayAmount: data?.amount,
          razorpayKey: data?.key,
        });
        console.log('✅ Appointment Created successfully. Navigating to Payment.');

      } else {
        console.warn('❌ Failed response data:', data);
        Alert.alert('❌ Failed', data?.message || 'Could not schedule appointment.');
      }
    } catch (error: any) {
      console.error('🚨 API Error (Create Appointment):', error);
      console.error('🚨 Error Message:', error?.message);
      if (error?.response) {
        console.error('🚨 Error Response:', error.response);
      }
      Alert.alert('Error', 'Failed to create appointment. Please try again.');
    } finally {
      console.log('--- CREATING APPOINTMENT FINISHED ---');
      setIsCreatingAppointment(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ProfileTopBar />


      <ScrollView contentContainerStyle={tw`pb-32`} showsVerticalScrollIndicator={false}>
        <View style={tw`p-4 mb-6`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
            Available Slots ({consultationMode?.toUpperCase()})
          </Text>

          {loadingSlots ? (
            <ActivityIndicator size="large" color="#16a34a" />
          ) : Object.keys(slotsByDate).length > 0 ? (
            <>
              {/* Date Selector */}
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
                {Object.keys(slotsByDate).map((date) => (
                  <TouchableOpacity
                    key={date}
                    style={tw`px-5 py-3 mr-3 rounded-xl ${selectedDate === date ? 'bg-green-600' : 'bg-green-100'}`}
                    onPress={() => setSelectedDate(date)}
                  >
                    <Text style={tw`text-base font-semibold ${selectedDate === date ? 'text-white' : 'text-green-800'}`}>
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView> */}


              <View style={tw`mb-6`}>
                <DateSelector
                  slotsByDate={slotsByDate}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </View>

              {/* Time Slots */}
              <FlatList
                data={slotsByDate[selectedDate]?.slots || []}
                keyExtractor={(item, index) => `${item}_${index}`}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={tw`justify-between mb-2`}
                renderItem={({ item }) => {
                  const isSelected = selectedSlot === item;
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedSlot(item)}
                      style={tw`flex flex-col justify-center items-center flex-1 mx-1 h-[46px] border rounded-2xl bg-white ${isSelected ? 'border-[#124CB8]' : 'border-[#E6E9EC]'}`}
                    >
                      <Text style={tw`text-[14px] leading-[20px] text-center ${isSelected ? 'text-[#124CB8] font-semibold' : 'text-[#41484D] font-normal'}`}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />

              {selectedSlot && (
                <TouchableOpacity
                  style={tw`bg-[#124CB8] py-4 px-8 rounded-2xl flex-row justify-center items-center shadow-lg mt-6 ${isCreatingAppointment ? 'opacity-70' : ''}`}
                  onPress={handleBookAppointment}
                  disabled={isCreatingAppointment}
                >
                  {isCreatingAppointment ? (
                    <ActivityIndicator color="#fff" style={tw`mr-2`} />
                  ) : (
                    <Text style={tw`text-white text-[16px] font-semibold mr-2`}>
                      Proceed to Booking
                    </Text>
                  )}
                  {!isCreatingAppointment && (
                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <Path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z" fill="white" />
                    </Svg>
                  )}
                </TouchableOpacity>
              )}
            </>
          ) : (
            <Text style={tw`text-green-400 text-base`}>
              No {consultationMode} or hybrid slots available.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorSlotsScreen;
