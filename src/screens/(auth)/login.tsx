

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TextInputProps,
  GestureResponderEvent,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useUser } from '../contexts/UserContext';
import { useAccessToken } from '../contexts/AccessTokenContext';
import { useUserProfile } from '../../contexts/userProfileContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==========================================
// AppInput Component
// ==========================================

interface AppInputProps extends TextInputProps {
  leftIcon: string;
  secure?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  leftIcon,
  secure = false,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(secure);

  return (
    <View style={appInputStyles.container}>
      <Icon
        name={leftIcon}
        size={20}
        color="#8D95A5"
        style={appInputStyles.leftIcon}
      />

      <TextInput
        {...props}
        style={appInputStyles.input}
        placeholderTextColor="#A0A7B5"
        secureTextEntry={hidePassword}
      />

      {secure && (
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          activeOpacity={0.7}>
          <Icon
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color="#8D95A5"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const appInputStyles = StyleSheet.create({
  container: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1E293B',
    paddingVertical: 0,
  },
});

// ==========================================
// PrimaryButton Component
// ==========================================

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={primaryButtonStyles.button}
      activeOpacity={0.85}
      onPress={onPress}>
      <Text style={primaryButtonStyles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const primaryButtonStyles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 10,
    // backgroundColor: '#104FD4',
    backgroundColor: '#124CB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// ==========================================
// LoginScreen Main Component
// ==========================================

const LoginScreen = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'general_user' | 'doctor' | 'admin' | 'hospital_organisation'>('general_user');

  const { setIsLoggedIn } = useUser();
  const { setAccessToken } = useAccessToken();
  const { fetchAndStoreUserData } = useUserProfile();
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      const apiUrl =
        role === 'admin'
          ? 'https://api.docapp.co.in/api/admin/login'
          : 'https://api.docapp.co.in/api/auth/login';

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
        throw new Error(data?.error || data?.message || 'Login failed');
      }

      // ✅ SAVE TOKEN (VERY IMPORTANT)
      await AsyncStorage.setItem('token', data.token);

      setIsLoggedIn(true);
      setAccessToken(data.token);

      // try {
      //   await fetchAndStoreUserData(data.token);
      //   Alert.alert('Success', 'called the user api');
      // } catch (err) {
      //   console.log('Failed to fetch user profile after login:', err);
      // }

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
      const res = await fetch('https://api.docapp.co.in/api/auth/register', {
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
        throw new Error(data?.error || data?.message || 'Registration failed');
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
      const res = await fetch('https://api.docapp.co.in/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || data?.error || 'Failed to send reset email');
      }

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
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#E2E8F0' }} />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#E2E8F0" barStyle="dark-content" translucent={false} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Logo */}
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <Text style={styles.title}>DocApp</Text>

            <Text style={styles.subtitle}>Healthcare made simple.</Text>

            {/* Login Card */}
            <View style={styles.card}>
              {!isLoginMode && (
                <>
                  {/* Username */}
                  <Text style={styles.label}>Username</Text>
                  <AppInput
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    leftIcon="person-outline"
                  />
                  <View style={{ height: 16 }} />

                  {/* Phone Number */}
                  <Text style={styles.label}>Phone Number</Text>
                  <AppInput
                    placeholder="Enter your phone numbers"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    leftIcon="call-outline"
                    keyboardType="phone-pad"
                  />
                  <View style={{ height: 16 }} />
                </>
              )}

              {/* Email */}
              <Text style={styles.label}>Email</Text>
              <AppInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                leftIcon="mail-outline"
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <View style={{ height: 16 }} />

              {/* Password */}
              <View style={styles.passwordRow}>
                <Text style={[styles.label, { marginBottom: 0 }]}>Password</Text>

                {isLoginMode && (
                  <TouchableOpacity activeOpacity={0.7} onPress={handleForgotPassword}>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                  </TouchableOpacity>
                )}
              </View>

              <AppInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                leftIcon="lock-closed-outline"
                secure
              />

              {/* Select Role */}
              <Text style={[styles.label, { marginTop: 18, marginBottom: 8 }]}>Select Role</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[styles.roleButton, role === 'general_user' && styles.selectedRoleButton]}
                  activeOpacity={0.8}
                  onPress={() => setRole('general_user')}
                >
                  <Text style={[styles.roleText, role === 'general_user' && styles.selectedRoleText]}>
                    Patient
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleButton, role === 'doctor' && styles.selectedRoleButton]}
                  activeOpacity={0.8}
                  onPress={() => setRole('doctor')}
                >
                  <Text style={[styles.roleText, role === 'doctor' && styles.selectedRoleText]}>
                    Doctor
                  </Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                  style={[styles.roleButton, role === 'admin' && styles.selectedRoleButton]}
                  activeOpacity={0.8}
                  onPress={() => setRole('admin')}
                >
                  <Text style={[styles.roleText, role === 'admin' && styles.selectedRoleText]}>
                    Admin
                  </Text>
                </TouchableOpacity> */}

                {/* <TouchableOpacity
                  style={[styles.roleButton, role === 'hospital_organisation' && styles.selectedRoleButton]}
                  activeOpacity={0.8}
                  onPress={() => setRole('hospital_organisation')}
                >
                  <Text style={[styles.roleText, role === 'hospital_organisation' && styles.selectedRoleText]}>
                    Hospital
                  </Text>
                </TouchableOpacity> */}
              </View>

              <View style={{ height: 20 }} />

              <PrimaryButton
                title={isLoginMode ? 'Login' : 'Register'}
                onPress={isLoginMode ? handleLogin : handleRegister}
              />

              {/* {isLoginMode && (
                <>
               
                  <View style={styles.dividerLine} />

                 
                  <Text style={styles.orText}>Or sign in with</Text>

                 
                  <TouchableOpacity style={styles.bioButton} activeOpacity={0.8}>
                    <Icon name="finger-print" size={32} color="#124CB8" />
                  </TouchableOpacity>
                </>
              )} */}

            </View>

            {/* Bottom Switch */}
            <View style={styles.bottomContainer}>
              <Text style={styles.bottomText}>
                {isLoginMode ? "Don't have an account?" : "Already have an account?"}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setIsLoginMode(!isLoginMode);
                  setPassword('');
                }}
              >
                <Text style={styles.createText}>
                  {isLoginMode ? ' Create an Account' : ' Login'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerInline}>
              <Icon name="shield-checkmark-outline" size={14} color="#94A3B8" />
              <Text style={styles.footerText}>HIPAA Secure Connection</Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  title: {
    marginTop: 16,
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 8,
    color: '#64748B',
    fontSize: 15,
    marginBottom: 32,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    paddingTop: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
  },
  label: {
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    fontSize: 13,
  },
  passwordRow: {
    marginTop: 18,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgot: {
    color: '#124CB8',
    fontWeight: '600',
    fontSize: 13,
  },
  roleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  roleButton: {
    width: '48%',
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedRoleButton: {
    backgroundColor: '#124CB8',
    borderColor: '#124CB8',
  },
  roleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  selectedRoleText: {
    color: '#FFFFFF',
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: '100%',
    marginTop: 24,
    marginBottom: 20,
  },
  orText: {
    textAlign: 'center',
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  bioButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EAF2FF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  bottomText: {
    fontSize: 14,
    color: '#475569',
  },
  createText: {
    fontSize: 14,
    color: '#124CB8',
    fontWeight: '600',
  },
  footerInline: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  footerText: {
    marginLeft: 6,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
  },
});