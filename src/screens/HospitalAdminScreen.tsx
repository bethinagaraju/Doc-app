import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
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
  Building,
  ClipboardList,
  UserCheck,
  TrendingUp,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';

type HospitalAdminNavigationProp = NativeStackNavigationProp<any>;

const HospitalAdminScreen = () => {
  const navigation = useNavigation<HospitalAdminNavigationProp>();

  const menuItems = [
    {
      id: 1,
      title: 'Hospital Profile',
      icon: <Building size={24} color="#16a34a" />,
      route: 'HospitalProfile' as const,
    },
    {
      id: 2,
      title: 'Doctor Management',
      icon: <UserSquare2 size={24} color="#16a34a" />,
      route: 'DoctorManagement' as const,
    },
    {
      id: 3,
      title: 'Patient Records',
      icon: <FileText size={24} color="#16a34a" />,
      route: 'PatientRecords' as const,
    },
    {
      id: 4,
      title: 'Appointments',
      icon: <Calendar size={24} color="#16a34a" />,
      route: 'HospitalAppointments' as const,
    },
    {
      id: 5,
      title: 'Staff Management',
      icon: <Users size={24} color="#16a34a" />,
      route: 'StaffManagement' as const,
    },
    {
      id: 6,
      title: 'Reports & Analytics',
      icon: <BarChart2 size={24} color="#16a34a" />,
      route: 'HospitalReports' as const,
    },
    {
      id: 7,
      title: 'Billing & Payments',
      icon: <BadgeDollarSign size={24} color="#16a34a" />,
      route: 'HospitalBilling' as const,
    },
    {
      id: 8,
      title: 'Inventory',
      icon: <ClipboardList size={24} color="#16a34a" />,
      route: 'HospitalInventory' as const,
    },
    {
      id: 9,
      title: 'Doctor Approvals',
      icon: <UserCheck size={24} color="#16a34a" />,
      route: 'DoctorApprovals' as const,
    },
    {
      id: 10,
      title: 'Notifications',
      icon: <Bell size={24} color="#16a34a" />,
      route: 'HospitalNotifications' as const,
    },
    {
      id: 11,
      title: 'Settings',
      icon: <Settings size={24} color="#16a34a" />,
      route: 'HospitalSettings' as const,
    },
    {
      id: 12,
      title: 'Performance',
      icon: <TrendingUp size={24} color="#16a34a" />,
      route: 'HospitalPerformance' as const,
    },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 p-4 mt-8`}>
        <Text style={tw`text-white text-xl font-bold text-center`}>Hospital Admin Dashboard</Text>
        <Text style={tw`text-green-100 text-center mt-1`}>Manage your hospital operations</Text>
      </View>

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
              onPress={() => {
                if (
                  item.route === 'HospitalProfile' ||
                  item.route === 'DoctorManagement' ||
                  item.route === 'HospitalAppointments'
                ) {
                  navigation.navigate(item.route);
                } else {
                  // For now, just show an alert. In future, navigate to specific screens
                  Alert.alert('Feature Coming Soon', `${item.title} - This feature is under development!`);
                }
              }}
            >
              <View style={tw`items-center`}>
                {item.icon}
                <Text style={tw`text-green-700 text-xs font-medium mt-2 text-center`}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Stats */}
        <View style={tw`mt-4`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Hospital Overview</Text>
          <View style={tw`bg-green-100 rounded-2xl p-4 shadow-sm`}>
            <View style={tw`flex-row justify-between mb-4`}>
              <View>
                <Text style={tw`text-green-600`}>Total Doctors</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>45</Text>
              </View>
              <View>
                <Text style={tw`text-green-600`}>Active Patients</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>2,156</Text>
              </View>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View>
                <Text style={tw`text-green-600`}>Today's Appointments</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>89</Text>
              </View>
              <View>
                <Text style={tw`text-green-600`}>Revenue This Month</Text>
                <Text style={tw`text-2xl font-bold text-green-700`}>₹12.5L</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={tw`mt-6 mb-6`}>
          <Text style={tw`text-lg font-bold text-green-700 mb-4`}>Recent Activities</Text>
          <View style={tw`bg-green-100 rounded-2xl p-4 shadow-sm`}>
            <View style={tw`border-l-4 border-green-600 pl-3 mb-4`}>
              <Text style={tw`text-green-700 font-medium`}>New Doctor Joined</Text>
              <Text style={tw`text-green-600 text-sm`}>Dr. Sarah Johnson joined Cardiology department</Text>
              <Text style={tw`text-xs text-green-400 mt-1`}>2 hours ago</Text>
            </View>
            <View style={tw`border-l-4 border-green-600 pl-3 mb-4`}>
              <Text style={tw`text-green-700 font-medium`}>Appointment Completed</Text>
              <Text style={tw`text-green-600 text-sm`}>Patient consultation with Dr. Michael Chen</Text>
              <Text style={tw`text-xs text-green-400 mt-1`}>30 mins ago</Text>
            </View>
            <View style={tw`border-l-4 border-green-600 pl-3`}>
              <Text style={tw`text-green-700 font-medium`}>Payment Received</Text>
              <Text style={tw`text-green-600 text-sm`}>₹2,500 received for consultation</Text>
              <Text style={tw`text-xs text-green-400 mt-1`}>15 mins ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HospitalAdminScreen;
