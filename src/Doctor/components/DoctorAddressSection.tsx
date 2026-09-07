import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import {
  MapPin,
  Building2,
  Plus,
  CheckCircle2,
  Navigation,
  X,
  Edit3,
  MapPinOff,
} from 'lucide-react-native';
import tw from 'twrnc';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';

const API_BASE = 'https://api.docapp.co.in';
const API_ADD_ADDRESS = `${API_BASE}/api/address/addAddress`;
const API_GET_ALL_ADDRESS = `${API_BASE}/api/address/getAllAddress`;

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  pincode: string;
  active: boolean;
}

interface DoctorAddressSectionProps {
  onAddressUpdated?: () => void;
}

const AddressListSkeleton = () => {
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
    <View
      style={[
        tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 overflow-hidden shadow-sm`,
        {
          shadowColor: '#102A43',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 16,
          elevation: 3,
        },
      ]}
    >
      <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-5 py-4 flex-row items-center justify-between`}>
        <Animated.View style={[tw`w-36 h-5 bg-[#DAE1FF]/70 rounded`, { opacity: pulseAnim }]} />
        <Animated.View style={[tw`w-18 h-6 bg-[#DAE1FF]/50 rounded-full`, { opacity: pulseAnim }]} />
      </View>

      <View style={tw`p-5 gap-3.5`}>
        {[1, 2].map((i) => (
          <Animated.View
            key={i}
            style={[
              tw`p-4 rounded-xl bg-[#F8F9FF] border border-[#DAE1FF]/60 flex-row items-start gap-3`,
              { opacity: pulseAnim },
            ]}
          >
            <View style={tw`w-9 h-9 rounded-xl bg-[#DAE1FF]/60`} />
            <View style={tw`flex-1 gap-2`}>
              <View style={tw`w-40 h-4 bg-[#DAE1FF]/70 rounded`} />
              <View style={tw`w-56 h-3.5 bg-[#DAE1FF]/40 rounded`} />
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const DoctorAddressSection: React.FC<DoctorAddressSectionProps> = ({ onAddressUpdated }) => {
  const { accessToken } = useAccessToken();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressLoading, setAddressLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
  });

  const fetchAddresses = async () => {
    if (!accessToken) return;
    try {
      setAddressLoading(true);
      const response = await fetch(API_GET_ALL_ADDRESS, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });
      const data = await response.json();

      if (response.ok && data.addresses) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setAddressLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [accessToken]);

  const handleOpenAddModal = (addr?: Address) => {
    if (addr) {
      setAddressForm({
        street: addr.street || '',
        city: addr.city || '',
        state: addr.state || '',
        pincode: addr.pincode || '',
      });
    } else {
      setAddressForm({ street: '', city: '', state: '', pincode: '' });
    }
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setAddressForm({ street: '', city: '', state: '', pincode: '' });
  };

  const handleSaveAddress = async () => {
    if (
      !addressForm.street.trim() ||
      !addressForm.city.trim() ||
      !addressForm.state.trim() ||
      !addressForm.pincode.trim()
    ) {
      Alert.alert('Missing Fields', 'Please complete all address fields.');
      return;
    }

    try {
      setSubmitting(true);
      const payload = {
        street: addressForm.street.trim(),
        city: addressForm.city.trim(),
        state: addressForm.state.trim(),
        pincode: addressForm.pincode.trim(),
      };

      const response = await fetch(API_ADD_ADDRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Clinic address saved successfully!');
        handleCloseModal();
        fetchAddresses();
        onAddressUpdated?.();
      } else {
        Alert.alert('Error', data.message || 'Failed to save address');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={tw`gap-5`}>
      {addressLoading ? (
        <AddressListSkeleton />
      ) : addresses.length === 0 ? (
        /* Empty State: Address Not Added */
        <View
          style={[
            tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 p-6 items-center shadow-sm`,
            {
              shadowColor: '#102A43',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 3,
            },
          ]}
        >
          <View style={tw`w-16 h-16 rounded-full bg-[#EEF4FF] items-center justify-center mb-4`}>
            <MapPinOff size={28} color="#124CB8" />
          </View>

          <Text style={tw`text-[19px] font-bold text-[#011D35] text-center`}>
            Address Not Added
          </Text>

          <Text style={tw`text-[14px] text-[#434653] text-center mt-1.5 mb-6 px-4 leading-5`}>
            You have not added any clinic or consultation address yet. Add your clinic location so patients can reach you.
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleOpenAddModal()}
            style={tw`w-full bg-[#124CB8] rounded-xl py-3.5 flex-row items-center justify-center gap-2 shadow-sm`}
          >
            <Plus size={18} color="#FFFFFF" />
            <Text style={tw`text-white font-bold text-[15px]`}>Add Clinic Address</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Total Addresses List Card */
        <View
          style={[
            tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 overflow-hidden shadow-sm`,
            {
              shadowColor: '#102A43',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 16,
              elevation: 3,
            },
          ]}
        >
          {/* Header */}
          <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-5 py-4 flex-row items-center justify-between`}>
            <View style={tw`flex-row items-center gap-2.5`}>
              <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                <Building2 size={17} color="#124CB8" />
              </View>
              <Text style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter']`}>
                Clinic Locations ({addresses.length})
              </Text>
            </View>

            {/* Edit / Add Button in Header */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleOpenAddModal()}
              style={tw`bg-[#124CB8] px-3 py-1.5 rounded-full flex-row items-center gap-1.5`}
            >
              <Plus size={13} color="#FFFFFF" />
              <Text style={tw`text-white text-[12px] font-bold`}>Add New</Text>
            </TouchableOpacity>
          </View>

          {/* Addresses List */}
          <View style={tw`p-5 gap-3.5`}>
            {addresses.map((addr, index) => (
              <View
                key={addr.id || index}
                style={tw`p-4 rounded-xl bg-[#F8F9FF] border border-[#DAE1FF] flex-row items-start justify-between gap-3`}
              >
                <View style={tw`flex-row items-start gap-3 flex-1`}>
                  <View style={tw`w-9 h-9 rounded-xl bg-[#EEF4FF] items-center justify-center mt-0.5`}>
                    <MapPin size={18} color="#124CB8" />
                  </View>

                  <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center gap-2 mb-1`}>
                      <Text style={tw`font-bold text-[15px] text-[#011D35] flex-1`}>
                        {addr.street}
                      </Text>
                      <View style={tw`flex-row items-center gap-1 bg-[#E8F5E9] px-2 py-0.5 rounded-full`}>
                        <CheckCircle2 size={10} color="#16A34A" />
                        <Text style={tw`text-[10px] font-semibold text-[#16A34A]`}>Active</Text>
                      </View>
                    </View>

                    <Text style={tw`text-[13px] text-[#434653] leading-4`}>
                      {addr.city}, {addr.state} - <Text style={tw`font-semibold text-[#011D35]`}>{addr.pincode}</Text>
                    </Text>
                  </View>
                </View>

                {/* Edit Button for Address */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => handleOpenAddModal(addr)}
                  style={tw`w-8 h-8 rounded-full bg-white border border-[#DAE1FF] items-center justify-center ml-1`}
                >
                  <Edit3 size={14} color="#124CB8" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 🚀 Add / Edit Address Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={tw`flex-1 bg-black/50 justify-end`}
        >
          <View style={tw`bg-white rounded-t-3xl border-t border-[#DAE1FF] max-h-[85%]`}>
            {/* Modal Header */}
            <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-6 py-4 flex-row items-center justify-between rounded-t-3xl`}>
              <View style={tw`flex-row items-center gap-2.5`}>
                <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                  <Building2 size={17} color="#124CB8" />
                </View>
                <Text style={tw`text-[18px] font-bold text-[#011D35] font-['Inter']`}>
                  Clinic Address Details
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleCloseModal}
                style={tw`w-8 h-8 rounded-full bg-white border border-[#DAE1FF] items-center justify-center`}
              >
                <X size={16} color="#434653" />
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <ScrollView contentContainerStyle={tw`p-6 gap-4 pb-10`}>
              <View>
                <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                  Street / Area / Landmark
                </Text>
                <TextInput
                  placeholder="e.g. 2nd Floor, Apollo Care Center, Road No 12"
                  placeholderTextColor="#9CA3AF"
                  value={addressForm.street}
                  onChangeText={(t) => setAddressForm({ ...addressForm, street: t })}
                  style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                />
              </View>

              <View style={tw`flex-row gap-3`}>
                <View style={tw`flex-1`}>
                  <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                    City
                  </Text>
                  <TextInput
                    placeholder="e.g. Hyderabad"
                    placeholderTextColor="#9CA3AF"
                    value={addressForm.city}
                    onChangeText={(t) => setAddressForm({ ...addressForm, city: t })}
                    style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                  />
                </View>

                <View style={tw`flex-1`}>
                  <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                    Pincode
                  </Text>
                  <TextInput
                    placeholder="e.g. 500034"
                    placeholderTextColor="#9CA3AF"
                    value={addressForm.pincode}
                    keyboardType="number-pad"
                    maxLength={6}
                    onChangeText={(t) => setAddressForm({ ...addressForm, pincode: t })}
                    style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                  />
                </View>
              </View>

              <View>
                <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>
                  State
                </Text>
                <TextInput
                  placeholder="e.g. Telangana"
                  placeholderTextColor="#9CA3AF"
                  value={addressForm.state}
                  onChangeText={(t) => setAddressForm({ ...addressForm, state: t })}
                  style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                style={tw`bg-[#124CB8] rounded-xl py-3.5 items-center justify-center mt-3 flex-row gap-2 shadow-sm`}
                onPress={handleSaveAddress}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Navigation size={16} color="#FFFFFF" />
                    <Text style={tw`text-white font-bold text-[15px]`}>Save Clinic Address</Text>
                  </>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default DoctorAddressSection;
