import React, { useState, useEffect } from 'react';
import Background from '../../assets/images/give-classes-background.png'
import LogoProffy from '../../assets/images/logo.png'

import { Container,
   BackgroundImage,
   TextsTop,
   Logo,
   SpanLogo,
   FormContainer,
   InfosTop,
   Title,
   Span,
   Form
 } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import colors from '../../assets/styles/colors';
import api from '../../services/api';
import { Keyboard } from 'react-native';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',() => setKeyboardVisible(false))

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  async function recoverPassword(){
    await api.get(`recover/password/${email}`)
  }

  return (
    <Container>
      {!isKeyboardVisible && (
        <BackgroundImage resizeMode="cover" source={Background}>

        <TextsTop>
            <Logo source={LogoProffy} resizeMode='contain' />
            <SpanLogo>
              Sua plataforma de {'\n'}estudos online
            </SpanLogo>
        </TextsTop>
        </BackgroundImage>
      )}

      <FormContainer>
        <InfosTop>
          <Title>
            Esqueceu sua senha?
          </Title>

          <Span>
            Não esquenta,{'\n'}vamos dar um jeito nisso
          </Span>
        </InfosTop>

        <Form>
          <Input
          classInput={'unique'} 
          placeholder='E-mail'
          onChangeText={text => setEmail(text)}
          />

        </Form>

        <Button text="Entrar"
        onPress={recoverPassword}
        color={colors.secundary}/>

        </FormContainer>
    </Container>
  )
}

export default ForgotPassword;