// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const AdminHomeScreen = () => {
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     // Implement logout logic here
//     navigation.reset({
//       index: 0,
//       routes: [{ name: 'Login' }],
//     });
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Admin Dashboard</Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>User Management</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Manage Users</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>View User Reports</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Doctor Management</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Manage Doctors</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => navigation.navigate('DoctorApprovals')}
//         >
//           <Text style={styles.buttonText}>Doctor Approvals</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Appointment Management</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>View All Appointments</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Appointment Analytics</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>System Settings</Text>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>App Configuration</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Notification Settings</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#2e7d32',
//     textAlign: 'center',
//     marginBottom: 30,
//     marginTop: 50,
//   },
//   section: {
//     marginBottom: 30,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#1b5e20',
//     marginBottom: 15,
//   },
//   button: {
//     backgroundColor: '#388e3c',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   logoutButton: {
//     backgroundColor: '#d32f2f',
//     paddingVertical: 14,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   logoutButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default AdminHomeScreen;










import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAccessToken } from './contexts/AccessTokenContext';

const AdminHomeScreen = () => {
  const navigation = useNavigation();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { accessToken } = useAccessToken();

  // Fetch stats API (send Bearer token when available)
  const fetchStats = async () => {
    try {
      const response = await fetch("https://landing.docapp.co.in/api/admin/stats", {
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      });
      const data = await response.json();

      if (data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken !== undefined) {
      fetchStats();
    }
  }, [accessToken]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      {/* ====== Stats Section ====== */}
      <View style={styles.statsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" />
        ) : (
          <>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats?.totalDoctors}</Text>
              <Text style={styles.statLabel}>Doctors</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats?.totalPatients}</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats?.totalHospitals}</Text>
              <Text style={styles.statLabel}>Hospitals</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats?.totalAppointments}</Text>
              <Text style={styles.statLabel}>Appointments</Text>
            </View>
          </>
        )}
      </View>

      {/* ===== Sections Below ===== */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Management</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View User Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Doctor Management</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Manage Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DoctorApprovals')}>
          <Text style={styles.buttonText}>Doctor Approvals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appointment Management</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Appointment Analytics</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Settings</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>App Configuration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Notification Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },

  // ===== Stats Styles =====
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  statBox: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },

  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
  },

  statLabel: {
    marginTop: 5,
    fontSize: 16,
    color: '#1b5e20',
  },

  // ===== Sections =====
  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#388e3c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },

  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  
});

export default AdminHomeScreen;
