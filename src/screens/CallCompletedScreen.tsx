import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle } from 'lucide-react-native';
import { useUser } from './contexts/UserContext';

const CallCompletedScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useUser();

  const handleReturnHome = () => {
    const role = user?.role?.toLowerCase();
    if (role === 'doctor') {
      navigation.navigate('DoctorNavigator');
    } else {
      // For patients or default
      navigation.navigate('TabsLayout');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle size={64} color="#34A853" />
        </View>
        <Text style={styles.title}>Consultation Completed</Text>
        <Text style={styles.subtitle}>
          The video consultation has successfully ended.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleReturnHome}
        >
          <Text style={styles.buttonText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
    backgroundColor: 'rgba(52, 168, 83, 0.1)',
    padding: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 99,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default CallCompletedScreen;
