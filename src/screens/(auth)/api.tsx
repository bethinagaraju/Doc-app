import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://api.docapp.co.in/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Retrieve token from AsyncStorage
  const token = await AsyncStorage.getItem('authToken');
  const cookieString = token ? `token=${token}` : '';

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (cookieString) {
    defaultHeaders['Cookie'] = cookieString;
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${errorText}`);
  }

  return response.json();
};