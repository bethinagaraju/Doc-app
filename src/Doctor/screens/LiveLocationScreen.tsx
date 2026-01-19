// import React from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import tw from 'twrnc';
// import DoctorHeader from '../components/DoctorHeader';

// const LiveLocationScreen = () => {
//   return (
//     <SafeAreaView style={tw`flex-1 bg-green-50`}>
//       <StatusBar backgroundColor="#059669" barStyle="light-content" />
//       <DoctorHeader title="LIVE LOCATION" />

//       <View style={tw`flex-1 justify-center items-center p-4`}>
//         <Text style={tw`text-3xl font-bold text-green-700`}>LIVE LOCATION</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LiveLocationScreen;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  PermissionsAndroid,
  Platform,
  Alert,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import tw from 'twrnc';
import Geolocation from 'react-native-geolocation-service';
import DoctorHeader from '../components/DoctorHeader';

// Replace this with your actual backend base URL
const BASE_URL = 'https://your-api-domain.com';

const LiveLocationScreen = () => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // 1. Request Permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getLocation(); // iOS permissions are handled by the library/info.plist
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location to update address.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getLocation();
        } else {
          Alert.alert('Permission Denied', 'Location permission is required.');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // 2. Get Current Location
  const getLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        
        // Automatically send to API once location is fetched
        updateLocationAPI(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
        setLoading(false);
        Alert.alert('Error', 'Failed to get location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // 3. Send to API
  const updateLocationAPI = async (lat, long) => {
    try {
      const response = await fetch(`${BASE_URL}/api/address/update-location`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add 'Authorization': 'Bearer YOUR_TOKEN' if needed
        },
        body: JSON.stringify({
          latitude: lat.toString(),
          longitude: long.toString(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Location updated successfully!');
      } else {
        Alert.alert('Error', result.message || 'Failed to update location.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Network request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-green-50`}>
      <StatusBar backgroundColor="#059669" barStyle="light-content" />
      <DoctorHeader title="LIVE LOCATION" />

      <View style={tw`flex-1 justify-center items-center p-4`}>
        {loading ? (
          <View style={tw`items-center`}>
            <ActivityIndicator size="large" color="#059669" />
            <Text style={tw`mt-2 text-gray-600`}>Updating Location...</Text>
          </View>
        ) : (
          <View style={tw`items-center w-full`}>
            <Text style={tw`text-3xl font-bold text-green-700 mb-6`}>
              LIVE LOCATION
            </Text>
            
            {location && (
              <View style={tw`bg-white p-4 rounded-lg shadow-sm w-full mb-6`}>
                <Text style={tw`text-gray-600 text-center`}>
                  Latitude: {location.latitude}
                </Text>
                <Text style={tw`text-gray-600 text-center`}>
                  Longitude: {location.longitude}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={tw`bg-green-600 px-6 py-3 rounded-full shadow-md`}
              onPress={requestLocationPermission}
            >
              <Text style={tw`text-white font-bold`}>Refresh Location</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LiveLocationScreen;