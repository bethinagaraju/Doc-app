import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  Settings,
  Bell,
  UserSquare2,
  MessageSquare,
  ThumbsUp,
  Stethoscope,
  Calendar,
  Users,
  BarChart2,
  FileText,
  Crown,
  BadgeDollarSign,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';

type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

const DoctorDashboardScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();

  const menuItems = [
    {
      id: 1,
      title: 'Profile',
      icon: <UserSquare2 size={24} color="#16a34a" />,
      route: 'DoctorProfile' as const,
    },
    {
      id: 2,
      title: 'Reach',
      icon: <MessageSquare size={24} color="#16a34a" />,
      route: 'DoctorReach' as const,
      count: '1.9K',
    },
    {
      id: 3,
      title: 'Patient Stories',
      icon: <ThumbsUp size={24} color="#16a34a" />,
      route: 'PatientStories' as const,
      count: '24',
    },
    {
      id: 4,
      title: 'Consult',
      icon: <Stethoscope size={24} color="#16a34a" />,
      route: 'DoctorConsult' as const,
    },
    {
      id: 5,
      title: 'Healthfeed',
      icon: <FileText size={24} color="#16a34a" />,
      route: 'Healthfeed' as const,
    },
    {
      id: 6,
      title: 'Earnings',
      icon: <BadgeDollarSign size={24} color="#16a34a" />,
      route: 'DoctorEarnings' as const,
    },
    {
      id: 7,
      title: 'Prime',
      icon: <Crown size={24} color="#16a34a" />,
      route: 'DoctorPrime' as const,
    },
    {
      id: 8,
      title: 'Reports',
      icon: <BarChart2 size={24} color="#16a34a" />,
      route: 'DoctorReports' as const,
    },
    {
      id: 9,
      title: 'Calendar',
      icon: <Calendar size={24} color="#16a34a" />,
      route: 'DoctorCalendar' as const,
    },
    {
      id: 10,
      title: 'Patients',
      icon: <Users size={24} color="#16a34a" />,
      route: 'DoctorPatients' as const,
    },
    {
      id: 11,
      title: 'Appointment Management',
      icon: <Calendar size={24} color="#16a34a" />,
      route: 'AppointmentManagement' as const,
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />
      <DoctorHeader title="DASHBOARD" showDoctorInfo />
      
      <ScrollView 
        style={tw`flex-1 bg-green-50`}
        contentContainerStyle={tw`p-4`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`flex-row flex-wrap justify-between`}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={tw`w-[31%] bg-green-100 rounded-2xl p-4 mb-4 shadow-sm items-center justify-center`}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={tw`items-center`}>
                {item.icon}
                <Text style={tw`text-green-700 text-xs font-medium mt-2 text-center`}>
                  {item.title}
                </Text>
                {item.count && (
                  <View style={tw`absolute -top-2 -right-2 bg-green-600 rounded-full px-2 py-0.5`}>
                    <Text style={tw`text-white text-xs font-bold`}>{item.count}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Quick Stats</Text>
          <View style={tw`bg-green-100 rounded-2xl p-4 shadow-sm`}>
            <View style={tw`flex-row justify-between mb-4`}>
              <View>
                <Text style={tw`text-green-600`}>Today's Appointments</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>12</Text>
              </View>
              <View>
                <Text style={tw`text-green-600`}>Total Patients</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>1,234</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View>
                <Text style={tw`text-green-600`}>This Month's Earnings</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>₹45,000</Text>
              </View>
              <View>
                <Text style={tw`text-green-600`}>Rating</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>4.8 ⭐</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={tw`mt-6 mb-6`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Recent Activities</Text>
          <View style={tw`bg-green-100 rounded-2xl p-4 shadow-sm`}>
            <View style={tw`border-l-4 border-green-600 pl-3 mb-4`}>
              <Text style={tw`text-green-700 font-medium`}>New Appointment</Text>
              <Text style={tw`text-green-600 text-sm`}>John Smith booked for 2:30 PM</Text>
              <Text style={tw`text-xs text-green-400 mt-1`}>2 mins ago</Text>
            </View>
            <View style={tw`border-l-4 border-green-600 pl-3`}>
              <Text style={tw`text-green-700 font-medium`}>Review Posted</Text>
              <Text style={tw`text-green-600 text-sm`}>Sarah gave you a 5-star rating</Text>
              <Text style={tw`text-xs text-green-400 mt-1`}>1 hour ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorDashboardScreen;
