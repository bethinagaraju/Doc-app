// import React, { useEffect, useState } from 'react';
// import {  View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   ActivityIndicator,
//   Alert,
//   StatusBar,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeft, Camera } from 'lucide-react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import tw from 'twrnc';
// import { useNavigation } from '@react-navigation/native';
// import { launchImageLibrary } from 'react-native-image-picker';

// const EditProfileScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [gender, setGender] = useState('');
//   const [dob, setDob] = useState('');
//   const [profileImage, setProfileImage] = useState(
//     'https://randomuser.me/api/portraits/lego/1.jpg'
//   );

//   // Load user data from AsyncStorage
//   useEffect(() => {
//     const loadUserData = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem('user');
//         if (storedUser) {
//           const user = JSON.parse(storedUser);
//           setName(user.name || '');
//           setEmail(user.email || '');
//           setPhone(user.phone || '');
//           setGender(user.gender || '');
//           setDob(user.date_of_birth || '');
//           if (user.profile_picture) setProfileImage(user.profile_picture);
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUserData();
//   }, []);

//   // Replace pickImage with a CLI-compatible placeholder
//   const pickImage = async () => {
//     Alert.alert('Not supported', 'Image picking is not available in this build.');
//   };

//   const handleSave = async () => {
//     const updatedUser = {
//       name,
//       email,
//       phone,
//       gender,
//       date_of_birth: dob,
//       profile_picture: profileImage,
//     };

//     try {
//       const stored = await AsyncStorage.getItem('user');
//       const user = stored ? JSON.parse(stored) : {};
//       const mergedUser = { ...user, ...updatedUser };

//       await AsyncStorage.setItem('user', JSON.stringify(mergedUser));
//       Alert.alert('Success', 'Profile updated successfully!');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update profile.');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#16a34a" />
//       </View>
//     );
//   }  return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar
//         backgroundColor="#16a34a"
//         barStyle="light-content"
//         translucent={true}
//       />
//       {/* Header with gradient background */}
//       <View style={tw`bg-green-600 px-4 py-3 shadow-lg`}>
//         <View style={tw`flex-row items-center justify-between`}>
//           <TouchableOpacity 
//             onPress={() => navigation.goBack()}
//             style={tw`p-2 -ml-2`}
//           >
//             <ArrowLeft size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={tw`text-lg font-bold text-white`}>Edit Profile</Text>
//           <View style={tw`w-10`} />
//         </View>
//       </View>      
//       <ScrollView 
//         contentContainerStyle={tw`px-4 pb-40`} 
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Profile Image */}
//         <View style={tw`items-center justify-center py-6 mt-2`}>
//           <TouchableOpacity 
//             style={tw`relative`} 
//             onPress={pickImage}
//             activeOpacity={0.9}
//           >
//             <Image
//               source={{ uri: profileImage }}
//               style={tw`w-28 h-28 rounded-full border-2 border-green-600 shadow-lg`}
//             />
//             <View style={tw`absolute bottom-0 right-0 bg-green-600 p-2 rounded-full border-2 border-green-50 shadow`}>
//               <Camera size={16} color="#fff" />
//             </View>
//           </TouchableOpacity>
//         </View>       
//          {/* Form */}
//         <View style={tw`bg-green-50 rounded-3xl p-5 shadow-sm border border-green-100`}>
//           {[
//             { label: 'Full Name', value: name, setValue: setName, placeholder: 'Enter full name', icon: 'user' },
//             { label: 'Email', value: email, setValue: setEmail, placeholder: 'Enter email', keyboardType: 'email-address' as const },
//             { label: 'Phone Number', value: phone, setValue: setPhone, placeholder: 'Enter phone number', keyboardType: 'phone-pad' as const },
//             { label: 'Gender', value: gender, setValue: setGender, placeholder: 'Enter gender' },
//             { label: 'Date of Birth', value: dob, setValue: setDob, placeholder: 'YYYY-MM-DD' },
//           ].map(({ label, value, setValue, placeholder, keyboardType }, index) => (
//             <View 
//               key={index} 
//               style={tw`mb-4 ${index !== 0 ? 'border-t border-green-100 pt-4' : ''}`}
//             >
//               <Text style={tw`mb-2 font-medium text-green-700 text-sm`}>{label}</Text>
//               <TextInput
//                 style={tw`h-12 rounded-xl bg-green-100 px-4 text-base border border-green-200 text-green-800`}
//                 value={value}
//                 onChangeText={setValue}
//                 placeholder={placeholder}
//                 placeholderTextColor="#9CA3AF"
//                 keyboardType={keyboardType as import('react-native').KeyboardTypeOptions}
//               />
//             </View>
//           ))}
//         </View>

//       </ScrollView>     
//       <View style={[
//         tw`absolute left-0 right-0 p-4 bg-green-50 border-t border-green-100 shadow-lg`,
//         { bottom: Platform.OS === 'ios' ? 80 : 60 } 
//       ]}>
//         <TouchableOpacity
//           style={tw`bg-[#202b6d] rounded-xl py-4 items-center shadow-sm`}
//           onPress={handleSave}
//           activeOpacity={0.8}
//         >
//           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default EditProfileScreen;







import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://randomuser.me/api/portraits/lego/1.jpg'
  );

  // Load user data from AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setName(user.name || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setGender(user.gender || '');
          setDob(user.date_of_birth || '');
          if (user.profile_picture) setProfileImage(user.profile_picture);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Replace pickImage with a CLI-compatible placeholder
  const pickImage = async () => {
    Alert.alert('Not supported', 'Image picking is not available in this build.');
  };

  const handleSave = async () => {
    const updatedUser = {
      name,
      email,
      phone,
      gender,
      date_of_birth: dob,
      profile_picture: profileImage,
    };

    try {
      const stored = await AsyncStorage.getItem('user');
      const user = stored ? JSON.parse(stored) : {};
      const mergedUser = { ...user, ...updatedUser };

      await AsyncStorage.setItem('user', JSON.stringify(mergedUser));
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#16a34a" />
      </View>
    );
  }

  // **FIX:** The 'return' statement below was moved to its own line
  // to prevent a common React Native rendering error.
  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar
        backgroundColor="#16a34a"
        barStyle="light-content"
        translucent={true}
      />
      {/* Header with gradient background */}
      <View style={tw`bg-green-600 px-4 py-3 shadow-lg`}>
        <View style={tw`flex-row items-center justify-between`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`p-2 -ml-2`}
          >
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={tw`text-lg font-bold text-white`}>Edit Profile</Text>
          <View style={tw`w-10`} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={tw`px-4 pb-40`}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={tw`items-center justify-center py-6 mt-2`}>
          <TouchableOpacity
            style={tw`relative`}
            onPress={pickImage}
            activeOpacity={0.9}
          >
            <Image
              source={{ uri: profileImage }}
              style={tw`w-28 h-28 rounded-full border-2 border-green-600 shadow-lg`}
            />
            <View style={tw`absolute bottom-0 right-0 bg-green-600 p-2 rounded-full border-2 border-green-50 shadow`}>
              <Camera size={16} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={tw`bg-green-50 rounded-3xl p-5 shadow-sm border border-green-100`}>
          {[
            { label: 'Full Name', value: name, setValue: setName, placeholder: 'Enter full name' },
            { label: 'Email', value: email, setValue: setEmail, placeholder: 'Enter email', keyboardType: 'email-address' },
            { label: 'Phone Number', value: phone, setValue: setPhone, placeholder: 'Enter phone number', keyboardType: 'phone-pad' },
            { label: 'Gender', value: gender, setValue: setGender, placeholder: 'Enter gender' },
            { label: 'Date of Birth', value: dob, setValue: setDob, placeholder: 'YYYY-MM-DD' },
          ].map(({ label, value, setValue, placeholder, keyboardType }, index) => (
            <View
              key={index}
              style={tw`mb-4 ${index !== 0 ? 'border-t border-green-100 pt-4' : ''}`}
            >
              <Text style={tw`mb-2 font-medium text-green-700 text-sm`}>{label}</Text>
              <TextInput
                style={tw`h-12 rounded-xl bg-green-100 px-4 text-base border border-green-200 text-green-800`}
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                keyboardType={keyboardType as import('react-native').KeyboardTypeOptions}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[
        tw`absolute left-0 right-0 p-4 bg-green-50 border-t border-green-100 shadow-lg`,
        { bottom: Platform.OS === 'ios' ? 80 : 60 }
      ]}>
        <TouchableOpacity
          style={tw`bg-[#202b6d] rounded-xl py-4 items-center shadow-sm`}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
