/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../service/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  loading: boolean;
  user: object;
  signIn(credentials: SignCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageDate() {
      const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
    }
    loadStorageDate();
    setLoading(false);
  }, []);

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('/login', {
      email,
      senha,
    });

    const { authorization } = response.headers;

    const resp = await api.get(`/clientes/email?value=${email}`, { headers: { Authorization: authorization } });
    console.log(resp.data);
    await AsyncStorage.multiSet([
      ['@GoBarbar:token', authorization],
      ['@GoBarber:user', JSON.stringify(resp.data)],
    ]);

    setData({ token: authorization, user: resp.data });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as AuthState);
  }, []);

  return <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
