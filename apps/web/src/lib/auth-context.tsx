'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, AuthState } from '@tenshoku/types';
import { authApi, userApi } from './api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      userApi.getMe().then((res) => {
        if (res.success && res.data) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('token');
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const res = await authApi.login({ email, password });
    if (res.success && res.data) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    setIsLoggingOut(true);
    // Wait for the loading screen to render
    await new Promise(resolve => setTimeout(resolve, 100));
    await authApi.logout();
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    // Redirect to home page
    window.location.href = '/';
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  if (isLoading || isLoggingOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          {isLoggingOut && (
            <p className="mt-4 text-gray-600">ログアウト中...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, updateUser, isLoggingOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
