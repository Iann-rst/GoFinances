import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as AuthSession from 'expo-auth-session';

import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  }
  type: string;
}

//Variáveis de ambiente
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  const userStorageKey = '@gofinances:user';

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        }
        setUser(userLogged);

        //salvando no async-storage
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    console.log("SignInWithApple");
    // try {
    //   const credential = await AppleAuthentication.signInAsync({
    //     requestedScopes: [
    //       AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    //       AppleAuthentication.AppleAuthenticationScope.EMAIL,
    //     ]
    //   });
    //   console.log(credential);
    //   if (credential) {
    //     const userLogged = {
    //       id: String(credential.user),
    //       email: credential.email,
    //       name: credential.fullName!.givenName!,
    //       photo: undefined
    //     };
    //     setUser(userLogged);
    //   }
    // } catch (error) {
    //   throw new Error(error);
    // }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  useEffect(() => {
    async function loadUserStorageDate() {
      const userStorage = await AsyncStorage.getItem(userStorageKey);

      if (userStorage) {
        const userLogged = JSON.parse(userStorage);
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }

    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoading
    }}
    >
      {children}
    </AuthContext.Provider>)
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }

