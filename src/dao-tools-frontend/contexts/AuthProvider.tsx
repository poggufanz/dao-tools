'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { useInternetIdentity } from './InternetIdentityProvider';

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

  // Hooks from underlying providers
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { disconnect: wagmiLogout } = useDisconnect();
  const { identity: iiIdentity, isAuthenticated: isIiAuthenticated, logout: iiLogout } = useInternetIdentity();

  useEffect(() => {
    if (isConnected && address) {
      setAuthState({ 
        isAuthenticated: true, 
        identity: address, 
        method: 'wallet',
        isLoading: false,
      });
    } else if (isIiAuthenticated && iiIdentity) {
      setAuthState({ 
        isAuthenticated: true, 
        identity: iiIdentity.getPrincipal().toText(), 
        method: 'internet-identity',
        isLoading: false,
      });
    } else {
        setAuthState({ 
            isAuthenticated: false, 
            identity: null, 
            method: null,
            isLoading: isConnecting || isReconnecting, // Still loading if wagmi is trying to connect
        });
    }
  }, [isConnected, address, isIiAuthenticated, iiIdentity, isConnecting, isReconnecting]);

  const logout = useCallback(() => {
    if (authState.method === 'wallet') {
      wagmiLogout();
    } else if (authState.method === 'internet-identity') {
      iiLogout();
    }
    // The useEffect above will handle resetting the state
  }, [authState.method, wagmiLogout, iiLogout]);

  const value = { ...authState, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
