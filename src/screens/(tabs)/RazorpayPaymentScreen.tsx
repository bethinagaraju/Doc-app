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
import RazorpayCheckout from 'react-native-razorpay';

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
  RazorpayPaymentScreen: {
    appointmentId: number;
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
  };
};

const RazorpayPaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'RazorpayPaymentScreen'>>();
  const { appointmentId, doctor, slot, date, consultationType, amount } = route.params;
  const [isProcessing, setIsProcessing] = useState(false);

  // Step 1: Create Razorpay Order
  const createOrder = async () => {
    try {
      const payload = {
        user_id: 1, // Replace with actual logged-in user ID
        amount: amount,
        appointmentId: appointmentId,
        patientName: 'John Doe', // Replace with actual user name
        patientEmail: 'john@example.com', // Replace with actual user email
        patientPhone: '9999999999', // Replace with actual user phone
        doctorName: doctor?.user?.username || 'Dr. Unknown',
        appointmentDate: date,
        appointmentTime: slot,
      };

      console.log('📤 Creating Razorpay Order with payload:', payload);

      const response = await fetch(
        'https://landing.docapp.co.in/api/payment/create-order',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log('📥 Create Order Response:', data);

      if (!response.ok || !data?.order?.id) {
        throw new Error(data?.message || 'Order creation failed');
      }

      return data.order;
    } catch (err) {
      console.error('❌ Error creating order:', err);
      Alert.alert('Error', 'Failed to create payment order.');
      return null;
    }
  };

  // Step 2: Verify Payment
  // const verifyPayment = async (
  //   orderId: string,
  //   paymentId: string,
  //   signature: string
  // ) => {
  //   try {
  //     const payload = {
  //       razorpay_order_id: orderId,
  //       razorpay_payment_id: paymentId,
  //       razorpay_signature: signature,
  //     };
  //     console.log('📤 Verifying Payment with payload:', payload);

  //     const response = await fetch(
  //       'https://landing.docapp.co.in/api/payment/verify',
  //       {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log('📥 Verify Payment Response:', data);

  //     if (data.success) {
  //       Alert.alert('Success', 'Payment successful and verified!');
  //       navigation.navigate('AppointmentSuccess', {
  //         doctor,
  //         slot,
  //         date,
  //         consultationType,
  //         appointmentId: appointmentId.toString(),
  //       });
  //     } else {
  //       Alert.alert('Verification Failed', 'Payment verification failed.');
  //     }
  //   } catch (err) {
  //     console.error('❌ Payment verification error:', err);
  //     Alert.alert('Error', 'Payment verification failed.');
  //   }
  // };


  const verifyPayment = async (orderId: string, paymentId: string, signature: string) => {
  try {
    const payload = {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    };
    console.log('📤 Verifying Payment with payload:', payload);

    const response = await fetch('https://landing.docapp.co.in/api/payment/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('📥 Verify Payment Response:', data);

    // ✅ Accept both success types
    if (data.success || data.message === 'Payment verified successfully') {
      Alert.alert('Success', 'Payment successful and verified!');
      // navigation.navigate('AppointmentSuccess', {
      //   doctor,
      //   slot,
      //   date,
      //   consultationType,
      //   appointmentId: appointmentId.toString(),
      // });
    } else {
      Alert.alert('Verification Failed', 'Payment verification failed.');
    }
  } catch (err) {
    console.error('❌ Payment verification error:', err);
    Alert.alert('Error', 'Payment verification failed.');
  }
};




  const handlePayment = async () => {
  if (isProcessing) return;
  setIsProcessing(true);

  try {
    const order = await createOrder();
    if (!order?.id) throw new Error('Failed to create Razorpay order.');

    const options = {
      description: 'Doctor Consultation Payment',
      image: 'https://your-logo-url.com/logo.png',
      currency: order.currency || 'INR',
      key: order.key, // ✅ Correct key from backend
      amount: order.amount, // ✅ Already in paise from backend
      name: 'DocApp',
      order_id: order.id,
      prefill: {
        email: 'john@example.com',
        contact: '9999999999',
        name: 'John Doe',
      },
      theme: { color: '#00A0E3' },
    };

    RazorpayCheckout.open(options)
      .then(async (data: any) => {
        console.log('✅ Razorpay Success:', data);
        await verifyPayment(order.id, data.razorpay_payment_id, data.razorpay_signature);
      })
      .catch((error: any) => {
        console.log('❌ Razorpay Error:', error);
        Alert.alert('Payment Failed', error.description || 'Try again.');
      })
      .finally(() => setIsProcessing(false));
  } catch (err: any) {
    console.error('🚨 Payment flow error:', err);
    Alert.alert('Error', err.message || 'Something went wrong.');
    setIsProcessing(false);
  }
};


  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        {/* Header */}
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={tw`ml-2 text-lg font-semibold`}>Payment Details</Text>
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

        {/* Pay Button */}
        <TouchableOpacity
          style={tw`mt-6 mb-6 bg-[#00A0E3] py-4 rounded-xl items-center ${
            isProcessing ? 'opacity-50' : ''
          }`}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={tw`text-white font-bold text-lg`}>
            {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RazorpayPaymentScreen;
