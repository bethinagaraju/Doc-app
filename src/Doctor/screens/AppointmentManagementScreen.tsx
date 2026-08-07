

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
  KeyboardAvoidingView,
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
import DoctorExperienceCard from '../components/DoctorExperienceCard';

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
  const [experience, setExperience] = useState("5");

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
        setExperience(String(doctor.experience_years ?? ''));
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
    if (!experience || isNaN(Number(experience))) {
      Alert.alert('Missing/Invalid', 'Please enter valid experience (years).');
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
      experience_years: Number(experience),
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
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#F8F9FF" />
        <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>


      <ProfileTopBar />


      <StatusBar backgroundColor="#F8F9FF" barStyle="light-content" />
      {/* <DoctorHeader title="APPOINTMENT MANAGEMENT" /> */}



      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView style={tw`p-4`}>

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

            <DoctorExperienceCard
              experience={experience}
              onChangeExperience={setExperience}
              onUpdate={handleSubmitAll}
            />
          </View>

          <>
            <Text style={tw`text-lg text-green-800 font-bold mb-4 mt-4`}>Set Your Weekly Schedule</Text>

            {schedule.map((item, index) => (
              <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
                <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>{item.day}</Text>

                <TouchableOpacity
                  style={tw`border border-green-300 p-2 rounded mb-2`}
                  onPress={() => openTimePicker(index, 'loginTime')}
                >
                  <Text>{item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw`border border-green-300 p-2 rounded mb-2`}
                  onPress={() => openTimePicker(index, 'logoutTime')}
                >
                  <Text>{item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}</Text>
                </TouchableOpacity>

                <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
                {item.breaks.map((brk, brkIndex) => (
                  <View key={brkIndex} style={tw`mb-2`}>
                    <View style={tw`flex-row justify-between items-center mb-1`}>

                      <TouchableOpacity
                        style={tw`border border-green-300 p-2 rounded flex-1 mr-1`}
                        onPress={() => openTimePicker(index, 'breaks', brkIndex, 'start')}
                      >
                        <Text>{brk.start ? `Start: ${brk.start}` : 'Set Start'}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={tw`border border-green-300 p-2 rounded flex-1 ml-1`}
                        onPress={() => openTimePicker(index, 'breaks', brkIndex, 'end')}
                      >
                        <Text>{brk.end ? `End: ${brk.end}` : 'Set End'}</Text>
                      </TouchableOpacity>

                      {item.breaks.length > 1 && (
                        <TouchableOpacity
                          onPress={() => removeBreak(index, brkIndex)}
                          style={tw`bg-red-500 px-3 py-1 rounded ml-2`}
                        >
                          <Text style={tw`text-white`}>−</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}

                <TouchableOpacity
                  onPress={() => addBreak(index)}
                  style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
                >
                  <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
                </TouchableOpacity>

                <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
                  <Picker
                    selectedValue={item.mode}
                    onValueChange={(val) => handleChange(index, 'mode', val)}
                  >
                    <Picker.Item label="Select Mode" value="" />
                    <Picker.Item label="Online" value="online" />
                    <Picker.Item label="Offline" value="offline" />
                    <Picker.Item label="Hybrid" value="hybrid" />
                  </Picker>
                </View>
              </View>
            ))}

            <TouchableOpacity onPress={handleSubmitAll} style={tw`bg-green-600 py-3 rounded-lg mt-4 mb-8`}>
              <Text style={tw`text-white text-center font-semibold text-lg`}>Save Full Weekly Schedule</Text>
            </TouchableOpacity>
          </>
        </ScrollView>
      </KeyboardAvoidingView>

      {timePicker.visible && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onTimeChange}
        />
      )}
    </SafeAreaView>
  );
};

export default AppointmentManagementScreen;
