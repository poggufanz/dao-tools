'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, ActorSubclass, HttpAgent, Identity } from '@dfinity/agent';

interface InternetIdentityContextType {
  identity: Identity | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const InternetIdentityContext = createContext<InternetIdentityContextType | null>(null);

export const useInternetIdentity = () => {
  const context = useContext(InternetIdentityContext);
  if (!context) {
    throw new Error('useInternetIdentity must be used within an InternetIdentityProvider');
  }
  return context;
};

interface InternetIdentityProviderProps {
  children: ReactNode;
}

export const InternetIdentityProvider = ({ children }: InternetIdentityProviderProps) => {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const isAuthenticated = await client.isAuthenticated();
      if (isAuthenticated) {
        const identity = client.getIdentity();
        setIdentity(identity);
        setIsAuthenticated(true);
      }
    });
  }, []);

  const login = async () => {
    if (!authClient) return;

    await new Promise<void>((resolve, reject) => {
        authClient.login({
            identityProvider: 'https://identity.ic0.app',
            onSuccess: () => {
                const identity = authClient.getIdentity();
                setIdentity(identity);
                setIsAuthenticated(true);
                resolve();
            },
            onError: reject,
        });
    });
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIdentity(null);
    setIsAuthenticated(false);
  };

  return (
    <InternetIdentityContext.Provider value={{ identity, isAuthenticated, login, logout }}>
      {children}
    </InternetIdentityContext.Provider>
  );
};