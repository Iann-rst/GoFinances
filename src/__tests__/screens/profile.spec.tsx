/**
 * Realizando Testes Na Screen Profile
 */

import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

test('Verifica se o input com placeholder name está correto na tela', () => {
  const { getByPlaceholderText } = render(<Profile />);

  const inputName = getByPlaceholderText('Nome');
  expect(inputName).toBeTruthy();

});