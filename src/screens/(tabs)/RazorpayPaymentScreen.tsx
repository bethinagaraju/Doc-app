



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
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';

type Doctor = {
  id?: number | string;
  specialization?: string;
  consultation_fee?: number;
  profile_picture?: string;
  user?: {
    username?: string;
    email?: string;
    phone_number?: string;
  };
};

type RootStackParamList = {
  RazorpayPaymentScreen: {
    appointmentId: number;
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    amount: number;
    doctorId: number;
    orderId?: string;
    razorpayAmount?: number;
    razorpayKey?: string;
  };
};

const RazorpayPaymentScreen = () => {
  const navigation = useNavigation<any>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'RazorpayPaymentScreen'>>();

  const { appointmentId, doctor, slot, date, amount, doctorId, orderId, razorpayAmount, razorpayKey } = route.params;
  const { user } = useUser();

  const { accessToken } = useAccessToken();

  const [isProcessing, setIsProcessing] = useState(false);

  /* ------------------ CREATE ORDER ------------------ */
  // const createOrder = async () => {
  //   try {
  //     const payload = {
  //       amount,
  //       appointmentId,
  //       doctorId: Number(doctorId),
  //     };

  //     const response = await fetch(
  //       'https://api.docapp.co.in/api/payment/order',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           credentials: 'include',
  //         } as any,
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     const data = await response.json();

  //     if (!response.ok || !data?.orderId) {
  //       throw new Error(data?.message || 'Order creation failed');
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error('❌ Create order error:', error);
  //     Alert.alert('Error', 'Unable to create payment order');
  //     return null;
  //   }
  // };

  const createOrder = async () => {
    try {
      const payload = {
        amount: Number(amount),
        appointmentId: appointmentId,
        doctorId: Number(doctorId),
      };

      console.log('📤 Payload:', payload);

      const response = await fetch(
        'https://api.docapp.co.in/api/payment/order',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          },
          credentials: 'include',
          body: JSON.stringify(payload),
        } as any
      );

      const data = await response.json();

      console.log('📥 Order API Response:', data);

      if (!response.ok || !data?.orderId) {
        throw new Error(data?.message || 'Order creation failed');
      }

      return data;
    } catch (error) {
      console.log('❌ Create order error:', error);
      return null;
    }
  };


  /* ------------------ HANDLE PAYMENT ------------------ */
  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      let orderKey = razorpayKey;
      let orderIdVal = orderId;
      let orderAmount = razorpayAmount;

      if (!orderIdVal || !orderKey || !orderAmount) {
        console.log('⚠️ Missing order details in route params, fallback to createOrder API.');
        const order = await createOrder();
        if (!order) throw new Error('Order not created');
        orderKey = order.key;
        orderIdVal = order.orderId;
        orderAmount = order.amount;
      } else {
        console.log('ℹ️ Using order details passed from appointment creation:', { orderIdVal, orderAmount, orderKey });
      }

      const options = {
        key: orderKey,
        order_id: orderIdVal,
        amount: orderAmount,
        currency: 'INR',
        name: 'DocApp',
        description: 'Doctor Consultation Fee',
        prefill: {
          name: user?.username || 'Patient',
          email: user?.email || '',
          contact: user?.phone_number || '',
        },
        theme: { color: '#00A0E3' },
      };

      RazorpayCheckout.open(options)
        .then(() => {
          Alert.alert('Success', 'Payment completed');
          navigation.replace('AppointmentSuccess');
        })
        .catch((err: any) => {
          console.log('Payment error details:', err);
          let reasonStr = '';
          if (err && typeof err === 'object') {
            reasonStr = err.error?.description || err.description || err.message || '';
          } else if (typeof err === 'string') {
            reasonStr = err;
          }

          // Fallback if the reason ends up being the literal string 'undefined'
          if (String(reasonStr).trim() === 'undefined' || String(reasonStr).trim() === 'null') {
            reasonStr = '';
          }

          const userMessage = reasonStr
            ? `We couldn't process your payment: ${reasonStr}. Please try again.`
            : 'Your payment was cancelled or interrupted. No charges were made. Please try again to complete your appointment booking.';
          Alert.alert('Payment Unsuccessful', userMessage);
        })
        .finally(() => setIsProcessing(false));
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
      setIsProcessing(false);
    }
  };

  /* ------------------ UI ------------------ */
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`flex-row items-center mb-4`}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} />
          </TouchableOpacity>
          <Text style={tw`ml-2 text-lg font-semibold`}>
            Payment Details
          </Text>
        </View>

        <View style={tw`bg-white p-4 rounded-lg shadow mb-4`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Image
              source={{
                uri:
                  doctor?.profile_picture ||
                  'https://via.placeholder.com/150',
              }}
              style={tw`w-16 h-16 rounded-full mr-3`}
            />
            <View>
              <Text style={tw`font-bold`}>
                {doctor?.user?.username || 'Doctor'}
              </Text>
              <Text>{doctor?.specialization}</Text>
              <Text style={tw`text-green-700`}>
                ₹{doctor?.consultation_fee || amount}
              </Text>
            </View>
          </View>

          <View style={tw`flex-row items-center mb-1`}>
            <Calendar size={16} />
            <Text style={tw`ml-2`}>{date}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Clock size={16} />
            <Text style={tw`ml-2`}>{slot}</Text>
          </View>
        </View>

        <TouchableOpacity
          disabled={isProcessing}
          onPress={handlePayment}
          style={tw`bg-[#00A0E3] py-4 rounded-xl items-center`}
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