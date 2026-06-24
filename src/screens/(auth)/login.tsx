
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUserProfile } from '../../contexts/userProfileContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'general_user' | 'doctor' | 'admin' | 'hospital_organisation'>('general_user');

  const { setIsLoggedIn } = useUser();
  const { setAccessToken } = useAccessToken();
  const { fetchAndStoreUserData } = useUserProfile();
  const navigation = useNavigation();

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert('Validation Error', 'Please enter both email and password.');
  //     return;
  //   }

  //   try {
  //     const apiUrl = role === 'admin' 
  //       ? 'https://landing.docapp.co.in/api/admin/login' 
  //       : 'https://landing.docapp.co.in/api/auth/login';

  //     const res = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       // credentials: 'include',
  //       body: JSON.stringify({
  //         email,
  //         password,
  //         ...(role === 'admin' ? {} : { role }),
  //       }),
  //     });

  //     let data: any;
  //     const contentType = res.headers.get('content-type');
  //     if (contentType && contentType.includes('application/json')) {
  //       data = await res.json();
  //     } else {
  //       throw new Error(`Server error: ${res.status} ${res.statusText}`);
  //     }

  //     if (!res.ok || (role === 'admin' ? data?.message !== 'Login successful' : data?.message !== 'Login Success')) {
  //       throw new Error(data?.message || 'Login failed');
  //     }

  //     setIsLoggedIn(true);
  //     setAccessToken(data.token);
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         { 
  //           name: role === 'doctor' 
  //             ? 'DoctorNavigator' 
  //             : role === 'admin' 
  //             ? 'AdminHome' 
  //             : role === 'hospital_organisation' 
  //             ? 'HospitalAdmin' 
  //             : 'TabsLayout' 
  //         },
  //       ],
  //     });
  //   } catch (err: any) {
  //     Alert.alert('Login Failed', err.message || 'Something went wrong');
  //   }
  // };

const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Validation Error', 'Please enter both email and password.');
    return;
  }

  try {
    const apiUrl =
      role === 'admin'
        ? 'https://landing.docapp.co.in/api/admin/login'
        : 'https://landing.docapp.co.in/api/auth/login';

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        ...(role === 'admin' ? {} : { role }),
      }),
    });

    const data = await res.json();

    if (
      !res.ok ||
      (role === 'admin'
        ? data?.message !== 'Login successful'
        : data?.message !== 'Login Success')
    ) {
      throw new Error(data?.message || 'Login failed');
    }

    // ✅ SAVE TOKEN (VERY IMPORTANT)
    await AsyncStorage.setItem('token', data.token);

    setIsLoggedIn(true);
    setAccessToken(data.token);

    try {
      await fetchAndStoreUserData(data.token);
      Alert.alert('Success', 'called the user api');
    } catch (err) {
      console.log('Failed to fetch user profile after login:', err);
    }

    navigation.reset({
      index: 0,
      routes: [
        {
          name:
            role === 'doctor'
              ? 'DoctorNavigator'
              : role === 'admin'
              ? 'AdminHome'
              : role === 'hospital_organisation'
              ? 'HospitalAdmin'
              : 'TabsLayout',
        },
      ],
    });
  } catch (err: any) {
    console.log('LOGIN ERROR:', err);
    Alert.alert('Login Failed', err.message || 'Something went wrong');
  }
};


  const handleRegister = async () => {
    if (!username || !email || !password || !phoneNumber) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    try {
      const res = await fetch('https://landing.docapp.co.in/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          phone_number: phoneNumber,
          role,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Registration failed');
      }

      Alert.alert('Success', 'Registration successful! You can now log in.', [{ text: 'OK' }]);
      setIsLoginMode(true);
      setUsername('');
      setPhoneNumber('');
      setEmail('');
      setPassword('');
    } catch (err: any) {
      Alert.alert('Registration Failed', err.message || 'Something went wrong');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address first.');
      return;
    }

    try {
      const res = await fetch('https://landing.docapp.co.in/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Failed to send reset email');
      }

      const resetUrl = `https://landing.docapp.co.in${data.paswordChangeUrl}`;

      Alert.alert(
        'Check Your Email',
        'A password reset link has been sent to your email.',
        [
          { text: 'OK' },

        ]
      );
    } catch (err: any) {
      Alert.alert('Failed', err.message || 'Unable to send reset email. Try again.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {isLoginMode ? 'Welcomes to DocApp' : 'Create an Account'}
      </Text>

      {!isLoginMode && (
        <>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </>
      )}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Forgot Password Link */}
      {isLoginMode && (
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[styles.roleButton, role === 'general_user' && styles.selectedRole]}
          onPress={() => setRole('general_user')}
        >
          <Text style={[styles.roleText, role === 'general_user' && styles.selectedRoleText]}>
            Patient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'doctor' && styles.selectedRole]}
          onPress={() => setRole('doctor')}
        >
          <Text style={[styles.roleText, role === 'doctor' && styles.selectedRoleText]}>
            Doctor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'admin' && styles.selectedRole]}
          onPress={() => setRole('admin')}
        >
          <Text style={[styles.roleText, role === 'admin' && styles.selectedRoleText]}>
            Admin
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, role === 'hospital_organisation' && styles.selectedRole]}
          onPress={() => setRole('hospital_organisation')}
        >
          <Text style={[styles.roleText, role === 'hospital_organisation' && styles.selectedRoleText]}>
            Hospital
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={isLoginMode ? handleLogin : handleRegister}
      >
        <Text style={styles.buttonText}>
          {isLoginMode ? 'Login' : 'Register'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => {
          setIsLoginMode(!isLoginMode);
          // Clear password on mode switch for security
          setPassword('');
        }}
      >
        <Text style={styles.switchText}>
          {isLoginMode ? "Don't have an account? Register" : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e6f4ea',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#2e7d32',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 48,
    borderColor: '#81c784',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#81c784',
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  selectedRole: {
    backgroundColor: '#388e3c',
    borderColor: '#388e3c',
  },
  roleText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  selectedRoleText: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#388e3c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 14,
  },
});