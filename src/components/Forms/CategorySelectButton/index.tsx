//Componente CategorySelect - selecionar a categoria da transação
import React from 'react';

import {
  Container,
  Category,
  Icon
} from './styles';

interface Props {
  title: string;
}

export function CategorySelectButton({ title }: Props) {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}