import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import DoctorProfileScreen from '../screens/DoctorProfileScreen';
import DoctorSettingsScreen from '../screens/DoctorSettingsScreen';
import DoctorNotificationsScreen from '../screens/DoctorNotificationsScreen';
import DoctorReachScreen from '../screens/DoctorReachScreen';
import PatientStoriesScreen from '../screens/PatientStoriesScreen';
import DoctorConsultScreen from '../screens/DoctorConsultScreen';
import HealthfeedScreen from '../screens/HealthfeedScreen';
import DoctorEarningsScreen from '../screens/DoctorEarningsScreen';
import DoctorHeader from '../components/DoctorHeader';
import DoctorsPrimeScreen from '../screens/DoctorsPrimeScreen';
import DoctorReportsScreen from '../screens/DoctorReportsScreen';
import DoctorCalendarScreen from '../screens/DoctorCalendarScreen';
import DoctorPatientsScreen from '../screens/DoctorPatientsScreen';
import AppointmentManagementScreen from '../screens/AppointmentManagementScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import SpecializationsScreen from '../screens/SpecializationsScreen';
import AvailabilityScreen from '../screens/AvailabilitySetScreen';
import ConsultationFeesScreen from '../screens/ConsultationFeesScreen';
import EditDoctorProfile from '../screens/EditDoctorProfileScreen';
import AddSpecialization from '../screens/AddSpecializationScreen';
import AddTimeSlotScreen from '../screens/AddTimeSlotScreen';
import RayScreen from '../screens/RayScreen';
import AccountScreen from '../screens/AccountScreen';
import CashlessSettingsScreen from '../screens/CashlessSettingsScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import OpenSourceLicensesScreen from '../screens/OpenSourceLicensesScreen';
import { View, Text } from 'react-native';

// Placeholder screen component for screens that don't exist yet
const createPlaceholderScreen = (title: string) => () => (
  <View style={{ flex: 1, backgroundColor: 'white' }}>
    <DoctorHeader title={title} />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, color: '#202b6d' }}>{title}</Text>
    </View>
  </View>
);

const CertificationsScreen = createPlaceholderScreen('Certifications');

const Stack = createNativeStackNavigator<DoctorStackParamList>();

const DoctorNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DoctorDashboard"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="DoctorDashboard" component={DoctorDashboardScreen} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="DoctorSettings" component={DoctorSettingsScreen} />
      <Stack.Screen name="DoctorNotifications" component={DoctorNotificationsScreen} />
      <Stack.Screen name="DoctorReach" component={DoctorReachScreen} />
      <Stack.Screen name="PatientStories" component={PatientStoriesScreen} />
      <Stack.Screen name="DoctorConsult" component={DoctorConsultScreen} />
      <Stack.Screen name="Healthfeed" component={HealthfeedScreen} />
      <Stack.Screen name="DoctorEarnings" component={DoctorEarningsScreen} />
      <Stack.Screen name="DoctorPrime" component={DoctorsPrimeScreen} />
      <Stack.Screen name="DoctorReports" component={DoctorReportsScreen} />
      <Stack.Screen name="DoctorCalendar" component={DoctorCalendarScreen} />
      <Stack.Screen name="DoctorPatients" component={DoctorPatientsScreen} />
      <Stack.Screen name="AppointmentManagement" component={AppointmentManagementScreen} />
      <Stack.Screen name="EditDoctorProfile" component={EditDoctorProfile} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="Specializations" component={SpecializationsScreen} />
      <Stack.Screen name="Availability" component={AvailabilityScreen} />
      <Stack.Screen name="Certifications" component={CertificationsScreen} />
      <Stack.Screen name="ConsultationFees" component={ConsultationFeesScreen} />
      <Stack.Screen name="Ray" component={RayScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="CashlessSettings" component={CashlessSettingsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="OpenSourceLicenses" component={OpenSourceLicensesScreen} />
      <Stack.Screen name="AddSpecialization" component={AddSpecialization} />
      <Stack.Screen name="AddTimeSlot" component={AddTimeSlotScreen} />
    </Stack.Navigator>
  );
};

export default DoctorNavigator;
