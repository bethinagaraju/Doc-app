// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   SafeAreaView,
//   StatusBar,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import tw from 'twrnc';
// import { ArrowLeft, UserPlus, Mail, Phone, MapPin, Stethoscope, GraduationCap } from 'lucide-react-native';

// type RootStackParamList = {
//   DoctorManagement: undefined;
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const AddDoctorScreen = () => {
//   const navigation = useNavigation<NavigationProp>();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     specialization: '',
//     experience: '',
//     qualification: '',
//     address: '',
//     licenseNumber: '',
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = () => {
//     // Basic validation
//     if (!formData.name || !formData.email || !formData.phone || !formData.specialization) {
//       Alert.alert('Error', 'Please fill in all required fields');
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert('Error', 'Please enter a valid email address');
//       return;
//     }

//     // Phone validation (basic)
//     const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       Alert.alert('Error', 'Please enter a valid phone number');
//       return;
//     }

//     // For now, just show success message with static data
//     Alert.alert(
//       'Success',
//       'Doctor registration submitted successfully!\n\n' +
//       `Name: ${formData.name}\n` +
//       `Email: ${formData.email}\n` +
//       `Phone: ${formData.phone}\n` +
//       `Specialization: ${formData.specialization}\n` +
//       `Experience: ${formData.experience || 'Not specified'}\n` +
//       `Qualification: ${formData.qualification || 'Not specified'}\n` +
//       `License: ${formData.licenseNumber || 'Not specified'}`,
//       [
//         { text: 'OK', onPress: () => navigation.goBack() }
//       ]
//     );
//   };

//   const specializations = [
//     'Cardiology',
//     'Neurology',
//     'Pediatrics',
//     'Orthopedics',
//     'Dermatology',
//     'Psychiatry',
//     'Gynecology',
//     'Ophthalmology',
//     'Dentistry',
//     'General Medicine'
//   ];

//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="#059669" barStyle="light-content" />

//       {/* Header */}
//       <View style={tw`bg-green-600 p-4 flex-row items-center shadow-md`}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
//           <ArrowLeft size={24} color="white" />
//         </TouchableOpacity>
//         <View>
//           <Text style={tw`text-white text-xl font-bold`}>Add Doctor</Text>
//           <Text style={tw`text-green-100 text-sm`}>Register new staff member</Text>
//         </View>
//       </View>

//       <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
//         <View style={tw`p-6`}>

//           {/* Basic Information */}
//           <View style={tw`mb-6`}>
//             <Text style={tw`text-green-700 text-lg font-bold mb-4`}>Basic Information</Text>

//             {/* Name */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Full Name *</Text>
//               <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//                 <View style={tw`p-3`}>
//                   <UserPlus size={20} color="#16a34a" />
//                 </View>
//                 <TextInput
//                   style={tw`flex-1 p-3 text-green-800`}
//                   placeholder="Enter doctor's full name"
//                   value={formData.name}
//                   onChangeText={(value) => handleInputChange('name', value)}
//                 />
//               </View>
//             </View>

//             {/* Email */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Email Address *</Text>
//               <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//                 <View style={tw`p-3`}>
//                   <Mail size={20} color="#16a34a" />
//                 </View>
//                 <TextInput
//                   style={tw`flex-1 p-3 text-green-800`}
//                   placeholder="doctor@example.com"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   value={formData.email}
//                   onChangeText={(value) => handleInputChange('email', value)}
//                 />
//               </View>
//             </View>

//             {/* Phone */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Phone Number *</Text>
//               <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//                 <View style={tw`p-3`}>
//                   <Phone size={20} color="#16a34a" />
//                 </View>
//                 <TextInput
//                   style={tw`flex-1 p-3 text-green-800`}
//                   placeholder="+91 9876543210"
//                   keyboardType="phone-pad"
//                   value={formData.phone}
//                   onChangeText={(value) => handleInputChange('phone', value)}
//                 />
//               </View>
//             </View>
//           </View>

//           {/* Professional Information */}
//           <View style={tw`mb-6`}>
//             <Text style={tw`text-green-700 text-lg font-bold mb-4`}>Professional Information</Text>

//             {/* Specialization */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Specialization *</Text>
//               <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//                 <View style={tw`p-3`}>
//                   <Stethoscope size={20} color="#16a34a" />
//                 </View>
//                 <TextInput
//                   style={tw`flex-1 p-3 text-green-800`}
//                   placeholder="Select specialization"
//                   value={formData.specialization}
//                   onChangeText={(value) => handleInputChange('specialization', value)}
//                 />
//               </View>
//               <Text style={tw`text-green-600 text-xs mt-1`}>
//                 e.g., Cardiology, Neurology, Pediatrics, etc.
//               </Text>
//             </View>

//             {/* Experience */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Years of Experience</Text>
//               <TextInput
//                 style={tw`bg-white p-3 rounded-lg border border-green-200 text-green-800`}
//                 placeholder="e.g., 5 years"
//                 keyboardType="numeric"
//                 value={formData.experience}
//                 onChangeText={(value) => handleInputChange('experience', value)}
//               />
//             </View>

//             {/* Qualification */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Qualification</Text>
//               <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//                 <View style={tw`p-3`}>
//                   <GraduationCap size={20} color="#16a34a" />
//                 </View>
//                 <TextInput
//                   style={tw`flex-1 p-3 text-green-800`}
//                   placeholder="MBBS, MD, etc."
//                   value={formData.qualification}
//                   onChangeText={(value) => handleInputChange('qualification', value)}
//                 />
//               </View>
//             </View>

//             {/* License Number */}
//             <View style={tw`mb-4`}>
//               <Text style={tw`text-green-700 font-medium mb-2`}>Medical License Number</Text>
//               <TextInput
//                 style={tw`bg-white p-3 rounded-lg border border-green-200 text-green-800`}
//                 placeholder="License number"
//                 value={formData.licenseNumber}
//                 onChangeText={(value) => handleInputChange('licenseNumber', value)}
//               />
//             </View>
//           </View>

//           {/* Address */}
//           <View style={tw`mb-8`}>
//             <Text style={tw`text-green-700 text-lg font-bold mb-4`}>Address Information</Text>
//             <View style={tw`flex-row items-center bg-white rounded-lg border border-green-200`}>
//               <View style={tw`p-3`}>
//                 <MapPin size={20} color="#16a34a" />
//               </View>
//               <TextInput
//                 style={tw`flex-1 p-3 text-green-800`}
//                 placeholder="Clinic/Hospital address"
//                 multiline
//                 numberOfLines={3}
//                 value={formData.address}
//                 onChangeText={(value) => handleInputChange('address', value)}
//               />
//             </View>
//           </View>

//           {/* Submit Button */}
//           <TouchableOpacity
//             style={tw`bg-green-600 rounded-lg p-4 items-center shadow-md`}
//             onPress={handleSubmit}
//           >
//             <Text style={tw`text-white text-lg font-bold`}>Register Doctor</Text>
//           </TouchableOpacity>

//           <Text style={tw`text-green-600 text-xs text-center mt-4`}>
//             * Required fields
//           </Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default AddDoctorScreen;


import React, { useState } from 'react';
import { useAccessToken } from '../screens/contexts/AccessTokenContext';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from 'twrnc';
import { ArrowLeft, Mail, Plus, Trash2 } from 'lucide-react-native';

type RootStackParamList = {
  DoctorManagement: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AddDoctorScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { accessToken } = useAccessToken();
  const [isLoading, setIsLoading] = useState(false);
  
  // State now handles an array of emails strings
  const [emails, setEmails] = useState<string[]>(['']);

  // Update a specific email field
  const handleEmailChange = (text: string, index: number) => {
    const newEmails = [...emails];
    newEmails[index] = text;
    setEmails(newEmails);
  };

  // Add a new empty email field
  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  // Remove an email field
  const removeEmailField = (index: number) => {
    const newEmails = emails.filter((_, i) => i !== index);
    setEmails(newEmails);
  };

  const handleSubmit = async () => {
    // 1. Filter out empty strings
    const validEmails = emails.filter(email => email.trim() !== '');

    if (validEmails.length === 0) {
      Alert.alert('Error', 'Please enter at least one email address.');
      return;
    }

    // 2. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validEmails.filter(email => !emailRegex.test(email));

    if (invalidEmails.length > 0) {
      Alert.alert('Error', `The following emails are invalid:\n${invalidEmails.join('\n')}`);
      return;
    }

    setIsLoading(true);

    try {
      // 3. Prepare Payload
      const apiPayload = {
        email: validEmails
      };
      console.log('Submitting doctor emails:', apiPayload);

      // 4. Call API
      const response = await fetch('https://landing.docapp.co.in/api/hospital/create-accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(apiPayload),
      });
      console.log('API response status:', response.status);

      const data = await response.json();
      console.log('API response data:', data);
      setIsLoading(false);

      if (response.ok) {
        // 5. Handle Detailed Response
        const createdCount = data.createdAccounts?.length || 0;
        const refusedCount = data.refusedAccounts?.length || 0;

        let message = '';
        
        if (createdCount > 0) {
          message += `✅ Successfully created ${createdCount} account(s).\n`;
        }
        
        if (refusedCount > 0) {
          message += `⚠️ Refused ${refusedCount} account(s) (likely duplicates).`;
        }

        if (createdCount === 0 && refusedCount === 0) {
          message = data.message || 'Process completed.';
        }

        Alert.alert(
          'Registration Result',
          message,
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );

      } else {
        Alert.alert('Error', data.message || 'Failed to create accounts.');
      }

    } catch (error) {
      setIsLoading(false);
      console.error('AddDoctorScreen error:', error);
      Alert.alert('Error', 'Network request failed. Please check your connection.');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />

      {/* Header */}
      <View style={tw`bg-green-600 p-4 flex-row items-center shadow-md`}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`mr-4`}>
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={tw`text-white text-xl font-bold`}>Create Accounts</Text>
          <Text style={tw`text-green-100 text-sm`}>Add doctors via email</Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`p-6`}>
          
          <Text style={tw`text-green-800 text-base mb-4`}>
            Enter the email addresses of the doctors you wish to register. Accounts will be created instantly.
          </Text>

          {/* Dynamic Email Fields */}
          {emails.map((email, index) => (
            <View key={index} style={tw`mb-3 flex-row items-center`}>
              <View style={tw`flex-1 flex-row items-center bg-white rounded-lg border border-green-200 overflow-hidden`}>
                <View style={tw`p-3 bg-green-50`}>
                  <Mail size={20} color="#16a34a" />
                </View>
                <TextInput
                  style={tw`flex-1 p-3 text-green-800`}
                  placeholder={`Doctor Email #${index + 1}`}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => handleEmailChange(text, index)}
                />
              </View>
              
              {/* Show delete button if there is more than one field */}
              {emails.length > 1 && (
                <TouchableOpacity 
                  onPress={() => removeEmailField(index)}
                  style={tw`ml-2 p-3 bg-red-100 rounded-lg border border-red-200`}
                >
                  <Trash2 size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}

          {/* Add Another Button */}
          <TouchableOpacity
            style={tw`flex-row items-center justify-center p-3 border border-green-600 border-dashed rounded-lg mb-8 mt-2`}
            onPress={addEmailField}
          >
            <Plus size={20} color="#16a34a" style={tw`mr-2`} />
            <Text style={tw`text-green-700 font-bold`}>Add Another Email</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity
            style={tw`bg-green-600 rounded-lg p-4 items-center shadow-md flex-row justify-center`}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <ActivityIndicator size="small" color="white" style={tw`mr-2`} />
                <Text style={tw`text-white text-lg font-bold`}>Creating Accounts...</Text>
              </>
            ) : (
              <Text style={tw`text-white text-lg font-bold`}>Create Accounts</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddDoctorScreen;