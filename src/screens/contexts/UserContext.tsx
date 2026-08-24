

import React, { createContext, useContext, useEffect, useState } from 'react';
import CookieManager from '@react-native-cookies/cookies';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccessToken } from './AccessTokenContext';

interface User {
  id: number;
  email: string;
  role: string;
  username?: string;
  phone_number?: string;
  generalUser?: {
    id: number;
    date_of_birth: string;
    gender: string;
    profile_picture: string;
    createdAt: string;
    updatedAt: string;
  };

  doctorProfile?: {
    id: number;
    kyc_status: string;
    rzp_account_id?: string | null;
  };
}

interface UserContextType {
  isLoggedIn: boolean;
  checkingLogin: boolean;
  user: User | null;
  consultationMode: 'online' | 'offline';
  setIsLoggedIn: (val: boolean) => void;
  setUser: (user: User | null) => void; // This line was added to fix the error
  setConsultationMode: (mode: 'online' | 'offline') => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [consultationMode, setConsultationMode] = useState<'online' | 'offline'>('offline');

  const { accessToken, setAccessToken, clearAccessToken } = useAccessToken();

  const fetchUserData = async (tokenToUse?: string | null) => {
    const activeToken = tokenToUse !== undefined ? tokenToUse : accessToken;
    if (!activeToken) {
      return;
    }

    try {
      const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${activeToken}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // send cookie
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const result = await response.json();
      setUser(result?.userData || null);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      setIsLoggedIn(false);
      // Clean up invalid/expired token
      try {
        await AsyncStorage.removeItem('token');
        clearAccessToken();
      } catch (err) {
        console.error('Error clearing token on fetch failure:', err);
      }
    } finally {
      setCheckingLogin(false);
    }
  };

  // 1. Initial check for token on startup
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setAccessToken(token);
          // fetchUserData will be triggered by the accessToken change
        } else {
          setCheckingLogin(false);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        setCheckingLogin(false);
      }
    };
    checkAuth();
  }, []);

  // 2. Fetch user data when accessToken becomes available
  useEffect(() => {
    if (accessToken) {
      fetchUserData(accessToken);
    }
  }, [accessToken]);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      clearAccessToken();
      await CookieManager.clearAll(true); // clears all cookies
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Logout Failed', 'Unable to logout. Please try again.');
    }
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, checkingLogin, user, consultationMode, setIsLoggedIn, setUser, setConsultationMode, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};