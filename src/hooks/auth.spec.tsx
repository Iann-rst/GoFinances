/** Testes em Hooks **/

import { mocked } from 'jest-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';

jest.mock('expo-auth-session');

/**
    1- Abre uma tela para o usuário autenticar
    2- Retorna type e params
    3- Fetch dos dados de perfil no servidor da google
    */

describe('Auth Hooks', () => {
  beforeEach(async () => {
    const userStorageKey = '@gofinances:user';
    await AsyncStorage.removeItem(userStorageKey);
  })

  it('should be able to sign in with Google Account existing', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      params: {
        access_token: 'google-token'
      }
    })


    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `userInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verified_email`
      })
    })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user.email).toBe('userInfo.email');
  })

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());
    console.log("Tem usuário?", result.current.user);
    expect(result.current.user).not.toHaveProperty('id');
  })
});