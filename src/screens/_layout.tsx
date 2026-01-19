import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, StyleSheet } from 'react-native';

import { UserProvider } from '../screens/contexts/UserContext';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <SafeAreaProvider>
        <View style={styles.gradient}>
          {children}
        </View>
      </SafeAreaProvider>
    </UserProvider>
  );
}

// Export screens for use in other navigators
export { default as HospitalAppointmentsScreen } from './HospitalAppointmentsScreen';
export { default as HospitalAdminScreen } from './HospitalAdminScreen';