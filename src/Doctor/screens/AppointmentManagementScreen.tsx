

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import DoctorHeader from '../components/DoctorHeader';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import ProfileTopBar from '../../components/ProfileTopBar';
import SlotDurationCard from '../components/SlotDurationCard';
import ConsultationFeesCard from '../components/ConsultationFeesCard';
import WeeklyScheduleSection from '../components/WeeklyScheduleSection';
import DoctorBottomBar from '../components/DoctorBottomBar';

const AppointmentManagementSkeleton = () => {
  const pulseAnim = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>
      <ProfileTopBar />
      <ScrollView style={tw`p-4`} contentContainerStyle={tw`pb-28`} showsVerticalScrollIndicator={false}>
        <Animated.View style={[tw`gap-4`, { opacity: pulseAnim }]}>
          {/* Slot Duration Card Skeleton */}
          <View style={tw`bg-white rounded-2xl p-5 border border-[#C3C6D5]/30 gap-4 shadow-sm`}>
            <View style={tw`w-44 h-5 bg-gray-200 rounded`} />
            <View style={tw`w-64 h-3.5 bg-gray-200 rounded`} />
            <View style={tw`flex-row gap-2 mt-1`}>
              {[15, 30, 45, 60].map((val) => (
                <View key={val} style={tw`flex-1 h-11 bg-gray-200 rounded-xl`} />
              ))}
            </View>
          </View>

          {/* Consultation Fee Card Skeleton */}
          <View style={tw`bg-white rounded-2xl p-5 border border-[#C3C6D5]/30 gap-4 shadow-sm`}>
            <View style={tw`w-40 h-5 bg-gray-200 rounded`} />
            <View style={tw`w-56 h-3.5 bg-gray-200 rounded`} />
            <View style={tw`flex-row gap-3 items-center mt-1`}>
              <View style={tw`flex-1 h-12 bg-gray-200 rounded-xl`} />
              <View style={tw`w-28 h-12 bg-gray-200 rounded-xl`} />
            </View>
          </View>

          {/* Weekly Schedule Section Skeleton */}
          <View style={tw`bg-white rounded-2xl p-5 border border-[#C3C6D5]/30 gap-4 shadow-sm mb-10`}>
            <View style={tw`w-48 h-5 bg-gray-200 rounded`} />
            <View style={tw`w-60 h-3.5 bg-gray-200 rounded`} />

            {['Monday', 'Tuesday', 'Wednesday'].map((day) => (
              <View key={day} style={tw`p-4 rounded-xl bg-gray-50 border border-gray-100 gap-3 mt-2`}>
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`w-24 h-5 bg-gray-200 rounded`} />
                  <View style={tw`w-16 h-6 bg-gray-200 rounded-full`} />
                </View>
                <View style={tw`flex-row gap-3`}>
                  <View style={tw`flex-1 h-10 bg-gray-200 rounded-lg`} />
                  <View style={tw`flex-1 h-10 bg-gray-200 rounded-lg`} />
                </View>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface ScheduleItem {
  day: string;
  loginTime: string;
  logoutTime: string;
  breaks: { start: string; end: string }[];
  mode: string;
}

interface ParsedScheduleItem {
  day: string;
  loginTime?: string;
  logoutTime?: string;
  breaks?: any;
  mode?: string;
}

const AppointmentManagementScreen = () => {
  const navigation = useNavigation();
  const { accessToken } = useAccessToken();
  const [activeView, setActiveView] = useState('cards'); // 'cards' or 'schedule'
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [timePicker, setTimePicker] = useState<{
    visible: boolean;
    dayIndex: number | null;
    field: string;
    breakIndex: number | null;
    breakField: string | null;
  }>({
    visible: false,
    dayIndex: null,
    field: '',
    breakIndex: null,
    breakField: null,
  });
  const [slotDuration, setSlotDuration] = useState<15 | 30 | 45 | 60>(30);
  const [fee, setFee] = useState("120");

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok && data?.userData?.doctorProfile) {
        const doctor = data.userData.doctorProfile;

        setFee(String(doctor.consultation_fee ?? ''));
        const slot = Number(doctor.appointment_time) || 30;
        setSlotDuration(slot as 15 | 30 | 45 | 60);

        const parsedSchedule: ParsedScheduleItem[] = doctor.availability_schedule
          ? JSON.parse(doctor.availability_schedule)
          : [];

        const defaultDays = [
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
          'sunday',
        ];

        const fullSchedule = defaultDays.map((day) => {
          const existing = parsedSchedule.find((d: ParsedScheduleItem) => d.day === day);
          if (existing) {
            let parsedBreaks: { start: string; end: string }[] = [];
            const breaksData = existing.breaks;
            if (Array.isArray(breaksData)) {
              parsedBreaks = breaksData.map((br: any) => {
                if (typeof br === 'string') {
                  const [start, end] = br.split('-');
                  return { start: start || '', end: end || '' };
                } else if (br && typeof br === 'object' && 'start' in br && 'end' in br) {
                  return { start: br.start || '', end: br.end || '' };
                } else {
                  return { start: '', end: '' };
                }
              });
            } else if (typeof breaksData === 'string') {
              const [start, end] = breaksData.split('-');
              parsedBreaks = [{ start: start || '', end: end || '' }];
            } else {
              parsedBreaks = [{ start: '', end: '' }];
            }
            // ensure login/logout/mode keys exist
            return {
              day: existing.day,
              loginTime: existing.loginTime ?? '',
              logoutTime: existing.logoutTime ?? '',
              breaks: parsedBreaks.length ? parsedBreaks : [{ start: '', end: '' }],
              mode: existing.mode ?? '',
            };
          }
          return { day, loginTime: '', logoutTime: '', breaks: [{ start: '', end: '' }], mode: '' };
        });

        setSchedule(fullSchedule);
      } else {
        Alert.alert('Error', 'Unable to fetch doctor details.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const formatTime = (date: Date): string => date.toTimeString().slice(0, 5);

  const handleChange = (index: number, field: keyof ScheduleItem, value: string): void => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addBreak = (dayIndex: number): void => {
    const updated = [...schedule];
    updated[dayIndex].breaks.push({ start: '', end: '' });
    setSchedule(updated);
  };

  const removeBreak = (dayIndex: number, breakIndex: number): void => {
    const updated = [...schedule];
    updated[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(updated);
  };

  const openTimePicker = (dayIndex: number, field: string, breakIndex: number | null = null, breakField: string | null = null): void => {
    setTimePicker({ visible: true, dayIndex, field, breakIndex, breakField });
  };

  const onTimeChange = (event: any, selectedDate?: Date): void => {
    if (event.type === 'dismissed') {
      setTimePicker({
        visible: false,
        dayIndex: null,
        field: '',
        breakIndex: null,
        breakField: null,
      });
      return;
    }

    const { dayIndex, field, breakIndex, breakField } = timePicker;
    if (dayIndex === null || !selectedDate) return;
    const time = formatTime(selectedDate);
    const updated = [...schedule];

    if (breakIndex !== null && breakField) {
      updated[dayIndex].breaks[breakIndex][breakField as 'start' | 'end'] = time;
    } else {
      updated[dayIndex][field as keyof ScheduleItem] = time;
    }

    setSchedule(updated);
    setTimePicker({
      visible: false,
      dayIndex: null,
      field: '',
      breakIndex: null,
      breakField: null,
    });
  };

  const validateSchedule = (schedules: ScheduleItem[]): boolean => {
    // Ensure numeric fields are present
    if (!fee || isNaN(Number(fee))) {
      Alert.alert('Missing/Invalid', 'Please enter a valid consultation fee.');
      return false;
    }
    if (!slotDuration || isNaN(Number(slotDuration))) {
      Alert.alert('Missing/Invalid', 'Please enter a valid appointment slot (minutes).');
      return false;
    }

    // Validate each day: if any time is set, ensure both login & logout are set; breaks should be full if present
    for (const day of schedules) {
      const anyTimeSet = day.loginTime || day.logoutTime || day.breaks.some((b) => b.start !== '' || b.end !== '') || day.mode;
      if (anyTimeSet) {
        if (!day.loginTime || !day.logoutTime) {
          Alert.alert('Incomplete', `Please set login and logout times for ${day.day}.`);
          return false;
        }
        // breaks: if any break object exists, both start & end must be present
        for (const b of day.breaks) {
          if ((b.start && !b.end) || (!b.start && b.end)) {
            Alert.alert('Incomplete', `Please set both start and end for all breaks in ${day.day}.`);
            return false;
          }
        }
        if (!day.mode) {
          Alert.alert('Missing', `Please select mode (online/offline/hybrid) for ${day.day}.`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmitAll = async (overrides?: { slotDuration?: number }) => {
    if (!validateSchedule(schedule)) return;

    const formattedSchedule = schedule.map((day) => ({
      day: day.day,
      loginTime: day.loginTime || '',
      logoutTime: day.logoutTime || '',
      breaks: (day.breaks || [])
        .filter((b) => b.start && b.end)
        .map((b) => `${b.start}-${b.end}`),
      mode: day.mode || '',
    }));

    const payload = {
      availability_schedule: formattedSchedule,
      consultation_fee: Number(fee),
      appointment_slot: Number(overrides?.slotDuration || slotDuration),
    };

    // helpful: log payload to debug in dev
    console.log('Updating Slot Duration:', Number(overrides?.slotDuration || slotDuration));
    console.log('Full Payload ->', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        'https://api.docapp.co.in/api/auth/profile/complete/extra-doc-info',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const resText = await response.text();

      if (response.ok) {
        Alert.alert('Success', 'Full weekly schedule saved successfully!');
      } else {
        Alert.alert('Error', resText || 'Invalid format or missing fields.');
      }
    } catch (err) {
      Alert.alert('Error', (err as Error).message);
    }
  };

  if (loading) {
    return <AppointmentManagementSkeleton />;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>


      <ProfileTopBar />


      <StatusBar backgroundColor="#F8F9FF" barStyle="light-content" />
      {/* <DoctorHeader title="APPOINTMENT MANAGEMENT" /> */}



      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView style={tw`p-4`} contentContainerStyle={tw`pb-28`} showsVerticalScrollIndicator={false}>

          <View style={tw`gap-4`}>
            <SlotDurationCard
              selected={slotDuration}
              onChange={(duration) => {
                setSlotDuration(duration);
                handleSubmitAll({ slotDuration: duration });
              }}
            />

            <ConsultationFeesCard
              fee={fee}
              onChangeFee={setFee}
              onUpdate={handleSubmitAll}
            />
          </View>

          <WeeklyScheduleSection
            schedule={schedule}
            removeBreak={removeBreak}
            addBreak={addBreak}
            handleChange={handleChange}
            onSubmit={handleSubmitAll}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AppointmentManagementScreen;
