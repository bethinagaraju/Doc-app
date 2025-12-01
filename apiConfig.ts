const BASE_URL = 'http://3.108.233.123:5000';

const API_ENDPOINTS = {
  // Auth
  loginUser: `${BASE_URL}/api/auth/login/general_user`,
  registerUser: `${BASE_URL}/api/auth/register`,
  completeGeneralUserProfile: `${BASE_URL}/api/auth/profile/complete/general_user`,
  completeDoctorProfile: `${BASE_URL}/api/auth/profile/complete/doctor`,
  
  // Appointments
  createAppointment: `${BASE_URL}/api/appointment/create-appointment`,
  updateAppointment: `${BASE_URL}/api/appointment/update-appointment`,
  deleteAppointment: `${BASE_URL}/api/appointment/delete-appointment`,
  listAppointments: `${BASE_URL}/api/appointment/list-appointments`,
  scheduleCheckupAppointment: `${BASE_URL}/api/appointment/schedule-checkup-appointment`,
   
  // Future endpoint (incomplete)
  // rescheduleAppointment: `${BASE_URL}/api/appointment/reschedule-appointment`, 
};

export default {
  BASE_URL,
  API_ENDPOINTS,
};
