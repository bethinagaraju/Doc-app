// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import {
// // // // // // // // //   View,
// // // // // // // // //   Text,
// // // // // // // // //   ScrollView,
// // // // // // // // //   Image,
// // // // // // // // //   TouchableOpacity,
// // // // // // // // // } from 'react-native';
// // // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // // // // // // import tw from 'twrnc';
// // // // // // // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

// // // // // // // // // type Doctor = {
// // // // // // // // //   name: string;
// // // // // // // // //   clinic: string;
// // // // // // // // //   image: string;
// // // // // // // // //   specialty?: string;
// // // // // // // // //   fee?: number;
// // // // // // // // //   experience?: number;
// // // // // // // // //   rating?: string | null;
// // // // // // // // // };

// // // // // // // // // type RootStackParamList = {
// // // // // // // // //   AppoinmentPaymentScreen: {
// // // // // // // // //     doctor: Doctor;
// // // // // // // // //     slot: string;
// // // // // // // // //     date: string;
// // // // // // // // //     consultationType: 'video' | 'inclinic';
// // // // // // // // //     amount: number;
// // // // // // // // //     bookingId: string;
// // // // // // // // //   };
// // // // // // // // // };

// // // // // // // // // const PaymentScreen = () => {
// // // // // // // // //   const navigation = useNavigation<any>();
// // // // // // // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // // // // // // //   const { doctor, slot, date, consultationType, amount, bookingId } = route.params;
// // // // // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // // // // //   const handlePayment = () => {
// // // // // // // // //     if (isProcessing) return;
// // // // // // // // //     setIsProcessing(true);

// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       setIsProcessing(false);
// // // // // // // // //       navigation.navigate('AppointmentSuccess', {
// // // // // // // // //         doctor,
// // // // // // // // //         slot,
// // // // // // // // //         date,
// // // // // // // // //         consultationType,
// // // // // // // // //         appointmentId: bookingId,
// // // // // // // // //       });
// // // // // // // // //     }, 1500);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // // // // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // // // // // //         {/* Header */}
// // // // // // // // //         <View style={tw`flex-row items-center mb-4`}>
// // // // // // // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // // // // // // //             <ArrowLeft size={24} color="#374151" />
// // // // // // // // //           </TouchableOpacity>
// // // // // // // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Appointment Summary */}
// // // // // // // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
        

// // // // // // // // //           {/* Doctor Info */}
// // // // // // // // //           <View style={tw`flex-row items-center mb-4`}>
// // // // // // // // //             <Image
// // // // // // // // //               source={{ uri: doctor.profile_picture }}
// // // // // // // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // // // // // // //             />
// // // // // // // // //             <View style={tw`flex-1`}>
// // // // // // // // //               <Text style={tw`font-bold text-gray-900`}>{doctor.user.username}</Text>
// // // // // // // // //               {doctor.specialization && <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>}
// // // // // // // // //               <Text style={tw`text-green-700`}>
// // // // // // // // //                 {[
// // // // // // // // //                   doctor.user.address[0]?.house_no,
// // // // // // // // //                   doctor.user.address[0]?.street,
// // // // // // // // //                   doctor.user.address[0]?.landmark,
// // // // // // // // //                   doctor.user.address[0]?.city,
// // // // // // // // //                   doctor.user.address[0]?.state,
// // // // // // // // //                   doctor.user.address[0]?.pincode,
// // // // // // // // //                 ]
// // // // // // // // //                   .filter((item) => item && item.trim() !== '')
// // // // // // // // //                   .join(', ')}
// // // // // // // // //               </Text>
// // // // // // // // //                   {doctor?.address && (
// // // // // // // // //                     <Text style={tw`text-gray-500 text-sm`}>{doctor.address}</Text>
// // // // // // // // //                   )}
// // // // // // // // //               {doctor.consultation_fee && (
// // // // // // // // //                 <Text style={tw`text-green-700 mt-1`}>
// // // // // // // // //                   Fee: ₹{doctor.consultation_fee}
// // // // // // // // //                 </Text>
// // // // // // // // //               )}
// // // // // // // // //               {doctor.experience_years !== undefined && (
// // // // // // // // //                 <Text style={tw`text-gray-500 text-sm`}>{doctor.experience_years} years experience</Text>
// // // // // // // // //               )}
// // // // // // // // //             </View>
// // // // // // // // //           </View>

// // // // // // // // //           {/* Appointment Time */}
// // // // // // // // //           {/* Appointment Time */}
// // // // // // // // // <View style={tw`flex-row items-center mb-2`}>
// // // // // // // // //   <Calendar size={18} color="#4B5563" />
// // // // // // // // //   <Text style={tw`ml-2 text-gray-700 font-medium`}>
// // // // // // // // //     {date || 'Not available'}
// // // // // // // // //   </Text>
// // // // // // // // // </View>
// // // // // // // // // <View style={tw`flex-row items-center`}>
// // // // // // // // //   <Clock size={18} color="#4B5563" />
// // // // // // // // //   <Text style={tw`ml-2 text-gray-700 font-medium`}>
// // // // // // // // //     {slot || 'Not available'}
// // // // // // // // //   </Text>
// // // // // // // // // </View>


// // // // // // // // //         </View>

// // // // // // // // //         {/* Booking ID */}
// // // // // // // // //         <View style={tw`bg-gray-50 p-3 rounded-lg mb-4`}>
// // // // // // // // //           <Text style={tw`text-gray-600`}>Booking ID</Text>
// // // // // // // // //           <Text style={tw`text-gray-900 font-medium`}>{bookingId}</Text>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Payment Summary */}
// // // // // // // // //         <View style={tw`mt-4 bg-white p-4 rounded-lg shadow-sm`}>
// // // // // // // // //           <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Bill Details</Text>

// // // // // // // // //           <View style={tw`flex-row justify-between mb-3`}>
// // // // // // // // //             <Text style={tw`text-gray-600`}>
// // // // // // // // //               {consultationType === 'video' ? 'Video Consultation Fee' : 'Consultation Fee'}
// // // // // // // // //             </Text>
// // // // // // // // //             <Text style={tw`text-gray-900 font-medium`}>₹{doctor.consultation_fee}</Text>
// // // // // // // // //           </View>

// // // // // // // // //           <View style={tw`flex-row justify-between mb-3`}>
// // // // // // // // //             <Text style={tw`text-gray-600`}>Platform Fee</Text>
// // // // // // // // //             <View style={tw`flex-row items-center`}>
// // // // // // // // //               <Text style={tw`text-gray-400 line-through mr-2`}>₹49</Text>
// // // // // // // // //               <Text style={tw`text-green-600`}>FREE</Text>
// // // // // // // // //             </View>
// // // // // // // // //           </View>

// // // // // // // // //           <View style={tw`mt-3 pt-3 border-t border-gray-200`}>
// // // // // // // // //             <View style={tw`flex-row justify-between`}>
// // // // // // // // //               <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // // // // // // //               <Text style={tw`text-gray-900 font-bold`}>₹{doctor.consultation_fee}</Text>
// // // // // // // // //             </View>
// // // // // // // // //           </View>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Payment Methods */}
// // // // // // // // //         <View style={tw`mt-6 bg-white p-4 rounded-lg shadow-sm`}>
// // // // // // // // //           <Text style={tw`text-lg font-bold text-gray-900 mb-4`}>Payment Methods</Text>

// // // // // // // // //           {/* UPI */}
// // // // // // // // //           <TouchableOpacity style={tw`flex-row items-center justify-between p-3 border border-gray-200 rounded-lg mb-3`}>
// // // // // // // // //             <View style={tw`flex-row items-center`}>
// // // // // // // // //               <View style={tw`w-10 h-10 bg-blue-50 rounded-full items-center justify-center`}>
// // // // // // // // //                 <Text style={tw`text-blue-600 font-bold`}>UPI</Text>
// // // // // // // // //               </View>
// // // // // // // // //               <Text style={tw`ml-3 font-medium`}>UPI / QR Code</Text>
// // // // // // // // //             </View>
// // // // // // // // //             <Text style={tw`text-blue-600`}>PAY</Text>
// // // // // // // // //           </TouchableOpacity>

// // // // // // // // //           {/* Cards */}
// // // // // // // // //           <TouchableOpacity style={tw`flex-row items-center justify-between p-3 border border-gray-200 rounded-lg`}>
// // // // // // // // //             <View style={tw`flex-row items-center`}>
// // // // // // // // //               <View style={tw`w-10 h-10 bg-green-50 rounded-full items-center justify-center`}>
// // // // // // // // //                 <Text style={tw`text-green-600 font-bold`}>₹</Text>
// // // // // // // // //               </View>
// // // // // // // // //               <Text style={tw`ml-3 font-medium`}>Cards, Netbanking & More</Text>
// // // // // // // // //             </View>
// // // // // // // // //             <Text style={tw`text-blue-600`}>PAY</Text>
// // // // // // // // //           </TouchableOpacity>
// // // // // // // // //         </View>

// // // // // // // // //         {/* Pay Button */}
// // // // // // // // //         <TouchableOpacity
// // // // // // // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
// // // // // // // // //           onPress={handlePayment}
// // // // // // // // //           disabled={isProcessing}
// // // // // // // // //         >
// // // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // // // // // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // // // // // // //           </Text>
// // // // // // // // //         </TouchableOpacity>
// // // // // // // // //       </ScrollView>
// // // // // // // // //     </SafeAreaView>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default PaymentScreen;


// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import {
// // // // // // // //   View,
// // // // // // // //   Text,
// // // // // // // //   ScrollView,
// // // // // // // //   Image,
// // // // // // // //   TouchableOpacity,
// // // // // // // //   Alert,
// // // // // // // // } from 'react-native';
// // // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // // // // // import tw from 'twrnc';
// // // // // // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // // // // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // // // // type Doctor = {
// // // // // // // //   name: string;
// // // // // // // //   clinic: string;
// // // // // // // //   image: string;
// // // // // // // //   profile_picture?: string;
// // // // // // // //   user?: any;
// // // // // // // //   consultation_fee?: number;
// // // // // // // //   experience_years?: number;
// // // // // // // //   specialization?: string;
// // // // // // // // };

// // // // // // // // type RootStackParamList = {
// // // // // // // //   AppoinmentPaymentScreen: {
// // // // // // // //     doctor: Doctor;
// // // // // // // //     slot: string;
// // // // // // // //     date: string;
// // // // // // // //     consultationType: 'video' | 'inclinic';
// // // // // // // //     amount: number;
// // // // // // // //     bookingId: string;
// // // // // // // //   };
// // // // // // // // };

// // // // // // // // const PaymentScreen = () => {
// // // // // // // //   const navigation = useNavigation<any>();
// // // // // // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // // // // // //   const { doctor, slot, date, consultationType, amount, bookingId } = route.params;

// // // // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // // // //   // 🔹 Create Razorpay Order
// // // // // // // //   const createOrder = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await fetch('https://landing.docapp.co.in/api/payment/create-order', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           user_id: 1, // Replace with actual logged-in user ID
// // // // // // // //           amount: amount,
// // // // // // // //           appointmentId: bookingId,
// // // // // // // //           patientName: doctor?.user?.username || 'John Doe',
// // // // // // // //           patientEmail: doctor?.user?.email || 'john@example.com',
// // // // // // // //           patientPhone: doctor?.user?.phone_number || '9999999999',
// // // // // // // //           doctorName: doctor?.user?.username || 'Dr. Unknown',
// // // // // // // //           appointmentDate: date,
// // // // // // // //           appointmentTime: slot,
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       const data = await response.json();
// // // // // // // //       if (!data?.order?.id) {
// // // // // // // //         throw new Error('Order creation failed');
// // // // // // // //       }

// // // // // // // //       return data.order;
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('❌ Error creating Razorpay order:', err);
// // // // // // // //       Alert.alert('Error', 'Failed to create payment order');
// // // // // // // //       return null;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // 🔹 Verify Payment After Success
// // // // // // // //   const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
// // // // // // // //     try {
// // // // // // // //       const response = await fetch('http://localhost:5000/api/payment/verify', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           razorpay_order_id: orderId,
// // // // // // // //           razorpay_payment_id: paymentId,
// // // // // // // //           razorpay_signature: signature,
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       const data = await response.json();
// // // // // // // //       console.log('✅ Verification Response:', data);

// // // // // // // //       if (data.success) {
// // // // // // // //         navigation.navigate('AppointmentSuccess', {
// // // // // // // //           doctor,
// // // // // // // //           slot,
// // // // // // // //           date,
// // // // // // // //           consultationType,
// // // // // // // //           appointmentId: bookingId,
// // // // // // // //         });
// // // // // // // //       } else {
// // // // // // // //         Alert.alert('Verification Failed', 'Payment could not be verified');
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('❌ Error verifying payment:', err);
// // // // // // // //       Alert.alert('Error', 'Payment verification failed');
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // 🔹 Get Payment Status (Optional)
// // // // // // // //   const getPaymentStatus = async (orderId: string) => {
// // // // // // // //     try {
// // // // // // // //       const res = await fetch(`http://127.0.0.1:5000/api/payment/status/${orderId}`);
// // // // // // // //       const data = await res.json();
// // // // // // // //       console.log('Payment Status:', data);
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('❌ Error fetching payment status:', err);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // 🔹 Handle Payment Flow
// // // // // // // //   const handlePayment = async () => {
// // // // // // // //     if (isProcessing) return;
// // // // // // // //     setIsProcessing(true);

// // // // // // // //     const order = await createOrder();
// // // // // // // //     if (!order) {
// // // // // // // //       setIsProcessing(false);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const options = {
// // // // // // // //       description: 'Doctor Consultation Payment',
// // // // // // // //       image: 'https://your-logo-url.com/logo.png',
// // // // // // // //       currency: 'INR',
// // // // // // // //       key: 'rzp_test_YourKeyHere', // ⚠️ Replace with your actual Razorpay Key
// // // // // // // //       amount: amount * 100,
// // // // // // // //       name: 'DocApp',
// // // // // // // //       order_id: order.id,
// // // // // // // //       prefill: {
// // // // // // // //         email: doctor?.user?.email || 'john@example.com',
// // // // // // // //         contact: doctor?.user?.phone_number || '9999999999',
// // // // // // // //         name: doctor?.user?.username || 'John Doe',
// // // // // // // //       },
// // // // // // // //       theme: { color: '#00A0E3' },
// // // // // // // //     };

// // // // // // // //     RazorpayCheckout.open(options)
// // // // // // // //       .then(async (data: any) => {
// // // // // // // //         console.log('✅ Razorpay Success:', data);
// // // // // // // //         await verifyPayment(order.id, data.razorpay_payment_id, data.razorpay_signature);
// // // // // // // //         await getPaymentStatus(order.id);
// // // // // // // //       })
// // // // // // // //       .catch((error: any) => {
// // // // // // // //         console.error('❌ Razorpay Payment Failed:', error);
// // // // // // // //         Alert.alert('Payment Failed', error.description || 'Please try again.');
// // // // // // // //       })
// // // // // // // //       .finally(() => setIsProcessing(false));
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // // // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // // // // //         {/* Header */}
// // // // // // // //         <View style={tw`flex-row items-center mb-4`}>
// // // // // // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // // // // // //             <ArrowLeft size={24} color="#374151" />
// // // // // // // //           </TouchableOpacity>
// // // // // // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // // // // // //         </View>

// // // // // // // //         {/* Doctor Info */}
// // // // // // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // // // // // // //           <View style={tw`flex-row items-center mb-4`}>
// // // // // // // //             <Image
// // // // // // // //               source={{ uri: doctor.profile_picture }}
// // // // // // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // // // // // //             />
// // // // // // // //             <View style={tw`flex-1`}>
// // // // // // // //               <Text style={tw`font-bold text-gray-900`}>{doctor.user?.username}</Text>
// // // // // // // //               <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>
// // // // // // // //               <Text style={tw`text-green-700 mt-1`}>
// // // // // // // //                 Fee: ₹{doctor.consultation_fee}
// // // // // // // //               </Text>
// // // // // // // //             </View>
// // // // // // // //           </View>

// // // // // // // //           <View style={tw`flex-row items-center mb-2`}>
// // // // // // // //             <Calendar size={18} color="#4B5563" />
// // // // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // // // // // // //           </View>
// // // // // // // //           <View style={tw`flex-row items-center`}>
// // // // // // // //             <Clock size={18} color="#4B5563" />
// // // // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // // // // // // //           </View>
// // // // // // // //         </View>

// // // // // // // //         {/* Total */}
// // // // // // // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // // // // // // //           <View style={tw`flex-row justify-between`}>
// // // // // // // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // // // // // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // // // // // // //           </View>
// // // // // // // //         </View>

// // // // // // // //         {/* Pay Button */}
// // // // // // // //         <TouchableOpacity
// // // // // // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
// // // // // // // //           onPress={handlePayment}
// // // // // // // //           disabled={isProcessing}
// // // // // // // //         >
// // // // // // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // // // // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // // // // // //           </Text>
// // // // // // // //         </TouchableOpacity>
// // // // // // // //       </ScrollView>
// // // // // // // //     </SafeAreaView>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PaymentScreen;


// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   View,
// // // // // // //   Text,
// // // // // // //   ScrollView,
// // // // // // //   Image,
// // // // // // //   TouchableOpacity,
// // // // // // //   Alert,
// // // // // // // } from 'react-native';
// // // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // // // // import tw from 'twrnc';
// // // // // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // // // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // // // type Doctor = {
// // // // // // //   id?: number | string;
// // // // // // //   name: string;
// // // // // // //   clinic: string;
// // // // // // //   image: string;
// // // // // // //   profile_picture?: string;
// // // // // // //   user?: any;
// // // // // // //   consultation_fee?: number;
// // // // // // //   experience_years?: number;
// // // // // // //   specialization?: string;
// // // // // // // };

// // // // // // // type RootStackParamList = {
// // // // // // //   AppoinmentPaymentScreen: {
// // // // // // //     doctor: Doctor;
// // // // // // //     slot: string;
// // // // // // //     date: string;
// // // // // // //     consultationType: 'video' | 'inclinic';
// // // // // // //     amount: number;
// // // // // // //   };
// // // // // // // };

// // // // // // // const PaymentScreen = () => {
// // // // // // //   const navigation = useNavigation<any>();
// // // // // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // // // // //   const { doctor, slot, date, consultationType, amount } = route.params;

// // // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // // //   // 🔹 Step 1: Create Appointment First
// // // // // // //   const createAppointment = async () => {
// // // // // // //     try {
// // // // // // //       const response = await fetch(
// // // // // // //         'https://landing.docapp.co.in/api/appointment/create-appointment',
// // // // // // //         {
// // // // // // //           method: 'POST',
// // // // // // //           headers: { 'Content-Type': 'application/json' },
// // // // // // //           body: JSON.stringify({
// // // // // // //             doctor_id: doctor?.id || doctor?.user?.id || 1,
// // // // // // //             date: date,
// // // // // // //             start: slot.split('-')[0]?.trim() || '10:00',
// // // // // // //             end: slot.split('-')[1]?.trim() || '10:30',
// // // // // // //             type: consultationType === 'video' ? 'online' : 'offline',
// // // // // // //             payment_mode: 'online',
// // // // // // //           }),
// // // // // // //         }
// // // // // // //       );

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('✅ Appointment Response:', data);

// // // // // // //       if (!response.ok || !data?.createdAppointment?.id) {
// // // // // // //         throw new Error(data?.message || 'Failed to create appointment');
// // // // // // //       }

// // // // // // //       return data.createdAppointment.id;
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Error creating appointment:', err);
// // // // // // //       Alert.alert('Error', 'Failed to create appointment. Please try again.');
// // // // // // //       return null;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // 🔹 Step 2: Create Razorpay Order
// // // // // // //   const createOrder = async (appointmentId: number) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch('https://landing.docapp.co.in/api/payment/create-order', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({
// // // // // // //           user_id: 1, // Replace with actual logged-in user ID
// // // // // // //           amount: amount,
// // // // // // //           appointmentId: appointmentId,
// // // // // // //           patientName: doctor?.user?.username || 'John Doe',
// // // // // // //           patientEmail: doctor?.user?.email || 'john@example.com',
// // // // // // //           patientPhone: doctor?.user?.phone_number || '9999999999',
// // // // // // //           doctorName: doctor?.user?.username || 'Dr. Unknown',
// // // // // // //           appointmentDate: date,
// // // // // // //           appointmentTime: slot,
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('✅ Order Response:', data);

// // // // // // //       if (!data?.order?.id) {
// // // // // // //         throw new Error('Order creation failed');
// // // // // // //       }

// // // // // // //       return data.order;
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Error creating Razorpay order:', err);
// // // // // // //       Alert.alert('Error', 'Failed to create payment order.');
// // // // // // //       return null;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // 🔹 Step 3: Verify Payment
// // // // // // //   const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
// // // // // // //     try {
// // // // // // //       const response = await fetch('http://localhost:5000/api/payment/verify', {
// // // // // // //         method: 'POST',
// // // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // // //         body: JSON.stringify({
// // // // // // //           razorpay_order_id: orderId,
// // // // // // //           razorpay_payment_id: paymentId,
// // // // // // //           razorpay_signature: signature,
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       const data = await response.json();
// // // // // // //       console.log('✅ Verification Response:', data);

// // // // // // //       if (data.success) {
// // // // // // //         navigation.navigate('AppointmentSuccess', {
// // // // // // //           doctor,
// // // // // // //           slot,
// // // // // // //           date,
// // // // // // //           consultationType,
// // // // // // //           appointmentId: orderId,
// // // // // // //         });
// // // // // // //       } else {
// // // // // // //         Alert.alert('Verification Failed', 'Payment could not be verified.');
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Error verifying payment:', err);
// // // // // // //       Alert.alert('Error', 'Payment verification failed.');
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // 🔹 Step 4: (Optional) Get Payment Status
// // // // // // //   const getPaymentStatus = async (orderId: string) => {
// // // // // // //     try {
// // // // // // //       const res = await fetch(`http://127.0.0.1:5000/api/payment/status/${orderId}`);
// // // // // // //       const data = await res.json();
// // // // // // //       console.log('Payment Status:', data);
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Error fetching payment status:', err);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // 🔹 Step 5: Handle Complete Payment Flow
// // // // // // //   const handlePayment = async () => {
// // // // // // //     if (isProcessing) return;
// // // // // // //     setIsProcessing(true);

// // // // // // //     try {
// // // // // // //       // 1️⃣ Create Appointment
// // // // // // //       const appointmentId = await createAppointment();
// // // // // // //       if (!appointmentId) throw new Error('Appointment creation failed.');

// // // // // // //       // 2️⃣ Create Razorpay Order
// // // // // // //       const order = await createOrder(appointmentId);
// // // // // // //       if (!order) throw new Error('Order creation failed.');

// // // // // // //       // 3️⃣ Open Razorpay Checkout
// // // // // // //       const options = {
// // // // // // //         description: 'Doctor Consultation Payment',
// // // // // // //         image: 'https://your-logo-url.com/logo.png',
// // // // // // //         currency: 'INR',
// // // // // // //         key: 'rzp_test_YourKeyHere', // ⚠️ Replace with your Razorpay key
// // // // // // //         amount: amount * 100,
// // // // // // //         name: 'DocApp',
// // // // // // //         order_id: order.id,
// // // // // // //         prefill: {
// // // // // // //           email: doctor?.user?.email || 'john@example.com',
// // // // // // //           contact: doctor?.user?.phone_number || '9999999999',
// // // // // // //           name: doctor?.user?.username || 'John Doe',
// // // // // // //         },
// // // // // // //         theme: { color: '#00A0E3' },
// // // // // // //       };

// // // // // // //       RazorpayCheckout.open(options)
// // // // // // //         .then(async (data: any) => {
// // // // // // //           console.log('✅ Razorpay Success:', data);
// // // // // // //           await verifyPayment(order.id, data.razorpay_payment_id, data.razorpay_signature);
// // // // // // //           await getPaymentStatus(order.id);
// // // // // // //         })
// // // // // // //         .catch((error: any) => {
// // // // // // //           console.error('❌ Razorpay Payment Failed:', error);
// // // // // // //           Alert.alert('Payment Failed', error.description || 'Please try again.');
// // // // // // //         })
// // // // // // //         .finally(() => setIsProcessing(false));
// // // // // // //     } catch (err) {
// // // // // // //       console.error('❌ Payment Flow Error:', err);
// // // // // // //       Alert.alert('Error', err.message || 'Something went wrong during payment.');
// // // // // // //       setIsProcessing(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // // // //         {/* Header */}
// // // // // // //         <View style={tw`flex-row items-center mb-4`}>
// // // // // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // // // // //             <ArrowLeft size={24} color="#374151" />
// // // // // // //           </TouchableOpacity>
// // // // // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // // // // //         </View>

// // // // // // //         {/* Doctor Info */}
// // // // // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // // // // // //           <View style={tw`flex-row items-center mb-4`}>
// // // // // // //             <Image
// // // // // // //               source={{ uri: doctor.profile_picture }}
// // // // // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // // // // //             />
// // // // // // //             <View style={tw`flex-1`}>
// // // // // // //               <Text style={tw`font-bold text-gray-900`}>{doctor.user?.username}</Text>
// // // // // // //               <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>
// // // // // // //               <Text style={tw`text-green-700 mt-1`}>
// // // // // // //                 Fee: ₹{doctor.consultation_fee}
// // // // // // //               </Text>
// // // // // // //             </View>
// // // // // // //           </View>

// // // // // // //           <View style={tw`flex-row items-center mb-2`}>
// // // // // // //             <Calendar size={18} color="#4B5563" />
// // // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // // // // // //           </View>
// // // // // // //           <View style={tw`flex-row items-center`}>
// // // // // // //             <Clock size={18} color="#4B5563" />
// // // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Total */}
// // // // // // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // // // // // //           <View style={tw`flex-row justify-between`}>
// // // // // // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // // // // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // // // // // //           </View>
// // // // // // //         </View>

// // // // // // //         {/* Pay Button */}
// // // // // // //         <TouchableOpacity
// // // // // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
// // // // // // //           onPress={handlePayment}
// // // // // // //           disabled={isProcessing}
// // // // // // //         >
// // // // // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // // // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // // // // //           </Text>
// // // // // // //         </TouchableOpacity>
// // // // // // //       </ScrollView>
// // // // // // //     </SafeAreaView>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PaymentScreen;







// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   View,
// // // // // //   Text,
// // // // // //   ScrollView,
// // // // // //   Image,
// // // // // //   TouchableOpacity,
// // // // // //   Alert,
// // // // // // } from 'react-native';
// // // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // // // import tw from 'twrnc';
// // // // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // // type Doctor = {
// // // // // //   id?: number | string;
// // // // // //   name: string;
// // // // // //   clinic: string;
// // // // // //   image: string;
// // // // // //   profile_picture?: string;
// // // // // //   user?: {
// // // // // //     id?: number|string;
// // // // // //     username?: string;
// // // // // //     email?: string;
// // // // // //     phone_number?: string;
// // // // // //   };
// // // // // //   consultation_fee?: number;
// // // // // //   experience_years?: number;
// // // // // //   specialization?: string;
// // // // // // };

// // // // // // type RootStackParamList = {
// // // // // //   AppoinmentPaymentScreen: {
// // // // // //     doctor: Doctor;
// // // // // //     slot: string;
// // // // // //     date: string;
// // // // // //     consultationType: 'video' | 'inclinic';
// // // // // //     amount: number;
// // // // // //   };
// // // // // // };

// // // // // // const PaymentScreen = () => {
// // // // // //   const navigation = useNavigation<any>();
// // // // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // // // //   const { doctor, slot, date, consultationType, amount } = route.params;

// // // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // // //   // Step 1: Create Appointment
// // // // // //   const createAppointment = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         'https://landing.docapp.co.in/api/appointment/create-appointment',
// // // // // //         {
// // // // // //           method: 'POST',
// // // // // //           headers: { 'Content-Type': 'application/json' },
// // // // // //           body: JSON.stringify({
// // // // // //             doctor_id: doctor?.id || doctor?.user?.id || 1,
// // // // // //             date: date,
// // // // // //             start: slot.split('-')[0]?.trim() || '10:00',
// // // // // //             end: slot.split('-')[1]?.trim() || '10:30',
// // // // // //             type: consultationType === 'video' ? 'online' : 'offline',
// // // // // //             payment_mode: 'online',
// // // // // //           }),
// // // // // //         }
// // // // // //       );

// // // // // //       const data = await response.json();
// // // // // //       // Expecting: data.createdAppointment.id
// // // // // //       if (!response.ok || !data?.createdAppointment?.id) {
// // // // // //         throw new Error(data?.message || 'Failed to create appointment');
// // // // // //       }
// // // // // //       return data.createdAppointment.id; // <-- Use this in next step
// // // // // //     } catch (err) {
// // // // // //       Alert.alert('Error', 'Failed to create appointment. Please try again.');
// // // // // //       return null;
// // // // // //     }
// // // // // //   };

// // // // // //   // Step 2: Create Razorpay Order
// // // // // //   const createOrder = async (appointmentId: number) => {
// // // // // //     try {
// // // // // //       const response = await fetch('https://landing.docapp.co.in/api/payment/create-order', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({
// // // // // //           user_id: doctor?.user?.id || 1, // Should be logged-in user's ID
// // // // // //           amount: amount,
// // // // // //           appointmentId: appointmentId,
// // // // // //           patientName: doctor?.user?.username || 'John Doe',
// // // // // //           patientEmail: doctor?.user?.email || 'john@example.com',
// // // // // //           patientPhone: doctor?.user?.phone_number || '9999999999',
// // // // // //           doctorName: doctor?.user?.username || 'Dr. Unknown',
// // // // // //           appointmentDate: date,
// // // // // //           appointmentTime: slot,
// // // // // //         }),
// // // // // //       });

// // // // // //       const data = await response.json();
// // // // // //       // Expecting: data.order.id
// // // // // //       if (!response.ok || !data?.order?.id) {
// // // // // //         throw new Error('Order creation failed');
// // // // // //       }
// // // // // //       return data.order;
// // // // // //     } catch (err) {
// // // // // //       Alert.alert('Error', 'Failed to create payment order.');
// // // // // //       return null;
// // // // // //     }
// // // // // //   };

// // // // // //   // Step 3: Verify Payment locally
// // // // // //   const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
// // // // // //     try {
// // // // // //       const response = await fetch('http://localhost:5000/api/payment/verify', {
// // // // // //         method: 'POST',
// // // // // //         headers: { 'Content-Type': 'application/json' },
// // // // // //         body: JSON.stringify({
// // // // // //           razorpay_order_id: orderId,
// // // // // //           razorpay_payment_id: paymentId,
// // // // // //           razorpay_signature: signature,
// // // // // //         }),
// // // // // //       });
// // // // // //       const data = await response.json();
// // // // // //       if (data.success) {
// // // // // //         navigation.navigate('AppointmentSuccess', {
// // // // // //           doctor,
// // // // // //           slot,
// // // // // //           date,
// // // // // //           consultationType,
// // // // // //           appointmentId: orderId,
// // // // // //         });
// // // // // //       } else {
// // // // // //         Alert.alert('Verification Failed', 'Payment could not be verified.');
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       Alert.alert('Error', 'Payment verification failed.');
// // // // // //     }
// // // // // //   };

// // // // // //   // Step 4: Get Payment Status -- OPTIONAL
// // // // // //   const getPaymentStatus = async (orderId: string) => {
// // // // // //     try {
// // // // // //       const res = await fetch(`http://127.0.0.1:5000/api/payment/status/${orderId}`);
// // // // // //       const data = await res.json();
// // // // // //       console.log('Payment Status:', data);
// // // // // //     } catch (err) {
// // // // // //       // Optional, just logging
// // // // // //     }
// // // // // //   };

// // // // // //   // Step 5: Handle Complete Payment Flow
// // // // // //   const handlePayment = async () => {
// // // // // //     if (isProcessing) return;
// // // // // //     setIsProcessing(true);

// // // // // //     try {
// // // // // //       // 1. Create Appointment and get ID
// // // // // //       const appointmentId = await createAppointment();
// // // // // //       if (!appointmentId) throw new Error('Appointment creation failed.');

// // // // // //       // 2. Create Razorpay Order
// // // // // //       const order = await createOrder(appointmentId);
// // // // // //       if (!order) throw new Error('Order creation failed.');

// // // // // //       // 3. Open Razorpay Checkout
// // // // // //       const options = {
// // // // // //         description: 'Doctor Consultation Payment',
// // // // // //         image: 'https://your-logo-url.com/logo.png',
// // // // // //         currency: 'INR',
// // // // // //         key: 'rzp_test_YourKeyHere', // Replace with live/test Razorpay key
// // // // // //         amount: amount * 100, // In paise
// // // // // //         name: 'DocApp',
// // // // // //         order_id: order.id,
// // // // // //         prefill: {
// // // // // //           email: doctor?.user?.email || 'john@example.com',
// // // // // //           contact: doctor?.user?.phone_number || '9999999999',
// // // // // //           name: doctor?.user?.username || 'John Doe',
// // // // // //         },
// // // // // //         theme: { color: '#00A0E3' },
// // // // // //       };

// // // // // //       RazorpayCheckout.open(options)
// // // // // //         .then(async (data: any) => {
// // // // // //           await verifyPayment(order.id, data.razorpay_payment_id, data.razorpay_signature);
// // // // // //           await getPaymentStatus(order.id);
// // // // // //         })
// // // // // //         .catch((error: any) => {
// // // // // //           Alert.alert('Payment Failed', error.description || 'Please try again.');
// // // // // //         })
// // // // // //         .finally(() => setIsProcessing(false));
// // // // // //     } catch (err: any) {
// // // // // //       Alert.alert('Error', err.message || 'Something went wrong during payment.');
// // // // // //       setIsProcessing(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // // //         {/* Header */}
// // // // // //         <View style={tw`flex-row items-center mb-4`}>
// // // // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // // // //             <ArrowLeft size={24} color="#374151" />
// // // // // //           </TouchableOpacity>
// // // // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // // // //         </View>

// // // // // //         {/* Doctor Info */}
// // // // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // // // // //           <View style={tw`flex-row items-center mb-4`}>
// // // // // //             <Image
// // // // // //               source={{ uri: doctor.profile_picture }}
// // // // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // // // //             />
// // // // // //             <View style={tw`flex-1`}>
// // // // // //               <Text style={tw`font-bold text-gray-900`}>{doctor.user?.username}</Text>
// // // // // //               <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>
// // // // // //               <Text style={tw`text-green-700 mt-1`}>
// // // // // //                 Fee: ₹{doctor.consultation_fee}
// // // // // //               </Text>
// // // // // //             </View>
// // // // // //           </View>

// // // // // //           <View style={tw`flex-row items-center mb-2`}>
// // // // // //             <Calendar size={18} color="#4B5563" />
// // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // // // // //           </View>
// // // // // //           <View style={tw`flex-row items-center`}>
// // // // // //             <Clock size={18} color="#4B5563" />
// // // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Total */}
// // // // // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // // // // //           <View style={tw`flex-row justify-between`}>
// // // // // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // // // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // // // // //           </View>
// // // // // //         </View>

// // // // // //         {/* Pay Button */}
// // // // // //         <TouchableOpacity
// // // // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
// // // // // //           onPress={handlePayment}
// // // // // //           disabled={isProcessing}
// // // // // //         >
// // // // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // // // //           </Text>
// // // // // //         </TouchableOpacity>
// // // // // //       </ScrollView>
// // // // // //     </SafeAreaView>
// // // // // //   );
// // // // // // };

// // // // // // export default PaymentScreen;


// // // // // import React, { useState } from 'react';
// // // // // import {
// // // // //   View, Text, ScrollView, Image, TouchableOpacity, Alert,
// // // // // } from 'react-native';
// // // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // // import tw from 'twrnc';
// // // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // // type Doctor = {
// // // // //   id?: number | string;
// // // // //   name: string;
// // // // //   clinic: string;
// // // // //   image: string;
// // // // //   profile_picture?: string;
// // // // //   user?: {
// // // // //     id?: number|string;
// // // // //     username?: string;
// // // // //     email?: string;
// // // // //     phone_number?: string;
// // // // //   };
// // // // //   consultation_fee?: number;
// // // // //   experience_years?: number;
// // // // //   specialization?: string;
// // // // // };

// // // // // type RootStackParamList = {
// // // // //   AppoinmentPaymentScreen: {
// // // // //     doctor: Doctor;
// // // // //     slot: string;
// // // // //     date: string;
// // // // //     consultationType: 'video' | 'inclinic';
// // // // //     amount: number;
// // // // //   };
// // // // // };

// // // // // const PaymentScreen = () => {
// // // // //   const navigation = useNavigation<any>();
// // // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // // //   const { doctor, slot, date, consultationType, amount } = route.params;
// // // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // // //   // Step 1: Create appointment in DocApp
// // // // //   const createAppointment = async () => {
// // // // //     try {
// // // // //       const payload = {
// // // // //         doctor_id: doctor?.id || doctor?.user?.id || 1,
// // // // //         date: date, // yyyy-mm-dd
// // // // //         start: slot.split('-')[0]?.trim() || '10:00',
// // // // //         end: slot.split('-')[1]?.trim() || '10:30',
// // // // //         type: consultationType === 'video' ? 'online' : 'offline',
// // // // //         payment_mode: 'online',
// // // // //       };
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/appointment/create-appointment', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(payload),
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       if (!response.ok || !data?.createdAppointment?.id) {
// // // // //         throw new Error(data?.message || 'Failed to create appointment');
// // // // //       }
// // // // //       return data.createdAppointment.id; // integer
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', 'Failed to create appointment. Please try again.');
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   // Step 2: Create Razorpay order in DocApp
// // // // //   const createOrder = async (appointmentId: number) => {
// // // // //     try {
// // // // //       const payload = {
// // // // //         user_id: doctor?.user?.id || 1, // <-- Change to Logged-in user ID
// // // // //         amount: amount,
// // // // //         appointmentId: appointmentId,
// // // // //         patientName: doctor?.user?.username || 'John Doe',
// // // // //         patientEmail: doctor?.user?.email || 'john@example.com',
// // // // //         patientPhone: doctor?.user?.phone_number || '9999999999',
// // // // //         doctorName: doctor?.user?.username || 'Dr. Unknown',
// // // // //         appointmentDate: date,
// // // // //         appointmentTime: slot,
// // // // //       };
// // // // //       const response = await fetch('https://landing.docapp.co.in/api/payment/create-order', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify(payload),
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       if (!response.ok || !data?.order?.id) {
// // // // //         throw new Error('Order creation failed');
// // // // //       }
// // // // //       return data.order; // contains .id (order_id), amount, currency, etc
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', 'Failed to create payment order.');
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   // Step 3: Verify Razorpay payment
// // // // //   const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
// // // // //     try {
// // // // //       const response = await fetch('http://localhost:5000/api/payment/verify', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Content-Type': 'application/json' },
// // // // //         body: JSON.stringify({
// // // // //           razorpay_order_id: orderId,
// // // // //           razorpay_payment_id: paymentId,
// // // // //           razorpay_signature: signature,
// // // // //         }),
// // // // //       });
// // // // //       const data = await response.json();
// // // // //       if (data.success) {
// // // // //         navigation.navigate('AppointmentSuccess', {
// // // // //           doctor,
// // // // //           slot,
// // // // //           date,
// // // // //           consultationType,
// // // // //           appointmentId: orderId,
// // // // //         });
// // // // //       } else {
// // // // //         Alert.alert('Verification Failed', 'Payment could not be verified.');
// // // // //       }
// // // // //     } catch (err) {
// // // // //       Alert.alert('Error', 'Payment verification failed.');
// // // // //     }
// // // // //   };

// // // // //   // Step 4: Optionally fetch payment status for debugging
// // // // //   const getPaymentStatus = async (orderId: string) => {
// // // // //     try {
// // // // //       const res = await fetch(`http://127.0.0.1:5000/api/payment/status/${orderId}`);
// // // // //       const data = await res.json();
// // // // //       console.log('Payment Status:', data);
// // // // //     } catch (err) {}
// // // // //   };

// // // // //   // Step 5: Full payment flow
// // // // //   const handlePayment = async () => {
// // // // //     if (isProcessing) return;
// // // // //     setIsProcessing(true);

// // // // //     try {
// // // // //       // 1. Create appointment and get its ID
// // // // //       const appointmentId = await createAppointment();
// // // // //       if (!appointmentId) throw new Error('Appointment creation failed.');

// // // // //       // 2. Create Razorpay order in DocApp and get order object (with .id)
// // // // //       const order = await createOrder(appointmentId);
// // // // //       if (!order || !order.id) throw new Error('Order creation failed.');

// // // // //       // 3. Open Razorpay Checkout on device
// // // // //       const options = {
// // // // //         description: 'Doctor Consultation Payment',
// // // // //         image: 'https://your-logo-url.com/logo.png',
// // // // //         currency: order.currency || 'INR',
// // // // //         key: 'rzp_test_YourKeyHere', // <--- REPLACE WITH YOUR KEY (Test or Live)
// // // // //         amount: (order.amount || amount) * 100, // paise
// // // // //         name: 'DocApp',
// // // // //         order_id: order.id,
// // // // //         prefill: {
// // // // //           email: doctor?.user?.email || 'john@example.com',
// // // // //           contact: doctor?.user?.phone_number || '9999999999',
// // // // //           name: doctor?.user?.username || 'John Doe',
// // // // //         },
// // // // //         theme: { color: '#00A0E3' },
// // // // //       };

// // // // //       RazorpayCheckout.open(options)
// // // // //         .then(async (data: any) => {
// // // // //           // Razorpay returns payment_id, order_id, signature
// // // // //           await verifyPayment(order.id, data.razorpay_payment_id, data.razorpay_signature);
// // // // //           await getPaymentStatus(order.id); // Optional, for debugging
// // // // //         })
// // // // //         .catch((error: any) => {
// // // // //           Alert.alert('Payment Failed', error.description || 'Please try again.');
// // // // //         })
// // // // //         .finally(() => setIsProcessing(false));
// // // // //     } catch (err: any) {
// // // // //       Alert.alert('Error', err.message || 'Something went wrong during payment.');
// // // // //       setIsProcessing(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // // //         {/* Header */}
// // // // //         <View style={tw`flex-row items-center mb-4`}>
// // // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // // //             <ArrowLeft size={24} color="#374151" />
// // // // //           </TouchableOpacity>
// // // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // // //         </View>

// // // // //         {/* Doctor Info */}
// // // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // // // //           <View style={tw`flex-row items-center mb-4`}>
// // // // //             <Image
// // // // //               source={{ uri: doctor.profile_picture }}
// // // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // // //             />
// // // // //             <View style={tw`flex-1`}>
// // // // //               <Text style={tw`font-bold text-gray-900`}>{doctor.user?.username}</Text>
// // // // //               <Text style={tw`text-gray-600`}>{doctor.specialization}</Text>
// // // // //               <Text style={tw`text-green-700 mt-1`}>
// // // // //                 Fee: ₹{doctor.consultation_fee}
// // // // //               </Text>
// // // // //             </View>
// // // // //           </View>

// // // // //           <View style={tw`flex-row items-center mb-2`}>
// // // // //             <Calendar size={18} color="#4B5563" />
// // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // // // //           </View>
// // // // //           <View style={tw`flex-row items-center`}>
// // // // //             <Clock size={18} color="#4B5563" />
// // // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // // // //           </View>
// // // // //         </View>

// // // // //         {/* Total */}
// // // // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // // // //           <View style={tw`flex-row justify-between`}>
// // // // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // // // //           </View>
// // // // //         </View>

// // // // //         {/* Pay Button */}
// // // // //         <TouchableOpacity
// // // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
// // // // //           onPress={handlePayment}
// // // // //           disabled={isProcessing}
// // // // //         >
// // // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // // //           </Text>
// // // // //         </TouchableOpacity>
// // // // //       </ScrollView>
// // // // //     </SafeAreaView>
// // // // //   );
// // // // // };

// // // // // export default PaymentScreen;



// // // // import React, { useState } from 'react';
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   ScrollView,
// // // //   Image,
// // // //   TouchableOpacity,
// // // //   Alert,
// // // // } from 'react-native';
// // // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // // import tw from 'twrnc';
// // // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // // import RazorpayCheckout from 'react-native-razorpay';

// // // // type Doctor = {
// // // //   id?: number | string;
// // // //   name: string;
// // // //   clinic: string;
// // // //   image?: string;
// // // //   profile_picture?: string;
// // // //   user?: {
// // // //     id?: number | string;
// // // //     username?: string;
// // // //     email?: string;
// // // //     phone_number?: string;
// // // //   };
// // // //   consultation_fee?: number;
// // // //   experience_years?: number;
// // // //   specialization?: string;
// // // // };

// // // // type RootStackParamList = {
// // // //   AppoinmentPaymentScreen: {
// // // //     doctor: Doctor;
// // // //     slot: string;
// // // //     date: string;
// // // //     consultationType: 'video' | 'inclinic';
// // // //     amount: number;
// // // //   };
// // // // };

// // // // const PaymentScreen = () => {
// // // //   const navigation = useNavigation<any>();
// // // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // // //   const { doctor, slot, date, consultationType, amount } = route.params;
// // // //   const [isProcessing, setIsProcessing] = useState(false);

// // // //   // Step 1: Create Appointment
// // // //   const createAppointment = async () => {
// // // //     try {
// // // //       const payload = {
// // // //         doctor_id: doctor?.id || doctor?.user?.id || 1,
// // // //         date: date,
// // // //         start: slot.split('-')[0]?.trim() || '10:00',
// // // //         end: slot.split('-')[1]?.trim() || '10:30',
// // // //         type: consultationType === 'video' ? 'online' : 'offline',
// // // //         payment_mode: 'online',
// // // //       };

// // // //       const response = await fetch(
// // // //         'https://landing.docapp.co.in/api/appointment/create-appointment',
// // // //         {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify(payload),
// // // //         }
// // // //       );

// // // //       const data = await response.json();
// // // //       console.log('Appointment Response:', data);

// // // //       if (!response.ok || !data?.createdAppointment?.id) {
// // // //         throw new Error(data?.message || 'Failed to create appointment');
// // // //       }

// // // //       return data.createdAppointment.id;
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       Alert.alert('Error', 'Failed to create appointment. Please try again.');
// // // //       return null;
// // // //     }
// // // //   };

// // // //   // Step 2: Create Razorpay Order
// // // //   const createOrder = async (appointmentId: number) => {
// // // //     try {
// // // //       const payload = {
// // // //         user_id: doctor?.user?.id || 1, // replace with actual logged-in user id
// // // //         amount: amount,
// // // //         appointmentId: appointmentId,
// // // //         patientName: doctor?.user?.username || 'John Doe',
// // // //         patientEmail: doctor?.user?.email || 'john@example.com',
// // // //         patientPhone: doctor?.user?.phone_number || '9999999999',
// // // //         doctorName: doctor?.user?.username || 'Dr. Unknown',
// // // //         appointmentDate: date,
// // // //         appointmentTime: slot,
// // // //       };

// // // //       const response = await fetch(
// // // //         'https://landing.docapp.co.in/api/payment/create-order',
// // // //         {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify(payload),
// // // //         }
// // // //       );

// // // //       const data = await response.json();
// // // //       console.log('Create Order Response:', data);

// // // //       if (!response.ok || !data?.order?.id) {
// // // //         throw new Error(data?.message || 'Order creation failed');
// // // //       }

// // // //       return data.order;
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       Alert.alert('Error', 'Failed to create payment order.');
// // // //       return null;
// // // //     }
// // // //   };

// // // //   // Step 3: Verify Payment
// // // //   const verifyPayment = async (
// // // //     orderId: string,
// // // //     paymentId: string,
// // // //     signature: string
// // // //   ) => {
// // // //     try {
// // // //       const response = await fetch(
// // // //         'https://landing.docapp.co.in/api/payment/verify',
// // // //         {
// // // //           method: 'POST',
// // // //           headers: { 'Content-Type': 'application/json' },
// // // //           body: JSON.stringify({
// // // //             razorpay_order_id: orderId,
// // // //             razorpay_payment_id: paymentId,
// // // //             razorpay_signature: signature,
// // // //           }),
// // // //         }
// // // //       );

// // // //       const data = await response.json();
// // // //       console.log('Verify Payment Response:', data);

// // // //       if (data.success) {
// // // //         Alert.alert('Success', 'Payment successful and verified!');
// // // //         navigation.navigate('AppointmentSuccess', {
// // // //           doctor,
// // // //           slot,
// // // //           date,
// // // //           consultationType,
// // // //           appointmentId: orderId,
// // // //         });
// // // //       } else {
// // // //         Alert.alert('Verification Failed', 'Payment verification failed.');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       Alert.alert('Error', 'Payment verification failed.');
// // // //     }
// // // //   };

// // // //   // Step 4: Handle Full Payment Flow
// // // //   const handlePayment = async () => {
// // // //     if (isProcessing) return;
// // // //     setIsProcessing(true);

// // // //     try {
// // // //       // 1. Create Appointment (status pending)
// // // //       const appointmentId = await createAppointment();
// // // //       if (!appointmentId) throw new Error('Failed to create appointment.');

// // // //       // 2. Create Razorpay Order linked with appointmentId
// // // //       const order = await createOrder(appointmentId);
// // // //       if (!order?.id) throw new Error('Failed to create Razorpay order.');

// // // //       // 3. Open Razorpay checkout
// // // //       const options = {
// // // //         description: 'Doctor Consultation Payment',
// // // //         image: 'https://your-logo-url.com/logo.png',
// // // //         currency: order.currency || 'INR',
// // // //         key: 'rzp_test_YourKeyHere', // 🔑 Replace with your Razorpay test/live key
// // // //         amount: order.amount * 100, // convert to paise if backend sends in rupees
// // // //         name: 'DocApp',
// // // //         order_id: order.id,
// // // //         prefill: {
// // // //           email: doctor?.user?.email || 'john@example.com',
// // // //           contact: doctor?.user?.phone_number || '9999999999',
// // // //           name: doctor?.user?.username || 'John Doe',
// // // //         },
// // // //         theme: { color: '#00A0E3' },
// // // //       };

// // // //       RazorpayCheckout.open(options)
// // // //         .then(async (data: any) => {
// // // //           console.log('Razorpay Success:', data);
// // // //           await verifyPayment(
// // // //             order.id,
// // // //             data.razorpay_payment_id,
// // // //             data.razorpay_signature
// // // //           );
// // // //         })
// // // //         .catch((error: any) => {
// // // //           console.log('Razorpay Error:', error);
// // // //           Alert.alert('Payment Failed', error.description || 'Try again.');
// // // //         })
// // // //         .finally(() => setIsProcessing(false));
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       Alert.alert('Error', err.message || 'Something went wrong.');
// // // //       setIsProcessing(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // // //         {/* Header */}
// // // //         <View style={tw`flex-row items-center mb-4`}>
// // // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // // //             <ArrowLeft size={24} color="#374151" />
// // // //           </TouchableOpacity>
// // // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // // //         </View>

// // // //         {/* Doctor Info */}
// // // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // // //           <View style={tw`flex-row items-center mb-4`}>
// // // //             <Image
// // // //               source={{ uri: doctor.profile_picture }}
// // // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // // //             />
// // // //             <View style={tw`flex-1`}>
// // // //               <Text style={tw`font-bold text-gray-900`}>
// // // //                 {doctor.user?.username || 'Doctor'}
// // // //               </Text>
// // // //               <Text style={tw`text-gray-600`}>
// // // //                 {doctor.specialization || 'General Physician'}
// // // //               </Text>
// // // //               <Text style={tw`text-green-700 mt-1`}>
// // // //                 Fee: ₹{doctor.consultation_fee || amount}
// // // //               </Text>
// // // //             </View>
// // // //           </View>

// // // //           <View style={tw`flex-row items-center mb-2`}>
// // // //             <Calendar size={18} color="#4B5563" />
// // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // // //           </View>

// // // //           <View style={tw`flex-row items-center`}>
// // // //             <Clock size={18} color="#4B5563" />
// // // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // // //           </View>
// // // //         </View>

// // // //         {/* Total */}
// // // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // // //           <View style={tw`flex-row justify-between`}>
// // // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // // //           </View>
// // // //         </View>

// // // //         {/* Pay Button */}
// // // //         <TouchableOpacity
// // // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${
// // // //             isProcessing ? 'opacity-50' : ''
// // // //           }`}
// // // //           onPress={handlePayment}
// // // //           disabled={isProcessing}
// // // //         >
// // // //           <Text style={tw`text-white font-bold text-lg`}>
// // // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // // //           </Text>
// // // //         </TouchableOpacity>
// // // //       </ScrollView>
// // // //     </SafeAreaView>
// // // //   );
// // // // };

// // // // export default PaymentScreen;


// // // import React, { useState } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   ScrollView,
// // //   Image,
// // //   TouchableOpacity,
// // //   Alert,
// // // } from 'react-native';
// // // import { SafeAreaView } from 'react-native-safe-area-context';
// // // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // // import tw from 'twrnc';
// // // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';
// // // import RazorpayCheckout from 'react-native-razorpay';

// // // type Doctor = {
// // //   id?: number | string;
// // //   name?: string;
// // //   clinic?: string;
// // //   image?: string;
// // //   profile_picture?: string;
// // //   user?: {
// // //     id?: number | string;
// // //     username?: string;
// // //     email?: string;
// // //     phone_number?: string;
// // //   };
// // //   consultation_fee?: number;
// // //   experience_years?: number;
// // //   specialization?: string;
// // // };

// // // type RootStackParamList = {
// // //   AppoinmentPaymentScreen: {
// // //     doctor: Doctor;
// // //     slot: string;
// // //     date: string;
// // //     consultationType: 'video' | 'inclinic';
// // //     amount: number;
// // //   };
// // // };

// // // const PaymentScreen = () => {
// // //   const navigation = useNavigation<any>();
// // //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// // //   const { doctor, slot, date, consultationType, amount } = route.params;
// // //   const [isProcessing, setIsProcessing] = useState(false);

// // //   // Step 1: Create Appointment
// // //   const createAppointment = async () => {
// // //     try {
// // //       const doctorId =
// // //         typeof doctor?.id === 'number' || typeof doctor?.id === 'string'
// // //           ? doctor.id
// // //           : doctor?.user?.id || '1';

// // //       const payload = {
// // //         doctor_id: String(doctorId),
// // //         date: date,
// // //         start: slot.split('-')[0]?.trim() || '10:00',
// // //         end: slot.split('-')[1]?.trim() || '10:30',
// // //         type: consultationType === 'video' ? 'online' : 'offline',
// // //         payment_mode: 'online',
// // //       };

// // //       console.log('📤 Sending appointment payload:', payload);

// // //       const response = await fetch(
// // //         'https://landing.docapp.co.in/api/appointment/create-appointment',
// // //         {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       const text = await response.text();
// // //       console.log('📥 Raw response text:', text);

// // //       let data;
// // //       try {
// // //         data = JSON.parse(text);
// // //       } catch {
// // //         throw new Error('Invalid JSON from server');
// // //       }

// // //       if (!response.ok || !data?.createdAppointment?.id) {
// // //         console.log('❌ Appointment creation failed:', data);
// // //         throw new Error(data?.message || 'Failed to create appointment');
// // //       }

// // //       console.log('✅ Appointment Created:', data.createdAppointment);
// // //       return data.createdAppointment.id;
// // //     } catch (err) {
// // //       console.error('🚨 Appointment creation error:', err);
// // //       Alert.alert('Error', 'Failed to create appointment. Please try again.');
// // //       return null;
// // //     }
// // //   };

// // //   // Step 2: Create Razorpay Order
// // //   const createOrder = async (appointmentId: number) => {
// // //     try {
// // //       const payload = {
// // //         user_id: doctor?.user?.id || 1, // replace with actual logged-in user id
// // //         amount: amount,
// // //         appointmentId: appointmentId,
// // //         patientName: doctor?.user?.username || 'John Doe',
// // //         patientEmail: doctor?.user?.email || 'john@example.com',
// // //         patientPhone: doctor?.user?.phone_number || '9999999999',
// // //         doctorName: doctor?.user?.username || 'Dr. Unknown',
// // //         appointmentDate: date,
// // //         appointmentTime: slot,
// // //       };

// // //       console.log('📤 Creating Razorpay Order with payload:', payload);

// // //       const response = await fetch(
// // //         'https://landing.docapp.co.in/api/payment/create-order',
// // //         {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       const text = await response.text();
// // //       console.log('📥 Raw create-order response text:', text);

// // //       let data;
// // //       try {
// // //         data = JSON.parse(text);
// // //       } catch {
// // //         throw new Error('Invalid JSON from create-order API');
// // //       }

// // //       if (!response.ok || !data?.order?.id) {
// // //         console.log('❌ Create Order failed:', data);
// // //         throw new Error(data?.message || 'Order creation failed');
// // //       }

// // //       console.log('✅ Razorpay Order Created:', data.order);
// // //       return data.order;
// // //     } catch (err) {
// // //       console.error('🚨 Error creating order:', err);
// // //       Alert.alert('Error', 'Failed to create payment order.');
// // //       return null;
// // //     }
// // //   };

// // //   // Step 3: Verify Payment
// // //   const verifyPayment = async (
// // //     orderId: string,
// // //     paymentId: string,
// // //     signature: string
// // //   ) => {
// // //     try {
// // //       const payload = {
// // //         razorpay_order_id: orderId,
// // //         razorpay_payment_id: paymentId,
// // //         razorpay_signature: signature,
// // //       };
// // //       console.log('📤 Verifying Payment with payload:', payload);

// // //       const response = await fetch(
// // //         'https://landing.docapp.co.in/api/payment/verify',
// // //         {
// // //           method: 'POST',
// // //           headers: { 'Content-Type': 'application/json' },
// // //           body: JSON.stringify(payload),
// // //         }
// // //       );

// // //       const text = await response.text();
// // //       console.log('📥 Verify Payment Raw Response:', text);

// // //       let data;
// // //       try {
// // //         data = JSON.parse(text);
// // //       } catch {
// // //         throw new Error('Invalid JSON in verify response');
// // //       }

// // //       if (data.success) {
// // //         Alert.alert('Success', 'Payment successful and verified!');
// // //         navigation.navigate('AppointmentSuccess', {
// // //           doctor,
// // //           slot,
// // //           date,
// // //           consultationType,
// // //           appointmentId: orderId,
// // //         });
// // //       } else {
// // //         Alert.alert('Verification Failed', 'Payment verification failed.');
// // //       }
// // //     } catch (err) {
// // //       console.error('🚨 Payment verification error:', err);
// // //       Alert.alert('Error', 'Payment verification failed.');
// // //     }
// // //   };

// // //   // Step 4: Handle Full Payment Flow
// // //   const handlePayment = async () => {
// // //     if (isProcessing) return;
// // //     setIsProcessing(true);

// // //     try {
// // //       // 1️⃣ Create Appointment (status pending)
// // //       const appointmentId = await createAppointment();
// // //       if (!appointmentId) throw new Error('Failed to create appointment.');

// // //       // 2️⃣ Create Razorpay Order
// // //       const order = await createOrder(appointmentId);
// // //       if (!order?.id) throw new Error('Failed to create Razorpay order.');

// // //       // 3️⃣ Open Razorpay checkout
// // //       const options = {
// // //         description: 'Doctor Consultation Payment',
// // //         image: 'https://your-logo-url.com/logo.png',
// // //         currency: order.currency || 'INR',
// // //         key: 'rzp_test_YourKeyHere', // ⚠️ Replace with your Razorpay key
// // //         amount: order.amount * 100, // in paise if backend returns rupees
// // //         name: 'DocApp',
// // //         order_id: order.id,
// // //         prefill: {
// // //           email: doctor?.user?.email || 'john@example.com',
// // //           contact: doctor?.user?.phone_number || '9999999999',
// // //           name: doctor?.user?.username || 'John Doe',
// // //         },
// // //         theme: { color: '#00A0E3' },
// // //       };

// // //       RazorpayCheckout.open(options)
// // //         .then(async (data: any) => {
// // //           console.log('✅ Razorpay Success:', data);
// // //           await verifyPayment(
// // //             order.id,
// // //             data.razorpay_payment_id,
// // //             data.razorpay_signature
// // //           );
// // //         })
// // //         .catch((error: any) => {
// // //           console.log('❌ Razorpay Error:', error);
// // //           Alert.alert('Payment Failed', error.description || 'Try again.');
// // //         })
// // //         .finally(() => setIsProcessing(false));
// // //     } catch (err: any) {
// // //       console.error('🚨 Payment flow error:', err);
// // //       Alert.alert('Error', err.message || 'Something went wrong.');
// // //       setIsProcessing(false);
// // //     }
// // //   };

// // //   return (
// // //     <SafeAreaView style={tw`flex-1 bg-white`}>
// // //       <ScrollView contentContainerStyle={tw`p-4`}>
// // //         {/* Header */}
// // //         <View style={tw`flex-row items-center mb-4`}>
// // //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// // //             <ArrowLeft size={24} color="#374151" />
// // //           </TouchableOpacity>
// // //           <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
// // //         </View>

// // //         {/* Doctor Info */}
// // //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// // //           <View style={tw`flex-row items-center mb-4`}>
// // //             <Image
// // //               source={{ uri: doctor.profile_picture }}
// // //               style={tw`w-16 h-16 rounded-full mr-3`}
// // //             />
// // //             <View style={tw`flex-1`}>
// // //               <Text style={tw`font-bold text-gray-900`}>
// // //                 {doctor.user?.username || 'Doctor'}
// // //               </Text>
// // //               <Text style={tw`text-gray-600`}>
// // //                 {doctor.specialization || 'General Physician'}
// // //               </Text>
// // //               <Text style={tw`text-green-700 mt-1`}>
// // //                 Fee: ₹{doctor.consultation_fee || amount}
// // //               </Text>
// // //             </View>
// // //           </View>

// // //           <View style={tw`flex-row items-center mb-2`}>
// // //             <Calendar size={18} color="#4B5563" />
// // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// // //           </View>

// // //           <View style={tw`flex-row items-center`}>
// // //             <Clock size={18} color="#4B5563" />
// // //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// // //           </View>
// // //         </View>

// // //         {/* Total */}
// // //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// // //           <View style={tw`flex-row justify-between`}>
// // //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// // //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// // //           </View>
// // //         </View>

// // //         {/* Pay Button */}
// // //         <TouchableOpacity
// // //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${
// // //             isProcessing ? 'opacity-50' : ''
// // //           }`}
// // //           onPress={handlePayment}
// // //           disabled={isProcessing}
// // //         >
// // //           <Text style={tw`text-white font-bold text-lg`}>
// // //             {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
// // //           </Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // export default PaymentScreen;



// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   Image,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// // import tw from 'twrnc';
// // import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

// // type Doctor = {
// //   id?: number | string;
// //   name?: string;
// //   clinic?: string;
// //   image?: string;
// //   profile_picture?: string;
// //   user?: {
// //     id?: number | string;
// //     username?: string;
// //     email?: string;
// //     phone_number?: string;
// //   };
// //   consultation_fee?: number;
// //   experience_years?: number;
// //   specialization?: string;
// // };

// // type RootStackParamList = {
// //   AppoinmentPaymentScreen: {
// //     doctor: Doctor;
// //     slot: string;
// //     date: string;
// //     consultationType: 'video' | 'inclinic';
// //     amount: number;
// //   };
// // };

// // const PaymentScreen = () => {
// //   const navigation = useNavigation<any>();
// //   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
// //   const { doctor, slot, date, consultationType, amount } = route.params;
// //   const [isProcessing, setIsProcessing] = useState(false);

// //   // ✅ Step 1: Create Appointment only
// //   const createAppointment = async () => {
// //     try {
// //       const doctorId =
// //         typeof doctor?.id === 'number' || typeof doctor?.id === 'string'
// //           ? doctor.id
// //           : doctor?.user?.id || '1';

// //       const payload = {
// //         doctor_id: String(doctorId),
// //         date: date,
// //         start: slot.split('-')[0]?.trim() || '10:00',
// //         end: slot.split('-')[1]?.trim() || '10:30',
// //         type: consultationType === 'video' ? 'online' : 'offline',
// //         payment_mode: 'online',
// //       };

// //       console.log('📤 Sending appointment payload:', payload);

// //       const response = await fetch(
// //         'https://landing.docapp.co.in/api/appointment/create-appointment',
// //         {
// //           method: 'POST',
// //           headers: { 'Content-Type': 'application/json' },
// //           body: JSON.stringify(payload),
// //         }
// //       );

// //       const text = await response.text();
// //       console.log('📥 Raw response text:', text);

// //       let data;
// //       try {
// //         data = JSON.parse(text);
// //       } catch {
// //         throw new Error('Invalid JSON from server');
// //       }

// //       if (!response.ok || !data?.createdAppointment?.id) {
// //         console.log('❌ Appointment creation failed:', data);
// //         throw new Error(data?.message || 'Failed to create appointment');
// //       }

// //       console.log('✅ Appointment Created:', data.createdAppointment);

// //       Alert.alert(
// //         'Success',
// //         'Appointment created successfully!',
// //         [
// //           {
// //             text: 'OK',
// //             onPress: () =>
// //               navigation.navigate('AppointmentSuccess', {
// //                 doctor,
// //                 slot,
// //                 date,
// //                 consultationType,
// //                 appointmentId: data.createdAppointment.id,
// //               }),
// //           },
// //         ]
// //       );
// //     } catch (err: any) {
// //       console.error('🚨 Appointment creation error:', err);
// //       Alert.alert('Error', err.message || 'Failed to create appointment.');
// //     } finally {
// //       setIsProcessing(false);
// //     }
// //   };

// //   const handleCreateAppointment = async () => {
// //     if (isProcessing) return;
// //     setIsProcessing(true);
// //     await createAppointment();
// //   };

// //   return (
// //     <SafeAreaView style={tw`flex-1 bg-white`}>
// //       <ScrollView contentContainerStyle={tw`p-4`}>
// //         {/* Header */}
// //         <View style={tw`flex-row items-center mb-4`}>
// //           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
// //             <ArrowLeft size={24} color="#374151" />
// //           </TouchableOpacity>
// //           <Text style={tw`ml-2 text-lg font-semibold`}>Appointment Details</Text>
// //         </View>

// //         {/* Doctor Info */}
// //         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
// //           <View style={tw`flex-row items-center mb-4`}>
// //             <Image
// //               source={{ uri: doctor.profile_picture }}
// //               style={tw`w-16 h-16 rounded-full mr-3`}
// //             />
// //             <View style={tw`flex-1`}>
// //               <Text style={tw`font-bold text-gray-900`}>
// //                 {doctor.user?.username || 'Doctor'}
// //               </Text>
// //               <Text style={tw`text-gray-600`}>
// //                 {doctor.specialization || 'General Physician'}
// //               </Text>
// //               <Text style={tw`text-green-700 mt-1`}>
// //                 Fee: ₹{doctor.consultation_fee || amount}
// //               </Text>
// //             </View>
// //           </View>

// //           <View style={tw`flex-row items-center mb-2`}>
// //             <Calendar size={18} color="#4B5563" />
// //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
// //           </View>

// //           <View style={tw`flex-row items-center`}>
// //             <Clock size={18} color="#4B5563" />
// //             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
// //           </View>
// //         </View>

// //         {/* Total */}
// //         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
// //           <View style={tw`flex-row justify-between`}>
// //             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
// //             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
// //           </View>
// //         </View>

// //         {/* Create Appointment Button */}
// //         <TouchableOpacity
// //           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${
// //             isProcessing ? 'opacity-50' : ''
// //           }`}
// //           onPress={handleCreateAppointment}
// //           disabled={isProcessing}
// //         >
// //           <Text style={tw`text-white font-bold text-lg`}>
// //             {isProcessing ? 'Creating...' : 'Create Appointment'}
// //           </Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // };

// // export default PaymentScreen;


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   Image,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
// import tw from 'twrnc';
// import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

// type Doctor = {
//   id?: number | string;
//   name?: string;
//   clinic?: string;
//   image?: string;
//   profile_picture?: string;
//   user?: {
//     id?: number | string;
//     username?: string;
//     email?: string;
//     phone_number?: string;
//   };
//   consultation_fee?: number;
//   experience_years?: number;
//   specialization?: string;
// };

// type RootStackParamList = {
//   AppoinmentPaymentScreen: {
//     doctor: Doctor;
//     doctorId: number;
//     slot: string;
//     date: string;
//     consultationType: 'video' | 'inclinic';
//     amount: number;
//   };
// };

// const PaymentScreen = () => {
//   const navigation = useNavigation<any>();
//   const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
//   const { doctor, slot, date, consultationType, amount, doctorId } = route.params;
//   const [isProcessing, setIsProcessing] = useState(false);

//   const createAppointment = async () => {
//     try {
//       const doctorId =
//         typeof doctor?.id === 'number' || typeof doctor?.id === 'string'
//           ? doctor.id
//           : doctor?.user?.id ; // default fallback ID

//       const payload = {
//         doctor_id: String(doctorId),
//         date: date,
//         start: slot.split('-')[0]?.trim() || '09:00',
//         end: slot.split('-')[1]?.trim() || '09:10',
//         type: consultationType === 'video' ? 'online' : 'offline',
//         payment_mode: 'online',
//       };

//       console.log('📤 Sending appointment payload:', payload);

//       const response = await fetch(
//         'https://landing.docapp.co.in/api/appointment/create-appointment',
//         {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload),
//         }
//       );

//       const data = await response.json();
//       console.log('📥 Appointment API Response:', data);

//       if (response.ok && data?.createdAppointment?.id) {
//         Alert.alert(
//           'Success',
//           'Appointment created successfully!',
//           [
//             {
//               text: 'OK',
//               onPress: () =>
//                 navigation.navigate('AppointmentSuccess', {
//                   doctor,
//                   slot,
//                   date,
//                   consultationType,
//                   appointmentId: data.createdAppointment.id,
//                 }),
//             },
//           ]
//         );
//       } else {
//         console.error('❌ Failed response:', data);
//         Alert.alert('Error', data?.message || 'Failed to create appointment.');
//       }
//     } catch (error: any) {
//       console.error('🚨 Appointment creation error:', error);
//       Alert.alert('Error', error.message || 'Failed to create appointment.');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCreateAppointment = async () => {
//     if (isProcessing) return;
//     setIsProcessing(true);
//     await createAppointment();
//   };

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <ScrollView contentContainerStyle={tw`p-4`}>
//         {/* Header */}
//         <View style={tw`flex-row items-center mb-4`}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
//             <ArrowLeft size={24} color="#374151" />
//           </TouchableOpacity>
//           <Text style={tw`ml-2 text-lg font-semibold`}>Appointment Details</Text>
//         </View>

//         {/* Doctor Info */}
//         <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
//           <View style={tw`flex-row items-center mb-4`}>
//             <Image
//               source={{ uri: doctor?.profile_picture || 'https://via.placeholder.com/150' }}
//               style={tw`w-16 h-16 rounded-full mr-3`}
//             />
//             <View style={tw`flex-1`}>
//               <Text style={tw`font-bold text-gray-900`}>
//                 {doctor?.user?.username || 'Doctor'}
//               </Text>
//               <Text style={tw`text-gray-600`}>
//                 {doctor?.specialization || 'General Physician'}
//               </Text>
//               <Text style={tw`text-green-700 mt-1`}>
//                 Fee: ₹{doctor?.consultation_fee || amount}
//               </Text>
//             </View>
//           </View>

//           <View style={tw`flex-row items-center mb-2`}>
//             <Calendar size={18} color="#4B5563" />
//             <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
//           </View>

//           <View style={tw`flex-row items-center`}>
//             <Clock size={18} color="#4B5563" />
//             <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
//           </View>
//         </View>

//         {/* Total */}
//         <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
//           <View style={tw`flex-row justify-between`}>
//             <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
//             <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
//           </View>
//         </View>

//         {/* Create Appointment Button */}
//         <TouchableOpacity
//           style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${
//             isProcessing ? 'opacity-50' : ''
//           }`}
//           onPress={handleCreateAppointment}
//           disabled={isProcessing}
//         >
//           <Text style={tw`text-white font-bold text-lg`}>
//             {isProcessing ? 'Creating...' : 'Create Appointment'}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default PaymentScreen;


import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeft, Calendar, Clock } from 'lucide-react-native';

type Doctor = {
  id?: number | string;
  name?: string;
  clinic?: string;
  image?: string;
  profile_picture?: string;
  user?: {
    id?: number | string;
    username?: string;
    email?: string;
    phone_number?: string;
  };
  consultation_fee?: number;
  experience_years?: number;
  specialization?: string;
};

type RootStackParamList = {
  AppoinmentPaymentScreen: {
    doctor: Doctor;
    doctorId: number;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
  };
};

const PaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AppoinmentPaymentScreen'>>();
  const { doctor, slot, date, consultationType, amount, doctorId } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  const createAppointment = async () => {
    try {
      const payload = {
        doctor_id: String(doctorId), // ✅ use sent doctorId
        date: date,
        start: slot.split('-')[0]?.trim() || '09:00',
        end: slot.split('-')[1]?.trim() || '09:30',
        type: consultationType === 'video' ? 'online' : 'offline',
        payment_mode: 'online',
      };

      console.log('📤 Sending Appointment Payload:', payload);

      const response = await fetch(
        'https://landing.docapp.co.in/api/appointment/create-appointment',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log('📥 Appointment Response:', data);

      if (response.ok && data?.createdAppointment?.id) {
        Alert.alert('✅ Success', 'Appointment scheduled successfully!', [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('AppointmentSuccess', {
                appointmentId: data.createdAppointment.id,
                doctor,
                slot,
                date,
                consultationType,
              }),
          },
        ]);
      } else {
        Alert.alert('❌ Failed', data?.message || 'Could not schedule appointment.');
      }
    } catch (error: any) {
      console.error('🚨 API Error:', error);
      Alert.alert('Error', 'Failed to create appointment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreateAppointment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    await createAppointment();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={tw`ml-2 text-lg font-semibold`}>Appointment Detailses</Text>
        </View>

        {/* Doctor Info */}
        <View style={tw`bg-white rounded-lg p-4 shadow-sm mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <Image
              source={{ uri: doctor?.profile_picture || 'https://via.placeholder.com/150' }}
              style={tw`w-16 h-16 rounded-full mr-3`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`font-bold text-gray-900`}>
                {doctor?.user?.username || 'Doctor'}
              </Text>
              <Text style={tw`text-gray-600`}>
                {doctor?.specialization || 'General Physician'}
              </Text>
              <Text style={tw`text-green-700 mt-1`}>
                Fee: ₹{doctor?.consultation_fee || amount}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center mb-2`}>
            <Calendar size={18} color="#4B5563" />
            <Text style={tw`ml-2 text-gray-700 font-medium`}>{date}</Text>
          </View>

          <View style={tw`flex-row items-center`}>
            <Clock size={18} color="#4B5563" />
            <Text style={tw`ml-2 text-gray-700 font-medium`}>{slot}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={tw`bg-white p-4 rounded-lg shadow-sm`}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-gray-900 font-bold`}>Total Amount</Text>
            <Text style={tw`text-gray-900 font-bold`}>₹{amount}</Text>
          </View>
        </View>

        {/* Create Appointment Button */}
        <TouchableOpacity
          style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${isProcessing ? 'opacity-50' : ''}`}
          onPress={handleCreateAppointment}
          disabled={isProcessing}
        >
          <Text style={tw`text-white font-bold text-lg`}>
            {isProcessing ? 'Creating...' : 'Create Appointment'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;
