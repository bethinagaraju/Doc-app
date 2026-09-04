import React from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import PatientCard from './PatientCard';

interface AppointmentPatientInfoProps {
  appointment: any;
}

const AppointmentPatientInfo: React.FC<AppointmentPatientInfoProps> = ({ appointment }) => {
  const name = appointment.patient?.username || appointment.patientName || `User #${appointment.user_id}`;
  const id = `Patient ID: #${appointment.user_id || appointment.id}`;
  const avatar = appointment.patient?.generalUser?.profile_picture || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150';

  let age = 'N/A';
  const dob = appointment.patient?.generalUser?.date_of_birth;
  if (dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    if (!isNaN(calculatedAge)) {
      age = `${calculatedAge} yrs`;
    }
  }
  const gender = appointment.patient?.generalUser?.gender || 'N/A';
  const ageGenderStr = `${age} / ${gender}`;

  const calculateDuration = (startStr?: string, endStr?: string) => {
    if (!startStr || !endStr) return '';
    const startParts = startStr.split(':').map(Number);
    const endParts = endStr.split(':').map(Number);
    if (startParts.length >= 2 && endParts.length >= 2) {
      const startMinutes = startParts[0] * 60 + startParts[1];
      const endMinutes = endParts[0] * 60 + endParts[1];
      let diff = endMinutes - startMinutes;
      if (diff < 0) diff += 24 * 60; // handle midnight wrap if any
      if (diff >= 60) {
        const hrs = Math.floor(diff / 60);
        const mins = diff % 60;
        return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
      }
      return `${diff} mins`;
    }
    return '';
  };

  const durationFormatted = calculateDuration(appointment.appointment_start_time, appointment.appointment_end_time);

  const apptTimeStr = durationFormatted || 'N/A';

  return (
    <View style={tw`mb-4`}>
      <PatientCard
        patientName={name}
        patientId={id}
        avatarUrl={avatar}
        ageGender={ageGenderStr}
        appointmentIdDisplay={`#${appointment.id}`}
        appointmentTime={apptTimeStr}
        appointmentType={appointment.appointment_type || 'N/A'}
      />
    </View>
  );
};

export default AppointmentPatientInfo;
