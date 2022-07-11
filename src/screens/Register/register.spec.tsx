import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Register } from './index';

import { ThemeProvider } from 'styled-components/native';
import theme from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

describe('Register Screen', () => {
  it('Verificar se Modal abre quando o usuário clicar no botão de categoria', () => {

    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    );

    /**
     * [x] - Recuperar o modal
     * [x] - Recuperar o botão
     * [x] - Fazer o click do usuário no botão (fireEvent)
     * [x] - Saber se a modal foi renderizada em tela apos o click 
     *       categoryModal.props.visible = true
     * 
     * */

    const categoryModal = getByTestId('modal-category');
    const buttonCategory = getByTestId('button-category');
    fireEvent.press(buttonCategory);


    expect(categoryModal.props.visible).toBeTruthy();
  });
})