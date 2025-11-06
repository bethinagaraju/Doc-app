

import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, useUser } from './src/screens/contexts/UserContext';
import { View, Keyboard, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Footer from './src/screens/(tabs)/Footer';
import { LoadingProvider } from './src/components/LoadingOverlay';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// All screen imports
import OnboardingScreen from './src/screens/onboarding';
import SearchEverything from './src/screens/SearchEverything';
import VideoCallScreen from './src/screens/VideoCallScreen';
import HomeScreen from './src/screens/(tabs)/index';
import AllHospitalsScreen from './src/screens/(tabs)/AllHospitalsScreen';
import AllPharmaciesScreen from './src/screens/(tabs)/AllPharmaciesScreen';
import ProfileScreen from './src/screens/(tabs)/profile';
import NotificationScreen from './src/screens/(tabs)/Notification';
import AllSpecialtiesScreen from './src/screens/(tabs)/AllSpecialtiesScreen';
import LabTestCategoriesScreen from './src/screens/(tabs)/LabTestCategoriesScreen';
import PharmacyTestCategoriesScreen from './src/screens/(tabs)/pharmacycategorieslist';
import ConsultOptionsScreen from './src/screens/ConsultOptionsScreen';
import HospitalDetailsScreen from './src/screens/(tabs)/HospitalDetailsScreen';
import PharmacyDetailsScreen from './src/screens/(tabs)/PharmacyDetailsScreen';
import VideoConsultationScreen from './src/screens/VideoConsultationScreen';
import AppointmentSuccessScreen from './src/screens/appointment-success';
import AppointmentsScreen from './src/screens/(tabs)/appointments';
import NotFoundScreen from './src/screens/+not-found';
import AuthLayout from './src/screens/(auth)/_layout';
import SignupScreen from './src/screens/(auth)/signup';
import LoginScreen from './src/screens/(auth)/login';
import DoctorLoginScreen from './src/screens/(auth)/doctor-login';
import CompleteProfileScreen from './src/screens/(auth)/CompleteProfile';
import TabsLayout from './src/screens/(tabs)/_layout';
import VideoConsultationTab from './src/screens/(tabs)/videoconsultation';
import TestBookingScreen from './src/screens/(tabs)/TestBooking';
import SettingsScreen from './src/screens/(tabs)/Settings';
import PrivacySecurityScreen from './src/screens/(tabs)/PrivacySecurity';
import PharmacyScreen from './src/screens/(tabs)/pharmacy';
import PersonalDetailsScreen from './src/screens/(tabs)/PersonalDetails';
import PaymentMethodsScreen from './src/screens/(tabs)/PaymentMethods';
import MedicalRecordsScreen from './src/screens/(tabs)/MedicalRecords';
import LabTestsListScreen from './src/screens/(tabs)/LabTestsListScreen';
import LabTestScreen from './src/screens/(tabs)/LabTestScreen';
import DoctorAvailabilityScreen from './src/screens/(tabs)/DoctorAvailability';
import DoctorPopularScreen from './src/screens/(tabs)/DoctorPopular';
import DoctorsScreen from './src/screens/(tabs)/doctors';
import EditProfilePageScreen from './src/screens/(tabs)/EditProfilepage';
import EmergencyServicesScreen from './src/screens/(tabs)/EmergencyServices';
import HelpCenterScreen from './src/screens/(tabs)/HelpCenter';
import MyPaymentsScreen from './src/screens/(tabs)/PaymentMethods';
import WalletScreen from './src/screens/(tabs)/wallet';
import CartScreen from './src/screens/(tabs)/CartScreen';
import AppointmentBooking from './src/screens/(tabs)/AppointemntBooking';
import DoctorProfileScreen from './src/screens/doctor profile/[id]';
import AppoinmentPaymentScreen from './src/screens/(tabs)/AppoinmentPaymentScreen';
import DoctorNavigator from './src/Doctor/navigation/DoctorNavigator';
import { CallProvider } from './src/Doctor/screens/CallContext';

const Stack = createStackNavigator();

const AUTH_SCREENS = [
  'AuthLayout', 'Signup', 'Login', 'DoctorLogin', 'CompleteProfile',
  'AppointmentBooking', 'DoctorProfile', 'AppoinmentPaymentScreen',
  'DoctorNavigator'
];

function RootNavigator() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const [currentRoute, setCurrentRoute] = useState<string | undefined>();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const { isLoggedIn, checkingLogin } = useUser();

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleStateChange = () => {
    const route = navigationRef.current?.getCurrentRoute?.();
    setCurrentRoute(route?.name);
  };

  const isDoctorNavigatorActive = () => {
    const nav = navigationRef.current?.getRootState?.();
    function findDoctorNavigator(route: any): boolean {
      if (!route) return false;
      if (route.name === 'DoctorNavigator') return true;
      if (route.state?.routes) {
        return route.state.routes.some(findDoctorNavigator);
      }
      return false;
    }
    return nav ? nav.routes.some(findDoctorNavigator) : false;
  };

  if (checkingLogin) return null;

  return (
    <NavigationContainer ref={navigationRef} onReady={handleStateChange} onStateChange={handleStateChange}>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'TabsLayout' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllHospitals" component={AllHospitalsScreen} />
        <Stack.Screen name="AllPharmacies" component={AllPharmaciesScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Searcheverything" component={SearchEverything} />
        <Stack.Screen name="VideoCall" component={VideoCallScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="AllSpecialtiesScreen" component={AllSpecialtiesScreen} />
        <Stack.Screen name="LabTestCategoriesScreen" component={LabTestCategoriesScreen} />
        <Stack.Screen name="pharmacytestcategories" component={PharmacyTestCategoriesScreen} />
        <Stack.Screen name="ConsultOptionsScreen" component={ConsultOptionsScreen} />
        <Stack.Screen name="HospitalDetailsScreen" component={HospitalDetailsScreen} />
        <Stack.Screen name="PharmacyDetailsScreen" component={PharmacyDetailsScreen} />
        <Stack.Screen name="VideoConsultationScreen" component={VideoConsultationScreen} />
        <Stack.Screen name="AppointmentSuccess" component={AppointmentSuccessScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="AuthLayout" component={AuthLayout} />
        <Stack.Screen name="DoctorLogin" component={DoctorLoginScreen} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
        <Stack.Screen name="TabsLayout" component={TabsLayout} />
        <Stack.Screen name="VideoConsultationTab" component={VideoConsultationTab} />
        <Stack.Screen name="TestBooking" component={TestBookingScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
        <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
        <Stack.Screen name="MedicalRecords" component={MedicalRecordsScreen} />
        <Stack.Screen name="LabTestsList" component={LabTestsListScreen} />
        <Stack.Screen name="LabTest" component={LabTestScreen} />
        <Stack.Screen name="DoctorAvailability" component={DoctorAvailabilityScreen} />
        <Stack.Screen name="DoctorPopular" component={DoctorPopularScreen} />
        <Stack.Screen name="Doctors" component={DoctorsScreen} />
        <Stack.Screen name="EditProfilePage" component={EditProfilePageScreen} />
        <Stack.Screen name="EmergencyServices" component={EmergencyServicesScreen} />
        <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        <Stack.Screen name="MyPayments" component={MyPaymentsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        {/* The duplicate line that was here has been removed. */}
        <Stack.Screen name="AppointmentBooking" component={AppointmentBooking} />
        <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
        <Stack.Screen name="AppoinmentPaymentScreen" component={AppoinmentPaymentScreen} />
        <Stack.Screen name="DoctorNavigator" component={DoctorNavigator} />
      </Stack.Navigator>

      {!isDoctorNavigatorActive() && !AUTH_SCREENS.includes(currentRoute || '') && !isKeyboardVisible && <Footer />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <LoadingProvider>
          <SafeAreaProvider>
            <View style={{ flex: 1, backgroundColor: '#16a34a' }}>
              <StatusBar backgroundColor="#16a34a" barStyle="light-content" translucent />
              <CallProvider>
              <RootNavigator />
              </CallProvider>
            </View>
          </SafeAreaProvider>
        </LoadingProvider>
      </UserProvider>
    </GestureHandlerRootView>
    
  );
}