
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import tw from 'twrnc';
import DoctorCard, { DoctorCardSkeleton } from '../../components/DoctorCard';
import UsersearchFilter from '../../components/UsersearchFilter';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUser } from '../contexts/UserContext';
import FeaturedBentoSection from '../../components/FeaturedBentoSection';

const departments = [
  "Ayurveda",
  "Cardiology",
  "Dentistry",
  "Dermatology",
  "Diabetology",
  "Diet & Nutrition",
  "ENT",
  "Endocrinology",
  "Gastroenterology",
  "General Physician",
  "General Surgery",
  "Gynecology",
  "Homeopathy",
  "Internal Medicine",
  "Nephrology",
  "Neurology",
  "Obstetrics",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Pediatrics",
  "Physiotherapy",
  "Plastic Surgery",
  "Psychiatry",
  "Psychology",
  "Pulmonology",
  "Rheumatology",
  "Sexology",
  "Siddha",
  "Unani",
  "Urology"
];

const cityPincodes: any = {
  Warangal: '506006',
  Hyderabad: '500001',
  Bangalore: '560001',
  Chennai: '600119',
  Anantharam: '506365',
  Thimmarainipahad: 506332
};

const FindDoctorsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { accessToken } = useAccessToken();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [useLiveLocation, setUseLiveLocation] = useState(true);

  const { consultationMode, setConsultationMode } = useUser();

  // Set initial filters from route params (passed from ConsultOptionsScreen)
  useEffect(() => {
    if (route.params?.specialty) {
      setSelectedDepartment(route.params.specialty);
    }
    if (route.params?.mode) {
      const mappedMode = route.params.mode === 'video' ? 'online' : 'offline';
      setConsultationMode(mappedMode);
    }
  }, [route.params?.specialty, route.params?.mode]);

  /* ================= NAVIGATION HANDLER ================= */

  const handleCardPress = (doctor: any) => {
    navigation.navigate('DoctorProfile', { doctor });
  };

  /* ================= LOCATION PERMISSION ================= */

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  /* ================= FETCH BY LIVE LOCATION ================= */

  const fetchByLiveLocation = async () => {
    if (!accessToken) return;

    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    setLoading(true);

    Geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          let url = `https://api.docapp.co.in/api/filter/filter-docs-by-loc?userLatitude=${latitude}&userLongitude=${longitude}`;

          if (selectedDepartment) {
            url += `&specialization=${encodeURIComponent(selectedDepartment)}`;
          }

          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const json = await res.json();
          console.log('Fetched Doctors by Live Location:', json?.doctors);
          setDoctors(json?.doctors || []);
        } catch (error) {
          console.log('Live Location Error:', error);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  /* ================= FETCH GENERAL / BY CITY ================= */

  const fetchGeneral = async () => {
    if (!accessToken) return;

    setLoading(true);

    try {
      let url = `https://api.docapp.co.in/api/filter/filter-doctors?`;

      const params = new URLSearchParams();

      if (selectedDepartment) {
        params.append('specialization', selectedDepartment);
      }

      if (selectedCity) {
        const pincode = cityPincodes[selectedCity];
        if (pincode) params.append('pincode', pincode);
      }

      url += params.toString();

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const json = await res.json();
      console.log('Fetched Doctors:', json?.doctors);
      setDoctors(json?.doctors || []);
    } catch (error) {
      console.log('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOAD DOCTORS ================= */

  useFocusEffect(
    useCallback(() => {
      if (!accessToken) return;

      if (useLiveLocation) {
        fetchByLiveLocation();
      } else {
        fetchGeneral();
      }
    }, [accessToken, selectedCity, selectedDepartment, useLiveLocation])
  );

  /* ================= UI ================= */

  return (
    <SafeAreaView style={[tw`flex-1 px-4 pb-16`]}>
      {/* <PageHeader
        title="Find Doctors"
        backgroundColor="#16a34a"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
      /> */}

      <FlatList
        data={loading ? [] : doctors}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-10`}
        ListHeaderComponent={
          <View style={tw`w-full`}>
            <UsersearchFilter
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              cityPincodes={cityPincodes}
              departments={departments}
              selectedMode={consultationMode}
              setSelectedMode={setConsultationMode}
            />

            {/* Selected Filters Chips */}
            {(selectedDepartment !== '' || selectedCity !== '') && (
              <View style={tw`flex-row flex-wrap mt-3 px-1`}>
                {selectedDepartment !== '' && (
                  <View style={tw`bg-[#E1E8ED] px-3 py-1.5 rounded-full flex-row items-center mr-2 mb-2`}>
                    <Text style={tw`text-[#124CB8] text-[13px] font-semibold mr-1`}>{selectedDepartment}</Text>
                    <TouchableOpacity onPress={() => setSelectedDepartment('')}>
                      <X size={14} color="#124CB8" />
                    </TouchableOpacity>
                  </View>
                )}
                {selectedCity !== '' && (
                  <View style={tw`bg-[#E1E8ED] px-3 py-1.5 rounded-full flex-row items-center mr-2 mb-2`}>
                    <Text style={tw`text-[#124CB8] text-[13px] font-semibold mr-1`}>{selectedCity}</Text>
                    <TouchableOpacity onPress={() => setSelectedCity('')}>
                      <X size={14} color="#124CB8" />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}

            <View style={tw`my-2 items-center w-full`}>
              <FeaturedBentoSection />
            </View>

            <View style={tw`flex-row justify-between items-center mt-4 mb-2 px-1`}>
              <Text style={tw`flex-1 text-[18px] font-bold text-[#191C1E] mr-2`} numberOfLines={2}>
                {useLiveLocation ? 'Top Specialists Near You' : 'All Specialists'}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`text-[14px] font-semibold text-[#124CB8] mr-2`}>
                  Live Location
                </Text>
                <Switch
                  value={useLiveLocation}
                  onValueChange={setUseLiveLocation}
                  trackColor={{ false: "#767577", true: "#16a34a" }}
                  thumbColor={useLiveLocation ? "#ffffff" : "#f4f3f4"}
                />
              </View>
            </View>

            {loading && (
              <View style={tw`py-4`}>
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
                <DoctorCardSkeleton />
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={tw`mb-4`}>

            <DoctorCard
              item={item}
              onPress={() => handleCardPress(item)}
            />

          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default FindDoctorsScreen;