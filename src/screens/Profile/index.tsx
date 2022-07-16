import React from 'react';
import { View, Text, TextInput, Button } from 'react-native'

export function Profile() {
  return (
    <View>
      <Text testID="text_title">Perfil</Text>
      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        value="Iann"
      />
      <TextInput
        testID="input-surname"
        placeholder="Sobrenome"
        autoCorrect={false}
        value="Rodrigues"
      />

      <Button title="Salvar" onPress={() => { }} />
    </View>
  );
}