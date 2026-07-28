import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';

interface User {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  checkingLogin: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isLoggedIn: false,
  checkingLogin: true,
  setUser: () => { },
  setIsLoggedIn: () => { },
  logout: async () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  const getUserData = async () => {
    try {
      const response = await fetch('https://api.docapp.co.in/api/auth/get-user-data', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const result = await response.json();
      if (result?.userData) {
        setUser(result.userData);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login:', error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setCheckingLogin(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await CookieManager.clearAll(true);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, checkingLogin, setUser, setIsLoggedIn, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
