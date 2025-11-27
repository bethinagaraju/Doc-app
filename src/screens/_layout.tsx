import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { UserProvider } from '../screens/contexts/UserContext';
import HospitalAppointmentsScreen from './HospitalAppointmentsScreen';
import HospitalAdminScreen from './HospitalAdminScreen';
// Import your screens here
// import TabsScreen from './TabsScreen';
// import NotFoundScreen from './NotFoundScreen';
// import DoctorAvailability from './DoctorAvailability';
// import ConsultOptionsScreen from './ConsultOptionsScreen';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default function RootLayout() {
  // Remove useFrameworkReady if not needed outside Expo

  return (
    <UserProvider>
      <SafeAreaProvider>
        <View style={styles.gradient}>
          <NavigationContainer className="bg-green-500">
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* App routes */}
              <Stack.Screen name="HospitalAdmin" component={HospitalAdminScreen} />
              <Stack.Screen name="HospitalAppointments" component={HospitalAppointmentsScreen} />
              {/* Add other screens here as needed */}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </UserProvider>
  );
}