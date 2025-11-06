
// // import React, { useState, useEffect } from 'react';
// // import { View, ScrollView, TouchableOpacity, Platform, TextInput, Modal, ActivityIndicator, FlatList } from 'react-native';
// // import { Text, Button, Card, IconButton } from 'react-native-paper';
// // import DateTimePicker from '@react-native-community/datetimepicker';
// // import LinearGradient from 'react-native-linear-gradient';
// // import tw from 'twrnc';
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// // // TypeScript interfaces
// // interface AvailabilitySlot {
// //   day: string;
// //   loginTime?: string;
// //   logoutTime?: string;
// //   breaks?: string[];
// //   mode?: string;
// // }

// // interface Slot {
// //   date: string;
// //   day: string;
// //   mode: string;
// //   slots: { start: string; end: string }[];
// // }

// // interface UserData {
// //   id: number;
// //   username: string;
// //   role: string;
// // }

// // const DoctorConsultScreen: React.FC = () => {
// //   const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
// //   const [showTimePicker, setShowTimePicker] = useState<'start' | 'end' | null>(null);
// //   const [selectedStartTime, setSelectedStartTime] = useState(new Date());
// //   const [selectedEndTime, setSelectedEndTime] = useState(new Date());
// //   const [slots, setSlots] = useState<Slot[]>([]);
// //   const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilitySlot[]>([
// //     { day: 'monday', loginTime: '09:00', logoutTime: '17:00', breaks: ['12:00-12:30'], mode: 'online' },
// //     { day: 'tuesday', loginTime: '10:00', logoutTime: '16:00', breaks: ['13:00-13:45'], mode: 'offline' },
// //     { day: 'wednesday', loginTime: '08:30', logoutTime: '18:00', breaks: ['12:30-13:00', '15:30-15:45'], mode: 'online' },
// //     { day: 'thursday', loginTime: '09:00', logoutTime: '15:00', breaks: ['11:30-12:00'], mode: 'hybrid' },
// //     { day: 'friday', loginTime: '10:00', logoutTime: '14:00', breaks: ['12:00-12:15'], mode: 'offline' },
// //     { day: 'saturday', loginTime: '11:00', logoutTime: '13:00', breaks: [], mode: 'online' },
// //     { day: 'sunday', mode: '' },
// //   ]);
// //   const [doctorName, setDoctorName] = useState('');
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [success, setSuccess] = useState<string | null>(null);
// //   const [modalVisible, setModalVisible] = useState(false);
// //   const [newSlotDay, setNewSlotDay] = useState('');
// //   const [newSlotLoginTime, setNewSlotLoginTime] = useState('');
// //   const [newSlotLogoutTime, setNewSlotLogoutTime] = useState('');
// //   const [newSlotBreaks, setNewSlotBreaks] = useState('');
// //   const [newSlotMode, setNewSlotMode] = useState('');

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         // Fetch user data
// //         const userResponse = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: { Accept: 'application/json' },
// //         });
// //         if (!userResponse.ok) {
// //           throw new Error(`User data fetch failed: ${userResponse.status} ${userResponse.statusText}`);
// //         }
// //         const userData: { message: string; userData: UserData } = await userResponse.json();
// //         if (userData.message === 'succesfully fetched the user details' && userData.userData.role === 'doctor') {
// //           setDoctorName(`Dr. ${userData.userData.username}`);
// //         } else {
// //           throw new Error('User is not a doctor or invalid response');
// //         }

// //         // Fetch slots for the doctor
// //         const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${userData.userData.id}`, {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: { Accept: 'application/json' },
// //         });
// //         if (!slotsResponse.ok) {
// //           throw new Error(`Slots fetch failed: ${slotsResponse.status} ${slotsResponse.statusText}`);
// //         }
// //         const slotsData: { message: string; slots: { slots: string }[] } = await slotsResponse.json();
// //         if (slotsData.message === 'Succesfully fetched all the slots for the doctor' && slotsData.slots[0]?.slots) {
// //           const parsedSlots: Slot[] = JSON.parse(slotsData.slots[0].slots).filter(
// //             (slot: Slot) => new Date(slot.date) >= new Date('2025-07-18')
// //           );
// //           setSlots(parsedSlots);
// //         } else {
// //           throw new Error('Invalid slots response');
// //         }

// //         setLoading(false);
// //       } catch (err: any) {
// //         console.error('Error fetching data:', err);
// //         setError(`Failed to load data: ${err.message}. Please check your network or authentication.`);
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   // Get available dates for horizontal scrolling
// //   const availableDates = Array.from(new Set(slots.map((slot) => slot.date))).sort();

// //   // Filter and sort slots for the selected date
// //   const filteredSlots = slots
// //     .filter((slot) => slot.date === selectedDate)
// //     .sort((a, b) => {
// //       const order = { online: 1, offline: 2, hybrid: 3 };
// //       return order[a.mode] - order[b.mode];
// //     });

// //   const handleDateSelect = (date: string) => {
// //     setSelectedDate(date);
// //     setError(null);
// //   };

// //   const handleTimeChange = (event: any, time?: Date, type?: 'start' | 'end') => {
// //     setShowTimePicker(null);
// //     if (time && type) {
// //       if (type === 'start') {
// //         setSelectedStartTime(time);
// //       } else {
// //         setSelectedEndTime(time);
// //       }
// //     }
// //   };

// //   const handleUpdateAvailability = async () => {
// //     try {
// //       setLoading(true);
// //       const availabilityData = {
// //         availability_schedule: availabilitySchedule,
// //         consultation_fee: 540,
// //         experience_years: 2,
// //         appointment_slot: 30,
// //       };

// //       const response = await fetch('https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info', {
// //         method: 'PUT',
// //         credentials: 'include',
// //         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
// //         body: JSON.stringify(availabilityData),
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Update availability failed: ${response.status} ${response.statusText}`);
// //       }
// //       const result = await response.json();
// //       if (result.success) {
// //         setSuccess('Availability updated successfully!');
// //         setTimeout(() => setSuccess(null), 3000);
// //         setModalVisible(false);
// //         // Refresh slots
// //         const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${result.userData?.id || '21'}`, {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: { Accept: 'application/json' },
// //         });
// //         if (slotsResponse.ok) {
// //           const slotsData = await slotsResponse.json();
// //           if (slotsData.slots[0]?.slots) {
// //             setSlots(JSON.parse(slotsData.slots[0].slots).filter((slot: Slot) => new Date(slot.date) >= new Date('2025-07-18')));
// //           }
// //         }
// //       } else {
// //         throw new Error('Invalid update response');
// //       }
// //     } catch (err: any) {
// //       console.error('Error updating availability:', err);
// //       setError(`Failed to update availability: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddSlot = () => {
// //     if (!newSlotDay || !newSlotLoginTime || !newSlotLogoutTime || !newSlotMode) {
// //       setError('Please fill all required fields for the new slot');
// //       return;
// //     }

// //     // Validate time format (HH:mm)
// //     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
// //     if (!timeRegex.test(newSlotLoginTime) || !timeRegex.test(newSlotLogoutTime)) {
// //       setError('Invalid time format. Use HH:mm (e.g., 09:00)');
// //       return;
// //     }

// //     // Validate day
// //     const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
// //     if (!validDays.includes(newSlotDay.toLowerCase())) {
// //       setError('Invalid day. Choose from: monday, tuesday, wednesday, thursday, friday, saturday, sunday');
// //       return;
// //     }

// //     // Validate mode
// //     const validModes = ['online', 'offline', 'hybrid', ''];
// //     if (!validModes.includes(newSlotMode.toLowerCase())) {
// //       setError('Invalid mode. Choose from: online, offline, hybrid');
// //       return;
// //     }

// //     // Validate breaks
// //     const breaksArray = newSlotBreaks ? newSlotBreaks.split(',').map((b) => b.trim()) : [];
// //     for (const b of breaksArray) {
// //       if (!b.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
// //         setError('Invalid break format. Use HH:mm-HH:mm (e.g., 12:00-12:30)');
// //         return;
// //       }
// //     }

// //     const newSlot: AvailabilitySlot = {
// //       day: newSlotDay.toLowerCase(),
// //       loginTime: newSlotLoginTime,
// //       logoutTime: newSlotLogoutTime,
// //       breaks: breaksArray,
// //       mode: newSlotMode.toLowerCase(),
// //     };

// //     setAvailabilitySchedule((prev) =>
// //       prev.map((slot) => (slot.day === newSlot.day ? newSlot : slot))
// //     );
// //     setNewSlotDay('');
// //     setNewSlotLoginTime('');
// //     setNewSlotLogoutTime('');
// //     setNewSlotBreaks('');
// //     setNewSlotMode('');
// //     handleUpdateAvailability();
// //   };

// //   const handleCreateAppointment = async () => {
// //     try {
// //       setLoading(true);
// //       const dayOfWeek = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
// //       const schedule = availabilitySchedule.find((s) => s.day === dayOfWeek);
// //       if (!schedule || !schedule.mode) {
// //         setError(`No availability on ${dayOfWeek}`);
// //         return;
// //       }

// //       const startTime = selectedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
// //       const endTime = new Date(selectedStartTime.getTime() + 30 * 60000).toLocaleTimeString([], {
// //         hour: '2-digit',
// //         minute: '2-digit',
// //         hour12: false,
// //       });

// //       const appointmentData = {
// //         doctor_id: slots[0]?.doctor_id || '21',
// //         date: selectedDate,
// //         start: startTime,
// //         end: endTime,
// //         type: schedule.mode === 'online' ? 'online_video' : 'in_person',
// //       };

// //       const response = await fetch('https://landing.docapp.co.in/api/appointment/create-appointment', {
// //         method: 'POST',
// //         credentials: 'include',
// //         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
// //         body: JSON.stringify(appointmentData),
// //       });
// //       if (!response.ok) {
// //         throw new Error(`Appointment creation failed: ${response.status} ${response.statusText}`);
// //       }
// //       const result = await response.json();
// //       if (result.success) {
// //         setSuccess('Appointment created successfully!');
// //         setTimeout(() => setSuccess(null), 3000);
// //         // Refresh slots
// //         const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${appointmentData.doctor_id}`, {
// //           method: 'GET',
// //           credentials: 'include',
// //           headers: { Accept: 'application/json' },
// //         });
// //         if (slotsResponse.ok) {
// //           const slotsData = await slotsResponse.json();
// //           if (slotsData.slots[0]?.slots) {
// //             setSlots(JSON.parse(slotsData.slots[0].slots).filter((slot: Slot) => new Date(slot.date) >= new Date('2025-07-18')));
// //           }
// //         }
// //       } else {
// //         throw new Error('Invalid appointment response');
// //       }
// //     } catch (err: any) {
// //       console.error('Error creating appointment:', err);
// //       setError(`Failed to create appointment: ${err.message}`);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const retryFetch = () => {
// //     setError(null);
// //     setLoading(true);
// //   };

// //   // Render horizontal date item
// //   const renderDateItem = ({ item }: { item: string }) => (
// //     <TouchableOpacity
// //       style={tw`${selectedDate === item ? 'bg-green-600' : 'bg-green-100'} rounded-xl p-3 mx-2`}
// //       onPress={() => handleDateSelect(item)}
// //     >
// //       <Text style={tw`${selectedDate === item ? 'text-white' : 'text-green-700'} font-bold`}>
// //         {new Date(item).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
// //       </Text>
// //     </TouchableOpacity>
// //   );

// //   // Render weekly availability item
// //   const renderWeeklyDay = ({ item }: { item: AvailabilitySlot }) => (
// //     <Card style={tw`bg-green-100 rounded-xl p-3 mx-2 w-40`}>
// //       <Text style={tw`text-green-700 font-bold`}>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</Text>
// //       <Text style={tw`text-green-600 text-sm`}>{item.mode ? item.mode.charAt(0).toUpperCase() + item.mode.slice(1) : 'Unavailable'}</Text>
// //       {item.loginTime && item.logoutTime ? (
// //         <>
// //           <Text style={tw`text-green-600 text-sm`}>{`${item.loginTime} - ${item.logoutTime}`}</Text>
// //           <Text style={tw`text-green-600 text-sm`}>Breaks: {item.breaks?.join(', ') || 'None'}</Text>
// //         </>
// //       ) : (
// //         <Text style={tw`text-green-600 text-sm`}>No schedule</Text>
// //       )}
// //     </Card>
// //   );

// //   if (loading) {
// //     return (
// //       <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
// //         <ActivityIndicator size="large" color="#ffffff" />
// //         <Text style={tw`text-white text-lg mt-4`}>Loading...</Text>
// //       </LinearGradient>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
// //         <Text style={tw`text-white text-lg text-center px-4`}>{error}</Text>
// //         <Button
// //           mode="contained"
// //           style={tw`mt-4 bg-green-600 rounded-2xl`}
// //           onPress={retryFetch}
// //         >
// //           <Text style={tw`text-white font-bold`}>Retry</Text>
// //         </Button>
// //       </LinearGradient>
// //     );
// //   }

// //   return (
// //     <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1`}>
// //       <ScrollView contentContainerStyle={tw`pb-8 px-4 pt-6`}>
// //         <View style={tw`items-center`}>
// //           <Text style={tw`text-3xl text-white font-bold mb-4`}>{doctorName}'s Dashboard</Text>
// //           <Button
// //             mode="contained"
// //             style={tw`bg-green-600 rounded-2xl mb-6 w-full max-w-[420px]`}
// //             onPress={() => setModalVisible(true)}
// //           >
// //             <Text style={tw`text-white font-bold text-base`}>Manage Availability</Text>
// //           </Button>
// //           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
// //             <Card.Content>
// //               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Available Dates</Text>
// //               {availableDates.length > 0 ? (
// //                 <FlatList
// //                   data={availableDates}
// //                   renderItem={renderDateItem}
// //                   keyExtractor={(item) => item}
// //                   horizontal
// //                   showsHorizontalScrollIndicator={false}
// //                   contentContainerStyle={tw`px-2`}
// //                 />
// //               ) : (
// //                 <Text style={tw`text-green-700 text-base`}>No available dates</Text>
// //               )}
// //             </Card.Content>
// //           </Card>
// //           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
// //             <Card.Content>
// //               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Weekly Availability</Text>
// //               <FlatList
// //                 data={availabilitySchedule}
// //                 renderItem={renderWeeklyDay}
// //                 keyExtractor={(item) => item.day}
// //                 horizontal
// //                 showsHorizontalScrollIndicator={false}
// //                 contentContainerStyle={tw`px-2`}
// //               />
// //             </Card.Content>
// //           </Card>
// //           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
// //             <Card.Content>
// //               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Slots for {selectedDate}</Text>
// //               {filteredSlots.length > 0 ? (
// //   <View style={tw`flex-row flex-wrap justify-between`}>
// //     {filteredSlots.map((daySlot, index) =>
// //       daySlot.slots.map((slot, slotIndex) => (
// //         <Card
// //           key={`${index}-${slotIndex}`}
// //           style={tw`bg-green-50 rounded-xl p-4 mb-3 w-[31%]`}
// //         >
// //          <View style={tw`flex-1`}>
// //   <Text style={tw`text-green-700 font-bold text-sm`}>
// //     {daySlot.mode.charAt(0).toUpperCase() + daySlot.mode.slice(1)}
// //   </Text>
// //   <Text style={tw`text-green-600 text-xs`}>
// //     {`${slot.start} - ${slot.end}`}
// //   </Text>
// // </View>
// //         </Card>
// //       ))
// //     )}
// //   </View>
// // ) : (
// //   <Text style={tw`text-green-700 text-base`}>No slots available for this date</Text>
// // )}
// //             </Card.Content>
// //           </Card>

// //         </View>
// //       </ScrollView>

// //       {/* Modal for Adding/Editing Slots */}
// //       <Modal
// //         animationType="slide"
// //         transparent={true}
// //         visible={modalVisible}
// //         onRequestClose={() => setModalVisible(false)}
// //       >
// //         <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
// //           <Card style={tw`w-11/12 max-w-[400px] bg-green-100 rounded-2xl p-4`}>
// //             <Card.Content>
// //               <View style={tw`flex-row justify-between items-center mb-4`}>
// //                 <Text style={tw`text-2xl text-green-700 font-bold`}>Add Availability Slot</Text>
// //                 <IconButton
// //                   icon="close"
// //                   color="#059669"
// //                   size={24}
// //                   onPress={() => setModalVisible(false)}
// //                 />
// //               </View>
// //               <TextInput
// //                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
// //                 placeholder="Day (e.g., monday)"
// //                 value={newSlotDay}
// //                 onChangeText={setNewSlotDay}
// //               />
// //               <TextInput
// //                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
// //                 placeholder="Login Time (e.g., 09:00)"
// //                 value={newSlotLoginTime}
// //                 onChangeText={setNewSlotLoginTime}
// //               />
// //               <TextInput
// //                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
// //                 placeholder="Logout Time (e.g., 17:00)"
// //                 value={newSlotLogoutTime}
// //                 onChangeText={setNewSlotLogoutTime}
// //               />
// //               <TextInput
// //                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
// //                 placeholder="Breaks (e.g., 12:00-12:30,13:00-13:30)"
// //                 value={newSlotBreaks}
// //                 onChangeText={setNewSlotBreaks}
// //               />
// //               <TextInput
// //                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
// //                 placeholder="Mode (online/offline/hybrid)"
// //                 value={newSlotMode}
// //                 onChangeText={setNewSlotMode}
// //               />
// //               <Button
// //                 mode="contained"
// //                 style={tw`bg-green-600 rounded-2xl mt-4`}
// //                 onPress={handleAddSlot}
// //               >
// //                 <Text style={tw`text-white font-bold text-base`}>Add Slot</Text>
// //               </Button>
// //             </Card.Content>
// //           </Card>
// //         </View>
// //       </Modal>

// //       {/* Success Toast */}
// //       {success && (
// //         <View style={tw`absolute bottom-10 w-full items-center`}>
// //           <Card style={tw`bg-green-600 rounded-xl p-3`}>
// //             <Text style={tw`text-white font-bold`}>{success}</Text>
// //           </Card>
// //         </View>
// //       )}

// //       {/* Time Pickers */}
// //       {showTimePicker && (
// //         <DateTimePicker
// //           value={showTimePicker === 'start' ? selectedStartTime : selectedEndTime}
// //           mode="time"
// //           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
// //           onChange={(event, time) => handleTimeChange(event, time, showTimePicker)}
// //           minuteInterval={30}
// //         />
// //       )}
// //     </LinearGradient>
// //   );
// // };

// // export default DoctorConsultScreen;



// import React, { useState, useEffect, useCallback } from 'react';
// import { View, ScrollView, TouchableOpacity, Platform, TextInput, Modal, ActivityIndicator, FlatList } from 'react-native';
// import { Text, Button, Card, IconButton } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import LinearGradient from 'react-native-linear-gradient';
// import tw from 'twrnc';
// // Note: MaterialIcons is imported but not used. You can remove it if not needed.
// // import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// // TypeScript interfaces
// interface AvailabilitySlot {
//   day: string;
//   loginTime?: string;
//   logoutTime?: string;
//   breaks?: string[];
//   mode?: string;
// }

// interface Slot {
//   date: string;
//   day: string;
//   mode: string;
//   slots: { start: string; end: string }[];
// }

// interface UserData {
//   id: number;
//   username: string;
//   role: string;
// }

// const DoctorConsultScreen: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
//   const [showTimePicker, setShowTimePicker] = useState<'start' | 'end' | null>(null);
//   const [selectedStartTime, setSelectedStartTime] = useState(new Date());
//   const [selectedEndTime, setSelectedEndTime] = useState(new Date());
//   const [slots, setSlots] = useState<Slot[]>([]);
//   const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilitySlot[]>([
//     { day: 'monday', loginTime: '09:00', logoutTime: '17:00', breaks: ['12:00-12:30'], mode: 'online' },
//     { day: 'tuesday', loginTime: '10:00', logoutTime: '16:00', breaks: ['13:00-13:45'], mode: 'offline' },
//     { day: 'wednesday', loginTime: '08:30', logoutTime: '18:00', breaks: ['12:30-13:00', '15:30-15:45'], mode: 'online' },
//     { day: 'thursday', loginTime: '09:00', logoutTime: '15:00', breaks: ['11:30-12:00'], mode: 'hybrid' },
//     { day: 'friday', loginTime: '10:00', logoutTime: '14:00', breaks: ['12:00-12:15'], mode: 'offline' },
//     { day: 'saturday', loginTime: '11:00', logoutTime: '13:00', breaks: [], mode: 'online' },
//     { day: 'sunday', mode: '' },
//   ]);
//   const [doctorName, setDoctorName] = useState('');
//   const [userId, setUserId] = useState<number | null>(null); // <-- Store user ID in state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [newSlotDay, setNewSlotDay] = useState('');
//   const [newSlotLoginTime, setNewSlotLoginTime] = useState('');
//   const [newSlotLogoutTime, setNewSlotLogoutTime] = useState('');
//   const [newSlotBreaks, setNewSlotBreaks] = useState('');
//   const [newSlotMode, setNewSlotMode] = useState('');

//   // Helper function to parse slots safely
//   const parseAndSetSlots = (slotsData: any) => {
//     if (slotsData.message === 'Succesfully fetched all the slots for the doctor' && slotsData.slots[0]?.slots) {
//       const parsedSlots: Slot[] = JSON.parse(slotsData.slots[0].slots).filter(
//         (slot: Slot) => new Date(slot.date) >= new Date('2025-07-18') // Date filter from original code
//       );
//       setSlots(parsedSlots);
//     } else if (slotsData.message === 'Succesfully fetched all the slots for the doctor') {
//       console.log('Successfully fetched, but no slots data found.');
//       setSlots([]); // Set to empty array if fetch is ok but no slots
//     } else {
//       throw new Error('Invalid slots response');
//     }
//   };

//   // Moved fetchData outside useEffect and wrapped in useCallback
//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Fetch user data
//       const userResponse = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
//         method: 'GET',
//         credentials: 'include',
//         headers: { Accept: 'application/json' },
//       });
//       if (!userResponse.ok) {
//         throw new Error(`User data fetch failed: ${userResponse.status} ${userResponse.statusText}`);
//       }
//       const userData: { message: string; userData: UserData } = await userResponse.json();
//       let fetchedUserId: number;
//       if (userData.message === 'succesfully fetched the user details' && userData.userData.role === 'doctor') {
//         setDoctorName(`Dr. ${userData.userData.username}`);
//         setUserId(userData.userData.id); // <-- Set user ID state
//         fetchedUserId = userData.userData.id; // <-- Use for immediate fetch
//       } else {
//         throw new Error('User is not a doctor or invalid response');
//       }

//       // Fetch slots for the doctor
//       const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${fetchedUserId}`, {
//         method: 'GET',
//         credentials: 'include',
//         headers: { Accept: 'application/json' },
//       });
//       if (!slotsResponse.ok) {
//         throw new Error(`Slots fetch failed: ${slotsResponse.status} ${slotsResponse.statusText}`);
//       }
//       const slotsData = await slotsResponse.json();
//       parseAndSetSlots(slotsData); // Use helper to parse
//     } catch (err: any) {
//       console.error('Error fetching data:', err);
//       setError(`Failed to load data: ${err.message}. Please check your network or authentication.`);
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Empty dependency array, this function is stable

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]); // Runs once on mount

//   // Get available dates for horizontal scrolling
//   const availableDates = Array.from(new Set(slots.map((slot) => slot.date))).sort();

//   // Filter and sort slots for the selected date
//   const filteredSlots = slots
//     .filter((slot) => slot.date === selectedDate)
//     .sort((a, b) => {
//       const order = { online: 1, offline: 2, hybrid: 3 };
//       return order[a.mode] - order[b.mode];
//     });

//   const handleDateSelect = (date: string) => {
//     setSelectedDate(date);
//     setError(null);
//   };

//   const handleTimeChange = (event: any, time?: Date, type?: 'start' | 'end') => {
//     setShowTimePicker(null);
//     if (time && type) {
//       if (type === 'start') {
//         setSelectedStartTime(time);
//       } else {
//         setSelectedEndTime(time);
//       }
//     }
//   };

//   const handleUpdateAvailability = async () => {
//     if (!userId) { // <-- Guard clause using state
//       setError('User ID not found. Cannot update availability.');
//       return;
//     }
//     try {
//       setLoading(true);
//       const availabilityData = {
//         availability_schedule: availabilitySchedule,
//         consultation_fee: 540,
//         experience_years: 2,
//         appointment_slot: 30,
//       };

//       const response = await fetch('https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info', {
//         method: 'PUT',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//         body: JSON.stringify(availabilityData),
//       });
//       if (!response.ok) {
//         throw new Error(`Update availability failed: ${response.status} ${response.statusText}`);
//       }
//       const result = await response.json();
//       if (result.success) {
//         setSuccess('Availability updated successfully!');
//         setTimeout(() => setSuccess(null), 3000);
//         setModalVisible(false);

//         // Refresh slots
//         const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${userId}`, { // <-- Use userId from state
//           method: 'GET',
//           credentials: 'include',
//           headers: { Accept: 'application/json' },
//         });
//         if (slotsResponse.ok) {
//           const slotsData = await slotsResponse.json();
//           parseAndSetSlots(slotsData); // Use helper to parse
//         }
//       } else {
//         throw new Error('Invalid update response');
//       }
//     } catch (err: any) {
//       console.error('Error updating availability:', err);
//       setError(`Failed to update availability: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddSlot = () => {
//     if (!newSlotDay || !newSlotLoginTime || !newSlotLogoutTime || !newSlotMode) {
//       setError('Please fill all required fields for the new slot');
//       return;
//     }

//     // Validate time format (HH:mm)
//     const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
//     if (!timeRegex.test(newSlotLoginTime) || !timeRegex.test(newSlotLogoutTime)) {
//       setError('Invalid time format. Use HH:mm (e.g., 09:00)');
//       return;
//     }

//     // Validate day
//     const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
//     if (!validDays.includes(newSlotDay.toLowerCase())) {
//       setError('Invalid day. Choose from: monday, tuesday, wednesday, thursday, friday, saturday, sunday');
//       return;
//     }

//     // Validate mode
//     const validModes = ['online', 'offline', 'hybrid', ''];
//     if (!validModes.includes(newSlotMode.toLowerCase())) {
//       setError('Invalid mode. Choose from: online, offline, hybrid, or blank (for unavailable)');
//       return;
//     }

//     // Validate breaks
//     const breaksArray = newSlotBreaks ? newSlotBreaks.split(',').map((b) => b.trim()) : [];
//     for (const b of breaksArray) {
//       if (b && !b.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
//         setError('Invalid break format. Use HH:mm-HH:mm (e.g., 12:00-12:30)');
//         return;
//       }
//     }

//     const newSlot: AvailabilitySlot = {
//       day: newSlotDay.toLowerCase(),
//       loginTime: newSlotLoginTime,
//       logoutTime: newSlotLogoutTime,
//       breaks: breaksArray.filter(b => b), // Filter out empty strings
//       mode: newSlotMode.toLowerCase(),
//     };

//     setAvailabilitySchedule((prev) =>
//       prev.map((slot) => (slot.day === newSlot.day ? newSlot : slot))
//     );
//     setNewSlotDay('');
//     setNewSlotLoginTime('');
//     setNewSlotLogoutTime('');
//     setNewSlotBreaks('');
//     setNewSlotMode('');
//     handleUpdateAvailability(); // This will close the modal on success
//   };

//   // This function is not currently called by any UI element
//   const handleCreateAppointment = async () => {
//     if (!userId) { // <-- Guard clause using state
//       setError('User ID not found. Cannot create appointment.');
//       return;
//     }
//     try {
//       setLoading(true);
//       const dayOfWeek = new Date(selectedDate).toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
//       const schedule = availabilitySchedule.find((s) => s.day === dayOfWeek);
//       if (!schedule || !schedule.mode) {
//         setError(`No availability on ${dayOfWeek}`);
//         setLoading(false); // <-- Stop loading if schedule not found
//         return;
//       }

//       const startTime = selectedStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
//       const endTime = new Date(selectedStartTime.getTime() + 30 * 60000).toLocaleTimeString([], {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: false,
//       });

//       const appointmentData = {
//         doctor_id: userId, // <-- Use userId from state
//         date: selectedDate,
//         start: startTime,
//         end: endTime,
//         type: schedule.mode === 'online' ? 'online_video' : 'in_person',
//       };

//       const response = await fetch('https://landing.docapp.co.in/api/appointment/create-appointment', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
//         body: JSON.stringify(appointmentData),
//       });
//       if (!response.ok) {
//         throw new Error(`Appointment creation failed: ${response.status} ${response.statusText}`);
//       }
//       const result = await response.json();
//       if (result.success) {
//         setSuccess('Appointment created successfully!');
//         setTimeout(() => setSuccess(null), 3000);
//         // Refresh slots
//         const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${userId}`, { // <-- Use userId from state
//           method: 'GET',
//           credentials: 'include',
//           headers: { Accept: 'application/json' },
//         });
//         if (slotsResponse.ok) {
//           const slotsData = await slotsResponse.json();
//           parseAndSetSlots(slotsData); // Use helper to parse
//         }
//       } else {
//         throw new Error('Invalid appointment response');
//       }
//     } catch (err: any) {
//       console.error('Error creating appointment:', err);
//       setError(`Failed to create appointment: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fixed retryFetch to call the refactored fetchData
//   const retryFetch = () => {
//     fetchData();
//   };

//   // Render horizontal date item
//   const renderDateItem = ({ item }: { item: string }) => (
//     <TouchableOpacity
//       style={tw`${selectedDate === item ? 'bg-green-600' : 'bg-green-100'} rounded-xl p-3 mx-2`}
//       onPress={() => handleDateSelect(item)}
//     >
//       <Text style={tw`${selectedDate === item ? 'text-white' : 'text-green-700'} font-bold`}>
//         {new Date(item).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//       </Text>
//     </TouchableOpacity>
//   );

//   // Render weekly availability item
//   const renderWeeklyDay = ({ item }: { item: AvailabilitySlot }) => (
//     <Card style={tw`bg-green-100 rounded-xl p-3 mx-2 w-40`}>
//       <Text style={tw`text-green-700 font-bold`}>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</Text>
//       <Text style={tw`text-green-600 text-sm`}>{item.mode ? item.mode.charAt(0).toUpperCase() + item.mode.slice(1) : 'Unavailable'}</Text>
//       {item.loginTime && item.logoutTime ? (
//         <>
//           <Text style={tw`text-green-600 text-sm`}>{`${item.loginTime} - ${item.logoutTime}`}</Text>
//           <Text style={tw`text-green-600 text-sm`}>Breaks: {item.breaks?.join(', ') || 'None'}</Text>
//         </>
//       ) : (
//         <Text style={tw`text-green-600 text-sm`}>No schedule</Text>
//       )}
//     </Card>
//   );

//   if (loading && !slots.length) { // Only show full-screen loader on initial load
//     return (
//       <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#ffffff" />
//         <Text style={tw`text-white text-lg mt-4`}>Loading...</Text>
//       </LinearGradient>
//     );
//   }

//   if (error && !slots.length) { // Only show full-screen error if no data is present
//     return (
//       <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
//         <Text style={tw`text-white text-lg text-center px-4`}>{error}</Text>
//         <Button
//           mode="contained"
//           style={tw`mt-4 bg-green-600 rounded-2xl`}
//           onPress={retryFetch} // <-- This now correctly calls fetchData
//         >
//           <Text style={tw`text-white font-bold`}>Retry</Text>
//         </Button>
//       </LinearGradient>
//     );
//   }

//   return (
//     <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1`}>
//       <ScrollView contentContainerStyle={tw`pb-8 px-4 pt-6`}>
//         <View style={tw`items-center`}>
//           <Text style={tw`text-3xl text-white font-bold mb-4`}>{doctorName}'s Dashboard</Text>
//           <Button
//             mode="contained"
//             style={tw`bg-green-600 rounded-2xl mb-6 w-full max-w-[420px]`}
//             onPress={() => setModalVisible(true)}
//             disabled={loading} // Disable button while loading
//           >
//             <Text style={tw`text-white font-bold text-base`}>Manage Availability</Text>
//           </Button>

//           {/* Show inline error if fetching failed but we still have old data */}
//           {error && slots.length > 0 && (
//              <Text style={tw`text-red-100 text-base text-center px-4 mb-4`}>{error}</Text>
//           )}

//           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
//             <Card.Content>
//               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Available Dates</Text>
//               {availableDates.length > 0 ? (
//                 <FlatList
//                   data={availableDates}
//                   renderItem={renderDateItem}
//                   keyExtractor={(item) => item}
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                   contentContainerStyle={tw`px-2`}
//                 />
//               ) : (
//                 <Text style={tw`text-green-700 text-base`}>No available dates</Text>
//               )}
//             </Card.Content>
//           </Card>
//           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
//             <Card.Content>
//               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Weekly Availability</Text>
//               <FlatList
//                 data={availabilitySchedule}
//                 renderItem={renderWeeklyDay}
//                 keyExtractor={(item) => item.day}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={tw`px-2`}
//               />
//             </Card.Content>
//           </Card>
//           <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
//             <Card.Content>
//               <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Slots for {selectedDate}</Text>
//               {filteredSlots.length > 0 ? (
//                 <View style={tw`flex-row flex-wrap justify-between`}>
//                   {filteredSlots.map((daySlot, index) =>
//                     daySlot.slots.map((slot, slotIndex) => (
//                       <Card
//                         key={`${index}-${slotIndex}`}
//                         style={tw`bg-green-50 rounded-xl p-4 mb-3 w-[31%]`}
//                       >
//                         <View style={tw`flex-1`}>
//                           <Text style={tw`text-green-700 font-bold text-sm`}>
//                             {daySlot.mode.charAt(0).toUpperCase() + daySlot.mode.slice(1)}
//                           </Text>
//                           <Text style={tw`text-green-600 text-xs`}>
//                             {`${slot.start} - ${slot.end}`}
//                           </Text>
//                         </View>
//                       </Card>
//                     ))
//                   )}
//                 </View>
//               ) : (
//                 <Text style={tw`text-green-700 text-base`}>No slots available for this date</Text>
//               )}
//             </Card.Content>
//           </Card>

//         </View>
//       </ScrollView>

//       {/* Modal for Adding/Editing Slots */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
//           <Card style={tw`w-11/12 max-w-[400px] bg-green-100 rounded-2xl p-4`}>
//             <Card.Content>
//               <View style={tw`flex-row justify-between items-center mb-4`}>
//                 <Text style={tw`text-2xl text-green-700 font-bold`}>Add Availability Slot</Text>
//                 <IconButton
//                   icon="close"
//                   color="#059669"
//                   size={24}
//                   onPress={() => setModalVisible(false)}
//                 />
//               </View>
//               <TextInput
//                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
//                 placeholder="Day (e.g., monday)"
//                 placeholderTextColor="#34d399"
//                 value={newSlotDay}
//                 onChangeText={setNewSlotDay}
//               />
//               <TextInput
//                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
//                 placeholder="Login Time (HH:mm)"
//                 placeholderTextColor="#34d399"
//                 value={newSlotLoginTime}
//                 onChangeText={setNewSlotLoginTime}
//               />
//               <TextInput
//                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
//                 placeholder="Logout Time (HH:mm)"
//                 placeholderTextColor="#34d399"
//                 value={newSlotLogoutTime}
//                 onChangeText={setNewSlotLogoutTime}
//               />
//               <TextInput
//                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
//                 placeholder="Breaks (e.g., 12:00-12:30,13:00-13:30)"
//                 placeholderTextColor="#34d399"
//                 value={newSlotBreaks}
//                 onChangeText={setNewSlotBreaks}
//               />
//               <TextInput
//                 style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
//                 placeholder="Mode (online/offline/hybrid)"
//                 placeholderTextColor="#34d399"
//                 value={newSlotMode}
//                 onChangeText={setNewSlotMode}
//               />
//               <Button
//                 mode="contained"
//                 style={tw`bg-green-600 rounded-2xl mt-4`}
//                 onPress={handleAddSlot}
//                 disabled={loading}
//               >
//                 {loading ? (
//                    <ActivityIndicator size="small" color="#ffffff" />
//                 ) : (
//                   <Text style={tw`text-white font-bold text-base`}>Add Slot</Text>
//                 )}
//               </Button>
//             </Card.Content>
//           </Card>
//         </View>
//       </Modal>

//       {/* Success Toast */}
//       {success && (
//         <View style={tw`absolute bottom-10 w-full items-center`}>
//           <Card style={tw`bg-green-600 rounded-xl p-3`}>
//             <Text style={tw`text-white font-bold`}>{success}</Text>
//           </Card>
//         </View>
//       )}

//       {/* Time Pickers (for unused handleCreateAppointment function) */}
//       {showTimePicker && (
//         <DateTimePicker
//           value={showTimePicker === 'start' ? selectedStartTime : selectedEndTime}
//           mode="time"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(event, time) => handleTimeChange(event, time, showTimePicker)}
//           minuteInterval={30}
//         />
//       )}

//       {/* Inline loading indicator for updates */}
//       {loading && slots.length > 0 && (
//          <View style={tw`absolute top-1/2 left-1/2 -ml-5 -mt-5`}>
//             <ActivityIndicator size="large" color="#ffffff" />
//          </View>
//       )}
//     </LinearGradient>
//   );
// };

// export default DoctorConsultScreen;


import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Platform, TextInput, Modal, ActivityIndicator, FlatList } from 'react-native';
import { Text, Button, Card, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import tw from 'twrnc';
// Note: MaterialIcons is imported but not used. You can remove it if not needed.
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// TypeScript interfaces
interface AvailabilitySlot {
  day: string;
  loginTime?: string;
  logoutTime?: string;
  breaks?: string[];
  mode?: string;
}

interface Slot {
  date: string;
  day: string;
  mode: string;
  slots: { start: string; end: string }[];
}

interface UserData {
  id: number;
  username: string;
  role: string;
}

const DoctorConsultScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showTimePicker, setShowTimePicker] = useState<'start' | 'end' | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());
  const [slots, setSlots] = useState<Slot[]>([]);
  const [availabilitySchedule, setAvailabilitySchedule] = useState<AvailabilitySlot[]>([
    { day: 'monday', loginTime: '09:00', logoutTime: '17:00', breaks: ['12:00-12:30'], mode: 'online' },
    { day: 'tuesday', loginTime: '10:00', logoutTime: '16:00', breaks: ['13:00-13:45'], mode: 'offline' },
    { day: 'wednesday', loginTime: '08:30', logoutTime: '18:00', breaks: ['12:30-13:00', '15:30-15:45'], mode: 'online' },
    { day: 'thursday', loginTime: '09:00', logoutTime: '15:00', breaks: ['11:30-12:00'], mode: 'hybrid' },
    { day: 'friday', loginTime: '10:00', logoutTime: '14:00', breaks: ['12:00-12:15'], mode: 'offline' },
    { day: 'saturday', loginTime: '11:00', logoutTime: '13:00', breaks: [], mode: 'online' },
    { day: 'sunday', mode: '' },
  ]);
  const [doctorName, setDoctorName] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // --- Modal State ---
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // <-- New state to track modal mode
  const [newSlotDay, setNewSlotDay] = useState('');
  const [newSlotLoginTime, setNewSlotLoginTime] = useState('');
  const [newSlotLogoutTime, setNewSlotLogoutTime] = useState('');
  const [newSlotBreaks, setNewSlotBreaks] = useState('');
  const [newSlotMode, setNewSlotMode] = useState('');

  // Helper function to parse slots safely
  const parseAndSetSlots = (slotsData: any) => {
    if (slotsData.message === 'Succesfully fetched all the slots for the doctor' && slotsData.slots[0]?.slots) {
      const parsedSlots: Slot[] = JSON.parse(slotsData.slots[0].slots).filter(
        (slot: Slot) => new Date(slot.date) >= new Date('2025-07-18') // Date filter from original code
      );
      setSlots(parsedSlots);
    } else if (slotsData.message === 'Succesfully fetched all the slots for the doctor') {
      console.log('Successfully fetched, but no slots data found.');
      setSlots([]); // Set to empty array if fetch is ok but no slots
    } else {
      throw new Error('Invalid slots response');
    }
  };

  // Fetch initial data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch user data
      const userResponse = await fetch('https://landing.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (!userResponse.ok) {
        throw new Error(`User data fetch failed: ${userResponse.status} ${userResponse.statusText}`);
      }
      const userData: { message: string; userData: UserData } = await userResponse.json();
      let fetchedUserId: number;
      if (userData.message === 'succesfully fetched the user details' && userData.userData.role === 'doctor') {
        setDoctorName(`Dr. ${userData.userData.username}`);
        setUserId(userData.userData.id);
        fetchedUserId = userData.userData.id;
      } else {
        throw new Error('User is not a doctor or invalid response');
      }

      // Fetch slots for the doctor
      const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${fetchedUserId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { Accept: 'application/json' },
      });
      if (!slotsResponse.ok) {
        throw new Error(`Slots fetch failed: ${slotsResponse.status} ${slotsResponse.statusText}`);
      }
      const slotsData = await slotsResponse.json();
      parseAndSetSlots(slotsData);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(`Failed to load data: ${err.message}. Please check your network or authentication.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- New Modal Helper Functions ---

  /**
   * Clears modal form state and hides the modal.
   */
  const closeModal = () => {
    setModalVisible(false);
    setIsEditing(false);
    setNewSlotDay('');
    setNewSlotLoginTime('');
    setNewSlotLogoutTime('');
    setNewSlotBreaks('');
    setNewSlotMode('');
    setError(null); // Clear modal-specific errors
  };

  /**
   * Opens the modal. If a slot is provided, it populates the form for editing.
   * Otherwise, it opens a blank form for adding.
   */
  const openModal = (slotToEdit?: AvailabilitySlot) => {
    if (slotToEdit) {
      // --- Edit Mode ---
      setIsEditing(true);
      setNewSlotDay(slotToEdit.day);
      setNewSlotLoginTime(slotToEdit.loginTime || '');
      setNewSlotLogoutTime(slotToEdit.logoutTime || '');
      setNewSlotBreaks(slotToEdit.breaks?.join(', ') || '');
      setNewSlotMode(slotToEdit.mode || '');
    } else {
      // --- Add/Update by Day Name Mode ---
      setIsEditing(false);
      // Clear all fields (handled by closeModal)
      closeModal();
    }
    setModalVisible(true);
  };

  // Get available dates for horizontal scrolling
  const availableDates = Array.from(new Set(slots.map((slot) => slot.date))).sort();

  // Filter and sort slots for the selected date
  const filteredSlots = slots
    .filter((slot) => slot.date === selectedDate)
    .sort((a, b) => {
      const order = { online: 1, offline: 2, hybrid: 3 };
      return order[a.mode] - order[b.mode];
    });

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setError(null);
  };

  const handleTimeChange = (event: any, time?: Date, type?: 'start' | 'end') => {
    setShowTimePicker(null);
    if (time && type) {
      if (type === 'start') {
        setSelectedStartTime(time);
      } else {
        setSelectedEndTime(time);
      }
    }
  };

  // --- API Call to update the *entire* schedule ---
  const handleUpdateAvailability = async () => {
    if (!userId) {
      setError('User ID not found. Cannot update availability.');
      return;
    }
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const availabilityData = {
        availability_schedule: availabilitySchedule, // Send the locally updated schedule
        consultation_fee: 540,
        experience_years: 2,
        appointment_slot: 30,
      };

      const response = await fetch('https://landing.docapp.co.in/api/auth/profile/complete/extra-doc-info', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(availabilityData),
      });
      if (!response.ok) {
        throw new Error(`Update availability failed: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        setSuccess('Availability updated successfully!');
        setTimeout(() => setSuccess(null), 3000);
        closeModal(); // <-- Use new close function on success

        // Refresh slots from server
        const slotsResponse = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${userId}`, {
          method: 'GET',
          credentials: 'include',
          headers: { Accept: 'application/json' },
        });
        if (slotsResponse.ok) {
          const slotsData = await slotsResponse.json();
          parseAndSetSlots(slotsData);
        }
      } else {
        throw new Error(result.message || 'Invalid update response');
      }
    } catch (err: any) {
      console.error('Error updating availability:', err);
      setError(`Failed to update availability: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Validates modal form and updates local schedule state,
   * then triggers handleUpdateAvailability to push to API.
   */
  const handleSaveSlot = () => {
    setError(null); // Clear errors on new submission

    // Validate day
    if (!newSlotDay) {
      setError('Day is required');
      return;
    }
    const dayLower = newSlotDay.toLowerCase();
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    if (!validDays.includes(dayLower)) {
      setError('Invalid day. Must be a valid weekday (e.g., "monday").');
      return;
    }
    
    // Allow empty times/mode for "Unavailable" days (like Sunday)
    // But if one time is entered, the other is required.
    if ((newSlotLoginTime && !newSlotLogoutTime) || (!newSlotLoginTime && newSlotLogoutTime)) {
        setError('Both Login Time and Logout Time are required.');
        return;
    }

    // Validate time format (HH:mm) if times exist
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (newSlotLoginTime && !timeRegex.test(newSlotLoginTime)) {
        setError('Invalid Login Time format. Use HH:mm (e.g., 09:00)');
        return;
    }
     if (newSlotLogoutTime && !timeRegex.test(newSlotLogoutTime)) {
        setError('Invalid Logout Time format. Use HH:mm (e.g., 17:00)');
        return;
    }
    
    // Validate mode if times exist
    const validModes = ['online', 'offline', 'hybrid', ''];
    if (newSlotLoginTime && !validModes.includes(newSlotMode.toLowerCase())) {
        setError('Invalid mode. Choose from: online, offline, hybrid.');
        return;
    }

    // Validate breaks
    const breaksArray = newSlotBreaks ? newSlotBreaks.split(',').map((b) => b.trim()).filter(b => b) : [];
    for (const b of breaksArray) {
      if (!b.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
        setError('Invalid break format. Use HH:mm-HH:mm (e.g., 12:00-12:30). Separate multiple with commas.');
        return;
      }
    }

    const newSlot: AvailabilitySlot = {
      day: dayLower,
      loginTime: newSlotLoginTime || undefined,
      logoutTime: newSlotLogoutTime || undefined,
      breaks: breaksArray,
      mode: newSlotMode.toLowerCase() || undefined,
    };

    // Update the local availabilitySchedule state
    setAvailabilitySchedule((prev) =>
      prev.map((slot) => (slot.day === newSlot.day ? newSlot : slot))
    );

    // After local state is set, call the API
    // handleUpdateAvailability will be called which handles loading, modal close, and slot refresh
    handleUpdateAvailability();
  };

  // This function is not currently called by any UI element
  const handleCreateAppointment = async () => {
    // ... (existing logic)
  };

  // Fixed retryFetch to call the refactored fetchData
  const retryFetch = () => {
    fetchData();
  };

  // Render horizontal date item
  const renderDateItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={tw`${selectedDate === item ? 'bg-green-600' : 'bg-green-100'} rounded-xl p-3 mx-2`}
      onPress={() => handleDateSelect(item)}
    >
      <Text style={tw`${selectedDate === item ? 'text-white' : 'text-green-700'} font-bold`}>
        {new Date(item).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
      </Text>
    </TouchableOpacity>
  );

  // Render weekly availability item (NOW PRESSABLE)
  const renderWeeklyDay = ({ item }: { item: AvailabilitySlot }) => (
    <TouchableOpacity onPress={() => openModal(item)}> {/* <-- Make item pressable */}
      <Card style={tw`bg-green-100 rounded-xl p-3 mx-2 w-40`}>
        <Text style={tw`text-green-700 font-bold`}>{item.day.charAt(0).toUpperCase() + item.day.slice(1)}</Text>
        <Text style={tw`text-green-600 text-sm`}>{item.mode ? item.mode.charAt(0).toUpperCase() + item.mode.slice(1) : 'Unavailable'}</Text>
        {item.loginTime && item.logoutTime ? (
          <>
            <Text style={tw`text-green-600 text-sm`}>{`${item.loginTime} - ${item.logoutTime}`}</Text>
            <Text style={tw`text-green-600 text-sm`}>Breaks: {item.breaks?.join(', ') || 'None'}</Text>
          </>
        ) : (
          <Text style={tw`text-green-600 text-sm`}>No schedule</Text>
        )}
      </Card>
    </TouchableOpacity>
  );

  if (loading && !slots.length) { // Only show full-screen loader on initial load
    return (
      <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={tw`text-white text-lg mt-4`}>Loading...</Text>
      </LinearGradient>
    );
  }

  if (error && !slots.length) { // Only show full-screen error if no data is present
    return (
      <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-white text-lg text-center px-4`}>{error}</Text>
        <Button
          mode="contained"
          style={tw`mt-4 bg-green-600 rounded-2xl`}
          onPress={retryFetch}
        >
          <Text style={tw`text-white font-bold`}>Retry</Text>
        </Button>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#059669', '#34d399']} style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-8 px-4 pt-6`}>
        <View style={tw`items-center`}>
          <Text style={tw`text-3xl text-white font-bold mb-4`}>{doctorName}'s Dashboard</Text>
          <Button
            mode="contained"
            style={tw`bg-green-600 rounded-2xl mb-6 w-full max-w-[420px]`}
            onPress={() => openModal()} // <-- Use new open function (no args)
            disabled={loading}
          >
            <Text style={tw`text-white font-bold text-base`}>Manage Availability</Text>
          </Button>

          {/* Show inline error if fetching failed but we still have old data */}
          {error && slots.length > 0 && (
            <Text style={tw`text-red-100 text-base text-center px-4 mb-4`}>{error}</Text>
          )}

          <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
            <Card.Content>
              <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Available Dates</Text>
              {availableDates.length > 0 ? (
                <FlatList
                  data={availableDates}
                  renderItem={renderDateItem}
                  keyExtractor={(item) => item}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={tw`px-2`}
                />
              ) : (
                <Text style={tw`text-green-700 text-base`}>No available dates</Text>
              )}
            </Card.Content>
          </Card>
          <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
            <Card.Content>
              <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Weekly Availability</Text>
              <FlatList
                data={availabilitySchedule}
                renderItem={renderWeeklyDay} // <-- This now renders pressable items
                keyExtractor={(item) => item.day}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`px-2`}
              />
            </Card.Content>
          </Card>
          <Card style={tw`w-full max-w-[420px] bg-green-100 rounded-2xl mb-6 shadow-lg`}>
            <Card.Content>
              <Text style={tw`text-2xl text-green-700 font-bold mb-4`}>Slots for {selectedDate}</Text>
              {filteredSlots.length > 0 ? (
                <View style={tw`flex-row flex-wrap justify-between`}>
                  {filteredSlots.map((daySlot, index) =>
                    daySlot.slots.map((slot, slotIndex) => (
                      <Card
                        key={`${index}-${slotIndex}`}
                        style={tw`bg-green-50 rounded-xl p-4 mb-3 w-[31%]`}
                      >
                        <View style={tw`flex-1`}>
                          <Text style={tw`text-green-700 font-bold text-sm`}>
                            {daySlot.mode.charAt(0).toUpperCase() + daySlot.mode.slice(1)}
                          </Text>
                          <Text style={tw`text-green-600 text-xs`}>
                            {`${slot.start} - ${slot.end}`}
                          </Text>
                        </View>
                      </Card>
                    ))
                  )}
                </View>
              ) : (
                <Text style={tw`text-green-700 text-base`}>No slots available for this date</Text>
              )}
            </Card.Content>
          </Card>

        </View>
      </ScrollView>

      {/* Modal for Adding/Editing Slots */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal} // <-- Use new close function
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <Card style={tw`w-11/12 max-w-[400px] bg-green-100 rounded-2xl p-4`}>
            <Card.Content>
              <View style={tw`flex-row justify-between items-center mb-4`}>
                <Text style={tw`text-2xl text-green-700 font-bold`}>
                  {isEditing ? 'Update Slot' : 'Add/Update Slot'}
                </Text>
                <IconButton
                  icon="close"
                  color="#059669"
                  size={24}
                  onPress={closeModal} // <-- Use new close function
                />
              </View>

              {/* Show modal-specific errors */}
              {error && (
                 <Text style={tw`text-red-600 text-base text-center px-4 mb-2`}>{error}</Text>
              )}

              <TextInput
                style={tw`rounded-xl p-3 mb-3 text-green-700 ${isEditing ? 'bg-green-200 text-gray-500' : 'bg-green-50'}`}
                placeholder="Day (e.g., monday)"
                placeholderTextColor="#34d399"
                value={newSlotDay}
                onChangeText={(text) => setNewSlotDay(text.toLowerCase())}
                editable={!isEditing} // <-- Lock day field when editing
                autoCapitalize="none"
              />
              <TextInput
                style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
                placeholder="Login Time (HH:mm)"
                placeholderTextColor="#34d399"
                value={newSlotLoginTime}
                onChangeText={setNewSlotLoginTime}
              />
              <TextInput
                style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
                placeholder="Logout Time (HH:mm)"
                placeholderTextColor="#34d399"
                value={newSlotLogoutTime}
                onChangeText={setNewSlotLogoutTime}
              />
              <TextInput
                style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
                placeholder="Breaks (e.g., 12:00-12:30,13:00-13:30)"
                placeholderTextColor="#34d399"
                value={newSlotBreaks}
                onChangeText={setNewSlotBreaks}
              />
              <TextInput
                style={tw`bg-green-50 rounded-xl p-3 mb-3 text-green-700`}
                placeholder="Mode (online/offline/hybrid)"
                placeholderTextColor="#34d399"
                value={newSlotMode}
                onChangeText={(text) => setNewSlotMode(text.toLowerCase())}
                autoCapitalize="none"
              />
              <Button
                mode="contained"
                style={tw`bg-green-600 rounded-2xl mt-4`}
                onPress={handleSaveSlot} // <-- Renamed from handleAddSlot
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={tw`text-white font-bold text-base`}>
                    {isEditing ? 'Update Slot' : 'Save Slot'}
                  </Text>
                )}
              </Button>
            </Card.Content>
          </Card>
        </View>
      </Modal>

      {/* Success Toast */}
      {success && (
        <View style={tw`absolute bottom-10 w-full items-center`}>
          <Card style={tw`bg-green-600 rounded-xl p-3`}>
            <Text style={tw`text-white font-bold`}>{success}</Text>
          </Card>
        </View>
      )}

      {/* Time Pickers (for unused handleCreateAppointment function) */}
      {showTimePicker && (
        <DateTimePicker
          value={showTimePicker === 'start' ? selectedStartTime : selectedEndTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, time) => handleTimeChange(event, time, showTimePicker)}
          minuteInterval={30}
        />
      )}

      {/* Inline loading indicator for updates (when data is already present) */}
      {loading && slots.length > 0 && (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-black bg-opacity-30`}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </LinearGradient>
  );
};

export default DoctorConsultScreen;