import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';


const AddSpecializationScreen = () => {
  const [specialization, setSpecialization] = useState('');
  const [description, setDescription] = useState('');
  const [years, setYears] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAdd = () => {
    if (!specialization.trim() || !description.trim() || !years.trim()) {
      Alert.alert('Validation', 'Please fill all fields.');
      return;
    }
    if (isNaN(Number(years)) || Number(years) < 0) {
      Alert.alert('Validation', 'Years of experience must be a positive number.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setSpecialization('');
      setDescription('');
      setYears('');
      setTimeout(() => setSuccess(false), 1500);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={tw`flex-1 bg-green-50`}>
        <DoctorHeader title="Add Specialization" showSettings={true} showNotifications={true} />
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`w-11/12 bg-white rounded-2xl p-6 shadow-sm`}>
            <Text style={tw`text-2xl font-bold text-green-700 mb-4`}>Add Specialization</Text>
            <TextInput
              style={styles.input}
              placeholder="Specialization Name"
              placeholderTextColor="#aaa"
              value={specialization}
              onChangeText={setSpecialization}
              editable={!loading}
              returnKeyType="next"
            />
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Description"
              placeholderTextColor="#aaa"
              value={description}
              onChangeText={setDescription}
              editable={!loading}
              multiline
              numberOfLines={3}
              returnKeyType="next"
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              placeholderTextColor="#aaa"
              value={years}
              onChangeText={setYears}
              editable={!loading}
              keyboardType="numeric"
              returnKeyType="done"
              onSubmitEditing={handleAdd}
            />
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleAdd}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>{success ? '✔ Added' : 'Add'}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    color: '#222',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    fontSize: 17,
    backgroundColor: '#fafbfc',
    color: '#222',
  },
  button: {
    width: '100%',
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#90caf9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default AddSpecializationScreen;
