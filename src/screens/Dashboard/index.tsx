import React from 'react';
import { Card } from '../../components/Card';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  Cards
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/48128325?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Iann</UserName>
            </User>
          </UserInfo>
          <Icon name="power-off" />
        </UserWrapper>
      </Header>

      <Cards>
        <Card
          type="up"
          title="Entradas"
          amount="R$ 17.4000,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <Card
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <Card
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </Cards>
    </Container>
  )
}

