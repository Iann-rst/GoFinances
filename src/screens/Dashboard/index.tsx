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
        <Card />
        <Card />
        <Card />
      </Cards>
    </Container>
  )
}

