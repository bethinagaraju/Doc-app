


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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Briefcase, IndianRupee, ShieldCheck, Star } from 'lucide-react-native';
import tw from 'twrnc';
import PageHeader from '../../components/PageHeader';
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';
import ProfileTopBar from '../../components/ProfileTopBar';
import DoctorProfileInfo from '../../components/DoctorProfileInfo';
import BookAppointmentButton from '../../components/BookAppointmentButton';

const DoctorProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params as any;

  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedTab, setSelectedTab] = useState<'Reviews' | 'About'>('About');

  const { consultationMode } = useUser(); // online or offline

  useEffect(() => {
    setReviews([
      { name: 'Rohit Sharma', rating: 5, comment: 'Excellent doctor.' },
      { name: 'Priya Verma', rating: 4, comment: 'Good experience.' },
      { name: 'Amit Joshi', rating: 5, comment: 'Very professional.' },
    ]);
  }, []);

  const handleBookNowPress = () => {
    navigation.navigate('DoctorSlots', {
      doctor,
      doctorId: doctor.user_id,
      consultationMode,
    });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>

      <ProfileTopBar />

      <ScrollView contentContainerStyle={tw`pt-4 px-4 pb-[128px] flex-col gap-8 bg-[#F8F9FF]`}>
        {/* Doctor Info */}
        <DoctorProfileInfo doctor={doctor} consultationMode={consultationMode} />

        {/* Tabs */}
        <View style={tw`flex-row bg-[#F2F4F7] rounded-[14px] p-1`}>
          {['About', 'Reviews'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={tw`flex-1 py-3 rounded-[10px] ${selectedTab === tab ? 'bg-white shadow-sm' : 'bg-transparent'}`}
              onPress={() => setSelectedTab(tab as typeof selectedTab)}
            >
              <Text style={tw`text-center text-[15px] font-['Public Sans'] ${selectedTab === tab ? 'text-[#191C1E] font-bold' : 'text-[#42474E] font-semibold'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>



        {/* Reviews */}
        {selectedTab === 'Reviews' && (
          <View style={tw`w-[358px] flex-col items-start gap-[12px]`}>
            {/* Heading */}
            <View style={tw`w-[358px] px-1`}>
              <Text style={tw`text-[20px] font-bold text-[#191C1E] font-['Public Sans'] tracking-wide`}>
                Patient Reviews
              </Text>
            </View>

            {/* Reviews Container */}
            <View style={tw`w-[358px] bg-white/50 border border-[#DEE3EB]/20 rounded-[16px] p-[16px] flex-col items-start gap-4`}>
              {reviews.map((review, index) => (
                <View key={index} style={tw`w-full border-b border-[#DEE3EB]/20 pb-4 ${index === reviews.length - 1 ? 'border-b-0 pb-0' : ''}`}>
                  <Text style={tw`text-[16px] font-bold text-[#191C1E] font-['Public Sans']`}>{review.name}</Text>

                  {/* Stars */}
                  <View style={tw`flex-row items-center gap-1 my-1.5`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} color="#EAB308" fill="#EAB308" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={i + review.rating} size={14} color="#DEE3EB" />
                    ))}
                  </View>

                  <Text style={tw`text-[14px] text-[#42474E] font-normal font-['Public Sans'] leading-[22px]`}>
                    {review.comment}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* About Section */}
        {selectedTab === 'About' && (
          <View style={tw`w-[358px] flex-col items-start gap-[12px]`}>

            {/* Heading 3 */}
            <View style={tw`w-[358px] px-1`}>
              <Text style={tw`text-[20px] font-bold text-[#191C1E] font-['Public Sans'] tracking-wide`}>
                About Doctor
              </Text>
            </View>

            {/* Overlay+Border Container */}
            <View style={tw`w-[358px] bg-white/50 border border-[#DEE3EB]/20 rounded-[16px] p-[16px] flex-col items-start`}>
              <Text style={tw`w-[321px] text-[16px] text-[#42474E] font-normal font-['Public Sans'] leading-[26px]`}>
                {doctor.about_description ||
                  `Dr. ${doctor.user?.username || 'Name'} is a board-certified ${doctor.specialization || 'specialist'} with over ${doctor.experience_years || '0'} years of experience in clinical medicine. Known for an empathetic approach, combining cutting-edge technology with personalized treatment plans to ensure the best outcomes for patients.`
                }
              </Text>
            </View>

          </View>
        )}

      </ScrollView>

      <BookAppointmentButton handleBookNowPress={handleBookNowPress} />

    </SafeAreaView>
  );
};

export default DoctorProfileScreen;
