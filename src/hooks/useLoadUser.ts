import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../screens/contexts/UserContext';

type DecodedToken = {
  id: string;
  email: string;
  name?: string;
  role?: string;
  phone_number?: string;
  exp?: number;
  iat?: number;
};

export default function useLoadUser() {
  const { setUser } = useUser();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) return;

        const decoded = jwtDecode<DecodedToken>(token);

        if (!decoded || !decoded.id || !decoded.email) {
          console.warn('Invalid token format');
          return;
        }

        setUser({
          id: parseInt(decoded.id, 10), // Convert to number
          email: decoded.email,
          role: decoded.role || 'general_user', // Default role if not in token
          username: decoded.name || '', // Map name to username
          phone_number: decoded.phone_number || '',
        });
      } catch (error) {
        console.error('Error loading user from token:', error);
      }
    };

    loadUser();
  }, []);
}
