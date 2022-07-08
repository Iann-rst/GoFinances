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

test('Verificar se dados do usuário foram carregados', () => {
  const { getByTestId } = render(<Profile />);
  const inputName = getByTestId('input-name');
  const inputSurname = getByTestId('input-surname');


  expect(inputName.props.value).toEqual('Iann');
  expect(inputSurname.props.value).toEqual('Rodrigues');
});

test('Verifica se o titulo Perfil renderizou correto', () => {
  const { getByTestId } = render(<Profile />);

  const textTitle = getByTestId('text_title');
  expect(textTitle.props.children).toContain('Perfil');
});