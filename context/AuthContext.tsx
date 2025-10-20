
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import type { User } from '../types';
import { apiService } from '../services/apiService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyUser = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const currentUser = await apiService.verifyToken(token);
        setUser(currentUser);
      } catch (error) {
        console.error('Token verification failed', error);
        localStorage.removeItem('jwt_token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const login = async (email: string, password: string) => {
    const { token, user: loggedInUser } = await apiService.login(email, password);
    localStorage.setItem('jwt_token', token);
    setUser(loggedInUser);
  };
  
  const register = async (email: string, password: string) => {
    await apiService.register(email, password);
    // Optionally log in the user directly after registration
    await login(email, password);
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
