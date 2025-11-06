// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   Image,
// // //   ScrollView,
// // //   TouchableOpacity,
// // //   ActivityIndicator,
// // //   FlatList,
// // //   Alert,
// // // } from 'react-native';
// // // import { useNavigation, useRoute } from '@react-navigation/native';
// // // import { Briefcase, IndianRupee, ShieldCheck } from 'lucide-react-native';
// // // import tw from 'twrnc';
// // // import PageHeader from '../../components/PageHeader';

// // // const DoctorProfileScreen = () => {
// // //   const route = useRoute();
// // //   const navigation = useNavigation();
// // //   const { doctor, consultationMode: initialMode } = route.params as any;

// // //   const [selectedMode, setSelectedMode] = useState<string>(initialMode || 'online');
// // //   const [slotsByDate, setSlotsByDate] = useState<{ [date: string]: string[] }>({});
// // //   const [selectedDate, setSelectedDate] = useState<string>('');
// // //   const [loadingSlots, setLoadingSlots] = useState(true);
// // //   const [selectedTab, setSelectedTab] = useState<'Availability' | 'Reviews' | 'About'>('Availability');
// // //   const [selectedSlot, setSelectedSlot] = useState<string>('');
// // //   const [selectedConsultType, setSelectedConsultType] = useState<'online_video' | 'online_audio' | null>(null);
// // //   const [reviews, setReviews] = useState<any[]>([]);

// // //   useEffect(() => {
// // //     const fetchSlots = async () => {
// // //       try {
// // //         const response = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${doctor.user_id}`);
// // //         const data = await response.json();
// // //         let parsedSlots: any[] = [];

// // //         if (data.slots && Array.isArray(data.slots)) {
// // //           data.slots.forEach((slotObj: any) => {
// // //             try {
// // //               const innerSlots = JSON.parse(slotObj.slots);
// // //               if (Array.isArray(innerSlots)) {
// // //                 parsedSlots = parsedSlots.concat(innerSlots);
// // //               }
// // //             } catch (err) {
// // //               console.error('Slot parsing error:', err);
// // //             }
// // //           });
// // //         }

// // //         const filtered = parsedSlots.filter((slot) =>
// // //           slot.mode?.toLowerCase() === selectedMode.toLowerCase() ||
// // //           slot.mode === '' || slot.mode?.toLowerCase() === 'hybrid'
// // //         );

// // //         const grouped: { [key: string]: string[] } = {};
// // //         filtered.forEach((slot) => {
// // //           if (slot.date && Array.isArray(slot.slots)) {
// // //             slot.slots.forEach((timeSlot: any) => {
// // //               const timeRange = `${timeSlot.start}-${timeSlot.end}`;
// // //               if (!grouped[slot.date]) grouped[slot.date] = [];
// // //               grouped[slot.date].push(timeRange);
// // //             });
// // //           }
// // //         });

// // //         const sortedDates = Object.keys(grouped).sort();
// // //         setSlotsByDate(grouped);
// // //         setSelectedDate(sortedDates[0] || '');
// // //       } catch (error) {
// // //         console.error('Slot fetch error:', error);
// // //       } finally {
// // //         setLoadingSlots(false);
// // //       }
// // //     };

// // //     fetchSlots();
// // //   }, [doctor.user_id, selectedMode]);

// // //   useEffect(() => {
// // //     setReviews([
// // //       { name: 'Rohit Sharma', rating: 5, comment: 'Excellent doctor.' },
// // //       { name: 'Priya Verma', rating: 4, comment: 'Good experience.' },
// // //       { name: 'Amit Joshi', rating: 5, comment: 'Very professional.' },
// // //     ]);
// // //   }, []);

// // // const handleBookAppointment = () => {
// // //   const selectedSlotObj = {
// // //     time: selectedSlot,
// // //     date: selectedDate,
// // //     mode: selectedMode === 'online' ? selectedConsultType : 'offline',
// // //   };

// // //   if (selectedMode === 'offline') {
// // //     navigation.navigate('AppointmentBooking', {
// // //       doctor,
// // //       selectedSlot: selectedSlotObj,
// // //       mode: selectedMode,
// // //     });
// // //   } else {
// // //     navigation.navigate('AppoinmentPaymentScreen', {
// // //       doctor,
// // //       slot: selectedSlot,
// // //       date: selectedDate,
// // //       consultationType: selectedConsultType, // e.g. 'online_video'
// // //       amount: doctor.consultation_fee,
// // //     });
// // //   }
// // // };




// // //   return (
// // //     <View style={tw`flex-1 bg-green-50`}>
// // //       <PageHeader title="Doctor Profile" backgroundColor="#16a34a" textColor="#fff" />
// // //       <ScrollView contentContainerStyle={tw`p-5 pb-32`}>
// // //         {/* Doctor Card */}
// // //         <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// // //           <View style={tw`flex-row items-center mb-4`}>
// // //             <Image
// // //               source={{ uri: doctor.profile_picture || 'https://via.placeholder.com/150' }}
// // //               style={tw`w-24 h-24 rounded-full border-4 border-green-200 mr-4`}
// // //             />
// // //             <View style={tw`flex-1`}>
// // //               <Text style={tw`text-xl font-bold text-green-900`}>{doctor.user?.username}</Text>
// // //               <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{doctor.specialization}</Text>
// // //               <View style={tw`flex-row items-center mt-2`}>
// // //                 <Briefcase size={16} color="#6b7280" />
// // //                 <Text style={tw`text-sm text-green-600 ml-2`}>
// // //                   {doctor.experience_years} years experience
// // //                 </Text>
// // //                 <Text style={tw`text-green-600 mx-2`}>{doctor.user_id} years experience</Text>
// // //               </View>
// // //             </View>
// // //           </View>

// // //           <View style={tw`flex-row justify-between bg-green-50 rounded-xl px-4 py-3`}>
// // //             <View style={tw`flex-row items-center`}>
// // //               <IndianRupee size={16} color="#059669" />
// // //               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
// // //                 ₹{doctor.consultation_fee}
// // //               </Text>
// // //             </View>
// // //             <View style={tw`flex-row items-center`}>
// // //               <ShieldCheck size={16} color="#059669" />
// // //               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
// // //                 {doctor.license_number}
// // //               </Text>
// // //             </View>
// // //           </View>
// // //         </View>

// // //  {selectedMode === 'offline' && Array.isArray(doctor?.user?.address) && doctor.user.address.length > 0 && (
// // //   <View style={tw`mt-4 bg-green-50 p-4 rounded-xl`}>
// // //     <Text style={tw`text-green-800 font-semibold mb-1`}>Clinic Address:</Text>
// // //     <Text style={tw`text-green-700`}>
// // //       {[
// // //         doctor.user.address[0]?.house_no,
// // //         doctor.user.address[0]?.street,
// // //         doctor.user.address[0]?.landmark,
// // //         doctor.user.address[0]?.city,
// // //         doctor.user.address[0]?.state,
// // //         doctor.user.address[0]?.pincode,
// // //       ]
// // //         .filter((item) => item && item.trim() !== '')
// // //         .join(', ')}
// // //     </Text>
// // //   </View>
// // // )}



// // //         {/* Mode Selector */}
// // //         {!initialMode && (
// // //           <View style={tw`flex-row bg-green-100 rounded-xl p-2 mb-4`}>
// // //             {['online', 'offline'].map((mode) => (
// // //               <TouchableOpacity
// // //                 key={mode}
// // //                 style={tw`flex-1 py-2 rounded-lg ${selectedMode === mode ? 'bg-green-600' : 'bg-transparent'}`}
// // //                 onPress={() => {
// // //                   setSelectedMode(mode);
// // //                   setSelectedConsultType(null);
// // //                   setSelectedSlot('');
// // //                 }}
// // //               >
// // //                 <Text style={tw`text-center font-semibold ${selectedMode === mode ? 'text-white' : 'text-green-800'}`}>
// // //                   {mode === 'online' ? 'Online' : 'Offline'}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </View>
// // //         )}

// // //         {/* Tab Selector */}
// // //         <View style={tw`flex-row bg-green-50 rounded-2xl shadow-md p-2 mb-6`}>
// // //           {['Availability', 'Reviews', 'About'].map((tab) => (
// // //             <TouchableOpacity
// // //               key={tab}
// // //               style={tw`flex-1 py-3 rounded-xl ${selectedTab === tab ? 'bg-green-600' : 'bg-transparent'}`}
// // //               onPress={() => setSelectedTab(tab as typeof selectedTab)}
// // //             >
// // //               <Text style={tw`text-center text-base font-semibold ${selectedTab === tab ? 'text-white' : 'text-green-700'}`}>
// // //                 {tab}
// // //               </Text>
// // //             </TouchableOpacity>
// // //           ))}
// // //         </View>

// // //         {/* Availability Tab */}
// // //         {selectedTab === 'Availability' && (
// // //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// // //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Available Dates</Text>
// // //             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
// // //               {Object.keys(slotsByDate).map((date) => (
// // //                 <TouchableOpacity
// // //                   key={date}
// // //                   style={tw`px-5 py-3 mr-3 rounded-xl ${selectedDate === date ? 'bg-green-600' : 'bg-green-100'}`}
// // //                   onPress={() => {
// // //                     setSelectedDate(date);
// // //                     setSelectedSlot('');
// // //                     setSelectedConsultType(null);
// // //                   }}
// // //                 >
// // //                   <Text style={tw`text-base font-semibold ${selectedDate === date ? 'text-white' : 'text-green-800'}`}>
// // //                     {new Date(date).toLocaleDateString('en-US', {
// // //                       weekday: 'short',
// // //                       month: 'short',
// // //                       day: 'numeric',
// // //                     })}
// // //                   </Text>
// // //                 </TouchableOpacity>
// // //               ))}
// // //             </ScrollView>

// // //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Available Slots</Text>
// // //             {loadingSlots ? (
// // //               <ActivityIndicator size="large" color="#16a34a" />
// // //             ) : slotsByDate[selectedDate]?.length > 0 ? (
// // //               <FlatList
// // //                 data={slotsByDate[selectedDate]}
// // //                 keyExtractor={(item, index) => `${item}_${index}`}
// // //                 numColumns={3}
// // //                 scrollEnabled={false}
// // //                 columnWrapperStyle={tw`justify-between mb-2`}
// // //                 renderItem={({ item }) => {
// // //                   const isSelected = selectedSlot === item;
// // //                   return (
// // //                     <TouchableOpacity
// // //                       onPress={() => {
// // //                         setSelectedSlot(item);
// // //                         setSelectedConsultType(null);
// // //                       }}
// // //                       style={tw`px-3 py-2 rounded-xl flex-1 mx-1 border ${
// // //                         isSelected ? 'bg-green-600 border-green-700' : 'bg-green-100 border-green-300'
// // //                       }`}
// // //                     >
// // //                       <Text style={tw`${isSelected ? 'text-white' : 'text-green-800'} font-semibold text-xs text-center`}>
// // //                         {item}
// // //                       </Text>
// // //                     </TouchableOpacity>
// // //                   );
// // //                 }}
// // //               />
// // //             ) : (
// // //               <Text style={tw`text-green-400 text-base`}>No slots available for this date.</Text>
// // //             )}

// // //             {/* Online consult type selection */}
// // //             {selectedSlot && selectedMode === 'online' && (
// // //               <View style={tw`flex-row justify-center mt-4`}>
// // //                 {['online_video', 'online_audio'].map((type) => (
// // //                   <TouchableOpacity
// // //                     key={type}
// // //                     onPress={() => setSelectedConsultType(type as any)}
// // //                     style={tw`px-4 py-2 mx-2 rounded-xl border ${
// // //                       selectedConsultType === type ? 'bg-green-600 border-green-700' : 'bg-green-100 border-green-300'
// // //                     }`}
// // //                   >
// // //                     <Text
// // //                       style={tw`${selectedConsultType === type ? 'text-white' : 'text-green-800'} font-semibold text-sm`}
// // //                     >
// // //                       {type === 'online_video' ? 'Video Call' : 'Audio Call'}
// // //                     </Text>
// // //                   </TouchableOpacity>
// // //                 ))}
// // //               </View>
// // //             )}

// // //             {selectedSlot && (selectedMode === 'offline' || selectedConsultType) && (
// // //               <TouchableOpacity
// // //                 style={tw`bg-green-600 py-4 px-8 rounded-xl items-center shadow-md mt-6`}
// // //                 onPress={handleBookAppointment}
// // //               >
// // //                 <Text style={tw`text-white text-lg font-bold`}>Book Appointment</Text>
// // //               </TouchableOpacity>
// // //             )}
// // //           </View>
// // //         )}

// // //         {/* Reviews */}
// // //         {selectedTab === 'Reviews' && (
// // //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// // //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Patient Reviews</Text>
// // //             {reviews.map((review, index) => (
// // //               <View key={index} style={tw`border-b border-green-100 py-4`}>
// // //                 <Text style={tw`text-base font-bold text-green-900`}>{review.name}</Text>
// // //                 <Text style={tw`text-yellow-500 text-lg my-1`}>{'★'.repeat(review.rating)}</Text>
// // //                 <Text style={tw`text-green-600`}>{review.comment}</Text>
// // //               </View>
// // //             ))}
// // //           </View>
// // //         )}

// // //         {/* About */}
// // //         {selectedTab === 'About' && (
// // //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// // //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>About {doctor.name}</Text>
// // //             <Text style={tw`text-green-600 text-base`}>
// // //               Dr. {doctor.name} is a skilled {doctor.specialization} with over {doctor.experience_years} years of experience.
// // //               He/she is known for providing compassionate and personalized care.
// // //             </Text>
// // //           </View>
// // //         )}
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // };

// // // export default DoctorProfileScreen;


// // import React, { useEffect, useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   Image,
// //   ScrollView,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   FlatList,
// // } from 'react-native';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import { Briefcase, IndianRupee, ShieldCheck } from 'lucide-react-native';
// // import tw from 'twrnc';
// // import PageHeader from '../../components/PageHeader';
// // import { useUser } from '../contexts/UserContext';

// // const DoctorProfileScreen = () => {
// //   const route = useRoute();
// //   const navigation = useNavigation();
// //   const { doctor, consultationMode: initialMode } = route.params as any;

// //   const [selectedMode, setSelectedMode] = useState<string>(initialMode || 'online');
// //   const [slotsByDate, setSlotsByDate] = useState<{ [date: string]: { mode: string; slots: string[] } }>({});
// //   const [selectedDate, setSelectedDate] = useState<string>('');
// //   const [loadingSlots, setLoadingSlots] = useState(true);
// //   const [selectedTab, setSelectedTab] = useState<'Availability' | 'Reviews' | 'About'>('Availability');
// //   const [selectedSlot, setSelectedSlot] = useState<string>('');
// //   const [selectedConsultType, setSelectedConsultType] = useState<'online_video' | 'online_audio' | null>(null);
// //   const [reviews, setReviews] = useState<any[]>([]);

// //   const { consultationMode, setConsultationMode } = useUser();

// //   useEffect(() => {
// //     console.log('Initial Mode ------------>:', consultationMode);
// //   }, [initialMode, consultationMode]);

// //   useEffect(() => {
// //     const fetchSlots = async () => {
// //       try {
// //         const response = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${doctor.user_id}`);
// //         const data = await response.json();
// //         let parsedSlots: any[] = [];

// //         if (data.slots && Array.isArray(data.slots)) {
// //           data.slots.forEach((slotObj: any) => {
// //             try {
// //               const innerSlots = JSON.parse(slotObj.slots);
// //               if (Array.isArray(innerSlots)) {
// //                 parsedSlots = parsedSlots.concat(innerSlots);
// //               }
// //             } catch (err) {
// //               console.error('Slot parsing error:', err);
// //             }
// //           });
// //         }

// //         // ✅ Group all slots by date (no filtering)
// //         const grouped: { [key: string]: { mode: string; slots: string[] } } = {};
// //         parsedSlots.forEach((slot) => {
// //           const date = slot.date;
// //           const mode = slot.mode || 'unknown';
// //           if (!grouped[date]) grouped[date] = { mode, slots: [] };

// //           if (Array.isArray(slot.slots)) {
// //             slot.slots.forEach((timeSlot: any) => {
// //               grouped[date].slots.push(`${timeSlot.start}-${timeSlot.end}`);
// //             });
// //           }
// //         });

// //         const sortedDates = Object.keys(grouped).sort();
// //         setSlotsByDate(grouped);
// //         setSelectedDate(sortedDates[0] || '');
// //       } catch (error) {
// //         console.error('Slot fetch error:', error);
// //       } finally {
// //         setLoadingSlots(false);
// //       }
// //     };

// //     fetchSlots();
// //   }, [doctor.user_id]);

// //   useEffect(() => {
// //     setReviews([
// //       { name: 'Rohit Sharma', rating: 5, comment: 'Excellent doctor.' },
// //       { name: 'Priya Verma', rating: 4, comment: 'Good experience.' },
// //       { name: 'Amit Joshi', rating: 5, comment: 'Very professional.' },
// //     ]);
// //   }, []);

// //   const handleBookAppointment = () => {
// //     const selectedSlotObj = {
// //       time: selectedSlot,
// //       date: selectedDate,
// //       mode: selectedMode === 'online' ? selectedConsultType : 'offline',
// //     };

// //     if (selectedMode === 'offline') {
// //       navigation.navigate('AppointmentBooking', {
// //         doctor,
// //         selectedSlot: selectedSlotObj,
// //         mode: selectedMode,
// //       });
// //     } else {
// //       navigation.navigate('AppoinmentPaymentScreen', {
// //         doctor,
// //         slot: selectedSlot,
// //         date: selectedDate,
// //         consultationType: selectedConsultType,
// //         amount: doctor.consultation_fee,
// //       });
// //     }
// //   };

// //   return (
// //     <View style={tw`flex-1 bg-green-50`}>
// //       <PageHeader title="Doctor Profile" backgroundColor="#16a34a" textColor="#fff" />
// //       <ScrollView contentContainerStyle={tw`p-5 pb-32`}>
// //         {/* Doctor Card */}
// //         <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// //           <View style={tw`flex-row items-center mb-4`}>
// //             <Image
// //               source={{ uri: doctor.profile_picture || 'https://via.placeholder.com/150' }}
// //               style={tw`w-24 h-24 rounded-full border-4 border-green-200 mr-4`}
// //             />
// //             <View style={tw`flex-1`}>
// //               <Text style={tw`text-xl font-bold text-green-900`}>{doctor.user?.username}</Text>
// //               <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{doctor.specialization}</Text>
// //               <View style={tw`flex-row items-center mt-2`}>
// //                 <Briefcase size={16} color="#6b7280" />
// //                 <Text style={tw`text-sm text-green-600 ml-2`}>
// //                   {doctor.experience_years} years experience
// //                 </Text>
// //                 <Text style={tw`text-sm text-green-600 ml-2`}>
// //                   {consultationMode} years experience
// //                 </Text>
// //               </View>
// //             </View>
// //           </View>

// //           <View style={tw`flex-row justify-between bg-green-50 rounded-xl px-4 py-3`}>
// //             <View style={tw`flex-row items-center`}>
// //               <IndianRupee size={16} color="#059669" />
// //               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
// //                 ₹{doctor.consultation_fee}
// //               </Text>
// //             </View>
// //             <View style={tw`flex-row items-center`}>
// //               <ShieldCheck size={16} color="#059669" />
// //               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
// //                 {doctor.license_number}
// //               </Text>
// //             </View>
// //           </View>
// //         </View>

// //         {/* Mode Selector */}
// //         {!initialMode && (
// //           <View style={tw`flex-row bg-green-100 rounded-xl p-2 mb-4`}>
// //             {['online', 'offline'].map((mode) => (
// //               <TouchableOpacity
// //                 key={mode}
// //                 style={tw`flex-1 py-2 rounded-lg ${selectedMode === mode ? 'bg-green-600' : 'bg-transparent'}`}
// //                 onPress={() => {
// //                   setSelectedMode(mode);
// //                   setSelectedConsultType(null);
// //                   setSelectedSlot('');
// //                 }}
// //               >
// //                 <Text style={tw`text-center font-semibold ${selectedMode === mode ? 'text-white' : 'text-green-800'}`}>
// //                   {mode === 'online' ? 'Online' : 'Offline'}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </View>
// //         )}

// //         {/* Tab Selector */}
// //         <View style={tw`flex-row bg-green-50 rounded-2xl shadow-md p-2 mb-6`}>
// //           {['Availability', 'Reviews', 'About'].map((tab) => (
// //             <TouchableOpacity
// //               key={tab}
// //               style={tw`flex-1 py-3 rounded-xl ${selectedTab === tab ? 'bg-green-600' : 'bg-transparent'}`}
// //               onPress={() => setSelectedTab(tab as typeof selectedTab)}
// //             >
// //               <Text style={tw`text-center text-base font-semibold ${selectedTab === tab ? 'text-white' : 'text-green-700'}`}>
// //                 {tab}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </View>

// //         {/* Availability Tab */}
// //         {selectedTab === 'Availability' && (
// //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Available Dates</Text>
// //             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
// //               {Object.keys(slotsByDate).map((date) => (
// //                 <TouchableOpacity
// //                   key={date}
// //                   style={tw`px-5 py-3 mr-3 rounded-xl ${selectedDate === date ? 'bg-green-600' : 'bg-green-100'}`}
// //                   onPress={() => {
// //                     setSelectedDate(date);
// //                     setSelectedSlot('');
// //                     setSelectedConsultType(null);
// //                   }}
// //                 >
// //                   <Text style={tw`text-base font-semibold ${selectedDate === date ? 'text-white' : 'text-green-800'}`}>
// //                     {new Date(date).toLocaleDateString('en-US', {
// //                       weekday: 'short',
// //                       month: 'short',
// //                       day: 'numeric',
// //                     })}
// //                   </Text>
// //                   <Text style={tw`text-xs ${selectedDate === date ? 'text-green-100' : 'text-green-600'}`}>
// //                     {slotsByDate[date].mode?.toUpperCase() || 'N/A'}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </ScrollView>

// //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
// //               Available Slots ({slotsByDate[selectedDate]?.mode || ''})
// //             </Text>

// //             {loadingSlots ? (
// //               <ActivityIndicator size="large" color="#16a34a" />
// //             ) : slotsByDate[selectedDate]?.slots?.length > 0 ? (
// //               <FlatList
// //                 data={slotsByDate[selectedDate].slots}
// //                 keyExtractor={(item, index) => `${item}_${index}`}
// //                 numColumns={3}
// //                 scrollEnabled={false}
// //                 columnWrapperStyle={tw`justify-between mb-2`}
// //                 renderItem={({ item }) => {
// //                   const isSelected = selectedSlot === item;
// //                   return (
// //                     <TouchableOpacity
// //                       onPress={() => {
// //                         setSelectedSlot(item);
// //                         setSelectedConsultType(null);
// //                       }}
// //                       style={tw`px-3 py-2 rounded-xl flex-1 mx-1 border ${
// //                         isSelected ? 'bg-green-600 border-green-700' : 'bg-green-100 border-green-300'
// //                       }`}
// //                     >
// //                       <Text style={tw`${isSelected ? 'text-white' : 'text-green-800'} font-semibold text-xs text-center`}>
// //                         {item}
// //                       </Text>
// //                     </TouchableOpacity>
// //                   );
// //                 }}
// //               />
// //             ) : (
// //               <Text style={tw`text-green-400 text-base`}>No slots available for this date.</Text>
// //             )}

// //             {selectedSlot && (selectedMode === 'offline' || selectedConsultType) && (
// //               <TouchableOpacity
// //                 style={tw`bg-green-600 py-4 px-8 rounded-xl items-center shadow-md mt-6`}
// //                 onPress={handleBookAppointment}
// //               >
// //                 <Text style={tw`text-white text-lg font-bold`}>Book Appointment</Text>
// //               </TouchableOpacity>
// //             )}
// //           </View>
// //         )}

// //         {/* Reviews */}
// //         {selectedTab === 'Reviews' && (
// //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Patient Reviews</Text>
// //             {reviews.map((review, index) => (
// //               <View key={index} style={tw`border-b border-green-100 py-4`}>
// //                 <Text style={tw`text-base font-bold text-green-900`}>{review.name}</Text>
// //                 <Text style={tw`text-yellow-500 text-lg my-1`}>{'★'.repeat(review.rating)}</Text>
// //                 <Text style={tw`text-green-600`}>{review.comment}</Text>
// //               </View>
// //             ))}
// //           </View>
// //         )}

// //         {/* About */}
// //         {selectedTab === 'About' && (
// //           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
// //             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>About {doctor.name}</Text>
// //             <Text style={tw`text-green-600 text-base`}>
// //               Dr. {doctor.name} is a skilled {doctor.specialization} with over {doctor.experience_years} years of experience.
// //               He/she is known for providing compassionate and personalized care.
// //             </Text>
// //           </View>
// //         )}
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // export default DoctorProfileScreen;




// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
//   FlatList,
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { Briefcase, IndianRupee, ShieldCheck } from 'lucide-react-native';
// import tw from 'twrnc';
// import PageHeader from '../../components/PageHeader';
// import { useUser } from '../contexts/UserContext';

// const DoctorProfileScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { doctor, consultationMode: initialMode } = route.params || {};

//   const [selectedMode, setSelectedMode] = useState(initialMode || 'online');
//   const [slotsByDate, setSlotsByDate] = useState({});
//   const [selectedDate, setSelectedDate] = useState('');
//   const [loadingSlots, setLoadingSlots] = useState(true);
//   const [selectedTab, setSelectedTab] = useState('Availability');
//   const [selectedSlot, setSelectedSlot] = useState('');
//   const [selectedConsultType, setSelectedConsultType] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   const { consultationMode, setConsultationMode } = useUser();

//   useEffect(() => {
//     console.log('Initial Mode ------------>:', consultationMode);
//   }, [initialMode, consultationMode]);

//   // 🧠 Fetch slots
//   useEffect(() => {
//     const fetchSlots = async () => {
//       try {
//         setLoadingSlots(true);
//         const response = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${doctor.user_id}`);
//         const data = await response.json();

//         let parsedSlots = [];

//         if (data.slots && Array.isArray(data.slots)) {
//           data.slots.forEach((slotObj) => {
//             try {
//               const innerSlots = JSON.parse(slotObj.slots);
//               if (Array.isArray(innerSlots)) {
//                 parsedSlots = parsedSlots.concat(innerSlots);
//               }
//             } catch (err) {
//               console.error('Slot parsing error:', err);
//             }
//           });
//         }

//         // ✅ Filter by selectedMode (online/offline/hybrid)
//         const filteredSlots = parsedSlots.filter(
//           (slot) =>
//             slot.mode?.toLowerCase() === selectedMode.toLowerCase() ||
//             selectedMode === 'hybrid'
//         );

//         // ✅ Group by date
//         const grouped = {};
//         filteredSlots.forEach((slot) => {
//           const date = slot.date;
//           const mode = slot.mode || 'unknown';
//           if (!grouped[date]) grouped[date] = { mode, slots: [] };

//           if (Array.isArray(slot.slots)) {
//             slot.slots.forEach((timeSlot) => {
//               grouped[date].slots.push(`${timeSlot.start}-${timeSlot.end}`);
//             });
//           }
//         });

//         const sortedDates = Object.keys(grouped).sort();
//         setSlotsByDate(grouped);
//         setSelectedDate(sortedDates[0] || '');
//       } catch (error) {
//         console.error('Slot fetch error:', error);
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchSlots();
//   }, [doctor.user_id, selectedMode]);

//   // Dummy reviews
//   useEffect(() => {
//     setReviews([
//       { name: 'Rohit Sharma', rating: 5, comment: 'Excellent doctor.' },
//       { name: 'Priya Verma', rating: 4, comment: 'Good experience.' },
//       { name: 'Amit Joshi', rating: 5, comment: 'Very professional.' },
//     ]);
//   }, []);

//   const handleBookAppointment = () => {
//     const selectedSlotObj = {
//       time: selectedSlot,
//       date: selectedDate,
//       mode: selectedMode === 'online' ? selectedConsultType : 'offline',
//     };

//     if (selectedMode === 'offline') {
//       navigation.navigate('AppointmentBooking', {
//         doctor,
//         selectedSlot: selectedSlotObj,
//         mode: selectedMode,
//       });
//     } else {
//       navigation.navigate('AppoinmentPaymentScreen', {
//         doctor,
//         slot: selectedSlot,
//         date: selectedDate,
//         consultationType: selectedConsultType,
//         amount: doctor.consultation_fee,
//       });
//     }
//   };

//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       <PageHeader title="Doctor Profile" backgroundColor="#16a34a" textColor="#fff" />
//       <ScrollView contentContainerStyle={tw`p-5 pb-32`}>
//         {/* Doctor Card */}
//         <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
//           <View style={tw`flex-row items-center mb-4`}>
//             <Image
//               source={{ uri: doctor.profile_picture || 'https://via.placeholder.com/150' }}
//               style={tw`w-24 h-24 rounded-full border-4 border-green-200 mr-4`}
//             />
//             <View style={tw`flex-1`}>
//               <Text style={tw`text-xl font-bold text-green-900`}>{doctor.user?.username}</Text>
//               <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{doctor.specialization}</Text>
//               <View style={tw`flex-row items-center mt-2`}>
//                 <Briefcase size={16} color="#6b7280" />
//                 <Text style={tw`text-sm text-green-600 ml-2`}>
//                   {doctor.experience_years} years experience
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={tw`flex-row justify-between bg-green-50 rounded-xl px-4 py-3`}>
//             <View style={tw`flex-row items-center`}>
//               <IndianRupee size={16} color="#059669" />
//               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
//                 ₹{doctor.consultation_fee}
//               </Text>
//             </View>
//             <View style={tw`flex-row items-center`}>
//               <ShieldCheck size={16} color="#059669" />
//               <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
//                 {doctor.license_number}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {/* Mode Selector */}
//         <View style={tw`flex-row bg-green-100 rounded-xl p-2 mb-4`}>
//           {['online', 'offline', 'hybrid'].map((mode) => (
//             <TouchableOpacity
//               key={mode}
//               style={tw`flex-1 py-2 rounded-lg ${selectedMode === mode ? 'bg-green-600' : 'bg-transparent'}`}
//               onPress={() => {
//                 setSelectedMode(mode);
//                 setSelectedConsultType(null);
//                 setSelectedSlot('');
//               }}
//             >
//               <Text style={tw`text-center font-semibold ${selectedMode === mode ? 'text-white' : 'text-green-800'}`}>
//                 {mode.charAt(0).toUpperCase() + mode.slice(1)}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Tab Selector */}
//         <View style={tw`flex-row bg-green-50 rounded-2xl shadow-md p-2 mb-6`}>
//           {['Availability', 'Reviews', 'About'].map((tab) => (
//             <TouchableOpacity
//               key={tab}
//               style={tw`flex-1 py-3 rounded-xl ${selectedTab === tab ? 'bg-green-600' : 'bg-transparent'}`}
//               onPress={() => setSelectedTab(tab)}
//             >
//               <Text style={tw`text-center text-base font-semibold ${selectedTab === tab ? 'text-white' : 'text-green-700'}`}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Availability Tab */}
//         {selectedTab === 'Availability' && (
//           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
//             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
//               Available Dates ({selectedMode})
//             </Text>

//             {loadingSlots ? (
//               <ActivityIndicator size="large" color="#16a34a" />
//             ) : Object.keys(slotsByDate).length > 0 ? (
//               <>
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
//                   {Object.keys(slotsByDate).map((date) => (
//                     <TouchableOpacity
//                       key={date}
//                       style={tw`px-5 py-3 mr-3 rounded-xl ${selectedDate === date ? 'bg-green-600' : 'bg-green-100'}`}
//                       onPress={() => {
//                         setSelectedDate(date);
//                         setSelectedSlot('');
//                         setSelectedConsultType(null);
//                       }}
//                     >
//                       <Text style={tw`text-base font-semibold ${selectedDate === date ? 'text-white' : 'text-green-800'}`}>
//                         {new Date(date).toLocaleDateString('en-US', {
//                           weekday: 'short',
//                           month: 'short',
//                           day: 'numeric',
//                         })}
//                       </Text>
//                       <Text style={tw`text-xs ${selectedDate === date ? 'text-green-100' : 'text-green-600'}`}>
//                         {slotsByDate[date].mode?.toUpperCase() || 'N/A'}
//                       </Text>
//                     </TouchableOpacity>
//                   ))}
//                 </ScrollView>

//                 <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
//                   Available Slots ({slotsByDate[selectedDate]?.mode || ''})
//                 </Text>

//                 {slotsByDate[selectedDate]?.slots?.length > 0 ? (
//                   <FlatList
//                     data={slotsByDate[selectedDate].slots}
//                     keyExtractor={(item, index) => `${item}_${index}`}
//                     numColumns={3}
//                     scrollEnabled={false}
//                     columnWrapperStyle={tw`justify-between mb-2`}
//                     renderItem={({ item }) => {
//                       const isSelected = selectedSlot === item;
//                       return (
//                         <TouchableOpacity
//                           onPress={() => setSelectedSlot(item)}
//                           style={tw`px-3 py-2 rounded-xl flex-1 mx-1 border ${
//                             isSelected ? 'bg-green-600 border-green-700' : 'bg-green-100 border-green-300'
//                           }`}
//                         >
//                           <Text style={tw`${isSelected ? 'text-white' : 'text-green-800'} font-semibold text-xs text-center`}>
//                             {item}
//                           </Text>
//                         </TouchableOpacity>
//                       );
//                     }}
//                   />
//                 ) : (
//                   <Text style={tw`text-green-400 text-base`}>No slots available for this mode.</Text>
//                 )}
//               </>
//             ) : (
//               <Text style={tw`text-green-400 text-base`}>No slots available.</Text>
//             )}

//             {selectedSlot && (
//               <TouchableOpacity
//                 style={tw`bg-green-600 py-4 px-8 rounded-xl items-center shadow-md mt-6`}
//                 onPress={handleBookAppointment}
//               >
//                 <Text style={tw`text-white text-lg font-bold`}>Book Appointment</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         )}

//         {/* Reviews */}
//         {selectedTab === 'Reviews' && (
//           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
//             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Patient Reviews</Text>
//             {reviews.map((review, index) => (
//               <View key={index} style={tw`border-b border-green-100 py-4`}>
//                 <Text style={tw`text-base font-bold text-green-900`}>{review.name}</Text>
//                 <Text style={tw`text-yellow-500 text-lg my-1`}>{'★'.repeat(review.rating)}</Text>
//                 <Text style={tw`text-green-600`}>{review.comment}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* About */}
//         {selectedTab === 'About' && (
//           <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
//             <Text style={tw`text-lg font-bold text-green-700 mb-3`}>About {doctor.name}</Text>
//             <Text style={tw`text-green-600 text-base`}>
//               Dr. {doctor.name} is a skilled {doctor.specialization} with over {doctor.experience_years} years of experience.
//               Known for compassionate and personalized care.
//             </Text>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// export default DoctorProfileScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Briefcase, IndianRupee, ShieldCheck } from 'lucide-react-native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
import { useUser } from '../contexts/UserContext';

const DoctorProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params as any;

  const [slotsByDate, setSlotsByDate] = useState<{ [date: string]: { mode: string; slots: string[] } }>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loadingSlots, setLoadingSlots] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<'Availability' | 'Reviews' | 'About'>('Availability');

  const { consultationMode } = useUser(); 

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`https://landing.docapp.co.in/api/auth/show-slots/${doctor.user_id}`);
        const data = await response.json();
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

        // ✅ Filter slots based on consultationMode
        let filteredSlots = parsedSlots;
        if (consultationMode !== 'hybrid') {
          filteredSlots = parsedSlots.filter(
            (slot) => slot.mode?.toLowerCase() === consultationMode?.toLowerCase()
          );
        }

        // ✅ Group filtered slots by date
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
  }, [doctor.user_id, consultationMode]);

  useEffect(() => {
    setReviews([
      { name: 'Rohit Sharma', rating: 5, comment: 'Excellent doctor.' },
      { name: 'Priya Verma', rating: 4, comment: 'Good experience.' },
      { name: 'Amit Joshi', rating: 5, comment: 'Very professional.' },
    ]);
  }, []);

  const handleBookAppointment = () => {
    const selectedSlotObj = {
      time: selectedSlot,
      date: selectedDate,
      mode: consultationMode,
    };

    navigation.navigate('AppoinmentPaymentScreen', {
      doctor,
      doctorId: doctor.user_id,
      slot: selectedSlot,
      date: selectedDate,
      consultationType: consultationMode,
      amount: doctor.consultation_fee,
    });
  };

  return (
    <View style={tw`flex-1 bg-green-50`}>
      <PageHeader title="Doctor Profile" backgroundColor="#16a34a" textColor="#fff" />
      <ScrollView contentContainerStyle={tw`p-5 pb-32`}>
        {/* Doctor Info */}
        <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={{ uri: doctor.profile_picture || 'https://via.placeholder.com/150' }}
              style={tw`w-24 h-24 rounded-full border-4 border-green-200 mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-xl font-bold text-green-900`}>{doctor.user?.username}</Text>
              <Text style={tw`text-base text-green-600 font-semibold mt-1`}>{doctor.specialization}</Text>
              <View style={tw`flex-row items-center mt-2`}>
                <Briefcase size={16} color="#6b7280" />
                <Text style={tw`text-sm text-green-600 ml-2`}>
                  {doctor.experience_years} years experience
                </Text>
              </View>
            </View>
          </View>

          <View style={tw`flex-row justify-between bg-green-50 rounded-xl px-4 py-3`}>
            <View style={tw`flex-row items-center`}>
              <IndianRupee size={16} color="#059669" />
              <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
                ₹{doctor.consultation_fee}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <ShieldCheck size={16} color="#059669" />
              <Text style={tw`text-sm font-semibold text-green-700 ml-2`}>
                {doctor.license_number}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={tw`flex-row bg-green-50 rounded-2xl shadow-md p-2 mb-6`}>
          {['Availability', 'Reviews', 'About'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={tw`flex-1 py-3 rounded-xl ${selectedTab === tab ? 'bg-green-600' : 'bg-transparent'}`}
              onPress={() => setSelectedTab(tab as typeof selectedTab)}
            >
              <Text style={tw`text-center text-base font-semibold ${selectedTab === tab ? 'text-white' : 'text-green-700'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Availability */}
        {selectedTab === 'Availability' && (
          <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
            <Text style={tw`text-lg font-bold text-green-700 mb-3`}>
              Available Slots ({consultationMode.toUpperCase()})
            </Text>

            {loadingSlots ? (
              <ActivityIndicator size="large" color="#16a34a" />
            ) : Object.keys(slotsByDate).length > 0 ? (
              <>
                {/* Date Selector */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
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
                </ScrollView>

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
                        style={tw`px-3 py-2 rounded-xl flex-1 mx-1 border ${
                          isSelected ? 'bg-green-600 border-green-700' : 'bg-green-100 border-green-300'
                        }`}
                      >
                        <Text style={tw`${isSelected ? 'text-white' : 'text-green-800'} font-semibold text-xs text-center`}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                {selectedSlot && (
                  <TouchableOpacity
                    style={tw`bg-green-600 py-4 px-8 rounded-xl items-center shadow-md mt-6`}
                    onPress={handleBookAppointment}
                  >
                    <Text style={tw`text-white text-lg font-bold`}>Book Appointment</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <Text style={tw`text-green-400 text-base`}>No {consultationMode} slots available.</Text>
            )}
          </View>
        )}

        {/* Reviews */}
        {selectedTab === 'Reviews' && (
          <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
            <Text style={tw`text-lg font-bold text-green-700 mb-3`}>Patient Reviews</Text>
            {reviews.map((review, index) => (
              <View key={index} style={tw`border-b border-green-100 py-4`}>
                <Text style={tw`text-base font-bold text-green-900`}>{review.name}</Text>
                <Text style={tw`text-yellow-500 text-lg my-1`}>{'★'.repeat(review.rating)}</Text>
                <Text style={tw`text-green-600`}>{review.comment}</Text>
              </View>
            ))}
          </View>
        )}

        {/* About */}
        {selectedTab === 'About' && (
          <View style={tw`bg-green-50 rounded-2xl shadow-md p-5 mb-6`}>
            <Text style={tw`text-lg font-bold text-green-700 mb-3`}>About {doctor.name}</Text>
            <Text style={tw`text-green-600 text-base`}>
              Dr. {doctor.name} is a skilled {doctor.specialization} with over {doctor.experience_years} years of experience.
              Known for providing compassionate and personalized care.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DoctorProfileScreen;
