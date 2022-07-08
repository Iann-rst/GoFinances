/** Testes em Hooks **/

import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'google-token'
        }
      }
    }
  }
});

/**
    1- Abre uma tela para o usuário autenticar
    2- Retorna type e params
    3- Fetch dos dados de perfil no servidor da google
    */

describe('Auth Hooks', () => {
  it('should be able to sign in with Google Account existing', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        id: `userInfo.id`,
        email: `userInfo.email`,
        name: `userInfo.given_name`,
        photo: `userInfo.picture`,
        locale: `userInfo.locale`,
        verified_email: `userInfo.verified_email`,

      })
    })) as jest.Mock;

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());
    expect(result.current.user).toBeTruthy();
  })
});