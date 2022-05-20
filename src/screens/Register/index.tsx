import React from 'react';
import { Input } from '../../components/Forms/Input';

import { Container, Header, Title } from './styles';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Input
        placeholder="Nome"
      />
    </Container>
  );
}