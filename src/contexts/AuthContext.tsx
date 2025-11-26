import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  hasSeenIntro: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  completeIntro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === '1234') {
      setIsAuthenticated(true);
      setHasSeenIntro(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasSeenIntro(false);
  };

  const completeIntro = () => {
    setHasSeenIntro(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, hasSeenIntro, login, logout, completeIntro }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
