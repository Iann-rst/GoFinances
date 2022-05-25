import React, { useState } from 'react';
import { Modal } from 'react-native';
import { useForm } from 'react-hook-form';


import { Button } from '../../components/Forms/Button';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';

import { InputForm } from '../../components/Forms/InputForm';

import { CategorySelect } from '../CategorySelect';


import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionType
} from './styles';

interface FormData {
  [name: string]: any;
  amount: string;
}

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });


  const {
    control,
    handleSubmit
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: Partial<FormData>) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            name="name"
            control={control}
            placeholder="Nome"
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
            keyboardType='numeric'
          />

          <TransactionType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionType>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />

        </Fields>

        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)} />
      </Form >

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>

  );
}