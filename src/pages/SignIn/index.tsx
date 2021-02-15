import React from 'react';
import { Image } from 'react-native';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';

const SingIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu logon</Title>

      <Input name="Fillipe" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />
      <Button
        onPress={() => {
          console.log('deu bom');
        }}
      >
        Entrar
      </Button>
    </Container>
  );
};

export default SingIn;
