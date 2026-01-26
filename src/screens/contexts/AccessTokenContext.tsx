import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  clearAccessToken: () => void;
}

const AccessTokenContext = createContext<AccessTokenContextType | undefined>(undefined);

export const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);

  const setAccessToken = (token: string | null) => {
    setAccessTokenState(token);
  };

  const clearAccessToken = () => {
    setAccessTokenState(null);
  };

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken, clearAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

export const useAccessToken = (): AccessTokenContextType => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};