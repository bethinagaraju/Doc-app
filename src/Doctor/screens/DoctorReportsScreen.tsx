import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import DoctorHeader from '../components/DoctorHeader';
import { BarChart2, FileText, Download } from 'lucide-react-native';
import tw from 'twrnc';
// import VideoCall from '@/screens/(tabs)/VideoCall';
import VideoCall from '../../screens/(tabs)/VideoCall';
const reports = [
  {
    id: 1,
    title: 'Monthly Earnings Report',
    description: 'Summary of your earnings for May 2025',
    date: 'May 31, 2025',
    icon: <BarChart2 size={28} color="#16a34a" />,
  },
  {
    id: 2,
    title: 'Patient Consultation Report',
    description: 'Detailed report of all consultations in May',
    date: 'May 31, 2025',
    icon: <FileText size={28} color="#16a34a" />,
  },
  {
    id: 3,
    title: 'Prescription Summary',
    description: 'Overview of prescriptions issued',
    date: 'May 31, 2025',
    icon: <FileText size={28} color="#16a34a" />,
  },
];

const DoctorReportsScreen = () => (
  <View style={tw`flex-1 bg-green-50 mt-12`}>
    {/* <DoctorHeader title="Reports" showSettings showNotifications />
    <ScrollView contentContainerStyle={tw`p-5 pb-10`}>  
      <Text style={tw`text-2xl font-bold text-green-700 mb-4 text-center`}>Your Reports</Text>
      <Text style={tw`text-base text-green-600 mb-6 text-center`}>Download and review your professional reports and summaries.</Text>
      {reports.map((report) => (
        <View key={report.id} style={tw`bg-white rounded-2xl p-5 mb-5 shadow-sm flex-row items-center`}> 
          <View style={tw`mr-4`}>{report.icon}</View>
          <View style={tw`flex-1`}> 
            <Text style={tw`text-green-700 font-semibold text-lg`}>{report.title}</Text>
            <Text style={tw`text-green-600 text-sm mt-1`}>{report.description}</Text>
            <Text style={tw`text-green-400 text-xs mt-1`}>{report.date}</Text>
          </View>
          <TouchableOpacity style={tw`ml-2 bg-emerald-500 rounded-full p-2`} activeOpacity={0.7}>
            <Download size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
      <View style={tw`mt-8 items-center`}>
        <Text style={tw`text-green-400 text-sm`}>More report types coming soon.</Text>
      </View>
    </ScrollView> */}


          <VideoCall
                      embeddedRole="doctor" 
                      embeddedApptId="72" 
                   />
  </View>
);

export default DoctorReportsScreen;
