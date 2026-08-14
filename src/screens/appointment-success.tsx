import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  Calendar,
  CircleCheck as CheckCircle2,
  MapPin,
  Video,
  CreditCard,
  Download,
  ArrowRight,
  Award,
  Check
} from 'lucide-react-native';
import tw from 'twrnc';

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
    address?: Array<{
      house_no?: string;
      street?: string;
      landmark?: string;
      city?: string;
      state?: string;
      pincode?: string;
    }>;
  };
  consultation_fee?: number;
  experience_years?: number;
  specialization?: string;
};

type RootStackParamList = {
  AppointmentSuccess: {
    doctor: Doctor;
    slot: string;
    date: string;
    consultationType: 'video' | 'inclinic';
    appointmentId: string;
  };
};

export default function AppointmentSuccessScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, 'AppointmentSuccess'>>();

  // Safe destructuring with fallback object to prevent crash when params is undefined
  const {
    doctor,
    slot = 'Not scheduled',
    date = 'Not scheduled',
    consultationType = 'inclinic',
    appointmentId = 'N/A'
  } = route.params || {};

  const handleGoToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabsLayout' }],
    });
  };

  const handleViewAppointments = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Appointments' }],
    });
  };

  // Compile address helper string safely
  const addressText = doctor?.user?.address?.[0]
    ? [
      doctor.user.address[0].house_no,
      doctor.user.address[0].street,
      doctor.user.address[0].landmark,
      doctor.user.address[0].city,
      doctor.user.address[0].state,
      doctor.user.address[0].pincode
    ].filter(item => item && item.trim() !== '').join(', ')
    : (doctor?.address || '122 Medical Plaza, New York, NY');

  return (
    <View style={tw`flex-1 bg-[#F4F6F9]`}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 36 }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success State Header */}
        <View style={tw`items-center mb-8 w-full`}>
          <View style={tw`w-20 h-20 bg-[#CAE6FF] rounded-full items-center justify-center mb-4 shadow-sm`}>
            <CheckCircle2 size={40} color="#124CB8" />
          </View>
          <Text style={styles.titleText}>
            Thank You!
          </Text>
          <Text style={styles.subtitleText}>
            Your appointment has been successfully scheduled and confirmed.
          </Text>
        </View>

        {/* Appointment Summary Card */}
        <View style={tw`w-full max-w-[342px] bg-white border border-[#DEE3EB] rounded-[24px] p-6 mb-6 shadow-sm`}>
          <View style={tw`flex-row justify-between items-center w-full mb-6`}>
            <Text style={styles.cardTitle}>
              Appointment Detail
            </Text>
            <View style={tw`bg-[#124CB8] rounded-full px-3 py-1`}>
              <Text style={styles.badgeText}>
                {consultationType === 'video' ? 'VIDEO' : 'IN-CLINIC'}
              </Text>
            </View>
          </View>

          {/* Doctor Row */}
          <View style={tw`flex-row items-center w-full mb-6`}>
            <Image
              source={{ uri: doctor?.profile_picture || 'https://via.placeholder.com/150' }}
              style={tw`w-20 h-20 rounded-[12px] mr-4 shadow-sm`}
            />
            <View style={tw`flex-1`}>
              <Text style={styles.doctorName}>
                Dr. {doctor?.user?.username || 'Doctor'}
              </Text>
              <Text style={styles.doctorSpecialization}>
                {doctor?.specialization || 'Specialization'}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Award size={14} color="#65587B" style={tw`mr-1`} />
                <Text style={styles.experienceText}>
                  {doctor?.experience_years ? `${doctor.experience_years} Years Exp` : 'Verified Doctor'}
                </Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={tw`border-t border-[#DEE3EB] w-full pt-6`} />

          {/* Date & Time Row */}
          <View style={tw`flex-row items-center w-full mb-5`}>
            <View style={tw`w-10 h-10 bg-[#E1E8ED] rounded-[8px] items-center justify-center mr-4`}>
              <Calendar size={18} color="#124CB8" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={styles.rowLabel}>
                Date & Time
              </Text>
              <Text style={styles.rowValue}>
                {date} • {slot}
              </Text>
            </View>
          </View>

          {/* Location Row */}
          <View style={tw`flex-row items-start w-full mb-5`}>
            <View style={tw`w-10 h-10 bg-[#E1E8ED] rounded-[8px] items-center justify-center mr-4 mt-0.5`}>
              <MapPin size={18} color="#124CB8" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={styles.rowLabel}>
                Location
              </Text>
              <Text style={[styles.rowValue, tw`mb-1`]}>
                {doctor?.clinic || 'DocApp Partner Clinic'}
              </Text>
              <Text style={styles.rowValueSub}>
                {addressText}
              </Text>
            </View>
          </View>

          {/* Consultation Link Row */}
          <View style={tw`flex-row items-center w-full`}>
            <View style={tw`w-10 h-10 bg-[#E1E8ED] rounded-[8px] items-center justify-center mr-4`}>
              <Video size={18} color="#124CB8" />
            </View>
            <View style={tw`flex-1`}>
              <Text style={styles.rowLabel}>
                Consultation
              </Text>
              <Text style={styles.consultationLink}>
                {consultationType === 'video' ? 'Join Video Call Link' : 'In-Clinic Consult'}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Summary Card */}
        <View style={tw`w-full max-w-[342px] bg-[#001E30] rounded-[24px] p-6 mb-6 relative overflow-hidden shadow-md`}>
          <View style={styles.glowOverlay} />

          <View style={tw`flex-row justify-between items-center w-full mb-4 z-10`}>
            <Text style={styles.paymentTitle}>
              PAYMENT SUMMARY
            </Text>
            <CreditCard size={20} color="#FFFFFF" />
          </View>

          <View style={tw`flex-row justify-between items-end w-full mb-4 z-10`}>
            <View>
              <Text style={styles.paymentAmount}>
                ₹{doctor?.consultation_fee || '500'}
              </Text>
              <Text style={styles.paymentStatus}>
                Paid successfully
              </Text>
            </View>
            <View style={tw`bg-white/20 rounded-[6px] py-1 px-2.5`}>
              <Text style={styles.txnBadgeText}>
                TXN: #{appointmentId || '82910'}
              </Text>
            </View>
          </View>

          <View style={tw`border-t border-white/10 w-full my-4 z-10`} />

          <TouchableOpacity style={tw`flex-row items-center justify-between w-full z-10`}>
            <View style={tw`flex-row items-center`}>
              <View style={tw`w-8 h-8 bg-white/10 rounded-full items-center justify-center mr-3`}>
                <Download size={14} color="#FFFFFF" />
              </View>
              <Text style={styles.invoiceActionText}>
                Download Invoice (PDF)
              </Text>
            </View>
            <ArrowRight size={14} color="#FFFFFF" style={tw`opacity-80`} />
          </TouchableOpacity>
        </View>

        {/* Preparation & Next Steps Card */}
        <View style={tw`w-full max-w-[342px] bg-[#D3E5F5] rounded-[24px] p-6 mb-8`}>
          <View style={tw`flex-row items-center mb-3`}>
            <Award size={20} color="#124CB8" style={tw`mr-2`} />
            <Text style={styles.prepTitle}>
              Preparation & Next Steps
            </Text>
          </View>
          <View style={tw`w-full`}>
            {consultationType === 'video' ? (
              <>
                <View style={tw`flex-row items-start mb-2.5`}>
                  <Text style={tw`text-[#0C1D29] font-bold mr-2 text-sm`}>•</Text>
                  <Text style={[styles.prepItemText, tw`flex-1`]}>
                    Find a quiet, well-lit space for your video call.
                  </Text>
                </View>
                <View style={tw`flex-row items-start`}>
                  <Text style={tw`text-[#0C1D29] font-bold mr-2 text-sm`}>•</Text>
                  <Text style={[styles.prepItemText, tw`flex-1`]}>
                    Ensure a strong and stable internet connection.
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={tw`flex-row items-start mb-2.5`}>
                  <Text style={tw`text-[#0C1D29] font-bold mr-2 text-sm`}>•</Text>
                  <Text style={[styles.prepItemText, tw`flex-1`]}>
                    Arrive at least 10 minutes before your scheduled slot.
                  </Text>
                </View>
                <View style={tw`flex-row items-start`}>
                  <Text style={tw`text-[#0C1D29] font-bold mr-2 text-sm`}>•</Text>
                  <Text style={[styles.prepItemText, tw`flex-1`]}>
                    Please bring your ID card and past medical reports.
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Footer Actions */}
        <View style={tw`w-full max-w-[342px] items-center mb-8 gap-4`}>
          <TouchableOpacity
            style={tw`w-full bg-[#124CB8] py-4 rounded-full flex-row justify-center items-center shadow-md`}
            onPress={handleViewAppointments}
          >
            <Text style={[styles.btnText, tw`mr-2`]}>
              View My Appointments
            </Text>
            <Check size={16} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex-row items-center py-2`}
            onPress={handleGoToHome}
          >
            <Text style={[styles.btnTextSecondary, tw`mr-1`]}>
              Back to Home
            </Text>
            <ArrowRight size={16} color="#124CB8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  titleText: {
    fontFamily: 'Public Sans',
    fontWeight: '800',
    fontSize: 30,
    color: '#191C1E',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: 'Public Sans',
    fontWeight: '400',
    fontSize: 16,
    color: '#42474E',
    textAlign: 'center',
    maxWidth: 337,
    lineHeight: 24,
  },
  cardTitle: {
    fontFamily: 'Public Sans',
    fontSize: 18,
    fontWeight: '700',
    color: '#191C1E',
  },
  badgeText: {
    fontFamily: 'Public Sans',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  doctorName: {
    fontFamily: 'Public Sans',
    fontSize: 18,
    fontWeight: '700',
    color: '#124CB8',
    marginBottom: 4,
  },
  doctorSpecialization: {
    fontFamily: 'Public Sans',
    fontSize: 14,
    fontWeight: '400',
    color: '#42474E',
    marginBottom: 8,
  },
  experienceText: {
    fontFamily: 'Public Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#65587B',
  },
  rowLabel: {
    fontFamily: 'Public Sans',
    fontSize: 11,
    fontWeight: '700',
    color: '#42474E',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  rowValue: {
    fontFamily: 'Public Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#191C1E',
  },
  rowValueSub: {
    fontFamily: 'Public Sans',
    fontSize: 14,
    fontWeight: '400',
    color: '#42474E',
    lineHeight: 20,
  },
  consultationLink: {
    fontFamily: 'Public Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#124CB8',
    textDecorationLine: 'underline',
  },
  glowOverlay: {
    position: 'absolute',
    width: 96,
    height: 96,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 48,
    right: -16,
    top: -16,
    transform: [{ scale: 1.5 }],
  },
  paymentTitle: {
    fontFamily: 'Public Sans',
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    opacity: 0.8,
  },
  paymentAmount: {
    fontFamily: 'Public Sans',
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  paymentStatus: {
    fontFamily: 'Public Sans',
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  txnBadgeText: {
    fontFamily: 'Public Sans',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  invoiceActionText: {
    fontFamily: 'Public Sans',
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  prepTitle: {
    fontFamily: 'Public Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#0C1D29',
  },
  prepItemText: {
    fontFamily: 'Public Sans',
    fontSize: 14,
    color: '#0C1D29',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  btnText: {
    fontFamily: 'Public Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  btnTextSecondary: {
    fontFamily: 'Public Sans',
    fontSize: 16,
    fontWeight: '700',
    color: '#124CB8',
  },
});
