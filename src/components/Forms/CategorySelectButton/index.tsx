//Componente CategorySelect - selecionar a categoria da transação
import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Category,
  Icon
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  testID
}: Props) {
  return (
    <Container onPress={onPress} testID={testID}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  )
}