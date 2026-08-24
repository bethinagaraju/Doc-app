import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import { ArrowLeft, CheckCircle, Clock, Landmark, User, MapPin, Briefcase } from 'lucide-react-native';
import { useUser } from '../../screens/contexts/UserContext';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';

/* ================= CONFIG ================= */
const API_BASE = 'https://api.docapp.co.in/api';

/* ================= RENDER CUSTOM INPUT ================= */
const RenderInput = ({ label, value, onChangeText, placeholder, ...props }: any) => (
  <View style={tw`mb-4`}>
    <Text style={tw`text-[11px] font-bold text-[#434653] mb-1.5 font-['Inter'] tracking-[0.5px] uppercase`}>
      {label}
    </Text>
    <TextInput
      style={tw`bg-white px-4 py-3 rounded-[12px] border border-[#C3C6D5]/40 text-[#011D35] text-[15px] font-['Inter']`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#A0A7B5"
      {...props}
    />
  </View>
);

/* ================= STATUS BADGE ================= */
const StatusBadge = ({ status }: { status: string }) => {
  const isCreated = status === 'created';
  return (
    <View style={tw`flex-row items-center px-3 py-1 rounded-full ${isCreated ? 'bg-amber-50' : 'bg-emerald-50'}`}>
      {isCreated ? (
        <Clock size={14} color="#f59e0b" />
      ) : (
        <CheckCircle size={14} color="#10b981" />
      )}
      <Text
        style={[
          tw`ml-1.5 text-xs font-bold font-['Inter']`,
          { color: isCreated ? '#f59e0b' : '#10b981' },
        ]}
      >
        {status?.toUpperCase()}
      </Text>
    </View>
  );
};

/* ================= COMPONENT ================= */
const SpecializationsScreen = ({ navigation }: any) => {
  const { user } = useUser();
  const { accessToken } = useAccessToken();

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState<any>(null);
  const [statusLoading, setStatusLoading] = useState(true);

  const DOCTOR_ID = user?.doctorProfile?.id;

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState<any>({
    legal_business_name: '',
    contact_name: '',
    business_type: 'individual',
    subcategory: 'clinic',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    business_pan: '',
    personal_pan: '',
    beneficiary_name: '',
    account_number: '',
    ifsc_code: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  /* ================= FETCH STATUS ================= */
  const fetchStatus = async () => {
    if (!DOCTOR_ID) {
      console.log('No DOCTOR_ID found in user context');
      setStatusLoading(false);
      return;
    }
    if (!accessToken) {
      console.log('No accessToken found');
      setStatusLoading(false);
      return;
    }

    try {
      setStatusLoading(true);

      const res = await axios.get(
        `${API_BASE}/kyc/doctor/${DOCTOR_ID}/onboarding-status`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data?.success && res.data?.account) {
        setAccount(res.data.account);
      }
    } catch (err: any) {
      if (err.response?.data?.message === 'Doctor not onboarded yet') {
        setAccount(null);
      } else {
        console.log('Fetch status error:', err.response?.data || err.message);
        Alert.alert('Error', 'Failed to fetch KYC onboarding status');
      }
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken && DOCTOR_ID) {
      fetchStatus();
    }
  }, [accessToken, DOCTOR_ID]);

  /* ================= START ONBOARDING ================= */
  const startOnboarding = async () => {
    // Validate form fields
    for (const key of Object.keys(form)) {
      if (!form[key] || form[key].trim() === '') {
        Alert.alert('Validation Error', `Please fill out the ${key.replace(/_/g, ' ').toUpperCase()} field.`);
        return;
      }
    }

    if (!DOCTOR_ID) {
      Alert.alert('Error', 'Doctor profile ID is missing.');
      return;
    }
    if (!accessToken) {
      Alert.alert('Error', 'Access token is missing. Please log in again.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/kyc/doctor/${DOCTOR_ID}/start-onboarding`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data?.success) {
        Alert.alert('Success', 'KYC Onboarding started successfully!');
        fetchStatus();
      } else {
        Alert.alert('Error', 'Onboarding failed to initialize');
      }
    } catch (err: any) {
      console.log('Start onboarding error:', err.response?.data || err.message);
      Alert.alert('Error', err.response?.data?.message || 'Failed to start KYC onboarding');
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1 bg-[#F8F9FF]`}
    >
      {/* HEADER */}
      <View style={tw`flex-row items-center px-5 pt-12 pb-4 bg-[#124CB8] shadow-sm`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-1 mr-3`}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Text style={tw`text-[20px] font-bold text-white font-['Inter']`}>
          KYC Onboarding
        </Text>
      </View>

      <ScrollView
        style={tw`flex-1`}
        contentContainerStyle={tw`p-5 pb-16`}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {statusLoading ? (
          <View style={tw`flex-1 justify-center items-center py-20`}>
            <ActivityIndicator size="large" color="#124CB8" />
            <Text style={tw`text-sm font-medium text-[#434653] mt-3 font-['Inter']`}>Fetching KYC status...</Text>
          </View>
        ) : account ? (
          /* ================= ONBOARDED ACCOUNT UI ================= */
          <View style={tw`gap-5`}>
            <View style={tw`bg-white p-6 rounded-3xl border border-[#C3C6D5]/20 shadow-sm items-center`}>
              <CheckCircle size={56} color="#124CB8" />
              <Text style={tw`text-xl font-bold text-[#011D35] mt-4 mb-1 font-['Inter']`}>KYC Details Submitted</Text>
              <Text style={tw`text-sm text-[#434653] text-center mb-4 font-['Inter']`}>
                Your Razorpay Route onboarding has been initialized. Settlements will start once verification completes.
              </Text>
              <StatusBadge status={account?.status || ''} />
            </View>

            <View style={tw`bg-white p-6 rounded-3xl border border-[#C3C6D5]/20 shadow-sm`}>
              <Text style={tw`text-base font-bold text-[#011D35] mb-4 font-['Inter']`}>Account Summary</Text>

              <View style={tw`bg-[#F8F9FF] p-4 rounded-2xl mb-3`}>
                <Text style={tw`text-xs font-semibold text-[#434653] font-['Inter']`}>Account ID</Text>
                <Text style={tw`text-sm font-bold text-[#011D35] mt-1 font-['Inter']`}>{account?.id}</Text>
              </View>

              <View style={tw`bg-[#F8F9FF] p-4 rounded-2xl mb-3`}>
                <Text style={tw`text-xs font-semibold text-[#434653] font-['Inter']`}>Business Name</Text>
                <Text style={tw`text-sm font-bold text-[#011D35] mt-1 font-['Inter']`}>{account?.legal_business_name}</Text>
              </View>

              <View style={tw`bg-[#F8F9FF] p-4 rounded-2xl`}>
                <Text style={tw`text-xs font-semibold text-[#434653] font-['Inter']`}>Registered PAN</Text>
                <Text style={tw`text-sm font-bold text-[#011D35] mt-1 font-['Inter']`}>{account?.legal_info?.pan || 'N/A'}</Text>
              </View>
            </View>
          </View>
        ) : (
          /* ================= FORM UI ================= */
          <View style={tw`gap-6`}>
            <View style={tw`mb-2`}>
              <Text style={tw`text-[22px] font-bold text-[#011D35] font-['Inter']`}>Register KYC</Text>
              <Text style={tw`text-[14px] text-[#434653] mt-1 font-['Inter']`}>
                Complete your details to set up your payout account and activate cashless appointments.
              </Text>
            </View>

            {/* SECTION 1: BUSINESS INFO */}
            <View style={tw`bg-white p-5 rounded-3xl border border-[#C3C6D5]/20 shadow-sm`}>
              <View style={tw`flex-row items-center mb-4`}>
                <Briefcase size={20} color="#124CB8" />
                <Text style={tw`text-[16px] font-bold text-[#011D35] ml-2 font-['Inter']`}>Business Details</Text>
              </View>

              <RenderInput
                label="Legal Business Name"
                value={form.legal_business_name}
                onChangeText={(v: string) => handleChange('legal_business_name', v)}
                placeholder="Dr. John Doe Clinic"
              />

              <RenderInput
                label="Contact Name"
                value={form.contact_name}
                onChangeText={(v: string) => handleChange('contact_name', v)}
                placeholder="John Doe"
              />

              <RenderInput
                label="Business Type"
                value={form.business_type}
                onChangeText={(v: string) => handleChange('business_type', v)}
                placeholder="individual"
                autoCapitalize="none"
              />

              <RenderInput
                label="Subcategory"
                value={form.subcategory}
                onChangeText={(v: string) => handleChange('subcategory', v)}
                placeholder="clinic"
                autoCapitalize="none"
              />
            </View>

            {/* SECTION 2: ADDRESS INFO */}
            <View style={tw`bg-white p-5 rounded-3xl border border-[#C3C6D5]/20 shadow-sm`}>
              <View style={tw`flex-row items-center mb-4`}>
                <MapPin size={20} color="#124CB8" />
                <Text style={tw`text-[16px] font-bold text-[#011D35] ml-2 font-['Inter']`}>Address</Text>
              </View>

              <RenderInput
                label="Address Line 1"
                value={form.address_line1}
                onChangeText={(v: string) => handleChange('address_line1', v)}
                placeholder="Building, Street Name"
              />

              <RenderInput
                label="Address Line 2"
                value={form.address_line2}
                onChangeText={(v: string) => handleChange('address_line2', v)}
                placeholder="Locality, Area"
              />

              <View style={tw`flex-row justify-between gap-3`}>
                <View style={tw`flex-1`}>
                  <RenderInput
                    label="City"
                    value={form.city}
                    onChangeText={(v: string) => handleChange('city', v)}
                    placeholder="City"
                  />
                </View>
                <View style={tw`flex-1`}>
                  <RenderInput
                    label="State"
                    value={form.state}
                    onChangeText={(v: string) => handleChange('state', v)}
                    placeholder="State"
                  />
                </View>
              </View>

              <RenderInput
                label="Postal Code"
                value={form.postal_code}
                onChangeText={(v: string) => handleChange('postal_code', v)}
                placeholder="6-digit ZIP code"
                keyboardType="numeric"
              />
            </View>

            {/* SECTION 3: IDENTITY */}
            <View style={tw`bg-white p-5 rounded-3xl border border-[#C3C6D5]/20 shadow-sm`}>
              <View style={tw`flex-row items-center mb-4`}>
                <User size={20} color="#124CB8" />
                <Text style={tw`text-[16px] font-bold text-[#011D35] ml-2 font-['Inter']`}>Tax Identification</Text>
              </View>

              <RenderInput
                label="Business PAN"
                value={form.business_pan}
                onChangeText={(v: string) => handleChange('business_pan', v)}
                placeholder="10-digit PAN"
                autoCapitalize="characters"
              />

              <RenderInput
                label="Personal PAN"
                value={form.personal_pan}
                onChangeText={(v: string) => handleChange('personal_pan', v)}
                placeholder="10-digit PAN"
                autoCapitalize="characters"
              />
            </View>

            {/* SECTION 4: BANK ACCOUNT */}
            <View style={tw`bg-white p-5 rounded-3xl border border-[#C3C6D5]/20 shadow-sm`}>
              <View style={tw`flex-row items-center mb-4`}>
                <Landmark size={20} color="#124CB8" />
                <Text style={tw`text-[16px] font-bold text-[#011D35] ml-2 font-['Inter']`}>Bank Details (Settlement)</Text>
              </View>

              <RenderInput
                label="Beneficiary Name"
                value={form.beneficiary_name}
                onChangeText={(v: string) => handleChange('beneficiary_name', v)}
                placeholder="Account Holder Name"
              />

              <RenderInput
                label="Account Number"
                value={form.account_number}
                onChangeText={(v: string) => handleChange('account_number', v)}
                placeholder="Bank Account Number"
                keyboardType="numeric"
              />

              <RenderInput
                label="IFSC Code"
                value={form.ifsc_code}
                onChangeText={(v: string) => handleChange('ifsc_code', v)}
                placeholder="IFSC Code"
                autoCapitalize="characters"
              />
            </View>

            {/* SUBMIT BUTTON */}
            <TouchableOpacity
              onPress={startOnboarding}
              activeOpacity={0.85}
              style={tw`w-full bg-[#124CB8] h-14 rounded-2xl justify-center items-center shadow-md mt-2 mb-4`}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={tw`text-white text-base font-bold font-['Inter']`}>
                  Submit KYC Registration
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SpecializationsScreen;