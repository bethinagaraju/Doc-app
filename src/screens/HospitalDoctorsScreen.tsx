import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import DoctorCard, { DoctorCardSkeleton } from '../components/DoctorCard';
import { useAccessToken } from './contexts/AccessTokenContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HospitalDoctorsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { hospitalId } = route.params;
  const { accessToken } = useAccessToken();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [hospitalName, setHospitalName] = useState<string>('Hospital Doctors');
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`https://api.docapp.co.in/api/filter/get-hospital-doctors/${hospitalId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      if (data?.doctors) {
        const enrichedDoctors = data.doctors.map((doc: any) => ({
          ...doc,
          organisation: {
            organisation_name: data.organisation_name,
          }
        }));
        setDoctors(enrichedDoctors);
        if (data.organisation_name) setHospitalName(data.organisation_name);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDoctors();
    }, [hospitalId, accessToken])
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-[#F5F7FA]`}>
      {/* Header */}
      <View style={tw`flex-row items-center px-4 py-3 bg-white shadow-sm z-10`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2 -ml-2 rounded-full`}>
          <ArrowLeft size={24} color="#191C1E" />
        </TouchableOpacity>
        <Text style={tw`text-[18px] font-bold text-[#191C1E] ml-2`} numberOfLines={1}>
          {hospitalName}
        </Text>
      </View>

      <FlatList
        data={doctors}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={tw`p-4 pb-20`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 items-center justify-center pt-10`}>
            {loading ? (
              <View style={tw`w-full`}>
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
              </View>
            ) : (
              <Text style={tw`text-[#737684] text-[16px]`}>No doctors found.</Text>
            )}
          </View>
        )}
        renderItem={({ item }) => (
          <View style={tw`mb-4`}>
            <DoctorCard
              item={item}
              onPress={() => navigation.navigate('DoctorProfile', { doctor: item })}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
