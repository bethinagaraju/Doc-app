// // // // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // // // import {
// // // // // // // // //   View,
// // // // // // // // //   Text,
// // // // // // // // //   SafeAreaView,
// // // // // // // // //   StatusBar,
// // // // // // // // //   TextInput,
// // // // // // // // //   TouchableOpacity,
// // // // // // // // //   ScrollView,
// // // // // // // // //   Alert,
// // // // // // // // //   ActivityIndicator,
// // // // // // // // // } from 'react-native';
// // // // // // // // // import tw from 'twrnc';
// // // // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // // // import { Picker } from '@react-native-picker/picker';
// // // // // // // // // import { useUser } from '../../screens/contexts/UserContext';

// // // // // // // // // interface TimeSlot {
// // // // // // // // //   start: string;
// // // // // // // // //   end: string;
// // // // // // // // // }

// // // // // // // // // interface Slot {
// // // // // // // // //   date: string;
// // // // // // // // //   slots: TimeSlot[];
// // // // // // // // // }

// // // // // // // // // interface ScheduleItem {
// // // // // // // // //   day: string;
// // // // // // // // //   loginTime: string;
// // // // // // // // //   logoutTime: string;
// // // // // // // // //   breaks: string[];
// // // // // // // // //   mode: string;
// // // // // // // // // }

// // // // // // // // // const AppointmentManagementScreen = () => {
// // // // // // // // //   const { user } = useUser();
// // // // // // // // //   const [slots, setSlots] = useState<Slot[]>([]);
// // // // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // // // //   const [schedule, setSchedule] = useState<ScheduleItem[]>([
// // // // // // // // //     { day: 'monday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'tuesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'wednesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'thursday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'friday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'saturday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //     { day: 'sunday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // // // //   ]);

// // // // // // // // //   const [consultationFee, setConsultationFee] = useState('');
// // // // // // // // //   const [experienceYears, setExperienceYears] = useState('');
// // // // // // // // //   const [appointmentSlot, setAppointmentSlot] = useState('');

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (user?.id) {
// // // // // // // // //       fetchSlots();
// // // // // // // // //     }
// // // // // // // // //   }, [user]);

// // // // // // // // //   const fetchSlots = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch(
// // // // // // // // //         `https://landing.docapp.co.in/api/auth/show-slots/${user?.id}`,
// // // // // // // // //         {
// // // // // // // // //           method: 'GET',
// // // // // // // // //           credentials: 'include',
// // // // // // // // //         }
// // // // // // // // //       );

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(`Failed to fetch slots: ${response.status}`);
// // // // // // // // //       }

// // // // // // // // //       const data = await response.json();

// // // // // // // // //       if (data.message === 'Succesfully fetched all the slots for the doctor' && data.slots && Array.isArray(data.slots)) {
// // // // // // // // //         const parsedSlots: Slot[] = [];

// // // // // // // // //         data.slots.forEach((slotObj: any) => {
// // // // // // // // //           try {
// // // // // // // // //             const innerSlots = JSON.parse(slotObj.slots);
// // // // // // // // //             if (Array.isArray(innerSlots)) {
// // // // // // // // //               parsedSlots.push(...innerSlots);
// // // // // // // // //             }
// // // // // // // // //           } catch (error) {
// // // // // // // // //             console.error('Error parsing slots:', error);
// // // // // // // // //           }
// // // // // // // // //         });

// // // // // // // // //         setSlots(parsedSlots);
// // // // // // // // //       } else {
// // // // // // // // //         setSlots([]);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching slots:', error);
// // // // // // // // //       Alert.alert('Error', 'Failed to fetch slots');
// // // // // // // // //       setSlots([]);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleChange = (index: number, field: Exclude<keyof ScheduleItem, 'breaks'>, value: string) => {

// // // // // // // // //   const handleBreakChange = (dayIndex: number, breakIndex: number, value: string) => {
// // // // // // // // //     const updated = [...schedule];
// // // // // // // // //     updated[dayIndex].breaks[breakIndex] = value;
// // // // // // // // //     setSchedule(updated);
// // // // // // // // //   };

// // // // // // // // //   const addBreak = (dayIndex: number) => {
// // // // // // // // //     const updated = [...schedule];
// // // // // // // // //     updated[dayIndex].breaks.push('');
// // // // // // // // //     setSchedule(updated);
// // // // // // // // //   };

// // // // // // // // //   const removeBreak = (dayIndex: number, breakIndex: number) => {
// // // // // // // // //     const updated = [...schedule];
// // // // // // // // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // // // // // // // //     setSchedule(updated);
// // // // // // // // //   };

// // // // // // // // //   const handleSubmit = async () => {
// // // // // // // // //     const payload = {
// // // // // // // // //       availability_schedule: schedule,
// // // // // // // // //       consultation_fee: Number(consultationFee),
// // // // // // // // //       experience_years: Number(experienceYears),
// // // // // // // // //       appointment_slot: Number(appointmentSlot),
// // // // // // // // //     };

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch(
// // // // // // // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // // // // // // //         {
// // // // // // // // //           method: 'PUT',
// // // // // // // // //           headers: {
// // // // // // // // //             'Content-Type': 'application/json',
// // // // // // // // //           },
// // // // // // // // //           body: JSON.stringify(payload),
// // // // // // // // //         }
// // // // // // // // //       );

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         Alert.alert('Success', 'Schedule updated successfully!');
// // // // // // // // //         // Refresh slots after updating schedule
// // // // // // // // //         fetchSlots();
// // // // // // // // //       } else {
// // // // // // // // //         const errorText = await response.text();
// // // // // // // // //         Alert.alert('Error', errorText || 'Something went wrong!');
// // // // // // // // //       }
// // // // // // // // //     } catch (err) {
// // // // // // // // //       Alert.alert('Error', err.message);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   if (loading) {
// // // // // // // // //     return (
// // // // // // // // //       <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // // // // // //         <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // // // // // //         <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />
// // // // // // // // //         <View style={tw`flex-1 justify-center items-center`}>
// // // // // // // // //           <ActivityIndicator size="large" color="#16a34a" />
// // // // // // // // //           <Text style={tw`text-green-700 mt-4`}>Loading slots...</Text>
// // // // // // // // //         </View>
// // // // // // // // //       </SafeAreaView>
// // // // // // // // //     );
// // // // // // // // //   }

// // // // // // // // //   return (
// // // // // // // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // // // // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // // // // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // // // // // // //       <ScrollView style={tw`flex-1 p-4`} showsVerticalScrollIndicator={false}>
// // // // // // // // //         <Text style={tw`text-lg font-bold text-green-700 mb-4`}>
// // // // // // // // //           Your Available Slots
// // // // // // // // //         </Text>

// // // // // // // // //         {slots.length === 0 ? (
// // // // // // // // //           <View style={tw`bg-white rounded-2xl p-6 shadow-sm items-center mb-6`}>
// // // // // // // // //             <Text style={tw`text-gray-500 text-center`}>
// // // // // // // // //               No slots available at the moment.
// // // // // // // // //             </Text>
// // // // // // // // //             <Text style={tw`text-gray-400 text-center text-sm mt-2`}>
// // // // // // // // //               Please set up your availability below to start accepting appointments.
// // // // // // // // //             </Text>
// // // // // // // // //           </View>
// // // // // // // // //         ) : (
// // // // // // // // //           slots.map((slot, index) => (
// // // // // // // // //             <View
// // // // // // // // //               key={`${slot.date}-${index}`}
// // // // // // // // //               style={tw`bg-white rounded-2xl p-4 mb-4 shadow-sm`}
// // // // // // // // //             >
// // // // // // // // //               <Text style={tw`text-lg font-semibold text-green-700 mb-2`}>
// // // // // // // // //                 {new Date(slot.date).toDateString()}
// // // // // // // // //               </Text>
// // // // // // // // //               <View style={tw`flex-row flex-wrap`}>
// // // // // // // // //                 {slot.slots.map((timeSlot, slotIndex) => (
// // // // // // // // //                   <View
// // // // // // // // //                     key={`${timeSlot.start}-${timeSlot.end}-${slotIndex}`}
// // // // // // // // //                     style={tw`bg-green-100 rounded-lg px-3 py-2 mr-2 mb-2`}
// // // // // // // // //                   >
// // // // // // // // //                     <Text style={tw`text-green-700 text-sm font-medium`}>
// // // // // // // // //                       {timeSlot.start} - {timeSlot.end}
// // // // // // // // //                     </Text>
// // // // // // // // //                   </View>
// // // // // // // // //                 ))}
// // // // // // // // //               </View>
// // // // // // // // //             </View>
// // // // // // // // //           ))
// // // // // // // // //         )}

// // // // // // // // //         <Text style={tw`text-lg font-bold text-green-700 mb-4 mt-6`}>
// // // // // // // // //           Set Your Weekly Schedule
// // // // // // // // //         </Text>

// // // // // // // // //         {schedule.map((item, index) => (
// // // // // // // // //           <View
// // // // // // // // //             key={item.day}
// // // // // // // // //             style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}
// // // // // // // // //           >
// // // // // // // // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // // // // // // // //               {item.day}
// // // // // // // // //             </Text>

// // // // // // // // //             <TextInput
// // // // // // // // //               placeholder="Login Time (e.g., 09:00)"
// // // // // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // // // //               value={item.loginTime}
// // // // // // // // //               onChangeText={(val) => handleChange(index, 'loginTime', val)}
// // // // // // // // //             />
// // // // // // // // //             <TextInput
// // // // // // // // //               placeholder="Logout Time (e.g., 17:00)"
// // // // // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // // // //               value={item.logoutTime}
// // // // // // // // //               onChangeText={(val) => handleChange(index, 'logoutTime', val)}
// // // // // // // // //             />

// // // // // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // // // // // // // //             {item.breaks.map((brk, brkIndex) => (
// // // // // // // // //               <View
// // // // // // // // //                 key={brkIndex}
// // // // // // // // //                 style={tw`flex-row items-center mb-2 justify-between`}
// // // // // // // // //               >
// // // // // // // // //                 <TextInput
// // // // // // // // //                   placeholder="e.g., 12:00-12:30"
// // // // // // // // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // // // // // // // //                   value={brk}
// // // // // // // // //                   onChangeText={(val) =>
// // // // // // // // //                     handleBreakChange(index, brkIndex, val)
// // // // // // // // //                   }
// // // // // // // // //                 />
// // // // // // // // //                 {item.breaks.length > 1 && (
// // // // // // // // //                   <TouchableOpacity
// // // // // // // // //                     onPress={() => removeBreak(index, brkIndex)}
// // // // // // // // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // // // // // // // //                   >
// // // // // // // // //                     <Text style={tw`text-white`}>−</Text>
// // // // // // // // //                   </TouchableOpacity>
// // // // // // // // //                 )}
// // // // // // // // //               </View>
// // // // // // // // //             ))}

// // // // // // // // //             <TouchableOpacity
// // // // // // // // //               onPress={() => addBreak(index)}
// // // // // // // // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // // // // // // // //             >
// // // // // // // // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // // // // // // // //             </TouchableOpacity>

// // // // // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Mode:</Text>
// // // // // // // // //             <View
// // // // // // // // //               style={tw`border border-green-300 rounded mb-2 bg-green-50`}
// // // // // // // // //             >
// // // // // // // // //               <Picker
// // // // // // // // //                 selectedValue={item.mode}
// // // // // // // // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // // // // // // // //               >
// // // // // // // // //                 <Picker.Item label="Select Mode" value="" />
// // // // // // // // //                 <Picker.Item label="Online" value="online" />
// // // // // // // // //                 <Picker.Item label="Offline" value="offline" />
// // // // // // // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // // // // // // //               </Picker>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         ))}

// // // // // // // // //         <TextInput
// // // // // // // // //           placeholder="Consultation Fee"
// // // // // // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // // // //           value={consultationFee}
// // // // // // // // //           onChangeText={setConsultationFee}
// // // // // // // // //           keyboardType="numeric"
// // // // // // // // //         />
// // // // // // // // //         <TextInput
// // // // // // // // //           placeholder="Experience (in years)"
// // // // // // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // // // //           value={experienceYears}
// // // // // // // // //           onChangeText={setExperienceYears}
// // // // // // // // //           keyboardType="numeric"
// // // // // // // // //         />
// // // // // // // // //         <TextInput
// // // // // // // // //           placeholder="Appointment Slot (in minutes)"
// // // // // // // // //           style={tw`border border-green-300 p-2 rounded mb-4`}
// // // // // // // // //           value={appointmentSlot}
// // // // // // // // //           onChangeText={setAppointmentSlot}
// // // // // // // // //           keyboardType="numeric"
// // // // // // // // //         />

// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           onPress={handleSubmit}
// // // // // // // // //           style={tw`bg-green-600 py-3 rounded-xl mb-6`}
// // // // // // // // //         >
// // // // // // // // //           <Text style={tw`text-white text-center font-semibold text-lg`}>
// // // // // // // // //             Save Schedule
// // // // // // // // //           </Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //       </ScrollView>
// // // // // // // // //     </SafeAreaView>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default AppointmentManagementScreen;







// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import {
// // // // // // // //   View,
// // // // // // // //   Text,
// // // // // // // //   SafeAreaView,
// // // // // // // //   StatusBar,
// // // // // // // //   ScrollView,
// // // // // // // //   TextInput,
// // // // // // // //   TouchableOpacity,
// // // // // // // //   Alert,
// // // // // // // // } from 'react-native';
// // // // // // // // import tw from 'twrnc';
// // // // // // // // import { Picker } from '@react-native-picker/picker';
// // // // // // // // import DoctorHeader from '../components/DoctorHeader';

// // // // // // // // const AppointmentManagementScreen = () => {
// // // // // // // //   const [availability, setAvailability] = useState([
// // // // // // // //     { day: 'monday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'tuesday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'wednesday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'thursday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'friday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'saturday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //     { day: 'sunday', loginTime: '', logoutTime: '', breaks: '', mode: '' },
// // // // // // // //   ]);

// // // // // // // //   const [consultationFee, setConsultationFee] = useState('');
// // // // // // // //   const [experienceYears, setExperienceYears] = useState('');
// // // // // // // //   const [appointmentSlot, setAppointmentSlot] = useState('');

// // // // // // // //   const handleChange = (index, field, value) => {
// // // // // // // //     const updated = [...availability];
// // // // // // // //     updated[index][field] = value;
// // // // // // // //     setAvailability(updated);
// // // // // // // //   };

// // // // // // // //   const handleSubmit = async () => {
// // // // // // // //     const payload = {
// // // // // // // //       availability_schedule: availability.map((item) => ({
// // // // // // // //         ...item,
// // // // // // // //         breaks: item.breaks ? item.breaks.split(',').map((b) => b.trim()) : [],
// // // // // // // //       })),
// // // // // // // //       consultation_fee: parseInt(consultationFee) || 0,
// // // // // // // //       experience_years: parseInt(experienceYears) || 0,
// // // // // // // //       appointment_slot: parseInt(appointmentSlot) || 0,
// // // // // // // //     };

// // // // // // // //     try {
// // // // // // // //       const response = await fetch(
// // // // // // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // // // // // //         {
// // // // // // // //           method: 'PUT',
// // // // // // // //           headers: {
// // // // // // // //             'Content-Type': 'application/json',
// // // // // // // //           },
// // // // // // // //           body: JSON.stringify(payload),
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       if (response.ok) {
// // // // // // // //         Alert.alert('✅ Success', 'Doctor schedule saved successfully!');
// // // // // // // //       } else {
// // // // // // // //         const err = await response.text();
// // // // // // // //         Alert.alert('❌ Error', err || 'Something went wrong');
// // // // // // // //       }
// // // // // // // //     } catch (error) {
// // // // // // // //       Alert.alert('❌ Network Error', error.message);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // // // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // // // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // // // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // // // // //         {availability.map((item, index) => (
// // // // // // // //           <View
// // // // // // // //             key={item.day}
// // // // // // // //             style={tw`bg-white rounded-2xl p-4 mb-4 shadow-md`}
// // // // // // // //           >
// // // // // // // //             <Text style={tw`text-lg font-semibold text-green-700 mb-2 capitalize`}>
// // // // // // // //               {item.day}
// // // // // // // //             </Text>

// // // // // // // //             <View style={tw`flex-row justify-between mb-2`}>
// // // // // // // //               <TextInput
// // // // // // // //                 placeholder="Login Time (e.g. 09:00)"
// // // // // // // //                 value={item.loginTime}
// // // // // // // //                 onChangeText={(text) => handleChange(index, 'loginTime', text)}
// // // // // // // //                 style={tw`border border-gray-300 rounded-lg px-3 py-2 flex-1 mr-2`}
// // // // // // // //               />
// // // // // // // //               <TextInput
// // // // // // // //                 placeholder="Logout Time (e.g. 17:00)"
// // // // // // // //                 value={item.logoutTime}
// // // // // // // //                 onChangeText={(text) => handleChange(index, 'logoutTime', text)}
// // // // // // // //                 style={tw`border border-gray-300 rounded-lg px-3 py-2 flex-1`}
// // // // // // // //               />
// // // // // // // //             </View>

// // // // // // // //             <TextInput
// // // // // // // //               placeholder="Breaks (comma separated e.g. 12:00-12:30,15:30-15:45)"
// // // // // // // //               value={item.breaks}
// // // // // // // //               onChangeText={(text) => handleChange(index, 'breaks', text)}
// // // // // // // //               style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-2`}
// // // // // // // //             />

// // // // // // // //             <View style={tw`border border-gray-300 rounded-lg`}>
// // // // // // // //               <Picker
// // // // // // // //                 selectedValue={item.mode}
// // // // // // // //                 onValueChange={(value) => handleChange(index, 'mode', value)}
// // // // // // // //               >
// // // // // // // //                 <Picker.Item label="Select Mode" value="" />
// // // // // // // //                 <Picker.Item label="Online" value="online" />
// // // // // // // //                 <Picker.Item label="Offline" value="offline" />
// // // // // // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // // // // // //               </Picker>
// // // // // // // //             </View>
// // // // // // // //           </View>
// // // // // // // //         ))}

// // // // // // // //         {/* Extra Doctor Info */}
// // // // // // // //         <TextInput
// // // // // // // //           placeholder="Consultation Fee"
// // // // // // // //           keyboardType="numeric"
// // // // // // // //           value={consultationFee}
// // // // // // // //           onChangeText={setConsultationFee}
// // // // // // // //           style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-white`}
// // // // // // // //         />

// // // // // // // //         <TextInput
// // // // // // // //           placeholder="Experience (Years)"
// // // // // // // //           keyboardType="numeric"
// // // // // // // //           value={experienceYears}
// // // // // // // //           onChangeText={setExperienceYears}
// // // // // // // //           style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-white`}
// // // // // // // //         />

// // // // // // // //         <TextInput
// // // // // // // //           placeholder="Appointment Slot (Minutes)"
// // // // // // // //           keyboardType="numeric"
// // // // // // // //           value={appointmentSlot}
// // // // // // // //           onChangeText={setAppointmentSlot}
// // // // // // // //           style={tw`border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-white`}
// // // // // // // //         />

// // // // // // // //         <TouchableOpacity
// // // // // // // //           onPress={handleSubmit}
// // // // // // // //           style={tw`bg-green-600 py-3 rounded-xl`}
// // // // // // // //         >
// // // // // // // //           <Text style={tw`text-center text-white text-lg font-semibold`}>
// // // // // // // //             Save Schedule
// // // // // // // //           </Text>
// // // // // // // //         </TouchableOpacity>
// // // // // // // //       </ScrollView>
// // // // // // // //     </SafeAreaView>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default AppointmentManagementScreen;










// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   SafeAreaView,
// // // // // // //   StatusBar,
// // // // // // //   TouchableOpacity,
// // // // // // //   ScrollView,
// // // // // // //   Alert,
// // // // // // //   Platform,
// // // // // // // } from 'react-native';
// // // // // // // import tw from 'twrnc';
// // // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // // import { Picker } from '@react-native-picker/picker';
// // // // // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // // // // const AppointmentManagementScreen = () => {
// // // // // // //   const [schedule, setSchedule] = useState([
// // // // // // //     { day: 'monday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'tuesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'wednesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'thursday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'friday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'saturday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //     { day: 'sunday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // // //   ]);

// // // // // // //   const [consultationFee, setConsultationFee] = useState('');
// // // // // // //   const [experienceYears, setExperienceYears] = useState('');
// // // // // // //   const [appointmentSlot, setAppointmentSlot] = useState('');
// // // // // // //   const [slots, setSlots] = useState([]);

// // // // // // //   const [showPicker, setShowPicker] = useState({
// // // // // // //     visible: false,
// // // // // // //     dayIndex: null,
// // // // // // //     field: '',
// // // // // // //     breakIndex: null,
// // // // // // //   });

// // // // // // //   const [tempDate, setTempDate] = useState(new Date());

// // // // // // //   // Fetch slots
// // // // // // //   useEffect(() => {
// // // // // // //     const fetchSlots = async () => {
// // // // // // //       try {
// // // // // // //         const res = await fetch('https://landing.docapp.co.in/api/auth/show-slots/3');
// // // // // // //         const data = await res.json();
// // // // // // //         setSlots(data || []);
// // // // // // //       } catch (err) {
// // // // // // //         console.error('Error fetching slots:', err);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchSlots();
// // // // // // //   }, []);

// // // // // // //   const handleChange = (index, field, value) => {
// // // // // // //     const updated = [...schedule];
// // // // // // //     updated[index][field] = value;
// // // // // // //     setSchedule(updated);
// // // // // // //   };

// // // // // // //   const handleBreakChange = (dayIndex, breakIndex, value) => {
// // // // // // //     const updated = [...schedule];
// // // // // // //     updated[dayIndex].breaks[breakIndex] = value;
// // // // // // //     setSchedule(updated);
// // // // // // //   };

// // // // // // //   const addBreak = (dayIndex) => {
// // // // // // //     const updated = [...schedule];
// // // // // // //     updated[dayIndex].breaks.push('');
// // // // // // //     setSchedule(updated);
// // // // // // //   };

// // // // // // //   const removeBreak = (dayIndex, breakIndex) => {
// // // // // // //     const updated = [...schedule];
// // // // // // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // // // // // //     setSchedule(updated);
// // // // // // //   };

// // // // // // //   const openTimePicker = (dayIndex, field, breakIndex = null) => {
// // // // // // //     setShowPicker({ visible: true, dayIndex, field, breakIndex });
// // // // // // //   };

// // // // // // //   const onTimeChange = (event, selectedDate) => {
// // // // // // //     if (event.type === 'dismissed') {
// // // // // // //       setShowPicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const currentDate = selectedDate || tempDate;
// // // // // // //     const hours = currentDate.getHours().toString().padStart(2, '0');
// // // // // // //     const minutes = currentDate.getMinutes().toString().padStart(2, '0');
// // // // // // //     const formatted = `${hours}:${minutes}`;

// // // // // // //     if (showPicker.breakIndex !== null) {
// // // // // // //       handleBreakChange(showPicker.dayIndex, showPicker.breakIndex, formatted);
// // // // // // //     } else {
// // // // // // //       handleChange(showPicker.dayIndex, showPicker.field, formatted);
// // // // // // //     }

// // // // // // //     setShowPicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // // // // // //   };

// // // // // // //   const handleSubmit = async () => {
// // // // // // //     const payload = {
// // // // // // //       availability_schedule: schedule,
// // // // // // //       consultation_fee: Number(consultationFee),
// // // // // // //       experience_years: Number(experienceYears),
// // // // // // //       appointment_slot: Number(appointmentSlot),
// // // // // // //     };

// // // // // // //     try {
// // // // // // //       const response = await fetch(
// // // // // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // // // // //         {
// // // // // // //           method: 'PUT',
// // // // // // //           headers: {
// // // // // // //             'Content-Type': 'application/json',
// // // // // // //           },
// // // // // // //           body: JSON.stringify(payload),
// // // // // // //         }
// // // // // // //       );

// // // // // // //       if (response.ok) {
// // // // // // //         Alert.alert('✅ Success', 'Schedule updated successfully!');
// // // // // // //       } else {
// // // // // // //         const errorText = await response.text();
// // // // // // //         Alert.alert('❌ Error', errorText || 'Something went wrong!');
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       Alert.alert('Error', err.message);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // // // // //       <ScrollView style={tw`p-4`}>
// // // // // // //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// // // // // // //           Set Your Weekly Schedule
// // // // // // //         </Text>

// // // // // // //         {schedule.map((item, index) => (
// // // // // // //           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // // // // // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // // // // // //               {item.day}
// // // // // // //             </Text>

// // // // // // //             {/* Login Time */}
// // // // // // //             <TouchableOpacity
// // // // // // //               onPress={() => openTimePicker(index, 'loginTime')}
// // // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // //             >
// // // // // // //               <Text style={tw`text-gray-700`}>
// // // // // // //                 {item.loginTime ? `Login: ${item.loginTime}` : 'Select Login Time'}
// // // // // // //               </Text>
// // // // // // //             </TouchableOpacity>

// // // // // // //             {/* Logout Time */}
// // // // // // //             <TouchableOpacity
// // // // // // //               onPress={() => openTimePicker(index, 'logoutTime')}
// // // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // // //             >
// // // // // // //               <Text style={tw`text-gray-700`}>
// // // // // // //                 {item.logoutTime ? `Logout: ${item.logoutTime}` : 'Select Logout Time'}
// // // // // // //               </Text>
// // // // // // //             </TouchableOpacity>

// // // // // // //             {/* Breaks */}
// // // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // // // // // //             {item.breaks.map((brk, brkIndex) => (
// // // // // // //               <View
// // // // // // //                 key={brkIndex}
// // // // // // //                 style={tw`flex-row items-center mb-2 justify-between`}
// // // // // // //               >
// // // // // // //                 <TouchableOpacity
// // // // // // //                   onPress={() => openTimePicker(index, 'breaks', brkIndex)}
// // // // // // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // // // // // //                 >
// // // // // // //                   <Text style={tw`text-gray-700`}>
// // // // // // //                     {brk ? brk : 'Select Break Time'}
// // // // // // //                   </Text>
// // // // // // //                 </TouchableOpacity>

// // // // // // //                 {item.breaks.length > 1 && (
// // // // // // //                   <TouchableOpacity
// // // // // // //                     onPress={() => removeBreak(index, brkIndex)}
// // // // // // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // // // // // //                   >
// // // // // // //                     <Text style={tw`text-white`}>−</Text>
// // // // // // //                   </TouchableOpacity>
// // // // // // //                 )}
// // // // // // //               </View>
// // // // // // //             ))}

// // // // // // //             <TouchableOpacity
// // // // // // //               onPress={() => addBreak(index)}
// // // // // // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // // // // // //             >
// // // // // // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // // // // // //             </TouchableOpacity>

// // // // // // //             {/* Mode Picker */}
// // // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Mode:</Text>
// // // // // // //             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// // // // // // //               <Picker
// // // // // // //                 selectedValue={item.mode}
// // // // // // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // // // // // //               >
// // // // // // //                 <Picker.Item label="Select Mode" value="" />
// // // // // // //                 <Picker.Item label="Online" value="online" />
// // // // // // //                 <Picker.Item label="Offline" value="offline" />
// // // // // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // // // // //               </Picker>
// // // // // // //             </View>
// // // // // // //           </View>
// // // // // // //         ))}

// // // // // // //         {/* Slot Picker */}
// // // // // // //         <Text style={tw`text-sm text-green-600 mb-1`}>Appointment Slot:</Text>
// // // // // // //         <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// // // // // // //           <Picker
// // // // // // //             selectedValue={appointmentSlot}
// // // // // // //             onValueChange={(val) => setAppointmentSlot(val)}
// // // // // // //           >
// // // // // // //             <Picker.Item label="Select Slot" value="" />
// // // // // // //             {slots.map((slot, idx) => (
// // // // // // //               <Picker.Item key={idx} label={`${slot} mins`} value={slot} />
// // // // // // //             ))}
// // // // // // //           </Picker>
// // // // // // //         </View>

// // // // // // //         {/* Consultation Fee */}
// // // // // // //         <TouchableOpacity
// // // // // // //           onPress={handleSubmit}
// // // // // // //           style={tw`bg-green-600 py-3 rounded-xl mt-4`}
// // // // // // //         >
// // // // // // //           <Text style={tw`text-white text-center font-semibold text-lg`}>
// // // // // // //             Save Schedule
// // // // // // //           </Text>
// // // // // // //         </TouchableOpacity>
// // // // // // //       </ScrollView>

// // // // // // //       {showPicker.visible && (
// // // // // // //         <DateTimePicker
// // // // // // //           value={tempDate}
// // // // // // //           mode="time"
// // // // // // //           is24Hour={true}
// // // // // // //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // // // // // //           onChange={onTimeChange}
// // // // // // //         />
// // // // // // //       )}
// // // // // // //     </SafeAreaView>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default AppointmentManagementScreen;


// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   SafeAreaView,
// // // // // //   StatusBar,
// // // // // //   TextInput,
// // // // // //   TouchableOpacity,
// // // // // //   ScrollView,
// // // // // //   Alert,
// // // // // // } from 'react-native';
// // // // // // import tw from 'twrnc';
// // // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // // import { Picker } from '@react-native-picker/picker';

// // // // // // const AppointmentManagementScreen = () => {
// // // // // //   const [schedule, setSchedule] = useState([
// // // // // //     { day: 'monday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'tuesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'wednesday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'thursday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'friday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'saturday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //     { day: 'sunday', loginTime: '', logoutTime: '', breaks: [''], mode: '' },
// // // // // //   ]);

// // // // // //   const [consultationFee, setConsultationFee] = useState('');
// // // // // //   const [experienceYears, setExperienceYears] = useState('');
// // // // // //   const [appointmentSlot, setAppointmentSlot] = useState('');

// // // // // //   const handleChange = (index, field, value) => {
// // // // // //     const updated = [...schedule];
// // // // // //     updated[index][field] = value;
// // // // // //     setSchedule(updated);
// // // // // //   };

// // // // // //   const handleBreakChange = (dayIndex, breakIndex, value) => {
// // // // // //     const updated = [...schedule];
// // // // // //     updated[dayIndex].breaks[breakIndex] = value;
// // // // // //     setSchedule(updated);
// // // // // //   };

// // // // // //   const addBreak = (dayIndex) => {
// // // // // //     const updated = [...schedule];
// // // // // //     updated[dayIndex].breaks.push('');
// // // // // //     setSchedule(updated);
// // // // // //   };

// // // // // //   const removeBreak = (dayIndex, breakIndex) => {
// // // // // //     const updated = [...schedule];
// // // // // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // // // // //     setSchedule(updated);
// // // // // //   };

// // // // // //   const handleSubmit = async () => {
// // // // // //     const payload = {
// // // // // //       availability_schedule: schedule,
// // // // // //       consultation_fee: Number(consultationFee),
// // // // // //       experience_years: Number(experienceYears),
// // // // // //       appointment_slot: Number(appointmentSlot),
// // // // // //     };

// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // // // //         {
// // // // // //           method: 'PUT',
// // // // // //           headers: {
// // // // // //             'Content-Type': 'application/json',
// // // // // //           },
// // // // // //           body: JSON.stringify(payload),
// // // // // //         }
// // // // // //       );

// // // // // //       if (response.ok) {
// // // // // //         Alert.alert('Success', 'Schedule updated successfully!');
// // // // // //       } else {
// // // // // //         const errorText = await response.text();
// // // // // //         Alert.alert('Error', errorText || 'Something went wrong!');
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       Alert.alert('Error', err.message);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // // // //       <ScrollView style={tw`p-4`}>
// // // // // //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// // // // // //           Set Your Weekly Schedule
// // // // // //         </Text>

// // // // // //         {schedule.map((item, index) => (
// // // // // //           <View
// // // // // //             key={item.day}
// // // // // //             style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}
// // // // // //           >
// // // // // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // // // // //               {item.day}
// // // // // //             </Text>

// // // // // //             <TextInput
// // // // // //               placeholder="Login Time (e.g., 09:00)"
// // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // //               value={item.loginTime}
// // // // // //               onChangeText={(val) => handleChange(index, 'loginTime', val)}
// // // // // //             />
// // // // // //             <TextInput
// // // // // //               placeholder="Logout Time (e.g., 17:00)"
// // // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // //               value={item.logoutTime}
// // // // // //               onChangeText={(val) => handleChange(index, 'logoutTime', val)}
// // // // // //             />

// // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // // // // //             {item.breaks.map((brk, brkIndex) => (
// // // // // //               <View
// // // // // //                 key={brkIndex}
// // // // // //                 style={tw`flex-row items-center mb-2 justify-between`}
// // // // // //               >
// // // // // //                 <TextInput
// // // // // //                   placeholder="e.g., 12:00-12:30"
// // // // // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // // // // //                   value={brk}
// // // // // //                   onChangeText={(val) =>
// // // // // //                     handleBreakChange(index, brkIndex, val)
// // // // // //                   }
// // // // // //                 />
// // // // // //                 {item.breaks.length > 1 && (
// // // // // //                   <TouchableOpacity
// // // // // //                     onPress={() => removeBreak(index, brkIndex)}
// // // // // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // // // // //                   >
// // // // // //                     <Text style={tw`text-white`}>−</Text>
// // // // // //                   </TouchableOpacity>
// // // // // //                 )}
// // // // // //               </View>
// // // // // //             ))}

// // // // // //             <TouchableOpacity
// // // // // //               onPress={() => addBreak(index)}
// // // // // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // // // // //             >
// // // // // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // // // // //             </TouchableOpacity>

// // // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Mode:</Text>
// // // // // //             <View
// // // // // //               style={tw`border border-green-300 rounded mb-2 bg-green-50`}
// // // // // //             >
// // // // // //               <Picker
// // // // // //                 selectedValue={item.mode}
// // // // // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // // // // //               >
// // // // // //                 <Picker.Item label="Select Mode" value="" />
// // // // // //                 <Picker.Item label="Online" value="online" />
// // // // // //                 <Picker.Item label="Offline" value="offline" />
// // // // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // // // //               </Picker>
// // // // // //             </View>
// // // // // //           </View>
// // // // // //         ))}

// // // // // //         <TextInput
// // // // // //           placeholder="Consultation Fee"
// // // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // //           value={consultationFee}
// // // // // //           onChangeText={setConsultationFee}
// // // // // //           keyboardType="numeric"
// // // // // //         />
// // // // // //         <TextInput
// // // // // //           placeholder="Experience (in years)"
// // // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // // //           value={experienceYears}
// // // // // //           onChangeText={setExperienceYears}
// // // // // //           keyboardType="numeric"
// // // // // //         />
// // // // // //         <TextInput
// // // // // //           placeholder="Appointment Slot (in minutes)"
// // // // // //           style={tw`border border-green-300 p-2 rounded mb-4`}
// // // // // //           value={appointmentSlot}
// // // // // //           onChangeText={setAppointmentSlot}
// // // // // //           keyboardType="numeric"
// // // // // //         />

// // // // // //         <TouchableOpacity
// // // // // //           onPress={handleSubmit}
// // // // // //           style={tw`bg-green-600 py-3 rounded-xl`}
// // // // // //         >
// // // // // //           <Text style={tw`text-white text-center font-semibold text-lg`}>
// // // // // //             Save Schedule
// // // // // //           </Text>
// // // // // //         </TouchableOpacity>
// // // // // //       </ScrollView>
// // // // // //     </SafeAreaView>
// // // // // //   );
// // // // // // };

// // // // // // export default AppointmentManagementScreen;




// // // // // import React, { useEffect, useState } from 'react';
// // // // // import {
// // // // //   View,
// // // // //   Text,
// // // // //   SafeAreaView,
// // // // //   StatusBar,
// // // // //   TextInput,
// // // // //   TouchableOpacity,
// // // // //   ScrollView,
// // // // //   Alert,
// // // // //   ActivityIndicator,
// // // // // } from 'react-native';
// // // // // import tw from 'twrnc';
// // // // // import DoctorHeader from '../components/DoctorHeader';
// // // // // import { Picker } from '@react-native-picker/picker';

// // // // // const AppointmentManagementScreen = () => {
// // // // //   const [schedule, setSchedule] = useState([]);
// // // // //   const [consultationFee, setConsultationFee] = useState('');
// // // // //   const [experienceYears, setExperienceYears] = useState('');
// // // // //   const [appointmentSlot, setAppointmentSlot] = useState('');
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // ✅ Fetch user data (doctor info)
// // // // //   const fetchDoctorData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
// // // // //       const data = await response.json();

// // // // //       if (response.ok && data?.userData?.doctorProfile) {
// // // // //         const doctor = data.userData.doctorProfile;

// // // // //         setConsultationFee(String(doctor.consultation_fee || ''));
// // // // //         setExperienceYears(String(doctor.experience_years || ''));
// // // // //         setAppointmentSlot(String(doctor.appointment_time || ''));

// // // // //         // Parse availability schedule
// // // // //         const parsedSchedule = doctor.availability_schedule
// // // // //           ? JSON.parse(doctor.availability_schedule)
// // // // //           : [];

// // // // //         // Ensure all days exist
// // // // //         const defaultDays = [
// // // // //           'monday',
// // // // //           'tuesday',
// // // // //           'wednesday',
// // // // //           'thursday',
// // // // //           'friday',
// // // // //           'saturday',
// // // // //           'sunday',
// // // // //         ];
// // // // //         const fullSchedule = defaultDays.map((day) => {
// // // // //           const existing = parsedSchedule.find((d) => d.day === day);
// // // // //           return (
// // // // //             existing || { day, loginTime: '', logoutTime: '', breaks: [''], mode: '' }
// // // // //           );
// // // // //         });

// // // // //         setSchedule(fullSchedule);
// // // // //       } else {
// // // // //         Alert.alert('Error', 'Unable to fetch doctor details.');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       Alert.alert('Error', error.message);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchDoctorData();
// // // // //   }, []);

// // // // //   const handleChange = (index, field, value) => {
// // // // //     const updated = [...schedule];
// // // // //     updated[index][field] = value;
// // // // //     setSchedule(updated);
// // // // //   };

// // // // //   const handleBreakChange = (dayIndex, breakIndex, value) => {
// // // // //     const updated = [...schedule];
// // // // //     updated[dayIndex].breaks[breakIndex] = value;
// // // // //     setSchedule(updated);
// // // // //   };

// // // // //   const addBreak = (dayIndex) => {
// // // // //     const updated = [...schedule];
// // // // //     updated[dayIndex].breaks.push('');
// // // // //     setSchedule(updated);
// // // // //   };

// // // // //   const removeBreak = (dayIndex, breakIndex) => {
// // // // //     const updated = [...schedule];
// // // // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // // // //     setSchedule(updated);
// // // // //   };

// // // // //   const handleSubmit = async () => {
// // // // //     const payload = {
// // // // //       availability_schedule: schedule,
// // // // //       consultation_fee: Number(consultationFee),
// // // // //       experience_years: Number(experienceYears),
// // // // //       appointment_slot: Number(appointmentSlot),
// // // // //     };

// // // // //     try {
// // // // //       const response = await fetch(
// // // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // // //         {
// // // // //           method: 'PUT',
// // // // //           headers: {
// // // // //             'Content-Type': 'application/json',
// // // // //           },
// // // // //           body: JSON.stringify(payload),
// // // // //         }
// // // // //       );

// // // // //       if (response.ok) {
// // // // //         Alert.alert('Success', 'Schedule updated successfully!');
// // // // //         fetchDoctorData(); // Refresh data
// // // // //       } else {
// // // // //         const errorText = await response.text();
// // // // //         Alert.alert('Error', errorText || 'Something went wrong!');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', err.message);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <SafeAreaView style={tw`flex-1 items-center justify-center`}>
// // // // //         <ActivityIndicator size="large" color="#059669" />
// // // // //         <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
// // // // //       </SafeAreaView>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // // //       <ScrollView style={tw`p-4`}>
// // // // //         {/* ✅ Current Details Display */}
// // // // //         <View style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // // // //           <Text style={tw`text-lg font-bold text-green-700 mb-2`}>
// // // // //             Current Appointment Info
// // // // //           </Text>
// // // // //           <Text style={tw`text-green-800`}>
// // // // //             💰 Consultation Fee:{' '}
// // // // //             <Text style={tw`font-semibold`}>₹{consultationFee || 'Not Set'}</Text>
// // // // //           </Text>
// // // // //           <Text style={tw`text-green-800`}>
// // // // //             🎓 Experience:{' '}
// // // // //             <Text style={tw`font-semibold`}>{experienceYears || 0} years</Text>
// // // // //           </Text>
// // // // //           <Text style={tw`text-green-800`}>
// // // // //             ⏱️ Appointment Slot:{' '}
// // // // //             <Text style={tw`font-semibold`}>
// // // // //               {appointmentSlot || 'Not Set'} minutes
// // // // //             </Text>
// // // // //           </Text>
// // // // //         </View>

// // // // //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// // // // //           Set Your Weekly Schedule
// // // // //         </Text>

// // // // //         {schedule.map((item, index) => (
// // // // //           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // // // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // // // //               {item.day}
// // // // //             </Text>

// // // // //             <TextInput
// // // // //               placeholder="Login Time (e.g., 09:00)"
// // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // //               value={item.loginTime}
// // // // //               onChangeText={(val) => handleChange(index, 'loginTime', val)}
// // // // //             />
// // // // //             <TextInput
// // // // //               placeholder="Logout Time (e.g., 17:00)"
// // // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // //               value={item.logoutTime}
// // // // //               onChangeText={(val) => handleChange(index, 'logoutTime', val)}
// // // // //             />

// // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // // // //             {item.breaks.map((brk, brkIndex) => (
// // // // //               <View
// // // // //                 key={brkIndex}
// // // // //                 style={tw`flex-row items-center mb-2 justify-between`}
// // // // //               >
// // // // //                 <TextInput
// // // // //                   placeholder="e.g., 12:00-12:30"
// // // // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // // // //                   value={brk}
// // // // //                   onChangeText={(val) =>
// // // // //                     handleBreakChange(index, brkIndex, val)
// // // // //                   }
// // // // //                 />
// // // // //                 {item.breaks.length > 1 && (
// // // // //                   <TouchableOpacity
// // // // //                     onPress={() => removeBreak(index, brkIndex)}
// // // // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // // // //                   >
// // // // //                     <Text style={tw`text-white`}>−</Text>
// // // // //                   </TouchableOpacity>
// // // // //                 )}
// // // // //               </View>
// // // // //             ))}

// // // // //             <TouchableOpacity
// // // // //               onPress={() => addBreak(index)}
// // // // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // // // //             >
// // // // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // // // //             </TouchableOpacity>

// // // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Mode:</Text>
// // // // //             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// // // // //               <Picker
// // // // //                 selectedValue={item.mode}
// // // // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // // // //               >
// // // // //                 <Picker.Item label="Select Mode" value="" />
// // // // //                 <Picker.Item label="Online" value="online" />
// // // // //                 <Picker.Item label="Offline" value="offline" />
// // // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // // //               </Picker>
// // // // //             </View>
// // // // //           </View>
// // // // //         ))}

// // // // //         <TextInput
// // // // //           placeholder="Consultation Fee"
// // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // //           value={consultationFee}
// // // // //           onChangeText={setConsultationFee}
// // // // //           keyboardType="numeric"
// // // // //         />
// // // // //         <TextInput
// // // // //           placeholder="Experience (in years)"
// // // // //           style={tw`border border-green-300 p-2 rounded mb-2`}
// // // // //           value={experienceYears}
// // // // //           onChangeText={setExperienceYears}
// // // // //           keyboardType="numeric"
// // // // //         />
// // // // //         <TextInput
// // // // //           placeholder="Appointment Slot (in minutes)"
// // // // //           style={tw`border border-green-300 p-2 rounded mb-4`}
// // // // //           value={appointmentSlot}
// // // // //           onChangeText={setAppointmentSlot}
// // // // //           keyboardType="numeric"
// // // // //         />

// // // // //         <TouchableOpacity
// // // // //           onPress={handleSubmit}
// // // // //           style={tw`bg-green-600 py-3 rounded-xl`}
// // // // //         >
// // // // //           <Text style={tw`text-white text-center font-semibold text-lg`}>
// // // // //             Save Schedule
// // // // //           </Text>
// // // // //         </TouchableOpacity>
// // // // //       </ScrollView>
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // };

// // // // // export default AppointmentManagementScreen;



// // // // import React, { useEffect, useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   SafeAreaView,
// // // //   StatusBar,
// // // //   TextInput,
// // // //   TouchableOpacity,
// // // //   ScrollView,
// // // //   Alert,
// // // //   ActivityIndicator,
// // // //   Platform,
// // // // } from 'react-native';
// // // // import tw from 'twrnc';
// // // // import DoctorHeader from '../components/DoctorHeader';
// // // // import { Picker } from '@react-native-picker/picker';
// // // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // // const AppointmentManagementScreen = () => {
// // // //   const [schedule, setSchedule] = useState([]);
// // // //   const [consultationFee, setConsultationFee] = useState('');
// // // //   const [experienceYears, setExperienceYears] = useState('');
// // // //   const [appointmentSlot, setAppointmentSlot] = useState('');
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [timePicker, setTimePicker] = useState({ visible: false, dayIndex: null, field: '', breakIndex: null });

// // // //   // ✅ Fetch doctor data
// // // //   const fetchDoctorData = async () => {
// // // //     try {
// // // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
// // // //       const data = await response.json();

// // // //       if (response.ok && data?.userData?.doctorProfile) {
// // // //         const doctor = data.userData.doctorProfile;
// // // //         setConsultationFee(String(doctor.consultation_fee || ''));
// // // //         setExperienceYears(String(doctor.experience_years || ''));
// // // //         setAppointmentSlot(String(doctor.appointment_time || ''));

// // // //         const parsedSchedule = doctor.availability_schedule
// // // //           ? JSON.parse(doctor.availability_schedule)
// // // //           : [];

// // // //         const defaultDays = [
// // // //           'monday',
// // // //           'tuesday',
// // // //           'wednesday',
// // // //           'thursday',
// // // //           'friday',
// // // //           'saturday',
// // // //           'sunday',
// // // //         ];
// // // //         const fullSchedule = defaultDays.map((day) => {
// // // //           const existing = parsedSchedule.find((d) => d.day === day);
// // // //           return existing || { day, loginTime: '', logoutTime: '', breaks: [''], mode: '' };
// // // //         });
// // // //         setSchedule(fullSchedule);
// // // //       } else {
// // // //         Alert.alert('Error', 'Unable to fetch doctor details.');
// // // //       }
// // // //     } catch (error) {
// // // //       Alert.alert('Error', error.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchDoctorData();
// // // //   }, []);

// // // //   const formatTime = (date) => {
// // // //     return date.toTimeString().slice(0, 5); // "HH:mm"
// // // //   };

// // // //   const handleChange = (index, field, value) => {
// // // //     const updated = [...schedule];
// // // //     updated[index][field] = value;
// // // //     setSchedule(updated);
// // // //   };

// // // //   const handleBreakChange = (dayIndex, breakIndex, value) => {
// // // //     const updated = [...schedule];
// // // //     updated[dayIndex].breaks[breakIndex] = value;
// // // //     setSchedule(updated);
// // // //   };

// // // //   const addBreak = (dayIndex) => {
// // // //     const updated = [...schedule];
// // // //     updated[dayIndex].breaks.push('');
// // // //     setSchedule(updated);
// // // //   };

// // // //   const removeBreak = (dayIndex, breakIndex) => {
// // // //     const updated = [...schedule];
// // // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // // //     setSchedule(updated);
// // // //   };

// // // //   const openTimePicker = (dayIndex, field, breakIndex = null) => {
// // // //     setTimePicker({ visible: true, dayIndex, field, breakIndex });
// // // //   };

// // // //   const onTimeChange = (event, selectedDate) => {
// // // //     if (event.type === 'dismissed') {
// // // //       setTimePicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // // //       return;
// // // //     }

// // // //     const { dayIndex, field, breakIndex } = timePicker;
// // // //     const time = formatTime(selectedDate);
// // // //     const updated = [...schedule];

// // // //     if (breakIndex !== null) {
// // // //       updated[dayIndex].breaks[breakIndex] = time;
// // // //     } else {
// // // //       updated[dayIndex][field] = time;
// // // //     }

// // // //     setSchedule(updated);
// // // //     setTimePicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // // //   };

// // // //   const handleSubmitDay = async (dayIndex) => {
// // // //     const dayData = schedule[dayIndex];
// // // //     const payload = {
// // // //       availability_schedule: [dayData],
// // // //       consultation_fee: Number(consultationFee),
// // // //       experience_years: Number(experienceYears),
// // // //       appointment_slot: Number(appointmentSlot),
// // // //     };

// // // //     try {
// // // //       const response = await fetch(
// // // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // // //         {
// // // //           method: 'PUT',
// // // //           headers: {
// // // //             'Content-Type': 'application/json',
// // // //           },
// // // //           body: JSON.stringify(payload),
// // // //         }
// // // //       );

// // // //       if (response.ok) {
// // // //         Alert.alert('Success', `${dayData.day} schedule saved successfully!`);
// // // //         fetchDoctorData();
// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         Alert.alert('Error', errorText || 'Something went wrong!');
// // // //       }
// // // //     } catch (err) {
// // // //       Alert.alert('Error', err.message);
// // // //     }
// // // //   };

// // // //   if (loading) {
// // // //     return (
// // // //       <SafeAreaView style={tw`flex-1 items-center justify-center`}>
// // // //         <ActivityIndicator size="large" color="#059669" />
// // // //         <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
// // // //       </SafeAreaView>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // // //       <ScrollView style={tw`p-4`}>
// // // //         {/* ✅ Display Current Info */}
// // // //         <View style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // // //           <Text style={tw`text-lg font-bold text-green-700 mb-2`}>
// // // //             Current Appointment Info
// // // //           </Text>
// // // //           <Text style={tw`text-green-800`}>
// // // //             💰 Consultation Fee: <Text style={tw`font-semibold`}>₹{consultationFee || 'Not Set'}</Text>
// // // //           </Text>
// // // //           <Text style={tw`text-green-800`}>
// // // //             🎓 Experience: <Text style={tw`font-semibold`}>{experienceYears || 0} years</Text>
// // // //           </Text>
// // // //           <Text style={tw`text-green-800`}>
// // // //             ⏱️ Appointment Slot: <Text style={tw`font-semibold`}>{appointmentSlot || 'Not Set'} minutes</Text>
// // // //           </Text>
// // // //         </View>

// // // //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// // // //           Set Your Weekly Schedule
// // // //         </Text>

// // // //         {schedule.map((item, index) => (
// // // //           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // // //               {item.day}
// // // //             </Text>

// // // //             <TouchableOpacity
// // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // //               onPress={() => openTimePicker(index, 'loginTime')}
// // // //             >
// // // //               <Text>{item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}</Text>
// // // //             </TouchableOpacity>

// // // //             <TouchableOpacity
// // // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // // //               onPress={() => openTimePicker(index, 'logoutTime')}
// // // //             >
// // // //               <Text>{item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}</Text>
// // // //             </TouchableOpacity>

// // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // // //             {item.breaks.map((brk, brkIndex) => (
// // // //               <View
// // // //                 key={brkIndex}
// // // //                 style={tw`flex-row items-center mb-2 justify-between`}
// // // //               >
// // // //                 <TouchableOpacity
// // // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // // //                   onPress={() => openTimePicker(index, 'break', brkIndex)}
// // // //                 >
// // // //                   <Text>{brk ? `Break: ${brk}` : 'Set Break Time'}</Text>
// // // //                 </TouchableOpacity>

// // // //                 {item.breaks.length > 1 && (
// // // //                   <TouchableOpacity
// // // //                     onPress={() => removeBreak(index, brkIndex)}
// // // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // // //                   >
// // // //                     <Text style={tw`text-white`}>−</Text>
// // // //                   </TouchableOpacity>
// // // //                 )}
// // // //               </View>
// // // //             ))}

// // // //             <TouchableOpacity
// // // //               onPress={() => addBreak(index)}
// // // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // // //             >
// // // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // // //             </TouchableOpacity>

// // // //             <Text style={tw`text-sm text-green-600 mb-1`}>Mode:</Text>
// // // //             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// // // //               <Picker
// // // //                 selectedValue={item.mode}
// // // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // // //               >
// // // //                 <Picker.Item label="Select Mode" value="" />
// // // //                 <Picker.Item label="Online" value="online" />
// // // //                 <Picker.Item label="Offline" value="offline" />
// // // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // // //               </Picker>
// // // //             </View>

// // // //             {/* ✅ Save Button per Day */}
// // // //             <TouchableOpacity
// // // //               onPress={() => handleSubmitDay(index)}
// // // //               style={tw`bg-green-600 py-2 rounded-lg mt-2`}
// // // //             >
// // // //               <Text style={tw`text-white text-center font-semibold`}>
// // // //                 Save {item.day.charAt(0).toUpperCase() + item.day.slice(1)} Schedule
// // // //               </Text>
// // // //             </TouchableOpacity>
// // // //           </View>
// // // //         ))}
// // // //       </ScrollView>

// // // //       {timePicker.visible && (
// // // //         <DateTimePicker
// // // //           value={new Date()}
// // // //           mode="time"
// // // //           is24Hour={true}
// // // //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // // //           onChange={onTimeChange}
// // // //         />
// // // //       )}
// // // //     </SafeAreaView>
// // // //   );
// // // // };

// // // // export default AppointmentManagementScreen;



// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   SafeAreaView,
// // //   StatusBar,
// // //   TouchableOpacity,
// // //   ScrollView,
// // //   Alert,
// // //   ActivityIndicator,
// // //   Platform,
// // // } from 'react-native';
// // // import tw from 'twrnc';
// // // import DoctorHeader from '../components/DoctorHeader';
// // // import { Picker } from '@react-native-picker/picker';
// // // import DateTimePicker from '@react-native-community/datetimepicker';

// // // const AppointmentManagementScreen = () => {
// // //   const [schedule, setSchedule] = useState([]);
// // //   const [consultationFee, setConsultationFee] = useState('');
// // //   const [experienceYears, setExperienceYears] = useState('');
// // //   const [appointmentSlot, setAppointmentSlot] = useState('');
// // //   const [loading, setLoading] = useState(true);
// // //   const [timePicker, setTimePicker] = useState({ visible: false, dayIndex: null, field: '', breakIndex: null });

// // //   const fetchDoctorData = async () => {
// // //     try {
// // //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
// // //       const data = await response.json();

// // //       if (response.ok && data?.userData?.doctorProfile) {
// // //         const doctor = data.userData.doctorProfile;
// // //         setConsultationFee(String(doctor.consultation_fee || ''));
// // //         setExperienceYears(String(doctor.experience_years || ''));
// // //         setAppointmentSlot(String(doctor.appointment_time || ''));

// // //         const parsedSchedule = doctor.availability_schedule
// // //           ? JSON.parse(doctor.availability_schedule)
// // //           : [];

// // //         const defaultDays = [
// // //           'monday',
// // //           'tuesday',
// // //           'wednesday',
// // //           'thursday',
// // //           'friday',
// // //           'saturday',
// // //           'sunday',
// // //         ];
// // //         const fullSchedule = defaultDays.map((day) => {
// // //           const existing = parsedSchedule.find((d) => d.day === day);
// // //           return existing || { day, loginTime: '', logoutTime: '', breaks: [''], mode: '' };
// // //         });
// // //         setSchedule(fullSchedule);
// // //       } else {
// // //         Alert.alert('Error', 'Unable to fetch doctor details.');
// // //       }
// // //     } catch (error) {
// // //       Alert.alert('Error', error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchDoctorData();
// // //   }, []);

// // //   const formatTime = (date) => date.toTimeString().slice(0, 5);

// // //   const handleChange = (index, field, value) => {
// // //     const updated = [...schedule];
// // //     updated[index][field] = value;
// // //     setSchedule(updated);
// // //   };

// // //   const addBreak = (dayIndex) => {
// // //     const updated = [...schedule];
// // //     updated[dayIndex].breaks.push('');
// // //     setSchedule(updated);
// // //   };

// // //   const removeBreak = (dayIndex, breakIndex) => {
// // //     const updated = [...schedule];
// // //     updated[dayIndex].breaks.splice(breakIndex, 1);
// // //     setSchedule(updated);
// // //   };

// // //   const openTimePicker = (dayIndex, field, breakIndex = null) => {
// // //     setTimePicker({ visible: true, dayIndex, field, breakIndex });
// // //   };

// // //   const onTimeChange = (event, selectedDate) => {
// // //     if (event.type === 'dismissed') {
// // //       setTimePicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // //       return;
// // //     }

// // //     const { dayIndex, field, breakIndex } = timePicker;
// // //     const time = formatTime(selectedDate);
// // //     const updated = [...schedule];

// // //     if (breakIndex !== null) {
// // //       updated[dayIndex].breaks[breakIndex] = time;
// // //     } else {
// // //       updated[dayIndex][field] = time;
// // //     }

// // //     setSchedule(updated);
// // //     setTimePicker({ visible: false, dayIndex: null, field: '', breakIndex: null });
// // //   };

// // //   const handleSubmitDay = async (dayIndex) => {
// // //     const dayData = schedule[dayIndex];
// // //     const payload = {
// // //       availability_schedule: [dayData], // or schedule (if API expects full week)
// // //       consultation_fee: Number(consultationFee),
// // //       experience_years: Number(experienceYears),
// // //       appointment_slot: Number(appointmentSlot),
// // //     };

// // //     try {
// // //       const response = await fetch(
// // //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// // //         {
// // //           method: 'PUT',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       if (response.ok) {
// // //         Alert.alert('Success', `${dayData.day} schedule saved successfully!`);
// // //         fetchDoctorData();
// // //       } else {
// // //         const errorText = await response.text();
// // //         Alert.alert('Error', errorText || 'Something went wrong!');
// // //       }
// // //     } catch (err) {
// // //       Alert.alert('Error', err.message);
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <SafeAreaView style={tw`flex-1 items-center justify-center`}>
// // //         <ActivityIndicator size="large" color="#059669" />
// // //         <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
// // //       </SafeAreaView>
// // //     );
// // //   }

// // //   return (
// // //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// // //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// // //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// // //       <ScrollView style={tw`p-4`}>
// // //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// // //           Set Your Weekly Schedule
// // //         </Text>

// // //         {schedule.map((item, index) => (
// // //           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// // //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// // //               {item.day}
// // //             </Text>

// // //             <TouchableOpacity
// // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // //               onPress={() => openTimePicker(index, 'loginTime')}
// // //             >
// // //               <Text>{item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}</Text>
// // //             </TouchableOpacity>

// // //             <TouchableOpacity
// // //               style={tw`border border-green-300 p-2 rounded mb-2`}
// // //               onPress={() => openTimePicker(index, 'logoutTime')}
// // //             >
// // //               <Text>{item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}</Text>
// // //             </TouchableOpacity>

// // //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// // //             {item.breaks.map((brk, brkIndex) => (
// // //               <View key={brkIndex} style={tw`flex-row items-center mb-2 justify-between`}>
// // //                 <TouchableOpacity
// // //                   style={tw`border border-green-300 p-2 rounded flex-1 mr-2`}
// // //                   onPress={() => openTimePicker(index, 'breaks', brkIndex)}
// // //                 >
// // //                   <Text>{brk ? `Break: ${brk}` : 'Set Break Time'}</Text>
// // //                 </TouchableOpacity>
// // //                 {item.breaks.length > 1 && (
// // //                   <TouchableOpacity
// // //                     onPress={() => removeBreak(index, brkIndex)}
// // //                     style={tw`bg-red-500 px-3 py-1 rounded`}
// // //                   >
// // //                     <Text style={tw`text-white`}>−</Text>
// // //                   </TouchableOpacity>
// // //                 )}
// // //               </View>
// // //             ))}

// // //             <TouchableOpacity
// // //               onPress={() => addBreak(index)}
// // //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// // //             >
// // //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// // //             </TouchableOpacity>

// // //             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// // //               <Picker
// // //                 selectedValue={item.mode}
// // //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// // //               >
// // //                 <Picker.Item label="Select Mode" value="" />
// // //                 <Picker.Item label="Online" value="online" />
// // //                 <Picker.Item label="Offline" value="offline" />
// // //                 <Picker.Item label="Hybrid" value="hybrid" />
// // //               </Picker>
// // //             </View>

// // //             <TouchableOpacity
// // //               onPress={() => handleSubmitDay(index)}
// // //               style={tw`bg-green-600 py-2 rounded-lg mt-2`}
// // //             >
// // //               <Text style={tw`text-white text-center font-semibold`}>
// // //                 Save {item.day.charAt(0).toUpperCase() + item.day.slice(1)} Schedule
// // //               </Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         ))}
// // //       </ScrollView>

// // //       {timePicker.visible && (
// // //         <DateTimePicker
// // //           value={new Date()}
// // //           mode="time"
// // //           is24Hour={true}
// // //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// // //           onChange={onTimeChange}
// // //         />
// // //       )}
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default AppointmentManagementScreen;



// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   SafeAreaView,
// //   StatusBar,
// //   TouchableOpacity,
// //   ScrollView,
// //   Alert,
// //   ActivityIndicator,
// //   Platform,
// // } from 'react-native';
// // import tw from 'twrnc';
// // import DoctorHeader from '../components/DoctorHeader';
// // import { Picker } from '@react-native-picker/picker';
// // import DateTimePicker from '@react-native-community/datetimepicker';

// // const AppointmentManagementScreen = () => {
// //   const [schedule, setSchedule] = useState([]);
// //   const [consultationFee, setConsultationFee] = useState('');
// //   const [experienceYears, setExperienceYears] = useState('');
// //   const [appointmentSlot, setAppointmentSlot] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [timePicker, setTimePicker] = useState({
// //     visible: false,
// //     dayIndex: null,
// //     field: '',
// //     breakIndex: null,
// //     breakField: null, // 'start' or 'end'
// //   });

// //   const fetchDoctorData = async () => {
// //     try {
// //       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
// //       const data = await response.json();

// //       if (response.ok && data?.userData?.doctorProfile) {
// //         const doctor = data.userData.doctorProfile;
// //         setConsultationFee(String(doctor.consultation_fee || ''));
// //         setExperienceYears(String(doctor.experience_years || ''));
// //         setAppointmentSlot(String(doctor.appointment_slot || ''));

// //         const parsedSchedule = doctor.availability_schedule
// //           ? JSON.parse(doctor.availability_schedule)
// //           : [];

// //         const defaultDays = [
// //           'monday',
// //           'tuesday',
// //           'wednesday',
// //           'thursday',
// //           'friday',
// //           'saturday',
// //           'sunday',
// //         ];

// //         const fullSchedule = defaultDays.map((day) => {
// //           const existing = parsedSchedule.find((d) => d.day === day);
// //           if (existing) {
// //             // Convert break strings ("12:00-12:30") → {start: "12:00", end: "12:30"}
// //             existing.breaks = existing.breaks.map((br) => {
// //               const [start, end] = br.split('-');
// //               return { start, end };
// //             });
// //             return existing;
// //           }
// //           return { day, loginTime: '', logoutTime: '', breaks: [{ start: '', end: '' }], mode: '' };
// //         });

// //         setSchedule(fullSchedule);
// //       } else {
// //         Alert.alert('Error', 'Unable to fetch doctor details.');
// //       }
// //     } catch (error) {
// //       Alert.alert('Error', error.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDoctorData();
// //   }, []);

// //   const formatTime = (date) => date.toTimeString().slice(0, 5);

// //   const handleChange = (index, field, value) => {
// //     const updated = [...schedule];
// //     updated[index][field] = value;
// //     setSchedule(updated);
// //   };

// //   const addBreak = (dayIndex) => {
// //     const updated = [...schedule];
// //     updated[dayIndex].breaks.push({ start: '', end: '' });
// //     setSchedule(updated);
// //   };

// //   const removeBreak = (dayIndex, breakIndex) => {
// //     const updated = [...schedule];
// //     updated[dayIndex].breaks.splice(breakIndex, 1);
// //     setSchedule(updated);
// //   };

// //   const openTimePicker = (dayIndex, field, breakIndex = null, breakField = null) => {
// //     setTimePicker({ visible: true, dayIndex, field, breakIndex, breakField });
// //   };

// //   const onTimeChange = (event, selectedDate) => {
// //     if (event.type === 'dismissed') {
// //       setTimePicker({
// //         visible: false,
// //         dayIndex: null,
// //         field: '',
// //         breakIndex: null,
// //         breakField: null,
// //       });
// //       return;
// //     }

// //     const { dayIndex, field, breakIndex, breakField } = timePicker;
// //     const time = formatTime(selectedDate);
// //     const updated = [...schedule];

// //     if (breakIndex !== null) {
// //       updated[dayIndex].breaks[breakIndex][breakField] = time;
// //     } else {
// //       updated[dayIndex][field] = time;
// //     }

// //     setSchedule(updated);
// //     setTimePicker({
// //       visible: false,
// //       dayIndex: null,
// //       field: '',
// //       breakIndex: null,
// //       breakField: null,
// //     });
// //   };

// //   const handleSubmitDay = async (dayIndex) => {
// //     const dayData = schedule[dayIndex];

// //     // Convert breaks {start, end} → "start-end"
// //     const formattedBreaks = dayData.breaks
// //       .filter((b) => b.start && b.end)
// //       .map((b) => `${b.start}-${b.end}`);

// //     const payload = {
// //       availability_schedule: [
// //         {
// //           day: dayData.day,
// //           loginTime: dayData.loginTime,
// //           logoutTime: dayData.logoutTime,
// //           breaks: formattedBreaks,
// //           mode: dayData.mode,
// //         },
// //       ],
// //       consultation_fee: Number(consultationFee),
// //       experience_years: Number(experienceYears),
// //       appointment_slot: Number(appointmentSlot),
// //     };

// //     try {
// //       const response = await fetch(
// //         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
// //         {
// //           method: 'PUT',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       if (response.ok) {
// //         Alert.alert('Success', `${dayData.day} schedule saved successfully!`);
// //         fetchDoctorData();
// //       } else {
// //         const errorText = await response.text();
// //         Alert.alert('Error', errorText || 'Something went wrong!');
// //       }
// //     } catch (err) {
// //       Alert.alert('Error', err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <SafeAreaView style={tw`flex-1 items-center justify-center`}>
// //         <ActivityIndicator size="large" color="#059669" />
// //         <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
// //       </SafeAreaView>
// //     );
// //   }

// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-green-50`}>
// //       <StatusBar backgroundColor="#059669" barStyle="light-content" />
// //       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

// //       <ScrollView style={tw`p-4`}>
// //         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
// //           Set Your Weekly Schedule
// //         </Text>

// //         {schedule.map((item, index) => (
// //           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
// //             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
// //               {item.day}
// //             </Text>

// //             <TouchableOpacity
// //               style={tw`border border-green-300 p-2 rounded mb-2`}
// //               onPress={() => openTimePicker(index, 'loginTime')}
// //             >
// //               <Text>
// //                 {item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}
// //               </Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity
// //               style={tw`border border-green-300 p-2 rounded mb-2`}
// //               onPress={() => openTimePicker(index, 'logoutTime')}
// //             >
// //               <Text>
// //                 {item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}
// //               </Text>
// //             </TouchableOpacity>

// //             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
// //             {item.breaks.map((brk, brkIndex) => (
// //               <View key={brkIndex} style={tw`mb-2`}>
// //                 <View style={tw`flex-row justify-between items-center mb-1`}>
// //                   <TouchableOpacity
// //                     style={tw`border border-green-300 p-2 rounded flex-1 mr-1`}
// //                     onPress={() => openTimePicker(index, 'breaks', brkIndex, 'start')}
// //                   >
// //                     <Text>{brk.start ? `Start: ${brk.start}` : 'Set Start'}</Text>
// //                   </TouchableOpacity>

// //                   <TouchableOpacity
// //                     style={tw`border border-green-300 p-2 rounded flex-1 ml-1`}
// //                     onPress={() => openTimePicker(index, 'breaks', brkIndex, 'end')}
// //                   >
// //                     <Text>{brk.end ? `End: ${brk.end}` : 'Set End'}</Text>
// //                   </TouchableOpacity>

// //                   {item.breaks.length > 1 && (
// //                     <TouchableOpacity
// //                       onPress={() => removeBreak(index, brkIndex)}
// //                       style={tw`bg-red-500 px-3 py-1 rounded ml-2`}
// //                     >
// //                       <Text style={tw`text-white`}>−</Text>
// //                     </TouchableOpacity>
// //                   )}
// //                 </View>
// //               </View>
// //             ))}

// //             <TouchableOpacity
// //               onPress={() => addBreak(index)}
// //               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
// //             >
// //               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
// //             </TouchableOpacity>

// //             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
// //               <Picker
// //                 selectedValue={item.mode}
// //                 onValueChange={(val) => handleChange(index, 'mode', val)}
// //               >
// //                 <Picker.Item label="Select Mode" value="" />
// //                 <Picker.Item label="Online" value="online" />
// //                 <Picker.Item label="Offline" value="offline" />
// //                 <Picker.Item label="Hybrid" value="hybrid" />
// //               </Picker>
// //             </View>

// //             <TouchableOpacity
// //               onPress={() => handleSubmitDay(index)}
// //               style={tw`bg-green-600 py-2 rounded-lg mt-2`}
// //             >
// //               <Text style={tw`text-white text-center font-semibold`}>
// //                 Save {item.day.charAt(0).toUpperCase() + item.day.slice(1)} Schedule
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         ))}
// //       </ScrollView>

// //       {timePicker.visible && (
// //         <DateTimePicker
// //           value={new Date()}
// //           mode="time"
// //           is24Hour={true}
// //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //           onChange={onTimeChange}
// //         />
// //       )}
// //     </SafeAreaView>
// //   );
// // };

// // export default AppointmentManagementScreen;



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import tw from 'twrnc';
// import DoctorHeader from '../components/DoctorHeader';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AppointmentManagementScreen = () => {
//   const [schedule, setSchedule] = useState([]);
//   const [consultationFee, setConsultationFee] = useState('');
//   const [experienceYears, setExperienceYears] = useState('');
//   const [appointmentSlot, setAppointmentSlot] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [timePicker, setTimePicker] = useState({
//     visible: false,
//     dayIndex: null,
//     field: '',
//     breakIndex: null,
//     breakField: null,
//   });

//   const fetchDoctorData = async () => {
//     try {
//       const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
//       const data = await response.json();

//       if (response.ok && data?.userData?.doctorProfile) {
//         const doctor = data.userData.doctorProfile;
//         setConsultationFee(String(doctor.consultation_fee || ''));
//         setExperienceYears(String(doctor.experience_years || ''));
//         setAppointmentSlot(String(doctor.appointment_slot || ''));

//         const parsedSchedule = doctor.availability_schedule
//           ? JSON.parse(doctor.availability_schedule)
//           : [];

//         const defaultDays = [
//           'monday',
//           'tuesday',
//           'wednesday',
//           'thursday',
//           'friday',
//           'saturday',
//           'sunday',
//         ];

//         const fullSchedule = defaultDays.map((day) => {
//           const existing = parsedSchedule.find((d) => d.day === day);
//           if (existing) {
//             existing.breaks = (existing.breaks || []).map((br) => {
//               const [start, end] = br.split('-');
//               return { start: start || '', end: end || '' };
//             });
//             return existing;
//           }
//           return { day, loginTime: '', logoutTime: '', breaks: [{ start: '', end: '' }], mode: '' };
//         });

//         setSchedule(fullSchedule);
//       } else {
//         Alert.alert('Error', 'Unable to fetch doctor details.');
//       }
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctorData();
//   }, []);

//   const formatTime = (date) => date.toTimeString().slice(0, 5);

//   const handleChange = (index, field, value) => {
//     const updated = [...schedule];
//     updated[index][field] = value;
//     setSchedule(updated);
//   };

//   const addBreak = (dayIndex) => {
//     const updated = [...schedule];
//     updated[dayIndex].breaks.push({ start: '', end: '' });
//     setSchedule(updated);
//   };

//   const removeBreak = (dayIndex, breakIndex) => {
//     const updated = [...schedule];
//     updated[dayIndex].breaks.splice(breakIndex, 1);
//     setSchedule(updated);
//   };

//   const openTimePicker = (dayIndex, field, breakIndex = null, breakField = null) => {
//     setTimePicker({ visible: true, dayIndex, field, breakIndex, breakField });
//   };

//   const onTimeChange = (event, selectedDate) => {
//     if (event.type === 'dismissed') {
//       setTimePicker({
//         visible: false,
//         dayIndex: null,
//         field: '',
//         breakIndex: null,
//         breakField: null,
//       });
//       return;
//     }

//     const { dayIndex, field, breakIndex, breakField } = timePicker;
//     const time = formatTime(selectedDate);
//     const updated = [...schedule];

//     if (breakIndex !== null) {
//       updated[dayIndex].breaks[breakIndex][breakField] = time;
//     } else {
//       updated[dayIndex][field] = time;
//     }

//     setSchedule(updated);
//     setTimePicker({
//       visible: false,
//       dayIndex: null,
//       field: '',
//       breakIndex: null,
//       breakField: null,
//     });
//   };

//   // ✅ Validate before sending
//   const validateSchedule = (schedules) => {
//     for (const day of schedules) {
//       if (
//         day.loginTime &&
//         day.logoutTime &&
//         day.mode &&
//         day.breaks.some((b) => !b.start || !b.end)
//       ) {
//         Alert.alert('Incomplete', `Please set all break times for ${day.day}.`);
//         return false;
//       }
//     }

//     if (!consultationFee || !experienceYears || !appointmentSlot) {
//       Alert.alert('Missing Info', 'Please fill consultation fee, experience years, and slot.');
//       return false;
//     }

//     return true;
//   };

//   const handleSubmitAll = async () => {
//     if (!validateSchedule(schedule)) return;

//     const formattedSchedule = schedule.map((day) => ({
//       day: day.day,
//       loginTime: day.loginTime,
//       logoutTime: day.logoutTime,
//       breaks: day.breaks
//         .filter((b) => b.start && b.end)
//         .map((b) => `${b.start}-${b.end}`),
//       mode: day.mode,
//     }));

//     const payload = {
//       availability_schedule: formattedSchedule,
//       consultation_fee: Number(consultationFee),
//       experience_years: Number(experienceYears),
//       appointment_slot: Number(appointmentSlot),
//     };

//     try {
//       const response = await fetch(
//         'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
//         {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         }
//       );

//       const resText = await response.text();

//       if (response.ok) {
//         Alert.alert('Success', 'Full weekly schedule saved successfully!');
//         fetchDoctorData();
//       } else {
//         Alert.alert('Error', resText || 'Invalid format or missing fields.');
//       }
//     } catch (err) {
//       Alert.alert('Error', err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={tw`flex-1 items-center justify-center`}>
//         <ActivityIndicator size="large" color="#059669" />
//         <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="#059669" barStyle="light-content" />
//       <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

//       <ScrollView style={tw`p-4`}>
//         <Text style={tw`text-lg text-green-800 font-bold mb-4`}>
//           Set Your Weekly Schedule
//         </Text>

//         {schedule.map((item, index) => (
//           <View key={item.day} style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
//             <Text style={tw`text-green-700 font-bold mb-2 capitalize`}>
//               {item.day}
//             </Text>

//             <TouchableOpacity
//               style={tw`border border-green-300 p-2 rounded mb-2`}
//               onPress={() => openTimePicker(index, 'loginTime')}
//             >
//               <Text>
//                 {item.loginTime ? `Login Time: ${item.loginTime}` : 'Set Login Time'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={tw`border border-green-300 p-2 rounded mb-2`}
//               onPress={() => openTimePicker(index, 'logoutTime')}
//             >
//               <Text>
//                 {item.logoutTime ? `Logout Time: ${item.logoutTime}` : 'Set Logout Time'}
//               </Text>
//             </TouchableOpacity>

//             <Text style={tw`text-sm text-green-600 mb-1`}>Breaks:</Text>
//             {item.breaks.map((brk, brkIndex) => (
//               <View key={brkIndex} style={tw`flex-row items-center mb-2 justify-between`}>
//                 <TouchableOpacity
//                   style={tw`border border-green-300 p-2 rounded flex-1 mr-1`}
//                   onPress={() => openTimePicker(index, 'breaks', brkIndex, 'start')}
//                 >
//                   <Text>{brk.start ? `Start: ${brk.start}` : 'Set Start'}</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={tw`border border-green-300 p-2 rounded flex-1 ml-1`}
//                   onPress={() => openTimePicker(index, 'breaks', brkIndex, 'end')}
//                 >
//                   <Text>{brk.end ? `End: ${brk.end}` : 'Set End'}</Text>
//                 </TouchableOpacity>

//                 {item.breaks.length > 1 && (
//                   <TouchableOpacity
//                     onPress={() => removeBreak(index, brkIndex)}
//                     style={tw`bg-red-500 px-3 py-1 rounded ml-2`}
//                   >
//                     <Text style={tw`text-white`}>−</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             ))}

//             <TouchableOpacity
//               onPress={() => addBreak(index)}
//               style={tw`bg-green-100 border border-green-400 px-3 py-1 rounded mb-2`}
//             >
//               <Text style={tw`text-green-700 text-center`}>+ Add Break</Text>
//             </TouchableOpacity>

//             <View style={tw`border border-green-300 rounded mb-2 bg-green-50`}>
//               <Picker
//                 selectedValue={item.mode}
//                 onValueChange={(val) => handleChange(index, 'mode', val)}
//               >
//                 <Picker.Item label="Select Mode" value="" />
//                 <Picker.Item label="Online" value="online" />
//                 <Picker.Item label="Offline" value="offline" />
//                 <Picker.Item label="Hybrid" value="hybrid" />
//               </Picker>
//             </View>
//           </View>
//         ))}

//         <TouchableOpacity
//           onPress={handleSubmitAll}
//           style={tw`bg-green-600 py-3 rounded-lg mt-4`}
//         >
//           <Text style={tw`text-white text-center font-semibold text-lg`}>
//             Save Full Weekly Schedule
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {timePicker.visible && (
//         <DateTimePicker
//           value={new Date()}
//           mode="time"
//           is24Hour={true}
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={onTimeChange}
//         />
//       )}
//     </SafeAreaView>
//   );
// };

// export default AppointmentManagementScreen;


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import tw from 'twrnc';
import DoctorHeader from '../components/DoctorHeader';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentManagementScreen = () => {
  const [schedule, setSchedule] = useState([]);
  const [consultationFee, setConsultationFee] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [appointmentSlot, setAppointmentSlot] = useState('');
  const [loading, setLoading] = useState(true);
  const [timePicker, setTimePicker] = useState({
    visible: false,
    dayIndex: null,
    field: '',
    breakIndex: null,
    breakField: null,
  });

  const fetchDoctorData = async () => {
    try {
      const response = await fetch('https://landing.docapp.co.in/api/auth/get-user-data');
      const data = await response.json();

      if (response.ok && data?.userData?.doctorProfile) {
        const doctor = data.userData.doctorProfile;
        // Note: example uses "consultation_fee", "experience_years", "appointment_slot"
        setConsultationFee(String(doctor.consultation_fee ?? ''));
        setExperienceYears(String(doctor.experience_years ?? ''));
        setAppointmentSlot(String(doctor.appointment_slot ?? ''));

        const parsedSchedule = doctor.availability_schedule
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
          const existing = parsedSchedule.find((d) => d.day === day);
          if (existing) {
            existing.breaks = (existing.breaks || []).map((br) => {
              const [start, end] = (br || '').split('-');
              return { start: start || '', end: end || '' };
            });
            // ensure login/logout/mode keys exist
            return {
              day: existing.day,
              loginTime: existing.loginTime ?? '',
              logoutTime: existing.logoutTime ?? '',
              breaks: existing.breaks.length ? existing.breaks : [{ start: '', end: '' }],
              mode: existing.mode ?? '',
            };
          }
          return { day, loginTime: '', logoutTime: '', breaks: [{ start: '', end: '' }], mode: '' };
        });

        setSchedule(fullSchedule);
      } else {
        Alert.alert('Error', 'Unable to fetch doctor details.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, []);

  const formatTime = (date) => date.toTimeString().slice(0, 5);

  const handleChange = (index, field, value) => {
    const updated = [...schedule];
    updated[index][field] = value;
    setSchedule(updated);
  };

  const addBreak = (dayIndex) => {
    const updated = [...schedule];
    updated[dayIndex].breaks.push({ start: '', end: '' });
    setSchedule(updated);
  };

  const removeBreak = (dayIndex, breakIndex) => {
    const updated = [...schedule];
    updated[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(updated);
  };

  const openTimePicker = (dayIndex, field, breakIndex = null, breakField = null) => {
    setTimePicker({ visible: true, dayIndex, field, breakIndex, breakField });
  };

  const onTimeChange = (event, selectedDate) => {
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
    const time = formatTime(selectedDate);
    const updated = [...schedule];

    if (breakIndex !== null) {
      updated[dayIndex].breaks[breakIndex][breakField] = time;
    } else {
      updated[dayIndex][field] = time;
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

  const validateSchedule = (schedules) => {
    // Ensure numeric fields are present
    if (!consultationFee || isNaN(Number(consultationFee))) {
      Alert.alert('Missing/Invalid', 'Please enter a valid consultation fee.');
      return false;
    }
    if (!experienceYears || isNaN(Number(experienceYears))) {
      Alert.alert('Missing/Invalid', 'Please enter valid experience (years).');
      return false;
    }
    if (!appointmentSlot || isNaN(Number(appointmentSlot))) {
      Alert.alert('Missing/Invalid', 'Please enter a valid appointment slot (minutes).');
      return false;
    }

    // Validate each day: if any time is set, ensure both login & logout are set; breaks should be full if present
    for (const day of schedules) {
      const anyTimeSet = day.loginTime || day.logoutTime || day.breaks.some((b) => b.start || b.end) || day.mode;
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

  const handleSubmitAll = async () => {
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
      consultation_fee: Number(consultationFee),
      experience_years: Number(experienceYears),
      appointment_slot: Number(appointmentSlot),
    };

    // helpful: log payload to debug in dev
    // console.log('Payload ->', JSON.stringify(payload, null, 2));

    try {
      const response = await fetch(
        'https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const resText = await response.text();

      if (response.ok) {
        Alert.alert('Success', 'Full weekly schedule saved successfully!');
        fetchDoctorData();
      } else {
        Alert.alert('Error', resText || 'Invalid format or missing fields.');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={tw`text-green-700 mt-2`}>Loading Doctor Data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />
      <DoctorHeader title="APPOINTMENT MANAGEMENT" showDoctorInfo />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={tw`flex-1`}>
        <ScrollView style={tw`p-4`}>
          <Text style={tw`text-lg text-green-800 font-bold mb-4`}>Doctor Info</Text>

          <View style={tw`bg-white p-4 mb-4 rounded-2xl shadow`}>
            <Text style={tw`text-sm text-green-700 mb-2 font-semibold`}>Consultation Fee (₹)</Text>
            <TextInput
              value={consultationFee}
              onChangeText={setConsultationFee}
              keyboardType="numeric"
              placeholder="e.g., 540"
              style={tw`border border-green-200 p-2 rounded mb-3`}
            />

            <Text style={tw`text-sm text-green-700 mb-2 font-semibold`}>Experience (years)</Text>
            <TextInput
              value={experienceYears}
              onChangeText={setExperienceYears}
              keyboardType="numeric"
              placeholder="e.g., 2"
              style={tw`border border-green-200 p-2 rounded mb-3`}
            />

            <Text style={tw`text-sm text-green-700 mb-2 font-semibold`}>Appointment Slot (minutes)</Text>
            <TextInput
              value={appointmentSlot}
              onChangeText={setAppointmentSlot}
              keyboardType="numeric"
              placeholder="e.g., 30"
              style={tw`border border-green-200 p-2 rounded`}
            />
          </View>

          <Text style={tw`text-lg text-green-800 font-bold mb-4`}>Set Your Weekly Schedule</Text>

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
