import tw from 'twrnc';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { useUser } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft } from 'lucide-react-native'; // Importing the back arrow icon
import { DoctorStackParamList } from '../../Doctor/types/navigation';

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    setLoading(true);
    try {
      // MOCK LOGIN: set a fake user and redirect
      const user = {
        id: 'mock-id',
        email,
        name: 'Dr. Mock',
        profileImage: '',
        token: 'mock-token',
      };
      setUser(user);
      await AsyncStorage.setItem('authToken', 'mock-token');
      navigation.reset({
        index: 0,
        routes: [
          { name: 'DoctorNavigator' },
        ],
      });
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <View style={tw`flex-row items-center mb-8`}>
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`p-2`}>
          <ArrowLeft size={24} color="#4A90E2" />
        </TouchableOpacity>
        <View style={tw`flex-1 items-center`}>
          <Image
            source={{ uri: 'https://example.com/doctor-logo.png' }} // Replace with your logo URL
            style={tw`w-24 h-24`}
          />
          <Text style={tw`text-3xl font-semibold text-blue-600 mt-4`}>Doctor</Text>
        </View>
      </View>

      <Text style={tw`text-xl font-bold text-center text-gray-700 mb-2`}>
        Welcome Back
      </Text>
      <Text style={tw`text-base text-center text-gray-500 mb-6`}>
        Start a better experience by logging into your account
      </Text>

      <View style={tw`mb-6`}>
        <TextInput
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 text-base text-gray-800`}
          placeholder="Enter your email"
          placeholderTextColor="#A1A1A1"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={tw`relative`}>
          <TextInput
            style={tw`bg-gray-100 p-4 rounded-lg text-base text-gray-800`}
            placeholder="Enter your password"
            placeholderTextColor="#A1A1A1"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={tw`absolute top-1/2 right-4 transform -translate-y-1/2`}
          >
            {showPassword ? <EyeOff size={20} color="#8F9BB3" /> : <Eye size={20} color="#8F9BB3" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={tw`self-end mb-6`}>
        <Text style={tw`text-sm text-blue-600`}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tw`bg-blue-600 rounded-lg h-14 justify-center items-center mb-6`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={tw`text-white text-lg font-semibold`}>
          {loading ? 'Logging in...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Removed "Create Account" and "Doctor Login" buttons */}
    </View>
  );
}
