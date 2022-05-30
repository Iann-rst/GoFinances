import React, { useCallback, useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Card } from '../../components/Card';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';


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
  Cards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string
}
interface HighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  //Função para pegar o dia da ultima transação de entrada e saída
  function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {

    const lastTransaction = new Date(
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
  }

  //Função para buscar as transações no asyncStorage
  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    //Formatação das transações
    const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

      if (item.type === 'positive') {
        entriesTotal += Number(item.amount);
      } else {
        expensiveTotal += Number(item.amount);
      }


      const amount = Number(item.amount).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.date));

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date,
      }
    });

    setTransactions(transactionsFormatted);

    //Buscar a ultima transação de entrada
    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');

    //Buscar a ultima transação de saída
    const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

    //Intervalo do primeiro dia do mês ate a ultima transação
    const totalInterval = `01 a ${lastTransactionExpensives}`

    //Valor total = valor total de entradas - valor total de saídas
    const total = entriesTotal - expensiveTotal;


    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },

      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpensives}`
      },

      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    });

    setIsLoading(false);
  }

  //useEffect - carregar as transações assim que a tela Dashboard for renderizada
  useEffect(() => {
    loadTransactions();
  }, [])

  //useFocusEffect - carrega as transações assim que a tela Dashboard ficar em focus
  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  function Logout() {
    Alert.alert("Logout!!");
  }

  return (
    <Container>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/48128325?v=4' }} />
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Iann</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={Logout}>
                  <Icon name="power-off" />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <Cards>
              <Card
                type="up"
                title="Entradas"
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction}
              />
              <Card
                type="down"
                title="Saídas"
                amount={highlightData.expensives.amount}
                lastTransaction={highlightData.expensives.lastTransaction}
              />
              <Card
                type="total"
                title="Total"
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction}
              />
            </Cards>

            <Transactions>
              <Title>Listagem</Title>

              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard data={item} />}
              />

            </Transactions>
          </>
      }
    </Container>
  )
}

