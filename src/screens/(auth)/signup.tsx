import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react-native';
import tw from 'twrnc';
import apiConfig from '../../../apiConfig'; // Adjust the import path as necessary
import { useUser } from '../contexts/UserContext';
import CompleteProfile from './CompleteProfile';

// Define your stack param list for navigation typing
export type RootStackParamList = {
  '(tabs)': undefined;
  'CompleteProfile': undefined;
  Login: undefined;
};

// 👇 NEW: check login via cookie
const checkLoginWithCookie = async () => {
  try {
    const response = await fetch(`${apiConfig.BASE_URL}/api/auth/check`, {
      method: 'GET',
      credentials: 'include', // 👈 Required to send cookie
    });

    if (response.ok) {
      const data = await response.json();
      return data?.user; // Your backend should return the user if logged in
    }
  } catch (error) {
    console.log('Cookie check failed:', error);
  }
  return null;
};

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState<'general_user' | 'doctor' | 'admin' | 'hospital_organisation'>('general_user');

  const { setUser } = useUser();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 👇 Redirect if already logged in
  useEffect(() => {
    const checkCookieSession = async () => {
      const user = await checkLoginWithCookie();
      if (user) {
        setUser(user);
        navigation.navigate('(tabs)');
      }
    };
    checkCookieSession();
  }, []);

  const handleSignup = async () => {
    setErrorMessage('');
    if (!name || !email || !phoneNumber || !password) {
      setErrorMessage('Please fill all fields.');
      return;
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMessage('Please enter a valid phone number with at least 10 digits.');
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiConfig.API_ENDPOINTS.registerUser, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          phone_number: phoneNumber,
          password,
          role,
        }),
        credentials: 'include', // 👈 Send cookie with signup
      });

      const data = await response.json();

      if (response.ok) {
        setUser({
          id: data.user?.id || '',
          name: data.user?.username || name,
          email: data.user?.email || email,
          phone: data.user?.phone_number || phoneNumber,
          profileImage: data.user?.profile_image || undefined,
          token: data.token || undefined, // optional
        });

        // Replace alert with CLI-compatible Alert
        Alert.alert('Success', data.message || 'Account created successfully!');

        navigation.navigate('CompleteProfile');
      } else {
        setErrorMessage(data.message || 'Failed to create account.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={tw`flex-1 bg-white justify-center px-5 py-10`}> 
      <View style={tw`items-center mb-10 mt-8`}>  
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={tw`w-20 h-20 mb-4 rounded-full bg-gray-200`}
        />
        <Text style={tw`font-bold text-3xl text-blue-700 mb-1`}>Create Account</Text>
      <Text style={tw`text-base text-gray-500`}>Sign up to get started</Text>
    </View>

    {/* Role Selection */}
    <View style={tw`mb-4`}>
      <Text style={tw`text-base text-gray-700 mb-2`}>Select Role</Text>
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity
          style={tw`flex-1 p-3 mx-1 rounded-lg border ${role === 'general_user' ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}
          onPress={() => setRole('general_user')}
        >
          <Text style={tw`${role === 'general_user' ? 'text-white' : 'text-gray-700'} text-center font-medium`}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 p-3 mx-1 rounded-lg border ${role === 'doctor' ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}
          onPress={() => setRole('doctor')}
        >
          <Text style={tw`${role === 'doctor' ? 'text-white' : 'text-gray-700'} text-center font-medium`}>Doctor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 p-3 mx-1 rounded-lg border ${role === 'admin' ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}
          onPress={() => setRole('admin')}
        >
          <Text style={tw`${role === 'admin' ? 'text-white' : 'text-gray-700'} text-center font-medium`}>Admin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex-1 p-3 mx-1 rounded-lg border ${role === 'hospital_organisation' ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}
          onPress={() => setRole('hospital_organisation')}
        >
          <Text style={tw`${role === 'hospital_organisation' ? 'text-white' : 'text-gray-700'} text-center font-medium text-xs`}>Hospital Org</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Error message */}
      {errorMessage ? (
        <View style={tw`bg-red-100 border border-red-400 rounded-lg p-3 mb-4`}>
          <Text style={tw`text-red-700 text-center`}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Full Name */}
      <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
        <User size={20} color="#8F9BB3" style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
          placeholder="Full Name"
          placeholderTextColor="#8F9BB3"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
      </View>

      {/* Email */}
      <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
        <Mail size={20} color="#8F9BB3" style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
          placeholder="Email"
          placeholderTextColor="#8F9BB3"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Phone Number */}
      <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
        <Phone size={20} color="#8F9BB3" style={tw`mr-2`} />
        <Text style={tw`mr-1 text-gray-500`}>+91</Text>
        <TextInput
          style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
          placeholder="Phone Number"
          placeholderTextColor="#8F9BB3"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={15}
        />
      </View>

      {/* Password */}
      <View style={tw`flex-row items-center border border-gray-200 rounded-xl mb-4 px-3 h-14 bg-gray-100`}>
        <Lock size={20} color="#8F9BB3" style={tw`mr-2`} />
        <TextInput
          style={tw`flex-1 h-14 text-base text-gray-800 font-normal`}
          placeholder="Password"
          placeholderTextColor="#8F9BB3"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={tw`p-2`}>
          {showPassword ? (
            <EyeOff size={20} color="#8F9BB3" />
          ) : (
            <Eye size={20} color="#8F9BB3" />
          )}
        </TouchableOpacity>
      </View>

      <Text style={tw`text-xs text-gray-500 mb-6 text-center`}>By signing up, you agree to our <Text style={tw`text-blue-600 font-medium`}>Terms of Service</Text> and <Text style={tw`text-blue-600 font-medium`}>Privacy Policy</Text>.</Text>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={tw`bg-blue-600 rounded-xl h-14 justify-center items-center mb-4 ${loading ? 'opacity-70' : ''}`}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={tw`text-white text-base font-semibold`}>Sign Up</Text>
        )}
      </TouchableOpacity>

      {/* OR Separator */}
      <View style={tw`flex-row items-center my-6`}> 
        <View style={tw`flex-1 h-px bg-gray-200`} />
        <Text style={tw`text-sm text-gray-500 mx-3 font-medium`}>OR</Text>
        <View style={tw`flex-1 h-px bg-gray-200`} />
      </View>

      {/* Social Signup */}
      <View style={tw`flex-row justify-center mb-6`}> 
        <TouchableOpacity style={tw`w-14 h-14 rounded-full bg-gray-100 justify-center items-center mx-3 border border-gray-200`}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
        <TouchableOpacity style={tw`w-14 h-14 rounded-full bg-gray-100 justify-center items-center mx-3 border border-gray-200`}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5968/5968764.png' }}
            style={tw`w-6 h-6`}
          />
        </TouchableOpacity>
      </View>

      {/* Go to Login */}
      <View style={tw`flex-row justify-center mt-2 mb-4`}>
        <Text style={tw`text-sm text-gray-500`}>Already have an account? </Text>
        <TouchableOpacity onPress={goToLogin}>
          <Text style={tw`text-sm text-blue-600 font-semibold`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
