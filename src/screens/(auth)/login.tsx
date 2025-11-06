// import React, { useState } from 'react';
// import {
//   View,
//   TextInput,
//   Text,
//   Alert,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import { useUser } from '../contexts/UserContext';
// import { useNavigation } from '@react-navigation/native';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState<'general_user' | 'doctor'>('general_user');

//   const { setIsLoggedIn } = useUser();
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('https://landing.docapp.co.in/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',
//         body: JSON.stringify({
//           email,
//           password,
//           role,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || data?.message !== 'Login Success') {
//         throw new Error(data?.message || 'Login failed');
//       }

//       setIsLoggedIn(true);

//       // Navigate based on role
//       navigation.reset({
//         index: 0,
//         routes: [
//           { name: role === 'doctor' ? 'DoctorNavigator' : 'TabsLayout' },
//         ],
//       });
//     } catch (err: any) {
//       Alert.alert('Login Failed', err.message || 'Something went wrong');
//     }
//   };

// //   const handleLogin = async () => {
// //   try {
// //     // Simulate a network delay (optional)
// //     await new Promise((resolve) => setTimeout(resolve, 500));

// //     // Mock successful login without API call
// //     setIsLoggedIn(true);

// //     // Navigate based on role
// //     navigation.reset({
// //       index: 0,
// //       routes: [
// //         { name: role === 'doctor' ? 'DoctorNavigator' : 'TabsLayout' },
// //       ],
// //     });
// //   } catch (err: any) {
// //     Alert.alert('Login Failed', err.message || 'Something went wrong');
// //   }
// // };


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome to DocApp</Text>

//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter your password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />

//       <Text style={styles.label}>Select Role</Text>
//       <View style={styles.roleContainer}>
//         <TouchableOpacity
//           style={[
//             styles.roleButton,
//             role === 'general_user' && styles.selectedRole,
//           ]}
//           onPress={() => setRole('general_user')}
//         >
//           <Text
//             style={[
//               styles.roleText,
//               role === 'general_user' && styles.selectedRoleText,
//             ]}
//           >
//             General User
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.roleButton,
//             role === 'doctor' && styles.selectedRole,
//           ]}
//           onPress={() => setRole('doctor')}
//         >
//           <Text
//             style={[
//               styles.roleText,
//               role === 'doctor' && styles.selectedRoleText,
//             ]}
//           >
//             Doctor
//           </Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Logins</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Login;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6f4ea',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     color: '#2e7d32',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 40,
//   },
//   label: {
//     fontSize: 16,
//     color: '#1b5e20',
//     marginBottom: 6,
//   },
//   input: {
//     height: 48,
//     borderColor: '#81c784',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 20,
//     paddingHorizontal: 12,
//     backgroundColor: '#ffffff',
//   },
//   roleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   roleButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#ffffff',
//     borderWidth: 1,
//     borderColor: '#81c784',
//     borderRadius: 8,
//   },
//   selectedRole: {
//     backgroundColor: '#388e3c',
//     borderColor: '#388e3c',
//   },
//   roleText: {
//     color: '#2e7d32',
//     fontWeight: '600',
//   },
//   selectedRoleText: {
//     color: '#ffffff',
//   },
//   button: {
//     backgroundColor: '#388e3c',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });




import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useUser } from '../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  // State for both login and registration
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<'general_user' | 'doctor'>('general_user');

  const { setIsLoggedIn } = useUser();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
        Alert.alert('Validation Error', 'Please enter both email and password.');
        return;
    }
    try {
      const res = await fetch('https://landing.docapp.co.in/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      let data: any;
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // If not JSON, treat as error (e.g., HTML error page)
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      if (!res.ok || data?.message !== 'Login Success') {
        throw new Error(data?.message || 'Login failed');
      }

      setIsLoggedIn(true);

      // Navigate based on role after successful login
      navigation.reset({
        index: 0,
        routes: [
          { name: role === 'doctor' ? 'DoctorNavigator' : 'TabsLayout' },
        ],
      });
    } catch (err: any) {
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

        // On successful registration, prompt the user to log in
        Alert.alert(
            'Registration Successful',
            'You can now log in with your credentials.'
        );
        setIsLoginMode(true); // Switch back to login view
        // Clear fields after registration
        setUsername('');
        setPhoneNumber('');

    } catch (err: any) {
        Alert.alert('Registration Failed', err.message || 'Something went wrong');
    }
  };


  return (
    <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {isLoginMode ? 'Welcome to DocApp' : 'Create an Account'}
      </Text>

      {/* Conditional rendering for Registration fields */}
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

      <Text style={styles.label}>Select Role</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'general_user' && styles.selectedRole,
          ]}
          onPress={() => setRole('general_user')}
        >
          <Text
            style={[
              styles.roleText,
              role === 'general_user' && styles.selectedRoleText,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleButton,
            role === 'doctor' && styles.selectedRole,
          ]}
          onPress={() => setRole('doctor')}
        >
          <Text
            style={[
              styles.roleText,
              role === 'doctor' && styles.selectedRoleText,
            ]}
          >
            Doctor
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
        onPress={() => setIsLoginMode(!isLoginMode)}
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
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#81c784',
    borderRadius: 8,
    alignItems: 'center',
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
