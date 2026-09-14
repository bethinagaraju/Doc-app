import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Alert, PermissionsAndroid, Platform } from 'react-native';
import { MapPin, Edit2 } from 'lucide-react-native';
import tw from 'twrnc';
import Geolocation from 'react-native-geolocation-service';
import { useAccessToken } from '../../screens/contexts/AccessTokenContext';
import { useNavigation } from '@react-navigation/native';

interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    pincode: string;
    active: boolean;
    latitude?: string | null;
    longitude?: string | null;
    country?: string;
    landmark?: string;
    house_no?: string;
    houseNo?: string;
}

interface ClinicInfoProps {
    clinicName?: string;
    location?: string;
    onEditPress?: () => void;
}

const ClinicInfo: React.FC<ClinicInfoProps> = ({
    clinicName = 'Central Medical Hub',
    location: propLocation = 'Building A, Room 302',
    onEditPress,
}) => {
    const { accessToken } = useAccessToken();
    const navigation = useNavigation<any>();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [updatingLocation, setUpdatingLocation] = useState(false);
    const [editForm, setEditForm] = useState({
        houseNo: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: ''
    });

    const handleUpdateLocation = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Permission',
                        message: 'App needs access to your location.',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    },
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Location permission is required to update your live location.');
                    return;
                }
            } else {
                Geolocation.requestAuthorization('whenInUse');
            }

            setUpdatingLocation(true);
            Geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const url = 'https://api.docapp.co.in/api/address/update-location';
                        const bodyData = {
                            latitude: position.coords.latitude.toString(),
                            longitude: position.coords.longitude.toString(),
                        };

                        console.log('--- Updating Live Location ---');
                        console.log('URL:', url);
                        console.log('RequestBody:', JSON.stringify(bodyData, null, 2));

                        const response = await fetch(url, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`,
                            },
                            body: JSON.stringify(bodyData),
                        });

                        console.log('Response Status:', response.status);
                        const data = await response.text();
                        console.log('Response Data:', data);

                        if (response.ok) {
                            Alert.alert('Success', 'Live location updated successfully! Users can now find you easily.');
                            fetchAddresses();
                        } else {
                            Alert.alert('Error', 'Failed to update live location on server.');
                        }
                    } catch (error) {
                        console.error('Error updating live location API:', error);
                        Alert.alert('Error', 'Network error while updating location.');
                    } finally {
                        setUpdatingLocation(false);
                    }
                },
                (error) => {
                    console.error('Geolocation Error:', error);
                    Alert.alert('Location Error', 'Unable to get your current location.');
                    setUpdatingLocation(false);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (error) {
            console.error('Permission request error:', error);
            setUpdatingLocation(false);
        }
    };

    const fetchAddresses = async () => {
        if (!accessToken) {
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('https://api.docapp.co.in/api/address/getAllAddress', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
            });
            const data = await response.json();

            console.log('--- getAllAddress Response ---');
            console.log(JSON.stringify(data, null, 2));

            if (response.ok && data.addresses) {
                setAddresses(data.addresses);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [accessToken]);

    const handleEditPress = () => {
        if (addresses.length > 0) {
            const addr = addresses[0];
            setEditForm({
                houseNo: addr.house_no || addr.houseNo || '',
                street: addr.street || '',
                landmark: addr.landmark || '',
                city: addr.city || '',
                state: addr.state || '',
                pincode: addr.pincode || '',
                country: addr.country || ''
            });
            setIsEditing(true);
        } else {
            Alert.alert("No Address", "No address found to update. Please add one in Personal Info first.");
        }
    };

    const handleSave = async () => {
        if (addresses.length === 0) return;

        try {
            setSaving(true);
            const payload = {
                addressId: addresses[0].id.toString(),
                country: editForm.country,
                state: editForm.state,
                city: editForm.city,
                pincode: editForm.pincode,
                street: editForm.street,
                landmark: editForm.landmark,
                houseNo: editForm.houseNo
            };

            const response = await fetch('https://api.docapp.co.in/api/address/updateAddress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Address updated successfully!');
                setIsEditing(false);
                fetchAddresses();
            } else {
                Alert.alert('Error', data.message || 'Failed to update address');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            Alert.alert('Error', 'Network error. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const displayLocation = addresses.length > 0
        ? [
            addresses[0].house_no || addresses[0].houseNo,
            addresses[0].street,
            addresses[0].landmark,
            addresses[0].city,
            addresses[0].state,
            addresses[0].country,
            addresses[0].pincode
        ].filter(Boolean).join(', ')
        : propLocation;

    return (
        /* Clinic Info Main Section Card */
        <View
            style={[
                tw`w-full bg-white rounded-2xl p-5 border border-[#C3C6D5]/20 flex-col items-start`,
                {
                    shadowColor: '#102A43',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 20,
                    elevation: 4,
                },
            ]}
        >
            {/* Header Container */}
            <View style={tw`w-full pb-[24px]`}>
                <Text
                    style={tw`text-[20px] font-semibold text-[#011D35] font-['Inter'] leading-[28px]`}
                >
                    Clinic Info
                </Text>
            </View>

            {/* Info Items Stack Container */}
            <View style={tw`w-full flex-col gap-[24px]`}>
                {isEditing ? (
                    <View style={tw`w-full flex-col gap-3`}>
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="House No."
                            value={editForm.houseNo}
                            onChangeText={(t) => setEditForm({ ...editForm, houseNo: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="Street"
                            value={editForm.street}
                            onChangeText={(t) => setEditForm({ ...editForm, street: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="Landmark"
                            value={editForm.landmark}
                            onChangeText={(t) => setEditForm({ ...editForm, landmark: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="City"
                            value={editForm.city}
                            onChangeText={(t) => setEditForm({ ...editForm, city: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="State"
                            value={editForm.state}
                            onChangeText={(t) => setEditForm({ ...editForm, state: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="Country"
                            value={editForm.country}
                            onChangeText={(t) => setEditForm({ ...editForm, country: t })}
                        />
                        <TextInput
                            style={tw`w-full border border-gray-300 rounded-md p-2 text-[14px]`}
                            placeholder="Pincode"
                            value={editForm.pincode}
                            onChangeText={(t) => setEditForm({ ...editForm, pincode: t })}
                        />
                        <View style={tw`flex-row gap-2 mt-2`}>
                            <TouchableOpacity
                                style={tw`flex-1 bg-gray-200 rounded-md p-3 items-center`}
                                onPress={() => setIsEditing(false)}
                            >
                                <Text style={tw`text-gray-700 font-semibold`}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={tw`flex-1 bg-[#124CB8] rounded-md p-3 items-center`}
                                onPress={handleSave}
                                disabled={saving}
                            >
                                {saving ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={tw`text-white font-semibold`}>Save</Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={tw`w-full flex-row items-start gap-[16px]`}>
                        {/* Location Icon Container */}
                        <View style={tw`w-[16px] pt-[2px] justify-start items-center`}>
                            <MapPin size={20} color="#124CB8" />
                        </View>

                        {/* Details */}
                        <View style={tw`flex-1 flex-col items-start`}>
                            {/* <Text
                                style={tw`text-[16px] font-semibold text-[#011D35] font-['Inter'] leading-[24px]`}
                                numberOfLines={1}
                            >
                                {clinicName}
                            </Text> */}

                            <Text
                                style={tw`text-[16px] font-normal text-[#434653] font-['Inter'] leading-[24px]`}
                            >
                                {loading ? <ActivityIndicator size="small" color="#124CB8" /> : displayLocation}
                            </Text>

                        </View>

                    </View>
                )}
            </View>

            {/* Action Button Container */}
            {!isEditing && (
                <View style={tw`w-full pt-[24px] gap-[12px]`}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleEditPress}
                        style={tw`w-full min-h-[44px] py-2 px-4 bg-[#DBE3F1] rounded-[16px] flex-row justify-center items-center gap-[8px]`}
                    >
                        <Edit2 size={15} color="#5D6571" />
                        <Text
                            style={tw`text-[14px] font-normal text-[#5D6571] font-['Inter'] leading-[20px] text-center flex-shrink`}
                            numberOfLines={2}
                        >
                            Edit Quick Info
                        </Text>
                    </TouchableOpacity>

                    {(() => {
                        const isLocationUpdated = addresses.length > 0 && addresses[0].latitude && addresses[0].longitude;
                        return (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleUpdateLocation}
                                disabled={updatingLocation}
                                style={[tw`w-full min-h-[44px] py-2 px-4 rounded-[16px] flex-row justify-center items-center gap-[8px]`, isLocationUpdated ? tw`bg-[#124CB8]` : tw`bg-[#DC2626]`]}
                            >
                                <MapPin size={15} color="#FFFFFF" />
                                <Text
                                    style={tw`text-[13px] font-normal text-[#FFFFFF] font-['Inter'] leading-[20px] text-center flex-shrink`}
                                    numberOfLines={2}
                                >
                                    {updatingLocation ? 'Updating...' : (isLocationUpdated ? 'Update Live Location' : 'Set Live Location (Required)')}
                                </Text>
                            </TouchableOpacity>
                        );
                    })()}
                </View>
            )}
        </View>
    );
};

export default ClinicInfo;