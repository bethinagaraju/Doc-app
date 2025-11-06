// Updated FindDoctorsScreen.tsx with search, sort, and filter
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import tw from 'twrnc';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  ThumbsUp,
  LucideSearch,
  X,
  SlidersHorizontal,
} from 'lucide-react-native';
import PageHeader from '../../components/PageHeader';

const locations = ['Hyderabad', 'Bangalore', 'Mumbai', 'Chennai', 'Delhi'];
const departments = ['Cardiologist', 'Dermatologist', 'Dentist', 'Neurologist'];

const FindDoctorsScreen = () => {
  const navigation = useNavigation<any>();
 const route = useRoute<RouteProp<{ params: { specialty?: string; mode?: string } }, 'params'>>();
const initialSpecialty = route.params?.specialty || '';
const initialMode = route.params?.mode || '';

  const [search, setSearch] = useState(initialSpecialty);
  const [location, setLocation] = useState('Hyderabad');
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [consultationMode, setConsultationMode] = useState(initialMode);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

useEffect(() => {
  if (route.params?.mode) {
    const incomingMode = route.params.mode.toLowerCase();
    const normalized =
      incomingMode === 'inclinic'
        ? 'offline'
        : incomingMode === 'video'
        ? 'online'
        : incomingMode;
    setConsultationMode(normalized);
  }

  if (route.params?.specialty) {
    setSelectedDepartment(route.params.specialty);
    setSearch(route.params.specialty);
  }
}, [route.params]);



  useEffect(() => {
    applyFilters();
  }, [search, selectedDepartment, consultationMode, sortBy, doctors]);

  useEffect(() => {
    applyFilters();
  }, [search, selectedDepartment, consultationMode, sortBy, doctors]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://landing.docapp.co.in/api/filter/filter-doctors?page=1');
      const json = await res.json();
      const doctorsData = json?.doctors || [];
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Fetch Doctors Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    if (search) {
      filtered = filtered.filter((doc) =>
        doc.name?.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedDepartment) {
      filtered = filtered.filter((doc) => doc.specialization === selectedDepartment);
    }
if (consultationMode) {
  const normalizedMode = consultationMode === 'inclinic' ? 'offline'
                        : consultationMode === 'video' ? 'online'
                        : consultationMode;

  filtered = filtered.filter((doc) => {
    const slotsStr = doc.user?.doctorSlots?.slots;
    if (!slotsStr || slotsStr === '[]' || slotsStr === 'null') return false;

    let slotArr;

    try {
      slotArr = JSON.parse(slotsStr);
      if (typeof slotArr === 'string') {
        slotArr = JSON.parse(slotArr); // Parse again if needed
      }
    } catch (err) {
      console.warn('Invalid slot format for doctor:', doc.name);
      return false;
    }

    if (!Array.isArray(slotArr)) return false;

    return slotArr.some(
      (day: any) =>
        day?.mode?.toLowerCase() === normalizedMode &&
        Array.isArray(day.slots) &&
        day.slots.length > 0
    );
  });
}


    if (sortBy === 'lowToHigh') {
      filtered.sort((a, b) => parseFloat(a.consultation_fee) - parseFloat(b.consultation_fee));
    } else if (sortBy === 'highToLow') {
      filtered.sort((a, b) => parseFloat(b.consultation_fee) - parseFloat(a.consultation_fee));
    }

    setFilteredDoctors(filtered);
  };

  const handleCardPress = (doctor: any) => {
  const { availability_schedule, ...rest } = doctor;

  navigation.navigate('DoctorProfile', {
    doctor: rest,
    consultationMode: consultationMode, // pass this mode
  });
};


  return (
    <View style={tw`flex-1 bg-green-50`}>
      <PageHeader
        title="Find Doctors"
        backgroundColor="#16a34a"
        textColor="#fff"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity onPress={() => setLocationModalVisible(true)} style={tw`p-2`}>
              <MapPin size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={tw`ml-2 p-2`}>
              <SlidersHorizontal size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        }
      />

      <View style={tw`px-4 pt-2`}>        
        <View style={tw`flex-row items-center bg-green-100 rounded-xl px-3 py-2`}>
          <LucideSearch size={20} color="#888" />
          <TextInput
            style={tw`flex-1 ml-2 text-base`}
            placeholder="Search doctors, specialties..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')} style={tw`ml-2`}>
              <X size={20} color="#888" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color="#16a34a" />
        </View>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`pb-8 pt-2`}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCardPress(item)}
              style={tw`bg-green-50 p-4 mb-4 rounded-xl shadow-sm mx-4`}
            >
              <View style={tw`flex-row`}>
                <Image
                  source={{ uri: item.profile_picture || 'https://via.placeholder.com/80' }}
                  style={tw`w-20 h-20 rounded-lg`}
                />
                <View style={tw`flex-1 ml-3`}>
                  <Text style={tw`text-lg font-bold text-green-800`}>
                    {item.user?.username || 'Unnamed Doctor'}
                  </Text>
                  <Text style={tw`text-green-600`}>
                    {item.specialization || 'Specialty Unknown'}
                  </Text>
                  <Text style={tw`text-green-600`}>
                    {item.id || 'Specialty Unknown'}
                  </Text>
                  <View style={tw`flex-row items-center mt-1`}>
                    <Clock size={14} color="#666" />
                    <Text style={tw`text-green-600 ml-1`}>
                      {item.experience_years || 0} Years experience
                    </Text>
                  </View>
                </View>
              </View>
              <View style={tw`flex-row justify-between items-center mt-3 pt-3 border-t border-green-100`}>
                <View style={tw`flex-row items-center`}>
                  <Star size={16} color="#22c55e" />
                  <Text style={tw`ml-1 font-medium`}>{item.rating || '--'}</Text>
                  <ThumbsUp size={14} color="#22c55e" style={tw`ml-4`} />
                  <Text style={tw`ml-1 font-medium`}>{item.recommendation || '--'}</Text>
                </View>
                <Text style={tw`text-green-800 font-bold`}>
                  ₹{item.consultation_fee}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal visible={locationModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 bg-green-900/10 justify-end`}>
          <View style={tw`bg-green-50 rounded-t-3xl pt-6 pb-8 px-4`}>
            <View style={tw`flex-row justify-between items-center mb-6`}>
              <Text style={tw`text-xl font-bold`}>Select Location</Text>
              <TouchableOpacity onPress={() => setLocationModalVisible(false)}>
                <Text style={tw`text-green-600`}>Done</Text>
              </TouchableOpacity>
            </View>
            {locations.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  setLocation(item);
                  setLocationModalVisible(false);
                }}
                style={tw`py-4 border-b border-green-100`}
              >
                <Text style={tw`${location === item ? 'text-green-600 font-semibold' : 'text-green-800'}`}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <Modal visible={filterModalVisible} transparent animationType="slide">
        <View style={tw`flex-1 bg-green-900/10 justify-end`}>
          <View style={tw`bg-green-50 rounded-t-3xl pt-6 pb-8 px-4`}>
            <Text style={tw`text-xl font-bold mb-4`}>Filter Options</Text>
            <Text style={tw`text-base font-semibold mb-2`}>Department</Text>
            {departments.map((dep) => (
              <TouchableOpacity
                key={dep}
                onPress={() => setSelectedDepartment(dep)}
                style={tw`py-2`}
              >
                <Text style={tw`${selectedDepartment === dep ? 'text-green-600 font-semibold' : 'text-green-800'}`}>{dep}</Text>
              </TouchableOpacity>
            ))}
            <Text style={tw`text-base font-semibold mt-4 mb-2`}>Consultation Mode</Text>
            {['online', 'offline'].map((mode) => (
              <TouchableOpacity key={mode} onPress={() => setConsultationMode(mode)} style={tw`py-2`}>
                <Text style={tw`${consultationMode === mode ? 'text-green-600 font-semibold' : 'text-green-800'}`}>{mode}</Text>
              </TouchableOpacity>
            ))}
            <Text style={tw`text-base font-semibold mt-4 mb-2`}>Sort by Price</Text>
            {[
              { label: 'Low to High', value: 'lowToHigh' },
              { label: 'High to Low', value: 'highToLow' },
            ].map((opt) => (
              <TouchableOpacity key={opt.value} onPress={() => setSortBy(opt.value)} style={tw`py-2`}>
                <Text style={tw`${sortBy === opt.value ? 'text-green-600 font-semibold' : 'text-green-800'}`}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
  onPress={() => {
    setFilterModalVisible(false);
    applyFilters(); // In case Apply Filters needs to be triggered here too
  }}
  style={tw`mt-6 bg-green-600 rounded-lg py-3`}
>
  <Text style={tw`text-center text-white text-base font-semibold`}>Apply Filters</Text>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    setSelectedDepartment('');
    setConsultationMode('');
    setSortBy('');
    setFilterModalVisible(false);
    applyFilters();
  }}
  style={tw`mt-3 border border-green-300 rounded-lg py-3`}
>
  <Text style={tw`text-center text-green-700 text-base font-semibold`}>Clear Filters</Text>
</TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FindDoctorsScreen;



