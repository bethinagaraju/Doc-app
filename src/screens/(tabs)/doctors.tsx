
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { ArrowLeft, Clock, Star, ThumbsUp, MapPin } from 'lucide-react-native';
import PageHeader from '../../components/PageHeader';
import DoctorCard, { DoctorCardSkeleton } from '../../components/DoctorCard';
import UsersearchFilter from '../../components/UsersearchFilter';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUser } from '../contexts/UserContext';

const departments = ['Cardiologist', 'Dermatologist', 'Dentist', 'Neurologist'];

const cityPincodes: any = {
  Warangal: '506006',
  Hyderabad: '500001',
  Bangalore: '560001',
  Anantharam: '506365',
};

const FindDoctorsScreen = () => {
  const navigation = useNavigation<any>();
  const { accessToken } = useAccessToken();

  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { consultationMode, setConsultationMode } = useUser();

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

  /* ================= FETCH BY CITY ================= */

  const fetchByCity = async (city: string) => {
    if (!accessToken) return;

    const pincode = cityPincodes[city];
    if (!pincode) return;

    setLoading(true);

    try {
      let url = `https://api.docapp.co.in/api/filter/filter-doctors?`;

      const params = new URLSearchParams();

      if (selectedDepartment) {
        params.append('specialization', selectedDepartment);
      }

      params.append('pincode', pincode);

      url += params.toString();

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const json = await res.json();
      console.log('Fetched Doctors by City:', json?.doctors);
      setDoctors(json?.doctors || []);
    } catch (error) {
      console.log('City Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= INITIAL LOAD ================= */

  useEffect(() => {
    if (accessToken) {
      fetchByLiveLocation();
    }
  }, [accessToken]);

  /* ================= FILTER CHANGE ================= */

  useEffect(() => {
    if (!accessToken) return;

    if (selectedCity) {
      fetchByCity(selectedCity);
    } else {
      fetchByLiveLocation();
    }
  }, [selectedCity, selectedDepartment]);

  /* ================= UI ================= */

  return (
    <SafeAreaView style={[tw`flex-1 px-4`]}>
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

      <View style={tw`flex-row justify-between items-center mt-4 mb-2 px-1`}>
        <Text style={tw`text-[18px] font-bold text-[#191C1E]`}>
          Top Specialists Near You
        </Text>
        <TouchableOpacity>
          <Text style={tw`text-[14px] font-semibold text-[#124CB8]`}>
            View Map
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={tw`py-4`}>
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
          <DoctorCardSkeleton />
        </View>
      ) : (

        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`py-4`}
          renderItem={({ item }) => (
            <DoctorCard
              item={item}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
      )}



    </SafeAreaView>
  );
};

export default FindDoctorsScreen;