import React from 'react';
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

const ForgotPassword: React.FC = () => {
  return (
    <Container>
      <BackgroundImage resizeMode="cover" source={Background}>

      <TextsTop>
          <Logo source={LogoProffy} resizeMode='contain' />
          <SpanLogo>
            Sua plataforma de {'\n'}estudos online
          </SpanLogo>
      </TextsTop>
      </BackgroundImage>

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
          />

        </Form>

        <Button text="Entrar" color={colors.secundary}/>

        </FormContainer>
    </Container>
  )
}

export default ForgotPassword;