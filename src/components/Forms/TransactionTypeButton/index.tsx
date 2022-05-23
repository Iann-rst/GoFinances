import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from './styles';

//Componente do tipo da transação (Income ou Outcome)

const icons = {
  up: 'arrow-alt-circle-up',
  down: 'arrow-alt-circle-down'
}

interface Props extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  isActive: boolean;
}

export function TransactionTypeButton({ title, type, isActive, ...rest }: Props) {
  return (
    <Container
      isActive={isActive}
      type={type}
      {...rest}
    >
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}