// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
// import { Plus, Medal, Star, Brain, Heart, Activity, Stethoscope } from 'lucide-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { DoctorStackParamList } from '../types/navigation';
// import DoctorHeader from '../components/DoctorHeader';
// import tw from 'twrnc';

// type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

// interface Specialization {
//   title: string;
//   icon: React.ReactNode;
//   years: number;
//   expertise: string[];
// }

// const SpecializationsScreen = () => {
//   const navigation = useNavigation<DoctorNavigationProp>();
  
//   const specializations: Specialization[] = [
//     {
//       title: 'Cardiology',
//       icon: <Heart size={24} color="#16a34a" />,
//       years: 10,
//       expertise: ['Interventional Cardiology', 'Heart Failure Management'],
//     },
//     {
//       title: 'Internal Medicine',
//       icon: <Stethoscope size={24} color="#16a34a" />,
//       years: 12,
//       expertise: ['General Medicine', 'Preventive Care'],
//     },    {
//       title: 'Critical Care',
//       icon: <Activity size={24} color="#16a34a" />,
//       years: 8,
//       expertise: ['ICU Management', 'Emergency Medicine'],
//     },
//   ];

//   const certifications = [
//     'American Board of Cardiology',
//     'Fellowship in Interventional Cardiology',
//     'Advanced Cardiac Life Support (ACLS)',
//   ];

//   const handleSaveChanges = () => {
//     // Logic to save changes
//     Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{ 
//       text: 'OK',
//       onPress: () => navigation.goBack()
//     }]);
//   };
//   return (
//     <View style={tw`flex-1 bg-green-50`}>
//       <DoctorHeader title="Specializations" showSettings showNotifications />
//       <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
//         <TouchableOpacity 
//           style={tw`bg-emerald-500 p-2 rounded-full`} 
//           activeOpacity={0.85}
//           onPress={() => navigation.navigate('AddSpecialization')}
//         >
//           <Plus size={20} color="white" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
//         <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
//         <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

//         {specializations.map((spec, idx) => (
//           <View key={idx} style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
//             <View style={tw`flex-row items-center mb-3`}>
//               {spec.icon}
//               <View style={tw`ml-3 flex-1`}>
//                 <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
//                 <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
//               </View>              <TouchableOpacity 
//                 style={tw`bg-green-100 p-2 rounded-full`}
//                 onPress={() => Alert.alert('Primary Specialization', 'Mark this as your primary specialization?', [
//                   { text: 'Cancel', style: 'cancel' },
//                   { text: 'Set as Primary', style: 'default' }
//                 ])}
//               >
//                 <Star size={20} color="#1d9be3" />
//               </TouchableOpacity>
//             </View>
//             <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
//             {spec.expertise.map((exp, i) => (
//               <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
//             ))}
//           </View>
//         ))}

//         <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
//           <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
//           {certifications.map((cert, idx) => (
//             <View key={idx} style={tw`flex-row items-center mb-2`}>
//               <Medal size={16} color="#1d9be3" />
//               <Text style={tw`text-gray-600 ml-2`}>{cert}</Text>
//             </View>
//           ))}
//         </View>
        
//         <TouchableOpacity
//           style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
//           activeOpacity={0.85}
//           onPress={handleSaveChanges}
//         >
//           <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// export default SpecializationsScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Plus, Medal, Star, Heart, Stethoscope, Activity } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DoctorStackParamList } from '../types/navigation';
import DoctorHeader from '../components/DoctorHeader';
import tw from 'twrnc';

// --- TYPE DEFINITIONS ---
type DoctorNavigationProp = NativeStackNavigationProp<DoctorStackParamList>;

interface Specialization {
  id: string;
  title: string;
  icon: React.ReactNode;
  years: number;
  expertise: string[];
  isPrimary: boolean;
}

// --- MOCK INITIAL DATA (In a real app, this would come from an API) ---
const initialSpecializations: Specialization[] = [
  {
    id: 'spec_1',
    title: 'Cardiology',
    icon: <Heart size={24} color="#16a34a" />,
    years: 10,
    expertise: ['Interventional Cardiology', 'Heart Failure Management'],
    isPrimary: true,
  },
  {
    id: 'spec_2',
    title: 'Internal Medicine',
    icon: <Stethoscope size={24} color="#16a34a" />,
    years: 12,
    expertise: ['General Medicine', 'Preventive Care'],
    isPrimary: false,
  },
  {
    id: 'spec_3',
    title: 'Critical Care',
    icon: <Activity size={24} color="#16a34a" />,
    years: 8,
    expertise: ['ICU Management', 'Emergency Medicine'],
    isPrimary: false,
  },
];

const initialCertifications = [
  { id: 'cert_1', text: 'American Board of Cardiology' },
  { id: 'cert_2', text: 'Fellowship in Interventional Cardiology' },
  { id: 'cert_3', text: 'Advanced Cardiac Life Support (ACLS)' },
];


// --- REUSABLE CARD COMPONENTS ---

// Card for displaying a single specialization
const SpecializationCard = ({ spec, onSetPrimary }: { spec: Specialization; onSetPrimary: (id: string) => void; }) => (
  <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
    <View style={tw`flex-row items-center mb-3`}>
      {spec.icon}
      <View style={tw`ml-3 flex-1`}>
        <Text style={tw`text-green-700 font-bold text-lg`}>{spec.title}</Text>
        <Text style={tw`text-green-600 text-sm`}>{spec.years} Years Experience</Text>
      </View>
      <TouchableOpacity
        style={tw`bg-green-100 p-2 rounded-full`}
        onPress={() => onSetPrimary(spec.id)}
      >
        <Star size={20} color={spec.isPrimary ? '#f59e0b' : '#a3a3a3'} />
      </TouchableOpacity>
    </View>
    <Text style={tw`text-gray-600 font-medium mb-2`}>Areas of Expertise:</Text>
    {spec.expertise.map((exp, i) => (
      <Text key={i} style={tw`text-gray-500 text-sm mb-1`}>• {exp}</Text>
    ))}
  </View>
);

// Card for displaying certifications
const CertificationsCard = ({ certifications }: { certifications: {id: string, text: string}[] }) => (
  <View style={tw`bg-white rounded-2xl p-5 shadow-sm mb-5`}>
    <Text style={tw`text-lg font-bold text-[#202b6d] mb-3`}>Certifications</Text>
    {certifications.map((cert) => (
      <View key={cert.id} style={tw`flex-row items-center mb-2`}>
        <Medal size={16} color="#1d9be3" />
        <Text style={tw`text-gray-600 ml-2`}>{cert.text}</Text>
      </View>
    ))}
  </View>
);


// --- MAIN SCREEN COMPONENT ---

const SpecializationsScreen = () => {
  const navigation = useNavigation<DoctorNavigationProp>();
  
  // --- STATE MANAGEMENT ---
  const [specializations, setSpecializations] = useState<Specialization[]>(initialSpecializations);
  const [certifications, setCertifications] = useState(initialCertifications);

  // --- HANDLER FUNCTIONS ---
  const handleSetPrimary = (id: string) => {
    Alert.alert(
      'Primary Specialization',
      'Mark this as your primary specialization?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Set as Primary', 
          style: 'default',
          onPress: () => {
            const updatedSpecs = specializations.map(spec => ({
              ...spec,
              isPrimary: spec.id === id,
            }));
            setSpecializations(updatedSpecs);
          }
        }
      ]
    );
  };

  const handleSaveChanges = () => {
    // In a real app, this is where you would make an API call to your backend
    // to save the updated `specializations` and `certifications` state.
    // e.g., api.updateDoctorProfile({ specializations, certifications });

    Alert.alert('Changes Saved', 'Your specializations and certifications have been updated.', [{
      text: 'OK',
      onPress: () => navigation.goBack()
    }]);
  };
  
  return (
    <View style={tw`flex-1 bg-green-50`}>
      <DoctorHeader title="Specializations" showSettings showNotifications />
      
      <View style={tw`flex-row justify-end px-4 py-2 bg-white border-b border-green-100`}>
        <TouchableOpacity
          style={tw`bg-emerald-500 p-2 rounded-full`}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('AddSpecialization')}
        >
          <Plus size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={tw`p-5 pb-10`}>
        <Text style={tw`text-2xl font-bold text-green-700 mb-2 text-center`}>Your Expertise</Text>
        <Text style={tw`text-base text-green-600 mb-6 text-center`}>Manage your specializations and expertise areas</Text>

        {specializations.map((spec) => (
          <SpecializationCard 
            key={spec.id} 
            spec={spec} 
            onSetPrimary={handleSetPrimary} 
          />
        ))}

        <CertificationsCard certifications={certifications} />
        
        <TouchableOpacity
          style={tw`mt-6 bg-[#1d9be3] rounded-full px-6 py-3 items-center`}
          activeOpacity={0.85}
          onPress={handleSaveChanges}
        >
          <Text style={tw`text-white font-bold text-base`}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SpecializationsScreen;