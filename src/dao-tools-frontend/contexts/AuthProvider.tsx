'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useInternetIdentity } from './InternetIdentityProvider';
import { useRouter } from 'next/navigation';

interface AuthState {
  identity: string | null;
  method: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ 
    isAuthenticated: false, 
    identity: null, 
    method: null,
    isLoading: true,
  });
  const router = useRouter();

  // Hooks from underlying providers
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { disconnect: wagmiLogout } = useDisconnect();
  const { identity: iiIdentity, isAuthenticated: isIiAuthenticated, logout: iiLogout } = useInternetIdentity();

  useEffect(() => {
    const wasAuthenticated = authState.isAuthenticated;
    if (isConnected && address) {
      setAuthState({ 
        isAuthenticated: true, 
        identity: address, 
        method: 'wallet',
        isLoading: false,
      });
      if (!wasAuthenticated) {
        router.push('/dashboard');
      }
    } else if (isIiAuthenticated && iiIdentity) {
      setAuthState({ 
        isAuthenticated: true, 
        identity: iiIdentity.getPrincipal().toText(), 
        method: 'internet-identity',
        isLoading: false,
      });
      if (!wasAuthenticated) {
        router.push('/dashboard');
      }
    } else {
        setAuthState({ 
            isAuthenticated: false, 
            identity: null, 
            method: null,
            isLoading: isConnecting || isReconnecting, // Still loading if wagmi is trying to connect
        });
    }
  }, [isConnected, address, isIiAuthenticated, iiIdentity, isConnecting, isReconnecting, router, authState.isAuthenticated]);

  const logout = useCallback(() => {
    if (authState.method === 'wallet') {
      wagmiLogout();
    } else if (authState.method === 'internet-identity') {
      iiLogout();
    }
    router.push('/');
    // The useEffect above will handle resetting the state
  }, [authState.method, wagmiLogout, iiLogout, router]);

  const value = { ...authState, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};