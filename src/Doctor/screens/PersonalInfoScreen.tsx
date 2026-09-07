import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import tw from 'twrnc';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import { useUser } from '../../screens/contexts/UserContext';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DocProfileTopBar from '../components/DocProfileTopBar';
import ProfilePhotoSection from '../components/ProfilePhotoSection';
import DocStatCard from '../components/DocStatCard';
import DoctorAddressSection from '../components/DoctorAddressSection';
import { Picker } from '@react-native-picker/picker';
import { Mail, Phone, Calendar, Briefcase, UserCheck, Sparkles } from 'lucide-react-native';

const SPECIALIZATION_OPTIONS = [
  "General Physician",
  "Internal Medicine",
  "Pediatrics",
  "Gynecology",
  "Obstetrics",
  "Dermatology",
  "Orthopedics",
  "Cardiology",
  "Neurology",
  "Psychiatry",
  "Psychology",
  "Diabetology",
  "Endocrinology",
  "Gastroenterology",
  "Nephrology",
  "Urology",
  "Pulmonology",
  "ENT",
  "Ophthalmology",
  "Dentistry",
  "Oncology",
  "Rheumatology",
  "General Surgery",
  "Plastic Surgery",
  "Physiotherapy",
  "Diet & Nutrition",
  "Sexology",
  "Ayurveda",
  "Homeopathy",
  "Unani",
  "Siddha"
];

const GENDER_OPTIONS = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say"
];

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// ======================= API CONSTANTS =======================
const API_BASE = 'https://api.docapp.co.in';
const API_GET_USER = `${API_BASE}/api/auth/get-user-data`;
const API_UPDATE_PROFILE = `${API_BASE}/api/auth/profile/complete/doctor`;
const API_UPLOAD_PHOTO = `${API_BASE}/api/auth/upload-photo`;

const PersonalInfoSkeleton = () => {
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
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>
      <DocProfileTopBar />
      <ScrollView contentContainerStyle={tw`p-5 pb-28`} showsVerticalScrollIndicator={false}>
        {/* Tabs Skeleton */}
        <Animated.View style={[tw`flex-row justify-center mb-6 bg-[#EEF4FF] rounded-2xl p-1.5`, { opacity: pulseAnim }]}>
          <View style={tw`flex-1 py-4 bg-[#DAE1FF]/80 rounded-xl mr-1`} />
          <View style={tw`flex-1 py-4 bg-[#DAE1FF]/40 rounded-xl ml-1`} />
        </Animated.View>

        {/* Profile Avatar & Header Skeleton */}
        <Animated.View style={[tw`w-full bg-white rounded-2xl p-6 items-center mb-5 border border-[#DAE1FF]/60`, { opacity: pulseAnim }]}>
          <View style={tw`w-28 h-28 rounded-full bg-[#DAE1FF]/60 mb-4`} />
          <View style={tw`w-48 h-6 bg-[#DAE1FF]/70 rounded-md mb-2`} />
          <View style={tw`w-36 h-4 bg-[#DAE1FF]/50 rounded mb-3`} />
          <View style={tw`flex-row gap-4 mt-2`}>
            <View style={tw`w-28 h-4 bg-[#DAE1FF]/40 rounded`} />
            <View style={tw`w-28 h-4 bg-[#DAE1FF]/40 rounded`} />
          </View>
        </Animated.View>

        {/* Stats Card Skeleton */}
        <Animated.View style={[tw`w-full bg-[#3766D2]/40 rounded-2xl p-6 mb-5 h-[150px] justify-between`, { opacity: pulseAnim }]}>
          <View style={tw`w-32 h-4 bg-white/40 rounded`} />
          <View style={tw`w-24 h-8 bg-white/60 rounded-md`} />
          <View style={tw`w-40 h-4 bg-white/40 rounded`} />
        </Animated.View>

        {/* Current Details Card Skeleton */}
        <Animated.View style={[tw`w-full bg-white rounded-2xl p-5 mb-5 border border-[#DAE1FF]/60 gap-3`, { opacity: pulseAnim }]}>
          <View style={tw`w-44 h-5 bg-[#DAE1FF]/70 rounded mb-2`} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={tw`p-3.5 bg-[#F8F9FF] rounded-xl flex-row items-center gap-3 border border-[#DAE1FF]/40`}>
              <View style={tw`w-6 h-6 rounded-full bg-[#DAE1FF]/60`} />
              <View style={tw`flex-1 gap-1.5`}>
                <View style={tw`w-24 h-3 bg-[#DAE1FF]/40 rounded`} />
                <View style={tw`w-48 h-4 bg-[#DAE1FF]/60 rounded`} />
              </View>
            </View>
          ))}
        </Animated.View>

        {/* Form Card Skeleton */}
        <Animated.View style={[tw`w-full bg-white rounded-2xl p-5 border border-[#DAE1FF]/60 gap-3.5`, { opacity: pulseAnim }]}>
          <View style={tw`w-48 h-5 bg-[#DAE1FF]/70 rounded mb-1`} />
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={tw`gap-1.5`}>
              <View style={tw`w-24 h-3.5 bg-[#DAE1FF]/50 rounded`} />
              <View style={tw`w-full h-12 bg-[#F8F9FF] rounded-xl border border-[#DAE1FF]/40`} />
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const PersonalInfoScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  const { accessToken } = useAccessToken();
  const { fetchUserData } = useUser();
  const [personalInfo, setPersonalInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // 🔀 Tab State: 'personal' | 'address'
  const [activeTab, setActiveTab] = useState<'personal' | 'address'>('personal');

  // 📝 Personal Form State
  const [form, setForm] = useState({
    date_of_birth: '',
    gender: '',
    specialization: '',
    license_number: '',
    practice_start_date: '',
  });

  // ================================================================================================
  // 🔄 Fetch profile data
  // ================================================================================================
  const fetchData = async () => {
    try {
      const response = await fetch(API_GET_USER, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok && data.userData) {
        const user = data.userData;
        const profile = user.doctorProfile;

        setPersonalInfo({
          name: `Dr. ${user.username}`,
          email: user.email,
          phone: user.phone_number,
          specialization: profile?.specialization || '',
          practiceStartDate: profile?.practice_start_date || '',
          consultationFee: profile?.consultation_fee || '',
          dateOfBirth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
          gender: profile?.gender || '',
          licenseNumber: profile?.license_number || '',
          profilePicture:
            profile?.profile_picture
              ? profile.profile_picture + (profile.profile_picture.includes('?') ? '&' : '?') + 't=' + new Date().getTime()
              : 'https://res.cloudinary.com/dwshjkk42/image/upload/v1751270760/doctor_8997187_mgopyu.png',
        });

        setForm({
          date_of_birth: profile?.date_of_birth ? profile.date_of_birth.split('T')[0] : '',
          gender: profile?.gender || '',
          specialization: profile?.specialization || '',
          license_number: profile?.license_number || '',
          practice_start_date: profile?.practice_start_date || '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to load profile');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    setForm({ ...form, practice_start_date: `${year}-${month}` });
    setDatePickerVisibility(false);
  };

  // ================================================================================================
  // 🚀 Profile Photo Upload Handler
  // ================================================================================================
  const handlePhotoUpload = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
      if (result.didCancel || !result.assets?.[0]) return;

      const photo = result.assets[0];
      const formData = new FormData();
      formData.append('image', {
        uri: photo.uri,
        type: photo.type || 'image/jpeg',
        name: photo.fileName || 'profile.jpg',
      } as any);

      setLoading(true);
      const res = await fetch(API_UPLOAD_PHOTO, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        Alert.alert('Error', data.message || 'Upload failed');
        return;
      }
      Alert.alert('Success', 'Profile picture updated successfully!');
      fetchData();
      fetchUserData(accessToken);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  // ================================================================================================
  // 🔄 Update Personal Profile
  // ================================================================================================
  const handleUpdateProfile = async () => {
    try {
      setSaving(true);
      const payload = {
        ...form,
        practice_start_date: form.practice_start_date,
      };

      const response = await fetch(API_UPDATE_PROFILE, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message || 'Profile updated successfully');
        fetchData();
        fetchUserData(accessToken);
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      Alert.alert('Network Error', 'Please try again later.');
    } finally {
      setSaving(false);
    }
  };

  // ================================================================================================
  // 🗑 Delete Profile Photo
  // ================================================================================================
  const handleDeletePhoto = async () => {
    Alert.alert(
      "Delete Profile Picture",
      "Are you sure you want to delete your profile photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              const res = await fetch(`${API_BASE}/api/auth/delete-profile-pic`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${accessToken}`,
                },
                credentials: "include",
              });
              const data = await res.json();
              if (!res.ok) {
                Alert.alert("Error", data.message || "Unable to delete picture");
                return;
              }
              Alert.alert("Success", "Profile picture removed successfully!");
              fetchData();
              fetchUserData(accessToken);
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Network issue, try again.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const calculateExperience = (startDateStr: string) => {
    if (!startDateStr) return 'N/A';

    const startDate = new Date(startDateStr);
    if (isNaN(startDate.getTime())) return 'N/A';

    const now = new Date();
    let months = (now.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += now.getMonth();

    if (months <= 0) return '0 months';

    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      return `${years} year${years !== 1 ? 's' : ''}`;
    }
  };

  if (loading || !personalInfo) {
    return <PersonalInfoSkeleton />;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F8F9FF]`}>
      <View>
        <DocProfileTopBar userProfilePicture={personalInfo?.profilePicture} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`p-5 pb-28`} showsVerticalScrollIndicator={false}>

          {/* 🔀 Tabs Switcher in Present Blue Theme */}
          <View style={tw`flex-row justify-center mb-6 bg-[#EEF4FF] border border-[#DAE1FF] rounded-2xl p-1.5 shadow-sm`}>
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveTab('personal')}
              style={tw`flex-1 py-3 rounded-xl items-center ${activeTab === 'personal' ? 'bg-[#124CB8] shadow-sm' : 'bg-transparent'}`}
            >
              <Text style={tw`font-semibold text-sm ${activeTab === 'personal' ? 'text-white' : 'text-[#434653]'}`}>
                Personal Info
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setActiveTab('address')}
              style={tw`flex-1 py-3 rounded-xl items-center ${activeTab === 'address' ? 'bg-[#124CB8] shadow-sm' : 'bg-transparent'}`}
            >
              <Text style={tw`font-semibold text-sm ${activeTab === 'address' ? 'text-white' : 'text-[#434653]'}`}>
                Clinic Address
              </Text>
            </TouchableOpacity>
          </View>

          {/* ============================================================================
                                     VIEW 1: PERSONAL INFO
          ============================================================================ */}
          {activeTab === 'personal' && (
            <View style={tw`gap-5`}>
              {/* Profile Photo Section */}
              <ProfilePhotoSection
                profilePicture={personalInfo.profilePicture}
                name={personalInfo.name}
                specialization={personalInfo.specialization}
                experienceYears={calculateExperience(personalInfo.practiceStartDate).replace(' years', '').replace(' year', '') || '14'}
                licenseNumber={personalInfo.licenseNumber || 'MC-99201-B'}
                onUploadPress={handlePhotoUpload}
              />

              {/* Stats Card */}
              <DocStatCard
                patientSatisfaction="4.9/5.0"
                totalConsultations="1,240+"
              />

              {/* Current Details Card */}
              <View
                style={[
                  tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 overflow-hidden`,
                  {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 16,
                    elevation: 3,
                  },
                ]}
              >
                <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-5 py-4 flex-row items-center gap-2.5`}>
                  <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                    <UserCheck size={17} color="#124CB8" />
                  </View>
                  <Text style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter']`}>
                    Current Account Details
                  </Text>
                </View>

                <View style={tw`p-5 gap-3`}>
                  <View style={tw`flex-row items-center gap-3 p-3 bg-[#F8F9FF] rounded-xl border border-[#DAE1FF]/60`}>
                    <Mail size={18} color="#124CB8" />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[11px] font-semibold text-[#434653] uppercase`}>Email Address</Text>
                      <Text style={tw`text-[14px] font-medium text-[#011D35]`}>{personalInfo.email || 'Not specified'}</Text>
                    </View>
                  </View>

                  <View style={tw`flex-row items-center gap-3 p-3 bg-[#F8F9FF] rounded-xl border border-[#DAE1FF]/60`}>
                    <Phone size={18} color="#124CB8" />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[11px] font-semibold text-[#434653] uppercase`}>Phone Number</Text>
                      <Text style={tw`text-[14px] font-medium text-[#011D35]`}>{personalInfo.phone || 'Not specified'}</Text>
                    </View>
                  </View>

                  <View style={tw`flex-row items-center gap-3 p-3 bg-[#F8F9FF] rounded-xl border border-[#DAE1FF]/60`}>
                    <Calendar size={18} color="#124CB8" />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[11px] font-semibold text-[#434653] uppercase`}>Practice Started</Text>
                      <Text style={tw`text-[14px] font-medium text-[#011D35]`}>{personalInfo.practiceStartDate || 'Not specified'}</Text>
                    </View>
                  </View>

                  <View style={tw`flex-row items-center gap-3 p-3 bg-[#F8F9FF] rounded-xl border border-[#DAE1FF]/60`}>
                    <Briefcase size={18} color="#124CB8" />
                    <View style={tw`flex-1`}>
                      <Text style={tw`text-[11px] font-semibold text-[#434653] uppercase`}>Total Experience</Text>
                      <Text style={tw`text-[14px] font-medium text-[#011D35]`}>{calculateExperience(personalInfo.practiceStartDate)}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Editable Form Card */}
              <View
                style={[
                  tw`w-full bg-white rounded-[16px] border border-[#DAE1FF]/80 overflow-hidden`,
                  {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 16,
                    elevation: 3,
                  },
                ]}
              >
                <View style={tw`bg-[#EEF4FF] border-b border-[#DAE1FF] px-5 py-4 flex-row items-center gap-2.5`}>
                  <View style={tw`w-8 h-8 rounded-full bg-[#124CB8]/10 justify-center items-center`}>
                    <Sparkles size={17} color="#124CB8" />
                  </View>
                  <View>
                    <Text style={tw`text-[18px] font-semibold text-[#011D35] font-['Inter']`}>
                      Update Personal Info
                    </Text>
                    <Text style={tw`text-[12px] text-[#434653]`}>
                      Keep your professional profile credentials current
                    </Text>
                  </View>
                </View>

                <View style={tw`p-5 gap-3.5`}>
                  <View>
                    <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>Date of Birth</Text>
                    <TextInput
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#9CA3AF"
                      value={form.date_of_birth}
                      onChangeText={(t) => setForm({ ...form, date_of_birth: t })}
                      style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                    />
                  </View>

                  <View>
                    <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>Gender</Text>
                    <View style={tw`border border-[#DAE1FF] rounded-xl bg-[#F8F9FF] overflow-hidden justify-center h-12`}>
                      <Picker
                        selectedValue={form.gender}
                        onValueChange={(itemValue) => setForm({ ...form, gender: itemValue })}
                        style={tw`w-full`}
                      >
                        <Picker.Item label="Select Gender" value="" color="#9CA3AF" />
                        {GENDER_OPTIONS.map((gender, index) => (
                          <Picker.Item key={index} label={gender} value={gender} color="#011D35" />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View>
                    <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>Specialization</Text>
                    <View style={tw`border border-[#DAE1FF] rounded-xl bg-[#F8F9FF] overflow-hidden justify-center h-12`}>
                      <Picker
                        selectedValue={form.specialization}
                        onValueChange={(itemValue) => setForm({ ...form, specialization: itemValue })}
                        style={tw`w-full`}
                      >
                        <Picker.Item label="Select Specialization" value="" color="#9CA3AF" />
                        {SPECIALIZATION_OPTIONS.map((spec, index) => (
                          <Picker.Item key={index} label={spec} value={spec} color="#011D35" />
                        ))}
                      </Picker>
                    </View>
                  </View>

                  <View>
                    <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>Medical License Number</Text>
                    <TextInput
                      placeholder="e.g. MC-99201-B"
                      placeholderTextColor="#9CA3AF"
                      value={form.license_number}
                      onChangeText={(t) => setForm({ ...form, license_number: t })}
                      style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3 text-[14px] text-[#011D35] bg-[#F8F9FF]`}
                    />
                  </View>

                  <View>
                    <Text style={tw`text-[13px] font-semibold text-[#434653] mb-1.5 ml-0.5`}>Practice Start Date</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setDatePickerVisibility(true)}
                      style={tw`border border-[#DAE1FF] rounded-xl px-4 py-3.5 bg-[#F8F9FF]`}
                    >
                      <Text style={form.practice_start_date ? tw`text-[#011D35] text-[14px]` : tw`text-gray-400 text-[14px]`}>
                        {form.practice_start_date || "YYYY-MM"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setDatePickerVisibility(false)}
                  />

                  <TouchableOpacity
                    activeOpacity={0.85}
                    style={tw`bg-[#124CB8] rounded-xl py-3.5 items-center justify-center mt-2 shadow-sm`}
                    onPress={handleUpdateProfile}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                      <Text style={tw`text-white font-bold text-[15px]`}>Save Personal Info</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* ============================================================================
                                     VIEW 2: ADDRESS INFO
          ============================================================================ */}
          {activeTab === 'address' && (
            <DoctorAddressSection />
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;